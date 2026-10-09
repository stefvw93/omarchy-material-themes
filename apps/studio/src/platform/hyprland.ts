import { Channel, invoke } from "@tauri-apps/api/core";
import { Hyprland, HyprlandError, type HyprlandTransport, makeHyprland } from "@stef/hyprland";
import { Effect, Layer, Queue, Stream } from "effect";

/**
 * Hyprland from the webview: the Rust side only moves bytes over the sockets
 * (hypr_request, hypr_events); @stef/hyprland decodes them, exactly as the CLI.
 */
const transport: HyprlandTransport = {
  request: (command) =>
    Effect.tryPromise({
      try: () => invoke<string>("hypr_request", { command }),
      catch: (cause) => new HyprlandError({ message: `request "${command}" failed`, cause }),
    }),
  eventLines: Stream.callback<string, HyprlandError>((queue) =>
    Effect.acquireRelease(
      Effect.tryPromise({
        try: () => {
          const channel = new Channel<string>();
          channel.onmessage = (line) => void Queue.offerUnsafe(queue, line);
          return invoke<number>("hypr_events", { channel });
        },
        catch: (cause) => new HyprlandError({ message: "event subscription failed", cause }),
      }),
      (id) => Effect.promise(() => invoke("hypr_events_stop", { id })),
    ),
  ),
};

export const HyprlandTauri = Layer.succeed(Hyprland, makeHyprland(transport));
