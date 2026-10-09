import { Schema } from "effect";
import { describe, expect, it } from "vite-plus/test";
import {
  cssVariables,
  defaultTokens,
  hyprlandTokensLua,
  resolveTokens,
  springsOf,
  TokensSchema,
} from "./index.ts";

describe("defaultTokens", () => {
  it("satisfy the Schema", () => {
    expect(Schema.decodeUnknownSync(TokensSchema)(defaultTokens)).toEqual(defaultTokens);
  });
});

describe("resolveTokens", () => {
  it("falls back to the defaults for a missing or broken file", () => {
    expect(resolveTokens(undefined)).toBe(defaultTokens);
    expect(resolveTokens("{ not json")).toBe(defaultTokens);
  });

  it("overlays known keys and keeps the rest", () => {
    const tokens = resolveTokens(JSON.stringify({ gaps: { inner: 6 }, periphery: { cardGap: 4 } }));
    expect(tokens.gaps).toEqual({ ...defaultTokens.gaps, inner: 6 });
    expect(tokens.periphery.cardGap).toBe(4);
    expect(tokens.expo).toEqual(defaultTokens.expo);
  });

  it("ignores unknown keys and values of the wrong type", () => {
    const tokens = resolveTokens(
      JSON.stringify({ gaps: { inner: "6", outer: null, extra: 1 }, nonsense: true }),
    );
    expect(tokens.gaps).toEqual(defaultTokens.gaps);
    expect(tokens).not.toHaveProperty("nonsense");
  });

  it("rejects an unknown motion scheme", () => {
    expect(resolveTokens(JSON.stringify({ motion: { scheme: "bouncy" } })).motion.scheme).toBe(
      "standard",
    );
  });

  it("switches the springs with the scheme", () => {
    const expressive = resolveTokens(JSON.stringify({ motion: { scheme: "expressive" } }));
    expect(springsOf(expressive).spatial_default).toEqual({ stiffness: 380, ratio: 0.8 });
  });
});

describe("hyprlandTokensLua", () => {
  it("sets gaps and border and defines one curve per spring", () => {
    const lua = hyprlandTokensLua(defaultTokens);
    expect(lua).toContain("gaps_in = 2,");
    expect(lua).toContain("border_size = 1,");
    expect(lua.match(/hl\.curve\("stef_/g)).toHaveLength(6);
    expect(lua).toContain(
      'hl.curve("stef_spatial_default", { type = "spring", mass = 1, stiffness = 700, dampening = 47.624 })',
    );
  });
});

describe("cssVariables", () => {
  it("exposes the springs as easings", () => {
    const vars = cssVariables(defaultTokens);
    expect(vars["--stef-spatial-default-easing"]).toMatch(/^linear\(0, /);
    expect(vars["--stef-gap-inner"]).toBe("2px");
  });
});
