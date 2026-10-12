/**
 * Studio's colours (interpretation studio.colors): the M3 roles of the theme
 * Omarchy has applied, or of the theme being previewed, as --md-sys-color-*
 * variables on <html>; m3.generated.css builds Tailwind and the shadcn
 * variables on them. Light or dark follows the scheme in effect.
 */
import { schemeOf, schemeRoles, type OmarchyColors } from "@stef/qml-kit";
import { homeDir, join } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/plugin-fs";

interface Shown {
  readonly mode: "light" | "dark";
  readonly color: Readonly<Record<string, string>>;
}

let applied: Shown | undefined;
let preview: Shown | undefined;

const render = () => {
  const shown = preview ?? applied;
  if (!shown) return;
  const root = document.documentElement;
  for (const role of schemeRoles) {
    const value = shown.color[role];
    if (value) root.style.setProperty(`--md-sys-color-${role}`, value);
  }
  root.classList.toggle("dark", shown.mode === "dark");
  root.classList.toggle("light", shown.mode === "light");
  root.style.colorScheme = shown.mode;
};

/** Shows a scheme in place of the applied theme's until the returned function runs. */
export const showPreview = (scheme: Shown): (() => void) => {
  preview = scheme;
  render();
  return () => {
    if (preview === scheme) preview = undefined;
    render();
  };
};

/**
 * The five colours Omarchy gives the shell (qs.Commons Color), read from a
 * theme's colors.toml the way Color.qml does: accent falls back to color4,
 * muted to color8, and urgent is red (color1).
 */
export const omarchyColorsOf = (toml: string): OmarchyColors => {
  const keys: Record<string, string> = {};
  for (const line of toml.split("\n")) {
    const m = /^\s*([a-z0-9_]+)\s*=\s*"(#[0-9a-fA-F]{6})/.exec(line);
    if (m) keys[m[1]!] = m[2]!;
  }
  const foreground = keys["foreground"] ?? keys["color7"] ?? "#cacccc";
  return {
    background: keys["background"] ?? keys["color0"] ?? "#101315",
    foreground,
    accent: keys["accent"] ?? keys["color4"] ?? foreground,
    muted: keys["muted"] ?? keys["color8"] ?? foreground,
    urgent: keys["red"] ?? keys["color1"] ?? "#a55555",
  };
};

const read = (path: string) => readTextFile(path).catch(() => undefined);

/**
 * Follows the applied theme. Studio's Apply re-applies the same theme name
 * (omaterial-dev) with new colours, so the theme's files themselves are
 * compared; they are small. Polled: Studio has no file watcher.
 */
export const followAppliedTheme = async (intervalMs = 2000): Promise<void> => {
  // Something to draw with before the theme is read, and outside Tauri (a
  // plain browser on the dev server): the Omarchy fallback from its defaults.
  if (!applied) {
    const fallback = schemeOf(undefined, omarchyColorsOf(""));
    applied = { mode: fallback.mode, color: fallback.color };
    render();
  }
  if (!("__TAURI_INTERNALS__" in window)) return;
  const theme = await join(await homeDir(), ".local", "state", "omarchy", "current", "theme");
  const jsonPath = await join(theme, "omaterial.json");
  const tomlPath = await join(theme, "colors.toml");
  let last: string | undefined;
  const check = async () => {
    const [json, toml] = await Promise.all([read(jsonPath), read(tomlPath)]);
    const key = `${json ?? ""}\0${toml ?? ""}`;
    if (key === last) return;
    last = key;
    const scheme = schemeOf(json, omarchyColorsOf(toml ?? ""));
    applied = { mode: scheme.mode, color: scheme.color };
    render();
  };
  await check();
  setInterval(() => void check(), intervalMs);
};
