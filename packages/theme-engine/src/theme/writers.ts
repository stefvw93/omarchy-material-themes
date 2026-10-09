import { Effect } from "effect";
import type { OmarchyColors } from "../colors.ts";
import { writeColorsToml } from "./files/colors.toml.ts";
import { writeHyprlandLua } from "./files/hyprland.lua.ts";
import {
  writeShellBarToml,
  writeShellControlsToml,
  writeShellFontToml,
  writeShellHyprlandToml,
  writeShellImagePickerToml,
  writeShellLauncherToml,
  writeShellLockToml,
  writeShellMenuToml,
  writeShellNotificationsToml,
  writeShellPolkitToml,
  writeShellPopupsToml,
  writeShellSpacingToml,
  writeShellTooltipsToml,
} from "./files/shell.toml.ts";
import type { ThemeFileWriter } from "./shared.ts";

export type ThemeWriters = Record<
  | "writeColorsToml"
  | "writeHyprlandLua"
  | "writeShellBarToml"
  | "writeShellHyprlandToml"
  | "writeShellControlsToml"
  | "writeShellSpacingToml"
  | "writeShellPopupsToml"
  | "writeShellTooltipsToml"
  | "writeShellFontToml"
  | "writeShellNotificationsToml"
  | "writeShellLauncherToml"
  | "writeShellMenuToml"
  | "writeShellPolkitToml"
  | "writeShellLockToml"
  | "writeShellImagePickerToml",
  ThemeFileWriter<OmarchyColors>
>;

/**
 * Every theme file writer, bound to the `FileSystem`, `Path` and
 * `ThemeOutputDirectory` in context. Platform-agnostic: Studio provides Tauri
 * layers, the CLI provides Node ones.
 */
export const makeThemeWriters = Effect.gen(function* () {
  const writers: ThemeWriters = {
    writeColorsToml: yield* writeColorsToml,
    writeHyprlandLua: yield* writeHyprlandLua,
    writeShellBarToml: yield* writeShellBarToml,
    writeShellHyprlandToml: yield* writeShellHyprlandToml,
    writeShellControlsToml: yield* writeShellControlsToml,
    writeShellSpacingToml: yield* writeShellSpacingToml,
    writeShellPopupsToml: yield* writeShellPopupsToml,
    writeShellTooltipsToml: yield* writeShellTooltipsToml,
    writeShellFontToml: yield* writeShellFontToml,
    writeShellNotificationsToml: yield* writeShellNotificationsToml,
    writeShellLauncherToml: yield* writeShellLauncherToml,
    writeShellMenuToml: yield* writeShellMenuToml,
    writeShellPolkitToml: yield* writeShellPolkitToml,
    writeShellLockToml: yield* writeShellLockToml,
    writeShellImagePickerToml: yield* writeShellImagePickerToml,
  };
  return writers;
});

/** Writes every theme file for `colors`, concurrently. */
export const writeTheme = (writers: ThemeWriters, colors: OmarchyColors) =>
  Effect.all(
    Object.values(writers).map((write) => write(colors)),
    { concurrency: "unbounded", discard: true },
  );
