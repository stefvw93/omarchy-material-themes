import {
  Contrast,
  type DynamicScheme,
  Hct,
  SchemeExpressive,
  SchemeFidelity,
  SchemeNeutral,
  SchemeRainbow,
  SchemeVibrant,
} from "@material/material-color-utilities";
import { describe, expect, it } from "@effect/vitest";
import { ANCHOR, buildAnsiColors, MIN_SEPARATION, SLOTS } from "./ansi";
import type { AnsiColors, AnsiSlot } from "./ansi";
import { buildSurfaceColors } from "./surfaces";

const KINDS = {
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  rainbow: SchemeRainbow,
} as const;

const SEEDS = {
  forest: { argb: 0xff3f6f42, hues: [140, 96, 45, 120, 160] },
  sunset: { argb: 0xffd2582a, hues: [30, 55, 12, 340, 70] },
  ocean: { argb: 0xff1f5f8b, hues: [250, 210, 265, 200, 190] },
  /** A greyscale wallpaper: quantisation filters everything out and yields no hues. */
  grey: { argb: 0xff808080, hues: [] as number[] },
};

const MODES = [
  { name: "dark", isDark: true },
  { name: "light", isDark: false },
];

const CONTRAST_LEVELS = [-1, 0, 0.5, 1];

const BRIGHT_PAIRS = [
  ["red", "bright_red"],
  ["yellow", "bright_yellow"],
  ["green", "bright_green"],
  ["cyan", "bright_cyan"],
  ["blue", "bright_blue"],
  ["magenta", "bright_magenta"],
] as const satisfies ReadonlyArray<readonly [keyof AnsiColors, keyof AnsiColors]>;

function build(
  kind: keyof typeof KINDS,
  seed: keyof typeof SEEDS,
  isDark: boolean,
  contrastLevel = 0,
) {
  const { argb, hues } = SEEDS[seed];
  const scheme = new KINDS[kind](Hct.fromInt(argb), isDark, contrastLevel);
  return { scheme, ansi: buildAnsiColors(scheme, hues) };
}

/** Every (kind, seed, mode) combination, for invariants that must hold universally. */
function everyCombination() {
  return Object.keys(KINDS).flatMap((kind) =>
    Object.keys(SEEDS).flatMap((seed) =>
      MODES.map((mode) => ({
        label: `${kind}/${seed}/${mode.name}`,
        kind: kind as keyof typeof KINDS,
        seed: seed as keyof typeof SEEDS,
        isDark: mode.isDark,
      })),
    ),
  );
}

function tone(argb: number) {
  return Hct.fromInt(argb).tone;
}

function chroma(argb: number) {
  return Hct.fromInt(argb).chroma;
}

/** The most chroma sRGB can show for this hue at any tone. */
function peakChroma(hue: number) {
  let peak = 0;
  for (let t = 0; t <= 100; t++) peak = Math.max(peak, Hct.from(hue, 200, t).chroma);
  return peak;
}

/** The tone the terminal actually draws on: Omarchy's `background`, not Material's `surface`. */
function surfaceTone(scheme: DynamicScheme) {
  return Hct.fromInt(buildSurfaceColors(scheme).background).tone;
}

/** Shortest arc between two hues, 0..180. */
function hueDistance(a: number, b: number) {
  const raw = Math.abs(a - b) % 360;
  return raw > 180 ? 360 - raw : raw;
}

describe("buildAnsiColors", () => {
  describe("bright variants", () => {
    // Regression: bright_ was derived with a negative tone delta in light mode, so
    // every bright colour came out darker than its base.
    it.each(everyCombination())("$label — bright is more luminous than base", (c) => {
      const { ansi } = build(c.kind, c.seed, c.isDark);

      for (const [base, bright] of BRIGHT_PAIRS) {
        expect(tone(ansi[bright]), `${bright} vs ${base}`).toBeGreaterThan(tone(ansi[base]));
      }
    });

    it.each(CONTRAST_LEVELS)("holds at contrastLevel %s in light mode", (contrastLevel) => {
      const { ansi } = build("vibrant", "ocean", false, contrastLevel);

      for (const [base, bright] of BRIGHT_PAIRS) {
        expect(tone(ansi[bright]), `${bright} vs ${base}`).toBeGreaterThan(tone(ansi[base]));
      }
    });

    it.each(everyCombination())("$label — bright is more chromatic than base", (c) => {
      for (const contrastLevel of CONTRAST_LEVELS) {
        const { ansi } = build(c.kind, c.seed, c.isDark, contrastLevel);

        for (const [base, bright] of BRIGHT_PAIRS) {
          expect(chroma(ansi[bright]), `${bright} vs ${base} @ ${contrastLevel}`).toBeGreaterThan(
            chroma(ansi[base]),
          );
        }
      }
    });

    // Regression: bright was a fixed light tone with chroma pushed to the gamut edge,
    // but the gamut for red at that tone is tiny, so bright_red came out pink. Bright
    // must keep most of the chroma its hue is capable of, not just be lighter.
    it.each(everyCombination())("$label — bright keeps most of its hue's peak chroma", (c) => {
      const { ansi } = build(c.kind, c.seed, c.isDark);

      for (const [, bright] of BRIGHT_PAIRS) {
        const hct = Hct.fromInt(ansi[bright]);
        expect(hct.chroma / peakChroma(hct.hue), bright).toBeGreaterThan(0.65);
      }
    });

    // Only up to the default level: raising contrast in a dark theme can only lighten
    // red, and sRGB has no vivid red above tone ~62, so a high-contrast red goes pink.
    it.each([-1, 0])("red stays red rather than pink at contrastLevel %s", (contrastLevel) => {
      for (const isDark of [true, false]) {
        const { ansi } = build("vibrant", "sunset", isDark, contrastLevel);
        const hct = Hct.fromInt(ansi.bright_red);
        expect(hct.chroma / peakChroma(hct.hue), isDark ? "dark" : "light").toBeGreaterThan(0.65);
      }
    });
  });

  describe("contrast", () => {
    it.each(everyCombination())("$label — base colours clear 4.5:1 against surface", (c) => {
      const { scheme, ansi } = build(c.kind, c.seed, c.isDark);
      const surface = surfaceTone(scheme);

      for (const slot of SLOTS) {
        // Allow a hair under, since Hct round-trips through 8-bit RGB.
        expect(Contrast.ratioOfTones(tone(ansi[slot]), surface), slot).toBeGreaterThan(4.4);
      }
    });

    it.each(everyCombination())("$label — bright colours stay legible", (c) => {
      const { scheme, ansi } = build(c.kind, c.seed, c.isDark);
      const surface = surfaceTone(scheme);

      for (const [, bright] of BRIGHT_PAIRS) {
        // Bright takes a relaxed floor: in a light theme "brighter" and "higher
        // contrast" pull in opposite directions, so it trades ratio for luminance.
        expect(Contrast.ratioOfTones(tone(ansi[bright]), surface), bright).toBeGreaterThan(2.9);
      }
    });

    it("raising contrastLevel changes only tone, never hue", () => {
      const low = build("expressive", "sunset", true, 0).ansi;
      const high = build("expressive", "sunset", true, 1).ansi;

      for (const slot of SLOTS) {
        // A couple of degrees of slack: the same hue round-trips through 8-bit RGB
        // differently at a different tone, and low-chroma blues round coarsest.
        expect(
          hueDistance(Hct.fromInt(low[slot]).hue, Hct.fromInt(high[slot]).hue),
          slot,
        ).toBeLessThan(3);
      }
    });
  });

  describe("hue separation", () => {
    it.each(everyCombination())("$label — no two slots collapse together", (c) => {
      const { ansi } = build(c.kind, c.seed, c.isDark);

      for (const a of SLOTS) {
        for (const b of SLOTS) {
          if (a === b) continue;
          const distance = hueDistance(Hct.fromInt(ansi[a]).hue, Hct.fromInt(ansi[b]).hue);
          // A degree of slack for the 8-bit round-trip.
          expect(distance, `${a} vs ${b}`).toBeGreaterThan(MIN_SEPARATION - 1);
        }
      }
    });

    // Regression: "source" chroma was inherited unclamped, so a greyscale seed
    // produced seven indistinguishable greys under fidelity.
    it("a greyscale seed still yields distinguishable colours under fidelity", () => {
      const { ansi } = build("fidelity", "grey", true);

      for (const slot of SLOTS) {
        expect(Hct.fromInt(ansi[slot]).chroma, slot).toBeGreaterThan(10);
      }
    });
  });

  describe("semantic locks", () => {
    const semanticDrift = (slot: AnsiSlot, kind: keyof typeof KINDS, seed: keyof typeof SEEDS) =>
      hueDistance(Hct.fromInt(build(kind, seed, true).ansi[slot]).hue, ANCHOR[slot]);

    // Terminals hardcode red as error and green as success, so they must stay
    // recognisable even under the widest-drifting scheme.
    it.each(Object.keys(SEEDS) as (keyof typeof SEEDS)[])(
      "red and green stay near their anchors under expressive/%s",
      (seed) => {
        expect(semanticDrift("red", "expressive", seed)).toBeLessThan(25);
        expect(semanticDrift("green", "expressive", seed)).toBeLessThan(25);
      },
    );

    it("unlocked slots drift further than locked ones", () => {
      expect(semanticDrift("magenta", "expressive", "sunset")).toBeGreaterThan(
        semanticDrift("red", "expressive", "sunset"),
      );
    });
  });

  describe("policy differentiates the scheme kinds", () => {
    // The original complaint: every scheme kind and every image produced
    // near-identical terminal colours.
    it("different kinds produce different palettes for the same seed", () => {
      const palettes = Object.keys(KINDS).map(
        (kind) => build(kind as keyof typeof KINDS, "ocean", true).ansi,
      );

      for (let i = 0; i < palettes.length; i++) {
        for (let j = i + 1; j < palettes.length; j++) {
          expect(palettes[i]).not.toEqual(palettes[j]);
        }
      }
    });

    it.each(Object.keys(KINDS) as (keyof typeof KINDS)[])(
      "%s produces different palettes for different seeds",
      (kind) => {
        const seeds = Object.keys(SEEDS) as (keyof typeof SEEDS)[];
        const palettes = seeds.map((seed) => build(kind, seed, true).ansi);

        for (let i = 0; i < palettes.length; i++) {
          for (let j = i + 1; j < palettes.length; j++) {
            expect(palettes[i], `${seeds[i]} vs ${seeds[j]}`).not.toEqual(palettes[j]);
          }
        }
      },
    );

    it("neutral is less chromatic than vibrant", () => {
      const neutral = build("neutral", "ocean", true).ansi;
      const vibrant = build("vibrant", "ocean", true).ansi;

      for (const slot of SLOTS) {
        expect(Hct.fromInt(neutral[slot]).chroma, slot).toBeLessThan(
          Hct.fromInt(vibrant[slot]).chroma,
        );
      }
    });

    it("rainbow drifts less from its anchors than expressive", () => {
      const total = (kind: keyof typeof KINDS) =>
        SLOTS.reduce(
          (sum, slot) =>
            sum + hueDistance(Hct.fromInt(build(kind, "ocean", true).ansi[slot]).hue, ANCHOR[slot]),
          0,
        );

      expect(total("rainbow")).toBeLessThan(total("expressive"));
    });
  });

  describe("image hues", () => {
    it("a fidelity palette follows the image, not just the source colour", () => {
      const scheme = new SchemeFidelity(Hct.fromInt(SEEDS.ocean.argb), true, 0);
      const withHues = buildAnsiColors(scheme, SEEDS.ocean.hues);
      const withoutHues = buildAnsiColors(scheme, []);

      expect(withHues).not.toEqual(withoutHues);
    });

    it("an empty hue list still produces a full, valid palette", () => {
      const { scheme, ansi } = build("fidelity", "grey", true);
      const surface = surfaceTone(scheme);

      for (const slot of SLOTS) {
        expect(Contrast.ratioOfTones(tone(ansi[slot]), surface), slot).toBeGreaterThan(4.4);
      }
    });
  });
});
