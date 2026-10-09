import { defaultTokens, mergeTokens, type Tokens, TokensSchema } from "@stef/tokens";
import { Effect, FileSystem, Schema } from "effect";
import { OmarchyPaths } from "./paths.ts";

type Json = Record<string, unknown>;

export class TokensError extends Schema.TaggedError<TokensError>()("@stef/omarchy/TokensError", {
  message: Schema.String,
}) {}

/** The override in tokens.json as written (only the keys that differ from the defaults). */
export const readTokenOverride = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const paths = yield* OmarchyPaths;
  if (!(yield* fs.exists(paths.tokensJson))) return {} as Json;
  const text = yield* fs.readFileString(paths.tokensJson);
  return yield* Effect.try({
    try: () => JSON.parse(text) as Json,
    catch: () => new TokensError({ message: `${paths.tokensJson} is not valid JSON` }),
  });
});

/** The tokens in effect: tokens.json over the defaults, validated. */
export const readTokens = Effect.flatMap(readTokenOverride, (override) =>
  Schema.decodeUnknownEffect(TokensSchema)(mergeTokens(defaultTokens, override)).pipe(
    Effect.mapError((e) => new TokensError({ message: `tokens.json: ${e.message}` })),
  ),
);

/** The leaves of `tokens` that differ from `base`, nested like the tokens. */
export const tokenDiff = (base: unknown, tokens: unknown): Json | undefined => {
  if (typeof base !== "object" || base === null || typeof tokens !== "object" || tokens === null) {
    return undefined;
  }
  const out: Json = {};
  for (const [key, value] of Object.entries(tokens)) {
    const b = (base as Json)[key];
    if (typeof value === "object" && value !== null) {
      const child = tokenDiff(b, value);
      if (child !== undefined && Object.keys(child).length > 0) out[key] = child;
    } else if (value !== b) {
      out[key] = value;
    }
  }
  return out;
};

/**
 * Writes `tokens` to tokens.json as the keys that differ from the defaults,
 * after validating them. Running plugins reload it live (Tokens.qml).
 */
export const writeTokens = Effect.fn("Omarchy.writeTokens")(function* (tokens: Tokens) {
  const fs = yield* FileSystem.FileSystem;
  const paths = yield* OmarchyPaths;
  yield* Schema.decodeUnknownEffect(TokensSchema)(tokens).pipe(
    Effect.mapError((e) => new TokensError({ message: e.message })),
  );
  yield* fs.makeDirectory(paths.stefDir, { recursive: true });
  yield* fs.writeFileString(
    paths.tokensJson,
    `${JSON.stringify(tokenDiff(defaultTokens, tokens) ?? {}, null, 2)}\n`,
  );
});
