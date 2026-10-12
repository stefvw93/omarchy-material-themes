/**
 * Spring motion shared by Hyprland, the QML plugins and Studio. QML-safe:
 * plain es2017, no Effect, so plugins can bundle it.
 *
 * Springs follow Material 3: the spec's md.sys.motion.spring.* tokens
 * (generated into @stef/m3), mass 1, a stiffness and a damping *ratio*.
 */
import { motionTokens } from "@stef/m3/sys/motion";
import { resolveToken } from "@stef/m3/token";

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

export type MotionSchemeName = "standard" | "expressive";

const SPRINGS: ReadonlyArray<SpringName> = [
  "spatial_fast",
  "spatial_default",
  "spatial_slow",
  "effects_fast",
  "effects_default",
  "effects_slow",
];

/** The spec's spring for `name` in a motion scheme, e.g. md.sys.motion.spring.default.spatial. */
const springFor = (scheme: MotionSchemeName, name: SpringName): Spring => {
  const [kind, speed] = name.split("_") as [string, string];
  const token = (motionTokens as Readonly<Record<string, Parameters<typeof resolveToken>[0]>>)[
    `md.sys.motion.spring.${speed}.${kind}`
  ];
  if (!token) throw new Error(`no spring token for ${name}`);
  const value = resolveToken(token, {
    theme: "light",
    contrast: "standard",
    motionScheme: scheme,
    font: "static",
  }).value as { readonly damping?: unknown; readonly stiffness?: unknown } | undefined;
  if (typeof value?.damping !== "number" || typeof value.stiffness !== "number")
    throw new Error(`spring ${name} (${scheme}) has no stiffness and damping`);
  return { stiffness: value.stiffness, ratio: value.damping };
};

const schemeOf = (scheme: MotionSchemeName): MotionScheme => {
  const out = {} as Record<SpringName, Spring>;
  for (const name of SPRINGS) out[name] = springFor(scheme, name);
  return out;
};

/**
 * Material 3 motion schemes. Spatial springs move things (position, size);
 * effects springs change colour and opacity.
 */
export const motionSchemes: Readonly<Record<MotionSchemeName, MotionScheme>> = {
  standard: schemeOf("standard"),
  expressive: schemeOf("expressive"),
};

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

/**
 * Advances a mass-1 damped spring from position `x` with velocity `v`
 * (units per second) towards `target` by `dtMs`. Exact (closed form), so it
 * is frame-rate independent, and the velocity carries over when the target
 * changes mid-flight.
 */
export const springAdvance = (
  x: number,
  v: number,
  target: number,
  dtMs: number,
  spring: Spring,
): { readonly x: number; readonly v: number } => {
  if (dtMs <= 0) return { x, v };
  const t = dtMs / 1000;
  const w = Math.sqrt(spring.stiffness);
  const z = spring.ratio;
  const d0 = x - target;
  if (z < 1) {
    const a = z * w;
    const wd = w * Math.sqrt(1 - z * z);
    const b = (v + a * d0) / wd;
    const e = Math.exp(-a * t);
    const cos = Math.cos(wd * t);
    const sin = Math.sin(wd * t);
    return {
      x: target + e * (d0 * cos + b * sin),
      v: e * ((-a * d0 + b * wd) * cos + (-a * b - d0 * wd) * sin),
    };
  }
  if (z === 1) {
    const e = Math.exp(-w * t);
    const c = v + w * d0;
    return { x: target + (d0 + c * t) * e, v: (v - w * c * t) * e };
  }
  const s = Math.sqrt(z * z - 1);
  const r1 = -w * (z - s);
  const r2 = -w * (z + s);
  const c2 = (v - r1 * d0) / (r2 - r1);
  const c1 = d0 - c2;
  return {
    x: target + c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t),
    v: c1 * r1 * Math.exp(r1 * t) + c2 * r2 * Math.exp(r2 * t),
  };
};
