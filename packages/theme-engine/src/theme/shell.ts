// The Omarchy shell's theme sections (shell.toml) from Material 3 component
// tokens. Every value names where it comes from: a token, a citation or an
// interpretation, rendered as a comment next to it.
import {
  citations,
  colorRoleOf,
  type CompTokenName,
  type Context,
  interpretation,
  numberOf,
  type TokenName,
  typographyOf,
} from "@stef/m3";
import {
  barTextSpec,
  groupbarTextSpec,
  layoutSpace,
  type MeasurementStep,
  measurementSteps,
  spacing,
  type Tokens,
} from "@stef/tokens";
import type { ThemePalette } from "../colors.ts";
import { OMARCHY_TEXT_BASE, scaleText, type TextSpec } from "@stef/tokens/text-scale";

export interface ShellValue {
  readonly value: string | number | boolean;
  /** Where the value comes from, e.g. `md.comp.menus.standard.container.color (surface-container-low)`. */
  readonly source: string;
}

export type ShellSection = Readonly<Record<string, ShellValue>>;

export interface ShellInput {
  readonly palette: ThemePalette;
  readonly tokens: Tokens;
}

/** The shell is not Roboto Flex: static fonts, standard motion; colour comes from the palette. */
const contextOf = (input: ShellInput): Context => ({
  theme: input.palette.source.mode,
  contrast: input.palette.source.contrast,
  motionScheme: input.tokens.motion.scheme,
  font: "static",
});

const shell = (input: ShellInput) => {
  const ctx = contextOf(input);
  const color = (name: CompTokenName): ShellValue => {
    const role = colorRoleOf(name, ctx);
    return { value: input.palette.system[role], source: `${name} (${role})` };
  };
  const role = (r: keyof ThemePalette["system"], source: string): ShellValue => ({
    value: input.palette.system[r],
    source: `${source} (${r})`,
  });
  const num = (name: TokenName, adjust = 0): ShellValue => ({
    value: numberOf(name, ctx) + adjust,
    source: adjust ? `${name} ${adjust > 0 ? "+" : "-"} ${Math.abs(adjust)} (density)` : name,
  });
  const fixed = (value: string | number | boolean, source: string): ShellValue => ({
    value,
    source,
  });
  /** Each density step removes 4dp of height (citations.densityStep). */
  const densityPx = input.tokens.density * citations.densityStep.value;
  return { ctx, color, role, num, fixed, densityPx };
};

/** The shell's type sizes, by key, and the M3 role each takes (interpretation shell.font). */
const fontRoles = {
  "font.caption": "md.sys.typescale.label-small",
  "font.body-small": "md.sys.typescale.body-small",
  "font.body": "md.sys.typescale.body-medium",
  "font.subtitle": "md.sys.typescale.title-small",
  "font.title": "md.sys.typescale.title-medium",
  "font.heading": "md.sys.typescale.title-large",
  "font.display": "md.sys.typescale.headline-small",
  "font.display-large": "md.sys.typescale.headline-medium",
} as const satisfies Record<string, TokenName>;

/**
 * What text resizing scales (interpretation text.scale): every type size, and
 * the containers that hold a line of text (their 1× height and that line).
 * Also written to the theme's omaterial.json for the stef.omaterial plugin.
 */
export const textSpecOf = (input: ShellInput): TextSpec => {
  interpretation("text.scale");
  const { ctx, densityPx } = shell(input);
  const size = (name: TokenName) => typographyOf(name, ctx).size ?? 0;
  const line = (name: TokenName) => typographyOf(name, ctx).lineHeight ?? 0;
  // The bar and its icon buttons, from the tokens (interpretation bar.icons):
  // the same formula stef.omaterial applies live.
  interpretation("bar.icons");
  const barSpec = barTextSpec(
    input.tokens,
    {
      containerHeight: numberOf("md.comp.icon-button.xsmall.container.height", ctx),
      iconSize: numberOf("md.comp.icon-button.xsmall.icon.size", ctx),
      leadingSpace: {
        narrow: numberOf("md.comp.icon-button.xsmall.narrow.leading-space", ctx),
        default: numberOf("md.comp.icon-button.xsmall.default.leading-space", ctx),
        wide: numberOf("md.comp.icon-button.xsmall.wide.leading-space", ctx),
      },
    },
    line("md.sys.typescale.body-medium"),
  );
  const button = {
    height: numberOf("md.comp.button.xsmall.container.height", ctx) + densityPx,
    lineHeight: line("md.sys.typescale.label-large"),
  };
  // Hyprland's group tabs, sized by the tokens (interpretation hyprland.groupbar).
  const groupbar = groupbarTextSpec(input.tokens);
  return {
    typeScale: input.tokens.type.scale,
    sizes: {
      ...Object.fromEntries(Object.entries(fontRoles).map(([key, role]) => [key, size(role)])),
      ...groupbar.sizes,
    },
    ...(groupbar.halves ? { halves: groupbar.halves } : {}),
    containers: {
      ...barSpec.containers,
      "spacing.control-height": button,
      "spacing.popup-row-height": {
        height: numberOf("md.comp.menus.menu-item.height", ctx) + densityPx,
        lineHeight: numberOf("md.comp.menus.menu-item.label-text.line-height", ctx),
      },
      ...groupbar.containers,
    },
  };
};

/**
 * The alpha at which `tint` over `base` comes nearest `target`: a least-squares
 * fit over the three channels, clamped to [0, 1] and rounded to two places.
 */
export const tintAlpha = (tint: string, base: string, target: string): number => {
  const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const [t, b, g] = [rgb(tint), rgb(base), rgb(target)];
  let num = 0;
  let den = 0;
  for (let i = 0; i < 3; i++) {
    num += (g[i]! - b[i]!) * (t[i]! - b[i]!);
    den += (t[i]! - b[i]!) ** 2;
  }
  const alpha = den === 0 ? 0 : Math.min(1, Math.max(0, num / den));
  return Math.round(alpha * 100) / 100;
};

/** The nearest md.sys.measurement step to a shell default (ties go to the smaller step). */
const nearestStep = (px: number): { step: MeasurementStep; dp: number } => {
  let best: MeasurementStep = "space0";
  for (const step of measurementSteps)
    if (Math.abs(spacing(step) - px) < Math.abs(spacing(best) - px)) best = step;
  return { step: best, dp: spacing(best) };
};

export const shellSections = (input: ShellInput): Readonly<Record<string, ShellSection>> => {
  const { ctx, color, role, num, fixed, densityPx } = shell(input);
  // Written at Omarchy's default text size; stef.omaterial rescales live.
  const spec = textSpecOf(input);
  const scaled = scaleText(spec, OMARCHY_TEXT_BASE);
  const textScaled = (key: string, source: string): ShellValue => ({
    value: scaled[key]!,
    source: spec.typeScale === 1 ? source : `${source} × type.scale ${spec.typeScale}`,
  });
  const opaque = fixed(1, "M3 containers are opaque");
  const full = fixed(1, "full opacity");
  // Not M3: the bar and its flyouts are translucent over a blur.
  interpretation("shell.translucency");
  const { translucency } = input.tokens;
  const translucent = (surface: "bar" | "flyouts"): ShellValue =>
    translucency[surface].enabled
      ? fixed(
          translucency[surface].alpha,
          `tokens.translucency.${surface}.alpha (spec exception shell.translucency)`,
        )
      : opaque;
  const scrimAlpha = fixed(citations.scrimOpacity.value, "citations.scrimOpacity");

  interpretation("shell.components");

  const bar: ShellSection = {
    background: color("md.comp.app-bar.container.color"),
    "background-alpha": translucent("bar"),
    text: color("md.comp.app-bar.title.color"),
    active: color("md.comp.badge.color"),
    "scale-with-font": fixed(false, "sizes come from tokens"),
    // The bar holds extra-small icon buttons; the spec keeps density off icon buttons.
    // The bar holds extra-small icon buttons and body text (interpretation text.scale).
    "size-horizontal": textScaled(
      "bar.size-horizontal",
      `md.comp.icon-button.xsmall.container.height + 2 × tokens.bar.gap (${input.tokens.bar.gap})`,
    ),
    "size-vertical": textScaled(
      "bar.size-vertical",
      `md.comp.icon-button.xsmall.container.height + 2 × tokens.bar.gap (${input.tokens.bar.gap})`,
    ),
    // Omarchy takes only the bar's sizes from a theme: stef.bar sizes its
    // icon buttons itself (interpretation bar.icons).
  };

  const focusIndicator = color("md.comp.menus.menu-item.focus.indicator.color");
  const hyprland: ShellSection = {
    "active-border": focusIndicator,
    "active-border-foreground": color("md.comp.outlined-card.outline.color"),
  };

  interpretation("shell.controls");
  const outline = color("md.comp.button.outlined.outline.color");
  const outlineWidth = num("md.comp.button.xsmall.outlined.outline.width");
  const content = role("on-surface", "state layer: the content colour");
  const controls: ShellSection = {
    "normal-color": content,
    "normal-fill-alpha": fixed(0, "no state layer at rest"),
    "normal-border": outline,
    "normal-border-width": outlineWidth,
    "normal-border-alpha": full,
    "hover-cursor-color": content,
    "hover-cursor-fill-alpha": num("md.sys.state.hover.state-layer-opacity"),
    "hover-cursor-border": outline,
    "hover-cursor-border-width": outlineWidth,
    "hover-cursor-border-alpha": full,
    "focus-color": content,
    "focus-fill-alpha": num("md.sys.state.focus.state-layer-opacity"),
    "focus-border": focusIndicator,
    "focus-border-width": num("md.sys.state.focus-indicator.thickness"),
    "focus-border-alpha": full,
    // Selected is a selected list item (interpretation shell.controls): the
    // secondary container, which the shell can only paint as a tint of one
    // colour; secondary at the alpha that lands on it over a panel.
    "selected-color": role("secondary", "interpretation shell.controls"),
    "selected-fill-alpha": fixed(
      tintAlpha(
        input.palette.system.secondary,
        input.palette.system[colorRoleOf("md.comp.menus.standard.container.color", ctx)],
        input.palette.system[colorRoleOf("md.comp.list.list-item.selected.container.color", ctx)],
      ),
      "interpretation shell.controls: secondary over the menu container ≈ md.comp.list.list-item.selected.container.color",
    ),
    "selected-border": role("secondary", "interpretation shell.controls"),
    "selected-border-width": fixed(0, "selected list items have no outline"),
    "selected-border-alpha": fixed(0, "selected list items have no outline"),
    "pressed-color": content,
    "pressed-fill-alpha": num("md.sys.state.pressed.state-layer-opacity"),
    "selection-color": role("primary", "interpretation shell.controls"),
    "selection-fill-alpha": fixed(0.4, "interpretation shell.controls"),
  };

  interpretation("shell.spacing");
  const snapped = (px: number): ShellValue => {
    const { step, dp } = nearestStep(px);
    return fixed(dp, `md.sys.measurement.${step} (nearest to the shell's ${px})`);
  };
  const buttonHeight = numberOf("md.comp.button.xsmall.container.height") + densityPx;
  const labelLine = typographyOf("md.sys.typescale.label-large", shell(input).ctx).lineHeight ?? 20;
  const spacingSection: ShellSection = {
    scale: fixed(1, "every value below is pinned"),
    "scale-with-font": fixed(false, "every value below is pinned"),
    xxs: snapped(2),
    xs: snapped(3),
    sm: snapped(4),
    md: snapped(6),
    lg: snapped(8),
    xl: snapped(10),
    xxl: snapped(12),
    xxxl: snapped(14),
    huge: snapped(18),
    "control-gap": snapped(8),
    "label-gap": snapped(4),
    "row-gap": snapped(8),
    "panel-gap": snapped(14),
    "control-height": textScaled(
      "spacing.control-height",
      num("md.comp.button.xsmall.container.height", densityPx).source,
    ),
    "control-padding-x": num("md.comp.button.xsmall.leading-space"),
    "control-padding-y": fixed(
      (buttonHeight - labelLine) / 2,
      "(md.comp.button.xsmall.container.height - label-large line height) / 2",
    ),
    "input-padding-y": fixed(
      (buttonHeight - labelLine) / 2,
      "(md.comp.button.xsmall.container.height - label-large line height) / 2",
    ),
    "popup-row-height": textScaled(
      "spacing.popup-row-height",
      num("md.comp.menus.menu-item.height", densityPx).source,
    ),
    "row-padding-x": num("md.comp.list.list-item.leading-space"),
    "popup-padding": num("md.comp.menus.menu-item.leading-space"),
    "panel-padding": fixed(
      layoutSpace(input.tokens, citations.layoutMargin.value),
      input.tokens.density
        ? `citations.layoutMargin - ${-densityPx} (layout density)`
        : "citations.layoutMargin",
    ),
  };

  interpretation("shell.font");
  // No base-size: that is the user's text size (interpretation text.scale).
  const font: ShellSection = {
    ...Object.fromEntries(
      Object.entries(fontRoles).map(([key, role]) => [
        key.slice("font.".length),
        textScaled(key, role),
      ]),
    ),
    "icon-small": num("md.comp.menus.menu-item.leading-icon.size"),
    icon: num("md.comp.icon-button.xsmall.icon.size"),
    "icon-large": num("md.comp.icon-button.small.icon.size"),
  };

  const popups: ShellSection = {
    background: color("md.comp.menus.standard.container.color"),
    "background-alpha": translucent("flyouts"),
    text: color("md.comp.menus.standard.menu-item.label-text.color"),
    border: color("md.comp.outlined-card.outline.color"),
    "border-alpha": full,
    "border-width": fixed(0, "menus have no outline"),
  };

  const tooltip: ShellSection = {
    background: color("md.comp.plain-tooltip.container.color"),
    "background-alpha": opaque,
    text: color("md.comp.plain-tooltip.supporting-text.color"),
    border: color("md.comp.plain-tooltip.supporting-text.color"),
    "border-alpha": full,
    "border-width": fixed(0, "plain tooltips have no outline"),
  };

  const notifications: ShellSection = {
    background: color("md.comp.elevated-card.container.color"),
    "background-alpha": opaque,
    text: role("on-surface", "text on surface-container-low"),
    border: color("md.comp.outlined-card.outline.color"),
    "border-alpha": full,
    "border-width": fixed(0, "elevated cards have no outline"),
    countdown: color("md.comp.progress-indicator.active-indicator.color"),
  };

  const searchView: ShellSection = {
    background: color("md.comp.search-view.container.color"),
    "background-alpha": opaque,
    text: color("md.comp.search-view.header.input-text.color"),
    border: color("md.comp.outlined-card.outline.color"),
    "border-alpha": full,
    "border-width": fixed(0, "the search view has no outline"),
    scrim: role("scrim", "citations.scrimOpacity"),
    "scrim-alpha": scrimAlpha,
    "selected-background": color("md.comp.list.list-item.selected.container.color"),
    "selected-background-alpha": opaque,
    "selected-text": color("md.comp.list.list-item.selected.label-text.color"),
    "selected-border": color("md.comp.list.list-item.selected.container.color"),
    "selected-border-alpha": fixed(0, "selected list items have no outline"),
  };

  const polkit: ShellSection = {
    background: color("md.comp.dialog.container.color"),
    "background-alpha": opaque,
    text: color("md.comp.dialog.headline.color"),
    "text-error": color("md.comp.filled-text-field.error.active-indicator.color"),
    border: color("md.comp.outlined-card.outline.color"),
    "border-error": color("md.comp.filled-text-field.error.active-indicator.color"),
    "border-alpha": full,
    "border-width": fixed(0, "dialogs have no outline"),
    scrim: role("scrim", "citations.scrimOpacity"),
    "scrim-alpha": scrimAlpha,
    accent: color("md.comp.dialog.with-icon.icon.color"),
  };

  const lock: ShellSection = {
    background: color("md.comp.filled-text-field.container.color"),
    "background-alpha": opaque,
    text: color("md.comp.filled-text-field.input-text.color"),
    placeholder: color("md.comp.filled-text-field.input-text.placeholder.color"),
    "text-error": color("md.comp.filled-text-field.error.active-indicator.color"),
    border: color("md.comp.filled-text-field.active-indicator.color"),
    "border-active": color("md.comp.filled-text-field.focus.active-indicator.color"),
    "border-error": color("md.comp.filled-text-field.error.active-indicator.color"),
    "border-alpha": full,
    // The password field always has focus: the focused active indicator, a bottom line.
    "border-width": fixed(
      `0 0 ${numberOf("md.comp.filled-text-field.focus.active-indicator.height")} 0`,
      "md.comp.filled-text-field.focus.active-indicator.height, bottom only",
    ),
    selection: role("primary", "interpretation shell.controls"),
    "selection-alpha": fixed(0.4, "interpretation shell.controls"),
  };

  interpretation("shell.image-picker");
  const imagePicker: ShellSection = {
    scrim: role("surface", "interpretation shell.image-picker"),
    "scrim-alpha": fixed(0.5, "interpretation shell.image-picker"),
    text: role("on-surface", "text on the surface scrim"),
    "selected-border": role("primary", "interpretation shell.image-picker"),
    "selected-border-alpha": full,
    "unselected-border": role("outline", "interpretation shell.image-picker"),
    "unselected-border-alpha": full,
  };

  return {
    bar,
    hyprland,
    controls,
    spacing: spacingSection,
    font,
    popups,
    tooltip,
    notifications,
    menu: searchView,
    launcher: searchView,
    polkit,
    lock,
    "image-picker": imagePicker,
  };
};

/** What each section is, for the file's header comment. */
export const sectionNotes: Readonly<Record<string, string>> = {
  bar: "The bar: an M3 app bar (level 0), translucent over a blur (spec exception shell.translucency). Attention modules use the badge colour.",
  hyprland:
    "Border tokens other sections can reference: the focus indicator colour, and the outline for passive edges.",
  controls:
    "Interactive chrome. M3 state layers: the content colour at the spec's opacity (hover 0.08, focus 0.10, pressed 0.10); focus adds the focus indicator; selected uses a primary navigation tab's active indicator.",
  spacing:
    "Every spacing pinned to md.sys.measurement steps or component tokens, at the user's density.",
  font: "Type sizes from the M3 type scale (the font family stays the user's Omarchy font).",
  popups: "Bar flyouts: an M3 menu, translucent over a blur (spec exception shell.translucency).",
  tooltip: "An M3 plain tooltip.",
  notifications: "An M3 elevated card.",
  menu: "The launcher-style menu: an M3 search view with a scrim; results are list items.",
  launcher: "Same as [menu].",
  polkit: "The authentication prompt: an M3 dialog with a scrim.",
  lock: "The lock screen's password field: an M3 filled text field, focused.",
  "image-picker": "No M3 component: the scrim is the surface so text on it stays readable.",
};
