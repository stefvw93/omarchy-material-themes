# omarchy-stef

Omarchy customisations in one Vite+ monorepo: Material You theming, two Quickshell plugins, and the tooling they share. TypeScript and Effect throughout, including inside the plugins' QML.

| Workspace                        | What                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| `apps/studio`                    | **Omaterial Studio**: Tauri app that generates and applies Material You themes              |
| `apps/expo`                      | `stef.expo`, the Mission Control style exposé (formerly `stef.overview`)                    |
| `apps/periphery`                 | `stef.periphery`, the widescreen periphery exposé, with a Hyprland Lua hook                 |
| `tools/cli`                      | `stef`: build, check, deploy, develop, smoke-test the plugins; tokens; Hyprland fixtures    |
| `packages/theme-engine`          | Material scheme generation and Omarchy theme file writers                                   |
| `packages/tokens`                | Shared design tokens (gaps, borders, blur, motion, plugin layout) and their emitters        |
| `packages/motion`                | Material 3 springs: step response, Hyprland damping, CSS easing                             |
| `packages/qml-kit`               | Logic and QML shared by the plugins, bundled into each as `lib/kit.mjs`                     |
| `packages/plugin-kit`            | Builds a plugin folder from `plugin.config.ts` and checks it in the real QML engine         |
| `packages/hyprland`              | Hyprland as an Effect service: typed queries, Lua eval, events; Node and fixture transports |
| `packages/omarchy`               | Omarchy as Effect services: paths, shell IPC, plugin install, the Hyprland hooks file       |
| `packages/effect-platform-qml`   | Running Effect inside Quickshell's QML engine (see its SPIKE.md)                            |
| `packages/effect-platform-tauri` | Effect platform services backed by Tauri                                                    |
| `packages/config`                | Shared tsconfig bases and lint preset                                                       |

## Commands

```bash
vp install && vp config        # dependencies and git hooks
vp run ready                   # format, lint + types, all tests, all builds, plugin checks
pnpm stef list                 # plugin apps and which variant is live
pnpm stef deploy periphery     # build and install a plugin (add --dev for <id>.dev)
pnpm stef dev expo             # live dev variant in the real shell; Ctrl+C restores prod
pnpm stef harness expo         # the dev build in its own qs process
pnpm stef smoke periphery      # live checks against the running session
pnpm stef tokens set gaps.inner 6   # design tokens; plugins pick them up live
```

## How plugins are built

Each plugin app has a `plugin.config.ts`. `@stef/plugin-kit` turns it into a folder Omarchy loads: a validated `manifest.json`, the QML, TypeScript bundled for Quickshell's engine (`lib/*.mjs`, with `lib/kit.mjs` from `@stef/qml-kit`), a generated `lib/meta.mjs` with the plugin id, `Tokens.qml`, and the Hyprland hook. The id is never a literal, so a dev build (`stef.x.dev`) runs beside prod.

Hooks load from `~/.config/hypr/stef/plugins.lua`, which `stef` generates with exactly one hook per plugin (the live variant's). `pnpm stef hooks install` points `hyprland.lua` at it.
