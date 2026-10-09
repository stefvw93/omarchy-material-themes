import { argbFromHex } from "@material/material-color-utilities";
import { defaultTokens } from "@stef/tokens/runtime";
import { Effect, FileSystem, Layer, Path } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { createScheme, schemeToOmarchyColors } from "../scheme.ts";
import { ThemeOutputDirectory, ThemePath, ThemeTokens } from "./shared.ts";
import { makeThemeWriters, writeTheme } from "./writers.ts";

/** Renders every theme file for one palette, returning { fileName: content }. */
const render = (tokens = defaultTokens, isDark = true) => {
  const files: Record<string, string> = {};
  const fs = FileSystem.layerNoop({
    writeFileString: (path, content) =>
      Effect.sync(() => void (files[path.replace("/theme/", "")] = content)),
  });
  Effect.runSync(
    Effect.gen(function* () {
      const scheme = createScheme("expressive", argbFromHex("#4285f4"), isDark, 0);
      const colors = yield* schemeToOmarchyColors(scheme, [27, 142, 258]);
      yield* writeTheme(yield* makeThemeWriters, colors);
    }).pipe(
      Effect.provide(Layer.mergeAll(fs, Path.layer)),
      Effect.provideService(ThemeOutputDirectory, ThemePath("/theme")),
      Effect.provideService(ThemeTokens, tokens),
    ),
  );
  return files;
};

describe("theme files", () => {
  it.each([true, false])("match the golden output (dark: %s)", async (isDark) => {
    const files = render(defaultTokens, isDark);
    for (const [name, content] of Object.entries(files)) {
      await expect(content).toMatchFileSnapshot(
        `./__golden__/${isDark ? "dark" : "light"}/${name}`,
      );
    }
  });

  it("render the tokens they are given", () => {
    const lua = render({
      ...defaultTokens,
      gaps: { inner: 9, outer: 11, workspaces: 0 },
      motion: { scheme: "expressive" },
    })["hyprland.lua"];
    expect(lua).toContain("gaps_in = 9,");
    expect(lua).toContain("gaps_out = 11,");
    expect(lua).toContain('local omaterial_motion_scheme = "expressive"');
  });
});
