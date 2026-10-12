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

Output: the addresses that `fly`, and the addresses that move as `card`. Every other window does nothing.

## Ghost look

Input: the ghost's travel `t` (0 at the start of its flight, 1 landed; values outside 0 to 1 are clamped), whether it starts on a tile (or a card), whether it is flying to a tile (or to a card), whether it is the active window at the tile end, and its window's `opacity`, `opacityInactive`, `borderSize` and `rounding`.

The tile weight `w` is how close the ghost is to the tile: `t` when flying to a tile, `1 − t` when flying to a card, and 1 all the way from a tile to a tile (a window moved along with the switch looks like its window throughout).

- **Content opacity:** from 1 at the card to the tile opacity at the tile: `1 + (tileOpacity − 1) × w`. The tile opacity is `opacity` for the active window, else `opacityInactive`.
- **Border offset:** how far the border's outer edge is outside the content's edge: `borderSize × w`. The border is `borderSize` wide, inwards from there: at the tile entirely outside the content, at the card entirely inside it.
- **Outer corner:** `rounding + borderSize × w`.
- **Blur opacity:** the blurred wallpaper behind the ghost. Cards sit on the sharp wallpaper, and the spring's slow tail would leave a linear fade short at landing, so it changes over the first half of the travel: flying to a tile `min(1, 2t)`, flying to a card `1 − min(1, 2t)`; from a tile to a tile 1.
