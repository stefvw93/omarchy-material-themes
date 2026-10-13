/**
 * Studio's text size (interpretation text.scale): Omarchy's text size (the
 * shell's [font] base-size in ~/.config/omarchy/shell.toml) times
 * tokens.type.scale, as --stef-text-scale on <html>. m3.generated.css
 * multiplies the type roles by it and grows text containers (h-text-*);
 * spacing, icons and the root font size stay at 1×.
 */
import { resolveTokens } from "@stef/tokens/runtime";
import { fontBaseSizeOf, OMARCHY_TEXT_BASE, textScaleOf } from "@stef/tokens/text-scale";
import { homeDir, join } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/plugin-fs";

let baseSize = OMARCHY_TEXT_BASE;
let typeScale = 1;

const render = () => {
  const scale = textScaleOf({ typeScale, sizes: {}, containers: {} }, baseSize);
  document.documentElement.style.setProperty("--stef-text-scale", String(scale));
};

/** The Tokens page's type.scale while it is being edited, ahead of tokens.json. */
export const setTypeScale = (scale: number) => {
  typeScale = scale;
  render();
};

const read = (path: string) => readTextFile(path).catch(() => undefined);

/**
 * Follows the text size and tokens.json. Polled, like the applied theme
 * (src/m3/scheme.ts): Studio has no file watcher. A file is only applied when
 * its contents change, so a poll never undoes an edit that isn't saved yet.
 */
export const followTextScale = async (intervalMs = 2000): Promise<void> => {
  render();
  if (!("__TAURI_INTERNALS__" in window)) return;
  const config = await join(await homeDir(), ".config", "omarchy");
  const shellPath = await join(config, "shell.toml");
  const tokensPath = await join(config, "stef", "tokens.json");
  let lastShell: string | undefined;
  let lastTokens: string | undefined;
  const check = async () => {
    const [shell, tokens] = await Promise.all([read(shellPath), read(tokensPath)]);
    if (shell === lastShell && tokens === lastTokens) return;
    if (shell !== lastShell) baseSize = fontBaseSizeOf(shell ?? "") ?? OMARCHY_TEXT_BASE;
    if (tokens !== lastTokens) typeScale = resolveTokens(tokens).type.scale;
    lastShell = shell;
    lastTokens = tokens;
    render();
  };
  await check();
  setInterval(() => void check(), intervalMs);
};
