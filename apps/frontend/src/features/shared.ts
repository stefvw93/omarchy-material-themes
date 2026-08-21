import { Layer } from "effect";
import { consoleDevtoolsLayer, createRuntime } from "react-argon";
import { WallhavenService } from "./wallhaven/service";
import { PexelsService } from "./pexels/service";
import { TauriHttpClient } from "effect-platform-tauri";

const { Provider, component, useRuntime } = createRuntime(
  Layer.mergeAll(
    import.meta.env.DEV ? consoleDevtoolsLayer() : Layer.empty,
    WallhavenService.layer,
    PexelsService.layer,
  ).pipe(Layer.provide(TauriHttpClient.TauriHttpClientLayer)),
);

export { Provider, component, useRuntime };
