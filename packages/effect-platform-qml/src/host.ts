/**
 * Capabilities the QML side hands to bundled code. Quickshell's V4 engine has
 * no `setTimeout` and a read-only global object, so timers have to come from
 * QML `Timer` objects created by the plugin.
 */
export interface QmlHost {
  /** Starts a one-shot timer; returns an opaque handle. */
  readonly startTimer: (callback: () => void, ms: number) => unknown;
  /** Stops a timer that has not fired yet. */
  readonly stopTimer: (handle: unknown) => void;
  readonly log: (message: string) => void;
}

let current: QmlHost | undefined;

/** Must run before any Effect that sleeps or yields to a timer. */
export const install = (host: QmlHost): void => {
  current = host;
};

export const host = (): QmlHost => {
  if (current === undefined) {
    throw new Error("effect-platform-qml: install(host) was not called");
  }
  return current;
};
