import { Context, Effect, Schema } from "effect";
import { expect, test } from "tstyche";
import { Async } from "../utils/async";
import type { Next, ServicesOf } from "../lib";

class Api extends Context.Service<Api, { readonly load: Effect.Effect<string> }>()("Api") {}

// ---------------------------------------------------------------------------
// Name → field
// ---------------------------------------------------------------------------

test("the state field is the name, lower-cased — not the name as written", () => {
  const search = Async("WallhavenSearch", { success: Schema.String, onError: Async.message });

  expect(search.field).type.toHaveProperty("wallhavenSearch");
  expect(search.field).type.not.toHaveProperty("WallhavenSearch");
  expect(search.initial).type.toHaveProperty("wallhavenSearch");
  expect(search.handlers).type.toHaveProperty("WallhavenSearchResolved");
  expect(search.handlers).type.toHaveProperty("WallhavenSearchRejected");
});

test("a lower-case name is rejected, the way an action tag is", () => {
  // The name is the tag prefix, so it has to be capitalised — the field it
  // lands under is derived, not the other way round.
  expect(Async).type.not.toBeCallableWith("search", {
    success: Schema.String,
    onError: Async.message,
  });
});

// ---------------------------------------------------------------------------
// Bound vs unbound `start`
// ---------------------------------------------------------------------------

test("declaring `run` makes `start` take its input, and only its input", () => {
  const search = Async("Search", {
    success: Schema.String,
    onError: Async.message,
    run: (query: string) =>
      Effect.map(
        Effect.flatMap(Api, (api) => api.load),
        (v) => `${v}${query}`,
      ),
  });

  const state = { search: search.idle };

  expect(search.start(state, "query")).type.toBe<
    Next<
      typeof state,
      | { readonly _tag: "SearchResolved"; readonly value: string }
      | { readonly _tag: "SearchRejected"; readonly error: string },
      Api
    >
  >();

  // The effect form is gone: a bound operation owns its work.
  expect(search.start).type.not.toBeCallableWith(state, Effect.succeed("query"));
});

test("without `run`, `start` takes the effect and carries its services to `ServicesOf`", () => {
  const search = Async("Search", { success: Schema.String, onError: Async.message });
  const state = { search: search.idle };

  const reducer = {
    Clicked: (_action: { readonly _tag: "Clicked" }, snapshot: { readonly state: typeof state }) =>
      search.start(
        snapshot.state,
        Effect.flatMap(Api, (api) => api.load),
      ),
  };

  expect<ServicesOf<typeof reducer>>().type.toBe<Api>();

  // The input form is gone: an unbound operation has nothing to apply.
  expect(search.start).type.not.toBeCallableWith(state, "query");
});

// ---------------------------------------------------------------------------
// Failure schema
// ---------------------------------------------------------------------------

test("an explicit failure schema types both `onError` and the slice", () => {
  const Failure = Schema.Struct({ status: Schema.Number });

  const search = Async("Search", {
    success: Schema.String,
    failure: Failure,
    onError: (): { readonly status: number } => ({ status: 500 }),
  });

  expect(search.get({ search: search.idle })).type.toBe<
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
  const search = Async("Search", { success: Schema.String, onError: Async.message });
  const state = { search: search.idle };

  expect(
    search.match(state, {
      Idle: () => 0,
      Pending: () => 1,
      Resolved: (resolved) => resolved.value.length,
      Rejected: (rejected) => rejected.error.length,
    }),
  ).type.toBe<number>();

  expect(search.match).type.not.toBeCallableWith(state, {
    Idle: () => 0,
    Pending: () => 1,
    Resolved: (resolved: { readonly value: string }) => resolved.value.length,
  });
});

// ---------------------------------------------------------------------------
// Announced
// ---------------------------------------------------------------------------

test("an announced operation has no state-shaped surface", () => {
  const search = Async.output("Search", { success: Schema.String, onError: Async.message });

  expect(search).type.not.toHaveProperty("field");
  expect(search).type.not.toHaveProperty("handlers");
  expect(search).type.not.toHaveProperty("idle");
  expect(search).type.not.toHaveProperty("match");

  // `first` needs a slice to read, and there is none.
  expect(Async.output).type.not.toBeCallableWith("Search", {
    success: Schema.String,
    onError: Async.message,
    mode: "first",
  });
});
