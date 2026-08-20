import { Context, Effect, Layer, Schema } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { Action, Children, define } from "../lib";
import { Async, type AsyncCases, type AsyncValue } from "./async";

class Api extends Context.Service<Api, { readonly load: Effect.Effect<string, Error> }>()("Api") {}

const Props = Schema.Struct({ children: Schema.optionalKey(Children) });
const Clicked = Action("Clicked", {});
const load = Effect.flatMap(Api, (api) => api.load);
const layerOf = (value: Effect.Effect<string, Error>) => Layer.succeed(Api)({ load: value });

// --- folded -----------------------------------------------------------------

const folded = (mode?: "first" | "every") => {
  const search = Async("Search", { success: Schema.String, onError: Async.message, mode });
  const State = Schema.Struct({ colorValue: Schema.String, ...search.field });
  const Vocab = Action.of([Clicked, ...search.actions]);
  const F = define({ props: Props, state: State, action: Vocab });

  return {
    search,
    blueprint: F.create({
      initialState: F.initialState(() => ({ colorValue: "#000", ...search.initial })),
      reducer: F.reducer({
        Clicked: (_a, { state }) => search.start(state, load),
        ...search.handlers,
      }),
      render: F.render(() => null),
    }),
  };
};

const run = (
  blueprint: { run: (...args: any[]) => Effect.Effect<any> },
  value: Effect.Effect<string, Error>,
  clicks = 1,
) =>
  Effect.runPromise(
    blueprint.run(
      Array.from({ length: clicks }, () => Clicked.make({})),
      {
        props: {},
        hooks: {},
        layer: layerOf(value),
      },
    ),
  );

describe("Async", () => {
  it("derives the field from the name, lower-cased", () => {
    const search = Async("WallhavenSearch", { success: Schema.String, onError: Async.message });
    expect(Object.keys(search.field)).toEqual(["wallhavenSearch"]);
    expect(Object.keys(search.initial)).toEqual(["wallhavenSearch"]);
    expect(search.actions.map((a) => (a.make as any)({ value: "x", error: "x" })._tag)).toEqual([
      "WallhavenSearchResolved",
      "WallhavenSearchRejected",
    ]);
  });

  it("resolves into the slice", async () => {
    const out = await run(folded().blueprint, Effect.succeed("ok"));
    expect(out.state.search).toEqual({ _tag: "Resolved", value: "ok" });
    expect(out.emitted.map((a: { _tag: string }) => a._tag)).toEqual(["SearchResolved"]);
  });

  it("maps a typed failure through onError", async () => {
    const out = await run(folded().blueprint, Effect.fail(new Error("boom")));
    expect(out.state.search).toEqual({ _tag: "Rejected", error: "boom" });
  });

  it("maps a defect through onError too — nothing reaches the Error lifecycle", async () => {
    const out = await run(folded().blueprint, Effect.die(new Error("bug")));
    expect(out.state.search).toEqual({ _tag: "Rejected", error: "bug" });
  });

  it("writes Pending synchronously, on the fold that issued the command", () => {
    const { blueprint, search } = folded();
    const next = blueprint.reduce(Clicked.make({}), {
      state: { colorValue: "#000", search: search.idle },
      props: {},
      hooks: {},
    });
    expect((next as readonly [any, any])[0].search).toEqual({ _tag: "Pending" });
  });

  it("take-latest: a second start interrupts the first, and the interrupt is not a rejection", async () => {
    const out = await run(folded().blueprint, Effect.as(Effect.sleep(50), "second"), 2);
    expect(out.emitted.map((a: { _tag: string }) => a._tag)).toEqual(["SearchResolved"]);
    expect(out.state.search).toEqual({ _tag: "Resolved", value: "second" });
  });

  it("take-first: a second start while Pending is dropped", async () => {
    const out = await run(folded("first").blueprint, Effect.as(Effect.sleep(50), "first"), 2);
    expect(out.emitted).toHaveLength(1);
  });

  it("every: both starts run to completion", async () => {
    const out = await run(folded("every").blueprint, Effect.as(Effect.sleep(50), "both"), 2);
    expect(out.emitted).toHaveLength(2);
  });

  it("reset returns to Idle from any case", () => {
    const { search } = folded();
    const [state] = search.reset({
      colorValue: "#000",
      search: { _tag: "Resolved", value: "x" },
    }) as readonly [any, any];
    expect(state.search).toEqual({ _tag: "Idle" });
  });

  it("cancel clears a Pending, and leaves anything else by reference", () => {
    const { search } = folded();

    const pending = { colorValue: "#000", search: { _tag: "Pending" } } as const;
    const [cleared, command] = search.cancel(pending) as readonly [any, any];
    expect(cleared.search).toEqual({ _tag: "Idle" });
    expect(command._tag).toBe("Cancel");
    expect(command.target).toBe("Async/Search");

    // Nothing to clear: same object, so the fold reports "did not move" — but
    // the interrupt still goes out, because `every` can have work in flight.
    const resolved = { colorValue: "#000", search: { _tag: "Resolved", value: "x" } } as const;
    const [same, still] = search.cancel(resolved) as readonly [any, any];
    expect(same).toBe(resolved);
    expect(still._tag).toBe("Cancel");

    expect(search.cancel.silent._tag).toBe("Cancel");
  });

  it("cancel actually interrupts the work it started", async () => {
    const search = Async("Search", { success: Schema.String, onError: Async.message });
    const Cancelled = Action("Cancelled", {});
    const State = Schema.Struct({ ...search.field });
    const Vocab = Action.of([Clicked, Cancelled, ...search.actions]);
    const F = define({ props: Props, state: State, action: Vocab });

    const blueprint = F.create({
      initialState: F.initialState(() => ({ ...search.initial })),
      reducer: F.reducer({
        Clicked: (_a, { state }) => search.start(state, load),
        Cancelled: (_a, { state }) => search.cancel(state),
        ...search.handlers,
      }),
      render: F.render(() => null),
    });

    const out = await Effect.runPromise(
      blueprint.run([Clicked.make({}), Cancelled.make({})], {
        props: {},
        hooks: {},
        layer: layerOf(Effect.as(Effect.sleep(50), "never seen")),
      }),
    );

    expect(out.emitted).toHaveLength(0);
    expect(out.state.search).toEqual({ _tag: "Idle" });
  });

  it("match covers the four cases, each handed its whole member", () => {
    const { search } = folded();
    const arms: AsyncCases<string, string, string> = {
      Idle: () => "idle",
      Pending: () => "pending",
      Resolved: (r) => `resolved:${r.value}`,
      Rejected: (r) => `rejected:${r.error}`,
    };

    const values: ReadonlyArray<AsyncValue<string, string>> = [
      { _tag: "Idle" },
      { _tag: "Pending" },
      { _tag: "Resolved", value: "v" },
      { _tag: "Rejected", error: "e" },
    ];

    expect(values.map((value) => Async.match(value, arms))).toEqual([
      "idle",
      "pending",
      "resolved:v",
      "rejected:e",
    ]);

    expect(search.match({ colorValue: "#000", search: { _tag: "Pending" } }, arms)).toBe("pending");
    expect(Async.isPending({ _tag: "Pending" })).toBe(true);
    expect(Async.isPending({ _tag: "Idle" })).toBe(false);
  });
});

// --- bound work --------------------------------------------------------------

describe("Async with `run`", () => {
  const search = Async("Search", {
    success: Schema.String,
    onError: Async.message,
    run: (query: string) => Effect.map(load, (value) => `${value}:${query}`),
  });

  const State = Schema.Struct({ ...search.field });
  const Vocab = Action.of([Clicked, ...search.actions]);
  const F = define({ props: Props, state: State, action: Vocab });

  const blueprint = F.create({
    initialState: F.initialState(() => ({ ...search.initial })),
    reducer: F.reducer({
      Clicked: (_a, { state }) => search.start(state, "query"),
      ...search.handlers,
    }),
    render: F.render(() => null),
  });

  it("passes the input to the declared effect", async () => {
    const out = await run(blueprint, Effect.succeed("ok"));
    expect(out.state.search).toEqual({ _tag: "Resolved", value: "ok:query" });
  });
});

// --- announced ---------------------------------------------------------------

describe("Async.output", () => {
  const search = Async.output("Search", { success: Schema.String, onError: Async.message });
  const State = Schema.Struct({ colorValue: Schema.String });
  const Vocab = Action.of([Clicked]);
  const Outputs = Action.of([...search.actions]);
  const F = define({ props: Props, state: State, action: Vocab, output: Outputs });

  const blueprint = F.create({
    initialState: F.initialState(() => ({ colorValue: "#000" })),
    reducer: F.reducer({ Clicked: (_a, { state }) => [state, search.start(load)] }),
    render: F.render(() => null),
  });

  it("announces the result instead of folding it", async () => {
    const out = await run(blueprint, Effect.succeed("ok"));
    expect(out.outputs).toEqual([{ _tag: "SearchResolved", value: "ok" }]);
    expect(out.state).toEqual({ colorValue: "#000" });
  });

  it("announces a rejection", async () => {
    const out = await run(blueprint, Effect.fail(new Error("nope")));
    expect(out.outputs).toEqual([{ _tag: "SearchRejected", error: "nope" }]);
  });
});
