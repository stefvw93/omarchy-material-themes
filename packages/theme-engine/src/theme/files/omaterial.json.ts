import type { Tokens } from "@stef/tokens";
import type { ThemePalette } from "../../colors.ts";
import { makeThemeFileWriter } from "../shared.ts";
import { textSpecOf } from "../shell.ts";

/**
 * omaterial.json: the whole palette (seed, M3 roles, static colours) and the
 * unscaled text sizes (`text`, for stef.omaterial's live text resizing) for
 * the QML plugins. Omarchy copies it into the current theme, so it switches
 * with the theme and is absent under other themes.
 */
export const renderOmaterialJson = (palette: ThemePalette, tokens: Tokens) =>
  `${JSON.stringify({ ...palette, text: textSpecOf({ palette, tokens }) }, null, 2)}\n`;

export const writeOmaterialJson = makeThemeFileWriter("omaterial.json", renderOmaterialJson);
