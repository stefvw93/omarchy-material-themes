import { Layer } from "effect";
import { consoleDevtoolsLayer, createRuntime } from "react-argon";
import { WallhavenService } from "./wallhaven/service";
import { PexelsService } from "./pexels/service";
import { TauriHttpClient } from "effect-platform-tauri";
import { MaterialService } from "./material/service";

export const MainLayer = Layer.mergeAll(
  import.meta.env.DEV ? consoleDevtoolsLayer() : Layer.empty,
  WallhavenService.layer,
  PexelsService.layer,
  MaterialService.layer,
).pipe(Layer.provide(TauriHttpClient.TauriHttpClientLayer));

export const { Provider, component, useRuntime } = createRuntime(MainLayer);
