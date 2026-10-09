/**
 * Logic shared by the QML plugins, bundled into each as `lib/kit.mjs`
 * (`import "lib/kit.mjs" as Kit`). Plain es2017: it runs in Quickshell's
 * engine.
 */
export { motionSchemes, springStep, type Spring } from "@stef/motion";
export {
  defaultTokens,
  resolveTokens,
  springsOf,
  tokensFile,
  type Tokens,
} from "@stef/tokens/runtime";

/** Hyprland addresses come with and without the 0x prefix; compare them with it. */
export const normalizeAddress = (address: string | number | null | undefined): string => {
  if (!address) return "";
  const a = String(address);
  return a.indexOf("0x") === 0 ? a : "0x" + a;
};

export interface Placed {
  readonly floating: boolean;
  /** Position relative to the monitor. */
  readonly rx: number;
  readonly ry: number;
}

/**
 * Reading order within a workspace: tiled before floating (floating windows
 * are drawn on top), then columns left to right (x within 4 px counts as the
 * same column), then top to bottom.
 */
export const compareReadingOrder = (a: Placed, b: Placed): number => {
  if (a.floating !== b.floating) return a.floating ? 1 : -1;
  if (Math.abs(a.rx - b.rx) > 4) return a.rx - b.rx;
  return a.ry - b.ry;
};

export const readingOrder = <W extends Placed>(windows: readonly W[]): W[] =>
  windows.slice().sort(compareReadingOrder);

export interface HyprMonitor {
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly scale: number;
}

/**
 * A Hyprland monitor in logical pixels, and the Quickshell screen that shows
 * it (null if none matches by name).
 */
export const monitorGeometry = <S extends { readonly name: string }>(
  mon: HyprMonitor,
  screens: ArrayLike<S>,
): { x: number; y: number; w: number; h: number; screen: S | null } => {
  const scale = mon.scale > 0 ? mon.scale : 1;
  let screen: S | null = null;
  for (let i = 0; i < screens.length; i++) {
    const s = screens[i];
    if (s !== undefined && s.name === mon.name) screen = s;
  }
  return { x: mon.x, y: mon.y, w: mon.width / scale, h: mon.height / scale, screen };
};
