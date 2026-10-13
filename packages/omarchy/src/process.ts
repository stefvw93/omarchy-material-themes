import { Effect, Stream } from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import { OmarchyError } from "./errors.ts";

/**
 * A way to run `command <args>` as a child process and get its output
 * (stdout and stderr), failing with an OmarchyError when it exits non-zero.
 */
export const commandOutput = (command: string) =>
  Effect.gen(function* () {
    const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
    return (args: ReadonlyArray<string>) =>
      Effect.scoped(
        Effect.gen(function* () {
          const handle = yield* spawner.spawn(ChildProcess.make(command, [...args]));
          const output = yield* handle.all.pipe(Stream.decodeText(), Stream.mkString);
          const exitCode = yield* handle.exitCode;
          if (exitCode !== 0) {
            return yield* new OmarchyError({
              message: `${command} ${args.join(" ")} exited ${exitCode}: ${output.trim()}`,
            });
          }
          return output;
        }),
      ).pipe(
        Effect.catchTag("PlatformError", (cause) =>
          Effect.fail(new OmarchyError({ message: `${command} ${args.join(" ")}`, cause })),
        ),
      );
  });
