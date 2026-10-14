import { describe, expect, it } from "vite-plus/test";
import { assignBands, layoutBands, readingOrder } from "./layout.ts";
import type { Card, Geometry, LayoutWindow, Rect } from "./layout.ts";

// DP-3: 2560×1440, ratio 1.25 → focus area 1800, bands 380.
const geometry: Geometry = {
  monW: 2560,
  monH: 1440,
  sideW: 380,
  bandMargin: 16,
  cardGap: 10,
  groupGap: 20,
  headerHeight: 30,
};
const bandW = geometry.sideW - 2 * geometry.bandMargin;
const leftX = geometry.bandMargin;
const rightX = geometry.monW - geometry.sideW + geometry.bandMargin;

let next = 0;
function win(
  wsId: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  extra: Partial<LayoutWindow> = {},
) {
  next += 1;
  return {
    address: `0x${next}`,
    title: `window ${next}`,
    appClass: "foot",
    floating: false,
    wsId,
    wsName: String(wsId),
    rx,
    ry,
    rw,
    rh,
    tabGroup: "",
    shownTab: false,
    ...extra,
  };
}

// Two windows tiled side by side on a full-width workspace (smart gaps off).
function tiledPair(wsId: number) {
  return [win(wsId, 385, 31, 892, 1404), win(wsId, 1283, 31, 892, 1404)];
}

function band(cards: Card[], x: number) {
  return cards.filter((c) => c.x >= x && c.x < x + bandW);
}

function separated(a: Rect, b: Rect, gap: number) {
  const dx = Math.abs(a.x + a.w / 2 - (b.x + b.w / 2)) - (a.w + b.w) / 2;
  const dy = Math.abs(a.y + a.h / 2 - (b.y + b.h / 2)) - (a.h + b.h) / 2;
  return dx >= gap - 0.5 || dy >= gap - 0.5;
}

// Tabs of one tab group on one tile.
function tabs(wsId: number, n: number, shown: number, group = `g${wsId}`) {
  return Array.from({ length: n }, (_, i) =>
    win(wsId, 385, 31, 892, 1404, { tabGroup: group, shownTab: i === shown }),
  );
}

describe("assignBands", () => {
  it.each([
    { current: 1, ids: [2, 3, 4], left: [4], right: [2, 3] },
    { current: 2, ids: [1, 3, 4], left: [1], right: [3, 4] },
    { current: 4, ids: [1, 2, 3], left: [2, 3], right: [1] },
    { current: 1, ids: [2], left: [], right: [2] },
    { current: 3, ids: [1, 2], left: [2], right: [1] },
    { current: 3, ids: [1], left: [1], right: [] },
  ])(
    "current $current, occupied $ids → left $left, right $right",
    ({ current, ids, left, right }) => {
      expect(assignBands(ids, current)).toEqual({ left, right });
    },
  );

  it("orders each band by id whatever the input order", () => {
    expect(assignBands([5, 2, 4], 3)).toEqual({ left: [2], right: [4, 5] });
  });
});

describe("readingOrder", () => {
  it("puts tiled windows left to right, then top to bottom, floating last", () => {
    const right = win(1, 900, 0, 100, 100);
    const lower = win(1, 0, 500, 100, 100);
    const upper = win(1, 3, 0, 100, 100);
    const floating = win(1, 0, 0, 100, 100, { floating: true });
    expect(readingOrder([floating, right, lower, upper])).toEqual([upper, lower, right, floating]);
  });

  it("returns a copy", () => {
    const windows = [win(1, 500, 0, 10, 10), win(1, 0, 0, 10, 10)];
    const first = windows[0];
    readingOrder(windows);
    expect(windows[0]).toBe(first);
  });
});

describe("layoutBands", () => {
  it("puts lower workspaces left, higher right, with the wrap rule", () => {
    const layout = layoutBands([...tiledPair(1), ...tiledPair(3), ...tiledPair(4)], 2, geometry);
    expect(layout.left).toEqual([1]);
    expect(layout.right).toEqual([3, 4]);
    const wrapped = layoutBands([...tiledPair(2), ...tiledPair(3)], 1, geometry);
    expect(wrapped.left).toEqual([3]);
    expect(wrapped.right).toEqual([2]);
  });

  it("keeps the bands clear of the reserved top and bottom", () => {
    const barred = { ...geometry, top: 32, bottom: 20 };
    const layout = layoutBands([...tiledPair(1), ...tiledPair(3), ...tiledPair(4)], 2, barred);
    for (const card of Object.values(layout.cards)) {
      expect(card.y).toBeGreaterThanOrEqual(barred.top + barred.bandMargin - 0.01);
      expect(card.y + card.h).toBeLessThanOrEqual(
        barred.monH - barred.bottom - barred.bandMargin + 0.01,
      );
    }
    for (const header of layout.headers)
      expect(header.y).toBeGreaterThanOrEqual(barred.top + barred.bandMargin - 0.01);
  });

  it("centres a short band between the reserved top and bottom", () => {
    const layout = layoutBands(tiledPair(1), 2, { ...geometry, top: 40 });
    const header = layout.headers[0]!;
    const plain = layoutBands(tiledPair(1), 2, geometry).headers[0]!;
    expect(header.y - plain.y).toBeCloseTo(20, 5);
  });

  it("keeps every card inside its band", () => {
    const layout = layoutBands(
      [
        ...tiledPair(1),
        ...tiledPair(3),
        ...tiledPair(4),
        ...tabs(5, 4, 0),
        win(5, 1800, 1000, 900, 700, { floating: true }),
      ],
      2,
      geometry,
    );
    for (const card of Object.values(layout.cards)) {
      const x = card.wsId === 1 ? leftX : rightX;
      for (const r of card.fan ? [card, card.fan] : [card]) {
        expect(r.x).toBeGreaterThanOrEqual(x - 0.01);
        expect(r.x + r.w).toBeLessThanOrEqual(x + bandW + 0.01);
        expect(r.y).toBeGreaterThanOrEqual(geometry.bandMargin - 0.01);
        expect(r.y + r.h).toBeLessThanOrEqual(geometry.monH - geometry.bandMargin + 0.01);
      }
    }
  });

  it("keeps each window's aspect ratio, with one scale per group", () => {
    const windows = [
      win(4, 385, 31, 1190, 1404),
      win(4, 1585, 31, 590, 1404),
      win(4, 400, 200, 600, 400, { floating: true }),
    ];
    const layout = layoutBands([...tiledPair(1), ...windows], 2, geometry);
    const scales = windows.map((w) => {
      const card = layout.cards[w.address]!;
      expect(card.w / card.h).toBeCloseTo(w.rw / w.rh, 6);
      return card.w / w.rw;
    });
    for (const scale of scales) expect(scale).toBeCloseTo(scales[0]!, 6);
  });

  it("gives each group its own scale: a lone window fills the band's width", () => {
    const wide = win(3, 385, 31, 1600, 900);
    const tall = win(4, 385, 31, 800, 1404);
    const layout = layoutBands([...tiledPair(1), wide, tall], 2, geometry);
    expect(layout.cards[wide.address]!.w).toBeCloseTo(bandW, 1);
    expect(layout.cards[tall.address]!.w).toBeCloseTo(bandW, 1);
  });

  it("never shows a window above half its real size", () => {
    const small = win(3, 385, 31, 400, 300);
    const card = layoutBands([small], 2, geometry).cards[small.address]!;
    expect(card.w).toBeCloseTo(200, 6);
    expect(card.h).toBeCloseTo(150, 6);
  });

  it("stacks side-by-side windows in one column in a roomy band, left one on top", () => {
    const [left, right] = tiledPair(3);
    const layout = layoutBands([left!, right!], 2, geometry);
    const a = layout.cards[left!.address]!;
    const b = layout.cards[right!.address]!;
    expect(b.y).toBeCloseTo(a.y + a.h + geometry.cardGap, 6);
    expect(a.x).toBeCloseTo(b.x, 6);
  });

  it("keeps side-by-side windows in two columns in a crowded band, on their sides", () => {
    const groups = [3, 4, 5, 6].map((id) => tiledPair(id));
    const layout = layoutBands(
      [...tiledPair(1), ...([] as LayoutWindow[]).concat(...groups)],
      2,
      geometry,
    );
    for (const [left, right] of groups) {
      const a = layout.cards[left!.address]!;
      const b = layout.cards[right!.address]!;
      expect(b.x).toBeCloseTo(a.x + a.w + geometry.cardGap, 6);
      expect(b.y).toBeCloseTo(a.y, 6);
    }
  });

  it("keeps a chain of overlapping x ranges in one real column, top to bottom", () => {
    // A wide window above two narrow ones, and a tall one to their right.
    const a = win(3, 0, 0, 1000, 700);
    const b = win(3, 0, 710, 490, 690);
    const c = win(3, 510, 710, 490, 690);
    const d = win(3, 1010, 0, 490, 1400);
    const layout = layoutBands([d, c, b, a], 2, geometry);
    const ys = [a, b, c, d].map((w) => layout.cards[w.address]!.y);
    for (let i = 1; i < ys.length; i++) expect(ys[i]!).toBeGreaterThan(ys[i - 1]!);
  });

  it("staggers a shorter column, centred against the tallest", () => {
    // Crowded, so each group keeps its two columns: a tall window beside a short one.
    const groups = [3, 4, 5, 6].map((id) => [
      win(id, 385, 31, 892, 1404),
      win(id, 1283, 31, 892, 600),
    ]);
    const layout = layoutBands(
      [...tiledPair(1), ...([] as LayoutWindow[]).concat(...groups)],
      2,
      geometry,
    );
    for (const [tall, short] of groups) {
      const t = layout.cards[tall!.address]!;
      const s = layout.cards[short!.address]!;
      expect(s.x).toBeGreaterThan(t.x);
      expect(s.y + s.h / 2).toBeCloseTo(t.y + t.h / 2, 6);
    }
  });

  it("leaves no two cards of a group closer than the card gap, apart from piles and floats", () => {
    const layout = layoutBands(
      [...tiledPair(1), ...tiledPair(3), ...tiledPair(4), win(5, 385, 31, 1790, 1404)],
      2,
      geometry,
    );
    const cards = band(Object.values(layout.cards), rightX);
    expect(cards).toHaveLength(5);
    for (let i = 0; i < cards.length; i++)
      for (let j = i + 1; j < cards.length; j++)
        expect(separated(cards[i]!, cards[j]!, geometry.cardGap)).toBe(true);
  });

  it("puts a floating window over the tiled cards where it sits, in front", () => {
    const tiled = win(3, 385, 31, 1784, 1404);
    const floating = win(3, 385 + 446, 31 + 351, 600, 400, { floating: true });
    const layout = layoutBands([tiled, floating], 2, geometry);
    const t = layout.cards[tiled.address]!;
    const f = layout.cards[floating.address]!;
    // Its centre at (0.25 + 300/1784, 0.25 + 200/1404) of the tiled box.
    expect(f.x + f.w / 2).toBeCloseTo(t.x + t.w * (0.25 + 300 / 1784), 6);
    expect(f.y + f.h / 2).toBeCloseTo(t.y + t.h * (0.25 + 200 / 1404), 6);
    expect(f.z).toBeGreaterThanOrEqual(100);
    expect(t.z).toBeLessThan(100);
  });

  it("keeps a floating card inside its group", () => {
    const tiled = win(3, 385, 31, 1784, 1404);
    const floating = win(3, 2000, 1300, 600, 400, { floating: true });
    const layout = layoutBands([tiled, floating], 2, geometry);
    const t = layout.cards[tiled.address]!;
    const f = layout.cards[floating.address]!;
    expect(f.x + f.w).toBeLessThanOrEqual(t.x + t.w + 0.01);
    expect(f.y + f.h).toBeLessThanOrEqual(t.y + t.h + 0.01);
  });

  it("packs a group of only floating windows like tiled ones", () => {
    const a = win(3, 100, 100, 800, 600, { floating: true });
    const b = win(3, 1000, 900, 800, 400, { floating: true });
    const layout = layoutBands([a, b], 2, geometry);
    const ca = layout.cards[a.address]!;
    const cb = layout.cards[b.address]!;
    expect(separated(ca, cb, geometry.cardGap)).toBe(true);
    expect(ca.z).toBe(cb.z);
  });

  it("piles the tabs of a tab group, the shown tab in front at the bottom right", () => {
    const pile = tabs(3, 3, 1);
    const layout = layoutBands(pile, 2, geometry);
    const [back, front, middle] = pile.map((w) => layout.cards[w.address]!);
    for (const c of [back!, front!, middle!]) {
      expect(c.pile).toBe("g3");
      expect(c.w).toBeCloseTo(front!.w, 6);
    }
    expect(front!.z).toBeGreaterThan(middle!.z);
    expect(middle!.z).toBeGreaterThan(back!.z);
    expect(front!.x - middle!.x).toBeCloseTo(7, 6);
    expect(front!.y - back!.y).toBeCloseTo(14, 6);
    expect(back!.x).toBeCloseTo(rightX + (bandW - (front!.w + 14)) / 2, 6);
  });

  it("puts tabs beyond three steps back at the last step", () => {
    const pile = tabs(3, 5, 4);
    const layout = layoutBands(pile, 2, geometry);
    const cards = pile.map((w) => layout.cards[w.address]!);
    const front = cards[4]!;
    expect(front.x - cards[0]!.x).toBeCloseTo(21, 6);
    expect(front.x - cards[1]!.x).toBeCloseTo(21, 6);
    expect(front.x - cards[2]!.x).toBeCloseTo(14, 6);
    expect(front.x - cards[3]!.x).toBeCloseTo(7, 6);
  });

  it("puts the last tab in front when no tab is shown", () => {
    const pile = tabs(3, 2, -1);
    const layout = layoutBands(pile, 2, geometry);
    expect(layout.cards[pile[1]!.address]!.z).toBeGreaterThan(layout.cards[pile[0]!.address]!.z);
  });

  it("fans a pile out vertically, each tab at least half visible, front tab at the bottom", () => {
    const pile = tabs(3, 3, 2);
    const layout = layoutBands([...pile, win(3, 1300, 31, 870, 1404)], 2, geometry);
    const fans = pile.map((w) => layout.cards[w.address]!.fan!);
    const rest = layout.cards[pile[2]!.address]!;
    for (let i = 1; i < fans.length; i++) {
      expect(fans[i]!.y - fans[i - 1]!.y).toBeCloseTo(rest.h / 2, 6);
      expect(fans[i]!.x).toBeCloseTo(fans[0]!.x, 6);
      expect(fans[i]!.w).toBeCloseTo(rest.w, 6);
    }
  });

  it("shrinks the fan's steps when the band is too short", () => {
    const pile = tabs(3, 5, 0);
    const short = { ...geometry, monH: 500 };
    const layout = layoutBands(pile, 2, short);
    const fans = pile.map((w) => layout.cards[w.address]!.fan!);
    expect(fans[0]!.y).toBeGreaterThanOrEqual(short.bandMargin - 0.01);
    expect(fans[4]!.y + fans[4]!.h).toBeLessThanOrEqual(short.monH - short.bandMargin + 0.01);
  });

  it("gives a window on its own no pile and no fan", () => {
    const only = win(3, 385, 31, 892, 1404);
    const card = layoutBands([only], 2, geometry).cards[only.address]!;
    expect(card.pile).toBe("");
    expect(card.fan).toBeNull();
    expect(card.z).toBe(0);
  });

  it("stacks the groups groupGap apart, centred in the band", () => {
    const layout = layoutBands(
      [...tiledPair(1), win(3, 385, 31, 1600, 900), win(4, 385, 31, 1600, 900)],
      2,
      geometry,
    );
    const [three, four] = layout.headers.filter((h) => h.x === rightX);
    expect(four!.y - (three!.y + three!.h)).toBeCloseTo(geometry.groupGap, 6);
    expect(three!.y).toBeCloseTo(geometry.monH - (four!.y + four!.h), 6);
  });

  it("puts each header just above its group's top card, groups top to bottom by id", () => {
    const layout = layoutBands([...tiledPair(1), ...tiledPair(3), ...tiledPair(4)], 2, geometry);
    const right = layout.headers.filter((h) => h.x === rightX);
    expect(right.map((h) => h.id)).toEqual([3, 4]);
    const [three, four] = right;
    expect(three!.y + three!.h).toBeLessThanOrEqual(four!.y);
    for (const header of right) {
      const cards = Object.values(layout.cards).filter((c) => c.wsId === header.id);
      const top = Math.min(...cards.map((c) => c.y));
      const bottom = Math.max(...cards.map((c) => c.y + c.h));
      expect(header).toMatchObject({ label: String(header.id), x: rightX, w: bandW });
      expect(header.y).toBeCloseTo(top - geometry.headerHeight, 6);
      expect(header.y + header.h).toBeCloseTo(bottom, 6);
    }
  });

  it("lists the left band's headers first", () => {
    const layout = layoutBands([...tiledPair(1), ...tiledPair(3)], 2, geometry);
    expect(layout.headers.map((h) => h.id)).toEqual([1, 3]);
    expect(layout.headers[0]!.x).toBe(leftX);
  });

  it("passes the caller's own fields through to the card", () => {
    const toplevel = { marker: true };
    const w = { ...win(3, 385, 31, 892, 1404), toplevel };
    const card = layoutBands([w], 2, geometry).cards[w.address]!;
    expect(card).toMatchObject({
      address: w.address,
      title: w.title,
      appClass: "foot",
      wsId: 3,
      toplevel,
    });
    expect(card).not.toHaveProperty("rx");
  });

  it("returns nothing for no windows", () => {
    expect(layoutBands([], 1, geometry)).toEqual({ cards: {}, headers: [], left: [], right: [] });
  });
});
