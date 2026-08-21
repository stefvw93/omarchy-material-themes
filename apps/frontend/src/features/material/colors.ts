import { Schema } from "effect";
import { Contrast, Hct } from "@material/material-color-utilities";

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

function brightVariant(argb: number, targetRatio = 2) {
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
    return brightVariant(this.yellow, 1);
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
