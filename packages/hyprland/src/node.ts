import { connect } from "node:net";
import { Cause, Config, Effect, Layer, Queue, Stream } from "effect";
import { Hyprland, HyprlandError, type HyprlandTransport, makeHyprland } from "./service.ts";

/** `$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/<name>`. */
export const socketPath = (name: ".socket.sock" | ".socket2.sock") =>
  Config.all({
    runtime: Config.String("XDG_RUNTIME_DIR"),
    instance: Config.String("HYPRLAND_INSTANCE_SIGNATURE"),
  }).pipe(
    Effect.map(({ runtime, instance }) => `${runtime}/hypr/${instance}/${name}`),
    Effect.mapError(
      (cause) =>
        new HyprlandError({
          message: "not inside Hyprland: HYPRLAND_INSTANCE_SIGNATURE or XDG_RUNTIME_DIR is unset",
          cause,
        }),
    ),
  );

/** One request on the command socket: write it, read until Hyprland closes. */
const request = (command: string) =>
  Effect.flatMap(socketPath(".socket.sock"), (path) =>
    Effect.callback<string, HyprlandError>((resume) => {
      const chunks: Buffer[] = [];
      const socket = connect(path);
      socket.on("connect", () => socket.end(command));
      socket.on("data", (chunk) => chunks.push(chunk));
      socket.on("end", () => resume(Effect.succeed(Buffer.concat(chunks).toString("utf8"))));
      socket.on("error", (cause) =>
        resume(Effect.fail(new HyprlandError({ message: `request "${command}" failed`, cause }))),
      );
      return Effect.sync(() => socket.destroy());
    }),
  );

/** socket2's event lines, for as long as the stream is consumed. */
const eventLines = Stream.unwrap(
  Effect.map(socketPath(".socket2.sock"), (path) =>
    Stream.callback<string, HyprlandError>((queue) =>
      Effect.acquireRelease(
        Effect.sync(() => {
          let pending = "";
          const socket = connect(path);
          socket.setEncoding("utf8");
          socket.on("data", (text: string) => {
            const lines = (pending + text).split("\n");
            pending = lines.pop() ?? "";
            for (const line of lines) if (line) Queue.offerUnsafe(queue, line);
          });
          socket.on("error", (cause) =>
            Queue.failCauseUnsafe(
              queue,
              Cause.fail(new HyprlandError({ message: "event socket failed", cause })),
            ),
          );
          socket.on("close", () => Queue.endUnsafe(queue));
          return socket;
        }),
        (socket) => Effect.sync(() => socket.destroy()),
      ),
    ),
  ),
);

export const nodeTransport: HyprlandTransport = { request, eventLines };

/** Hyprland over its UNIX sockets, for the CLI and other Node tools. */
export const HyprlandNode = Layer.succeed(Hyprland, makeHyprland(nodeTransport));
