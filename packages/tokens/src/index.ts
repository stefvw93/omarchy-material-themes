import {
  citations,
  interpretation,
  numberOf,
  type TokenName,
  typographyOf,
  webElevationShadows,
  webSpringCurves,
} from "@stef/m3";
import { type Spring, hyprlandDampening, motionSchemes } from "@stef/motion";
import { Schema } from "effect";
import { OMARCHY_TEXT_BASE, scaleText, type TextSpec } from "./text-scale.ts";
import {
  borderWidths,
  cornerRadius,
  cornerSteps,
  densityLevels,
  groupbarShapes,
  groupbarSizes,
  iconButtonWidths,
  measurementSteps,
  spacing,
  springsOf,
  type Tokens,
  translucencyLua,
  translucentAlpha,
} from "./runtime.ts";

export * from "./runtime.ts";
export * from "./text-scale.ts";

const Step = Schema.Literals(measurementSteps);
const Ms = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));
const Fraction = Schema.Number.check(Schema.isBetween({ minimum: 0, maximum: 1 }));
const Px = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));

/**
 * The tokens.json Schema: what Studio edits and `stef tokens` validates.
 * Plugins don't bundle it (Effect is large); they use `resolveTokens`, which
 * falls back per key instead of failing.
 */
export const TokensSchema = Schema.Struct({
  version: Schema.Literal(2),
  motion: Schema.Struct({ scheme: Schema.Literals(["standard", "expressive"]) }),
  shape: Schema.Struct({ windowCorner: Schema.Literals(cornerSteps) }),
  density: Schema.Literals(densityLevels),
  type: Schema.Struct({
    scale: Schema.Number.check(Schema.isBetween({ minimum: 0.5, maximum: 3 })),
  }),
  layout: Schema.Struct({ margin: Step, spacer: Step, workspaceGap: Step }),
  border: Schema.Struct({ width: Schema.Literals(borderWidths) }),
  groupbar: Schema.Struct({
    size: Schema.Literals(groupbarSizes),
    shape: Schema.Literals(groupbarShapes),
    padding: Step,
  }),
  bar: Schema.Struct({
    shape: Schema.Literals(groupbarShapes),
    size: Schema.Literals(groupbarSizes),
    gap: Step,
    padding: Step,
    inset: Step,
    iconWidth: Schema.Literals(iconButtonWidths),
  }),
  blur: Schema.Struct({
    size: Px,
    passes: Schema.Int.check(Schema.isBetween({ minimum: 0, maximum: 8 })),
  }),
  translucency: Schema.Struct({
    bar: Schema.Struct({ enabled: Schema.Boolean, alpha: Fraction }),
    flyouts: Schema.Struct({ enabled: Schema.Boolean, alpha: Fraction }),
  }),
  special: Schema.Struct({ blur: Schema.Boolean }),
  expo: Schema.Struct({
    outerMargin: Step,
    tileGap: Step,
    tilePadding: Step,
    rise: Step,
    tileStagger: Ms,
    windowStagger: Ms,
    windowLead: Ms,
    tileScaleFrom: Fraction,
    windowScaleFrom: Fraction,
  }),
  periphery: Schema.Struct({
    bandMargin: Step,
    cardGap: Step,
    groupGap: Step,
  }),
});

/** Window border width in dp: an outlined card's outline, or the focus indicator. */
export const borderWidthOf = (tokens: Tokens): number =>
  tokens.border.width === "outline"
    ? numberOf("md.comp.outlined-card.outline.width")
    : numberOf("md.sys.state.focus-indicator.thickness");

/** A layout margin, spacer or padding at the user's density: 4dp less per level. */
export const layoutSpace = (tokens: Tokens, dp: number): number => {
  interpretation("layout.density");
  return Math.max(0, dp + tokens.density * citations.densityStep.value);
};

/** Hyprland's gaps: gaps_out is the screen margin; two windows sit 2 × gaps_in apart. */
export const gapsOf = (tokens: Tokens) => {
  interpretation("hyprland.gaps");
  return {
    outer: layoutSpace(tokens, spacing(tokens.layout.margin)),
    inner: layoutSpace(tokens, spacing(tokens.layout.spacer)) / 2,
    workspaces: spacing(tokens.layout.workspaceGap),
  };
};

/**
 * Hyprland's window group tabs as an M3 connected button group (interpretation
 * hyprland.groupbar), at Omarchy's default text size: the button size's
 * height (at the user's density), side padding and label, the group's
 * padding between tabs and to the window, and its corners. The square
 * variant's corners are the spec's for the size; the round variant is fully
 * round outside and square inside (Hyprland can't round inner corners alone).
 */
export const groupbarOf = (tokens: Tokens) => {
  interpretation("hyprland.groupbar");
  const button = `md.comp.button.${tokens.groupbar.size}` as const;
  const label = typographyOf(`${button}.label-text` as TokenName);
  const height =
    numberOf(`${button}.container.height` as TokenName) +
    tokens.density * citations.densityStep.value;
  return {
    height,
    lineHeight: label.lineHeight ?? 0,
    fontSize: label.size ?? 0,
    fontWeight: label.weight ?? 500,
    textPadding: numberOf(`${button}.leading-space` as TokenName),
    padding: spacing(tokens.groupbar.padding),
    round: tokens.groupbar.shape === "round",
    corner:
      tokens.groupbar.shape === "round"
        ? Math.round(height / 2)
        : citations.connectedButtonGroupCorners.value[tokens.groupbar.size],
  };
};

/** The group tabs' part of the text spec: the label grows with the text size, and the tab with its line. */
export const groupbarTextSpec = (tokens: Tokens): TextSpec => {
  const g = groupbarOf(tokens);
  return {
    typeScale: tokens.type.scale,
    sizes: { "groupbar.font_size": g.fontSize },
    containers: { "groupbar.height": { height: g.height, lineHeight: g.lineHeight } },
    ...(g.round ? { halves: { "groupbar.gradient_rounding": "groupbar.height" } } : {}),
  };
};

/** `hl.config` for the group tabs' geometry (colour comes from the theme). */
const groupbarLua = (tokens: Tokens) => {
  const g = groupbarOf(tokens);
  const text = scaleText(groupbarTextSpec(tokens), OMARCHY_TEXT_BASE);
  return `-- Window group tabs: an M3 connected button group (${tokens.groupbar.size}, ${tokens.groupbar.shape}).
hl.config({
  group = {
    groupbar = {
      font_size = ${text["groupbar.font_size"]},
      font_weight_active = ${g.fontWeight},
      font_weight_inactive = ${g.fontWeight},
      height = ${text["groupbar.height"]},
      text_padding = ${g.textPadding},
      gaps_in = ${g.padding},
      gaps_out = ${g.padding},
      gradient_rounding = ${g.round ? text["groupbar.gradient_rounding"] : g.corner},
      gradient_round_only_edges = ${g.round},
      round_only_edges = ${g.round},
    },
  },
})`;
};

/**
 * The shadow a floating window casts: elevation level 3 (a dialog's resting
 * level), as the Web implementation draws its ambient shadow.
 */
export const windowShadow = () => {
  // "each platform determines the specific shadows" (citations.elevationShadowsPerPlatform)
  interpretation("elevation.hyprland-shadow");
  const ambient = webElevationShadows.ambient.levels.find((l) => l.level === 3)!;
  return {
    range: ambient.blur + ambient.spread,
    offset: [ambient.x, ambient.y] as const,
    opacity: webElevationShadows.ambient.opacity,
    renderPower: 2,
  };
};

const round = (n: number) => Math.round(n * 1000) / 1000;

/** `hl.curve` for each spring of the scheme, named `m3_<kind>_<speed>`. */
const curvesLua = (tokens: Tokens) =>
  Object.entries(springsOf(tokens))
    .map(
      ([name, spring]: [string, Spring]) =>
        `hl.curve("m3_${name}", { type = "spring", mass = 1, stiffness = ${spring.stiffness}, dampening = ${round(hyprlandDampening(spring))} })`,
    )
    .join("\n");

/**
 * Every animation leaf on an M3 spring. Speed follows the spec: default for
 * most motion, fast for small elements, slow for full-screen motion.
 */
export const animationLeaves: ReadonlyArray<{
  readonly leaf: string;
  readonly spring: keyof typeof motionSchemes.standard;
  readonly style?: string;
}> = [
  { leaf: "global", spring: "effects_default" },
  { leaf: "windows", spring: "spatial_default" },
  { leaf: "windowsIn", spring: "spatial_default", style: "popin 87%" },
  { leaf: "windowsOut", spring: "spatial_default", style: "popin 87%" },
  { leaf: "border", spring: "effects_fast" },
  { leaf: "fade", spring: "effects_default" },
  { leaf: "layers", spring: "spatial_fast" },
  { leaf: "layersIn", spring: "spatial_fast", style: "fade" },
  { leaf: "layersOut", spring: "spatial_fast", style: "fade" },
  { leaf: "fadeLayersIn", spring: "effects_fast" },
  { leaf: "fadeLayersOut", spring: "effects_fast" },
  { leaf: "workspaces", spring: "spatial_slow", style: "slide" },
  { leaf: "specialWorkspace", spring: "spatial_slow", style: "slidevert" },
];

/**
 * Hyprland's shape, spacing and motion from the tokens, without colour. The
 * theme's hyprland.lua adds colour on top; on its own (as
 * ~/.config/hypr/stef/tokens.lua) it applies the tokens under any theme.
 */
export const hyprlandTokensLua = (tokens: Tokens): string => {
  interpretation("hyprland.animations");
  interpretation("window.corner");
  const gaps = gapsOf(tokens);
  const shadow = windowShadow();
  interpretation("special.scrim");
  interpretation("shell.translucency");
  const blur = translucentAlpha(tokens) !== null || tokens.special.blur;
  return `-- Material 3 shape, spacing and motion, from ~/.config/omarchy/stef/tokens.json
-- (@stef/tokens). Do not edit: change the tokens (Omaterial Studio, or
-- \`stef tokens set\`) and regenerate.

hl.config({
  general = {
    gaps_in = ${gaps.inner},
    gaps_out = ${gaps.outer},
    gaps_workspaces = ${gaps.workspaces},
    border_size = ${borderWidthOf(tokens)},
  },
  decoration = {
    -- md.sys.shape.corner.${tokens.shape.windowCorner}
    rounding = ${cornerRadius(tokens.shape.windowCorner)},
    shadow = {
      enabled = true,
      range = ${shadow.range},
      offset = { ${shadow.offset.join(", ")} },
      render_power = ${shadow.renderPower},
      scale = 1,
    },
    -- Behind a shown special workspace: md.sys.color.scrim at the scrim opacity.
    dim_special = ${citations.scrimOpacity.value},
    blur = {
      enabled = ${blur},${blur ? `\n      size = ${tokens.blur.size},\n      passes = ${tokens.blur.passes},\n      popups = true,\n      special = ${tokens.special.blur},` : ""}
    },
  },
})

${groupbarLua(tokens)}

-- Elevation: tiled windows rest at level 0 (no shadow), floating windows at level 3.
hl.window_rule({ name = "m3-tiled-level0", match = { float = false }, no_shadow = true })

-- Not M3 (the spec exception shell.translucency): the bar and its flyouts are translucent over a blurred backdrop.
${translucencyLua(tokens)}

-- Material 3 "${tokens.motion.scheme}" springs (md.sys.motion.spring.*), mass 1.
-- Hyprland takes the damping coefficient: 2 * ratio * sqrt(stiffness).
${curvesLua(tokens)}

${animationLeaves
  .map(
    (a) =>
      `hl.animation({ leaf = "${a.leaf}", enabled = true, speed = 1, spring = "m3_${a.spring}"${a.style ? `, style = "${a.style}"` : ""} })`,
  )
  .join("\n")}
`;
};

/** CSS custom properties for Studio, so its UI shares the desktop's shape and motion. */
export const cssVariables = (tokens: Tokens): Record<string, string> => {
  const gaps = gapsOf(tokens);
  const vars: Record<string, string> = {
    "--stef-gap-inner": `${gaps.inner}px`,
    "--stef-gap-outer": `${gaps.outer}px`,
    "--stef-border-width": `${borderWidthOf(tokens)}px`,
    "--stef-window-corner": `${cornerRadius(tokens.shape.windowCorner)}px`,
  };
  for (const c of webSpringCurves) {
    if (c.scheme !== tokens.motion.scheme) continue;
    vars[`--stef-${c.kind}-${c.speed}-easing`] = `cubic-bezier(${c.curve.join(", ")})`;
    vars[`--stef-${c.kind}-${c.speed}-duration`] = `${c.durationMs}ms`;
  }
  return vars;
};

export { motionSchemes };
