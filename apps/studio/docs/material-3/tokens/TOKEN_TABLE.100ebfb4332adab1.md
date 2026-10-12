# Tokens: Cards (TOKEN_TABLE.100ebfb4332adab1)

Source: <https://m3.material.io/_dsm/data/dsdb-m3/2026-09-23_06-10-05/TOKEN_TABLE.100ebfb4332adab1.json>, design system 'Google Material 3' revision 7989 (2026-05-27T22:44:15.009106Z).
Used on: <https://m3.material.io/components/cards>

Each token lists its value per context. `->` shows the reference chain (component token -> system token -> reference token); the resolved value is what the baseline scheme produces in that context. Contexts with identical chain and value are merged.

## md.comp.elevated-card — Card - Elevated

For elevated cards.

- **md.comp.elevated-card.container.color** (Elevated card container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container-low -> md.ref.palette.neutral10 = #1d1b20
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container-low -> md.ref.palette.neutral96 = #f7f2fa
- **md.comp.elevated-card.container.elevation** (Elevated card container elevation)
  - -> md.sys.elevation.level1 = 1dp
- **md.comp.elevated-card.container.shadow-color** (Elevated card container shadow color)
  - -> md.sys.color.shadow -> md.ref.palette.neutral0 = #000000 [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark; Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]
- **md.comp.elevated-card.container.shape** (Elevated card container shape)
  - -> md.sys.shape.corner.medium = rounded_corners 12dp
- **md.comp.elevated-card.container.surface-tint-layer.color** (Elevated card container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.elevated-card.disabled.container.color** (Elevated card disabled container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.elevated-card.disabled.container.elevation** (Elevated card disabled container elevation)
  - -> md.sys.elevation.level1 = 1dp
- **md.comp.elevated-card.disabled.container.opacity** (Elevated card disabled container opacity)
  - opacity 0.38
- **md.comp.elevated-card.dragged.container.elevation** (Elevated card dragged container elevation)
  - -> md.sys.elevation.level4 = 8dp
- **md.comp.elevated-card.dragged.state-layer.color** (Elevated card dragged state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.elevated-card.dragged.state-layer.opacity** (Elevated card dragged state layer opacity)
  - -> md.sys.state.dragged.state-layer-opacity = opacity 0.16
- **md.comp.elevated-card.focus.container.elevation** (Elevated card focus container elevation)
  - -> md.sys.elevation.level1 = 1dp
- **md.comp.elevated-card.focus.indicator.color** (Elevated card focus indicator color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary90 = #e8def8
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary20 = #332d41
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary30 = #4a4458
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary80 = #ccc2dc
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary40 = #625b71
- **md.comp.elevated-card.focus.indicator.outline.offset** (Elevated card focus indicator offset)
  - -> md.sys.state.focus-indicator.outer-offset = 2dp
- **md.comp.elevated-card.focus.indicator.thickness** (Elevated card focus indicator thickness)
  - -> md.sys.state.focus-indicator.thickness = 3dp
- **md.comp.elevated-card.focus.state-layer.color** (Elevated card focus state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.elevated-card.focus.state-layer.opacity** (Elevated card focus state layer opacity)
  - -> md.sys.state.focus.state-layer-opacity = opacity 0.1
- **md.comp.elevated-card.hover.container.elevation** (Elevated card hover container elevation)
  - -> md.sys.elevation.level2 = 3dp
- **md.comp.elevated-card.hover.state-layer.color** (Elevated card hover state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.elevated-card.hover.state-layer.opacity** (Elevated card hover state layer opacity)
  - -> md.sys.state.hover.state-layer-opacity = opacity 0.08
- **md.comp.elevated-card.icon.color** (Elevated card icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.elevated-card.icon.size** (Elevated card icon size)
  - 24dp
- **md.comp.elevated-card.pressed.container.elevation** (Elevated card pressed container elevation)
  - -> md.sys.elevation.level1 = 1dp
- **md.comp.elevated-card.pressed.state-layer.color** (Elevated card pressed state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.elevated-card.pressed.state-layer.opacity** (Elevated card pressed state layer opacity)
  - -> md.sys.state.pressed.state-layer-opacity = opacity 0.1

## md.comp.filled-card — Card - Filled

For filled cards.

- **md.comp.filled-card.container.color** (Filled card container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container-highest -> md.ref.palette.neutral22 = #36343b
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container-highest -> md.ref.palette.neutral90 = #e6e0e9
- **md.comp.filled-card.container.elevation** (Filled card container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.filled-card.container.shadow-color** (Filled card container shadow color)
  - -> md.sys.color.shadow -> md.ref.palette.neutral0 = #000000 [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark; Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]
- **md.comp.filled-card.container.shape** (Filled card container shape)
  - -> md.sys.shape.corner.medium = rounded_corners 12dp
- **md.comp.filled-card.container.surface-tint-layer.color** (Filled card container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.filled-card.disabled.container.color** (Filled card disabled container color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.filled-card.disabled.container.elevation** (Filled card disabled container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.filled-card.disabled.container.opacity** (Filled card disabled container opacity)
  - opacity 0.38
- **md.comp.filled-card.dragged.container.elevation** (Filled card dragged container elevation)
  - -> md.sys.elevation.level3 = 6dp
- **md.comp.filled-card.dragged.state-layer.color** (Filled card dragged state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.filled-card.dragged.state-layer.opacity** (Filled card dragged state layer opacity)
  - -> md.sys.state.dragged.state-layer-opacity = opacity 0.16
- **md.comp.filled-card.focus.container.elevation** (Filled card focus container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.filled-card.focus.indicator.color** (Filled card focus indicator color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary90 = #e8def8
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary20 = #332d41
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary30 = #4a4458
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary80 = #ccc2dc
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary40 = #625b71
- **md.comp.filled-card.focus.indicator.outline.offset** (Filled card focus indicator offset)
  - -> md.sys.state.focus-indicator.outer-offset = 2dp
- **md.comp.filled-card.focus.indicator.thickness** (Filled card focus indicator thickness)
  - -> md.sys.state.focus-indicator.thickness = 3dp
- **md.comp.filled-card.focus.state-layer.color** (Filled card focus state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.filled-card.focus.state-layer.opacity** (Filled card focus state layer opacity)
  - -> md.sys.state.focus.state-layer-opacity = opacity 0.1
- **md.comp.filled-card.hover.container.elevation** (Filled card hover container elevation)
  - -> md.sys.elevation.level1 = 1dp
- **md.comp.filled-card.hover.state-layer.color** (Filled card hover state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.filled-card.hover.state-layer.opacity** (Filled card hover state layer opacity)
  - -> md.sys.state.hover.state-layer-opacity = opacity 0.08
- **md.comp.filled-card.icon.color** (Filled card icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.filled-card.icon.size** (Filled card icon size)
  - 24dp
- **md.comp.filled-card.pressed.container.elevation** (Filled card pressed container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.filled-card.pressed.state-layer.color** (Filled card pressed state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.filled-card.pressed.state-layer.opacity** (Filled card pressed state layer opacity)
  - -> md.sys.state.pressed.state-layer-opacity = opacity 0.1

## md.comp.outlined-card — Card - Outlined

For outlined cards.

- **md.comp.outlined-card.container.color** (Outlined card container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.outlined-card.container.elevation** (Outlined card container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.outlined-card.container.shadow-color** (Outlined card container shadow color)
  - -> md.sys.color.shadow -> md.ref.palette.neutral0 = #000000 [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark; Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]
- **md.comp.outlined-card.container.shape** (Outlined card container shape)
  - -> md.sys.shape.corner.medium = rounded_corners 12dp
- **md.comp.outlined-card.container.surface-tint-layer.color** (Outlined card container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.outlined-card.disabled.container.elevation** (Outlined card disabled container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.outlined-card.disabled.outline.color** (Outlined card disabled outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant95 = #f5eefa
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant70 = #aea9b4
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.outlined-card.disabled.outline.opacity** (Outlined card disabled outline opacity)
  - opacity 0.12
- **md.comp.outlined-card.dragged.container.elevation** (Outlined card dragged container elevation)
  - -> md.sys.elevation.level3 = 6dp
- **md.comp.outlined-card.dragged.outline.color** (Outlined card dragged outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.outlined-card.dragged.state-layer.color** (Outlined card dragged state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.outlined-card.dragged.state-layer.opacity** (Outlined card dragged state layer opacity)
  - -> md.sys.state.dragged.state-layer-opacity = opacity 0.16
- **md.comp.outlined-card.focus.container.elevation** (Outlined card focus container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.outlined-card.focus.indicator.color** (Outlined card focus indicator color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary90 = #e8def8
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary20 = #332d41
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary30 = #4a4458
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary80 = #ccc2dc
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary40 = #625b71
- **md.comp.outlined-card.focus.indicator.outline.offset** (Outlined card focus indicator offset)
  - -> md.sys.state.focus-indicator.outer-offset = 2dp
- **md.comp.outlined-card.focus.indicator.thickness** (Outlined card focus indicator thickness)
  - -> md.sys.state.focus-indicator.thickness = 3dp
- **md.comp.outlined-card.focus.outline.color** (Outlined card focus outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.outlined-card.focus.state-layer.color** (Outlined card focus state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.outlined-card.focus.state-layer.opacity** (Outlined card focus state layer opacity)
  - -> md.sys.state.focus.state-layer-opacity = opacity 0.1
- **md.comp.outlined-card.hover.container.elevation** (Outlined card hover container elevation)
  - -> md.sys.elevation.level1 = 1dp
- **md.comp.outlined-card.hover.outline.color** (Outlined card hover outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.outlined-card.hover.state-layer.color** (Outlined card hover state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.outlined-card.hover.state-layer.opacity** (Outlined card hover state layer opacity)
  - -> md.sys.state.hover.state-layer-opacity = opacity 0.08
- **md.comp.outlined-card.icon.color** (Outlined card icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.outlined-card.icon.size** (Outlined card icon size)
  - 24dp
- **md.comp.outlined-card.outline.color** (Outlined card outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.outlined-card.outline.width** (Outlined card outline width)
  - 1dp
- **md.comp.outlined-card.pressed.container.elevation** (Outlined card pressed container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.outlined-card.pressed.outline.color** (Outlined card pressed outline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline-variant -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.outlined-card.pressed.state-layer.color** (Outlined card pressed state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.outlined-card.pressed.state-layer.opacity** (Outlined card pressed state layer opacity)
  - -> md.sys.state.pressed.state-layer-opacity = opacity 0.1

## md.ref.palette

- **md.ref.palette.neutral-variant20** (Neutral Variant 20)
- **md.ref.palette.neutral-variant30** (Neutral Variant 30)
- **md.ref.palette.neutral-variant50** (Neutral Variant 50)
- **md.ref.palette.neutral-variant60** (Neutral Variant 60)
- **md.ref.palette.neutral-variant70** (Neutral Variant 70)
- **md.ref.palette.neutral-variant80** (Neutral Variant 80)
- **md.ref.palette.neutral-variant95** (Neutral Variant 95)
- **md.ref.palette.neutral0** (Neutral 0)
- **md.ref.palette.neutral10** (Neutral 10)
- **md.ref.palette.neutral100** (Neutral 100)
- **md.ref.palette.neutral22** (Neutral 22)
- **md.ref.palette.neutral6** (Neutral 6)
- **md.ref.palette.neutral90** (Neutral 90)
- **md.ref.palette.neutral96** (Neutral 96)
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
- **md.sys.color.outline-variant** (Outline Variant) — Outline-variant is used to define the border of a component where 3:1 contrast ratio isn’t required, a container, or a divider.
- **md.sys.color.primary** (Primary) — Main color used across screens and components
- **md.sys.color.secondary** (Secondary) — Accent color used across screens and components
- **md.sys.color.shadow** (Shadow) — For shadows applied to elevated components
- **md.sys.color.surface** (Surface) — Surface color for components like cards, sheets, and menus
- **md.sys.color.surface-container-highest** (Surface Container Highest)
- **md.sys.color.surface-container-low** (Surface Container Low)
- **md.sys.color.surface-tint** (Surface tint)

## md.sys.elevation

- **md.sys.elevation.level0** (0)
- **md.sys.elevation.level1** (+1)
- **md.sys.elevation.level2** (+2)
- **md.sys.elevation.level3** (+3)
- **md.sys.elevation.level4** (+4)

## md.sys.shape

- **md.sys.shape.corner.medium** (Medium rounding)

## md.sys.state

- **md.sys.state.dragged.state-layer-opacity** (Dragged state layer opacity)
- **md.sys.state.focus.state-layer-opacity** (Focus state layer opacity)
- **md.sys.state.hover.state-layer-opacity** (Hover state layer opacity)
- **md.sys.state.pressed.state-layer-opacity** (Pressed state layer opacity)

## md.sys.state.focus-indicator

- **md.sys.state.focus-indicator.outer-offset** (Focus indicator outer offset)
- **md.sys.state.focus-indicator.thickness** (Focus indicator thickness)

