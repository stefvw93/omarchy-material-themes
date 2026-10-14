# Periphery exposé (`stef.periphery`)

Proof of concept. Status: works on one monitor (DP-3, 2560×1440, scale 1), Hyprland 0.56.2, Omarchy shell.

## Problem

A wide monitor puts windows at the far edges of the screen. Content there is hard to read, but it is also out of the way. Tiling uses the full width for the current workspace. Windows on other workspaces are not visible.

Scott Jenson showed a prototype at a KDE event (["Are we really going to use the same Desktop UX forever?"](https://www.youtube.com/watch?v=V7AfAcQwLW0)). It keeps the active work in a centred area and keeps other work at small scale in the periphery.

## Value

- The current workspace tiles in a centred area of good reading width.
- The windows of the other workspaces stay visible, live, at the screen sides.
- One click goes to a window. One drag moves a window between the focus area and other workspaces.
- One key turns the mode on and off. When the mode is off, the desktop is unchanged.

## Ubiquitous language

| Term                 | Definition                                                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Focus area           | The centred part of the monitor. Regular workspaces tile only in this area.                                                                                    |
| Band                 | The part of the monitor at the left or right of the focus area.                                                                                                |
| Periphery            | The two bands together.                                                                                                                                        |
| Card                 | The live thumbnail of one window in a band.                                                                                                                    |
| Group                | The cards of one workspace, with the workspace label above them.                                                                                               |
| Pile                 | The cards of one tab group, stacked: the shown tab in front, the other tabs peeking out behind it.                                                             |
| Fan                  | A pile spread out, so every tab's card can be pointed at. A pile fans out while one of its tabs is selected.                                                   |
| Tilt                 | The turn of a band's plane about the monitor's outer edge, its inner side further away, like a curved display. A selected card leaves the plane and lies flat. |
| Ratio                | Focus area width divided by monitor height. The default is `1.25` (5:4).                                                                                       |
| Side width (`sideW`) | The width of one band: `(monW - round(monH × ratio)) / 2`.                                                                                                     |
| Drop                 | The release of a drag. The drop position selects the target workspace.                                                                                         |
| Selection            | The one card that has the focus instead of a focus area window. Set by hovering a card or by the focus keys.                                                   |
| Tab group            | Hyprland's window group: several windows on one tile, one shown at a time, with a tab bar above it.                                                            |
| Shown tab            | The window of a tab group that its tile shows. The group's other windows are hidden tabs.                                                                      |
| Ghost                | A live copy of a window (`ScreencopyView`) that flies over the screen during a flight.                                                                         |
| Flight               | A workspace switch in which ghosts fly between tiles and cards over a wallpaper backdrop.                                                                      |
| Hand-off             | The frame in which the ghosts and the backdrop go, and the real windows and cards show.                                                                        |
| Routed switch        | A workspace switch from a key that goes through the hook first, so the plugin can fly it.                                                                      |

## Behaviour

### Toggle

`SUPER + E` toggles the mode. The mode stays on until the next toggle, a shell restart, or a plugin reload.

When the mode turns on, Hyprland re-tiles the current workspace into the focus area. When the mode turns off, it returns to full width. The bar keeps the full monitor width; the bands start below it.

The focus area is a Hyprland workspace rule, not reserved space: while the mode is on, the regular workspaces of the monitor (`s[false] m[<monitor>]`) get `gaps_out` of the theme's outer gaps plus `sideW` at the left and right. Reserved space (an exclusive zone) would apply to every workspace on the monitor, special ones included.

On DP-3 with the default ratio: focus area 1800 px, each band 380 px.

### Special workspaces

The mode leaves special workspaces (the scratchpad) alone. They keep Hyprland's own gaps and tile at full width, with dwindle, over the theme's scrim. Showing or hiding one moves nothing behind it: the current workspace and the bar stay as they are.

The cards stay in the bands, under the scrim and the special workspace's windows. The focus keys on a window of a special workspace keep Hyprland's own focus: they never enter a band.

### Focus area announcements

Other plugins (the bar, `stef.bar`) follow the focus area without depending on this plugin: the hook announces it on Hyprland's event socket, with Hyprland's `event` dispatcher.

- When the focus area changes (the mode turns on, the ratio or monitor changes): `custom>>periphery>><x0>,<x1>,<monitor>`, the focus area's left and right edge in global pixels and the monitor's name.
- When the mode turns off: `custom>>periphery>>off`.
- Only changes are announced; the state the plugin sends on every selection change announces nothing new.
- `periphery_announce()` announces the current state again (`off` before anything), for a listener that starts later.

### Placement of groups

The plugin shows the occupied regular workspaces (id > 0) of the focused monitor. It does not show the current workspace or special workspaces.

- Workspaces with a lower id than the current workspace go in the left band.
- Workspaces with a higher id go in the right band.
- Each band orders its groups by id, from top to bottom.
- Wrap rule: if the left band is empty and the right band has 2 or more groups, the group with the highest id moves to the left band. If the right band is empty and the left band has 2 or more groups, the group with the lowest id moves to the right band.

Example, with workspaces 1, 2, 3 and 4 occupied:

| Current | Left band | Right band |
| ------- | --------- | ---------- |
| 1       | 4         | 2, 3       |
| 2       | 1         | 3, 4       |
| 4       | 2, 3      | 1          |

### Placement of cards

The bands follow macOS Mission Control: every window is visible, a workspace keeps the shape of its tiling, and the cards are as large as the band allows. [src/layout/specs.md](src/layout/specs.md) has the exact rules.

1. Each workspace group has its own scale. A group first fills the band's width; then all groups of a band shrink by one factor until the band's height holds them. A lone window is as wide as the band (at most half its real size).
2. A group's tiled windows keep the side they tile on: a window tiled on the left is in the left column, one on the right in the right column, top to bottom within a column. A crowded band keeps more columns; a roomy one merges them, down to a single column, left side first. Shorter columns are centred against the tallest, so the columns stagger.
3. A tab group is a pile: one card per tab, the shown tab in front and up to three tabs peeking out behind it, up and to the left. Selecting a tab of a pile (hover or the focus keys) fans it out: its tabs line up vertically, each one at least half visible, in front of the other cards. The fan closes when the selection leaves the pile.
4. A floating window's card overlaps the tiled cards where the window really sits on its workspace, in front of them.
5. The groups are stacked down the band, `groupGap` apart, centred vertically. The workspace label is above the top card of its group.

Each band is one surface in world space ([src/surface/specs.md](src/surface/specs.md)): a plane hinged on the monitor's outer edge and turned 8° back (tilt), seen in perspective from in front of the monitor's centre (`viewDistance`). Every card of the band lies on that plane, so the cards share one vanishing point and the band curves in towards the focus area like a curved display. The hinge is on the screen plane and every tilted point is behind it, so a card that leaves the plane and lies flat on the screen plane is in front of every tilted card, everywhere: drawing it on top never contradicts its depth.

The selected card is lifted: it leaves the plane and lies flat on the screen plane, grows by `liftScale` (5%) from the middle of its outer edge (towards the focus area, never off the band), comes to the front, and casts the elevated card's hover shadow (elevation level 2). The others stay as they are. A dragged card turns flat without the lift: the drag has its own. Tilt and lift move on the spatial default spring, the shadow fades with them.

Each thumbnail fills its card. A window on a hidden workspace keeps its last frame, which can have its old size (after the mode turned on, or a shell restart) until the window draws again; the frame then covers the card, cropped, rather than letterboxed in it.

### Workspace switch animation

Two kinds of switch, with different owners of the animation:

| Switch                                                                    | Focus area                                                                                                           | Bands                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Card click, Return on a card, `flyTo` over IPC                            | A flight (the Exposé flight): windows fly between their cards and their tiles.                                       | Cards move to their new places on the spring. No travel: the ghosts land on the cards, which must be in place.                                                                                                                                               |
| Workspace keys (routed switches, see [Routed switches](#routed-switches)) | A flight, the same as a card click.                                                                                  | Same as above.                                                                                                                                                                                                                                               |
| Anything else: a bar click, a script, a notification, an app taking focus | Hyprland animates the real windows: the theme's workspace curve and speed, style `workspaceStyle` (`slidefade 10%`). | Cards slide to their new places on the spring, and travel with the focus area the way Hyprland slides the workspace (`cardSlide`): cards of the old workspace fade in coming from the focus-area side, cards of the new workspace fade out going towards it. |

Only the hook sees a switch before Hyprland makes it. Every other switch reaches the plugin about 8 ms after Hyprland has switched, too late to put a backdrop up, so Hyprland animates it: every frame of the focus area is real, with no copies and no hand-off. A full `slide` would move windows across the whole monitor, over the bands (windows are drawn above them); `slidefade 10%` stays mostly in the focus area.

#### The Exposé flight

The plugin cannot move real windows. It flies a ghost (a live `ScreencopyView`) per window on the Overlay layer. Each window on the monitor has a ghost for as long as the mode is on, hidden and capturing: a new `ScreencopyView` takes a few hundred ms to get its first frame, so a ghost made at switch time flew empty.

The plugin starts this switch (`flyTo`, or a routed switch), so it gets ahead of Hyprland:

1. The plugin puts the wallpaper backdrop up over the tiling area, with the ghosts of the current focus windows on their tiles: the screen looks the same.
2. Two frames later (34 ms), one `hyprctl --batch`: `no_shadow` on the floating windows of the other workspaces, Hyprland's workspace animation off, then the switch: the focus dispatch for `flyTo`, `periphery_run(<token>)` for a routed switch. Hyprland switches at once, under the backdrop.
3. On `activeWorkspaceChanged`, `beginSwitch` reads where every window is drawn now (its ghost, card or tile), relays out from the cached geometry and starts every ghost: a window leaving the focus area flies from its tile to its new card, a window entering it flies from its card to its tile, and a window that stays in the focus area (one moved along with `SUPER + SHIFT + <n>`) flies from its old tile to its new one. Tab groups have their own rule ([Tab groups in a flight](#tab-groups-in-a-flight)). A hidden workspace can have old tiling; the refresh 80 ms later retargets the ghosts in flight.
4. When every ghost has landed, two checks in a row (at least 120 ms, at most 1.5 s), the ghosts and backdrop go in one frame. A ghost has landed when its rect is its target's, on whole pixels. Ghosts and cards are drawn on whole pixels: a ghost at a fraction of a pixel draws its window resampled, slightly soft, so its text shimmered in the spring's tail and snapped sharp when the real window took over (a visible pop on a large window). Rounded, a ghost sits on its target's pixels as soon as its spring is within half a pixel of it. Landing is measured on the ghost's rect, so a target that moves mid-flight (the 80 ms refresh) still counts only once it is reached. The shadows and Hyprland's workspace animation (`workspaceStyle`) come back.

No switch: when Hyprland hasn't switched `switchWaitMs` (150 ms) after the dispatch (a key to the workspace already shown), the flight ends. The ghosts are still on their tiles, so nothing visible changes.

A switch during a flight continues it. Hyprland's workspace animation is off then, so the new workspace is under the backdrop too, whoever started the switch. Each window flies on from where it is drawn now, and windows that now cross start from there.

Tiled windows rest at elevation level 0, with no shadow (the theme's `m3-tiled-level0` rule); floating windows have one (level 3) that would show past the backdrop, into the bands. Hence the `no_shadow` on floating windows during the flight (`value = "unset"` afterwards, so a window rule's `no_shadow` stays). The border of a window tiled flush against the band also reaches past the tiling area: the backdrop reaches `coverBleed` (2 px) into each band.

No flight when the mode is off, when the current workspace has a fullscreen window, during a card drag, or for a window without a card (in the focus area, on another monitor, on a special workspace; possible over IPC): the click then just focuses the window, and a routed switch just switches.

#### Routed switches

The hook ([How the keys reach the plugin](#how-the-keys-reach-the-plugin)) wraps the two actions that switch workspace:

| Action                                              | Omarchy's keys                                                                              |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `hl.dsp.focus({ workspace = … })`                   | `SUPER + 1…0`, `SUPER + TAB`, `SUPER + SHIFT + TAB`, `SUPER + CTRL + TAB`, `SUPER + scroll` |
| `hl.dsp.window.move({ workspace = … })` with follow | `SUPER + SHIFT + 1…0`                                                                       |

A bind made with them, while the mode is on:

1. keeps the native dispatch under a new number (the token) and calls `route <token>` on the plugin;
2. the plugin flies the switch and runs the dispatch with `periphery_run(<token>)` in its batch (step 2 above). It runs it at once during a flight (the switch continues the flight) and when it can't fly;
3. when `periphery_run` hasn't come `routeTimeoutMs` (150 ms) later (the plugin is busy, unloaded or crashed), the hook runs the dispatch itself. A token runs once: the later of the two does nothing.

Unchanged: a call while the mode is off, `follow = false`, a special workspace (`special:` names), and a call that names its window (`window = …`, the plugin's own dispatches).

A routed switch starts about 50 to 70 ms after the key: one `omarchy-shell` call (about 28 ms), two frames, one `hyprctl`.

#### What a ghost copies from its window

A ghost is the window's own pixels. Hyprland draws more around and under them; the ghost draws that too, so the hand-off doesn't jump. Each part changes with the ghost's travel, from 0 at the start of its flight to 1 landed (clamped, so the spring's overshoot doesn't overshoot it):

| Part            | At the tile                                                                                                                                   | At the card                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Content opacity | The window's `opacity` when it is the active window at that end, else its `opacity_inactive` (Omarchy's `default-opacity` rule: 0.985, 0.96). | 1, as cards draw thumbnails.                                                  |
| Border          | Its `border_size`, outside the content, with an outer corner of `rounding` + `border_size`, as Hyprland draws it.                             | The same width inside the edge, with the corner `rounding`, as cards draw it. |
| Border colour   | The theme's active border for the active window, the inactive border for the others.                                                          | The inactive border (a selection clears on a switch).                         |
| Blur behind it  | The wallpaper, blurred as `decoration:blur` blurs it (below).                                                                                 | The sharp wallpaper.                                                          |
| Shadow          | None: tiled windows have none, floating windows lose theirs for the flight.                                                                   | None.                                                                         |

A ghost's border changes colour on the effects fast spring from the start of its flight, as Hyprland's border leaf does. `opacity`, `opacity_inactive`, `border_size` and `rounding` are each window's own (`hyprctl getprop`), read when its ghost is made; they follow window rules.

The blur is Hyprland's dual-kawase blur redone with `MultiEffect` over the wallpaper, from Hyprland's own options (interpretation `periphery.ghost-blur`):

- Radius: size × 2^passes, how far dual-kawase reaches from a pixel (each pass halves the image and samples `size` away): 48 px for size 6, 3 passes.
- `contrast` − 1, `brightness` − 1 and `vibrancy` become `MultiEffect`'s contrast, brightness and saturation.
- Not redone: Hyprland's noise (0.0117).

The wallpaper (`current/background`, the backdrop's and the blur's) and the blur options are read when the mode turns on and after every config reload: a theme switch repoints the wallpaper, then reloads Hyprland.

What still differs at the hand-off:

- A floating window's shadow comes back after the landing.
- A tab group's tab bar isn't in any ghost: it goes when the backdrop goes up and comes back at the hand-off.
- The noise of Hyprland's blur.

#### Tab groups in a flight

Every tab of a tab group has its own card, like any window. Only the shown tab is on the tile, so only the shown tab flies:

| Window     | Leaving the focus area                           | Entering the focus area                           |
| ---------- | ------------------------------------------------ | ------------------------------------------------- |
| Shown tab  | Flies from its tile to its card.                 | Flies from its card to its tile.                  |
| Hidden tab | Its card fades in on the effects default spring. | Its card fades out on the effects default spring. |

Hyprland reports `hidden: false` for every tab, so the hook tells the plugin which tabs are shown (`group.current`): `tabs '<address> …'` with the shown tab of every tab group, as one quoted argument (`tabs 'none'` without any; the plugin's `tabs` takes one string, and `omarchy-shell` drops a call with more arguments), when the mode turns on (the hook is reset first, so this always reports) and whenever the active window changes (a tab switch makes the new tab active), a window opens, closes or moves to another workspace; only when the list changed since the last report. A tab group's shown tab doesn't change while its workspace is hidden. A flight to a hidden tab shows it: it flies in, and its group's shown tab until then counts as hidden.

#### Hyprland's workspace animation

When the mode turns on, the plugin reads the theme's workspace animation from `hyprctl animations -j`, keeps it to restore, and sets the same curve and speed with style `workspaceStyle` (`hyprctl eval`). A flight turns it off for its own switch and back on at the landing. The mode turning off or the plugin unloading writes the theme's animation back; if it could not be read, the plugin runs `hyprctl reload config-only`.

### Thumbnails

Each card is a `ScreencopyView` with `live: true`. Cards update at the screen frame rate. A video on another workspace plays smoothly in its card.

A card without a frame yet is an M3 outlined card showing the window class (body-small, on-surface-variant).

### Periphery selection

One card at a time can have the focus instead of the windows in the focus area: the selection. The pointer and the focus keys both set it, and the latest input wins.

While a card is selected:

- the card draws the theme's active window border and shows its window title as an M3 plain tooltip, fading in on the effects fast spring (see [Card borders](#card-borders));
- the active window in the focus area draws its border in the inactive colour (`general:col.inactive_border`);
- Return (and keypad Enter) goes to the card's window with the Exposé flight, and Escape lets go of the card. These two keys are bound only while a card is selected;
- the keys bound to the actions below act on the card. Keys are found by action, not by key: any key bound to these actions works, also after a rebind.

| Action (Omarchy's key)                                         | No selection                                                                                                                                                                                                                                                                               | Card selected                                                                                                                                                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hl.dsp.window.close()` (`SUPER + W`)                          | Closes the active window.                                                                                                                                                                                                                                                                  | Closes the card's window.                                                                                                                                                                                                                                    |
| `hl.dsp.window.fullscreen(…)` (`SUPER + F`, `SUPER + ALT + F`) | Fullscreens the active window.                                                                                                                                                                                                                                                             | Goes to the card's window (Hyprland switches to its workspace, no flight) and fullscreens it, in the same mode.                                                                                                                                              |
| `hl.dsp.focus({ direction = "l" / "r" })` (`SUPER + ←/→`)      | Moves focus between windows. On the window at the left or right edge of the focus area (no tiled window beyond it), selects the card in that band nearest the window's height. Hyprland's own wrap-round to the other edge is skipped then. A band without cards: Hyprland's normal focus. | Moves to the nearest card beside it (overlapping vertically) that way in the same band; a card further up or down is for `SUPER + ↑/↓`. With no card that way, towards the focus area: focuses the focus area window on that edge nearest the card's height. |
| `hl.dsp.focus({ direction = "u" / "d" })` (`SUPER + ↑/↓`)      | Moves focus between windows.                                                                                                                                                                                                                                                               | Moves to the nearest card up or down in the same band, across groups.                                                                                                                                                                                        |

The selection clears when:

- the pointer moves over the focus area (a pointer that rests there during a keyboard selection doesn't count until it moves 4 px);
- the pointer leaves the selected card and is over no card 120 ms later (`leaveMs`): onto empty band space, or out of the band. The delay lets the pointer cross a gap to the next card, and lets a pile fan out under a pointer that holds still;
- focus moves to a window (pointer, keys, a click, anything);
- the workspace switches, a card drag starts, a card is clicked, or the selected window leaves the bands (closed, moved);
- Escape or Return is pressed, or the mode turns off.

Typed keys other than Return and Escape still reach the focus area window. The plugin doesn't take the keyboard: Hyprland then sends the pointer only to the surface that holds the keyboard, and hovering another card stopped working.

#### Card borders

Cards draw their border the way Hyprland draws a window's, in the current theme's style, through the shell's `Border` tokens (they follow theme changes):

| Card                       | Border   | Theme source                                                                 |
| -------------------------- | -------- | ---------------------------------------------------------------------------- |
| At rest                    | Inactive | `[popups] border` (Omarchy themes give it Hyprland's inactive border colour) |
| Selected, or being dragged | Active   | `[hyprland] active-border`, Hyprland's active-border gradient                |

The colour changes on the effects fast spring, as Hyprland animates a window's border (its `border` leaf). The width is Hyprland's `general:border_size` and the corner radius `decoration:rounding`, read from `hyprctl getoption` when the mode turns on and after every config reload (a theme switch reloads Hyprland).

Pointing selects, and pointing away lets go: leaving the selected card clears the selection. A selection made with the focus keys stays while the pointer rests.

#### How the keys reach the plugin

Hyprland binds are opaque Lua refs (`hyprctl binds` shows `dispatcher: "__lua"`), so the plugin can't find out which key does what. [`hypr.lua`](hypr.lua), loaded from `~/.config/hypr/hyprland.lua` before Omarchy's bindings (see [README.md](README.md)), wraps the action constructors instead: close, fullscreen, focus and window move. A bind made with them gets a Lua function that checks the global `periphery`:

- `nil` while the mode is off: the native action, unchanged.
- `{ bands, focus, selected, cursor }` while the mode is on. The plugin writes it with `hyprctl eval` (`periphery_open(…)`, `periphery_select(address)`, `periphery_close()`), one call at a time so states arrive in order.

Close and fullscreen run in the hook directly, against `address:<selected>`. The focus keys call the plugin over IPC (`enter`, `step`), because the plugin knows the card layout. Focus on a workspace, and a window move that follows, become routed switches ([Routed switches](#routed-switches)). A call that names its own window (`{ window = … }`) keeps the native action, so the plugin's own dispatches are not affected.

While a card is selected, the hook binds Return, KP_Enter and Escape (`hl.bind`, removed with `:remove()` when the selection clears). Return calls `activate`, Escape calls `clear`.

The hook also greys the border: it sets the active window's `active_border_color` to the inactive colour, and back to `general:col.active_border` when the selection clears. `set_prop` drops the first colour of a gradient, so the value gets a dummy first colour. (`value = "unset"` leaves the window with an empty gradient, so the theme value is written back instead.)

Pointer motion over the focus area reaches neither the plugin (its surface takes input in the bands only) nor a Hyprland event. While a card is selected, a 50 ms `hl.timer` in the hook watches the cursor and calls `clear` once it moves over the focus area.

The hook also reports the shown tabs of tab groups to the plugin (`tabs`, see [Tab groups in a flight](#tab-groups-in-a-flight)).

A `hyprctl reload` starts a fresh Lua state. The plugin sends its state again on `configreloaded`.

### Pointer actions on cards

| Action                         | Result                                                                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hover                          | Selects the card (see [Periphery selection](#periphery-selection)).                                                                                                                              |
| Click                          | Focus the window with the Exposé flight (see [The Exposé flight](#the-exposé-flight)). Hyprland goes to its workspace. That workspace leaves the periphery and the previous workspace enters it. |
| Drag, drop in the focus area   | Move the window to the current workspace and focus it. Dwindle tiles it next to the window under the pointer.                                                                                    |
| Drag, drop on another group    | Move the window to the workspace of that group.                                                                                                                                                  |
| Drag, drop on empty band space | Move the window to the lowest free workspace id.                                                                                                                                                 |
| Drag, drop on its own group    | No change.                                                                                                                                                                                       |

During a card drag, a live copy of the window follows the pointer above all windows, lifted to the M3 filled card's dragged elevation under the dragged state layer. It grows on the spatial fast spring, a little more over the focus area. The focus area or the target group is shown as the drop target: primary at the hover state-layer opacity, a primary outline, the large corner.

### Drag of a real window into a band

Use the existing Omarchy binding `SUPER + mouse:272` (drag a window). Release the pointer over a band:

- Over a group: the window moves to the workspace of that group.
- Over empty band space: the window moves to the lowest free workspace id.

Hyprland does not report pointer motion during its own window drag. The plugin shows no drop outline for this drag. The window leaves the focus area on release.

## Architecture

### Files

The repo (`~/Projects/omarchy-periphery`) holds the source; `vp run deploy` copies `plugin/` to `~/.config/omarchy/plugins/stef.periphery/`. The shell reloads plugins on any write under that folder, so the tooling lives outside it.

```
plugin/                what ships
  manifest.json        plugin kind "panel", entry Periphery.qml
  Periphery.qml        state, surfaces, animations, drag and drop, selection wiring, IPC
  WindowCard.qml       one card: thumbnail, border, hover, click and drag input
  hypr.lua             Hyprland side: wraps close, fullscreen and focus-direction for the selection
  lib/*.mjs            vp pack output of src/, imported by Periphery.qml
src/<module>/          pure TypeScript logic, each with specs.md, <module>.ts, <module>.test.ts
  layout/              bands, wrap rule, card placement (specs: src/layout/specs.md)
  selection/           focus-key navigation, drop targets (src/selection/specs.md)
  hyprland/            animation, hook state and option strings (src/hyprland/specs.md)
tests/hypr.test.lua    hook tests against a fake `hl`
scripts/               verify steps, deploy, smoke
CLAUDE.md              rules and workflow for working on the plugin
README.md              install and development
SPEC.md                this file
```

### Layer surfaces

The plugin creates 2 layer surfaces on the focused monitor. Both exist only while the mode is on, and neither reserves space.

| Namespace              | Layer   | Size        | Exclusive zone | Input      | Use                                                                      |
| ---------------------- | ------- | ----------- | -------------- | ---------- | ------------------------------------------------------------------------ |
| `omarchy-periphery`    | Bottom  | full screen | ignore         | bands only | Draw the groups and cards.                                               |
| `omarchy-periphery-fx` | Overlay | full screen | ignore         | none       | Draw the switch ghosts and backdrop, the dragged card and drop outlines. |

The bands get their room from the workspace rule ([Toggle](#toggle)). The Omarchy bar keeps its exclusive zone at the top of the full monitor width; the bands and the switch backdrop start below the reserved area.

The cards are on the Bottom layer: above the wallpaper, below all windows. A floating window can move over a band and cover cards.

One full-screen surface draws both bands. A card can then animate from one band to the other.

### Data flow

1. Hyprland raw events start a refresh: window open, close, move, float change, workspace create, destroy, rename and switch, monitor focus, fullscreen and pin.
2. The refresh calls `Hyprland.refreshToplevels()`. After 80 ms it reads `lastIpcObject` of each toplevel, and refreshes the monitors: their reserved area changes without an event when the bar resizes (`stef.bar` grows its exclusive zone as it floats in the focus area), and the switch backdrop and the bands start below it.
3. `rebuild()` builds the groups, sorts them into bands and runs the solver.
4. A layout signature skips the rebuild if nothing changed.
5. A `ListModel` keyed by window address keeps one card delegate per window. A card that changes position moves on the spatial default spring. A new card fades in at its position on the effects default spring.
6. `rebuild()` also caches the tiles of the current workspace (`focusRects`), the start rects of a workspace switch.
7. A window new to the plugin gets its `opacity`, `opacity_inactive`, `border_size` and `rounding` read in one `hyprctl --batch` (`j/getprop`), for its ghost. A reload reads them again for every window.
8. A 3 s timer resyncs titles and sizes (and, through step 2, the reserved area) that change without a structural event. It stops during a drag.

### IPC

The plugin has an `IpcHandler` (needs `import Quickshell.Io`):

```bash
# Drop a window at global pixel position (x, y). Ignored outside the bands or when the mode is off.
omarchy-shell stef.periphery dropWindow 0x56c7bf955960 2300 300

# Go to a window the way a card click does: the Exposé flight.
omarchy-shell stef.periphery flyTo 0x56c7bf955960

# From hypr.lua (focus keys): select a card in the left/right band, coming from the active window.
omarchy-shell stef.periphery enter l 0x56c7bf955960
# From hypr.lua: move the selection (l, r, u, d).
omarchy-shell stef.periphery step d
# From hypr.lua: Return on a selected card; the Exposé flight to its window.
omarchy-shell stef.periphery activate
# From hypr.lua: Escape, or the pointer moved over the focus area; the selection clears.
omarchy-shell stef.periphery clear
# From hypr.lua: a routed switch; the plugin flies it and runs it with periphery_run(7).
omarchy-shell stef.periphery route 7
# From hypr.lua: the shown tab of every tab group (`tabs none` without any).
omarchy-shell stef.periphery tabs 0x56c7bf955960 0x56c7bf9a1230
```

The shell toggle passes an optional payload to `open()`:

```bash
omarchy-shell shell toggle stef.periphery '{}'
omarchy-shell shell toggle stef.periphery '{"ratio": 1.333}'   # 4:3 focus area
```

### Hyprland dispatches

The plugin uses Lua dispatch strings:

```lua
hl.dsp.focus({ window = "address:0x56c7bf955960" })
hl.dsp.window.move({ workspace = "2", follow = false, window = "address:0x56c7bf955960" })
```

`hyprctl dispatch workspace 3` fails with the Lua config. Use `hyprctl dispatch 'hl.dsp.focus({ workspace = "3" })'`.

## Configuration

[README.md](README.md) has the mandatory configuration: the hook line in `~/.config/hypr/hyprland.lua`, the toggle and drop binds in `~/.config/hypr/bindings.lua`, and the `plugins` entry in `~/.config/omarchy/shell.json`.

### Tunables (top of `Periphery.qml`)

Motion is Material 3 springs from the tokens' motion scheme (`tokens.m3.springs`, `SpringValue`): spatial default for card and ghost geometry, the cards' travel, the tilt and the fan, effects default for every fade, spatial fast for the drag grow (interpretation `periphery.components`). They follow `motion.scheme` live.

| Property                      | Default                  | Effect                                                                                                                                                                                         |
| ----------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ratio`                       | `1.25`                   | Focus area width / monitor height.                                                                                                                                                             |
| `bandMargin`                  | `space200` (16dp)        | Space between band edge and cards. Token `periphery.bandMargin`.                                                                                                                               |
| `cardGap`                     | `space125` (10dp)        | Minimum space between cards, and between a group header and its cards. Token `periphery.cardGap`.                                                                                              |
| `groupGap`                    | `space250` (20dp)        | Space between groups. Token `periphery.groupGap`.                                                                                                                                              |
| `cardTilt`                    | `8`                      | How far a band's plane turns back about the monitor's outer edge, in degrees. A selected or dragged card turns flat.                                                                           |
| `viewDistance`                | 1.5 × the monitor height | How far in front of the monitor's centre the bands are seen from. Shorter: stronger perspective.                                                                                               |
| `liftScale`                   | `1.05`                   | How much the selected card grows, from the middle of its outer edge.                                                                                                                           |
| `leaveMs`                     | `120`                    | How long after the pointer leaves the selected card, for a card that isn't under it, the selection clears.                                                                                     |
| `animSpeed`                   | `1`                      | Global animation speed. `0.25` plays all animations 4× slower (to inspect them), `2` twice as fast. Scales the springs (stiffness by speed², which keeps their shape) and the switch timeouts. |
| `workspaceStyle`              | `slidefade 10%`          | Hyprland's workspace animation style while the mode is on (switches that aren't routed), with the theme's curve and speed.                                                                     |
| `cardSlide`                   | 10% of the monitor width | How far arriving and leaving cards travel. Follows `workspaceStyle`: its percentage, on its axis (`vert` styles move vertically), 0 for a style that does not slide.                           |
| `coverBleed`                  | `2`                      | How far the switch backdrop reaches into the bands, to cover a flush window's border. At least `general:border_size`.                                                                          |
| `switchMinMs` / `switchMaxMs` | `120` / `1500`           | Shortest and longest switch flight before the hand-off.                                                                                                                                        |
| `switchWaitMs`                | `150`                    | How long a flight waits for Hyprland to switch after the dispatch before it ends without a switch.                                                                                             |
| `routeTimeoutMs` (`hypr.lua`) | `150`                    | How long the hook waits for the plugin to run a routed switch before it runs it itself. About twice the plugin's usual 50 to 70 ms.                                                            |

Colours are the theme's M3 roles (`Scheme.qml`: `omaterial.json`, or approximated from Omarchy's colours under other themes), type is the M3 type scale at the Omarchy text size (`tokens.m3.type`), and the font family is the shell's menu font. All follow theme, token and text-size changes.

## Constraints and gotchas

- **Plugin reload turns the mode off.** Any write under `~/.config/omarchy/plugins/` reloads the plugins, `vp run deploy` included. Press `SUPER + E` again. The hot reload is not reliable: after a deploy, run `omarchy restart shell`.
- **Hidden workspaces keep their old tiling.** Hyprland re-tiles only the visible workspace when the gaps rule changes. A workspace that was tiled at full width keeps that layout until you visit it. Its cards still show the correct relative positions.
- **Frame rate costs GPU.** Every card captures at the screen frame rate. Many windows in the periphery increase GPU load.
- **Floating windows keep their position.** A floating window that you drop in the focus area stays floating at its last position. It does not move to the drop point.
- **Dropped real window: active window.** The release bind uses `hl.get_active_window()`. This is correct because Hyprland focuses the window it drags. A release with SUPER held and no drag also calls the plugin. The plugin ignores it if the pointer is in the focus area. Over a band, the focused window moves (a SUPER-click on empty band space).
- **One monitor.** The mode uses the monitor that has focus when it turns on. It does not follow a monitor focus change: the bands keep showing the workspaces around that monitor's active workspace. Multi-monitor is not tested.
- **Fullscreen** windows cover the full monitor, bands included.
- **The gaps rule lives in Hyprland.** Unlike a layer surface, it outlives the plugin. The plugin removes it when the mode turns off and when it unloads, and resets the hook each time the mode turns on (below); a Hyprland reload starts without it.
- **The hook's state outlives the plugin.** `omarchy-restart-shell` ends the shell without the plugin's unload, so the hook can still hold a previous instance's state: its rule, its last tab report, its announced focus area. The first state the plugin sends after the mode turns on starts with `periphery_close()`, in the same ordered queue as the open that follows, so the hook starts clean and reports the shown tabs again (without it, the first flights after a restart lost every tab group's shown tab).
- **Narrow bands.** On a 16:9 monitor the bands are narrow (380 px at 5:4). The solver stacks cards vertically. A wider monitor or a smaller ratio gives larger cards.
- **The hook loads before Omarchy's bindings.** Wrapping in `bindings.lua` or the theme is too late: Omarchy's keys are bound by then. After adding the hook, run `hyprctl reload` once. Without the hook the plugin works, but hovering and the focus keys don't reach the cards.
- **Focus keys go through `omarchy-shell`.** `enter` and `step` start a process per key press (a few tens of ms). Close and fullscreen run in the hook and have no delay.
- **The greyed border is written back from the config.** A window rule that gives a window its own active border colour loses it after that window was greyed once.
- **Hyprland reload while on.** `hyprctl reload` while the mode is on puts the theme's workspace slide back (a full slide crosses the bands). Toggle the mode off and on.
- **Only routed switches and clicks fly.** A switch that doesn't go through the hook (a bar click, a script, a notification, an app taking focus) reaches the plugin about 8 ms after Hyprland has switched, too late to put a backdrop up, so Hyprland animates it. A key bound to a raw `hyprctl dispatch` or `exec` bypasses the hook too.
- **Routed switches wait for the plugin.** A workspace key starts its flight 50 to 70 ms after the press. When the plugin doesn't answer, Hyprland switches after `routeTimeoutMs` (150 ms) without a flight.
- **ScreencopyView does not blend.** A `ScreencopyView` overwrites what is under it with the window's own pixels and alpha. Over the backdrop, a translucent window (foot) made the Overlay surface translucent, and the real window behind showed through as a faint second copy; inside a ghost it wiped the blur patch. The `ScreencopyView` itself has `layer.enabled: true`: it renders alone into a texture that is drawn with normal blending. A layer on a parent item does not help, as the overwrite then happens inside that layer.
- **Hand-off leftovers.** A floating window's shadow, a tab group's tab bar and the blur's noise still change at the hand-off ([What a ghost copies from its window](#what-a-ghost-copies-from-its-window)).
- **Hidden tabs: `hidden` is false.** Hyprland's IPC reports `hidden: false` for every tab of a tab group. Only the hook (`group.current`) knows the shown tab.
- **No drop outline for real-window drags.** See [Drag of a real window into a band](#drag-of-a-real-window-into-a-band).

## Verification

```bash
omarchy restart shell
omarchy-shell shell toggle stef.periphery '{}'

hyprctl clients -j | jq '.[] | select(.workspace.id == <current>) | .at[0]'   # 391: 380 + gaps_out 8 + border 3
hyprctl monitors -j | jq '.[].reserved'          # [0, 26, 0, 0]: only the bar

omarchy-shell shell toggle stef.periphery '{}'
hyprctl clients -j | jq '.[] | select(.workspace.id == <current>) | .at[0]'   # 11
```

Manual checks:

1. Go to each workspace. Check the band of each group and the wrap rule.
2. Click a card. The window gets focus and the previous workspace enters the periphery.
3. Drag a card into the focus area, onto another group and onto empty band space.
4. `SUPER`-drag a real window onto a group in a band.
5. Play a video on another workspace. Its card plays smoothly.
6. Switch workspace with `SUPER + <n>`, `SUPER + TAB` and `SUPER + scroll`. Incoming windows fly from their cards to their tiles, outgoing ones to their new cards. No border, corner or opacity jump at the hand-off (record it and compare the frames either side).
7. Switch fast between two workspaces with the keys. Each window flies on from where it is, nothing stays on screen.
8. During a flight, `hyprctl getprop address:<floating window on another workspace> no_shadow` is `true`; after the landing, the window rule's value.
9. `SUPER + SHIFT + <n>`: the active window flies from its tile to its new tile on the other workspace, the others fly in from their cards.
10. `SUPER + <n>` for the workspace already shown: nothing moves, the backdrop doesn't flash.
11. Click a workspace in the bar: Hyprland's `slidefade 10%`, cards travel along (no flight).
12. A tab group: switch away from it and back. Only the shown tab flies; the other tabs' cards fade. Click a hidden tab's card: that tab flies in, the shown one fades out at its card.
13. Hook fallback: `hyprctl eval 'periphery = periphery or {}'` with the mode off (the hook thinks it is on, no plugin answers), then `SUPER + <n>`: Hyprland switches about 150 ms later. `hyprctl reload` afterwards.
14. `hyprctl animations -j | jq '.[0][] | select(.name=="workspaces")'`: `style: slidefade 10%` with the theme's curve while on, the theme's slide after the mode turns off.
15. Hover a card: the theme's active border, the active window's border turns inactive. Hover another card in the same band: the selection follows. `SUPER + W` closes the card's window, Return flies to it, Escape lets go. Move the pointer over the focus area: the selection clears and the border comes back.
16. On the leftmost window, `SUPER + ←` selects a card in the left band. `SUPER + ↑/↓` move through the cards and groups, `SUPER + →` goes back to the focus area window on that edge. The same on the right.
17. `SUPER + F` on a selected card: Hyprland goes to its workspace and the window is fullscreen.
18. `hyprctl eval 'error(tostring(periphery))'`: a table while on, `nil` after the mode turns off.
19. Open the scratchpad: it tiles at full width over the scrim, and nothing behind it moves, the bar included. `SUPER + ←` on its leftmost window doesn't select a card.
20. `socat -u UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock - | grep periphery`, then toggle the mode: `custom>>periphery>>380,2180,DP-3` on, `custom>>periphery>>off` off.

## Out of scope

- The warped grid background from the Jenson prototype.
- Interaction with the `SUPER + SHIFT + SPACE` overview (`stef.overview`). The two plugins are independent.
- Special workspaces (scratchpad) in the periphery.
- Drop position for floating windows.
