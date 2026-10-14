// Live checks against the running session (`stef smoke bar`): the deployed
// variant is the bar the shell runs (not the stock fallback), and it holds
// its exclusive zone on the focused monitor.
import { Hyprland } from "@stef/hyprland";
import { makeChecks, OmarchyShell, type SmokeTest } from "@stef/omarchy";
import { Effect, Option } from "effect";

const smoke: SmokeTest<Hyprland | OmarchyShell> = ({ id }) =>
  Effect.gen(function* () {
    const hypr = yield* Hyprland;
    const shell = yield* OmarchyShell;
    const { check, failures } = makeChecks();

    const plugins = yield* shell.listPlugins;
    const bar = plugins.find((p) => p.id === id);
    yield* check("selected as the bar", bar?.enabled === true, bar ? "" : `${id} not installed`);
    const running = plugins.find((p) => p.kinds.includes("bar") && p.active === true);
    yield* check("running, not the stock fallback", running?.id === id, running?.id ?? "none");

    const reserved = Option.match(yield* hypr.focusedMonitor, {
      onNone: () => [0, 0, 0, 0] as const,
      onSome: (mon) => mon.reserved,
    });
    yield* check(
      "holds its exclusive zone",
      reserved[1] > 0 || reserved[3] > 0,
      reserved.join(","),
    );

    if (failures() > 0) return yield* Effect.fail(`${failures()} smoke check(s) failed`);
  });

export default smoke;
