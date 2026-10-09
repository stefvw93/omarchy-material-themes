import {
  argbFromRgb,
  type DynamicScheme,
  Hct,
  QuantizerCelebi,
  SchemeExpressive,
  SchemeFidelity,
  SchemeNeutral,
  SchemeRainbow,
  SchemeVibrant,
  Score,
  hexFromArgb as unsafeHexFromArgb,
} from "@material/material-color-utilities";
import { Effect, pipe, Schema } from "effect";
import { buildAnsiColors } from "./ansi.ts";
import { HexColor, type OmarchyColors, type SchemeKind } from "./colors.ts";
import { buildSurfaceColors } from "./surfaces.ts";

export const schemeConstructors = {
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  rainbow: SchemeRainbow,
} as const satisfies Record<typeof SchemeKind.Type, unknown>;

/** Longest edge, in pixels, an image is downscaled to before quantizing. */
export const quantizeMaxSize = 128;

/** The seed image reduced to what scheme building needs: one source colour, and the hues actually in it. */
export interface QuantizedSeed {
  sourceArgb: number;
  hues: number[];
}

/**
 * The ranked hues present in the image. `sourceColorFromImageBytes` collapses the
 * whole wallpaper to a single colour, which is what made every generated terminal
 * palette look alike — this keeps the rest of the distribution around.
 */
export const imageHues = (bytes: Uint8ClampedArray): number[] => {
  const pixels: number[] = [];

  for (let i = 0; i < bytes.length; i += 4) {
    if (bytes[i + 3]! < 255) continue;
    pixels.push(argbFromRgb(bytes[i]!, bytes[i + 1]!, bytes[i + 2]!));
  }

  const ranked = Score.score(QuantizerCelebi.quantize(pixels, 128), {
    desired: 12,
    filter: true,
  });

  return ranked.map((argb) => Hct.fromInt(argb).hue);
};

export const createScheme = (
  kind: keyof typeof schemeConstructors,
  sourceArgb: number,
  isDark = false,
  contrastLevel = 0,
): DynamicScheme => new schemeConstructors[kind](Hct.fromInt(sourceArgb), isDark, contrastLevel);

/** Maps a Material scheme onto Omarchy's colour keys, plus every Material role as `omaterial_*`. */
export const schemeToOmarchyColors = Effect.fn("ThemeEngine.schemeToOmarchyColors")(function* (
  scheme: DynamicScheme,
  imageHues: readonly number[],
) {
  const decodeHexColor = Schema.decodeEffect(HexColor);
  const hexFromArgb = (argb: number) => pipe(unsafeHexFromArgb(argb), decodeHexColor);

  const ansi = buildAnsiColors(scheme, imageHues);
  const surfaces = buildSurfaceColors(scheme);

  const colors: OmarchyColors = {
    mode: scheme.isDark ? "dark" : "light",

    accent: yield* hexFromArgb(scheme.primary),
    selection: yield* hexFromArgb(scheme.primaryContainer),
    muted: yield* hexFromArgb(surfaces.muted),

    background: yield* hexFromArgb(surfaces.background),
    dark_background: yield* hexFromArgb(surfaces.dark_background),
    darker_background: yield* hexFromArgb(surfaces.darker_background),
    lighter_background: yield* hexFromArgb(surfaces.lighter_background),

    foreground: yield* hexFromArgb(surfaces.foreground),
    dark_foreground: yield* hexFromArgb(surfaces.dark_foreground),
    light_foreground: yield* hexFromArgb(surfaces.light_foreground),
    bright_foreground: yield* hexFromArgb(surfaces.bright_foreground),

    red: yield* hexFromArgb(ansi.red),
    yellow: yield* hexFromArgb(ansi.yellow),
    green: yield* hexFromArgb(ansi.green),
    cyan: yield* hexFromArgb(ansi.cyan),
    blue: yield* hexFromArgb(ansi.blue),
    magenta: yield* hexFromArgb(ansi.magenta),

    bright_red: yield* hexFromArgb(ansi.bright_red),
    bright_yellow: yield* hexFromArgb(ansi.bright_yellow),
    bright_green: yield* hexFromArgb(ansi.bright_green),
    bright_cyan: yield* hexFromArgb(ansi.bright_cyan),
    bright_blue: yield* hexFromArgb(ansi.bright_blue),
    bright_magenta: yield* hexFromArgb(ansi.bright_magenta),

    orange: yield* hexFromArgb(ansi.orange),
    brown: yield* hexFromArgb(ansi.brown),

    // material

    omaterial_background: scheme.background,
    omaterial_error: scheme.error,
    omaterial_errorContainer: scheme.errorContainer,
    omaterial_errorDim: scheme.errorDim,
    omaterial_errorPaletteKeyColor: scheme.errorPaletteKeyColor,
    omaterial_inverseOnSurface: scheme.inverseOnSurface,
    omaterial_inversePrimary: scheme.inversePrimary,
    omaterial_inverseSurface: scheme.inverseSurface,
    omaterial_neutralPaletteKeyColor: scheme.neutralPaletteKeyColor,
    omaterial_neutralVariantPaletteKeyColor: scheme.neutralVariantPaletteKeyColor,
    omaterial_onBackground: scheme.onBackground,
    omaterial_onError: scheme.onError,
    omaterial_onErrorContainer: scheme.onErrorContainer,
    omaterial_onPrimary: scheme.onPrimary,
    omaterial_onPrimaryContainer: scheme.onPrimaryContainer,
    omaterial_onPrimaryFixed: scheme.onPrimaryFixed,
    omaterial_onPrimaryFixedVariant: scheme.onPrimaryFixedVariant,
    omaterial_onSecondary: scheme.onSecondary,
    omaterial_onSecondaryContainer: scheme.onSecondaryContainer,
    omaterial_onSecondaryFixed: scheme.onSecondaryFixed,
    omaterial_onSecondaryFixedVariant: scheme.onSecondaryFixedVariant,
    omaterial_onSurface: scheme.onSurface,
    omaterial_onSurfaceVariant: scheme.onSurfaceVariant,
    omaterial_onTertiary: scheme.onTertiary,
    omaterial_onTertiaryContainer: scheme.onTertiaryContainer,
    omaterial_onTertiaryFixed: scheme.onTertiaryFixed,
    omaterial_onTertiaryFixedVariant: scheme.onTertiaryFixedVariant,
    omaterial_outline: scheme.outline,
    omaterial_outlineVariant: scheme.outlineVariant,
    omaterial_primary: scheme.primary,
    omaterial_primaryContainer: scheme.primaryContainer,
    omaterial_primaryDim: scheme.primaryDim,
    omaterial_primaryFixed: scheme.primaryFixed,
    omaterial_primaryFixedDim: scheme.primaryFixedDim,
    omaterial_primaryPaletteKeyColor: scheme.primaryPaletteKeyColor,
    omaterial_scrim: scheme.scrim,
    omaterial_secondary: scheme.secondary,
    omaterial_secondaryContainer: scheme.secondaryContainer,
    omaterial_secondaryDim: scheme.secondaryDim,
    omaterial_secondaryFixed: scheme.secondaryFixed,
    omaterial_secondaryFixedDim: scheme.secondaryFixedDim,
    omaterial_secondaryPaletteKeyColor: scheme.secondaryPaletteKeyColor,
    omaterial_shadow: scheme.shadow,
    omaterial_surface: scheme.surface,
    omaterial_surfaceBright: scheme.surfaceBright,
    omaterial_surfaceContainer: scheme.surfaceContainer,
    omaterial_surfaceContainerHigh: scheme.surfaceContainerHigh,
    omaterial_surfaceContainerHighest: scheme.surfaceContainerHighest,
    omaterial_surfaceContainerLow: scheme.surfaceContainerLow,
    omaterial_surfaceContainerLowest: scheme.surfaceContainerLowest,
    omaterial_surfaceDim: scheme.surfaceDim,
    omaterial_surfaceTint: scheme.surfaceTint,
    omaterial_surfaceVariant: scheme.surfaceVariant,
    omaterial_tertiary: scheme.tertiary,
    omaterial_tertiaryContainer: scheme.tertiaryContainer,
    omaterial_tertiaryDim: scheme.tertiaryDim,
    omaterial_tertiaryFixed: scheme.tertiaryFixed,
    omaterial_tertiaryFixedDim: scheme.tertiaryFixedDim,
    omaterial_tertiaryPaletteKeyColor: scheme.tertiaryPaletteKeyColor,
  };

  return colors;
});
