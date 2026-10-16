# Flight (`src/flight`)

What each window does in a flight, and how a ghost looks along the way. Pure: addresses, rects and numbers in, decisions and numbers out. Behaviour and terms as in [SPEC.md](../../SPEC.md#the-exposé-flight).

## Tab state

Input per window: its tab group (Hyprland's `grouped`: the addresses of every tab in its group, empty when it isn't in one), and the set of shown tabs from the hook.

- A window is a hidden tab when its tab group has two or more windows and it is not in the shown set. Every other window is shown, a window outside a tab group included.
- A flight to a window shows that window: after the switch it is shown, and the other tabs of its group are hidden. Without a target, the shown set is the same before and after.

## Ghosts on the tiles

At the start of a flight, before Hyprland switches: the windows whose ghosts go up on their tiles. Every window in the focus area that is shown. Hidden tabs get none: the shown tab covers their tile.

## Plan

Input: the focus area windows before the switch, the focus area windows after it, the windows with a card after it, the tab groups, the shown set and the target of a flight to a window (or none).

Each window gets one move:

| Window                                      | Shown at both ends     | Move                        |
| ------------------------------------------- | ---------------------- | --------------------------- |
| In the focus area before, with a card after | shown before           | `fly` (tile to card)        |
| In the focus area before, with a card after | hidden before          | `card` (its card fades in)  |
| With a card before, in the focus area after | shown after            | `fly` (card to tile)        |
| With a card before, in the focus area after | hidden after           | `card` (its card fades out) |
| In the focus area before and after          | shown before and after | `fly` (tile to tile)        |
| In the focus area before and after          | hidden at either end   | none                        |
| Neither in the focus area before nor after  | —                      | none: the card moves itself |

A window in the focus area after the switch was a card before it, unless it was in the focus area before. "Shown before" uses the shown set; "shown after" uses the shown set after the switch (Tab state).

Output: the addresses that `fly`. Every other window does nothing here: a `card` move is its card fading on its own, as its window enters or leaves the bands.

## Hidden floating windows

A floating window can reach past the focus area into a band, where the backdrop doesn't cover it. A flight hides every floating window of the monitor (SPEC.md, The Exposé flight): of the windows with a card and of the focus area's, the floating ones, in that order, each once. The focus area's are under their own ghosts when the switch goes out; hiding them too keeps a switch back mid-flight from showing them before their ghosts land.

## Ghost stacking

Ghosts overlap where their windows do, so they stack the way Hyprland draws the windows: otherwise a tiled window's ghost covers the floating windows over it, and they pop up at the hand-off.

Input per window: whether it floats, whether it is pinned, and its `focusHistoryID` (Hyprland's: 0 for the most recently focused window, higher for longer ago, −1 or absent for never).

Output: a `z`, higher in front.

- Tiled windows are at the back, all at 0: they don't overlap.
- Floating windows are in front of every tiled window. Hyprland raises a floating window when it gets the focus, so among them the more recently focused one is in front. A floating window never focused is behind the floating windows that were.
- Pinned windows are in front of every other window, among them again the more recently focused one in front.

## Ghost look

Input: the ghost's travel `t` (0 at the start of its flight, 1 landed; values outside 0 to 1 are clamped), whether it starts on a tile (or a card), whether it is flying to a tile (or to a card), whether it is the active window at the tile end, its window's `opacity`, `opacityInactive`, `borderSize` and `rounding`, and its tilt at the start and at the end (`fromTilt`, `toTilt`, degrees: a card's tilt where it is a card, 0 on a tile).

The tile weight `w` is how close the ghost is to the tile: `t` when flying to a tile, `1 − t` when flying to a card, and 1 all the way from a tile to a tile (a window moved along with the switch looks like its window throughout).

- **Content opacity:** from 1 at the card to the tile opacity at the tile: `1 + (tileOpacity − 1) × w`. The tile opacity is `opacity` for the active window, else `opacityInactive`.
- **Border offset:** how far the border's outer edge is outside the content's edge: `borderSize × w`. The border is `borderSize` wide, inwards from there: at the tile entirely outside the content, at the card entirely inside it.
- **Outer corner:** `rounding + borderSize × w`.
- **Tilt:** from the start's tilt to the end's along the travel: `fromTilt + (toTilt − fromTilt) × t`. Landed, the ghost has its card's tilt, so the hand-off shows no turn.
- **Blur opacity:** the blurred wallpaper behind the ghost. Cards sit on the sharp wallpaper, and the spring's slow tail would leave a linear fade short at landing, so it changes over the first half of the travel: flying to a tile `min(1, 2t)`, flying to a card `1 − min(1, 2t)`; from a tile to a tile 1.

## Lifecycle

A flight's phases, as a step from a phase and an event to the next phase and the actions the plugin takes. Times are milliseconds from the plugin's clock.

Phases:

- `idle`: no flight.
- `pending`: the backdrop and the tile ghosts are up; the switch is about to go out (`dispatchedAt` absent) or went out at `dispatchedAt`.
- `flying` (`since`, `landedTicks`): Hyprland switched, the ghosts fly.
- `unhiding`: the flight is over; the hidden floating windows are being shown again, under their ghosts.

Events and what they do:

| Phase               | Event                  | Next phase                    | Actions                             |
| ------------------- | ---------------------- | ----------------------------- | ----------------------------------- |
| `idle`              | `start`                | `pending` since now           | `launchOnTiles`, `scheduleDispatch` |
| any other           | `start`                | unchanged                     | none                                |
| `pending`           | `dispatched`           | `pending`, `dispatchedAt` now | none                                |
| any other           | `switched`, fullscreen | `unhiding`                    | `unhide`                            |
| any other           | `switched`             | `flying` since now, 0 ticks   | `fly`                               |
| `pending`           | `tick`, no switch      | `unhiding`                    | `unhide`                            |
| `pending`, `flying` | `tick`, too long       | `unhiding`                    | `warnForced`, `unhide`              |
| `flying`            | `tick`, early          | unchanged                     | none                                |
| `flying`            | `tick`, not landed     | ticks 0                       | none                                |
| `flying`            | `tick`, landed         | ticks + 1; `unhiding` at 2    | `unhide` at 2                       |
| `unhiding`          | `unhidden`             | `idle`                        | `handOff`                           |
| any but `idle`      | `close`                | `idle`                        | `cancelDispatch`, `handOff`         |
| anything else       |                        | unchanged                     | none                                |

- No switch: `dispatchedAt` is set and more than `switchWaitMs` (150) ago.
- Too long: more than `switchMaxMs` (1500) since the phase began (`pending`'s `since`, or `flying`'s).
- Early: less than `switchMinMs` (120) since `flying` began, so the refresh after the switch can still retarget the ghosts.
- Landed: every flying ghost on its target's pixels, reported with the tick. Twice in a row, so a spring passing through its target doesn't count.
- A switch while `idle` is one the plugin didn't start: Hyprland animates it, and the cards move to their new places on their own.
- A switch during `unhiding` continues the flight: the floating windows are shown again by then, which is accepted for this rare case.
