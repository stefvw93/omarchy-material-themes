# Tokens: Carousel (TOKEN_TABLE.43a124d2adc8a2ef)

Source: <https://m3.material.io/_dsm/data/dsdb-m3/2026-09-23_06-10-05/TOKEN_TABLE.43a124d2adc8a2ef.json>, design system 'Google Material 3' revision 7989 (2026-05-27T22:44:15.009106Z).
Used on: <https://m3.material.io/components/carousel>

Each token lists its value per context. `->` shows the reference chain (component token -> system token -> reference token); the resolved value is what the baseline scheme produces in that context. Contexts with identical chain and value are merged.

## md.comp.carousel-item — Carousel item

For carousel items.

- **md.comp.carousel-item.container.color** (Carousel item container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.carousel-item.container.elevation** (Carousel item container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.carousel-item.container.shadow-color** (Carousel item container shadow color)
  - -> md.sys.color.shadow -> md.ref.palette.neutral0 = #000000 [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark; Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]
- **md.comp.carousel-item.container.shape** (Carousel item container shape)
  - -> md.sys.shape.corner.extra-large = rounded_corners 28dp
- **md.comp.carousel-item.container.surface-tint-layer.color** (Carousel item container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.carousel-item.disabled.container.color** (Carousel item disabled container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.carousel-item.disabled.container.elevation** (Carousel item disabled container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.carousel-item.disabled.container.opacity** (Carousel item disabled container opacity)
  - opacity 0.38
- **md.comp.carousel-item.focus.container.elevation** (Carousel item focus container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.carousel-item.focus.indicator.color** (Carousel item focus indicator color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary90 = #e8def8
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary20 = #332d41
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary30 = #4a4458
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary80 = #ccc2dc
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary40 = #625b71
- **md.comp.carousel-item.focus.indicator.outline.offset** (Carousel focus indicator offset)
  - -> md.sys.state.focus-indicator.outer-offset = 2dp
- **md.comp.carousel-item.focus.indicator.thickness** (Carousel item focus indicator thickness)
  - -> md.sys.state.focus-indicator.thickness = 3dp
- **md.comp.carousel-item.focus.state-layer.color** (Carousel item focus state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.carousel-item.focus.state-layer.opacity** (Carousel item focus state layer opacity)
  - -> md.sys.state.focus.state-layer-opacity = opacity 0.1
- **md.comp.carousel-item.hover.container.elevation** (Carousel item hover container elevation)
  - -> md.sys.elevation.level1 = 1dp
- **md.comp.carousel-item.hover.state-layer.color** (Carousel item hover state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.carousel-item.hover.state-layer.opacity** (Carousel item hover state layer opacity)
  - -> md.sys.state.hover.state-layer-opacity = opacity 0.08
- **md.comp.carousel-item.pressed.container.elevation** (Carousel item pressed container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.carousel-item.pressed.state-layer.color** (Carousel item pressed state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.carousel-item.pressed.state-layer.opacity** (Carousel item pressed state layer opacity)
  - -> md.sys.state.pressed.state-layer-opacity = opacity 0.1
- **md.comp.carousel-item.with-outline.disabled.outline.color** (Carousel item disabled outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant95 = #f5eefa
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant70 = #aea9b4
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.carousel-item.with-outline.disabled.outline.opacity** (Carousel item disabled outline opacity)
  - opacity 0.12
- **md.comp.carousel-item.with-outline.focus.outline.color** (Carousel item focus outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.carousel-item.with-outline.hover.outline.color** (Carousel item hover outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant95 = #f5eefa
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant70 = #aea9b4
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.carousel-item.with-outline.outline.color** (Carousel item outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant95 = #f5eefa
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant70 = #aea9b4
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.carousel-item.with-outline.outline.width** (Carousel item outline width)
  - 1dp
- **md.comp.carousel-item.with-outline.pressed.outline.color** (Carousel item pressed outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant95 = #f5eefa
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant70 = #aea9b4
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant50 = #79747e

## md.ref.palette

- **md.ref.palette.neutral-variant20** (Neutral Variant 20)
- **md.ref.palette.neutral-variant30** (Neutral Variant 30)
- **md.ref.palette.neutral-variant50** (Neutral Variant 50)
- **md.ref.palette.neutral-variant60** (Neutral Variant 60)
- **md.ref.palette.neutral-variant70** (Neutral Variant 70)
- **md.ref.palette.neutral-variant95** (Neutral Variant 95)
- **md.ref.palette.neutral0** (Neutral 0)
- **md.ref.palette.neutral10** (Neutral 10)
- **md.ref.palette.neutral100** (Neutral 100)
- **md.ref.palette.neutral6** (Neutral 6)
- **md.ref.palette.neutral90** (Neutral 90)
- **md.ref.palette.neutral98** (Neutral 98)
- **md.ref.palette.primary20** (Primary 20)
- **md.ref.palette.primary30** (Primary 30)
- **md.ref.palette.primary40** (Primary 40)
- **md.ref.palette.primary80** (Primary 80)
- **md.ref.palette.primary90** (Primary 90)
- **md.ref.palette.primary95** (Primary 95)
- **md.ref.palette.secondary20** (Secondary 20)
- **md.ref.palette.secondary30** (Secondary 30)
- **md.ref.palette.secondary40** (Secondary 40)
- **md.ref.palette.secondary80** (Secondary 80)
- **md.ref.palette.secondary90** (Secondary 90)
- **md.ref.palette.secondary95** (Secondary 95)

## md.sys.color

- **md.sys.color.on-surface** (On surface) — Text and icons shown against the surface color
- **md.sys.color.outline** (Outline) — Subtle color used for boundaries
- **md.sys.color.primary** (Primary) — Main color used across screens and components
- **md.sys.color.secondary** (Secondary) — Accent color used across screens and components
- **md.sys.color.shadow** (Shadow) — For shadows applied to elevated components
- **md.sys.color.surface** (Surface) — Surface color for components like cards, sheets, and menus
- **md.sys.color.surface-tint** (Surface tint)

## md.sys.elevation

- **md.sys.elevation.level0** (0)
- **md.sys.elevation.level1** (+1)

## md.sys.shape

- **md.sys.shape.corner.extra-large** (Extra large rounding)

## md.sys.state

- **md.sys.state.focus.state-layer-opacity** (Focus state layer opacity)
- **md.sys.state.hover.state-layer-opacity** (Hover state layer opacity)
- **md.sys.state.pressed.state-layer-opacity** (Pressed state layer opacity)

## md.sys.state.focus-indicator

- **md.sys.state.focus-indicator.outer-offset** (Focus indicator outer offset)
- **md.sys.state.focus-indicator.thickness** (Focus indicator thickness)

