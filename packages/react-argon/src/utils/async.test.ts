import { Context, Effect, Layer, Schema } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { Action, Children, define } from "../lib";
import { Async } from "./async";

class Api extends Context.Service<Api, { readonly load: Effect.Effect<string, Error> }>()("Api") {}

const Props = Schema.Struct({ children: Schema.optionalKey(Children) });
const Clicked = Action("Clicked", {});
const load = Effect.flatMap(Api, (api) => api.load);
const layerOf = (value: Effect.Effect<string, Error>) => Layer.succeed(Api)({ load: value });

// --- folded -----------------------------------------------------------------

const folded = (mode?: "first" | "every") => {
  const search = Async("search", { success: Schema.String, onError: Async.message, mode });
  const State = Schema.Struct({ colorValue: Schema.String, ...search.field });
  const Vocab = Action.of([Clicked, ...search.actions]);
  const F = define({ props: Props, state: State, action: Vocab });

  return {
    search,
    blueprint: F.create({
      initialState: F.initialState(() => ({ colorValue: "#000", search: search.idle })),
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

  it("take-latest: a second start interrupts the first", async () => {
    const out = await run(folded().blueprint, Effect.as(Effect.sleep(50), "second"), 2);
    expect(out.emitted).toHaveLength(1);
  });

  it("take-first: a second start while Pending is dropped", async () => {
    const out = await run(folded("first").blueprint, Effect.as(Effect.sleep(50), "first"), 2);
    expect(out.emitted).toHaveLength(1);
  });

  it("every: both starts run to completion", async () => {
    const out = await run(folded("every").blueprint, Effect.as(Effect.sleep(50), "both"), 2);
    expect(out.emitted).toHaveLength(2);
  });

  it("reset returns to Idle", () => {
    const { search } = folded();
    const [state] = search.reset({ colorValue: "#000", search: { _tag: "Pending" } }) as readonly [
      any,
      any,
    ];
    expect(state.search).toEqual({ _tag: "Idle" });
  });
});

// --- announced ---------------------------------------------------------------

describe("Async.output", () => {
  const search = Async.output("search", { success: Schema.String, onError: Async.message });
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
