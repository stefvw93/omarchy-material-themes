import { Effect, FileSystem, Path, Schema } from "effect";
import type { PluginConfig } from "./define.ts";
import { run, runUntil } from "./process.ts";

export class PluginCheckError extends Schema.TaggedError<PluginCheckError>()(
  "@stef/plugin-kit/PluginCheckError",
  { check: Schema.String, message: Schema.String },
) {}

const omarchyShell = () => `${process.env["OMARCHY_PATH"] ?? "/usr/share/omarchy"}/shell`;

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
  yield* fs.symlink(omarchyShell(), path.join(importDir, "qs"));

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
