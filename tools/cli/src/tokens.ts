import { OmarchyPaths } from "@stef/omarchy";
import { defaultTokens, hyprlandTokensLua, mergeTokens, TokensSchema } from "@stef/tokens";
import { Console, Effect, FileSystem, Path, Schema } from "effect";
import { CliError } from "./workspace.ts";

type Json = Record<string, unknown>;

const readOverride = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const paths = yield* OmarchyPaths;
  if (!(yield* fs.exists(paths.tokensJson))) return {} as Json;
  return JSON.parse(yield* fs.readFileString(paths.tokensJson)) as Json;
});

/** The tokens in effect: tokens.json over the defaults, validated. */
export const effectiveTokens = Effect.flatMap(readOverride, (override) =>
  Schema.decodeUnknownEffect(TokensSchema)(mergeTokens(defaultTokens, override)).pipe(
    Effect.mapError((e) => new CliError({ message: `tokens.json: ${e.message}` })),
  ),
);

export const showTokens = Effect.flatMap(effectiveTokens, (t) =>
  Console.log(JSON.stringify(t, null, 2)),
);

const setPath = (target: Json, keys: ReadonlyArray<string>, value: unknown): Json => {
  const [head, ...rest] = keys;
  if (head === undefined) return target;
  const child = (target[head] ?? {}) as Json;
  return { ...target, [head]: rest.length === 0 ? value : setPath(child, rest, value) };
};

/**
 * `stef tokens set gaps.inner 6`: writes the key into tokens.json (only
 * overrides are stored), refusing values the Schema rejects. Running plugins
 * pick it up live.
 */
export const setToken = Effect.fn("Stef.setToken")(function* (key: string, raw: string) {
  const fs = yield* FileSystem.FileSystem;
  const paths = yield* OmarchyPaths;
  const keys = key.split(".");
  let at: unknown = defaultTokens;
  for (const k of keys) at = (at as Json | undefined)?.[k];
  if (at === undefined || (typeof at === "object" && at !== null)) {
    return yield* new CliError({ message: `${key} is not a token; see \`stef tokens show\`` });
  }
  const value = typeof at === "number" ? Number(raw) : raw;
  const override = setPath(yield* readOverride, keys, value);
  yield* Schema.decodeUnknownEffect(TokensSchema)(mergeTokens(defaultTokens, override)).pipe(
    Effect.mapError((e) => new CliError({ message: `${key} = ${raw}: ${e.message}` })),
  );
  yield* fs.makeDirectory(paths.stefDir, { recursive: true });
  yield* fs.writeFileString(paths.tokensJson, `${JSON.stringify(override, null, 2)}\n`);
  yield* Console.log(`${key} = ${JSON.stringify(value)} (${paths.tokensJson})`);
});

/** Writes ~/.config/hypr/stef/tokens.lua from the effective tokens. */
export const applyTokens = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const paths = yield* OmarchyPaths;
  const file = path.join(paths.stefHyprDir, "tokens.lua");
  yield* fs.makeDirectory(paths.stefHyprDir, { recursive: true });
  yield* fs.writeFileString(file, hyprlandTokensLua(yield* effectiveTokens));
  yield* Console.log(
    `wrote ${file}. Omaterial themes already render these tokens; for other themes, source it after the theme in hyprland.lua:\n  dofile(os.getenv("HOME") .. "/.config/hypr/stef/tokens.lua")`,
  );
});
