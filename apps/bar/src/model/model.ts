// The bar's own decisions without Qt (specs.md). The stock bar's logic stays
// in the fork, qml/BarModel.js.
import { parseCssGaps } from "@stef/qml-kit";

export type FocusArea =
  | { readonly on: false }
  | { readonly on: true; readonly x0: number; readonly x1: number; readonly monitor: string };

export interface BodyGeometry {
  readonly x: number;
  readonly width: number;
  /** The floating toolbar's distance from the screen edge; 0 docked. */
  readonly margin: number;
  readonly narrowed: boolean;
}

/** Hyprland's outer gaps at the sides, and the floating toolbar's edge margin. */
export interface BodyEdges {
  readonly left: number;
  readonly right: number;
  readonly margin: number;
}

/** What a transparent bar keeps (specs.md, Transparency). */
export interface Transparency {
  readonly segmented: boolean;
  readonly onWallpaper: boolean;
}

export function transparency(transparent: boolean, vertical: boolean): Transparency {
  return { segmented: !vertical, onWallpaper: transparent && vertical };
}

/** Which side of its slot a widget's content is pinned to while the slot's width moves (specs.md). */
export type SlotPin = "start" | "end" | "center";

export function contentX(pin: SlotPin, width: number, full: number, startPad: number): number {
  if (pin === "end") return width - full + startPad;
  if (pin === "center") return startPad + Math.round((width - full) / 2);
  return startPad;
}

export function parseFocusEvent(data: string): FocusArea | null {
  const m = /^periphery>>(?:(off)|(\d+),(\d+),([^,\s]+))$/.exec(data);
  if (!m) return null;
  if (m[1]) return { on: false };
  const x0 = parseInt(m[2]!, 10);
  const x1 = parseInt(m[3]!, 10);
  return x0 < x1 ? { on: true, x0, x1, monitor: m[4]! } : null;
}

export function bodyGeometry(
  focus: FocusArea | null,
  screen: { readonly name: string; readonly x: number; readonly width: number },
  edges: BodyEdges,
): BodyGeometry {
  if (!focus || !focus.on || focus.monitor !== screen.name)
    return { x: 0, width: screen.width, margin: 0, narrowed: false };
  const clamp = (v: number) => Math.min(screen.width, Math.max(0, v));
  const x0 = clamp(focus.x0 + edges.left - screen.x);
  const x1 = clamp(focus.x1 - edges.right - screen.x);
  return { x: x0, width: Math.max(0, x1 - x0), margin: edges.margin, narrowed: true };
}

// WCAG relative luminance of an sRGB channel (0–255).
const channel = (v: number) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export function legibilityShadow(text: string): "#000000" | "#ffffff" {
  const m = /^#(?:[0-9a-f]{2})?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(text);
  if (!m) return "#000000";
  const [r, g, b] = [m[1]!, m[2]!, m[3]!].map((h) => channel(parseInt(h, 16)));
  const l = 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
  // Contrast ratio (L1 + 0.05) / (L2 + 0.05) against white (L 1) and black (L 0).
  return 1.05 / (l + 0.05) > (l + 0.05) / 0.05 ? "#ffffff" : "#000000";
}

export function cssGapsOf(output: string): [number, number, number, number] {
  try {
    const parsed: unknown = JSON.parse(output);
    const css =
      parsed && typeof parsed === "object" ? (parsed as { css?: unknown }).css : undefined;
    return parseCssGaps(typeof css === "string" ? css : undefined) ?? [0, 0, 0, 0];
  } catch {
    return [0, 0, 0, 0];
  }
}

export interface FloatingEdges extends BodyEdges {
  /** The distance between two windows stacked vertically. */
  readonly spacer: number;
}

export function floatingEdges(
  gapsOut: readonly number[],
  gapsIn: readonly number[],
  position: string,
): FloatingEdges {
  const [top = 0, right = 0, bottom = 0, left = 0] = gapsOut;
  const [inTop = 0, , inBottom = 0] = gapsIn;
  return { left, right, margin: position === "bottom" ? bottom : top, spacer: inTop + inBottom };
}

export function exclusiveZone(barSize: number, body: BodyGeometry, spacer: number): number {
  return body.narrowed ? barSize + spacer : barSize;
}

export interface SegmentItem {
  readonly group?: unknown;
  readonly visible: boolean;
  /** An icon widget: consecutive ones share a segment. */
  readonly icon: boolean;
}

/** What is at one side of an item: its group's edge, another segment, or an icon it shares a segment with. */
export type SegmentEdge = "outer" | "inner" | "join";

export interface Segment {
  readonly visible: boolean;
  readonly start: SegmentEdge;
  readonly end: SegmentEdge;
  readonly gapAfter: boolean;
}

export interface Corners {
  readonly topLeft: number;
  readonly topRight: number;
  readonly bottomLeft: number;
  readonly bottomRight: number;
}

const hiddenSegment: Segment = { visible: false, start: "join", end: "join", gapAfter: false };

export function segmentPlan(items: readonly SegmentItem[], section: string): Segment[] {
  const groupOf = (item: SegmentItem) =>
    typeof item.group === "string" && item.group !== "" ? item.group : section;
  const shown = items.map((item, i) => (item.visible ? i : -1)).filter((i) => i >= 0);
  const plan: Segment[] = items.map(() => hiddenSegment);
  const edge = (a: SegmentItem, b: SegmentItem | undefined): SegmentEdge => {
    if (!b || groupOf(b) !== groupOf(a)) return "outer";
    return a.icon && b.icon ? "join" : "inner";
  };
  shown.forEach((i, k) => {
    const item = items[i]!;
    const prev = k > 0 ? items[shown[k - 1]!] : undefined;
    const next = k < shown.length - 1 ? items[shown[k + 1]!] : undefined;
    plan[i] = {
      visible: true,
      start: edge(item, prev),
      end: edge(item, next),
      gapAfter: next !== undefined && groupOf(next) !== groupOf(item),
    };
  });
  return plan;
}

export function segmentCorners(
  plan: Segment,
  shape: string,
  height: number,
  corner: number,
): Corners {
  const radius = (side: SegmentEdge) =>
    side === "join" ? 0 : side === "outer" && shape === "round" ? height / 2 : corner;
  const start = radius(plan.start);
  const end = radius(plan.end);
  return { topLeft: start, topRight: end, bottomLeft: start, bottomRight: end };
}

export interface ButtonExtent {
  readonly x: number;
  readonly width: number;
}

export interface StateLayer extends ButtonExtent {
  readonly corners: Corners;
}

export function buttonStateLayer(
  part: { readonly width: number; readonly corners: Corners },
  buttons: ReadonlyArray<ButtonExtent>,
  index: number,
  innerCorner: number,
): StateLayer | null {
  const button = buttons[index];
  if (button === undefined) return null;
  const first = index === 0;
  const last = index === buttons.length - 1;
  const x0 = first ? 0 : button.x;
  const x1 = last ? part.width : button.x + button.width;
  return {
    x: x0,
    width: x1 - x0,
    corners: {
      topLeft: first ? part.corners.topLeft : innerCorner,
      bottomLeft: first ? part.corners.bottomLeft : innerCorner,
      topRight: last ? part.corners.topRight : innerCorner,
      bottomRight: last ? part.corners.bottomRight : innerCorner,
    },
  };
}

export function stateLayerPart(
  part: { readonly width: number; readonly corners: Corners },
  start: number,
  innerCorner: number,
): StateLayer {
  if (!(start > 0)) return { x: 0, width: part.width, corners: part.corners };
  return {
    x: start,
    width: Math.max(0, part.width - start),
    corners: {
      topLeft: innerCorner,
      bottomLeft: innerCorner,
      topRight: part.corners.topRight,
      bottomRight: part.corners.bottomRight,
    },
  };
}

/** The width a drawer's slot settles at (specs.md). */
export function drawerWidth(full: number, hiddenExtent: number, revealed: boolean): number {
  return revealed ? full : Math.max(0, full - hiddenExtent);
}

/** Whether a button's text is one glyph (specs.md, Icon buttons). */
export function isSingleGlyph(text: string): boolean {
  if (text.length === 1) return true;
  if (text.length !== 2) return false;
  const high = text.charCodeAt(0);
  const low = text.charCodeAt(1);
  return high >= 0xd800 && high <= 0xdbff && low >= 0xdc00 && low <= 0xdfff;
}

/** A Material icon's live area: 20 of its 24 grid units. */
const liveArea = 20 / 24;

/** The font size at which a glyph fills the live area at `iconSize` (specs.md). */
export function glyphFontSize(iconSize: number, extentPerPx: number): number {
  if (!(extentPerPx > 0)) return iconSize;
  return Math.round((iconSize * liveArea) / extentPerPx);
}

export function nearestButton(buttons: ReadonlyArray<ButtonExtent>, x: number): number {
  for (let i = 0; i + 1 < buttons.length; i++) {
    const here = buttons[i]!;
    const next = buttons[i + 1]!;
    if (x < (here.x + here.width + next.x) / 2) return i;
  }
  return buttons.length - 1;
}

/** Widgets that are a row of icon buttons, whatever their width. */
const iconRows = ["omarchy.tray", "omarchy.indicators", "omarchy.workspaces"];

export function isIconItem(contentWidth: number, iconWidth: number, id: string): boolean {
  if (!(contentWidth > 0)) return false;
  return contentWidth <= iconWidth || iconRows.indexOf(id) >= 0;
}

const sortedKeys = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(sortedKeys);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort())
      out[key] = sortedKeys((value as Record<string, unknown>)[key]);
    return out;
  }
  return value;
};

export function entryKey(entry: unknown): string {
  return JSON.stringify(sortedKeys(entry));
}
