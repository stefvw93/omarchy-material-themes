# FABs

Source: <https://m3.material.io/components/floating-action-button> (content version 2026-09-23_06-10-05, page updated 2026-07-27T13:59:42.096Z)

## Overview

- 

Use a FAB for the most common or important action on a screen
- 

Make sure the icon in a FAB is clear and understandable
- 

FABs persist on the screen when content is scrolling
- 

Three variants: FAB, medium FAB, large FAB

[Image: The 3 sizes of floating action buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkap9gay-01.png?alt=media&token=e8e925f7-45d2-4db6-8bfb-31ea3248ae1e)

_1. 

FAB
2. 

Medium FAB
3. 

Large FAB_

#### Availability & resources

#### M3 Expressive update

**May 2025**

The FAB has new sizes to match the extended FAB and more color options. The small FAB is no longer recommended. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

Variants and naming:

- 

Added **medium** FAB size
- 

**Small** FAB size is no longer recommended
- 

FAB and large FAB sizes are unchanged
- 

FAB variants are based on size, not color

Color:

- 

Added tone color styles: 

  - 

Primary
  - 

Secondary
  - 

Tertiary

- 

Renamed existing tonal color styles to match their token names: 

  - 

**Primary** to **Primary container**
  - 

**Secondary** to **Secondary container**
  - 

**Tertiary** to **Tertiary container**
  - 

The values haven't changed

- 

Surface color FABs  are no longer recommended

[Image: 4 FABs showing the colors available after the expressive update.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc68z96-02.png?alt=media&token=7cf55ab6-acc3-44b1-8c1d-1291e0357739)

_FABs have updated colors and sizes_

#### Differences from M2

[Image: M2 circular FAB with a plus icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc69mae-03-3P.png?alt=media&token=afcabba4-1475-4c47-9bbe-1270d37b9a5b)

_M2: FABs are circles and always have a drop shadow_

[Image: M3 rounded corner square FAB with an artist’s palette icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6a5yd-04.png?alt=media&token=c710942d-d229-4b16-8eb1-f72cd22c8753)

_M3: FABs have a boxier shape, can use dynamic color, and include a new large FAB variation_

## Specs

#### Variants

[Image: An icon on the container of a FAB, medium FAB, and large FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6atia-01-3P.png?alt=media&token=2f73681d-69d8-4486-a35b-e3e28c1eaa41)

_1. FAB
2. Medium FAB
3. Large FAB_

##### Baseline variants

The small FAB is still available, but no longer recommended. Jump to baseline specs (https://m3.material.io/m3/pages/fab/specs#cd336045-e97d-4a6d-ac23-f778fa695e3c)

[Image: An icon on the container of a small FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6bkq8-02-3P.png?alt=media&token=00146424-866a-4818-b7a1-f65a6214d47e)

_1. Small FAB_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| FAB | Available | Available |
| Medium FAB | -- | Available |
| Large FAB | Available | Available |
| Small FAB | Available | Not recommended. Use a larger size. |

#### Configurations

In the expressive update, the **primary**, **secondary**, and **tertiary** set colors were renamed to **primary container**, **secondary container**, and **tertiary container **to match the actual color roles used. New primary, secondary, and tertiary color styles were created to match the corresponding color roles. View details in the color styles section (https://m3.material.io/m3/pages/fab/specs#67e71ec7-b520-405a-aa06-2decfa0b92a3)

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Color | Primary container, secondary container, tertiary container | Available as primary, secondary, tertiary | Available |
| Primary. secondary, tertiary | -- | Available |  |

#### Tokens & specs

Use the table's menu to select a token set. FAB tokens are organized by size and color. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Token table: see ../tokens/TOKEN_TABLE.41587918e51cca98.md]

#### Anatomy

[Image: 2 elements of the FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6cml8-03-3P.png?alt=media&token=b76c428a-d4ed-4ec1-b6ab-cdec99f0afff)

_1. Container

2. Icon_

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. In implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens)

##### Color styles

FABs can use several combinations of **color** and **on-color** styles, such as **primary** and **on-primary**. The following color mappings provide the same legibility and functionality, so the color mapping you use depends on style alone.

[Image: 6 FAB color styles in light and dark themes. Each style has 2 color roles, 1 for the container and icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6diiz-04-3P.png?alt=media&token=d50706b5-2254-4cd5-afb1-852c728e47b2)

_1. Primary container & On primary container (default)
2. Secondary container & On secondary container
3. Tertiary container & On tertiary container
4. Primary & On primary
5. Secondary & On secondary
6. Tertiary & On tertiary_

##### Baseline color styles

Surface FAB color styles are still available, but no longer recommended.

[Image: Baseline FAB style in all 3 sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6empp-05-3P.png?alt=media&token=63065aac-7292-44cb-be02-7632eba1af38)

_1. 

Surface FABs_

#### States

States are visual representations used to communicate the status of a component or interactive element.

When using a non-default color mapping for FABs, make sure the state layer color is the same as the icon color. For example, the state layer color for the **primary** color style should be md.sys.color.primary.

[Image: 4 states of a FAB shown in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6fdu1-06-3P.png?alt=media&token=ef3a63fe-b331-4553-a51a-f1e0ca0c3b9b)

_1. Enabled
2. Hovered (8% state layer) - elevation 4
3. Focused (10% state layer)
4. Pressed (10% state layer)_

#### Measurements

##### FAB

[Image: FAB size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6fz4n-07-3P.png?alt=media&token=de1a1525-dae3-446e-8546-21b8320985ce)

_FAB size measurements_

[Image: FAB padding measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6gdhg-08-3P.png?alt=media&token=816f05ba-1ad7-4d96-a205-d86e3be8772e)

_FAB padding measurements_

##### Medium FAB

[Image: Medium FAB size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6gu0p-09-3P.png?alt=media&token=26b5fc9c-0d30-48cb-abc9-724ec0b42f3e)

_Medium FAB size measurements_

[Image: Medium FAB padding measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6ha1z-10-3P.png?alt=media&token=07048e86-e793-4f9e-98d7-816d1c2292dd)

_Medium FAB padding measurements_

##### Large FAB

[Image: Large FAB size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6hrgc-11-3P.png?alt=media&token=bb7d4869-9309-4cde-b2f7-824004d2f429)

_Large FAB size measurements_

[Image: Large FAB padding measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6i508-12-3P.png?alt=media&token=d1de97fa-e91b-40c9-aff1-63fcd3535ebb)

_Large FAB padding measurements_

#### Baseline tokens & specs

Use the table's menu to select a token set. This only includes tokens for small and surface FABs, which are both no longer recommended. It doesn't include other colors, or large or regular FABs, since those are still currently used.

[Token table: see ../tokens/TOKEN_TABLE.41587918e51cca98.md]

## Guidelines

[Image: 3 screens with various FAB sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkapod2e-01.png?alt=media&token=2371fb7d-a6b0-4648-9023-ad1a1b7f96f1)

_FABs have multiple sizes that scale with the breakpoint_

#### Usage

Use a FAB for the most important action on a screen; it appears in front of all other content.

The FAB can be aligned left, center, or right. It can be positioned above the navigation bar, or nested within it.

[Image: A Compose FAB is positioned above a nav bar on a mobile email inbox.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkapp0w4-02.png?alt=media&token=241a9e04-8ed7-4df1-8eb7-c389ab51362c)

_FABs can use dynamic color_

There are three FAB sizes:

1. 

FAB
2. 

Medium FAB (most recommended)
3. 

Large FAB

Choose the FAB size based on the visual hierarchy of your layout. 

Note: The small FAB is no longer recommended.

[Image: 3 FAB sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkappjdx-03.png?alt=media&token=a21e240b-8ff5-4959-a8e3-8d002d19ab0b)

_1. FAB 
2. Medium FAB
3. Large FAB_

The FAB is the smallest size, and is best used in compact windows where other actions may be present on screen.

The medium FAB is recommended for most situations, and works best in compact and medium windows. Use it for important actions without taking up too much space. 

A large FAB is useful in any window size when the layout calls for a clear and prominent primary action, but is best suited for expanded and larger breakpoints, where its size helps draw attention.

[Image: A medium FAB over an email app UI.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkapq84r-04.png?alt=media&token=3ac65358-559c-4725-b887-7c7de2881712)

_Use a medium FAB in most breakpoints_

[Image: A large FAB over an email app UI.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkapqn1b-05.png?alt=media&token=5e6372d1-3c98-40d6-b521-d103604d221f)

_Use a large FAB when the primary action needs to be prominent_

[Image: A photo feed with no FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkapr8x3-06-do.png?alt=media&token=362c34fb-d2cf-4c87-b970-68d508cd0628)

_FABs are not needed on every screen, such as when images represent primary actions_

[Image: A screen with 3 FABs makes it hard to tell what the primary action should be.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaps2z9-07-don't.png?alt=media&token=6a7e9640-e3f3-4bdd-a06f-fd85cd7d184b)

_Don't display multiple FABs on a single screen_

A FAB can transform into an extended FAB on larger screens, or it can transition into a FAB menu when selected. Use a FAB menu when there are many kinds of actions relevant to the FAB. 

More on FAB menus (https://m3.material.io/m3/pages/fab-menu)

[Image: A extended FAB saying “Share” with a less popular share icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6tcz8-08.png?alt=media&token=c6d0cbd2-c2d4-4056-893e-ccaa0c5a7ebc)

_Use the extended FAB when label text is necessary_

[Image: A FAB menu showing 3 actions related to sharing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkc6uyqo-09.png?alt=media&token=75154982-3fd8-4bde-8d3d-4470c055591f)

_Use the FAB menu when there are many kinds of actions relevant to the FAB_

#### Actions

A FAB can trigger an action on the current screen, or it can perform an action that creates a new screen.

A FAB promotes an important, constructive action such as:

- Create
- Favorite
- Share
- Start a process

[Image: FABS for 12 common actions including, create, edit, and navigate.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaptzjv-10.png?alt=media&token=6feee690-87e8-42b2-b91e-6bc024c92add)

_Use FABs for primary, positive actions_

Avoid using a FAB for minor or destructive actions, such as:

- 

Archive or trash
- 

Alerts or errors
- 

Limited tasks like cutting text
- 

Controls better suited to a toolbar, like to adjust volume or font color

[Image: FABs for 18 minor or destructive actions, such as cut, trash, and volume.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkapug9u-11.png?alt=media&token=1fa984f4-3e7a-4960-ae4c-2c44611a7ec5)

_Don’t use FABs for minor, overflow, unclear, or destructive actions_

#### Anatomy

[Image: 2 elements of a FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkapv2og-12.png?alt=media&token=3686bf12-1656-4350-ae10-e8f104d287bb)

_1. Container
2. Icon_

##### Container

The FAB is typically displayed in a square container. The container shouldn’t be covered by other elements, such as badges.

The container must have sufficient color contrast with the surface it’s placed on.

[Image: A bright colored FAB has high contrast with the background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaq0msf-13.png?alt=media&token=34c9472a-9ed8-4db3-990e-84433d0b6331)

_A FAB container color needs to stand out from its background_

##### Icon

An icon in a FAB should be clear and understandable. When hovering over a FAB on web products, FABs should display a tooltip with an accompanying icon text label. Use a filled icon instead of an outlined icon.

A FAB shouldn't contain notifications or actions found elsewhere on a screen.

[Image: 4 FABs each with a simple icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaq1779-14.png?alt=media&token=d381cf06-0f9b-41bf-91bb-e199ebfc8769)

_Use clear and simple icons such as add, message, or edit_

[Image: 4 FABs each with an ambiguous icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaq1wxv-15.png?alt=media&token=6e1889bc-265d-4896-8a2d-63cca01c2252)

_Don’t use confusing or open-ended icons to symbolize less common actions_

#### Adaptive design

In compact and medium breakpoints, the best place for the FAB is typically the lower right corner of a screen, since it’s easy to reach and is less likely to cover important content.

In expanded breakpoints, consider placing the FAB in the upper left corner, like in the navigation rail. This positions it as one of the first interactive elements people see when they land on the page.

Adjust the size of the FAB based on the context. Use a medium FAB for mobile layouts, and large FAB for tablets and large screens.

[Image: Large screen layout showing FAB in upper left region of the screen, below navigation rail icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaq2b6m-16.png?alt=media&token=f8d3f99a-25ef-44c6-9dc8-78a71f64e587)

_For large screens, place the FAB in the upper left corner_

[Image: A screen layout with several interactive elements. A single FAB is in the navigation rail.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaq2qmb-17.png?alt=media&token=4028106d-daa4-4cfb-b4a3-ef0e0c9fb96d)

_A FAB can be used within a navigation component, such as a navigation rail_

[Image: A busy screen layout with 8 cards, each with their own FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaq35yc-18.png?alt=media&token=5b375eb2-c9ea-4324-bdcb-09444f227ca8)

_Individual components, such as cards, shouldn’t have their own FAB_

#### Behaviors

##### Appearing

When a FAB animates on screen, it expands outward from a central point. The icon within it can be animated as well.

While FABs should be relevant to screen content, they aren't attached to the surface on which content appears. FABs move separately from other UI elements because of their relative importance.

**Screen transitions 
**FABs can morph to launch related actions. When a screen changes its layout, the FAB should disappear and reappear during the transition.

**Reappearance 
**The FAB should only reappear if it's relevant to the new screen. It should reappear in the same position, if possible.

[Video: FAB appearing from the bottom of the screen, moving to a position above the navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0e6834q-FAB-A.mp4?alt=media&token=3303d91a-c26c-400a-a37a-305bc593a712)

_FAB animating on screen_

##### Expanding

The FAB can expand and adapt to any shape using a container transform transition pattern. This includes a surface that's part of the app structure, or a surface that spans the entire screen.

The FAB can also transition into a FAB menu. 

More on FAB menus (https://m3.material.io/m3/pages/fab-menu)

[Video: Compose FAB expands to container size, opening a draft email screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm1l6g0wn-FAB-B-1.mp4?alt=media&token=3f9e67e3-57be-4f71-9776-0538f57dc409)

_FABs can expand and adapt to any shape_

##### Scrolling

FABs remain in place on scroll.

Extended FABs can collapse into a FAB on scroll and expand on reaching the bottom of the view.

[Video: Extended FAB collapsed into a FAB when scrolling on the page.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm1l6g857-FAB-C_1.mp4?alt=media&token=cf8f18fe-f1c9-487d-87d5-079c08e7df7c)

_FABs stay in place above a scrolling background_

##### Moving across tabs

When tabs are present, the FAB should briefly disappear, then reappear when the new content moves into place. This shows that the FAB is not connected to any particular tab.

[Video: FAB blinks away and reappears with new screen content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd8w19ca-GM3_Expressive_FAB_Guidelines_FAB-D_v02.mp4?alt=media&token=750535f4-7bba-4d54-bfb1-6dd82c944b39)

_The FAB should disappear and reappear when switching pages_

Don't animate the FAB with body content.

[Video: FAB moves horizontally when scrolling between tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd8w1k06-GM3_Expressive_FAB_Guidelines_FAB-E_v02.mp4?alt=media&token=603fbf2b-e9a0-444f-bcdb-efdb990b8271)

_Don’t keep the FAB on screen when switching pages_

## Accessibility

#### Use cases

People should be able to do the following using assistive technology:

- 

Navigate to and activate the FAB 
- 

Perform an action with the FAB 
- 

Expand and minimize an extended FAB

#### Interaction & style

Don't disable the FAB. If the action represented in the FAB is unavailable, the FAB shouldn't appear.

Ensure the icon has a minimum 3:1 contrast ratio with the container.

[Image: FAB with highly contrasting bright container and dark icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalo050e-1.png?alt=media&token=629253b6-a62b-4c25-87fb-42aaf3c80457)

_FAB icons are above the 3:1 contrast ratio_

[Image: FAB with low-contrasting dark container and dark icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalo08ew-2.png?alt=media&token=ab0762a5-4c94-484c-bfd8-93529cb6309b)

_Avoid using colors with a contrast below 3:1_

#### Focus

Ensure the FAB is prioritized in the overall focus order to create an efficient experience for people who navigate UIs with assistive tech. 

On mobile, the focus order may start with the app bar, move to the navigation bar, and then skip past any other content on the page to land on the FAB.

Consider displaying a tooltip when the FAB is focused. This is supported on web.

[Image: A focused FAB with a tooltip saying “Compose” appearing below it.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaqbeez-03.png?alt=media&token=b4e21a7b-5097-4c6b-95b9-83953c9baf7e)

_Tooltips surface the FAB’s label when focused_

#### Layout & position

To make it easier for users of screen readers to reach a primary action such as a FAB on expanded breakpoints, consider placing the FAB in the upper left region. 

However, it’s critical to test placement options with users to see if the upper left region is the best position in all browser windows. For compact and medium breakpoints, the best place for the FAB is the lower right corner of a screen.

[Image: FAB in the lower right region of a small screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaqbxv8-04.png?alt=media&token=c3a789b3-1207-4157-a96c-49aeba908511)

_In compact windows, place the FAB in the bottom trailing edge_

[Image: FAB in the upper left region of a large screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaqcdup-05.png?alt=media&token=f735b608-ff59-4ef5-b166-b7ab5542cb36)

_In expanded windows, place the FAB in the navigation rail_

To ensure accessibility for keyboard users on the web, avoid positioning the FAB in a way that completely obscures the focus indicator of an actionable element. 

It’s okay to partially cover the desired element, as long as the focus indicators are still visible.

[Image: FAB in the lower right region doesn’t obscure the focus indicator of an actionable icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaqcwm1-06.png?alt=media&token=4f93ecbf-6872-4178-baf9-9d2ab17ede1c)

_The FAB can partially cover an actionable element, as long as the focus indicator is still clearly visible_

[Image: FAB in the lower right region obscures an actionable icon and its focus indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkbecw5o-07.png?alt=media&token=2ead9370-39e9-4c15-b531-c63385f17621)

_Don’t completely obscure an actionable element and its focus indicator_

#### Keyboard navigation

| **Keys** | **Actions** |
| --- | --- |
| **Tab** | Focus lands on the FAB |
| **Space** or **Enter** | Perform the default action on an item |

#### Labeling elements

The accessibility label should describe the action that the button is performing, such as **Compose a new message**.

[Image: Accessibility label and accessibility role of a FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmkaqdy3m-08.png?alt=media&token=c5296e63-0972-4391-8fc3-4577544c8c31)

_The accessibility label of the FAB with a pencil icon describes the action of composing a new message_
