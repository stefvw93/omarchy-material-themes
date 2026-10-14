// The bar's own decisions without Qt (specs.md). The stock bar's logic stays
// in the fork, qml/BarModel.js.

export type FocusArea =
  | { readonly on: false }
  | { readonly on: true; readonly x0: number; readonly x1: number; readonly monitor: string };

export interface BodyGeometry {
  readonly x: number;
  readonly width: number;
  readonly narrowed: boolean;
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
): BodyGeometry {
  if (!focus || !focus.on || focus.monitor !== screen.name)
    return { x: 0, width: screen.width, narrowed: false };
  const x0 = Math.min(screen.width, Math.max(0, focus.x0 - screen.x));
  const x1 = Math.min(screen.width, Math.max(0, focus.x1 - screen.x));
  return { x: x0, width: x1 - x0, narrowed: true };
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
