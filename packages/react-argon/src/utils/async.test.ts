import { Context, Effect, Layer, Schema } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { Action, Children, define } from "../lib";
import { Async, type AsyncCases, type AsyncValue } from "./async";

class Api extends Context.Service<Api, { readonly load: Effect.Effect<string, Error> }>()("Api") {}

const Props = Schema.Struct({ children: Schema.optionalKey(Children) });
const Clicked = Action("Clicked", {});
const Cancelled = Action("Cancelled", {});
const load = Effect.flatMap(Api, (api) => api.load);
const layerOf = (value: Effect.Effect<string, Error>) => Layer.succeed(Api)({ load: value });

// --- folded -----------------------------------------------------------------

/**
 * The shape the library now asks for: a slice under a name the feature chose, a
 * `Pending` write on the fold that issues the command, and two handlers that say
 * where the result lands. Take-first is a guard in the handler, not a mode.
 */
const folded = (options?: { readonly mode?: "every"; readonly takeFirst?: boolean }) => {
  const search = Async("Search", {
    success: Schema.String,
    onError: Async.message,
    mode: options?.mode,
  });

  const State = Schema.Struct({ colorValue: Schema.String, search: Async.slice(Schema.String) });
  const Vocab = Action.of([Clicked, Cancelled, ...search.actions]);
  const F = define({ props: Props, state: State, action: Vocab });

  return {
    search,
    blueprint: F.create({
      initialState: F.initialState(() => ({ colorValue: "#000", search: Async.idle })),
      reducer: F.reducer({
        Clicked: (_a, { state }) =>
          options?.takeFirst && Async.isPending(state.search)
            ? state
            : [{ ...state, search: Async.pending }, search.run(load)],
        Cancelled: (_a, { state }) => [{ ...state, search: Async.idle }, search.cancel],
        SearchResolved: (a, { state }) => ({ ...state, search: Async.resolved(a.value) }),
        SearchRejected: (a, { state }) => ({ ...state, search: Async.rejected(a.error) }),
      }),
      render: F.render(() => null),
    }),
  };
};

const run = (
  blueprint: { run: (...args: any[]) => Effect.Effect<any> },
  value: Effect.Effect<string, Error>,
  actions: ReadonlyArray<{ readonly _tag: string }> = [Clicked.make({})],
) =>
  Effect.runPromise(
    blueprint.run(actions, {
      props: {},
      hooks: {},
      layer: layerOf(value),
    }),
  );

const clicks = (n: number) => Array.from({ length: n }, () => Clicked.make({}));

describe("Async", () => {
  it("declares the two tags from the name, and nothing state-shaped", () => {
    const search = Async("WallhavenSearch", { success: Schema.String, onError: Async.message });

    expect(search.actions.map((a) => (a.make as any)({ value: "x", error: "x" })._tag)).toEqual([
      "WallhavenSearchResolved",
      "WallhavenSearchRejected",
    ]);

    expect(Object.keys(search).sort()).toEqual(["actions", "cancel", "run"]);
  });

  it("resolves into whatever slice the handler writes", async () => {
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
    const next = folded().blueprint.reduce(Clicked.make({}), {
      state: { colorValue: "#000", search: Async.idle },
      props: {},
      hooks: {},
    });
    expect((next as readonly [any, any])[0].search).toEqual({ _tag: "Pending" });
  });

  it("take-latest: a second run interrupts the first, and the interrupt is not a rejection", async () => {
    const out = await run(folded().blueprint, Effect.as(Effect.sleep(50), "second"), clicks(2));
    expect(out.emitted.map((a: { _tag: string }) => a._tag)).toEqual(["SearchResolved"]);
    expect(out.state.search).toEqual({ _tag: "Resolved", value: "second" });
  });

  it("every: both runs go to completion", async () => {
    const out = await run(
      folded({ mode: "every" }).blueprint,
      Effect.as(Effect.sleep(50), "both"),
      clicks(2),
    );
    expect(out.emitted).toHaveLength(2);
  });

  it("take-first is an `isPending` guard in the handler, and it drops the second run", async () => {
    const out = await run(
      folded({ takeFirst: true }).blueprint,
      Effect.as(Effect.sleep(50), "first"),
      clicks(2),
    );
    expect(out.emitted).toHaveLength(1);
  });

  it("cancel interrupts the work, and the handler clears the slice", async () => {
    const out = await run(folded().blueprint, Effect.as(Effect.sleep(50), "never seen"), [
      Clicked.make({}),
      Cancelled.make({}),
    ]);

    expect(out.emitted).toHaveLength(0);
    expect(out.state.search).toEqual({ _tag: "Idle" });
  });

  it("cancel is a bare command, booked under the operation's own group", () => {
    const { search } = folded();
    expect(search.cancel._tag).toBe("Cancel");
    expect((search.cancel as unknown as { readonly target: string }).target).toBe("Async/Search");
  });

  it("constructs the four cases", () => {
    expect(Async.idle).toEqual({ _tag: "Idle" });
    expect(Async.pending).toEqual({ _tag: "Pending" });
    expect(Async.resolved("v")).toEqual({ _tag: "Resolved", value: "v" });
    expect(Async.rejected("e")).toEqual({ _tag: "Rejected", error: "e" });
  });

  it("slice carries the four cases, with Schema.String as the default failure", () => {
    const slice = Async.slice(Schema.String);
    expect(Object.keys(slice.cases).sort()).toEqual(["Idle", "Pending", "Rejected", "Resolved"]);
    expect(slice.cases.Rejected.make({ error: "e" })).toEqual({ _tag: "Rejected", error: "e" });
  });

  it("match covers the four cases, each handed its whole member", () => {
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

  const State = Schema.Struct({ search: Async.slice(Schema.String) });
  const Vocab = Action.of([Clicked, ...search.actions]);
  const F = define({ props: Props, state: State, action: Vocab });

  const blueprint = F.create({
    initialState: F.initialState(() => ({ search: Async.idle })),
    reducer: F.reducer({
      Clicked: (_a, { state }) => [{ ...state, search: Async.pending }, search.run("query")],
      SearchResolved: (a, { state }) => ({ ...state, search: Async.resolved(a.value) }),
      SearchRejected: (a, { state }) => ({ ...state, search: Async.rejected(a.error) }),
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
    reducer: F.reducer({ Clicked: (_a, { state }) => [state, search.run(load)] }),
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
