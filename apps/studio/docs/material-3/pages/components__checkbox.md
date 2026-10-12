# Checkbox

Source: <https://m3.material.io/components/checkbox> (content version 2026-09-23_06-10-05, page updated 2026-08-12T09:53:04.800Z)

## Overview

- Use checkboxes (instead of switches or radio buttons) if multiple options can be selected from a list
- Label should be scannable
- Selected items are more prominent than unselected items

[Image: 3 checkboxes in a diagram demonstrating all three states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcyjgb31-01.png?alt=media&token=c0a1a399-2957-49d2-96cf-9dc729961c04)

_Unselected, selected (hover), and indeterminate checkboxes_

#### Availability & resources

#### Differences from M2

- 

Color: New color mappings and compatibility with dynamic color
- 

States: New indeterminate states as well as error states for unselected, selected, and indeterminate

[Image: Color mapping of a checkbox in M2.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmab66psf-2.png?alt=media&token=fadcebcc-29a3-4085-8fa0-d922c32e0670)

_M2_

[Image: Color mapping of a checkbox in M3 with new color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmab66tlq-3.png?alt=media&token=fbb69b91-a08c-45f0-9f2e-4b6651b571db)

_M3_

## Specs

#### Tokens & specs

Browse the component elements, attributes, tokens, and their values.

[Token table: see ../tokens/TOKEN_TABLE.31f16b44fe03b0c0.md]

#### Checkbox

[Image: Diagram of checkbox indicating the 2 parts of its anatomy.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmemmstmc-1-3P.png?alt=media&token=924643e8-47c7-4874-8271-434f69003145)

_1. Container 
2. Icon_

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Checkbox color roles in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmemmtsu5-2-3P.png?alt=media&token=ffcff7c9-bb3d-4de7-be55-117c9cf5fe0b)

_1. Checkbox
2. State-layer
3. Icon_

##### Adjacent text label color

Use the color role **on surface** for adjacent text labels. This remains the same even if interacting with the label or component.

[Image: Checkboxes with text labels. The text color is the same for checked and unchecked checkboxes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmemmvnkr-3-3P.png?alt=media&token=8ead9094-8d12-42db-9365-a68124755b51)

_The text color remains the same regardless if the checkbox is selected or not_

#### States

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: Side by side view of states in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmemmxoan-4-3P.png?alt=media&token=9dc838c3-495c-4055-a7e4-aca61fe84f4e)

_1. Enabled 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed_

#### Measurements

[Image: Diagram of a selected checkbox with a container width and height of 18dp and a state-layer width and height of 40dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmemn204f-5-3P.png?alt=media&token=f0da40bb-17ba-4681-9e12-b76629ef8f5e)

| Attribute | Value |
| --- | --- |
| Container size | 18dp |
| Container corner shape | 2dp |
| Icon size | 18dp |
| Icon alignment | Center-aligned |
| Target size | 48dp |
| State-layer size | 40dp |

## Guidelines

[Image: A list of burger additions represented with checkboxes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0yt1n6-1.png?alt=media&token=e687e377-f0e9-4a8c-8323-97b6f3b03b2d)

_Checkboxes in a list of items_

#### Usage

Use checkboxes to: 

- Select one or more options from a list
- Present a list containing sub-selections
- Turn an item on or off in a desktop environment
- Visually group similar options together

[Image: List of 80's songs indicating choice through checkbox selection.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0vnl39-2.png?alt=media&token=a6b2f259-cb48-4e43-9699-e20e94c0d737)

_Checkboxes select multiple, related options_

Checkboxes should be used instead of switches if multiple, related options can be selected from a list. Checkboxes visually group similar items effectively and take up less space than switches.

[Image: List indicating choice with checkbox selection.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0vok05-3_do.png?alt=media&token=6dd5d04d-babd-45cf-b7f8-a5e95ab275ff)

_Checkboxes let users select one or more options from a list. A parent checkbox allows for easy selection or deselection of all items._

[Image: A list with multiple switches selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0vwf9n-4_dont.png?alt=media&token=049701a4-cc33-442f-8e4e-db9c79aa40fa)

_If a list consists of multiple options, don't use switches. Instead, use checkboxes. Checkboxes imply the items are related, and take up less visual space._

##### Alternate selection controls

Checkboxes, radio buttons, and switches are the three main selection controls. They all help people make choices, like selecting options or switching settings on or off.

- 

Use checkboxes to select multiple related options in a list.
- 

Use radio buttons to select a single option in a list.
- 

Use switches to select standalone or more verbose options in a list, like settings.

[Image: Diagram of 2 radio buttons, one selected and one unselected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcypcjyf-5.png?alt=media&token=e0bb850c-365e-424b-aaa7-703285e8a6ea)

_Radio buttons_

[Image: Diagram of 2 switches, one selected and one unselected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0vwj88-6.png?alt=media&token=9323d5db-9e97-4df0-a4b0-2cf2136cf1d2)

_Switches_

#### Anatomy

[Image: Diagram of checkbox indicating the 2 parts of its anatomy.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcypfx6t-7.png?alt=media&token=5f2b1048-7e0f-45f5-8f9b-3f09fab4e910)

_1. Container

2. Icon_

#### Responsive layout

In expanded breakpoints, placing checkboxes within a contained region such as a side sheet can help group related controls and available actions.

[Image: Desktop screen showing music albums and a side sheet containing checkboxes for filtering music genres.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0vp83b-8.png?alt=media&token=ccabbf13-9b61-4bec-938e-708c502111b0)

_A side sheet can group related controls on larger screens_

#### Behavior

Multiple checkboxes in a list can be selected.

[Video: Using checkboxes to select a list of extra ingredients, like pickles and tomatoes, to add to a meal.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3f7ot-GM3-Components-Checkbox-Guidelines-1-v01.mp4?alt=media&token=a07308bc-26e6-4d34-8765-cd9ad9e28b82)

_Selecting multiple items in a list using checkboxes_

Checkboxes can have a parent-child relationship with other checkboxes.

- When the parent checkbox is checked, all child checkboxes are checked
- If a parent checkbox is unchecked, all child checkboxes are unchecked
- If some, but not all, child checkboxes are checked, the parent checkbox becomes an indeterminate checkbox. Checking an indeterminate checkbox checks all child items.

[Video: Checking parent checkbox also checks child items. Unchecking one child item makes parent indeterminate.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3h4ri-GM3-Components-Checkbox-Guidelines-2-v01.mp4?alt=media&token=6272d373-67f5-4c84-83e3-b24489905343)

_Use a parent checkbox to make it more efficient to select many items_

When selected, a checkbox clearly and instantly communicates its selected state.

If used to turn something on or off, the action should be immediately executed.

[Video: Selecting a checkbox for turning on dark mode immediately changes the phone theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3iba1-GM3-Components-Checkbox-Guidelines-3-v01.mp4?alt=media&token=a72e8a98-afda-496e-b1ea-50647e6a9bca)

_Turning an item on or off using a checkbox_

## Accessibility

#### Use cases

People should be able to use assistive technology to:

- 

Navigate to a checkbox   
- 

Toggle the checkbox on and off
- 

Get appropriate feedback based on input type documented under Interaction & style (https://m3.material.io/m3/pages/checkbox/accessibility#6a2f55e5-2fa0-4204-b6d1-62362dda89c7)

#### Interaction & style

Users should be able to select either the text label or the checkbox to select an option.

[Image: In a list, checkboxes for 2 items are selected via their text labels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0vkh7s-1.png?alt=media&token=7e1977e6-bb1a-4a66-b82b-3e0fddb18e2f)

_A checkbox selected via the text label_

The parent checkbox has three states: selected, unselected, and indeterminate. 

Checkboxes can be selected or unselected regardless of the state of the other checkboxes in a group. 

If some, but not all, child checkboxes are checked, the parent checkbox becomes indeterminate. Selecting an indeterminate parent checkbox will check all of its child checkboxes.

[Image: In a list, a child checkbox for 1 item is selected and the parent checkbox is in indeterminate state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcyq4z51-2.png?alt=media&token=e2bf5c82-a9b2-403d-a5cd-fe09f708969a)

_An indeterminate selection indicating that at least one checkbox is selected within a group_

#### Avoid applying density by default

Don't apply density to checkboxes by default — this lowers their targets below our best practice of 48x48 CSS pixels. Instead, give people a way to choose a higher density, like selecting a denser layout or changing the theme.

To ensure that this density setting can be easily reverted when it's active, keep all the targets to change it at minimum 48x48 CSS pixels each.

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Moves focus to enabled chip or chip group |
| **Space** or **Enter** | Activates, selects, or deselects the focused chip |
| **Backspace** or **Delete** | Removes currently focused input chip |
| **Arrows** | Moves focus between chips |

#### Labeling elements

If the UI text is correctly linked to the checkbox, assistive tech (such as a screen reader) will read the UI text followed by the component’s role.

The accessibility label for an individual checkbox is typically the same as its adjacent text label.

[Image: Accessibility labels of a checkbox.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0vlqi0-3.png?alt=media&token=991b19e5-257d-4db0-9f2b-bc0ab092eeda)

_The accessibility label clearly states the text label of the checkbox_
