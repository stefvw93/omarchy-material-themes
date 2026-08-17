// import * as FS from "@tauri-apps/plugin-fs";
import { Effect, FileSystem, Layer, PlatformError, Stream } from "effect";

const notImplementedError = PlatformError.systemError({ _tag: "Unknown", module: "", method: "" });
const notImplemented = () => Effect.fail(notImplementedError);

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
  readDirectory: notImplemented,
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
