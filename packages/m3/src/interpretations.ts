// Every place the spec is silent and the engine makes a choice. Code that
// implements a choice names it with `interpretation("<id>")`, so each one can
// be found, reviewed and documented (apps/studio/docs/m3-interpretations.md).

export interface Interpretation {
  /** Where it applies. */
  readonly area: string;
  /** What the spec says, or that it is silent. */
  readonly spec: string;
  readonly choice: string;
  readonly why: string;
}

export const interpretations = {
  "platform.web": {
    area: "Token resolution",
    spec: "Token values are tagged per platform (Android, Compose, Web, iOS); there is no desktop or Qt platform.",
    choice:
      "Resolve every token for the public Web baseline (Audience 3P, Platform Web) everywhere: Studio, the Omarchy shell and the QML plugins.",
    why: "Web is the closest platform to a Wayland desktop: units are logical pixels independent of the output scale, as CSS pixels are.",
  },
  "unit.dp": {
    area: "Units",
    spec: 'The spec uses dp and "CSS pixels" interchangeably on Web (e.g. "48x48 CSS pixels" for the minimum target).',
    choice:
      "1dp = 1 logical pixel in CSS, Hyprland and Qt. Type sizes (sp, tagged pt in the data) are the same number in logical pixels.",
    why: "Hyprland and Qt work in scale-independent logical pixels; CSS does the same at the default font scale.",
  },
  "static.reference-hues": {
    area: "Colour: terminal (ANSI) colours",
    spec: 'Static colors start from a reference color the product chooses ("Use the Material Theme Builder to input a custom color"); the spec gives none for terminal hues.',
    choice:
      "Reference colours at HCT hues orange 58°, yellow 95°, green 142°, cyan 205°, blue 258°, magenta 328° (chroma 48, tone 50). Red is the error role.",
    why: "These are the HCT hues of the canonical terminal colours; HCT, not RGB, because material-color-utilities builds palettes in HCT.",
  },
  "static.harmonize-source": {
    area: "Colour: terminal (ANSI) colours",
    spec: 'Static colors in a dynamic scheme "can choose to harmonize" to the scheme; the palette is otherwise unspecified.',
    choice:
      "Harmonize each reference colour to the seed with Blend.harmonize, then use material-color-utilities' static-colour palette (CorePalette accent 1: chroma at least 48), as its customColor() does.",
    why: "That is the reference implementation of static colours (Material Theme Builder); harmonizing keeps each hue's meaning while matching the scheme.",
  },
  "static.roles": {
    area: "Colour: terminal (ANSI) colours",
    spec: 'A static color returns "four color roles" that "follow the conventions of the accent colors in the main scheme".',
    choice:
      "The four roles take the spec's tones of primary, on-primary, primary-container and on-primary-container (md.sys.color, at the theme's mode and contrast) from the static colour's palette. The terminal's normal slot is the main role.",
    why: "Applies the accent conventions literally, so static colours follow the same tone table, and the same three contrast levels, as the scheme.",
  },
  "static.bright": {
    area: "Colour: terminal (ANSI) colours",
    spec: "Terminals' bright_* colours have no M3 equivalent. The spec allows custom color roles: a palette, a starting tone and a contrast requirement.",
    choice:
      "bright_<hue> is a custom role on the static colour's hue: the most chroma sRGB allows, at the tone up to 10 steps from the main role toward the middle tones (darker in dark mode, lighter in light mode) that gives the most chroma while keeping at least 4.5:1 against surface (7:1 at medium and high contrast). bright_red does the same on the error hue.",
    why: "Terminals' bright colours are more intense, not paler. In HCT intensity is chroma, and sRGB holds the most chroma at middle tones, so stepping toward the background's opposite (tone 90 in dark mode) washes colours out. The contrast floor keeps them readable as text.",
  },
  "static.brown": {
    area: "Colour: terminal (ANSI) colours",
    spec: "Silent; Omarchy's palette has a brown that is not a terminal hue.",
    choice:
      "brown is the orange static colour's on-fixed-variant role (a dark orange in both modes).",
    why: "Brown is a dark, desaturated orange; Omarchy's shipped themes use a dark brown in both modes too (tokyo-night #75493d on a dark background, catppuccin-latte #6c2715 on a light one). The fixed role keeps it the same in light and dark themes.",
  },
  "omarchy.surfaces": {
    area: "Colour: Omarchy background tiers",
    spec: "M3 names surfaces by elevation (surface-container-lowest … -highest, -dim, -bright); Omarchy names background tiers by direction (dark_ is darker in both modes).",
    choice:
      "background = surface. Dark mode: dark_ and darker_background = surface-container-lowest (in the spec's dark table surface is neutral 6 and surface-container-lowest neutral 4; no role is darker), lighter_background = surface-container-high. Light mode: dark_background = surface-container, darker_background = surface-dim, lighter_background = surface-container-low.",
    why: "Keeps Omarchy's direction in both modes with spec roles only.",
  },
  "omarchy.text": {
    area: "Colour: Omarchy text tiers",
    spec: "M3 has on-surface (text), on-surface-variant (secondary text), outline (3:1 boundaries) and outline-variant (decorative).",
    choice:
      "foreground = on-surface, light_foreground = on-surface-variant, dark_foreground and muted = outline (comments, colour 8), bright_foreground = on-primary-container.",
    why: "Keeps Omarchy's order (foreground, light, dark) by contrast. bright_foreground is also the cursor and selection text, and on-primary-container is the spec's text role for the selection's primary-container.",
  },
  "omarchy.selection": {
    area: "Colour: Omarchy selection",
    spec: "M3 has no text-selection role.",
    choice: "selection = primary-container.",
    why: "A container role that pairs with bright_foreground (on-primary-container) for selected text.",
  },
  "window.corner": {
    area: "Shape: window corners",
    spec: "Silent: windows are not an M3 component; md.sys.shape.corner names the steps (none … extra-extra-large, full).",
    choice:
      "tokens.shape.windowCorner picks the step for Hyprland's rounding, default medium (12dp). Full (circular) is not offered. The shell's surfaces take the same radius (Omarchy has one), and the plugins draw window copies with it.",
    why: "Medium is the corner of the cards windows sit among (filled, elevated and outlined cards); full makes no sense for a rectangle the size of a window.",
  },
  "hyprland.gaps": {
    area: "Layout: Hyprland gaps",
    spec: 'Expanded layouts have a 24dp margin and a 24dp "spacer between panes" (citations.layoutMargin, layoutSpacer). Hyprland has gaps_out (screen edge) and gaps_in (around each window).',
    choice:
      "gaps_out = the layout margin; gaps_in = half the spacer (two adjacent windows are 2 × gaps_in apart); gaps_workspaces = space400. All three are measurement steps the user can change; density then applies to the margin and spacer (layout.density).",
    why: "Windows are the desktop's panes; the arithmetic makes the space between two windows equal the spec's spacer.",
  },
  "layout.density": {
    area: "Layout: density",
    spec: 'A layout\'s margins, spacers and padding "can change to increase or decrease its information density" (citations.layoutDensity), but the spec gives no step for them; components lose 4dp of padding or height per density level (citations.densityStep).',
    choice:
      "tokens.density also applies to the layout: each level removes 4dp from the layout margin, the spacer and the shell's panel padding (never below 0). At density 0 they are the spec's values.",
    why: "One opt-in setting for the whole desktop, using the only density step the spec states.",
  },
  "elevation.hyprland-shadow": {
    area: "Elevation: window shadows",
    spec: '"Tokens have no shadows or color; each platform determines the specific shadows" (citations.elevationShadowsPerPlatform). Component elevation: modal dialogs rest at level 3.',
    choice:
      "Tiled windows rest at level 0 (no shadow). Floating windows rest at level 3. Hyprland draws one shadow, so it takes the Web implementation's (MWC) level 3 ambient shadow: range = blur + spread, offset (0, y), the shadow role at the ambient opacity; render_power 2.",
    why: "Tiled windows sit in the surface like filled cards; floating windows are over it like dialogs. MWC is the Web platform's own implementation, linked from the elevation page.",
  },
  "hyprland.animations": {
    area: "Motion: Hyprland animations",
    spec: '"Most motion should use the default speed, while smaller elements may use fast and larger elements may use slow" (citations.springSpeeds). Spatial springs move things; effects springs change colour and opacity.',
    choice:
      "windows (move, open, close): spatial default; layers (bar, menus, notifications): spatial fast; workspaces and the special workspace (full screen): spatial slow; fades: effects default; layer fades and border colour: effects fast. Open/close keep Hyprland's popin at 87%.",
    why: "Maps each leaf to the speed the spec gives its size; the popin scale has no spec value and keeps Omarchy's.",
  },
  "shell.components": {
    area: "Omarchy shell: which M3 component each surface is",
    spec: "Silent: the shell's surfaces are not M3 components.",
    choice:
      "bar = app bar; bar flyouts ([popups]) = menu (Expressive, standard colours); tooltip = plain tooltip; notifications = elevated card; menu and launcher = search view with list items; polkit = dialog; lock = filled text field.",
    why: "The component whose role is closest: the bar sits on the surface at level 0 like an app bar; notifications are raised cards; the launcher is a full-screen search.",
  },
  "shell.controls": {
    area: "Omarchy shell: control states",
    spec: "State layers use the content colour at md.sys.state opacities (hover 0.08, focus 0.10, pressed 0.10, dragged 0.16) and keyboard focus adds a focus indicator. There is no selected state-layer token and no text-selection role.",
    choice:
      "Controls rest with no state layer and a 1dp outlined-button outline. Selected is a selected list item (md.comp.list.list-item.selected.container.color, secondary-container) with no outline, painted as secondary at the alpha that, over the menu container, comes nearest secondary-container. Text selection is primary at 0.40.",
    why: "Most selected things in the shell are list rows (connected devices and networks, chosen options); button groups and slider tracks take secondary-container in M3 too. The shell's selected state is one colour, used as a tinted fill and at full strength for a switch's knob, so a container role itself would hide the knob; secondary tinted toward its container keeps both. 0.40 is the selection opacity Compose's Material 3 uses (TextSelectionColors).",
  },
  "shell.spacing": {
    area: "Omarchy shell: spacing",
    spec: "Spacing is an 8dp scale of md.sys.measurement steps; components have their own heights and paddings.",
    choice:
      "The shell's generic spacing names (xxs … huge, gaps) snap to the nearest measurement step; control height and padding come from the extra-small button, row height from the menu item, row padding from the list item, popup padding from the menu item, panel padding from the layout margin (at the layout density). Widths (dropdowns, fields) keep the shell's defaults: M3 sizes them by content.",
    why: "Keeps every pinned value on the spec's grid or a component token; density then applies the spec's 4dp steps.",
  },
  "shell.font": {
    area: "Omarchy shell: type sizes",
    spec: "The type scale has display, headline, title, body and label roles; the shell has its own names and only takes sizes.",
    choice:
      "caption = label-small, body-small = body-small, body = body-medium, subtitle = title-small, title = title-medium, heading = title-large, display = headline-small, display-large = headline-medium; icons 20 (menu item and extra-small icon button) and 24 (small icon button). The theme does not set base-size: that is the user's text size (text.scale).",
    why: "Each shell name is used for the role whose size and purpose match; the family stays the user's Omarchy font, and line height and weight cannot be set.",
  },
  "text.scale": {
    area: "Typography: text resizing",
    spec: 'Text resizing "is often performed through a device OS setting" (citations.textResizeSetting): each size is the default "multiply[d] by the scale value" (textResizeMultiplier), line height scales with it (textResizeLineHeight), padding stays at 1x (textResizePadding), and components without text are not affected (textResizeNoText).',
    choice:
      "Omarchy's text size (`omarchy display text size`, the shell's [font] base-size; its default 12 is 1×) is the OS setting. Scale = base-size / 12 × tokens.type.scale. Every type size, and the Hyprland group bar's label, is multiplied by it. A container that holds a line of text keeps its padding and grows by that line's height × (scale − 1), never below its 1× height: controls and the group bar (label-large), menu rows (menu-item label text) and the bar (body-medium, the largest text it holds). Icons do not scale. The theme is written at 12; the stef.omaterial shell plugin rescales live when the text size or the theme changes. The QML plugins' type styles (Tokens.qml m3.type) follow the same scale, and so does Omaterial Studio: its type roles are multiplied by --stef-text-scale and its text controls (h-text-*) grow the same way, while its root font size, spacing and icons stay at 1×.",
    why: "One setting scales the shell, GTK and terminals together, as the spec's OS setting does; the theme pins every size, so a plugin applies the multiplier the shell would otherwise apply to base-size.",
  },
  "lock.components": {
    area: "Lock screen (stef.lock): which M3 component each part is",
    spec: "Silent: M3 has no lock screen. Its text fields come filled or outlined; a filled field is a surface-container-highest container with extra-small top corners and an active indicator (1dp on-surface-variant, 2dp primary when focused, error in error), 56dp high, input in body-large, supporting text in body-small below it. A list item's leading avatar is primary-container with on-primary-container.",
    choice:
      "The wallpaper shows sharp under a scrim (scrim role at citations.scrimOpacity). Over it, centred: the time in display-large and the date in title-medium, an avatar (96dp circle; ~/.face, else the name's initial in headline-medium on primary-container / on-primary-container), the user name in title-large, then the password as a filled text field, always focused (so its 2dp primary active indicator, error in the error state; caret primary), with the fingerprint glyph in its leading slot when a sensor is enrolled and submit as a standard icon button (small, 40dp) in its trailing slot, disabled at 0.38 while the field is empty. The failure or the check in progress is its supporting text. Clock, date, name and the in-progress line are white.",
    why: "A filled field keeps the password readable on any wallpaper, which an outlined field's transparent container would not. Text on the scrimmed wallpaper isn't on a surface role, so it takes white as Android's own lock screen does; the scrim keeps it legible. A sharp wallpaper is what ChromeOS and Android lock screens show; the scrim does the work blur did.",
  },
  "expo.components": {
    area: "Exposé (stef.expo): which M3 component each part is",
    spec: "Silent: the exposé is not an M3 component.",
    choice:
      "The backdrop is a scrim (scrim role at citations.scrimOpacity, blurred by the compositor). A workspace tile is a filled card: its container colour and shape, the hover state layer, the tokens' tile padding. Its header is the workspace label in title-medium and the window count in body-small on-surface-variant; the focused workspace is a primary navigation tab's active state (active label colour and the 3dp active indicator under the label). The miniature's backdrop is surface-container-high. A selected window wears the card's focus indicator (colour, thickness and outer offset); its title is a plain tooltip (inverse colours, extra-small corner, body-small, 24dp high, 8dp padding) the tile padding above the window's bottom edge, fading on effects fast (a small element). A window with no capture yet is an outlined card with its class in body-medium on-surface and title in body-small on-surface-variant. Thumbnails take the window corner at the miniature's scale.",
    why: "A workspace is a clickable group of content, as a card is; the focused workspace is the selected one of a set, as the shell shows selection; a window title on hover is what a plain tooltip is for. Scaling the corner keeps a thumbnail the miniature of its window.",
  },
  "periphery.components": {
    area: "Periphery (stef.periphery): motion and which M3 component each part is",
    spec: 'Silent: the periphery is not an M3 component. Motion: "Most motion should use the default speed, while smaller elements may use fast" (citations.springSpeeds); spatial springs move things, effects springs change colour and opacity.',
    choice:
      "Every animation is a spring of the tokens' motion scheme (SpringValue): card and ghost geometry, the cards' travel with the focus area, a pile opening and the cards' tilt on spatial default, every fade on effects default, the dragged card's grow on spatial fast. Each band is one plane hinged on the monitor's outer edge, turned 12° back and seen in perspective from in front of the band, so a band's cards share one vanishing point and a tilted card is foreshortened; a dragged card turns flat, and a ghost turns between its card's tilt and flat along its flight. The selected card is lifted off the plane: flat, 5% larger from its outer edge, in front, with the elevated card's hover elevation (md.comp.elevated-card.hover.container.elevation, level 2) as its shadow; the other cards recede, pushed back until they are drawn 3% smaller. Cards keep Hyprland's window borders (SPEC.md, Card borders), and change their colour on effects fast as Hyprland's border leaf does (hyprland.animations). A group header is title-small in on-surface-variant. A card without a frame yet is an outlined card with its class in body-small on-surface-variant; a selected card's title is a plain tooltip, as in the exposé, fading in and out on effects fast (a small element). The dragged card is lifted to the filled card's dragged elevation (the Web's ambient shadow for it) under the dragged state layer, and the card it left behind shows at the disabled opacity (md.sys.state.disabled, 0.38) while it is away. A drop target (the focus area, or a group) is primary at the hover state-layer opacity, edged in primary at the outlined card's outline width, with the large corner.",
    why: "Cards and ghosts are windows moving, as Hyprland's own windows do on spatial default; a drag lifts a card the way M3 lifts a dragged card; the drop target reads as the place a hover would act on, outlined so it shows over windows and wallpaper.",
  },
  "periphery.placement": {
    area: "Periphery (stef.periphery): how the other workspaces' windows are placed in the bands",
    spec: "Silent: M3 has no window overview. Its cards keep their content's aspect and stack in a column or grid with spacing between them (layout spacing, md.sys.measurement steps), which the band's card gap and group gap follow.",
    choice:
      "Mission Control style: each workspace group has its own scale (it fills the band's width, then the band's groups shrink by one factor to fit its height, at most half a window's real size); tiled windows keep the side they tile on, in up to three columns, shorter columns centred against the tallest; a tab group is a pile (the shown tab in front, up to three tabs peeking 7 px each behind it) that opens while one of its tabs is selected: the band lays out again with each tab a card of its own; a floating window's card is packed into the column nearest where the window sits. No cards overlap, apart from a closed pile's tabs. Groups stack down the band, the group gap apart, centred.",
    why: "Cards as large as the band allows keep thumbnails legible; keeping sides keeps the workspace recognisable; a pile shows a tab group as one place, and opening it keeps every tab reachable; cards that never overlap are easy to point at, as in Mission Control and Exposé.",
  },
  "periphery.ghost-blur": {
    area: "Periphery (stef.periphery): the blurred wallpaper behind a flying ghost",
    spec: "Silent: M3 has no blur. The ghost hands off to a real window, which Hyprland draws over its own decoration:blur (dual-kawase: size, passes, contrast, brightness, vibrancy, noise); that is what the ghost must match.",
    choice:
      "The ghost redoes Hyprland's blur from Hyprland's live options: MultiEffect over the wallpaper with radius size × 2^passes (how far dual-kawase reaches: each pass halves the image and samples size away; 48 px for size 6, 3 passes), blurMax 64 stretched by blurMultiplier past it; contrast − 1, brightness − 1 and vibrancy as MultiEffect's contrast, brightness and saturation. Blur off, or size or passes missing, is no blur. Hyprland's noise is not redone.",
    why: "A value derived from the compositor's own settings follows any theme or blur change and replaces a radius matched by eye; the ghost then looks like the window it hands off to.",
  },
  "bar.focus-area": {
    area: "Bar (stef.bar): the bar while Periphery's focus area is on",
    spec: 'Silent on a bar that narrows. Floating toolbars use the standard colour scheme\'s "Surface container", "have elevation by default. If the content beneath the toolbar is visually distinct, elevation can be removed", and stay at least 16dp from the edge of the window (citations.floatingToolbarMargin). Layouts have a margin at the window\'s edges and a spacer between panes (citations.layoutMargin, layoutSpacer). Motion: "Most motion should use the default speed, while smaller elements may use fast and larger elements may use slow" (citations.springSpeeds).',
    choice:
      "Docked, the bar is the theme's app bar (shell.components). While Periphery is on, its body becomes a standard floating toolbar (surface-container, md.sys.shape.corner.full, no elevation) and a pane on the windows' grid: as wide as the windows tiled in the focus area, the layout margin from the screen edge, and the layout spacer above the windows, all through Hyprland's gaps (hyprland.gaps). It moves on spatial default; the corner and colour change on effects default.",
    why: "Narrowed, the bar floats like a floating toolbar rather than docking like an app bar, and lining it up with the windows makes it one more pane of the layout, spaced by the same Layout tokens (margin, spacer, density) the user sets in Studio. The spec's 16dp edge minimum holds at the margin's default (24dp); a smaller margin is the user's density choice, as it is for the windows. Over a visually distinct background, and with the bar window ending right below the body for the stock popups, the elevation is removed as the spec allows.",
  },
  "bar.segments": {
    area: "Bar (stef.bar): widgets in segments",
    spec: 'Silent on a bar\'s widgets. Connected button groups "use 2dp padding" (citations.connectedButtonGroupPadding); the round variant\'s "outer shape is fully round, and the inner shape remains square with the following corner sizes", the size\'s corner (citations.connectedButtonGroupCorners), the square variant has that corner outside too. An extra-small button\'s leading and trailing space is 12dp. Hovered and pressed elements show a state layer (md.sys.state). Floating toolbars use "Surface container"; layouts space panes by the spacer (citations.layoutSpacer).',
    choice:
      "Each group of widgets (a section, split by an entry's group key) is a connected button group with tokens.bar's shape, size, gap and padding. Text widgets are a segment each; consecutive icon widgets (no wider than the bar, or the tray) share one, as icon buttons in one container. Round: outer corners full, inner corners the size's corner (4dp extra-small); square: that corner everywhere. tokens.bar.gap (2dp) separates segments and the bar's top and bottom; tokens.bar.padding (space50) pads a segment's ends, which with the stock widgets' own margins makes about the extra-small button's 12dp. Groups are the layout spacer apart. The tray's segment follows its drawer as it opens. Each widget gets an on-surface state layer at the hover and pressed opacities. Docked the segments are surface-container-high on the app bar's surface (none on a transparent bar); floating the bar has no container and they are the floating toolbar's surface-container. Not on a vertical bar.",
    why: "The widgets are sets of related controls, which a connected button group is for (ChromeOS's shelf segments them the same way, and gathers its status icons in one piece). The bar draws its own corners, so it can follow the spec's inner corners where Hyprland's group tabs can't; its own tokens let Studio tune it apart from the tabs.",
  },
  "bar.transparent": {
    area: "Bar (stef.bar): the transparent vertical bar's legibility shadow",
    spec: 'M3 has no text shadow. For text over imagery: "Add a translucent scrim or bounding shape beneath the text or icon to help ensure proper contrast."',
    choice:
      "A transparent bar (the stock toggle) has no container; a horizontal one keeps its segments, whose text stays on-surface. A vertical one has no segments, so its content sits on the wallpaper: its text colour follows the stock contrast probe, and all of its content gets one shadow: 1 px down, 3 px blur, 0.5 opacity, black or white, whichever has the higher WCAG contrast with the text colour. Not M3.",
    why: "The user's choice of a transparent bar over the wallpaper: a scrim would darken the wallpaper the transparency is for, while a soft shadow keeps glyphs legible over busy or mid-tone wallpapers where no text colour alone reaches contrast.",
  },
  "special.scrim": {
    area: "Hyprland: behind a special workspace (the scratchpad)",
    spec: 'Modal surfaces (dialogs, modal sheets, time pickers) sit above a scrim that makes the content behind them less prominent: "Scrims use the scrim color role at an opacity of 32%" (citations.scrimOpacity). M3 has no blur.',
    choice:
      "A shown special workspace is a modal layer over the desktop: Hyprland's dim_special is the scrim opacity (its dim is black, the scrim role's colour). On top of the scrim, Hyprland blurs what is behind it (decoration:blur:special, tokens.special.blur), with the shared blur size and passes (tokens.blur); not M3, and off with the token.",
    why: 'The scratchpad\'s windows take focus as a dialog does, so they get its scrim. The blur follows Android 16, which blurs behind its notification shade, Quick Settings and Recents "to add depth and preserve context", and stays a choice because the spec has none.',
  },
  "studio.colors": {
    area: "Omaterial Studio: its own colours",
    spec: "Silent: Studio is a tool for the desktop, not a product with its own brand colour.",
    choice:
      "Studio takes the colour roles of the theme Omarchy has applied: its omaterial.json, or under other themes the qml.scheme-fallback approximation from colors.toml; light or dark follows that scheme. While a theme is being generated, Studio shows it instead (the preview).",
    why: "Studio then looks like the desktop it themes, and the preview shows a theme on real UI.",
  },
  "studio.shadcn": {
    area: "Omaterial Studio: shadcn variables",
    spec: "Silent: shadcn components read their own variable names (--background, --primary, --card, …); M3 names colour roles.",
    choice:
      "Each shadcn variable is the M3 role of the component that plays the same part, from its token where one exists: card = elevated card container, popover = menu container, primary = filled button, secondary = tonal button, border = outlined card outline, input = outlined text field outline, ring = the focus indicator, sidebar accent = a selected list item. The rest are system roles: background = surface, muted = surface-container-high, accent (hover) = surface-container-highest, destructive = error, sidebar = surface-container-low, charts = primary, tertiary, secondary, error, on-surface-variant. Foregrounds are the matching on- roles.",
    why: "Keeps the shadcn components unchanged while every colour they draw is an M3 role in the role's intended use.",
  },
  "studio.tailwind-scale": {
    area: "Omaterial Studio: Tailwind's scales",
    spec: "The spec's units are dp (unit.dp) on a 4dp grid (md.sys.measurement: space50 = 4dp); type, corners and elevation are named steps.",
    choice:
      "The root font size is 16px, so 1rem = 16px = 16dp and Tailwind's spacing unit (0.25rem) is the 4dp step. Tailwind's own size names map to the M3 step nearest their default value (ties go to the smaller): text-xs … text-9xl to the type roles (roles of equal size prefer body, then label, title, headline, display), rounded-xs … rounded-4xl to the corner steps; shadow-2xs, -xs and -sm are elevation level 1, -md level 2 and so on to -2xl at level 5. The M3 names are utilities too (text-body-medium, rounded-medium, shadow-level2, bg-surface-container-high, …).",
    why: "Existing shadcn classes keep working and land on spec values; new code can name the M3 step directly. The root is set in px, not 100%: Studio's font is the generic monospace family, for which browser engines resolve 100% to their 13px fixed-width default.",
  },
  "qml.scheme-fallback": {
    area: "QML plugins: colour under other themes",
    spec: "Silent: M3 roles come from a scheme, and a theme that isn't Omaterial has none; Omarchy gives the shell five colours (background, foreground, accent, muted, urgent).",
    choice:
      "Surface roles (surface*, background, inverse-on-surface) = background; on-surface, on-background, inverse-surface = foreground; on-surface-variant, outline, outline-variant = muted; error and error-container = urgent; the other accent roles (primary, secondary, tertiary, their containers, fixed and inverse-primary) = accent; every on-<accent or error> role = background; scrim and shadow = #000000 (neutral tone 0 in every scheme). Light or dark follows the background's luminance.",
    why: "The inverse of how an Omaterial theme writes the five colours (omarchy.surfaces, omarchy.text): each role takes the Omarchy colour its family lands on, so the plugins match the theme instead of inventing hues.",
  },
  "shell.image-picker": {
    area: "Omarchy shell: image picker",
    spec: "Silent: the picker has no card, so text sits directly on its scrim.",
    choice:
      "The scrim is the surface colour at 0.5 (not the scrim role), the selected slice primary, others the outline.",
    why: "M3's scrim role is near-black in both modes; text on it would be unreadable in a light theme.",
  },
  "hyprland.borders": {
    area: "Hyprland: window borders",
    spec: "Silent on windows. Keyboard focus is shown with a focus indicator (secondary, 3dp); outlined cards are edged with outline-variant (1dp).",
    choice:
      "The focused window's border is the focus indicator colour, other windows' the outlined-card outline; one solid colour each (M3 has no border gradients). Width is tokens.border.width: the 1dp outline (default) or the 3dp focus indicator.",
    why: "Window focus is keyboard focus; unfocused windows are cards resting on the surface.",
  },
  "hyprland.groupbar": {
    area: "Hyprland: window group tabs",
    spec: 'Silent on Hyprland\'s group bar. Connected button groups "use 2dp padding" (citations.connectedButtonGroupPadding), span "the width of the page or surface it\'s placed on", and have the square variant\'s corner sizes per button size (citations.connectedButtonGroupCorners); the round variant is fully round outside.',
    choice:
      "The tabs are a connected button group of tokens.groupbar.size buttons (extra-small by default): the button's height (density and text.scale apply), side padding and label text (text.scale applies). tokens.groupbar.padding (default the spec's 2dp) is the gap between tabs and between the tabs and their window, which is the surface the group is placed on. Square shape: every corner is the spec's size for the button size (4dp extra-small, 8dp small), inner corners included, as the round variant keeps its inner corners at that size. Round shape: outer corners fully round and inner corners square, because Hyprland rounds inner edges like the outer ones or not at all. The active tab uses list-item selected colours (secondary-container, on-secondary-container), the others surface-container with on-surface-variant.",
    why: "Group tabs pick one of a set of related items, which is what a connected button group is for (it replaces the segmented button); the selected colours match the launcher's selected item.",
  },
  "color.variants": {
    area: "Colour: scheme variants",
    spec: 'The spec defines each colour role as a tone of a reference palette (md.sys.color), per theme and contrast, and says "Dynamic color is powered by the Material Color Utilities". It does not name scheme variants.',
    choice:
      "Role tones always come from the spec's table; material-color-utilities' variants only generate the six palettes, on their 2021 definitions (the ones the table belongs to). Offered: tonal spot, neutral, vibrant, expressive, rainbow, fruit salad. Not offered: fidelity, content and monochrome, whose definitions override role tones.",
    why: "For the six offered variants the table and the library agree on every role at standard contrast (tested), so the variant changes the palettes and nothing else.",
  },
} as const satisfies Record<string, Interpretation>;

export type InterpretationId = keyof typeof interpretations;

/** Marks the code that implements an interpretation; returns it for documentation. */
export const interpretation = (id: InterpretationId): Interpretation => interpretations[id];
