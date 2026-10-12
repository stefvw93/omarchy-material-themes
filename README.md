# omarchy-stef

Omarchy customisations in one Vite+ monorepo: Material 3 theming built from the spec, Quickshell plugins, and the tooling they share. TypeScript and Effect throughout, including inside the plugins' QML.

| Workspace                        | What                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `apps/studio`                    | **Omaterial Studio**: Tauri app that generates and applies Material 3 themes, and edits the tokens                       |
| `apps/expo`                      | `stef.expo`, the Mission Control style exposé (formerly `stef.overview`)                                                 |
| `apps/periphery`                 | `stef.periphery`, the widescreen periphery exposé, with a Hyprland Lua hook                                              |
| `apps/omaterial`                 | `stef.omaterial`, a shell service that scales an Omaterial theme with Omarchy's text size                                |
| `tools/cli`                      | `stef`: build, check, deploy, develop, smoke-test the plugins; tokens; Hyprland fixtures                                 |
| `packages/m3`                    | The Material 3 spec: snapshot extract, generated tokens, resolution, citations and interpretations                       |
| `packages/theme-engine`          | Material 3 palettes and static colours, and the Omarchy theme file writers                                               |
| `packages/tokens`                | `tokens.json` v2: the user's M3 choices (steps, density, type scale, motion scheme), text scaling, the Hyprland emitter  |
| `packages/motion`                | Material 3 springs: step response, Hyprland damping, CSS easing                                                          |
| `packages/qml-kit`               | Logic and QML shared by the plugins (`resolveM3`, `Scheme.qml`, `SpringValue.qml`, `RoundedClip.qml`), bundled into each |
| `packages/plugin-kit`            | Builds a plugin folder from `plugin.config.ts` and checks it in the real QML engine                                      |
| `packages/hyprland`              | Hyprland as an Effect service: typed queries, Lua eval, events; Node and fixture transports                              |
| `packages/omarchy`               | Omarchy as Effect services: paths, shell IPC, plugin install, the Hyprland hooks file                                    |
| `packages/effect-platform-qml`   | Running Effect inside Quickshell's QML engine (see its SPIKE.md)                                                         |
| `packages/effect-platform-tauri` | Effect platform services backed by Tauri                                                                                 |
| `packages/config`                | Shared tsconfig bases and lint preset                                                                                    |

## Commands

```bash
vp install && vp config        # dependencies and git hooks
vp run ready                   # format, lint + types, all tests, all builds, plugin checks
pnpm stef list                 # plugin apps and which variant is live
pnpm stef deploy periphery     # build and install a plugin (add --dev for <id>.dev)
pnpm stef dev expo             # live dev variant in the real shell; Ctrl+C restores prod
pnpm stef harness expo         # the dev build in its own qs process
pnpm stef smoke periphery      # live checks against the running session
pnpm stef tokens set shape.windowCorner large   # M3 token choices; plugins pick them up live
vp run m3-generate             # in packages/m3: regenerate tokens and docs/m3-interpretations.md
vp run kit-generate            # in packages/qml-kit: regenerate the plugins' M3 data
vp test -u                     # in apps/studio: regenerate src/m3/m3.generated.css (and goldens)
```

## Material 3

Every themed value traces to the spec: a token, a quoted sentence (`packages/m3/src/citations.ts`), or a registered interpretation where the spec is silent (`packages/m3/src/interpretations.ts`, rendered to [apps/studio/docs/m3-interpretations.md](apps/studio/docs/m3-interpretations.md)). [apps/studio/docs/theming-inventory.md](apps/studio/docs/theming-inventory.md) lists every surface with its source. The spec snapshot is in `apps/studio/docs/material-3/` (`vp run m3-spec` in `packages/m3` refreshes it).

- **Theme:** Studio turns a wallpaper into an M3 palette and writes `colors.toml`, `hyprland.lua`, the shell's sections and `omaterial.json` for Omarchy, rendered with the tokens.
- **Tokens:** `~/.config/omarchy/stef/tokens.json` holds the user's choices among spec steps (Studio's Tokens page, or `stef tokens`). Plugins follow it live.
- **Plugins:** draw from `tokens.m3` and the theme's colour roles (`Scheme.qml`), and move on the spec's springs (`SpringValue.qml`).
- **Studio:** M3 is in its Tailwind config; the shadcn components keep their classes and draw M3 colours, corners, type and shadows.

## How plugins are built

Each plugin app has a `plugin.config.ts`. `@stef/plugin-kit` turns it into a folder Omarchy loads: a validated `manifest.json`, the QML, TypeScript bundled for Quickshell's engine (`lib/*.mjs`, with `lib/kit.mjs` from `@stef/qml-kit`), a generated `lib/meta.mjs` with the plugin id, `Tokens.qml`, and the Hyprland hook. The id is never a literal, so a dev build (`stef.x.dev`) runs beside prod.

Hooks load from `~/.config/hypr/stef/plugins.lua`, which `stef` generates with exactly one hook per plugin (the live variant's). `pnpm stef hooks install` points `hyprland.lua` at it.
