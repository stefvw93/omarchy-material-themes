import { Cause, Effect, Fiber, Queue, Stream } from "effect";
import { install, type QmlHost } from "./host.ts";

/** What QML holds on to: a way in (intents) and a way to stop. */
export interface CoreHandle<Intent> {
  /** Hands the core an intent (a key press, a Hyprland event, open/close). */
  readonly dispatch: (intent: Intent) => void;
  /** Interrupts the program; its finalizers run. Call from Component.onDestruction. */
  readonly dispose: () => void;
}

/**
 * Starts a plugin's Effect core inside the QML engine. QML builds `host` (a
 * plain JS object with timers and whatever the plugin needs from Quickshell),
 * the program reads intents as a Stream and talks back through `host`.
 *
 *   property var core: null
 *   Component.onCompleted: core = Core.start(host)
 *   Component.onDestruction: if (core) core.dispose()
 */
export const runCore = <H extends QmlHost, Intent>(
  host: H,
  program: (intents: Stream.Stream<Intent>) => Effect.Effect<void>,
): CoreHandle<Intent> => {
  install(host);
  const intents = Effect.runSync(Queue.unbounded<Intent>());
  const fiber = Effect.runFork(
    program(Stream.fromQueue(intents)).pipe(
      Effect.tapCause((cause) =>
        Cause.hasInterruptsOnly(cause)
          ? Effect.void
          : Effect.sync(() => host.log(`core stopped: ${Cause.pretty(cause)}`)),
      ),
    ),
  );
  return {
    dispatch: (intent) => void Queue.offerUnsafe(intents, intent),
    dispose: () => void Effect.runFork(Fiber.interrupt(fiber)),
  };
};
