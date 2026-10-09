import { Effect, Layer, Stream } from "effect";
import { Hyprland, HyprlandError, type HyprlandTransport, makeHyprland } from "./service.ts";

/**
 * A recorded Hyprland session (`stef hypr record`): request responses by
 * command, and the socket2 lines in order.
 */
export interface HyprlandFixture {
  readonly responses: Readonly<Record<string, unknown>>;
  readonly events: ReadonlyArray<string>;
}

/**
 * Replays a fixture. Unknown requests fail; `requests` records every command
 * sent, so tests can assert what a program asked Hyprland to do.
 */
export const fixtureTransport = (fixture: HyprlandFixture) => {
  const requests: string[] = [];
  const transport: HyprlandTransport = {
    request: (command) =>
      Effect.suspend(() => {
        requests.push(command);
        if (command.startsWith("eval ") || command.startsWith("reload"))
          return Effect.succeed("ok");
        const response = fixture.responses[command];
        return response === undefined
          ? Effect.fail(new HyprlandError({ message: `fixture has no response for "${command}"` }))
          : Effect.succeed(typeof response === "string" ? response : JSON.stringify(response));
      }),
    eventLines: Stream.fromIterable(fixture.events),
  };
  return { transport, requests, layer: Layer.succeed(Hyprland, makeHyprland(transport)) };
};
