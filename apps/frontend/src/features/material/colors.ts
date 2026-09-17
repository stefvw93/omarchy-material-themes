import { Schema } from "effect";

export const HexColor = Schema.String.check(
  Schema.isPattern(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
).pipe(
  Schema.annotate({
    description: "A hex color string (#RGB, #RRGGBB, or #RRGGBBAA).",
    examples: ["#ff0000", "#f00"],
  }),
);
export type HexColor = typeof HexColor.Type;

export const Mode = Schema.Union([Schema.Literal("dark"), Schema.Literal("light")]);
export type Mode = typeof Mode.Type;

export const ContrastLevel = Schema.Number.check(Schema.isBetween({ minimum: -1, maximum: 1 }));
export type ContrastLevel = typeof ContrastLevel.Type;

export const SchemeKind = Schema.Union([
  Schema.Literal("expressive"),
  Schema.Literal("fidelity"),
  Schema.Literal("neutral"),
  Schema.Literal("vibrant"),
  Schema.Literal("rainbow"),
]);

/**
 * Based on existing theme colors.toml: https://github.com/basecamp/omarchy/blob/quattro/themes/matte-black/colors.toml
 */
export const OmarchyColors = Schema.Struct({
  mode: Mode,

  accent: HexColor,
  selection: HexColor,
  muted: HexColor,

  background: HexColor,
  dark_background: HexColor,
  darker_background: HexColor,
  lighter_background: HexColor,

  foreground: HexColor,
  dark_foreground: HexColor,
  light_foreground: HexColor,
  bright_foreground: HexColor,

  red: HexColor,
  yellow: HexColor,
  orange: HexColor,
  green: HexColor,
  cyan: HexColor,
  blue: HexColor,
  magenta: HexColor,
  brown: HexColor,

  bright_red: HexColor,
  bright_yellow: HexColor,
  bright_green: HexColor,
  bright_cyan: HexColor,
  bright_blue: HexColor,
  bright_magenta: HexColor,

  // material
  omaterial_background: Schema.Number,
  omaterial_error: Schema.Number,
  omaterial_errorContainer: Schema.Number,
  omaterial_errorDim: Schema.Number,
  omaterial_errorPaletteKeyColor: Schema.Number,
  omaterial_inverseOnSurface: Schema.Number,
  omaterial_inversePrimary: Schema.Number,
  omaterial_inverseSurface: Schema.Number,
  omaterial_neutralPaletteKeyColor: Schema.Number,
  omaterial_neutralVariantPaletteKeyColor: Schema.Number,
  omaterial_onBackground: Schema.Number,
  omaterial_onError: Schema.Number,
  omaterial_onErrorContainer: Schema.Number,
  omaterial_onPrimary: Schema.Number,
  omaterial_onPrimaryContainer: Schema.Number,
  omaterial_onPrimaryFixed: Schema.Number,
  omaterial_onPrimaryFixedVariant: Schema.Number,
  omaterial_onSecondary: Schema.Number,
  omaterial_onSecondaryContainer: Schema.Number,
  omaterial_onSecondaryFixed: Schema.Number,
  omaterial_onSecondaryFixedVariant: Schema.Number,
  omaterial_onSurface: Schema.Number,
  omaterial_onSurfaceVariant: Schema.Number,
  omaterial_onTertiary: Schema.Number,
  omaterial_onTertiaryContainer: Schema.Number,
  omaterial_onTertiaryFixed: Schema.Number,
  omaterial_onTertiaryFixedVariant: Schema.Number,
  omaterial_outline: Schema.Number,
  omaterial_outlineVariant: Schema.Number,
  omaterial_primary: Schema.Number,
  omaterial_primaryContainer: Schema.Number,
  omaterial_primaryDim: Schema.Number,
  omaterial_primaryFixed: Schema.Number,
  omaterial_primaryFixedDim: Schema.Number,
  omaterial_primaryPaletteKeyColor: Schema.Number,
  omaterial_scrim: Schema.Number,
  omaterial_secondary: Schema.Number,
  omaterial_secondaryContainer: Schema.Number,
  omaterial_secondaryDim: Schema.Number,
  omaterial_secondaryFixed: Schema.Number,
  omaterial_secondaryFixedDim: Schema.Number,
  omaterial_secondaryPaletteKeyColor: Schema.Number,
  omaterial_shadow: Schema.Number,
  omaterial_surface: Schema.Number,
  omaterial_surfaceBright: Schema.Number,
  omaterial_surfaceContainer: Schema.Number,
  omaterial_surfaceContainerHigh: Schema.Number,
  omaterial_surfaceContainerHighest: Schema.Number,
  omaterial_surfaceContainerLow: Schema.Number,
  omaterial_surfaceContainerLowest: Schema.Number,
  omaterial_surfaceDim: Schema.Number,
  omaterial_surfaceTint: Schema.Number,
  omaterial_surfaceVariant: Schema.Number,
  omaterial_tertiary: Schema.Number,
  omaterial_tertiaryContainer: Schema.Number,
  omaterial_tertiaryDim: Schema.Number,
  omaterial_tertiaryFixed: Schema.Number,
  omaterial_tertiaryFixedDim: Schema.Number,
  omaterial_tertiaryPaletteKeyColor: Schema.Number,
});

export type OmarchyColors = typeof OmarchyColors.Type;
