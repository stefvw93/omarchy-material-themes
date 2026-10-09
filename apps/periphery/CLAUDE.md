# Periphery exposé: rules

An Omarchy shell plugin (Quickshell/QML) with a Hyprland Lua hook, built with `@stef/plugin-kit` as one app of the `omarchy-stef` monorepo. [README.md](README.md) covers install, [SPEC.md](SPEC.md) the product behaviour and its ubiquitous language. These rules are not final: they grow with every new pattern, library or edge case.

## Meta-rules

- Discuss new rules and rule changes Q&A style: ask one question, wait for the answer, then the next.
- When a rule here and the code disagree, stop and ask which one is right.

## Architecture

Three layers, each with one job:

| Layer    | Where                        | Does                                                                                                                                       |
| -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Logic    | `src/<module>/` (TypeScript) | Pure functions: layout, navigation, string building, parsing. No Qt, Quickshell, Hyprland or `hl`. Everything testable lives here.         |
| Shell    | `qml/*.qml`                  | State, layer surfaces, animations, input, and the wiring between Hyprland and the logic. Imports the logic as `import "lib/<module>.mjs"`. |
| Hyprland | `hypr/hypr.lua`              | The hook loaded by `~/.config/hypr/hyprland.lua`: wraps actions, holds the selection state Hyprland needs.                                 |

- New logic goes in `src/`, not in QML functions. When QML code grows a decision or a computation, move it to `src/` first.
- `plugin.config.ts` declares the plugin; `vp run build` assembles `dist/prod/stef.periphery/` (manifest, QML, `lib/*.mjs`, `hypr.lua`), `vp run build:dev` a side-by-side `stef.periphery.dev`. `dist/` is build output: never edit or commit it.
- Never use the plugin id as a literal. QML reads it from the generated `lib/meta.mjs` (`Meta.pluginId`); `hypr.lua` from its `local PLUGIN_ID = "…" -- plugin-kit:id` line, which the build rewrites.
- `~/.config/omarchy/plugins/stef.periphery/` is a deploy target, not a repo. Never edit it: the shell reloads plugins on any write under `~/.config/omarchy/plugins/`.
- Quickshell's QML engine is roughly ES2017 with gaps: see `packages/effect-platform-qml/SPIKE.md`. `src/` type-checks against the es2017 lib, and plugin-kit bundles with the shims and lowering from `@stef/effect-platform-qml/build`.

## Workflow per change

In this order. Don't skip a step; say so if a step doesn't apply.

1. **Spec.** Discuss the change, then update the module's `src/<module>/specs.md` (and SPEC.md for product behaviour). Plain English, short sentences, SPEC.md's terms.
2. **Declare.** Write the API surface in `src/<module>/<module>.ts` with `declare` (types and signatures, no bodies).
3. **Test.** Write tests in `<module>.test.ts` against the spec, not against the code. Run them: they must fail.
4. **Implement.** Replace the `declare`s until the tests pass. The signatures stay as declared; if they must change, go back to step 2.
5. **Validate.** `vp run verify` until clean.
6. **Wire and deploy.** Change the QML, `vp run build`, then deploy (until the `stef` CLI lands: `rsync -a --delete dist/prod/stef.periphery/ ~/.config/omarchy/plugins/stef.periphery/`), `omarchy restart shell`, toggle the mode (`omarchy-shell shell toggle stef.periphery '{}'`).
7. **Hand-check.** Hover, clicks, drags and keys can't be tested from here (below). Don't wait for them: carry on, and list them at the end of the report, saying exactly what to try and what should happen. Never claim they work.

When a test disagrees with the spec, fix the test. When the spec disagrees with what the user wants, stop and ask.

## Validation

From this directory, `vp test run` runs Vitest (`src/**/*.test.ts`) and `vp run verify` runs `plugin-kit check`:

| Check   | What                                                                    |
| ------- | ----------------------------------------------------------------------- |
| build   | `dist/prod/stef.periphery`, manifest validated against Omarchy's rules. |
| qml     | Qt 6 qmllint on the built QML. Any warning fails.                       |
| bundles | Every `lib/*.mjs` loads in Quickshell's QML engine (headless `qs`).     |
| lua     | `luac -p` on the hook, then `tests/*.test.lua`.                         |

From the repo root, `vp check` covers format, lint and types, and `vp run ready` runs everything for every app.

## Code style

- TypeScript: the monorepo's Oxfmt settings (`vp fmt`). `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` (from `@stef/config`).
- QML: `pragma ComponentBehavior: Bound`; qualify ids (`root.x`, `card.host.x`), never rely on scope lookup. A line qmllint can't type (theme singletons, `lib/*.mjs` calls, `PanelWindow`) gets a same-line `// qmllint disable <category>`, nothing broader.
- QML: hand-formatted, no formatter. 2 spaces, no semicolons, compact one-line functions where they fit. Match the surrounding code.
- Lua: match `hypr/hypr.lua`.
- Comments say why, not what. Match the comment density of the file.

## Live testing limits

- Cursor warps (`hl.dsp.cursor.move`) give a surface only an _enter_; motion inside a surface is not delivered. Hover between cards can't be tested with warps.
- `wtype` key events don't trigger Hyprland binds here.
- `hyprctl eval` returns only "ok": read values back with `error(...)`.
- Allowed while testing: open throwaway windows, move windows, switch workspaces, move the cursor, restart the shell, toggle the mode, `hyprctl reload`. The user may be using the desktop at the same time, so keep it short and put things back.
- Never close a window I didn't open myself, above all the terminal running this session. Before any close, check the target address is a throwaway window.

## Git

- Commit once a change is done and checks are green: one commit per coherent change. Push only when the user asks.
- Message style: a short summary line, then a plain paragraph on what and why. No attribution lines.
- History before the monorepo lives in github.com/stefvw93/omarchy-periphery: `main`, and `planned-flight` (keys rebound to the plugin, crossfade hand-off), an earlier approach kept for reference. Don't port to it unless asked.
