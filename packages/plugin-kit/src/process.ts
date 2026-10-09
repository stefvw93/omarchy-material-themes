import { Effect, Stream } from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/process";

export interface RunResult {
  readonly exitCode: number;
  /** stdout and stderr, interleaved. */
  readonly output: string;
}

/** Runs a command to completion and collects its exit code and output. */
export const run = Effect.fn("PluginKit.run")(function* (
  command: string,
  args: ReadonlyArray<string>,
  options: ChildProcess.CommandOptions = {},
) {
  const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const handle = yield* spawner.spawn(ChildProcess.make(command, [...args], options));
      const output = yield* handle.all.pipe(Stream.decodeText(), Stream.mkString);
      const exitCode = yield* handle.exitCode;
      return { exitCode, output } satisfies RunResult;
    }),
  );
});

/**
 * Runs a long-lived command until a line matches `until` (or `timeout`
 * passes), then kills it. Returns every line seen.
 */
export const runUntil = Effect.fn("PluginKit.runUntil")(function* (
  command: string,
  args: ReadonlyArray<string>,
  options: ChildProcess.CommandOptions,
  until: (line: string) => boolean,
  timeout: `${number} seconds`,
) {
  const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const handle = yield* spawner.spawn(ChildProcess.make(command, [...args], options));
      return yield* handle.all.pipe(
        Stream.decodeText(),
        Stream.splitLines,
        Stream.takeUntil(until),
        Stream.interruptWhen(Effect.sleep(timeout)),
        Stream.runCollect,
      );
    }),
  );
});
