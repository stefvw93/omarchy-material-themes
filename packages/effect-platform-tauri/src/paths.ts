import { homeDir } from "@tauri-apps/api/path";
import { BaseDirectory } from "@tauri-apps/plugin-fs";
import { Context, Effect, Layer, PlatformError } from "effect";
import { errorTagOfCause } from "./utils";

type UnsafeMutable<T> = { -readonly [K in keyof T]: T[K] };
type TauriPathsDict = Omit<
  { [K in keyof typeof BaseDirectory]: Effect.Effect<string, PlatformError.PlatformError> },
  number
>;

const notImplemented = (name: string) =>
  Effect.fail(
    PlatformError.systemError({
      _tag: "Unknown",
      module: "@effect-platform-tauri/Paths",
      method: `${name}: not implemented`,
    }),
  );

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

export class TauriPaths extends Context.Service<TauriPaths, TauriPathsDict>()(
  "@effect-platform-tauri/Paths",
) {}

export const PathsTauri = Layer.effect(
  TauriPaths,
  Effect.sync(() => {
    const paths: Partial<TauriPathsDict> = {
      Home: wrap(homeDir),
    };

    const proxy = new Proxy(paths as UnsafeMutable<TauriPathsDict>, {
      get: (target, prop) => {
        // An Effect, like the implemented entries: `yield* paths.Config` must fail, not yield a function.
        if (!(prop in target)) return notImplemented(String(prop));
        return target[prop as keyof TauriPathsDict];
      },
    });

    return proxy;
  }),
);
