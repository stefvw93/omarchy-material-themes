import { describe, expect, it } from "vite-plus/test";
import { groupbarLua, shellPatch, specOf, type TextSpec } from "./text.ts";

const spec: TextSpec = {
  typeScale: 1,
  sizes: { "font.body": 14, "groupbar.font_size": 14 },
  containers: {
    "spacing.popup-row-height": { height: 36, lineHeight: 20 },
    "groupbar.height": { height: 32, lineHeight: 20 },
  },
};
const theme = { "font.body": "14", "spacing.popup-row-height": "36", "menu.text": "#ffffff" };

describe("specOf", () => {
  it("reads omaterial.json's text spec", () => {
    expect(specOf(JSON.stringify({ system: {}, text: spec }))).toEqual(spec);
  });

  it("is null for other themes and broken files", () => {
    expect(specOf(JSON.stringify({ system: {} }))).toBeNull();
    expect(specOf("{")).toBeNull();
    expect(specOf(JSON.stringify({ text: { typeScale: 1 } }))).toBeNull();
  });
});

describe("shellPatch", () => {
  it("is null at the size the theme was written for", () => {
    expect(shellPatch(spec, 12, theme)).toBeNull();
  });

  it("rescales the shell's keys and keeps the rest", () => {
    expect(shellPatch(spec, 20, theme)).toEqual({
      "font.body": "23",
      "spacing.popup-row-height": "49",
      "menu.text": "#ffffff",
    });
  });

  it("is null once applied, so its own change ends there", () => {
    expect(shellPatch(spec, 20, shellPatch(spec, 20, theme)!)).toBeNull();
  });
});

describe("groupbarLua", () => {
  it("sizes Hyprland's group bar", () => {
    expect(groupbarLua(spec, 20)).toBe(
      "hl.config({ group = { groupbar = { font_size = 23, height = 45 } } })",
    );
  });

  it("is empty without group bar keys", () => {
    expect(groupbarLua({ ...spec, sizes: {}, containers: {} }, 20)).toBe("");
  });
});
