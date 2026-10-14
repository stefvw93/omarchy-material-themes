import { describe, expect, it } from "vite-plus/test";
import {
  bodyGeometry,
  cssGapsOf,
  entryKey,
  exclusiveZone,
  floatingEdges,
  legibilityShadow,
  parseFocusEvent,
  segmentCorners,
  segmentPlan,
} from "./model.ts";

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

describe("cssGapsOf", () => {
  it("reads Hyprland's gaps", () => {
    expect(cssGapsOf('{"option": "general:gaps_out", "css": "8 8 8 8", "set": true }')).toEqual([
      8, 8, 8, 8,
    ]);
    expect(cssGapsOf('{"option": "general:gaps_out", "css": "4 10", "set": true }')).toEqual([
      4, 10, 4, 10,
    ]);
  });

  it("gives no gaps for what it can't read", () => {
    expect(cssGapsOf("")).toEqual([0, 0, 0, 0]);
    expect(cssGapsOf("no such option")).toEqual([0, 0, 0, 0]);
    expect(cssGapsOf('{"option": "general:gaps_out", "css": "a"}')).toEqual([0, 0, 0, 0]);
    expect(cssGapsOf('{"option": "general:gaps_out"}')).toEqual([0, 0, 0, 0]);
  });
});

describe("floatingEdges", () => {
  it("takes the sides and the bar's edge from the outer gaps, the spacer from the inner ones", () => {
    expect(floatingEdges([8, 6, 4, 2], [3, 5, 7, 9], "top")).toEqual({
      left: 2,
      right: 6,
      margin: 8,
      spacer: 10,
    });
    expect(floatingEdges([8, 6, 4, 2], [3, 5, 7, 9], "bottom").margin).toBe(4);
  });
});

describe("exclusiveZone", () => {
  const docked = { x: 0, width: 2560, margin: 0, narrowed: false };
  const floating = { x: 388, width: 1784, margin: 8, narrowed: true };

  it("is the bar docked, and the bar plus the spacer floating", () => {
    expect(exclusiveZone(32, docked, 12)).toBe(32);
    expect(exclusiveZone(32, floating, 12)).toBe(44);
  });
});

describe("segmentPlan", () => {
  const plan = (items: { group?: unknown; visible: boolean }[]) =>
    segmentPlan(items, "center").map((p) =>
      p.visible
        ? `${p.roundStart ? "(" : "["}${p.roundEnd ? ")" : "]"}${p.gapAfter ? " " : ""}`
        : "-",
    );

  it("makes a section one group", () => {
    expect(plan([{ visible: true }, { visible: true }, { visible: true }])).toEqual([
      "(]",
      "[]",
      "[)",
    ]);
    expect(plan([{ visible: true }])).toEqual(["()"]);
  });

  it("splits groups by the group key, with a gap between them", () => {
    expect(
      plan([
        { visible: true, group: "time" },
        { visible: true, group: "time" },
        { visible: true },
        { visible: true, group: "" },
      ]),
    ).toEqual(["(]", "[) ", "(]", "[)"]);
  });

  it("skips hidden items", () => {
    expect(
      plan([
        { visible: false },
        { visible: true },
        { visible: false },
        { visible: true },
        { visible: false },
      ]),
    ).toEqual(["-", "(]", "-", "[)", "-"]);
    expect(
      plan([
        { visible: true, group: "a" },
        { visible: false, group: "b" },
        { visible: true, group: "c" },
      ]),
    ).toEqual(["() ", "-", "()"]);
    expect(plan([{ visible: false }])).toEqual(["-"]);
  });
});

describe("segmentCorners", () => {
  const first = { visible: true, roundStart: true, roundEnd: false, gapAfter: false };
  const only = { visible: true, roundStart: true, roundEnd: true, gapAfter: false };
  const middle = { visible: true, roundStart: false, roundEnd: false, gapAfter: false };

  it("rounds a round group's ends fully and keeps its inside square", () => {
    expect(segmentCorners(first, "round", 28, 4)).toEqual({
      topLeft: 14,
      topRight: 0,
      bottomLeft: 14,
      bottomRight: 0,
    });
    expect(segmentCorners(only, "round", 28, 4)).toEqual({
      topLeft: 14,
      topRight: 14,
      bottomLeft: 14,
      bottomRight: 14,
    });
    expect(segmentCorners(middle, "round", 28, 4)).toEqual({
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    });
  });

  it("gives a square group the corner everywhere", () => {
    const four = { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 };
    expect(segmentCorners(first, "square", 28, 4)).toEqual(four);
    expect(segmentCorners(middle, "square", 28, 4)).toEqual(four);
  });
});

describe("entryKey", () => {
  it("ignores key order, at every depth", () => {
    expect(entryKey({ id: "sys", type: "command", exec: "x", opts: { b: 1, a: 2 } })).toBe(
      entryKey({ exec: "x", id: "sys", opts: { a: 2, b: 1 }, type: "command" }),
    );
  });

  it("tells different entries apart", () => {
    expect(entryKey({ id: "a" })).not.toBe(entryKey({ id: "b" }));
    expect(entryKey({ id: "a", items: [1, 2] })).not.toBe(entryKey({ id: "a", items: [2, 1] }));
    expect(entryKey("omarchy.clock")).toBe('"omarchy.clock"');
  });
});
