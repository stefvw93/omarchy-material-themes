import { type ColorRole, colorRoles } from "@stef/m3";
import { Schema } from "effect";

export const HexColor = Schema.String.check(Schema.isPattern(/^#[0-9a-f]{6}$/)).pipe(
  Schema.annotate({ description: "A lowercase #rrggbb colour.", examples: ["#6750a4"] }),
);
export type HexColor = typeof HexColor.Type;

export const Mode = Schema.Literals(["dark", "light"]);
export type Mode = typeof Mode.Type;

/**
 * material-color-utilities' scheme variants whose definition is how a seed
 * becomes the tonal palettes. Fidelity, content and monochrome also override
 * role tones, which the spec's tone table fixes, so they are not offered.
 */
export const Variant = Schema.Literals([
  "tonal-spot",
  "neutral",
  "vibrant",
  "expressive",
  "rainbow",
  "fruit-salad",
]);
export type Variant = typeof Variant.Type;

/** The spec's three contrast levels (Default, Medium, High). */
export const Contrast = Schema.Literals(["standard", "medium", "high"]);
export type Contrast = typeof Contrast.Type;

/** Every md.sys.color role the spec defines (not deprecated), as hex. */
export const SystemColors = Schema.Struct(
  Object.fromEntries(colorRoles.map((role) => [role, HexColor])) as {
    readonly [R in ColorRole]: typeof HexColor;
  },
);
export type SystemColors = typeof SystemColors.Type;

/** A static colour's four accent-convention roles, plus the terminal's bright variant. */
export const StaticColor = Schema.Struct({
  color: HexColor,
  onColor: HexColor,
  colorContainer: HexColor,
  onColorContainer: HexColor,
  /** A custom role on the same hue at full chroma: the terminal's bright_* slot. */
  bright: HexColor,
});
export type StaticColor = typeof StaticColor.Type;

/** Terminal hues besides red (which is the error role). */
export const StaticHue = Schema.Literals(["yellow", "orange", "green", "cyan", "blue", "magenta"]);
export type StaticHue = typeof StaticHue.Type;

export const StaticColors = Schema.Struct({
  yellow: StaticColor,
  orange: StaticColor,
  green: StaticColor,
  cyan: StaticColor,
  blue: StaticColor,
  magenta: StaticColor,
});
export type StaticColors = typeof StaticColors.Type;

/**
 * Omarchy's colors.toml keys, which its app templates (terminals, editors,
 * btop, …) consume. Based on the shipped themes, e.g.
 * https://github.com/basecamp/omarchy/blob/quattro/themes/matte-black/colors.toml
 */
export const OmarchyColors = Schema.Struct({
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

/** Everything a theme is coloured with, from one seed. */
export const ThemePalette = Schema.Struct({
  source: Schema.Struct({
    color: HexColor,
    variant: Variant,
    contrast: Contrast,
    mode: Mode,
    /** The spec (and its content version) the colour role tones come from. */
    spec: Schema.String,
  }),
  system: SystemColors,
  statics: StaticColors,
  omarchy: OmarchyColors,
});
export type ThemePalette = typeof ThemePalette.Type;
