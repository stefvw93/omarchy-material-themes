import { OmarchyPaths, OmarchyShell } from "@stef/omarchy";
import { Console, Effect, FileSystem, Path } from "effect";
import { deploy } from "./deploy.ts";
import type { PluginApp } from "./workspace.ts";

/** Replaces exact text in a config file, keeping a backup; reports instead of guessing. */
const replaceIn = (file: string, from: string, to: string) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    if (!(yield* fs.exists(file))) return yield* Console.log(`skip   ${file}: missing`);
    const text = yield* fs.readFileString(file);
    if (text.includes(to) && !text.includes(from)) return yield* Console.log(`done   ${file}`);
    if (!text.includes(from)) {
      return yield* Console.log(`manual ${file}: expected to find ${JSON.stringify(from)}`);
    }
    const backup = `${file}.bak-${Date.now()}`;
    yield* fs.copyFile(file, backup);
    yield* fs.writeFileString(file, text.split(from).join(to));
    yield* Console.log(`edited ${file} (backup ${backup})`);
  });

/**
 * stef.overview → stef.expo: deploys expo, disables overview, points the
 * keybinding and the blur layer rule at expo, and moves the old plugin folder
 * aside (not deleted) to ~/.config/omarchy/stef/retired.
 */
export const migrateOverview = Effect.fn("Stef.migrateOverview")(function* (expo: PluginApp) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const paths = yield* OmarchyPaths;
  const shell = yield* OmarchyShell;

  yield* deploy(expo, "prod");
  yield* shell.setPluginEnabled("stef.overview", false).pipe(Effect.catch(() => Effect.void));

  yield* replaceIn(
    path.join(paths.hyprDir, "bindings.lua"),
    "omarchy-shell shell toggle stef.overview '{}'",
    "omarchy-shell shell toggle stef.expo '{}'",
  );
  yield* replaceIn(
    path.join(paths.hyprDir, "looknfeel.lua"),
    'namespace = "omarchy-overview"',
    'namespace = "omarchy-expo"',
  );

  const old = paths.pluginDir("stef.overview");
  if (yield* fs.exists(old)) {
    const retired = path.join(paths.stefDir, "retired", `stef.overview-${Date.now()}`);
    yield* fs.makeDirectory(path.dirname(retired), { recursive: true });
    yield* fs.rename(old, retired);
    yield* Console.log(`moved ${old} to ${retired}`);
  }
  yield* Console.log("run `hyprctl reload` to pick up the binding and the layer rule");
});
