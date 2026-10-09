#!/usr/bin/env node
// plugin-kit build [--dev]   build dist/<mode>/<id> from ./plugin.config.ts
// plugin-kit check           build prod, then lint QML, load bundles in qs, run Lua tests
// Run from a plugin app's directory. The `stef` CLI (tools/cli) will wrap these.
import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Console, Effect, Path } from "effect";
import { buildPlugin } from "./build.ts";
import { checkBundles, checkLua, checkQml, checkTokens } from "./check.ts";
import type { PluginConfig } from "./define.ts";

const [command, ...flags] = process.argv.slice(2);

const program = Effect.gen(function* () {
  const path = yield* Path.Path;
  const root = process.cwd();
  const config = yield* Effect.promise(
    () =>
      import(path.join(root, "plugin.config.ts")) as Promise<{ readonly default: PluginConfig }>,
  ).pipe(Effect.map((m) => m.default));

  switch (command) {
    case "build": {
      const outDir = yield* buildPlugin(root, config, flags.includes("--dev") ? "dev" : "prod");
      yield* Console.log(`built ${path.relative(root, outDir)}`);
      return;
    }
    case "check": {
      const outDir = yield* buildPlugin(root, config, "prod");
      yield* checkQml(root, outDir);
      yield* Console.log("qml ok");
      yield* checkBundles(outDir);
      yield* Console.log("bundles ok");
      yield* checkTokens(outDir);
      yield* Console.log("tokens ok");
      yield* checkLua(root, config);
      if (config.hyprHook !== undefined) yield* Console.log("lua ok");
      return;
    }
    default:
      return yield* Effect.fail(`usage: plugin-kit build [--dev] | check (got: ${command})`);
  }
});

program.pipe(
  Effect.tapError((error) =>
    Console.error(
      typeof error === "object" && error !== null && "message" in error ? error.message : error,
    ),
  ),
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain,
);
