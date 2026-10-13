import {
  Blend,
  Contrast as ContrastRatio,
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

/** The least contrast a bright colour keeps against the surface: WCAG AA, or AAA at raised contrast. */
const brightContrastFloor: Readonly<Record<Contrast, number>> = {
  standard: 4.5,
  medium: 7,
  high: 7,
};

/** How far, in tones, a bright colour may move from its normal role. */
const brightReach = 10;

/**
 * A bright colour: the hue at the most chroma sRGB allows, at the tone within
 * `brightReach` of the normal role, toward the middle tones where the hue is
 * most vivid, that gives the most chroma and still clears the contrast floor
 * against the surface. Falls back to the normal tone (at full chroma).
 */
export const brightOf = (hue: number, normalTone: number, mode: Mode, contrast: Contrast) => {
  const surface = toneOf("surface", mode, contrast).tone;
  const floor = brightContrastFloor[contrast];
  const toward = mode === "dark" ? -1 : 1;
  let best = Hct.from(hue, 200, normalTone);
  for (let step = 1; step <= brightReach; step++) {
    const tone = normalTone + toward * step;
    if (tone < 0 || tone > 100 || ContrastRatio.ratioOfTones(tone, surface) < floor) break;
    const candidate = Hct.from(hue, 200, tone);
    if (candidate.chroma > best.chroma + 0.5) best = candidate;
  }
  return best.toInt();
};

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
      brightOf(
        palette.hue,
        toneOf("primary", options.mode, options.contrast).tone,
        options.mode,
        options.contrast,
      ),
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

/** bright_red: the error hue, made bright from the error role as the static colours are. */
export const brightError = (palettes: Palettes, mode: Mode, contrast: Contrast) =>
  hexFromArgb(brightOf(palettes.error.hue, toneOf("error", mode, contrast).tone, mode, contrast));
