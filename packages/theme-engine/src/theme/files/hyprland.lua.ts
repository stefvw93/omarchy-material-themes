import { colorRoleOf, type CompTokenName, interpretation } from "@stef/m3";
import { hyprlandTokensLua, type Tokens, windowShadow } from "@stef/tokens";
import type { ThemePalette } from "../../colors.ts";
import { generatedBy, makeThemeFileWriter } from "../shared.ts";

const rgb = (hex: string) => `rgb(${hex.slice(1)})`;
const rgba = (hex: string, alpha: number) =>
  `rgba(${hex.slice(1)}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")})`;

/** hyprland.lua: the tokens' shape, spacing and motion, coloured from the palette. */
export const renderHyprlandLua = (palette: ThemePalette, tokens: Tokens) => {
  const ctx = {
    theme: palette.source.mode,
    contrast: palette.source.contrast,
    motionScheme: tokens.motion.scheme,
    font: "static",
  } as const;
  const color = (name: CompTokenName) => palette.system[colorRoleOf(name, ctx)];
  const shadow = windowShadow();
  interpretation("hyprland.borders");
  interpretation("hyprland.groupbar");
  return `--
-- ${generatedBy}
--

${hyprlandTokensLua(tokens)}
-- Colour (seed ${palette.source.color}, ${palette.source.variant}, ${palette.source.mode}, ${palette.source.contrast} contrast).
hl.config({
  general = {
    col = {
      -- The focused window wears the focus indicator; others an outlined card's outline.
      active_border = "${rgb(color("md.comp.menus.menu-item.focus.indicator.color"))}",
      inactive_border = "${rgb(color("md.comp.outlined-card.outline.color"))}",
    },
  },
  decoration = {
    shadow = {
      color = "${rgba(palette.system.shadow, shadow.opacity)}",
      color_inactive = "${rgba(palette.system.shadow, shadow.opacity)}",
    },
  },
  group = {
    col = {
      border_active = "${rgb(color("md.comp.menus.menu-item.focus.indicator.color"))}",
      border_inactive = "${rgb(color("md.comp.outlined-card.outline.color"))}",
    },
    groupbar = {
      -- Size, padding and corners come with the tokens above (groupbarOf).
      enabled = true,
      render_titles = true,
      keep_upper_gap = false,
      indicator_height = 0,
      gradients = true,
      blur = false,
      text_color = "${rgb(color("md.comp.list.list-item.selected.label-text.color"))}",
      text_color_inactive = "${rgb(palette.system["on-surface-variant"])}",
      col = {
        active = "${rgb(color("md.comp.list.list-item.selected.container.color"))}",
        inactive = "${rgb(palette.system["surface-container"])}",
      },
    },
  },
})

-- A lone tiled window (or a fullscreen one) sits flush against the screen edges.
-- local m3_lone_window = "w[t1] w[tg0]"
-- hl.workspace_rule({ workspace = m3_lone_window, gaps_out = 0, gaps_in = 0 })
-- hl.workspace_rule({ workspace = "f[1]", gaps_out = 0, gaps_in = 0 })
-- hl.window_rule({ name = "m3-lone-flush", match = { float = false, workspace = m3_lone_window }, border_size = 0, rounding = 0 })
-- hl.window_rule({ name = "m3-fullscreen-flush", match = { float = false, workspace = "f[1]" }, border_size = 0, rounding = 0 })
`;
};

export const writeHyprlandLua = makeThemeFileWriter("hyprland.lua", renderHyprlandLua);
