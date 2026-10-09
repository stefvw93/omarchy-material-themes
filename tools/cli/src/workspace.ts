import type { PluginConfig } from "@stef/plugin-kit";
import { Effect, FileSystem, Path, Schema } from "effect";

export class CliError extends Schema.TaggedError<CliError>()("@stef/cli/CliError", {
  message: Schema.String,
}) {}

/** A plugin app of the monorepo: `apps/<name>/plugin.config.ts`. */
export interface PluginApp {
  readonly name: string;
  readonly root: string;
  readonly config: PluginConfig;
}

/** The monorepo root: the nearest directory with pnpm-workspace.yaml. */
export const repoRoot = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  let dir = process.cwd();
  while (true) {
    if (yield* fs.exists(path.join(dir, "pnpm-workspace.yaml"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return yield* new CliError({ message: "not inside the omarchy-stef repo" });
    dir = parent;
  }
});

const loadConfig = (file: string) =>
  Effect.tryPromise({
    try: () => import(file) as Promise<{ readonly default: PluginConfig }>,
    catch: (cause) => new CliError({ message: `${file}: ${String(cause)}` }),
  }).pipe(Effect.map((m) => m.default));

export const pluginApps = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const apps = path.join(yield* repoRoot, "apps");
  const found: PluginApp[] = [];
  for (const name of (yield* fs.readDirectory(apps)).sort()) {
    const file = path.join(apps, name, "plugin.config.ts");
    if (yield* fs.exists(file)) {
      found.push({ name, root: path.join(apps, name), config: yield* loadConfig(file) });
    }
  }
  return found;
});

/** An app by folder name (`periphery`) or plugin id (`stef.periphery`). */
export const pluginApp = (nameOrId: string) =>
  Effect.flatMap(pluginApps, (apps) => {
    const app = apps.find((a) => a.name === nameOrId || a.config.id === nameOrId);
    return app
      ? Effect.succeed(app)
      : Effect.fail(
          new CliError({
            message: `no plugin app "${nameOrId}"; known: ${apps.map((a) => a.name).join(", ")}`,
          }),
        );
  });
