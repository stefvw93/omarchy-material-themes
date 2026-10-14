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
