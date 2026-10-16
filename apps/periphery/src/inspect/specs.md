# Inspect (`src/inspect`)

What the stress test (`stress.ts`, `stef stress periphery`) looks for in the plugin's own view of its switch ghosts. The plugin answers the `inspect` IPC call with a sample; this module finds what is wrong across a run of samples. Pure: samples in, problems out. Terms as in [SPEC.md](../../SPEC.md#ubiquitous-language).

## Sample

What `inspect` answers, at time `at` (milliseconds, the caller's clock):

- `phase`: the flight's phase (`idle`, `pending`, `flying`, `unhiding`; [flight specs](../flight/specs.md#lifecycle)).
- `ghosts`: every ghost that is drawn (visible, and not faded out), each with its window's `address`, whether it is `launched` (taken off its window for a flight) and `flying` (moving to its target), its `rect` and its `target` (`{ x, y, w, h }`, monitor-local pixels; the target absent when the window has neither card nor tile), its `z` (higher in front), and `groundedMs`.

- `flown`: whether the last workspace switch was flown. One that wasn't (the hook switched itself when the plugin didn't answer in time, or a switch from elsewhere) is animated by Hyprland, its cards fading out as they travel, by design.
- `cards`: every card that is drawn, each with its window's `address`, whether it is `leaving` (its window left the bands; it fades out, then goes) and its `rect`.

## Problems

Each problem names the rule, the window, and the sample's time, once per window and rule for as long as the phase lasts.

- **Idle ghost:** a ghost drawn while the phase is `idle`. Nothing flies then; a drawn ghost is a stray copy over the real window or card.
- **Resting ghost:** a drawn ghost that isn't launched. At rest a ghost sits on its target, hidden; drawn, it shows a copy where the window already is.
- **Stuck ghost:** during `flying`, a drawn ghost whose rect is the same in two samples at least `STUCK_MS` (300) apart, and isn't its target. A flying ghost moves until it lands; one that stops short is the partly settled ghost seen mid-flight.
- **Grounded ghost:** a drawn ghost that has been launched but not flying for at least `GROUNDED_MS` (100), by the plugin's own clock (`groundedMs` in the sample: since its launch, while it isn't flying). Every launched ghost is sent flying one event-loop turn after the switch; one left behind sits at its start. Measured in the plugin, not across samples: a sample's time is when its answer arrives, and fast switching relaunches a ghost every few tens of ms, each time grounded for a moment.
- **Double:** a window drawn both as a card and as a ghost in the same sample. While a ghost flies, its card waits hidden.
- **Fading card:** a leaving card drawn after a flown switch (`flown`), in any phase. In a flight a window's ghost leaves from its card, which must not show again where the window was. A hidden tab's card fades by design: the stress test has no tab groups.

## Stacking

Separately, for one sample and Hyprland's floating windows on the shown workspace in its stacking order (back to front, as `hyprctl clients` lists them once the flight has settled): every two of those windows whose ghosts are both drawn, the later one's ghost must have the higher `z`. Otherwise it was drawn behind a window it is in front of, and popped over it at the hand-off: a **wrong stacking** problem for the later window.

Samples are taken in time order. Two samples count for a rule only when the phase is `flying` in both, with no other phase in between: a new flight starts every ghost again.
