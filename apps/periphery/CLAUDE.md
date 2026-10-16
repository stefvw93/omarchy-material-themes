# Periphery exposé: rules

An Omarchy shell plugin (Quickshell/QML) with a Hyprland Lua hook, built with `@stef/plugin-kit` as one app of the `omarchy-stef` monorepo. [README.md](README.md) covers install, [SPEC.md](SPEC.md) the product behaviour and its ubiquitous language. These rules are not final: they grow with every new pattern, library or edge case.

## Meta-rules

- Discuss new rules and rule changes Q&A style: ask one question, wait for the answer, then the next.
- When a rule here and the code disagree, stop and ask which one is right.
- Ask, don't assume: a choice that changes behaviour, looks, or where code lives is the user's. Ask with the options side by side, the recommended one first, and carry on with what doesn't depend on the answer.

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
3. **Test.** Write tests in `<module>.test.ts` against the spec, not against the code. Run them: they must fail. Anything you touch gets coverage, also code that had none: Vitest for `src/`, a headless `tests/*.engine.qml` for QML components (see Validation). QML wiring neither can reach gets a live check (step 7).
4. **Implement.** Replace the `declare`s until the tests pass. The signatures stay as declared; if they must change, go back to step 2.
5. **Validate.** `vp run verify` until clean.
6. **Wire and deploy.** Change the QML, then either `stef dev periphery` (the dev variant `stef.periphery.dev` runs in the real shell and rebuilds on every change; Ctrl+C puts prod back) or `stef deploy periphery`. Then `stef smoke periphery`, and after a change to flights, ghosts or cards `stef stress periphery` (about a minute of fast switching between three workspaces of its own terminals, checking every ghost and card through the `inspect` IPC call; src/inspect/specs.md).
7. **Live check.** Anything that moves on screen (flights, ghosts, cards, the hook's hiding) gets watched, not assumed: the `periphery-live-check` skill (`.claude/skills/`) has frame grids, fast-switching rounds and leftover checks. Every flight bug so far was found this way, none by unit tests.
8. **Hand-check.** Hover, clicks, drags and the focus keys can't be tested from here (below). Don't wait for them: carry on, and list them at the end of the report, saying exactly what to try and what should happen. Never claim they work.

When a test disagrees with the spec, fix the test. When the spec disagrees with what the user wants, stop and ask.

## Validation

From this directory, `vp test run` runs Vitest (`src/**/*.test.ts`) and `vp run verify` runs `plugin-kit check`:

| Check   | What                                                                    |
| ------- | ----------------------------------------------------------------------- |
| build   | `dist/prod/stef.periphery`, manifest validated against Omarchy's rules. |
| qml     | Qt 6 qmllint on the built QML. Any warning fails.                       |
| bundles | Every `lib/*.mjs` loads in Quickshell's QML engine (headless `qs`).     |
| engine  | `tests/*.engine.qml` in a headless `qs`, with the build as `plugin/`.   |
| lua     | `luac -p` on the hook, then `tests/*.test.lua`.                         |

From the repo root, `vp check` covers format, lint and types, and `vp run ready` runs everything for every app.

## Code style

- TypeScript: the monorepo's Oxfmt settings (`vp fmt`). `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` (from `@stef/config`).
- QML: `pragma ComponentBehavior: Bound`; qualify ids (`root.x`, `card.host.x`), never rely on scope lookup. A line qmllint can't type (theme singletons, `lib/*.mjs` calls, `PanelWindow`) gets a same-line `// qmllint disable <category>`, nothing broader.
- QML: hand-formatted, no formatter. 2 spaces, no semicolons, compact one-line functions where they fit. Match the surrounding code.
- Lua: match `hypr/hypr.lua`.
- Comments say why, not what. Match the comment density of the file.
- Less code wins. Before extracting a duplicate into a function or component, count: a new QML file costs 25 to 35 lines of header, properties and comments, so a 10-line duplicate used twice rarely pays. Extract when it removes lines, or when the copies have already drifted apart. Report the line count (code and tests apart) with every refactor.

## Live testing limits

- Cursor warps (`hl.dsp.cursor.move`) give a surface only an _enter_; motion inside a surface is not delivered. Hover between cards can't be tested with warps.
- `wtype` key events don't trigger Hyprland binds here. The hook wraps the dispatchers, though, so `hyprctl dispatch 'hl.dsp.focus({ workspace = "1" })'` is a routed switch, the same as `SUPER + 1`; `omarchy-shell stef.periphery flyTo <address>` is a card click.
- Every deploy restarts the shell, which turns the mode off. Read it (`hyprctl eval 'error(tostring(periphery ~= nil))'`) before toggling; never toggle blind.
- The user switching workspaces during a check starts flights of their own; what that check saw proves nothing. Rerun it.
- `hyprctl eval` returns only "ok": read values back with `error(...)`.
- Allowed while testing: open throwaway windows, move windows, switch workspaces, move the cursor, restart the shell, toggle the mode, `hyprctl reload`. The user may be using the desktop at the same time, so keep it short and put things back.
- Never close a window I didn't open myself, above all the terminal running this session. Before any close, check the target address is a throwaway window.

## Git

- Commit once a change is done and checks are green: one commit per coherent change. Push only when the user asks.
- Message style: a short summary line, then a plain paragraph on what and why. No attribution lines.
- History before the monorepo lives in github.com/stefvw93/omarchy-periphery: `main`, and `planned-flight` (keys rebound to the plugin, crossfade hand-off), an earlier approach kept for reference. Don't port to it unless asked.
