import { describe, it, assert, expect } from "@effect/vitest";
import { omarchyColorsFromMaterialSeed } from "./colors.ts";
import { Effect, Exit, Option, Schema } from "effect";

describe("generate omarchy colors from seed", () => {
  it.effect("fails when seed is invalid", () =>
    Effect.gen(function* () {
      const exit = yield* Effect.exit(omarchyColorsFromMaterialSeed("#ggg", "dark"));
      const cause = Exit.findErrorOption(exit);
      assert.isTrue(Option.isSome(cause) && cause.value instanceof Schema.SchemaError);
    }),
  );

  it.effect("contains expected keys", () =>
    Effect.gen(function* () {
      const colors = yield* omarchyColorsFromMaterialSeed("#00ff00", "light");

      // probe
      expect(colors.mode).toBe("light");
      expect(Object.keys(colors)).toEqual([
        "mode",
        "accent",
        "selection",
        "muted",
        "background",
        "dark_background",
        "darker_background",
        "lighter_background",
        "foreground",
        "dark_foreground",
        "light_foreground",
        "bright_foreground",
        "red",
        "yellow",
        "green",
        "cyan",
        "blue",
        "magenta",
        "bright_red",
        "bright_yellow",
        "bright_green",
        "bright_cyan",
        "bright_blue",
        "bright_magenta",
        "orange",
        "brown",
      ]);
    }),
  );
});
