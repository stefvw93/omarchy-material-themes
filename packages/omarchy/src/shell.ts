import { Context, Effect, Layer, Schema, Stream } from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/process";

export class OmarchyError extends Schema.TaggedError<OmarchyError>()("@stef/omarchy/OmarchyError", {
  message: Schema.String,
  cause: Schema.optionalKey(Schema.Defect()),
}) {}

/** One entry of `omarchy-shell shell listPlugins`. */
export const PluginInfo = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  kinds: Schema.Array(Schema.String),
  enabled: Schema.Boolean,
  firstParty: Schema.Boolean,
});
export type PluginInfo = typeof PluginInfo.Type;

/**
 * The running Omarchy shell, through its IPC (`omarchy-shell`). Enabling goes
 * through the shell's own plugin registry, which persists it to shell.json.
 */
export interface OmarchyShellImpl {
  readonly listPlugins: Effect.Effect<ReadonlyArray<PluginInfo>, OmarchyError>;
  /** Fails when the shell doesn't know the id (not scanned yet: rescan first). */
  readonly setPluginEnabled: (id: string, enabled: boolean) => Effect.Effect<void, OmarchyError>;
  readonly rescanPlugins: Effect.Effect<void, OmarchyError>;
  readonly toggle: (id: string, payload?: unknown) => Effect.Effect<void, OmarchyError>;
  /** Calls a plugin's own IpcHandler: `omarchy-shell -q <target> <method> <args…>`. */
  readonly ipc: (
    target: string,
    method: string,
    ...args: ReadonlyArray<string>
  ) => Effect.Effect<string, OmarchyError>;
}

export class OmarchyShell extends Context.Service<OmarchyShell, OmarchyShellImpl>()(
  "@stef/omarchy/OmarchyShell",
) {
  /** Runs `omarchy-shell` as a child process. */
  static readonly layer = Layer.effect(
    OmarchyShell,
    Effect.gen(function* () {
      const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
      const run = (args: ReadonlyArray<string>) =>
        Effect.scoped(
          Effect.gen(function* () {
            const handle = yield* spawner.spawn(ChildProcess.make("omarchy-shell", [...args]));
            const output = yield* handle.all.pipe(Stream.decodeText(), Stream.mkString);
            const exitCode = yield* handle.exitCode;
            if (exitCode !== 0) {
              return yield* new OmarchyError({
                message: `omarchy-shell ${args.join(" ")} exited ${exitCode}: ${output.trim()}`,
              });
            }
            return output.trim();
          }),
        ).pipe(
          Effect.catchTag("PlatformError", (cause) =>
            Effect.fail(new OmarchyError({ message: `omarchy-shell ${args.join(" ")}`, cause })),
          ),
        );

      const expectOk = (args: ReadonlyArray<string>) =>
        Effect.flatMap(run(args), (out) =>
          out === "ok"
            ? Effect.void
            : Effect.fail(new OmarchyError({ message: `omarchy-shell ${args.join(" ")}: ${out}` })),
        );

      return {
        listPlugins: Effect.flatMap(run(["shell", "listPlugins"]), (out) =>
          Schema.decodeUnknownEffect(Schema.fromJsonString(Schema.Array(PluginInfo)))(out).pipe(
            Effect.mapError(
              (cause) => new OmarchyError({ message: "listPlugins: unexpected output", cause }),
            ),
          ),
        ),
        setPluginEnabled: (id, enabled) =>
          expectOk(["shell", "setPluginEnabled", id, String(enabled)]),
        rescanPlugins: Effect.asVoid(run(["shell", "rescanPlugins"])),
        toggle: (id, payload = {}) =>
          Effect.asVoid(run(["shell", "toggle", id, JSON.stringify(payload)])),
        ipc: (target, method, ...args) => run(["-q", target, method, ...args]),
      } satisfies OmarchyShellImpl;
    }),
  );
}
