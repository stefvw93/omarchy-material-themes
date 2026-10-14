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

`gapsOutOf(output)`: Hyprland's outer gaps from the output of `hyprctl -j getoption general:gaps_out` (a JSON object whose `css` is CSS shorthand): `[top, right, bottom, left]`. Output that isn't such JSON, or a `css` that isn't 1 to 4 numbers, gives `[0, 0, 0, 0]`.

## Legibility shadow

`legibilityShadow(text)`: the shadow colour for text of colour `text` (`#rrggbb`, or `#aarrggbb` with the alpha ignored): `"#000000"` or `"#ffffff"`, whichever has the higher WCAG contrast ratio with the text; black on a tie. A colour that can't be read gives black.
