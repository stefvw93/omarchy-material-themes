import { colorRoles } from "@stef/m3";
import type { ThemePalette } from "../../colors.ts";
import { generatedBy, makeThemeFileWriter } from "../shared.ts";

/**
 * colors.toml: Omarchy's palette keys, which its app templates (terminals,
 * editors, btop, …) render, then every M3 colour role as omaterial_<role>
 * for templates and tools that want the roles themselves.
 */
export const renderColorsToml = (palette: ThemePalette) =>
  [
    `# ${generatedBy}`,
    `# Seed ${palette.source.color}, ${palette.source.variant}, ${palette.source.contrast} contrast; tones from ${palette.source.spec}.`,
    "",
    `mode = "${palette.source.mode}"`,
    ...Object.entries(palette.omarchy).map(([key, value]) => `${key} = "${value}"`),
    "",
    "# Material 3 colour roles (md.sys.color.*).",
    ...colorRoles.map(
      (role) => `omaterial_${role.replaceAll("-", "_")} = "${palette.system[role]}"`,
    ),
    "",
  ].join("\n");

export const writeColorsToml = makeThemeFileWriter("colors.toml", renderColorsToml);
