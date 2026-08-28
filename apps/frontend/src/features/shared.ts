import { Layer } from "effect";
import { consoleDevtoolsLayer, createRuntime } from "react-argon";
import { WallhavenService } from "./wallhaven/service";
import { PexelsService } from "./pexels/service";
import { TauriHttpClient, TauriFileSystem } from "effect-platform-tauri";
import { MaterialService } from "./material/service";
import { OmarchyThemeDevtools } from "./omarch-theme/devtools";

export const MainLayer = Layer.mergeAll(
  import.meta.env.DEV
    ? Layer.mergeAll(consoleDevtoolsLayer(), OmarchyThemeDevtools.layer)
    : Layer.empty,
  WallhavenService.layer,
  PexelsService.layer,
  MaterialService.layer,
)
  .pipe(Layer.provide(TauriHttpClient.layer))
  .pipe(Layer.provide(TauriFileSystem.layer));

export const { Provider, component, useRuntime } = createRuntime(MainLayer);
