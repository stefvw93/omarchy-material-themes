# Exposé (`stef.expo`)

A Mission Control style overview for Omarchy: one miniature per occupied workspace, with live window thumbnails. It used to be the `stef.overview` plugin.

## Keys

| Key                               | Action                                          |
| --------------------------------- | ----------------------------------------------- |
| `SUPER + SHIFT + SPACE`           | Toggle (bound in `~/.config/hypr/bindings.lua`) |
| `Esc`, or a click on the backdrop | Close                                           |
| `←` / `→`                         | Previous / next window in reading order         |
| `↑` / `↓`                         | Move spatially                                  |
| `Enter` / `Space`                 | Focus the selected window                       |
| `1`–`9`                           | Jump to a workspace                             |

## Configuration

- `~/.config/omarchy/shell.json`: `{ "id": "stef.expo" }` in `plugins`.
- `~/.config/hypr/bindings.lua`: `omarchy-shell shell toggle stef.expo '{}'`.
- `~/.config/hypr/looknfeel.lua`: `hl.layer_rule({ match = { namespace = "omarchy-expo" }, blur = true })` for the blurred backdrop.

## Development

From this directory: `vp run build` builds `dist/prod/stef.expo`, `vp run build:dev` builds `stef.expo.dev`, and `vp run verify` lints the QML and loads the bundles in Quickshell's engine.

## Tokens

Spacing, staggers and springs come from the shared design tokens (`@stef/tokens`). Override any of them in `~/.config/omarchy/stef/tokens.json`, e.g. `{ "expo": { "tileGap": 32 }, "motion": { "scheme": "expressive" } }`. An open exposé picks the change up live.
