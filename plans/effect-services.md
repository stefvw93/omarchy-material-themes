# Effect services: conventions and test-layer log

Working notes for a later architectural decision record and skill: "services are Effect services; environments are layers; tests provide test layers". Started 2026-10-13 with the test-coverage pass. The audit's seven findings were fixed the same day (commits below). Add to the log whenever a test provides a service.

## The rule

- A dependency on the outside world (files, processes, sockets, HTTP, Tauri IPC, environment variables, time, randomness) is reached through a service in context, never imported and called directly.
- A service is a `Context.Service` class. Where the I/O differs per environment, the logic is a plain `make<Service>(transport)` and each environment supplies the transport (`makeHyprland`, `makeOmarchyShell`).
- Each environment is one composed layer at the edge: Node (`tools/cli/src/main.ts`), Tauri (`apps/studio/src/features/shared.ts` `MainLayer`, and `FollowerLayer` for the followers), the Studio worker (`MaterialWorkerLayer`), tests (per test file).
- Tests swap layers, not modules: no `vi.mock`.

### Naming

- **Environment-specific layers** are module-level `<Service><Env>` constants: `HyprlandNode`, `HyprlandTauri`, `OmarchyPathsNode`, `OmarchyPathsTauri`, `OmarchyShellNode`, `OmarchyShellTauri`, `OmarchyCliNode`, `OmarchyCliTauri`, `FileSystemTauri`, `HttpClientTauri`, `PathsTauri`. Tauri layers live in `apps/studio/src/platform/` or `@stef/effect-platform-tauri`, since packages don't import Tauri.
- **Parameterised layers** take the parameter in the name: `OmarchyPathsAt(home)`.
- **Layers that only depend on abstract tags** (FileSystem, HttpClient, …) stay a `Service.layer` static: `WallhavenService.layer`, `OmarchyTheme.layer`, `MaterialService.layer`.
- **Test layers** are `<Service>Test(...)` in a `./testing` subpath, so they never ship in the main import. They return `{ layer, …recorders }`: `HyprlandTest(fixture)` → `{ layer, requests, transport }`, `OmarchyShellTest()` / `OmarchyCliTest()` → `{ layer, calls }`, `MemoryFileSystem(files)` → `{ layer, files, dirs }`, Studio's `HttpClientTest(...answers)` → `{ layer, requests }`.

### Configuration, time

- Environment variables are `Config` values (`Config.String("HOME")`, `omarchyPath` with its default in one place); tests provide `ConfigProvider.layer(ConfigProvider.fromEnv({ env: {...} }))`.
- Timestamps are `Clock.currentTimeMillis`; tests set them with `TestClock.setTime`. Effect 4's `Random` has no UUID, so names that need to be unique per run take a `Clock` stamp.

### Tests

- `@effect/vitest`: `it.effect` for anything that runs an Effect (it provides `TestClock`); `it.live` when real time must pass (a test whose code under test sleeps for real, e.g. `deploy.test.ts`'s enable retries). Pure-function tests stay on `vite-plus/test`.
- Failures: `Effect.flip` to get the error and assert its `_tag`; `Effect.exit` when only success or failure matters.
- Options such as a timeout go **after** the test function in `@effect/vitest` (`it.live(name, fn, { timeout })`).
- Background streams under `TestClock`: fork the stream, then advance with a `step` that runs `TestClock.adjust` and a few `Effect.yieldNow`. A `zipLatest` of two polled streams needs several scheduler turns to emit after the clock moves (`apps/studio/src/m3/followers.test.ts`).
- Prefer providing the **platform tag** (`FileSystem`, `HttpClient`) over faking our own service: the service's real middleware (retry, cache, schema decoding, `filterStatusOk`) then runs in the test.
- `FileSystem.layerNoop` (under `MemoryFileSystem`) fails any call the test didn't provide, which documents what a unit touches.

Exempt, with the reason:

- Code bundled into QML (`m3`, `motion`, `tokens/runtime`, `tokens/text-scale`, `qml-kit`, plugin `src/`): plain ES2017, no Effect. The QML side injects what it needs (`HostTimers`, `runCore(host, …)`).
- Build scripts run by hand (`packages/m3/scripts/*`, `qml-kit/scripts/*`, `apps/studio/pexels.ts`): `node:fs` directly. Their pure parts are tested as functions.

## Audit (2026-10-13) and what was done

| #   | Finding                                                                                                | Resolution                                                                                                                                                                                                                 | Commit    |
| --- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1   | `OmarchyTheme.layer` called Tauri's `configDir` and `invoke("set_theme")` inside the layer; untestable | `OmarchyPaths.themesDir`; new `OmarchyCli` service (`OmarchyCliNode`, `OmarchyCliTauri`, `OmarchyCliTest`); tested                                                                                                         | `62d08d6` |
| 2   | Studio's followers used Tauri fs and `setInterval` directly                                            | `polled(path)` stream on a `Schedule`; `appliedSchemes`, `baseSizes`, `typeScales` over FileSystem + OmarchyPaths; run on `FollowerLayer`; tested under TestClock. Found and fixed: shell.toml wasn't in Studio's fs scope | `4c4b6cb` |
| 3   | Environment variables read directly (`HOME`, Hyprland's two, `OMARCHY_PATH` ×3)                        | `Config`; `omarchyPath` defined once in `@stef/omarchy`                                                                                                                                                                    | `31e2d21` |
| 4   | `Date.now()` and `crypto.randomUUID()`                                                                 | `Clock.currentTimeMillis`                                                                                                                                                                                                  | `837e573` |
| 5   | Mixed layer names                                                                                      | `<Service><Env>` (above)                                                                                                                                                                                                   | `24a8998` |
| 6   | Test layers had no home; `fixtureTransport` shipped in the main import                                 | `./testing` subpaths in `@stef/hyprland` and `@stef/omarchy`                                                                                                                                                               | `24a8998` |
| 7   | Two test styles                                                                                        | `@effect/vitest` everywhere an Effect runs                                                                                                                                                                                 | `23e6890` |

Services as they stand:

| Service                      | Where                                             | Layers                                                                                                        |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Hyprland`                   | `packages/hyprland/src/service.ts`                | `HyprlandNode` (sockets), `HyprlandTauri`, `HyprlandTest(fixture)`                                            |
| `OmarchyShell`               | `packages/omarchy/src/shell.ts`                   | `OmarchyShellNode` (child process), `OmarchyShellTauri`, `OmarchyShellTest()`                                 |
| `OmarchyCli`                 | `packages/omarchy/src/cli.ts`                     | `OmarchyCliNode` (child process), `OmarchyCliTauri`, `OmarchyCliTest()`                                       |
| `OmarchyPaths`               | `packages/omarchy/src/paths.ts`                   | `OmarchyPathsNode` (Config HOME), `OmarchyPathsAt(home)`, `OmarchyPathsTauri`                                 |
| `ThemeOutputDirectory`       | `packages/theme-engine/src/theme/shared.ts`       | provided by the caller                                                                                        |
| `ThemeTokens`                | same                                              | `Context.Reference`, defaults to `defaultTokens`                                                              |
| `WallhavenService`           | `apps/studio/src/features/wallhaven/service.ts`   | `layer` over `HttpClient`                                                                                     |
| `PexelsService`              | `apps/studio/src/features/pexels/service.ts`      | `layer` (bundled JSON)                                                                                        |
| `MaterialService`            | `apps/studio/src/features/material/service.ts`    | `layer` (spawns the worker)                                                                                   |
| `OmarchyTheme`               | `apps/studio/src/features/omarchy-theme/index.ts` | `layer` over FileSystem, Path, HttpClient, OmarchyPaths, OmarchyCli                                           |
| FileSystem, Path, HttpClient | Effect's own tags                                 | `FileSystemTauri`, `HttpClientTauri`; Node from `@effect/platform-node`; `MemoryFileSystem`, `HttpClientTest` |

Still outside the rule, knowingly:

- `MaterialService` creates its `Worker` directly; the worker is the environment boundary.
- `PexelsService` imports bundled JSON; nothing to swap.
- `apps/studio/src/platform/*` and `@stef/effect-platform-tauri` call Tauri: they are the Tauri layers.

## Test-layer log

How each test provides its services. One row per pattern use; the ADR and skill will be distilled from this.

| Test                                                   | Service(s)                                                    | How                                                                                                                                             | Pattern                        |
| ------------------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `packages/theme-engine/src/theme/writers.test.ts`      | FileSystem, Path, ThemeTokens                                 | `FileSystem.layerNoop({ writeFileString })` capturing writes; `Effect.provideService(ThemeTokens)`                                              | Noop platform layer            |
| `packages/omarchy/src/install.test.ts`                 | OmarchyPaths, FileSystem, Path, Clock                         | `OmarchyPathsAt(tmp)` over real `NodeServices.layer` in a temp dir; `TestClock.setTime` for the backup name                                     | Real platform, throwaway dir   |
| `tools/cli/src/deploy.test.ts`                         | OmarchyShell, Hyprland, paths                                 | `OmarchyShellTest()`, `HyprlandTest(...)`, `OmarchyPathsAt(tmp)` + Node; `it.live` (real retries)                                               | Recording fakes; fixture       |
| `packages/hyprland/src/service.test.ts`                | Hyprland                                                      | `HyprlandTest(fixture)`: recorded hyprctl responses and events (`stef hypr record`)                                                             | Fixture transport              |
| `packages/hyprland/src/node.test.ts`                   | Config                                                        | `ConfigProvider.fromEnv({ env })` for the socket path and the error outside Hyprland                                                            | Config provider                |
| `packages/omarchy/src/paths.test.ts`                   | Config, Path                                                  | `ConfigProvider.fromEnv({ env })` for `OmarchyPathsNode` and `omarchyPath`                                                                      | Config provider                |
| `apps/expo/src/core.test.ts`                           | Clock                                                         | `TestClock.adjust`                                                                                                                              | Test clock                     |
| `packages/omarchy/src/tokens.test.ts`                  | FileSystem, Path, OmarchyPaths                                | `MemoryFileSystem(files)`; `OmarchyPathsAt("/home")`                                                                                            | In-memory FileSystem           |
| `packages/omarchy/src/testing.test.ts`                 | FileSystem                                                    | `MemoryFileSystem` itself: text and bytes, NotFound, directories, recursive remove, unimplemented calls fail                                    | Test layer under test          |
| `apps/studio/src/features/wallhaven/service.test.ts`   | HttpClient, Clock                                             | `HttpClientTest(...answers)`; `TestClock` drives the cache TTL and retry backoff                                                                | Fake HttpClient; test clock    |
| `apps/studio/src/features/omarchy-theme/index.test.ts` | FileSystem, Path, OmarchyPaths, HttpClient, OmarchyCli, Clock | `MemoryFileSystem`, `OmarchyPathsAt("/home")`, `HttpClientTest` (bytes + content type), `OmarchyCliTest`; `TestClock.setTime` for the file name | Full service over test layers  |
| `apps/studio/src/m3/followers.test.ts`                 | FileSystem, Path, OmarchyPaths, Clock                         | `MemoryFileSystem` edited between ticks; forked stream + `step` (adjust, then yield)                                                            | Polled stream under test clock |
