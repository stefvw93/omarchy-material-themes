import {
  clampDouble,
  Contrast,
  type DynamicScheme,
  Hct,
  sanitizeDegreesDouble,
  Variant,
} from "@material/material-color-utilities";
import { buildSurfaceColors } from "./surfaces";

export type AnsiSlot = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "magenta";

/**
 * Hue anchors in HCT space, not RGB. HCT red sits near 27 degrees rather than 0,
 * and its blue is much later than RGB's 240.
 */
export const ANCHOR: Record<AnsiSlot, number> = {
  red: 27,
  orange: 58,
  yellow: 95,
  green: 142,
  cyan: 205,
  blue: 258,
  magenta: 328,
};

export const SLOTS = Object.keys(ANCHOR) as AnsiSlot[];

/**
 * The fraction of a scheme's drift budget each slot is allowed to spend.
 * Terminals hardcode meaning for some slots — red is error, green is success —
 * so those stay near-canonical even when the scheme is at maximum drift. Cyan
 * and magenta carry no convention and are free to roam the whole budget.
 */
const SEMANTIC_LOCK: Record<AnsiSlot, number> = {
  red: 0.35,
  green: 0.45,
  yellow: 0.7,
  blue: 0.8,
  orange: 1,
  cyan: 1,
  magenta: 1,
};

/** Minimum arc between neighbouring slots, so no two ever collapse into one colour. */
export const MIN_SEPARATION = 22;

/** Chroma below which slots stop being tellable apart, regardless of what the seed had. */
const SOURCE_CHROMA_FLOOR = 26;

/**
 * The share of a hue's peak sRGB chroma a `bright_` slot must keep. Bright tones are
 * anchored at the highest tone that still clears this, because "brighter" in a terminal
 * means vivid, not pale: the gamut for red collapses from chroma ~111 at tone 52 to ~37
 * at tone 76, so a red pushed up to a fixed light tone reads as pink no matter how much
 * chroma is requested. Each hue peaks somewhere different (red ~52, blue ~60, yellow ~84,
 * green ~88), which is why the tone has to be found per slot rather than shared.
 */
const VIVID_SHARE = 0.75;

/** How far below its bright variant a base slot sits, before contrast has its say. */
const BASE_STEP = 8;

/** The least a bright variant may sit above its base once contrast has moved the base. */
const MIN_BRIGHT_GAP = 4;

/**
 * Base chroma is capped at this share of what its bright variant achieves, so bright is
 * always the more vivid of the pair. Without the cap a vibrant scheme can hand the base a
 * chroma the gamut only supports at its lower tone, and the base outshines its bright.
 */
const BASE_CHROMA_SHARE = 0.85;

/**
 * Deliberately past what any hue/tone can display, so `Hct.from` always clips it down
 * to the true sRGB gamut boundary — the most saturated colour displayable at that tone.
 * This is what makes `bright_` read as fierce rather than merely lighter.
 */
const BRIGHT_CHROMA_CEILING = 150;

export interface AnsiPolicy {
  /** Maximum degrees a slot may leave its anchor, before the semantic lock scales it down. */
  drift: number;
  /** 0 ignores the image's hues entirely, 1 goes as far towards them as `drift` allows. */
  snap: number;
  /** Chroma window, or "source" to inherit the seed colour's own chroma. */
  chroma: readonly [min: number, max: number] | "source";
}

/**
 * Each variant gets its own mix of the two knobs. `rainbow` is defined by evenly
 * spaced hues, so it barely moves off the anchors and takes its character from chroma
 * and tone instead. `fidelity` and `content` exist to be true to the image, so they
 * lean almost entirely on the observed hues. Without this split every scheme kind
 * produced a near-identical set.
 */
export const ANSI_POLICY: Record<Variant, AnsiPolicy> = {
  [Variant.MONOCHROME]: { drift: 0, snap: 0, chroma: [0, 6] },
  [Variant.NEUTRAL]: { drift: 8, snap: 0.3, chroma: [24, 40] },
  [Variant.TONAL_SPOT]: { drift: 12, snap: 0.4, chroma: [36, 55] },
  [Variant.VIBRANT]: { drift: 15, snap: 0.5, chroma: [70, 95] },
  [Variant.EXPRESSIVE]: { drift: 40, snap: 0.7, chroma: [40, 75] },
  [Variant.FIDELITY]: { drift: 25, snap: 0.9, chroma: "source" },
  [Variant.CONTENT]: { drift: 25, snap: 0.9, chroma: "source" },
  [Variant.RAINBOW]: { drift: 8, snap: 0.25, chroma: [45, 65] },
  [Variant.FRUIT_SALAD]: { drift: 20, snap: 0.5, chroma: [55, 80] },
};

export interface AnsiColors {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  cyan: number;
  blue: number;
  magenta: number;
  brown: number;

  bright_red: number;
  bright_yellow: number;
  bright_green: number;
  bright_cyan: number;
  bright_blue: number;
  bright_magenta: number;
}

/** Shortest signed arc from `from` to `to`, in (-180, 180]. */
function signedDelta(from: number, to: number) {
  return sanitizeDegreesDouble(to - from + 180) - 180;
}

/**
 * The hue this slot wants to move towards: the closest hue actually present in the
 * image, or the scheme's primary hue when the image has nothing nearby. The fallback
 * keeps a monochrome wallpaper from flattening every slot back to its anchor.
 */
function targetHue(anchor: number, imageHues: readonly number[], window: number, fallback: number) {
  let best = fallback;
  let bestDistance = window;

  for (const hue of imageHues) {
    const distance = Math.abs(signedDelta(anchor, hue));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = hue;
    }
  }

  return best;
}

/**
 * Pushes neighbouring hues apart until every adjacent gap clears `MIN_SEPARATION`.
 * High drift plus image snapping can otherwise land two slots on the same hue — a
 * green-heavy photo pulls both green and cyan onto the foliage — and the terminal
 * silently loses a colour.
 */
function enforceSeparation(hues: Record<AnsiSlot, number>) {
  const order = [...SLOTS].sort((a, b) => hues[a] - hues[b]);

  for (let pass = 0; pass < 32; pass++) {
    let moved = false;

    for (let i = 0; i < order.length; i++) {
      const a = order[i]!;
      const b = order[(i + 1) % order.length]!;
      const gap = sanitizeDegreesDouble(hues[b] - hues[a]);
      if (gap >= MIN_SEPARATION) continue;

      const push = (MIN_SEPARATION - gap) / 2;
      hues[a] = sanitizeDegreesDouble(hues[a] - push);
      hues[b] = sanitizeDegreesDouble(hues[b] + push);
      moved = true;
    }

    if (!moved) break;
  }

  return hues;
}

/** The most chroma sRGB can display for this hue at this tone. */
function maxChroma(hue: number, tone: number) {
  return Hct.from(hue, BRIGHT_CHROMA_CEILING, tone).chroma;
}

const vividToneCache = new Map<number, number>();

/**
 * The highest tone at which `hue` still shows `VIVID_SHARE` of its peak chroma — the
 * lightest it can go before it starts to wash out. Cached per whole degree: the gamut
 * boundary changes smoothly with hue, and each lookup costs two hundred gamut solves.
 */
function vividTone(hue: number) {
  const key = Math.round(sanitizeDegreesDouble(hue));
  const cached = vividToneCache.get(key);
  if (cached !== undefined) return cached;

  let peak = 0;
  for (let tone = 0; tone <= 100; tone++) peak = Math.max(peak, maxChroma(key, tone));

  let result = 0;
  for (let tone = 0; tone <= 100; tone++) {
    if (maxChroma(key, tone) >= VIVID_SHARE * peak) result = tone;
  }

  vividToneCache.set(key, result);
  return result;
}

/**
 * Walks a tone away from the surface until it clears `ratio`, staying inside
 * [`min`, `max`]. Contrast is the only thing allowed to touch tone — it never widens
 * or narrows the hue budget, so a high-contrast theme keeps the same colours, just
 * more readable ones.
 */
function contrastedTone(tone: number, surfaceTone: number, ratio: number, min = 0, max = 100) {
  const direction = tone >= surfaceTone ? 1 : -1;
  let result = clampDouble(min, max, tone);

  for (let i = 0; i < 100; i++) {
    if (Contrast.ratioOfTones(result, surfaceTone) >= ratio) break;

    const next = clampDouble(min, max, result + direction);
    if (next === result) break;
    result = next;
  }

  return result;
}

/**
 * Builds the terminal palette from the scheme's own character plus the hues actually
 * present in the seed image, rather than from fixed reference colours. `imageHues` is
 * the ranked hue list from quantisation; pass an empty array to fall back to rotating
 * everything towards the scheme's primary.
 */
export function buildAnsiColors(scheme: DynamicScheme, imageHues: readonly number[]): AnsiColors {
  const policy = ANSI_POLICY[scheme.variant];
  const primaryHue = Hct.fromInt(scheme.primary).hue;
  // The terminal draws on Omarchy's `background`, which in dark mode is not Material's
  // `surface` — contrast has to be measured against what the colours actually sit on.
  const surfaceTone = Hct.fromInt(buildSurfaceColors(scheme).background).tone;

  // Even a "source" policy needs a floor: a greyscale wallpaper has almost no chroma,
  // and inheriting it verbatim would collapse every slot into the same unreadable grey.
  const chroma =
    policy.chroma === "source"
      ? clampDouble(SOURCE_CHROMA_FLOOR, 110, Hct.fromInt(scheme.sourceColorArgb).chroma)
      : clampDouble(
          policy.chroma[0],
          policy.chroma[1],
          scheme.primaryPalette.keyColor.chroma * 1.15,
        );

  const ratio = clampDouble(3, 11, 4.5 + scheme.contrastLevel * 2.5);
  // Bright takes a relaxed floor: in a light theme "brighter" and "higher contrast"
  // pull in opposite directions, so it trades ratio for luminance.
  const brightRatio = Math.max(3, ratio * 0.75);

  const searchWindow = policy.drift * 2;
  const hues = {} as Record<AnsiSlot, number>;

  for (const slot of SLOTS) {
    const anchor = ANCHOR[slot];
    const target = targetHue(anchor, imageHues, searchWindow, primaryHue);
    const budget = policy.drift * SEMANTIC_LOCK[slot];
    const shift = clampDouble(-budget, budget, signedDelta(anchor, target) * policy.snap);
    hues[slot] = sanitizeDegreesDouble(anchor + shift);
  }

  enforceSeparation(hues);

  /**
   * Tones are settled per slot, from the hue outwards: bright sits at the lightest tone
   * where the hue is still vivid, the base a step below it, and contrast then moves each
   * away from the background as far as it must. `bright_` always means more luminous
   * *and* more chromatic than its base, in both modes.
   */
  const tones = (slot: AnsiSlot) => {
    const hue = hues[slot];
    const base = contrastedTone(vividTone(hue) - BASE_STEP, surfaceTone, ratio);
    const bright = Math.max(
      contrastedTone(vividTone(hue), surfaceTone, brightRatio),
      base + MIN_BRIGHT_GAP,
    );
    return { base, bright };
  };

  const toArgb = (hue: number, targetChroma: number, tone: number) =>
    Hct.from(hue, targetChroma, tone).toInt();

  const base = (slot: AnsiSlot) => {
    const { base: tone, bright } = tones(slot);
    const brightChroma = maxChroma(hues[slot], bright);
    return toArgb(hues[slot], Math.min(chroma, brightChroma * BASE_CHROMA_SHARE), tone);
  };
  const bright = (slot: AnsiSlot) => toArgb(hues[slot], BRIGHT_CHROMA_CEILING, tones(slot).bright);

  // Brown is not its own hue — it is orange held down in chroma and tone.
  const brownTone = contrastedTone(
    tones("orange").base - (scheme.isDark ? 20 : 6),
    surfaceTone,
    ratio,
  );

  return {
    red: base("red"),
    orange: base("orange"),
    yellow: base("yellow"),
    green: base("green"),
    cyan: base("cyan"),
    blue: base("blue"),
    magenta: base("magenta"),
    brown: toArgb(hues.orange, chroma * 0.45, brownTone),

    bright_red: bright("red"),
    bright_yellow: bright("yellow"),
    bright_green: bright("green"),
    bright_cyan: bright("cyan"),
    bright_blue: bright("blue"),
    bright_magenta: bright("magenta"),
  };
}
