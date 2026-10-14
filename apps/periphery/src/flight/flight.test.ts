import { describe, expect, it } from "vite-plus/test";
import { ghostLook, ghostsOnTiles, isHiddenTab, planFlight, shownAfter } from "./flight.ts";

// A tab group of three (z shown), and a window outside any group.
const groups = { x: ["x", "y", "z"], y: ["x", "y", "z"], z: ["x", "y", "z"], w: [] };
const shown = new Set(["z"]);

describe("isHiddenTab", () => {
  it("is a tab of a group that isn't shown", () => {
    expect(isHiddenTab("x", groups, shown)).toBe(true);
    expect(isHiddenTab("y", groups, shown)).toBe(true);
  });

  it("is not the shown tab", () => {
    expect(isHiddenTab("z", groups, shown)).toBe(false);
  });

  it("is not a window outside a tab group, nor one Hyprland reports nothing for", () => {
    expect(isHiddenTab("w", groups, shown)).toBe(false);
    expect(isHiddenTab("v", groups, shown)).toBe(false);
  });

  it("is not a window alone in its group", () => {
    expect(isHiddenTab("a", { a: ["a"] }, new Set())).toBe(false);
  });
});

describe("shownAfter", () => {
  it("shows the target and hides the rest of its group", () => {
    const after = shownAfter(groups, shown, "x");
    expect(after.has("x")).toBe(true);
    expect(after.has("z")).toBe(false);
  });

  it("keeps the shown set without a target", () => {
    expect([...shownAfter(groups, shown, "")]).toEqual(["z"]);
  });

  it("keeps other groups' shown tabs", () => {
    const more = { ...groups, p: ["p", "q"], q: ["p", "q"] };
    expect(shownAfter(more, new Set(["z", "q"]), "x").has("q")).toBe(true);
  });

  it("doesn't change the input", () => {
    shownAfter(groups, shown, "x");
    expect([...shown]).toEqual(["z"]);
  });
});

describe("ghostsOnTiles", () => {
  it("puts up every shown focus window, and no hidden tab", () => {
    expect(ghostsOnTiles(["x", "y", "z", "w"], groups, shown)).toEqual(["z", "w"]);
  });
});

describe("planFlight", () => {
  const base = { groups, shown, target: "" };

  it("flies windows leaving the focus area to their cards, and windows entering to their tiles", () => {
    const plan = planFlight({ ...base, before: ["a"], after: ["b"], cards: ["a"] });
    expect(plan.fly.sort()).toEqual(["a", "b"]);
    expect(plan.card).toEqual([]);
  });

  it("only fades the card of a hidden tab leaving the focus area", () => {
    const plan = planFlight({
      ...base,
      before: ["x", "y", "z"],
      after: ["b"],
      cards: ["x", "y", "z"],
    });
    expect(plan.fly.sort()).toEqual(["b", "z"]);
    expect(plan.card.sort()).toEqual(["x", "y"]);
  });

  it("only fades the card of a hidden tab entering the focus area", () => {
    const plan = planFlight({ ...base, before: ["a"], after: ["x", "y", "z"], cards: ["a"] });
    expect(plan.fly.sort()).toEqual(["a", "z"]);
    expect(plan.card.sort()).toEqual(["x", "y"]);
  });

  it("flies the target tab in and fades the tab shown until then", () => {
    const plan = planFlight({
      ...base,
      target: "x",
      before: ["a"],
      after: ["x", "y", "z"],
      cards: ["a"],
    });
    expect(plan.fly.sort()).toEqual(["a", "x"]);
    expect(plan.card.sort()).toEqual(["y", "z"]);
  });

  it("flies a window that stays in the focus area from tile to tile", () => {
    const plan = planFlight({ ...base, before: ["a", "m"], after: ["m", "b"], cards: ["a"] });
    expect(plan.fly.sort()).toEqual(["a", "b", "m"]);
  });

  it("leaves a hidden tab that stays in the focus area alone", () => {
    const plan = planFlight({ ...base, before: ["x", "z", "a"], after: ["x", "z"], cards: ["a"] });
    expect(plan.fly.sort()).toEqual(["a", "z"]);
    expect(plan.card).toEqual([]);
  });

  it("leaves windows that are cards at both ends to their cards", () => {
    const plan = planFlight({ ...base, before: ["a"], after: ["b"], cards: ["a", "c"] });
    expect(plan.fly).not.toContain("c");
    expect(plan.card).not.toContain("c");
  });

  it("doesn't fly a window leaving the focus area without a card (closed, other monitor)", () => {
    const plan = planFlight({ ...base, before: ["a", "gone"], after: ["b"], cards: ["a"] });
    expect(plan.fly.sort()).toEqual(["a", "b"]);
  });
});

describe("ghostLook", () => {
  const window = {
    fromTile: false,
    activeAtTile: false,
    opacity: 0.985,
    opacityInactive: 0.96,
    borderSize: 3,
    rounding: 12,
    fromTilt: 0,
    toTilt: 0,
  };

  it("turns from the start's tilt to the end's along the travel", () => {
    const toCard = { ...window, fromTile: true, toTile: false, fromTilt: 0, toTilt: -8 };
    expect(ghostLook({ ...toCard, travel: 0 }).tilt).toBe(0);
    expect(ghostLook({ ...toCard, travel: 0.5 }).tilt).toBeCloseTo(-4);
    expect(ghostLook({ ...toCard, travel: 1 }).tilt).toBeCloseTo(-8);
    const toTile = { ...window, toTile: true, fromTilt: 8, toTilt: 0 };
    expect(ghostLook({ ...toTile, travel: 0.25 }).tilt).toBeCloseTo(6);
    expect(ghostLook({ ...toTile, travel: 2 }).tilt).toBeCloseTo(0);
  });

  it("looks like the window at the tile", () => {
    const look = ghostLook({ ...window, travel: 1, toTile: true });
    expect(look.contentOpacity).toBeCloseTo(0.96);
    expect(look.borderOffset).toBe(3);
    expect(look.outerRadius).toBe(15);
    expect(look.blurOpacity).toBe(1);
  });

  it("uses the active opacity for the active window", () => {
    expect(
      ghostLook({ ...window, activeAtTile: true, travel: 1, toTile: true }).contentOpacity,
    ).toBeCloseTo(0.985);
  });

  it("looks like the card at the card", () => {
    const look = ghostLook({ ...window, travel: 1, toTile: false });
    expect(look.contentOpacity).toBe(1);
    expect(look.borderOffset).toBe(0);
    expect(look.outerRadius).toBe(12);
    expect(look.blurOpacity).toBe(0);
  });

  it("starts where it leaves from", () => {
    expect(ghostLook({ ...window, travel: 0, toTile: false }).borderOffset).toBe(3);
    expect(ghostLook({ ...window, travel: 0, toTile: true }).borderOffset).toBe(0);
    expect(ghostLook({ ...window, travel: 0, toTile: false }).blurOpacity).toBe(1);
    expect(ghostLook({ ...window, travel: 0, toTile: true }).blurOpacity).toBe(0);
  });

  it("changes linearly with travel, the blur over the first half", () => {
    const look = ghostLook({ ...window, travel: 0.25, toTile: true });
    expect(look.contentOpacity).toBeCloseTo(1 - 0.04 * 0.25);
    expect(look.borderOffset).toBeCloseTo(0.75);
    expect(look.outerRadius).toBeCloseTo(12.75);
    expect(look.blurOpacity).toBeCloseTo(0.5);
    expect(ghostLook({ ...window, travel: 0.25, toTile: false }).blurOpacity).toBeCloseTo(0.5);
  });

  it("looks like the window all the way from a tile to a tile", () => {
    const look = ghostLook({ ...window, travel: 0, fromTile: true, toTile: true });
    expect(look).toEqual(ghostLook({ ...window, travel: 1, toTile: true }));
    expect(ghostLook({ ...window, travel: 0.5, fromTile: true, toTile: true })).toEqual(look);
  });

  it("clamps travel outside 0 to 1 (spring overshoot)", () => {
    expect(ghostLook({ ...window, travel: 1.2, toTile: true })).toEqual(
      ghostLook({ ...window, travel: 1, toTile: true }),
    );
    expect(ghostLook({ ...window, travel: -0.1, toTile: true })).toEqual(
      ghostLook({ ...window, travel: 0, toTile: true }),
    );
  });
});
