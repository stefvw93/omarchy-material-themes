# Buttons

Source: <https://m3.material.io/components/buttons> (content version 2026-09-23_06-10-05, page updated 2026-07-24T06:19:49.216Z)

## Overview

- 

Two variants: default and toggle
- 

Can contain an optional leading icon
- 

Five color options: elevated, filled, tonal, outlined, and text
- 

Five size recommendations: extra small, small, medium, large, and extra large
- 

Two shape options: round and square
- 

Keep labels concise and use sentence case

[Image: 5 variants of buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm1qv5u-01.png?alt=media&token=70d30001-94b9-4bc2-a894-3b71a78dfb2e)

_1. Elevated button

2. Filled button

3. Filled tonal button

4. Outlined button

5. Text button_

#### Availability & resources

#### M3 Expressive update

**May 2025**

Buttons now have a wider variety of shapes and sizes, toggle functionality, and can change shape when selected. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

Variants and naming:

- 

Default and toggle (selection)
- 

Color styles are now configurations (elevated, filled, tonal, outlined, text)

Shapes: 

- 

Round and square
- 

Shape morphs when pressed
- 

Shape morphs when selected

Sizes:

- 

Extra small
- 

Small (existing, default)
- 

Medium
- 

Large
- 

Extra large

New padding for **small** buttons:

- 

16dp (recommended to match padding of new sizes)
- 

24dp (no longer recommended)

[Image: 4 button changes in the expressive update.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm1tos0-03.png?alt=media&token=dd50e746-4e7b-41f5-8e51-1f26afb86139)

_1. Five sizes

2. Toggle (selection)

3. Two shapes

4. Two small padding widths_

#### Differences from M2

- 

Color: New color mappings and compatibility with dynamic color. Icons and labels now share the same color. Neutral text button is no longer recommended.
- 

Icons: Standard size for leading and trailing icons is now 20dp
- 

Shape: Fully-rounded corner radius and additional height options

[Image: Rectangular M2 buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm1vatd-04.png?alt=media&token=9224dca7-f21c-4dff-812d-3dfb3fa035e6)

_M2: Buttons have a height of 36dp and slightly rounded corner radius_

[Image: Round-cornered M3 buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm1vtk3-05.png?alt=media&token=1f0e0136-6117-4e71-8d6c-d006b6ef3804)

_M3: Default buttons are taller at 40dp and have fully rounded corners_

## Specs

#### Variants

[Image: Diagram comparing buttons with toggle buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmnhhn4lk-01-3P.png?alt=media&token=f2e9d292-4cc2-48bc-89c5-91fedff0ecf1)

_1. 

Default button
2. 

Toggle button_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Default | Available | Available |
| Toggle (selection) | -- | Available |

#### Configurations

[Image: Diagram showing configurations of buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmneq41m-02-3P.png?alt=media&token=505244df-55c9-4406-83ef-9af3c370fb89)

_1. Size

2. Shape

3. Color

4. Small button padding_

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Size | Small (default) | Available | Available |
| XS, M, L, XL | -- | Available |  |
| Shape | Round (default) | Available | Available |
| Square | -- | Available |  |
| Color | Elevated, filled (default), tonal, outlined, text | Available | Available |
| Small button padding | 24dp | Available | Not recommended. Use 16dp |
| 16dp | -- | Available |  |

#### Tokens & specs

Use the table's menu to select a token set. Button token sets are separated into common tokens, color, and size. View baseline tokens (https://m3.material.io/m3/pages/common-buttons/specs#c305d304-a6c0-466a-a48c-8d0718a29ae2)

[Token table: see ../tokens/TOKEN_TABLE.1c4257f8804f9478.md]

#### Anatomy

[Image: Diagram labeling 3 parts of a button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmneqix9-03-3P.png?alt=media&token=05fc9372-a4d6-4e91-9f86-8d2959be78b3)

_1. Container

2. Label text

3. Icon (optional)_

#### Color

Color values are implemented through design tokens. For designers, this means working with color values that correspond with tokens. In implementation, a color value will be a token that references a value.

- 

There are five built-in button color styles: elevated, filled, tonal, outlined, and text
- 

The default and toggle buttons use different colors
- 

Toggle buttons don’t use the text style

starNote:These color roles were chosen to create design coherence and familiarity. Other color roles can be used as long as the container and text have a 3:1 contrast ratio. For example, tertiary and on tertiary.

[Image: Diagram shows dark and light color schemes for buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmner6e7-04-3P.png?alt=media&token=ea59a3bb-f3fc-43ca-af7d-6cc7898c378d)

_A. Elevated, B. Filled, C. Tonal, D. Outlined, E. Text

1. Default

2. Toggle: unselected

3. Toggle: selected_

|  | 1. Default | 2. Toggle unselected | 3. Toggle selected |
| --- | --- | --- | --- |
| Elevated container Elevated icon & label | Surface container low Primary | Surface container low Primary | Primary On primary |
| Filled container Filled icon & label | Primary On primary | Surface container On surface variant | Primary On primary |
| Tonal container Tonal icon & label | Secondary container On secondary container | Secondary container On secondary container | Secondary On secondary |
| Outlined container Outlined icon & label | Outline variant (outline) On surface variant | Outline variant (outline) On surface variant | Inverse surface Inverse on surface |
| Text icon & label | Primary | -- | -- |

#### States

States are visual representations used to communicate the status of a component or interactive element.

##### Elevated button states

The elevated button style has an elevation of 1 by default and 0 when disabled.

###### Default

[Image: Elevated button states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnesmjm-06-3P.png?alt=media&token=96e8c029-e1e8-472e-b4a1-767a8d9b9e1b)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

###### Toggle

[Image: Toggle elevated button states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnet1qn-07-3P.png?alt=media&token=d0320826-723d-4e6b-bce8-36f026c997d1)

_A. Unselected, B. Selected

1. Enabled 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed_

##### Filled button states

###### Default

[Image: Filled button states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmneu2zl-08-3P.png?alt=media&token=85a9b3f6-81d7-45b9-8355-882a776b1004)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

###### Toggle

[Image: Toggle filled button states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmnhkhbya-09-3P.png?alt=media&token=4d91d61b-742a-4cb2-b1c3-bb91c30d7c37)

_A. Unselected, B. Selected

1. Enabled 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed_

##### Tonal button states

###### Default

[Image: Tonal button states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmneuv7c-10-3P.png?alt=media&token=72439eb0-b173-49bb-9e6f-05bbc05fcce6)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

###### Toggle

[Image: Toggle tonal button states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnevsol-11-3P.png?alt=media&token=98ef1d74-1ea3-4dfa-8eb8-423776f5a91f)

_A. Unselected, B. Selected

1. Enabled 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed_

##### Outlined button states

The outlined button’s container fill is invisible at rest, but the opacity and state layers behave the same as other button styles when disabled, hovered, focused, or pressed.

###### Default

[Image: Outlined button states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnewg2s-12-3P.png?alt=media&token=704b2a67-f91b-4d45-83b5-518b79385ac6)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

###### Toggle

[Image: Outlined button states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnexggd-13-3P.png?alt=media&token=105359d5-1b67-45b7-a585-a901da09aeef)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

##### Text button style states

The text button’s container is invisible at rest, but the opacity and state layers behave the same as other button styles when disabled, hovered, focused, or pressed. There is no toggle text button.

[Image: Default text button style states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmneyf25-14-3P.png?alt=media&token=02800d8d-417f-4612-8e0e-3f9edf30f1a6)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

#### Shape morph

##### Pressed state

When pressed, buttons can morph to become more square. Both round and square buttons should have the same pressed shape.

The corner radius value differs for each button size. See full button corner measurements (https://m3.material.io/m3/pages/common-buttons/specs#b1f39738-6f3a-409b-8f08-4cab6d78d756)

[Image: Shape changes of a button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmneyrwe-15-3P.png?alt=media&token=32fe38c8-aa3d-4e9a-b907-b24fa1862a48)

_A. Round button, B. Square button

1. Enabled
2. Hovered
3. Pressed_

##### When selected

In addition to changing shape when pressed, toggle buttons also change the resting shape from round (unselected) to square (selected). 

If the resting unselected shape is square, the selected shape should be round.

[Image: Shape changes of a toggle button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnezbyl-16-3P.png?alt=media&token=c47d2dc2-5f00-4ff1-b616-6617d140d79f)

_A. Round button, B. Square button

1. 

Enabled
2. 

Hovered
3. 

Pressed
4. 

Selected_

#### Measurements

[Image: Diagram of measurements of all button sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnf0bsj-17-3P.png?alt=media&token=4c91ef4a-b41f-4b3a-8797-04d9a810c2ef)

_Padding and size measurements of each button size

1. Extra small

2. Small

3. Medium

4. Large

5. Extra large_

##### Target areas

Extra small and small icon buttons must have a target size of 48x48dp or larger to be accessible.

[Image: Diagram of small button target areas.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnf0o8e-18-3P.png?alt=media&token=7107e16a-9ec0-4cd3-ad00-ba2e2bb75514)

_A. Extra small  B. Small

1. Round button 
2. Button with icon
3. Square button_

##### Corner sizes

[Image: Diagram of corner radii of buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmnf14u5-19-3P.png?alt=media&token=8caa9040-a710-4f1f-a6a4-d0bfd85fe7b5)

__

|  | XS | S | M | L | XL |
| --- | --- | --- | --- | --- | --- |
| A. Round button | Full | Full | Full | Full | Full |
| B. Square button | 12dp | 12dp | 16dp | 28dp | 28dp |
| C. Pressed state | 8dp | 8dp | 12dp | 16dp | 16dp |

#### Baseline tokens

Use the table's menu to switch token sets. The baseline button token sets are organized by color.

[Token table: see ../tokens/TOKEN_TABLE.1c4257f8804f9478.md]

## Guidelines

[Image: Buttons in various shapes and sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlqkp7g-01.png?alt=media&token=c1c12c3d-5ace-487d-b762-40d02f56a986)

_Buttons and icon buttons come in many shapes, styles, and sizes_

#### Usage

Buttons communicate actions that people can take. They are typically placed throughout the UI, in places like:

- 

Dialogs
- 

Modal windows
- 

Forms
- 

Cards
- 

Toolbars

They can also be placed within standard button groups.

[Video: Video call app with prominent filled button to join and end a call.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlqnl0b-GM3%20-%20Commom%20Buttons%20-%20Guidelines%2002%20-%20v01.mp4?alt=media&token=0276f496-231c-4f41-bf90-601156e17612)

_Use visually-prominent filled buttons for the most important actions_

Buttons are just one option for representing actions in a product and shouldn’t be overused. Too many buttons on a screen can disrupt the visual hierarchy.

Consider placing additional actions in a navigation rail, set of chips, text links, or icon buttons.

[Image: 1 button placed on bottom right of screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlqpj6e-03-do.png?alt=media&token=44ffcad0-9941-40c9-b81c-ed3a24c3da63)

_Use buttons for discrete actions_

[Image: 3 buttons side by side on bottom of screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlqpykn-04-don't.png?alt=media&token=b9cd6a77-a1a5-41ce-8a05-fdbe66bb0c4b)

_Don’t clutter your UI with too many buttons. Consider presenting low-priority actions in overflow menus or as icon buttons._

[Image: Filled button on menu screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlqs2ix-05-do.png?alt=media&token=fc0a63d6-3e53-4391-8565-a1203f8b80e4)

_A button container’s width is dynamically set to fit its label text_

[Image: Filled button as wide as layout grid.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlqslcx-06-do.png?alt=media&token=b8da8214-88dd-4716-aa64-0a81913707a9)

_Button container width can be responsive, which allows it to stretch horizontally_

[Image: Filled button with label text overflowing the container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlqt8jf-07-don't.png?alt=media&token=bb358432-4153-45ea-a6cf-8f1842a59bfd)

_A button container’s width shouldn’t be narrower than its label text_

[Image: Diagram of button styles and toggle behaviors.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlquaj1-08.png?alt=media&token=abfb2cc4-cd8a-470e-b5c1-8ab8aeaf151c)

_A: Default button; B: Toggle (unselected); C: Toggle (selected) for five button styles, in order of emphasis:

1. Elevated button

2. Filled button

3. Filled tonal button

4. Outlined button
5. Text button_

A button group is a collection of buttons that relate to each other and can respond to one another. Both buttons and icon buttons can be used inside a button group.

In some cases, there are primary and secondary actions within a button group. Buttons with primary actions should have a higher visual emphasis through size, color, or shape.

More on button groups (https://m3.material.io/m3/pages/button-groups/overview)

[Image: Audio app with play, next, and back buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm3t81e1q-9.png?alt=media&token=e2b715eb-67a4-43b8-91c6-9636566aa8e5)

_Different sized buttons in a button group help emphasize the main action from secondary actions_

#### Toggle buttons

Toggle buttons should be used for binary selections, such as **Save** or **Favorite**. When toggle buttons are pressed, they can change color, shape, and labels.

Toggle buttons should use an outlined icon when unselected, and a filled version of the icon when selected. If a filled version doesn’t exist, increase the weight instead.

By default, toggle buttons change from round to square when selected.

[Video: Toggle “stop” button in timer app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlt2zdp-GM3%20-%20Commom%20Buttons%20-%20Guidelines%2010%20-%20v01.mp4?alt=media&token=5bcc30f8-46d3-4c32-b013-61e8eee3ca77)

_Use toggle buttons for binary actions_

If the label changes on selected or unselected states, be mindful of the character count. Changing the label significantly is disruptive to the user and the page layout.

[Image: Toggleable “start” and “reset” buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlt4ivd-11-do.png?alt=media&token=c9fb6a62-d890-4a3d-bf5b-7422a2f61559)

_When using toggleable buttons, keep the label character count a similar length for both states_

[Image: Toggleable “start” and “reset back to beginning” buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlt52gk-12-dont.png?alt=media&token=610e1d0c-2aae-457f-a35b-3c5f35ff529d)

_The label length shouldn’t change dramatically to be longer or shorter_

#### Anatomy

[Image: 3 parts of a button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlt6b63-13.png?alt=media&token=3e1cc932-b5a8-4073-895c-c9a82e440389)

_1. Label text
2. Container
3. Icon (optional)_

##### Label text

Label text is the most important element of a button. It describes the action that will occur if someone taps a button. It should be very brief, ideally 1–3 words.

Use sentence case, which only capitalizes the first word and proper nouns. This allows the text to distinguish proper nouns, for example: **Book with Flights**, not **BOOK WITH FLIGHTS**.

Don’t truncate or wrap label text. It should always be fully visible on a single line.

[Image: Button with label text “See all recipes.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlt7k3u-14-do.png?alt=media&token=a0f24e42-b668-44a2-86ab-54f23b4d02fe)

_Use sentence case for button label text, capitalizing the first word and proper nouns_

[Image: Button with wrapped label.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlt7yj0-15-dont.png?alt=media&token=2a87a5e3-0fd2-428f-ab40-30a582e7ebf2)

_Don’t wrap text. For maximum legibility, label text should remain on a single line._

Buttons with the **outlined** and **text** color style depend on the colors to be recognizable from other text and elements. Use caution when putting these buttons next to visually similar elements, such as chips or large text.

[Image: Chips next to an outlined button, highlighting their similarities.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlt97u1-16-%20caution.png?alt=media&token=34a62dc9-f6cb-4587-ae11-3e94ea292368)

_The outlined button style is very similar to chips. Consider using a filled or tonal button instead._

##### Container

Button containers hold the label text and optional icon. Buttons with the **text** color style have a visible container only when hovered, focused, or pressed.

Buttons with a round shape have containers with fully rounded corners.

[Image: Round button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltabq2-17.png?alt=media&token=3243bd37-e440-4c5b-80bf-a0b52a8add85)

_Round buttons have containers with fully rounded corners_

Buttons with a square shape have containers with more subtle rounding that changes based on button size.

[Image: Square buttons with different radii.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltba1r-18.png?alt=media&token=e95cfb22-2c73-4e46-9487-6b8631825ea1)

_Square buttons have square containers and change radius as the button size changes_

[Image: Button with the label text “Edit playlist” within the container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltc6hg-19-do.png?alt=media&token=e0d8dcf9-04fc-43a3-82b4-3fede8465b92)

_A button’s width dynamically adjusts to the label text_

[Image: Button with text larger than its container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltdu8d-20-dont.png?alt=media&token=ded7ea31-582e-4d48-b65e-e6bc59d4f05d)

_Avoid setting a fixed width smaller than the label text_

##### Icon (optional)

Icons visually communicate the button’s action and help draw attention. They should be placed on the leading side of the button, before the label text.

[Image: Filled button with the icon to the left of the label in a left-to-right language.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltfge9-21-do.png?alt=media&token=f4135876-e1ff-40d8-9a91-cfef0b8f259d)

_Place the icon to the left of the label in buttons with text in left-to-right languages_

[Image: Filled button with the icon to the right of the label in a right-to-left language.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltfyz4-22-do.png?alt=media&token=3f665701-89ef-4521-84f0-966e7110def9)

_Place the icon to the right of the label in buttons with text in right-to-left languages_

[Image: Button with shopping cart icon and text label “Add to cart”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlthjj7-23-do.png?alt=media&token=e21c8cc7-91da-4601-8492-d37969d1e9dc)

_Use icons that clearly communicate their meaning_

[Image: Button with Plus icon vertically above the text label “Add to watch list”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltnhb2-24-dont.png?alt=media&token=e4b099f1-c4aa-4a8f-b756-433ecbb9f56c)

_Don’t vertically align an icon and text in the center of a button_

[Image: Button with two icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltof7i-25-dont.png?alt=media&token=f77a7931-b8cf-4c2e-a3ac-a4900fb98687)

_Don’t use two icons in the same button_

#### Color styles

##### Elevated style

The **elevated** button style is the same as the tonal button, but with a shadow. 

To avoid overusing shadows, use the elevated style only when absolutely necessary, such as when the button requires visual separation from a visually prominent background.

[Image: Elevated button on a scrim background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltpyn5-26.png?alt=media&token=6c2d5489-702e-4bab-98cf-97d25125097f)

_Elevated buttons provide separation from a visually prominent background_

Buttons at higher elevations typically have more emphasis in a design, and should be used sparingly. For high emphasis, consider the filled style instead.

[Image: Elevated button in a shopping experience.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmltrnw9-27-caution.png?alt=media&token=d0366943-f432-47ed-874d-3c83d7e123dd)

_Higher elevation increases the emphasis of a button_

##### Filled style

The **filled** button style has the most visual impact after the FAB, and should be used for important, final actions that complete a flow, like **Save**, **Join now**, or **Confirm**.

[Image: Filled button reading “Make payment.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlz52ml-28.png?alt=media&token=fef70047-9440-457d-ae89-c447238d1115)

_Filled buttons have high visual impact when used for important actions_

Since they have such strong emphasis, the filled style should be used sparingly, ideally for only one action on a page.

In some cases, filled buttons can use tertiary colors.

[Image: Filled “pause” button in a music app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmlz6rew-29.png?alt=media&token=faaff6d9-2924-4206-9247-d6ab7d4a3688)

_Filled buttons can be responsive to the layout grid and help emphasize main actions_

##### Tonal style

The **tonal** button style is useful in contexts where a lower-priority button requires slightly more emphasis than an outline would give, such as **Next** in an onboarding flow. Tonal buttons use the secondary color mapping.

[Image: Shopping app with 2 tonal-style filled buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0gmxc-30.png?alt=media&token=c5d6ee0a-a428-4078-b549-67fc7b9dc9fe)

_The tonal style has less emphasis than filled or emphasis_

##### Outlined style

The **outlined** style is ideal for medium-emphasis buttons which contain actions that are important, but aren’t the primary action in a product.

Outlined buttons pair well with filled buttons to indicate alternative, secondary actions.

[Image: Outlined buttons for less important actions, including a back button and a button that reads “Next movie.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0loal-31.png?alt=media&token=56c7832d-e72a-48c8-a9fa-249143bdf7c8)

_Outlined buttons contain less important supporting actions_

Outlined buttons display a stroke around the button container, and have no fill by default. 

They should be placed on simple backgrounds, not visually prominent backgrounds such as images or videos.

[Image: Outlined button for “add to cart” in shopping app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0mtua-32.png?alt=media&token=d970ea42-6342-4a5d-a870-c2d815a4bd99)

_Outlined buttons display a stroke around the button container_

[Image: Outlined button labeled Add to calendar on a pink/purple background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0nymp-33-do.png?alt=media&token=273452ac-d5a6-4e34-8985-feb9bd959734)

_Outlined buttons can be used on backgrounds with a color gradient_

[Image: 2 photos, each with an outlined button with a custom fill.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0oqjx-34-caution.png?alt=media&token=4fd49a85-1e2b-48e9-8362-2ae1c54f6069)

_Use caution when placing outlined buttons on top of images. Customizing the button to have a contrasting container fill can help ensure legibility of label text. Or, use a filled button instead._

##### Text style

The text button style should be used for the lowest priority actions, especially when presenting multiple options.

They should be placed on simple backgrounds, not visually prominent backgrounds such as images or videos. The container isn’t visible until someone interacts with the button.

Don’t underline the text button. Use hyperlinked body text instead to emphasize links. More on hyperlinks (https://m3.material.io/m3/pages/typography/applying-type#24856f70-f759-45df-a06c-92018f286083)

[Image: Example calendar screen with 2 text buttons and 1 split button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0q822-35.png?alt=media&token=5003669f-ec2e-46dc-980b-729d0e7b997d)

_Use text buttons for the lowest priority actions_

Text buttons are often placed within components such as cards, dialogs, and snackbars. Since text buttons don’t have a visible container in their default state, they don’t distract from nearby content.

However, since there’s no container, the label text color must always be recognizable from non-button text and elements.

[Image: Text button labeled “Retry” in a snackbar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0rpw4-36.png?alt=media&token=f1a2fb6d-e0e3-4027-a3a6-502a53062cef)

_Text button in a snackbar_

[Image: Text button labeled “View album” on an album cover background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0s6c1-37.png?alt=media&token=b9f5d341-907c-4a1b-bf78-8d096b88b14e)

_Text button against an image background_

In cards, text buttons help maintain an emphasis on card content.

[Image: Text button labeled “Learn more” in an information card about sourdough bread.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0tlmd-38.png?alt=media&token=02609475-05bc-4471-8440-9693bc1376d4)

_Text button in a card_

Dialogs use text buttons because the absence of a container helps unify the action with the dialog text.

Align text buttons to the trailing edge of dialogs, on the right for left-to-right languages and on the left for right-to-left languages.

[Image: Modal dialog with the title “Subscribe to our newsletter?” and trailing buttons “Cancel” and “Subscribe”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0v0go-39.png?alt=media&token=de02d8e1-5945-4cb1-b49c-7657c6f0f62e)

_Text buttons in a dialog_

#### Adaptive design

##### Resizing

When scaling layouts for large screen devices, buttons can adapt their visual presentation, size, alignment, and arrangement to fit different contexts and user needs.

Choose the best button position based on screen size.

[Image: Flights app in compact screen with buttons below flight information.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0vwgx-41.png?alt=media&token=637aef82-3430-42ff-97ea-88893d58bddc)

_Filled buttons are end-aligned below flight information in a compact window_

[Image: Flights app in large screen with buttons to the left of flight information.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0wuqe-40.png?alt=media&token=17208180-460d-4c83-bc37-f329ccfbf635)

_Filled buttons are start-aligned beside flight information in a large window_

The icon and label text in a button stay centered and grouped as the button's width changes.

[Image: 2 buttons with horizontally centered text labels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0y1g6-42-do.png?alt=media&token=9a22488d-9452-4b1b-9ac8-a4339586395f)

_Keep the icon and label text grouped and centered_

[Image: 1 button with centered text label, 1 button with icon and label aligned to opposite edges.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0yith-43-dont.png?alt=media&token=fb0cac8b-107b-468d-b78a-6e45e9cbc210)

_Don't ungroup the icon and label text or let them anchor to opposite sides of the button_

Buttons can be customized to change size and scaling behavior across different breakpoints. 

To avoid creating very long buttons in large windows, constrain button width or place buttons beside other elements.

[Image: Button width is over-stretched with screen width.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm0zsof-44-dont.png?alt=media&token=ec507156-01a8-4748-ac54-faaa752d80c8)

_Don’t allow the button to stretch in a way that creates long, flat buttons with very little content inside_

##### Presentation

The size and placement of buttons can change as parent containers, such as cards, adapt for larger screens. 

Keep items, including buttons, in the same order between large and small screens to provide a consistent experience for screen readers and keyboard navigation.

[Image: 2 buttons scaling to accommodate different device sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm11hfb-45.png?alt=media&token=579a6e7a-1f3d-4601-8ee9-643aa062203c)

_Buttons can move in the layout, but elements should remain in the same order_

## Accessibility

#### Use cases

People should be able to do the following with assistive technology: 

- Use a button to perform an action
- Navigate to and activate a button

#### Interaction & style

##### Color contrast

Enabled buttons need a 3:1 contrast ratio with the background to meet accessibility best practices. 

This is measured from the container for elevated, filled, and tonal button styles, and the label text for outlined and text button styles.

[Image: Diagram of color contrast ratios for buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm13hkn-01.png?alt=media&token=430a76cd-fd79-4d94-9524-a728d101de7e)

_Higher contrast helps differentiate elements_

##### 200% text size

Avoid excessive text wrapping or truncation by choosing concise strings. 

On Android, button labels should be kept concise enough to fit within two lines after the text size is increased to 200%. If a button label exceeds this limit and gets truncated, provide an alternative way to access the full content in a single tap.

[Image: 200% text size on a mobile screen. The overly long button text wraps to a second line: “Download playlist for offline access”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm14hok-02-caution.png?alt=media&token=0bccb054-e80b-44a1-9602-edbfc79ccbe0)

_Avoid excessive text wrapping or truncation by choosing concise strings_

##### Rapid clicks

On the web, you can use a modified motion curve to avoid resonant effects from overlapping animations. This provides a smoother experience for interactions where you anticipate multiple clicks or taps in succession.

[Video: A media player where the “next track” button is clicked rapidly, and is transformed with a smooth motion effect.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm15x7t-GM3_Buttons_Accesibility%2004%20-%20v02.mp4?alt=media&token=3e6f0315-1423-46f7-9357-4506333a0264)

_Use the modified motion curve if rapid click or pointer interactions are expected_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Tab | Navigate to a button |
| Space or Enter | Activate a button |

#### Labeling elements

The accessibility label for a button should match the visible label text on the button such as **Done**, **Send**, or **Reply**. 

It can contain extra contextual information if necessary.

[Image: Accessibility tags for a text-only button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmmm17kt7-03.png?alt=media&token=90f85f9d-911a-4ad5-9a83-495e6e6445e3)
