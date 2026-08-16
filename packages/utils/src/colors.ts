import { Data, Effect, pipe, Schema } from "effect";
import {
  argbFromHex as unsafeArgbFromHex,
  Blend,
  Contrast,
  DynamicScheme,
  Hct,
  hexFromArgb as unsafeHexFromArgb,
} from "@material/material-color-utilities";

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
});

export type OmarchyColors = typeof OmarchyColors.Type;

function brightVariant(argb: number, targetRatio = 1.4) {
  const hct = Hct.fromInt(argb);
  hct.tone = Contrast.lighterUnsafe(hct.tone, targetRatio);
  return hct.toInt();
}

/**
 * Shade 500 for default, shade A200 for bright.
 * @link https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors
 * */
export const MATERIAL_REFERENCE_COLORS_2014_ARGB = {
  red: 0xf44336,
  yellow: 0xffeb3b,
  green: 0x4caf50,
  cyan: 0x00bcd4,
  blue: 0x2196f3,
  magenta: 0xc61e94,

  get bright_red() {
    return brightVariant(this.red);
  },
  get bright_yellow() {
    return brightVariant(this.yellow);
  },
  get bright_green() {
    return brightVariant(this.green);
  },
  get bright_cyan() {
    return brightVariant(this.cyan);
  },
  get bright_blue() {
    return brightVariant(this.blue);
  },
  get bright_magenta() {
    return brightVariant(this.magenta);
  },

  orange: 0xff9800,
  brown: 0x795548,
} as const;

export const decodeHexColor = Schema.decodeUnknownSync(HexColor);

export class UnexpectedHexError extends Data.TaggedError(
  "@material/material-color-utilities/UnexpectedHexError",
) {}

export const argbFromHex = (hex: typeof HexColor.Type) =>
  Effect.gen(function* () {
    const decoded = yield* Schema.decodeEffect(HexColor)(hex);
    return yield* Effect.try({
      try: () => unsafeArgbFromHex(decoded),
      catch: () => new UnexpectedHexError(),
    });
  });

export const htcFromHex = (hex: typeof HexColor.Type) =>
  Effect.gen(function* () {
    const argb = yield* argbFromHex(hex);
    return Hct.fromInt(argb);
  });

export const omarchyColorsFromMaterialSeed = (seed: HexColor, mode: Mode) =>
  Effect.gen(function* () {
    yield* Effect.log(`omarchyColorsFromMaterialSeed: seed=${seed}, mode=${mode}`);

    const sourceColorARGB = yield* argbFromHex(seed);

    const scheme = new DynamicScheme({
      sourceColorHct: Hct.fromInt(sourceColorARGB),
      isDark: mode === "dark",
      variant: 1,
      contrastLevel: 0,
    });

    const hexFromArgb = (argb: number) => pipe(unsafeHexFromArgb(argb), decodeHexColor);
    const harmonize = (argb: number) =>
      pipe(argb, (argb) => Blend.harmonize(argb, sourceColorARGB), hexFromArgb, decodeHexColor);

    const colors: OmarchyColors = {
      mode: mode,

      accent: hexFromArgb(scheme.primary),
      selection: hexFromArgb(scheme.primaryContainer),
      muted: hexFromArgb(scheme.onSurfaceVariant),

      background: hexFromArgb(scheme.surface),
      dark_background: hexFromArgb(scheme.surfaceContainerLow),
      darker_background: hexFromArgb(scheme.surfaceContainerLowest),
      lighter_background: hexFromArgb(scheme.surfaceBright),

      foreground: hexFromArgb(scheme.onSurface),
      dark_foreground: hexFromArgb(Contrast.darkerUnsafe(scheme.onSurface, 1)),
      light_foreground: hexFromArgb(Contrast.lighterUnsafe(scheme.onSurface, 1)),
      bright_foreground: hexFromArgb(Contrast.lighterUnsafe(scheme.onSurface, 1.4)),

      red: hexFromArgb(scheme.error),
      // red: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.red),
      yellow: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.yellow),
      green: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.green),
      cyan: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.cyan),
      blue: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.blue),
      magenta: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.magenta),

      bright_red: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_red),
      bright_yellow: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_yellow),
      bright_green: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_green),
      bright_cyan: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_cyan),
      bright_blue: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_blue),
      bright_magenta: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_magenta),

      orange: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.orange),
      brown: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.brown),
    };

    return colors;
  });
