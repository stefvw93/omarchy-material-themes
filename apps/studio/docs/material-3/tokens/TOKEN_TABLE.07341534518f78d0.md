# Tokens: Search (TOKEN_TABLE.07341534518f78d0)

Source: <https://m3.material.io/_dsm/data/dsdb-m3/2026-09-23_06-10-05/TOKEN_TABLE.07341534518f78d0.json>, design system 'Google Material 3' revision 7989 (2026-05-27T22:44:15.009106Z).
Used on: <https://m3.material.io/components/app-bars>, <https://m3.material.io/components/search>

Each token lists its value per context. `->` shows the reference chain (component token -> system token -> reference token); the resolved value is what the baseline scheme produces in that context. Contexts with identical chain and value are merged.

## md.comp.search-bar — Search - Bar

For baseline search bar and expressive search.

- **md.comp.search-bar.avatar.shape** (Search bar avatar shape)
  - -> md.sys.shape.corner.full = circular
- **md.comp.search-bar.avatar.size** (Search bar avatar size)
  - 30dp
- **md.comp.search-bar.contained.avatar.target-size** (Search bar contained avatar target size)
  - 48dp
- **md.comp.search-bar.contained.icon-label.gap** (Search bar contained icon label gap)
  - -> md.sys.measurement.space50 = 4dp
- **md.comp.search-bar.contained.leading-margin** (Search bar contained pane leading margin)
  - -> md.sys.measurement.space300 = 24dp
- **md.comp.search-bar.contained.leading-space** (Search bar contained leading space)
  - -> md.sys.measurement.space50 = 4dp
- **md.comp.search-bar.contained.motion.spring** (Search bar contained motion)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: -> md.sys.motion.spring.fast.spatial = {damping: 0.6, stiffness: 800}
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: -> md.sys.motion.spring.fast.spatial = {damping: 0.9, stiffness: 1400}
- **md.comp.search-bar.contained.no-actions.leading-space** (Search bar contained no actions leading space)
  - -> md.sys.measurement.space200 = 16dp
- **md.comp.search-bar.contained.no-actions.trailing-space** (Search bar contained no actions trailing space)
  - -> md.sys.measurement.space200 = 16dp
- **md.comp.search-bar.contained.trailing-actions.gap** (Search bar contained trailing actions gap)
  - -> md.sys.measurement.space0 = 0dp
- **md.comp.search-bar.contained.trailing-actions.leading-space** (Search bar contained trailing actions leading space)
  - -> md.sys.measurement.space50 = 4dp
- **md.comp.search-bar.contained.trailing-actions.trailing-space** (Search bar contained trailing actions trailing space)
  - -> md.sys.measurement.space50 = 4dp
- **md.comp.search-bar.contained.trailing-margin** (Search bar contained pane trailing margin)
  - -> md.sys.measurement.space300 = 24dp
- **md.comp.search-bar.contained.trailing-space** (Search bar contained trailing space)
  - -> md.sys.measurement.space50 = 4dp
- **md.comp.search-bar.container.color** (Search bar container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container-high -> md.ref.palette.neutral17 = #2b2930
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container-high -> md.ref.palette.neutral92 = #ece6f0
- **md.comp.search-bar.container.elevation** (Search bar container elevation)
  - -> md.sys.elevation.level3 = 6dp
- **md.comp.search-bar.container.height** (Search bar container height)
  - 56dp
- **md.comp.search-bar.container.shape** (Search bar container shape)
  - -> md.sys.shape.corner.full = circular
- **md.comp.search-bar.container.surface-tint-layer.color** (Search bar container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.search-bar.focus.indicator.color** (Search bar focus indicator color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary90 = #e8def8
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary20 = #332d41
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary30 = #4a4458
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.secondary -> md.ref.palette.secondary80 = #ccc2dc
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.secondary -> md.ref.palette.secondary40 = #625b71
- **md.comp.search-bar.focus.indicator.outline.offset** (Search bar focus indicator offset)
  - -> md.sys.state.focus-indicator.outer-offset = 2dp
- **md.comp.search-bar.focus.indicator.thickness** (Search bar focus indicator thickness)
  - -> md.sys.state.focus-indicator.thickness = 3dp
- **md.comp.search-bar.hover.state-layer.color** (Search bar hover state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.search-bar.hover.state-layer.opacity** (Search bar hover state layer opacity)
  - -> md.sys.state.hover.state-layer-opacity = opacity 0.08
- **md.comp.search-bar.hover.supporting-text.color** (Search bar hover supporting text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.search-bar.icon.size** (Search bar icon size)
  - 24dp
- **md.comp.search-bar.input-text.color** (Search bar input text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.search-bar.input-text.font** (Search bar input text font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-large.font -> md.ref.typeface.plain = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-large.font -> md.ref.typeface.plain = Roboto
- **md.comp.search-bar.input-text.line-height** (Search bar input text line height)
  - -> md.sys.typescale.body-large.line-height = 24pt
- **md.comp.search-bar.input-text.size** (Search bar input text size)
  - -> md.sys.typescale.body-large.size = 16pt
- **md.comp.search-bar.input-text.tracking** (Search bar input text tracking)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-large.tracking = 0pt
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-large.tracking = 0.5pt
- **md.comp.search-bar.input-text.type** (Search bar input text type)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0.5pt
- **md.comp.search-bar.input-text.weight** (Search bar input text weight)
  - -> md.sys.typescale.body-large.weight -> md.ref.typeface.weight-regular = weight 400 [Platform=Compose; Platform=Web; Platform=Android]
- **md.comp.search-bar.leading-icon.color** (Search bar leading icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.search-bar.leading-icon.leading-icon-label-space** (Search bar leading icon leading icon label space)
  - -> md.sys.measurement.space200 = 16dp
- **md.comp.search-bar.leading-space** (Search bar leading space)
  - -> md.sys.measurement.space200 = 16dp
- **md.comp.search-bar.pressed.state-layer.color** (Search bar pressed state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.search-bar.pressed.state-layer.opacity** (Search bar pressed state layer opacity)
  - -> md.sys.state.pressed.state-layer-opacity = opacity 0.1
- **md.comp.search-bar.pressed.supporting-text.color** (Search bar pressed supporting text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.search-bar.supporting-text.color** (Search bar supporting text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.search-bar.supporting-text.font** (Search bar supporting text font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-large.font -> md.ref.typeface.plain = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-large.font -> md.ref.typeface.plain = Roboto
- **md.comp.search-bar.supporting-text.line-height** (Search bar supporting text line height)
  - -> md.sys.typescale.body-large.line-height = 24pt
- **md.comp.search-bar.supporting-text.size** (Search bar supporting text size)
  - -> md.sys.typescale.body-large.size = 16pt
- **md.comp.search-bar.supporting-text.tracking** (Search bar supporting text tracking)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-large.tracking = 0pt
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-large.tracking = 0.5pt
- **md.comp.search-bar.supporting-text.type** (Search bar supporting text type)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0.5pt
- **md.comp.search-bar.supporting-text.weight** (Search bar supporting text weight)
  - -> md.sys.typescale.body-large.weight -> md.ref.typeface.weight-regular = weight 400 [Platform=Compose; Platform=Web; Platform=Android]
- **md.comp.search-bar.trailing-icon.color** (Search bar trailing icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.search-bar.trailing-icon.label-trailing-icon-space** (Search bar trailing icon label trailing icon space)
  - -> md.sys.measurement.space200 = 16dp
- **md.comp.search-bar.trailing-space** (Search bar trailing space)
  - -> md.sys.measurement.space200 = 16dp

## md.comp.search-view — Search - View

For baseline search view and expressive search when activated.

- **md.comp.search-view.contained.background.color** (Search view contained background color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container-low -> md.ref.palette.neutral10 = #1d1b20
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container-low -> md.ref.palette.neutral96 = #f7f2fa
- **md.comp.search-view.contained.docked.bar-results.gap** (Search view contained docked bar results gap)
  - -> md.sys.measurement.space25 = 2dp
- **md.comp.search-view.contained.docked.bar.shape** (Search view contained docked bar shape)
  - -> md.sys.shape.corner.full = circular
- **md.comp.search-view.contained.docked.results.shape** (Search view contained docked results shape)
  - -> md.sys.shape.corner.medium = rounded_corners 12dp
- **md.comp.search-view.contained.full-screen.bar.container.height** (Search view contained full screen bar container height)
  - 56dp
- **md.comp.search-view.contained.icon-label.gap** (Search view contained icon label gap)
  - -> md.sys.measurement.space50 = 4dp
- **md.comp.search-view.contained.leading-margin** (Search view contained leading margin)
  - -> md.sys.measurement.space150 = 12dp
- **md.comp.search-view.contained.trailing-margin** (Search view contained trailing margin)
  - -> md.sys.measurement.space150 = 12dp
- **md.comp.search-view.container.color** (Search view container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container-high -> md.ref.palette.neutral17 = #2b2930
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container-high -> md.ref.palette.neutral92 = #ece6f0
- **md.comp.search-view.container.elevation** (Search view container background elevation)
  - -> md.sys.elevation.level3 = 6dp
- **md.comp.search-view.container.surface-tint-layer.color** (Search view container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.search-view.divider.color** (Search view divider color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant95 = #f5eefa
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant70 = #aea9b4
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant30 = #49454f
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.outline -> md.ref.palette.neutral-variant60 = #938f99
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.outline -> md.ref.palette.neutral-variant50 = #79747e
- **md.comp.search-view.docked.container.shape** (Search view docked container shape)
  - -> md.sys.shape.corner.extra-large = rounded_corners 28dp
- **md.comp.search-view.docked.header.container.height** (Search view docked header container height)
  - 56dp
- **md.comp.search-view.full-screen.container.shape** (Search view full screen container shape)
  - -> md.sys.shape.corner.none = rounded_corners 0dp
- **md.comp.search-view.full-screen.header.container.height** (Search view full screen header container height)
  - 72dp
- **md.comp.search-view.header.input-text.color** (Search view header input text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.search-view.header.input-text.font** (Search view header input text font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-large.font -> md.ref.typeface.plain = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-large.font -> md.ref.typeface.plain = Roboto
- **md.comp.search-view.header.input-text.line-height** (Search view header input text line height)
  - -> md.sys.typescale.body-large.line-height = 24pt
- **md.comp.search-view.header.input-text.size** (Search view header input text size)
  - -> md.sys.typescale.body-large.size = 16pt
- **md.comp.search-view.header.input-text.tracking** (Search view header input text tracking)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-large.tracking = 0pt
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-large.tracking = 0.5pt
- **md.comp.search-view.header.input-text.type** (Search view header input text type)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0.5pt
- **md.comp.search-view.header.input-text.weight** (Search view header input text weight)
  - -> md.sys.typescale.body-large.weight -> md.ref.typeface.weight-regular = weight 400 [Platform=Compose; Platform=Web; Platform=Android]
- **md.comp.search-view.header.leading-icon.color** (Search view header leading icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.search-view.header.supporting-text.color** (Search view header supporting text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.search-view.header.supporting-text.font** (Search view header supporting text font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-large.font -> md.ref.typeface.plain = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-large.font -> md.ref.typeface.plain = Roboto
- **md.comp.search-view.header.supporting-text.line-height** (Search view header supporting text line height)
  - -> md.sys.typescale.body-large.line-height = 24pt
- **md.comp.search-view.header.supporting-text.size** (Search view header supporting text size)
  - -> md.sys.typescale.body-large.size = 16pt
- **md.comp.search-view.header.supporting-text.tracking** (Search view header supporting text tracking)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-large.tracking = 0pt
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-large.tracking = 0.5pt
- **md.comp.search-view.header.supporting-text.type** (Search view header supporting text type)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0.5pt
- **md.comp.search-view.header.supporting-text.weight** (Search view header supporting text weight)
  - -> md.sys.typescale.body-large.weight -> md.ref.typeface.weight-regular = weight 400 [Platform=Compose; Platform=Web; Platform=Android]
- **md.comp.search-view.header.trailing-icon.color** (Search view header trailing icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.search-view.leading-icon.leading-icon-label-space** (Search view leading icon leading icon label space)
  - -> md.sys.measurement.space200 = 16dp
- **md.comp.search-view.leading-space** (Search view leading space)
  - -> md.sys.measurement.space200 = 16dp
- **md.comp.search-view.trailing-icon.label-trailing-icon-space** (Search view trailing icon label trailing icon space)
  - -> md.sys.measurement.space200 = 16dp
- **md.comp.search-view.trailing-space** (Search view trailing space)
  - -> md.sys.measurement.space200 = 16dp

## md.ref.palette

- **md.ref.palette.neutral-variant0** (Neutral Variant 0)
- **md.ref.palette.neutral-variant100** (Neutral Variant 100)
- **md.ref.palette.neutral-variant20** (Neutral Variant 20)
- **md.ref.palette.neutral-variant30** (Neutral Variant 30)
- **md.ref.palette.neutral-variant50** (Neutral Variant 50)
- **md.ref.palette.neutral-variant60** (Neutral Variant 60)
- **md.ref.palette.neutral-variant70** (Neutral Variant 70)
- **md.ref.palette.neutral-variant80** (Neutral Variant 80)
- **md.ref.palette.neutral-variant90** (Neutral Variant 90)
- **md.ref.palette.neutral-variant95** (Neutral Variant 95)
- **md.ref.palette.neutral0** (Neutral 0)
- **md.ref.palette.neutral10** (Neutral 10)
- **md.ref.palette.neutral100** (Neutral 100)
- **md.ref.palette.neutral17** (Neutral 17)
- **md.ref.palette.neutral90** (Neutral 90)
- **md.ref.palette.neutral92** (Neutral 92)
- **md.ref.palette.neutral96** (Neutral 96)
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

## md.ref.typeface

- **md.ref.typeface.plain** (Plain typeface)
- **md.ref.typeface.weight-regular** (Regular weight)

## md.sys.color

- **md.sys.color.on-surface** (On surface) — Text and icons shown against the surface color
- **md.sys.color.on-surface-variant** (On surface variant) — For text and icons to indicate active or inactive component state
- **md.sys.color.outline** (Outline) — Subtle color used for boundaries
- **md.sys.color.primary** (Primary) — Main color used across screens and components
- **md.sys.color.secondary** (Secondary) — Accent color used across screens and components
- **md.sys.color.surface-container-high** (Surface Container High)
- **md.sys.color.surface-container-low** (Surface Container Low)
- **md.sys.color.surface-tint** (Surface tint)

## md.sys.elevation

- **md.sys.elevation.level3** (+3)

## md.sys.measurement

- **md.sys.measurement.space0** (Space 0) — 0 x base measurement
- **md.sys.measurement.space150** (Space 150) — 1.5 x base measurement
- **md.sys.measurement.space200** (Space 200) — 2 x base measurement
- **md.sys.measurement.space25** (Space 25) — .25 x base measurement
- **md.sys.measurement.space300** (Space 300) — 3 x base measurement
- **md.sys.measurement.space50** (Space 50) — .5 x base measurement

## md.sys.motion

- **md.sys.motion.spring.fast.spatial** (Motion spring fast spatial)
- **md.sys.motion.spring.fast.spatial.damping** (Motion spring fast spatial damping)
- **md.sys.motion.spring.fast.spatial.stiffness** (Motion spring fast spatial stiffness)

## md.sys.shape

- **md.sys.shape.corner.extra-large** (Extra large rounding)
- **md.sys.shape.corner.full** (Fully rounded) — Use for: Badge, Buttons, Icon buttons, Sliders, Switches, Search bar
- **md.sys.shape.corner.medium** (Medium rounding)
- **md.sys.shape.corner.none** (No rounding)

## md.sys.state

- **md.sys.state.hover.state-layer-opacity** (Hover state layer opacity)
- **md.sys.state.pressed.state-layer-opacity** (Pressed state layer opacity)

## md.sys.state.focus-indicator

- **md.sys.state.focus-indicator.outer-offset** (Focus indicator outer offset)
- **md.sys.state.focus-indicator.thickness** (Focus indicator thickness)

## md.sys.typescale

- **md.sys.typescale.body-large.font** (Body Large font name)
- **md.sys.typescale.body-large.line-height** (Body Large line height)
- **md.sys.typescale.body-large.size** (Body Large font size)
- **md.sys.typescale.body-large.tracking** (Body Large font tracking)
- **md.sys.typescale.body-large.weight** (Body Large font weight)

