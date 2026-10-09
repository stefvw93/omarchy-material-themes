import { Effect, Exit, Option, Stream } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { eventArgs, parseEvent } from "./events.ts";
import { Hyprland } from "./service.ts";
import { fixtureTransport } from "./testing.ts";

const monitor = {
  id: 0,
  name: "DP-3",
  x: 0,
  y: 0,
  width: 2560,
  height: 1440,
  scale: 1,
  focused: true,
  reserved: [380, 26, 380, 0],
  activeWorkspace: { id: 2, name: "2" },
  specialWorkspace: { id: 0, name: "" },
  extraKey: "ignored",
};

const run = <A, E>(
  program: Effect.Effect<A, E, Hyprland>,
  fixture = { responses: {}, events: [] as string[] },
) => {
  const { layer, requests } = fixtureTransport(fixture);
  return { result: Effect.runSync(Effect.exit(Effect.provide(program, layer))), requests };
};

describe("Hyprland", () => {
  it("decodes hyprctl JSON and finds the focused monitor", () => {
    const { result } = run(
      Effect.flatMap(Hyprland, (h) => h.focusedMonitor),
      {
        responses: { "j/monitors": [monitor] },
        events: [],
      },
    );
    expect(Exit.isSuccess(result) && Option.getOrThrow(result.value).reserved).toEqual([
      380, 26, 380, 0,
    ]);
  });

  it("fails with a HyprlandError on JSON that doesn't match", () => {
    const { result } = run(
      Effect.flatMap(Hyprland, (h) => h.monitors),
      {
        responses: { "j/monitors": [{ ...monitor, width: "wide" }] },
        events: [],
      },
    );
    expect(Exit.isFailure(result)).toBe(true);
  });

  it("reads Lua values back through error()", () => {
    const { result, requests } = run(
      Effect.flatMap(Hyprland, (h) => h.evalValue("type(periphery_select)")),
    );
    expect(requests).toEqual(["eval error(type(periphery_select))"]);
    // The fixture answers eval with "ok"; the live socket answers
    // 'error: [string "…"]:1: function', which evalValue trims to "function".
    expect(Exit.isSuccess(result)).toBe(true);
  });

  it("parses the event stream and drops malformed lines", () => {
    const { result } = run(
      Effect.flatMap(Hyprland, (h) => Stream.runCollect(h.events)),
      { responses: {}, events: ["openwindow>>abc,2,foot,a, b, c", "garbage", "workspace>>3"] },
    );
    expect(Exit.isSuccess(result) && result.value.map((e) => e.name)).toEqual([
      "openwindow",
      "workspace",
    ]);
  });
});

describe("events", () => {
  it("keeps commas in the last argument", () => {
    const event = parseEvent("openwindow>>80a6f50,2,foot,title, with, commas")!;
    expect(eventArgs(event, 4)).toEqual(["80a6f50", "2", "foot", "title, with, commas"]);
  });

  it("rejects lines without a name", () => {
    expect(parseEvent(">>data")).toBeUndefined();
    expect(parseEvent("nodelimiter")).toBeUndefined();
  });
});
