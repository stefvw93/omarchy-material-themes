import { Duration, Effect, FileSystem, Option, Schedule, Stream } from "effect";

/**
 * A file's contents, read now and then every `every`, passing only changes
 * on; `undefined` while it is missing or unreadable. Studio has no file
 * watcher yet (effect-platform-tauri's FileSystem has no `watch`), so the
 * files it follows are polled; they are small.
 */
export const polled = (path: string, every: Duration.Input = "2 seconds") =>
  Stream.unwrap(
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const read = fs.readFileString(path).pipe(Effect.option, Effect.map(Option.getOrUndefined));
      return Stream.fromEffectSchedule(read, Schedule.spaced(every)).pipe(Stream.changes);
    }),
  );
