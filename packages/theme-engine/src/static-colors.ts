import {
  Blend,
  clampDouble,
  Hct,
  hexFromArgb,
  TonalPalette,
} from "@material/material-color-utilities";
import { interpretation } from "@stef/m3";
import type { Contrast, Mode, StaticColor, StaticColors, StaticHue } from "./colors.ts";
import { type Palettes, toneOf } from "./scheme.ts";

/**
 * Reference colours of the terminal hues, as HCT hues (HCT red sits near 27°,
 * not RGB's 0°). The spec leaves the reference colour of a static colour to
 * the product.
 */
export const STATIC_HUES: Readonly<Record<StaticHue, number>> = {
  orange: 58,
  yellow: 95,
  green: 142,
  cyan: 205,
  blue: 258,
  magenta: 328,
};
interpretation("static.reference-hues");

/**
 * material-color-utilities' static ("custom") colour palette: CorePalette's
 * accent 1, hue from the colour and chroma at least 48. Built directly, as
 * CorePalette is deprecated.
 */
const accentPalette = (argb: number) => {
  const hct = Hct.fromInt(argb);
  return TonalPalette.fromHueAndChroma(hct.hue, Math.max(48, hct.chroma));
};

/** A palette tone `steps` further from the background than `tone`: lighter in dark mode. */
const brighter = (palette: TonalPalette, tone: number, mode: Mode, steps = 10) =>
  palette.tone(clampDouble(0, 100, tone + (mode === "dark" ? steps : -steps)));

export interface StaticOptions {
  readonly sourceArgb: number;
  readonly mode: Mode;
  readonly contrast: Contrast;
}

/**
 * One static colour (spec: styles/color/advanced, "Define static colors"):
 * harmonized to the scheme's source colour with Blend, then given the four
 * roles that "follow the conventions of the accent colors": the spec's tones
 * of the primary roles, taken from the static colour's palette.
 */
export const staticColor = (reference: number, options: StaticOptions) => {
  interpretation("static.harmonize-source");
  const palette = accentPalette(Blend.harmonize(reference, options.sourceArgb));
  interpretation("static.roles");
  const at = (
    role:
      | "primary"
      | "on-primary"
      | "primary-container"
      | "on-primary-container"
      | "on-primary-fixed-variant",
  ) => palette.tone(toneOf(role, options.mode, options.contrast).tone);
  interpretation("static.bright");
  const roles: StaticColor = {
    color: hexFromArgb(at("primary")),
    onColor: hexFromArgb(at("on-primary")),
    colorContainer: hexFromArgb(at("primary-container")),
    onColorContainer: hexFromArgb(at("on-primary-container")),
    bright: hexFromArgb(
      brighter(palette, toneOf("primary", options.mode, options.contrast).tone, options.mode),
    ),
  };
  return { roles, fixedVariant: hexFromArgb(at("on-primary-fixed-variant")) };
};

export const staticColors = (options: StaticOptions) => {
  const entries = Object.entries(STATIC_HUES).map(
    ([name, hue]) => [name, staticColor(Hct.from(hue, 48, 50).toInt(), options)] as const,
  );
  const statics = Object.fromEntries(entries.map(([n, s]) => [n, s.roles])) as StaticColors;
  /** Brown is not a hue: orange's fixed on-variant, a dark tone in both modes. */
  interpretation("static.brown");
  const brown = Object.fromEntries(entries)["orange"]!.fixedVariant;
  return { statics, brown };
};

/** bright_red: the error palette, one step brighter than the error role. */
export const brightError = (palettes: Palettes, mode: Mode, contrast: Contrast) =>
  hexFromArgb(brighter(palettes.error, toneOf("error", mode, contrast).tone, mode));
