/**
 * Design tokens at runtime: the user's choices on top of Material 3, and
 * merging a tokens.json override onto the defaults. QML-safe (plain es2017,
 * no Effect) so plugins bundle it; the Schema and the emitters live in
 * ./index.ts.
 *
 * Tokens are choices, not values: a spacing token names an
 * md.sys.measurement step, a corner names an md.sys.shape.corner step, and
 * the values come from the spec (@stef/m3). Colour is not here: it belongs
 * to the theme (ThemePalette, generated from a seed).
 */
import { type MotionSchemeName, motionSchemes } from "@stef/motion";
import { measurementTokens } from "@stef/m3/sys/measurement";
import { shapeTokens } from "@stef/m3/sys/shape";
import { resolveToken } from "@stef/m3/token";

/** md.sys.measurement steps (space100 = 8dp). */
export const measurementSteps = [
  "space0",
  "space25",
  "space50",
  "space75",
  "space100",
  "space125",
  "space150",
  "space175",
  "space200",
  "space250",
  "space300",
  "space400",
  "space450",
  "space500",
  "space600",
  "space700",
  "space800",
  "space900",
] as const;
export type MeasurementStep = (typeof measurementSteps)[number];

/** md.sys.shape.corner steps a window can use (full, circular, is meaningless for a window). */
export const cornerSteps = [
  "none",
  "extra-small",
  "small",
  "medium",
  "large",
  "large-increased",
  "extra-large",
  "extra-large-increased",
  "extra-extra-large",
] as const;
export type CornerStep = (typeof cornerSteps)[number];

/** The spec's component density scale (0 is the default; each step removes 4dp). */
export const densityLevels = [0, -1, -2, -3] as const;
export type Density = (typeof densityLevels)[number];

/** Hyprland's group tabs: a connected button group of this button size (interpretation hyprland.groupbar). */
export const groupbarSizes = ["xsmall", "small"] as const;
export type GroupbarSize = (typeof groupbarSizes)[number];

/** The connected group's square variant, or its round one (fully round outer corners). */
export const groupbarShapes = ["square", "round"] as const;
export type GroupbarShape = (typeof groupbarShapes)[number];

/** Window border width: an outline (1dp) or a focus indicator (3dp). */
export const borderWidths = ["outline", "focus-indicator"] as const;
export type BorderWidth = (typeof borderWidths)[number];

export const defaultTokens = {
  version: 2 as const,
  motion: {
    /** The Material 3 motion scheme Hyprland, the plugins and Studio move with. */
    scheme: "standard" as MotionSchemeName,
  },
  shape: {
    /** Window corners. The shell's surfaces follow it (Omarchy has one radius). */
    windowCorner: "medium" as CornerStep,
  },
  /** Component and layout density, 0 to -3 (each level removes 4dp). */
  density: 0 as Density,
  type: {
    /** Multiplies every type size, as the user's font scale does on other platforms. */
    scale: 1,
  },
  layout: {
    /** Space between the screen edge and windows (the spec's expanded-layout margin, 24dp), before density. */
    margin: "space300" as MeasurementStep,
    /** Space between windows (the spec's pane spacer, 24dp), before density. */
    spacer: "space300" as MeasurementStep,
    /** Hyprland's gap between workspaces while they slide. */
    workspaceGap: "space400" as MeasurementStep,
  },
  border: {
    width: "outline" as BorderWidth,
  },
  /** Hyprland's window group tabs: an M3 connected button group. */
  groupbar: {
    size: "xsmall" as GroupbarSize,
    shape: "square" as GroupbarShape,
    /** Between tabs, and between the tabs and the window (the spec's 2dp connected-group padding). */
    padding: "space25" as MeasurementStep,
  },
  /** Not M3: Hyprland's one blur, behind the flyouts and the special workspace. */
  blur: { size: 6, passes: 3 },
  /** stef.bar's segments: a connected button group (interpretation bar.segments). */
  bar: {
    shape: "round" as GroupbarShape,
    size: "xsmall" as GroupbarSize,
    /** Between two segments of a group, and to the bar's top and bottom (the spec's 2dp). */
    gap: "space25" as MeasurementStep,
    /** At both ends of a segment, on top of the widgets' own margins (≈ 12dp in all, the xsmall button's leading space). */
    padding: "space50" as MeasurementStep,
  },
  /**
   * The one exception to M3's opaque surfaces: flyouts opened from the bar
   * (tray popups, OSD, dropdowns) may be translucent with blur behind them.
   */
  flyouts: {
    translucent: true,
    alpha: 0.9,
  },
  /** Behind a shown special workspace (the scratchpad): the M3 scrim, blurred unless off. */
  special: {
    blur: true,
  },
  expo: {
    outerMargin: "space600" as MeasurementStep,
    tileGap: "space300" as MeasurementStep,
    tilePadding: "space100" as MeasurementStep,
    rise: "space300" as MeasurementStep,
    /** Not M3: entrance choreography of the exposé (ms, scale). */
    tileStagger: 80,
    windowStagger: 35,
    windowLead: 70,
    tileScaleFrom: 0.92,
    windowScaleFrom: 0.94,
  },
  periphery: {
    bandMargin: "space200" as MeasurementStep,
    cardGap: "space125" as MeasurementStep,
    groupGap: "space250" as MeasurementStep,
  },
};

export type Tokens = typeof defaultTokens;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** The values a token may take, where it is a choice from a list, by dotted path. */
export const tokenChoices: Readonly<Record<string, ReadonlyArray<unknown>>> = {
  "motion.scheme": Object.keys(motionSchemes),
  "shape.windowCorner": cornerSteps,
  density: densityLevels,
  "border.width": borderWidths,
  "groupbar.size": groupbarSizes,
  "groupbar.shape": groupbarShapes,
  "groupbar.padding": measurementSteps,
  "bar.shape": groupbarShapes,
  "bar.size": groupbarSizes,
  "bar.gap": measurementSteps,
  "bar.padding": measurementSteps,
  "layout.margin": measurementSteps,
  "layout.spacer": measurementSteps,
  "layout.workspaceGap": measurementSteps,
  "expo.outerMargin": measurementSteps,
  "expo.tileGap": measurementSteps,
  "expo.tilePadding": measurementSteps,
  "expo.rise": measurementSteps,
  "periphery.bandMargin": measurementSteps,
  "periphery.cardGap": measurementSteps,
  "periphery.groupGap": measurementSteps,
};

/**
 * Overlays `override` on `base`, key by key. Unknown keys, values whose type
 * differs from the default and choices outside their list are ignored, so a
 * stale or hand-edited file can never put a string where QML expects a number.
 */
export const mergeTokens = <T>(base: T, override: unknown, at = ""): T => {
  if (!isPlainObject(base) || !isPlainObject(override)) return base;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(base)) {
    const path = at ? `${at}.${key}` : key;
    const b = base[key];
    const o = override[key];
    const choices = tokenChoices[path];
    if (isPlainObject(b)) out[key] = mergeTokens(b, o, path);
    else if (
      o !== undefined &&
      typeof o === typeof b &&
      (typeof o !== "number" || isFinite(o)) &&
      (!choices || choices.indexOf(o) >= 0)
    )
      out[key] = o;
    else out[key] = b;
  }
  return out as T;
};

/** The step nearest `px` (ties go to the smaller step). */
const nearestStep = (px: unknown): MeasurementStep | undefined => {
  if (typeof px !== "number" || !isFinite(px)) return undefined;
  let best: MeasurementStep = "space0";
  for (const step of measurementSteps)
    if (Math.abs(spacing(step) - px) < Math.abs(spacing(best) - px)) best = step;
  return best;
};

/**
 * tokens.json v1 (pixel values, gradient angle, shadow, blur) to v2. Pixel
 * spacing moves to the nearest md.sys.measurement step; values M3 now decides
 * (gaps, border angle, shadows, periphery durations) are dropped. An earlier
 * v2's flyouts.blur moves to the shared blur.
 */
export const migrateTokens = (json: unknown): unknown => {
  if (!isPlainObject(json)) return json;
  if (json["version"] === 2) {
    // Blur used to be the flyouts' own (flyouts.blur); it is shared now.
    const flyouts = json["flyouts"];
    if (!isPlainObject(flyouts) || flyouts["blur"] === undefined) return json;
    return { ...json, blur: json["blur"] ?? flyouts["blur"] };
  }
  const v1 = json as Record<string, Record<string, unknown> | undefined>;
  const steps = (group: Record<string, unknown> | undefined, keys: ReadonlyArray<string>) => {
    const out: Record<string, unknown> = {};
    for (const key of keys) {
      const step = nearestStep(group?.[key]);
      if (step) out[key] = step;
    }
    return out;
  };
  const expo = v1["expo"] ?? {};
  const periphery = v1["periphery"] ?? {};
  return {
    version: 2,
    motion: v1["motion"],
    border: v1["border"]?.["width"] === 3 ? { width: "focus-indicator" } : undefined,
    blur: v1["blur"],
    expo: {
      ...steps(expo, ["outerMargin", "tileGap", "tilePadding", "rise"]),
      tileStagger: expo["tileStagger"],
      windowStagger: expo["windowStagger"],
      windowLead: expo["windowLead"],
      tileScaleFrom: expo["tileScaleFrom"],
      windowScaleFrom: expo["windowScaleFrom"],
    },
    periphery: steps(periphery, ["bandMargin", "cardGap", "groupGap"]),
  };
};

/** Tokens from the text of a tokens.json; defaults when it's missing or broken. */
export const resolveTokens = (json: string | undefined): Tokens => {
  if (!json) return defaultTokens;
  try {
    return mergeTokens(defaultTokens, migrateTokens(JSON.parse(json)));
  } catch {
    return defaultTokens;
  }
};

/** The springs of the scheme the tokens select. */
export const springsOf = (tokens: Tokens) => motionSchemes[tokens.motion.scheme];

/** An md.sys.measurement step in dp. */
export function spacing(step: MeasurementStep): number {
  const value = resolveToken(measurementTokens[`md.sys.measurement.${step}`]).value;
  if (typeof value !== "number") throw new Error(`no value for ${step}`);
  return value;
}

/** An md.sys.shape.corner step in dp. */
export const cornerRadius = (step: CornerStep): number => {
  const value = resolveToken(shapeTokens[`md.sys.shape.corner.${step}`]).value as
    | { readonly size?: unknown }
    | undefined;
  if (typeof value?.size !== "number") throw new Error(`no size for corner ${step}`);
  return value.size;
};

/** The plugins' layout tokens in dp. */
export const layoutOf = (tokens: Tokens) => ({
  expo: {
    outerMargin: spacing(tokens.expo.outerMargin),
    tileGap: spacing(tokens.expo.tileGap),
    tilePadding: spacing(tokens.expo.tilePadding),
    rise: spacing(tokens.expo.rise),
  },
  periphery: {
    bandMargin: spacing(tokens.periphery.bandMargin),
    cardGap: spacing(tokens.periphery.cardGap),
    groupGap: spacing(tokens.periphery.groupGap),
  },
  windowCorner: cornerRadius(tokens.shape.windowCorner),
});

/** Where the user override lives, relative to $HOME. */
export const tokensFile = ".config/omarchy/stef/tokens.json";
