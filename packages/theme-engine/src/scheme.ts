import {
  Hct,
  hexFromArgb,
  SchemeExpressive,
  SchemeFruitSalad,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
  type TonalPalette,
} from "@material/material-color-utilities";
import {
  type ColorRole,
  colorRoles,
  colorTones,
  interpretation,
  type TonalPaletteName,
} from "@stef/m3";
import type { Contrast, Mode, SystemColors, Variant } from "./colors.ts";

/** material-color-utilities' scheme variants: each defines how the seed becomes tonal palettes. */
export const variants = {
  "tonal-spot": SchemeTonalSpot,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  rainbow: SchemeRainbow,
  "fruit-salad": SchemeFruitSalad,
} as const satisfies Record<Variant, unknown>;

/** material-color-utilities' contrast levels for the spec's three (used only for comparisons). */
export const contrastLevels = { standard: 0, medium: 0.5, high: 1 } as const satisfies Record<
  Contrast,
  number
>;

/** Longest edge, in pixels, an image is downscaled to before quantizing. */
export const quantizeMaxSize = 128;

export type Palettes = Readonly<Record<TonalPaletteName, TonalPalette>>;

/**
 * The six reference palettes for a seed (spec: "Dynamic color is powered by
 * the Material Color Utilities"). The variant shapes the palettes; the 2021
 * definitions are the ones the spec's md.sys.color tone table belongs to.
 */
export const createPalettes = (sourceArgb: number, variant: Variant): Palettes => {
  interpretation("color.variants");
  const scheme = new variants[variant](Hct.fromInt(sourceArgb), false, 0, "2021");
  return {
    primary: scheme.primaryPalette,
    secondary: scheme.secondaryPalette,
    tertiary: scheme.tertiaryPalette,
    neutral: scheme.neutralPalette,
    "neutral-variant": scheme.neutralVariantPalette,
    error: scheme.errorPalette,
  };
};

/** The spec's reference palette and tone for a role (md.sys.color), in a mode and contrast. */
export const toneOf = (role: ColorRole, mode: Mode, contrast: Contrast) => {
  const entry = colorTones[`${mode}|${contrast}`]?.[role];
  if (!entry) throw new Error(`no tone for ${role} (${mode}, ${contrast})`);
  return { palette: entry[0], tone: entry[1] };
};

/** A role's colour: its spec tone of the matching palette. */
export const roleArgb = (palettes: Palettes, role: ColorRole, mode: Mode, contrast: Contrast) => {
  const { palette, tone } = toneOf(role, mode, contrast);
  return palettes[palette].tone(tone);
};

/** Every spec colour role, as hex. */
export const systemColors = (palettes: Palettes, mode: Mode, contrast: Contrast): SystemColors =>
  Object.fromEntries(
    colorRoles.map((role) => [role, hexFromArgb(roleArgb(palettes, role, mode, contrast))]),
  ) as SystemColors;
