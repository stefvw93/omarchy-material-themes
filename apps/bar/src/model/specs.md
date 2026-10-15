# Model (`src/model`)

The bar's own decisions, without Qt: Periphery's focus area and where the body goes. Everything the stock bar decides stays in the fork (`qml/Bar.qml`, `qml/BarModel.js`). Pure: plain values in, plain values out. Terms as in [SPEC.md](../../SPEC.md#ubiquitous-language).

## Focus area

`parseFocusEvent(data)`: the data of a Hyprland `custom` event.

- `periphery>>off` → `{ on: false }`.
- `periphery>>x0,x1,monitor` with `x0 < x1` whole numbers and a monitor name → `{ on: true, x0, x1, monitor }`.
- Anything else (other custom events included) → `null`: not about the focus area.

`bodyGeometry(focus, screen, edges)`, `screen` `{ name, x, width }`, `edges` `{ left, right, margin }`: the body's `{ x, width, margin, narrowed }` in screen-local pixels.

- The focus area on this screen (same monitor name) narrows the body to where windows tile in it: from `x0 + left` to `x1 − right` (`left`, `right`: Hyprland's outer gaps), made local to the screen and clamped to it, never narrower than 0. `margin` is `edges.margin` (the floating toolbar's distance from the screen edge), `narrowed: true`.
- Otherwise (off, another monitor, `null`) the whole screen: `{ x: 0, width: screen.width, margin: 0, narrowed: false }`.

`cssGapsOf(output)`: Hyprland's gaps from the output of `hyprctl -j getoption general:gaps_out` (or `general:gaps_in`), a JSON object whose `css` is CSS shorthand: `[top, right, bottom, left]`. Output that isn't such JSON, or a `css` that isn't 1 to 4 numbers, gives `[0, 0, 0, 0]`.

`floatingEdges(gapsOut, gapsIn, position)`: what the floating body keeps from its surroundings, `{ left, right, margin, spacer }`: `left` and `right` are the outer gaps on those sides; `margin` the outer gap on the bar's edge (top, or bottom for a bottom bar); `spacer` the distance between two windows stacked vertically, `gapsIn` top + bottom.

`exclusiveZone(barSize, body, spacer)`: `barSize` docked; floating (`body.narrowed`), `barSize + spacer`, so windows tiled the outer gap below the zone sit one spacer below the body (which sits the margin from the edge, and the outer gap on that edge is the margin).

## Transparency

`transparency(transparent, vertical)`: what a transparent bar keeps, `{ segmented, onWallpaper }`.

- `segmented`: the widgets sit in segments: on every horizontal bar, transparent or not. A vertical bar has none.
- `onWallpaper`: the content sits straight on the wallpaper, with no body or segment behind it, so its text takes the stock contrast probe's colour and gets the legibility shadow: only a transparent vertical bar. A transparent horizontal bar drops only the body's colour; its text stays on-surface on the segments.

## Segments

`segmentPlan(items, section)`, `items` in layout order `{ group?, visible, icon, alone? }`: for each item, how its part of a segment is drawn, `{ visible, start, end, gapAfter }`.

- An item's group is its `group` when it is a non-empty string, else `section`.
- Hidden items get `{ visible: false, start: "join", end: "join", gapAfter: false }` and are skipped for everything else: the visible items before and after a hidden one are neighbours.
- `start` and `end` say what is at that side of the item, against its visible neighbour on that side:
  - `"outer"`: no neighbour in the same group (the group's first or last);
  - `"join"`: a neighbour in the same group, and both are icon items, neither `alone`: they share one segment;
  - `"inner"`: otherwise, a neighbour in the same group in another segment.
- `gapAfter`: the next visible item exists and is in another group.

`segmentCorners(plan, shape, height, corner)`: the four corner radii `{ topLeft, topRight, bottomLeft, bottomRight }` of an item's part, `height` high, in a horizontal bar (start is left). At an `"outer"` side: `height / 2` for the round shape, `corner` for the square one. At an `"inner"` side: `corner`. At a `"join"` side: 0.

`buttonStateLayer(part, buttons, index, innerCorner)`: where a widget with several buttons (the workspaces) draws the state layer of its `index`-th button, so each button lights up on its own. `part` is the widget's part of its segment, `{ width, corners }`; `buttons` are its buttons' extents in the part, `{ x, width }`, ordered from the start. The layer spans the button's own extent, except that the first button's reaches back to the part's start and the last button's on to the part's end (over the segment's padding), taking the part's corners there. Its other sides take `innerCorner`, the connected button group's inner corner. A lone button spans the whole part. An index outside `buttons` gives `null`.

`stateLayerPart(part, start, innerCorner)`: the part of a segment part (`{ width, corners }`) that its state layers may cover, `{ x, width, corners }`, when its first `start` pixels belong to something that has none (the indicators' knob). With `start` 0 or less, the whole part in its own corners. Otherwise it runs from `start` to the part's end (never narrower than 0), with `innerCorner` at its start and the part's own corners at its end. `buttonStateLayer` then takes it as the part, with the buttons' `x` made relative to its start.

`nearestButton(buttons, x)`: which of a widget's buttons (extents `{ x, width }` ordered from the start, as for `buttonStateLayer`) a point `x` along the widget belongs to, so the gaps between buttons have no dead zone: each gap is split at its midpoint between its two buttons, and everything before the first button or after the last belongs to that button. No buttons gives -1.

`contentX(pin, width, full, startPad)`: where a widget's content sits in its slot while the slot's width moves to a new width. `width` is the slot's current width, `full` the width at which the whole content shows (the content's own width plus what comes before and after it: paddings, the knob, the gap after), `startPad` what comes before the content. The content keeps its own width (`full` minus those) and is pinned by `pin`:

- `"start"`: at `startPad`;
- `"end"`: so its end stays where it ends at `full`: `width − full + startPad`;
- `"center"`: halfway between: `startPad + (width − full) / 2`, rounded to a whole pixel.

At `width = full` every pin gives `startPad`. A drawer that hides part of its content settles narrower than `full` (`drawerWidth`); pinned to the end, its hidden part then sits before `startPad`, under the knob.

`drawerWidth(full, hiddenExtent, revealed)`: the width a drawer's slot settles at: `full` while revealed, else `full − hiddenExtent`, never below 0. A widget that hides nothing has `hiddenExtent` 0.

`standsAlone(id)`: whether a widget is always a segment of its own, even among icon items: the workspaces (`omarchy.workspaces`), a control of their own, set off from the menu beside them.

`isIconItem(contentWidth, iconWidth, id)`: whether a widget counts as an icon item: its content is no wider than `iconWidth` (one icon button, the theme's icon slot), or it is a row of icon buttons: the tray (`omarchy.tray`), the indicators (`omarchy.indicators`) or the workspaces (`omarchy.workspaces`). A widget with no width is not.

## Icon buttons

`isSingleGlyph(text)`: whether a button's text is one glyph: one code point, a surrogate pair included. Empty text and anything longer (a percentage beside an icon) is not.

`glyphFontSize(iconSize, extentPerPx)`: the font size at which a glyph fills a Material icon's live area at `iconSize`: 20 of the icon's 24 grid units, so `iconSize × 20 / 24`. `extentPerPx` is the glyph's visible extent (the larger of its tight width and height) per pixel of font size. Rounded to a whole pixel; `iconSize` when the extent is unknown (0 or less).

`entryKey(entry)`: an entry's content as a string that doesn't depend on key order (objects' keys sorted, at every depth), so an entry and a copy of it with reordered keys (as a QML Repeater hands its delegates) give the same key.

## Legibility shadow

`legibilityShadow(text)`: the shadow colour for text of colour `text` (`#rrggbb`, or `#aarrggbb` with the alpha ignored): `"#000000"` or `"#ffffff"`, whichever has the higher WCAG contrast ratio with the text; black on a tie. A colour that can't be read gives black.
