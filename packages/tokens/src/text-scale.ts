// Omarchy's text size (`omarchy display text size`, the shell's [font]
// base-size) is the desktop's text-resizing setting (interpretation
// text.scale). The theme pins every size, so the scale is applied twice from
// this one function: by the generator at Omarchy's default size, and live by
// the stef.omaterial shell plugin whenever the text size changes. No imports:
// the plugin bundles it for the QML engine.

/** Omarchy's default base-size: text size 12 is 1×. */
export const OMARCHY_TEXT_BASE = 12;

/** A container that holds one line of text: its height at 1× and that line's height. */
export interface TextContainer {
  readonly height: number;
  readonly lineHeight: number;
}

/** What text resizing needs from a theme, unscaled. Written to the theme's omaterial.json. */
export interface TextSpec {
  /** tokens.type.scale, multiplied with the text size. */
  readonly typeScale: number;
  /** Type sizes in sp, by shell key (`font.body`, …). */
  readonly sizes: Readonly<Record<string, number>>;
  /** Containers with text, by shell key (`spacing.popup-row-height`, …). */
  readonly containers: Readonly<Record<string, TextContainer>>;
  /** Values that are half a scaled container, e.g. a fully round corner: key → container key. */
  readonly halves?: Readonly<Record<string, string>>;
}

/** The text scale for a base-size: the user's text size over Omarchy's default, times type.scale. */
export const textScaleOf = (spec: TextSpec, baseSize: number): number =>
  (spec.typeScale * (baseSize > 0 ? baseSize : OMARCHY_TEXT_BASE)) / OMARCHY_TEXT_BASE;

/**
 * Every scaled value by shell key. Sizes are multiplied by the scale; a
 * container keeps its padding and grows by its line's extra height, never
 * below its 1× height.
 */
export const scaleText = (spec: TextSpec, baseSize: number): Record<string, number> => {
  const scale = textScaleOf(spec, baseSize);
  const out: Record<string, number> = {};
  for (const key of Object.keys(spec.sizes)) out[key] = Math.round(spec.sizes[key]! * scale);
  for (const key of Object.keys(spec.containers)) {
    const c = spec.containers[key]!;
    out[key] = Math.round(c.height + c.lineHeight * Math.max(0, scale - 1));
  }
  const halves = spec.halves ?? {};
  for (const key of Object.keys(halves)) out[key] = Math.round((out[halves[key]!] ?? 0) / 2);
  return out;
};
