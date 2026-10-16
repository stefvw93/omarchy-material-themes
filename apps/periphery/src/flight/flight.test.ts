import { describe, expect, it } from "vite-plus/test";
import {
  type Phase,
  SWITCH_MAX_MS,
  SWITCH_MIN_MS,
  SWITCH_WAIT_MS,
  ghostLook,
  ghostsOnTiles,
  floatingToHide,
  ghostZ,
  isHiddenTab,
  planFlight,
  shownAfter,
  step,
} from "./flight.ts";

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
    const fly = planFlight({ ...base, before: ["a"], after: ["b"], cards: ["a"] });
    expect(fly.sort()).toEqual(["a", "b"]);
  });

  it("doesn't fly a hidden tab leaving the focus area: its card fades in", () => {
    const fly = planFlight({
      ...base,
      before: ["x", "y", "z"],
      after: ["b"],
      cards: ["x", "y", "z"],
    });
    expect(fly.sort()).toEqual(["b", "z"]);
  });

  it("doesn't fly a hidden tab entering the focus area: its card fades out", () => {
    const fly = planFlight({ ...base, before: ["a"], after: ["x", "y", "z"], cards: ["a"] });
    expect(fly.sort()).toEqual(["a", "z"]);
  });

  it("flies the target tab in, not the tab shown until then", () => {
    const fly = planFlight({
      ...base,
      target: "x",
      before: ["a"],
      after: ["x", "y", "z"],
      cards: ["a"],
    });
    expect(fly.sort()).toEqual(["a", "x"]);
  });

  it("flies a window that stays in the focus area from tile to tile", () => {
    const fly = planFlight({ ...base, before: ["a", "m"], after: ["m", "b"], cards: ["a"] });
    expect(fly.sort()).toEqual(["a", "b", "m"]);
  });

  it("leaves a hidden tab that stays in the focus area alone", () => {
    const fly = planFlight({ ...base, before: ["x", "z", "a"], after: ["x", "z"], cards: ["a"] });
    expect(fly.sort()).toEqual(["a", "z"]);
  });

  it("leaves windows that are cards at both ends to their cards", () => {
    const fly = planFlight({ ...base, before: ["a"], after: ["b"], cards: ["a", "c"] });
    expect(fly).not.toContain("c");
  });

  it("doesn't fly a window leaving the focus area without a card (closed, other monitor)", () => {
    const fly = planFlight({ ...base, before: ["a", "gone"], after: ["b"], cards: ["a"] });
    expect(fly.sort()).toEqual(["a", "b"]);
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

describe("ghostZ", () => {
  const tiled = (focusHistoryID?: number) =>
    ghostZ({ floating: false, pinned: false, focusHistoryID });
  const floating = (focusHistoryID?: number) =>
    ghostZ({ floating: true, pinned: false, focusHistoryID });
  const pinned = (focusHistoryID?: number) =>
    ghostZ({ floating: true, pinned: true, focusHistoryID });

  it("puts every tiled window at the back, at 0", () => {
    expect(tiled(0)).toBe(0);
    expect(tiled(5)).toBe(0);
    expect(tiled()).toBe(0);
  });

  it("puts floating windows in front of tiled ones, focused or not", () => {
    expect(floating(0)).toBeGreaterThan(tiled(0));
    expect(floating(500)).toBeGreaterThan(tiled(0));
    expect(floating(-1)).toBeGreaterThan(tiled(0));
    expect(floating()).toBeGreaterThan(tiled(0));
  });

  it("puts the more recently focused floating window in front", () => {
    expect(floating(1)).toBeGreaterThan(floating(2));
    expect(floating(0)).toBeGreaterThan(floating(1));
  });

  it("puts a never focused floating window behind the focused ones", () => {
    expect(floating(-1)).toBeLessThan(floating(500));
    expect(floating()).toBe(floating(-1));
  });

  it("puts pinned windows in front of every other window, the more recent in front", () => {
    expect(pinned(9)).toBeGreaterThan(floating(0));
    expect(pinned(-1)).toBeGreaterThan(floating(0));
    expect(pinned(1)).toBeGreaterThan(pinned(2));
  });
});

describe("step", () => {
  const idle: Phase = { tag: "idle" };
  const pending: Phase = { tag: "pending", since: 1000 };
  const dispatched: Phase = { tag: "pending", since: 1000, dispatchedAt: 1034 };
  const flying: Phase = { tag: "flying", since: 1100, landedTicks: 0 };
  const unhiding: Phase = { tag: "unhiding" };
  const all = [idle, pending, dispatched, flying, unhiding];

  it("starts from idle: ghosts on the tiles, the switch scheduled", () => {
    expect(step(idle, { tag: "start", now: 1000 })).toEqual({
      phase: pending,
      actions: ["launchOnTiles", "scheduleDispatch"],
    });
  });

  it("ignores a start during a flight", () => {
    for (const phase of [pending, flying, unhiding])
      expect(step(phase, { tag: "start", now: 2000 })).toEqual({ phase, actions: [] });
  });

  it("notes when the switch went out", () => {
    expect(step(pending, { tag: "dispatched", now: 1034 })).toEqual({
      phase: dispatched,
      actions: [],
    });
  });

  it("leaves a switch it didn't start to Hyprland", () => {
    expect(step(idle, { tag: "switched", now: 5, fullscreen: false })).toEqual({
      phase: idle,
      actions: [],
    });
  });

  it("flies a switch, also one that comes mid-flight or during the hand-off", () => {
    for (const phase of [pending, dispatched, flying, unhiding])
      expect(step(phase, { tag: "switched", now: 1100, fullscreen: false })).toEqual({
        phase: flying,
        actions: ["fly"],
      });
  });

  it("ends at once on a switch to a fullscreen window", () => {
    expect(step(dispatched, { tag: "switched", now: 1100, fullscreen: true })).toEqual({
      phase: unhiding,
      actions: ["unhide"],
    });
  });

  it("waits for the switch, and ends when it doesn't come", () => {
    const tick = (now: number) => step(dispatched, { tag: "tick", now, landed: true });
    expect(tick(1034 + SWITCH_WAIT_MS)).toEqual({ phase: dispatched, actions: [] });
    expect(tick(1034 + SWITCH_WAIT_MS + 1)).toEqual({ phase: unhiding, actions: ["unhide"] });
  });

  it("doesn't time out a switch that hasn't gone out yet", () => {
    expect(step(pending, { tag: "tick", now: 1500, landed: true })).toEqual({
      phase: pending,
      actions: [],
    });
  });

  it("ends a phase that takes too long, and says so", () => {
    const forced = { phase: unhiding, actions: ["warnForced", "unhide"] };
    expect(step(pending, { tag: "tick", now: 1000 + SWITCH_MAX_MS + 1, landed: true })).toEqual(
      forced,
    );
    expect(step(flying, { tag: "tick", now: 1100 + SWITCH_MAX_MS + 1, landed: false })).toEqual(
      forced,
    );
  });

  it("doesn't hand off early, landed or not", () => {
    expect(step(flying, { tag: "tick", now: 1100 + SWITCH_MIN_MS - 1, landed: true })).toEqual({
      phase: flying,
      actions: [],
    });
  });

  it("hands off once landed on two ticks in a row", () => {
    const now = 1100 + SWITCH_MIN_MS;
    const once = step(flying, { tag: "tick", now, landed: true });
    expect(once).toEqual({ phase: { ...flying, landedTicks: 1 }, actions: [] });
    expect(step(once.phase, { tag: "tick", now: now + 16, landed: true })).toEqual({
      phase: unhiding,
      actions: ["unhide"],
    });
  });

  it("starts counting again when a ghost leaves its target", () => {
    const once: Phase = { ...flying, landedTicks: 1 };
    expect(step(once, { tag: "tick", now: 1300, landed: false })).toEqual({
      phase: flying,
      actions: [],
    });
  });

  it("ignores ticks when idle or unhiding", () => {
    for (const phase of [idle, unhiding])
      expect(step(phase, { tag: "tick", now: 99999, landed: false })).toEqual({
        phase,
        actions: [],
      });
  });

  it("hands off once the floating windows are back", () => {
    expect(step(unhiding, { tag: "unhidden" })).toEqual({ phase: idle, actions: ["handOff"] });
    expect(step(flying, { tag: "unhidden" })).toEqual({ phase: flying, actions: [] });
  });

  it("closes from any phase: the switch cancelled, everything handed off", () => {
    for (const phase of all.slice(1))
      expect(step(phase, { tag: "close" })).toEqual({
        phase: idle,
        actions: ["cancelDispatch", "handOff"],
      });
    expect(step(idle, { tag: "close" })).toEqual({ phase: idle, actions: [] });
  });
});

describe("floatingToHide", () => {
  it("hides the floating windows with a card and those in the focus area, nothing tiled", () => {
    const cards = { a: { floating: true }, b: { floating: false }, c: {} };
    const tiles = { d: { floating: true }, e: { floating: false } };
    expect(floatingToHide(cards, tiles)).toEqual(["a", "d"]);
  });

  it("names a window once", () => {
    expect(floatingToHide({ a: { floating: true } }, { a: { floating: true } })).toEqual(["a"]);
  });
});
