# Navigation bar

Source: <https://m3.material.io/components/navigation-bar> (content version 2026-09-23_06-10-05, page updated 2026-07-28T07:36:27.700Z)

## Overview

- 

Use navigation bars in compact or medium window sizes
- 

Can contain 3-5 destinations of equal importance
- 

Destinations don't change. They should be consistent across app screens.

[Image: Two navigation bars of different widths with 4 destinations.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fodjau-01.png?alt=media&token=2a83f14e-464f-4f96-9c01-eb770d98010e)

_Navigation bar for compact and medium window sizes_

#### Availability & resources

#### M3 Expressive update

**May 2025**

A new flexible navigation bar was introduced to replace the baseline navigation bar. It’s shorter and supports horizontal navigation items in medium windows. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

Variants and naming:

- 

Baseline navigation bar is no longer recommended 
- 

Added **flexible **navigation bar

  - 

Shorter height
  - 

Can be used in medium window sizes with horizontal navigation items

Color:

- 

Active label changed from **on-surface-variant** to **secondary**

[Image: Navigation bar in M3 Expressive. It’s shorter than the baseline nav bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmae7qe43-02.png?alt=media&token=52cdfa5b-8a10-45d5-af7c-0a92cc899672)

_The flexible navigation bar is shorter and can be used in medium windows with horizontal nav items_

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color
- Elevation: No shadow
- Layout: Container height is taller 
- States: The active destination can be indicated with a pill shape in a contrasting color
- Name: Bottom navigation has been renamed **navigation bar**

[Image: M2 nav bar with a drop shadow and no active indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0ddmjvm-03.png?alt=media&token=9e50be86-5460-46f5-90a7-0805ec3c9127)

_M2: A drop shadow indicates placement on top of content. Filled and regular weight icons indicate active states._

[Image: M3 nav bar with a surface color and active indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmae7pvz8-04.png?alt=media&token=98531a7d-df77-4d8e-a56b-7164db497bd9)

_M3: Taller and no drop shadow. Filled icons and an active indicator indicate active state._

## Specs

#### Variants

[Image: The recommended flexible navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3onczd-01.png?alt=media&token=c6b6040c-4cb3-43bd-a7ae-7ed99ed6ae5f)

_1. Flexible navigation bar_

##### Baseline variants

The baseline nav bar is no longer recommended, and should be replaced by the flexible nav bar, which is shorter and supports horizontal navigation items in medium windows. View baseline nav bar specs (https://m3.material.io/m3/pages/navigation-bar/specs#46dc2521-acf0-44e3-bbc0-78dc225b9749)

[Image: 1 baseline navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkq5ef63-02-3P.png?alt=media&token=fa54cab6-245c-4733-acaa-c347531501cf)

_1. 

Navigation bar (not recommended)_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Flexible navigation bar | -- | Available |
| Navigation bar | Available | Not recommended. Use **flexible navigation bar**. |

#### Configurations

In compact windows, navigation bars use vertical items. In medium windows, navigation bars should use horizontal items.

[Image: Two size configurations for navigation bar and items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3oovxg-7.png?alt=media&token=b9d08a75-97c1-4081-801e-182ef6eff927)

_1. Vertical navigation items

2. Horizontal navigation items_

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Navigation item layout | Vertical (default) | Available | Available |
| Horizontal | -- | Available |  |

#### Tokens & specs

Use the table's menu to switch between token sets for the navigation bar and the nav items.  (https://m3.material.io/m3/pages/navigation-bar/specs#3425f33a-0b11-492a-ae5a-40d63f939384)Learn about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Token table: see ../tokens/TOKEN_TABLE.52865380210a9b69.md]

#### Anatomy

[Image: Seven elements of the navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3opmda-1.png?alt=media&token=b21e5714-91c3-48e2-8160-989f3cd62304)

_1. Container

2. Icon

3. Label text

4. Active indicator

5. Small badge (optional)

6. Large badge (optional)

7. Large badge label_

#### Color

Color values are implemented through design tokens. For designers, this means working with color values that correspond with tokens; in implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Six color roles of the navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3oqa88-05.png?alt=media&token=c1c5220f-00fe-4af9-84a0-4be55a1696a0)

_Navigation bar color roles used for light and dark schemes:

1. Surface container

2. On-secondary container

3. Secondary

4. Secondary container

5. On-surface variant

6. On-surface variant_

For badge color roles, go to badge specs (https://m3.material.io/m3/pages/badges/specs).

#### States

States are visual representations used to communicate the status of a component or an interactive element.

[Image: Four states of the navigation bar items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmah8b097-3.png?alt=media&token=a4fbdf79-02ec-429c-8fe2-bbbbb6060b53)

_1. Enabled

2. Hovered (8% state layer)

3. Focused (10% state layer)

4. Pressed (10% state layer)_

#### Measurements

The navigation bar stretches the full window width.

[Image: Navigation bar padding and size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3ovtkk-5.png?alt=media&token=0728e092-f6bd-4ebd-b9d0-00eb4d9e6e4e)

_Navigation bar padding and size measurements_

Vertical navigation items dynamically change width to equally fit the container. Horizontal navigation items have a fixed width, so extra space is added to the ends of the navigation bar instead.

[Image: Navigation bar and item widths.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3owffv-6.png?alt=media&token=1d3f41df-5b3e-43e1-b300-55ca57878008)

_Navigation bar width and margins for compact and medium windows.

1. Vertical navigation item

2. Margin from window edge
3. Horizontal navigation item_

#### Baseline navigation bar

[Image: 7 elements of baseline navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3ox4jl-3p_nav-bar_anatomy.png?alt=media&token=3331837b-38d7-4348-8309-dd351c92e315)

_1. Container

2. Icon

3. Label text

4. Active indicator

5. Small badge

6. Large badge

7. Large badge label_

##### Tokens & specs

These tokens are for the baseline navigation bar.

[Token table: see ../tokens/TOKEN_TABLE.52865380210a9b69.md]

##### Color

Color values are implemented through design tokens. For designers, this means working with color values that correspond with tokens; in implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 6 color roles of baseline navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3oxof4-3p_nav-bar_color.png?alt=media&token=83b54af5-d6c4-4d49-9767-378ca90f188f)

_Navigation bar color roles used for light and dark schemes:

1. Surface

2. On secondary container

3. On surface

4. Secondary container

5. On surface variant

6. On surface variant_

For badge color roles, go to badge specs (https://m3.material.io/m3/pages/badges/specs).

##### States

States are visual representations used to communicate the status of a component or an interactive element.

[Image: 4 states of baseline navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmamkex4k-11-3P.png?alt=media&token=4a126b4d-9b65-4afe-9166-580a25fbdde6)

_Navigation bar states: 

1. Enabled 

2. Hovered 

3. Focused 

4. Pressed_

#### Measurements

[Image: Baseline navigation bar padding and size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmamkf93e-12-3P.png?alt=media&token=f86a7f01-46be-421b-93f1-751cf528b763)

_Navigation bar padding and size measurements_

[Image: Baseline navigation bar target size and margins.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmamkhglx-13-3P.png?alt=media&token=f19f2b64-055b-4663-8243-f0e0fff8887c)

_Navigation bar target size and margins_

#### Configurations

[Image: 3 configurations of the baseline navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3ozytu-3p_nav-bar_config.png?alt=media&token=81af67b1-6ff4-4eeb-8ae5-7cc46db34645)

_1. 3 destinations

2. 4 destinations

3. 5 destinations_

## Guidelines

[Image: A nav bar with vertical items in a compact window, and horizontal items in a medium window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqgvk7-01.png?alt=media&token=48551963-9645-437c-acea-853e04e8cdaf)

_Navigation bars adapt to different breakpoints_

#### Usage

Navigation bars provide access to three to five destinations. The nav bar is positioned at the bottom of windows for convenient access.

Each destination is represented by an icon and label text. One navigation destination is always active.

When a navigation bar icon is tapped or focused, people are taken to the navigation destination associated with that icon.

[Image: A nav bar for a music app with 4 destinations: Home, Browse, Radio, Library, It’s in a compact window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalnqdza-02.png?alt=media&token=a7e4f1a8-0547-42b2-81d1-c4346b1915db)

_Navigation bars can have three to five destinations_

Navigation bars should be used for:

- Three to five main pages in the product
- Mobile or tablet only

Navigation bars shouldn’t be used for accessing single tasks, such as viewing one email.

[Image: A nav bar for a music app with 4 destinations: Home, Browse, Radio, Library. It’s in a medium window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqhln7-03.png?alt=media&token=ec2bca60-87ec-4f27-a235-d872f5e6792d)

_On mobile or tablet, navigation bars should be used for top-level destinations_

The navigation items can be **vertical** or **horizontal**.

- 

Use vertical items in compact windows, like mobile
- 

Use horizontal items in medium windows, like tablets

[Image: A nav bar with vertical items in a compact window, and horizontal items in a medium window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqhs7x-04.png?alt=media&token=d17a01b3-1f02-4654-99d8-9a0de7507ff9)

_Vertical navigation items work best in compact windows. Horizontal items work best in medium windows._

For products with more than five navigation items, don’t use a navigation bar; the elements may collide and there likely won’t be enough space for translated text.

Instead, consider using tabs to organize similar content within a page, or hide the navigation behind a menu icon using a modal expanded navigation rail.

[Image: A nav bar with 7 items in a compact window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqi614-05-don't.png?alt=media&token=ba0b0a11-eec7-41a4-a49f-7209526b9819)

_Avoid putting more than five navigation items in a navigation bar_

[Image: A nav bar with no labels for each page item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqimzs-06-dont.png?alt=media&token=cab6328f-c6d8-4de6-9261-050062dd3288)

_Don’t remove the labels from navigation items_

[Image: A nav bar with 2 page items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqir51-07-dont.png?alt=media&token=91efa23a-c76b-486b-a510-b1b862cda076)

_Don’t use a navigation bar for fewer than three destinations. Instead, use tabs._

[Image: A nav bar is on the Library page of a music app. Tabs at the top of the page have secondary navigation for playlists, artists, albums, and songs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fp4omq-08.png?alt=media&token=59669575-9a0c-4bf1-b073-d85c2f53f459)

_Use navigation for distinct pages and tabs for related content within a page_

[Image: Nav bar using horizontal items in a compact window. The items are too wide and flow off screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fp4ti0-09.png?alt=media&token=375b3742-081d-484b-8066-f07b4a9af991)

_Navigation bar destinations have fixed positions. Don’t scroll them or modify their positions._

#### Anatomy

[Image: 6 elements of the nav bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm3t918of-10.png?alt=media&token=653b8745-255a-4063-969b-7b8915debdbd)

_1. Container

2. Icon

3. Label text

4. Active indicator

5. Large badge (optional)

6. Small badge (optional)_

##### Container

The container should always be placed at the bottom of the product and span the full length of the window. Navigation items are centered within the container.

The container has a color fill to provide separation from other content.

[Image: The nav bar at the bottom of a medium window has a color fill to differentiate from the background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm3t91cku-11.png?alt=media&token=8b8afb44-91c4-452a-8f17-d8a1186e125c)

_The navigation bar container holds all elements_

##### Navigation items

Navigation items hold all elements for each destination: the icon, label text, and active indicator. They can be **vertical**, with the text below the icon and indicator, or **horizontal**, with the icon and text beside each other inside the indicator. 

Vertical items are best in compact windows, and horizontal items are best in medium windows.

Horizontal items are centered in the nav bar with outer margins.

[Image: The nav bar in a medium window with padding on each side.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm3t91mur-12.png?alt=media&token=c2b0adef-8f59-4130-9ec1-f9cf4eac9507)

_The navigation bar is divided into equal-width segments with padding from the window edge_

##### Icons

Navigation rail items must use icons that symbolize the content of their page. Browse popular icon (https://fonts.google.com/icons).

Use a filled icon for the active destination and outlined icons for inactive destinations. If an icon doesn’t have a filled version, apply **semibold** weight to the icon instead.

[Image: An active nav item with a filled icon compared to inactive items with outlined icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fp9y48-13.png?alt=media&token=0fa12a4b-312c-4d17-b9e5-e0c2e9150e41)

_Use filled icons when the navigation item is active_

[Image: An active nav item with a semibold icon compared to inactive items with outlined icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fpa2te-14.png?alt=media&token=39201138-a399-487f-a860-0b0e84c6c24f)

_If a filled version of an icon is unavailable, the icon’s weight must increase_

Active and inactive icons must have a minimum 3:1 contrast ratio with the container.

[Image: 4 nav items that are each different colors with low contrast with the background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqnpkt-15-dont.png?alt=media&token=6443ffb5-c5a9-4602-8782-ff4fc4da1b08)

_Don’t use multiple or low-contrast colors in a navigation bar, as they make it harder for people to distinguish the active item and navigate to other destinations_

##### Active indicator

The active indicator shows which page from the nav bar is currently being displayed.

[Image: The current page in a nav bar has an active indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqo0n5-16-do.png?alt=media&token=7ffc8212-80fc-4cea-a90a-8ee8b92ece0f)

_Use the active indicator only for the active destination_

[Image: All items in a nav bar have active indicators.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqo7ag-17-dont.png?alt=media&token=00c41373-8bd6-4183-9508-a1d68b837502)

_Don’t use the active indicator for more than one destination at a time_

##### Label text

The label text should be a short, meaningful description of each navigation destination and another way for people to understand an icon’s meaning.

All navigation items require a label text. It should be 1-2 words.

[Image: A nav bar on a music app with clearly labelled destinations: home, browse, radio, library.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fpamvs-18.png?alt=media&token=667c0164-7b71-401d-ba92-953714bca290)

_Label text must be brief and clear_

[Image: A nav bar with 1-word labels for each page.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqoweq-19-do.png?alt=media&token=8e54006a-8f5c-4eee-96a0-aa955c7fb01e)

_Use brief text labels to identify the purpose of a destination_

[Image: A nav bar with “Music catalog” for a label. The label is truncated.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqp27c-20-dont.png?alt=media&token=f57db674-25f6-4a8d-b9e3-132ad85155fc)

_Don’t wrap or truncate text as it can make the label hard to understand_

[Image: A nav bar with “Music catalog” for a label. The label is a smaller size to make the text fit.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqpu1t-21-dont.png?alt=media&token=4a585cd5-7a7f-4699-a7dd-54571b00f343)

_Don’t shrink longer text to fit on a single line_

##### Badges (optional)

Navigation bars can display badges in the upper right corners of the destination icon.

Badges can contain dynamic information, such as the number of new messages.

[Image: A nav bar with a destination called “Go” with a small badge and one called “Saved” with a large badge saying “3.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqqg5m-22.png?alt=media&token=728c13e1-b6bc-4a67-9ec3-e182a4c0d398)

_Use a small badge to indicate an update, and a large badge to show the amount of updates_

[Image: Horizontal nav items with the badges in the same place of the icon as vertical nav items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqqlk1-23.png?alt=media&token=97527e9f-b215-4af6-b927-729382d3227d)

_Badges overlap the icon in both vertical and horizontal navigation items_

#### Placement

The floating action button (FAB) is placed above the navigation bar. Nav bars are always placed at the bottom of the window.

[Image: The FAB should be right-aligned above the navigation bar](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqqsyh-24-do.png?alt=media&token=154bc6fc-44ad-46fc-b059-f6be359445e4)

_The FAB should be right-aligned above the navigation bar_

[Image: A mobile page with a FAB overlapping a nav bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqqy0m-25-dont.png?alt=media&token=5c713542-e6bb-4362-abbb-ca8561433eff)

_Don’t cover the navigation bar with a FAB_

Navigation bars can be temporarily covered by dialogs, bottom sheets, navigation drawers, the on-screen keyboard, or other elements needed to complete a flow. They should not be permanently obstructed on any screen.

[Video: The navigation bar being covered by a bottom sheet when users take an action on screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalo9ujs-GM3_Expressive_NavBar_Guidelines_26_IA_v01.mp4?alt=media&token=1b324715-0dd9-42e9-8e69-9db76d751482)

_The search feature of the screen triggers the on-screen keyboard, temporarily covering the bottom navigation bar until the search flow is completed_

#### Adaptive design

Adaptive design allows an interface to respond or change based on context, such as the user, device, and usage. More on adaptive design (https://m3.material.io/m3/pages/layout-overview/adaptive-design)

##### Resizing

Only use navigation bars for compact and medium breakpoints. 

**Compact**: For narrow windows, use a navigation bar or modal navigation rail.

**Medium**: Use a navigation bar or navigation rail. Decide based on whether horizontal or vertical space is more important.

**Expanded and extra-large**: Use a navigation rail instead. Decide based on available window space and the number of navigation destinations.

[Video: A music app with a nav bar adapting to larger screens, where it changes to horizontal items, and then into a nav rail.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalo6njn-GM3-Expressive_NavBar_Guidelines_Responsive%20Layout_27_IA_v04.mp4?alt=media&token=4346c3f3-6720-40fc-b241-6124f46ac8f4)

_Navigation bars are best suited for compact and medium breakpoints_

The navigation bar container spans 100% of the window width.

[Image: Navigation bar spanning the full width of a compact window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalo8a44-28.png?alt=media&token=96f0c6e3-5ab8-49ef-aa2c-ef38b892c091)

_Navigation bars use 100% of the screen width_

The navigation bar is used on smaller devices. It’s not intended for desktop.

[Image: Navigation bar spanning the full width of an expanded window size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalqsfoq-29.png?alt=media&token=ff8220a9-3d2a-4ce3-a888-5899124803ae)

_Don’t use navigation bars for desktop layouts. Instead, use a navigation rail or tabs._

##### Presentation

In medium breakpoints, use horizontal nav items to better use available space.

Horizontal nav items should remain centered with the same padding at each breakpoint.

[Image: Horizontal nav items have the same width in medium and expanded windows. Only the padding changes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fpt5k2-30.png?alt=media&token=e135a58a-8738-4d8d-bdad-fb1c25a7962f)

_A navigation bar in horizontal orientation keeps the same spacing between destinations_

#### Behavior

##### Navigation

When selecting a navigation bar item not currently selected, the product navigates to that destination’s screen using a top level (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#f852afd2-396f-49fd-a265-5f6d96680e16) transition pattern. It can either remember where you left off, or reset to the default view.

1. **Preserve state**: If someone has interacted with this destination, it returns to their scroll position, current tab, and in-line search status.
2. **Reset state**: Any prior user interactions are reset, including scroll position, tab selection, and in-line search.

Choose the behavior that best suits the product and user needs. For example, an app that requires frequent switching between sections should preserve each section’s state.

[Video: After selecting an item on the bottom navigation bar, the app navigates to that destination’s screen](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fpu2iy-C%20-%20Switch%20Destination%20-%20RENDER%202x_240821.mp4?alt=media&token=50e8bd7e-2bcd-4dd7-a194-b803a7137d1a)

_After selecting an item on the bottom navigation bar, the app navigates to that destination’s screen_

Re-selecting the currently active destination should reset the scroll position to the top of the page.

**Don't swipe between destinations**
Swiping across the screen does not navigate between destinations, and is not supported by the navigation bar. Swipe behavior should be reserved for related items, such as cards in a carousel, or actions such as archiving a list item.

[Video: Selecting the currently active nav item scrolls the page content back to the top.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalod84x-GM3_Expressive_Nav-Bar_Guidelines_Behavior_Scrolling_32_IA_V04.mp4?alt=media&token=146d9009-6749-4879-a3a9-b29b6d86ca98)

_Selecting the already selected navigation item scrolls to the top of the screen_

##### Scrolling

Upon scroll, the navigation bar can appear or disappear. 

Don’t hide the navigation bar on scroll when a screen reader (https://m3.material.io/foundations/overview/assistive-technology#ec6f3e84-a51c-4dc0-a353-6844f5bde698) is active.

[Video: When scrolling on the page, the nav bar scrolls the opposite direction off screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmaloebec-GM3_Expressive_Nav-Bar_Guidelines_Behavior_Scrolling_33_IA_V04.mp4?alt=media&token=3b80dfa3-d1a9-4330-8b78-1d38be618dfc)

_Scrolling downward can hide the navigation bar; scrolling upward reveals it_

##### Selection

The icon becomes filled and the active indicator expands from the center of the icon when switching between destinations.

The active indicator animation should only apply on one axis to better represent a flat, shared plane.

[Video: The active indicator expands from the target when a destination is selected](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalof0yh-GM3-Expressive_NavBar_Guidelines_34_IA_v01.mp4?alt=media&token=2efedef2-c086-486c-8fa1-4ac81b66a0a1)

_An active indicator appears when the item is selected._

When a destination is tapped, the destination screens use a top level (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#f852afd2-396f-49fd-a265-5f6d96680e16) transition pattern. In addition, the icon becomes filled and the active indicator expands from the center of the icon.

[Video: Selecting the home item changes the entire page contents.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fq2m3b-G%20-%20CU%20Destination%20Change%20-%20RENDER%202x_240821.mp4?alt=media&token=a08ab4a0-f0e0-44ad-aebe-3d3494280338)

_Tapping a destination uses a top level transition pattern_

## Accessibility

#### Use cases

People should be able to do the following using the assistive technology:

- Move between navigation destinations
- Select a particular navigation destination from a set
- Get appropriate feedback based on input type

#### Interaction & style

**Touch**

- When a navigation item is tapped, the active indicator appears in place, providing feedback that it’s selected

- A touch ripple passes through the indicator

- The icon switches from outlined to filled

- The icon changes color

[Video: On a navigation bar, when the Home and Explore icons are tapped, an active indicator is displayed as interaction feedback.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7paivnz-GM3-Accessibility_Expressive_NavBar_a11y_01_V03.mp4?alt=media&token=6b0b243a-794e-4759-9a9f-87b66c584845)

_Touch: Tap_

**Cursor**

- When hovered, the active indicator appears in a reduced state providing a visual cue that the destination is interactive

- When clicked (in both active and inactive states), a ripple passes through the indicator

- The icon switches from outlined to filled

- The icon changes color, becoming darker

[Video: On a navigation bar, the hover and click interactions on the Home and Explore icons have different interaction feedback.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7paj7kh-GM3_Expressive_Accessibility_NavBar_a11y_02_V04.mp4?alt=media&token=e54a8af5-8250-4dd9-9b8b-fc564cb8c692)

_Cursor: Hover, Click_

##### Text scaling and truncation

When someone sets their device to show a larger text size, the navigation bar should grow vertically to accommodate larger labels while retaining the default padding. It’s okay for scaled text to wrap in navigation items.

To remain accessible, ensure the full label is always visible on-screen at up to 2x text sizing. Beyond this size, text can truncate.

[Image: Nav bar with text scaled to 1.5x size. Some labels are on two lines, others are on one line.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2kua3ge-03.png?alt=media&token=f108d48f-851d-45d1-ba80-1e83568032f3)

_Text scaled to 1.5 size_

[Image: Nav bar with text scaled to 2x size. Some labels wrap to two lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2kuaeol-04.png?alt=media&token=10e14f80-49cb-45ec-8388-cb1f010199ea)

_Text scaled to 2x size_

#### Initial focus

Initial focus lands directly on the first navigation item, since that is the first interactive element of the component.

[Image: Focus order and keyboard navigation of a nav bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fr7kb3-03.png?alt=media&token=84bac263-efdf-4665-a287-0e747b635270)

_Focus lands on first navigation item_

[Image: Activating a nav item with space on a keyboard.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fr7nd7-04.png?alt=media&token=f9921ae7-fcf3-45e4-9bcd-30cd1952f450)

_The navigation item is selected with Space/Enter_

#### Visual indicators

Use a filled icon with a bold label for selected destinations. For unselected destinations use an outlined icon with a medium label.

If an icon doesn’t have a filled style, use a thicker or heavier version of the icon instead.

[Image: A nav bar with a filled icon for the selected nav item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fr7qqu-05.png?alt=media&token=e630d9b4-cb7e-4880-8604-a9407ac24978)

_Use a filled icon for the selected navigation destination to differentiate from the other destinations_

[Image: A nav bar with an outlined icon for the selected nav item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fr7ugl-06.png?alt=media&token=b90be5ba-4212-42ac-95c4-7b1d6b44b4b1)

_Don’t use outlined icons on selected nav items_

[Image: 2 nav items, one selected, one unselected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fr7yfn-07.png?alt=media&token=03133ebd-5e3b-41e0-92be-0e1d4c05cf2c)

_When selected, the icon fills, darkens, and is backed by an active indicator shape_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Tab | Move between navigation items |
| Space / Enter | Selects the focused navigation item |

#### Labeling elements

The accessibility label for a navigation item is typically the same as the destination name.

[Image: Accessibility label and role defined for a Home icon on a navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fr861i-08.png?alt=media&token=2a25c26a-fbf9-4ee1-8c0b-5395b7db904d)

_A navigation bar’s accessibility label can incorporate its adjacent UI text_

When the visible UI text is ambiguous, accessibility labels need to be more descriptive. For example, a navigation destination visibly labeled **Library **would benefit from additional information in its accessibility label to clarify the destination’s intent.

Note: On Android Views (MDC-Android), a more descriptive accessibility label is not available and the role is not announced.

[Image: Accessibility labels of a navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fr8a8y-09.png?alt=media&token=7691ca2e-ae07-466a-9070-37fa398803aa)

_While the visible label text reads **Library**, the accessibility label for this destination clarifies its function: **Music library**_
