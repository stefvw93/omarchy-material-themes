import { homeDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/core";
import { makeOmarchyShell, OmarchyError, OmarchyPaths, OmarchyShell } from "@stef/omarchy";
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
