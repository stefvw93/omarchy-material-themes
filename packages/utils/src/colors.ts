import { pipe, Schema } from "effect";
import {
  argbFromHex,
  Hct,
  hexFromArgb,
  SchemeTonalSpot,
  themeFromSourceColor,
} from "@material/material-color-utilities";

export const HexColor = Schema.TemplateLiteral(["#", Schema.String]).pipe(
  Schema.annotate({
    description: "A hex color string.",
    examples: ["#ff0000", "#f00"],
  }),
);
export type HexColor = typeof HexColor.Type;

export const Mode = Schema.Union([Schema.Literal("dark"), Schema.Literal("light")]);
export type Mode = typeof Mode.Type;

/**
 * Based on existing theme colors.toml: https://github.com/basecamp/omarchy/blob/quattro/themes/matte-black/colors.toml
 *
 * mode = "dark"
 *
 * accent = "#e68e0d"
 * selection = "#2a2a2a"
 * muted = "#333333"
 *
 * background = "#121212"
 * dark_background = "#0d0d0d"
 * darker_background = "#090909"
 * lighter_background = "#1e1e1e"
 *
 * foreground = "#bebebe"
 * dark_foreground = "#555555"
 * light_foreground = "#8a8a8d"
 * bright_foreground = "#bebebe"
 *
 * red = "#D35F5F"
 * yellow = "#b91c1c"
 * orange = "#c63d3d"
 * green = "#FFC107"
 * cyan = "#bebebe"
 * blue = "#e68e0d"
 * magenta = "#D35F5F"
 * brown = "#631e1e"
 *
 * bright_red = "#B91C1C"
 * bright_yellow = "#b90a0a"
 * bright_green = "#FFC107"
 * bright_cyan = "#eaeaea"
 * bright_blue = "#f59e0b"
 * bright_magenta = "#B91C1C"
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

export const decodeHexColor = Schema.decodeUnknownSync(HexColor);

export const htcFromHex = (hex: typeof HexColor.Type) =>
  pipe(
    hex,
    (str) => decodeHexColor(str),
    (hex) => argbFromHex(hex),
    (int) => Hct.fromInt(int),
  );

export const omarchyColorsFromMaterialSeed = (seed: HexColor, mode: Mode): OmarchyColors => {
  const theme = themeFromSourceColor(argbFromHex(seed));
  const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(seed)), true, 0); // 0 = standard contrast

  const colors: OmarchyColors = {
    mode: mode,

    accent: "#00ff00",
    selection: "#00ff00",
    muted: "#00ff00",

    background: "#00ff00",
    dark_background: "#00ff00",
    darker_background: "#00ff00",
    lighter_background: "#00ff00",

    foreground: "#00ff00",
    dark_foreground: "#00ff00",
    light_foreground: "#00ff00",
    bright_foreground: "#00ff00",

    red: "#00ff00",
    yellow: "#00ff00",
    orange: "#00ff00",
    green: "#00ff00",
    cyan: "#00ff00",
    blue: "#00ff00",
    magenta: "#00ff00",
    brown: "#00ff00",

    bright_red: "#00ff00",
    bright_yellow: "#00ff00",
    bright_green: "#00ff00",
    bright_cyan: "#00ff00",
    bright_blue: "#00ff00",
    bright_magenta: "#00ff00",
  };

  return colors;
};
