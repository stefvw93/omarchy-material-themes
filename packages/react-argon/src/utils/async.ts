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
 * The shape `start` and the handlers need of the surrounding state: whatever
 * else the feature holds, plus this operation's slice under its own key. Stated
 * as a constraint rather than a concrete type, so both stay generic in the
 * feature's `State` and return it unchanged.
 */
export type AsyncState<Key extends string, Success, Failure> = {
  readonly [K in Key]: AsyncValue<Success, Failure>;
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
 * `` `${Key}Resolved` `` is `` `${string}Resolved` ``, which does not satisfy
 * `Capitalize<string>` — the capitalisation is known of the *prefix*, not of
 * the whole. Applying `Capitalize` to the joined string restores it, and also
 * lifts a lower-case state key into a well-formed tag: `"search"` → `"SearchResolved"`.
 */
export type ResolvedTag<Key extends string> = Capitalize<`${Key}Resolved`>;
export type RejectedTag<Key extends string> = Capitalize<`${Key}Rejected`>;

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
export type AsyncAction<Key extends string, Success, Failure> =
  | { readonly _tag: ResolvedTag<Key>; readonly value: Success }
  | { readonly _tag: RejectedTag<Key>; readonly error: Failure };

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
 * cares can tell `Cause.isDie` from a typed failure — a programming bug and a
 * 404 usually deserve different things in the UI.
 */
export type AsyncOnError<Failure> = (cause: Cause.Cause<unknown>) => Failure;

/** The default pairing for a `Schema.String` failure: the message, nothing else. */
const message: AsyncOnError<string> = (cause) => {
  const error: unknown = Cause.squash(cause);
  return error instanceof Error ? error.message : String(error);
};

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
export type AsyncHandlers<Key extends string, Success, Failure> = {
  readonly [K in ResolvedTag<Key>]: <State extends AsyncState<Key, Success, Failure>>(
    action: { readonly _tag: K; readonly value: Success },
    snapshot: { readonly state: State },
  ) => State;
} & {
  readonly [K in RejectedTag<Key>]: <State extends AsyncState<Key, Success, Failure>>(
    action: { readonly _tag: K; readonly error: Failure },
    snapshot: { readonly state: State },
  ) => State;
};

// ---------------------------------------------------------------------------
// The two variants
// ---------------------------------------------------------------------------

/**
 * An operation the feature folds itself.
 */
export interface AsyncOperation<
  Key extends string,
  Success extends Schema.Top,
  Failure extends Schema.Top,
> {
  /**
   * The state field, already under its key — spread into the feature's state:
   *
   *     const State = Schema.Struct({ colorValue: Schema.String, ...search.field })
   *
   * Naming the key at construction is what removes the second binding step: the
   * handlers below already know where to write, so nothing downstream has to be
   * told the key again, or handed the state schema to infer it from.
   */
  readonly field: { readonly [K in Key]: AsyncSlice<Success, Failure> };

  /** Spread into `Action.of([...])` alongside the feature's own actions. */
  readonly actions: readonly [
    AsyncMessage<ResolvedTag<Key>, { readonly value: Success }, "internal">,
    AsyncMessage<RejectedTag<Key>, { readonly error: Failure }, "internal">,
  ];

  /** Spread into the reducer. */
  readonly handlers: AsyncHandlers<Key, Success["Type"], Failure["Type"]>;

  /** The initial value for the field, for `Factory.initialState`. */
  readonly idle: AsyncValue<Success["Type"], Failure["Type"]>;

  /**
   * Write `Pending` and issue the work, as one `Next`.
   *
   * Returned from the *triggering* action's handler, which is what keeps the
   * effect's `R` visible to `ServicesOf` — the services a command needs are
   * read off the reducer's return types, and this is a reducer return.
   */
  readonly start: <
    State extends AsyncState<Key, Success["Type"], Failure["Type"]>,
    A extends Success["Type"],
    E,
    R,
  >(
    state: State,
    effect: Effect.Effect<A, E, R>,
  ) => Next<State, AsyncAction<Key, Success["Type"], Failure["Type"]>, R>;

  /** Interrupt the work without touching the state. */
  readonly cancel: Command<AsyncAction<Key, Success["Type"], Failure["Type"]>>;

  /** Back to `Idle`, cancelling anything in flight. */
  readonly reset: <State extends AsyncState<Key, Success["Type"], Failure["Type"]>>(
    state: State,
  ) => Next<State, AsyncAction<Key, Success["Type"], Failure["Type"]>, never>;

  /** The slice out of the whole state, for `render`. */
  readonly get: <State extends AsyncState<Key, Success["Type"], Failure["Type"]>>(
    state: State,
  ) => AsyncValue<Success["Type"], Failure["Type"]>;
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
 *     ClickedSearch: (_action, { state }) => [state, search.start(effect)]
 */
export interface AsyncAnnouncement<
  Key extends string,
  Success extends Schema.Top,
  Failure extends Schema.Top,
> {
  /** Spread into `Action.of([...])` on the outbound channel, then passed as `output`. */
  readonly actions: readonly [
    AsyncMessage<ResolvedTag<Key>, { readonly value: Success }, "outbound">,
    AsyncMessage<RejectedTag<Key>, { readonly error: Failure }, "outbound">,
  ];

  readonly start: <A extends Success["Type"], E, R>(
    effect: Effect.Effect<A, E, R>,
  ) => Command<AsyncAction<Key, Success["Type"], Failure["Type"]>, R>;

  readonly cancel: Command<AsyncAction<Key, Success["Type"], Failure["Type"]>>;
}

// ---------------------------------------------------------------------------
// Declaration
// ---------------------------------------------------------------------------

/**
 * `onError` is mandatory in both forms. The `Schema.String` default exists to
 * spare you a schema, not to spare you the decision — `Async.message` is the
 * mapping that pairs with it, spelled out at the call site so a defect quietly
 * becoming `"[object Object]"` is something you chose.
 */
export interface AsyncConstructor<Ch extends "internal" | "outbound", Mode extends string> {
  <const Key extends string, Success extends Schema.Top>(
    key: Key,
    schemas: {
      readonly success: Success;
      readonly onError: AsyncOnError<string>;
      readonly mode?: Mode;
    },
  ): Ch extends "internal"
    ? AsyncOperation<Key, Success, Schema.String>
    : AsyncAnnouncement<Key, Success, Schema.String>;

  <const Key extends string, Success extends Schema.Top, Failure extends Schema.Top>(
    key: Key,
    schemas: {
      readonly success: Success;
      readonly failure: Failure;
      readonly onError: AsyncOnError<Failure["Type"]>;
      readonly mode?: Mode;
    },
  ): Ch extends "internal"
    ? AsyncOperation<Key, Success, Failure>
    : AsyncAnnouncement<Key, Success, Failure>;
}

export interface AsyncConstructors extends AsyncConstructor<"internal", AsyncMode> {
  /** Announced, never folded. The `Action` / `Action.output` split, for async work. */
  readonly output: AsyncConstructor<"outbound", AsyncOutputMode>;

  /** `Cause` → its message. The mapping that pairs with the default `Schema.String` failure. */
  readonly message: AsyncOnError<string>;
}

const make = (ch: "internal" | "outbound") =>
  function async(
    key: string,
    schemas: {
      readonly success: Schema.Top;
      readonly failure?: Schema.Top;
      readonly onError: AsyncOnError<unknown>;
      readonly mode?: AsyncMode;
    },
  ) {
    const name = (key.charAt(0).toUpperCase() + key.slice(1)) as Capitalize<string>;
    const resolvedTag = `${name}Resolved` as Capitalize<string>;
    const rejectedTag = `${name}Rejected` as Capitalize<string>;
    const failure = schemas.failure ?? Schema.String;
    const mode = schemas.mode ?? "latest";

    const message_ = ch === "internal" ? Action : Action.output;
    const Resolved = message_(resolvedTag, { value: schemas.success });
    const Rejected = message_(rejectedTag, { error: failure });

    // Total: `catchCause` covers typed failures and defects alike, so nothing
    // escapes into the `Error` lifecycle and the command's own error channel is
    // `never` — which is what `Command.effect` requires anyway.
    const work = (effect: Effect.Effect<unknown, unknown, unknown>) =>
      Command.effect<any, unknown>((dispatch) =>
        effect.pipe(
          Effect.flatMap((value) => dispatch((Resolved as any).make({ value }))),
          Effect.catchCause((cause) =>
            dispatch((Rejected as any).make({ error: schemas.onError(cause) })),
          ),
        ),
      );

    // Both non-`every` modes book under the operation's name so `cancel` can
    // address them; only `latest` interrupts what is already running.
    const scheduled = (effect: Effect.Effect<unknown, unknown, unknown>) =>
      mode === "every" ? Command.keyed(name, work(effect)) : Command.restart(name, work(effect));

    const write = (state: Record<string, unknown>, slice: unknown) => ({ ...state, [key]: slice });

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

      start: (state: Record<string, unknown>, effect: Effect.Effect<unknown, unknown, unknown>) => {
        // Take-first: the running fiber keeps its claim, and — crucially — the
        // state is returned by reference, so the fold reports "did not move"
        // and no re-render is scheduled.
        const slice = state[key] as { readonly _tag: string } | undefined;
        if (mode === "first" && slice?._tag === "Pending") return state;
        return [write(state, { _tag: "Pending" }), scheduled(effect)];
      },

      cancel: Command.cancel(name),

      reset: (state: Record<string, unknown>) => [write(state, idle), Command.cancel(name)],

      get: (state: Record<string, unknown>) => state[key] ?? idle,
    };

    // An announced operation stores nothing, so the state-shaped half of the
    // surface is not merely unused — it would be a lie.
    return ch === "internal"
      ? operation
      : { actions: operation.actions, cancel: operation.cancel, start: scheduled };
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
 * them, from a state key and the schemas of what the work yields. The key is
 * the operation's whole identity: it names the state field, capitalises into
 * the action tags, and names the fiber group `cancel` addresses.
 *
 *     const search = Async("search", {
 *       success: WallhavenSearchPayload,
 *       onError: Async.message,
 *     })
 *
 *     const State = Schema.Struct({ colorValue: Schema.String, ...search.field })
 *     const SeedAction = Action.of([ClickedSearch, ...search.actions])
 *
 *     const reducer = Factory.reducer({
 *       ClickedSearch: (_action, { state }) =>
 *         search.start(state, Effect.gen(function* () {
 *           return yield* (yield* WallhavenService).search({})
 *         })),
 *       ...search.handlers,
 *     })
 *
 * Every way the work can end is mapped to `Failure` by `onError`, defects
 * included — so a genuine bug inside the effect lands in the slice as a
 * rejection rather than reaching the `Error` lifecycle handler. If you want the
 * two told apart, `onError` receives the whole `Cause` and `Cause.isDie` is
 * the question to ask.
 *
 * `Async.output` is the same operation announced rather than folded, in the
 * shape `Action` / `Action.output` already establishes.
 */
export const Async: AsyncConstructors = Object.assign(make("internal"), {
  output: make("outbound"),
  message,
}) as never;
