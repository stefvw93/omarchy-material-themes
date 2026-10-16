# Open tasks

What's left after the monorepo migration (phases 0–6 on the `monorepo` branch). Each task says why it's open and what "done" looks like.

## 1. Go live (needs the desktop)

Nothing has been deployed from the monorepo yet. The live plugins and Hyprland config are still the pre-monorepo ones.

- [ ] **`pnpm stef hooks install`.** Points `~/.config/hypr/hyprland.lua` at the generated `~/.config/hypr/stef/plugins.lua`, replacing periphery's own hook block (a backup is kept). This is required before any dev variant's hook can load. Run `hyprctl reload` afterwards.
- [x] **`pnpm stef deploy periphery`.** Done 2026-10-12; smoke passes. The pre-monorepo build is kept in `~/.config/omarchy/stef/retired/stef.periphery-pre-monorepo`. Its hook still loads through the old block in `hyprland.lua` until `stef hooks install`.
- [ ] **`pnpm stef migrate overview`.** This command:
  - deploys `stef.expo`;
  - disables `stef.overview`;
  - rewrites the `SUPER+SHIFT+SPACE` binding in `bindings.lua` and the blur layer rule in `looknfeel.lua` (backups kept);
  - moves `~/.config/omarchy/plugins/stef.overview` to `~/.config/omarchy/stef/retired/`.

  Then run `hyprctl reload`.

- [x] **Launch Studio** (`cd apps/studio && vp run tauri dev`). Runs; Studio follows the applied theme's colours.

### Hand-checks after going live

Headless tests can't cover these.

- [ ] **expo:** the open animation. The window snapshot now arrives from the Effect core one event-loop tick after `open()`; check that tiles still animate in cleanly. Also check selection, keys (←/→/↑/↓, Enter, 1–9, Esc), and hover and click.
- [ ] **periphery:** hover a card, `SUPER+W` / `SUPER+F` on a selected card, arrow keys into the bands, Enter and Escape, card click (flight), card drag between groups and into the focus area, and SUPER-drag of a real window onto a band.
- [ ] **periphery, Mission Control placement** (branch `periphery-masonry`): hover across cards and piles (a pile fans out, each tab reachable, the fan closes when the pointer leaves the pile); `SUPER + ↑/↓` through a pile and through a fan; `SUPER + W` on a fanned tab; click a tilted card (the ghost turns flat on its way, no turn at the hand-off); drag a card or a tab between groups; a floating card shows in front of its tiled card; after a theme switch or a shell restart no thumbnail is letterboxed.
- [ ] **periphery, after the 2026-10-16 refactor** (`361833e`..`d68b77f`; flights, ghosts and leftovers were checked live, these weren't): hover a card (active border, title tooltip, the card lifts and the others recede); drag a card into the focus area and onto another group (the dragged card now crops like its card and has the window's own corners, no stretched frame); `SUPER + ←/→` at the focus area's edge selects a card, `SUPER + ↑/↓` moves through the cards, Return flies to it, Escape lets go; `SUPER + W` and `SUPER + F` act on the selected card's window. If a ghost ever hangs, `qs log` shows `Periphery: a flight ended at its time limit; ghosts not landed: …`.
- [ ] **`stef dev expo` and `stef dev periphery`:** the dev variant goes live, rebuilds on save, and Ctrl+C puts prod back (hook included).
- [ ] **`stef harness expo`:** opens in its own `qs` process and toggles with `qs ipc … call stef.harness toggle '{}'`.
- [ ] **Studio, Tokens:** edits reach open plugins live; "Preview in Hyprland" changes gaps and borders immediately; a missing `tokens.json` loads the defaults.
- [ ] **Studio, Plugins:** the list shows `stef.*` with the live variant; the enable switch and the toggle work.
- [ ] **Studio, Inspector:** events stream in; pause stops the Rust reader; the snapshot lists monitors and clients.
- [ ] **Studio, Theme:** generating and applying a theme still works. It now goes through the real `OmarchyTheme.layer`, which previously only existed in dev builds. Also check that picking a wallpaper recolours Studio itself (the preview) and that Apply leaves it on the applied theme.
- [ ] **Studio, Tokens: Window groups.** Size, shape and padding preview in Hyprland and reach the theme on Apply.

## 2. Code

- [ ] **Periphery Effect core.** Partly done: the pure logic lives in `src/` (layout, selection, hook strings, options), and since 2026-10-16 the flight is a tested lifecycle there too (`flight.step`: idle, pending, flying, unhiding; the QML only runs its actions). Still QML: the selection (hover, leave delay, focus keys), drag and drop, the card and ghost delegates' bookkeeping (`syncModel`/`syncSlots`), and the 80 ms throttled rebuild with its 3 s resync. Move those into `src/` the same way, a pure step per concern with Vitest tests, or into an Effect core like expo's (`apps/expo/src/core.ts`) if they need its timers and streams. Check each step live with the `periphery-live-check` skill, and leave hover, drags and keys as hand-checks.
- [x] **Derive Qt spring constants from tokens.** Replaced by `SpringValue.qml` (qml-kit): the exact M3 spring stepped per frame, from `tokens.m3.springs`. Periphery uses it for every animation and follows `motion.scheme`.
- [ ] **`tokens.lua` for non-Omaterial themes.** `stef tokens apply` writes `~/.config/hypr/stef/tokens.lua`, but nothing sources it. It has to load _after_ the theme's `hyprland.lua` to win. Decide where, e.g. a `stef hooks install` step or an Omarchy theme hook. Omaterial themes already render the tokens.
- [ ] **Studio: make token preview permanent.** Today "Preview in Hyprland" lasts until the next config reload. Offer a "write tokens.lua" action, or re-apply the theme from the Tokens page.
- [ ] **Studio: deploy and dev buttons.** The Plugins page only enables and toggles. Building needs the repo checkout, so it would shell out to `pnpm stef …` with a configured repo path.
- [ ] **`effect-platform-tauri` FileSystem.** Only `access`, `makeDirectory`, `readDirectory`, `readFile`, `remove` and `writeFile` are implemented. Add `stat`, `rename`, `copy` and `watch` when Studio needs them (`watch` would let the Tokens page follow edits made by the CLI, and replace the followers' polling).
- [ ] **Studio bundle size.** Vite warns about chunks over 500 kB. Split per page (lazy routes) or with `codeSplitting`.
- [ ] **Harness and hooks.** `stef harness` runs the plugin in its own `qs`, but `omarchy-shell` can only reach the main shell, so periphery's Hyprland hook still talks to the main shell. Hook-driven behaviour needs `stef dev`. If Omarchy ever lets callers address another instance, route the dev hook to the harness.
- [ ] **QML: shared view components.** `qml-kit` only shares logic (address, reading order, monitor geometry, springs, tokens). The two plugins' window cards (ScreencopyView plus title pill) are still separate. Unify them once both have Effect cores and their delegates' data has converged.
- [ ] **Hot reload with a running Effect core can crash the shell.** On 2026-10-12, redeploying `stef.expo.dev` and opening it about a second later segfaulted quickshell inside the QML JS engine (`QV4::Value::sameValueZero`, called from JIT code). The likely cause is the old instance's core running after its JS state was torn down. Until it's understood, redeploy plugins with a core and then `omarchy-restart-shell` instead of hot-reloading. No plugin reliably hot-reloads: the engine caches components by URL (on 2026-10-14 a redeployed `stef.periphery` kept running its old code). `stef deploy` now restarts the shell when it already knew the id; `stef dev`'s rebuilds don't, so they may not show until a restart.
- [ ] **Bundle check: unknown engine warnings.** `plugin-kit check` passes when every bundle loads. It should also fail on QML engine warnings beyond the known `usedbeforedeclared` lints.

## 3. Material 3 theming

The plan's phases 1–11 and 12 (docs) are done; phase 8 (restyling each Studio component) was dropped for M3 in Studio's Tailwind config. [apps/studio/docs/theming-inventory.md](../apps/studio/docs/theming-inventory.md) is the current state.

- [ ] **Lone and fullscreen windows.** The rules that made them flush (no gaps, border or rounding) are commented out in `packages/theme-engine/src/theme/files/hyprland.lua.ts`, but the comment above them still describes them. Either delete them and the comment, or bring them back with a registered interpretation.
- [ ] **`stef.omaterial` hot reload.** Services never reload in place (the engine caches their component by URL); after deploying it, restart the shell.
- [ ] **Studio: follow the theme without polling.** Studio's followers (`src/m3/scheme.ts`, `text-scale.ts`) re-read their files every 2 s through `polled` (`src/m3/polled.ts`). Once `effect-platform-tauri` implements `watch` (above), `polled` can watch instead and nothing else changes.

## 4. Tooling and later

- [ ] **`stef publish`.** Push `dist/prod/<id>` to a release branch, so others can `omarchy plugin add <git-url>`.
- [ ] **Visual regression.** Run a nested Hyprland in a window, toggle the plugins, `grim` screenshots, and compare.
- [ ] **Bring back the Claude Code hooks** from the old periphery repo (format after edits, `verify` before stopping), now as monorepo-wide ones in `.claude/settings.json`.
- [ ] **Tidy the catalog.** `pnpm-workspace.yaml` still lists unused entries (`@vitest/browser-playwright`, `electron-vite`, `tstyche`, `playwright`) and the `@parcel/watcher` build placeholder.

## 5. Decisions for you

- [ ] **Repo name.** The folder and GitHub remote are still `omarchy-material-themes`; the root package is `omarchy-stef`.
- [ ] **Tauri identifier.** Still `com.tauri.dev`. Changing it moves the app's data directory.
- [ ] **Merge `monorepo` into `master`.**
- [ ] **Archive `github.com/stefvw93/omarchy-periphery`.** It now lives in `apps/periphery`, and its history stays there for reference (`planned-flight` included).
