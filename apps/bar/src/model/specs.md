# Model (`src/model`)

The bar's own decisions, without Qt: Periphery's focus area and where the body goes. Everything the stock bar decides stays in the fork (`qml/Bar.qml`, `qml/BarModel.js`). Pure: plain values in, plain values out. Terms as in [SPEC.md](../../SPEC.md#ubiquitous-language).

## Focus area

`parseFocusEvent(data)`: the data of a Hyprland `custom` event.

- `periphery>>off` → `{ on: false }`.
- `periphery>>x0,x1,monitor` with `x0 < x1` whole numbers and a monitor name → `{ on: true, x0, x1, monitor }`.
- Anything else (other custom events included) → `null`: not about the focus area.

`bodyGeometry(focus, screen)`, `screen` `{ name, x, width }`: the body's `{ x, width, narrowed }` in screen-local pixels. The focus area on this screen (same monitor name) gives `x = x0 − screen.x`, `width = x1 − x0`, clamped to the screen, `narrowed: true`. Otherwise (off, another monitor, `null`) the whole screen: `{ x: 0, width: screen.width, narrowed: false }`.

## Legibility shadow

`legibilityShadow(text)`: the shadow colour for text of colour `text` (`#rrggbb`, or `#aarrggbb` with the alpha ignored): `"#000000"` or `"#ffffff"`, whichever has the higher WCAG contrast ratio with the text; black on a tie. A colour that can't be read gives black.
