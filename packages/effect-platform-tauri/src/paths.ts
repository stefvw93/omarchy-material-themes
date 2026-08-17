import { homeDir } from "@tauri-apps/api/path";
import { BaseDirectory } from "@tauri-apps/plugin-fs";
import { Context, Effect, Layer, PlatformError } from "effect";
import { errorTagOfCause } from "./utils";

type UnsafeMutable<T> = { -readonly [K in keyof T]: T[K] };
type TauriPathsDict = Omit<
  { [K in keyof typeof BaseDirectory]: Effect.Effect<string, PlatformError.PlatformError> },
  number
>;

const notImplementedError = PlatformError.systemError({
  _tag: "Unknown",
  module: "@effect-platform-tauri/Paths",
  method: "<not implemented>",
});
const notImplemented = () => Effect.fail(notImplementedError);

const wrap = (method: () => PromiseLike<string>) =>
  Effect.tryPromise({
    try: () => method(),
    catch: (cause) =>
      PlatformError.systemError({
        _tag: errorTagOfCause(cause),
        module: "@effect-platform-tauri/Paths",
        method: method.name,
        cause,
      }),
  });

export class Paths extends Context.Service<Paths, TauriPathsDict>()(
  "@effect-platform-tauri/Paths",
) {}

export const layer = Layer.effect(
  Paths,
  Effect.sync(() => {
    const paths: Partial<TauriPathsDict> = {
      Home: wrap(homeDir),
    };

    const proxy = new Proxy(paths as UnsafeMutable<TauriPathsDict>, {
      get: (target, prop) => {
        if (!(prop in target)) return notImplemented;
        return target[prop as keyof TauriPathsDict];
      },
    });

    return proxy;
  }),
);
