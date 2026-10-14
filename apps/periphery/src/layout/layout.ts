// Layout: the other workspaces' windows as cards in the bands, Mission
// Control style. See specs.md.

import { readingOrder } from "@stef/qml-kit";

/** A window on another workspace, as the caller reads it from Hyprland. */
export interface LayoutWindow {
  address: string;
  title: string;
  appClass: string;
  floating: boolean;
  wsId: number;
  wsName: string;
  /** Real position and size, global pixels. */
  rx: number;
  ry: number;
  rw: number;
  rh: number;
  /** A key shared by the tabs of one tab group; "" for a window on its own. */
  tabGroup: string;
  /** The tab its tile shows: in front of its pile. */
  shownTab: boolean;
}

export interface Geometry {
  monW: number;
  monH: number;
  sideW: number;
  bandMargin: number;
  cardGap: number;
  groupGap: number;
  headerHeight: number;
  /** Reserved at the monitor's top and bottom (the bar); 0 when absent. */
  top?: number;
  bottom?: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * A card: the window's own fields, minus its real rect, plus the card rect at
 * rest, its stacking order in the band and its pile.
 */
export type Card<W extends LayoutWindow = LayoutWindow> = Omit<W, "rx" | "ry" | "rw" | "rh"> &
  Rect & {
    z: number;
    /** Its tab group's key, open or closed; "" for a window on its own. */
    pile: string;
  };

export interface Header extends Rect {
  id: number;
  label: string;
}

export interface Bands {
  left: number[];
  right: number[];
}

export interface Layout<W extends LayoutWindow = LayoutWindow> extends Bands {
  cards: Record<string, Card<W>>;
  headers: Header[];
}

/** Sorts workspace ids into the bands, with the wrap rule. */
export function assignBands(ids: readonly number[], current: number): Bands {
  const sorted = [...ids].sort((a, b) => a - b);
  const left = sorted.filter((id) => id < current);
  const right = sorted.filter((id) => id > current);
  // On the first workspace the last one wraps round to the left, and on the
  // last workspace the first one wraps round to the right.
  if (left.length === 0 && right.length >= 2) left.push(right.pop()!);
  else if (right.length === 0 && left.length >= 2) right.push(left.shift()!);
  return { left, right };
}

/** A group's windows in reading order (a sorted copy). Shared with expo via @stef/qml-kit. */
export { readingOrder };

/** Pile offset per tab behind the front one, and how many offsets show. */
const PILE_STEP = 7;
const PILE_MAX = 3;
/** A card is never more than this of its window's real size. */
const MAX_SCALE = 0.5;
/** Column-count combinations tried per band before falling back. */
const MAX_COMBOS = 729;

/** A window on its own, or a pile: the tabs of one tab group, back to front. */
interface Unit<W extends LayoutWindow> {
  windows: W[];
  /** Its place in the input: the last tie-break in a column. */
  order: number;
  rx: number;
  ry: number;
  rw: number;
  rh: number;
  /** How much larger than one card the pile is, both ways. */
  extra: number;
}

/** A group laid out in some columns. */
interface Candidate<W extends LayoutWindow> {
  columns: Unit<W>[][];
}

interface Packed<W extends LayoutWindow> {
  /** The group's body: the columns' bounding box. */
  w: number;
  h: number;
  units: { unit: Unit<W>; x: number; y: number; cw: number; ch: number }[];
}

/** The whole layout: bands, cards and headers. See specs.md. */
export function layoutBands<W extends LayoutWindow>(
  windows: readonly W[],
  current: number,
  geometry: Geometry,
  /** The open pile's tab group key; "" for none. */
  open = "",
): Layout<W> {
  const byWs = new Map<number, { label: string; windows: W[] }>();
  for (const w of windows) {
    const group = byWs.get(w.wsId);
    if (group) group.windows.push(w);
    else byWs.set(w.wsId, { label: w.wsName || String(w.wsId), windows: [w] });
  }
  const { left, right } = assignBands([...byWs.keys()], current);
  const groupsOf = (ids: number[]) =>
    ids.map((id) => {
      const g = byWs.get(id)!;
      return { id, label: g.label, windows: g.windows, open };
    });

  const cards: Record<string, Card<W>> = {};
  const headers: Header[] = [];
  placeSide(groupsOf(left), geometry.bandMargin, geometry, cards, headers);
  placeSide(
    groupsOf(right),
    geometry.monW - geometry.sideW + geometry.bandMargin,
    geometry,
    cards,
    headers,
  );
  return { cards, headers, left, right };
}

// Windows on their own and piles, in input order; a pile's shown tab in
// front (the last tab without one). The open pile's tabs are on their own.
function unitsOf<W extends LayoutWindow>(windows: readonly W[], open: string): Unit<W>[] {
  const units: Unit<W>[] = [];
  const piles: Record<string, Unit<W>> = {};
  windows.forEach((w, order) => {
    const piled = w.tabGroup !== "" && w.tabGroup !== open;
    const pile = piled ? piles[w.tabGroup] : undefined;
    if (pile) pile.windows.push(w);
    else {
      const unit = { windows: [w], order, rx: 0, ry: 0, rw: 0, rh: 0, extra: 0 };
      units.push(unit);
      if (piled) piles[w.tabGroup] = unit;
    }
  });
  for (const u of units) {
    const box = bounds(u.windows.map((w) => ({ x: w.rx, y: w.ry, w: w.rw, h: w.rh })));
    u.rx = box.x;
    u.ry = box.y;
    u.rw = box.w;
    u.rh = box.h;
    u.extra = PILE_STEP * Math.min(PILE_MAX, u.windows.length - 1);
    const shown = u.windows.filter((w) => w.shownTab);
    if (shown.length > 0) u.windows = u.windows.filter((w) => !w.shownTab).concat(shown);
  }
  return units;
}

function bounds(rects: readonly Rect[]): Rect {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const r of rects) {
    x0 = Math.min(x0, r.x);
    y0 = Math.min(y0, r.y);
    x1 = Math.max(x1, r.x + r.w);
    y1 = Math.max(y1, r.y + r.h);
  }
  return { x: x0, y: y0, w: Math.max(1, x1 - x0), h: Math.max(1, y1 - y0) };
}

// Units whose x ranges overlap by more than 4 px share a real column (also
// through a chain); columns left to right. Each floating unit joins the
// column nearest its centre. Every column runs top to bottom.
function realColumns<W extends LayoutWindow>(
  units: readonly Unit<W>[],
  floats: readonly Unit<W>[],
): Unit<W>[][] {
  const sorted = units.slice().sort((a, b) => a.rx - b.rx || a.ry - b.ry || a.order - b.order);
  const columns: Unit<W>[][] = [];
  const ranges: { x0: number; x1: number }[] = [];
  for (const u of sorted) {
    const range = ranges[ranges.length - 1];
    if (range && u.rx < range.x1 - 4) {
      columns[columns.length - 1]!.push(u);
      range.x1 = Math.max(range.x1, u.rx + u.rw);
    } else {
      columns.push([u]);
      ranges.push({ x0: u.rx, x1: u.rx + u.rw });
    }
  }
  for (const f of floats) {
    const cx = f.rx + f.rw / 2;
    let best = 0;
    let bestD = Infinity;
    ranges.forEach((r, i) => {
      const d = Math.max(0, r.x0 - cx, cx - r.x1);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    columns[best]!.push(f);
  }
  for (const column of columns)
    column.sort((a, b) => a.ry - b.ry || a.rx - b.rx || a.order - b.order);
  return columns;
}

// The real columns merged into k runs: of every split, the one whose tallest
// run (summed real heights) is lowest; the earlier split on a tie.
function mergeColumns<W extends LayoutWindow>(real: Unit<W>[][], k: number): Unit<W>[][] {
  const heights = real.map((c) => c.reduce((sum, u) => sum + u.rh, 0));
  let best: number[] = [];
  let bestTallest = Infinity;
  const cuts: number[] = [];
  const visit = (from: number, left: number) => {
    if (left === 0) {
      let tallest = 0;
      let start = 0;
      for (const cut of cuts.concat([real.length])) {
        let h = 0;
        for (let i = start; i < cut; i++) h += heights[i]!;
        tallest = Math.max(tallest, h);
        start = cut;
      }
      if (tallest < bestTallest) {
        bestTallest = tallest;
        best = cuts.slice();
      }
      return;
    }
    for (let cut = from; cut <= real.length - left; cut++) {
      cuts.push(cut);
      visit(cut + 1, left - 1);
      cuts.pop();
    }
  };
  visit(1, k - 1);
  const merged: Unit<W>[][] = [];
  let start = 0;
  for (const cut of best.concat([real.length])) {
    merged.push(([] as Unit<W>[]).concat(...real.slice(start, cut)));
    start = cut;
  }
  return merged;
}

// A group's candidate layouts: 1 to min(real columns, 3) columns. Floating
// units join the tiled units' columns; without tiled units they make them.
function candidatesOf<W extends LayoutWindow>(windows: readonly W[], open: string): Candidate<W>[] {
  const units = unitsOf(windows, open);
  const tiled = units.filter((u) => !u.windows[0]!.floating);
  const floats = units.filter((u) => u.windows[0]!.floating);
  const real = tiled.length > 0 ? realColumns(tiled, floats) : realColumns(floats, []);
  const out: Candidate<W>[] = [];
  for (let k = 1; k <= Math.min(real.length, 3); k++) out.push({ columns: mergeColumns(real, k) });
  return out;
}

// A candidate at scale s: columns side by side, units stacked and centred in
// their column, shorter columns centred against the tallest.
function pack<W extends LayoutWindow>(c: Candidate<W>, s: number, gap: number): Packed<W> {
  const cols = c.columns.map((units) => {
    const sizes = units.map((u) => ({ unit: u, cw: u.rw * s, ch: u.rh * s }));
    return {
      sizes,
      w: Math.max(...sizes.map((z) => z.cw + z.unit.extra)),
      h: sizes.reduce((sum, z) => sum + z.ch + z.unit.extra, 0) + gap * (sizes.length - 1),
    };
  });
  const w = cols.reduce((sum, col) => sum + col.w, 0) + gap * (cols.length - 1);
  const h = Math.max(...cols.map((col) => col.h));

  const units: Packed<W>["units"] = [];
  let x = 0;
  for (const col of cols) {
    let y = (h - col.h) / 2;
    for (const z of col.sizes) {
      const uw = z.cw + z.unit.extra;
      units.push({ unit: z.unit, x: x + (col.w - uw) / 2, y, cw: z.cw, ch: z.ch });
      y += z.ch + z.unit.extra + gap;
    }
    x += col.w + gap;
  }
  return { w, h, units };
}

// The largest scale, at most MAX_SCALE, at which the body fits maxW × maxH.
function fitScale(c: Candidate<LayoutWindow>, gap: number, maxW: number, maxH: number): number {
  const fits = (s: number) => {
    const p = pack(c, s, gap);
    return p.w <= maxW + 1e-9 && p.h <= maxH + 1e-9;
  };
  if (fits(MAX_SCALE)) return MAX_SCALE;
  let lo = 0;
  let hi = MAX_SCALE;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (fits(mid)) lo = mid;
    else hi = mid;
  }
  return lo;
}

// One band: each group's candidate at its width-limited scale times a common
// factor, the combination with the largest product of scales; the groups
// stacked and centred. See specs.md.
function placeSide<W extends LayoutWindow>(
  input: { id: number; label: string; windows: W[]; open: string }[],
  bandX: number,
  geo: Geometry,
  cards: Record<string, Card<W>>,
  headers: Header[],
): void {
  if (input.length === 0) return;
  const bandW = geo.sideW - geo.bandMargin * 2;
  const top = geo.top ?? 0;
  const bandH = geo.monH - top - (geo.bottom ?? 0);
  const gap = geo.cardGap;
  const freeH = Math.max(
    0,
    bandH -
      geo.bandMargin * 2 -
      input.length * geo.headerHeight -
      (input.length - 1) * geo.groupGap,
  );

  const groups = input.map((g) => ({
    ...g,
    options: candidatesOf(g.windows, g.open).map((c) => ({
      c,
      sMax: fitScale(c as Candidate<LayoutWindow>, gap, bandW, freeH),
    })),
  }));

  const heightAt = (choice: number[], mu: number) =>
    groups.reduce((sum, g, i) => {
      const o = g.options[choice[i]!]!;
      return sum + pack(o.c, o.sMax * mu, gap).h;
    }, 0);
  const muFor = (choice: number[]) => {
    if (heightAt(choice, 1) <= freeH + 1e-9) return 1;
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (heightAt(choice, mid) <= freeH + 1e-9) lo = mid;
      else hi = mid;
    }
    return lo;
  };

  const combos = groups.reduce((n, g) => n * g.options.length, 1);
  let choice = groups.map((g) => g.options.length - 1);
  let mu = muFor(choice);
  if (combos <= MAX_COMBOS) {
    let bestScore = -Infinity;
    const trial = groups.map(() => 0);
    for (let n = 0; n < combos; n++) {
      let r = n;
      for (let i = 0; i < groups.length; i++) {
        trial[i] = r % groups[i]!.options.length;
        r = Math.floor(r / groups[i]!.options.length);
      }
      const m = muFor(trial);
      const score = groups.reduce(
        (sum, g, i) => sum + Math.log(Math.max(1e-12, g.options[trial[i]!]!.sMax * m)),
        0,
      );
      if (score > bestScore + 1e-9) {
        bestScore = score;
        choice = trial.slice();
        mu = m;
      }
    }
  }

  const packed = groups.map((g, i) => {
    const o = g.options[choice[i]!]!;
    return pack(o.c, o.sMax * mu, gap);
  });
  const used =
    packed.reduce((sum, p) => sum + p.h, 0) +
    groups.length * geo.headerHeight +
    (groups.length - 1) * geo.groupGap;
  let y = top + (bandH - used) / 2;
  groups.forEach((g, i) => {
    const p = packed[i]!;
    const x0 = bandX + (bandW - p.w) / 2;
    const y0 = y + geo.headerHeight;
    headers.push({ id: g.id, label: g.label, x: bandX, y, w: bandW, h: geo.headerHeight + p.h });
    for (const it of p.units) {
      const n = it.unit.windows.length;
      const ux = x0 + it.x;
      const uy = y0 + it.y;
      it.unit.windows.forEach((w, j) => {
        const off = it.unit.extra - Math.min(PILE_MAX, n - 1 - j) * PILE_STEP;
        cards[w.address] = cardOf(w, {
          x: ux + off,
          y: uy + off,
          w: it.cw,
          h: it.ch,
          z: j,
          pile: w.tabGroup,
        });
      });
    }
    y += geo.headerHeight + p.h + geo.groupGap;
  });
}

function cardOf<W extends LayoutWindow>(w: W, placed: Rect & { z: number; pile: string }): Card<W> {
  const { rx: _rx, ry: _ry, rw: _rw, rh: _rh, ...rest } = w;
  return { ...rest, ...placed } as Card<W>;
}
