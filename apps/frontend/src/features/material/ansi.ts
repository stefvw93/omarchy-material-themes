import {
  clampDouble,
  Contrast,
  type DynamicScheme,
  Hct,
  sanitizeDegreesDouble,
  Variant,
} from "@material/material-color-utilities";

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

/** How much more luminous a `bright_` slot is than its base. */
const BRIGHT_STEP = 12;

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
  const surfaceTone = Hct.fromInt(scheme.surface).tone;

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

  // Light themes start darker than dark themes so there is headroom above the base
  // tone for the bright variants to climb into without failing contrast.
  const baseTone = contrastedTone(scheme.isDark ? 72 : 38, surfaceTone, ratio);

  // `bright_` always means more luminous, in both modes. In a light theme that pulls
  // against contrast, so bright takes a relaxed floor plus a hard stop above the base
  // tone: it may sit closer to the surface than its base, but never darker than it.
  const brightTone = contrastedTone(
    baseTone + BRIGHT_STEP,
    surfaceTone,
    Math.max(3, ratio * 0.75),
    baseTone + 4,
  );

  const brownTone = contrastedTone(baseTone - (scheme.isDark ? 20 : 6), surfaceTone, ratio);

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

  const toArgb = (hue: number, targetChroma: number, tone: number) =>
    Hct.from(hue, targetChroma, tone).toInt();

  const base = (slot: AnsiSlot) => toArgb(hues[slot], chroma, baseTone);
  const bright = (slot: AnsiSlot) => toArgb(hues[slot], chroma * 1.2, brightTone);

  return {
    red: base("red"),
    orange: base("orange"),
    yellow: base("yellow"),
    green: base("green"),
    cyan: base("cyan"),
    blue: base("blue"),
    magenta: base("magenta"),
    // Brown is not its own hue — it is orange held down in chroma and tone.
    brown: toArgb(hues.orange, chroma * 0.45, brownTone),

    bright_red: bright("red"),
    bright_yellow: bright("yellow"),
    bright_green: bright("green"),
    bright_cyan: bright("cyan"),
    bright_blue: bright("blue"),
    bright_magenta: bright("magenta"),
  };
}
