// Hyprland strings: the workspace animation, the hook's state, the
// decoration options. See specs.md.
import { parseCssGaps } from "@stef/qml-kit";

/** Turns Hyprland's workspace animation off (a flight's switch). */
export const workspacesOffLua = 'hl.animation({ leaf = "workspaces", enabled = false })';

interface Animation {
  name: string;
  enabled: boolean;
  speed: number;
  bezier?: string;
  style?: string;
}

/** The `workspaces` animation from `hyprctl animations -j` as an `hl.animation` call. */
export function workspaceAnimationLua(animationsJson: string, style?: string): string {
  const lists = JSON.parse(animationsJson) as unknown[];
  const all = (Array.isArray(lists[0]) ? lists[0] : lists) as Animation[];
  const a = all.find((x) => x.name === "workspaces");
  if (!a) return "";
  if (!a.enabled && !style) return workspacesOffLua;
  const parts = ['leaf = "workspaces"', "enabled = true", `speed = ${a.speed}`];
  const curve = String(a.bezier ?? "");
  if (curve.startsWith("spring:")) parts.push(`spring = "${curve.slice(7)}"`);
  else if (curve) parts.push(`bezier = "${curve}"`);
  const finalStyle = style || a.style;
  if (finalStyle) parts.push(`style = "${finalStyle}"`);
  return `hl.animation({ ${parts.join(", ")} })`;
}

export interface CardTravel {
  distance: number;
  vertical: boolean;
}

/** How far cards travel with a workspace switch in this animation style. */
export function cardTravel(style: string, monW: number, monH: number): CardTravel {
  const vertical = /vert/.test(style);
  if (!/slide/.test(style)) return { distance: 0, vertical };
  const extent = vertical ? monH : monW;
  const percent = /(\d+(?:\.\d+)?)%/.exec(style);
  return { distance: percent ? (extent * parseFloat(percent[1]!)) / 100 : extent, vertical };
}

export interface HookState {
  opened: boolean;
  cardsLeft: boolean;
  cardsRight: boolean;
  monX: number;
  monY: number;
  monW: number;
  monH: number;
  sideW: number;
  selected: string;
  /** The monitor's name, for the focus area's workspace rule. */
  monitor?: string;
  /** Hyprland's outer gaps, [top, right, bottom, left]. */
  gapsOut?: readonly number[];
}

/** The `hyprctl eval` string that hands the plugin's state to hypr.lua. */
export function hookStateLua(state: HookState): string {
  if (!state.opened) return "if periphery_close then periphery_close() end";
  const bounds = [
    state.monX + state.sideW,
    state.monX + state.monW - state.sideW,
    state.monY,
    state.monY + state.monH,
  ].map(Math.round);
  // Nothing but an address ever reaches Lua code.
  const selected = /^0x[0-9a-fA-F]+$/.test(state.selected) ? `"${state.selected}"` : "nil";
  return (
    `if periphery_open then periphery_open(${[state.cardsLeft, state.cardsRight, ...bounds, focusRuleLua(state), monitorLua(state)].join(", ")}); ` +
    `periphery_select(${selected}) end`
  );
}

/**
 * The focus area as a workspace rule: the monitor's regular workspaces get
 * the bands as extra side gaps, so special ones keep the full width.
 */
// Nothing but a monitor name ever reaches Lua code.
const safeMonitor = (state: HookState) =>
  state.monitor && /^[A-Za-z0-9_.-]+$/.test(state.monitor) ? state.monitor : undefined;

/** The monitor's name for the focus area announcements, or nil. */
function monitorLua(state: HookState): string {
  const name = safeMonitor(state);
  return name ? `"${name}"` : "nil";
}

function focusRuleLua(state: HookState): string {
  const side = Math.round(state.sideW);
  if (!(side > 0)) return "nil";
  const [t = 0, r = 0, b = 0, l = 0] = state.gapsOut ?? [];
  const gaps = [t, r + side, b, l + side].map(Math.round);
  const name = safeMonitor(state);
  const monitor = name ? ` m[${name}]` : "";
  return (
    `{ workspace = "s[false]${monitor}", ` +
    `gaps_out = { top = ${gaps[0]}, right = ${gaps[1]}, bottom = ${gaps[2]}, left = ${gaps[3]} } }`
  );
}

export interface Decoration {
  borderSize?: number;
  rounding?: number;
  /** general:gaps_out as [top, right, bottom, left]. */
  gapsOut?: [number, number, number, number];
}

/** Border width and rounding from two `hyprctl -j getoption` outputs. */
export function parseDecoration(text: string): Decoration {
  const read = (option: string) => {
    const m = new RegExp(`"${option}",\\s*"int":\\s*(\\d+)`).exec(text);
    return m ? parseInt(m[1]!, 10) : undefined;
  };
  const result: Decoration = {};
  const borderSize = read("general:border_size");
  const rounding = read("decoration:rounding");
  const gapsOut = parseCssGaps(/"general:gaps_out",\s*"css":\s*"([^"]*)"/.exec(text)?.[1]);
  if (borderSize !== undefined) result.borderSize = borderSize;
  if (rounding !== undefined) result.rounding = rounding;
  if (gapsOut !== undefined) result.gapsOut = gapsOut;
  return result;
}

const ADDRESS = /^0x[0-9a-fA-F]+$/;
const isAddress = (a: string) => ADDRESS.test(a);

export interface Blur {
  enabled?: boolean;
  size?: number;
  passes?: number;
  contrast?: number;
  brightness?: number;
  vibrancy?: number;
}

/** The decoration:blur options from `hyprctl -j getoption` outputs. */
export function parseBlur(text: string): Blur {
  const read = (name: string) =>
    new RegExp(`"decoration:blur:${name}",\\s*"(?:int|float|bool)":\\s*([^,\\s}]+)`).exec(
      text,
    )?.[1];
  const result: Blur = {};
  const enabled = read("enabled");
  if (enabled !== undefined) result.enabled = enabled === "true" || enabled === "1";
  for (const name of ["size", "passes", "contrast", "brightness", "vibrancy"] as const) {
    const value = read(name);
    if (value !== undefined && Number.isFinite(parseFloat(value))) result[name] = parseFloat(value);
  }
  return result;
}

export interface GhostBlur {
  radius: number;
  blurMax: number;
  blur: number;
  blurMultiplier: number;
  contrast: number;
  brightness: number;
  saturation: number;
}

/** MultiEffect blurs up to blurMax; blurMultiplier stretches past it. */
const BLUR_MAX = 64;

/** The ghost's MultiEffect settings for Hyprland's blur (interpretation periphery.ghost-blur). */
export function ghostBlur(blur: Blur): GhostBlur {
  const radius =
    blur.enabled !== false && blur.size !== undefined && blur.passes !== undefined
      ? blur.size * 2 ** blur.passes
      : 0;
  return {
    radius,
    blurMax: BLUR_MAX,
    blur: Math.min(1, radius / BLUR_MAX),
    blurMultiplier: Math.max(0, radius / BLUR_MAX - 1),
    contrast: blur.contrast === undefined ? 0 : blur.contrast - 1,
    brightness: blur.brightness === undefined ? 0 : blur.brightness - 1,
    saturation: blur.vibrancy ?? 0,
  };
}

export interface WindowProps {
  opacity: number;
  opacityInactive: number;
  borderSize: number;
  rounding: number;
}

const WINDOW_PROPS = ["opacity", "opacity_inactive", "border_size", "rounding"] as const;

/** The `hyprctl --batch` argument that reads each window's ghost properties. */
export function windowPropsBatch(addresses: readonly string[]): string {
  return addresses
    .filter(isAddress)
    .map((a) => WINDOW_PROPS.map((prop) => `j/getprop address:${a} ${prop}`).join(" ; "))
    .join(" ; ");
}

/** The output of windowPropsBatch's batch, per window; incomplete windows left out. */
export function parseWindowProps(
  addresses: readonly string[],
  text: string,
): Record<string, WindowProps> {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter((b) => b !== "");
  const value = (block: string | undefined, prop: string) => {
    try {
      const v = (JSON.parse(block ?? "") as Record<string, unknown>)[prop];
      return typeof v === "number" ? v : undefined;
    } catch {
      return undefined;
    }
  };
  const result: Record<string, WindowProps> = {};
  addresses.filter(isAddress).forEach((a, i) => {
    const [opacity, opacityInactive, borderSize, rounding] = WINDOW_PROPS.map((prop, j) =>
      value(blocks[i * WINDOW_PROPS.length + j], prop),
    );
    if (
      opacity !== undefined &&
      opacityInactive !== undefined &&
      borderSize !== undefined &&
      rounding !== undefined
    )
      result[a] = { opacity, opacityInactive, borderSize, rounding };
  });
  return result;
}

/** What a flight's batch switches with: a window to focus, or a routed switch's token. */
export type FlightSwitch = { window: string } | { token: number };

const shadowDispatch = (a: string, value: string) =>
  `dispatch hl.dsp.window.set_prop({ window = "address:${a}", prop = "no_shadow", value = "${value}" })`;
const isToken = (n: number) => Number.isSafeInteger(n) && n >= 1;
const runLua = (token: number) => `if periphery_run then periphery_run(${token}) end`;

/** The `hyprctl --batch` argument of a flight's switch. */
export function flightBatch(shadowless: readonly string[], to: FlightSwitch): string {
  const commands = shadowless.filter(isAddress).map((a) => shadowDispatch(a, "1"));
  commands.push("eval " + workspacesOffLua);
  if ("window" in to) {
    if (isAddress(to.window))
      commands.push(`dispatch hl.dsp.focus({ window = "address:${to.window}" })`);
  } else if (isToken(to.token)) commands.push("eval " + runLua(to.token));
  return commands.join(" ; ");
}

/** The `hyprctl --batch` argument that gives the windows their shadow back. */
export function restoreShadowsBatch(addresses: readonly string[]): string {
  return addresses
    .filter(isAddress)
    .map((a) => shadowDispatch(a, "unset"))
    .join(" ; ");
}

/** The `hyprctl eval` string that runs a routed switch; empty for anything but a token. */
export function runSwitchLua(token: string): string {
  if (!/^\d+$/.test(token)) return "";
  const n = parseInt(token, 10);
  return isToken(n) ? runLua(n) : "";
}

/** The shown tabs from the `tabs` IPC call's argument string. */
export function parseTabs(text: string): Set<string> {
  return new Set(
    text
      .split(/\s+/)
      .filter(isAddress)
      .map((a) => a.toLowerCase()),
  );
}
