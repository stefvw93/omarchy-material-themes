import { describe, expect, it } from "@effect/vitest";
import { Effect, Fiber, Queue, Stream } from "effect";
import { TestClock } from "effect/testing";
import {
  type ExpoGroup,
  type ExpoHost,
  type ExpoIntent,
  expoCore,
  type HostToplevel,
  signatureOf,
  snapshot,
} from "./core.ts";

// ── Reference: Expo.qml's rebuild() before the core, verbatim but for syntax ──
const qmlNormalize = (address: string | undefined) => {
  if (!address) return "";
  const a = String(address);
  return a.indexOf("0x") === 0 ? a : "0x" + a;
};
const qmlLabel = (ws: { id: number; name: string | undefined }) => {
  if (ws.id < 0) {
    const name = (ws.name || "").replace(/^special:/, "");
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Special";
  }
  return String(ws.name || ws.id);
};
const qmlRebuild = (toplevels: ReadonlyArray<HostToplevel>, monX: number, monY: number) => {
  const byWs: Record<string, any> = {};
  for (const t of toplevels) {
    const ipc = t.ipc as any;
    if (!ipc || !ipc.workspace || !ipc.at || !ipc.size) continue;
    if (ipc.mapped === false) continue;
    const wsId = ipc.workspace.id;
    if (!byWs[wsId]) byWs[wsId] = { id: wsId, name: ipc.workspace.name, windows: [] };
    byWs[wsId].windows.push({
      toplevel: t.ref,
      address: qmlNormalize(ipc.address || t.address),
      title: ipc.title || t.title || "",
      appClass: ipc["class"] || "",
      floating: !!ipc.floating,
      rx: ipc.at[0] - monX,
      ry: ipc.at[1] - monY,
      rw: ipc.size[0],
      rh: ipc.size[1],
    });
  }
  const list: any[] = [];
  for (const key in byWs) list.push(byWs[key]);
  list.sort((a, b) => {
    if (a.id < 0 !== b.id < 0) return a.id < 0 ? 1 : -1;
    return Math.abs(a.id) - Math.abs(b.id);
  });
  for (const g of list) {
    g.label = qmlLabel(g);
    g.windows.sort((a: any, b: any) => {
      if (a.floating !== b.floating) return a.floating ? 1 : -1;
      if (Math.abs(a.rx - b.rx) > 4) return a.rx - b.rx;
      return a.ry - b.ry;
    });
  }
  return list;
};

/** Deterministic pseudo-random toplevels, including the odd broken one. */
const randomToplevels = (seed: number): HostToplevel[] => {
  let s = seed;
  const rand = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
  const pick = <T>(xs: readonly T[]) => xs[Math.floor(rand() * xs.length)]!;
  return Array.from({ length: 1 + Math.floor(rand() * 12) }, (_, i) => {
    const ws = pick([1, 2, 3, 4, 9, -98, -99]);
    const ipc: Record<string, unknown> = {
      address: rand() < 0.5 ? `abc${i}` : `0xabc${i}`,
      mapped: pick([true, true, true, false, undefined]),
      workspace: { id: ws, name: ws < 0 ? pick(["special:scratch", "special:", ""]) : String(ws) },
      at: [Math.floor(rand() * 3000), Math.floor(rand() * 1500)],
      size: [100 + Math.floor(rand() * 1200), 100 + Math.floor(rand() * 900)],
      title: pick(["", "Terminal", undefined]),
      class: pick(["foot", "", undefined]),
      floating: pick([true, false, 0, 1, undefined]),
    };
    if (rand() < 0.08) delete ipc["at"];
    if (rand() < 0.04) delete ipc["workspace"];
    return { ipc, address: `abc${i}`, title: pick(["", "fallback title"]), ref: { i } };
  });
};

describe("snapshot", () => {
  it("matches the QML rebuild it replaces", () => {
    for (let seed = 1; seed <= 300; seed++) {
      const toplevels = randomToplevels(seed);
      expect(snapshot(toplevels, 2560, 0)).toEqual(qmlRebuild(toplevels, 2560, 0));
    }
  });

  it("reads QML's list wrappers (array-likes) as arrays", () => {
    const arrayLike = (a: number, b: number) => ({ 0: a, 1: b, length: 2 });
    const groups = snapshot(
      [
        {
          ipc: {
            address: "0x1",
            workspace: { id: 1, name: "1" },
            at: arrayLike(10, 40),
            size: arrayLike(800, 600),
          },
          address: "0x1",
          title: "",
          ref: null,
        },
      ],
      0,
      0,
    );
    expect(groups).toHaveLength(1);
    expect(groups[0]?.windows[0]).toMatchObject({ rx: 10, ry: 40, rw: 800, rh: 600 });
  });

  it("puts special workspaces last and labels them", () => {
    const groups = snapshot(
      [
        {
          ipc: { workspace: { id: -98, name: "special:scratch" }, at: [0, 0], size: [9, 9] },
          address: "a",
          title: "",
          ref: null,
        },
        {
          ipc: { workspace: { id: 2, name: "2" }, at: [0, 0], size: [9, 9] },
          address: "b",
          title: "",
          ref: null,
        },
      ],
      0,
      0,
    );
    expect(groups.map((g) => g.label)).toEqual(["2", "Scratch"]);
  });
});

// ── The core's timing ──
const window = (id: number, x = 0): HostToplevel => ({
  ipc: { address: `0x${id}`, workspace: { id: 1, name: "1" }, at: [x, 0], size: [100, 100] },
  address: `0x${id}`,
  title: "",
  ref: null,
});

const harness = (initial: HostToplevel[]) => {
  let toplevels = initial;
  const relayouts: ExpoGroup[][] = [];
  let refreshes = 0;
  const host: ExpoHost = {
    startTimer: () => undefined,
    stopTimer: () => {},
    log: () => {},
    toplevels: () => toplevels,
    refresh: () => void refreshes++,
    relayout: (groups) => void relayouts.push(groups),
  };
  return {
    host,
    relayouts,
    refreshes: () => refreshes,
    set: (next: HostToplevel[]) => void (toplevels = next),
  };
};

const runCore = (host: ExpoHost) =>
  Effect.gen(function* () {
    const intents = yield* Queue.unbounded<ExpoIntent>();
    const fiber = yield* Effect.forkChild(expoCore(host)(Stream.fromQueue(intents)));
    const send = (intent: ExpoIntent) =>
      Effect.andThen(Queue.offer(intents, intent), Effect.yieldNow);
    return { send, fiber };
  });

describe("expoCore", () => {
  it.effect("lays out at once on open, and again only if the delayed snapshot differs", () =>
    Effect.gen(function* () {
      const h = harness([window(1)]);
      const { send, fiber } = yield* runCore(h.host);
      yield* send({ _tag: "Open", monX: 0, monY: 0 });
      expect(h.relayouts).toHaveLength(1);
      expect(h.refreshes()).toBe(1);

      yield* TestClock.adjust("80 millis");
      expect(h.relayouts).toHaveLength(1); // same snapshot: skipped

      h.set([window(1), window(2, 500)]);
      yield* send({ _tag: "RawEvent", name: "openwindow" });
      yield* TestClock.adjust("79 millis");
      expect(h.relayouts).toHaveLength(1);
      yield* TestClock.adjust("1 millis");
      expect(h.relayouts).toHaveLength(2);
      expect(signatureOf(h.relayouts[1]!)).toContain("0x2");
      yield* Fiber.interrupt(fiber);
    }),
  );

  it.effect("folds a burst of events into one refresh and one snapshot", () =>
    Effect.gen(function* () {
      const h = harness([window(1)]);
      const { send, fiber } = yield* runCore(h.host);
      yield* send({ _tag: "Open", monX: 0, monY: 0 });
      yield* TestClock.adjust("100 millis");
      const before = { relayouts: h.relayouts.length, refreshes: h.refreshes() };

      h.set([window(1), window(3, 900)]);
      for (const name of ["openwindow", "movewindowv2", "openwindow", "closewindow"]) {
        yield* send({ _tag: "RawEvent", name });
        yield* TestClock.adjust("10 millis");
      }
      yield* TestClock.adjust("80 millis");
      expect(h.refreshes() - before.refreshes).toBe(1);
      expect(h.relayouts.length - before.relayouts).toBe(1);
      yield* Fiber.interrupt(fiber);
    }),
  );

  it.effect("ignores title and layout events, and stays quiet while closed", () =>
    Effect.gen(function* () {
      const h = harness([window(1)]);
      const { send, fiber } = yield* runCore(h.host);
      yield* send({ _tag: "RawEvent", name: "openwindow" });
      yield* TestClock.adjust("100 millis");
      expect(h.relayouts).toHaveLength(0); // not open yet

      yield* send({ _tag: "Open", monX: 0, monY: 0 });
      yield* TestClock.adjust("100 millis");
      const refreshes = h.refreshes();
      yield* send({ _tag: "RawEvent", name: "windowtitlev2" });
      yield* send({ _tag: "RawEvent", name: "activelayout" });
      expect(h.refreshes()).toBe(refreshes);

      yield* send({ _tag: "Close" });
      yield* send({ _tag: "Open", monX: 0, monY: 0 });
      // Close forgets the last snapshot: reopening lays out again.
      expect(h.relayouts).toHaveLength(2);
      yield* Fiber.interrupt(fiber);
    }),
  );
});
