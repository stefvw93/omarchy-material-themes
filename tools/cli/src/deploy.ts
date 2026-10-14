import { Hyprland } from "@stef/hyprland";
import {
  OmarchyCli,
  OmarchyError,
  OmarchyShell,
  installPlugin,
  readState,
  uninstallPlugin,
  type Variant,
  variantId,
  writeHooksFile,
  writeState,
} from "@stef/omarchy";
import { buildPlugin, checkEngineTests, checkQml } from "@stef/plugin-kit";
import { Console, Effect, FileSystem, Path, Schedule, Schema } from "effect";
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

/**
 * A clone of the stock lock replaces it outright: if the clone doesn't load,
 * nothing answers `omarchy-shell lock lock`, and idle, the keybind and sleep
 * silently stop locking. So its deploy is only done once the lock answers.
 */
const replacesLock = (app: PluginApp) => app.config.omarchy?.clonedFrom === "omarchy.lock";

const LockStatus = Schema.fromJsonString(Schema.Struct({ passwordPam: Schema.Boolean }));

/**
 * Waits until `id` is the enabled lock (the stock one disabled) and the
 * `lock` IPC target answers with a configured password PAM.
 */
const lockAnswers = (id: string) =>
  Effect.gen(function* () {
    const shell = yield* OmarchyShell;
    const plugins = yield* shell.listPlugins;
    const enabled = (pid: string) => plugins.find((p) => p.id === pid)?.enabled === true;
    if (!enabled(id) || enabled("omarchy.lock")) {
      return yield* Effect.fail(`${id} is not the enabled lock`);
    }
    const status = yield* Schema.decodeUnknownEffect(LockStatus)(
      yield* shell.query("lock", "status"),
    );
    if (!status.passwordPam) return yield* Effect.fail("the lock has no password PAM");
  }).pipe(
    Effect.retry({ schedule: Schedule.spaced("500 millis"), times: 30 }),
    Effect.mapError((error) => (typeof error === "string" ? error : error.message)),
  );

/**
 * Puts the stock lock back: disabling the clone restores `omarchy.lock`
 * (the shell's cloneSourceRestores), and a restart drops any loaded code.
 */
const restoreStockLock = (id: string) =>
  Effect.gen(function* () {
    yield* disableIfKnown(id);
    yield* Effect.flatMap(OmarchyCli, (omarchy) => omarchy.restartShell).pipe(Effect.ignore);
  });

/**
 * Installs the app's `bin/stef-lock-rescue` to ~/.local/bin, so it can be run
 * from a TTY when the lock is stuck.
 */
const installRescue = (app: PluginApp) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const home = process.env["HOME"] ?? "";
    const bin = path.join(home, ".local/bin");
    yield* fs.makeDirectory(bin, { recursive: true });
    const target = path.join(bin, "stef-lock-rescue");
    yield* fs.copyFile(path.join(app.root, "bin/stef-lock-rescue"), target);
    yield* fs.chmod(target, 0o755);
    return target;
  });

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
  // A lock that doesn't compile leaves the session unlockable-by-nothing:
  // it only goes in once it lints and compiles in Quickshell's engine.
  if (replacesLock(app)) {
    yield* checkQml(app.root, built, app.config.qmllintSkip);
    yield* checkEngineTests(app.root, built);
    yield* Console.log("lock compiles: qml and engine tests ok");
  }
  const stale = yield* knownToShell(id);
  const target = yield* installPlugin(built, id);
  yield* Console.log(`installed ${target}`);
  if (replacesLock(app)) yield* Console.log(`installed ${yield* installRescue(app)}`);

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
  // on a first selection); a restart loads it with them. A lock clone enabled
  // live doesn't get the `lock` IPC target: the stock lock registered it
  // first, and Quickshell keeps the first handler. A restart loads only the clone.
  if (stale || isBar(app) || replacesLock(app)) {
    yield* Effect.flatMap(OmarchyCli, (omarchy) => omarchy.restartShell);
    yield* Console.log(
      stale
        ? `restarted the shell: it had ${id}'s previous code loaded`
        : isBar(app)
          ? `restarted the shell: it loads the new bar with its widgets`
          : `restarted the shell: only ${id} answers as the lock`,
    );
  }
  if (replacesLock(app)) {
    const answered = yield* Effect.result(lockAnswers(id));
    if (answered._tag === "Failure") {
      yield* restoreStockLock(id);
      return yield* Effect.fail(
        new OmarchyError({
          message: `${id} did not take over the lock (${answered.failure}); the stock lock is back`,
        }),
      );
    }
    yield* Console.log(
      `${id} answers as the lock; if it ever gets stuck, run stef-lock-rescue from a TTY`,
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
