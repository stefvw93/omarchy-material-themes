import { describe, expect, it } from "vite-plus/test";
import { isDropped, normalize } from "./extract.ts";
import { readExtract } from "./generate.ts";

describe("isDropped", () => {
  it("keeps the public Web baseline", () => {
    expect(isDropped({})).toBe(false);
    expect(isDropped({ audience: "3p" })).toBe(false);
    expect(isDropped({ platform: "web", theme: "dark", contrast: "high.contrast" })).toBe(false);
  });

  it("drops Google's own products (1p)", () => {
    expect(isDropped({ audience: "1p.baseline" })).toBe(true);
  });

  it("drops other platforms", () => {
    expect(isDropped({ platform: "android" })).toBe(true);
  });

  it("drops entries in an iOS context group", () => {
    expect(isDropped({ "ios.weight.setting": "bold" })).toBe(true);
    expect(isDropped({ "ios.dark.theme.elevation": "elevated" })).toBe(true);
  });
});

describe("spec/extract.json", () => {
  const entries = Object.values(readExtract().tokens).flatMap((t) => t.entries);

  it("holds no entry the filter drops", () => {
    expect(entries.filter((e) => isDropped(e.tags))).toEqual([]);
  });
});

describe("normalize", () => {
  it("writes colours as hex, with alpha only when not opaque", () => {
    expect(normalize({ color: { red: 1, green: 0.5, blue: 0 } })).toEqual({
      type: "color",
      hex: "#ff8000",
    });
    expect(normalize({ color: { red: 0, green: 0, blue: 0, alpha: 0.5 } })).toEqual({
      type: "color",
      hex: "#00000080",
    });
  });

  it("reads lengths in dp unless a unit says otherwise", () => {
    expect(normalize({ length: { value: 12 } })).toEqual({ type: "length", value: 12, unit: "dp" });
    expect(normalize({ fontSize: { value: 14, unit: "POINTS" } })).toEqual({
      type: "length",
      value: 14,
      unit: "pt",
    });
  });

  it("rounds to six decimals", () => {
    expect(normalize({ opacity: 0.123456789 })).toEqual({ type: "opacity", value: 0.123457 });
  });

  it("reads shapes, with percentages kept as strings", () => {
    expect(
      normalize({
        shape: {
          family: "SHAPE_FAMILY_ROUNDED_CORNERS",
          topLeft: { value: 12 },
          topRight: { value: 50, unit: "PERCENT" },
        },
      }),
    ).toEqual({
      type: "shape",
      family: "rounded-corners",
      corners: { topLeft: 12, topRight: "50%" },
    });
  });

  it("is undefined for a missing or undefined value", () => {
    expect(normalize(undefined)).toEqual({ type: "undefined" });
    expect(normalize({ undefined: true })).toEqual({ type: "undefined" });
  });

  it("fails loudly on what it doesn't know, so a spec change can't slip through", () => {
    expect(() => normalize({ gradient: {} })).toThrow(/unknown value/);
    expect(() => normalize({ length: { value: 1, unit: "EMS" } })).toThrow(/unknown unit/);
    expect(() => normalize({ shape: { family: "SHAPE_FAMILY_SQUIRCLE" } })).toThrow(
      /unknown shape family/,
    );
    expect(() => normalize({ shape: { family: "SHAPE_FAMILY_CIRCULAR", morph: 1 } })).toThrow(
      /unknown shape fields morph/,
    );
  });
});
