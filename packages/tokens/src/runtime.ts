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
import { scaleText } from "./text-scale.ts";

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

/** md.comp.icon-button widths: the space either side of the icon (narrow, default or wide). */
export const iconButtonWidths = ["narrow", "default", "wide"] as const;
export type IconButtonWidth = (typeof iconButtonWidths)[number];
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
  /** Not M3: Hyprland's one blur, behind the translucent surfaces and the special workspace. */
  blur: { size: 6, passes: 3 },
  /** stef.bar's segments: a connected button group (interpretation bar.segments). */
  bar: {
    shape: "round" as GroupbarShape,
    size: "xsmall" as GroupbarSize,
    /** Between two segments of a group, and to the bar's top and bottom (the spec's 2dp). */
    gap: "space25" as MeasurementStep,
    /** At both ends of a segment, on top of the widgets' own margins (≈ 12dp in all, the xsmall button's leading space). */
    padding: "space50" as MeasurementStep,
    /** Docked, from the screen's left and right edges to the first and last segment (floating, none: they line up with the windows). */
    inset: "space50" as MeasurementStep,
    /** Every icon button in the bar: an extra-small icon button of this width (interpretation bar.icons). */
    iconWidth: "default" as IconButtonWidth,
  },
  /**
   * Not M3 (interpretation shell.translucency, a spec exception): the bar and
   * the flyouts opened from it (tray popups, OSD, dropdowns) are translucent
   * over the shared blur, as ChromeOS's shelf and system UI are.
   */
  translucency: {
    /** The bar's body and segments. */
    bar: { enabled: true, alpha: 0.85 },
    /** Popups opened from the bar, the OSD and the keyboard panel. */
    flyouts: { enabled: true, alpha: 0.9 },
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
  "bar.inset": measurementSteps,
  "bar.iconWidth": iconButtonWidths,
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
 * v2's flyouts moves to translucency.flyouts, and its flyouts.blur to the
 * shared blur.
 */
export const migrateTokens = (json: unknown): unknown => {
  if (!isPlainObject(json)) return json;
  if (json["version"] === 2) {
    // The flyouts used to be the one translucent surface (flyouts), with
    // their own blur (flyouts.blur); both are shared now.
    const flyouts = json["flyouts"];
    if (!isPlainObject(flyouts)) return json;
    const rest: Record<string, unknown> = { ...json };
    delete rest["flyouts"];
    const translucency = isPlainObject(json["translucency"]) ? json["translucency"] : {};
    return {
      ...rest,
      blur: json["blur"] ?? flyouts["blur"],
      translucency: {
        ...translucency,
        flyouts: translucency["flyouts"] ?? {
          enabled: flyouts["translucent"],
          alpha: flyouts["alpha"],
        },
      },
    };
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

/** The layers with translucent surfaces: the bar (and its popups), the OSD, the keyboard panel. */
export const translucentLayers = "^omarchy-(bar|osd|keyboard-panel)$";

/**
 * The lowest alpha among the translucent surfaces that are on, or null when
 * none is: Hyprland blurs behind every pixel above one cutoff, which must sit
 * below each of them.
 */
export const translucentAlpha = (tokens: Tokens): number | null => {
  const { bar, flyouts } = tokens.translucency;
  const alphas = [bar, flyouts].filter((s) => s.enabled && s.alpha < 1).map((s) => s.alpha);
  return alphas.length ? Math.min(...alphas) : null;
};

/**
 * The layer rule that blurs behind the translucent surfaces (interpretation
 * shell.translucency). Always the same named rule, turned off when no surface
 * is translucent, so `hyprctl eval` can turn it on and off live. No leading
 * comment: `hyprctl eval` reads an argument starting with "-" as a flag.
 */
export const translucencyLua = (tokens: Tokens): string => {
  const alpha = translucentAlpha(tokens);
  const cutoff = alpha === null ? 0 : Math.round((alpha - 0.01) * 1000) / 1000;
  return `hl.layer_rule({ name = "m3-translucency", match = { namespace = "${translucentLayers}" }, enabled = ${alpha !== null}, blur = true, blur_popups = true, ignore_alpha = ${cutoff} })`;
};

/** Where the user override lives, relative to $HOME. */
export const tokensFile = ".config/omarchy/stef/tokens.json";

/** M3's extra-small icon button, in dp: what the bar's sizes are made of (interpretation bar.icons). */
export interface IconButtonDp {
  readonly containerHeight: number;
  readonly iconSize: number;
  readonly leadingSpace: Readonly<Record<IconButtonWidth, number>>;
}

/** The extra-small icon button from the plugins' M3 component values (tokens.m3.comp); null without them. */
export const iconButtonDpOf = (comp: Readonly<Record<string, unknown>>): IconButtonDp | null => {
  const dp = (name: string) => {
    const v = comp[`md.comp.icon-button.xsmall.${name}`];
    return typeof v === "number" ? v : undefined;
  };
  const containerHeight = dp("container.height");
  const iconSize = dp("icon.size");
  const narrow = dp("narrow.leading-space");
  const regular = dp("default.leading-space");
  const wide = dp("wide.leading-space");
  if (
    containerHeight === undefined ||
    iconSize === undefined ||
    narrow === undefined ||
    regular === undefined ||
    wide === undefined
  )
    return null;
  return { containerHeight, iconSize, leadingSpace: { narrow, default: regular, wide } };
};

/**
 * The bar's height from the tokens (interpretation bar.icons), at 1×: a full
 * extra-small icon button with tokens.bar.gap above and below, as a container
 * that grows by a line of body text. Omarchy's shell takes only the bar's
 * sizes from a theme; the theme writer and stef.omaterial (live) share this.
 */
export const barTextSpec = (tokens: Tokens, button: IconButtonDp, bodyLineHeight: number) => {
  const bar = {
    height: button.containerHeight + 2 * spacing(tokens.bar.gap),
    lineHeight: bodyLineHeight,
  };
  return {
    containers: { "bar.size-horizontal": bar, "bar.size-vertical": bar } as Record<
      string,
      { readonly height: number; readonly lineHeight: number }
    >,
  };
};

/**
 * Every icon button in the bar at the user's text size (interpretation
 * bar.icons), in px: the icon, and the button's width (the icon and
 * tokens.bar.iconWidth's space either side), which grows by the icon. The
 * shell can't be given these, so stef.bar applies them itself.
 */
export const iconButtonAt = (tokens: Tokens, button: IconButtonDp, baseSize: number) => {
  const icon = button.iconSize;
  const scaled = scaleText(
    {
      typeScale: tokens.type.scale,
      sizes: { icon },
      containers: {
        width: { height: icon + 2 * button.leadingSpace[tokens.bar.iconWidth], lineHeight: icon },
      },
    },
    baseSize,
  );
  return { iconSize: scaled["icon"]!, width: scaled["width"]! };
};
