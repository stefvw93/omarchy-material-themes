import { readDir } from "@tauri-apps/plugin-fs";
import { Effect, FileSystem, Layer, PlatformError, Stream } from "effect";
import { errorTagOfCause } from "./utils";

const notImplementedError = PlatformError.systemError({
  _tag: "Unknown",
  module: "@effect-platform-tauri/FileSystem",
  method: "<not implemented>",
});
const notImplemented = () => Effect.fail(notImplementedError);

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
    try: () => readDir(path),
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

const makeFileSystem = FileSystem.make({
  access: notImplemented,
  chmod: notImplemented,
  chown: notImplemented,
  copy: notImplemented,
  copyFile: notImplemented,
  glob: notImplemented,
  link: notImplemented,
  makeDirectory: notImplemented,
  makeTempDirectory: notImplemented,
  makeTempDirectoryScoped: notImplemented,
  makeTempFile: notImplemented,
  makeTempFileScoped: notImplemented,
  open: notImplemented,
  readDirectory,
  readFile: notImplemented,
  readLink: notImplemented,
  realPath: notImplemented,
  remove: notImplemented,
  rename: notImplemented,
  stat: notImplemented,
  symlink: notImplemented,
  truncate: notImplemented,
  utimes: notImplemented,
  watch(_path, _options) {
    return Stream.fail(notImplementedError);
  },
  writeFile: notImplemented,
});

/**
 * Provides the `FileSystem` service backed by @tauri-apps/plugin-fs, including
 * file operations, directory operations, links, metadata, and file watching.
 */
export const layer: Layer.Layer<FileSystem.FileSystem> = Layer.effect(FileSystem.FileSystem)(
  Effect.succeed(makeFileSystem),
);
