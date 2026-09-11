import {
  Contrast,
  Hct,
  SchemeExpressive,
  SchemeFidelity,
  SchemeNeutral,
  SchemeRainbow,
  SchemeVibrant,
} from "@material/material-color-utilities";
import { describe, expect, it } from "@effect/vitest";
import { buildSurfaceColors } from "./surfaces";

const KINDS = {
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  rainbow: SchemeRainbow,
} as const;

const SEEDS = {
  forest: 0xff3f6f42,
  sunset: 0xffd2582a,
  ocean: 0xff1f5f8b,
  grey: 0xff808080,
};

const CONTRAST_LEVELS = [-1, 0, 0.5, 1];

/** Every (kind, seed, mode, contrast) combination, for invariants that must hold universally. */
function everyCombination() {
  return Object.keys(KINDS).flatMap((kind) =>
    Object.keys(SEEDS).flatMap((seed) =>
      [true, false].flatMap((isDark) =>
        CONTRAST_LEVELS.map((contrastLevel) => ({
          label: `${kind}/${seed}/${isDark ? "dark" : "light"}/${contrastLevel}`,
          kind: kind as keyof typeof KINDS,
          seed: seed as keyof typeof SEEDS,
          isDark,
          contrastLevel,
        })),
      ),
    ),
  );
}

function build(c: ReturnType<typeof everyCombination>[number]) {
  const scheme = new KINDS[c.kind](Hct.fromInt(SEEDS[c.seed]), c.isDark, c.contrastLevel);
  return buildSurfaceColors(scheme);
}

function tone(argb: number) {
  return Hct.fromInt(argb).tone;
}

function ratio(a: number, b: number) {
  return Contrast.ratioOfTones(tone(a), tone(b));
}

describe("buildSurfaceColors", () => {
  describe("background tiers", () => {
    // Regression: dark mode mapped `dark_background` to Material's `surfaceContainer`
    // and `darker_background` to `surfaceDim`, which in a dark scheme are lighter than
    // and equal to `surface` respectively.
    it.each(everyCombination())("$label — dark and darker step down from background", (c) => {
      const s = build(c);

      expect(tone(s.dark_background), "dark < background").toBeLessThan(tone(s.background));
      expect(tone(s.darker_background), "darker < dark").toBeLessThan(tone(s.dark_background));
    });

    it.each(everyCombination().filter((c) => c.isDark))(
      "$label — lighter is lighter than background",
      (c) => {
        const s = build(c);
        expect(tone(s.lighter_background)).toBeGreaterThan(tone(s.background));
      },
    );

    // Light mode has no headroom above the base; the shipped light themes use
    // `lighter_background` as a faint tint between the base and `dark_background`.
    it.each(everyCombination().filter((c) => !c.isDark))(
      "$label — lighter is a faint tint below background",
      (c) => {
        const s = build(c);
        expect(tone(s.lighter_background)).toBeLessThan(tone(s.background));
        expect(tone(s.lighter_background)).toBeGreaterThanOrEqual(tone(s.dark_background));
      },
    );
  });

  describe("foreground tiers", () => {
    it.each(everyCombination())("$label — tiers are ordered away from the background", (c) => {
      const s = build(c);
      // Compare tones as distance from the background, so one assertion covers both modes.
      const away = (argb: number) => (c.isDark ? tone(argb) : 100 - tone(argb));

      expect(away(s.dark_foreground), "dark < light").toBeLessThan(away(s.light_foreground));
      expect(away(s.light_foreground), "light < foreground").toBeLessThan(away(s.foreground));
      // Bright can only tie when the foreground is already at the end of the tone scale.
      expect(away(s.bright_foreground), "foreground <= bright").toBeGreaterThanOrEqual(
        away(s.foreground),
      );
    });

    it.each(everyCombination().filter((c) => c.contrastLevel === 0))(
      "$label — bright is strictly past foreground at default contrast",
      (c) => {
        const s = build(c);
        const away = (argb: number) => (c.isDark ? tone(argb) : 100 - tone(argb));
        expect(away(s.bright_foreground)).toBeGreaterThan(away(s.foreground));
      },
    );

    it.each(everyCombination().filter((c) => c.contrastLevel >= 0))(
      "$label — every tier stays legible on background",
      (c) => {
        const s = build(c);

        expect(ratio(s.foreground, s.background), "foreground").toBeGreaterThan(4.5);
        expect(ratio(s.light_foreground, s.background), "light").toBeGreaterThan(4.5);
        expect(ratio(s.bright_foreground, s.background), "bright").toBeGreaterThan(4.5);
        // Dim text follows Material's outline floor rather than body text's.
        expect(ratio(s.dark_foreground, s.background), "dark").toBeGreaterThan(3);
      },
    );

    it.each(everyCombination().filter((c) => c.contrastLevel >= 0))(
      "$label — foreground stays legible on every background tier",
      (c) => {
        const s = build(c);

        for (const key of ["dark_background", "darker_background", "lighter_background"] as const) {
          expect(ratio(s.foreground, s[key]), key).toBeGreaterThan(4.5);
        }
      },
    );

    it("tiers keep the foreground's hue and chroma", () => {
      const s = build({
        label: "",
        kind: "vibrant",
        seed: "ocean",
        isDark: true,
        contrastLevel: 0,
      });
      const fg = Hct.fromInt(s.foreground);

      for (const key of ["dark_foreground", "light_foreground", "bright_foreground"] as const) {
        const hct = Hct.fromInt(s[key]);
        // Tone changes alone cannot preserve chroma exactly at the gamut edge, so allow drift.
        expect(Math.abs(hct.hue - fg.hue), `${key} hue`).toBeLessThan(10);
        expect(Math.abs(hct.chroma - fg.chroma), `${key} chroma`).toBeLessThan(6);
      }
    });
  });

  describe("muted", () => {
    it.each(everyCombination().filter((c) => c.contrastLevel === 0))(
      "$label — muted sits between background and dim text",
      (c) => {
        const s = build(c);
        const away = (argb: number) => (c.isDark ? tone(argb) : 100 - tone(argb));

        expect(away(s.muted)).toBeGreaterThan(away(s.background));
        expect(away(s.muted)).toBeLessThan(away(s.dark_foreground));
      },
    );
  });
});
