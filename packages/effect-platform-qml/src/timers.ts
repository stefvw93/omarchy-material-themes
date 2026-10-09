import { host } from "./host.ts";

/**
 * `setTimeout`/`clearTimeout` backed by the QML host. The plugin build injects
 * these for every bare `setTimeout` reference in bundled code (rolldown
 * `transform.inject`), including inside Effect's Clock and Scheduler.
 */
interface Pending {
  handle: unknown;
  done: boolean;
}

let nextId = 1;
const pending = new Map<number, Pending>();

export const setTimeout = (callback: (...args: Array<unknown>) => void, ms = 0): number => {
  const id = nextId++;
  const entry: Pending = { handle: undefined, done: false };
  pending.set(id, entry);
  entry.handle = host().startTimer(
    () => {
      if (entry.done) return;
      entry.done = true;
      pending.delete(id);
      callback();
    },
    Math.max(0, ms),
  );
  return id;
};

export const clearTimeout = (id: number | undefined): void => {
  if (id === undefined) return;
  const entry = pending.get(id);
  if (entry === undefined || entry.done) return;
  entry.done = true;
  pending.delete(id);
  host().stopTimer(entry.handle);
};

/** Timers that are scheduled and have not fired; for leak checks in tests. */
export const pendingCount = (): number => pending.size;
