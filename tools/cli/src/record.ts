import type { HyprlandFixture } from "@stef/hyprland";
import { nodeTransport } from "@stef/hyprland/node";
import { Console, Duration, Effect, FileSystem, Stream } from "effect";

const snapshotCommands = ["j/clients", "j/monitors", "j/workspaces", "j/activewindow", "j/binds"];

/**
 * Records a fixture for tests: a snapshot of the queries plugins make, then
 * socket2's event lines for `seconds`. Replay with `fixtureTransport`.
 */
export const record = Effect.fn("Stef.record")(function* (file: string, seconds: number) {
  const fs = yield* FileSystem.FileSystem;
  const responses: Record<string, unknown> = {};
  for (const command of snapshotCommands) {
    responses[command] = JSON.parse(yield* nodeTransport.request(command));
  }
  yield* Console.log(`recording Hyprland events for ${seconds}s…`);
  const events = yield* nodeTransport.eventLines.pipe(
    Stream.interruptWhen(Effect.sleep(Duration.seconds(seconds))),
    Stream.runCollect,
  );
  const fixture: HyprlandFixture = { responses, events };
  yield* fs.writeFileString(file, `${JSON.stringify(fixture, null, 2)}\n`);
  yield* Console.log(
    `wrote ${file}: ${events.length} events, ${snapshotCommands.length} snapshots`,
  );
});
