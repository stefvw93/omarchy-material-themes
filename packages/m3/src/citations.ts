// Values the spec states in page text rather than as tokens. Each quote is
// verbatim from apps/studio/docs/material-3/pages/<page>; a test fails when a
// spec update changes the sentence.

export interface Citation<V> {
  readonly value: V;
  readonly page: string;
  readonly quote: string;
}

const cite = <V>(value: V, page: string, quote: string): Citation<V> => ({ value, page, quote });

export const citations = {
  scrimOpacity: cite(
    0.32,
    "styles__elevation.md",
    "Scrims use the scrim color role at an opacity of 32%.",
  ),
  elevationShadowsPerPlatform: cite(
    "web",
    "styles__elevation.md",
    "Tokens have no shadows or color; each platform determines the specific shadows and values to use at each elevation level",
  ),
  layoutMargin: cite(
    24,
    "foundations__layout__breakpoints.md",
    "Expanded layouts have a leading and trailing margin of 24dp.",
  ),
  layoutSpacer: cite(
    24,
    "foundations__layout__breakpoints.md",
    "The spacer between panes is 24dp.",
  ),
  plainTooltipHeight: cite(24, "components__tooltips.md", "| Container height | 24dp |"),
  plainTooltipPadding: cite(8, "components__tooltips.md", "| Padding | 8dp |"),
  connectedButtonGroupPadding: cite(
    2,
    "components__button-groups.md",
    "For all connected button groups, use 2dp padding.",
  ),
  connectedButtonGroupCorners: cite(
    { xsmall: 4, small: 8, medium: 8, large: 16, xlarge: 20 } as const,
    "components__button-groups.md",
    "Square connected button group inner padding is 2dp at every size. The outer shape has the following corner sizes:",
  ),
  densityLevels: cite(
    [0, -1, -2, -3] as const,
    "foundations__layout__grids-spacing.md",
    "The scale moves to negative numbers (-1, -2, -3) as space decreases, creating higher density.",
  ),
  densityStep: cite(
    4,
    "foundations__layout__grids-spacing.md",
    "Higher density is typically applied by decreasing the top and bottom padding or overall height by 4dp.",
  ),
  layoutDensity: cite(
    ["margin", "spacer", "padding"] as const,
    "foundations__layout__grids-spacing.md",
    "A layout’s spacing dimensions, including margins, spacers, and padding, can change to increase or decrease its information density.",
  ),
  textResizeSetting: cite(
    "os",
    "foundations__writing.md",
    "This adjustment is often performed through a device OS setting or in-app option.",
  ),
  textResizeMultiplier: cite(
    "multiply",
    "foundations__writing.md",
    "To calculate a font's size using multipliers, take the\u00a0**default\u00a0font size**\u00a0(density = 0) and\u00a0**multiply it by the scale value**.",
  ),
  textResizeLineHeight: cite(
    "scale",
    "foundations__writing.md",
    "Text and line height scale up proportionally, multiplied by scale value",
  ),
  textResizePadding: cite(
    "constant",
    "foundations__writing.md",
    "Padding remains constant at 1x the default size",
  ),
  textResizeNoText: cite(
    "unaffected",
    "foundations__writing.md",
    "Components that don't include text, like progress indicators, checkboxes, or radio buttons, aren't affected by text resizing.",
  ),
  minimumTarget: cite(
    48,
    "foundations__layout__grids-spacing.md",
    "Don't apply component scaling by default if it would result in a target below 48x48 CSS pixels",
  ),
  springSpeeds: cite(
    { default: "most motion", fast: "smaller elements", slow: "larger elements" },
    "styles__motion__overview.md",
    "Most motion should use the default speed, while smaller elements may use fast and larger elements may use slow.",
  ),
  legacyEasing: cite(
    "ignore",
    "styles__motion__overview.md",
    "The **easing**, **duration**, and **path** tokens are used by the legacy system, so can be ignored.",
  ),
  errorIsStaticRed: cite(
    "error",
    "styles__color__advanced.md",
    "Material provides the red Error color out of the box as an example of a static color, so you do not need to define your own static color for a semantic red color.",
  ),
  dynamicColorIsMcu: cite(
    "material-color-utilities",
    "styles__color__system.md",
    "Dynamic color is powered by the Material Color Utilities",
  ),
  harmonizeWithBlend: cite(
    "Blend.harmonize",
    "styles__color__advanced.md",
    "use the ‘Blend’ function from Material Color Utilities",
  ),
} as const;

export type CitationId = keyof typeof citations;
