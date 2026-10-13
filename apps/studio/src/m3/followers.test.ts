import { describe, expect, it } from "@effect/vitest";
import { OmarchyPathsAt } from "@stef/omarchy";
import { MemoryFileSystem } from "@stef/omarchy/testing";
import { createPaletteFromHex, renderOmaterialJson } from "@stef/theme-engine";
import { defaultTokens } from "@stef/tokens";
import { type Duration, Effect, Fiber, Layer, Path, Stream } from "effect";
import { TestClock } from "effect/testing";
import { polled } from "./polled";
import { appliedSchemes } from "./scheme";
import { baseSizes, typeScales } from "./text-scale";

const theme = "/home/.local/state/omarchy/current/theme";
const shellToml = "/home/.config/omarchy/shell.toml";
const tokensJson = "/home/.config/omarchy/stef/tokens.json";

/** An in-memory $HOME (/home) holding `files`. */
const home = (files: Map<string, string | Uint8Array>) =>
  Layer.provideMerge(
    OmarchyPathsAt("/home"),
    Layer.mergeAll(MemoryFileSystem(files).layer, Path.layer),
  );

/**
 * Moves the TestClock on by `by`, then lets the polling fibers run: a
 * zipLatest of two polls takes a few scheduler turns to emit.
 */
const step = (by: Duration.Input) =>
  Effect.gen(function* () {
    yield* TestClock.adjust(by);
    for (let i = 0; i < 20; i++) yield* Effect.yieldNow;
  });

/**
 * Runs `stream` in the background and returns what it has emitted so far;
 * TestClock decides when the next poll happens.
 */
const watch = <A, E, R>(stream: Stream.Stream<A, E, R>) =>
  Effect.gen(function* () {
    const seen: A[] = [];
    const fiber = yield* Effect.forkChild(
      Stream.runForEach(stream, (a) => Effect.sync(() => void seen.push(a))),
    );
    yield* step("0 millis");
    return { seen, fiber };
  });

describe("polled", () => {
  it.effect("reads the file now, then passes on changes only", () => {
    const files = new Map<string, string | Uint8Array>([["/f", "a"]]);
    return Effect.gen(function* () {
      const { seen, fiber } = yield* watch(polled("/f"));
      expect(seen).toEqual(["a"]);

      yield* step("2 seconds");
      expect(seen).toEqual(["a"]);

      files.set("/f", "b");
      yield* step("1 second");
      expect(seen).toEqual(["a"]);
      yield* step("1 second");
      expect(seen).toEqual(["a", "b"]);

      files.delete("/f");
      yield* step("2 seconds");
      expect(seen).toEqual(["a", "b", undefined]);
      yield* Fiber.interrupt(fiber);
    }).pipe(Effect.provide(home(files)));
  });
});

describe("appliedSchemes", () => {
  const light = createPaletteFromHex("#4285f4", {
    variant: "tonal-spot",
    mode: "light",
    contrast: "standard",
  });

  it.effect("falls back to colors.toml's colours under a theme without omaterial.json", () => {
    const files = new Map<string, string | Uint8Array>([
      [`${theme}/colors.toml`, 'background = "#101010"\nforeground = "#eeeeee"'],
    ]);
    return Effect.gen(function* () {
      const { seen, fiber } = yield* watch(appliedSchemes);
      expect(seen).toHaveLength(1);
      expect(seen[0]!.mode).toBe("dark");
      yield* Fiber.interrupt(fiber);
    }).pipe(Effect.provide(home(files)));
  });

  it.effect("takes omaterial.json's exact roles over colors.toml, once it appears", () => {
    const files = new Map<string, string | Uint8Array>([
      [`${theme}/colors.toml`, 'background = "#101010"'],
    ]);
    return Effect.gen(function* () {
      const { seen, fiber } = yield* watch(appliedSchemes);
      files.set(`${theme}/omaterial.json`, renderOmaterialJson(light, defaultTokens));
      yield* step("2 seconds");
      expect(seen).toHaveLength(2);
      expect(seen[1]!.mode).toBe("light");
      expect(seen[1]!.color["primary"]).toBe(light.system["primary"]);
      yield* Fiber.interrupt(fiber);
    }).pipe(Effect.provide(home(files)));
  });
});

describe("text scale", () => {
  it.effect("follows [font] base-size, with Omarchy's 12 when it's unset", () => {
    const files = new Map<string, string | Uint8Array>();
    return Effect.gen(function* () {
      const { seen, fiber } = yield* watch(baseSizes);
      files.set(shellToml, "[bar]\nheight = 30\n[font]\nbase-size = 15\n");
      yield* step("2 seconds");
      expect(seen).toEqual([12, 15]);
      yield* Fiber.interrupt(fiber);
    }).pipe(Effect.provide(home(files)));
  });

  it.effect("follows tokens.type.scale, with 1 when tokens.json is missing", () => {
    const files = new Map<string, string | Uint8Array>();
    return Effect.gen(function* () {
      const { seen, fiber } = yield* watch(typeScales);
      files.set(tokensJson, JSON.stringify({ version: 2, type: { scale: 1.25 } }));
      yield* step("2 seconds");
      expect(seen).toEqual([1, 1.25]);
      yield* Fiber.interrupt(fiber);
    }).pipe(Effect.provide(home(files)));
  });
});
