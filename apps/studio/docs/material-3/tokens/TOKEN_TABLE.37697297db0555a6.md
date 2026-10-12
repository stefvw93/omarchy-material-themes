# Tokens: Tooltips (TOKEN_TABLE.37697297db0555a6)

Source: <https://m3.material.io/_dsm/data/dsdb-m3/2026-09-23_06-10-05/TOKEN_TABLE.37697297db0555a6.json>, design system 'Google Material 3' revision 7989 (2026-05-27T22:44:15.009106Z).
Used on: <https://m3.material.io/components/tooltips>

Each token lists its value per context. `->` shows the reference chain (component token -> system token -> reference token); the resolved value is what the baseline scheme produces in that context. Contexts with identical chain and value are merged.

## md.comp.plain-tooltip — Tooltip - Plain

For plain tooltips.

- **md.comp.plain-tooltip.container.color** (Plain tooltip container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.inverse-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.inverse-surface -> md.ref.palette.neutral20 = #322f35
- **md.comp.plain-tooltip.container.shape** (Plain tooltip container shape)
  - -> md.sys.shape.corner.extra-small = rounded_corners 4dp
- **md.comp.plain-tooltip.supporting-text.color** (Plain tooltip supporting text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.inverse-on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.inverse-on-surface -> md.ref.palette.neutral10 = #1d1b20
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.inverse-on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.inverse-on-surface -> md.ref.palette.neutral20 = #322f35
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.inverse-on-surface -> md.ref.palette.neutral95 = #f5eff7
- **md.comp.plain-tooltip.supporting-text.font** (Plain tooltip supporting text font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-small.font -> md.ref.typeface.plain = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-small.font -> md.ref.typeface.plain = Roboto
- **md.comp.plain-tooltip.supporting-text.line-height** (Plain tooltip supporting text line height)
  - -> md.sys.typescale.body-small.line-height = 16pt
- **md.comp.plain-tooltip.supporting-text.size** (Plain tooltip supporting text size)
  - -> md.sys.typescale.body-small.size = 12pt
- **md.comp.plain-tooltip.supporting-text.tracking** (Plain tooltip supporting text tracking)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-small.tracking = 0pt
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-small.tracking = 0.4pt
- **md.comp.plain-tooltip.supporting-text.type** (Supporting text type style)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 12pt; lineHeight 16pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 12pt; lineHeight 16pt; fontTracking 0.4pt
- **md.comp.plain-tooltip.supporting-text.weight** (Plain tooltip supporting text weight)
  - -> md.sys.typescale.body-small.weight -> md.ref.typeface.weight-regular = weight 400 [Platform=Compose; Platform=Web; Platform=Android]

## md.comp.rich-tooltip — Tooltip - Rich

For rich tooltips.

- **md.comp.rich-tooltip.action.focus.label-text.color** (Rich tooltip action focus label text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.rich-tooltip.action.focus.state-layer.color** (Rich tooltip action focus state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.rich-tooltip.action.focus.state-layer.opacity** (Rich tooltip action focus state layer opacity)
  - -> md.sys.state.focus.state-layer-opacity = opacity 0.1
- **md.comp.rich-tooltip.action.hover.label-text.color** (Rich tooltip action hover label text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.rich-tooltip.action.hover.state-layer.color** (Rich tooltip action hover state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.rich-tooltip.action.hover.state-layer.opacity** (Rich tooltip action hover state layer opacity)
  - -> md.sys.state.hover.state-layer-opacity = opacity 0.08
- **md.comp.rich-tooltip.action.label-text.color** (Rich tooltip action label text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.rich-tooltip.action.label-text.font** (Rich tooltip action label text font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.label-large.font -> md.ref.typeface.plain = Roboto Flex
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.label-large.font -> md.ref.typeface.plain = Roboto
- **md.comp.rich-tooltip.action.label-text.line-height** (Rich tooltip action label text line height)
  - -> md.sys.typescale.label-large.line-height = 20pt
- **md.comp.rich-tooltip.action.label-text.size** (Rich tooltip action label text size)
  - -> md.sys.typescale.label-large.size = 14pt
- **md.comp.rich-tooltip.action.label-text.tracking** (Rich tooltip action label text tracking)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.label-large.tracking = 0pt
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.label-large.tracking = 0.1pt
- **md.comp.rich-tooltip.action.label-text.type** (Type style)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 500; fontSize 14pt; lineHeight 20pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: Roboto; weight 700; fontSize 14pt; lineHeight 20pt; fontTracking 0.1pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 500; fontSize 14pt; lineHeight 20pt; fontTracking 0.1pt
- **md.comp.rich-tooltip.action.label-text.weight** (Rich tooltip action label text weight)
  - [Font=iOS bold + Platform=Compose; Font=iOS bold + Platform=Web; Font=iOS bold + Platform=Android]: -> md.sys.typescale.label-large.weight -> md.ref.typeface.weight-bold = weight 700
  - [Font=Variable + Platform=Compose; Font=Static + Platform=Compose; Font=Variable + Platform=Web; Font=Static + Platform=Web; Font=Variable + Platform=Android; Font=Static + Platform=Android]: -> md.sys.typescale.label-large.weight -> md.ref.typeface.weight-medium = weight 500
- **md.comp.rich-tooltip.action.pressed.label-text.color** (Rich tooltip action pressed label text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.rich-tooltip.action.pressed.state-layer.color** (Rich tooltip action pressed state layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.rich-tooltip.action.pressed.state-layer.opacity** (Rich tooltip action pressed state layer opacity)
  - -> md.sys.state.pressed.state-layer-opacity = opacity 0.1
- **md.comp.rich-tooltip.container.color** (Rich tooltip container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container -> md.ref.palette.neutral12 = #211f26
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container -> md.ref.palette.neutral94 = #f3edf7
- **md.comp.rich-tooltip.container.elevation** (Rich tooltip container elevation)
  - -> md.sys.elevation.level2 = 3dp
- **md.comp.rich-tooltip.container.shadow-color** (Rich tooltip container shadow color)
  - -> md.sys.color.shadow -> md.ref.palette.neutral0 = #000000 [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark; Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]
- **md.comp.rich-tooltip.container.shape** (Rich tooltip container shape)
  - -> md.sys.shape.corner.medium = rounded_corners 12dp
- **md.comp.rich-tooltip.container.surface-tint-layer.color** (Rich tooltip container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.rich-tooltip.subhead.color** (Rich tooltip subhead color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.rich-tooltip.subhead.font** (Rich tooltip subhead font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.title-small.font -> md.ref.typeface.plain = Roboto Flex
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.title-small.font -> md.ref.typeface.plain = Roboto
- **md.comp.rich-tooltip.subhead.line-height** (Rich tooltip subhead line height)
  - -> md.sys.typescale.title-small.line-height = 20pt
- **md.comp.rich-tooltip.subhead.size** (Rich tooltip subhead size)
  - -> md.sys.typescale.title-small.size = 14pt
- **md.comp.rich-tooltip.subhead.tracking** (Rich tooltip subhead tracking)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.title-small.tracking = 0pt
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.title-small.tracking = 0.1pt
- **md.comp.rich-tooltip.subhead.type** (Type style)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 500; fontSize 14pt; lineHeight 20pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: Roboto; weight 700; fontSize 14pt; lineHeight 20pt; fontTracking 0.1pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 500; fontSize 14pt; lineHeight 20pt; fontTracking 0.1pt
- **md.comp.rich-tooltip.subhead.weight** (Rich tooltip subhead weight)
  - [Font=iOS bold + Platform=Compose; Font=iOS bold + Platform=Web; Font=iOS bold + Platform=Android]: -> md.sys.typescale.title-small.weight -> md.ref.typeface.weight-bold = weight 700
  - [Font=Variable + Platform=Compose; Font=Static + Platform=Compose; Font=Variable + Platform=Web; Font=Static + Platform=Web; Font=Variable + Platform=Android; Font=Static + Platform=Android]: -> md.sys.typescale.title-small.weight -> md.ref.typeface.weight-medium = weight 500
- **md.comp.rich-tooltip.supporting-text.color** (Rich tooltip supporting text color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.rich-tooltip.supporting-text.font** (Rich tooltip supporting text font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-medium.font -> md.ref.typeface.plain = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-medium.font -> md.ref.typeface.plain = Roboto
- **md.comp.rich-tooltip.supporting-text.line-height** (Rich tooltip supporting text line height)
  - -> md.sys.typescale.body-medium.line-height = 20pt
- **md.comp.rich-tooltip.supporting-text.size** (Rich tooltip supporting text size)
  - -> md.sys.typescale.body-medium.size = 14pt
- **md.comp.rich-tooltip.supporting-text.tracking** (Rich tooltip supporting text tracking)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.body-medium.tracking = 0pt
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.body-medium.tracking = 0.25pt
- **md.comp.rich-tooltip.supporting-text.type** (Type style)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 14pt; lineHeight 20pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 14pt; lineHeight 20pt; fontTracking 0.25pt
- **md.comp.rich-tooltip.supporting-text.weight** (Rich tooltip supporting text weight)
  - -> md.sys.typescale.body-medium.weight -> md.ref.typeface.weight-regular = weight 400 [Platform=Compose; Platform=Web; Platform=Android]

## md.ref.palette

- **md.ref.palette.neutral-variant0** (Neutral Variant 0)
- **md.ref.palette.neutral-variant100** (Neutral Variant 100)
- **md.ref.palette.neutral-variant20** (Neutral Variant 20)
- **md.ref.palette.neutral-variant30** (Neutral Variant 30)
- **md.ref.palette.neutral-variant80** (Neutral Variant 80)
- **md.ref.palette.neutral-variant90** (Neutral Variant 90)
- **md.ref.palette.neutral0** (Neutral 0)
- **md.ref.palette.neutral10** (Neutral 10)
- **md.ref.palette.neutral100** (Neutral 100)
- **md.ref.palette.neutral12** (Neutral 12)
- **md.ref.palette.neutral20** (Neutral 20)
- **md.ref.palette.neutral90** (Neutral 90)
- **md.ref.palette.neutral94** (Neutral 94)
- **md.ref.palette.neutral95** (Neutral 95)
- **md.ref.palette.primary20** (Primary 20)
- **md.ref.palette.primary30** (Primary 30)
- **md.ref.palette.primary40** (Primary 40)
- **md.ref.palette.primary80** (Primary 80)
- **md.ref.palette.primary90** (Primary 90)
- **md.ref.palette.primary95** (Primary 95)

## md.ref.typeface

- **md.ref.typeface.brand** (Brand typeface)
- **md.ref.typeface.plain** (Plain typeface)
- **md.ref.typeface.weight-bold** (Bold weight)
- **md.ref.typeface.weight-medium** (Medium weight)
- **md.ref.typeface.weight-regular** (Regular weight)

## md.sys.color

- **md.sys.color.inverse-on-surface** (Inverse on surface) — Used for text and icons shown against the inverse surface color
- **md.sys.color.inverse-surface** (Inverse surface) — Displays opposite color of the surrounding UI
- **md.sys.color.on-surface-variant** (On surface variant) — For text and icons to indicate active or inactive component state
- **md.sys.color.primary** (Primary) — Main color used across screens and components
- **md.sys.color.shadow** (Shadow) — For shadows applied to elevated components
- **md.sys.color.surface-container** (Surface Container)
- **md.sys.color.surface-tint** (Surface tint)

## md.sys.elevation

- **md.sys.elevation.level2** (+2)

## md.sys.shape

- **md.sys.shape.corner.extra-small** (Extra small rounding)
- **md.sys.shape.corner.medium** (Medium rounding)

## md.sys.state

- **md.sys.state.focus.state-layer-opacity** (Focus state layer opacity)
- **md.sys.state.hover.state-layer-opacity** (Hover state layer opacity)
- **md.sys.state.pressed.state-layer-opacity** (Pressed state layer opacity)

## md.sys.typescale

- **md.sys.typescale.body-medium.font** (Body Medium font name)
- **md.sys.typescale.body-medium.line-height** (Body Medium line height)
- **md.sys.typescale.body-medium.size** (Body Medium font size)
- **md.sys.typescale.body-medium.tracking** (Body Medium font tracking)
- **md.sys.typescale.body-medium.weight** (Body Medium font weight)
- **md.sys.typescale.body-small.font** (Body Small font name)
- **md.sys.typescale.body-small.line-height** (Body Small line height)
- **md.sys.typescale.body-small.size** (Body Small font size)
- **md.sys.typescale.body-small.tracking** (Body Small font tracking)
- **md.sys.typescale.body-small.weight** (Body Small font weight)
- **md.sys.typescale.label-large.font** (Label Large font name)
- **md.sys.typescale.label-large.line-height** (Label Large line height)
- **md.sys.typescale.label-large.size** (Label Large font size)
- **md.sys.typescale.label-large.tracking** (Label Large font tracking)
- **md.sys.typescale.label-large.weight** (Label Large font weight)
- **md.sys.typescale.title-small.font** (Title Small font name)
- **md.sys.typescale.title-small.line-height** (Title Small line height)
- **md.sys.typescale.title-small.size** (Title Small font size)
- **md.sys.typescale.title-small.tracking** (Title Small font tracking)
- **md.sys.typescale.title-small.weight** (Title Small font weight)

