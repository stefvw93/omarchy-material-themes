/**
 * Spring motion shared by Hyprland, the QML plugins and Studio. QML-safe:
 * plain es2017, no Effect, so plugins can bundle it.
 *
 * Springs follow Material 3 (androidx.compose.material3 tokens): mass 1, a
 * stiffness, and a damping *ratio*.
 */

export interface Spring {
  readonly stiffness: number;
  readonly ratio: number;
}

export type SpringName =
  | "spatial_fast"
  | "spatial_default"
  | "spatial_slow"
  | "effects_fast"
  | "effects_default"
  | "effects_slow";

export type MotionScheme = Readonly<Record<SpringName, Spring>>;

/**
 * Material 3 motion schemes, from tokens/StandardMotionTokens.kt and
 * tokens/ExpressiveMotionTokens.kt. Spatial springs move things (position,
 * size); effects springs change colour and opacity.
 */
export const motionSchemes = {
  standard: {
    spatial_fast: { stiffness: 1400, ratio: 0.9 },
    spatial_default: { stiffness: 700, ratio: 0.9 },
    spatial_slow: { stiffness: 300, ratio: 0.9 },
    effects_fast: { stiffness: 3800, ratio: 1.0 },
    effects_default: { stiffness: 1600, ratio: 1.0 },
    effects_slow: { stiffness: 800, ratio: 1.0 },
  },
  expressive: {
    spatial_fast: { stiffness: 800, ratio: 0.6 },
    spatial_default: { stiffness: 380, ratio: 0.8 },
    spatial_slow: { stiffness: 200, ratio: 0.8 },
    effects_fast: { stiffness: 3800, ratio: 1.0 },
    effects_default: { stiffness: 1600, ratio: 1.0 },
    effects_slow: { stiffness: 800, ratio: 1.0 },
  },
} as const satisfies Record<string, MotionScheme>;

export type MotionSchemeName = keyof typeof motionSchemes;

/**
 * Damped spring step response (mass 1) at `ms` milliseconds, as Hyprland
 * evaluates the theme's curves: 0 before start, settling on 1.
 */
export const springStep = (ms: number, spring: Spring): number => {
  if (ms <= 0) return 0;
  const t = ms / 1000;
  const w = Math.sqrt(spring.stiffness);
  const z = spring.ratio;
  if (z >= 1) return 1 - Math.exp(-w * t) * (1 + w * t);
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t));
};

/** Hyprland springs take the damping *coefficient*: c = 2 * ratio * sqrt(stiffness * mass). */
export const hyprlandDampening = (spring: Spring): number =>
  2 * spring.ratio * Math.sqrt(spring.stiffness);

/** Time until the step response stays within `tolerance` of 1. */
export const settleTime = (spring: Spring, tolerance = 0.001): number => {
  let settledSince = 0;
  for (let ms = 1; ms <= 10000; ms++) {
    if (Math.abs(1 - springStep(ms, spring)) > tolerance) settledSince = ms;
  }
  return settledSince + 1;
};

/**
 * The spring as a CSS `linear()` easing over its settle time, for UI that
 * should move like the desktop (Studio). Returns the easing and the duration.
 */
export const cssLinear = (
  spring: Spring,
  samples = 40,
): { readonly easing: string; readonly durationMs: number } => {
  const durationMs = settleTime(spring);
  const points: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const value = i === samples ? 1 : springStep((durationMs * i) / samples, spring);
    points.push(String(Math.round(value * 10000) / 10000));
  }
  return { easing: `linear(${points.join(", ")})`, durationMs };
};
