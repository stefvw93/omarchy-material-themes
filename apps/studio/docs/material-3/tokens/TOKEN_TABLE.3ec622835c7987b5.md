# Tokens: App bars (TOKEN_TABLE.3ec622835c7987b5)

Source: <https://m3.material.io/_dsm/data/dsdb-m3/2026-09-23_06-10-05/TOKEN_TABLE.3ec622835c7987b5.json>, design system 'Google Material 3' revision 7989 (2026-05-27T22:44:15.009106Z).
Used on: <https://m3.material.io/components/app-bars>

Each token lists its value per context. `->` shows the reference chain (component token -> system token -> reference token); the resolved value is what the baseline scheme produces in that context. Contexts with identical chain and value are merged.

## md.comp.app-bar — App bar - Common

Common tokens for all app bars.

- **md.comp.app-bar.avatar.size** (App bar avatar size)
  - 32dp
- **md.comp.app-bar.container.color** (App bar container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.app-bar.container.elevation** (App bar container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.app-bar.container.shape** (App bar container shape)
  - -> md.sys.shape.corner.none = rounded_corners 0dp
- **md.comp.app-bar.icon-button-space** (App bar icon spacing)
  - -> md.sys.measurement.space0 = 0dp
- **md.comp.app-bar.icon.size** (App bar icon size)
  - 24dp
- **md.comp.app-bar.leading-icon.color** (App bar leading icon )
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.app-bar.leading-space** (App bar left padding)
  - -> md.sys.measurement.space50 = 4dp
- **md.comp.app-bar.on-scroll.container.color** (App bar container color on scroll)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container -> md.ref.palette.neutral12 = #211f26
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container -> md.ref.palette.neutral94 = #f3edf7
- **md.comp.app-bar.on-scroll.container.elevation** (App bar container elevation on scroll)
  - -> md.sys.elevation.level2 = 3dp
- **md.comp.app-bar.search.container.color** (Search container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container -> md.ref.palette.neutral12 = #211f26
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container -> md.ref.palette.neutral94 = #f3edf7
- **md.comp.app-bar.search.label.color** (Search label color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.app-bar.search.leading-space** (Search left padding)
  - -> md.sys.measurement.space100 = 8dp
- **md.comp.app-bar.search.on-scroll.container.color** (Search container color on scroll)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container-highest -> md.ref.palette.neutral22 = #36343b
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container-highest -> md.ref.palette.neutral90 = #e6e0e9
- **md.comp.app-bar.search.trailing-space** (Search right padding)
  - -> md.sys.measurement.space100 = 8dp
- **md.comp.app-bar.subtitle.color** (App bar subtitle text)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.app-bar.title.color** (App bar title text)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.app-bar.trailing-icon.color** (App bar trailing icon )
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.app-bar.trailing-space** (App bar right padding)
  - -> md.sys.measurement.space50 = 4dp

## md.comp.app-bar.large — App bar - Size - Large (baseline)

For the baseline large app bar. In expressive, consider using large flexible instead `md.comp.app-bar.large-flexible`.


- **md.comp.app-bar.large.container.height** (App bar large container height)
  - 152dp
- **md.comp.app-bar.large.icon.size** (App bar large icon button size)
  - 24dp
- **md.comp.app-bar.large.subtitle.font** (App bar large subtitle font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.title-medium = Roboto Flex; weight 500; fontSize 16pt; lineHeight 24pt; fontTracking 0pt; axes wdth=100 wght=500 slnt=0 opsz=16 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.title-medium = Roboto; weight 700; fontSize 16pt; lineHeight 24pt; fontTracking 0.15pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.title-medium = Roboto; weight 500; fontSize 16pt; lineHeight 24pt; fontTracking 0.15pt
- **md.comp.app-bar.large.title.font** (App bar large title font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.headline-medium = Roboto Flex; weight 400; fontSize 28pt; lineHeight 36pt; fontTracking 0pt; axes wdth=100 wght=400 slnt=0 opsz=28 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.headline-medium = Roboto; weight 500; fontSize 28pt; lineHeight 36pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.headline-medium = Roboto; weight 400; fontSize 28pt; lineHeight 36pt; fontTracking 0pt

## md.comp.app-bar.large-flexible — App bar - Size - Large Flexible

For the large flexible app bar.

- **md.comp.app-bar.large-flexible.container.height** (App bar large flexible container height)
  - 120dp
- **md.comp.app-bar.large-flexible.subtitle.font** (App bar large Subtitle font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.title-medium = Roboto Flex; weight 500; fontSize 16pt; lineHeight 24pt; fontTracking 0pt; axes wdth=100 wght=500 slnt=0 opsz=16 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.title-medium = Roboto; weight 700; fontSize 16pt; lineHeight 24pt; fontTracking 0.15pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.title-medium = Roboto; weight 500; fontSize 16pt; lineHeight 24pt; fontTracking 0.15pt
- **md.comp.app-bar.large-flexible.title.font** (App bar large Title font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.display-small = Roboto Flex; weight 400; fontSize 36pt; lineHeight 44pt; fontTracking 0pt; axes wdth=100 wght=400 slnt=0 opsz=36 ROND=0 GRAD=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.display-small = Roboto; weight 500; fontSize 36pt; lineHeight 44pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.display-small = Roboto; weight 400; fontSize 36pt; lineHeight 44pt; fontTracking 0pt
- **md.comp.app-bar.large-flexible.with-subtitle.container.height** (App bar large flexible container height with subtitle)
  - 152dp

## md.comp.app-bar.medium — App bar - Size - Medium (baseline)

For the baseline medium app bar. In expressive, consider using medium flexible instead `md.comp.app-bar.medium-flexible`.

- **md.comp.app-bar.medium.container.height** (App bar medium container height)
  - 112dp
- **md.comp.app-bar.medium.icon.size** (App bar medium icon button size)
  - 24dp
- **md.comp.app-bar.medium.subtitle.font** (App bar medium subtitle font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.label-large = Roboto Flex; weight 500; fontSize 14pt; lineHeight 20pt; fontTracking 0pt; axes wdth=100 wght=500 slnt=0 opsz=14 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.label-large = Roboto; weight 700; fontSize 14pt; lineHeight 20pt; fontTracking 0.1pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.label-large = Roboto; weight 500; fontSize 14pt; lineHeight 20pt; fontTracking 0.1pt
- **md.comp.app-bar.medium.title.font** (App bar medium title font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.headline-small = Roboto Flex; weight 400; fontSize 24pt; lineHeight 32pt; fontTracking 0pt; axes CRSV=0 wdth=100 wght=400 slnt=0 opsz=24 GRAD=0 ROND=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.headline-small = Roboto; weight 500; fontSize 24pt; lineHeight 32pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.headline-small = Roboto; weight 400; fontSize 24pt; lineHeight 32pt; fontTracking 0pt

## md.comp.app-bar.medium-flexible — App bar - Size - Medium Flexible

For the medium flexible app bar.

- **md.comp.app-bar.medium-flexible.container.height** (App bar medium flexible container height)
  - 112dp
- **md.comp.app-bar.medium-flexible.subtitle.font** (App bar medium Subtitle font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.label-large = Roboto Flex; weight 500; fontSize 14pt; lineHeight 20pt; fontTracking 0pt; axes wdth=100 wght=500 slnt=0 opsz=14 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.label-large = Roboto; weight 700; fontSize 14pt; lineHeight 20pt; fontTracking 0.1pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.label-large = Roboto; weight 500; fontSize 14pt; lineHeight 20pt; fontTracking 0.1pt
- **md.comp.app-bar.medium-flexible.title.font** (App bar medium Title font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.headline-medium = Roboto Flex; weight 400; fontSize 28pt; lineHeight 36pt; fontTracking 0pt; axes wdth=100 wght=400 slnt=0 opsz=28 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.headline-medium = Roboto; weight 500; fontSize 28pt; lineHeight 36pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.headline-medium = Roboto; weight 400; fontSize 28pt; lineHeight 36pt; fontTracking 0pt
- **md.comp.app-bar.medium-flexible.with-subtitle.container.height** (App bar medium flexible container height with subtitle)
  - 136dp

## md.comp.app-bar.small — App bar - Size - Small

For the expressive small app bar and search app bar.

- **md.comp.app-bar.small.container.height** (App bar small container height)
  - 64dp
- **md.comp.app-bar.small.icon.size** (App bar small icon button size)
  - 24dp
- **md.comp.app-bar.small.search.container.height** (Search container height)
  - 56dp
- **md.comp.app-bar.small.search.container.shape** (Search container shape)
  - -> md.sys.shape.corner.full = circular
- **md.comp.app-bar.small.search.label-text.font** (Search title font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.body-large = Roboto Flex; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0pt; axes wdth=100 wght=400 slnt=0 opsz=16 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.body-large = Roboto; weight 400; fontSize 16pt; lineHeight 24pt; fontTracking 0.5pt
- **md.comp.app-bar.small.subtitle.font** (App bar small subtitle font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.label-medium = Roboto Flex; weight 500; fontSize 12pt; lineHeight 16pt; fontTracking 0pt; axes wdth=100 wght=500 slnt=0 opsz=12 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.label-medium = Roboto; weight 500; fontSize 12pt; lineHeight 16pt; fontTracking 0.5pt
- **md.comp.app-bar.small.title.font** (App bar small title font)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: -> md.sys.typescale.title-large = Roboto Flex; weight 400; fontSize 22pt; lineHeight 28pt; fontTracking 0pt; axes wdth=100 wght=400 slnt=0 opsz=22 GRAD=0 ROND=0 CRSV=0 HEXP=0 FILL=0
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: -> md.sys.typescale.title-large = Roboto; weight 500; fontSize 22pt; lineHeight 28pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: -> md.sys.typescale.title-large = Roboto; weight 400; fontSize 22pt; lineHeight 28pt; fontTracking 0pt

## md.comp.top-app-bar.large — [Deprecated] Top app bar -  Large

This token set is deprecated. Use `md.comp.app-bar` and `md.comp.app-bar.large` tokens instead. Original tokens for the large top app bar.

- **md.comp.top-app-bar.large.container.color** (Top app bar (large) container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.top-app-bar.large.container.elevation** (Top app bar (large) container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.top-app-bar.large.container.height** (Top app bar (large) container height)
  - 152dp
- **md.comp.top-app-bar.large.container.shape** (Top app bar (large) container shape)
  - -> md.sys.shape.corner.none = rounded_corners 0dp
- **md.comp.top-app-bar.large.container.surface-tint-layer.color** (Top app bar (large) container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.top-app-bar.large.headline.color** (Top app bar (large) headline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.top-app-bar.large.headline.font** (Top app bar (large) headline font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.headline-medium.font -> md.ref.typeface.brand = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.headline-medium.font -> md.ref.typeface.brand = Roboto
- **md.comp.top-app-bar.large.headline.line-height** (Top app bar (large) headline height)
  - -> md.sys.typescale.headline-medium.line-height = 36pt
- **md.comp.top-app-bar.large.headline.size** (Top app bar (large) headline size)
  - -> md.sys.typescale.headline-medium.size = 28pt
- **md.comp.top-app-bar.large.headline.tracking** (Top app bar (large) headline tracking)
  - -> md.sys.typescale.headline-medium.tracking = 0pt
- **md.comp.top-app-bar.large.headline.type** (Type style)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 28pt; lineHeight 36pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: Roboto; weight 500; fontSize 28pt; lineHeight 36pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 28pt; lineHeight 36pt; fontTracking 0pt
- **md.comp.top-app-bar.large.headline.weight** (Top app bar (large) headline weight)
  - [Font=iOS bold + Platform=Compose; Font=iOS bold + Platform=Web; Font=iOS bold + Platform=Android]: -> md.sys.typescale.headline-medium.weight -> md.ref.typeface.weight-medium = weight 500
  - [Font=Variable + Platform=Compose; Font=Static + Platform=Compose; Font=Variable + Platform=Web; Font=Static + Platform=Web; Font=Variable + Platform=Android; Font=Static + Platform=Android]: -> md.sys.typescale.headline-medium.weight -> md.ref.typeface.weight-regular = weight 400
- **md.comp.top-app-bar.large.leading-icon.color** (Top app bar (large) leading icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.top-app-bar.large.leading-icon.size** (Top app bar (large) leading icon size)
  - 24dp
- **md.comp.top-app-bar.large.trailing-icon.color** (Top app bar (large) trailing icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.top-app-bar.large.trailing-icon.size** (Top app bar (large) trailing icon size)
  - 24dp

## md.comp.top-app-bar.medium — [Deprecated] Top app bar - Medium

This token set is deprecated. Use `md.comp.app-bar` and `md.comp.app-bar.medium` tokens instead. Original tokens for the medium top app bar.

- **md.comp.top-app-bar.medium.container.color** (Top app bar (medium) container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.top-app-bar.medium.container.elevation** (Top app bar (medium) container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.top-app-bar.medium.container.height** (Top app bar (medium) container height)
  - 112dp
- **md.comp.top-app-bar.medium.container.shape** (Top app bar (medium) container shape)
  - -> md.sys.shape.corner.none = rounded_corners 0dp
- **md.comp.top-app-bar.medium.container.surface-tint-layer.color** (Top app bar (medium) container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.top-app-bar.medium.headline.color** (Top app bar (medium) headline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.top-app-bar.medium.headline.font** (Top app bar (medium) headline font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.headline-small.font -> md.ref.typeface.brand = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.headline-small.font -> md.ref.typeface.brand = Roboto
- **md.comp.top-app-bar.medium.headline.line-height** (Top app bar (medium) headline height)
  - -> md.sys.typescale.headline-small.line-height = 32pt
- **md.comp.top-app-bar.medium.headline.size** (Top app bar (medium) headline size)
  - -> md.sys.typescale.headline-small.size = 24pt
- **md.comp.top-app-bar.medium.headline.tracking** (Top app bar (medium) headline tracking)
  - -> md.sys.typescale.headline-small.tracking = 0pt
- **md.comp.top-app-bar.medium.headline.type** (Type style)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 24pt; lineHeight 32pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: Roboto; weight 500; fontSize 24pt; lineHeight 32pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 24pt; lineHeight 32pt; fontTracking 0pt
- **md.comp.top-app-bar.medium.headline.weight** (Top app bar (medium) headline weight)
  - [Font=iOS bold + Platform=Compose; Font=iOS bold + Platform=Web; Font=iOS bold + Platform=Android]: -> md.sys.typescale.headline-small.weight -> md.ref.typeface.weight-medium = weight 500
  - [Font=Variable + Platform=Compose; Font=Static + Platform=Compose; Font=Variable + Platform=Web; Font=Static + Platform=Web; Font=Variable + Platform=Android; Font=Static + Platform=Android]: -> md.sys.typescale.headline-small.weight -> md.ref.typeface.weight-regular = weight 400
- **md.comp.top-app-bar.medium.leading-icon.color** (Top app bar (medium) leading icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.top-app-bar.medium.leading-icon.size** (Top app bar (medium) leading icon size)
  - 24dp
- **md.comp.top-app-bar.medium.trailing-icon.color** (Top app bar (medium) trailing icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.top-app-bar.medium.trailing-icon.size** (Top app bar (medium) trailing icon size)
  - 24dp

## md.comp.top-app-bar.small — [Deprecated] Top app bar - Small

This token set is deprecated. Use `md.comp.app-bar` and `md.comp.app-bar.small` tokens instead.

Original tokens for the small top app bar.

- **md.comp.top-app-bar.small.container.color** (Top app bar (small) container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.top-app-bar.small.container.elevation** (Top app bar (small) container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.top-app-bar.small.container.height** (Top app bar (small) container height)
  - 64dp
- **md.comp.top-app-bar.small.container.shape** (Top app bar (small) container shape)
  - -> md.sys.shape.corner.none = rounded_corners 0dp
- **md.comp.top-app-bar.small.container.surface-tint-layer.color** (Top app bar (small) container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.top-app-bar.small.headline.color** (Top app bar (small) headline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.top-app-bar.small.headline.font** (Top app bar (small) headline font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.title-large.font -> md.ref.typeface.brand = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.title-large.font -> md.ref.typeface.brand = Roboto
- **md.comp.top-app-bar.small.headline.line-height** (Top app bar (small) headline height)
  - -> md.sys.typescale.title-large.line-height = 28pt
- **md.comp.top-app-bar.small.headline.size** (Top app bar (small) headline size)
  - -> md.sys.typescale.title-large.size = 22pt
- **md.comp.top-app-bar.small.headline.tracking** (Top app bar (small) headline tracking)
  - -> md.sys.typescale.title-large.tracking = 0pt
- **md.comp.top-app-bar.small.headline.type** (Type style)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 22pt; lineHeight 28pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: Roboto; weight 500; fontSize 22pt; lineHeight 28pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 22pt; lineHeight 28pt; fontTracking 0pt
- **md.comp.top-app-bar.small.headline.weight** (Top app bar (small) headline weight)
  - [Font=iOS bold + Platform=Compose; Font=iOS bold + Platform=Web; Font=iOS bold + Platform=Android]: -> md.sys.typescale.title-large.weight -> md.ref.typeface.weight-medium = weight 500
  - [Font=Variable + Platform=Compose; Font=Static + Platform=Compose; Font=Variable + Platform=Web; Font=Static + Platform=Web; Font=Variable + Platform=Android; Font=Static + Platform=Android]: -> md.sys.typescale.title-large.weight -> md.ref.typeface.weight-regular = weight 400
- **md.comp.top-app-bar.small.leading-icon.color** (Top app bar (small) leading icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.top-app-bar.small.leading-icon.size** (Top app bar (small) leading icon size)
  - 24dp
- **md.comp.top-app-bar.small.on-scroll.container.color** (Top app bar (small) on-scroll container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container -> md.ref.palette.neutral12 = #211f26
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container -> md.ref.palette.neutral94 = #f3edf7
- **md.comp.top-app-bar.small.on-scroll.container.elevation** (Top app bar (small) on scroll container elevation)
  - -> md.sys.elevation.level2 = 3dp
- **md.comp.top-app-bar.small.on-scroll.container.shadow-color** (Top app bar (small) on scroll container shadow color)
  - -> md.sys.color.shadow -> md.ref.palette.neutral0 = #000000 [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark; Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]
- **md.comp.top-app-bar.small.trailing-icon.color** (Top app bar (small) trailing icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.top-app-bar.small.trailing-icon.size** (Top app bar (small) trailing icon size)
  - 24dp

## md.comp.top-app-bar.small.centered — [Deprecated] Top app bar - Small, Center-aligned

This token set is deprecated. Use `md.comp.app-bar` and `md.comp.app-bar.small` tokens instead. 

Original component tokens for the center-aligned top app bar. 

- **md.comp.top-app-bar.small.centered.avatar.shape** (Top app bar (small) on scroll avatar shape)
  - -> md.sys.shape.corner.full = circular
- **md.comp.top-app-bar.small.centered.avatar.size** (Top app bar (small) on scroll avatar size)
  - 30dp
- **md.comp.top-app-bar.small.centered.container.color** (Top app bar (small centered) container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface -> md.ref.palette.neutral6 = #141218
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface -> md.ref.palette.neutral98 = #fef7ff
- **md.comp.top-app-bar.small.centered.container.elevation** (Top app bar (small centered) container elevation)
  - -> md.sys.elevation.level0 = 0dp
- **md.comp.top-app-bar.small.centered.container.height** (Top app bar (small centered) container height)
  - 64dp
- **md.comp.top-app-bar.small.centered.container.shape** (Top app bar (small centered) container shape)
  - -> md.sys.shape.corner.none = rounded_corners 0dp
- **md.comp.top-app-bar.small.centered.container.surface-tint-layer.color** (Top app bar (small centered) container surface tint layer color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.surface-tint -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4
- **md.comp.top-app-bar.small.centered.headline.color** (Top app bar (small centered) headline color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.top-app-bar.small.centered.headline.font** (Top app bar (small centered) headline font)
  - [Audience=3P + Font=Variable]: -> md.sys.typescale.title-large.font -> md.ref.typeface.brand = Roboto Flex
  - [Audience=3P + Font=iOS bold; Audience=3P + Font=Static]: -> md.sys.typescale.title-large.font -> md.ref.typeface.brand = Roboto
- **md.comp.top-app-bar.small.centered.headline.line-height** (Top app bar (small centered) headline height)
  - -> md.sys.typescale.title-large.line-height = 28pt
- **md.comp.top-app-bar.small.centered.headline.size** (Top app bar (small centered) headline size)
  - -> md.sys.typescale.title-large.size = 22pt
- **md.comp.top-app-bar.small.centered.headline.tracking** (Top app bar (small centered) headline tracking)
  - -> md.sys.typescale.title-large.tracking = 0pt
- **md.comp.top-app-bar.small.centered.headline.type** (Type style)
  - [Audience=3P + Font=Variable + Platform=Compose; Audience=3P + Font=Variable + Platform=Web; Audience=3P + Font=Variable + Platform=Android]: Roboto Flex; weight 400; fontSize 22pt; lineHeight 28pt; fontTracking 0pt
  - [Audience=3P + Font=iOS bold + Platform=Compose; Audience=3P + Font=iOS bold + Platform=Web; Audience=3P + Font=iOS bold + Platform=Android]: Roboto; weight 500; fontSize 22pt; lineHeight 28pt; fontTracking 0pt
  - [Audience=3P + Font=Static + Platform=Compose; Audience=3P + Font=Static + Platform=Web; Audience=3P + Font=Static + Platform=Android]: Roboto; weight 400; fontSize 22pt; lineHeight 28pt; fontTracking 0pt
- **md.comp.top-app-bar.small.centered.headline.weight** (Top app bar (small centered) headline weight)
  - [Font=iOS bold + Platform=Compose; Font=iOS bold + Platform=Web; Font=iOS bold + Platform=Android]: -> md.sys.typescale.title-large.weight -> md.ref.typeface.weight-medium = weight 500
  - [Font=Variable + Platform=Compose; Font=Static + Platform=Compose; Font=Variable + Platform=Web; Font=Static + Platform=Web; Font=Variable + Platform=Android; Font=Static + Platform=Android]: -> md.sys.typescale.title-large.weight -> md.ref.typeface.weight-regular = weight 400
- **md.comp.top-app-bar.small.centered.leading-icon.color** (Top app bar (small centered) leading icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral100 = #ffffff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral0 = #000000
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface -> md.ref.palette.neutral90 = #e6e0e9
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface -> md.ref.palette.neutral10 = #1d1b20
- **md.comp.top-app-bar.small.centered.leading-icon.size** (Top app bar (small centered) leading icon size)
  - 24dp
- **md.comp.top-app-bar.small.centered.on-scroll.container.color** (Top app bar (small centered) on-scroll container color)
  - [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark]: -> md.sys.color.surface-container -> md.ref.palette.neutral12 = #211f26
  - [Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]: -> md.sys.color.surface-container -> md.ref.palette.neutral94 = #f3edf7
- **md.comp.top-app-bar.small.centered.on-scroll.container.elevation** (Top app bar (small) on scroll container elevation)
  - -> md.sys.elevation.level2 = 3dp
- **md.comp.top-app-bar.small.centered.on-scroll.container.shadow-color** (Top app bar (small) on scroll container shadow color)
  - -> md.sys.color.shadow -> md.ref.palette.neutral0 = #000000 [Audience=3P + Platform=Compose + Theme=Dark; Audience=3P + Platform=Web + Theme=Dark; Audience=3P + Platform=Android + Theme=Dark; Audience=3P + Platform=Compose + Theme=Light; Audience=3P + Platform=Web + Theme=Light; Audience=3P + Platform=Android + Theme=Light]
- **md.comp.top-app-bar.small.centered.trailing-icon.color** (Top app bar (small centered) trailing icon color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant100 = #ffffff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant90 = #e7e0ec
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant0 = #000000
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant20 = #322f37
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant80 = #cac4d0
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.on-surface-variant -> md.ref.palette.neutral-variant30 = #49454f
- **md.comp.top-app-bar.small.centered.trailing-icon.size** (Top app bar (small centered) trailing icon size)
  - 24dp

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
- **md.ref.palette.neutral22** (Neutral 22)
- **md.ref.palette.neutral6** (Neutral 6)
- **md.ref.palette.neutral90** (Neutral 90)
- **md.ref.palette.neutral94** (Neutral 94)
- **md.ref.palette.neutral98** (Neutral 98)
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

- **md.sys.color.on-surface** (On surface) — Text and icons shown against the surface color
- **md.sys.color.on-surface-variant** (On surface variant) — For text and icons to indicate active or inactive component state
- **md.sys.color.primary** (Primary) — Main color used across screens and components
- **md.sys.color.shadow** (Shadow) — For shadows applied to elevated components
- **md.sys.color.surface** (Surface) — Surface color for components like cards, sheets, and menus
- **md.sys.color.surface-container** (Surface Container)
- **md.sys.color.surface-container-highest** (Surface Container Highest)
- **md.sys.color.surface-tint** (Surface tint)

## md.sys.elevation

- **md.sys.elevation.level0** (0)
- **md.sys.elevation.level2** (+2)

## md.sys.measurement

- **md.sys.measurement.space0** (Space 0) — 0 x base measurement
- **md.sys.measurement.space100** (Space 100) — Base measurement
- **md.sys.measurement.space50** (Space 50) — .5 x base measurement

## md.sys.shape

- **md.sys.shape.corner.full** (Fully rounded) — Use for: Badge, Buttons, Icon buttons, Sliders, Switches, Search bar
- **md.sys.shape.corner.none** (No rounding)

## md.sys.typescale

- **md.sys.typescale.body-large** (Body Large)
- **md.sys.typescale.body-large.crsv** (Body Large crsv)
- **md.sys.typescale.body-large.fill** (Body Large fill)
- **md.sys.typescale.body-large.font** (Body Large font name)
- **md.sys.typescale.body-large.grad** (Body Large grad)
- **md.sys.typescale.body-large.hexp** (Body Large hexp)
- **md.sys.typescale.body-large.line-height** (Body Large line height)
- **md.sys.typescale.body-large.opsz** (Body Large opsz)
- **md.sys.typescale.body-large.rond** (Body Large rond)
- **md.sys.typescale.body-large.size** (Body Large font size)
- **md.sys.typescale.body-large.slnt** (Body Large slnt)
- **md.sys.typescale.body-large.tracking** (Body Large font tracking)
- **md.sys.typescale.body-large.wdth** (Body Large wdth)
- **md.sys.typescale.body-large.weight** (Body Large font weight)
- **md.sys.typescale.body-large.wght** (Body Large wght)
- **md.sys.typescale.display-small** (Display Small)
- **md.sys.typescale.display-small.crsv** (Display Small crsv)
- **md.sys.typescale.display-small.fill** (Display Small fill)
- **md.sys.typescale.display-small.font** (Display Small font name)
- **md.sys.typescale.display-small.grad** (Display Small grad)
- **md.sys.typescale.display-small.hexp** (Display Small hexp)
- **md.sys.typescale.display-small.line-height** (Display Small line height)
- **md.sys.typescale.display-small.opsz** (Display Small opsz)
- **md.sys.typescale.display-small.rond** (Display Small rond)
- **md.sys.typescale.display-small.size** (Display Small font size)
- **md.sys.typescale.display-small.slnt** (Display Small slnt)
- **md.sys.typescale.display-small.tracking** (Display Small font tracking)
- **md.sys.typescale.display-small.wdth** (Display Small wdth)
- **md.sys.typescale.display-small.weight** (Display Small font weight)
- **md.sys.typescale.display-small.wght** (Display Small wght)
- **md.sys.typescale.headline-medium** (Headline Medium)
- **md.sys.typescale.headline-medium.crsv** (Headline Medium crsv)
- **md.sys.typescale.headline-medium.fill** (Headline Medium fill)
- **md.sys.typescale.headline-medium.font** (Headline Medium font name)
- **md.sys.typescale.headline-medium.grad** (Headline Medium grad)
- **md.sys.typescale.headline-medium.hexp** (Headline Medium hexp)
- **md.sys.typescale.headline-medium.line-height** (Headline Medium line height)
- **md.sys.typescale.headline-medium.opsz** (Headline Medium opsz)
- **md.sys.typescale.headline-medium.rond** (Headline Medium rond)
- **md.sys.typescale.headline-medium.size** (Headline Medium font size)
- **md.sys.typescale.headline-medium.slnt** (Headline Medium slnt)
- **md.sys.typescale.headline-medium.tracking** (Headline Medium font tracking)
- **md.sys.typescale.headline-medium.wdth** (Headline Medium wdth)
- **md.sys.typescale.headline-medium.weight** (Headline Medium font weight)
- **md.sys.typescale.headline-medium.wght** (Headline Medium wght)
- **md.sys.typescale.headline-small** (Headline Small)
- **md.sys.typescale.headline-small.crsv** (Headline Small crsv)
- **md.sys.typescale.headline-small.fill** (Headline Small fill)
- **md.sys.typescale.headline-small.font** (Headline Small font name)
- **md.sys.typescale.headline-small.grad** (Headline Small grad)
- **md.sys.typescale.headline-small.hexp** (Headline Small hexp)
- **md.sys.typescale.headline-small.line-height** (Headline Small line height)
- **md.sys.typescale.headline-small.opsz** (Headline Small opsz)
- **md.sys.typescale.headline-small.rond** (Headline Small rond)
- **md.sys.typescale.headline-small.size** (Headline Small font size)
- **md.sys.typescale.headline-small.slnt** (Headline Small slnt)
- **md.sys.typescale.headline-small.tracking** (Headline Small font tracking)
- **md.sys.typescale.headline-small.wdth** (Headline Small wdth)
- **md.sys.typescale.headline-small.weight** (Headline Small font weight)
- **md.sys.typescale.headline-small.wght** (Headline Small wght)
- **md.sys.typescale.label-large** (Label Large)
- **md.sys.typescale.label-large-fill** (Label Large fill)
- **md.sys.typescale.label-large.crsv** (Label Large crsv)
- **md.sys.typescale.label-large.font** (Label Large font name)
- **md.sys.typescale.label-large.grad** (Label Large grad)
- **md.sys.typescale.label-large.hexp** (Label Large hexp)
- **md.sys.typescale.label-large.line-height** (Label Large line height)
- **md.sys.typescale.label-large.opsz** (Label Large opsz)
- **md.sys.typescale.label-large.rond** (Label Large rond)
- **md.sys.typescale.label-large.size** (Label Large font size)
- **md.sys.typescale.label-large.slnt** (Label Large slnt)
- **md.sys.typescale.label-large.tracking** (Label Large font tracking)
- **md.sys.typescale.label-large.wdth** (Label Large wdth)
- **md.sys.typescale.label-large.weight** (Label Large font weight)
- **md.sys.typescale.label-large.wght** (Label Large wght)
- **md.sys.typescale.label-medium** (Label Medium)
- **md.sys.typescale.label-medium.crsv** (Label Medium crsv)
- **md.sys.typescale.label-medium.fill** (Label Medium fill)
- **md.sys.typescale.label-medium.font** (Label Medium font name)
- **md.sys.typescale.label-medium.grad** (Label Medium grad)
- **md.sys.typescale.label-medium.hexp** (Label Medium hexp)
- **md.sys.typescale.label-medium.line-height** (Label Medium line height)
- **md.sys.typescale.label-medium.opsz** (Label Medium opsz)
- **md.sys.typescale.label-medium.rond** (Label Medium rond)
- **md.sys.typescale.label-medium.size** (Label Medium font size)
- **md.sys.typescale.label-medium.slnt** (Label Medium  slnt)
- **md.sys.typescale.label-medium.tracking** (Label Medium font tracking)
- **md.sys.typescale.label-medium.wdth** (Label Medium wdth)
- **md.sys.typescale.label-medium.weight** (Label Medium font weight)
- **md.sys.typescale.label-medium.wght** (Label Medium wght)
- **md.sys.typescale.title-large** (Title Large)
- **md.sys.typescale.title-large.crsv** (Title Large crsv)
- **md.sys.typescale.title-large.fill** (Title Large fill)
- **md.sys.typescale.title-large.font** (Title Large font name)
- **md.sys.typescale.title-large.grad** (Title Large grad)
- **md.sys.typescale.title-large.hexp** (Title Large hexp)
- **md.sys.typescale.title-large.line-height** (Title Large line height)
- **md.sys.typescale.title-large.opsz** (Title Large opsz)
- **md.sys.typescale.title-large.rond** (Title Large rond)
- **md.sys.typescale.title-large.size** (Title Large font size)
- **md.sys.typescale.title-large.slnt** (Title Large slnt)
- **md.sys.typescale.title-large.tracking** (Title Large font tracking)
- **md.sys.typescale.title-large.wdth** (Title Large wdth)
- **md.sys.typescale.title-large.weight** (Title Large font weight)
- **md.sys.typescale.title-large.wght** (Title Large wght)
- **md.sys.typescale.title-medium** (Title Medium)
- **md.sys.typescale.title-medium.crsv** (Title Medium crsv)
- **md.sys.typescale.title-medium.fill** (Title Medium fill)
- **md.sys.typescale.title-medium.font** (Title Medium font name)
- **md.sys.typescale.title-medium.grad** (Title Medium grad)
- **md.sys.typescale.title-medium.hexp** (Title Medium hexp)
- **md.sys.typescale.title-medium.line-height** (Title Medium line height)
- **md.sys.typescale.title-medium.opsz** (Title Medium opsz)
- **md.sys.typescale.title-medium.rond** (Title Medium rond)
- **md.sys.typescale.title-medium.size** (Title Medium font size)
- **md.sys.typescale.title-medium.slnt** (Title Medium slnt)
- **md.sys.typescale.title-medium.tracking** (Title Medium font tracking)
- **md.sys.typescale.title-medium.wdth** (Title Medium wdth)
- **md.sys.typescale.title-medium.weight** (Title Medium font weight)
- **md.sys.typescale.title-medium.wght** (Title Medium wght)

