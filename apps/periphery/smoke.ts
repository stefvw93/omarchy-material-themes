// Live checks against the running session (`stef smoke periphery`), ported
// from scripts/smoke.sh. Toggles the mode off and on, asserts what Hyprland
// sees each time, and leaves the mode as it found it.
import { Hyprland } from "@stef/hyprland";
import { makeChecks, OmarchyShell, type SmokeTest } from "@stef/omarchy";
import { Effect, Option } from "effect";
import { hiddenCount, leftovers } from "./live.ts";

const smoke: SmokeTest<Hyprland | OmarchyShell> = ({ id }) =>
  Effect.gen(function* () {
    const hypr = yield* Hyprland;
    const shell = yield* OmarchyShell;
    const { check, failures } = makeChecks();

    const modeOn = Effect.map(hypr.evalValue("tostring(periphery ~= nil)"), (v) => v === "true");
    const reserved = Effect.map(hypr.focusedMonitor, (m) =>
      Option.match(m, { onNone: () => [0, 0, 0, 0] as const, onSome: (mon) => mon.reserved }),
    );
    const toggle = Effect.andThen(shell.toggle(id), Effect.sleep("1500 millis"));

    const hookLoaded = (yield* hypr.evalValue("type(periphery_select)")) === "function";
    yield* check(
      "hook loaded (hypr.lua)",
      hookLoaded,
      hookLoaded ? "" : "add it to hyprland.lua (stef hooks install) and run hyprctl reload",
    );

    const wasOn = yield* modeOn;
    if (!wasOn) yield* toggle;

    yield* check("mode on: hook state is a table", yield* modeOn);
    // The focus area is a workspace rule on the regular workspaces, not reserved space.
    const rule = yield* hypr.evalValue("tostring(periphery_focus_rule)");
    yield* check(
      "mode on: regular workspaces get the bands as side gaps",
      /^s\[false\] m\[[^\]]+\] \d+ \d+ \d+ \d+$/.test(rule),
      rule,
    );
    const on = yield* reserved;
    yield* check("mode on: no bands reserved", on[0] === 0 && on[2] === 0, on.join(","));

    // A flight away and, 100 ms in, back (a routed switch each, as the
    // workspace keys make them): everything it hid or changed comes back.
    // Switching workspaces meanwhile starts flights of your own, which these
    // checks can't tell from theirs: keep your hands off for a few seconds.
    const monitor = Option.getOrUndefined(yield* hypr.focusedMonitor);
    const clients = (yield* hypr.clients).filter((c) => c.monitor === monitor?.id);
    const home = monitor?.activeWorkspace.id ?? -1;
    const away = clients.find((c) => c.workspace.id > 0 && c.workspace.id !== home)?.workspace.id;
    if (away === undefined) yield* check("flight: skipped, no other occupied workspace", true);
    else {
      const floating = clients.filter((c) => c.floating).map((c) => c.address);
      const before = yield* leftovers(floating);
      const go = (ws: number) => hypr.eval(`hl.dispatch(hl.dsp.focus({ workspace = "${ws}" }))`);
      yield* go(away);
      yield* Effect.sleep("100 millis");
      yield* go(home);
      yield* Effect.sleep("2 seconds");
      const after = yield* leftovers(floating);
      const back = Option.getOrUndefined(yield* hypr.focusedMonitor)?.activeWorkspace.id;
      yield* check("flight: back on the workspace it left", back === home, `${back}`);
      const hidden = yield* hypr.evalValue(hiddenCount);
      yield* check("flight: no window left hidden", hidden === "0", `${hidden} hidden`);
      yield* check(
        "flight: floating windows have their shadow setting back",
        after.shadows.join() === before.shadows.join(),
        `${before.shadows.join()} -> ${after.shadows.join()}`,
      );
      yield* check(
        "flight: Hyprland's workspace animation is back",
        after.animation === before.animation,
        after.animation,
      );
    }

    yield* toggle;
    yield* check("mode off: hook state is nil", !(yield* modeOn));
    const offRule = yield* hypr.evalValue("tostring(periphery_focus_rule)");
    yield* check("mode off: no workspace rule", offRule === "nil", offRule);
    const left = (yield* hypr.binds).filter((b) => b.description.startsWith("Periphery:")).length;
    yield* check("mode off: no Periphery binds left", left === 0, `${left} left`);

    if (wasOn) yield* toggle;
    if (failures() > 0) return yield* Effect.fail(`${failures()} smoke check(s) failed`);
  });

export default smoke;
