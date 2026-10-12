import { argbFromHex, hexFromArgb } from "@material/material-color-utilities";
import { interpretation, spec } from "@stef/m3";
import type {
  Contrast,
  Mode,
  OmarchyColors,
  StaticColors,
  SystemColors,
  ThemePalette,
  Variant,
} from "./colors.ts";
import { createPalettes, systemColors } from "./scheme.ts";
import { brightError, staticColors } from "./static-colors.ts";

export interface PaletteOptions {
  /** The seed: the image's source colour. */
  readonly sourceArgb: number;
  readonly variant: Variant;
  readonly mode: Mode;
  readonly contrast: Contrast;
}

/**
 * Omarchy's colors.toml keys from the spec roles. Omarchy names its tiers by
 * direction (dark_background is darker than background in both modes), M3 by
 * elevation, so each key picks the role that keeps that direction.
 */
export const omarchyColors = (
  system: SystemColors,
  statics: StaticColors,
  extra: { readonly brown: string; readonly brightRed: string },
  mode: Mode,
): OmarchyColors => {
  interpretation("omarchy.surfaces");
  interpretation("omarchy.text");
  interpretation("omarchy.selection");
  const dark = mode === "dark";
  return {
    accent: system.primary,
    selection: system["primary-container"],
    muted: system.outline,

    background: system.surface,
    dark_background: dark ? system["surface-container-lowest"] : system["surface-container"],
    darker_background: dark ? system["surface-container-lowest"] : system["surface-dim"],
    lighter_background: dark ? system["surface-container-high"] : system["surface-container-low"],

    foreground: system["on-surface"],
    light_foreground: system["on-surface-variant"],
    dark_foreground: system.outline,
    bright_foreground: system["on-primary-container"],

    red: system.error,
    bright_red: extra.brightRed,
    yellow: statics.yellow.color,
    bright_yellow: statics.yellow.bright,
    orange: statics.orange.color,
    brown: extra.brown,
    green: statics.green.color,
    bright_green: statics.green.bright,
    cyan: statics.cyan.color,
    bright_cyan: statics.cyan.bright,
    blue: statics.blue.color,
    bright_blue: statics.blue.bright,
    magenta: statics.magenta.color,
    bright_magenta: statics.magenta.bright,
  };
};

/** Every colour of a theme from one seed: spec roles, static colours, Omarchy keys. */
export const createPalette = (options: PaletteOptions): ThemePalette => {
  const palettes = createPalettes(options.sourceArgb, options.variant);
  const system = systemColors(palettes, options.mode, options.contrast);
  // Red needs no static colour of its own: the error role is one (citations.errorIsStaticRed).
  const { statics, brown } = staticColors(options);
  const brightRed = brightError(palettes, options.mode, options.contrast);
  return {
    source: {
      color: hexFromArgb(options.sourceArgb),
      variant: options.variant,
      contrast: options.contrast,
      mode: options.mode,
      spec: `${spec.site} ${spec.version}`,
    },
    system,
    statics,
    omarchy: omarchyColors(system, statics, { brown, brightRed }, options.mode),
  };
};

/** The palette for a hex seed. */
export const createPaletteFromHex = (hex: string, options: Omit<PaletteOptions, "sourceArgb">) =>
  createPalette({ ...options, sourceArgb: argbFromHex(hex) });
