import { describe, expect, it } from "vite-plus/test";
import { fontBaseSizeOf, scaleText, type TextSpec } from "./text-scale.ts";

const spec: TextSpec = {
  typeScale: 1,
  sizes: { "font.body": 14, "font.caption": 11 },
  containers: { "spacing.popup-row-height": { height: 36, lineHeight: 20 } },
};

describe("scaleText", () => {
  it("is the 1× theme at Omarchy's default text size", () => {
    expect(scaleText(spec, 12)).toEqual({
      "font.body": 14,
      "font.caption": 11,
      "spacing.popup-row-height": 36,
    });
  });

  it("multiplies sizes by text size / 12 and grows containers by the extra line height", () => {
    expect(scaleText(spec, 20)).toEqual({
      "font.body": 23,
      "font.caption": 18,
      "spacing.popup-row-height": 49,
    });
  });

  it("shrinks text but never a container below its 1× height", () => {
    expect(scaleText(spec, 9)).toEqual({
      "font.body": 11,
      "font.caption": 8,
      "spacing.popup-row-height": 36,
    });
  });

  it("multiplies the text size with tokens.type.scale", () => {
    expect(scaleText({ ...spec, typeScale: 0.857 }, 14)["font.body"]).toBe(14);
  });

  it("derives halves from the scaled container", () => {
    const round = { ...spec, halves: { "groupbar.rounding": "spacing.popup-row-height" } };
    expect(scaleText(round, 12)["groupbar.rounding"]).toBe(18);
    expect(scaleText(round, 20)["groupbar.rounding"]).toBe(25);
  });

  it("treats a missing base-size as the default", () => {
    expect(scaleText(spec, 0)["font.body"]).toBe(14);
  });
});

describe("fontBaseSizeOf", () => {
  it("reads base-size from the [font] section only", () => {
    const toml = '[bar]\nbase-size = 99\n\n[font]\nfamily = "x"\nbase-size = 16 # px\n';
    expect(fontBaseSizeOf(toml)).toBe(16);
  });

  it("is undefined when unset", () => {
    expect(fontBaseSizeOf("")).toBeUndefined();
    expect(fontBaseSizeOf("[bar]\nbase-size = 14\n")).toBeUndefined();
    expect(fontBaseSizeOf("[font]\nfamily = 'x'\n[bar]\nbase-size = 14\n")).toBeUndefined();
  });
});
