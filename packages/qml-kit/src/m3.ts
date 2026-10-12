/**
 * Material 3 for the plugins: the tokens resolved to values (`resolveM3`),
 * and the theme's colour scheme (`schemeOf`). QML-safe; Tokens.qml and
 * Scheme.qml call these.
 */
import { elevationTokens } from "@stef/m3/sys/elevation";
import { stateTokens } from "@stef/m3/sys/state";
import { resolveToken } from "@stef/m3/token";
import { textScaleOf } from "@stef/tokens/text-scale";
import {
  cornerRadius,
  cornerSteps,
  measurementSteps,
  spacing,
  springsOf,
  type Tokens,
} from "@stef/tokens/runtime";
import { type KitTypeStyle, m3Data } from "./m3.generated.ts";

const num = (token: { readonly value?: unknown } | undefined): number => {
  const value = token === undefined ? undefined : resolveToken(token as never).value;
  if (typeof value !== "number") throw new Error("not a number token");
  return value;
};

const isTypeStyle = (v: unknown): v is KitTypeStyle =>
  typeof v === "object" && v !== null && "lineHeight" in v;

/** A type style at a text scale: size and line height scale together (citations.textResizeLineHeight). */
const scaleStyle = (style: KitTypeStyle, scale: number): KitTypeStyle => ({
  size: Math.round(style.size * scale),
  lineHeight: Math.round(style.lineHeight * scale),
  weight: style.weight,
  tracking: style.tracking,
});

const mapValues = <V, R>(o: Readonly<Record<string, V>>, f: (v: V) => R): Record<string, R> => {
  const out: Record<string, R> = {};
  for (const key of Object.keys(o)) out[key] = f(o[key]!);
  return out;
};

/**
 * Every value the plugins draw with, in logical px (1dp = 1px, interpretation
 * unit.dp), for the tokens in effect and the user's Omarchy text size
 * (`baseSize`, the shell's [font] base-size; interpretation text.scale).
 */
export const resolveM3 = (tokens: Tokens, baseSize = 12) => {
  const textScale = textScaleOf(
    { typeScale: tokens.type.scale, sizes: {}, containers: {} },
    baseSize,
  );
  const space: Record<string, number> = {};
  for (const step of measurementSteps) space[step] = spacing(step);
  const corner: Record<string, number> = {};
  for (const step of cornerSteps) corner[step] = cornerRadius(step);
  const elevation: Record<string, number> = {};
  for (let level = 0; level <= 5; level++)
    elevation[`level${level}`] = num(
      (elevationTokens as Readonly<Record<string, { readonly value?: unknown }>>)[
        `md.sys.elevation.level${level}`
      ],
    );
  const state = (name: string) =>
    num(
      (stateTokens as Readonly<Record<string, { readonly value?: unknown }>>)[
        `md.sys.state.${name}`
      ],
    );
  /** The ambient shadow at an elevation in dp (a component token's value), as the Web draws it. */
  const shadowAt = (dp: number) => {
    let level = 0;
    for (let l = 0; l <= 5; l++) if (elevation[`level${l}`] === dp) level = l;
    const s = m3Data.shadows.levels[level]!;
    return { blur: s.blur, spread: s.spread, x: s.x, y: s.y, opacity: m3Data.shadows.opacity };
  };
  return {
    springs: springsOf(tokens),
    shadowAt,
    space,
    corner,
    windowCorner: cornerRadius(tokens.shape.windowCorner),
    elevation,
    density: tokens.density,
    /** Each density level removes 4dp (citations.densityStep). */
    densityPx: tokens.density * 4,
    textScale,
    type: mapValues(m3Data.type, (style) => scaleStyle(style, textScale)),
    state: {
      hover: state("hover.state-layer-opacity"),
      focus: state("focus.state-layer-opacity"),
      pressed: state("pressed.state-layer-opacity"),
      dragged: state("dragged.state-layer-opacity"),
      disabled: state("disabled.state-layer-opacity"),
      focusIndicator: {
        thickness: state("focus-indicator.thickness"),
        outerOffset: state("focus-indicator.outer-offset"),
        innerOffset: state("focus-indicator.inner-offset"),
      },
    },
    scrimOpacity: m3Data.scrimOpacity,
    /** citations.plainTooltipHeight and plainTooltipPadding. */
    plainTooltip: m3Data.plainTooltip,
    /** Allowlisted component tokens: colours as role names, lengths in dp, type styles scaled. */
    comp: mapValues(m3Data.comp as Readonly<Record<string, unknown>>, (v) =>
      isTypeStyle(v) ? scaleStyle(v, textScale) : v,
    ),
    expo: {
      outerMargin: spacing(tokens.expo.outerMargin),
      tileGap: spacing(tokens.expo.tileGap),
      tilePadding: spacing(tokens.expo.tilePadding),
      rise: spacing(tokens.expo.rise),
      tileStagger: tokens.expo.tileStagger,
      windowStagger: tokens.expo.windowStagger,
      windowLead: tokens.expo.windowLead,
      tileScaleFrom: tokens.expo.tileScaleFrom,
      windowScaleFrom: tokens.expo.windowScaleFrom,
    },
    periphery: {
      bandMargin: spacing(tokens.periphery.bandMargin),
      cardGap: spacing(tokens.periphery.cardGap),
      groupGap: spacing(tokens.periphery.groupGap),
    },
  };
};

export type ResolvedM3 = ReturnType<typeof resolveM3>;

/** Every md.sys.color role a scheme defines. */
export const schemeRoles: ReadonlyArray<string> = m3Data.roles;

/** The five colours every Omarchy theme gives the shell (Color.* in qs.Commons). */
export interface OmarchyColors {
  readonly background: string;
  readonly foreground: string;
  readonly accent: string;
  readonly muted: string;
  readonly urgent: string;
}

/**
 * An M3 scheme approximated from an Omarchy theme that isn't Omaterial
 * (interpretation qml.scheme-fallback), role by role.
 */
export const fallbackScheme = (c: OmarchyColors): Record<string, string> => {
  const pick = (role: string): string => {
    if (role === "scrim" || role === "shadow") return "#000000";
    if (role === "on-surface" || role === "on-background" || role === "inverse-surface")
      return c.foreground;
    if (role === "on-surface-variant" || role === "outline" || role === "outline-variant")
      return c.muted;
    if (role.indexOf("surface") === 0 || role === "background" || role === "inverse-on-surface")
      return c.background;
    const on = role.indexOf("on-") === 0;
    const family = role
      .replace(/^on-/, "")
      .replace(/^inverse-/, "")
      .split("-")[0];
    if (family === "error") return on ? c.background : c.urgent;
    return on ? c.background : c.accent;
  };
  const out: Record<string, string> = {};
  for (const role of m3Data.roles) out[role] = pick(role);
  return out;
};

export interface ThemeScheme {
  /** False when the theme isn't Omaterial and the roles are approximated. */
  readonly exact: boolean;
  readonly mode: "light" | "dark";
  /** md.sys.color role → hex. */
  readonly color: Readonly<Record<string, string>>;
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Relative luminance below 0.5 reads as a dark theme. */
const isDark = (hex: string): boolean => {
  const m = /^#?([0-9a-f]{6})/i.exec(hex);
  if (!m) return true;
  const n = parseInt(m[1]!, 16);
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const l = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return l < 0.5;
};

/**
 * The scheme of the current theme: omaterial.json's roles when the theme is
 * Omaterial (`json` is its text), the fallback from the Omarchy colours otherwise.
 */
export const schemeOf = (json: string | undefined, omarchy: OmarchyColors): ThemeScheme => {
  try {
    const parsed: unknown = json ? JSON.parse(json) : undefined;
    if (isRecord(parsed) && isRecord(parsed["system"]) && isRecord(parsed["source"])) {
      const system = parsed["system"] as Record<string, unknown>;
      if (m3Data.roles.every((role) => typeof system[role] === "string"))
        return {
          exact: true,
          mode: parsed["source"]["mode"] === "light" ? "light" : "dark",
          color: system as Record<string, string>,
        };
    }
  } catch {
    // Not Omaterial: fall through.
  }
  return {
    exact: false,
    mode: isDark(omarchy.background) ? "dark" : "light",
    color: fallbackScheme(omarchy),
  };
};
