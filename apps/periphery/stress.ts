// A long live run (`stef stress periphery`): three empty workspaces filled
// with terminals that keep printing, tiled and floating at random places,
// then switched in every order, fast (before flights settle) and with pauses
// to settle. Meanwhile it samples the plugin's own view of its ghosts
// (`inspect`) and checks them (src/inspect/specs.md); a frame is saved at
// every problem. Afterwards it checks what flights give back, closes its
// terminals and leaves the workspace and the mode as it found them.
// It takes over the desktop for about two minutes: hands off meanwhile.
import { execFile } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Hyprland } from "@stef/hyprland";
import { makeChecks, OmarchyShell, type SmokeTest } from "@stef/omarchy";
import { Effect, Fiber, Option } from "effect";
import { findProblems, type Problem, type Sample, stackingProblems } from "./src/inspect/index.ts";
import { hiddenCount, leftovers } from "./live.ts";

/** The class of every terminal this run opens: its own, nothing else is closed. */
const CLASS = "periphery-stress";
/** Each order switched through this many times in a row while spamming. */
const SPAM_LAPS = 3;
/** One round per range: switches this many ms apart, key repeat first. */
const SPAM_MS = [
  [15, 80],
  [40, 160],
  [80, 250],
] as const;
const SETTLE_MS = 2500;

const between = ([lo, hi]: readonly [number, number]) => lo + Math.floor(Math.random() * (hi - lo));
const orders = (a: number, b: number, c: number) => [
  [a, b, c],
  [c, b, a],
  [a, c, b],
  [c, a, b],
  [b, a, c],
  [b, c, a],
];

const stress: SmokeTest<Hyprland | OmarchyShell> = ({ id }) =>
  Effect.gen(function* () {
    const hypr = yield* Hyprland;
    const shell = yield* OmarchyShell;
    const { check, failures } = makeChecks();
    const frames = mkdtempSync(join(tmpdir(), "periphery-stress-"));

    const modeOn = Effect.map(hypr.evalValue("tostring(periphery ~= nil)"), (v) => v === "true");
    const wasOn = yield* modeOn;
    if (!wasOn) yield* Effect.andThen(shell.toggle(id), Effect.sleep("2500 millis"));
    const monitor = Option.getOrUndefined(yield* hypr.focusedMonitor);
    if (!monitor) return yield* Effect.fail("no focused monitor");
    const home = monitor.activeWorkspace.id;

    // Three empty workspaces, the lowest ids nothing is on.
    const used = new Set((yield* hypr.clients).map((c) => c.workspace.id));
    const spaces: number[] = [];
    for (let ws = 1; spaces.length < 3; ws++) if (!used.has(ws) && ws !== home) spaces.push(ws);

    // Per workspace one tiled terminal and two floating ones at random
    // places, some reaching into a band; every one prints a line every 200 ms.
    const loop = `i=0; while :; do i=$((i+1)); echo "$i $(date +%T.%N)"; sleep 0.2; done`;
    const open = (ws: number, float: boolean) => {
      const rules = float
        ? `float = true, move = "${between([100, monitor.width - 900])} ${between([80, monitor.height - 700])}", size = "${between([500, 950])} ${between([350, 650])}"`
        : "";
      // A Lua long string: the loop's own quotes can't end it.
      return hypr.eval(
        `hl.exec_cmd([[foot --app-id ${CLASS} -e sh -c '${loop}']], { workspace = "${ws} silent", ${rules} })`,
      );
    };
    for (const ws of spaces) for (const float of [false, true, true]) yield* open(ws, float);
    const ours = Effect.map(hypr.clients, (cs) => cs.filter((c) => c.class === CLASS));
    for (let i = 0; i < 50 && (yield* ours).length < 9; i++) yield* Effect.sleep("100 millis");
    yield* check(
      "stress: nine terminals open",
      (yield* ours).length === 9,
      `${(yield* ours).length}`,
    );
    const floating = (yield* hypr.clients).filter((c) => c.floating).map((c) => c.address);
    const before = yield* leftovers(floating);

    // Samples the plugin's ghosts until stopped; a frame at every new problem.
    const samples: Sample[] = [];
    const seen = new Set<string>();
    const found: Problem[] = [];
    const sampler = yield* Effect.forkChild(
      Effect.forever(
        Effect.gen(function* () {
          const text = yield* Effect.orElseSucceed(shell.query(id, "inspect"), () => "");
          let sample: Omit<Sample, "at">;
          try {
            sample = JSON.parse(text) as Omit<Sample, "at">;
          } catch {
            return;
          }
          samples.push({ at: Date.now(), ...sample });
          for (const p of findProblems(samples.slice(-40))) {
            const key = `${p.rule} ${p.address} ${p.at}`;
            if (seen.has(key)) continue;
            seen.add(key);
            found.push(p);
            execFile("grim", [
              "-s",
              "0.4",
              join(frames, `${p.at}-${p.rule.replace(" ", "-")}-${p.address}.png`),
            ]);
          }
        }),
      ),
    );

    const go = (ws: number) => hypr.eval(`hl.dispatch(hl.dsp.focus({ workspace = "${ws}" }))`);
    let switches = 0;
    let stackChecks = 0;
    for (const spam of SPAM_MS) {
      for (const order of orders(spaces[0]!, spaces[1]!, spaces[2]!)) {
        for (let lap = 0; lap < SPAM_LAPS; lap++)
          for (const ws of order) {
            yield* go(ws);
            switches++;
            yield* Effect.sleep(`${between(spam)} millis`);
          }
        yield* Effect.sleep(`${SETTLE_MS} millis`);
        // The last flight's ghosts against Hyprland's stacking, now settled.
        const shown = order[order.length - 1];
        const stacked = (yield* hypr.clients)
          .filter((c) => c.floating && c.workspace.id === shown)
          .map((c) => c.address);
        const last = samples.findLast((x) => x.phase === "flying" && x.ghosts.length > 0);
        if (last) found.push(...stackingProblems(last, stacked));
        stackChecks++;
      }
    }
    yield* Fiber.interrupt(sampler);

    // Switches the hook made itself (the plugin answered too late): not flown.
    const unflownAt = samples
      // From the second sample: the first can show the mode's own start.
      .filter((x, i) => i > 0 && x.flown === false && samples[i - 1]?.flown !== false)
      .map((x) => x.at - samples[0]!.at);
    const unflown = unflownAt.length
      ? `${unflownAt.length} (${unflownAt.map((t) => `${t} ms in`).join(", ")})`
      : "0";
    // Each problem's phase, and how long since the last flight began.
    const phaseAt = (at: number) => {
      const i = samples.findIndex((x) => x.at === at);
      const start = samples.findLast((x, j) => j <= i && x.phase === "pending");
      return `${samples[i]?.phase ?? "?"}, ${start ? at - start.at : "?"} ms after a flight began`;
    };
    // A sampler that sees nothing passes every rule: it must have seen flights.
    const flying = samples.filter((x) => x.phase === "flying" && x.ghosts.length > 0).length;
    const withCards = samples.filter((x) => (x.cards ?? []).length > 0).length;
    yield* check(
      "stress: inspect saw flying ghosts and cards",
      flying > 0 && withCards > 0,
      `${flying} samples with flying ghosts, ${withCards} with cards`,
    );
    yield* check(
      "stress: no ghost problems",
      found.length === 0,
      `${samples.length} samples, ${switches} switches, ${stackChecks} stacking checks, ${unflown} switches not flown${found.length ? `: ${found.map((p) => `${p.rule} ${p.address} @${p.at} (${phaseAt(p.at)})`).join(", ")}; frames in ${frames}` : ""}`,
    );
    const settled = yield* leftovers(floating);
    const hidden = yield* hypr.evalValue(hiddenCount);
    yield* check("stress: no window left hidden", hidden === "0", `${hidden} hidden`);
    yield* check(
      "stress: floating windows have their shadow setting back",
      // Only the windows still open: the user may close one meanwhile.
      settled.shadows.every((v, i) => v === before.shadows[i] || v === "window not found"),
      `${before.shadows.join()} -> ${settled.shadows.join()}`,
    );
    yield* check(
      "stress: Hyprland's workspace animation is back",
      settled.animation === before.animation,
      settled.animation,
    );

    yield* go(home);
    for (const c of yield* ours)
      yield* hypr.eval(`hl.dispatch(hl.dsp.window.close({ window = "address:${c.address}" }))`);
    if (!wasOn) yield* shell.toggle(id);
    if (failures() > 0) return yield* Effect.fail(`${failures()} stress check(s) failed`);
  });

export default stress;
