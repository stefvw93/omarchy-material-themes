import { argbFromHex, Contrast, Hct } from "@material/material-color-utilities";
import { colorRoles } from "@stef/m3";
import { describe, expect, it } from "vite-plus/test";
import { Contrast as ContrastLevel, Mode, Variant } from "./colors.ts";
import { createPalette, createPaletteFromHex } from "./palette.ts";

const tone = (hex: string) => Hct.fromInt(argbFromHex(hex)).tone;
const chroma = (hex: string) => Hct.fromInt(argbFromHex(hex)).chroma;
const ratio = (a: string, b: string) => Contrast.ratioOfTones(tone(a), tone(b));

const combos = Variant.literals.flatMap((variant) =>
  Mode.literals.flatMap((mode) =>
    ContrastLevel.literals.map((contrast) => ({ variant, mode, contrast })),
  ),
);

describe("createPalette", () => {
  it("snapshots every variant, mode and contrast for one seed", () => {
    const all = Object.fromEntries(
      combos.map((c) => [
        `${c.variant} ${c.mode} ${c.contrast}`,
        createPaletteFromHex("#4285f4", c),
      ]),
    );
    expect(all).toMatchSnapshot();
  });

  it.each(combos)("has every spec role ($variant, $mode, $contrast)", (c) => {
    const palette = createPaletteFromHex("#4285f4", c);
    expect(Object.keys(palette.system).sort()).toEqual([...colorRoles].sort());
  });

  it.each(combos)(
    "gives static colours accent-convention contrast ($variant, $mode, $contrast)",
    (c) => {
      const { statics, system } = createPaletteFromHex("#e05a2b", c);
      for (const [hue, s] of Object.entries(statics)) {
        expect(ratio(s.color, s.onColor), `${hue} on-color`).toBeGreaterThanOrEqual(4.5);
        expect(
          ratio(s.colorContainer, s.onColorContainer),
          `${hue} on-container`,
        ).toBeGreaterThanOrEqual(4.5);
        expect(ratio(s.bright, system.surface), `${hue} bright vs surface`).toBeGreaterThanOrEqual(
          c.contrast === "standard" ? 4.5 : 7,
        );
        expect(chroma(s.bright), `${hue} bright chroma`).toBeGreaterThan(chroma(s.color));
      }
    },
  );

  it.each(combos)(
    "keeps Omarchy's background and text tiers in order ($variant, $mode, $contrast)",
    (c) => {
      const { omarchy: o } = createPaletteFromHex("#4285f4", c);
      if (c.mode === "dark") {
        expect(tone(o.dark_background)).toBeLessThanOrEqual(tone(o.background));
        expect(tone(o.lighter_background)).toBeGreaterThan(tone(o.background));
      } else {
        expect(tone(o.dark_background)).toBeLessThan(tone(o.background));
        expect(tone(o.lighter_background)).toBeLessThan(tone(o.background));
      }
      expect(tone(o.darker_background)).toBeLessThanOrEqual(tone(o.dark_background));
      const vs = (fg: string) => ratio(fg, o.background);
      expect(vs(o.foreground)).toBeGreaterThanOrEqual(vs(o.light_foreground));
      expect(vs(o.light_foreground)).toBeGreaterThanOrEqual(vs(o.dark_foreground));
    },
  );

  it("uses the error role as red", () => {
    const p = createPaletteFromHex("#4285f4", {
      variant: "tonal-spot",
      mode: "dark",
      contrast: "standard",
    });
    expect(p.omarchy.red).toBe(p.system.error);
    expect(p.source).toMatchObject({ color: "#4285f4", variant: "tonal-spot", mode: "dark" });
    expect(p.source.spec).toMatch(/^https:\/\/m3\.material\.io /);
  });

  it("harmonizes static colours to the seed but keeps their hue family", () => {
    const hue = (hex: string) => Hct.fromInt(argbFromHex(hex)).hue;
    const warm = createPalette({
      sourceArgb: argbFromHex("#ff6d00"),
      variant: "tonal-spot",
      mode: "light",
      contrast: "standard",
    });
    const cool = createPalette({
      sourceArgb: argbFromHex("#0057ff"),
      variant: "tonal-spot",
      mode: "light",
      contrast: "standard",
    });
    expect(hue(warm.statics.green.color)).not.toBeCloseTo(hue(cool.statics.green.color), 0);
    expect(Math.abs(hue(warm.statics.green.color) - 142)).toBeLessThan(30);
    expect(Math.abs(hue(cool.statics.green.color) - 142)).toBeLessThan(30);
  });
});
