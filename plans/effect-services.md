# Effect services: audit and test-layer log

Working notes for a later architectural decision record and skill: "services are Effect services; environments are layers; tests provide test layers". Started 2026-10-13 with the test-coverage pass. Add to the log whenever a test provides a service.

## The rule we want to write down

- A dependency on the outside world (files, processes, sockets, HTTP, Tauri IPC, environment variables, time, randomness) is reached through a service in context, never imported and called directly.
- A service is a `Context.Service` class. Its implementation is a plain `make…(deps)` function or a `Layer`; the class carries the live layer(s) as statics.
- Each environment is one composed layer at the edge: Node (`tools/cli/src/main.ts`), Tauri (`apps/studio/src/features/shared.ts` `MainLayer`), the Studio worker (`MaterialWorkerLayer`), tests (per test file).
- Tests swap layers, not modules: no `vi.mock`.

Exempt, with the reason:

- Code bundled into QML (`m3`, `motion`, `tokens/runtime`, `tokens/text-scale`, `qml-kit`, plugin `src/`): plain ES2017, no Effect. The QML side injects what it needs (`HostTimers`, `runCore(host, …)`).
- Build scripts run by hand (`packages/m3/scripts/*`, `qml-kit/scripts/*`, `apps/studio/pexels.ts`): `node:fs` directly. Their pure parts are tested as functions.

## Audit (2026-10-13)

### Following the rule

| Service                      | Where                                           | Live layers                                                                         | Notes                                                                                      |
| ---------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Hyprland`                   | `packages/hyprland/src/service.ts`              | `node.ts` `layer` (sockets), `apps/studio/src/platform/hyprland.ts` `HyprlandTauri` | Best example: `makeHyprland(transport)`; transports per environment, `fixtureTransport`.   |
| `OmarchyShell`               | `packages/omarchy/src/shell.ts`                 | `OmarchyShell.layer` (ChildProcessSpawner), `OmarchyShellTauri`                     | Same shape: `makeOmarchyShell(run)`.                                                       |
| `OmarchyPaths`               | `packages/omarchy/src/paths.ts`                 | `layer` ($HOME), `layerAt(home)`, `OmarchyPathsTauri`                               | `layerAt` exists for tests.                                                                |
| `ThemeOutputDirectory`       | `packages/theme-engine/src/theme/shared.ts`     | provided by the caller                                                              |                                                                                            |
| `ThemeTokens`                | same                                            | `Context.Reference`, defaults to `defaultTokens`                                    | Good use of a reference: optional dependency with a default.                               |
| `WallhavenService`           | `apps/studio/src/features/wallhaven/service.ts` | `layer` over `HttpClient`                                                           | Middleware, retry and cache built on the injected client, so a fake client tests them all. |
| `PexelsService`              | `apps/studio/src/features/pexels/service.ts`    | `layer` (bundled JSON)                                                              |                                                                                            |
| `MaterialService`            | `apps/studio/src/features/material/service.ts`  | `layer` (spawns the worker)                                                         | Worker side builds its own `ManagedRuntime` from `MaterialWorkerLayer`.                    |
| FileSystem, Path, HttpClient | `packages/effect-platform-tauri`                | `TauriFileSystem.layer`, `TauriHttpClient.layer`; Node from `@effect/platform-node` | Platform services are Effect's own tags, so theme-engine writers run unchanged in both.    |

### Not following it (candidates, none changed yet)

1. **`OmarchyTheme.layer` calls Tauri directly** (`apps/studio/src/features/omarchy-theme/index.ts`): `configDir()` for the theme path and `invoke("set_theme")` inside the layer. It already depends on `OmarchyPaths` but doesn't use it for the path. As is, the service can't be built outside Tauri, so it has no tests. Fix: a `themesDir` on `OmarchyPaths`, and `omarchy theme set` behind a service with a Node (ChildProcess) and a Tauri (invoke) layer, like `OmarchyShell`.
2. **Studio's followers are outside Effect** (`apps/studio/src/m3/scheme.ts`, `text-scale.ts`): `@tauri-apps/plugin-fs` and `setInterval` directly. As Effect: a `Stream` polling `FileSystem` on a `Schedule` (later `fs.watch`), testable with `TestClock` and an in-memory FileSystem. Only the pure parser (`omarchyColorsOf`) is tested today.
3. **Environment variables read directly**: `HOME` in `OmarchyPaths.layer`, `XDG_RUNTIME_DIR` and `HYPRLAND_INSTANCE_SIGNATURE` in `packages/hyprland/src/node.ts`, `OMARCHY_PATH` in `packages/plugin-kit/src/check.ts` and twice in `tools/cli/src/dev.ts` (the `/usr/share/omarchy` default is repeated three times). Effect's `Config` with a `ConfigProvider` in tests would make them one definition each.
4. **Time and randomness read directly**: `Date.now()` for backup and staging names (`packages/omarchy/src/install.ts`, `tools/cli/src/migrate.ts`) and timings (`tools/cli/src/dev.ts`); `crypto.randomUUID()` in `OmarchyTheme`. `Clock` and `Random` would make them deterministic under `TestClock`.
5. **Layer naming is mixed**: `layer` / `layerAt` statics, a module-level `layer` export (`hyprland/node.ts`, imported as `hyprlandNode`), and `<Service><Env>` constants (`HyprlandTauri`, `OmarchyShellTauri`, `OmarchyPathsTauri`). Pick one, e.g. statics `layer` (default live), `layerAt(…)`, and `<Service>.layerTauri` / `.layerNode`, or keep env layers in `platform/` files named `<Service><Env>`.
6. **Test layers have no home**: `fixtureTransport` lives in `packages/hyprland/src/testing.ts` and is exported from the package index (so it ships in the prod import). `packages/omarchy` has none; every test file builds its own. Proposal: `src/testing.ts` per package, exported as a `./testing` subpath.
7. **Two test styles**: `@effect/vitest` `it.effect` (expo, the new Wallhaven tests: gets `TestClock` for free) and `vite-plus/test` with `Effect.runSync/runPromise` (everything else). Prefer `it.effect` wherever a test runs an Effect.

## Test-layer log

How each test provides its services. One row per pattern use; the ADR and skill will be distilled from this.

| Test                                                       | Service(s)                     | How                                                                                                                                                                                           | Pattern                      |
| ---------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `packages/theme-engine/src/theme/writers.test.ts`          | FileSystem, Path, ThemeTokens  | `FileSystem.layerNoop({ writeFileString })` capturing writes; `Path.layer`; `Effect.provideService(ThemeTokens)`                                                                              | Noop platform layer          |
| `packages/omarchy/src/install.test.ts`                     | OmarchyPaths, FileSystem, Path | `OmarchyPaths.layerAt(tmp)` over real `NodeServices.layer` in a temp dir                                                                                                                      | Real platform, throwaway dir |
| `tools/cli/src/deploy.test.ts`                             | OmarchyShell, Hyprland, paths  | `Layer.succeed(OmarchyShell, {...})` recording calls; `fixtureTransport(...).layer`; `layerAt(tmp)` + Node                                                                                    | Hand-written fake; fixture   |
| `packages/hyprland/src/service.test.ts`                    | Hyprland                       | `fixtureTransport(fixture)`: recorded hyprctl responses and events (`stef hypr record`)                                                                                                       | Fixture transport            |
| `apps/expo/src/core.test.ts`                               | Clock                          | `TestClock.adjust` through `@effect/vitest`                                                                                                                                                   | Test clock                   |
| `packages/omarchy/src/tokens.test.ts` (new)                | FileSystem, Path, OmarchyPaths | `FileSystem.layerNoop` over a `Map` (exists, read, write, mkdir); `OmarchyPaths.layerAt("/home")`                                                                                             | In-memory FileSystem         |
| `apps/studio/src/features/wallhaven/service.test.ts` (new) | HttpClient, Clock              | `Layer.succeed(HttpClient.HttpClient, HttpClient.make(...))` answering from a script via `HttpClientResponse.fromWeb`, recording requests; `TestClock` drives the cache TTL and retry backoff | Fake HttpClient; test clock  |

Observations so far:

- The **`make<Service>(transport)` + per-environment transport** shape (`Hyprland`, `OmarchyShell`) is the cleanest: the logic is tested once against a fixture, each environment only supplies I/O.
- Providing the **platform tag** (`FileSystem`, `HttpClient`) rather than our own service means the service's real middleware (retry, cache, schema decoding, `filterStatusOk`) runs in the test. Prefer it over faking our own service.
- `FileSystem.layerNoop` fails any call the test didn't provide, which documents exactly what a unit touches.
- The in-memory FileSystem (`tokens.test.ts`) is the second hand-rolled one; with `install.test.ts`'s temp dirs it's a candidate for `@stef/omarchy/testing` (`memoryFileSystem(files)`).
