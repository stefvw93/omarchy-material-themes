import { connect } from "node:net";
import { Cause, Effect, Layer, Queue, Stream } from "effect";
import { Hyprland, HyprlandError, type HyprlandTransport, makeHyprland } from "./service.ts";

/** `$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/<name>`. */
const socketPath = (name: ".socket.sock" | ".socket2.sock") =>
  Effect.suspend(() => {
    const runtime = process.env["XDG_RUNTIME_DIR"];
    const instance = process.env["HYPRLAND_INSTANCE_SIGNATURE"];
    return runtime && instance
      ? Effect.succeed(`${runtime}/hypr/${instance}/${name}`)
      : Effect.fail(
          new HyprlandError({
            message: "not inside Hyprland: HYPRLAND_INSTANCE_SIGNATURE is unset",
          }),
        );
  });

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
