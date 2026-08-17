throw new Error("not implemented");

// Sketch

// const Search = Async("Search", {
//   ok: WallhavenSearchPayload,
//   err: Schema.String,
// })

// Returns four things:

// 1. Search.actions → [SearchPending, SearchFulfilled, SearchRejected], spread into Action.of([ClickedSearch, ...Search.actions])
// 2. Search.state → field schema for State: tagged uniled{data} | Rejected{error}. One key search, zeroillegal states.
// 3. Search.handlers → pre-built reducer entries for tdFactory.reducer({...}). Keys are template-literaltyped (`${Name}Fulfilled`) so Exhaustive still checks out.
// 4. Search.start(state, effect, opts?) → returns Next

// ClickedSearch: (_a, { state }) =>
//   Search.start(state, Effect.gen(function* () {
//     const wallhaven = yield* WallhavenService
//     return yield* wallhaven.search({})
//   })),
