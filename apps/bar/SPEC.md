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
- `transparent`: the body has no container colour; the text colour follows the stock contrast probe (`omarchy-bar-text-color`).

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

Periphery announces its focus area on Hyprland's event socket (Periphery's SPEC.md, Focus area announcements): `custom>>periphery>>x0,x1,monitor` while on, `custom>>periphery>>off` when off. On that monitor's bar window, when the bar is at the top or bottom, the body moves to `[x0, x1]` (global pixels, made local to the screen) on the spatial default spring. On other monitors, on a vertical bar, and when off, it spans the window. At start the bar asks for the current state (`periphery_announce`).

While narrowed, the body has the full corner (a pill). Pointer input reaches only the body.

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
