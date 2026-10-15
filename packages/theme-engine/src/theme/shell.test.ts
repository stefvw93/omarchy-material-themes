import { defaultTokens } from "@stef/tokens";
import { describe, expect, it } from "vite-plus/test";
import { createPaletteFromHex } from "../palette.ts";
import { scaleText } from "@stef/tokens/text-scale";
import { shellSections, textSpecOf, tintAlpha } from "./shell.ts";

const palette = createPaletteFromHex("#4285f4", {
  variant: "tonal-spot",
  mode: "dark",
  contrast: "high",
});
const s = shellSections({ palette, tokens: defaultTokens });
const v = (section: string, key: string) => s[section]?.[key]?.value;

describe("shell sections", () => {
  it("colour each surface with its component's roles", () => {
    expect(v("bar", "background")).toBe(palette.system.surface);
    expect(v("bar", "active")).toBe(palette.system.error);
    expect(v("popups", "background")).toBe(palette.system["surface-container-low"]);
    expect(v("tooltip", "background")).toBe(palette.system["inverse-surface"]);
    expect(v("notifications", "background")).toBe(palette.system["surface-container-low"]);
    expect(v("menu", "background")).toBe(palette.system["surface-container-high"]);
    expect(v("menu", "selected-background")).toBe(palette.system["secondary-container"]);
    expect(v("polkit", "background")).toBe(palette.system["surface-container-high"]);
    expect(v("lock", "background")).toBe(palette.system["surface-container-highest"]);
    expect(v("lock", "border-active")).toBe(palette.system.primary);
  });

  it("use the spec's state layers, focus indicator and scrim", () => {
    expect(v("controls", "hover-cursor-fill-alpha")).toBe(0.08);
    expect(v("controls", "focus-fill-alpha")).toBe(0.1);
    expect(v("controls", "pressed-fill-alpha")).toBe(0.1);
    expect(v("controls", "focus-border-width")).toBe(3);
    expect(v("controls", "focus-border")).toBe(palette.system.secondary);
    expect(v("menu", "scrim-alpha")).toBe(0.32);
  });

  it("show selected controls as a selected list item, tinted toward secondary-container", () => {
    expect(v("controls", "selected-color")).toBe(palette.system.secondary);
    expect(v("controls", "selected-border-width")).toBe(0);
    const alpha = v("controls", "selected-fill-alpha") as number;
    expect(alpha).toBeGreaterThan(0);
    expect(alpha).toBeLessThan(1);
  });

  it("fit a tint's alpha", () => {
    expect(tintAlpha("#ffffff", "#000000", "#808080")).toBe(0.5);
    expect(tintAlpha("#ffffff", "#000000", "#000000")).toBe(0);
    expect(tintAlpha("#ffffff", "#ffffff", "#000000")).toBe(0);
  });

  it("size the shell from the type scale and components", () => {
    expect(v("font", "body")).toBe(14);
    expect(v("font", "heading")).toBe(22);
    expect(v("bar", "size-horizontal")).toBe(36);
    expect(v("spacing", "control-height")).toBe(32);
    expect(v("spacing", "popup-row-height")).toBe(44);
  });

  it("apply density in 4dp steps", () => {
    const dense = shellSections({ palette, tokens: { ...defaultTokens, density: -3 } });
    expect(dense["spacing"]?.["control-height"]?.value).toBe(20);
    expect(dense["spacing"]?.["popup-row-height"]?.value).toBe(32);
    expect(dense["spacing"]?.["panel-padding"]?.value).toBe(12);
  });

  it("apply the type scale to text, and grow text containers by the extra line height", () => {
    const dense = shellSections({
      palette,
      tokens: { ...defaultTokens, density: -3, type: { scale: 1.5 } },
    });
    // 20 + label-large line 20 × 0.5; 32 + menu-item label line 20 × 0.5.
    expect(dense["spacing"]?.["control-height"]?.value).toBe(30);
    expect(dense["spacing"]?.["popup-row-height"]?.value).toBe(42);
    expect(dense["bar"]?.["size-horizontal"]?.value).toBe(46);
    // Padding and icons do not scale.
    expect(dense["spacing"]?.["control-padding-y"]?.value).toBe(0);
    expect(dense["font"]?.["icon"]?.value).toBe(20);
    expect(dense["font"]?.["body"]?.value).toBe(21);
    expect(dense["font"]?.["base-size"]).toBeUndefined();
  });

  it("name a source for every value", () => {
    for (const [name, section] of Object.entries(s))
      for (const [key, { source }] of Object.entries(section))
        expect(source, `${name}.${key}`).not.toBe("");
  });
});

describe("bar icon buttons", () => {
  const withWidth = (iconWidth: "narrow" | "default" | "wide") =>
    shellSections({
      palette,
      tokens: { ...defaultTokens, bar: { ...defaultTokens.bar, iconWidth } },
    });

  it("are extra-small icon buttons: a 20dp icon in a slot of the chosen width", () => {
    expect(s["bar"]!["icon-font"]!.value).toBe(20);
    expect(s["bar"]!["icon-canvas"]!.value).toBe(20);
    expect(withWidth("narrow")["bar"]!["icon-slot"]!.value).toBe(28);
    expect(withWidth("default")["bar"]!["status-slot"]!.value).toBe(32);
    expect(withWidth("wide")["bar"]!["icon-slot"]!.value).toBe(40);
  });

  it("grow with the text size: the icon by the scale, the slot by the icon", () => {
    const scaled = scaleText(textSpecOf({ palette, tokens: defaultTokens }), 18);
    expect(scaled["bar.icon-font"]).toBe(30);
    expect(scaled["bar.icon-slot"]).toBe(42);
    expect(scaled["bar.status-slot"]).toBe(42);
  });
});
