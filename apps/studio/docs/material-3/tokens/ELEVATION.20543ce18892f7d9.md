# Tokens: Elevation (ELEVATION.20543ce18892f7d9)

Source: <https://m3.material.io/_dsm/data/dsdb-m3/2026-09-23_06-10-05/ELEVATION.20543ce18892f7d9.json>, design system 'Google Material 3' revision 7989 (2026-05-27T22:44:15.009106Z).
Used on: <https://m3.material.io/styles/elevation>

Each token lists its value per context. `->` shows the reference chain (component token -> system token -> reference token); the resolved value is what the baseline scheme produces in that context. Contexts with identical chain and value are merged.

## md.ref.palette

- **md.ref.palette.primary20** (Primary 20)
- **md.ref.palette.primary30** (Primary 30)
- **md.ref.palette.primary40** (Primary 40)
- **md.ref.palette.primary80** (Primary 80)
- **md.ref.palette.primary90** (Primary 90)
- **md.ref.palette.primary95** (Primary 95)

## md.sys.color

- **md.sys.color.primary** (Primary) — Main color used across screens and components

## md.sys.elevation — Elevation

Elevation level tokens

- **md.sys.elevation.level0** (0)
  - 0dp
- **md.sys.elevation.level1** (+1)
  - 1dp
- **md.sys.elevation.level2** (+2)
  - 3dp
- **md.sys.elevation.level3** (+3)
  - 6dp
- **md.sys.elevation.level4** (+4)
  - 8dp
- **md.sys.elevation.level5** (+5)
  - 12dp
- **md.sys.elevation.surface-tint-color** (Surface tint color)
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary95 = #f6edff
  - [Audience=3P + Contrast=High contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=High contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary20 = #381e72
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Dark; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary90 = #eaddff
  - [Audience=3P + Contrast=Medium contrast + Platform=Compose + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Web + Theme=Light; Audience=3P + Contrast=Medium contrast + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary30 = #4f378b
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Dark; Audience=3P + Contrast=Default + Platform=Web + Theme=Dark; Audience=3P + Contrast=Default + Platform=Android + Theme=Dark]: -> md.sys.color.primary -> md.ref.palette.primary80 = #d0bcff
  - [Audience=3P + Contrast=Default + Platform=Compose + Theme=Light; Audience=3P + Contrast=Default + Platform=Web + Theme=Light; Audience=3P + Contrast=Default + Platform=Android + Theme=Light]: -> md.sys.color.primary -> md.ref.palette.primary40 = #6750a4

