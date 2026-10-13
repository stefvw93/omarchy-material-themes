import { defaultTokens, type Tokens } from "@stef/tokens";
import { Effect, Exit, FileSystem, Layer, Path } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { OmarchyPaths } from "./paths.ts";
import { readTokenOverride, readTokens, tokenDiff, TokensError, writeTokens } from "./tokens.ts";

const tokensJson = "/home/.config/omarchy/stef/tokens.json";

/**
 * An in-memory FileSystem holding `files`: exists, read, write and mkdir are
 * the only calls tokens.ts makes; anything else fails (layerNoop).
 */
const memoryFs = (files: Map<string, string>) =>
  FileSystem.layerNoop({
    exists: (path) => Effect.succeed(files.has(path)),
    readFileString: (path) => Effect.sync(() => files.get(path) ?? ""),
    writeFileString: (path, content) => Effect.sync(() => void files.set(path, content)),
    makeDirectory: () => Effect.void,
  });

/** Runs `effect` against `files`, with Omarchy's paths under /home. */
const run = <A, E>(
  effect: Effect.Effect<A, E, OmarchyPaths | FileSystem.FileSystem>,
  files = new Map<string, string>(),
) =>
  Effect.runSyncExit(
    Effect.provide(
      effect,
      Layer.provideMerge(
        OmarchyPaths.layerAt("/home"),
        Layer.mergeAll(memoryFs(files), Path.layer),
      ),
    ),
  );

const withFile = (json: unknown) =>
  new Map([[tokensJson, typeof json === "string" ? json : JSON.stringify(json)]]);

const value = <A, E>(exit: Exit.Exit<A, E>): A => {
  if (Exit.isFailure(exit)) throw new Error(`expected success, got ${String(exit.cause)}`);
  return exit.value;
};

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
  it("is empty without a tokens.json", () => {
    expect(value(run(readTokenOverride))).toEqual({});
  });

  it("is the file as written", () => {
    expect(value(run(readTokenOverride, withFile({ version: 2, density: -1 })))).toEqual({
      version: 2,
      density: -1,
    });
  });

  it("fails with a TokensError on broken JSON", () => {
    const exit = run(readTokenOverride, withFile("{ not json"));
    expect(exit).toMatchObject({ _tag: "Failure" });
    expect(String(Exit.isFailure(exit) && exit.cause)).toContain("is not valid JSON");
  });
});

describe("readTokens", () => {
  it("is the defaults without a tokens.json", () => {
    expect(value(run(readTokens))).toEqual(defaultTokens);
  });

  it("lays the file over the defaults", () => {
    const tokens = value(
      run(readTokens, withFile({ version: 2, motion: { scheme: "expressive" } })),
    );
    expect(tokens.motion.scheme).toBe("expressive");
    expect(tokens.shape).toEqual(defaultTokens.shape);
  });

  it("ignores unknown keys and values outside their choices", () => {
    const tokens = value(
      run(readTokens, withFile({ version: 2, bogus: 1, shape: { windowCorner: "huge" } })),
    );
    expect(tokens).toEqual(defaultTokens);
  });

  it("migrates a v1 file (pixels to the nearest step)", () => {
    const tokens = value(
      run(readTokens, withFile({ expo: { tileGap: 24 }, border: { width: 3 } })),
    );
    expect(tokens.expo.tileGap).toBe("space300");
    expect(tokens.border.width).toBe("focus-indicator");
  });
});

describe("writeTokens", () => {
  it("writes only the keys that differ, with the version", () => {
    const files = new Map<string, string>();
    value(run(writeTokens({ ...defaultTokens, density: -1 } as Tokens), files));
    expect(JSON.parse(files.get(tokensJson)!)).toEqual({ density: -1, version: 2 });
  });

  it("writes the defaults as the version alone", () => {
    const files = new Map<string, string>();
    value(run(writeTokens(defaultTokens), files));
    expect(JSON.parse(files.get(tokensJson)!)).toEqual({ version: 2 });
  });

  it("reads back what it wrote", () => {
    const files = new Map<string, string>();
    const tokens = {
      ...defaultTokens,
      motion: { scheme: "expressive" },
      groupbar: { ...defaultTokens.groupbar, shape: "round" },
    } as Tokens;
    expect(value(run(Effect.andThen(writeTokens(tokens), readTokens), files))).toEqual(tokens);
  });

  it("refuses tokens the Schema rejects, and writes nothing", () => {
    const files = new Map<string, string>();
    const exit = run(writeTokens({ ...defaultTokens, density: 5 } as unknown as Tokens), files);
    expect(Exit.isFailure(exit)).toBe(true);
    expect(String(Exit.isFailure(exit) && exit.cause)).toContain(TokensError.name);
    expect(files.size).toBe(0);
  });
});
