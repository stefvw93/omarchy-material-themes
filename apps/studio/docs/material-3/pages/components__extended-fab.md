# Extended FABs

Source: <https://m3.material.io/components/extended-fab> (content version 2026-09-23_06-10-05, page updated 2026-07-27T13:55:35.429Z)

## Overview

- 

Use for the most common or important action on a screen
- 

Three variants: small, medium, and large
- 

Use instead of FAB when label text is needed to understand action

[Image: 3 extended fab sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0df17xu-01.png?alt=media&token=06dfec2a-47be-4659-a524-86f136cec764)

_1. Small extended FAB
2. Medium extended FAB
3. Large extended FAB_

#### Availability & resources

#### M3 Expressive update

**May 2025**

The extended FAB now has three sizes: small, medium, and large, each with updated type styles. These align with the FAB sizes for an easier transition between FABs. The baseline extended FAB is no longer recommended and should be replaced with the small extended FAB. Surface and FABs are also no longer recommended. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

Variants and naming:

- 

Added new sizes

  - 

Small: 56dp
  - 

Medium: 80dp
  - 

Large: 96dp

- 

No longer recommended

  - 

Baseline extended FAB (56dp)
  - 

Surface extended FAB

Updates:

- 

Adjusted typography to be larger

[Image: The baseline extended FAB and the small, medium, and large extended FABs from the expressive update.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fml9nentp-02.png?alt=media&token=fb7094cc-1fac-45eb-a3f7-a5c683b28ba3)

_The baseline extended FAB is replaced with a set of small, medium, and large extended FABs with new typography_

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color
- Layout: Extended FAB is the same height as the FAB
- Shape: Boxier style with smaller corner radius

[Image: Diagram comparing the M2 FAB and extended FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmae6zhok-04-3P.png?alt=media&token=37880129-5f8d-4a33-a5b2-b8e74634c57b)

_M2: Extended FABs are pill-shaped and have a different height and elevation_

[Image: Diagram comparing the M3 FAB and extended FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dff6p3-05.png?alt=media&token=896b601f-21d9-4cae-854f-840ba268dd73)

_M3: Extended FABs share the same height, boxier shape, and simpler elevation model as FABs_

## Specs

#### Variants

[Image: 3 variants of extended FABs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rfc55-01-3P.png?alt=media&token=6a57bbbf-b6f3-4f09-8343-d327e4581fbc)

_1. Small extended FAB
2. Medium extended FAB
3. Large extended FAB_

##### Baseline variants

The baseline extended FAB is no longer recommended in the M3 expressive update. Use a small extended FAB; the type style was updated from **label large** to **title medium**, and the inner padding was reduced. View baseline extended FAB specs (https://m3.material.io/m3/pages/extended-fab/specs#01e114e6-8c3d-4d39-9376-65aa5c10e01b)

[Image: 1 baseline extended FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rfwo5-02-3P.png?alt=media&token=eb54fbf9-bad6-4aa9-8407-0ebd348d1787)

_1. Extended FAB_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Small extended FAB | -- | Available |
| Medium extended FAB | -- | Available |
| Large extended FAB | -- | Available |
| Extended FAB (baseline) | Available | Not recommended. Use **small extended FAB.** |

#### Tokens & specs

Use the table's menu to select a token set. Extended FAB tokens are organized by size and color.

[Token table: see ../tokens/TOKEN_TABLE.36500f77b86d20a5.md]

#### Anatomy

[Image: 3 elements of extended FABs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rgmo9-03-3P.png?alt=media&token=79794fe0-1648-40c3-8ecf-5e5592d12d16)

_1. Container
2. Label text
3. Icon_

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

##### Color styles

Extended FABs can use several combinations of **color** and **on color** styles, such as **primary** and **on primary**. The following color mappings provide the same level of contrast and functionality, so choose a color mapping based on visual preference.

[Image: 6 extended FAB color styles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rha4a-04-3P.png?alt=media&token=e58d72e9-c13e-4a24-946b-f34ef588516a)

_Extended FAB color roles used for light and dark schemes:

1. Primary container & on primary container (default)
2. Secondary container & on secondary container
3. Tertiary container & on tertiary container
4. Primary & on primary
5. Secondary & on secondary
6. Tertiary & on tertiary_

##### Baseline color styles

Extended FABs should no longer use surface color styles. They’re still available, but not recommended.

[Image: 1 baseline extended FAB color style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3ri2r1-05-3P.png?alt=media&token=262c3137-4f81-4e54-a410-502c63d52210)

_1. Surface container FAB_

#### States

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

When using a non-default color mapping for extended FABs, make sure the state layer color is the same as the icon color. For example, the state layer color for primary mapping should be md.sys.color.primary.

[Image: 4 states of extended FABs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaljqck5-06-3P.png?alt=media&token=fd04f135-2a40-4ee3-bb14-9673911382d7)

_1. Enabled 
2. Hovered - elevation 4
3. Focused 
4. Pressed_

#### Measurements

[Image: Extended FAB padding and size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rj563-07-3P.png?alt=media&token=a20a7b7a-2fb6-4c4d-829c-a97dc72e8f26)

_Size and padding measurements of the small, medium, and large extended FABs_

[Image: Extended FAB margin measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rjn8g-08-3P.png?alt=media&token=22bc3f2b-72fe-4857-8ebe-662c70054166)

_Extended FABs should have margins of 16dp_

#### Baseline extended FAB

[Image: 3 elements of baseline extended FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rm9q3-10-3P.png?alt=media&token=621815a8-8ecf-4aef-accc-2997113f330e)

_1. Container
2. Label text
3. Icon_

##### Baseline configurations

[Image: Baseline extended FAB with icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fml9o6q6p-15-3P.png?alt=media&token=f58280d6-56a7-4c66-815c-4325264115e5)

_With icon_

[Image: Baseline extended FAB without icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fml9o6v12-16-3P.png?alt=media&token=42cd1ef1-6133-4d16-bfbb-5fcc172a5834)

_Without icon_

##### Baseline tokens

Use the table's menu to select a token set. The baseline extended FAB token sets are organized by common tokens, then by surface and branded color styles. Other color styles like primary, secondary, and tertiary are still used by the latest extended FABs.

[Token table: see ../tokens/TOKEN_TABLE.36500f77b86d20a5.md]

##### Baseline colors

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Image: 3 baseline extended FAB color roles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rmvmo-11-3P.png?alt=media&token=d7936f8b-e675-46ad-96c2-5ad14fd729cb)

_Extended FAB color roles used for light and dark schemes:

1. Primary container + shadow
2. On primary container
3. On primary container_

###### Additional color mappings

Extended FABs can use other combinations of container and icon colors. The color mappings below provide the same legibility and functionality as the default, so the color mapping you use depends on style alone.

[Image: 3 deprecated extended FABs with different container and icon colors.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma3rnofz-12-3P.png?alt=media&token=89b9a842-01e1-4dad-a525-edee128e9051)

_Extended FABs can use different combinations of container and icon colors_

##### Baseline states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states)

[Image: 4 states of baseline extended FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaljrky7-13-3P.png?alt=media&token=b2fa64b8-d9c7-42df-a65a-91b7b880aed6)

_1. Enabled 
2. Hovered 
3. Focused 
4. Pressed_

##### Baseline measurements

[Image: Margins of baseline extended FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaebvm3w-14-3P.png?alt=media&token=f68926a0-c6a7-44c6-9c70-5c603af855ac)

_Extended FABs have a padding of 16dp_

[Image: Size of baseline extended FAB while on screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaebvv3o-15-3P.png?alt=media&token=c125c6fa-e299-426a-98d4-19e12ef62f0d)

_Extended FAB height, width, and icon size_

| Attribute | Value |
| --- | --- |
| Container height | 56dp |
| Container width | Dynamic, 80dp min |
| Container shape | 16dp corner radius |
| Icon size | 24dp |
| Padding | 16dp |

## Guidelines

[Image: Vibrant extended FAB on an email screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dfvsl8-01.png?alt=media&token=6a727ef8-a86c-46f7-9ed3-ab9fb62554b3)

_Extended FABs are more prominent than regular FABs_

#### Usage

Use an extended FAB on screens with long, scrolling views that require persistent access to an action, such as a checkout screen. 

Use it when label text helps understand the main action, or to add further emphasis to the button.

[Image: A centered extended FAB is used to check out in a shopping app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dfxjts-02.png?alt=media&token=90832d30-29cf-47e4-bc30-57e91caa6637)

_Extended FABs ensure the main action is visible at all times_

[Image: Extended FAB on an article with lots of body content to publish that article.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dfymif-03.png?alt=media&token=6073e07a-39e3-4e98-9bd3-34315524ed39)

_Use an extended FAB to provide constant access to a primary action above long-scrolling surface content_

[Image: Extended FAB on a task list to create a new task.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dfzjai-04.png?alt=media&token=135eef66-42c9-4ae2-a1d8-e4e619a74ffa)

_Use an extended FAB to emphasize a page’s primary action_

##### Additional emphasis

The extended FAB can provide more emphasis and clarity to a product’s primary action. 

Since it has room for both a text label and icon, the extended FAB can be effective where an icon alone is ambiguous. However, the relationship between an extended FAB's icon and label should be clear.

[Image: Extended FAB labeled “find flights” with an airplane icon, which would be unclear on its own.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dg2hbe-05.png?alt=media&token=3f47cb00-341b-4da5-9f84-11d5a1805609)

_An extended FAB can be effective where an icon alone is too vague_

Like the regular FAB, only one extended FAB should be used per screen. 

Multiple FABs compete for attention. 

If additional high-level actions are required, consider adding more buttons elsewhere on the page.

[Image: An extended FAB used on a screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dg63ur-06.png?alt=media&token=0fd605b7-b8d9-49b1-a3d7-fd854c99f549)

_Only show one prominent action at a time with the extended FAB_

[Image: 2 extended FABs used on 1 screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dg6za4-07.png?alt=media&token=44c698be-70ea-4bcd-a6ce-222a161a6978)

_Don’t use multiple extended FABs in one screen as it disrupts visual hierarchy_

The extended FAB shouldn't be used as an option in a set of actions. 

Instead, use filled buttons for a similar level of emphasis.

[Image: Filled button labeled “finish setup” next to a “back” button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dg9f6o-08.png?alt=media&token=0d4c8320-2e45-454e-9ffb-5487be5f2aa1)

_Use a button with appropriate styling to emphasize it in a group of buttons_

[Image: Extended FAB labeled “finish setup” next to a “back” button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dgacb3-09.png?alt=media&token=ffcfefcd-f834-4dd9-84ba-840723ed9e95)

_Don’t use the extended FAB to convey an option in a set of actions_

##### Choosing a size

There are three variants of extended FABs: small, medium, and large.

Choose an appropriately-sized extended FAB to add the right amount of emphasis for an action. 

In compact windows with one prominent action, the large extended FAB can be appropriate.

In larger breakpoints, use a medium or large extended FAB.

[Image: 1 large, 1 medium, and 1 small extended FAB on 3 different screen sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dhk1cf-10.png?alt=media&token=bc0b1322-7722-4911-a73b-3653406c566e)

_There are three sizes of extended FABs_

#### Anatomy

[Image: 3 extended FAB elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dhlqdv-11.png?alt=media&token=c9b49131-63fe-42cb-8611-388802055d3b)

_1. Container 
2. Label text 
3. Icon (optional)_

##### Container

The extended FAB container is a rounded rectangle that hugs its contents. 

The extended FAB grows and shrinks with text length.

[Image: Fixed-width extended FAB, centered, ignoring layout grid.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dhmym8-12.png?alt=media&token=e12a3cd1-a98a-449e-a8f2-df33f31290d3)

_The extended FAB container hugs the icon and text_

##### Icon (optional)

An extended FAB's icon should intuitively represent its action.

[Image: Extended FAB without an icon, labeled “Save draft”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dgr1oq-13.png?alt=media&token=99f7b8ba-a716-4af0-9d41-e0394c7ef714)

_Unlike standard FABs, extended FABs don't require an icon_

[Image: Extended FAB with icon only, with no label text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0e6c0j7-14.png?alt=media&token=b6d6f787-9768-4e24-a094-f74f55ed18a9)

_An extended FAB can't have an icon without a text label_

##### Label text

The extended FAB’s label should clearly describe its action.

Use 1–2 words at most. Keep in mind that localization may increase the amount of characters and width of the extended FAB.

[Image: Extended FAB with short text “Save”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dhs8b9-15.png?alt=media&token=57d8fa15-d91d-4afb-a318-dcf67d577aee)

_Shorten the text as much as needed. Include an icon for additional context._

[Image: Extended FAB with wrapping text “Save draft in folder”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dhtaim-16.png?alt=media&token=640e670e-9be7-48a6-8dce-609fad699a1e)

_Avoid wrapping or truncating text_

#### Placement

[Image: Extended FAB placed above navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0di65x4-17.png?alt=media&token=83a686da-79c0-46a1-8597-e87048f40ba3)

_Place the extended FAB above the rest of the UI, off of elements like app bars_

[Image: Extended FAB overlaid on a docked toolbar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0di94u1-18.png?alt=media&token=097ae808-0f48-4d6f-b196-3a7ca2af49af)

_Don’t place the extended FAB on top of toolbars. It disrupts the consistency of the elevation and surface layers._

[Image: Extended FAB below an app bar at the top of a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dia4hb-19.png?alt=media&token=66ba14b8-148b-479f-b645-311243e6419a)

_Don’t place the extended FAB in the upper half of a mobile screen, as it disrupts the reading of the UI_

[Image: An extended FAB labeled "Confirm" on a dialog to "Confirm your location".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dib69h-20.png?alt=media&token=dad3fb69-2734-4141-8f02-5130a691d744)

_Don’t place extended FABs on cards or inside other containers_

Avoid putting other floating components, like the floating toolbar, on screen with the extended FAB.

[Image: The extended FAB is next to a floating toolbar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dif190-21.png?alt=media&token=c974e34b-8309-4170-a095-61b8a2faaf76)

_Floating toolbars can be paired with FABs, but not extended FABs_

#### Responsive layout

The FAB and extended FAB can transform into each other depending on available space and layout. 

In a collapsed navigation rail, a FAB would be used. When the rail is expanded, the FAB can transform into an extended FAB.

[Image: Example of extended FAB transforming into standard FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0djhpqm-23.png?alt=media&token=f160b11a-c68f-4ced-9409-72e84d507e7c)

_When space is limited, an extended FAB can transform into a FAB_

##### Right-to-left languages

Extended FABs should mirror their elements in right-to-left (RTL) languages.

[Image: Extended FAB in a left-to-right language placed at the bottom right of a screen. The icon is to the left of the text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0djk489-24.png?alt=media&token=afd494ea-eb93-4f79-9046-6c542eb5f226)

_Icons should be placed to the left of labels for left-to-right (LTR) languages_

[Image: Extended FAB in a right-to-left language placed at the bottom left of a screen. The icon is to the right of the text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0djl493-25.png?alt=media&token=b52dabe0-7c8d-4f53-87e3-4dfb4c84a168)

_Icons should be placed to the right of labels for RTL languages_

##### Breakpoints

In compact and medium breakpoints, the extended FAB should be placed at the bottom of the screen, either center-aligned or aligned to the trailing edge of the window.

[Image: Extended FAB center-aligned on a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0djn9nf-26.png?alt=media&token=6d717050-1200-42ec-aa29-b05dd1dffe34)

_The extended FAB can be center-aligned_

[Image: Extended FAB right-aligned on a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0djo3i8-27.png?alt=media&token=d9906095-7edf-483d-a0ba-f50233d8370e)

_The extended FAB can be aligned to the trailing edge of the window_

In expanded and larger breakpoints, the extended FAB should appear either:

- 

At the bottom right edge of the window, in both LTR and RTL languages
- 

Within the navigation rail

[Image: Extended FAB at bottom right of screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0djp9q0-28.png?alt=media&token=4d585d98-9d3a-4356-abca-5d160c2ea1b5)

_The extended FAB can be right-aligned in both LTR and RTL languages_

[Image: Extended FAB in navigation drawer.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0djqcsu-29.png?alt=media&token=de1c588a-b37a-40b5-bb9f-5bf2edcbfa30)

_The extended FAB can be at the top of the expanded navigation rail_

#### Behavior

##### Appearing

The extended FAB surface expands when appearing on screen using an enter and exit (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#e1c2a650-d7a4-4a6d-9025-e6b7845291ed) transition pattern.

[Video: Extended FAB appearing on screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm23g68f9-EFAB-A_1.mp4?alt=media&token=9f42a1e6-a093-4791-a1a1-aa211ea3f3f3)

_An extended FAB expands when appearing on screen_

##### Expanding

The extended FAB can expand and adapt to any shape using a container transform (https://m3.material.io/m3/pages/motion-transitions/transition-patterns) transition pattern. 

This includes a surface that is part of the app structure, or a surface that spans the entire screen.

[Video: Extended FAB adapting to various shapes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0e6w6vv-EFAB-B_1.mp4?alt=media&token=3f7e1b7a-be23-4869-95aa-f6f592102d31)

_An extended FAB can expand and adapt to any shape_

##### Transforming

The extended FAB can transform into a FAB on scroll to temporarily take up less space on screen.

[Video: Extended FAB transforming into a FAB when the page is scrolled.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0e6wsqu-EFAB-C.mp4?alt=media&token=52163e6a-2c39-4b6d-81ab-4b12a4f35885)

_An extended FAB can transform into a FAB_

##### Scrolling

The extended FAB can transform into a FAB when scrolling down, and back to an extended FAB when scrolling up.

[Video: Extended FAB transforming while scrolling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0e6x271-EFAB-D.mp4?alt=media&token=2fb29be1-a582-462f-b44a-1a940a38aeab)

_An extended FAB collapses and expands when scrolling_

When the FAB switches to an extended FAB, the following transitions occur:

- The FAB shape changes
- FAB icon moves to the left
- FAB text label fades in

[Video: FAB transforming into extended FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm23g6lbk-EFAB-E_1.mp4?alt=media&token=8b552464-4349-49a5-aa8a-8c1473e967c8)

_FAB switches to an extended FAB_

## Accessibility

#### Use cases

People should be able to do the following using assistive technology:

- Navigate to and activate the extended FAB

#### Interaction & style

To make it easier for users of screen readers to reach a primary action such as an extended FAB, consider placing the action in the upper left region of large web screens, like in an expanded navigation rail.

In smaller windows, the best place for the extended FAB is the lower right corner of a screen.

[Image: On a large screen, the Compose FAB is placed on the upper left region in an email app with the expanded window on the right.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0e5baky-01.png?alt=media&token=d4a320d5-298d-43a8-9e13-834adb34a1bf)

_Extended FABs can be placed in the expanded navigation rail_

[Image: In a compact window, the Compose FAB is placed on the lower right region in an email app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dmgu83-02.png?alt=media&token=898399c4-2a45-4bb4-8089-5a869da143bb)

_Place extended FABs in an easy-to-reach place that doesn’t obstruct other actions_

[Image: In a compact window, the Compose FAB is overlapping other buttons in an email app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dmhng1-03.png?alt=media&token=8f726c4c-3cc6-4fec-8518-403650fba64a)

_Don’t place extended FABs over another actionable element_

#### Initial focus

Ensure the extended FAB is prioritized in the overall focus order to create an efficient experience for people who navigate UIs with assistive tech. 

On mobile, the focus order may start with the app bar, move to the navigation bar, and then skip past any other content on the page to land on the extended FAB.

When using an extended FAB, both the visible label and icon should be treated as one focusable element. The extended FAB doesn’t need a tooltip because it already has a visible label.

[Image: A focused extended FAB in the lower right region of a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dmis8z-04.png?alt=media&token=bf33f207-5a42-437b-a1d6-df3b1f8c34c6)

_Ensure extended FABs get focus when navigating with assistive technology_

[Image: A focused extended FAB with a tooltip matching the text label.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dmjod6-05.png?alt=media&token=1f36adfa-b3b3-459e-b692-aa1deb2855f1)

_Tooltips aren’t required since the extended FAB has label text_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Moves focus to the extended FAB |
| **Space **or **Enter** | Activates the extended FAB |

#### Labeling elements

To ensure the action is clear, use consistent icons and text labels, such as a **Compose **icon with a **Compose** text label. 

The icon and text label combination should have one distinct purpose.

The accessibility label must include the same first word as the visible label. For example, if the visible button is **Create**, then the accessibility label might say **Create a new invite**.

[Image: Accessibility labels of an extended FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dmmjzu-06.png?alt=media&token=88489b92-fd7e-4f30-a6da-a6b4b9962f55)

_The accessibility label reads **Compose **to match the extended FAB's displayed label_
