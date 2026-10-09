import { Effect, Layer, Path } from "effect";
import { consoleDevtoolsLayer, createRuntime } from "@wych/react";
import { WallhavenService } from "./wallhaven/service";
import { PexelsService } from "./pexels/service";
import { TauriHttpClient, TauriFileSystem } from "@stef/effect-platform-tauri";
import { MaterialService } from "./material/service";
import { OmarchyTheme } from "./omarchy-theme";
import { HyprlandTauri } from "@/platform/hyprland";
import { OmarchyPathsTauri, OmarchyShellTauri } from "@/platform/omarchy";

export const MainLayer = Layer.mergeAll(
  WallhavenService.layer,
  PexelsService.layer,
  MaterialService.layer,
  OmarchyTheme.layer,
  HyprlandTauri,
  OmarchyShellTauri,
  OmarchyPathsTauri,
  import.meta.env.DEV ? consoleDevtoolsLayer() : Layer.empty,
).pipe(
  // provideMerge: tasks use FileSystem and Path directly (tokens.json), not
  // only through the services built on them.
  Layer.provideMerge(Path.layer),
  Layer.provide(TauriHttpClient.layer),
  Layer.provideMerge(TauriFileSystem.layer),
  Layer.tapError(Effect.logError),
);

export const { Provider, component, useRuntime } = createRuntime(MainLayer);

/**
 * Worker-safe subset of `MainLayer`. Excludes `OmarchyTheme`, devtools, and
 * `TauriFileSystem`, whose Tauri IPC calls require `window` and would throw
 * inside a Worker.
 */
export const MaterialWorkerLayer = MaterialService.layer.pipe(
  Layer.provide(TauriHttpClient.layer),
  Layer.tapError(Effect.logError),
);
