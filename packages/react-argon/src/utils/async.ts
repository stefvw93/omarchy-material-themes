import { Cause, Effect, Schema } from "effect";
import { Action, Command, type Message } from "../lib";

// ---------------------------------------------------------------------------
// Layer 1 — the vocabulary
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
 *
 * Nothing in this layer knows an operation exists. The type, its constructors
 * and its match are usable against a slice you wrote by hand, filled from work
 * that never went through `Async` at all.
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

const buildSlice = (success: Schema.Top, failure: Schema.Top = Schema.String) =>
  Schema.TaggedUnion({
    Idle: {},
    Pending: {},
    Resolved: { value: success },
    Rejected: { error: failure },
  });

const idle: { readonly _tag: "Idle" } = Object.freeze({ _tag: "Idle" as const });
const pendingValue: { readonly _tag: "Pending" } = Object.freeze({ _tag: "Pending" as const });

/**
 * The fields of a state that hold an `AsyncValue` — the only ones `Async.start`
 * will write `Pending` into.
 *
 * `AsyncValue<any, any>` rather than `AsyncValue<unknown, unknown>`: a slice of
 * `Resolved { value: Photo[] }` is not assignable to one of `value: unknown`
 * under the readonly property, and `any` is the escape that keeps every slice
 * matching regardless of what it carries. `-?` strips optionality, so a slice
 * declared `Schema.optional` is still addressable.
 */
type AsyncKeys<State> = {
  [Key in keyof State]-?: State[Key] extends AsyncValue<any, any> ? Key : never;
}[keyof State];

const start = <State, Key extends AsyncKeys<State>, Action, R>(
  state: State,
  key: Key,
  command: Command<Action, R>,
): readonly [State, Command<Action, R>] => [{ ...state, [key]: pendingValue }, command];

const resolved = <Success>(
  value: Success,
): { readonly _tag: "Resolved"; readonly value: Success } => ({ _tag: "Resolved", value });

const rejected = <Failure>(
  error: Failure,
): { readonly _tag: "Rejected"; readonly error: Failure } => ({ _tag: "Rejected", error });

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
// Layer 2 — the operation's vocabulary
// ---------------------------------------------------------------------------

/**
 * The `_tag` a `TaggedStruct` demonstrably has, stated rather than derived.
 *
 * `Action.of` wants `AnyMessage`, whose `Type` must carry a `_tag`, and a
 * generically-fielded `Message` cannot show one — `Struct<F>["Type"]` will not
 * reduce while `F` is a type parameter. The intersection hands TypeScript the
 * proof it cannot compute, so a generated action spreads into `Action.of([...])`
 * alongside hand-written ones.
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
 * What the command emits, and the whole of what the operation contributes to
 * the feature's fold.
 *
 * There is no `Pending` member, and there is no handler for these two either —
 * the reducer writes the slice itself. `Pending` belongs on the same fold that
 * issued the command, so the button that triggered the work is already disabled
 * when the click handler returns; a dispatched `Pending` would paint a microtask
 * later, which is exactly long enough to double-submit.
 */
export type AsyncAction<Name extends string, Success, Failure> =
  | { readonly _tag: ResolvedTag<Name>; readonly value: Success }
  | { readonly _tag: RejectedTag<Name>; readonly error: Failure };

// ---------------------------------------------------------------------------
// Concurrency
// ---------------------------------------------------------------------------

/**
 * What a second `run` does while the first is still in flight.
 *
 * A property of the operation, not of the call site, so it is declared once
 * where the operation is: a search is take-latest wherever it is triggered from.
 *
 * Take-*first* is absent, and deliberately so: dropping a start means reading
 * whether one is already pending, which is a question about the feature's state
 * — the one thing this layer does not touch. It is a guard in the handler that
 * has the state in hand:
 *
 *     ClickedSubmit: (_action, { state }) =>
 *       Async.isPending(state.submit)
 *         ? state
 *         : [{ ...state, submit: Async.pending }, submit.run(state.form)],
 */
export type AsyncMode =
  /** Interrupt the running fiber, run the new one. The default, and what search wants. */
  | "latest"
  /** Run both. Last to settle wins, which is usually a bug — declare it deliberately. */
  | "every";

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
// The operation
// ---------------------------------------------------------------------------

/**
 * Two actions and the command that produces them. That is the whole surface.
 *
 * What it deliberately does not have: a state field, an initial value, reducer
 * entries, or a `start` that writes into state on your behalf. The operation
 * owns the *work* — scheduling it, interrupting it, turning however it ended
 * into one of two actions. Where the result lands is the feature's business,
 * and the feature's reducer is already total over the action union, so writing
 * those two entries by hand costs two lines and cannot be forgotten:
 *
 *     SearchResolved: (action, { state }) => ({ ...state, search: Async.resolved(action.value) }),
 *     SearchRejected: (action, { state }) => ({ ...state, search: Async.rejected(action.error) }),
 *
 * That is also the extension point the injected version did not have: a handler
 * that wants to derive something else from the result — select the first item,
 * clear a filter — writes it in the same entry, instead of colliding with a
 * spread-in handler for the same tag.
 *
 * Internal and announced operations are the same shape. The only difference is
 * the channel the two actions are declared on, which is what `Async.output`
 * changes — an announced operation was never anything but these three members.
 */
export interface AsyncOperation<
  Name extends string,
  Success extends Schema.Top,
  Failure extends Schema.Top,
  Input = never,
  R = never,
  Ch extends "internal" | "outbound" = "internal",
> {
  /**
   * Spread into `Action.of([...])` alongside the feature's own actions — or,
   * for `Async.output`, into the vocabulary passed as `output`.
   */
  readonly actions: readonly [
    AsyncMessage<ResolvedTag<Name>, { readonly value: Success }, Ch>,
    AsyncMessage<RejectedTag<Name>, { readonly error: Failure }, Ch>,
  ];

  /**
   * Issue the work, as a `Command`. Pair it with whatever state the handler
   * wants — which is where the `Pending` write goes:
   *
   *     ClickedSearch: (_action, { state }) =>
   *       [{ ...state, search: Async.pending }, search.run(state.searchParams)]
   *
   * Returned from the *triggering* action's handler, which is what keeps the
   * effect's `R` visible to `ServicesOf` — the services a command needs are
   * read off the reducer's return types, and this is part of a reducer return.
   *
   * `Input` is `never` unless the operation declared `run`, and it is what picks
   * this signature: bound operations take the argument, unbound ones take the
   * effect.
   */
  readonly run: [Input] extends [never]
    ? <A extends Success["Type"], E, R2>(
        effect: Effect.Effect<A, E, R2>,
      ) => Command<AsyncAction<Name, Success["Type"], Failure["Type"]>, R2>
    : (input: Input) => Command<AsyncAction<Name, Success["Type"], Failure["Type"]>, R>;

  /**
   * Interrupt whatever this operation has in flight. Nothing is written — a
   * cancelled operation left `Pending` is a permanently disabled button, so
   * clear the slice in the same return:
   *
   *     ClickedCancel: (_action, { state }) => [{ ...state, search: Async.idle }, search.cancel]
   */
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
 * the operation's `run` takes the effect, for work that genuinely differs per
 * call site.
 */
export interface AsyncConstructor<Ch extends "internal" | "outbound"> {
  <const Name extends Capitalize<string>, Success extends Schema.Top, Input = never, R = never>(
    name: Name,
    schemas: {
      readonly success: Success;
      readonly onError: AsyncOnError<string>;
      readonly mode?: AsyncMode;
      readonly run?: (input: Input) => Effect.Effect<Success["Type"], unknown, R>;
    },
  ): AsyncOperation<Name, Success, Schema.String, Input, R, Ch>;

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
      readonly mode?: AsyncMode;
      readonly run?: (input: Input) => Effect.Effect<Success["Type"], unknown, R>;
    },
  ): AsyncOperation<Name, Success, Failure, Input, R, Ch>;
}

export interface AsyncConstructors extends AsyncConstructor<"internal"> {
  /** Announced, never folded. The `Action` / `Action.output` split, for async work. */
  readonly output: AsyncConstructor<"outbound">;

  /**
   * The state field, for the feature's `State` — under whatever name the
   * feature wants to read it back by:
   *
   *     const State = Schema.Struct({ search: Async.slice(WallhavenSearchPayload) })
   *
   * The failure defaults to `Schema.String`, to pair with the default `onError`.
   * Nothing connects this to an operation but the handlers you write, which is
   * the point: the slice is declarable before the operation exists, and an
   * operation is declarable for a feature that stores nothing.
   */
  readonly slice: {
    <Success extends Schema.Top>(success: Success): AsyncSlice<Success, Schema.String>;
    <Success extends Schema.Top, Failure extends Schema.Top>(
      success: Success,
      failure: Failure,
    ): AsyncSlice<Success, Failure>;
  };

  /** The initial value for a slice, for `FeatureDefinition.initialState`. */
  readonly idle: { readonly _tag: "Idle" };

  /** Written on the fold that issues the command, not dispatched a tick later. */
  readonly pending: { readonly _tag: "Pending" };

  /**
   * `Pending` and the command, as the one return the handler owes:
   *
   *     ClickedSearch: (_action, { state }) =>
   *       Async.start(state, "search", wallhavenSearch.run(state.searchParams))
   *
   * The same two lines the long form writes, in an order that cannot come apart
   * — `run` without a slice write is the failure this exists to make
   * unspellable, and it is silent when it happens: the work runs, the result
   * lands, and the interval in between renders as whatever the slice held
   * before. `Idle` renders nothing, so the loading state simply never appears.
   *
   * `key` is constrained to the state's own async slices, so a typo or a
   * renamed field is a compile error rather than a slice that stays `Idle`.
   * Reach for the tuple directly when the fold writes something other than
   * `Pending` — a take-first guard, or a slice cleared rather than started.
   */
  readonly start: <State, Key extends AsyncKeys<State>, Action, R>(
    state: State,
    key: Key,
    command: Command<Action, R>,
  ) => readonly [State, Command<Action, R>];

  /** For the `Resolved` handler: `{ ...state, search: Async.resolved(action.value) }`. */
  readonly resolved: <Success>(value: Success) => {
    readonly _tag: "Resolved";
    readonly value: Success;
  };

  /** For the `Rejected` handler: `{ ...state, search: Async.rejected(action.error) }`. */
  readonly rejected: <Failure>(error: Failure) => {
    readonly _tag: "Rejected";
    readonly error: Failure;
  };

  /** `Cause` → its message. The mapping that pairs with the default `Schema.String` failure. */
  readonly message: AsyncOnError<string>;

  /** The four arms, over a slice you hold. Total: a missing arm does not compile. */
  readonly match: <Success, Failure, Cases extends AsyncCases<Success, Failure, unknown>>(
    value: AsyncValue<Success, Failure>,
    cases: Cases,
  ) => AsyncMatched<Cases>;

  /** For the `disabled={…}` case, and for a take-first guard, which do not want four arms. */
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

    // Both modes book under the operation's group, so `cancel` addresses them
    // all — the book is one `Set` of fibers per name. Only `latest` also
    // interrupts what is already running.
    const scheduled = (effect: Effect.Effect<unknown, unknown, unknown>) =>
      mode === "every" ? Command.keyed(group, work(effect)) : Command.restart(group, work(effect));

    // Bound or not, `run` ends up here: with the config's `run` declared the
    // argument is its input, without it the argument is the effect itself.
    const effectOf = (input: unknown) =>
      schemas.run === undefined
        ? (input as Effect.Effect<unknown, unknown, unknown>)
        : schemas.run(input);

    return {
      actions: [Resolved, Rejected],
      run: (input: unknown) => scheduled(effectOf(input)),
      cancel: Command.cancel(group),
    };
  };

/**
 * The generic form of "kick off some work, then fold what it produced" — the
 * *work* half of it.
 *
 * Declares two actions and the command that produces them, from a name and the
 * schemas of what the work yields. The name prefixes the action tags and names
 * the fiber group `cancel` addresses. The state half is `Async.slice` plus four
 * lines of your own reducer, which is where it stays: this layer never writes
 * into your state, so where a result lands is visible in the file that owns it.
 *
 *     const wallhavenSearch = Async("WallhavenSearch", {
 *       success: WallhavenSearchPayload,
 *       onError: Async.message,
 *       run: (params: typeof WallhavenSearchParams.Type) =>
 *         Effect.flatMap(WallhavenService, (service) => service.search(params)),
 *     })
 *
 *     const State = Schema.Struct({ search: Async.slice(WallhavenSearchPayload) })
 *     const SeedAction = Action.of([ClickedSearch, ...wallhavenSearch.actions])
 *
 *     const initialState = FeatureDefinition.initialState(() => ({ search: Async.idle }))
 *
 *     const reducer = FeatureDefinition.reducer({
 *       ClickedSearch: (_action, { state }) =>
 *         [{ ...state, search: Async.pending }, wallhavenSearch.run(state.searchParams)],
 *       WallhavenSearchResolved: (action, { state }) =>
 *         ({ ...state, search: Async.resolved(action.value) }),
 *       WallhavenSearchRejected: (action, { state }) =>
 *         ({ ...state, search: Async.rejected(action.error) }),
 *     })
 *
 *     // render
 *     Async.match(state.search, {
 *       Idle: () => null,
 *       Pending: () => "Searching…",
 *       Rejected: (rejected) => `Error: ${rejected.error}`,
 *       Resolved: (resolved) => <Results items={resolved.value.data} />,
 *     })
 *
 * `run` in the config is what keeps the work in one place; omit it and the
 * operation's `run` takes the effect instead, for work that differs per call
 * site.
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
  slice: buildSlice,
  idle,
  pending: pendingValue,
  start,
  resolved,
  rejected,
  message,
  match: matchValue,
  isPending,
}) as never;
