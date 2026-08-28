import { Effect, Layer } from "effect";
import { consoleDevtoolsLayer, createRuntime } from "react-argon";
import { WallhavenService } from "./wallhaven/service";
import { PexelsService } from "./pexels/service";
import { TauriHttpClient, TauriFileSystem } from "effect-platform-tauri";
import { MaterialService } from "./material/service";
import { OmarchyTheme } from "./omarchy-theme";

export const MainLayer = Layer.mergeAll(
  import.meta.env.DEV ? Layer.mergeAll(consoleDevtoolsLayer(), OmarchyTheme.dev) : Layer.empty,
  WallhavenService.layer,
  PexelsService.layer,
  MaterialService.layer,
).pipe(
  Layer.provide(TauriHttpClient.layer),
  Layer.provide(TauriFileSystem.layer),
  Layer.tapError(Effect.logError),
);

export const { Provider, component, useRuntime } = createRuntime(MainLayer);

/**
 * Worker-safe subset of `MainLayer`. Excludes `OmarchyTheme.dev`, devtools, and
 * `TauriFileSystem`, whose Tauri IPC calls require `window` and would throw
 * inside a Worker.
 */
export const MaterialWorkerLayer = MaterialService.layer.pipe(
  Layer.provide(TauriHttpClient.layer),
  Layer.tapError(Effect.logError),
);
