import { Context, Effect, Schema } from "effect";
import { expect, test } from "tstyche";
import { Async } from "../utils/async";
import type { Command, ServicesOf } from "../lib";

class Api extends Context.Service<Api, { readonly load: Effect.Effect<string> }>()("Api") {}

type SearchAction =
  | { readonly _tag: "SearchResolved"; readonly value: string }
  | { readonly _tag: "SearchRejected"; readonly error: string };

// ---------------------------------------------------------------------------
// Surface
// ---------------------------------------------------------------------------

test("an operation owns the work and nothing state-shaped", () => {
  const search = Async("Search", { success: Schema.String, onError: Async.message });

  expect(search).type.not.toHaveProperty("field");
  expect(search).type.not.toHaveProperty("initial");
  expect(search).type.not.toHaveProperty("handlers");
  expect(search).type.not.toHaveProperty("idle");
  expect(search).type.not.toHaveProperty("start");
  expect(search).type.not.toHaveProperty("match");
  expect(search).type.not.toHaveProperty("get");
  expect(search).type.not.toHaveProperty("reset");
});

test("a lower-case name is rejected, the way an action tag is", () => {
  // The name is the tag prefix, so it has to be capitalised.
  expect(Async).type.not.toBeCallableWith("search", {
    success: Schema.String,
    onError: Async.message,
  });
});

test("take-first is not a mode — it is a guard the handler writes", () => {
  expect(Async).type.not.toBeCallableWith("Search", {
    success: Schema.String,
    onError: Async.message,
    mode: "first",
  });
});

// ---------------------------------------------------------------------------
// Bound vs unbound `run`
// ---------------------------------------------------------------------------

test("declaring `run` makes the operation's `run` take its input, and only its input", () => {
  const search = Async("Search", {
    success: Schema.String,
    onError: Async.message,
    run: (query: string) =>
      Effect.map(
        Effect.flatMap(Api, (api) => api.load),
        (v) => `${v}${query}`,
      ),
  });

  expect(search.run("query")).type.toBe<Command<SearchAction, Api>>();

  // The effect form is gone: a bound operation owns its work.
  expect(search.run).type.not.toBeCallableWith(Effect.succeed("query"));
});

test("without `run`, it takes the effect and carries its services to `ServicesOf`", () => {
  const search = Async("Search", { success: Schema.String, onError: Async.message });
  const state = { search: Async.idle };

  const reducer = {
    Clicked: (_action: { readonly _tag: "Clicked" }, snapshot: { readonly state: typeof state }) =>
      [
        { ...snapshot.state, search: Async.pending },
        search.run(Effect.flatMap(Api, (api) => api.load)),
      ] as const,
  };

  expect<ServicesOf<typeof reducer>>().type.toBe<Api>();

  // The input form is gone: an unbound operation has nothing to apply.
  expect(search.run).type.not.toBeCallableWith("query");
});

// ---------------------------------------------------------------------------
// Constructors and the slice
// ---------------------------------------------------------------------------

test("the constructors are assignable to the slice they fill", () => {
  const State = Schema.Struct({ search: Async.slice(Schema.String) });
  type State = typeof State.Type;

  expect<State["search"]>().type.toBe<
    | { readonly _tag: "Idle" }
    | { readonly _tag: "Pending" }
    | { readonly _tag: "Resolved"; readonly value: string }
    | { readonly _tag: "Rejected"; readonly error: string }
  >();

  expect(Async.idle).type.toBeAssignableTo<State["search"]>();
  expect(Async.pending).type.toBeAssignableTo<State["search"]>();
  expect(Async.resolved("v")).type.toBeAssignableTo<State["search"]>();
  expect(Async.rejected("e")).type.toBeAssignableTo<State["search"]>();

  // The success type is not erased: a number does not fill a string slice.
  expect(Async.resolved(1)).type.not.toBeAssignableTo<State["search"]>();
});

test("an explicit failure schema types both `onError` and the slice", () => {
  const Failure = Schema.Struct({ status: Schema.Number });

  const search = Async("Search", {
    success: Schema.String,
    failure: Failure,
    onError: (): { readonly status: number } => ({ status: 500 }),
  });

  expect(search.run).type.toBeCallableWith(Effect.succeed("ok"));

  const State = Schema.Struct({ search: Async.slice(Schema.String, Failure) });
  expect<(typeof State.Type)["search"]>().type.toBe<
    | { readonly _tag: "Idle" }
    | { readonly _tag: "Pending" }
    | { readonly _tag: "Resolved"; readonly value: string }
    | { readonly _tag: "Rejected"; readonly error: { readonly status: number } }
  >();
});

// ---------------------------------------------------------------------------
// match
// ---------------------------------------------------------------------------

test("`match` is total — a missing arm does not compile", () => {
  const State = Schema.Struct({ search: Async.slice(Schema.String) });
  const state: typeof State.Type = { search: Async.idle };

  expect(
    Async.match(state.search, {
      Idle: () => 0,
      Pending: () => 1,
      Resolved: (resolved) => resolved.value.length,
      Rejected: (rejected) => rejected.error.length,
    }),
  ).type.toBe<number>();

  expect(Async.match).type.not.toBeCallableWith(state.search, {
    Idle: () => 0,
    Pending: () => 1,
    Resolved: (resolved: { readonly value: string }) => resolved.value.length,
  });
});

// ---------------------------------------------------------------------------
// Announced
// ---------------------------------------------------------------------------

test("an announced operation is the same shape — only the channel differs", () => {
  const search = Async.output("Search", { success: Schema.String, onError: Async.message });

  expect(search.run(Effect.succeed("ok"))).type.toBe<Command<SearchAction, never>>();
  expect(search.cancel).type.toBe<Command<SearchAction, never>>();
});
