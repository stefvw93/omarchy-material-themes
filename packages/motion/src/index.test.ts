import { describe, expect, it } from "vite-plus/test";
import { cssLinear, hyprlandDampening, motionSchemes, settleTime, springStep } from "./index.ts";

const spatial = motionSchemes.standard.spatial_default;

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
