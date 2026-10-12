// What Service.qml asks of an Omaterial theme when the text size or the theme
// changes (interpretation text.scale). The theme pins every size, so the
// shell's own base-size scaling never reaches it; this applies the same
// multiplier the generator does, to the theme's values in the running shell.
import { scaleText, type TextSpec } from "@stef/tokens/text-scale";

export { scaleText, type TextSpec };

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** The `text` spec of a theme's omaterial.json; null when absent or malformed (not Omaterial). */
export const specOf = (json: string): TextSpec | null => {
  try {
    const text: unknown = (JSON.parse(json) as Record<string, unknown>)["text"];
    if (!isRecord(text) || typeof text["typeScale"] !== "number") return null;
    if (!isRecord(text["sizes"]) || !isRecord(text["containers"])) return null;
    return text as unknown as TextSpec;
  } catch {
    return null;
  }
};

/** Keys Hyprland owns; the rest are the shell's `section.key`. */
const isGroupbar = (key: string) => key.startsWith("groupbar.");

/**
 * The theme's parsed shell.toml (Color.themeShellValues: `section.key` →
 * string) with the scaled values in, or null when it already has them.
 */
export const shellPatch = (
  spec: TextSpec,
  baseSize: number,
  theme: Readonly<Record<string, string>>,
): Record<string, string> | null => {
  const scaled = scaleText(spec, baseSize);
  let next: Record<string, string> | null = null;
  for (const key of Object.keys(scaled)) {
    if (isGroupbar(key)) continue;
    const value = String(scaled[key]);
    if (theme[key] === value) continue;
    next ??= { ...theme };
    next[key] = value;
  }
  return next;
};

/** Lua for `hyprctl eval` that sizes Hyprland's group bar; "" when the theme has none. */
export const groupbarLua = (spec: TextSpec, baseSize: number): string => {
  const scaled = scaleText(spec, baseSize);
  const fields = Object.keys(scaled)
    .filter(isGroupbar)
    .map((key) => `${key.slice("groupbar.".length)} = ${scaled[key]}`);
  return fields.length ? `hl.config({ group = { groupbar = { ${fields.join(", ")} } } })` : "";
};
