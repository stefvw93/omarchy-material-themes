import { Cause, Effect, Schema } from "effect";
import { Action, Command, type Message, type Next } from "../lib";

// ---------------------------------------------------------------------------
// The slice
// ---------------------------------------------------------------------------

/**
 * One async operation's whole observable state, as four cases rather than the
 * `isPending: boolean` + `data?: T` pair it replaces — which can represent
 * "pending *and* resolved", and leaves a rejection with nowhere to go.
 *
 * `Pending` deliberately drops any previous `value`: a refetch that keeps the
 * last result readable needs a fifth case (`Refreshing { value }`), and adding
 * one later is additive. Rendering stale data as fresh is the failure mode that
 * silently ships; an empty flash is the one you notice.
 */
export type AsyncValue<Success, Failure> =
  | { readonly _tag: "Idle" }
  | { readonly _tag: "Pending" }
  | { readonly _tag: "Resolved"; readonly value: Success }
  | { readonly _tag: "Rejected"; readonly error: Failure };

/**
 * The schema counterpart, for the field in a feature's `State`.
 *
 * `Schema.TaggedUnion` rather than `Schema.Union(...).pipe(Schema.toTaggedUnion)`:
 * the latter constrains its members to `{ Type: { _tag: PropertyKey } }`, which
 * TypeScript cannot *prove* for `TaggedStruct<Tag, Fields>` while `Fields` is
 * still a type parameter — `Struct<F>["Type"]` is a stack of mapped types that
 * will not reduce until `F` is concrete. `TaggedUnion`'s constraint is the bare
 * `Constraint`, so it survives the generic position.
 */
export type AsyncSlice<
  Success extends Schema.Top,
  Failure extends Schema.Top,
> = Schema.TaggedUnion<{
  readonly Idle: Schema.TaggedStruct<"Idle", {}>;
  readonly Pending: Schema.TaggedStruct<"Pending", {}>;
  readonly Resolved: Schema.TaggedStruct<"Resolved", { readonly value: Success }>;
  readonly Rejected: Schema.TaggedStruct<"Rejected", { readonly error: Failure }>;
}>;

/**
 * The state field an operation owns.
 *
 * The operation is declared under a `Capitalize` name, like every other message
 * in this library — `Async("WallhavenSearch", …)`. That name is the tag prefix
 * and the fiber group as written; the *field* is its lower-cased form, because
 * state properties are not tags. One name in, both halves derived, so the
 * variable, the field and the actions cannot drift apart.
 */
export type AsyncKey<Name extends string> = Uncapitalize<Name>;

/**
 * The shape `start` and the handlers need of the surrounding state: whatever
 * else the feature holds, plus this operation's slice under its own key. Stated
 * as a constraint rather than a concrete type, so both stay generic in the
 * feature's `State` and return it unchanged.
 */
export type AsyncState<Name extends string, Success, Failure> = {
  readonly [K in AsyncKey<Name>]: AsyncValue<Success, Failure>;
};

const idle: { readonly _tag: "Idle" } = Object.freeze({ _tag: "Idle" as const });

// ---------------------------------------------------------------------------
// Vocabulary
// ---------------------------------------------------------------------------

/**
 * The `_tag` a `TaggedStruct` demonstrably has, stated rather than derived.
 *
 * Same reduction problem as above: `Action.of` wants `AnyMessage`, whose `Type`
 * must carry a `_tag`, and a generically-fielded `Message` cannot show one. The
 * intersection hands TypeScript the proof it cannot compute, so a generated
 * action spreads into `Action.of([...])` alongside hand-written ones.
 */
type AsyncMessage<
  Tag extends Capitalize<string>,
  Fields extends Schema.Struct.Fields,
  Ch extends "internal" | "outbound",
> = Message<Tag, Fields, Ch> & { readonly Type: { readonly _tag: Tag } };

/**
 * `` `${Name}Resolved` `` is `` `${string}Resolved` ``, which does not satisfy
 * `Capitalize<string>` — the capitalisation is known of the *prefix*, not of
 * the whole. Applying `Capitalize` to the joined string restores it.
 */
export type ResolvedTag<Name extends string> = Capitalize<`${Name}Resolved`>;
export type RejectedTag<Name extends string> = Capitalize<`${Name}Rejected`>;

/**
 * What the command emits.
 *
 * There is no `Pending` member. `start` writes `Pending` into the state it
 * returns, synchronously, on the same fold that issued the command — so the
 * button that triggered the work is already disabled when the click handler
 * returns. Dispatching a `Pending` action instead would paint that state a
 * microtask later, which is exactly long enough to double-submit. Nothing is
 * lost in devtools either: the `Idle → Pending` transition is reported, and it
 * is attributed to the action that actually caused it.
 */
export type AsyncAction<Name extends string, Success, Failure> =
  | { readonly _tag: ResolvedTag<Name>; readonly value: Success }
  | { readonly _tag: RejectedTag<Name>; readonly error: Failure };

// ---------------------------------------------------------------------------
// Concurrency
// ---------------------------------------------------------------------------

/**
 * What a second `start` does while the first is still in flight.
 *
 * A property of the operation, not of the call site, so it is declared once
 * where the operation is: a search is take-latest wherever it is triggered from,
 * a submit is take-first everywhere.
 */
export type AsyncMode =
  /** Interrupt the running fiber, run the new one. The default, and what search wants. */
  | "latest"
  /** Ignore the new one while `Pending`. What a submit button wants. */
  | "first"
  /** Run both. Last to settle wins, which is usually a bug — declare it deliberately. */
  | "every";

/**
 * `"first"` is absent: deciding to drop a start means reading whether one is
 * already pending, and an announced operation keeps no state to read.
 */
export type AsyncOutputMode = Exclude<AsyncMode, "first">;

// ---------------------------------------------------------------------------
// Failure
// ---------------------------------------------------------------------------

/**
 * Total, by construction: a `Cause` covers the effect's typed failures *and*
 * its defects, and the return type has no escape hatch, so every way the work
 * can end badly is accounted for at the declaration site. Commands cannot fail,
 * so this is where that obligation has to be discharged.
 *
 * The whole `Cause` is passed rather than a squashed error, so a mapping that
 * cares can tell `Cause.hasDies` from a typed failure — a programming bug and a
 * 404 usually deserve different things in the UI.
 *
 * One cause it never sees: interruption. Take-latest and `cancel` end work on
 * purpose, and "you cancelled it" is not an error the UI has to render.
 */
export type AsyncOnError<Failure> = (cause: Cause.Cause<unknown>) => Failure;

/** The default pairing for a `Schema.String` failure: the message, nothing else. */
const message: AsyncOnError<string> = (cause) => {
  const error: unknown = Cause.squash(cause);
  return error instanceof Error ? error.message : String(error);
};

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

/**
 * The four arms, each handed its whole member — the shape `Vocabulary.match`
 * and `Match.tag` already establish, so `Resolved: (r) => r.value` reads the
 * same here as it does there.
 *
 * Total, with no `orElse`: the point of four cases is that a render forgetting
 * one is a compile error, not a blank screen.
 */
export type AsyncCases<Success, Failure, Out> = {
  readonly Idle: (value: { readonly _tag: "Idle" }) => Out;
  readonly Pending: (value: { readonly _tag: "Pending" }) => Out;
  readonly Resolved: (value: { readonly _tag: "Resolved"; readonly value: Success }) => Out;
  readonly Rejected: (value: { readonly _tag: "Rejected"; readonly error: Failure }) => Out;
};

/**
 * What a set of arms returns, as their union.
 *
 * Inferring one `Out` across four arms does not union them — TypeScript picks
 * the first candidate and rejects the rest, so a render whose `Pending` arm is
 * a string and whose `Resolved` arm is an element would not compile. Reading
 * the result off the arms instead leaves each one to say what it returns.
 */
export type AsyncMatched<Cases> = {
  [K in keyof Cases]: Cases[K] extends (...args: never) => infer Out ? Out : never;
}[keyof Cases];

const matchValue = <Success, Failure, Cases extends AsyncCases<Success, Failure, unknown>>(
  value: AsyncValue<Success, Failure>,
  cases: Cases,
): AsyncMatched<Cases> =>
  (cases as Record<string, (value: unknown) => AsyncMatched<Cases>>)[value._tag]!(value);

const isPending = (value: AsyncValue<unknown, unknown>): boolean => value._tag === "Pending";

// ---------------------------------------------------------------------------
// Reducer entries
// ---------------------------------------------------------------------------

/**
 * The reducer entries, keyed by the generated tags so they spread straight into
 * `Factory.reducer({ … })`.
 *
 * Each entry is a *generic function*, not the result of a generic call: TypeScript
 * does not push a parameter's contextual type through a spread element into a
 * generic call's inference (`State` would land as `unknown` and every entry
 * would fail its return type), but it happily instantiates a generic function
 * property against the signature it is checked into. That is what lets these be
 * pre-built, with no state schema handed over to bind them.
 */
export type AsyncHandlers<Name extends string, Success, Failure> = {
  readonly [K in ResolvedTag<Name>]: <State extends AsyncState<Name, Success, Failure>>(
    action: { readonly _tag: K; readonly value: Success },
    snapshot: { readonly state: State },
  ) => State;
} & {
  readonly [K in RejectedTag<Name>]: <State extends AsyncState<Name, Success, Failure>>(
    action: { readonly _tag: K; readonly error: Failure },
    snapshot: { readonly state: State },
  ) => State;
};

// ---------------------------------------------------------------------------
// Cancellation
// ---------------------------------------------------------------------------

/**
 * `cancel(state)` interrupts the work *and* clears the `Pending` it left behind
 * — a cancelled operation that stayed `Pending` is a permanently disabled
 * button, which is the bug this shape exists to make unwriteable.
 *
 * The state is returned by reference when there is nothing to clear, so a
 * cancel with no work pending schedules no re-render. The interrupt is issued
 * either way: under `mode: "every"` the slice can read `Resolved` while a
 * second fiber is still running.
 *
 * `cancel.silent` is the old behaviour — interrupt, touch nothing — for the
 * caller who is about to write the slice themselves.
 */
export interface AsyncCancel<Name extends string, Success, Failure> {
  <State extends AsyncState<Name, Success, Failure>>(
    state: State,
  ): Next<State, AsyncAction<Name, Success, Failure>, never>;

  readonly silent: Command<AsyncAction<Name, Success, Failure>>;
}

// ---------------------------------------------------------------------------
// The two variants
// ---------------------------------------------------------------------------

/**
 * An operation the feature folds itself.
 *
 * `Input` is `never` unless the operation declared `run`, and it is what picks
 * `start`'s signature: bound operations take the argument, unbound ones take
 * the effect.
 */
export interface AsyncOperation<
  Name extends string,
  Success extends Schema.Top,
  Failure extends Schema.Top,
  Input = never,
  R = never,
> {
  /**
   * The state field, already under its key — spread into the feature's state:
   *
   *     const State = Schema.Struct({ colorValue: Schema.String, ...search.field })
   *
   * Naming the operation at construction is what removes the second binding
   * step: the handlers below already know where to write, so nothing downstream
   * has to be told the key again, or handed the state schema to infer it from.
   */
  readonly field: { readonly [K in AsyncKey<Name>]: AsyncSlice<Success, Failure> };

  /** Spread into `Action.of([...])` alongside the feature's own actions. */
  readonly actions: readonly [
    AsyncMessage<ResolvedTag<Name>, { readonly value: Success }, "internal">,
    AsyncMessage<RejectedTag<Name>, { readonly error: Failure }, "internal">,
  ];

  /** Spread into the reducer. */
  readonly handlers: AsyncHandlers<Name, Success["Type"], Failure["Type"]>;

  /** The initial value for the field, for `Factory.initialState`. */
  readonly idle: AsyncValue<Success["Type"], Failure["Type"]>;

  /**
   * `idle` already under its key, so `initialState` spreads it the same way
   * `State` spreads `field` — one name to keep in sync instead of two.
   */
  readonly initial: {
    readonly [K in AsyncKey<Name>]: AsyncValue<Success["Type"], Failure["Type"]>;
  };

  /**
   * Write `Pending` and issue the work, as one `Next`.
   *
   * Returned from the *triggering* action's handler, which is what keeps the
   * effect's `R` visible to `ServicesOf` — the services a command needs are
   * read off the reducer's return types, and this is a reducer return.
   *
   * `Pending` is written into *the state you hand it*, so a handler that
   * changes something else at the same time passes the changed state and
   * returns the result directly — there is nothing to unwrap and re-merge:
   *
   *     InputTypeChanged: (action, { state }) =>
   *       search.start({ ...state, inputType: action.inputType }, params)
   */
  readonly start: [Input] extends [never]
    ? <
        State extends AsyncState<Name, Success["Type"], Failure["Type"]>,
        A extends Success["Type"],
        E,
        R2,
      >(
        state: State,
        effect: Effect.Effect<A, E, R2>,
      ) => Next<State, AsyncAction<Name, Success["Type"], Failure["Type"]>, R2>
    : <State extends AsyncState<Name, Success["Type"], Failure["Type"]>>(
        state: State,
        input: Input,
      ) => Next<State, AsyncAction<Name, Success["Type"], Failure["Type"]>, R>;

  /** Interrupt the work, clearing `Pending`. `cancel.silent` leaves the state alone. */
  readonly cancel: AsyncCancel<Name, Success["Type"], Failure["Type"]>;

  /**
   * Back to `Idle` from *any* case, cancelling anything in flight — where
   * `cancel` clears only a `Pending`, this also discards a result.
   */
  readonly reset: <State extends AsyncState<Name, Success["Type"], Failure["Type"]>>(
    state: State,
  ) => Next<State, AsyncAction<Name, Success["Type"], Failure["Type"]>, never>;

  /** The slice out of the whole state, for `render`. */
  readonly get: <State extends AsyncState<Name, Success["Type"], Failure["Type"]>>(
    state: State,
  ) => AsyncValue<Success["Type"], Failure["Type"]>;

  /** `get` plus the four arms, which is what a render actually wanted. */
  readonly match: <
    State extends AsyncState<Name, Success["Type"], Failure["Type"]>,
    Cases extends AsyncCases<Success["Type"], Failure["Type"], unknown>,
  >(
    state: State,
    cases: Cases,
  ) => AsyncMatched<Cases>;
}

/**
 * An operation the feature announces instead of folding — the parent receives
 * `onSearchResolved` / `onSearchRejected` props and owns the result.
 *
 * No `field`, `handlers` or `idle`: an announced operation stores nothing, so
 * there is no slice, no pending state, and no reducer entries. Consequently
 * `start` yields a bare `Command` rather than a `Next` — pair it with whatever
 * state the caller wants:
 *
 *     ClickedSearch: (_action, { state }) => [state, search.start(params)]
 */
export interface AsyncAnnouncement<
  Name extends string,
  Success extends Schema.Top,
  Failure extends Schema.Top,
  Input = never,
  R = never,
> {
  /** Spread into `Action.of([...])` on the outbound channel, then passed as `output`. */
  readonly actions: readonly [
    AsyncMessage<ResolvedTag<Name>, { readonly value: Success }, "outbound">,
    AsyncMessage<RejectedTag<Name>, { readonly error: Failure }, "outbound">,
  ];

  readonly start: [Input] extends [never]
    ? <A extends Success["Type"], E, R2>(
        effect: Effect.Effect<A, E, R2>,
      ) => Command<AsyncAction<Name, Success["Type"], Failure["Type"]>, R2>
    : (input: Input) => Command<AsyncAction<Name, Success["Type"], Failure["Type"]>, R>;

  /** Nothing to clear, so this stays the bare interrupt. */
  readonly cancel: Command<AsyncAction<Name, Success["Type"], Failure["Type"]>>;
}

// ---------------------------------------------------------------------------
// Declaration
// ---------------------------------------------------------------------------

/**
 * `onError` is mandatory in both forms. The `Schema.String` default exists to
 * spare you a schema, not to spare you the decision — `Async.message` is the
 * mapping that pairs with it, spelled out at the call site so a defect quietly
 * becoming `"[object Object]"` is something you chose.
 *
 * `run` is optional, and declaring it is what binds the work to the operation:
 * the effect is written once, next to the schemas that describe what it yields,
 * and every trigger passes an argument instead of rebuilding it. Omit it and
 * `start` takes the effect, for work that genuinely differs per call site.
 */
export interface AsyncConstructor<Ch extends "internal" | "outbound", Mode extends string> {
  <const Name extends Capitalize<string>, Success extends Schema.Top, Input = never, R = never>(
    name: Name,
    schemas: {
      readonly success: Success;
      readonly onError: AsyncOnError<string>;
      readonly mode?: Mode;
      readonly run?: (input: Input) => Effect.Effect<Success["Type"], unknown, R>;
    },
  ): Ch extends "internal"
    ? AsyncOperation<Name, Success, Schema.String, Input, R>
    : AsyncAnnouncement<Name, Success, Schema.String, Input, R>;

  <
    const Name extends Capitalize<string>,
    Success extends Schema.Top,
    Failure extends Schema.Top,
    Input = never,
    R = never,
  >(
    name: Name,
    schemas: {
      readonly success: Success;
      readonly failure: Failure;
      readonly onError: AsyncOnError<Failure["Type"]>;
      readonly mode?: Mode;
      readonly run?: (input: Input) => Effect.Effect<Success["Type"], unknown, R>;
    },
  ): Ch extends "internal"
    ? AsyncOperation<Name, Success, Failure, Input, R>
    : AsyncAnnouncement<Name, Success, Failure, Input, R>;
}

export interface AsyncConstructors extends AsyncConstructor<"internal", AsyncMode> {
  /** Announced, never folded. The `Action` / `Action.output` split, for async work. */
  readonly output: AsyncConstructor<"outbound", AsyncOutputMode>;

  /** `Cause` → its message. The mapping that pairs with the default `Schema.String` failure. */
  readonly message: AsyncOnError<string>;

  /** The four arms, over a slice you already hold. */
  readonly match: <Success, Failure, Cases extends AsyncCases<Success, Failure, unknown>>(
    value: AsyncValue<Success, Failure>,
    cases: Cases,
  ) => AsyncMatched<Cases>;

  /** For the `disabled={…}` case, which does not want a four-arm match. */
  readonly isPending: (value: AsyncValue<unknown, unknown>) => boolean;
}

const make = (ch: "internal" | "outbound") =>
  function async(
    name: string,
    schemas: {
      readonly success: Schema.Top;
      readonly failure?: Schema.Top;
      readonly onError: AsyncOnError<unknown>;
      readonly mode?: AsyncMode;
      readonly run?: (input: unknown) => Effect.Effect<unknown, unknown, unknown>;
    },
  ) {
    const key = name.charAt(0).toLowerCase() + name.slice(1);
    const resolvedTag = `${name}Resolved` as Capitalize<string>;
    const rejectedTag = `${name}Rejected` as Capitalize<string>;
    const failure = schemas.failure ?? Schema.String;
    const mode = schemas.mode ?? "latest";

    // Namespaced, because the name is generated: an unkeyed command books under
    // its issuing action's tag in the same flat namespace, and a feature with
    // an action tagged `WallhavenSearch` must not have its work interrupted by
    // this operation's `cancel` — nor the reverse.
    const group = `Async/${name}`;

    const message_ = ch === "internal" ? Action : Action.output;
    const Resolved = message_(resolvedTag, { value: schemas.success });
    const Rejected = message_(rejectedTag, { error: failure });

    // Total: `catchCause` covers typed failures and defects alike, so nothing
    // escapes into the `Error` lifecycle and the command's own error channel is
    // `never` — which is what `Command.effect` requires anyway. Interruption is
    // the one cause that is *not* a failure of the work: take-latest and
    // `cancel` end fibers on purpose, and `onError` should never be asked to
    // render that.
    const work = (effect: Effect.Effect<unknown, unknown, unknown>) =>
      Command.effect<any, unknown>((dispatch) =>
        effect.pipe(
          Effect.flatMap((value) => dispatch((Resolved as any).make({ value }))),
          Effect.catchCause((cause) =>
            Cause.hasInterruptsOnly(cause)
              ? Effect.void
              : dispatch((Rejected as any).make({ error: schemas.onError(cause) })),
          ),
        ),
      );

    // Every mode books under the operation's group, so `cancel` addresses them
    // all — the book is one `Set` of fibers per name. Only `latest` also
    // interrupts what is already running.
    const scheduled = (effect: Effect.Effect<unknown, unknown, unknown>) =>
      mode === "every" ? Command.keyed(group, work(effect)) : Command.restart(group, work(effect));

    // Bound or not, `start` ends up here: with `run` declared the argument is
    // its input, without it the argument is the effect itself.
    const effectOf = (input: unknown) =>
      schemas.run === undefined
        ? (input as Effect.Effect<unknown, unknown, unknown>)
        : schemas.run(input);

    const write = (state: Record<string, unknown>, slice: unknown) => ({ ...state, [key]: slice });

    const pending = (state: Record<string, unknown>) =>
      (state[key] as { readonly _tag: string } | undefined)?._tag === "Pending";

    const cancelCommand = Command.cancel(group);

    const cancel = Object.assign(
      (state: Record<string, unknown>) =>
        // The interrupt goes out either way — under `"every"` the slice can
        // read `Resolved` while a second fiber is still in flight. Only the
        // write is conditional, and skipping it returns the state by reference
        // so the fold reports "did not move".
        [pending(state) ? write(state, idle) : state, cancelCommand] as const,
      { silent: cancelCommand },
    );

    const operation = {
      field: { [key]: buildSlice(schemas.success, failure) },

      actions: [Resolved, Rejected],

      handlers: {
        [resolvedTag]: (action: { readonly value: unknown }, snapshot: { state: any }) =>
          write(snapshot.state, { _tag: "Resolved", value: action.value }),
        [rejectedTag]: (action: { readonly error: unknown }, snapshot: { state: any }) =>
          write(snapshot.state, { _tag: "Rejected", error: action.error }),
      },

      idle,

      initial: { [key]: idle },

      start: (state: Record<string, unknown>, input: unknown) => {
        // Take-first: the running fiber keeps its claim, and — crucially — the
        // state is returned by reference, so the fold reports "did not move"
        // and no re-render is scheduled.
        if (mode === "first" && pending(state)) return state;
        return [write(state, { _tag: "Pending" }), scheduled(effectOf(input))];
      },

      cancel,

      reset: (state: Record<string, unknown>) => [write(state, idle), cancelCommand],

      get: (state: Record<string, unknown>) => state[key] ?? idle,

      match: (state: Record<string, unknown>, cases: AsyncCases<unknown, unknown, unknown>) =>
        matchValue<unknown, unknown, AsyncCases<unknown, unknown, unknown>>(
          (state[key] ?? idle) as AsyncValue<unknown, unknown>,
          cases,
        ),
    };

    // An announced operation stores nothing, so the state-shaped half of the
    // surface is not merely unused — it would be a lie.
    return ch === "internal"
      ? operation
      : {
          actions: operation.actions,
          cancel: cancelCommand,
          start: (input: unknown) => scheduled(effectOf(input)),
        };
  };

const buildSlice = (success: Schema.Top, failure: Schema.Top) =>
  Schema.TaggedUnion({
    Idle: {},
    Pending: {},
    Resolved: { value: success },
    Rejected: { error: failure },
  });

/**
 * The generic form of "kick off some work, then fold what it produced".
 *
 * Declares two actions, a four-case state slice and the command that connects
 * them, from a name and the schemas of what the work yields. The name is the
 * operation's whole identity: it prefixes the action tags, lower-cases into the
 * state field, and names the fiber group `cancel` addresses.
 *
 *     const wallhavenSearch = Async("WallhavenSearch", {
 *       success: WallhavenSearchPayload,
 *       onError: Async.message,
 *       run: (params: typeof WallhavenSearchParams.Type) =>
 *         Effect.flatMap(WallhavenService, (service) => service.search(params)),
 *     })
 *
 *     const State = Schema.Struct({ colorValue: Schema.String, ...wallhavenSearch.field })
 *     const SeedAction = Action.of([ClickedSearch, ...wallhavenSearch.actions])
 *
 *     const reducer = Factory.reducer({
 *       ClickedSearch: (_action, { state }) => wallhavenSearch.start(state, state.searchParams),
 *       ...wallhavenSearch.handlers,
 *     })
 *
 *     // render
 *     wallhavenSearch.match(state, {
 *       Idle: () => null,
 *       Pending: () => "Searching…",
 *       Rejected: (rejected) => `Error: ${rejected.error}`,
 *       Resolved: (resolved) => <Results items={resolved.value.data} />,
 *     })
 *
 * `run` is what keeps the work in one place; omit it and `start` takes the
 * effect instead, for work that differs per call site.
 *
 * Every way the work can end badly is mapped to `Failure` by `onError`, defects
 * included — so a genuine bug inside the effect lands in the slice as a
 * rejection rather than reaching the `Error` lifecycle handler. Interruption is
 * the exception: cancelled work dispatches nothing at all. If you want a defect
 * and a typed failure told apart, `onError` receives the whole `Cause` and
 * `Cause.hasDies` is the question to ask.
 *
 * `Async.output` is the same operation announced rather than folded, in the
 * shape `Action` / `Action.output` already establishes.
 */
export const Async: AsyncConstructors = Object.assign(make("internal"), {
  output: make("outbound"),
  message,
  match: matchValue,
  isPending,
}) as never;
