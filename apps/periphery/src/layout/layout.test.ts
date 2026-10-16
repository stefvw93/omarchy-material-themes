import { describe, expect, it } from "vite-plus/test";
import { assignBands, layoutBands } from "./layout.ts";
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
      expect(card.x).toBeGreaterThanOrEqual(x - 0.01);
      expect(card.x + card.w).toBeLessThanOrEqual(x + bandW + 0.01);
      expect(card.y).toBeGreaterThanOrEqual(geometry.bandMargin - 0.01);
      expect(card.y + card.h).toBeLessThanOrEqual(geometry.monH - geometry.bandMargin + 0.01);
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

  it("leaves no two cards closer than the card gap, apart from a closed pile's tabs", () => {
    const windows = [
      ...tiledPair(1),
      ...tiledPair(3),
      win(3, 900, 400, 900, 600, { floating: true }),
      ...tabs(4, 3, 0),
      win(4, 1300, 31, 870, 1404),
      win(4, 400, 300, 1500, 800, { floating: true }),
      ...tabs(5, 2, 1),
      win(5, 385, 31, 1790, 1404),
    ];
    for (const open of ["", "g4"]) {
      const layout = layoutBands(windows, 2, geometry, open);
      const cards = band(Object.values(layout.cards), rightX).filter(
        (c) => c.pile === "" || c.pile === open,
      );
      expect(cards).toHaveLength(open ? 9 : 6);
      for (let i = 0; i < cards.length; i++)
        for (let j = i + 1; j < cards.length; j++)
          expect(separated(cards[i]!, cards[j]!, geometry.cardGap)).toBe(true);
    }
  });

  it("packs a floating window into its column, by its real height", () => {
    // A tall tile on the left; on the right two tiles stacked, a float
    // between them in real y.
    const left = win(3, 385, 31, 892, 1404);
    const top = win(3, 1283, 31, 892, 690);
    const bottom = win(3, 1283, 731, 892, 704);
    const floating = win(3, 1400, 400, 600, 400, { floating: true });
    const layout = layoutBands([floating, bottom, top, left], 2, geometry);
    const [f, t, b] = [floating, top, bottom].map((w) => layout.cards[w.address]!);
    expect(f!.y).toBeGreaterThan(t!.y + t!.h);
    expect(b!.y).toBeGreaterThan(f!.y + f!.h);
    expect(f!.z).toBe(0);
  });

  it("puts a floating window in the column nearest its centre, never bridging columns", () => {
    // A wide float over both columns, above them in real y, its centre
    // nearer the right one: it goes just above the right tile, whether the
    // columns stay apart or merge (left column first).
    const pair = [win(3, 385, 31, 892, 1404), win(3, 1283, 31, 892, 1404)];
    const floating = win(3, 600, 10, 1400, 300, { floating: true });
    const layout = layoutBands([...pair, floating], 2, geometry);
    const [l, r, f] = [...pair, floating].map((w) => layout.cards[w.address]!);
    expect(f!.y + f!.h).toBeLessThan(r!.y);
    expect(l!.y).toBeLessThan(f!.y + f!.h);
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

  it("piles the tabs of a tab group, the shown tab in front, the others up and towards the monitor's edge", () => {
    // Right band: the tabs behind peek out up and to the right.
    const pile = tabs(3, 3, 1);
    const layout = layoutBands(pile, 2, geometry);
    const [back, front, middle] = pile.map((w) => layout.cards[w.address]!);
    for (const c of [back!, front!, middle!]) {
      expect(c.pile).toBe("g3");
      expect(c.w).toBeCloseTo(front!.w, 6);
    }
    expect(front!.z).toBeGreaterThan(middle!.z);
    expect(middle!.z).toBeGreaterThan(back!.z);
    expect(middle!.x - front!.x).toBeCloseTo(7, 6);
    expect(back!.x - front!.x).toBeCloseTo(14, 6);
    expect(front!.y - back!.y).toBeCloseTo(14, 6);
    expect(front!.x).toBeCloseTo(rightX + (bandW - (front!.w + 14)) / 2, 6);
  });

  it("mirrors a pile in the left band: the tabs behind peek out up and to the left", () => {
    const pile = tabs(1, 3, 2);
    const layout = layoutBands(pile, 2, geometry);
    const [back, middle, front] = pile.map((w) => layout.cards[w.address]!);
    expect(front!.x - middle!.x).toBeCloseTo(7, 6);
    expect(front!.x - back!.x).toBeCloseTo(14, 6);
    expect(front!.y - back!.y).toBeCloseTo(14, 6);
    expect(back!.x).toBeCloseTo(leftX + (bandW - (front!.w + 14)) / 2, 6);
  });

  it("puts tabs beyond three steps back at the last step", () => {
    const pile = tabs(3, 5, 4);
    const layout = layoutBands(pile, 2, geometry);
    const cards = pile.map((w) => layout.cards[w.address]!);
    const front = cards[4]!;
    expect(cards[0]!.x - front.x).toBeCloseTo(21, 6);
    expect(cards[1]!.x - front.x).toBeCloseTo(21, 6);
    expect(cards[2]!.x - front.x).toBeCloseTo(14, 6);
    expect(cards[3]!.x - front.x).toBeCloseTo(7, 6);
  });

  it("puts the last tab in front when no tab is shown", () => {
    const pile = tabs(3, 2, -1);
    const layout = layoutBands(pile, 2, geometry);
    expect(layout.cards[pile[1]!.address]!.z).toBeGreaterThan(layout.cards[pile[0]!.address]!.z);
  });

  it("lays the open pile's tabs out as cards of their own, in input order", () => {
    const pile = tabs(3, 3, 2);
    const other = win(3, 1300, 31, 870, 1404);
    const closed = layoutBands([...pile, other], 2, geometry);
    const open = layoutBands([...pile, other], 2, geometry, "g3");
    const cards = pile.map((w) => open.cards[w.address]!);
    for (const c of cards) {
      expect(c.pile).toBe("g3");
      expect(c.z).toBe(0);
    }
    expect(cards[1]!.y).toBeGreaterThan(cards[0]!.y + cards[0]!.h);
    expect(cards[2]!.y).toBeGreaterThan(cards[1]!.y + cards[1]!.h);
    // The other card moved aside.
    expect(open.cards[other.address]).not.toEqual(closed.cards[other.address]);
  });

  it("ignores an open pile that isn't in the band", () => {
    const windows = [...tabs(3, 3, 2), win(3, 1300, 31, 870, 1404)];
    expect(layoutBands(windows, 2, geometry, "elsewhere")).toEqual(
      layoutBands(windows, 2, geometry),
    );
  });

  it("gives a window on its own no pile", () => {
    const only = win(3, 385, 31, 892, 1404);
    const card = layoutBands([only], 2, geometry).cards[only.address]!;
    expect(card.pile).toBe("");
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
