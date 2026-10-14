import { homeDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/core";
import {
  makeOmarchyShell,
  OmarchyCli,
  OmarchyError,
  OmarchyPaths,
  OmarchyShell,
} from "@stef/omarchy";
import { Effect, Layer } from "effect";

/** The shell's IPC through the Rust omarchy_shell command. */
export const OmarchyShellTauri = Layer.succeed(
  OmarchyShell,
  makeOmarchyShell((args) =>
    Effect.tryPromise({
      try: () => invoke<string>("omarchy_shell", { args }),
      catch: (cause) => new OmarchyError({ message: `omarchy-shell ${args.join(" ")}`, cause }),
    }),
  ),
);

/** Omarchy's paths under the user's real home directory. */
export const OmarchyPathsTauri = Layer.effect(
  OmarchyPaths,
  Effect.flatMap(Effect.promise(homeDir), OmarchyPaths.make),
);

/** `omarchy theme set` through the Rust set_theme command. */
export const OmarchyCliTauri = Layer.succeed(
  OmarchyCli,
  OmarchyCli.of({
    setTheme: (name) =>
      Effect.tryPromise({
        try: () => invoke<void>("set_theme", { name }),
        catch: (cause) => new OmarchyError({ message: `omarchy theme set ${name}`, cause }),
      }),
    // Studio doesn't deploy plugins, so it has no Rust command for this.
    restartShell: Effect.fail(
      new OmarchyError({ message: "omarchy restart shell: not available in Studio" }),
    ),
  }),
);
