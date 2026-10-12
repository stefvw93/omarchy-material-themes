# Segmented buttons

Source: <https://m3.material.io/components/segmented-buttons> (content version 2026-09-23_06-10-05, page updated 2026-09-16T18:18:17.328Z)

## Overview

starNote:Segmented buttons are no longer recommended in the Material 3 expressive update. For those who have updated, use the connected button group (https://m3.material.io/m3/pages/button-groups/overview/) instead, which has mostly the same functionality but with an updated visual design.

- 

Segmented buttons can contain icons, label text, or both
- 

Two variants: single-select and multi-select
- 

Use for simple choices between two to five items (for more items or complex choices, use chips)

[Image: Two variants of segmented buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7qvais-1.png?alt=media&token=52a09b72-85ab-4f14-93a4-0738235fef83)

_1. Single-select segmented button
2. Multi-select segmented button_

#### Availability & resources

#### M3 Expressive update

**May 2025**

The segmented button is no longer recommended. Use the connected button group (https://m3.material.io/m3/pages/button-groups/overview/) instead. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

#### Differences from M2

- 

**Color:** New color mappings and compatibility with dynamic color
- 

**Icons:** Optional check icon to indicate selected state
- 

**Layout:** Taller container height of 40dp
- 

**Name and variants:** Segmented buttons were previously known as toggle buttons. They now have two official variants: single-select and multi-select.
- 

**Shape:** Fully rounded corners
- 

**Typography: **Labels use sentence case instead of all caps

[Image: Diagram indicating the fully rounded corner radius of a segmented button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhr0fyz-2.png?alt=media&token=246e78a8-1e67-45c6-a7b7-552681fce036)

_Segmented buttons now have a container height of 40dp_

[Image: Segmented buttons with M2 color mappings, all caps text labels, boxy shape, and shorter height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fl20oj7ju-example.png?alt=media&token=9a695831-7fd8-4af8-ad34-b16a30ee5e32)

_M2: Segmented buttons had a small corner radius and label text in all caps_

[Image: Segmented buttons with M3 color mappings, sentence case text labels, fully round shape, and taller height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7ruslm-4.png?alt=media&token=f5efc802-2c9c-4a7d-98f6-1e92ef9b4c76)

_M3: Segmented buttons have fully rounded corners, sentence-case text, different height, and new color mappings_

## Specs

starNote: Segmented buttons are no longer recommended in the Material 3 expressive update. For those who have updated, use the connected button group (https://m3.material.io/m3/pages/button-groups/overview/) instead, which has mostly the same functionality but with an updated visual design.

[Image: Diagram of segmented button indicating 3 parts of its anatomy.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6l9syf-1.png?alt=media&token=6f061b57-7ba3-4b4a-8d05-48c819cb5aa8)

_1. Container
2. Icon (optional for unselected state) 
3. Label text_

#### Tokens and specs

Browse the component elements, attributes, tokens, and their values. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.67e2613d87ca6f98.md]

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Diagram of segmented button indicating its color mappings](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6lafzx-2.png?alt=media&token=5e27c91f-def3-4bd7-b695-1ab003bcbf6e)

_Segmented button color roles used for light and dark schemes:

1. On surface
2. Outline
3. Secondary container
4. On secondary container_

#### States

States are visual representations used to communicate the status of a component or interactive element.  Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

##### Unselected

[Image: Side by side view of segmented buttons with 5 unselected states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6law70-3b.png?alt=media&token=c4bc48ed-8fdf-487b-8523-05454e22d786)

_Unselected button states:

1. Enabled 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed_

##### Selected

[Image: Side by side view of segmented buttons with 4 selected states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6lbdzb-4b.png?alt=media&token=83d2c823-d412-4284-80e0-6d5f27141c63)

_Selected button states:

1. Selected 
2. Hovered on selected
3. Focused on selected
4. Pressed on selected_

#### Measurements

[Image: Diagram indicating layout values, paddings, and target size for segmented buttons](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmp8rn0c-5-3P.png?alt=media&token=ecf7d32e-1b88-45e0-a33f-0cb132870814)

_1. Padding and container size 
2. Target size_

| Attribute | Value |
| --- | --- |
| Container width | Dynamic based on labels |
| Segment width | Container width / total segments (Example: 1/3) |
| Height | 40dp |
| Outline width | 1dp |
| Label alignment | Center |
| Left/right padding | Min 12dp |
| Padding between elements | 8dp |
| Target size | 48dp |

##### Density

Density can be used in denser UIs where space is limited. Density is only applied to the height.

[Image: Side by side view of segmented buttons with 4 different density heights](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6lc5hl-6.png?alt=media&token=f45257f0-41dc-4045-b92b-22ea302cc4c7)

_Each step down in density removes 4dp from the height_

## Guidelines

starNote:Segmented buttons are no longer recommended in the Material 3 expressive update. For those who have updated, use the connected button group (https://m3.material.io/m3/pages/button-groups/overview/) instead, which has mostly the same functionality but with an updated visual design.

[Image: Two types of segmented buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7mlxdq-1.png?alt=media&token=e2fd2652-48e7-4a3d-9203-c8451a77c27a)

_1. Single-select 
2. Multi-select_

#### Usage

Segmented buttons help people select options, switch views, or sort elements.

[Image: A segmented button for switching between restaurants and bar options.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7mnnk2-2.png?alt=media&token=0621a46b-ddcb-4ee9-b3de-b1b7be908b9d)

_A segmented button can help switch between viewing restaurant and bar options_

There are 2 variants of segmented buttons:

1. 

Single-select
2. 

Multi-select

[Image: Side by side view of single and multi-select segmented buttons](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7mz9ev-3.png?alt=media&token=6ac60657-7e18-4b03-81cb-23e97d4596c0)

_1. Single-select segmented button can only have 1 segment selected
2. Multi-select segmented button can have multiple segments selected_

#### Anatomy

[Image: Diagram of segmented button indicating 5 parts of its anatomy](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7n59nt-4.png?alt=media&token=42169c2e-9e9e-45a1-b3a7-44b5354fcddd)

_1. Segment
2. Container
3. Icon (optional)
4. Label text (optional)
5. Selected icon_

##### Segments

Segmented buttons can have 2-5 segments. Each segment is clearly divided and contains label text, an icon, or both.

[Image: Side by side view of segmented buttons each with additional segment starting from 2 to 5](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7nap4m-5.png?alt=media&token=0561fbc5-65b2-4d96-a0de-8f4ec03c3431)

_There can be anywhere from 2 to 5 segments in single-select and multi-select segmented buttons_

[Image: Mobile UI of data usage screen with segmented button](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7ngd39-6_do.png?alt=media&token=17b77bb9-147e-4b1a-b0fb-8e4ea445e7a0)

_Segmented buttons are best used for selecting between 2 and 5 choices_

[Image: Incorrect use of segmented button with 6 segments](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7o4u2i-7_dont.png?alt=media&token=75e065ae-9d24-4a76-9261-7db3988ff869)

_Don’t use more than five segments in a single segmented button. Choices should be scoped. If you have more than five choices, consider using another component, such as chips._

##### Container

Like common buttons, segmented buttons have fully rounded corners by default.

[Image: Close up detail of segmented button with fully rounded corners](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7o7un8-8.png?alt=media&token=0ccf0509-584f-437c-8a5f-dbfb97aae0ed)

_Segmented buttons have fully rounded corners_

##### Icons

Icons may be used as labels by themselves or alongside text. 

If an icon is used without label text, it must clearly communicate the option it represents.

[Image: Side by side view of segmented buttons with different configurations of icons and label text](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7okkk9-9.png?alt=media&token=b185e6ab-2a5e-4d29-9989-52b66176df7b)

_Segmented buttons can include icons_

##### Label text

Labels should be short and succinct. If a label is too long to fit within its segment, consider using an icon alone.

[Image: Mobile UI of music app showing a segmented button with options for music, albums, podcasts](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7omu8a-10.png?alt=media&token=a0044742-6660-4d12-b7eb-c168a9e4ea3a)

_Use labels that are as clear and short as possible_

[Image: Segmented button with options for day, week, month](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7pqz1e-11_do.png?alt=media&token=5f954b64-e2d8-4fef-a0a5-e56c9fba0bd3)

_Keep labels short and consistent in length_

[Image: Segmented button with 4 segments. 3 are next to each other. The 4th is wrapped on a new line.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7prory-12_dont.png?alt=media&token=72743d41-4ba5-48b8-a3eb-0c386ab4ac66)

_Don’t allow segments to wrap onto a new line_

[Image: Segmented button with text labels reading day, week, month](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7psieh-13_do.png?alt=media&token=30b7bff6-d892-4765-93c8-a4712aaf1cd3)

_Use consistent label types_

[Image: Segmented button with icons only labels for walking, transit, driving](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7pt9gl-14_caution.png?alt=media&token=94a71ac1-5be5-4376-8f8e-8eac93aa3f1b)

_Icons can be used in place of labels, but they must clearly communicate their meaning_

[Image: Segmented button with 2 icon only options indicating favorite and bookmark and 3rd option with text label reading recent](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7ptzzf-15_dont.png?alt=media&token=bbfbde3d-e104-4cd8-9aae-6a7e3aed50e9)

_Avoid mixing icon-only labels with text labels. Choose one label type and use that type for all segments._

#### Single-select

Use a single-select segmented button to select one option from a set, switch between views, or sort elements from up to five options. 

For example, use a single-select segmented button to choose one of a set of sizes, such as this beverage size selector.

[Image: Mobile UI for ecommerce app with segmented button with 3 beverage size options](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7puwq3-16.png?alt=media&token=523ecc2f-a2df-4442-8e24-cf65c64c83d7)

_A single select segmented button for choosing beverage size_

#### Multi-select

Use a multi-select segmented button to select or sort from two to five options. Unlike single-select, selection is not required and a user may concurrently select anywhere from all to none of the options. 

For example, multi-select segmented buttons can be used to filter by price range when searching for a restaurant.

[Image: Mobile UI for ecommerce app with multi-select segmented button with 4 price range options](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7pvpf7-17.png?alt=media&token=3aa4f45c-50e9-4de0-a6c1-6325df4a89a1)

_A multi-select segmented button for filtering restaurant search options_

#### Placement

Segmented buttons should have adequate margins from the edge of the viewport or frame. 

On larger screens, set a maximum padding for all button segments so the set doesn't fill the screen.

[Image: Mobile UI with 2-segment segmented button and 4-segment segmented button each with same margins to the viewport edge.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7pwh9i-18.png?alt=media&token=cd37d565-662f-48b9-b036-57fdce8f001d)

_Allow adequate space for margins. The button container shouldn’t reach the edge of the viewport._

[Image: Game store UI with a segmented button the proper width](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7pxu9q-18-a_do.png?alt=media&token=4c28374e-4793-49c8-9988-4c8ebdc009d7)

_Set a maximum padding within the segments to ensure usability on larger screens_

[Image: Game store UI with a segmented button improperly spanning the entire width of the screen](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7pyzy1-18-b_dont.png?alt=media&token=d6675cb8-414c-4214-a099-1643383404b9)

_Don’t allow segmented buttons to span the full width of larger screens or panes. This can leave too much padding on either side of the segment label, making the button less usable._

Segmented buttons can be placed on other components, such as bottom sheets or full-screen dialogs.

[Image: Mobile UI with segmented button in bottom sheet](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7q0vrm-19.png?alt=media&token=f3152999-f72c-4cfd-9c6b-b095bd997085)

_A segmented button can be placed on a bottom sheet_

#### Behavior

When using both icons and label text in segmented buttons, the icon label is replaced by the checkmark icon when the segment is selected.

[Video: Segmented button with icon and text labels with checkmark icon in selected segment](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmq6a9huq-GM3%20-%20Buttons%20-%20Segmented%20Buttons%20-%20Guidelines%2001%20-%20IA%20-%20v02.mp4?alt=media&token=f3c4af21-a996-41ba-8546-c02c82e992f4)

_Icons become checkmarks when selected in buttons that also use label text_

## Accessibility

starNote:Segmented buttons are no longer recommended in the Material 3 expressive update. For those who have updated, use the connected button group (https://m3.material.io/m3/pages/button-groups/overview/) instead, which has mostly the same functionality but with an updated visual design.

#### Use cases

Users should be able to:

- Navigate to and activate segmented buttons with assistive tech
- Understand what each segment selection will do

##### Interaction & style

For keyboard navigation, **Tab** navigates to the button, and arrow keys navigate between the individual segments.

For single-select segments, **Space** or **Enter** will select or unselect the focused segment. 

For multi-select segments, **Space** or **Enter** will:

- 

Select an unselected segment
- 

Select all of the segments
- 

Unselect a selected segment

[Image: Tab moves the focus through segments of a segmented button. Space or enter selects and unselects segments.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7q4935-1.png?alt=media&token=99802213-76ba-4f6a-8e7b-ea8daf0b2bc3)

_Use **Tab** to navigate through segments, and **Space **or **Enter** to select and unselect_

##### Color contrast

Segmented buttons are clusters of similar components, so the outline should have at least a 3:1 contrast ratio with the background or surface. This helps distinguish each button.

Both a checkmark icon and a color change are used to distinguish selection. Make sure color isn’t the only way to show selection.

[Image: The outline of segmented buttons on the surface passes the minimum contrast of 3:1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7q6k39-2_do.png?alt=media&token=15790494-3f50-40ef-990b-7dde7e714d61)

_Use an outline with a surface contrast of at least 3:1_

[Image: The outline of segmented buttons on the surface fails the minimum contrast of 3:1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7q87p2-3_dont.png?alt=media&token=f935fbc2-5a75-4d24-91a3-ed026030dd63)

_The segmented button shouldn't have a contrast outline less than 3:1_

##### Initial focus

Focus will start in the first segment. Depending on the direction of the language, it is either the most left or the most right segment.

For single select and multi-select, the first segment will be focused regardless of selection state.

[Image: Segmented button focus starts on the left for left-to-right languages and on the right for right-to-left languages.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7q9t4x-4.png?alt=media&token=df0560b5-2880-402a-a0ad-ae84c4e2e2c1)

_Focus begins on the left for left-to-right languages and on the right for right-to-left languages_

##### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Navigate between buttons |
| Arrow keys | Navigate inside the component |
| **Space** or **Enter** | Activate a focused button |

##### Labeling elements

The accessibility label for a segmented button comes from the visible label text on such as **Relevance** and **Distance**. 

If the segmented button displays icons without label text, the accessibility label describes the action that the button is expressing, such as **Inexpensive** for one currency symbol.

[Image: The the text and accessibility role for the left-most section of a segmented button following “sort by” is is “relevance.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7qcq3h-5.png?alt=media&token=24534d45-c04c-46d9-a747-04aeeefd11ff)

_The label for segmented button matches the text label_

Single-select segmented buttons behave like radio buttons: only one option can be selected at a time. The label is **Radiogroup**.

Multi-select buttons behave like checkboxes: more than one option can be selected. The label is **Checkbox**.

[Image: Selected price range segmented buttons range from $ to $$$$. The accessibility label of the $ button is “inexpensive.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7qpwe0-6.png?alt=media&token=a73ad3f4-0a14-4075-b015-dbe86ef3ec0f)

_The role for the multi-select segmented button is **Checkbox**_
