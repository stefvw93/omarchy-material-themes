/**
 * Design tokens at runtime: the defaults, and merging a user override onto
 * them. QML-safe (plain es2017, no Effect) so plugins bundle it; the Schema
 * and the emitters live in ./index.ts.
 *
 * Colour is not here: it belongs to the theme (colors.toml, shell.*.toml) and
 * reaches QML through the shell's Color singleton. Tokens are the shape and
 * motion that stay the same across themes.
 *
 * Every default is the value the code used before tokens existed, so default
 * tokens reproduce the old output exactly.
 */
import { type MotionSchemeName, motionSchemes } from "@stef/motion";

export const defaultTokens = {
  /** Hyprland general:gaps_*. */
  gaps: { inner: 2, outer: 4, workspaces: 32 },
  /** Hyprland general:border_size and the active-border gradient angle (degrees). */
  border: { width: 1, gradientAngle: 55 },
  /** Hyprland decoration:blur. */
  blur: { size: 6, passes: 3 },
  /** Hyprland decoration:shadow. lightAngle: 0 = right, 90 = top, counter-clockwise. */
  shadow: { range: 60, renderPower: 4, lightAngle: 90, distance: 8 },
  motion: {
    /** Which Material 3 scheme Hyprland and the plugins move with. */
    scheme: "standard" as MotionSchemeName,
  },
  expo: {
    outerMargin: 48,
    tileGap: 24,
    tilePadding: 8,
    rise: 24,
    tileStagger: 80,
    windowStagger: 35,
    windowLead: 70,
    tileScaleFrom: 0.92,
    windowScaleFrom: 0.94,
  },
  periphery: {
    bandMargin: 16,
    cardGap: 10,
    groupGap: 20,
    slideDuration: 320,
    fadeDuration: 150,
    /** Ghost blur radius, matched by eye to decoration:blur. */
    ghostBlur: 96,
  },
};

export type Tokens = typeof defaultTokens;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Overlays `override` on `base`, key by key. Unknown keys and values whose
 * type differs from the default are ignored, so a stale or hand-edited file
 * can never put a string where QML expects a number.
 */
export const mergeTokens = <T>(base: T, override: unknown): T => {
  if (!isPlainObject(base) || !isPlainObject(override)) return base;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(base)) {
    const b = base[key];
    const o = override[key];
    if (isPlainObject(b)) out[key] = mergeTokens(b, o);
    else if (o !== undefined && typeof o === typeof b && (typeof o !== "number" || isFinite(o)))
      out[key] = o;
    else out[key] = b;
  }
  return out as T;
};

/** Tokens from the text of a tokens.json; defaults when it's missing or broken. */
export const resolveTokens = (json: string | undefined): Tokens => {
  if (!json) return defaultTokens;
  try {
    const tokens = mergeTokens(defaultTokens, JSON.parse(json));
    // An unknown scheme name would leave springsOf() undefined.
    return tokens.motion.scheme in motionSchemes
      ? tokens
      : { ...tokens, motion: { ...tokens.motion, scheme: defaultTokens.motion.scheme } };
  } catch {
    return defaultTokens;
  }
};

/** The springs of the scheme the tokens select. */
export const springsOf = (tokens: Tokens) => motionSchemes[tokens.motion.scheme];

/** Where the user override lives, relative to $HOME. */
export const tokensFile = ".config/omarchy/stef/tokens.json";
