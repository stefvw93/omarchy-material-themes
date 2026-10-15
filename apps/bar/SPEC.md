# Bar (`stef.bar`)

A replacement for the Omarchy bar, as an Omarchy `bar` plugin. Status: milestone 1 (hosting).

## Problem

The stock bar (`omarchy.bar`) can't follow Periphery's focus area, and it is not built from Material 3 components or motion.

## Value

- The bar narrows to the focus area while Periphery is on, and moves there on the tokens' springs.
- It is an M3 app bar in the theme's colour roles.
- It keeps everything the stock bar does: it is a close fork of it ([upstream/](upstream/README.md)), so the stock widgets, command and QML modules, dragging and transparency work as before, until each widget has an M3 version.
- `shell.json` `bar.layout` stays the one place where the widgets and their order are set.

## Ubiquitous language

| Term           | Definition                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Bar window     | One layer surface per screen, along the screen's top (or bottom) edge, the full width of the screen.                               |
| Body           | The visible bar inside the bar window: its container and the three sections. It is narrower than the window while Periphery is on. |
| Section        | `left`, `center` or `right`: an ordered list of entries from `bar.layout`.                                                         |
| Entry          | One item of a section: a widget id (`"omarchy.clock"`), or an object with an `id` and inline settings.                             |
| Widget         | A bar widget from the shell's widget registry (stock or plugin).                                                                   |
| Command module | An entry with `exec` (or `type: "command"`): a button that shows a command's output.                                               |
| QML module     | An entry with `source` (or `type: "qml"`): a QML file the user wrote.                                                              |
| Slot           | Where one entry lives in a bar window. Every bar window has a slot per entry.                                                      |
| Focus area     | Periphery's focus area (Periphery's SPEC.md), announced over Hyprland's event socket.                                              |

## Behaviour

### Selection

The shell loads the bar when `shell.json` `bar.id` names it. A missing or failing bar falls back to `omarchy.bar`. `stef deploy bar` selects `stef.bar`; `stef deploy bar --dev` selects `stef.bar.dev`. Removing the dev variant selects the bar that was selected before it.

### Configuration

From `shell.json` `bar`:

- `position`: `top`, `bottom`, `left` or `right`, as in the stock bar.
- `layout.left`, `layout.center`, `layout.right`: the entries. A string is an id; an object needs an `id`, the other keys are its inline settings. Anything else is dropped. The tray (`omarchy.tray`) always goes to the inner end of its section: first in `right`, last in `left` and `center`.
- `centerAnchor`: an id in `center`. When present, that entry sits in the exact centre of the body, the entries before it to its left, the entries after it to its right. Otherwise the centre section as a whole is centred.
- `transparent`: the body has no container colour; the segments keep theirs ([Colour](#colour)). On a vertical bar, which has no segments, the content sits on the wallpaper: the text colour follows the stock contrast probe (`omarchy-bar-text-color`), and the content gets a legibility shadow.

Dragging an entry reorders the layout, dragging the bar's centre moves it to another edge, and a double-click on the centre toggles transparency, all as in the stock bar.

A change that only touches inline settings of widgets updates the live widgets. Any other change rebuilds the sections.

### Entries

| Entry                                           | Becomes                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `type` set                                      | that type                                                                                  |
| `exec` set                                      | a command module                                                                           |
| `source` set                                    | a QML module from that path (`~/` and `$HOME/` expanded)                                   |
| a widget id                                     | the widget                                                                                 |
| an id with no widget, no `exec` and no `source` | a QML module from `~/.config/omarchy/bar/modules/<id>.qml` if the id is safe, else nothing |

A safe id has no `..` and doesn't start with `/`.

A hosted widget gets `bar`, `moduleName` (its id) and `settings` (its inline settings). A stock widget gets the bar itself as `bar`, like under the stock bar, so it keeps the shell services it uses. Other widgets and QML modules get a `PluginBarApi`, scoped to their own popups and click targets.

### Command modules

A command module runs `bash -lc <exec>` every `interval` seconds (default 5, at least 1), starting at once; a run never starts while the previous one is still running. Its output is read as Waybar JSON: the last line, parsed as JSON, gives `text`, `tooltip` and `class` (or `alt`). Output that isn't JSON is all text. Empty output is nothing. The button shows `text` (or the entry's `text`), the tooltip is the output's `tooltip` or the entry's, and it is active (primary) when the class is `active` or a list with `active`. `onClick`, `onRightClick` and `onMiddleClick` run with `bash -lc`.

### Panels

A widget with `open()`, `close()` and `opened` is a panel widget. Only one popup is open at a time: opening one closes the other. The shell's summon, hide and toggle for a bar widget, and `togglePanelAt(section, n)` (the n-th panel widget of a section, from 1), reach these. With a bar on several screens, an open copy wins, then the copy on the focused monitor, then one that is drawn.

### Hidden

`omarchy-toggle-bar` hides and shows the bar: the toggle file `~/.local/state/omarchy/toggles/bar-off`, then the `omarchy.bar` IPC call `syncHidden`. A hidden bar keeps its window but moves it off its edge and gives up its exclusive zone.

### Following the focus area

Periphery announces its focus area on Hyprland's event socket (Periphery's SPEC.md, Focus area announcements): `custom>>periphery>>x0,x1,monitor` while on, `custom>>periphery>>off` when off. On that monitor's bar window, when the bar is at the top or bottom, the body moves to where windows tile in the focus area: `[x0, x1]` (global pixels, made local to the screen) inset by Hyprland's outer gaps (`general:gaps_out`, left and right), on the spatial default spring. Floating, the body is a pane on the same grid as the windows (interpretation `bar.focus-area`): it sits the layout margin from the screen edge (Hyprland's outer gap on that edge, as windows sit from the screen's sides), and the windows sit the layout spacer below it (Hyprland's `gaps_in` top plus bottom, the distance between two windows). So the bar window is margin + `barSize` high, and its exclusive zone is `barSize` + spacer: windows tile the outer gap below the zone, one spacer below the body. Both follow Studio's Layout tokens (margin, spacer, density) through Hyprland's gaps. A hidden bar parks its whole window, margin included, past its edge. On other monitors, on a vertical bar, and when off, it spans the window. At start the bar asks for the current state (`periphery_announce`).

The body moves by fractions of a pixel and lands on whole pixels. While it moves, each section (left, right, and each piece of the centre) is drawn as one layer that moves smoothly with its segments: the stock widgets' text is hinted to whole pixels, and would otherwise step on its own, out of step with its segment and the other sections. The centre's pieces are centred to whole pixels only at rest. At rest nothing is layered.

While narrowed, the body has the full corner (a pill). Pointer input reaches only the body.

### Segments

The widgets sit in segments, like ChromeOS's shelf: each group of widgets is an M3 connected button group (interpretation `bar.segments`).

- **Groups.** A section is one group. An entry's inline `"group": "<name>"` splits it: consecutive visible entries with the same group (an entry without one belongs to its section's) form one group. Hidden widgets (no width) take no part.
- **Pieces.** In a group, each text widget is a segment of its own. Consecutive icon widgets share one: a widget is an icon widget when its content is no wider than one icon button (the theme's icon slot), and the tray and the indicators (rows of icon buttons) are too. Every icon button in the bar is an M3 extra-small icon button of `tokens.bar.iconWidth` (narrow, default or wide), with a 20dp icon, both scaled with Omarchy's text size (interpretation `bar.icons`, written by the theme). So agents, bluetooth, network, audio, monitor and power make one segment; clock and weather two connected ones.
- **Shape** (`tokens.bar.shape`, `tokens.bar.size`, Studio's Bar). Round: a group's outer corners are fully round, the corners between its segments the connected button group's inner corner for the size (4dp extra-small). Square: that corner everywhere. Icons sharing a segment have no corner or gap between them.
- **Spacing.** `tokens.bar.gap` (the spec's 2dp) is the gap between two segments of a group, and between a segment and the bar's top and bottom. `tokens.bar.padding` is the space at both ends of a text segment, before its first and after its last content (on top of the widgets' own margins). An icon segment has none: its icon buttons' own width, the spec's space either side of the icon, spaces it. Two groups are the layout spacer apart (Hyprland's `gaps_in` top plus bottom, as between two windows). Docked, the first and last segment sit `tokens.bar.inset` (an md.sys.measurement step, `space50` by default: half the stock bar's section margin) from the screen's left and right edges; floating, none, so they line up with the windows' outer edges. Every widget's slot is a whole number of pixels wide, so the gaps stay even after a widget with a fractional width (the clock's text).
- **Size changes.** When a widget's width changes (the indicators revealing, the clock's text, a widget appearing), its slot and its segment grow or shrink to the new width on the spatial default spring, in whole pixels, and the widgets after it move along. The content keeps its own width throughout, pinned to the side of the slot that faces the section's anchor: the start in the left section and after the centre's anchor, the end in the right section and before the centre's anchor, centred for the anchor itself and an unanchored centre. While the slot is narrower than its content, it clips it, so the content is revealed or covered from the growing side. A widget that empties (an indicator turning off) keeps its segment's last shape while the slot shrinks to nothing. A slot doesn't animate during its first second, while the bar starts. Not on a vertical bar.
- **Drawers.** On a horizontal bar the indicators (`omarchy.indicators`) and the tray (`omarchy.tray`) are drawers: they always lay out all their content, and hide its start (the inactive indicators; the tray's unpinned icons) while closed. A drawer's segment starts with a knob, then what shows of the content. The knob is not a button: `more_horiz` (`nf-md-dots_horizontal`) in `on-surface-variant`, an icon button's width like every icon in the bar (interpretation `bar.icons`), with no state layer, no tooltip, no pointer cursor and no left click; a right click on the tray's knob opens its icon manager, as its stock chevron did. The drawer's buttons don't reach into the knob: their state layers, and a lone button's, start after it, with the connected button group's inner corner there. Hovering the segment (the knob or the content) opens the drawer; it closes 120 ms after the pointer leaves the segment, each monitor's on its own. Opening and closing are one motion on the spatial spring (Size changes): the slot widens to the whole content or narrows to what shows while closed (`drawerWidth`); the content keeps its place against the section's anchor and comes out from under the knob, or goes back under it. Nothing fades or snaps. The knob shows while the drawer hides something or is open; a drawer that hides nothing (every indicator on, every tray icon pinned) has none. Because the segment never disappears while it has a knob, its neighbours' corners don't change as it opens. Hovering the rest of the centre doesn't open the indicators.
- **Forked widgets.** stef.bar draws four stock widgets from its own forks (`qml/*Widget.qml`, from `upstream/widgets/`): the menu and the workspaces as icon buttons (the workspaces a row of them, sharing a segment with no gaps), the indicators and the tray as drawers. The tray's icons are the bar's icon size. Everything else about them is stock; a vertical bar keeps their stock behaviour.
- **The tray** reserves the width of its open drawer. Its segment starts where the drawer is drawn, so it grows and shrinks as the drawer opens and closes.
- **Hover.** Each widget in a segment has an M3 state layer: `on-surface` at the hover opacity while the pointer is over it, the pressed opacity while pressed, in the segment's corners. A widget made of several buttons lights up only the button under the pointer, and shows the pointer cursor over each. Its buttons are the click targets it registers with the bar (the workspaces' numbers, the tray's chevron) and the pointer-cursor mouse areas it handles itself (the tray's app icons), leaving out any its own clipping hides (icons in the tray's closed drawer). The lit button spans its own extent, the first and last reaching the segment's ends, with the connected button group's inner corner between buttons. The gap between two buttons belongs to the nearer one (split at its middle), for hover and the pointer cursor, and for clicks on registered click targets, so moving along the buttons never lights up the whole widget or flickers.

### Colour

| Bar         | Docked (full width)                                                                               | Floating (narrowed to the focus area)                            |
| ----------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Opaque      | body: the app bar's `surface` (the theme's `[bar] background`); segments `surface-container-high` | body: none; segments: the floating toolbar's `surface-container` |
| Transparent | body: none; segments `surface-container-high`                                                     | as opaque                                                        |

- Text is `on-surface` throughout: docked the theme's `[bar] text`, floating from the same colour roles as the segments.
- The colours change between docked and floating on the effects default spring.
- Nothing floating has elevation. The spec allows that over a visually distinct background (the segments float over the wallpaper), and a shadow wouldn't fit: the bar window ends right below the body, because the stock popups place themselves from its height.
- The legibility shadow (not M3, interpretation `bar.transparent`) sits behind all of the body's content, glyphs and icons alike: offset 1 px down, blurred 3 px, at 0.5 opacity, in black or white, whichever contrasts more with the bar's text colour (`barForeground`). It is drawn only while the content sits on the wallpaper: a transparent vertical bar. A transparent horizontal bar keeps its segments, so its text is on-surface on them, with no probe and no shadow.

## Architecture

| Layer | Where                            | Does                                                                                                                                |
| ----- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Logic | `src/model/`                     | Pure, ours: the focus area and the body's geometry.                                                                                 |
| Fork  | `qml/Bar.qml`, `qml/BarModel.js` | The stock bar, kept close to upstream (`upstream/`), with our changes layered on: M3 colours and tooltip, the body, the focus area. |

### The bar contract

The shell calls the bar (as `shell.bar`) and stock widgets use it as `bar`. The bar provides what the stock bar provides:

- for the shell: `summonBarWidget`, `hideBarWidget`, `isBarWidgetOpen`, `toggleTransparency`, `debugBarGeometry`, `panelWidgetIdAt`, `barHidden`, `barSize`, `fontFamily`, `position`, `barConfig`, and the `omarchy.bar` IPC target with `syncHidden`;
- for widgets: `foreground`, `barForeground`, `background`, `urgent`, `fontFamily`, `position`, `vertical`, `barSize`, `foregroundAnimationEnabled`, `transparent`, `run`, `showTooltip`, `hideTooltip`, `registerClickTarget`, `unregisterClickTarget`, `clickTargets`, `targetBelongsToWindow`, `requestPopout`, `releasePopout`, `activePopout`, `switchPanelFrom`, `moduleWidgets`, `layoutConfig`, `centerSectionRevealHeld`, `centerHoverRevealSuppressed`, `setCenterHoverRevealSuppressed`, `shell`.

### Layer surface

| Namespace     | Layer | Size                       | Exclusive zone              | Input    |
| ------------- | ----- | -------------------------- | --------------------------- | -------- |
| `omarchy-bar` | Top   | full width, `barSize` high | `barSize`, none when hidden | the body |

The namespace is the stock bar's: the flyout blur rule and other rules match it. Popups (`PopupCard`, `KeyboardPanel`) assume the window spans its edge; only the body narrows.

## Out of scope (milestone 1)

- M3 versions of the widgets (later milestones).
- Narrowing a vertical bar.
