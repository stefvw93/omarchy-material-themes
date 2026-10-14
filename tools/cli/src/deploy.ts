import { Hyprland } from "@stef/hyprland";
import {
  OmarchyCli,
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

/**
 * Whether the running shell already knows `id`. Its QML engine caches a
 * plugin's components by URL, so a known id keeps running the code it loaded
 * until the shell restarts; an unreachable shell knows nothing.
 */
const knownToShell = (id: string) =>
  Effect.flatMap(OmarchyShell, (shell) => shell.listPlugins).pipe(
    Effect.map((plugins) => plugins.some((plugin) => plugin.id === id)),
    Effect.orElseSucceed(() => false),
  );

const isBar = (app: PluginApp) => app.config.kinds.includes("bar");

/** The selected bar: the enabled `bar` plugin, if the shell can tell. */
const selectedBar = Effect.flatMap(OmarchyShell, (shell) => shell.listPlugins).pipe(
  Effect.map((plugins) => plugins.find((p) => p.kinds.includes("bar") && p.enabled)?.id),
  Effect.orElseSucceed(() => undefined),
);

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
 * other one is disabled, and only its hook is loaded), and enables it. When
 * the shell already knew the id, it restarts the shell so the new code runs.
 */
export const deploy = Effect.fn("Stef.deploy")(function* (app: PluginApp, variant: Variant) {
  const id = variantId(app.config.id, variant);
  const built = yield* buildPlugin(app.root, app.config, variant);
  const stale = yield* knownToShell(id);
  const target = yield* installPlugin(built, id);
  yield* Console.log(`installed ${target}`);

  const state = yield* readState;
  // A bar's dev variant replaces whichever bar is selected: remember it.
  const before = isBar(app) && variant === "dev" ? yield* selectedBar : undefined;
  const bars =
    before !== undefined && before !== id ? { ...state.bars, [app.config.id]: before } : state.bars;
  yield* writeState({
    ...state,
    active: { ...state.active, [app.config.id]: variant },
    ...(bars ? { bars } : {}),
  });
  yield* refreshHooks(app);

  yield* disableIfKnown(variantId(app.config.id, other(variant)));
  yield* enable(id);
  yield* Console.log(`enabled ${id}`);
  // A bar the shell just switched to can come up without its widgets (seen
  // on a first selection); a restart loads it with them.
  if (stale || isBar(app)) {
    yield* Effect.flatMap(OmarchyCli, (omarchy) => omarchy.restartShell);
    yield* Console.log(
      stale
        ? `restarted the shell: it had ${id}'s previous code loaded`
        : `restarted the shell: it loads the new bar with its widgets`,
    );
  }
});

/**
 * Removes the dev variant and puts prod back (if it is installed). A bar
 * puts back the bar that was selected before the dev variant instead: prod
 * only if it was the one.
 */
export const undeployDev = Effect.fn("Stef.undeployDev")(function* (app: PluginApp) {
  const devId = variantId(app.config.id, "dev");
  yield* disableIfKnown(devId);
  yield* uninstallPlugin(devId);
  const state = yield* readState;
  const { [app.config.id]: before, ...bars } = state.bars ?? {};
  yield* writeState({
    ...state,
    active: { ...state.active, [app.config.id]: "prod" },
    ...(state.bars ? { bars } : {}),
  });
  yield* refreshHooks(app);
  const back = isBar(app) ? before : app.config.id;
  if (back === undefined) {
    yield* Console.log(`removed ${devId}; the stock bar is back`);
    return;
  }
  yield* enable(back).pipe(
    Effect.catch((error) => Console.log(`${back} not enabled: ${error.message}`)),
  );
  yield* Console.log(`removed ${devId}; ${back} is live again`);
});
