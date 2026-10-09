// The exposé's Effect core: which windows exist, grouped and ordered, kept
// current from Hyprland's events. It runs inside Quickshell's QML engine
// (lib/core.mjs); the QML lays the groups out and draws them.
import { type QmlHost, runCore } from "@stef/effect-platform-qml";
import { compareReadingOrder, normalizeAddress } from "@stef/qml-kit";
import { Duration, Effect, Fiber, Option, Schema, Stream } from "effect";

/**
 * Structural window/workspace events only; keyboard layout and title events
 * fire on ordinary key presses and must not disturb the selection.
 */
export const refreshEvents: ReadonlySet<string> = new Set([
  "openwindow",
  "closewindow",
  "movewindow",
  "movewindowv2",
  "changefloatingmode",
  "createworkspace",
  "createworkspacev2",
  "destroyworkspace",
  "destroyworkspacev2",
  "moveworkspace",
  "moveworkspacev2",
  "fullscreen",
  "pin",
]);

/** How long after the first event of a burst the snapshot is taken, so lastIpcObject is current. */
export const refreshDelay = Duration.millis(80);

/** A Quickshell HyprlandToplevel as the host hands it over. */
export interface HostToplevel {
  readonly ipc: unknown;
  readonly address: string;
  readonly title: string;
  /** The toplevel object itself, passed through for ScreencopyView. */
  readonly ref: unknown;
}

/**
 * The part of lastIpcObject the exposé needs. A toplevel without workspace or
 * geometry is skipped, as the QML did; `mapped` and `floating` are coerced.
 */
const IpcWindow = Schema.Struct({
  address: Schema.optional(Schema.String),
  mapped: Schema.optionalKey(Schema.Unknown),
  workspace: Schema.Struct({ id: Schema.Number, name: Schema.optional(Schema.String) }),
  at: Schema.Tuple([Schema.Number, Schema.Number]),
  size: Schema.Tuple([Schema.Number, Schema.Number]),
  title: Schema.optional(Schema.String),
  class: Schema.optional(Schema.String),
  floating: Schema.optionalKey(Schema.Unknown),
});
const decodeWindow = Schema.decodeUnknownOption(IpcWindow);

export interface ExpoWindow {
  readonly toplevel: unknown;
  readonly address: string;
  readonly title: string;
  readonly appClass: string;
  readonly floating: boolean;
  /** Position and size relative to the monitor. */
  readonly rx: number;
  readonly ry: number;
  readonly rw: number;
  readonly rh: number;
}

export interface ExpoGroup {
  readonly id: number;
  readonly name: string | undefined;
  readonly label: string;
  readonly windows: ExpoWindow[];
}

export const workspaceLabel = (ws: {
  readonly id: number;
  readonly name: string | undefined;
}): string => {
  if (ws.id < 0) {
    const name = (ws.name || "").replace(/^special:/, "");
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Special";
  }
  return String(ws.name || ws.id);
};

/**
 * The occupied workspaces with their mapped windows: regular workspaces in
 * order, special ones (scratchpad) last; windows in reading order.
 */
export const snapshot = (
  toplevels: ReadonlyArray<HostToplevel>,
  monX: number,
  monY: number,
): ExpoGroup[] => {
  const byWs = new Map<number, { id: number; name: string | undefined; windows: ExpoWindow[] }>();
  for (const t of toplevels) {
    const decoded = decodeWindow(t.ipc);
    if (Option.isNone(decoded)) continue;
    const ipc = decoded.value;
    if (ipc.mapped === false) continue;
    const wsId = ipc.workspace.id;
    let group = byWs.get(wsId);
    if (group === undefined) {
      group = { id: wsId, name: ipc.workspace.name, windows: [] };
      byWs.set(wsId, group);
    }
    group.windows.push({
      toplevel: t.ref,
      address: normalizeAddress(ipc.address || t.address),
      title: ipc.title || t.title || "",
      appClass: ipc.class || "",
      floating: !!ipc.floating,
      rx: ipc.at[0] - monX,
      ry: ipc.at[1] - monY,
      rw: ipc.size[0],
      rh: ipc.size[1],
    });
  }
  return Array.from(byWs.values())
    .sort((a, b) => {
      if (a.id < 0 !== b.id < 0) return a.id < 0 ? 1 : -1;
      return Math.abs(a.id) - Math.abs(b.id);
    })
    .map((g) => ({ ...g, label: workspaceLabel(g), windows: g.windows.sort(compareReadingOrder) }));
};

/** Unchanged snapshots are skipped, so delegates (and their live captures) aren't recreated. */
export const signatureOf = (groups: ReadonlyArray<ExpoGroup>): string =>
  JSON.stringify(
    groups.map((g) => [g.id, g.windows.map((w) => [w.address, w.rx, w.ry, w.rw, w.rh])]),
  );

export type ExpoIntent =
  | { readonly _tag: "Open"; readonly monX: number; readonly monY: number }
  | { readonly _tag: "Close" }
  | { readonly _tag: "RawEvent"; readonly name: string };

export interface ExpoHost extends QmlHost {
  readonly toplevels: () => ReadonlyArray<HostToplevel>;
  /** Hyprland.refreshToplevels() and refreshWorkspaces(). */
  readonly refresh: () => void;
  /** A changed snapshot: the QML lays it out (it owns the panel size). */
  readonly relayout: (groups: ExpoGroup[]) => void;
}

/**
 * Open snapshots at once and again after the refresh delay. A structural
 * event refreshes Hyprland's lists and snapshots after the delay; events
 * while that delay runs ride along with it.
 */
export const expoCore =
  (host: ExpoHost) =>
  (intents: Stream.Stream<ExpoIntent>): Effect.Effect<void> =>
    Effect.gen(function* () {
      let opened = false;
      let monX = 0;
      let monY = 0;
      let signature = "";
      let timer: Fiber.Fiber<void> | undefined;

      const rebuild = Effect.sync(() => {
        if (!opened) return;
        const groups = snapshot(host.toplevels(), monX, monY);
        const next = signatureOf(groups);
        if (next === signature) return;
        signature = next;
        host.relayout(groups);
      });

      const restartTimer = Effect.gen(function* () {
        if (timer !== undefined) yield* Fiber.interrupt(timer);
        timer = yield* Effect.forkChild(
          Effect.sleep(refreshDelay).pipe(
            Effect.andThen(Effect.sync(() => void (timer = undefined))),
            Effect.andThen(rebuild),
          ),
        );
      });

      yield* Stream.runForEach(intents, (intent) => {
        switch (intent._tag) {
          case "Open":
            return Effect.gen(function* () {
              opened = true;
              monX = intent.monX;
              monY = intent.monY;
              yield* rebuild;
              host.refresh();
              yield* restartTimer;
            });
          case "Close":
            return Effect.sync(() => {
              opened = false;
              signature = "";
            });
          case "RawEvent":
            if (!refreshEvents.has(intent.name) || timer !== undefined) return Effect.void;
            return Effect.andThen(
              Effect.sync(() => host.refresh()),
              restartTimer,
            );
        }
      });
    });

/** Entry point for the QML: `core = Core.start(host)`. */
export const start = (host: ExpoHost) => runCore(host, expoCore(host));
