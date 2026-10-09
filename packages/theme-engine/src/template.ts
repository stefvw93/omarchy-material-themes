/**
 * TypeScript port of the `{{ … }}` substitution that `omarchy-theme-set-templates`
 * performs on the `*.tpl` files under `$OMARCHY_PATH/default/themed/`.
 *
 * The bash original compiles the palette into a sed script; this module reproduces
 * the same output for the same input so a file rendered here matches what Omarchy
 * would have generated from the template itself.
 *
 * Supported tokens:
 *   {{ key }}                       palette value
 *   {{ key_strip }}                 value without the leading `#`
 *   {{ key_rgb }}                   `r,g,b` in decimal (6-digit hex values only)
 *   {{ mix a b 30% }}               linear sRGB blend of two palette keys
 *   {{ mix_strip a b 30% }}         as above, without `#`
 *   {{ mix_rgb a b 30% }}           as above, as `r,g,b`
 *   {{ hypr_gradient key fallback }}   Hyprland gradient spec as a Lua value
 *   {{ shell_gradient key fallback }}  Hyprland gradient spec with colours resolved
 *   {{ gradient_start key fallback }}  first colour of a gradient spec as `#rrggbb`
 *
 * Unknown tokens are left verbatim, exactly as the sed script would leave them.
 */

export type Palette = Readonly<Record<string, string>>;

const HEX6 = /^#[0-9a-f]{6}$/i;

/** Any `{{ … }}` span; the body is captured raw so spacing rules can be applied per token kind. */
const TOKEN = /\{\{([^}]*)\}\}/g;

/**
 * Plain tokens are sed patterns for the literal `{{ key }}`: exactly one space on
 * each side. `{{key}}` or `{{ key  }}` is left untouched by Omarchy.
 */
const PLAIN_BODY = /^ ([A-Za-z0-9_-]+) $/;

/**
 * Function tokens are located with a whitespace-tolerant grep and then replaced
 * as the exact text found, so any spacing works for them.
 */
const FUNCTION_NAME = /^(mix|mix_strip|mix_rgb|hypr_gradient|shell_gradient|gradient_start)$/;

const channel = (hex: string, offset: number) => parseInt(hex.slice(offset, offset + 2), 16);
const toHex2 = (n: number) => n.toString(16).padStart(2, "0");

/** `#1e1e2e` -> `30,30,46` */
export const hexToRgb = (hex: string): string =>
  [1, 3, 5].map((offset) => channel(hex, offset)).join(",");

/**
 * Parse a mix amount the way the bash `mix_color` does: `30%` -> 0.3, `0.3` -> 0.3,
 * `30` -> 0.3 (bare numbers above 1 are treated as percentages), clamped to [0, 1].
 */
export const parseMixAmount = (amount: string): number => {
  let value: number;
  if (amount.endsWith("%")) {
    value = Number(amount.slice(0, -1)) / 100;
  } else {
    value = Number(amount);
    if (value > 1) value /= 100;
  }
  if (Number.isNaN(value)) value = 0;
  return Math.min(1, Math.max(0, value));
};

/**
 * Blend `start` toward `end` by `amount`, per channel in sRGB with round-half-up,
 * matching Omarchy's awk implementation. Both inputs must be 6-digit hex.
 */
export const mixColors = (start: string, end: string, amount: string | number): string => {
  const t = typeof amount === "number" ? Math.min(1, Math.max(0, amount)) : parseMixAmount(amount);
  const blend = (offset: number) =>
    Math.floor(channel(start, offset) * (1 - t) + channel(end, offset) * t + 0.5);
  return `#${[1, 3, 5].map((offset) => toHex2(blend(offset))).join("")}`;
};

/**
 * `resolve_theme_ref`: the key's palette value, else the fallback's palette value,
 * else the fallback verbatim, else the key verbatim.
 */
const resolveThemeRef = (palette: Palette, key: string, fallback?: string): string => {
  if (palette[key] !== undefined) return palette[key];
  if (fallback !== undefined && fallback !== "") {
    return palette[fallback] ?? fallback;
  }
  return key;
};

interface Gradient {
  colors: string[];
  angle: string | undefined;
}

const ANGLE = /^-?\d+(\.\d+)?deg$/;

/** `parse_gradient`: space-separated colour words (palette keys or literals) and an optional `Ndeg`. */
const parseGradient = (palette: Palette, spec: string): Gradient => {
  const colors: string[] = [];
  let angle: string | undefined;
  for (const part of spec.trim().split(/\s+/)) {
    if (part === "") continue;
    if (ANGLE.test(part)) {
      angle = part.slice(0, -3);
    } else {
      colors.push(palette[part] ?? part);
    }
  }
  return { colors, angle };
};

const clamp255 = (n: number) => Math.min(255, n);

/** `color_to_shell_hex`: normalise the colour notations Hyprland accepts to `#rrggbb`. */
export const colorToShellHex = (color: string): string => {
  let match: RegExpMatchArray | null;

  if ((match = color.match(/^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/i))) {
    return `#${match[1]}`;
  }
  if ((match = color.match(/^rgba?\(([0-9a-f]{6})(?:[0-9a-f]{2})?\)$/i))) {
    return `#${match[1]}`;
  }
  if ((match = color.match(/^rgba?\((\d+),(\d+),(\d+)(?:,[0-9.]+)?\)$/i))) {
    return `#${match
      .slice(1, 4)
      .map((n) => toHex2(clamp255(Number(n))))
      .join("")}`;
  }
  if ((match = color.match(/^0x[0-9a-f]{8}$/i))) {
    return `#${color.slice(4, 10)}`;
  }
  return color;
};

const hyprGradientValue = (palette: Palette, key: string, fallback?: string): string => {
  const spec = resolveThemeRef(palette, key, fallback);
  const { colors, angle } = parseGradient(palette, spec);

  if (colors.length === 0) return `"${spec}"`;
  if (colors.length === 1) return `"${colors[0]}"`;

  const list = colors.map((c) => `"${c}"`).join(", ");
  return `{ colors = { ${list} }${angle !== undefined ? `, angle = ${angle}` : ""} }`;
};

const shellGradientValue = (palette: Palette, key: string, fallback?: string): string => {
  const spec = resolveThemeRef(palette, key, fallback);
  const { colors, angle } = parseGradient(palette, spec);

  if (colors.length === 0) return spec;
  return angle !== undefined ? `${colors.join(" ")} ${angle}deg` : colors.join(" ");
};

const gradientStartValue = (palette: Palette, key: string, fallback?: string): string => {
  const spec = resolveThemeRef(palette, key, fallback);
  const { colors } = parseGradient(palette, spec);
  return colorToShellHex(colors[0] ?? spec);
};

const MIX_AMOUNT = /^\d+(\.\d+)?%?$/;

const mixValue = (palette: Palette, fn: string, args: string[]): string | undefined => {
  const [startKey, endKey, amount] = args;
  if (startKey === undefined || endKey === undefined || amount === undefined || args.length !== 3) {
    return undefined;
  }
  if (!MIX_AMOUNT.test(amount)) return undefined;

  const start = palette[startKey];
  const end = palette[endKey];
  if (start === undefined || end === undefined || !HEX6.test(start) || !HEX6.test(end)) {
    return undefined;
  }

  const value = mixColors(start, end, amount);
  switch (fn) {
    case "mix":
      return value;
    case "mix_strip":
      return value.slice(1);
    case "mix_rgb":
      return hexToRgb(value);
    default:
      return undefined;
  }
};

const gradientValue = (palette: Palette, fn: string, args: string[]): string | undefined => {
  const [key, fallback] = args;
  if (key === undefined || args.length > 2) return undefined;

  switch (fn) {
    case "hypr_gradient":
      return hyprGradientValue(palette, key, fallback);
    case "shell_gradient":
      return shellGradientValue(palette, key, fallback);
    case "gradient_start":
      return gradientStartValue(palette, key, fallback);
    default:
      return undefined;
  }
};

const plainValue = (palette: Palette, name: string): string | undefined => {
  const direct = palette[name];
  if (direct !== undefined) return direct;

  if (name.endsWith("_strip")) {
    const base = palette[name.slice(0, -"_strip".length)];
    if (base !== undefined) return base.startsWith("#") ? base.slice(1) : base;
  }

  if (name.endsWith("_rgb")) {
    const base = palette[name.slice(0, -"_rgb".length)];
    if (base !== undefined && HEX6.test(base)) return hexToRgb(base);
  }

  return undefined;
};

/**
 * Resolve the raw body of a `{{ … }}` token, i.e. everything between the braces
 * including surrounding whitespace, such as ` background `, ` mix fg bg 30% ` or
 * `hypr_gradient key accent`.
 */
export const resolveToken = (palette: Palette, body: string): string | undefined => {
  const plain = PLAIN_BODY.exec(body);
  if (plain?.[1] !== undefined) return plainValue(palette, plain[1]);

  const [fn, ...args] = body.trim().split(/\s+/);
  if (fn === undefined || !FUNCTION_NAME.test(fn) || args.length === 0) return undefined;

  return fn.startsWith("mix") ? mixValue(palette, fn, args) : gradientValue(palette, fn, args);
};

/**
 * Render an Omarchy `.tpl` against a resolved palette. Tokens that cannot be
 * resolved are left in place, mirroring the behaviour of the sed script.
 */
export const renderTemplate = (template: string, palette: Palette): string =>
  template.replace(TOKEN, (token: string, body: string) => resolveToken(palette, body) ?? token);
