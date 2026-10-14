// Live checks against the running session (`stef smoke periphery`), ported
// from scripts/smoke.sh. Toggles the mode off and on, asserts what Hyprland
// sees each time, and leaves the mode as it found it.
import { Hyprland } from "@stef/hyprland";
import { makeChecks, OmarchyShell, type SmokeTest } from "@stef/omarchy";
import { Effect, Option } from "effect";

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
