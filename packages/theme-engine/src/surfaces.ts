import { clampDouble, type DynamicScheme, Hct } from "@material/material-color-utilities";

/** The non-ANSI part of an Omarchy palette, as ARGB. */
export interface SurfaceColors {
  muted: number;

  background: number;
  dark_background: number;
  darker_background: number;
  lighter_background: number;

  foreground: number;
  dark_foreground: number;
  light_foreground: number;
  bright_foreground: number;
}

/**
 * Tone steps for the foreground tiers, measured from `onSurface`. Omarchy's shipped
 * themes put secondary text ~10 tones towards the background, dim text (comments,
 * disabled) ~35, and the cursor colour a touch past the foreground. Steps rather than
 * Material roles because `onSurfaceVariant` and `outline` both collapse onto
 * `onSurface` at maximum contrast, and the tiers must stay tellable apart.
 */
const LIGHT_FOREGROUND_STEP = 10;
const DARK_FOREGROUND_STEP = 35;
const BRIGHT_FOREGROUND_STEP = 6;

function shiftTone(argb: number, delta: number) {
  const hct = Hct.fromInt(argb);
  hct.tone = clampDouble(0, 100, hct.tone + delta);
  return hct.toInt();
}

/**
 * Omarchy names its background tiers by direction — `dark_background` is darker than
 * `background` in both modes. Material names its surface roles by elevation, and in a
 * dark scheme elevation means *lighter*: `surfaceContainer` sits above `surface`, and
 * `surfaceDim` is the same tone as `surface`. Mapping the names one-to-one is what
 * produced "dark" backgrounds lighter than the base, so each mode picks its own roles.
 *
 * Dark mode starts from `surfaceContainerLow` (tone ~10, where the shipped dark themes
 * sit) so there is room below it, and the tiers walk down through `surface` to
 * `surfaceContainerLowest`. Light mode starts from `surface` (tone ~98) and walks down
 * through the containers; `lighter_background` there is the faint tint the shipped light
 * themes use for cursor lines, since there is nowhere lighter to go.
 */
export function buildSurfaceColors(scheme: DynamicScheme): SurfaceColors {
  const towardsBackground = scheme.isDark ? -1 : 1;

  return {
    muted: scheme.outlineVariant,

    background: scheme.isDark ? scheme.surfaceContainerLow : scheme.surface,
    dark_background: scheme.isDark ? scheme.surface : scheme.surfaceContainer,
    darker_background: scheme.isDark ? scheme.surfaceContainerLowest : scheme.surfaceDim,
    lighter_background: scheme.isDark ? scheme.surfaceContainerHigh : scheme.surfaceContainerLow,

    foreground: scheme.onSurface,
    dark_foreground: shiftTone(scheme.onSurface, towardsBackground * DARK_FOREGROUND_STEP),
    light_foreground: shiftTone(scheme.onSurface, towardsBackground * LIGHT_FOREGROUND_STEP),
    bright_foreground: shiftTone(scheme.onSurface, -towardsBackground * BRIGHT_FOREGROUND_STEP),
  };
}
