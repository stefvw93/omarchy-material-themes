# Lists

Source: <https://m3.material.io/components/lists> (content version 2026-09-23_06-10-05, page updated 2026-08-06T17:09:16.197Z)

## Overview

- 

Use lists to help people find a specific item and act on it
- 

Order list items in logical ways, like alphabetical or numerical
- 

Keep items short and easy to scan
- 

Show icons, text, and actions in a consistent format
- 

Choose between standard and segmented styles

[Image: 1 list contains 3 items, each with a label text, supporting text, and trailing text. A music app shows list items with leading images.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8nxjh0-01.png?alt=media&token=c030c446-c1e4-46b4-b732-cf0f8bb19bd5)

_A list item's label text, supporting text, image, and trailing icon can be customized to create a variety of lists_

#### Availability & resources

#### M3 Expressive update

Lists have a new segmented visual style, improved selection treatment, and support for slots. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

**December 2025** 

Variants:

- 

Added **expressive** list

  - 

Recommended for new designs

- 

List (baseline) is still available

New visual styles:

- 

Standard or segmented
- 

Highlighted selection states
- 

Flexible slots

Supported platforms:

- 

Android Views (MDC-Android) (https://github.com/material-components/material-components-android/blob/master/docs/components/List.md#m3-expressive)
- 

Jetpack Compose (https://developer.android.com/reference/kotlin/androidx/compose/material3/package-summary#ListItem%28kotlin.Function0,androidx.compose.ui.Modifier,kotlin.Function0,kotlin.Function0,kotlin.Function0,kotlin.Function0,androidx.compose.material3.ListItemColors,androidx.compose.ui.unit.Dp,androidx.compose.ui.unit.Dp%29)

[Image: 2 party planning lists with 2 completed list items each. In 1 list, the selected items are highlighted.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8pwbjv-02.png?alt=media&token=dc992ed3-06fd-4d06-aaab-249562097efc)

_Expressive lists feature improved selection states_

#### Differences from M2 to M3 baseline

- 

**Color:** New color mappings and compatibility with dynamic color
- 

**Layout:** Padding and spacing rules are updated to be more consistent
- 

**Height:** The tallest element within a list item determines the list item’s height - either 56dp, 72dp, or 88dp
- 

**Alignment:**

  - 

In most cases, elements in a list item are middle-aligned
  - 

If a list is 88dp or larger, or contains three or more lines of text, elements are top-aligned

[Image: 3 variants of lists in M2.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8q1tdh-03.png?alt=media&token=5845ac54-f92c-41e8-8290-fac24588b690)

_M2: Non-standard heights and alignments_

[Image: 3 variants of lists in M3 baseline.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8q2xsp-04.png?alt=media&token=df0c89b9-3118-4fad-bd02-8b9bd51cc98f)

_M3 (baseline): Standardized heights and alignments_

## Specs

#### Variants

##### Expressive lists

Use the expressive list variant for more flexible styling, highlighted selection states, and customizable slots.

[Image: 2 expressive lists: a photos list on a tablet, and a song list on mobile.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmio97lfj-01-3P.png?alt=media&token=65cdf253-7e5c-4de4-9cb2-b13c5f066963)

_An **expressive list** has a segmented style and round corners_

##### Baseline lists

Baseline lists are still available to use, but don’t have the latest visual style, selection treatment, and slot functionality.

On web, expressive lists are built on top of baseline lists.

See baseline list specs (https://m3.material.io/m3/pages/lists/specs#94cf7f4d-fe29-4fab-9aae-a99e9b754329)

[Image: 3 baseline list items with square corners.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmio98r05-02-3P-VQA.png?alt=media&token=e21c7359-73e5-4cbb-8e8a-83b6fb3f46c9)

_**Baseline list items** have square corners and standard colors_

| **Variants** | **M3** | **M3 Expressive** |
| --- | --- | --- |
| Lists (expressive) | -- | Available |
| Lists (baseline) | Available | Not recommended. Use expressive lists instead. |

#### Configurations

##### Styles

The standard and segmented styles are a visual choice, and don’t affect a list’s behavior.

[Image: A standard list and segmented list in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmio99zjp-03-3P.png?alt=media&token=3a22c3a3-4de8-4def-94c7-ec35a39129b5)

_1. 

Standard
2. 

Segmented_

##### List selection

A list can have only one selection mode at a time. For example, a single-action list can change to a multi-select list, but can’t be both at once.

[Image: A single-action list with 4 items and no additional actions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmio9bca0-04-3P-singleaction.png?alt=media&token=8619eeab-8329-4101-a6a3-38f86e8596ed)

_In a **single-action list**, each item is a single tappable area_

[Image: A list with 4 items. Each item has 2 trailing icons for additional actions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmio9ecsb-05-3P-multiaction.png?alt=media&token=233ffebc-aaa4-4ea0-8785-3f9254c3d90f)

_**Multi-action list** items include a primary action, and one or more secondary actions_

[Image: A list with 1 item selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmio9x63z-06-3P-singleselect.png?alt=media&token=bf84fd5b-35c2-44a4-b3bc-a84a7345cbad)

_A **single-select list**_

[Image: A list with 2 items selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmio9xiam-07-3P-multiselect.png?alt=media&token=3348363c-b410-4789-bf1d-5927b98f0b1f)

_A **multi-select list**_

##### List interactions

Lists can:

- 

Expand and collapse (https://m3.material.io/m3/pages/lists/guidelines#90a236ee-b587-4361-8911-34006f25a6f1)
- 

Swipe to reveal (https://m3.material.io/m3/pages/lists/guidelines#01204f7d-ce32-4739-aece-e95db24858c9)*

More on list interaction accessibility (https://m3.material.io/m3/pages/lists/accessibility#a6f937f5-3e1f-4db4-ba35-ac6dd9fef140)

[Video: 1 list item expands into a list with 6 items, then collapses.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmshrflwe-GM3%20-%20Expressive%20-%20Specs%2008%20-%203P%20-%20v01%20(2).mp4?alt=media&token=059ca69e-9d1e-4f67-b4ad-8def7caa6152)

_A list can **expand** to include multiple items_

[Image: A list item is swiped, and reveals 3 more actions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmshrgh4t-09-key02-3P.png?alt=media&token=b3521155-b1a9-49f8-aad2-6bf203c946bd)

_A list item can be **swiped** to reveal more actions_

| **Category** | **Configuration** | **M3** | **M3 Expressive** |
| --- | --- | --- | --- |
| Styles | Standard | Available | Available |
| Segmented | -- | Available |  |
| Selection modes | Single-action, multi-action, single-select, multi-select | Available | Available |
| Interactions | Expand, swipe* | Available | Available |

* Swipe-to-reveal interactions are only available on Android Views

#### Tokens & specs

Use the table's menu to select a token set. The **common** set combines baseline tokens with new expressive shapes and sizes. The **expand** set has tokens for the expand interaction. Learn about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.6c818a16475113bd.md]

#### Anatomy

[Image: Diagram with 10 elements that can be included in lists.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioasn71-11-3P-VQA.png?alt=media&token=7838dcd3-7b19-4506-b422-3c251e4f1238)

_Container and label text are required. All other elements are optional:

1. 

Container
2. 

Overline
3. 

Label text
4. 

Trailing text
5. 

Supporting text
6. 

Trailing icon
7. 

Divider
8. 

Leading avatar
9. 

Leading icon
10. 

Leading media - image or video_

##### Flexibility & slots

The M3 Design Kit (https://www.figma.com/community/file/1035203688168086460) includes lists with custom slots for designing flexible item layouts. Think of a custom list as a container with three different slots: leading, content, and trailing. Each slot can hold a different element.

###### **Slot accessibility**

Slots are not accessible by default. Consider the following:

- 

Elements must follow the rules, structure, and interaction patterns for lists
- 

Use standard list item padding
- 

Target size must be at least 48x48dp
- 

Don't add interactive elements that make the list item difficult to navigate, especially for people using screen readers

More on required accessibility guidelines (https://m3.material.io/m3/pages/lists/accessibility#538f23f7-689c-4516-bfc8-5f6933a43f5e)

[Image: A diagram with leading, content, and trailing slots.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioecnyy-12-3P.png?alt=media&token=33b605a8-0730-4453-81ca-71c3f2db29f1)

_Reserve the use of slots for use cases that maintain the list’s accessibility and functionality

1. 

Leading slot
2. 

Content slot 
3. 

Trailing slot_

warningCaution:Slots require custom code implementation that you must create and maintain

The **leading** and **trailing** slot positions must be a smaller width than the **content** section.

1. **Leading slots** can contain:

- 

Visual elements: Avatar, icon, image, or video thumbnail
- 

Selection controls: Checkbox, radio button, or switch
- 

Customizations: Badge or larger image

2. **Content slots** must be the largest-width slot and can contain:

- 

Default content: Label text, supporting text
- 

Optional add-ons: Badge, icon, in-line label, or more text elements
- 

Avoid long lines of text to preserve readability

3. **Trailing slots** can contain:

- 

Action elements or text: Icon, icon button, or trailing text
- 

Selection controls: Checkbox, radio button, or switch

[Image: Slot diagram showing slot placement in the middle of the list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioefhsu-13-3P-VQA.png?alt=media&token=5f703576-a349-48ad-a14c-55b7f9db9742)

_The content slot must be the largest section, placed in the middle of the list item_

###### Selection lists

For selection lists, use only one selection interaction per list item.

[Image: A selected list item with a checkmark in the leading slot.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioehno9-14-do-3P.png?alt=media&token=19978fb7-5f58-4f78-a098-9f6c73e8f1a2)

_Use only one selection interaction per list item_

[Image: A selected list item with both a checkmark in the leading slot and a bookmark in the trailing slot.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioek6y5-15-dont-3P.png?alt=media&token=cd9cd890-328c-4c60-a4da-a1e4f684643a)

_Don't use multiple selection interactions in one item_

#### Color

Color values are implemented through design tokens. For designers, this means working with color values that correspond with tokens. In implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 10 list element color roles in light mode and dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmion9qya-16-3P.png?alt=media&token=81e39e2f-a93f-484c-b6b0-1356790b08d1)

_List color roles used for light and dark themes:

1. 

Surface   
2. 

On surface variant
3. 

On surface  
4. 

On surface variant
5. 

On surface variant 
6. 

On surface variant
7. 

Outline variant
8. 

Primary container
9. 

On primary container
10. 

On surface variant_

#### States

States are visual representations used to communicate the status of a component or an interactive element. Learn more about interaction states

 (https://m3.material.io/google-material-3/pages/interaction-states/overview)More on list focus (https://m3.material.io/m3/pages/lists/accessibility#f7e067e1-722f-40c5-a95a-63929869bf3e)

##### Default list items

[Image: 6 default list states in light and dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmionai1i-17-3P.png?alt=media&token=e0b89f3c-2d85-4d4e-ba61-9e7bb8a80829)

_1. 

Enabled 
2. 

Disabled
3. 

Hovered
4. 

Focused
5. 

Pressed
6. 

Dragged_

##### Selected list items

[Image: 6 selected list states in light and dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioncezo-18-3P.png?alt=media&token=5d3479f7-4cc1-4324-b589-b8912b226880)

_1. 

Enabled 
2. 

Disabled
3. 

Hovered
4. 

Focused
5. 

Pressed
6. 

Dragged_

#### Measurements

[Image: Size and padding measurements for list items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiondj5y-19-3P.png?alt=media&token=0f6e18cf-137f-444f-ab70-c7bfa50ef6ec)

_List item alignment, padding, and size measurements. The icon button height is dynamic, and automatically adjusts to fill the list item height._

##### Shape morphing

When a list item is selected, the corner shape changes to highlight the active item:

- 

Unselected corner radius: 4dp inner, 16dp outer
- 

Selected corner radius: 16dp

[Image: A 3-item list. The middle item is unselected, with a 4dp corner radius.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsghyywm-20-3P.png?alt=media&token=d75879be-22f4-4115-a42a-ffc78445689f)

_Unselected list items have a 4dp inner corner radius, and 16dp outer corner radius_

[Image: A 3-item list. The middle item is selected, with a 16dp corner radius.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsgi2yv8-21-3P.png?alt=media&token=4ca70f62-85c2-4d38-b9e4-c2fcf98a5650)

_Selected list items have a 16dp corner radius all around_

#### List (baseline)

The baseline list variant is available and continues to work in existing products. However, the expressive list (https://m3.material.io/m3/pages/lists/specs#ebf87f58-d5bf-4cb5-a856-d2bb104eec4d) variant is recommended for new designs.

##### Tokens & specs

Baseline list tokens are in the **common** token set. Note: This set also includes several expressive tokens.

[Token table: see ../tokens/TOKEN_TABLE.6c818a16475113bd.md]

##### Color

Color values are implemented through design tokens. For designers, this means working with color values that correspond with tokens. In implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 9 baseline list element color roles in light and dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiq3n8p4-20-3P.png?alt=media&token=b48ec623-56e1-4fb8-af5d-cb492be8701a)

_List color roles used for light and dark themes:

1. 

Surface
2. 

On surface
3. 

On surface variant
4. 

On surface variant
5. 

On surface variant
6. 

Outline variant
7. 

Primary container
8. 

On primary container
9. 

On surface variant_

##### States

States are visual representations used to communicate the status of a component or interactive element.

[Image: 6 baseline list states in light and dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiq3rr3p-21-3P.png?alt=media&token=1cad62d6-6b18-4aff-a5a3-95081a37bea6)

_1. Enabled

2. Disabled

3. Hovered

4. Focused

5. Pressed

6. Dragged_

##### Layout

###### One-line lists

[Image: Alignment, padding, and size specifications for baseline list items with 1 line of text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiofu0i1-22-3P.png?alt=media&token=6d6baf81-2dcf-44c7-a698-12dc4df7b893)

_Baseline one-line list alignment, padding, and size measurements_

[Image: Measurements for a 3-item list with 1 line each.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiogaa9o-23-3P.png?alt=media&token=e5b30379-40b7-4f40-8b8c-ab3de728b304)

_Baseline list item measurements and padding_

###### Two-line lists

[Image: Alignment, padding, and size specifications for baseline list items with 2 lines of text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiogazt3-24-3P.png?alt=media&token=555ab1aa-0068-411e-aa41-3c58358396ba)

_Baseline two-line list alignment, padding, and size measurements_

[Image: Measurements for a 3-item list with 2 lines each.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiogcld0-25-3P.png?alt=media&token=8fff9b9c-745e-4132-bd10-cecb13ce4172)

_Baseline list item measurements and padding_

###### Three-line lists

[Image: Alignment, padding, and size specifications for baseline list items with 3 lines of text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiogdayj-26-3P.png?alt=media&token=f40d0151-71ac-4ae1-bb39-ac88dacb0a91)

_Baseline three-line list alignment, padding, and size measurements_

[Image: Measurements for a 3-item list with 3 lines each.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmiogduex-27-3P.png?alt=media&token=54e24855-b3e4-44d3-af16-3cf06223505d)

_Baseline list item measurements and padding_

| Attribute | Value |
| --- | --- |
| Label alignment | Center |
| Label alignment when height is 88dp or taller | Top |
| Label left padding | 16dp |
| Leading element alignment (vertical) | Center |
| Leading element alignment (vertical) when height is 88dp or taller | Top |
| Leading element left padding | 16dp |
| Leading icon alignment (vertical) | Top |
| Leading icon top padding | 8dp |
| Leading icon top padding when height is 88dp or taller | 12dp |
| Trailing element alignment (vertical) | Center |
| Trailing element alignment (vertical) when height is 88dp or taller | Top |
| Trailing element left padding | 16dp |
| Trailing element right padding | 24dp |
| Padding above/below divider | 0dp |
| Targets | 48dp |
| Divider full-width | 100% |
| Divider inset left padding | 16dp |
| Divider inset right padding | 24dp |

##### Configurations

###### Leading avatar

[Image: 1, 2, and 3-line list items with and without a leading avatar and trailing checkbox, in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioh5e7e-28-3P.png?alt=media&token=b57fa62b-3d95-4dff-9eab-552c7d172234)

_1. 

With leading avatar
2. 

With leading avatar and trailing checkbox_

###### Leading image or thumbnail

[Image: 1, 2, and 3-line list items with and without a leading image and trailing checkbox, in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioh5246-29-3P.png?alt=media&token=16932198-c722-4db9-b051-747ca911531d)

_1. 

With leading image
2. 

With leading image and trailing checkbox_

###### Leading video

[Image: 1, 2, and 3-line list items with and without a leading video and trailing checkbox, in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioh4nys-30-3P.png?alt=media&token=fb71bee0-4810-4219-8433-757fdd7c5bec)

_1. 

With leading video
2. 

With leading video and trailing checkbox_

###### Leading icon

[Image: 1, 2, and 3-line list items with and without a leading icon and trailing checkbox, in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioh3zha-31-3P.png?alt=media&token=ef144cf2-fd45-48fb-9a7b-496903e6a9ab)

_1. 

With leading icon
2. 

With leading icon and trailing checkbox_

###### Text-only

[Image: 1, 2, and 3-line text only list items with and without a trailing checkbox, in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioh3lil-32-3P.png?alt=media&token=6053c26e-0987-47a4-af39-7f0371f591a4)

_1. 

With text only
2. 

With text and trailing checkbox_

###### Leading checkbox

[Image: 1, 2, and 3-line list items with and without a leading checkbox and trailing text, in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioh2vwf-33-3P.png?alt=media&token=0cb7fa46-e3c2-4c30-be0a-6b0faa1043e2)

_1. 

With leading checkbox
2. 

With leading checkbox and trailing text_

###### Leading radio button

[Image: 1, 2, and 3-line list items with and without a leading radio button and trailing text, in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioh2gxb-34-3P.png?alt=media&token=62ff10e1-d363-42da-b92c-10b308604018)

_1. 

With leading radio button
2. 

With leading radio button and trailing text_

###### Trailing switch

[Image: 1, 2, and 3-line list items with and without a leading icon and trailing switch, in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmioh0mgk-35-3P.png?alt=media&token=da8d3853-6828-43dd-ad1a-d98b1a8e7b94)

_1. 

With trailing switch
2. 

With leading icon and trailing switch_

## Guidelines

[Image: 3 list items show different layout options, with varying sizes of elements in the leading slot.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiewlynz-01.png?alt=media&token=a7cf803c-b9cd-4c57-a8ea-c8c359aeb52c)

_Lists can include a range of layout combinations:

1. 

Leading images, videos, icons, or avatars
2. 

Trailing text, icons, or icon buttons_

#### Usage

Lists are vertical groups of text, icons, images, and other elements, optimized for reading comprehension.

List items can contain multiple actions at once, like selection, icon buttons, overflow menus, and more.

[Image: 3 list items with avatars using different expressive shapes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiewcuoc-02.png?alt=media&token=d865febf-86d5-462f-8c66-4e6ebc4e5e5d)

_A clear visual hierarchy makes lists easy to scan and read_

Use lists for communicating or selecting discrete items, such as choosing from a set of colors.

[Image: A list of colors with Periwinkle selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiewi9tz-03.png?alt=media&token=7bc2a849-966d-418b-ac1b-ffaf6113e05e)

_Lists are an organized way to add imagery and supporting elements to selection. In this color selection example, the list contains color swatches, color names, and a checkbox action._

A list should be easy to scan. Any element can be used to anchor and align list item content.

Place supporting visuals and primary text in the same position in each list item.

Don’t vary the position of elements within a list.

[Image: 4 versions of the same list highlighting avatar and text alignment.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiewmxat-04.png?alt=media&token=0bc12f22-822f-4dca-a55e-cf803c736160)

_1. Sample list
2. Content placement in a row
3. Supporting visuals are aligned for easy scanning
4. Primary text is aligned for easy scanning_

List items can adapt to different lengths of text:

**Label text only 
**A list item can contain a single line of label text. If the text doesn’t fit on one line, it can wrap or be truncated.

**Label text with supporting text 
**A list item can include supporting text below the label text. Both the label and supporting text can wrap or be truncated.

[Image: 3 lists show items with label text only, label text with 1-line of supporting text, and label text with 2-lines of supporting text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiewpdzm-05.png?alt=media&token=83cc77fe-12ec-4e3f-a81a-3ca656b25f1a)

_Three examples of list item sizes:

1. 

Label text only
2. 

Label text with supporting text on one line
3. 

Label text with supporting text that wraps to two lines_

#### Anatomy

[Image: List diagram with 10 elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiewsyte-06.png?alt=media&token=cf5f9795-d6a3-4dbd-a44b-b2496d59a9ef)

_Container and label text are required. All other elements are optional:

1. 

Container
2. 

Label text
3. 

Supporting text
4. 

Trailing text
5. 

Trailing icon
6. 

Trailing selection control - checkbox, radio button, switch
7. 

Leading avatar container
8. 

Leading avatar text
9. 

Leading icon
10. 

Leading media - image or video_

##### Container

List containers hold all list items and their elements. List item size is determined by the tallest element within the list item. See layout measurements (https://m3.material.io/m3/pages/lists/specs#1824b94d-7d17-4a29-889f-d277037a1313)  

When a list item features an image, consider customizing the container color to use a content-based color scheme. This should be applied to either the enabled state or for an interaction.

[Video: A song list with a leading images. When selected, a list item’s container matches the image’s color scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiewwh4p-GM3%20-%20Expressive%20-%20Guidelines%2007%20-%20v02.mp4?alt=media&token=ac8e38da-34e6-48c4-bd9d-88f501e9686a)

_A list item can include a leading image and a vibrant color_

##### Label & supporting text

Keep label text brief.   

To ensure list items are scannable:

- 

Limit supporting text to one to three lines
- 

Truncate supporting text, depending on screen size

See adaptive guidance (https://m3.material.io/m3/pages/lists/guidelines#561cc637-aa43-4055-be1e-0716faeef7af)

[Image: A list item with a leading image, concise label text “Art events”, and 2 lines of truncated supporting text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiex0v5m-08.png?alt=media&token=1cb8a712-4266-4e50-a3df-fe0b9d04e5e8)

_Limit supporting text to one to three lines_

##### Icons

**Leading icon**
A leading icon should provide a quick visual cue that relates to the item's label text, helping people scan the list.

**Trailing icon** 
A trailing icon is often used to communicate status or indicate an action, like **Show more**.

[Image: Leading icons should relate to the label text A list of items with leading and trailing icons on a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiexc5t2-9.png?alt=media&token=a485fa4a-9174-4c45-812c-23f19092eff9)

_1. 

Leading icons should relate to the label text
2. 

Trailing icons can communicate an action_

##### Leading media

List items can contain a leading avatar, image, or video. Anchor visuals to the leading edge of the list to improve scannability.

Leading video thumbnails can open a video player or even play within the list.

[Image: A list of plants with images at leading edge.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiexhs7r-10.png?alt=media&token=bf90846b-653f-4e89-9cbe-5b429e162c37)

_Place supporting visuals, like thumbnails, at the leading edge of a row to improve scannability_

[Image: A list of plants with an image in the middle of the row makes it difficult to align the name and price.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiexip9k-11.png?alt=media&token=c678f226-2089-493f-855d-5fc175e900bb)

_Avoid placing visuals in the center of a row because it makes the list difficult to scan_

###### Avatars

List items can include images in circular or expressive shapes to represent a person or entity.

Use square or rectangular images for other content, such as products or videos.

[Image: List of contacts with avatars with a circular, expressive crop to indicate a person.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiexkoay-12.png?alt=media&token=5e57234e-4437-4411-857f-dc0694d0f757)

_Use an expressive, circular avatar to represent a person or entity_

###### Primary & secondary actions

Use spacing to draw attention to the most important aspect of the list item, usually the primary action area or key content.

[Image: A folder icon in the primary action area takes up the full height of the list item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiexnuvs-13.png?alt=media&token=a295b2a5-4ec4-435e-b6ef-8507e4c2a387)

_The primary action takes up more space:

1. Primary action area

2. Secondary action area_

[Image: A list item has an avatar in the more distinguishing content position on the left, and “15 min” trailing text on the right.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiexoaw7-14.png?alt=media&token=a19485e2-bb2e-4664-ba06-e59a0e1e969e)

_Align content by importance:

1. More distinguishing content

2. Less distinguishing content_

##### Trailing text

Trailing text can provide additional meta-information about a list item, such as a price, count, or other details.

[Image: The date “Nov 17” as trailing text in a concert ticket list item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiextt91-15.png?alt=media&token=31a353c9-dda5-4e57-9840-f0ad4606b291)

_Use trailing text for supplemental details, like a price, count, or date_

##### Selection controls

Selection controls display list item actions. Position controls at the leading or trailing end of a list item:

- 

Use checkboxes to select multiple items
- 

Use switches to toggle settings on or off
- 

Use radio buttons to select a single item

[Image: 3 lists with different selection controls.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiexzfsy-16.png?alt=media&token=18466d3e-1b66-4ddf-b1d6-ff1a9fe21e12)

_List items with: 

1. 

Checkboxes
2. 

Switches 
3. 

Radio buttons_

##### Gaps & dividers

Gaps or dividers can separate lists into items and groups:

- 

Use **gaps** for contained lists. Gaps leverage expressive shape and containment tactics.
- 

Limit **dividers** to uncontained or complex lists, only when a stronger visual separation is necessary.

[Image: Filled list items in an inbox separated by gaps.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiezuscb-17_do.png?alt=media&token=84c1ee7c-a7e6-441c-ba3c-19442e4011f8)

_Use **segmented gaps** and filled list items to define a list group_

[Image: An uncontained list with city names separated by dividers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiezvi6d-18caution.png?alt=media&token=0398b3a8-3d8b-4e62-999b-0859fffaadcc)

_Limit the use of **dividers** to uncontained lists_

#### Adaptive design

##### Line length

In fluid layouts, avoid excessively long lines of text when expanding containers and text-heavy components. This often means changing margins and typography properties as the container scales.

[Image: 4 list items with 2-line supporting text have adjusted margins to preserve readability.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiezxs4c-19_do.png?alt=media&token=2e5e3f61-38e3-4ca9-8506-7a04a16c1d4d)

_Adjust margins to create a more comfortable line length for reading_

Adapt the width of the list container based on a line’s length, or by switching to a multi-column layout.

[Image: List items in a 2-column layout, with each item showing text preview.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiezzrzc-20_do.png?alt=media&token=6c164d25-b039-4125-98bc-961691f9c1e7)

_A multi-column layout can help break up content when needed_

The ideal line length for text is typically between 40 to 60 characters, but large-screen devices can accommodate up to 120 characters per line. If a line of text is close to 120 characters in length, consider increasing the line height to improve readability .

[Image: List items with elongated line length.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif01yxf-21_dont.png?alt=media&token=59608a8d-5309-4a91-9aca-ce653489c67f)

_Don’t scale components without adjusting other affected areas of the screen, such as text length. This can result in line lengths that make reading difficult._

A list with a compact breakpoint can become part of a two-column layout at an expanded breakpoint, adjusting the amount of information shown in each list item.

[Video: Animation of a list on mobile and the same list adapted into a 2-column layout on desktop.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif043uk-GM3%20-%20Expressive%20-%20Guidelines%2022%20-%20v02.mp4?alt=media&token=008e454c-7701-4b94-b677-c5492c7f0a01)

_Reduce the amount of information shown at compact breakpoints_

##### Adapt list elements & layout

Lists can change their layout to adapt to different breakpoints. This affects the size and placement of content.

For example, a list at a compact breakpoint can adjust margins, spacing, or density to better fit an expanded window.

[Video: Photo list on mobile expands to allow larger images and longer descriptions on a tablet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif0dffm-GM3%20-%20Expressive%20-%20Guidelines%2023%20-%20v02.mp4?alt=media&token=10b138ad-a6d2-4503-93f6-2d5e666fd3d8)

_On larger screens, lists can show more content, like supporting text and larger imagery_

##### Swap components

Lists are just a compact composition of images, text, and actions. Other components, like cards and carousels, use the same elements but take up more space.   

At larger breakpoints, consider swapping a list to a component with a similar purpose to take advantage of available space.

[Video: A mobile photo list changes into cards in a larger window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif0fb1t-GM3%20-%20Expressive%20-%20Guidelines%2024%20-%20v02.mp4?alt=media&token=eb06f84e-f749-4a5c-8607-10e046ed1ade)

_Information displayed in list items on mobile can change to cards on tablet and desktop_

##### Compact breakpoints

Lists should extend edge-to-edge in compact windows. Selecting a list item should open a page with the details.

[Video: When opened, a mobile photo list item expands to fill the width of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif0hg20-GM3%20-%20Expressive%20-%20Guidelines%2025%20-%20v01.mp4?alt=media&token=56f7990a-7f12-42bd-9ebe-88399e20fa92)

_On small screens, people can navigate between lists and full-screen detailed views_

##### Medium & expanded breakpoints

Medium and expanded breakpoints, such as tablet and desktop screens, can display primary and secondary content in the same view.

For example, a list and the detailed information can appear side-by-side.

[Image: A larger screen displays list items and a detailed expansion of one item on the same screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif0jzwl-26.png?alt=media&token=9614eb09-3217-4c62-82a3-958065860772)

_On larger screens, a list-detail view can be more appropriate_

At a larger breakpoint, a list may transform into a carousel.

[Video: A photo list with thumbnails in a compact window expands into a carousel with large images in an expanded window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif0mtl7-GM3%20-%20Expressive%20-%20Guidelines%2027%20-%20v02.mp4?alt=media&token=d5ed207f-f29b-4de5-a0d4-45e1f14c0392)

_Lists can transform into carousels in expanded windows_

Lists can also show more or less content as they scale up and down in size.

For example, a list item can reveal more content when the component expands.

[Video: A list expands from a compact to a medium window. The expanded items show supporting text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif0onle-GM3%20-%20Expressive%20-%20Guidelines%2028%20-%20v02.mp4?alt=media&token=2c013635-21bc-485d-89ab-ab1382a3a057)

_List items reveal supporting text at expanded breakpoints_

#### Behavior

##### List selection modes

The selected state applies to the entire list item. For example, when an item with a checkbox is selected, both the list item and the checkbox show a selected state.

###### Single-select

Lists can feature a single-selection component such as a radio button.

Single-select list items:

- 

Don’t support multi-actions
- 

Can’t have secondary nested actions
- 

Shouldn’t use checkboxes

[Image: A 3-item list with radio buttons, with 1 item selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmielqxgm-29.png?alt=media&token=01482923-26aa-4237-9ed7-8bf0c4cb52ac)

_Use radio buttons to allow a single selection in a list_

###### Multi-select

Multi-select lists allow for multiple list items to be toggled on.

Multi-select list items:

- 

Pair well with checkboxes and switches
- 

Can’t have secondary nested actions
- 

Shouldn’t use radio buttons

[Image: A 3-item list with checkboxes and 2 items selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmielw5u4-30.png?alt=media&token=452063d1-7f87-49ce-9bed-07fb0459add1)

_Use checkboxes or switches for multi-select lists_

###### Single-action

In a single-action list, the entire list item performs one action, such as navigating to a new page.

Single-action list items:

- 

Can’t have secondary nested actions
- 

Can’t be toggled into a persistent selected state

[Image: A 3-item list where each item is a single tappable area.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmielzpxu-31.png?alt=media&token=1b8831f3-1559-4969-ab1e-485277328d1c)

_Use a single-action list for a primary action, like navigation_

###### Multi-action

Multi-action lists can support multiple nested actions within a list item.

The primary action should take up the majority of the space in the leading and content positions.

Place supplementary actions, like a bookmark or menu, in the trailing position.  

More on multi-action accessibility (https://m3.material.io/m3/pages/lists/accessibility#b69b89a9-7ca0-4249-b25b-2d0c85a41dc0)

[Image: A 3-item song list where each item has 2 trailing icons: a bookmark and overflow menu.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiem2107-32.png?alt=media&token=0f04fe0b-b4d8-44cc-8907-2cbd0369be87)

_Place supplementary actions in the trailing position of a list item_

###### Non-interactive

Non-interactive lists can organize information in a scannable way. They don’t perform any actions and can’t be selected.

[Image: A 3-item non-interactive list showing a historic timeline of space travel.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiem457u-33.png?alt=media&token=66743795-977c-4cb7-b968-2a513a62d024)

_Use non-interactive lists to make information easy to scan_

##### List interactions

###### Expand & collapse

List items containing other list items can expand and collapse in a folder-like manner, to reveal or hide content. 

Tapping a list item expands it vertically across the entire screen using a container transform transition pattern.

[Video: On a to do list, an item expands, revealing nested child items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmiem9cox-GM3%20-%20Expressive%20-%20Guidelines%2034%20-%20v02.mp4?alt=media&token=2194b99b-9a02-460e-b917-b4818d954232)

_To expand a list item, display a parent-child transition_

###### Swipe

On Android, list items can reveal buttons on swipe. Use a mix of button styles for visual interest and hierarchy.  

The primary action must be the final end-aligned option. A full swipe triggers this action, clearing the list item and all other actions off-screen. 

Swipeable list items should include alternative ways to access hidden actions, such as a more icon.

More on swipe accessibility (https://m3.material.io/m3/pages/lists/accessibility#32f5115c-b15e-4af6-8c1a-4807bee2bf7a)

[Image: List of recipes with “Fresh baked breads” swiped to reveal a archive icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmshq8qm6-35-key03.png?alt=media&token=1e4721af-a5b3-4288-805d-a8970578e128)

_When a list item is swiped, it can be archived or reveal more actions_

## Accessibility

#### Use cases

People should be able to do the following with assistive technology:

- 

Navigate to a list item 
- 

Select a list item

#### Indicate selection with more than color

To make selected items clear for everyone, don't rely on color as the only visual cue.   

Use an additional indicator that an item is selected such as:

- 

Radio buttons or checkboxes
- 

Leading or trailing icons
- 

A visual style not related to color, like underlined text

[Image: A selected list item with a colored background, and a check as the leading icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif14iza-01.png?alt=media&token=140fabe0-eda0-43e7-8c49-95c7213f08f3)

_Use two visual cues to show a list item is selected, like a leading checkmark and filled color_

#### Interaction & style

##### Touch

When a person taps on a list item, a touch ripple appears, indicating interaction feedback.

[Video: A 3-item list shows a touch ripple animation as the second item is tapped and selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif1hthv-GM3%20-%20Expressive%20-%20Accessibility%2002%20-%20v01.mp4?alt=media&token=a21e01eb-4aa5-4416-9bf3-69cb6281de10)

_A ripple appears when a person taps on a list item to select it_

##### Cursor

When hovered, the hover state provides a visual cue that a list item is interactive.

[Image: A list with the second item visually altered while hovered over, with a cursor and darker fill.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif1lpwx-03.png?alt=media&token=fde07ebe-f294-4921-b6b3-fcbe40f28691)

_Cursor: Hover_

[Image: Selected list item with cursor, colored fill, and checked box.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif1n85t-04.png?alt=media&token=2e422eae-b219-462c-91d2-76f6af7da235)

_Cursor: Selected_

##### Keyboard & switch

When a person tabs to a single-action list, a focus indicator appears, providing a visual cue that the first list item is now focused and action can be taken.

When a person interacts with the focused list item via **Space** or **Enter**, the action is performed.

[Video: A focus indicator appears on the first item of a 3-item list, which is then selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif1rzoz-GM3%20-%20Expressive%20-%20Accessibility%2005%20-%20v01%20with%20Keyboards.mp4?alt=media&token=58a7778f-708f-41ae-bbcf-dcfc4bad045d)

_**Tab** key navigates to the list. **Space** or **Enter** keys activate items._

##### Swipe

List items that can be swiped should include alternative ways to access hidden actions, such as a **more** icon.   

Swipe alternatives can be:

- 

Single tap
- 

Double tap
- 

Long press
- 

Other single-point interactions

[Image: A list item has a “more” button selected to reveal additional actions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmshqfb4p-07-key04.png?alt=media&token=f428a79a-6ad9-40d6-9e3f-15b192c633f1)

_List items can reveal more actions from swiping or using an accessible secondary action such as a double tap_

#### Focus

##### Single-action lists

The first element in a list should always receive focus, unless the list has a selected element. In that case, focus should go to the selected list item instead.

After an element is focused, a person should be able to navigate within the list using arrow keys.

[Image: The first list item is automatically focused.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif1yik5-08.png?alt=media&token=e925d117-187b-4db5-a5fe-e21b9cab01ff)

_**Tab **key focuses on the first item or the selected item_

[Image: A second list item focused using an arrow key.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif1z0du-09.png?alt=media&token=11096c65-8976-4b29-83d6-d0e6649c71f5)

_**Arrow **keys navigate up and down through list items_

All list items must be able to be activated using the **Space** or **Enter** key.  

More on single-action lists (https://m3.material.io/m3/pages/lists/guidelines#3e45f939-457a-44a8-8551-a2354c521d26)

[Image: List item with focus indicator and filled checkbox, selected using the Space or Enter key.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif21ldt-10.png?alt=media&token=36809b25-a375-4a87-9942-b8f1dda63fa4)

_**Space** or **Enter** keys activate an element in a list_

##### Multi-action lists

Multi-action list items contain a primary action and at least one supplementary action.  

The list item as a whole isn't selectable; only the individual actions are.

 A person should be able to use a keyboard to:

- 

**Tab** to the list item, which focuses the first element
- 

Move between between all focusable elements in the list using the **Up**, **Down**, **Left**, and **Right** arrow keys
- 

Activate a focused element using **Space** or **Enter**   

More on multi-action lists (https://m3.material.io/m3/pages/lists/guidelines#db85439b-0e67-43b0-a2dc-61395738af64)

[Image: The first element in a multi-action list is focused automatically.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8um9bl-11-VQA.png?alt=media&token=6a474f8b-d3ef-4f9f-b356-3c5f87f3662f)

_**Tab** brings the focus to the first action_

[Image: The list action, a bookmark, is focused using the Down or Right arrow.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8uomf0-12-VQA.png?alt=media&token=c7508f6b-dd4b-4972-af0d-34a6010d313a)

_**Down** and **Right** arrow keys move focus to the next action of the list item, or to the first action in the next item_

[Image: A trailing bookmark icon is focused in the second list item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8uwmgu-13-VQA.png?alt=media&token=28964eee-ac95-4e56-947c-73a2864ec3cf)

_**Up** and **Left** arrow keys move focus to the previous action of the list item_

[Image: Label text and supporting text of the second list item is in focus using the Up or Left arrow.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8v0dqs-14-VQA.png?alt=media&token=dba9d2e6-ae72-4a63-ae46-a5f5df07c3b6)

_If the focus is on a list item’s first action, the **Up** and **Left** arrows move focus back to the last action of the previous item_

[Image: The Space or Enter key activates an overflow menu on a list item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8v14y1-15-VQA.png?alt=media&token=288e0e31-8107-42b1-917f-061f6ef3e824)

_The **Space** or **Enter** key activates a selected action in a list_

#### Keyboard navigation

| **Keys** | **Actions** |
| --- | --- |
| **Tab** | To move focus to the first list item, last list item, or outside of the list component |
| Down and right arrow keys | Moves to the next element in the list; if the focused element is the last in the list, it wraps back to the top of the list |
| Up and left arrow keys | Moves to the previous element in the list; if the focused element is the first in the list, it wraps back to the bottom of the list |
| **Space** or **Enter** | To select a list item not yet selected |

#### Labeling elements

Accessibility labels are used with assistive devices like screen readers.

The accessibility label for a list item is typically the same as the **label text** and **supporting text**.

Some labels, roles, and states are dependent on platform (https://m3.material.io/m3/pages/lists/accessibility#09e32b7d-78a1-45c1-be12-4c6646cfe1d1).

[Image: List item selected to show label of “Bread, sourdough or wheat”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif3ecf9-16.png?alt=media&token=f3d78d78-8ba2-402e-a069-ca0552ca6868)

_A list item’s **label text** and **supporting text** is used for its accessibility label_

##### Platform-specific labels

###### Single-select lists

| **Trait** | **Web** | **Android Views (MDC-Android)** | **Jetpack Compose** |
| --- | --- | --- | --- |
| Aria label | Container label: Should describe selection type List item: Should match the visible label text | List item: Should match the visible label text | List item: Should match the visible label text |
| Role | Container: List box List item: Option | List item: Radio button | List item: Radio button |
| State | Selected or Not-selected | Checked or Not-checked | Checked or Not-checked |

###### Multi-select lists

| **Trait** | **Web** | **Android Views (MDC-Android)** | **Jetpack Compose** |
| --- | --- | --- | --- |
| Aria label | Container label: Should describe selection type List item: Should match the visible label text | List item: Should match the visible label text | List item: Should match the visible label text |
| Role | Container: List box List item: Option | List item: Checkbox | List item: Checkbox |
| State | Selected or Not-selected | Checked or Not-checked | Checked or Not-checked |

On web, a list container’s accessibility label describes the type of selection that can be made, and the role is **List box**.

[Image: A list container is selected, showing a label of “Select either bread, pita, or rice” and role of “List box.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8wfvkj-17.png?alt=media&token=6abe0d86-e89d-46bf-b644-9c29820e651f)

_On web, a list container’s role is **List box**_

On Jetpack Compose, the role applies to the list item as a whole.

If a list isn't selectable, the label text is read out without a role.

[Image: A selected list item shows a label of “Bread, sourdough, or wheat” and role of “Checkbox.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmi8wgxsf-18.png?alt=media&token=f2da7dd9-7edb-4a4e-ba75-861c0b9191bb)

_When selectable, the role **Checkbox **applies to the entire list item on Jetpack Compose_

On Android Views (MDC-Android), components contained within the list should be labeled according to that component’s specific guidelines:

- 

Checkbox (https://m3.material.io/m3/pages/checkbox/accessibility)
- 

Radio button (https://m3.material.io/m3/pages/radio-button/accessibility)

[Image: Checkbox of a selected list item shows label of “Bread, sourdough or wheat” and role of “Checkbox.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmif3mprn-19.png?alt=media&token=eb532a0d-fff0-43bc-a056-3452ef435faf)

_On Android Views (MDC-Android), the accessibility label and role are applied to the interactive component by default_
