# Navigation drawer

Source: <https://m3.material.io/components/navigation-drawer> (content version 2026-09-23_06-10-05, page updated 2026-07-30T05:22:52.002Z)

## Overview

starNote:The navigation drawer is no longer recommended in the Material 3 Expressive update. For those who have updated, use an expanded navigation rail (https://m3.material.io/m3/pages/navigation-rail/overview/), which has mostly the same functionality of the navigation drawer and adapts better across breakpoints.

- 

Use standard navigation drawers in expanded, large, and extra-large breakpoints
- 

Use modal navigation drawers in compact and medium breakpoints 
- 

Can be open or closed by default
- 

Two variants: standard and modal
- 

Put the most frequent destinations at the top and group related destinations together

[Image: 2 variants of navigation drawers: standard and modal.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoorr6v-1.png?alt=media&token=884dcde5-fdd3-438c-9825-1f6668eef908)

_1. Standard navigation drawer
2. Modal navigation drawer_

#### Availability & resources

#### M3 Expressive update

**May 2025**

The navigation drawer is no longer recommended. Use the expanded navigation rail instead. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

#### Differences from M2

- 

Color: New color mappings and compatibility with dynamic color
- 

Variants: Distinguishes two separate variants of navigation drawer: Standard and modal
- 

Shape: Rounded corners at the ending edge of the drawer
- 

States: Updated color and shape for indicating selected state

[Image: M2 navigation drawer with 4 destinations in a mail app. The active destination “Inbox” is rectangular.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fldox2g48-navdrawer_OLD_M2.png?alt=media&token=192ac522-fc4c-4fd2-8fd2-ef6d0f6662e7)

_M2: Navigation drawer had square corners and a rectangular shape indicating the active destination_

[Image: M3 navigation drawer with 4 destinations in a mail app. The active destination “Inbox” has rounded corners.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzdbjtd0-4.png?alt=media&token=8621f0a5-d2d3-41b1-bed8-3d5d6c5fdf34)

_M3: Navigation drawer has rounded corners, new color mappings, and an updated style for indicating the active destination_

## Specs

starNote:The navigation drawer is no longer recommended in the Material 3 Expressive update. For those who have updated, use an expanded navigation rail (https://m3.material.io/m3/pages/navigation-rail/overview/), which has mostly the same functionality of the navigation drawer and adapts better across breakpoints.

[Image: Navigation drawer diagram numbering 7 elements](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmobm461s-1-3P-3p.png?alt=media&token=c824150d-669e-4277-a2a3-4fabbfe78c87)

_1. 

Container
2. 

Headline
3. 

Label text
4. 

Active indicator
5. 

Badge label text
6. 

Scrim
7. 

Icon_

#### Tokens & specs

The navigation drawer has one token set. Learn about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Token table: see ../tokens/TOKEN_TABLE.376969f91547be8e.md]

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Navigation drawer diagram numbering 9 color roles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6b7pyr-2-3p.png?alt=media&token=9b66c873-2f9c-49a4-bddc-a1ea7b223280)

_Navigation drawer color roles used for light and dark schemes:

1. Surface container low
2. On surface variant
3. On secondary container
4. On secondary container
5. Secondary container
6. On secondary container
7. On surface variant
8. On surface variant
9. Scrim_

For divider color roles, go to divider specs (https://m3.material.io/m3/pages/divider/specs).

#### States

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: 4 navigation drawers illustrating enabled, hovered, focused, and pressed states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma77ejxi-3b-3p.png?alt=media&token=3f75133e-ade4-4a4b-b6f0-bc72a90a7b3b)

_Navigation drawer states: 

1. Enabled 
2. Hovered 
3. Focused 
4. Pressed_

State specs are in the tokens module above (https://m3.material.io/m3/pages/navigation-drawer/specs#6207b00f-a259-41d2-8146-b6efc6380976)

#### Measurements

##### Standard navigation drawer

[Image: Standard navigation drawer with measurements shown for various elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmobmv0i5-4-3p.png?alt=media&token=6731ae6e-d242-4f1b-9b2a-414bc4948d94)

_Element size measurements_

[Image: Standard navigation drawer with measurements shown for padding and margins.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6bb7nw-5-3p.png?alt=media&token=109e0a51-8d58-487a-b1f1-07ceb2e97b6b)

_Padding and margins_

| Attribute | Value |
| --- | --- |
| Container height | 100% |
| Container width | 360dp |
| Container shape | 0,16,16,0dp corner radii |
| Icon size | 24dp |
| Active indicator height | 56dp |
| Active indicator shape | 28dp |
| Active indicator width | 336dp |
| Horizontal label alignment | Start-aligned |
| Left padding | 28dp |
| Right padding | 28dp |
| Active indicator padding | 12dp |
| Padding between elements | 0dp |

##### Modal navigation drawer

[Image: Modal navigation drawer with measurements shown for various elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma775z3o-6-3p-3p.png?alt=media&token=554989e5-00c1-4338-8ab8-df73927626e4)

_Element size measurements_

[Image: Modal navigation drawer with measurements shown for padding and margins.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma7769l7-7-3p-3p.png?alt=media&token=caaccf88-701f-44bf-bcb9-2569e95d000c)

_Padding and margins_

| Attribute | Value |
| --- | --- |
| Container height | 100% |
| Container width | 360dp |
| Icon size | 24dp |
| Active indicator height | 56dp |
| Active indicator shape | 28dp |
| Active indicator width | 336dp |
| Horizontal label alignment | Start-aligned |
| Left padding | 28dp |
| Right padding | 28dp |
| Active indicator padding | 12dp |
| Padding between elements | 0dp |

## Guidelines

starNote:The navigation drawer is no longer recommended in the Material 3 Expressive update. For those who have updated, use an expanded navigation rail (https://m3.material.io/m3/pages/navigation-rail/overview/), which has mostly the same functionality of the navigation drawer and adapts better across breakpoints.

[Image: Navigation drawer with 4 primary destinations](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopun3e-1.png?alt=media&token=220f8c9f-c032-4185-9a2c-4ac8950d763f)

#### Usage

Navigation drawers provide access to destinations and app functionality, such as switching accounts. They can either be permanently on-screen or opened and closed by a navigation menu icon. One navigation destination is always active.

Navigation drawers are recommended for:

- Apps with 5 or more top-level destinations
- Apps with 2 or more levels of navigation hierarchy
- Quick navigation between unrelated destinations
- Replacing the navigation rail or navigation bar on large screens

[Image: Navigation drawer with multiple destinations in a mail app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopv1qw-2.png?alt=media&token=a8455b6f-5918-42d9-aa1c-04d158c8eba1)

_Use a navigation drawer for 5 or more primary destinations, or more than 1 level of navigation hierarchy_

Avoid using a navigation drawer with other primary navigation components, such as a navigation bar.

Instead, choose a single navigation component based on product requirements and breakpoints:

- 

Navigation bars for compact breakpoints
- 

Navigation rails for medium and expanded breakpoints 
- 

Standard navigation drawers for expanded, large and extra-large breakpoints

[Image: Standard navigation drawer and navigation bar used together.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopvjco-3.png?alt=media&token=9df37deb-e7d3-4dea-88d1-b5b6a6040cab)

_Avoid using two navigation components on the same screen_

There are two variants of navigation drawers:

1. 

Standard navigation drawer
2. 

Modal navigation drawer

[Image: Standard navigation drawer with destinations in mail app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopw575-4.png?alt=media&token=0970e3a0-0963-4060-9aae-22d9e3689652)

_Standard navigation drawer_

[Image: Modal navigation drawer with destinations and scrim.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopwhen-5.png?alt=media&token=81d4f11e-1cba-4620-ba30-78d3cc70ab55)

_Modal navigation drawer_

##### Standard navigation drawer

Standard navigation drawers provide access to drawer destinations and app content for layouts in expanded, large, and extra-large breakpoints. 

Standard drawers can be permanently visible (best for frequently switching destinations) or opened and closed by tapping a menu icon (best for focusing more on screen content).

In medium and compact breakpoints, use modal drawers instead.

[Image: Standard navigation drawer in a mail app with active destination “Inbox” next to app content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopx4a0-6.png?alt=media&token=439663a8-dc1f-442d-a29a-54430caeb836)

_Standard navigation drawer providing access to drawer destinations next to app content_

##### Modal navigation drawer

Modal navigation drawers use a scrim to block interaction with the rest of an app’s content, and don’t affect the screen’s layout grid.

Modal navigation drawers can be used in any breakpoint, but are primarily used in compact and medium sizes where space is limited or prioritized for app content.

They can be swapped with standard drawers on expanded, large, and extra-large breakpoints.

[Image: Modal navigation drawer with 1 active destination and scrim.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopxvvj-7.png?alt=media&token=5d45f347-e521-48af-9ae9-d4c05965f42f)

_Modal navigation drawer using a scrim to block interaction with the rest of an app’s content_

Modal navigation drawers are always opened by an action outside of the drawer, such as clicking a navigation menu icon in a navigation rail.

Modal drawers can be dismissed by:

- Selecting a drawer item
- Tapping the scrim
- Swiping toward the drawer’s anchoring edge (for example, swiping right-to-left for a left-aligned navigation drawer)

[Image: Diagram noting a navigation menu icon in a navigation rail.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopy7b1-8.png?alt=media&token=5ea39e51-4a7b-4e9b-ad02-2fef81e461cd)

_A modal drawer opened by an action such as clicking a navigation menu icon (1)_

Modal drawers can be dismissed by tapping the scrim or swiping the drawer toward its anchoring screen edge.

[Image: 2 modal navigations illustrating tapping the scrim or swiping to dismiss a modal drawer](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopyjta-9.png?alt=media&token=3090bcc0-a205-4695-b11b-931243b71061)

_1. Dismiss by tapping the scrim
2. Dismiss by swiping the drawer_

#### Anatomy

Navigation drawers are essentially a list contained within a side sheet. They can also include headers, subheads, and dividers to organize longer lists.

[Image: Navigation drawer diagram numbering 8 elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwopzqbr-10.png?alt=media&token=4325d34c-753c-4cfa-8b60-fbf6aaa56358)

_Navigation drawers can include headers, subheads, and dividers to organize longer lists

1. Active Indicator
2. Icon
3. Label
4. Badge label
5. Sheet
6. Divider
7. Section label (optional)
8. Scrim_

##### Sheet

A sheet holds all navigation drawer elements. Side sheets are used as the container for standard and modal navigation drawers.

Navigation drawers that open from the side are always placed on the start edge of the screen, on the left for left-to-right (LTR) languages, and on the right for right-to-left (RTL) languages.

[Image: Modal navigation drawer opening from left side of screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq08ti-11.png?alt=media&token=fa4df5c4-43a7-4979-83dd-4a50c3c28454)

_A navigation drawer opens from the left side of the screen for left-to-right languages_

##### Divider (optional)

Dividers can be used to separate groups of destinations within the navigation drawer.

[Image: Navigation drawer using horizontal dividers to separate a group of destinations](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq1xf0-12.png?alt=media&token=1d041701-d74b-4495-a337-c858a9bd81b5)

_Use full-width dividers (1) to separate groups of destinations_

[Image: Navigation drawer using horizontal dividers to separate individual destinations](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq29df-13.png?alt=media&token=612b4caa-99c1-4c3b-a835-2c1ed0bda36a)

_Don’t use dividers to separate individual destinations_

##### Active indicator

The active indicator is a background shape communicating which destination of the navigation drawer is currently being displayed.

[Image: Navigation drawer diagram numbering 1 element.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq2qbs-14.png?alt=media&token=cefe950a-7624-4c32-a31d-3b596d729417)

_The active indicator (1) is a background shape communicating which destination of the navigation drawer is currently being displayed_

##### Label text and icons

Destinations in a navigation drawer take the form of actionable list items. Each item describes its destination using label text and an optional icon.

[Image: Navigation drawer diagram numbering 2 elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq358i-15.png?alt=media&token=ad709e8b-f932-4c40-a63c-cf893ff65b71)

_Actionable list items in a navigation drawer describe each destination using (1) an optional icon and (2) required label text_

Label text should be clear and short enough that it isn’t cut off by the sheet.

[Image: Navigation drawer using only label text for 4 destinations. Label text “Inbox” in active destination.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq3i6v-16.png?alt=media&token=e855eb07-211a-44ba-a56f-9414dce6237b)

_Navigation drawers can use text labels without icons_

[Image: Navigation drawer with 1 truncated text label.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq4gjj-17.png?alt=media&token=44f71647-6325-43c9-b93e-6a3bc059ae87)

_Keep text labels concise, but truncate them if they extend beyond the container width_

[Image: Navigation drawer with 1 text label with wrapped label text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq4tkk-18.png?alt=media&token=c152a72c-b231-4f97-81aa-1b14d827c8b9)

_Don’t wrap label text_

[Image: Navigation drawer with 1 text label featuring smaller text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq56gb-19.png?alt=media&token=218c541f-0e68-40b4-bf8c-59983f554512)

_Don’t shrink text size in order to fit a text label on a single line_

Icons can supplement labels as indicators of a destination. When used, they should always be placed before text. Other app components and content should reference these icons.

[Image: Navigation drawer with active destination “Inbox” featuring recognizable icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq67nf-20.png?alt=media&token=f5cdaabd-b70e-495e-9d1e-5cce1e0bb81d)

_Use recognizable icons when conventions exist_

[Image: Navigation drawer with 4 destinations, 2 with text label and icon, 2 with only text label.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq6mto-21.png?alt=media&token=70a07030-1191-4f84-9e14-19c188d0452b)

_Don’t apply icons to some destinations and not others. Icons should be used for all destinations, or none._

##### Section label (optional)

Short subhead section labels can help group related destinations in the navigation drawer.

[Image: Navigation drawer showing subhead section labels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq710s-22.png?alt=media&token=f9fc1eb9-1347-4515-bf7f-461d9100c605)

_Related destinations can be grouped using short subhead section labels in the navigation drawer_

##### Scrim (modal only)

Modal navigation drawers use a scrim to block interaction with the rest of the app. The scrim is placed directly behind the drawer’s sheet and can be tapped or clicked to dismiss the drawer.

[Image: Modal navigation drawer with scrim placed behind.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq7esu-23.png?alt=media&token=41cf34a6-52f4-48ad-8408-16f71ce0b744)

_Scrim applied behind a modal navigation drawer_

#### Responsive layout

A product’s navigation component should change to suit the breakpoint and form factor of the screen.

Modal navigation drawers can be used at any breakpoint but are most common in compact and medium breakpoints.

Standard navigation drawers are best for expanded, large, and extra-large breakpoints. 

Use a transition when swapping components. For example, when switching from a portrait to landscape layout, the navigation rail should transform into a navigation drawer.

[Image: Navigation rail changing to navigation. drawer on a larger screen](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq7wck-24.png?alt=media&token=2e030b27-4348-4860-aac6-78e423e11c79)

_Standard navigation drawers change size to suit the device’s screen_

##### Compact breakpoint

Use modal navigation drawers in compact breakpoints. Or swap the drawer for a navigation bar.

On web, when the screen size is smaller than 320 CSS pixels, swap the navigation drawer for a navigation bar to ensure accessibility.

[Image: Modal navigation drawer with 1 active destination.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoq8evf-25.png?alt=media&token=ef3a29d1-8e04-4b51-9774-8c7f118fbad4)

_Use a modal navigation drawer on mobile screens_

##### Medium & expanded breakpoints

Use a modal navigation drawer alone or with a navigation rail on medium and expanded breakpoints.

When a navigation rail and modal navigation drawer are used together, the drawer can repeat destinations in the navigation rail as long as the drawer offers enough visual separation between levels of the navigation hierarchy.

A standard navigation drawer can be used in single pane layouts (https://m3.material.io/m3/pages/understanding-layout/parts-of-layout) in expanded breakpoints.

[Video: Navigation drawer on tablet with 1 active destination.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoqh0d1-GM3-Components-NavDrawer-Guidelines-1-v01.mp4?alt=media&token=dbffbe2f-e8e7-4434-b4ab-c0d41e2068ad)

_Use a navigation rail on tablet screens, or also allow a drawer to open and close via a menu icon_

##### Large and extra-large breakpoints

For web experiences on laptop and desktop devices, use either a standard navigation drawer, or a navigation rail that transitions into a modal navigation drawer.

[Image: Navigation drawer showing 1 active destination.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx54v3bi-27.png?alt=media&token=444359b1-1e21-4971-b70d-bc624d900b19)

_Use a standard navigation drawer on large and desktop screens_

#### Behavior

##### Scrolling

Navigation drawers can be vertically scrolled, independent of the rest of the screen’s content and UI. If the list of navigation destinations is longer than the height of the drawer, the drawer’s contents can be scrolled within the drawer.

[Video: A navigation drawer on the left region of an email app is scrolled vertically without disturbing the rest of the content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoqihhy-GM3-Components-NavDrawer-Guidelines-2-v01.mp4?alt=media&token=f5dbf149-2261-4a0f-988d-d72cc2c6a093)

_When a navigation drawer is scrolled, the body content should remain stationary_

##### Visibility

**Dismissible standard drawers** can be used for layouts that prioritize content (such as a photo gallery) or for apps where users are unlikely to switch destinations often. They should use a visible navigation menu icon to open and close the drawer.

[Image: Side-by-side standard navigation drawer opened and then closed after tapping menu bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoqb1nm-27.png?alt=media&token=ed09af6e-928f-41f7-a7ca-fcf766ea4050)

_A standard dismissible navigation drawer is opened and closed by tapping the navigation menu icon in the app bar (1), and remains open until the menu icon is tapped again (2)_

**Permanently visible standard drawers** allow quick navigation between unrelated destinations. They can’t be closed or dismissed by the user.

[Image: Standard navigation drawer moving between destinations.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoqf0gp-28.png?alt=media&token=627872b2-dc97-4b2c-8234-2339a7730b18)

_A permanently-visible standard navigation drawer on desktop_

##### Appearing

When a navigation drawer animates on screen, it uses an enter and exit (https://m3.material.io/m3/pages/motion-transitions) transition pattern.

[Video: In an email app, navigation drawer opens on menu icon click, and closes on outside click.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoqk3j4-GM3-Components-NavDrawer-Guidelines-3-v01.mp4?alt=media&token=0f92a1ef-5990-4cfc-a8c0-932477d20478)

_A navigation drawer animating on screen_

## Accessibility

starNote:The navigation drawer is no longer recommended in the Material 3 Expressive update. For those who have updated, use an expanded navigation rail (https://m3.material.io/m3/pages/navigation-rail/overview/), which has mostly the same functionality of the navigation drawer and adapts better across window size classes.

#### Use cases

Users should be able to: 

- Move between navigation destinations with assistive technology
- Select a particular navigation destination from a set
- Get appropriate feedback based on input type

#### Interaction & style

**Touch**

- When a navigation item is tapped, the active indicator appears in place, providing feedback to the user that it is selected
- A touch ripple passes through the indicator
- The icon switches from outlined to filled
- The icon changes color, becoming darker

[Video: Active indicator and other visual cues appear when nav drawers are tapped.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoqqvsf-GM3-Components-NavDrawer-Accessibility-1-v01.mp4?alt=media&token=18c8c980-08e4-4182-86ec-63c02b1c4470)

_Touch: Tap_

**Cursor**

- When hovered, the hover indicator appears providing a visual cue that the destination is interactive
- When clicked, a ripple passes through the indicator
- The icon switches from outlined to filled
- The icon changes color, becoming darker in light theme and lighter in dark theme, to increase the contrast

[Video: When a cursor goes over a navigation drawer, a hover indicator appears. When tapped, the active indicator appears.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoqr8nd-GM3-Components-NavDrawer-Accessibility-2-v01.mp4?alt=media&token=97004b66-7c1e-4ff2-84a3-fd791bb5e348)

_Cursor: Hover, Click_

#### Initial focus

Initial focus lands directly on the first navigation item, since that is the first interactive element of the component.

[Image: 1. Tab lands on the first navigation item, Inbox. 2. Down arrow to get to the second navigation item, Outbox.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flworf9hl-3.png?alt=media&token=1bb331b2-e914-4668-baec-8accae5b6fd6)

_Focus lands on first navigation item_

#### Closing

The modal navigation drawer can be dismissed by selecting the scrim that covers the rest of the screen.

[Image: A navigation drawer with a scrim covering the body content. A touch target is selecting the scrim.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm36co6ff-navdrawer-tablet-do-md.png?alt=media&token=852f7a22-fb45-4eee-89e8-ab411fad1a65)

_Select the scrim to close the navigation drawer_

#### Visual indicators

Icons are the primary focus of the navigation and such give the dominant cue of its state. Use a filled icon for the selected destination to differentiate from the outlined icons of non-selected destinations.

[Image: Space + enter is used to select the navigation item inbox.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flworgt4a-4.png?alt=media&token=6afa4fd0-0c68-4f18-9553-84c516c0c6b2)

_The navigation item is selected via **Space**/**Enter**_

[Image: A navigation drawer with the home destination using a filled icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flworfw7l-5.png?alt=media&token=d33e2758-6076-4012-933b-ce1dde9c539f)

_Use a filled icon for the selected navigation destination to differentiate from the other destinations_

[Image: A navigation drawer with the home destination using an outlined icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flworg85u-6.png?alt=media&token=6cd4cfa6-ec1a-40c4-95f3-ba4efc6de9e1)

_Avoid keeping the icon style for the selected navigation destination the same as unselected destination's icons. This removes an important visual indicator of which destination is active._

[Image: A selected home icon using a filled icon and active indicator and a unselected home icon using an outlined icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flworh5ui-7.png?alt=media&token=1b7a06eb-1f35-4b4f-b1d3-82500203e58b)

_When selected, the icon fills, darkens in light theme (or lightens in dark theme), and is backed by an active indicator shape_

#### Keyboard navigation

| **Keys** | **Actions** |
| --- | --- |
| Tab | Focus lands on the first navigation destination |
| Space or Enter | Selects the focused navigation destination, and focus moves to the newly opened section (if applicable) |
| Arrow | Navigate between destinations within the navigation drawer |

#### Labeling elements

The accessibility label for a navigation item is typically the same as the destination name.

If the UI text is correctly linked, assistive tech (such as a screenreader) will read the UI text followed by the component’s role.

For Android Views (MDC-Android), a more descriptive accessibility label is not available to be set and the role is not announced.

[Image: A navigation drawer item’s label text and accessibility label both read “photos.” The role is “tab.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flworho52-8.png?alt=media&token=7fb90305-fda9-43bf-a909-b1d9f9e64d05)

_A navigation drawer’s accessibility label can incorporate its adjacent UI text_

When the visible UI text is ambiguous, accessibility labels need to be more descriptive. For example, a navigation destination visibly labeled **Recents** would benefit from additional information in its accessibility label to clarify the destination’s intent.

[Image: A navigation drawer item’s label text is “recents”, the accessibility label is “recent images.” The role is “tab.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwori08q-9.png?alt=media&token=816c8f24-84d7-44bd-8578-eaf00de09d6d)

_While the visible label text reads **Recents,** the accessibility label for this destination clarifies its function: **Recent images**_
