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
}

export interface Segment {
  readonly visible: boolean;
  readonly roundStart: boolean;
  readonly roundEnd: boolean;
  readonly gapAfter: boolean;
}

export interface Corners {
  readonly topLeft: number;
  readonly topRight: number;
  readonly bottomLeft: number;
  readonly bottomRight: number;
}

const hiddenSegment: Segment = {
  visible: false,
  roundStart: false,
  roundEnd: false,
  gapAfter: false,
};

export function segmentPlan(items: readonly SegmentItem[], section: string): Segment[] {
  const groupOf = (item: SegmentItem) =>
    typeof item.group === "string" && item.group !== "" ? item.group : section;
  const shown = items.map((item, i) => (item.visible ? i : -1)).filter((i) => i >= 0);
  const plan: Segment[] = items.map(() => hiddenSegment);
  shown.forEach((i, k) => {
    const group = groupOf(items[i]!);
    const prev = k > 0 ? groupOf(items[shown[k - 1]!]!) : undefined;
    const next = k < shown.length - 1 ? groupOf(items[shown[k + 1]!]!) : undefined;
    plan[i] = {
      visible: true,
      roundStart: prev !== group,
      roundEnd: next !== group,
      gapAfter: next !== undefined && next !== group,
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
  if (shape !== "round")
    return { topLeft: corner, topRight: corner, bottomLeft: corner, bottomRight: corner };
  const start = plan.roundStart ? height / 2 : 0;
  const end = plan.roundEnd ? height / 2 : 0;
  return { topLeft: start, topRight: end, bottomLeft: start, bottomRight: end };
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
