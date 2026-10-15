# Theming inventory

Every theming and visual decision in the repo and in the Omarchy surfaces it themes, checked against the Material 3 snapshot in [material-3/](material-3/README.md) (content version 2026-09-23). Re-verdicted 2026-10-12, after the Material 3 theming plan (phases 1–11, and Studio's Tailwind config).

Verdicts:

- **✓**: a spec token or a quoted spec sentence (`packages/m3/src/citations.ts`).
- **I** `id`: a registered interpretation where the spec is silent, documented in [m3-interpretations.md](m3-interpretations.md).
- **—**: no M3 equivalent, kept for the platform (named in the row).
- **✗**: a known limitation (see §10).

The values below are the goldens in `packages/theme-engine/src/theme/__golden__/` (seed #4285f4, tonal spot, dark, standard contrast, default tokens).

## 1. How theming flows

| Stage   | Where                                                     | What                                                                                                                                                                                                                                                                                           |
| ------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spec    | `packages/m3`                                             | The m3.material.io snapshot (`apps/studio/docs/material-3/`) extracted to `spec/extract.json` and generated into token tables; `resolve`, citations and interpretations. `vp run m3-generate` (in `packages/m3`) regenerates.                                                                  |
| Seed    | Studio, Theme page                                        | Wallpaper from a file, Wallhaven or Pexels; a worker quantizes it to a source colour.                                                                                                                                                                                                          |
| Palette | `packages/theme-engine`: `palette.ts`, `static-colors.ts` | material-color-utilities builds the six palettes; role tones come from the spec's `md.sys.color` table for the mode and contrast. ANSI colours are M3 static colours.                                                                                                                          |
| Tokens  | `packages/tokens`, `~/.config/omarchy/stef/tokens.json`   | v2: motion scheme, window corner, density, type scale, layout steps, border width, window-group tabs, the shared blur, the flyout exception, the special workspace's blur, expo and periphery layout. Studio's Tokens page and `stef tokens` edit them; plugins read them live (`Tokens.qml`). |
| Files   | `theme-engine/src/theme/files/*`                          | `colors.toml`, `hyprland.lua`, 13 `shell.<section>.toml`, `omaterial.json` (palette and text spec), written to `~/.config/omarchy/themes/omaterial-dev/` with the tokens in effect.                                                                                                            |
| Apply   | `omarchy theme set omaterial-dev`                         | `omarchy-theme-set-templates` renders `default/themed/*.tpl` for files the theme doesn't ship; each `shell.<section>.toml` replaces its whole section; the shell gets colours and `shell.toml` over IPC.                                                                                       |
| Live    | `apps/omaterial` (`stef.omaterial`)                       | Rescales the theme's type and text containers when Omarchy's text size changes (§5).                                                                                                                                                                                                           |

## 2. Colour

### 2.1 Scheme

| Item             | Value                                                                                                                                                                                                                                              | Verdict                                                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role tones       | the spec's `md.sys.color` table, per mode and contrast                                                                                                                                                                                             | ✓                                                                                                                                                           |
| Palettes         | material-color-utilities (`DynamicScheme`) from the source colour                                                                                                                                                                                  | ✓ `citations.dynamicColorIsMcu`                                                                                                                             |
| Variants offered | tonal spot (default), neutral, vibrant, expressive, rainbow, fruit salad, on their 2021 definitions                                                                                                                                                | I `color.variants`                                                                                                                                          |
| Contrast         | standard, medium, high                                                                                                                                                                                                                             | ✓ the spec's three levels                                                                                                                                   |
| Source colour    | `sourceColorFromImageBytes` on the wallpaper                                                                                                                                                                                                       | ✓ content-based source                                                                                                                                      |
| ANSI colours     | static colours at fixed HCT hues, harmonized to the seed; four roles each; bright_ = the hue at full sRGB chroma, up to 10 tones toward the vivid middle tones, above a 4.5:1 (7:1) contrast floor; red = error; brown = orange's on-fixed-variant | I `static.reference-hues`, `static.harmonize-source`, `static.roles`, `static.bright`, `static.brown`; ✓ `citations.errorIsStaticRed`, `harmonizeWithBlend` |

### 2.2 Omarchy keys ← M3 roles (`colors.toml`)

| Omarchy key                           | Role (dark)                                                      | Verdict               |
| ------------------------------------- | ---------------------------------------------------------------- | --------------------- |
| accent                                | primary                                                          | ✓                     |
| background                            | surface                                                          | I `omarchy.surfaces`  |
| dark_background, darker_background    | surface-container-lowest (light: surface-container, surface-dim) | I `omarchy.surfaces`  |
| lighter_background                    | surface-container-high (light: surface-container-low)            | I `omarchy.surfaces`  |
| foreground                            | on-surface                                                       | I `omarchy.text`      |
| light_foreground                      | on-surface-variant                                               | I `omarchy.text`      |
| dark_foreground, muted                | outline                                                          | I `omarchy.text`      |
| bright_foreground                     | on-primary-container                                             | I `omarchy.text`      |
| selection                             | primary-container                                                | I `omarchy.selection` |
| red…magenta, bright_*, orange, brown  | static colours                                                   | I `static.*`          |
| omaterial_* (every md.sys.color role) | hex                                                              | ✓                     |

Omarchy derives `selection_background`, `selection_foreground`, `purple`, `color0`–`color15` and `cursor` from these keys (`bin/omarchy-theme-color`). Apps themed through Omarchy's templates (terminals, editors, browsers) follow this mapping.

### 2.3 Shell surfaces (`shell.<section>.toml`)

Every value names its source in a comment next to it. Which component each surface is: I `shell.components`.

| Section                      | M3 component and colours                                                                                                                                                                                              | Verdict                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| bar                          | app bar: surface / on-surface; attention = badge (error); opaque                                                                                                                                                      | ✓ tokens                                                   |
| popups (bar flyouts)         | standard menu: surface-container-low / menu label colour; no outline; translucent `tokens.flyouts.alpha` (0.9) over blur                                                                                              | ✓ tokens; translucency is the user-approved exception      |
| tooltip                      | plain tooltip: inverse-surface / inverse-on-surface; no outline; opaque                                                                                                                                               | ✓                                                          |
| notifications                | elevated card: surface-container-low; countdown = progress indicator (primary)                                                                                                                                        | ✓                                                          |
| menu, launcher               | search view: surface-container-high; scrim at 32%; selected = list item selected (secondary-container)                                                                                                                | ✓ tokens, `citations.scrimOpacity`                         |
| polkit                       | dialog: surface-container-high, headline on-surface, icon secondary, error from the text field; scrim 32%                                                                                                             | ✓                                                          |
| lock                         | filled text field, focused: surface-container-highest, 2dp primary active indicator at the bottom                                                                                                                     | ✓                                                          |
| hyprland (shell border refs) | focus indicator (secondary) / outlined card outline (outline-variant)                                                                                                                                                 | ✓                                                          |
| controls                     | state layers on-surface at hover 0.08, focus 0.10, pressed 0.10; focus adds the 3dp focus indicator; selected = list item selected (secondary tinted to secondary-container, no outline); text selection primary 0.40 | ✓ `md.sys.state`; I `shell.controls` (selected, selection) |
| image-picker                 | surface at 0.5 as scrim, selected primary, unselected outline                                                                                                                                                         | I `shell.image-picker`                                     |

### 2.4 Hyprland colours (`hyprland.lua`)

| Setting                         | Value                                                                                                                    | Verdict                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| active_border / inactive_border | focus indicator (secondary) / outlined card outline; one solid colour                                                    | I `hyprland.borders`          |
| shadow colour                   | shadow role at the Web ambient opacity (0.15)                                                                            | I `elevation.hyprland-shadow` |
| group tabs                      | active: list item selected (secondary-container / on-secondary-container); others surface-container / on-surface-variant | I `hyprland.groupbar`         |

### 2.5 Plugin colours (QML)

Plugins take M3 roles from `Scheme.qml`: the applied theme's `omaterial.json`, or under other themes an approximation from Omarchy's five colours (I `qml.scheme-fallback`). Component colours come from the allowlisted tokens in `packages/qml-kit/src/m3.generated.ts`.

| Plugin    | Parts                                                                                                                                                                                                                                                                                                                                                                                                            | Verdict                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| expo      | scrim (scrim role, 32%); tiles = filled cards with the hover state layer; focused workspace = tab active label and indicator; selected window = card focus indicator; title = plain tooltip; window without a capture = outlined card                                                                                                                                                                            | ✓ tokens; I `expo.components`                             |
| periphery | headers title-small on-surface-variant; card without a frame = outlined card; title = plain tooltip; dragged card = filled card's dragged elevation + dragged state layer, the card left behind at the disabled opacity; drop targets primary at hover opacity, primary outline, large corner; card borders stay Hyprland's; cards tilt 8° towards the focus area; Mission Control placement with piles and fans | ✓ tokens; I `periphery.components`, `periphery.placement` |
| omaterial | no visuals                                                                                                                                                                                                                                                                                                                                                                                                       | —                                                         |

### 2.6 Studio's own colours

| Item               | Value                                                                                                                                           | Verdict                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Source             | the applied theme's roles (`omaterial.json`, or the fallback from `colors.toml`), followed every 2 s; the theme being generated while previewed | I `studio.colors`           |
| Light / dark       | the mode of the scheme shown                                                                                                                    | I `studio.colors`           |
| shadcn variables   | each from the M3 role of the component in the same part (card = elevated card, input = outlined text field outline, ring = focus indicator, …)  | I `studio.shadcn`           |
| Motion page series | fixed dataviz palette `#2a78d6 #eb6834 #1baf7a`                                                                                                 | — a validated chart palette |

## 3. Shape

| Item                              | Value                                                                                                                      | Verdict                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Window corner                     | `tokens.shape.windowCorner`, default medium (12dp); every `md.sys.shape.corner` step but full                              | ✓ steps; I `window.corner`                                       |
| Shell corner radius               | Omarchy's one radius, which mirrors `decoration:rounding`                                                                  | ✗ one radius for every shell surface (§10)                       |
| Lone tiled and fullscreen windows | keep their gaps and corners (the flush rules in `hyprland.lua.ts` are commented out)                                       | —                                                                |
| Group tabs                        | square connected button group: 4dp (extra-small) or 8dp (small) on every corner; round: fully round outside, square inside | ✓ `citations.connectedButtonGroupCorners`; I `hyprland.groupbar` |
| Expo                              | tiles = filled card corner (medium); thumbnails = window corner at the miniature's scale; tooltip extra-small              | ✓; I `expo.components`                                           |
| Periphery                         | cards and ghosts = Hyprland's rounding (masked: `RoundedClip.qml`); drop targets large (16dp); tooltip extra-small         | ✓; I `periphery.components`                                      |
| Studio                            | `--radius-*` and `rounded-<step>` from `md.sys.shape.corner`; shadcn's `rounded-xs…4xl` at the nearest step                | I `studio.tailwind-scale`                                        |

## 4. Elevation, shadow, blur, translucency

| Item                      | Value                                                                                                                                                                                                                                                               | Verdict                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Window shadows            | tiled level 0 (none); floating level 3 as the Web's ambient shadow (range 11, offset 0 4, render_power 2)                                                                                                                                                           | ✓ `citations.elevationShadowsPerPlatform`; I `elevation.hyprland-shadow` |
| Shell surfaces            | opaque                                                                                                                                                                                                                                                              | ✓                                                                        |
| Bar flyouts               | translucent (0.9) over blur (size 6, 3 passes) on the bar, OSD and keyboard panel layers                                                                                                                                                                            | — the user-approved exception (`tokens.flyouts`)                         |
| Special workspace         | scrim (`dim_special` 0.32), blurred behind (`blur:special`, the shared `tokens.blur`) unless `tokens.special.blur` is off                                                                                                                                           | ✓ `citations.scrimOpacity`; I `special.scrim` (the blur is not M3)       |
| Periphery dragged card    | `md.comp.filled-card.dragged.container.elevation` (level 3) as the Web's ambient shadow (`RectangularShadow`)                                                                                                                                                       | ✓; I `periphery.components`                                              |
| Periphery ghost wallpaper | MultiEffect blur derived from Hyprland's `decoration:blur` (size × 2^passes; contrast, brightness, vibrancy)                                                                                                                                                        | I `periphery.ghost-blur`                                                 |
| Bar in the focus area     | `stef.bar`: the app bar narrows to Periphery's focus area as a floating toolbar (surface-container, `corner.full`, no elevation), spatial default spring                                                                                                            | I `bar.focus-area`                                                       |
| Transparent bar           | `stef.bar`: no container, segments kept; vertical: the stock contrast probe's text colour, a 1 px / 3 px / 0.5 shadow                                                                                                                                               | — not M3; I `bar.transparent`                                            |
| Bar segments              | `stef.bar`: widget groups as connected button groups (`tokens.bar` shape, size, gap, padding, docked side inset; inner corners the size's), icons sharing a segment, spacer between groups, state layers; surface-container-high docked, surface-container floating | I `bar.segments`                                                         |
| Bar icon buttons          | Every icon in the bar: extra-small icon button, 20dp icon, `tokens.bar.iconWidth` (narrow 28 / default 32 / wide 40dp), scaled with Omarchy's text size                                                                                                             | I `bar.icons`                                                            |
| Studio                    | `shadow-level0…5` from the Web's key and ambient shadows; shadcn's `shadow-2xs…2xl` mapped onto levels 1–5                                                                                                                                                          | I `studio.tailwind-scale`                                                |

## 5. Typography

| Item        | Value                                                                                                                                                                                                               | Verdict                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Family      | the user's Omarchy font everywhere (shell, plugins, Studio via `monospace`)                                                                                                                                         | ✗ system-wide family (§10); M3 sizes in it |
| Shell sizes | caption label-small 11, body-small 12, body body-medium 14, subtitle title-small 14, title title-medium 16, heading title-large 22, display headline-small 24, display-large headline-medium 28; icons 20 / 20 / 24 | ✓ type scale; I `shell.font`               |
| Text size   | Omarchy's text size (`[font] base-size`, 12 = 1×) × `tokens.type.scale` scales every type size live; containers with text grow by their line height; padding and icons don't scale                                  | ✓ `citations.textResize*`; I `text.scale`  |
| Plugins     | `tokens.m3.type`, the 15 baseline styles at the same scale; weights 400/500                                                                                                                                         | ✓; I `text.scale`                          |
| Studio      | type roles × `--stef-text-scale` (followed from `shell.toml` and `tokens.json`); text controls `h-text-*` grow by their line height; root font size, spacing and icons stay 1×                                      | ✓; I `text.scale`                          |
| Group tabs  | the button size's label (label-large), weight 500                                                                                                                                                                   | ✓; I `hyprland.groupbar`                   |
| Studio      | `text-<role>` utilities; shadcn's `text-xs…9xl` at the nearest role (body first): xs body-small, sm body-medium, base body-large                                                                                    | I `studio.tailwind-scale`                  |

## 6. Spacing and layout

| Item            | Value                                                                                                                                                                                                | Verdict                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Units           | 1dp = 1 logical px in Hyprland, Qt and CSS (1rem = 16dp in Studio)                                                                                                                                   | I `platform.web`, `unit.dp`                                                     |
| Hyprland gaps   | gaps_out = layout margin, gaps_in = spacer / 2, both 24dp, 4dp less per density level; workspaces 32dp                                                                                               | ✓ `citations.layoutMargin`, `layoutSpacer`; I `hyprland.gaps`, `layout.density` |
| Density         | `tokens.density` 0 to −3: components lose 4dp of height per level; layout margin, spacer and panel padding too                                                                                       | ✓ `citations.densityLevels`, `densityStep`; I `layout.density`                  |
| Shell spacing   | generic names at the nearest measurement step; control height and padding from the extra-small button, rows from the menu item, row padding from the list item, panel padding from the layout margin | ✓ tokens; I `shell.spacing`                                                     |
| Group tabs      | height and side padding from the button size; 2dp between tabs and to the window                                                                                                                     | ✓ `citations.connectedButtonGroupPadding`; I `hyprland.groupbar`                |
| Expo, periphery | margins, gaps and padding as measurement steps (`tokens.expo`, `tokens.periphery`)                                                                                                                   | ✓ steps; the values are plugin tokens                                           |
| Plain tooltips  | 24dp high, 8dp padding                                                                                                                                                                               | ✓ `citations.plainTooltipHeight`, `plainTooltipPadding`                         |
| Studio          | Tailwind's spacing unit = space50 (4dp)                                                                                                                                                              | I `studio.tailwind-scale`                                                       |

## 7. Motion

| Item                       | Value                                                                                                                                                                                      | Verdict                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Springs                    | `md.sys.motion.spring.*`, standard or expressive (`tokens.motion.scheme`), mass 1                                                                                                          | ✓                                                   |
| Hyprland                   | every animation leaf on a spring: windows spatial default, layers spatial fast, workspaces spatial slow, fades effects default, layer fades and borders effects fast; popin 87% kept       | ✓ `citations.springSpeeds`; I `hyprland.animations` |
| Expo                       | analytic spring step: spatial default for position and scale, effects default for opacity, effects fast for the tooltip                                                                    | ✓; staggers and scale-from are plugin tokens        |
| Periphery                  | `SpringValue` (exact spring per frame): spatial default for geometry and travel, effects default for fades, spatial fast for the drag grow, effects fast for border colour and the tooltip | ✓; I `periphery.components`                         |
| Studio                     | `ease-<kind>-<speed>` from the spec's Web springs-to-curves table (`--stef-*` at runtime)                                                                                                  | ✓ the spec's Web table                              |
| Easing and duration tokens | not used                                                                                                                                                                                   | ✓ `citations.legacyEasing`                          |

## 8. Studio and the shadcn components

The shadcn components keep their code and class names. M3 lives in Studio's Tailwind config (`apps/studio/src/m3/m3.generated.css`, generated by `src/m3/css.ts`; `vp test -u` regenerates it): `--md-sys-*` variables, M3 utilities, shadcn's variables and scales mapped onto M3 (I `studio.shadcn`, `studio.tailwind-scale`). Components that use `rounded-none` stay square.

## 9. Fixed since the first inventory

The first inventory (compiled the same day, before the plan) found: no corner radius anywhere; 90% translucent shell surfaces; a type scale that wasn't M3; most Hyprland animations on Omarchy's beziers; hand-tuned periphery springs; ANSI colours from a custom algorithm; Studio on shadcn's neutral palette; `tokens.json` ignored by applied themes; a hard-coded border angle; decimal ARGB `omaterial_*` keys; expo's scrim capped at 0.3. All are resolved above.

## 10. Known limitations

- **One corner radius** for every shell surface (it mirrors Hyprland's rounding), so per-component M3 shapes (menus 4, dialogs 28) can't reach the shell.
- **Fonts:** the shell's family is system-wide, and `[font]` takes sizes only (no line height or weight).
- **Sections:** a `shell.<section>.toml` replaces its whole section.
- **Text size:** the theme pins every size; without the `stef.omaterial` service, Omarchy's text size has no effect on an Omaterial theme.
- **Round group tabs:** Hyprland rounds inner edges like the outer ones or not at all, so the round variant's inner corners are square.

## 11. Spec reference points

- Colour: `material-3/pages/styles__color__roles.md`, `styles__color__advanced.md`.
- States: `pages/foundations__interaction__states.md`; `md.sys.state.*`.
- Shape: `pages/styles__shape.md`; `md.sys.shape.corner.*`.
- Elevation: `pages/styles__elevation.md`, `tokens/ELEVATION.20543ce18892f7d9.md`.
- Type and text resizing: `pages/styles__typography.md`, `pages/foundations__writing.md`.
- Spacing, density, breakpoints: `pages/styles__spacing.md`, `pages/foundations__layout__grids-spacing.md`, `pages/foundations__layout__breakpoints.md`.
- Motion: `pages/styles__motion__overview.md`; `md.sys.motion.*`.
- Components: `tokens/TOKEN_TABLE.*.md`; button groups and tooltips: `pages/components__button-groups.md`, `pages/components__tooltips.md`.
