import { describe, expect, it } from "vite-plus/test";
import { defaultTokens } from "@stef/tokens/runtime";
import {
  groupbarLua,
  liveSpec,
  shellPatch,
  specOf,
  type TextSpec,
  translucencyPatch,
} from "./text.ts";

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

describe("liveSpec", () => {
  const comp = {
    "md.comp.icon-button.xsmall.container.height": 32,
    "md.comp.icon-button.xsmall.icon.size": 20,
    "md.comp.icon-button.xsmall.narrow.leading-space": 4,
    "md.comp.icon-button.xsmall.default.leading-space": 6,
    "md.comp.icon-button.xsmall.wide.leading-space": 10,
  };

  it("takes the type scale from the live tokens, not the theme", () => {
    const tokens = { ...defaultTokens, type: { scale: 1.5 } };
    expect(liveSpec(spec, tokens, comp).typeScale).toBe(1.5);
    expect(shellPatch(liveSpec(spec, tokens, comp), 12, theme)!["font.body"]).toBe("21");
  });

  it("sizes the bar from the live tokens", () => {
    const tokens = { ...defaultTokens, bar: { ...defaultTokens.bar, gap: "space50" as const } };
    const live = liveSpec(spec, tokens, comp);
    expect(live.containers["bar.size-horizontal"]).toEqual({ height: 40, lineHeight: 20 });
    expect(live.sizes["font.body"]).toBe(14);
  });

  it("keeps the theme's bar without the M3 values", () => {
    expect(liveSpec(spec, defaultTokens, {}).containers["bar.size-horizontal"]).toBeUndefined();
  });
});

describe("translucencyPatch", () => {
  const written = {
    "bar.background-alpha": "0.85",
    "popups.background-alpha": "0.9",
    "menu.text": "#ffffff",
  };

  it("is null when the theme has the tokens' alphas", () => {
    expect(translucencyPatch(defaultTokens, written)).toBeNull();
  });

  it("puts in the live alphas and keeps the rest", () => {
    const tokens = {
      ...defaultTokens,
      translucency: {
        bar: { enabled: true, alpha: 0.7 },
        flyouts: { enabled: true, alpha: 0.9 },
      },
    };
    expect(translucencyPatch(tokens, written)).toEqual({
      ...written,
      "bar.background-alpha": "0.7",
    });
  });

  it("makes a surface that is off opaque", () => {
    const tokens = {
      ...defaultTokens,
      translucency: { ...defaultTokens.translucency, flyouts: { enabled: false, alpha: 0.9 } },
    };
    expect(translucencyPatch(tokens, written)?.["popups.background-alpha"]).toBe("1");
  });
});
