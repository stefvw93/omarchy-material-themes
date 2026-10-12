import type { Tokens } from "@stef/tokens";
import type { ThemePalette } from "../../colors.ts";
import { generatedBy, makeThemeFileWriter } from "../shared.ts";
import { type ShellSection, sectionNotes, shellSections } from "../shell.ts";

const toml = (value: string | number | boolean) =>
  typeof value === "string" ? JSON.stringify(value) : String(value);

/** One `shell.<section>.toml`: Omarchy replaces that whole section of the shell's theme with it. */
export const renderShellSection = (name: string, section: ShellSection) => {
  const width = Math.max(...Object.keys(section).map((k) => k.length));
  return [
    `# ${generatedBy}`,
    `# ${sectionNotes[name] ?? ""}`,
    "",
    ...Object.entries(section).map(
      ([key, { value, source }]) => `${key.padEnd(width)} = ${toml(value)}  # ${source}`,
    ),
    "",
  ].join("\n");
};

/** The shell sections a theme ships, by file name. */
export const shellFiles = (palette: ThemePalette, tokens: Tokens) =>
  Object.fromEntries(
    Object.entries(shellSections({ palette, tokens })).map(([name, section]) => [
      `shell.${name}.toml`,
      renderShellSection(name, section),
    ]),
  );

export const shellSectionNames = [
  "bar",
  "hyprland",
  "controls",
  "spacing",
  "font",
  "popups",
  "tooltip",
  "notifications",
  "menu",
  "launcher",
  "polkit",
  "lock",
  "image-picker",
] as const;

export const writeShellSection = (name: (typeof shellSectionNames)[number]) =>
  makeThemeFileWriter(`shell.${name}.toml`, (palette, tokens) =>
    renderShellSection(name, shellSections({ palette, tokens })[name]!),
  );
