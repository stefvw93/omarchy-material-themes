import { describe, expect, it } from "@effect/vitest";
import { Effect, Option, Stream } from "effect";
import { eventArgs, parseEvent } from "./events.ts";
import { Hyprland } from "./service.ts";
import { HyprlandTest } from "./testing.ts";

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

const noFixture = { responses: {}, events: [] as string[] };

describe("Hyprland", () => {
  it.effect("decodes hyprctl JSON and finds the focused monitor", () =>
    Effect.gen(function* () {
      const focused = yield* (yield* Hyprland).focusedMonitor;
      expect(Option.getOrThrow(focused).reserved).toEqual([380, 26, 380, 0]);
    }).pipe(
      Effect.provide(HyprlandTest({ responses: { "j/monitors": [monitor] }, events: [] }).layer),
    ),
  );

  it.effect("fails with a HyprlandError on JSON that doesn't match", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip((yield* Hyprland).monitors);
      expect(error._tag).toBe("@stef/hyprland/HyprlandError");
    }).pipe(
      Effect.provide(
        HyprlandTest({ responses: { "j/monitors": [{ ...monitor, width: "wide" }] }, events: [] })
          .layer,
      ),
    ),
  );

  it.effect("reads Lua values back through error()", () => {
    const { layer, requests } = HyprlandTest(noFixture);
    return Effect.gen(function* () {
      // The fixture answers eval with "ok"; the live socket answers
      // 'error: [string "…"]:1: function', which evalValue trims to "function".
      yield* (yield* Hyprland).evalValue("type(periphery_select)");
      expect(requests).toEqual(["eval error(type(periphery_select))"]);
    }).pipe(Effect.provide(layer));
  });

  it.effect("parses the event stream and drops malformed lines", () =>
    Effect.gen(function* () {
      const events = yield* Stream.runCollect((yield* Hyprland).events);
      expect(events.map((e) => e.name)).toEqual(["openwindow", "workspace"]);
    }).pipe(
      Effect.provide(
        HyprlandTest({
          responses: {},
          events: ["openwindow>>abc,2,foot,a, b, c", "garbage", "workspace>>3"],
        }).layer,
      ),
    ),
  );
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
