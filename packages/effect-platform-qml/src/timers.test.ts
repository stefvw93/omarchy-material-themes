import { beforeEach, describe, expect, it } from "vite-plus/test";
import { install } from "./host.ts";
import { clearTimeout, pendingCount, setTimeout } from "./timers.ts";

interface FakeTimer {
  callback: () => void;
  ms: number;
  stopped: boolean;
}

const timers: Array<FakeTimer> = [];

beforeEach(() => {
  timers.length = 0;
  install({
    startTimer: (callback, ms) => {
      const t = { callback, ms, stopped: false };
      timers.push(t);
      return t;
    },
    stopTimer: (handle) => {
      (handle as FakeTimer).stopped = true;
    },
    log: () => {},
  });
});

describe("host-backed timers", () => {
  it("fires through the host timer and forgets the handle", () => {
    let fired = 0;
    setTimeout(() => fired++, 25);
    expect(timers[0]?.ms).toBe(25);
    expect(pendingCount()).toBe(1);
    timers[0]?.callback();
    expect(fired).toBe(1);
    expect(pendingCount()).toBe(0);
  });

  it("clamps negative delays to zero", () => {
    setTimeout(() => {}, -5);
    expect(timers[0]?.ms).toBe(0);
    timers[0]?.callback();
  });

  it("stops the host timer on clear and never fires afterwards", () => {
    let fired = 0;
    const id = setTimeout(() => fired++, 10);
    clearTimeout(id);
    expect(timers[0]?.stopped).toBe(true);
    timers[0]?.callback();
    expect(fired).toBe(0);
    expect(pendingCount()).toBe(0);
  });

  it("ignores clearing unknown or already-fired ids", () => {
    const id = setTimeout(() => {}, 0);
    timers[0]?.callback();
    clearTimeout(id);
    clearTimeout(undefined);
    clearTimeout(9999);
    expect(timers[0]?.stopped).toBe(false);
  });
});
