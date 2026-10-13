import { Context, Effect, Layer, Schema } from "effect";
import { OmarchyError } from "./errors.ts";
import { commandOutput } from "./process.ts";

export { OmarchyError };

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
) {}

/**
 * The service over a way to run `omarchy-shell <args>` and get its output:
 * a child process in Node, a Tauri command in Studio.
 */
export const makeOmarchyShell = (
  run: (args: ReadonlyArray<string>) => Effect.Effect<string, OmarchyError>,
): OmarchyShellImpl => {
  const text = (args: ReadonlyArray<string>) => Effect.map(run(args), (out) => out.trim());
  const expectOk = (args: ReadonlyArray<string>) =>
    Effect.flatMap(text(args), (out) =>
      out === "ok"
        ? Effect.void
        : Effect.fail(new OmarchyError({ message: `omarchy-shell ${args.join(" ")}: ${out}` })),
    );
  return {
    listPlugins: Effect.flatMap(text(["shell", "listPlugins"]), (out) =>
      Schema.decodeUnknownEffect(Schema.fromJsonString(Schema.Array(PluginInfo)))(out).pipe(
        Effect.mapError(
          (cause) => new OmarchyError({ message: "listPlugins: unexpected output", cause }),
        ),
      ),
    ),
    setPluginEnabled: (id, enabled) => expectOk(["shell", "setPluginEnabled", id, String(enabled)]),
    rescanPlugins: Effect.asVoid(text(["shell", "rescanPlugins"])),
    toggle: (id, payload = {}) =>
      Effect.asVoid(text(["shell", "toggle", id, JSON.stringify(payload)])),
    ipc: (target, method, ...args) => text(["-q", target, method, ...args]),
  };
};

/** Runs `omarchy-shell` as a child process. */
export const OmarchyShellNode = Layer.effect(
  OmarchyShell,
  Effect.map(commandOutput("omarchy-shell"), makeOmarchyShell),
);
