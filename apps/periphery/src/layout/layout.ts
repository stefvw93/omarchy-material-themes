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
 * rest, its stacking order in the band, its pile and its rect in the fan.
 */
export type Card<W extends LayoutWindow = LayoutWindow> = Omit<W, "rx" | "ry" | "rw" | "rh"> &
  Rect & {
    z: number;
    /** Its tab group's key; "" for a window on its own. */
    pile: string;
    /** Where it goes while its pile is fanned out; null for a window on its own. */
    fan: Rect | null;
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
  rx: number;
  ry: number;
  rw: number;
  rh: number;
  /** How much larger than one card the pile is, both ways. */
  extra: number;
}

/** A group laid out in some columns: the columns' units and its floating windows. */
interface Candidate<W extends LayoutWindow> {
  columns: Unit<W>[][];
  floats: W[];
  /** The tiled windows' bounding box, real pixels: where floats map from. */
  box: Rect;
}

interface Packed<W extends LayoutWindow> {
  /** The group's body: columns and floating cards. */
  w: number;
  h: number;
  /** The columns' bounding box inside the body. */
  cols: Rect;
  units: { unit: Unit<W>; x: number; y: number; cw: number; ch: number }[];
  floats: { window: W; x: number; y: number; w: number; h: number }[];
}

/** The whole layout: bands, cards and headers. See specs.md. */
export function layoutBands<W extends LayoutWindow>(
  windows: readonly W[],
  current: number,
  geometry: Geometry,
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
      return { id, label: g.label, windows: g.windows };
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
// front (the last tab without one).
function unitsOf<W extends LayoutWindow>(windows: readonly W[]): Unit<W>[] {
  const units: Unit<W>[] = [];
  const piles: Record<string, Unit<W>> = {};
  for (const w of windows) {
    const pile = w.tabGroup ? piles[w.tabGroup] : undefined;
    if (pile) pile.windows.push(w);
    else {
      const unit = { windows: [w], rx: 0, ry: 0, rw: 0, rh: 0, extra: 0 };
      units.push(unit);
      if (w.tabGroup) piles[w.tabGroup] = unit;
    }
  }
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
// through a chain); columns left to right, each top to bottom.
function realColumns<W extends LayoutWindow>(units: readonly Unit<W>[]): Unit<W>[][] {
  const sorted = units.slice().sort((a, b) => a.rx - b.rx || a.ry - b.ry);
  const columns: Unit<W>[][] = [];
  let end = -Infinity;
  for (const u of sorted) {
    const column = columns[columns.length - 1];
    if (column && u.rx < end - 4) column.push(u);
    else columns.push([u]);
    end = column && u.rx < end - 4 ? Math.max(end, u.rx + u.rw) : u.rx + u.rw;
  }
  for (const column of columns) column.sort((a, b) => a.ry - b.ry || a.rx - b.rx);
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

// A group's candidate layouts: 1 to min(real columns, 3) columns.
function candidatesOf<W extends LayoutWindow>(windows: readonly W[]): Candidate<W>[] {
  const tiled = windows.filter((w) => !w.floating);
  const floats = tiled.length > 0 ? windows.filter((w) => w.floating) : [];
  const units = unitsOf(tiled.length > 0 ? tiled : windows);
  const box = bounds(units.map((u) => ({ x: u.rx, y: u.ry, w: u.rw, h: u.rh })));
  const real = realColumns(units);
  const out: Candidate<W>[] = [];
  for (let k = 1; k <= Math.min(real.length, 3); k++)
    out.push({ columns: mergeColumns(real, k), floats, box });
  return out;
}

// A candidate at scale s: columns side by side, units stacked and centred in
// their column, shorter columns centred against the tallest; floating cards
// mapped from the tiled box onto the columns and kept inside the body.
function pack<W extends LayoutWindow>(c: Candidate<W>, s: number, gap: number): Packed<W> {
  const cols = c.columns.map((units) => {
    const sizes = units.map((u) => ({ unit: u, cw: u.rw * s, ch: u.rh * s }));
    return {
      sizes,
      w: Math.max(...sizes.map((z) => z.cw + z.unit.extra)),
      h: sizes.reduce((sum, z) => sum + z.ch + z.unit.extra, 0) + gap * (sizes.length - 1),
    };
  });
  const colsW = cols.reduce((sum, col) => sum + col.w, 0) + gap * (cols.length - 1);
  const colsH = Math.max(...cols.map((col) => col.h));
  const floatSizes = c.floats.map((window) => ({ window, w: window.rw * s, h: window.rh * s }));
  const w = Math.max(colsW, ...floatSizes.map((f) => f.w));
  const h = Math.max(colsH, ...floatSizes.map((f) => f.h));
  const colsRect = { x: (w - colsW) / 2, y: (h - colsH) / 2, w: colsW, h: colsH };

  const units: Packed<W>["units"] = [];
  let x = colsRect.x;
  for (const col of cols) {
    let y = colsRect.y + (colsH - col.h) / 2;
    for (const z of col.sizes) {
      const uw = z.cw + z.unit.extra;
      units.push({ unit: z.unit, x: x + (col.w - uw) / 2, y, cw: z.cw, ch: z.ch });
      y += z.ch + z.unit.extra + gap;
    }
    x += col.w + gap;
  }
  const keep = (at: number, size: number, body: number) =>
    size >= body ? (body - size) / 2 : Math.max(0, Math.min(body - size, at));
  const floats = floatSizes.map((f) => {
    const cx = colsRect.x + ((f.window.rx + f.window.rw / 2 - c.box.x) / c.box.w) * colsW;
    const cy = colsRect.y + ((f.window.ry + f.window.rh / 2 - c.box.y) / c.box.h) * colsH;
    return {
      window: f.window,
      x: keep(cx - f.w / 2, f.w, w),
      y: keep(cy - f.h / 2, f.h, h),
      w: f.w,
      h: f.h,
    };
  });
  return { w, h, cols: colsRect, units, floats };
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
  input: { id: number; label: string; windows: W[] }[],
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
    options: candidatesOf(g.windows).map((c) => ({
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
  const bandTop = top + geo.bandMargin;
  const bandBottom = geo.monH - (geo.bottom ?? 0) - geo.bandMargin;
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
      const fan = n > 1 ? fanOf(n, ux, uy, it.cw, it.ch, it.unit.extra) : null;
      it.unit.windows.forEach((w, j) => {
        const off = it.unit.extra - Math.min(PILE_MAX, n - 1 - j) * PILE_STEP;
        cards[w.address] = cardOf(w, {
          x: ux + off,
          y: uy + off,
          w: it.cw,
          h: it.ch,
          z: j,
          pile: n > 1 ? w.tabGroup : "",
          fan: fan ? fan[j]! : null,
        });
      });
    }
    for (const f of p.floats)
      cards[f.window.address] = cardOf(f.window, {
        x: x0 + f.x,
        y: y0 + f.y,
        w: f.w,
        h: f.h,
        z: 100,
        pile: "",
        fan: null,
      });
    y += geo.headerHeight + p.h + geo.groupGap;
  });

  // A pile's tabs lined up vertically, back at the top, each half a card
  // below the one before (less when the band is short); centred on the pile
  // and kept inside the band.
  function fanOf(n: number, ux: number, uy: number, cw: number, ch: number, extra: number) {
    const room = bandBottom - bandTop;
    const step = Math.max(0, Math.min(ch / 2, (room - ch) / (n - 1)));
    const fanH = ch + step * (n - 1);
    const cx = ux + (cw + extra) / 2;
    const cy = uy + (ch + extra) / 2;
    const fx = Math.max(bandX, Math.min(bandX + bandW - cw, cx - cw / 2));
    const fy = Math.max(bandTop, Math.min(bandBottom - fanH, cy - fanH / 2));
    const out: Rect[] = [];
    for (let j = 0; j < n; j++) out.push({ x: fx, y: fy + step * j, w: cw, h: ch });
    return out;
  }
}

function cardOf<W extends LayoutWindow>(
  w: W,
  placed: Rect & { z: number; pile: string; fan: Rect | null },
): Card<W> {
  const { rx: _rx, ry: _ry, rw: _rw, rh: _rh, ...rest } = w;
  return { ...rest, ...placed } as Card<W>;
}
