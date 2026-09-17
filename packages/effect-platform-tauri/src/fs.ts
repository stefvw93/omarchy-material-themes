import * as TauriFS from "@tauri-apps/plugin-fs";
import { Effect, FileSystem, Layer, PlatformError, Stream } from "effect";
import { errorTagOfCause } from "./utils";

const notImplementedError = (name: string) =>
  PlatformError.systemError({
    _tag: "Unknown",
    module: "@effect-platform-tauri/FileSystem",
    method: `${name}: not implemented`,
  });

const notImplemented = (name: string) => () => Effect.fail(notImplementedError(name));

const wrap =
  <Args extends any[], Resolved>(methodName: string, fn: (...args: Args) => Promise<Resolved>) =>
  (...args: Args) =>
    Effect.tryPromise({
      try: () => fn(...args),
      catch: (cause) =>
        PlatformError.systemError({
          _tag: errorTagOfCause(cause),
          module: "@effect-platform-tauri/FileSystem",
          method: methodName,
          pathOrDescriptor: args[0],
          cause,
        }),
    });

const readDirectory: FileSystem.FileSystem["readDirectory"] = (path, options) => {
  if (options?.recursive) {
    return Effect.fail(
      PlatformError.systemError({
        _tag: "Unknown",
        module: "@effect-platform-tauri/FileSystem",
        method: "readDirectory",
        pathOrDescriptor: path,
        cause: "`recursive` is not implemented",
      }),
    );
  }

  return Effect.tryPromise({
    try: () => TauriFS.readDir(path, {}),
    catch: (cause) =>
      PlatformError.systemError({
        _tag: errorTagOfCause(cause),
        module: "@effect-platform-tauri/FileSystem",
        method: "readDirectory",
        pathOrDescriptor: path,
        cause,
      }),
  }).pipe(Effect.map((entries) => entries.map((e) => e.name)));
};

const access: FileSystem.FileSystem["access"] = (path, _options) =>
  Effect.tryPromise({
    try: () => TauriFS.exists(path),
    catch: (cause) =>
      PlatformError.systemError({
        _tag: errorTagOfCause(cause),
        module: "@effect-platform-tauri/FileSystem",
        method: "access",
        pathOrDescriptor: path,
        cause,
      }),
  }).pipe(
    Effect.flatMap((found) =>
      found
        ? Effect.void
        : Effect.fail(
            PlatformError.systemError({
              _tag: "NotFound",
              module: "@effect-platform-tauri/FileSystem",
              method: "access",
              pathOrDescriptor: path,
            }),
          ),
    ),
  );

const tauriFS = FileSystem.make({
  access,
  chmod: notImplemented("chmod"),
  chown: notImplemented("chown"),
  copy: notImplemented("copy"),
  copyFile: notImplemented("copyFile"),
  glob: notImplemented("glob"),
  link: notImplemented("link"),
  makeDirectory: wrap("makeDirectory", TauriFS.mkdir),
  makeTempDirectory: notImplemented("makeTempDirectory"),
  makeTempDirectoryScoped: notImplemented("makeTempDirectoryScoped"),
  makeTempFile: notImplemented("makeTempFile"),
  makeTempFileScoped: notImplemented("makeTempFileScoped"),
  open: notImplemented("open"),
  readDirectory,
  readFile: notImplemented("readFile"),
  readLink: notImplemented("readLink"),
  realPath: notImplemented("realPath"),
  remove: wrap("remove", TauriFS.remove),
  rename: notImplemented("rename"),
  stat: notImplemented("stat"),
  symlink: notImplemented("symlink"),
  truncate: notImplemented("truncate"),
  utimes: notImplemented("utimes"),
  writeFile: wrap("writeFile", TauriFS.writeFile),
  watch(_path, _options) {
    return Stream.fail(notImplementedError("watch"));
  },
});

/**
 * Provides the `FileSystem` service backed by @tauri-apps/plugin-fs, including
 * file operations, directory operations, links, metadata, and file watching.
 */
export const layer: Layer.Layer<FileSystem.FileSystem> = Layer.effect(FileSystem.FileSystem)(
  Effect.succeed(tauriFS),
);
