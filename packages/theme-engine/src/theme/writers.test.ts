import { defaultTokens, type Tokens } from "@stef/tokens/runtime";
import { Effect, FileSystem, Layer, Path } from "effect";
import { describe, expect, it } from "vite-plus/test";
import type { Mode } from "../colors.ts";
import { createPaletteFromHex } from "../palette.ts";
import { ThemeOutputDirectory, ThemePath, ThemeTokens } from "./shared.ts";
import { makeThemeWriters, writeTheme } from "./writers.ts";

/** Renders every theme file for one palette, returning { fileName: content }. */
const render = (tokens: Tokens = defaultTokens, mode: Mode = "dark") => {
  const files: Record<string, string> = {};
  const fs = FileSystem.layerNoop({
    writeFileString: (path, content) =>
      Effect.sync(() => void (files[path.replace("/theme/", "")] = content)),
  });
  const palette = createPaletteFromHex("#4285f4", {
    variant: "tonal-spot",
    mode,
    contrast: "standard",
  });
  Effect.runSync(
    Effect.gen(function* () {
      // Writers are built with the default tokens and given others at write
      // time, as Studio does: tokens must be read when a file is written.
      const writers = yield* makeThemeWriters;
      yield* writeTheme(writers, palette).pipe(Effect.provideService(ThemeTokens, tokens));
    }).pipe(
      Effect.provide(Layer.mergeAll(fs, Path.layer)),
      Effect.provideService(ThemeOutputDirectory, ThemePath("/theme")),
    ),
  );
  return files;
};

describe("theme files", () => {
  it.each(["dark", "light"] as const)("match the golden output (%s)", async (mode) => {
    const files = render(defaultTokens, mode);
    expect(Object.keys(files).sort()).toMatchSnapshot();
    for (const [name, content] of Object.entries(files)) {
      await expect(content).toMatchFileSnapshot(`./__golden__/${mode}/${name}`);
    }
  });

  it("render the tokens in effect when written, not when the writers were built", () => {
    const files = render({
      ...defaultTokens,
      shape: { windowCorner: "extra-large" },
      motion: { scheme: "expressive" },
      density: -2,
    });
    expect(files["hyprland.lua"]).toContain("rounding = 28,");
    expect(files["hyprland.lua"]).toContain('"expressive" springs');
    expect(files["shell.spacing.toml"]).toMatch(/control-height\s+= 24 /);
    expect(files["shell.spacing.toml"]).toMatch(/panel-padding\s+= 16 /);
  });

  it("keep the shell opaque, except the flyouts when the exception is on", () => {
    const on = render();
    expect(on["shell.popups.toml"]).toMatch(/background-alpha = 0\.9 /);
    for (const name of ["bar", "tooltip", "notifications", "menu", "polkit", "lock"])
      expect(on[`shell.${name}.toml`], name).toMatch(/background-alpha\s+= 1 /);
    const off = render({
      ...defaultTokens,
      flyouts: { ...defaultTokens.flyouts, translucent: false },
    });
    expect(off["shell.popups.toml"]).toMatch(/background-alpha = 1 /);
  });
});
