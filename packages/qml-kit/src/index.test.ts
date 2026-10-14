import { describe, expect, it } from "vite-plus/test";
import {
  compareReadingOrder,
  monitorGeometry,
  normalizeAddress,
  parseCssGaps,
  readingOrder,
} from "./index.ts";

describe("parseCssGaps", () => {
  it("reads CSS shorthand as [top, right, bottom, left]", () => {
    expect(parseCssGaps("8 6 4 2")).toEqual([8, 6, 4, 2]);
    expect(parseCssGaps("5")).toEqual([5, 5, 5, 5]);
    expect(parseCssGaps("4 10")).toEqual([4, 10, 4, 10]);
    expect(parseCssGaps("1 2 3")).toEqual([1, 2, 3, 2]);
    expect(parseCssGaps(" 8  8 ")).toEqual([8, 8, 8, 8]);
  });

  it("gives undefined for what it can't read", () => {
    expect(parseCssGaps("a b")).toBeUndefined();
    expect(parseCssGaps("1 2 3 4 5")).toBeUndefined();
    expect(parseCssGaps("")).toBeUndefined();
    expect(parseCssGaps(undefined)).toBeUndefined();
  });
});

describe("normalizeAddress", () => {
  it("adds the 0x prefix once", () => {
    expect(normalizeAddress("abc")).toBe("0xabc");
    expect(normalizeAddress("0xabc")).toBe("0xabc");
    expect(normalizeAddress(undefined)).toBe("");
  });
});

describe("readingOrder", () => {
  const w = (rx: number, ry: number, floating = false) => ({ rx, ry, floating });

  it("orders columns left to right, then top to bottom, floating last", () => {
    const a = w(0, 500);
    const b = w(3, 0); // same column as a: within 4 px
    const c = w(900, 0);
    const f = w(0, 0, true);
    expect(readingOrder([f, c, a, b])).toEqual([b, a, c, f]);
  });

  it("is the comparator expo used inline", () => {
    const expo = (a: ReturnType<typeof w>, b: ReturnType<typeof w>) => {
      if (a.floating !== b.floating) return a.floating ? 1 : -1;
      if (Math.abs(a.rx - b.rx) > 4) return a.rx - b.rx;
      return a.ry - b.ry;
    };
    const pairs = [
      [w(0, 0), w(10, 0)],
      [w(0, 9), w(2, 1)],
      [w(5, 5, true), w(0, 0)],
    ] as const;
    for (const [a, b] of pairs) expect(compareReadingOrder(a, b)).toBe(expo(a, b));
  });
});

describe("monitorGeometry", () => {
  const mon = { name: "DP-1", x: 2560, y: 0, width: 3840, height: 2160, scale: 1.5 };

  it("returns logical size and the matching screen", () => {
    const screens = [{ name: "HDMI-A-1" }, { name: "DP-1" }];
    expect(monitorGeometry(mon, screens)).toEqual({
      x: 2560,
      y: 0,
      w: 2560,
      h: 1440,
      screen: screens[1],
    });
  });

  it("treats a missing scale as 1 and an unknown screen as null", () => {
    expect(monitorGeometry({ ...mon, scale: 0 }, [])).toMatchObject({ w: 3840, screen: null });
  });
});
