import { omarchyPath } from "@stef/omarchy";
import { motionSchemes, schemeRoles, settleTime } from "@stef/qml-kit";
import { Effect, FileSystem, Path, Schema } from "effect";
import type { PluginConfig } from "./define.ts";
import { run, runUntil } from "./process.ts";

export class PluginCheckError extends Schema.TaggedError<PluginCheckError>()(
  "@stef/plugin-kit/PluginCheckError",
  { check: Schema.String, message: Schema.String },
) {}

/** Omarchy's shell, whose `qs.*` modules plugins import. */
const omarchyShell = Effect.map(omarchyPath, (dir) => `${dir}/shell`);

/**
 * Qt 6 qmllint over the built QML, any warning fails (/usr/bin/qmllint is Qt
 * 5's). `qs.*` imports resolve through a link to the Omarchy shell. Lines
 * qmllint can't type carry a same-line `// qmllint disable <category>`.
 */
export const checkQml = Effect.fn("PluginKit.checkQml")(function* (root: string, outDir: string) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const importDir = path.join(root, ".cache/qml");
  yield* fs.makeDirectory(importDir, { recursive: true });
  yield* fs.remove(path.join(importDir, "qs"), { force: true });
  yield* fs.symlink(yield* omarchyShell, path.join(importDir, "qs"));

  const qml = (yield* fs.readDirectory(outDir))
    .filter((f) => f.endsWith(".qml"))
    .map((f) => path.join(outDir, f));
  const result = yield* run("/usr/lib/qt6/bin/qmllint", [
    "-I",
    importDir,
    "--max-warnings",
    "0",
    ...qml,
  ]);
  if (result.exitCode !== 0) {
    return yield* new PluginCheckError({ check: "qml", message: result.output });
  }
});

/**
 * Loads every `lib/*.mjs` in Quickshell's own QML engine (a headless `qs -p`)
 * and fails if one doesn't evaluate there. Vitest runs the TypeScript in
 * Node, which accepts code the QML engine doesn't.
 */
export const checkBundles = Effect.fn("PluginKit.checkBundles")(function* (outDir: string) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const libs = (yield* fs.readDirectory(path.join(outDir, "lib")))
    .filter((f) => f.endsWith(".mjs"))
    .map((f) => f.slice(0, -".mjs".length));

  const tmp = yield* fs.makeTempDirectoryScoped();
  yield* fs.symlink(path.join(outDir, "lib"), path.join(tmp, "lib"));
  const alias = (name: string) => `M_${name.replace(/\W/g, "_")}`;
  yield* fs.writeFileString(
    path.join(tmp, "shell.qml"),
    [
      "import Quickshell",
      "import QtQuick",
      ...libs.map((name) => `import "lib/${name}.mjs" as ${alias(name)}`),
      "ShellRoot {",
      "  Component.onCompleted: {",
      ...libs.map(
        (name) => `    console.log("BUNDLE-OK ${name}", Object.keys(${alias(name)}).length)`,
      ),
      '    console.log("BUNDLE-DONE")',
      "  }",
      "}",
      "",
    ].join("\n"),
  );

  const lines = yield* runUntil(
    "qs",
    ["-p", path.join(tmp, "shell.qml")],
    { env: { QT_QPA_PLATFORM: "offscreen" }, extendEnv: true },
    (line) => line.includes("BUNDLE-DONE"),
    "10 seconds",
  );
  const missing = libs.filter((name) => !lines.some((l) => l.includes(`BUNDLE-OK ${name} `)));
  if (missing.length > 0) {
    const errors = lines.filter((l) => /unavailable|Unexpected|Expected|Error/.test(l));
    return yield* new PluginCheckError({
      check: "bundles",
      message: `${missing.map((n) => `lib/${n}.mjs`).join(", ")} did not load in the QML engine:\n${errors.join("\n")}`,
    });
  }
}, Effect.scoped);

/**
 * Instantiates the plugin's vendored `Tokens.qml` in a headless `qs` with a
 * throwaway $HOME: the baked-in defaults must load, and writing
 * ~/.config/omarchy/stef/tokens.json must reach `tokens.value` live.
 */
export const checkTokens = Effect.fn("PluginKit.checkTokens")(function* (outDir: string) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const tmp = yield* fs.makeTempDirectoryScoped();
  const home = path.join(tmp, "home");
  yield* fs.makeDirectory(path.join(home, ".config/omarchy/stef"), { recursive: true });
  yield* fs.symlink(outDir, path.join(tmp, "plugin"));
  yield* fs.writeFileString(
    path.join(tmp, "shell.qml"),
    `import Quickshell
import Quickshell.Io
import QtQuick
import "plugin"

ShellRoot {
  Tokens {
    id: tokens
    function report() {
      console.log("TOKENS density=" + tokens.value.density + " scheme=" + tokens.value.motion.scheme
        + " spatial=" + tokens.springs.spatial_default.stiffness + " margin=" + tokens.m3.expo.outerMargin)
      if (tokens.value.density === -2 && tokens.springs.spatial_default.stiffness === 380
          && tokens.m3.expo.outerMargin === 24)
        console.log("TOKENS-DONE")
    }
    // springs and m3 are bindings on value: they settle after onValueChanged runs.
    onValueChanged: report()
    onSpringsChanged: report()
    onM3Changed: report()
  }
  FileView { id: writer; path: Quickshell.env("HOME") + "/.config/omarchy/stef/tokens.json" }
  Timer {
    interval: 300; running: true
    onTriggered: writer.setText(JSON.stringify({
      version: 2, density: -2, motion: { scheme: "expressive" }, expo: { outerMargin: "space300" }
    }))
  }
  Component.onCompleted: console.log("TOKENS density=" + tokens.value.density + " scheme=" + tokens.value.motion.scheme
    + " spatial=" + tokens.springs.spatial_default.stiffness + " margin=" + tokens.m3.expo.outerMargin)
}
`,
  );

  const lines = yield* runUntil(
    "qs",
    ["-p", path.join(tmp, "shell.qml")],
    { env: { QT_QPA_PLATFORM: "offscreen", HOME: home }, extendEnv: true },
    (line) => line.includes("TOKENS-DONE"),
    "10 seconds",
  );
  const seen = lines.filter((l) => l.includes("TOKENS density"));
  const defaults = seen.some((l) => l.includes("density=0 scheme=standard spatial=700 margin=48"));
  const live = seen.some((l) => l.includes("density=-2 scheme=expressive spatial=380 margin=24"));
  if (!defaults || !live) {
    return yield* new PluginCheckError({
      check: "tokens",
      message: `Tokens.qml: defaults ${defaults ? "ok" : "missing"}, live override ${live ? "ok" : "missing"}\n${lines.join("\n")}`,
    });
  }
}, Effect.scoped);

/**
 * Instantiates the vendored `Scheme.qml` in a headless `qs` with a throwaway
 * $HOME: an Omaterial theme's omaterial.json gives the exact roles, and after
 * a switch to a theme without one (theme.name rewritten) the roles fall back
 * to the Omarchy colours.
 */
export const checkScheme = Effect.fn("PluginKit.checkScheme")(function* (outDir: string) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const tmp = yield* fs.makeTempDirectoryScoped();
  const home = path.join(tmp, "home");
  const current = path.join(home, ".local/state/omarchy/current");
  yield* fs.makeDirectory(path.join(current, "theme"), { recursive: true });
  const system: Record<string, string> = {};
  for (const role of schemeRoles) system[role] = role === "primary" ? "#123456" : "#abcdef";
  yield* fs.writeFileString(
    path.join(current, "theme/omaterial.json"),
    JSON.stringify({ source: { mode: "light" }, system }),
  );
  yield* fs.writeFileString(path.join(current, "theme.name"), "omaterial-test");
  yield* fs.symlink(outDir, path.join(tmp, "plugin"));
  yield* fs.writeFileString(
    path.join(tmp, "shell.qml"),
    `import Quickshell
import Quickshell.Io
import QtQuick
import "plugin"

ShellRoot {
  id: root
  property bool sawExact: false
  Scheme {
    id: scheme
    omarchy: ({ background: "#101315", foreground: "#cacccc", accent: "#7aa2f7", muted: "#707880", urgent: "#a55555" })
    // exact, mode and color are bindings on resolved: read resolved itself here.
    onResolvedChanged: {
      var r = scheme.resolved
      console.log("SCHEME exact=" + r.exact + " mode=" + r.mode + " primary=" + r.color.primary
        + " surface=" + r.color.surface)
      if (r.exact) root.sawExact = true
      else if (root.sawExact && r.color.surface === "#101315") console.log("SCHEME-DONE")
    }
  }
  // Switch to a theme without omaterial.json, as omarchy-theme-set does.
  FileView { id: json; path: Quickshell.env("HOME") + "/.local/state/omarchy/current/theme/omaterial.json" }
  FileView { id: name; path: Quickshell.env("HOME") + "/.local/state/omarchy/current/theme.name" }
  Timer {
    interval: 400; running: root.sawExact
    onTriggered: { json.setText("{}"); name.setText("tokyo-night") }
  }
}
`,
  );
  const lines = yield* runUntil(
    "qs",
    ["-p", path.join(tmp, "shell.qml")],
    { env: { QT_QPA_PLATFORM: "offscreen", HOME: home }, extendEnv: true },
    (line) => line.includes("SCHEME-DONE"),
    "10 seconds",
  );
  const seen = lines.filter((l) => l.includes("SCHEME exact"));
  const exact = seen.some((l) => l.includes("exact=true mode=light primary=#123456"));
  const fallback = seen.some((l) =>
    l.includes("exact=false mode=dark primary=#7aa2f7 surface=#101315"),
  );
  if (!exact || !fallback) {
    return yield* new PluginCheckError({
      check: "scheme",
      message: `Scheme.qml: omaterial.json ${exact ? "ok" : "missing"}, fallback ${fallback ? "ok" : "missing"}\n${lines.join("\n")}`,
    });
  }
}, Effect.scoped);

/**
 * Runs the vendored `SpringValue.qml` from 0 to 1 on spatial_default in a
 * headless `qs`: it must settle at the target within the spring's settle time
 * (plus a few frames), as Hyprland's curve would. A SpringValue that isn't
 * animated must keep following its target binding through jumps.
 */
export const checkSpring = Effect.fn("PluginKit.checkSpring")(function* (outDir: string) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const tmp = yield* fs.makeTempDirectoryScoped();
  yield* fs.symlink(outDir, path.join(tmp, "plugin"));
  const spring = motionSchemes.standard.spatial_default;
  const limitMs = settleTime(spring) + 100;
  yield* fs.writeFileString(
    path.join(tmp, "shell.qml"),
    `import Quickshell
import QtQuick
import "plugin"

ShellRoot {
  id: root
  property double started: 0
  // A target binding must survive changes while not animated (jumps).
  property real bound: 0
  SpringValue { id: b; animated: false; target: root.bound }
  SpringValue {
    id: s
    spring: ({ stiffness: ${spring.stiffness}, ratio: ${spring.ratio} })
    onRunningChanged: if (!running && started > 0)
      console.log("SPRING-DONE value=" + s.value + " ms=" + (Date.now() - started))
  }
  Timer {
    interval: 200; running: true
    onTriggered: {
      root.bound = 5
      root.bound = 7
      console.log("SPRING-BIND value=" + b.value)
      started = Date.now(); s.target = 1
    }
  }
}
`,
  );
  const lines = yield* runUntil(
    "qs",
    ["-p", path.join(tmp, "shell.qml")],
    { env: { QT_QPA_PLATFORM: "offscreen" }, extendEnv: true },
    (line) => line.includes("SPRING-DONE"),
    "10 seconds",
  );
  const bindingKept = lines.some((l) => l.includes("SPRING-BIND value=7"));
  const done = lines.find((l) => l.includes("SPRING-DONE"));
  const ms = Number(/ms=(\d+)/.exec(done ?? "")?.[1]);
  if (!done?.includes("value=1 ") || !(ms <= limitMs) || !bindingKept) {
    return yield* new PluginCheckError({
      check: "spring",
      message: `SpringValue.qml: expected to settle at 1 within ${limitMs} ms, and to keep following a bound target while not animated\n${lines.join("\n")}`,
    });
  }
}, Effect.scoped);

/**
 * Runs the app's `tests/*.engine.qml` in a headless `qs`, each with the built
 * plugin linked as `plugin/` (so `import "plugin/lib/core.mjs" as Core`
 * works). A test prints `ENGINE-PASS` or `ENGINE-FAIL <why>`.
 */
export const checkEngineTests = Effect.fn("PluginKit.checkEngineTests")(function* (
  root: string,
  outDir: string,
) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const testDir = path.join(root, "tests");
  if (!(yield* fs.exists(testDir))) return 0;
  const tests = (yield* fs.readDirectory(testDir)).filter((f) => f.endsWith(".engine.qml"));
  for (const test of tests) {
    yield* Effect.scoped(
      Effect.gen(function* () {
        const tmp = yield* fs.makeTempDirectoryScoped();
        yield* fs.symlink(outDir, path.join(tmp, "plugin"));
        yield* fs.copyFile(path.join(testDir, test), path.join(tmp, "shell.qml"));
        const lines = yield* runUntil(
          "qs",
          ["-p", path.join(tmp, "shell.qml")],
          { env: { QT_QPA_PLATFORM: "offscreen" }, extendEnv: true },
          (line) => /ENGINE-(PASS|FAIL)/.test(line),
          "15 seconds",
        );
        if (!lines.some((l) => l.includes("ENGINE-PASS"))) {
          return yield* new PluginCheckError({
            check: "engine",
            message: `${test}:\n${lines.filter((l) => /ENGINE|Error|error|warn/i.test(l)).join("\n")}`,
          });
        }
      }),
    );
  }
  return tests.length;
});

/** Syntax-checks the Hyprland hook and runs its plain-Lua tests (fake `hl`). */
export const checkLua = Effect.fn("PluginKit.checkLua")(function* (
  root: string,
  config: PluginConfig,
) {
  if (config.hyprHook === undefined) return;
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const testDir = path.join(root, "tests");
  const tests = (yield* fs.exists(testDir))
    ? (yield* fs.readDirectory(testDir))
        .filter((f) => f.endsWith(".test.lua"))
        .map((f) => path.join("tests", f))
    : [];

  const syntax = yield* run("luac", ["-p", config.hyprHook, ...tests], { cwd: root });
  if (syntax.exitCode !== 0) {
    return yield* new PluginCheckError({ check: "lua", message: syntax.output });
  }
  for (const test of tests) {
    const result = yield* run("lua", [test], { cwd: root });
    if (result.exitCode !== 0) {
      return yield* new PluginCheckError({ check: "lua", message: result.output });
    }
  }
});
