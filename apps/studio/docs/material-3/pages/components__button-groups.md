# Button groups

Source: <https://m3.material.io/components/button-groups> (content version 2026-09-23_06-10-05, page updated 2026-09-16T18:25:16.117Z)

## Overview

- 

Two variants: **standard** and **connected**
- 

Applies shape morph when pressed and selected
- 

Connected button groups replace the segmented button
- 

Works with all button sizes: XS, S, M, L, and XL
- 

Support for single-select, multi-select, and selection-required

[Image: A standard button group and a segmented button group.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4sskpfx-1_alt.png?alt=media&token=9de29e7b-e0c9-442c-84df-2ad6a90d5f04)

_Button groups can contain buttons and icon buttons_

#### Availability & resources

#### M3 Expressive update

Button groups apply shape, motion, and width changes to buttons and icon buttons to make them more interactive. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

**May 2025**

New component added to catalog.

Variants and naming:

- 

Added standard button group
- 

Added connected button group

  - 

Use instead of segmented button, which is no longer recommended

Configurations:

- 

Works with all button sizes: XS, S, M, L, and XL
- 

Applies default shape to all buttons: round or square

[Image: Standard button group in 3 of 5 available sizes, and segmented button group with just icon buttons and just common buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0ca0qix-1.png?alt=media&token=36ca89da-91f7-443b-800d-a35bd8744481)

_Button groups are containers that hold buttons of many shapes and sizes_

## Specs

#### Variants

[Image: Various colors and shapes of standard and connected button groups.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6nan75-01-3P.png?alt=media&token=a3f2783c-1e61-4def-a914-49eae524b2d7)

_1. Standard button group
2. Connected button group_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Standard button group | -- | Available |
| Connected button group | Available as segmented button | Available |

#### Configurations

[Image: Five sizes of button groups and two shapes of button groups.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmae9tpw8-standard.png?alt=media&token=58659efc-1d30-4d23-b530-24ace5a5d390)

_Configurations for both variants of button groups:

1. 

Extra small
2. 

Small
3. 

Medium
4. 

Large
5. 

Extra large
6. 

Single-select and multi-select
7. 

Round and square_

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Size | XS, S, M, L, XL | -- | Available |
| Default shape | Round, square | -- | Available |
| Selection | Single-select, multi-select, selection-required | Available as segmented button | Available |

#### Tokens & specs

Standard and connected button group tokens are organized by size. Select the variant and size from the token set menu. Go to the button (https://m3.material.io/m3/pages/common-buttons/specs/) and icon button (https://m3.material.io/m3/pages/icon-buttons/specs/) pages to view their tokens. Learn about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Token table: see ../tokens/TOKEN_TABLE.082d7fd6e058b011.md]

#### Anatomy

Button groups are invisible containers that add padding between buttons and modify button shape. They don’t contain any buttons by default.

[Image: The container outlined on both variants of button groups.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6nc084-anatomy.png?alt=media&token=b1b3e5dc-10b1-42e6-9ef7-1a21f0a03d8f)

_1. Container_

##### Common layouts

Mix and match buttons and icon buttons for different scenarios.

[Image: 4 common layouts of button groups.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6ncj54-common%20layouts.png?alt=media&token=ac63715d-0c2a-4c8e-b7e1-2bbfad7f2874)

_1. Label buttons
2. Label buttons and icon buttons
3. Extra small icon buttons
4. Large icon buttons_

##### Color

Button groups have no color properties. They can use the default button or toggle button color styles, like filled, tonal, and outlined. Avoid using standard icon buttons or text buttons, as they have no container treatment.

[Image: The container outlined on both variants of button groups.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmliwoj5d-05.png?alt=media&token=45f2f88a-9c8d-4915-b220-196beae83dda)

_1. 

Filled
2. 

Tonal
3. 

Outlined
4. 

Elevated_

#### Selection & activation

**Standard button groups** add interaction between adjacent buttons when a button is selected or activated.

This interaction changes the width, shape, and padding of the selected or activated button, which adjusts the width of buttons directly next to it.

[Video: A selected button in a standard group bounces against its adjacent button, changing their widths.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmack7ok2-GM3_Expressive_Button%20Group_Selection%20activation_Standard_3P_AI_v01.mp4?alt=media&token=0e4f6b3f-e3e3-4c45-8b8b-4292a2f32cc0)

_A selected button changes shape, and briefly changes the width of itself and adjacent buttons_

**Connected button groups** don’t add any interaction between buttons when selected or activated. 

They only affect the shape of the button being selected or activated.

[Video: A selected button in a connected button group only changes its own shape.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmack8xlo-GM3_Button-group_Specs_Selection-%26-activation_Connected_IA_v01.mp4?alt=media&token=e839d3db-5041-49c3-a780-17267d0c304f)

_A selected button changes shape without affecting adjacent buttons_

#### States

##### Standard button group

When a button is pressed, standard button groups modify the width and shape of that button and adjacent buttons.

[Image: 5 states of a standard button group.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmobjzmlh-07-key01-3P.png?alt=media&token=8aa38061-9566-412f-a64a-97ffd1b544b1)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

When a toggle button is selected in a standard button group, its shape should change between square and round. The color should change according to the button specs (https://m3.material.io/m3/pages/common-buttons/specs).

[Image: 5 states of a standard button group with toggle buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmhsvti2a-08-3P.png?alt=media&token=741cedf5-b9b6-45a3-a8c9-f3f2da3a6410)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

##### Connected button group

Connected button groups have different shape changes than standard button groups. Selecting a button does not affect adjacent buttons.

[Image: 5 states of a segmented button group.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmhsvu5c7-09-3P.png?alt=media&token=16b6be24-4da6-44fe-a0c2-a7faf852065c)

_Connected button group unselected states:

1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

[Image: 4 states of a segmented button group with toggle buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmhsvuqev-10-3P.png?alt=media&token=1ccc2697-aa19-469b-ada8-9c594faca40b)

_Connected button group selected states:

1. Enabled
2. Hovered
3. Focused
4. Pressed_

#### Measurements

##### Standard button group

Standard groups apply padding between all buttons. The amount of padding changes based on button size to ensure a minimum accessible target size of 48dp. More details on padding: Button specs (https://m3.material.io/m3/pages/common-buttons/specs), icon button specs (https://m3.material.io/m3/pages/icon-buttons/specs)

[Image: Standard button group padding measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6nhwkj-padding.png?alt=media&token=50229b04-dad5-4ad7-8df8-5d0c9d28b02b)

_Standard button group inner padding:

1. XS: 18dp
2. S: 12dp
3. M: 8dp
4. L: 8dp
5. XL: 8dp_

##### Connected button group

For all connected button groups, use 2dp padding. This provides visual consistency at scale.

[Image: Connected button group padding and corner radius measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6nj8kr-connected%20padding.png?alt=media&token=b3a0625e-1526-4b7c-9987-1ddcf1adace2)

_Round connected button group inner padding is 2dp at every size. The outer shape is fully round, and the inner shape remains square with the following corner sizes:

1. XS: 4dp
2. S: 8dp
3. M: 8dp
4. L: 16dp
5. XL: 20dp_

[Image: Connected button group padding and corner radius measurements for square buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6njl4y-connected.png?alt=media&token=72d1bec2-5ae9-4d04-b420-e8740e9c0385)

_Square connected button group inner padding is 2dp at every size. The outer shape has the following corner sizes:

1. XS: 4dp
2. S: 8dp
3. M: 8dp
4. L: 16dp
5. XL: 20dp_

##### Minimum widths

Extra small and small connected button groups have 48dp target areas and a minimum width of 48dp.

[Image: 48x48dp accessible target areas on the XS and S connected button groups.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6nk25f-mind%20width.png?alt=media&token=bd84a07b-58d9-4ed9-a279-6e2a5549391d)

_1. Extra small
2. Small_

#### Density

Button groups adapt to density of the buttons inside. More on density (https://m3.material.io/m3/pages/grids-spacing/density)

[Image: Connected button groups at 0, -1, -2, and -3 density.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6nkg98-density.png?alt=media&token=0e6830d9-aa8f-441d-bc50-fab45ddf769b)

_Button groups adapt to the height of the buttons inside, including when density is applied_

## Guidelines

[Video: A video call with a standard button group. Selecting the mic changes shape and color, and bounces against adjacent buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm34lmgn1-Button-Group-Hero-alt-2.mp4?alt=media&token=142709b2-d7ca-4e66-b9e6-e2a8bbd27533)

_Standard button groups add interaction between adjacent buttons_

#### Usage

There are two variants of button groups: **standard** and **connected**. 

**Standard button groups** add interaction between adjacent buttons so they respond to each other. When a button in a standard group is selected:

- 

The selected button changes shape and width
- 

A selected toggle button also changes color
- 

Adjacent buttons move and temporarily change width

[Image: A welcome screen with a colorful standard button group. 2 pink icon buttons are narrow, and 1 purple button is labelled “Get started".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0di4v84-1.png?alt=media&token=7d455507-7409-4e76-96b8-78173e2a9533)

_Button groups add more expression to a product_

Mix and match the different button variants, widths, and colors to emphasize what’s important, and to visually group related buttons.

By default, all buttons in a standard group should be the same size (XS to XL) and shape (round or square).

- 

Only use multiple sizes in a group for hero moments
- 

Avoid mixing sizes frequently
- 

Only use a different shape in a group when a button is selected, or to add meaning or contrast

[Image: A standard button group with 3 buttons of different colors but the same square shape.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0diaau3-same%20shapes.png?alt=media&token=816c3216-da8f-40f8-8de5-6fa595fca914)

_Use the same shapes for buttons in a group, but change other properties like width and color_

[Image: A standard button group with 3 buttons, including a round primary button. A square button is used to add items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dibcom-different%20shapes.png?alt=media&token=15528a66-dde7-4db9-bd01-29fc012f8257)

_Reserve shape differences in button groups for key interactions_

**Connected button groups** help people select options, switch views, or sort elements in a page. 

They behave similarly to standard groups, except they don’t affect adjacent buttons.

Connected groups should replace the baseline segmented button, which is no longer recommended.

[Video: Selecting a button in a connected button group labelled “My files,” “Shared,” and “Computers.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm34llls1-Button-Group-B-2.mp4?alt=media&token=4142a8d4-8e42-4e97-9c0f-5143086be82d)

_Connected button groups can be used to toggle between similar actions_

Use connected button groups when the button content is related, and buttons can be selected.

[Image: A shopping app with an option to choose the volume of an item using a connected button group.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dijxcq-16.png?alt=media&token=21003592-8d64-4c4f-a6b8-dd87c18ee5b5)

_Closely related actions work well in a connected button group_

Connected button groups should be used for single or multi-select patterns that use toggle buttons. 

Avoid using a connected group when none of the buttons can be toggled.

[Image: 2 filters using connected button groups of 2 and 4 items. The group with 4 items has multiple buttons selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0diog82-18.png?alt=media&token=4dfe1ecc-7909-4b3f-acea-4d079824514d)

_Use the connected button group with single or multi-select patterns_

##### Color

Avoid mixing color styles in connected button groups; it can make selection and emphasis unclear.

[Image: Selecting a button in a connected button group labelled “My files,” “Shared,” and “Computers.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmk2jyzbl-04.png?alt=media&token=41ad5b46-9144-48cf-8f23-3c2201b8155c)

_Don’t mix color styles in connected button groups_

#### Anatomy

[Image: 1 element of a button group.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4sznpeh-5.png?alt=media&token=89308e1d-b40f-438e-a738-144e5a1e5f91)

_1. Container_

##### Container

The standard button group container has padding between buttons so they can animate width and shape without disrupting the product layout. 

The standard button group hugs the width of the buttons inside.

[Image: The container hugs the buttons. Inner padding is highlighted.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0diztnf-6.png?alt=media&token=28a3ff83-8514-4da3-89e5-3b58ad18da74)

_Button groups can animate without affecting their surroundings_

The connected button group should span the width of the page or surface it’s placed on, increasing the button widths inside. 

In larger windows, consider adding a maximum width to the connected group to avoid it growing too wide.

[Image: 2 connected button groups, with 2 and 4 buttons respectively, spanning the same width on a screen, with margins from the edge.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dj3wcm-18-1.png?alt=media&token=5a3129d6-827b-4c8c-afe0-9a65aab4c44e)

_Connected button groups increase the widths of each button inside and expand to their container width_

#### Adaptive design

Adaptive design allows an interface to respond or change based on context, such as the user, device, and usage. More on adaptive design (https://m3.material.io/m3/pages/layout-overview/adaptive-design/)

##### Resizing

Button groups should move through layouts together in a single line. They shouldn’t wrap to a second line. Multiple button groups can be stacked to keep items close together. However, button groups don’t interact vertically.

Button groups and individual buttons can be set to **fixed** or **flexible** resizing:

- 

**Fixed**: Manually define the button width (narrow to wide), size (XS to XL), or padding at each breakpoint.

- 

**Flexible**: Automatically increase or decrease the width of buttons and the button group. Button groups grow until all flexible buttons are at their largest width.

If adjusting button width manually, avoid stretching icon buttons beyond the wide setting.

[Image: Two button groups, each with distinct width, size, and padding adjusted to fit two different window sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0djrht4-1.png?alt=media&token=07fada8f-eb2c-4d1a-a7f9-6e3bc8568a6e)

_Buttons can have width, size, and padding manually adjusted to fit different breakpoints_

In compact windows, consider using smaller, narrower buttons so all buttons in the button group can fit. In large and extra large windows, consider using larger, wider buttons to better fill in the available space.

Flexible buttons or button groups will automatically adjust width.

[Video: Button group is adjusted to fill the window size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fma2ph39h-GM3_Expressive_Button-Groups_Guidelines_12_IA_v01.mp4?alt=media&token=790ee31a-f920-49b9-b224-1c035826c00c)

_Set the size, shape, and padding to manually adjust the button group at different breakpoints_

When scaling to larger breakpoints, make sure that the visual hierarchy of each button is preserved using qualities like color and size. 

For example, the primary action should remain the largest, widest, or most visually prominent button at all breakpoints.

[Video: Narrow buttons in a group on a compact window become a mixture of wide and narrow buttons on a larger window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fma2pii3g-Gm3_Expressive_Button-groups_Guidelines_13_IA_v01.mp4?alt=media&token=eb65fd9a-f23f-4eb5-88f8-6417b7d7848f)

_Maintain hierarchy across layouts and devices_

##### Presentation

Buttons at the trailing edge of the button group can be customized to collapse into an overflow menu at smaller breakpoints, and become visible again at larger sizes. Place the overflow menu at the trailing end of the group.

Buttons outside the group aren’t affected by button group behavior.

[Video: Buttons collapse into an overflow menu when window size shrinks, and reappear when window size expands.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fma2pjcic-GM3_Expressive_Button-Groups_Guidelines_14_IA_v01.mp4?alt=media&token=d2b496fe-0b66-42cd-8b17-828526a5f6b9)

_Buttons should become hidden in an overflow menu or visible again, depending on screen size. Buttons outside the button group, like the **end call** button, will not be affected._

#### Behavior

##### Pressed

When a button is pressed, it changes width and shape.

In a standard button group, pressing a button also affects the width of adjacent buttons.

In a connected button group, only the shape of the pressed button changes.

[Video: In a calculator app, pressing numbers changes the width of adjacent numbers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fljnt9-Button-Group-D.mp4?alt=media&token=3906bae1-361f-4340-969e-d9ac7d6b98bf)

_Pressing buttons in a standard group changes the width of adjacent buttons_

##### Selected

A selected button should change shape from round to square, or square to round.

[Video: A video call with a standard button group. Selecting the mic changes shape and color, and bounces against adjacent buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm34lm16p-Button-Group-Hero-alt-2.mp4?alt=media&token=f56b388e-c7a8-4f79-84e1-e67c8c258b4c)

_Selected buttons should change shape_

## Accessibility

#### Use cases

People should be able to do the following with assistive technology:

- Navigate to and interact with each button in the group 
- Identify when buttons are selected

#### Interaction & style

Each button in a group should have a minimum 48x48dp target. 

Extra small and small button groups have larger inner padding to ensure accessible targets. Avoid reducing the padding in these sizes.

[Image: Extra small and small button groups with 48x48dp target areas annotated over top. The area is larger than the buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dgm57d-tap%20targets.png?alt=media&token=cf93b998-0435-47db-9f91-0ad62e7362e6)

_1. Extra small button group
2. Small button group_

##### Initial focus

The button group container is not a focusable element. Initial focus should land on the first button in the group and then move to each button.

[Image: Focus order lands on the first button, then the next buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dgsbc6-focus.png?alt=media&token=5e86fe8a-b489-46d5-9b3f-9ce2fdb2d310)

_Initial focus should land on the first button, not on the container_

Use **Tab** to navigate to a button group, the arrow keys to navigate between each item in the group, and **Space** or **Enter** to select a focused button.

[Image: Button group with annotations for navigation with Tab and selecting with Space or Enter.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmu4dvwu6-03.png?alt=media&token=3bd85a0f-514d-4593-8f46-8084663bc39f)

_1. 

**Tab**: Initial focus lands on the first button
2. 

Arrow keys: Navigate between items
3. 

**Space** or **Enter**: Selects a focused item_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Navigate between buttons |
| Arrow keys | Navigate inside the component |
| **Space** or **Enter** | Activate a focused button |

#### Labeling elements

The button group container doesn't need to be labeled. Label each button according to the button and icon button accessibility guidance.

[Image: In a messaging products, an email icon is labelled “email” with the role “button”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0dh20ef-label.png?alt=media&token=a99c4ff1-098a-4c02-91fc-b8510e558d48)

_Label each button within the button group_
