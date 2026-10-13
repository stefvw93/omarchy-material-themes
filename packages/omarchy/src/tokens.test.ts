import { describe, expect, it } from "@effect/vitest";
import { defaultTokens, type Tokens } from "@stef/tokens";
import { Effect, Layer, Path } from "effect";
import { OmarchyPathsAt } from "./paths.ts";
import { MemoryFileSystem } from "./testing.ts";
import { readTokenOverride, readTokens, tokenDiff, writeTokens } from "./tokens.ts";

const tokensJson = "/home/.config/omarchy/stef/tokens.json";

/** Omarchy's paths under /home, on an in-memory FileSystem holding `files`. */
const at = (files = new Map<string, string | Uint8Array>()) =>
  Layer.provideMerge(
    OmarchyPathsAt("/home"),
    Layer.mergeAll(MemoryFileSystem(files).layer, Path.layer),
  );

const withFile = (json: unknown) =>
  new Map<string, string | Uint8Array>([
    [tokensJson, typeof json === "string" ? json : JSON.stringify(json)],
  ]);

describe("tokenDiff", () => {
  it("is empty when nothing differs", () => {
    expect(tokenDiff(defaultTokens, defaultTokens)).toEqual({});
  });

  it("keeps only the changed leaves, nested like the tokens", () => {
    const tokens = { ...defaultTokens, density: -2, shape: { windowCorner: "large" } };
    expect(tokenDiff(defaultTokens, tokens)).toEqual({
      density: -2,
      shape: { windowCorner: "large" },
    });
  });

  it("drops groups whose leaves all match", () => {
    const tokens = { ...defaultTokens, flyouts: { ...defaultTokens.flyouts } };
    expect(tokenDiff(defaultTokens, tokens)).not.toHaveProperty("flyouts");
  });

  it("is undefined for anything but two objects", () => {
    expect(tokenDiff(defaultTokens, 3)).toBeUndefined();
    expect(tokenDiff(null, defaultTokens)).toBeUndefined();
  });
});

describe("readTokenOverride", () => {
  it.effect("is empty without a tokens.json", () =>
    Effect.gen(function* () {
      expect(yield* readTokenOverride).toEqual({});
    }).pipe(Effect.provide(at())),
  );

  it.effect("is the file as written", () =>
    Effect.gen(function* () {
      expect(yield* readTokenOverride).toEqual({ version: 2, density: -1 });
    }).pipe(Effect.provide(at(withFile({ version: 2, density: -1 })))),
  );

  it.effect("fails with a TokensError on broken JSON", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(readTokenOverride);
      expect(error._tag).toBe("@stef/omarchy/TokensError");
      expect(error.message).toContain("is not valid JSON");
    }).pipe(Effect.provide(at(withFile("{ not json")))),
  );
});

describe("readTokens", () => {
  it.effect("is the defaults without a tokens.json", () =>
    Effect.gen(function* () {
      expect(yield* readTokens).toEqual(defaultTokens);
    }).pipe(Effect.provide(at())),
  );

  it.effect("lays the file over the defaults", () =>
    Effect.gen(function* () {
      const tokens = yield* readTokens;
      expect(tokens.motion.scheme).toBe("expressive");
      expect(tokens.shape).toEqual(defaultTokens.shape);
    }).pipe(Effect.provide(at(withFile({ version: 2, motion: { scheme: "expressive" } })))),
  );

  it.effect("ignores unknown keys and values outside their choices", () =>
    Effect.gen(function* () {
      expect(yield* readTokens).toEqual(defaultTokens);
    }).pipe(
      Effect.provide(at(withFile({ version: 2, bogus: 1, shape: { windowCorner: "huge" } }))),
    ),
  );

  it.effect("migrates a v1 file (pixels to the nearest step)", () =>
    Effect.gen(function* () {
      const tokens = yield* readTokens;
      expect(tokens.expo.tileGap).toBe("space300");
      expect(tokens.border.width).toBe("focus-indicator");
    }).pipe(Effect.provide(at(withFile({ expo: { tileGap: 24 }, border: { width: 3 } })))),
  );
});

describe("writeTokens", () => {
  const written = (files: Map<string, string | Uint8Array>) =>
    JSON.parse(String(files.get(tokensJson)));

  it.effect("writes only the keys that differ, with the version", () => {
    const files = new Map<string, string | Uint8Array>();
    return Effect.gen(function* () {
      yield* writeTokens({ ...defaultTokens, density: -1 } as Tokens);
      expect(written(files)).toEqual({ density: -1, version: 2 });
    }).pipe(Effect.provide(at(files)));
  });

  it.effect("writes the defaults as the version alone", () => {
    const files = new Map<string, string | Uint8Array>();
    return Effect.gen(function* () {
      yield* writeTokens(defaultTokens);
      expect(written(files)).toEqual({ version: 2 });
    }).pipe(Effect.provide(at(files)));
  });

  it.effect("reads back what it wrote", () =>
    Effect.gen(function* () {
      const tokens = {
        ...defaultTokens,
        motion: { scheme: "expressive" },
        groupbar: { ...defaultTokens.groupbar, shape: "round" },
      } as Tokens;
      yield* writeTokens(tokens);
      expect(yield* readTokens).toEqual(tokens);
    }).pipe(Effect.provide(at())),
  );

  it.effect("refuses tokens the Schema rejects, and writes nothing", () => {
    const files = new Map<string, string | Uint8Array>();
    return Effect.gen(function* () {
      const error = yield* Effect.flip(
        writeTokens({ ...defaultTokens, density: 5 } as unknown as Tokens),
      );
      expect(error._tag).toBe("@stef/omarchy/TokensError");
      expect(files.size).toBe(0);
    }).pipe(Effect.provide(at(files)));
  });
});
