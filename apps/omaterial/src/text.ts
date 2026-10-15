// What Service.qml asks of an Omaterial theme when the text size or the theme
// changes (interpretation text.scale). The theme pins every size, so the
// shell's own base-size scaling never reaches it; this applies the same
// multiplier the generator does, to the theme's values in the running shell.
import { barTextSpec, iconButtonDpOf, type Tokens, translucencyLua } from "@stef/tokens/runtime";
import { scaleText, type TextSpec } from "@stef/tokens/text-scale";

export { scaleText, type TextSpec, translucencyLua };

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

/**
 * The theme's text spec with what comes from the tokens taken from the live
 * tokens.json: the type scale, and the bar's height (the shared barTextSpec,
 * interpretation bar.icons). `comp` is the plugins' M3 component values
 * (tokens.m3.comp); without the icon button's, the theme's bar stays.
 */
export const liveSpec = (
  spec: TextSpec,
  tokens: Tokens,
  comp: Readonly<Record<string, unknown>>,
): TextSpec => {
  const typeScale = tokens.type.scale;
  const button = iconButtonDpOf(comp);
  if (!button) return { ...spec, typeScale };
  const bodyLine = spec.containers["bar.size-horizontal"]?.lineHeight ?? 20;
  const bar = barTextSpec(tokens, button, bodyLine);
  return { ...spec, typeScale, containers: { ...spec.containers, ...bar.containers } };
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

/**
 * The theme's parsed shell.toml with the live tokens' translucency in (the
 * spec exception shell.translucency): the bar's and the flyouts' background
 * alpha, 1 where a surface is off. Null when it already has them.
 */
export const translucencyPatch = (
  tokens: Tokens,
  theme: Readonly<Record<string, string>>,
): Record<string, string> | null => {
  const { bar, flyouts } = tokens.translucency;
  const want: Record<string, string> = {
    "bar.background-alpha": String(bar.enabled ? bar.alpha : 1),
    "popups.background-alpha": String(flyouts.enabled ? flyouts.alpha : 1),
  };
  let next: Record<string, string> | null = null;
  for (const key of Object.keys(want)) {
    if (theme[key] === want[key]) continue;
    next ??= { ...theme };
    next[key] = want[key]!;
  }
  return next;
};
