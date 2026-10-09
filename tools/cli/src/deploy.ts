import { Hyprland } from "@stef/hyprland";
import {
  OmarchyShell,
  installPlugin,
  readState,
  uninstallPlugin,
  type Variant,
  variantId,
  writeHooksFile,
  writeState,
} from "@stef/omarchy";
import { buildPlugin } from "@stef/plugin-kit";
import { Console, Effect, Schedule } from "effect";
import type { PluginApp } from "./workspace.ts";

const other = (variant: Variant): Variant => (variant === "dev" ? "prod" : "dev");

/**
 * Enables `id` in the shell. The shell picks a new folder up through inotify,
 * asynchronously, so a fresh install may still be "unknown" for a moment.
 */
const enable = (id: string) =>
  Effect.gen(function* () {
    const shell = yield* OmarchyShell;
    yield* shell.rescanPlugins;
    yield* shell
      .setPluginEnabled(id, true)
      .pipe(Effect.retry({ schedule: Schedule.spaced("250 millis"), times: 20 }));
  });

/** Disables `id` if the shell knows it; an id that isn't installed is fine. */
const disableIfKnown = (id: string) =>
  Effect.flatMap(OmarchyShell, (shell) => shell.setPluginEnabled(id, false).pipe(Effect.ignore));

/** Regenerates plugins.lua; reloads Hyprland's config when the app has a hook. */
const refreshHooks = (app: PluginApp) =>
  Effect.gen(function* () {
    const { file, hooks } = yield* writeHooksFile;
    if (app.config.hyprHook === undefined) return;
    yield* Console.log(`hooks: ${file} loads ${hooks} hook(s)`);
    yield* Effect.flatMap(Hyprland, (h) => h.reload({ configOnly: true }));
  });

/**
 * Builds `variant` of the app, installs it, makes it the live variant (the
 * other one is disabled, and only its hook is loaded), and enables it.
 */
export const deploy = Effect.fn("Stef.deploy")(function* (app: PluginApp, variant: Variant) {
  const id = variantId(app.config.id, variant);
  const built = yield* buildPlugin(app.root, app.config, variant);
  const target = yield* installPlugin(built, id);
  yield* Console.log(`installed ${target}`);

  const state = yield* readState;
  yield* writeState({ active: { ...state.active, [app.config.id]: variant } });
  yield* refreshHooks(app);

  yield* disableIfKnown(variantId(app.config.id, other(variant)));
  yield* enable(id);
  yield* Console.log(`enabled ${id}`);
});

/** Removes the dev variant and puts prod back (if it is installed). */
export const undeployDev = Effect.fn("Stef.undeployDev")(function* (app: PluginApp) {
  const devId = variantId(app.config.id, "dev");
  yield* disableIfKnown(devId);
  yield* uninstallPlugin(devId);
  const state = yield* readState;
  yield* writeState({ active: { ...state.active, [app.config.id]: "prod" } });
  yield* refreshHooks(app);
  yield* enable(app.config.id).pipe(
    Effect.catch((error) => Console.log(`prod ${app.config.id} not enabled: ${error.message}`)),
  );
  yield* Console.log(`removed ${devId}; ${app.config.id} is live again`);
});
