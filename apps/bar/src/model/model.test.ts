import { describe, expect, it } from "vite-plus/test";
import { bodyGeometry, parseFocusEvent } from "./model.ts";

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

  it("puts the body on the focus area of its own screen", () => {
    expect(bodyGeometry({ on: true, x0: 2948, x1: 4732, monitor: "DP-3" }, screen)).toEqual({
      x: 388,
      width: 1784,
      narrowed: true,
    });
    expect(bodyGeometry({ on: true, x0: 2000, x1: 3000, monitor: "DP-3" }, screen)).toEqual({
      x: 0,
      width: 440,
      narrowed: true,
    });
  });

  it("spans the window otherwise", () => {
    const full = { x: 0, width: 2560, narrowed: false };
    expect(bodyGeometry({ on: false }, screen)).toEqual(full);
    expect(bodyGeometry(null, screen)).toEqual(full);
    expect(bodyGeometry({ on: true, x0: 388, x1: 2172, monitor: "HDMI-A-1" }, screen)).toEqual(
      full,
    );
  });
});
