import { Layer } from "effect";
import { consoleDevtoolsLayer, createRuntime } from "react-argon";

const { Provider, component, useRuntime } = createRuntime(
  Layer.mergeAll(import.meta.env.DEV ? consoleDevtoolsLayer() : Layer.empty),
);

export { Provider, component, useRuntime };
