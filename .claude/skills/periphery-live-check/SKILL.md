---
name: periphery-live-check
description: Check stef.periphery's animations live in the running session — workspace-switch flights, ghosts, hidden floating windows, leftovers after fast switching. Use after any change to flights, ghosts, cards or the hook, when the user reports a visual glitch (sticky ghosts, windows popping up, a jump at the hand-off), or before saying an animation change works. Captures frame grids with grim, runs fast-switching "monkey" rounds, and checks what a flight must give back.
---

# Periphery live check

Unit and engine tests don't see flights. Every flight bug found so far (stale
tiles after the mode turned on, floating windows leaking into a band, a switch
going out after the mode turned off, a window shown early on a switch back) was
found by watching frames. This is how.

The user is often working on the same desktop. Keep runs short, and put things
back: the workspace you started on, the mode as you found it.

## Before anything

- Deploy first (`stef deploy periphery` from the repo root). It restarts the
  shell, which **turns the mode off**: check before toggling, never toggle
  blind. `scripts/lib.sh`'s `mode_on` reads it.
- Note the starting workspace and windows:
  `hyprctl clients -j | jq -c '.[] | select(.workspace.id>0) | {address,ws:.workspace.id,class,floating,tags}'`.
  The floating windows are the interesting ones (their part in a band, their
  shadow, their stacking).

## Scripts

From the repo root; frames go to the session's scratchpad, not the repo.

- `.claude/skills/periphery-live-check/scripts/frames.sh <outdir> [--back-after <ms>]`:
  one flight back home as a 3×3 grid (settled away, in flight, settled home),
  then the leftovers. `--back-after 100` switches away and back mid-flight.
- `.claude/skills/periphery-live-check/scripts/monkey.sh <outdir> [rounds] [switches] [min-ms] [max-ms]`:
  fast switching between two workspaces, a frame per switch, leftovers and a
  settled-vs-1s-later pixel diff after each round.

Read the grids with the Read tool. A clean leftovers line: `tagged=0`, every
floating window at its rule's opacity (0.985 under Omarchy) and
`no_shadow=false` (or what its window rule says), `workspaces-anim=[true,"slidefade 10%"]`
while the mode is on (the theme's own style once it is off). The settled diff
is a few dozen pixels (clock, cursor); more means something still moves, or
a terminal printed: crop the diff (`magick compare … -trim info:`) to see where.

`stef smoke periphery` does the leftover checks without frames. `stef stress
periphery` runs about a minute of switching, from key-repeat speed to settled,
between three empty workspaces it fills with printing terminals, and checks
every drawn ghost and card through the plugin's `inspect` IPC call
(src/inspect/specs.md); it saves a frame at every problem and names the
folder.

When the user sees a glitch that no run reproduces, ask them to run
`omarchy-shell stef.periphery inspect` the moment they see it (or bind it):
the phase and every drawn ghost and card, with rects and targets, at that
instant.

## Simulating keys

`wtype` doesn't reach Hyprland binds here, but the hook wraps the dispatchers,
so `hyprctl dispatch 'hl.dsp.focus({ workspace = "1" })'` is a **routed switch**,
the same as `SUPER + 1`. `omarchy-shell stef.periphery flyTo <address>` is a
card click. Hover, drags and the focus keys still need the user.

## Logging what the plugin decides

When frames show the symptom but not the cause, log for one run, then remove:

1. Copy `apps/periphery/qml/Periphery.qml` to the scratchpad.
2. Add `console.warn('PERIPHERY-DBG ' + JSON.stringify(...))` where the decision
   is made (`send` for the lifecycle events, `fly` for the plan and the from
   rects). `console.log` is filtered.
3. Deploy, reproduce, read:
   `qs log "$(ls -td /run/user/1000/quickshell/by-pid/*/ | head -1)log.qslog" | grep -o 'PERIPHERY-DBG.*'`.
4. Copy the clean file back and check `grep -c DBG` is 0 before committing.

A flight that hits its time limit logs `Periphery: a flight ended at its time
limit; ghosts not landed: …` on its own: grep for it after every run.

## Reading what you see

- The backdrop covers only the focus area. Anything visible in a band during a
  flight is either a card, a ghost, or a **real window** reaching past the focus
  area: compare its rect with the window's `at`/`size`.
- The user switching workspaces during a run starts flights of their own; a
  check that ran meanwhile proves nothing. Ask, or rerun.

## Safety

- Close only windows you opened, and check by title first. Throwaway window:
  `hyprctl eval 'hl.exec_cmd("foot -T periphery-probe", { workspace = "3 silent", float = true })'`.
- If a run leaves a window hidden (tag `periphery-hide`, opacity 0), put it
  back at once:
  `hyprctl dispatch 'hl.dsp.window.tag({ window = "address:<a>", tag = "-periphery-hide" })'`;
  toggling the mode off and on also clears every tag.
