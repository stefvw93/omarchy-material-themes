| Scheme                               | Character                                                                                                                               |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `SchemeTonalSpot`                    | Low–medium chroma, pastel, tertiary hue related to source. Android 12/13 default.                                                       |
| `SchemeNeutral`                      | Near-grayscale, minimal chroma — most "muted/quiet" option.                                                                             |
| `SchemeVibrant`                      | Maxes out chroma at every tone — punchiest, most saturated.                                                                             |
| `SchemeExpressive`                   | Medium chroma but hues deliberately detached from the source color — more playful/varied.                                               |
| `SchemeFidelity`                     | Locks primary container to the literal seed color (adjusted for contrast); tertiary is the seed's complement. Most "true to the photo." |
| `SchemeContent`                      | Same idea as Fidelity (seed color drives primary container) — meant for content-heavy surfaces like photo viewers.                      |
| `SchemeMonochrome`                   | Fully grayscale, no hue at all.                                                                                                         |
| `SchemeRainbow` / `SchemeFruitSalad` | Playful, source hue intentionally absent.                                                                                               |

Example colors from Kanagawa:

mode = "dark"

accent = "#dcd7ba"
selection = "#363646"
muted = "#54546D"

background = "#1f1f28"
dark_background = "#17171e"
darker_background = "#111116"
lighter_background = "#223249"

foreground = "#dcd7ba"
dark_foreground = "#727169"
light_foreground = "#c8c093"
bright_foreground = "#dcd7ba"

red = "#c34043"
yellow = "#c0a36e"
orange = "#c17158"
green = "#76946a"
cyan = "#6a9589"
blue = "#7e9cd8"
magenta = "#957fb8"
brown = "#60382c"

bright_red = "#e82424"
bright_yellow = "#e6c384"
bright_green = "#98bb6c"
bright_cyan = "#7aa89f"
bright_blue = "#7fb4ca"
bright_magenta = "#938aa9"
