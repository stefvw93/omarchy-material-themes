import { Hyprland } from "@stef/hyprland";
import { installPlugin, variantId } from "@stef/omarchy";
import { buildPlugin } from "@stef/plugin-kit";
import { Console, Effect, FileSystem, Path, Stream } from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import { deploy, undeployDev } from "./deploy.ts";
import { type PluginApp, repoRoot } from "./workspace.ts";

/** Everything a plugin build reads: the app's sources and the shared packages. */
const changes = (app: PluginApp) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* repoRoot;
    const candidates = [
      path.join(app.root, "src"),
      path.join(app.root, app.config.qml ?? "qml"),
      ...(app.config.hyprHook ? [path.join(app.root, path.dirname(app.config.hyprHook))] : []),
      ...["qml-kit", "tokens", "motion", "effect-platform-qml"].map((p) =>
        path.join(root, "packages", p, p === "qml-kit" ? "" : "src"),
      ),
    ];
    const watched: string[] = [];
    for (const dir of candidates) if (yield* fs.exists(dir)) watched.push(dir);
    return Stream.mergeAll(
      watched.map((dir) => fs.watch(dir, { recursive: true })),
      { concurrency: "unbounded" },
    ).pipe(Stream.debounce("300 millis"));
  });

const rebuildDev = (app: PluginApp) =>
  Effect.gen(function* () {
    const id = variantId(app.config.id, "dev");
    const started = Date.now();
    const built = yield* buildPlugin(app.root, app.config, "dev");
    yield* installPlugin(built, id);
    // A new hook only takes effect when Hyprland re-runs its config.
    if (app.config.hyprHook !== undefined) {
      yield* Effect.flatMap(Hyprland, (h) => h.reload({ configOnly: true }));
    }
    yield* Console.log(`rebuilt ${id} in ${Date.now() - started} ms`);
  }).pipe(Effect.catch((error) => Console.error(`rebuild failed: ${String(error)}`)));

/**
 * Tier 2: the dev variant runs inside the real shell. Prod is disabled while
 * it runs; every source change rebuilds and swaps the dev folder in (the shell
 * reloads it). On exit, prod comes back.
 */
export const devLive = (app: PluginApp) =>
  Effect.gen(function* () {
    const id = variantId(app.config.id, "dev");
    yield* deploy(app, "dev");
    yield* Console.log(
      `${id} is live. Toggle it with: omarchy-shell shell toggle ${id} '{}'\nWatching for changes; Ctrl+C puts ${app.config.id} back.`,
    );
    const stream = yield* changes(app);
    yield* Stream.runForEach(stream, () => rebuildDev(app));
  }).pipe(
    Effect.ensuring(
      undeployDev(app).pipe(
        Effect.catch((error) => Console.error(`restoring prod failed: ${String(error)}`)),
      ),
    ),
  );

/** The shell.qml of the harness: a stand-in for Omarchy's plugin host. */
const harnessShell = (app: PluginApp, manifest: unknown) => {
  const entry = Object.values(app.config.entryPoints)[0];
  return `import Quickshell
import Quickshell.Io
import QtQuick

// stef harness: loads one plugin the way Omarchy's shell does (Loader,
// injected omarchyPath/shell/manifest, open/close), in its own qs process so
// a crash leaves the real shell alone.
ShellRoot {
  id: harness

  property bool opened: ${app.config.keepLoaded === true}
  property string payload: "{}"
  readonly property var manifest: ${JSON.stringify(manifest)}

  readonly property QtObject shellApi: QtObject {
    function summon(id, payloadJson) { harness.open(payloadJson) }
    function hide(id) { harness.close() }
    function toggle(id, payloadJson) { harness.opened ? harness.close() : harness.open(payloadJson) }
    function isPluginOpen(id) { return harness.opened }
  }

  function open(payloadJson) {
    harness.payload = payloadJson || "{}"
    if (loader.item) loader.item.open(harness.payload)
    else harness.opened = true
  }

  function close() {
    if (loader.item && typeof loader.item.close === "function") loader.item.close()
    harness.opened = ${app.config.keepLoaded === true}
  }

  Loader {
    id: loader
    active: harness.opened
    source: Qt.resolvedUrl("plugin/${entry}")
    onLoaded: {
      if ("omarchyPath" in item) item.omarchyPath = "${process.env["OMARCHY_PATH"] ?? "/usr/share/omarchy"}"
      if ("shell" in item) item.shell = harness.shellApi
      if ("manifest" in item) item.manifest = harness.manifest
      if (typeof item.open === "function") item.open(harness.payload)
    }
  }

  IpcHandler {
    target: "stef.harness"
    function toggle(payload: string): void { harness.shellApi.toggle("", payload) }
    function open(payload: string): void { harness.open(payload) }
    function close(): void { harness.close() }
  }

  Component.onCompleted: console.log("stef harness: " + manifest.id + " ready; toggle with: qs ipc -p " + Qt.resolvedUrl("shell.qml").toString().slice(7) + " call stef.harness toggle '{}'")
}
`;
};

/**
 * Tier 1: the dev build in its own Quickshell process, with Omarchy's
 * Commons/Ui linked in so `qs.*` imports resolve. Restarted on every change.
 * Hyprland hooks still talk to the main shell (omarchy-shell has no way to
 * address another instance), so hook-driven behaviour needs `stef dev`.
 */
export const harness = (app: PluginApp) =>
  Effect.scoped(
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
      const omarchyShell = `${process.env["OMARCHY_PATH"] ?? "/usr/share/omarchy"}/shell`;

      const dir = yield* fs.makeTempDirectoryScoped({ prefix: "stef-harness-" });
      for (const entry of yield* fs.readDirectory(omarchyShell)) {
        if (entry !== "shell.qml" && entry !== "plugins") {
          yield* fs.symlink(path.join(omarchyShell, entry), path.join(dir, entry));
        }
      }
      const build = Effect.gen(function* () {
        const built = yield* buildPlugin(app.root, app.config, "dev");
        const link = path.join(dir, "plugin");
        yield* fs.remove(link, { force: true });
        yield* fs.symlink(built, link);
        const manifest = JSON.parse(yield* fs.readFileString(path.join(built, "manifest.json")));
        yield* fs.writeFileString(path.join(dir, "shell.qml"), harnessShell(app, manifest));
      });

      const runQs = Effect.scoped(
        Effect.flatMap(
          spawner.spawn(
            ChildProcess.make("qs", ["-p", path.join(dir, "shell.qml")], {
              stdout: "inherit",
              stderr: "inherit",
            }),
          ),
          (handle) => handle.exitCode,
        ),
      );

      yield* build;
      const stream = yield* changes(app);
      // Run qs until a change arrives, rebuild, start it again.
      while (true) {
        yield* Effect.raceFirst(runQs.pipe(Effect.andThen(Effect.never)), Stream.runHead(stream));
        yield* Console.log("change: rebuilding and restarting the harness");
        yield* build.pipe(
          Effect.catch((error) => Console.error(`rebuild failed: ${String(error)}`)),
        );
      }
    }),
  );
