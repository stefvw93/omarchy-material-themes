import { Layer } from "effect";
import { consoleDevtoolsLayer, createRuntime } from "react-argon";
import { WallhavenService } from "./wallhaven/service";
import { PexelsService } from "./pexels/service";

const { Provider, component, useRuntime } = createRuntime(
  Layer.mergeAll(
    import.meta.env.DEV ? consoleDevtoolsLayer() : Layer.empty,
    WallhavenService.layer,
    PexelsService.layer,
  ),
);

export { Provider, component, useRuntime };
