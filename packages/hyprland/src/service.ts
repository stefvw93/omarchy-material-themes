import { Context, Effect, Option, Schema, Stream } from "effect";
import { type HyprEvent, parseEvent } from "./events.ts";
import { Bind, Client, Monitor, OptionValue, Workspace } from "./schema.ts";

export class HyprlandError extends Schema.TaggedError<HyprlandError>()(
  "@stef/hyprland/HyprlandError",
  { message: Schema.String, cause: Schema.optionalKey(Schema.Defect()) },
) {}

/**
 * How a runtime reaches Hyprland: a request on the command socket (what
 * `hyprctl` sends, e.g. `j/clients`), and the raw socket2 event lines. Node
 * talks to the sockets, Studio goes through Tauri, tests replay a fixture.
 */
export interface HyprlandTransport {
  readonly request: (command: string) => Effect.Effect<string, HyprlandError>;
  readonly eventLines: Stream.Stream<string, HyprlandError>;
}

export interface HyprlandImpl {
  readonly clients: Effect.Effect<ReadonlyArray<Client>, HyprlandError>;
  readonly monitors: Effect.Effect<ReadonlyArray<Monitor>, HyprlandError>;
  readonly workspaces: Effect.Effect<ReadonlyArray<Workspace>, HyprlandError>;
  readonly binds: Effect.Effect<ReadonlyArray<Bind>, HyprlandError>;
  readonly activeWindow: Effect.Effect<Option.Option<Client>, HyprlandError>;
  readonly focusedMonitor: Effect.Effect<Option.Option<Monitor>, HyprlandError>;
  readonly getOption: (name: string) => Effect.Effect<OptionValue, HyprlandError>;
  /**
   * Runs Lua in Hyprland's config state (`hyprctl eval`). Hyprland answers
   * only "ok"; to read a value back, raise it: `evalValue("type(x)")`.
   */
  readonly eval: (lua: string) => Effect.Effect<string, HyprlandError>;
  /** The value of a Lua expression, read back through `error(...)`. */
  readonly evalValue: (expression: string) => Effect.Effect<string, HyprlandError>;
  readonly reload: (options?: {
    readonly configOnly?: boolean;
  }) => Effect.Effect<void, HyprlandError>;
  readonly events: Stream.Stream<HyprEvent, HyprlandError>;
}

export class Hyprland extends Context.Service<Hyprland, HyprlandImpl>()(
  "@stef/hyprland/Hyprland",
) {}

const json = <S extends Schema.Top>(transport: HyprlandTransport, command: string, schema: S) =>
  transport.request(`j/${command}`).pipe(
    Effect.flatMap((text) =>
      Effect.try({
        try: () => JSON.parse(text) as unknown,
        catch: (cause) =>
          new HyprlandError({ message: `${command}: not JSON: ${text.slice(0, 120)}`, cause }),
      }),
    ),
    Effect.flatMap((value) =>
      Schema.decodeUnknownEffect(schema)(value).pipe(
        Effect.mapError(
          (cause) => new HyprlandError({ message: `${command}: ${cause.message}`, cause }),
        ),
      ),
    ),
  ) as Effect.Effect<S["Type"], HyprlandError>;

/** Builds the service from a transport; every runtime shares this decoding. */
export const makeHyprland = (transport: HyprlandTransport): HyprlandImpl => {
  const clients = json(transport, "clients", Schema.Array(Client));
  const monitors = json(transport, "monitors", Schema.Array(Monitor));
  const evalLua = (lua: string) => transport.request(`eval ${lua}`);
  return {
    clients,
    monitors,
    workspaces: json(transport, "workspaces", Schema.Array(Workspace)),
    binds: json(transport, "binds", Schema.Array(Bind)),
    activeWindow: transport.request("j/activewindow").pipe(
      Effect.map((text) => {
        const value = JSON.parse(text) as { address?: unknown };
        return typeof value.address === "string" ? Option.some(value) : Option.none();
      }),
      Effect.flatMap((value) =>
        Option.isNone(value)
          ? Effect.succeed(Option.none<Client>())
          : Schema.decodeUnknownEffect(Client)(value.value).pipe(
              Effect.map(Option.some),
              Effect.mapError(
                (cause) => new HyprlandError({ message: `activewindow: ${cause.message}`, cause }),
              ),
            ),
      ),
    ),
    focusedMonitor: Effect.map(monitors, (all) => Option.fromNullishOr(all.find((m) => m.focused))),
    getOption: (name) => json(transport, `getoption ${name}`, OptionValue),
    eval: evalLua,
    // `error(x)` aborts the chunk with x as the message: "[string ...]:1: x".
    evalValue: (expression) =>
      evalLua(`error(${expression})`).pipe(
        Effect.map((text) => text.replace(/^.*?:1: /s, "").trim()),
      ),
    reload: (options) =>
      transport.request(options?.configOnly ? "reload config-only" : "reload").pipe(Effect.asVoid),
    events: transport.eventLines.pipe(
      Stream.map(parseEvent),
      Stream.filter((event): event is HyprEvent => event !== undefined),
    ),
  };
};
