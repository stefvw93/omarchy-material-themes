# Omaterial (`stef.omaterial`)

A shell service for Omaterial themes. An Omaterial theme pins every type size to the Material 3 type scale, so Omarchy's text size (`omarchy display text size`, or the slider in the monitor panel) would change nothing. This service applies it: when the text size or the theme changes, it multiplies the theme's type sizes by `base-size / 12` (and `tokens.type.scale`) and grows the containers that hold text (bar, controls, menu rows, Hyprland's group bar) by their line's extra height. Padding and icons stay the same.

The rules are the interpretation `text.scale` (`apps/studio/docs/m3-interpretations.md`); the sizes come from the theme's `omaterial.json` (`text`). Under other themes it does nothing.

## Configuration

- `~/.config/omarchy/shell.json`: `{ "id": "stef.omaterial" }` in `plugins`.
