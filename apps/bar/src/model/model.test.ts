import { describe, expect, it } from "vite-plus/test";
import { bodyGeometry, gapsOutOf, legibilityShadow, parseFocusEvent } from "./model.ts";

describe("focus area", () => {
  it("reads Periphery's announcements and ignores other events", () => {
    expect(parseFocusEvent("periphery>>388,2172,DP-3")).toEqual({
      on: true,
      x0: 388,
      x1: 2172,
      monitor: "DP-3",
    });
    expect(parseFocusEvent("periphery>>off")).toEqual({ on: false });
    expect(parseFocusEvent("periphery>>2172,388,DP-3")).toBeNull();
    expect(parseFocusEvent("periphery>>1.5,9,DP-3")).toBeNull();
    expect(parseFocusEvent("periphery>>1,9,")).toBeNull();
    expect(parseFocusEvent("other>>off")).toBeNull();
    expect(parseFocusEvent("")).toBeNull();
  });

  const screen = { name: "DP-3", x: 2560, width: 2560 };
  const edges = { left: 8, right: 6, margin: 16 };

  it("puts the body where windows tile in the focus area of its own screen", () => {
    expect(bodyGeometry({ on: true, x0: 2940, x1: 4740, monitor: "DP-3" }, screen, edges)).toEqual({
      x: 388,
      width: 1786,
      margin: 16,
      narrowed: true,
    });
    expect(bodyGeometry({ on: true, x0: 2000, x1: 3000, monitor: "DP-3" }, screen, edges)).toEqual({
      x: 0,
      width: 434,
      margin: 16,
      narrowed: true,
    });
  });

  it("never gives a negative width", () => {
    const tight = { left: 600, right: 600, margin: 16 };
    expect(
      bodyGeometry({ on: true, x0: 3000, x1: 4000, monitor: "DP-3" }, screen, tight).width,
    ).toBe(0);
  });

  it("spans the window otherwise", () => {
    const full = { x: 0, width: 2560, margin: 0, narrowed: false };
    expect(bodyGeometry({ on: false }, screen, edges)).toEqual(full);
    expect(bodyGeometry(null, screen, edges)).toEqual(full);
    expect(
      bodyGeometry({ on: true, x0: 388, x1: 2172, monitor: "HDMI-A-1" }, screen, edges),
    ).toEqual(full);
  });
});

describe("legibilityShadow", () => {
  it("puts a dark shadow under light text and a light one under dark text", () => {
    expect(legibilityShadow("#e0e2ec")).toBe("#000000");
    expect(legibilityShadow("#ffffff")).toBe("#000000");
    expect(legibilityShadow("#1a1c22")).toBe("#ffffff");
    expect(legibilityShadow("#000000")).toBe("#ffffff");
  });

  it("ignores alpha and reads either case", () => {
    expect(legibilityShadow("#80E0E2EC")).toBe("#000000");
    expect(legibilityShadow("#ff1a1c22")).toBe("#ffffff");
  });

  it("picks by contrast ratio, not by a midpoint", () => {
    // #757575: contrast 4.61 with white, 4.56 with black; #777777: 4.48 and
    // 4.69. A midpoint at 128 would give both a white shadow.
    expect(legibilityShadow("#757575")).toBe("#ffffff");
    expect(legibilityShadow("#777777")).toBe("#000000");
  });

  it("gives black for a colour it can't read", () => {
    expect(legibilityShadow("red")).toBe("#000000");
    expect(legibilityShadow("")).toBe("#000000");
  });
});

describe("gapsOutOf", () => {
  it("reads Hyprland's outer gaps", () => {
    expect(gapsOutOf('{"option": "general:gaps_out", "css": "8 8 8 8", "set": true }')).toEqual([
      8, 8, 8, 8,
    ]);
    expect(gapsOutOf('{"option": "general:gaps_out", "css": "4 10", "set": true }')).toEqual([
      4, 10, 4, 10,
    ]);
  });

  it("gives no gaps for what it can't read", () => {
    expect(gapsOutOf("")).toEqual([0, 0, 0, 0]);
    expect(gapsOutOf("no such option")).toEqual([0, 0, 0, 0]);
    expect(gapsOutOf('{"option": "general:gaps_out", "css": "a"}')).toEqual([0, 0, 0, 0]);
    expect(gapsOutOf('{"option": "general:gaps_out"}')).toEqual([0, 0, 0, 0]);
  });
});
