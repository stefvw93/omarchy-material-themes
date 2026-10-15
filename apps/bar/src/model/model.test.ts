import { describe, expect, it } from "vite-plus/test";
import {
  bodyGeometry,
  contentX,
  drawerWidth,
  cssGapsOf,
  entryKey,
  glyphFontSize,
  isSingleGlyph,
  exclusiveZone,
  floatingEdges,
  isIconItem,
  legibilityShadow,
  parseFocusEvent,
  buttonStateLayer,
  nearestButton,
  segmentCorners,
  segmentPlan,
  selectedCorners,
  standsAlone,
  stateLayerPart,
  transparency,
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
  const edge = { outer: "(", inner: "|", join: "" } as const;
  const end = { outer: ")", inner: "|", join: "" } as const;
  const plan = (items: { group?: unknown; visible: boolean; icon?: boolean }[]) =>
    segmentPlan(
      items.map((i) => ({ icon: false, ...i })),
      "right",
    ).map((p) => (p.visible ? `${edge[p.start]}x${end[p.end]}${p.gapAfter ? " " : ""}` : "-"));

  it("makes a section one group of segments", () => {
    expect(plan([{ visible: true }, { visible: true }, { visible: true }])).toEqual([
      "(x|",
      "|x|",
      "|x)",
    ]);
    expect(plan([{ visible: true }])).toEqual(["(x)"]);
  });

  it("puts consecutive icons in one segment", () => {
    expect(
      plan([
        { visible: true },
        { visible: true, icon: true },
        { visible: true, icon: true },
        { visible: true, icon: true },
      ]),
    ).toEqual(["(x|", "|x", "x", "x)"]);
    expect(
      plan([{ visible: true, icon: true }, { visible: true }, { visible: true, icon: true }]),
    ).toEqual(["(x|", "|x|", "|x)"]);
  });

  it("splits groups by the group key, with a gap between them", () => {
    expect(
      plan([
        { visible: true, group: "time" },
        { visible: true, group: "time" },
        { visible: true },
        { visible: true, group: "" },
      ]),
    ).toEqual(["(x|", "|x) ", "(x|", "|x)"]);
    expect(
      plan([
        { visible: true, icon: true, group: "a" },
        { visible: true, icon: true, group: "b" },
      ]),
    ).toEqual(["(x) ", "(x)"]);
  });

  it("skips hidden items", () => {
    expect(
      plan([
        { visible: false },
        { visible: true, icon: true },
        { visible: false },
        { visible: true, icon: true },
        { visible: false },
      ]),
    ).toEqual(["-", "(x", "-", "x)", "-"]);
    expect(
      plan([
        { visible: true, group: "a" },
        { visible: false, group: "b" },
        { visible: true, group: "c" },
      ]),
    ).toEqual(["(x) ", "-", "(x)"]);
  });
});

describe("segmentCorners", () => {
  const part = (start: "outer" | "inner" | "join", end: "outer" | "inner" | "join") => ({
    visible: true,
    start,
    end,
    gapAfter: false,
  });

  it("rounds a round group's outer corners fully, its inner ones by the corner", () => {
    expect(segmentCorners(part("outer", "inner"), "round", 28, 4)).toEqual({
      topLeft: 14,
      topRight: 4,
      bottomLeft: 14,
      bottomRight: 4,
    });
    expect(segmentCorners(part("inner", "outer"), "round", 28, 4)).toEqual({
      topLeft: 4,
      topRight: 14,
      bottomLeft: 4,
      bottomRight: 14,
    });
  });

  it("gives a square group the corner at outer and inner sides", () => {
    expect(segmentCorners(part("outer", "inner"), "square", 28, 4)).toEqual({
      topLeft: 4,
      topRight: 4,
      bottomLeft: 4,
      bottomRight: 4,
    });
  });

  it("has no corner where icons share a segment", () => {
    expect(segmentCorners(part("join", "join"), "round", 28, 4)).toEqual({
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    });
    expect(segmentCorners(part("join", "outer"), "square", 28, 4)).toEqual({
      topLeft: 0,
      topRight: 4,
      bottomLeft: 0,
      bottomRight: 4,
    });
  });
});

describe("isIconItem", () => {
  it("is a widget no wider than one icon button, or a row of them", () => {
    expect(isIconItem(32, 32, "omarchy.audio")).toBe(true);
    expect(isIconItem(40, 40, "omarchy.audio")).toBe(true);
    expect(isIconItem(41, 40, "omarchy.audio")).toBe(false);
    expect(isIconItem(143, 32, "omarchy.clock")).toBe(false);
    expect(isIconItem(81, 32, "omarchy.tray")).toBe(true);
    expect(isIconItem(96, 32, "omarchy.indicators")).toBe(true);
    expect(isIconItem(0, 32, "omarchy.audio")).toBe(false);
    expect(isIconItem(160, 32, "omarchy.workspaces")).toBe(true);
    expect(isIconItem(0, 32, "omarchy.indicators")).toBe(false);
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

describe("buttonStateLayer", () => {
  const corners = { topLeft: 16, topRight: 16, bottomLeft: 16, bottomRight: 16 };
  const part = { width: 120, corners };
  // Five workspace numbers, 20 wide, 2 apart, after 10 of padding.
  const buttons = [10, 32, 54, 76, 98].map((x) => ({ x, width: 20 }));

  it("spans a middle button with the inner corner all round", () => {
    expect(buttonStateLayer(part, buttons, 2, 4)).toEqual({
      x: 54,
      width: 20,
      corners: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
    });
  });

  it("reaches the part's start from the first button, in its start corners", () => {
    expect(buttonStateLayer(part, buttons, 0, 4)).toEqual({
      x: 0,
      width: 30,
      corners: { topLeft: 16, topRight: 4, bottomLeft: 16, bottomRight: 4 },
    });
  });

  it("reaches the part's end from the last button, in its end corners", () => {
    expect(buttonStateLayer(part, buttons, 4, 4)).toEqual({
      x: 98,
      width: 22,
      corners: { topLeft: 4, topRight: 16, bottomLeft: 4, bottomRight: 16 },
    });
  });

  it("covers the whole part for a lone button", () => {
    expect(buttonStateLayer(part, [{ x: 10, width: 20 }], 0, 4)).toEqual({
      x: 0,
      width: 120,
      corners,
    });
  });

  it("gives null for an index that isn't a button", () => {
    expect(buttonStateLayer(part, buttons, 5, 4)).toBeNull();
    expect(buttonStateLayer(part, buttons, -1, 4)).toBeNull();
    expect(buttonStateLayer(part, [], 0, 4)).toBeNull();
  });
});

describe("nearestButton", () => {
  // Buttons at 10–30, 32–52, 54–74: 2-wide gaps at 30–32 and 52–54.
  const buttons = [10, 32, 54].map((x) => ({ x, width: 20 }));

  it("picks the button under the point", () => {
    expect(nearestButton(buttons, 20)).toBe(0);
    expect(nearestButton(buttons, 40)).toBe(1);
    expect(nearestButton(buttons, 70)).toBe(2);
  });

  it("splits a gap at its middle", () => {
    expect(nearestButton(buttons, 30.5)).toBe(0);
    expect(nearestButton(buttons, 31.5)).toBe(1);
    expect(nearestButton(buttons, 53)).toBe(2);
  });

  it("gives the ends to the first and last buttons", () => {
    expect(nearestButton(buttons, 0)).toBe(0);
    expect(nearestButton(buttons, 200)).toBe(2);
  });

  it("is -1 without buttons", () => {
    expect(nearestButton([], 10)).toBe(-1);
  });
});

describe("transparency", () => {
  it("keeps the segments on a horizontal bar, transparent or not", () => {
    expect(transparency(true, false)).toEqual({ segmented: true, onWallpaper: false });
    expect(transparency(false, false)).toEqual({ segmented: true, onWallpaper: false });
  });

  it("puts a transparent vertical bar's content on the wallpaper", () => {
    expect(transparency(true, true)).toEqual({ segmented: false, onWallpaper: true });
    expect(transparency(false, true)).toEqual({ segmented: false, onWallpaper: false });
  });
});

describe("contentX", () => {
  it("keeps start-pinned content at the start padding", () => {
    expect(contentX("start", 20, 100, 4)).toBe(4);
  });

  it("keeps end-pinned content's end where it ends at the full width", () => {
    expect(contentX("end", 20, 100, 4)).toBe(-76);
    expect(contentX("end", 130, 100, 4)).toBe(34);
  });

  it("centres centre-pinned content, in whole pixels", () => {
    expect(contentX("center", 21, 100, 4)).toBe(-35);
    expect(contentX("center", 60, 100, 4)).toBe(-16);
  });

  it("puts every pin at the start padding once settled", () => {
    for (const pin of ["start", "end", "center"] as const)
      expect(contentX(pin, 100, 100, 4)).toBe(4);
  });
});

describe("stateLayerPart", () => {
  const corners = { topLeft: 16, bottomLeft: 16, topRight: 4, bottomRight: 4 };

  it("is the whole part without a start", () => {
    expect(stateLayerPart({ width: 90, corners }, 0, 4)).toEqual({ x: 0, width: 90, corners });
  });

  it("starts after the knob with the inner corner, keeping the part's end corners", () => {
    expect(stateLayerPart({ width: 90, corners }, 30, 4)).toEqual({
      x: 30,
      width: 60,
      corners: { topLeft: 4, bottomLeft: 4, topRight: 4, bottomRight: 4 },
    });
  });

  it("is never narrower than nothing", () => {
    expect(stateLayerPart({ width: 20, corners }, 30, 4).width).toBe(0);
  });
});

describe("drawerWidth", () => {
  it("is the full width while revealed", () => {
    expect(drawerWidth(160, 96, true)).toBe(160);
  });

  it("hides the hidden extent while closed, never below nothing", () => {
    expect(drawerWidth(160, 96, false)).toBe(64);
    expect(drawerWidth(40, 96, false)).toBe(0);
  });

  it("is the full width for a widget that hides nothing", () => {
    expect(drawerWidth(32, 0, false)).toBe(32);
  });
});

describe("contentX for a closed drawer", () => {
  it("puts the hidden part before the start, under the knob", () => {
    // full 4 + 160 + 0; closed: 160 − 96 hidden.
    expect(contentX("end", drawerWidth(164, 96, false), 164, 4)).toBe(-92);
  });
});

describe("isSingleGlyph", () => {
  it("is one code point, a surrogate pair included", () => {
    expect(isSingleGlyph("\uf053")).toBe(true);
    expect(isSingleGlyph("\udb80\uddd8")).toBe(true);
  });

  it("is not empty text or more than one glyph", () => {
    expect(isSingleGlyph("")).toBe(false);
    expect(isSingleGlyph("45% \udb80\udc79")).toBe(false);
    expect(isSingleGlyph("ab")).toBe(false);
  });
});

describe("glyphFontSize", () => {
  it("fills the live area, 20 of 24 units of the icon", () => {
    // A glyph as wide as its font size: 20 × 20 / 24.
    expect(glyphFontSize(20, 1)).toBe(17);
    // A glyph drawn at 0.6 of its font size needs a bigger one.
    expect(glyphFontSize(20, 0.6)).toBe(28);
  });

  it("keeps the icon size when the extent is unknown", () => {
    expect(glyphFontSize(20, 0)).toBe(20);
  });
});

describe("standing alone", () => {
  it("is the workspaces", () => {
    expect(standsAlone("omarchy.workspaces")).toBe(true);
    expect(standsAlone("omarchy.menu")).toBe(false);
  });

  it("keeps an alone icon item out of its icon neighbours' segment", () => {
    const plan = segmentPlan(
      [
        { visible: true, icon: true },
        { visible: true, icon: true, alone: true },
        { visible: true, icon: true },
      ],
      "left",
    );
    expect(plan.map((p) => [p.start, p.end])).toEqual([
      ["outer", "inner"],
      ["inner", "inner"],
      ["inner", "outer"],
    ]);
  });
});

describe("selectedCorners", () => {
  it("morphs the round shape to the medium corner", () => {
    expect(selectedCorners("round", 32, 12)).toEqual({
      topLeft: 12,
      topRight: 12,
      bottomLeft: 12,
      bottomRight: 12,
    });
  });

  it("morphs the square shape to fully round", () => {
    expect(selectedCorners("square", 32, 12)).toEqual({
      topLeft: 16,
      topRight: 16,
      bottomLeft: 16,
      bottomRight: 16,
    });
  });
});
