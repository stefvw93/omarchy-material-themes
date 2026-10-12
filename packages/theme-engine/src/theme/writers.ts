import { Effect } from "effect";
import type { ThemePalette } from "../colors.ts";
import { writeColorsToml } from "./files/colors.toml.ts";
import { writeHyprlandLua } from "./files/hyprland.lua.ts";
import { writeOmaterialJson } from "./files/omaterial.json.ts";
import { shellSectionNames, writeShellSection } from "./files/shell.toml.ts";
import type { ThemeFileWriter } from "./shared.ts";

/** Writer for each theme file, by file name. */
export type ThemeWriters = Readonly<Record<string, ThemeFileWriter>>;

/**
 * Every theme file writer, bound to the `FileSystem`, `Path` and
 * `ThemeOutputDirectory` in context; each reads `ThemeTokens` when it writes.
 * Platform-agnostic: Studio provides Tauri layers, the CLI Node ones.
 */
export const makeThemeWriters = Effect.gen(function* () {
  const writers: Record<string, ThemeFileWriter> = {
    "colors.toml": yield* writeColorsToml,
    "hyprland.lua": yield* writeHyprlandLua,
    "omaterial.json": yield* writeOmaterialJson,
  };
  for (const name of shellSectionNames)
    writers[`shell.${name}.toml`] = yield* writeShellSection(name);
  return writers as ThemeWriters;
});

/** Writes every theme file for `palette`, concurrently. */
export const writeTheme = (writers: ThemeWriters, palette: ThemePalette) =>
  Effect.all(
    Object.values(writers).map((write) => write(palette)),
    { concurrency: "unbounded", discard: true },
  );
