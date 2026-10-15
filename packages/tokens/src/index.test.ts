import { Schema } from "effect";
import { describe, expect, it } from "vite-plus/test";
import {
  cornerRadius,
  cssVariables,
  defaultTokens,
  gapsOf,
  groupbarOf,
  hyprlandTokensLua,
  layoutOf,
  migrateTokens,
  resolveTokens,
  spacing,
  springsOf,
  TokensSchema,
} from "./index.ts";

describe("defaultTokens", () => {
  it("satisfy the Schema", () => {
    expect(Schema.decodeUnknownSync(TokensSchema)(defaultTokens)).toEqual(defaultTokens);
  });

  it("name spec steps: measurement and corner", () => {
    expect(spacing("space100")).toBe(8);
    expect(spacing(defaultTokens.layout.margin)).toBe(24);
    expect(cornerRadius(defaultTokens.shape.windowCorner)).toBe(12);
  });
});

describe("resolveTokens", () => {
  it("falls back to the defaults for a missing or broken file", () => {
    expect(resolveTokens(undefined)).toBe(defaultTokens);
    expect(resolveTokens("{ not json")).toBe(defaultTokens);
  });

  it("overlays known keys and keeps the rest", () => {
    const tokens = resolveTokens(
      JSON.stringify({
        version: 2,
        shape: { windowCorner: "large" },
        periphery: { cardGap: "space50" },
      }),
    );
    expect(tokens.shape.windowCorner).toBe("large");
    expect(tokens.periphery.cardGap).toBe("space50");
    expect(tokens.expo).toEqual(defaultTokens.expo);
  });

  it("ignores unknown keys, wrong types and choices outside their list", () => {
    const tokens = resolveTokens(
      JSON.stringify({
        version: 2,
        shape: { windowCorner: "full" },
        layout: { margin: 24, spacer: "space7" },
        density: -4,
        nonsense: true,
      }),
    );
    expect(tokens.shape).toEqual(defaultTokens.shape);
    expect(tokens.layout).toEqual(defaultTokens.layout);
    expect(tokens.density).toBe(0);
    expect(tokens).not.toHaveProperty("nonsense");
  });

  it("rejects an unknown motion scheme and switches springs with a known one", () => {
    expect(
      resolveTokens(JSON.stringify({ version: 2, motion: { scheme: "bouncy" } })).motion.scheme,
    ).toBe("standard");
    const expressive = resolveTokens(
      JSON.stringify({ version: 2, motion: { scheme: "expressive" } }),
    );
    expect(springsOf(expressive).spatial_default).toEqual({ stiffness: 380, ratio: 0.8 });
  });
});

describe("bar tokens", () => {
  it("default to a round extra-small connected group with the spec's 2dp gap, inset 4dp", () => {
    expect(defaultTokens.bar).toEqual({
      shape: "round",
      size: "xsmall",
      gap: "space25",
      padding: "space50",
      inset: "space50",
      iconWidth: "default",
    });
  });

  it("take known choices and reject the rest", () => {
    const tokens = resolveTokens(
      JSON.stringify({
        version: 2,
        bar: {
          shape: "square",
          size: "blob",
          padding: "space100",
          inset: "space300",
          iconWidth: "wide",
        },
      }),
    );
    expect(tokens.bar).toEqual({
      shape: "square",
      size: "xsmall",
      gap: "space25",
      padding: "space100",
      inset: "space300",
      iconWidth: "wide",
    });
    expect(resolveTokens(JSON.stringify({ version: 2, bar: { inset: "12px" } })).bar.inset).toBe(
      "space50",
    );
  });
});

describe("migrateTokens", () => {
  const v1 = {
    gaps: { inner: 2, outer: 4, workspaces: 32 },
    border: { width: 1, gradientAngle: 55 },
    blur: { size: 6, passes: 3 },
    shadow: { range: 60, renderPower: 4, lightAngle: 90, distance: 8 },
    motion: { scheme: "expressive" },
    expo: {
      outerMargin: 48,
      tileGap: 24,
      tilePadding: 8,
      rise: 24,
      tileStagger: 80,
      windowStagger: 35,
      windowLead: 70,
      tileScaleFrom: 0.92,
      windowScaleFrom: 0.94,
    },
    periphery: {
      bandMargin: 16,
      cardGap: 10,
      groupGap: 20,
      slideDuration: 320,
      fadeDuration: 150,
      ghostBlur: 96,
    },
  };

  it("moves v1's default pixel values to their exact steps", () => {
    const tokens = resolveTokens(JSON.stringify(v1));
    expect(tokens.expo).toEqual(defaultTokens.expo);
    expect(tokens.periphery).toEqual(defaultTokens.periphery);
    expect(tokens.motion.scheme).toBe("expressive");
    expect(tokens.blur).toEqual({ size: 6, passes: 3 });
  });

  it("moves v1's blur to the shared blur", () => {
    const tokens = resolveTokens(JSON.stringify({ ...v1, blur: { size: 9, passes: 2 } }));
    expect(tokens.blur).toEqual({ size: 9, passes: 2 });
  });

  it("snaps off-grid pixels to the nearest step and drops what M3 decides", () => {
    const migrated = migrateTokens({ ...v1, expo: { ...v1.expo, tileGap: 21 } }) as Record<
      string,
      unknown
    >;
    expect((migrated["expo"] as Record<string, unknown>)["tileGap"]).toBe("space250");
    expect(migrated).not.toHaveProperty("gaps");
    expect(migrated).not.toHaveProperty("shadow");
  });

  it("leaves v2 alone", () => {
    const v2 = { version: 2, density: -1 };
    expect(migrateTokens(v2)).toBe(v2);
  });

  it("moves an older v2's flyouts.blur to the shared blur", () => {
    const tokens = resolveTokens(
      JSON.stringify({ version: 2, flyouts: { alpha: 0.8, blur: { size: 9, passes: 2 } } }),
    );
    expect(tokens.blur).toEqual({ size: 9, passes: 2 });
    expect(tokens.flyouts.alpha).toBe(0.8);
    const both = resolveTokens(
      JSON.stringify({ version: 2, blur: { size: 4 }, flyouts: { blur: { size: 9 } } }),
    );
    expect(both.blur.size).toBe(4);
  });
});

describe("layoutOf", () => {
  it("resolves the plugins' steps to dp", () => {
    expect(layoutOf(defaultTokens)).toEqual({
      expo: { outerMargin: 48, tileGap: 24, tilePadding: 8, rise: 24 },
      periphery: { bandMargin: 16, cardGap: 10, groupGap: 20 },
      windowCorner: 12,
    });
  });
});

describe("hyprlandTokensLua", () => {
  const lua = hyprlandTokensLua(defaultTokens);

  it("sets spec gaps, border and corner", () => {
    expect(gapsOf(defaultTokens)).toEqual({ outer: 24, inner: 12, workspaces: 32 });
    expect(lua).toContain("gaps_in = 12,");
    expect(lua).toContain("gaps_out = 24,");
    expect(lua).toContain("border_size = 1,");
    expect(lua).toContain("rounding = 12,");
  });

  it("sizes the group tabs as an M3 connected button group", () => {
    expect(groupbarOf(defaultTokens)).toMatchObject({
      height: 32,
      textPadding: 12,
      padding: 2,
      corner: 4,
      round: false,
    });
    expect(lua).toContain("gaps_in = 2,");
    expect(lua).toContain("gradient_rounding = 4,");
    const small = {
      ...defaultTokens,
      groupbar: { ...defaultTokens.groupbar, size: "small" as const },
    };
    expect(groupbarOf(small)).toMatchObject({ height: 40, textPadding: 16, corner: 8 });
  });

  it("rounds the group's outer corners fully for the round shape, following density", () => {
    const round = {
      ...defaultTokens,
      density: -2 as const,
      groupbar: { ...defaultTokens.groupbar, shape: "round" as const },
    };
    expect(groupbarOf(round)).toMatchObject({ height: 24, corner: 12, round: true });
    const out = hyprlandTokensLua(round);
    expect(out).toContain("gradient_rounding = 12,");
    expect(out).toContain("round_only_edges = true,");
  });

  it("removes 4dp per density level from the margin and spacer", () => {
    expect(gapsOf({ ...defaultTokens, density: -3 })).toEqual({
      outer: 12,
      inner: 6,
      workspaces: 32,
    });
  });

  it("defines one curve per spring and puts every leaf on one", () => {
    expect(lua.match(/hl\.curve\("m3_/g)).toHaveLength(6);
    expect(lua).toContain(
      'hl.curve("m3_spatial_default", { type = "spring", mass = 1, stiffness = 700, dampening = 47.624 })',
    );
    expect(lua).toContain(
      'leaf = "workspaces", enabled = true, speed = 1, spring = "m3_spatial_slow"',
    );
  });

  it("blurs the flyouts with the shared blur", () => {
    expect(lua).toContain('namespace = "^omarchy-(bar|osd|keyboard-panel)$"');
    expect(lua).toContain("size = 6,\n      passes = 3,");
  });

  it("puts the scrim behind a special workspace, blurred unless the token is off", () => {
    expect(lua).toContain("dim_special = 0.32,");
    expect(lua).toContain("special = true,");
    const unblurred = hyprlandTokensLua({ ...defaultTokens, special: { blur: false } });
    expect(unblurred).toContain("dim_special = 0.32,");
    expect(unblurred).toContain("special = false,");
    expect(unblurred).toContain("enabled = true,");
    expect(unblurred).toContain("layer_rule");
  });

  it("blurs the special workspace with the flyouts' exception off", () => {
    const opaque = hyprlandTokensLua({
      ...defaultTokens,
      flyouts: { ...defaultTokens.flyouts, translucent: false },
    });
    expect(opaque).not.toContain("layer_rule");
    expect(opaque).toContain("enabled = true,");
    expect(opaque).toContain("special = true,");
  });

  it("blurs nothing with both off, and keeps the scrim", () => {
    const none = hyprlandTokensLua({
      ...defaultTokens,
      flyouts: { ...defaultTokens.flyouts, translucent: false },
      special: { blur: false },
    });
    expect(none).not.toContain("layer_rule");
    expect(none).toContain("enabled = false,");
    expect(none).toContain("dim_special = 0.32,");
  });

  it("gives tiled windows no shadow", () => {
    expect(lua).toContain("match = { float = false }, no_shadow = true");
  });
});

describe("cssVariables", () => {
  it("uses the spec's Web curves for the springs", () => {
    const vars = cssVariables(defaultTokens);
    expect(vars["--stef-spatial-default-easing"]).toBe("cubic-bezier(0.27, 1.06, 0.18, 1)");
    expect(vars["--stef-spatial-default-duration"]).toBe("500ms");
    expect(vars["--stef-window-corner"]).toBe("12px");
  });
});
