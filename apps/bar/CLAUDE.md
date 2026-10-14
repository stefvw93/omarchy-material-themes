# Bar: rules

An Omarchy shell `bar` plugin (Quickshell/QML) that replaces the stock bar, built with `@stef/plugin-kit` as one app of the `omarchy-stef` monorepo. [README.md](README.md) covers install, [SPEC.md](SPEC.md) the product behaviour and its ubiquitous language. These rules are not final: they grow with every new pattern, library or edge case.

## Meta-rules

- Discuss new rules and rule changes Q&A style: ask one question, wait for the answer, then the next.
- When a rule here and the code disagree, stop and ask which one is right.

## Architecture

Two layers, each with one job:

| Layer | Where                        | Does                                                                                                                 |
| ----- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Logic | `src/<module>/` (TypeScript) | Pure functions, ours: the focus area, the body. No Qt, Quickshell, Hyprland or `hl`. Everything testable lives here. |
| Shell | `qml/*.qml`                  | The forked stock bar plus our QML. Imports the logic as `import "lib/<module>.mjs"`.                                 |

- `qml/Bar.qml` and `qml/BarModel.js` are a close fork of the stock bar (`upstream/README.md`). Keep the diff against `upstream/` small and readable: change stock code only where our behaviour needs it, and put our additions in their own blocks or files, marked `// stef.bar:`. Don't reformat, rename or qualify stock code.
- New logic of ours goes in `src/`, not in QML functions. When our QML grows a decision or a computation, move it to `src/` first. The stock logic stays in the fork.
- `plugin.config.ts` declares the plugin; `vp run build` assembles `dist/prod/stef.bar/` (manifest, QML, `lib/*.mjs`), `vp run build:dev` a side-by-side `stef.bar.dev`. `dist/` is build output: never edit or commit it.
- Never use the plugin id as a literal. QML reads it from the generated `lib/meta.mjs` (`Meta.pluginId`).
- Never import from `/usr/share` at runtime except the shell's own `qs.*` modules: the forked files are copies.
- A selected bar that fails to load falls back to `omarchy.bar`: a broken build costs the user their bar's features, not their bar.
- `~/.config/omarchy/plugins/stef.bar/` is a deploy target, not a repo. Never edit it: the shell reloads plugins on any write under `~/.config/omarchy/plugins/`.
- Quickshell's QML engine is roughly ES2017 with gaps: see `packages/effect-platform-qml/SPIKE.md`. `src/` type-checks against the es2017 lib, and plugin-kit bundles with the shims and lowering from `@stef/effect-platform-qml/build`.

## Workflow per change

In this order. Don't skip a step; say so if a step doesn't apply.

1. **Spec.** Discuss the change, then update the module's `src/<module>/specs.md` (and SPEC.md for product behaviour). Plain English, short sentences, SPEC.md's terms.
2. **Declare.** Write the API surface in `src/<module>/<module>.ts` with `declare` (types and signatures, no bodies).
3. **Test.** Write tests in `<module>.test.ts` against the spec, not against the code. Run them: they must fail.
4. **Implement.** Replace the `declare`s until the tests pass. The signatures stay as declared; if they must change, go back to step 2.
5. **Validate.** `vp run verify` until clean.
6. **Wire and deploy.** Change the QML, then `stef deploy bar --dev` (selects `stef.bar.dev` as the bar; `stef undeploy bar` removes it and selects the bar that was selected before) or `stef deploy bar`. Then `stef smoke bar`.
7. **Hand-check.** Hover, clicks, drags and keys can't be tested from here (below). Don't wait for them: carry on, and list them at the end of the report, saying exactly what to try and what should happen. Never claim they work.

When a test disagrees with the spec, fix the test. When the spec disagrees with what the user wants, stop and ask.

## Validation

From this directory, `vp test run` runs Vitest (`src/**/*.test.ts`) and `vp run verify` runs `plugin-kit check`:

| Check   | What                                                                |
| ------- | ------------------------------------------------------------------- |
| build   | `dist/prod/stef.bar`, manifest validated against Omarchy's rules.   |
| qml     | Qt 6 qmllint on the built QML. Any warning fails.                   |
| bundles | Every `lib/*.mjs` loads in Quickshell's QML engine (headless `qs`). |

From the repo root, `vp check` covers format, lint and types, and `vp run ready` runs everything for every app.

## Code style

- TypeScript: the monorepo's Oxfmt settings (`vp fmt`). `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` (from `@stef/config`).
- QML: `pragma ComponentBehavior: Bound`; qualify ids (`root.x`, `card.host.x`), never rely on scope lookup. A line qmllint can't type (theme singletons, `lib/*.mjs` calls, `PanelWindow`) gets a same-line `// qmllint disable <category>`, nothing broader. The one exception is the forked `qml/Bar.qml`: upstream doesn't lint clean (216 warnings, mostly unqualified ids), so its first line disables qmllint for the file instead of diverging from upstream.
- QML: hand-formatted, no formatter. 2 spaces, no semicolons, compact one-line functions where they fit. Match the surrounding code.
- Comments say why, not what. Match the comment density of the file.

## Live testing limits

- `wtype` key events don't trigger Hyprland binds here.
- `hyprctl eval` returns only "ok": read values back with `error(...)`.
- `omarchy-shell shell debugBarGeometry` lists the live slots of `shell.bar`.
- Allowed while testing: deploy the dev variant, restart the shell, `hyprctl reload`. The user may be using the desktop at the same time, so keep it short and put the selected bar back.

## Git

- Commit once a change is done and checks are green: one commit per coherent change. Push only when the user asks.
- Message style: a short summary line, then a plain paragraph on what and why. No attribution lines.
