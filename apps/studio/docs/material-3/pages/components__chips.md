# Chips

Source: <https://m3.material.io/components/chips> (content version 2026-09-23_06-10-05, page updated 2026-07-17T07:05:14.328Z)

## Overview

- 

Use chips to show options for a specific context
- 

Four variants: assist, filter, input, and suggestion
- 

Chip elevation defaults to 0 but can be elevated if they need more visual separation

[Image: 4 chip variants.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzthj7vk-1.png?alt=media&token=87bf4249-1c98-406e-bf83-32e0e1b6d5a6)

_1. Assist chip
2. Filter chip
3. Input chip
4. Suggestion chip_

#### Availability & resources

#### Updates

**Aug 2024**

Updated stroke color from **outline** to **outline variant**.

[Image: A chip with a clear outline is now a chip with a subtle outline.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sdpshu-02.png?alt=media&token=66986121-1317-4638-8ba4-3119d622eada)

_The stroke color was softened to improve visual hierarchy between chips and buttons_

#### Differences from M2

- 

Color: New color mappings and compatibility with dynamic color
- 

Shape: Rounded rectangle 
- 

Variants: Action chips have been separated into assist chips and suggestion chips. Choice chips are now a subset of filter chips

[Image: M2 chip variants.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8se5ler-05.png?alt=media&token=dd95b9eb-911c-4a6d-a1be-1052ac547d3e)

_M2: Variants of chips are input, choice, filter, and action chips_

[Image: M3 chip variants.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8se6c0w-06.png?alt=media&token=8c430631-a8f6-47e3-98e7-32b23f2c4eea)

_M3: Variants of chips updated to assist, filter, input, and suggestion chips_

## Specs

#### Tokens & specs

Select a component variant below to see its elements, attributes, tokens, and values.

[Token table: see ../tokens/TOKEN_TABLE.484a63be03b01a17.md]

#### Assist chip

[Image: Assist chip diagram numbering 3 elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dv1nz-1.png?alt=media&token=8b66182d-b209-4110-a780-7c2fea9f89f8)

_1. Container 
2. Label text 
3. Leading icon_

##### Assist chip color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Assist chip diagram numbering 4 color elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dv6ou-2.png?alt=media&token=71af17c7-755b-4e82-8783-3d14e68afb74)

_Assist chip color roles used for light and dark themes:

1. Surface container low (optional)
2. On surface
3. Outline
4. Primary_

##### Assist chip states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: 36 assist chips illustrating combinations of styles, selection and non-selection, and 6 interaction states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8sg1d2r-03-3P.png?alt=media&token=603c0499-acc9-4157-bebc-d11d56548e5e)

_Selected and unselected assist chip states:

1. Enabled 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed 
6. Dragged_

##### Assist chip measurements

[Image: 3 assist chips with measurements shown for variants with and without a leading icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dvj22-4.png?alt=media&token=6d55f422-809c-4299-b51f-a92f45987516)

_Assist chip padding and size measurements_

| Attribute | Value |
| --- | --- |
| Height | 32dp |
| Shape | 8dp corner radius |
| Icon size | 18dp |
| Vertical label text alignment | Center-aligned |
| Horizontal label text alignment | Start-aligned |
| Left/right padding | 16dp |
| Left/right padding with icon | 8dp |
| Padding between elements | 8dp |

#### Filter chip

[Image: Filter chip diagram numbering 4 elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dvpzm-5.png?alt=media&token=6302536e-9843-48e9-acf8-8f25e4616e14)

_1. Container 
2. Label text 
3. Leading icon
4. Trailing icon_

##### Filter chip color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Filter chip diagram numbering 4 color elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmp8q5ab-06-3P.png?alt=media&token=cb486b8e-952e-4d83-b7b7-f549bc909c33)

_Filter chip color roles used for light and dark themes:

1. 

On surface variant
2. 

On secondary container
3. 

Secondary container
4. 

Outline variant
5. 

Surface container low (optional)_

##### Filter chip states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: 24 filter chips showing combinations of elevated, non-elevated, selected, and non-selected styles, and 6 interaction states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8sg2d2t-07-3P.png?alt=media&token=33f4b292-c821-4621-8d79-e208cf3d41ca)

_Selected and unselected filter chip states:

1. Enabled 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed 
6. Dragged_

##### Filter chip measurements

[Image: 3 filter chips with measurements shown for types with and without a leading icon and trailing icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dwqif-8.png?alt=media&token=4fcc217b-122a-442a-b135-a812be0e2752)

_Filter chip padding and size measurements_

| Attribute | Value |
| --- | --- |
| Container height | 32dp |
| Container shape | 8dp corner radius |
| Icon size | 18dp |
| Vertical label text alignment | Center-aligned |
| Horizontal label text alignment | Start-aligned |
| Left/right padding | 16dp |
| Left/right padding with icon | 8dp |
| Padding between elements | 8dp |

#### Input chip

[Image: Input chip diagram numbering 4 elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dwxct-9.png?alt=media&token=f502e45b-c29b-4e36-b02a-19f61bf2cf1d)

_1. Container 
2. Label text 
3. Trailing icon 
4. Leading icon_

##### Input chip color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Input chip diagram numbering 5 color elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm02q3wit-10-3p.png?alt=media&token=2930e234-d1bc-45d6-a0b7-5030aa65e856)

_Input chip color roles used for light and dark themes:

1. On surface variant
2. Surface container low (optional)
3. On surface variant
4. On surface variant
5. Outline variant
6. Primary
7. Secondary container
8. On secondary container
9. On secondary container_

##### Input chip states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: 33 input chips illustrating combinations of styles, selection and non-selection, and 6 interaction states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8sg4m8e-11-3P.png?alt=media&token=f0519dc3-5dd1-4c3d-af7d-941f77fa286e)

_Selected and unselected input chip states:

1. Enabled 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed 
6. Dragged_

##### Input chip measurements

[Image: 2 input chips with measurements: 1 with a trailing icon only; 1 with an avatar as a leading icon and a trailing icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm34ufke8-12-3p.png?alt=media&token=accd17a3-9af8-478e-b57b-7ba29d34a792)

_Input chip padding and size measurements_

| Attribute | Value |
| --- | --- |
| Container height | 32dp |
| Container shape | 8dp corner radius |
| Icon size | 18dp |
| Avatar shape | 12dp corner radius |
| Avatar size | 24dp |
| Vertical label text alignment | Center-aligned |
| Horizontal label text alignment | Start-aligned |
| Left padding for avatar | 4dp |
| Right padding for avatar | 8dp |
| Left/right padding for icon | 8dp |
| Padding between elements | 8dp |
| Target size for close icon | Min 48dp |

#### Suggestion chip

[Image: Suggestion chip diagram numbering 2 elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dxq8p-13.png?alt=media&token=5f745c90-2770-48d3-a0bb-ccd1215ec1eb)

_1. Container 
2. Label text_

##### Suggestion chip color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Suggestion chip diagram numbering 3 color elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dxxwr-14.png?alt=media&token=8f51719e-0531-4d6b-80a5-f7d44e6a84ae)

_Suggestion chip color roles used for light and dark themes:

1. Outline
2. Surface container low (optional)
3. On surface variant_

##### Suggestion chip states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: 24 suggestion chips illustrating combinations of styles across 6 interaction states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8sg5r6a-15-3P.png?alt=media&token=990c5a71-7228-4c18-a655-2d23d4528be2)

_Selected and unselected suggestion chip states:

1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed
6. Dragged_

##### Suggestion chip measurements

[Image: 2 suggestion chips with measurements shown for variants with and without a leading icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01dybi0-16.png?alt=media&token=ed6c212f-362c-48c5-808e-8959ad55a5e3)

_Suggestion chip padding and size measurements_

| Attribute | Value |
| --- | --- |
| Container height | 32dp |
| Container shape | 8dp corner radius |
| Icon size | 18dp |
| Vertical label text alignment | Center-aligned |
| Horizontal label text alignment | Start-aligned |
| Left/right padding without icon | 16dp |
| Left/right padding with icon | 8dp |
| Padding between elements | 8dp |

## Guidelines

[Image: 4 chip variants: Assist, filter, input, and suggestion.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smcq59-01.png?alt=media&token=86cdedb7-2247-4e4b-a21c-3fc347cd550b)

_There are four variants of chips: Assist, filter, input, and suggestion_

#### Usage

Chips help people enter information, make selections, filter content, or trigger actions. They're best used to help people accomplish their current task faster and easier.

[Image: 3 assist chips in restaurant review app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smdd4g-02.png?alt=media&token=3fa9dd36-2c0c-43b7-9ff2-a5c82ce393d2)

_Chips appear as a group of interactive elements_

##### Chips aren’t buttons

Chips and buttons are similar. They both provide visual cues to prompt people to take actions and make selections. 

While buttons appear consistently and with familiar calls to action, chips are dynamic to the situation, and appear as a group of interactive elements.

Use chips to enhance a person's current journey and encourage action. Use buttons to progress them through the product and for significant actions.

[Image: Chips used for “Reserve a table” and “Order delivery” in a restaurant app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztjonhj-3-do.png?alt=media&token=5c191d0f-005b-4934-bf3a-35e3bd671b25)

_Use chips to present contextual, supplemental options_

[Image: Chips used for Save and Cancel actions in a dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztjp9f8-4-dont.png?alt=media&token=0efbb9dc-12ee-44da-b010-3180be80141b)

_Avoid replacing major actions with chips. Actions that progress people to the next or previous step should always be displayed as buttons._

Chips should dynamically offer various actions depending on the current task, whereas a button should be a persistent fixture of a layout. 

Chips represent forking paths for a current task, while buttons represent linear steps.

[Image: Button labeled “Save task” in a task management app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztjqmoj-5-do.png?alt=media&token=3cb399af-ba05-4e3a-b9c6-771322061d20)

_Use buttons for the final step in a task_

[Image: Chip labeled “Save task” in a task management app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztjqyzl-6-dont.png?alt=media&token=764c08a5-4a46-47a1-ab2d-b93f8a9c86fb)

_Avoid using chips to finish or progress a task_

Multiple chips should appear together in a set, whereas there should be no more than 3 buttons in a single arrangement.

Chip sets can be scrolled horizontally.

[Image: Multiple chips in event reminder.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smf6wp-07_do.png?alt=media&token=4240c858-234f-4199-95d5-b29f64dcf2c8)

_Chips can be scrolled horizontally_

[Image: Single chip in event reminder.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smfmgg-08_don't.png?alt=media&token=52f69bde-8de3-45e0-b6d1-cdbd51f10d1e)

_Don’t display a single chip by itself. Chips should appear in a set._

##### Variants

Choose the chip variant based on its purpose and author. 

Does the chip represent an action (assist chip) or filter results (filter chip)? 

Is its content generated by the product (suggestion chip), or by the person using the product (input chip)?

[Image: 4 chip variants.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smgjsw-09.png?alt=media&token=187779c4-7ddb-431f-bca1-622cad03df96)

_There are four chip variants: 

1. 

Assist 
2. 

Filter 
3. 

Input 
4. 

Suggestion_

| Purpose | Chip variant | Rationale | Example |
| --- | --- | --- | --- |
| Action | Assist chip (https://m3.material.io/m3/pages/chips/guidelines#5dd1928c-1476-4029-bdc5-fde66fc0dcb1) | Assist chips represent smart or automated actions that can span multiple apps | **Add to calendar** action |
| Filter | Filter chip (https://m3.material.io/m3/pages/chips/guidelines#8d453d50-8d8e-43aa-9ae3-87ed134d2e64) | Filter chips represent filters for a collection | Platform selector on material.io/components |
| Information, user-authored | Input chip (https://m3.material.io/m3/pages/chips/guidelines#4d2d5ef5-3fcd-46e9-99f2-067747b2393f) | Input chips represent discrete pieces of information entered by a person | Gmail contact in the **To** field |
| Information, product-authored | Suggestion chip (https://m3.material.io/m3/pages/chips/guidelines#36d7bb16-a9bf-4cf6-a73d-8e05510d66a7) | Suggestion chips help narrow a person’s intent by presenting dynamically-generated suggestions | Suggested chat response |

#### Anatomy

[Image: Diagram of 4 elements of a chip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztjtuyd-10.png?alt=media&token=999b1920-2d6e-4cd7-b9c8-78ddde74c657)

_1. Container
2. Label text
3. Leading icon or image (optional)
4. Trailing icon (required for input chips, optional for filter chips)_

##### Container

All chips are slightly rounded with an 8dp corner.

[Image: Diagram of rounded corner of chip container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8wn25i4-12_do.png?alt=media&token=f1702ca4-246b-47a6-802a-44a833161071)

_Chips have rounded corners_

**Shadows & elevation**

Chip containers can be elevated if placed on top of an image or dynamic background.

[Image: 3 elevated assist chips above image of restaurant photograph.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm99ytacz-13.png?alt=media&token=b7f1c500-c60e-43d5-b95d-3f930b4d211b)

_When on complicated backgrounds, chip containers can be elevated_

[Image: 3 variants of chips in an outlined style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smkogw-14_do.png?alt=media&token=2e20d7c0-d7ae-4960-ae3d-3ea7dc9af20c)

_Use an outline to define the edge of the chip's container on regular backgrounds_

[Image: 3 variants of chips in an elevated style above restaurant photograph.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sml3zk-15_do.png?alt=media&token=413b4ccf-6370-4b8c-b311-0ebfcccac584)

_Chips may use elevation when placed on an image_

[Image: 4 elevated chips above blank background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smnajs-16_don't.png?alt=media&token=3b06b36e-ee77-4f2e-a619-9773f7844161)

_Chips shouldn't be elevated when placed directly on the page_

[Image: Elevated chip in pressed state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9a01xre-17_don't.png?alt=media&token=525db271-6e30-413f-b3f4-d7c8d3bf0ae2)

_Avoid using elevation to indicate a chip's pressed state. Instead, use the visual ripple effect._

##### Label text

Chip label text should be 20 characters or fewer, and have the same typography style as buttons.

Chip labels should remain brief for the limited space available. Skip conventional grammar rules, such as articles (take "a" walk), to save space.

[Image: Filter chip in maps app labeled “Walking.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztjz5d8-17-do.png?alt=media&token=20092f2f-045e-4edf-8e14-9e78f9114f33)

_Keep chip labels short_

[Image: Filter chip in maps app labeled “Walking navigation session."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztjzmjd-18-dont.png?alt=media&token=553c8425-a48e-4625-939b-3b1a4d3365dc)

_Avoid chip labels longer than 20 characters_

##### Leading icon or image (optional)

Chips can contain a leading icon, logo, or circular image. Use a system icon to help identify a chip's category.

[Image: 2 input chips, 1 with a leading circular avatar and the other with a leading icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8zizvw6-21.png?alt=media&token=a6741b15-9443-4568-b584-7d11e6b72ba3)

_Chips can contain a logo, icon, or circular image_

The leading icon color for unselected chips can be customized through theming. While the default color role is **primary**, the **on surface variant** color role is a good alternative when the icon style requires less emphasis.

[Image: 2 screens of a restaurant page with chips labeled "Add photos" and "Add dishes." The leading icons are purple in 1, grey in the other.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztk48sd-20.png?alt=media&token=5d587b93-544d-4a45-9be9-542d6d0c639a)

_**Primary** color (left) and **on surface variant** color (right)_

Leading circular images are sized larger than leading icons to provide more space for detail. Icons are designed to be legible at small sizes.

See the Specs tab (https://m3.material.io/m3/pages/chips/specs/) for precise measurement values.

[Image: 2 input chips, 1 with a 24dp leading avatar and the other with an 18dp leading icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8zj3zjt-24.png?alt=media&token=578a04b5-623e-4874-876b-1eb88afc97d5)

_Leading images, such as avatars, are sized larger than leading icons or logos_

##### Trailing icon (optional, input and filter chips only)

The trailing icon is present for input and filter chips.

On input chips, it's required and must be used to remove the chip. On filter chips, it's optional, and can be used to open a menu or remove the chip. 

Secondary actions (such as a trailing icon button for **Remove**) must have a 48x48dp interaction target that doesn’t interfere with the chip's primary action (such as **Edit** or **Drag**). To achieve this, apply a minimum width of 88dp to the chip, or 42dp to the label text.

[Image: A chip with 88dp min width has 2 touch targets of 48x48dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8wnoowx-25.png?alt=media&token=561c8e6e-128c-45da-b180-9450412e9786)

_Interaction targets for actions like **Edit** or **Close** have a size of 48x48. This can be achieved by setting the minimum container width to 88dp._

#### Assist chips

Assist chips represent smart or automated actions that can span multiple apps, such as opening a calendar event from the home screen. Assist chips function as though the person asked an assistant to complete the action. They should appear dynamically and contextually in a UI.

An alternative to assist chips are buttons, which should appear persistently and consistently.

[Image: 2 assist chips labeled “Add to my itinerary” and “12 mins from hotel” on map screen about Los Cantantes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8zjf1m3-24.png?alt=media&token=2bf49756-db97-43e7-a702-6a4b9bdbe2f0)

_The text in most assist chips begins with a short verb, like **Get **or **Add**_

[Image: 2 assist chips labeled “Event location” and “Chat” on phone lock screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smwopa-25.png?alt=media&token=84a161d6-6b18-4acb-828c-8bff17399130)

_An assist chip can surface supplemental information like a calendar event, as well as provide contextual actions_

[Image: Assist chip transformed into time picker with radio buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8smx4qo-26.png?alt=media&token=7c211ee9-74de-4ba7-a008-9a62fc6fa312)

_During an interaction, assist chips can transform into modals, transition into full-screen views of new content, or readjust to display more results inline_

Assist chips can trigger an action or show progress and confirmation.

Write assist chips like buttons: start with a verb. Adjust text dynamically if the state changes, like **Save** to **Saved**.

[Video: 3 assist chips labeled “Mail,” ”Messenger”, and “Video Chat” on a travel article.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm6bar2g2-GM3-Components-Chips-Guidelines-1.1-3P-v01.mp4?alt=media&token=15812d6f-42a4-4fe4-9812-5733219f2808)

_Tapping an assist chip triggers a contextual action_

[Video: Assist chip showing confirmation upon selection.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6af1abe-GM3-Components-Chips-Guidelines-1.2-v01.mp4?alt=media&token=1bd6a52b-bbba-46d0-b946-613396ca2cc9)

_Assist chips can show progress and confirmation feedback_

Assist chips are displayed after primary content, such as below a card or persistently at the bottom of a screen.

[Image: 3 assist chips labeled “Turn on lights”, “Set alarm”, and "Close Blinds" on Welcome Home screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8wo1u2m-30.png?alt=media&token=9cea4dd5-c858-4626-82ff-c09630488036)

_Assist chips should be shown underneath primary content_

#### Filter chips

Filter chips use tags or descriptive words to filter content. They can be a good alternative to segmented buttons or checkboxes when viewing a list or search results.

Tapping on a filter chip activates it and appends a leading checkmark icon to the starting edge of the chip label.

Write filter chips with nouns that describe the category to **include** in the results. Avoid negative phrases like **Exclude images**.

[Image: 4 filter chips labeled “Docs” “Slides” “Sheets” and “Images” with “Slides” and “Sheets” selected](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmd8wjrh5-31.png?alt=media&token=341ec51a-32f5-45e7-bc40-dd91b7788422)

_Filter chips rely on tags or descriptive words to filter content_

[Image: 5 filter chips representing popular electronics categories in a shopping app. The chip “Game consoles” is selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sn3s8s-32.png?alt=media&token=9227cae5-778a-44bf-8a7c-42f75b4835a6)

_Filter chips in a shopping app_

[Image: 6 filter chips representing apartment amenities in a real estate app. 2 of the chips are selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sn4ehq-33.png?alt=media&token=02823c77-4aa6-4603-b3dc-22030f8fe1f3)

_Filter chips in a real estate app_

Tap a chip to select it. Multiple chips can be selected or unselected.

[Image: 6 filter chips representing apartment amenities in a real estate app. 3 selected chips include checkmarks while 3 don’t.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9a0g8g2-34.png?alt=media&token=8e8879ac-09ef-444c-8340-d45d028571b9)

_An icon can be added to indicate when a filter chip is selected_

[Image: 3 amenities chips are selected, and 2 neighborhoods.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9a0gd06-35.png?alt=media&token=ff38ae5c-50b2-499f-9204-bfa0d3135145)

_Filter chip suggestions can dynamically change as a person starts to select filters_

Alternatively, a single chip can be selected. This offers an alternative to segmented buttons, radio buttons, or single select menus.

However, avoid mixing chip set behaviors. All chip sets on a page should be either single-select or multi-select.

[Video: filter chips labeled “Extra soft”, “Soft”, “Medium”, and “Hard” First, the “Extra soft” chip is selected, then it unselects as the “Medium” chip is selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8zkgr9j-GM3_Chips_Guideline_36_IA_v01.mp4?alt=media&token=5c0b8311-4de3-482b-a20b-a5251b0596b0)

_Filter chips can be set so that selecting a single chip automatically deselects all other chips in the set_

In medium and expanded breakpoints, filter chips may contain a trailing icon to directly remove the chip or open a menu of options.

In compact windows, the trailing icon's target area is too small to be accessible on its own. However, if the whole chip can be selected to accomplish the action, the chip is likely still accessible.

[Image: Filter chip with trailing remove icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8wocw84-37.png?alt=media&token=f109c387-69b6-4020-a8c3-cd9e50bded6b)

_The remove icon helps users remove the filter_

[Image: Filter chip with trailing menu icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8wodig6-38.png?alt=media&token=2983ad03-04d7-4d0d-9f35-8db9c0da9ccb)

_Filter chips can open a menu for more filtering options_

When combined with a menu, the filter chip opens a list of selectable options.

[Video: In a trail selector mobile app, a person selects the whole chip to change the menu selection from Walking to Cycling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8zkn8ku-GM3_Chips_Guideline_39_IA_v01.mp4?alt=media&token=c626d3e1-6080-48f3-95d3-23abf456ae84)

_In compact windows, make sure the whole chip opens the menu. Otherwise, the target area is likely too small to be accessible._

Filter chips can be used with other components, such as search fields and sheets.

[Image: 4 filter chips below search field](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8woi0j8-40.png?alt=media&token=bc5c2541-a0f8-49b4-a691-fde4c192e999)

_Filter chips can be shown underneath a search field_

[Image: Filter chips used as tags in a side sheet on a file application.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sni3vn-41.png?alt=media&token=cb763d98-2de3-4f8e-9abb-3c125699143d)

_Use a side sheet to organize many filter chips_

[Image: 6 filter chips wrapping to 2 rows](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztl3mne-41.png?alt=media&token=c2820337-f5ab-4aff-8081-11d14f5773cd)

_Filter chips can wrap to a new row. If there are more than two rows, consider using horizontal scrolling to access them all._

[Image: 4 filter chips with right-most chip partly offscreen, indicating the chips are horizontally scrollable](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztl40h2-42.png?alt=media&token=10ac484e-eb3c-4dee-8271-fc90e5127357)

_Filter chips can scroll horizontally to show many options_

[Image: Single filter chip option beneath the header “Category”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztl535g-43-dont.png?alt=media&token=c3bec0f6-c82a-454e-8f19-7faa3755d2a7)

_Filter chips should not present only a single option_

#### Input chips

Input chips represent discrete pieces of information entered by a person, such as Gmail contacts or filter options within a search field.

They enable user input and verify that input by converting text into chips.

[Image: Contacts transformed into 2 input chips in a draft event invite](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8zjw6tr-46.png?alt=media&token=42ea9290-183d-49a4-87af-026dbbb7ece0)

_Input chips transform text based on a person's input_

Input chips can support editing to change their contents, such as correcting an email address. In edit mode, the chip reverts back to a text string. Editing can be triggered by interacting with the chip, either by selecting it or by a second interaction after selection.

[Video: Contact transformed into input chip in the “To” filed of an email draft.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm6baqmrn-GM3-Components-Chips-Guidelines-4-3P-v01.mp4?alt=media&token=2569f33b-b367-47b3-a977-5b2b379f29ec)

_Input chips converted from email addresses are editable_

[Video: Animation showing selection of chip with backspace key.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8spbow8-GM3_Chips_Guideline_49_IA_v01.mp4?alt=media&token=049c59f7-5794-4c95-8a75-2db52a697eaa)

_Using the backspace key with the cursor before a chip selects the entire chip. The chip can then be deleted when the user taps the backspace key again._

A single field can contain multiple input chips. These chips can be reordered or moved into other fields.

[Image: 2 input chips in the “To” field of an email draft](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8wovhxb-52.png?alt=media&token=3e654279-702f-48a1-af2a-545f84e6f643)

_Multiple input chips in one field_

[Image: 1 input chip moved from the “To” field to the “CC” field of an email draft](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01e2s34-48-3p.png?alt=media&token=4678d2e0-a392-4577-b8c3-bb668e23d234)

_Input chips being moved from one field to another_

Input chips can expand to show more information or options. A container transform transition pattern is used to reveal additional content.

[Video: Contact input chip expands to show multiple email addresses for that contact](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm6baqa1g-GM3-Components-Chips-Guidelines-6-3P-v01.mp4?alt=media&token=3578c258-6cc2-47e3-ab3c-b561e7eae8d9)

_Input chips can expand_

##### Placement

Input chips can be integrated with other components.

They can appear:

- Inline with the cursor in a text field
- In a stacked list
- In a list that can be horizontally scrolled

[Image: 4 input chips wrapping to 2 rows.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm6bamolo-50.png?alt=media&token=d3df4ace-e08e-419b-ab0e-4c3371cf03cc)

_Input chips can wrap to a new row if all chips need to be visible_

[Video: 3 input chips horizontally scrolling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8zkwi4x-GM3_Chips_Guideline_58%20-%203P%20-_IA_v01.mp4?alt=media&token=cf7cc6f3-c5fd-4a6e-a1c6-0a96cb50baac)

_Input chips can scroll horizontally_

##### Icons & images

The leading icon of input chips can be an icon, logo, or circular image.

[Image: 2 input chips, 1 with leading thumbnail, 1 with leading icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8snzt8q-60.png?alt=media&token=c295bcf6-1528-4244-90ce-1164046350c0)

_Input chips can contain an icon, logo, or circular image_

The trailing icon is always aligned to the end side of the container. It’s placed:

- On the right for left-to-right (LTR) languages, such as English
- On the left for right-to-left (RTL) languages, such as Farsi

[Image: 2 input chips with trailing icons following the label text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztl8hee-55.png?alt=media&token=4f7aa05f-7c5f-48eb-a506-01bf4b00db3f)

_Input chips can be a more flexible way to filter search results, compared to filter chips_

[Image: 3 input chips with trailing icons following the label text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm01e408l-56.png?alt=media&token=c55f2035-dde2-46be-acc9-612a3ffd3642)

_Input chips make it easier to add and remove contacts_

[Video: Animation of overflowed chips in a text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8so4v60-GM3_Chips_Guideline_64_IA_v01.mp4?alt=media&token=a9f33551-7c2b-43e9-8fb1-967498afa01d)

_Overflowed chips in a text field should follow the same behavior as regular text. An unfocused text field with overflowed content should display the beginning of the input. Tapping the field snaps the user to the end of the input with the cursor and keyboard active._

#### Suggestion chips

Suggestion chips help narrow a user’s intent by presenting dynamically generated suggestions, such as possible responses or search filters.

Write suggestion chips as nouns or short phrases, depending on context. Avoid exceeding 20 characters when possible.

[Image: 3 suggestion chips offering ID options in a photo-recognition app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm99yzvnz-65.png?alt=media&token=2a4c37d4-4d71-4045-836a-2c8028cdb79a)

_The text labels within suggestion chips are most often nouns or short phrases_

[Image: 3 suggestion chips with automated reply options in a chat app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztlb0cw-60.png?alt=media&token=6853add2-195f-47e8-b902-eb3085d43868)

_Suggestion chips can offer quick-reply options in a chat or email app_

[Image: 2 suggestion chips with search options “What song is this?” and “What are the lyrics?”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztlbx06-61.png?alt=media&token=b95c0757-168c-455a-9fc1-011ea38e927e)

_A suggestion chip can help the user start a search_

##### Placement

When displaying multiple chips together, place them inline as a row of options, not listed vertically. Overflowing chips should break to the next line. 

If the field is only one row high, chip sets can scroll horizontally instead.

Keep an 8dp minimum space between chips. Chips must also have a minimum 48dp target size, regardless of placement or density. If required, the target can extend beyond the visible container of the chip.

Text labels for chips should be concise. Chip labels will truncate when in a wrapped layout, and when they are wider than the full width of the window.

[Image: Diagram of margins between a set of chips.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flztlcsh2-62.png?alt=media&token=812ad7a5-cf6b-44e5-bfb5-11e3a9037109)

_1. Margins between chips 
2. Margin between each line_

## Accessibility

#### Use cases

People should be able to do the following with assistive technology:

- Use a chip to perform an action
- Navigate to a chip 
- Activate a chip

#### Interaction & style

The chip label needs at least 3:1 contrast with the background.

A chip that performs an action should present the same semantics as a button to a platform's accessibility API.

[Image: The chip label needs to pass 3:1 contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm99z66s4-01.png?alt=media&token=f43b4651-be9f-4a1a-a7d2-4658f1096a47)

_High contrast helps differentiate chips clustered together_

##### Horizontal overflow

When there are too many chips to fit on one row, provide a way to display them all at once and avoid scrolling. 

**Reflow method: **Use a filter chip as a leading element to reflow the horizontal list. This should shift down the content below and make room for all chips to show.

[Video: Selecting a leading button pushes chips previously reachable only by scroll below, making them all visible.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9a4c1yw-GM3_Chips_Guidelines_07_IA_v01.mp4?alt=media&token=172440e0-6ede-4c76-8ac1-0ba44b6f713d)

_The **Show all **filter chip is used to reflow the list, displaying all chips at once and pushing down the content below_

**Menu method: **Create a leading button to display all chip options in a menu. Use this option to avoid shifting the position of the content below.

Don’t use the menu method on chips with a second action, like a remove icon.

[Video: Selecting a filter button produces a menu with all previously hidden chips visible.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9a4cs1u-GM3_Chips_Guidelines_08_IA_v01.mp4?alt=media&token=e4fc1953-feec-4b2d-b70e-958fbde400d4)

_The **Show all** leading button shows a menu of chip options, keeping the place of content below_

##### Avoid applying density by default

Don't apply density to chips by default — this lowers their targets below our best practice of 48x48 CSS pixels. Instead, give people a way to choose a higher density, like selecting a denser layout or changing the theme.

To ensure that this density setting can be easily reverted when it's active, keep all the targets to change it at minimum 48x48 CSS pixels each.

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Moves focus to enabled chip or chip group |
| **Space** or **Enter** | Activates, selects, or deselects the focused chip |
| **Backspace** or **Delete** | Removes currently focused input chip |
| **Arrows** | Moves focus between chips |

#### Labeling elements

| Element | A11y label | Role (Web) | Role (Android Views (MDC-Android)) | Role (Jetpack Compose) |
| --- | --- | --- | --- | --- |
| Image / Icon within chip | Hide image | - | - | - |
| Basic chip (one action) | “{chip content}” | gridcell | button | button |
| Selectable chip | “{chip content}” | gridcell | radio button | checkbox |
| Remove icon (no other action) | “Remove {chip content}” | - | - | - |
| Two actions (e.g., select + remove) | “{chip content}.” Then “Remove {chip content}”. | button or checkbox | button or checkbox | button or checkbox |

The accessibility label for a chip is the chip's label text. Additional actions, like remove, are labeled separately.

[Image: Accessibility tags for a chip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmderzcwe-02.png?alt=media&token=75d7c645-1d21-4915-8290-080815f8529c)

_Accessibility tags should include both the label and role_

##### Multi-select

For multi-select chip sets, **Space** or **Enter** will select the focused chip and allow you to select all of the chips. **Space** or **Enter** will also deselect a focused selected chip.

[Image: Accessibility tags for a multi-select chip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmderoau5-25.png?alt=media&token=16369c04-2f10-46eb-b761-0d25cd0b85c7)

_While multiple chips can be selected, only one can be in focus_

##### Drop-down list

The accessibility label should align with each list item’s text label. 

For list items with text and an icon, the accessibility label should be marked as decorative to avoid redundant verbalizations.

[Image: Accessibility tags for a drop-down list chip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd78nzr3-04.png?alt=media&token=4e0b3550-1e77-44ea-82a9-cfafaacadf98)

_The accessibility label should be the text label_

##### Input chip remove action

Display the remove icon whenever a chip can be removed. On mobile, if remove is the only chip action, the remove icon isn't necessary. Instead the chip can be removed by selecting it and pressing the **Delete** key on the keyboard.

Each chip is a focusable element. 

- If a chip only has a remove icon, the entire chip and icon are one focusable element. 
- If a chip has a second action, like select, then the chip content and remove icon are two separate focusable elements.

[Image: A focused remove action within a chip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmdfzbasm-06.png?alt=media&token=6e48261d-e866-4ab3-b79c-0e1ebbd20fdf)

_The remove action is focused when the chip can also be selected_

##### Showing chip interactivity

Material requires that chips use a secondary indicator to show that they are interactive in context, allowing users with low vision and cognitive disabilities to see them. 

Use one of the following methods: 

- 

Add a label before the chip group suggesting interaction, such as **Select type**

[Image: Label saying “Select type” above a series of chips, with “Extra soft” selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmn7orxd0-09.png?alt=media&token=703e2e1f-9e01-4ee6-aabf-fe051010953b)

_Labels introducing a chip group can indicate that they are selectable_

- 

Provide interactive page context, such as **Filter results**, indicating chips can be selected to narrow results

[Image: Page context saying “Filter results” above chips listing different categories.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmn7p0i6r-10.png?alt=media&token=3e5ad57b-e9ee-4e7d-a163-13a4be83cf1c)

_Page context can indicate how search results will be narrowed by selecting chips_

- 

Use the **outline** color role, instead of **outline variant**, to ensure a minimum 3:1 contrast
- 

Include an interactive chip label, such as **Turn on lights**, or leading icon

[Image: A selectable chip with more pronounced outline stroke.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmn7ot1xs-11.png?alt=media&token=ff16dbe5-ccdc-4988-ba07-1b1cd6555ae0)

_Chips can show they are interactive with a darker outline color stroke_

[Image: A chip labeled “Turn on lights” with a leading icon related to lights.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmn7p0649-11%20(1).png?alt=media&token=a7a56d49-99b1-4efa-b5e3-1c46a9476ad5)

_Chips can also use a leading icon or label to show interactivity_
