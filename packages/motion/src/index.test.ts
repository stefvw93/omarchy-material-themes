import { describe, expect, it } from "vite-plus/test";
import {
  cssLinear,
  hyprlandDampening,
  motionSchemes,
  settleTime,
  springAdvance,
  springStep,
} from "./index.ts";

const spatial = motionSchemes.standard.spatial_default;

describe("motionSchemes", () => {
  it("are the spec's spring tokens (md.sys.motion.spring.*)", () => {
    // androidx.compose.material3 StandardMotionTokens / ExpressiveMotionTokens,
    // the values used before the springs were generated from the spec.
    expect(motionSchemes).toEqual({
      standard: {
        spatial_fast: { stiffness: 1400, ratio: 0.9 },
        spatial_default: { stiffness: 700, ratio: 0.9 },
        spatial_slow: { stiffness: 300, ratio: 0.9 },
        effects_fast: { stiffness: 3800, ratio: 1 },
        effects_default: { stiffness: 1600, ratio: 1 },
        effects_slow: { stiffness: 800, ratio: 1 },
      },
      expressive: {
        spatial_fast: { stiffness: 800, ratio: 0.6 },
        spatial_default: { stiffness: 380, ratio: 0.8 },
        spatial_slow: { stiffness: 200, ratio: 0.8 },
        effects_fast: { stiffness: 3800, ratio: 1 },
        effects_default: { stiffness: 1600, ratio: 1 },
        effects_slow: { stiffness: 800, ratio: 1 },
      },
    });
  });
});

describe("springStep", () => {
  it("starts at 0 and settles on 1", () => {
    expect(springStep(0, spatial)).toBe(0);
    expect(springStep(-5, spatial)).toBe(0);
    expect(springStep(2000, spatial)).toBeCloseTo(1, 6);
  });

  it("matches the hand-written QML spring it replaces", () => {
    // The function expo used inline (Overview.qml `spring(ms, token)`).
    const qml = (ms: number, token: { stiffness: number; ratio: number }) => {
      if (ms <= 0) return 0;
      const t = ms / 1000;
      const w = Math.sqrt(token.stiffness);
      const z = token.ratio;
      if (z >= 1) return 1 - Math.exp(-w * t) * (1 + w * t);
      const wd = w * Math.sqrt(1 - z * z);
      return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t));
    };
    for (const spring of Object.values(motionSchemes.standard)) {
      for (const ms of [1, 16, 80, 250, 600]) expect(springStep(ms, spring)).toBe(qml(ms, spring));
    }
  });

  it("overshoots only for under-damped springs", () => {
    const peak = (s: { stiffness: number; ratio: number }) =>
      Math.max(...Array.from({ length: 1500 }, (_, ms) => springStep(ms, s)));
    expect(peak(motionSchemes.expressive.spatial_fast)).toBeGreaterThan(1.05);
    expect(peak(motionSchemes.standard.effects_default)).toBeLessThanOrEqual(1);
  });
});

describe("hyprlandDampening", () => {
  it("is the damping coefficient Hyprland expects", () => {
    expect(hyprlandDampening(spatial)).toBeCloseTo(2 * 0.9 * Math.sqrt(700), 10);
  });
});

describe("cssLinear", () => {
  it("runs from 0 to 1 over the settle time", () => {
    const { easing, durationMs } = cssLinear(spatial, 10);
    expect(durationMs).toBe(settleTime(spatial));
    expect(easing.startsWith("linear(0, ")).toBe(true);
    expect(easing.endsWith(", 1)")).toBe(true);
    expect(easing.split(",")).toHaveLength(11);
  });
});

describe("springAdvance", () => {
  const springs = [
    ...Object.values(motionSchemes.standard),
    ...Object.values(motionSchemes.expressive),
    { stiffness: 500, ratio: 1.4 },
  ];

  it("follows the step response from rest", () => {
    for (const spring of springs) {
      for (const ms of [1, 16, 80, 250, 600]) {
        const { x } = springAdvance(0, 0, 1, ms, spring);
        if (spring.ratio <= 1) expect(x).toBeCloseTo(springStep(ms, spring), 10);
        else expect(x).toBeGreaterThan(0);
      }
    }
  });

  it("is frame-rate independent", () => {
    for (const spring of springs) {
      let state = { x: 0, v: 0 };
      for (let i = 0; i < 30; i++) state = springAdvance(state.x, state.v, 1, 10, spring);
      const once = springAdvance(0, 0, 1, 300, spring);
      expect(state.x).toBeCloseTo(once.x, 9);
      expect(state.v).toBeCloseTo(once.v, 6);
    }
  });

  it("keeps position and velocity continuous when the target changes", () => {
    const mid = springAdvance(0, 0, 100, 50, spatial);
    const retargeted = springAdvance(mid.x, mid.v, -40, 0.001, spatial);
    expect(retargeted.x).toBeCloseTo(mid.x, 2);
    expect(Math.sign(retargeted.v)).toBe(Math.sign(mid.v));
  });

  it("settles on the target", () => {
    for (const spring of springs)
      expect(springAdvance(3, -20, 7, 5000, spring).x).toBeCloseTo(7, 6);
  });
});
