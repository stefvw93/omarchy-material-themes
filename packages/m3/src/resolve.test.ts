import { describe, expect, it } from "vite-plus/test";
import {
  colorRoleOf,
  colorRoles,
  defaultContext,
  numberOf,
  shapeOf,
  typographyOf,
  valueOf,
  webSpringCurves,
} from "./index.ts";

describe("resolve", () => {
  it("picks the motion scheme's spring (spec: md.sys.motion.spring.*)", () => {
    expect(valueOf("md.sys.motion.spring.default.spatial")).toEqual({
      damping: 0.9,
      stiffness: 700,
    });
    expect(
      valueOf("md.sys.motion.spring.default.spatial", {
        ...defaultContext,
        motionScheme: "expressive",
      }),
    ).toEqual({ damping: 0.8, stiffness: 380 });
  });

  it("resolves sys measurements, shapes, states and elevation", () => {
    expect(numberOf("md.sys.measurement.space100")).toBe(8);
    expect(shapeOf("md.sys.shape.corner.medium")).toEqual({ family: "rounded-corners", size: 12 });
    expect(numberOf("md.sys.state.hover.state-layer-opacity")).toBe(0.08);
    expect(numberOf("md.sys.state.focus-indicator.thickness")).toBe(3);
    expect(numberOf("md.sys.elevation.level3")).toBe(6);
  });

  it("follows component tokens to their system tokens", () => {
    expect(colorRoleOf("md.comp.menus.standard.container.color")).toBe("surface-container-low");
    expect(shapeOf("md.comp.menus.container.shape").size).toBe(16);
  });

  it("varies type by font: static Roboto, variable Roboto Flex axes", () => {
    const body = typographyOf("md.sys.typescale.body-large");
    expect(body).toMatchObject({ size: 16, lineHeight: 24, weight: 400, fonts: ["Roboto"] });
    const flex = typographyOf("md.sys.typescale.body-large", {
      ...defaultContext,
      font: "variable",
    });
    expect(Object.keys(flex.axes).length).toBeGreaterThan(0);
  });

  it("lists the colour roles and the spec's Web spring curves", () => {
    expect(colorRoles).toContain("surface-container-low");
    expect(webSpringCurves).toContainEqual({
      scheme: "standard",
      speed: "default",
      kind: "spatial",
      curve: [0.27, 1.06, 0.18, 1],
      durationMs: 500,
    });
  });
});
