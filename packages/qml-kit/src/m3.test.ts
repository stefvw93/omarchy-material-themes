import { defaultTokens } from "@stef/tokens/runtime";
import { describe, expect, it } from "vite-plus/test";
import { fallbackScheme, resolveM3, schemeOf } from "./m3.ts";
import { m3Data } from "./m3.generated.ts";

const omarchy = {
  background: "#101315",
  foreground: "#cacccc",
  accent: "#7aa2f7",
  muted: "#707880",
  urgent: "#a55555",
};

describe("resolveM3", () => {
  const m3 = resolveM3(defaultTokens);

  it("resolves steps to dp", () => {
    expect(m3.space["space100"]).toBe(8);
    expect(m3.corner["medium"]).toBe(12);
    expect(m3.windowCorner).toBe(12);
    expect(m3.elevation["level3"]).toBe(6);
    expect(m3.expo).toMatchObject({ outerMargin: 48, tileGap: 24, tilePadding: 8, rise: 24 });
    expect(m3.periphery).toMatchObject({ bandMargin: 16, cardGap: 10, groupGap: 20 });
  });

  it("carries the spec's states, scrim and springs", () => {
    expect(m3.state).toMatchObject({ hover: 0.08, dragged: 0.16 });
    expect(m3.state.focusIndicator).toEqual({ thickness: 3, outerOffset: 2, innerOffset: -3 });
    expect(m3.scrimOpacity).toBe(0.32);
    expect(m3.connectedButtonGroup).toEqual({
      padding: 2,
      corners: { xsmall: 4, small: 8, medium: 8, large: 16, xlarge: 20 },
    });
    expect(m3.springs.spatial_default.stiffness).toBe(700);
  });

  it("keeps component colours as roles", () => {
    expect(m3.comp["md.comp.filled-card.container.color"]).toEqual({
      role: "surface-container-highest",
    });
    expect(m3.comp["md.comp.plain-tooltip.container.shape"]).toBe(4);
  });

  it("scales type with the Omarchy text size and tokens.type.scale", () => {
    expect(m3.type["title-medium"]).toEqual({
      size: 16,
      lineHeight: 24,
      weight: 500,
      tracking: 0.15,
    });
    const big = resolveM3({ ...defaultTokens, type: { scale: 1.5 } }, 16);
    expect(big.textScale).toBe(2);
    expect(big.type["title-medium"]).toMatchObject({ size: 32, lineHeight: 48, weight: 500 });
    expect(big.comp["md.comp.plain-tooltip.supporting-text.type"]).toMatchObject({ size: 24 });
  });

  it("draws elevation as the Web's ambient shadow", () => {
    const dragged = m3.comp["md.comp.filled-card.dragged.container.elevation"] as number;
    expect(dragged).toBe(6);
    expect(m3.shadowAt(dragged)).toEqual({ blur: 8, spread: 3, x: 0, y: 4, opacity: 0.15 });
    expect(m3.shadowAt(0).blur).toBe(0);
  });

  it("applies density in 4dp steps", () => {
    expect(resolveM3({ ...defaultTokens, density: -2 }).densityPx).toBe(-8);
  });
});

describe("schemeOf", () => {
  const system: Record<string, string> = {};
  for (const role of m3Data.roles) system[role] = "#123456";

  it("uses omaterial.json's roles when the theme is Omaterial", () => {
    const s = schemeOf(JSON.stringify({ source: { mode: "light" }, system }), omarchy);
    expect(s).toMatchObject({ exact: true, mode: "light" });
    expect(s.color["primary"]).toBe("#123456");
  });

  it("falls back to the Omarchy colours otherwise", () => {
    for (const json of [
      undefined,
      "{",
      JSON.stringify({ source: {}, system: { primary: "#fff" } }),
    ]) {
      const s = schemeOf(json, omarchy);
      expect(s).toMatchObject({ exact: false, mode: "dark" });
      expect(s.color["surface"]).toBe(omarchy.background);
    }
    expect(schemeOf(undefined, { ...omarchy, background: "#fafafa" }).mode).toBe("light");
  });
});

describe("fallbackScheme", () => {
  const s = fallbackScheme(omarchy);

  it("defines every role", () => {
    expect(Object.keys(s).sort()).toEqual([...m3Data.roles].sort());
  });

  it("maps role families onto the Omarchy colours", () => {
    expect(s).toMatchObject({
      surface: omarchy.background,
      "surface-container-highest": omarchy.background,
      "inverse-on-surface": omarchy.background,
      "on-surface": omarchy.foreground,
      "inverse-surface": omarchy.foreground,
      "on-surface-variant": omarchy.muted,
      "outline-variant": omarchy.muted,
      primary: omarchy.accent,
      "secondary-container": omarchy.accent,
      "inverse-primary": omarchy.accent,
      "on-primary": omarchy.background,
      "on-tertiary-container": omarchy.background,
      error: omarchy.urgent,
      "on-error": omarchy.background,
      scrim: "#000000",
      shadow: "#000000",
    });
  });
});
