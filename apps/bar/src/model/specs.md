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

## Segments

`segmentPlan(items, section)`, `items` in layout order `{ group?, visible }`: for each item, how its segment is drawn, `{ visible, roundStart, roundEnd, gapAfter }`.

- An item's group is its `group` when it is a non-empty string, else `section`.
- Hidden items get `{ visible: false, roundStart: false, roundEnd: false, gapAfter: false }` and are skipped for everything else: the visible items before and after a hidden one are neighbours.
- `roundStart`: no visible item before it in the same group (the group's first); `roundEnd`: no visible item after it in the same group (the group's last).
- `gapAfter`: the next visible item exists and is in another group.

`entryKey(entry)`: an entry's content as a string that doesn't depend on key order (objects' keys sorted, at every depth), so an entry and a copy of it with reordered keys (as a QML Repeater hands its delegates) give the same key.

`segmentCorners(plan, shape, height, corner)`: the four corner radii `{ topLeft, topRight, bottomLeft, bottomRight }` of a segment `height` high, in a horizontal bar (start is left). Round shape: `height / 2` on the rounded ends, 0 inside the group. Square shape: `corner` everywhere.

## Legibility shadow

`legibilityShadow(text)`: the shadow colour for text of colour `text` (`#rrggbb`, or `#aarrggbb` with the alpha ignored): `"#000000"` or `"#ffffff"`, whichever has the higher WCAG contrast ratio with the text; black on a tie. A colour that can't be read gives black.
