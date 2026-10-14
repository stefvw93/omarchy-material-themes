// The Material 3 values the QML plugins use, resolved from @stef/m3 into a
// small module (src/m3.generated.ts) so plugins don't bundle the whole token
// set. Component tokens are an allowlist; colours stay role names, resolved
// against the theme's scheme at runtime (Scheme.qml).
import {
  citations,
  colorRoles,
  type Context,
  resolve,
  type TokenName,
  typographyOf,
  valueOf,
  webElevationShadows,
} from "@stef/m3";

/** The 15 baseline type styles. */
export const typeStyles = [
  "display-large",
  "display-medium",
  "display-small",
  "headline-large",
  "headline-medium",
  "headline-small",
  "title-large",
  "title-medium",
  "title-small",
  "body-large",
  "body-medium",
  "body-small",
  "label-large",
  "label-medium",
  "label-small",
] as const;

/** Component tokens the plugins read (Phases 10 and 11 of the plan). */
export const compAllowlist = [
  "md.comp.filled-card.container.color",
  "md.comp.filled-card.container.shape",
  "md.comp.filled-card.container.elevation",
  "md.comp.filled-card.dragged.container.elevation",
  "md.comp.filled-card.focus.indicator.color",
  "md.comp.filled-card.focus.indicator.thickness",
  "md.comp.filled-card.focus.indicator.outline.offset",
  "md.comp.filled-card.hover.state-layer.color",
  "md.comp.filled-card.hover.state-layer.opacity",
  "md.comp.elevated-card.container.color",
  "md.comp.elevated-card.container.shape",
  "md.comp.elevated-card.container.elevation",
  "md.comp.elevated-card.dragged.container.elevation",
  "md.comp.elevated-card.hover.container.elevation",
  "md.comp.outlined-card.dragged.container.elevation",
  "md.comp.outlined-card.container.color",
  "md.comp.outlined-card.container.shape",
  "md.comp.outlined-card.outline.color",
  "md.comp.outlined-card.outline.width",
  "md.comp.plain-tooltip.container.color",
  "md.comp.plain-tooltip.container.shape",
  "md.comp.plain-tooltip.supporting-text.color",
  "md.comp.plain-tooltip.supporting-text.type",
  "md.comp.primary-navigation-tab.active-indicator.color",
  "md.comp.primary-navigation-tab.active-indicator.height",
  "md.comp.primary-navigation-tab.with-label-text.active.label-text.color",
  "md.comp.primary-navigation-tab.with-label-text.inactive.label-text.color",
  "md.comp.filled-text-field.container.color",
  "md.comp.filled-text-field.active-indicator.color",
  "md.comp.filled-text-field.active-indicator.height",
  "md.comp.filled-text-field.focus.active-indicator.color",
  "md.comp.filled-text-field.focus.active-indicator.height",
  "md.comp.filled-text-field.error.focus.active-indicator.color",
  "md.comp.filled-text-field.caret.color",
  "md.comp.filled-text-field.error.focus.caret.color",
  "md.comp.filled-text-field.input-text.color",
  "md.comp.filled-text-field.input-text.placeholder.color",
  "md.comp.filled-text-field.input-text.type",
  "md.comp.filled-text-field.supporting-text.color",
  "md.comp.filled-text-field.supporting-text.type",
  "md.comp.filled-text-field.error.supporting-text.color",
  "md.comp.filled-text-field.trailing-icon.color",
  "md.comp.filled-text-field.trailing-icon.size",
  "md.comp.icon-button.standard.icon.color",
  "md.comp.icon-button.standard.disabled.icon.color",
  "md.comp.icon-button.standard.disabled.icon.opacity",
  "md.comp.icon-button.standard.hovered.state-layer.color",
  "md.comp.icon-button.standard.hovered.state-layer.opacity",
  "md.comp.icon-button.standard.pressed.state-layer.color",
  "md.comp.icon-button.standard.pressed.state-layer.opacity",
  "md.comp.icon-button.small.container.height",
  "md.comp.icon-button.small.icon.size",
] as const satisfies ReadonlyArray<TokenName>;

export interface TypeStyle {
  readonly size: number;
  readonly lineHeight: number;
  readonly weight: number;
  readonly tracking: number;
}

/** A colour token as its md.sys.color role, a length as dp, a type style as its metrics. */
export type CompValue = number | { readonly role: string } | TypeStyle;

/** The plugins' fonts are static (the user's Omarchy font), not Roboto Flex. */
export const kitContext: Context = {
  theme: "light",
  contrast: "standard",
  motionScheme: "standard",
  font: "static",
};

export const typeStyleOf = (name: TokenName, ctx: Context = kitContext): TypeStyle => {
  const t = typographyOf(name, ctx);
  return {
    size: t.size ?? 0,
    lineHeight: t.lineHeight ?? 0,
    weight: t.weight ?? 400,
    tracking: t.tracking ?? 0,
  };
};

export const compValueOf = (name: TokenName, ctx: Context = kitContext): CompValue => {
  const r = resolve(name, ctx);
  if (r.ref?.indexOf("md.sys.color.") === 0 && r.value === undefined)
    return { role: r.ref.slice("md.sys.color.".length) };
  const v = valueOf(name, ctx);
  if (typeof v === "number") return v;
  if (v && typeof v === "object" && "fonts" in v) return typeStyleOf(name, ctx);
  if (v && typeof v === "object" && "size" in v && typeof v.size === "number") return v.size;
  throw new Error(`${name}: no kit encoding for ${JSON.stringify(v)}`);
};

export const kitM3Data = (ctx: Context = kitContext) => ({
  type: Object.fromEntries(
    typeStyles.map((s) => [s, typeStyleOf(`md.sys.typescale.${s}` as TokenName, ctx)]),
  ),
  comp: Object.fromEntries(compAllowlist.map((name) => [name, compValueOf(name, ctx)])),
  scrimOpacity: citations.scrimOpacity.value,
  connectedButtonGroup: {
    padding: citations.connectedButtonGroupPadding.value,
    corners: citations.connectedButtonGroupCorners.value,
  },
  plainTooltip: {
    height: citations.plainTooltipHeight.value,
    padding: citations.plainTooltipPadding.value,
  },
  /** The Web implementation's ambient shadow per elevation level (interpretation elevation.hyprland-shadow). */
  shadows: webElevationShadows.ambient,
  roles: colorRoles,
});

export const renderKitM3 = () =>
  [
    "// Generated by packages/qml-kit/scripts/generate.ts from @stef/m3. Do not edit.",
    "// The baseline type scale (static fonts), the component tokens the plugins",
    "// read (colours as md.sys.color roles, lengths in dp), and the scrim",
    "// opacity (citations.scrimOpacity), the connected button group's padding and",
    "// corners (citations.connectedButtonGroup*), the plain tooltip's height and padding",
    "// (citations.plainTooltip*), and the md.sys.color role names.",
    "",
    "export interface KitTypeStyle {",
    "  readonly size: number;",
    "  readonly lineHeight: number;",
    "  readonly weight: number;",
    "  readonly tracking: number;",
    "}",
    "",
    `export const m3Data = ${JSON.stringify(kitM3Data(), null, 2)} as const;`,
    "",
  ].join("\n");
