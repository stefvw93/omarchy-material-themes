import { OmarchyPaths, readTokens, writeTokens } from "@stef/omarchy";
import { defaultTokens, hyprlandTokensLua, mergeTokens, type Tokens } from "@stef/tokens";
import { Console, Effect, FileSystem, Path } from "effect";
import { CliError } from "./workspace.ts";

export const showTokens = Effect.flatMap(readTokens, (t) =>
  Console.log(JSON.stringify(t, null, 2)),
);

/**
 * `stef tokens set shape.windowCorner large`: sets one token and writes tokens.json
 * (only the keys that differ from the defaults), refusing values the Schema
 * rejects. Running plugins pick it up live.
 */
export const setToken = Effect.fn("Stef.setToken")(function* (key: string, raw: string) {
  const paths = yield* OmarchyPaths;
  const keys = key.split(".");
  let at: unknown = defaultTokens;
  for (const k of keys) at = (at as Record<string, unknown> | undefined)?.[k];
  if (at === undefined || (typeof at === "object" && at !== null)) {
    return yield* new CliError({ message: `${key} is not a token; see \`stef tokens show\`` });
  }
  const value =
    typeof at === "number" ? Number(raw) : typeof at === "boolean" ? raw === "true" : raw;
  const patch = keys.reduceRight<unknown>((inner, k) => ({ [k]: inner }), value);
  const next = mergeTokens(yield* readTokens, patch) as Tokens;
  if (keys.reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], next) !== value) {
    return yield* new CliError({ message: `${key} = ${raw}: not a valid value` });
  }
  yield* writeTokens(next);
  yield* Console.log(`${key} = ${JSON.stringify(value)} (${paths.tokensJson})`);
});

/** Rewrites tokens.json in the current format (v1 pixel values become M3 steps). */
export const migrateTokensFile = Effect.gen(function* () {
  const paths = yield* OmarchyPaths;
  yield* writeTokens(yield* readTokens);
  yield* Console.log(`migrated ${paths.tokensJson}`);
});

/** Writes ~/.config/hypr/stef/tokens.lua from the effective tokens. */
export const applyTokens = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const paths = yield* OmarchyPaths;
  const file = path.join(paths.stefHyprDir, "tokens.lua");
  yield* fs.makeDirectory(paths.stefHyprDir, { recursive: true });
  yield* fs.writeFileString(file, hyprlandTokensLua(yield* readTokens));
  yield* Console.log(
    `wrote ${file}. Omaterial themes already render these tokens; for other themes, source it after the theme in hyprland.lua:\n  dofile(os.getenv("HOME") .. "/.config/hypr/stef/tokens.lua")`,
  );
});
