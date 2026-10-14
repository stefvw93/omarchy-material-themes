import { Context, Effect, Layer } from "effect";
import type { OmarchyError } from "./errors.ts";
import { commandOutput } from "./process.ts";

/** Omarchy's own command line (`omarchy …`), as far as the tooling needs it. */
export interface OmarchyCliImpl {
  /** `omarchy theme set <name>`: applies an installed theme. */
  readonly setTheme: (name: string) => Effect.Effect<void, OmarchyError>;
  /**
   * `omarchy restart shell`: a fresh shell process. The only way a redeployed
   * plugin runs its new code: the QML engine caches components by URL.
   */
  readonly restartShell: Effect.Effect<void, OmarchyError>;
}

export class OmarchyCli extends Context.Service<OmarchyCli, OmarchyCliImpl>()(
  "@stef/omarchy/OmarchyCli",
) {}

/** Runs `omarchy` as a child process. */
export const OmarchyCliNode = Layer.effect(
  OmarchyCli,
  Effect.map(commandOutput("omarchy"), (run) =>
    OmarchyCli.of({
      setTheme: (name) => Effect.asVoid(run(["theme", "set", name])),
      restartShell: Effect.asVoid(run(["restart", "shell"])),
    }),
  ),
);
