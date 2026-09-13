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

export const RGBAColor = Schema.String.check(Schema.isPattern(/^rgba\([0-9a-fA-F]{8}\)$/)).pipe(
  Schema.annotate({
    description: "A Hyprland rgba color string.",
    examples: ["rgba(584e51aa)"],
  }),
);
export type RGBAColor = typeof RGBAColor.Type;

export const GradientAngle = Schema.String.check(Schema.isPattern(/^[0-9]{1,3}deg$/)).pipe(
  Schema.annotate({
    description: "A Hyprland gradient angle descriptor.",
    examples: ["45deg"],
  }),
);
export type GradientAngle = typeof GradientAngle.Type;

export const HyprlandGradient = Schema.Tuple([RGBAColor, RGBAColor, GradientAngle]);

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

  hyprland_active_border: Schema.Union([HyprlandGradient, RGBAColor]),
  hyprland_inactive_border: Schema.Union([HyprlandGradient, RGBAColor]),
});

export type OmarchyColors = typeof OmarchyColors.Type;
