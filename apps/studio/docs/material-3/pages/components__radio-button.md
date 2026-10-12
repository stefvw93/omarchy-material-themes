# Radio button

Source: <https://m3.material.io/components/radio-button> (content version 2026-09-23_06-10-05, page updated 2026-07-17T07:17:47.331Z)

## Overview

- Use radio buttons (not switches) when only one item can be selected from a list
- Label should be scannable
- Selected items are more prominent than unselected items

[Image: 1 radio button is selected from a list of 4 radio buttons of different ringtones.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc92gkg1-01.png?alt=media&token=0ba6a2e1-d3f9-4777-8968-53de4d72a0e4)

_Radio buttons can be selected_

#### Resources & availability

#### What’s new

- Color: New color mappings and compatibility with dynamic color

[Image: App screen with 1 active button selected from list of 3 buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0z3b8a-02.png?alt=media&token=77e20fc8-fe1b-4715-a652-ac4eaed7eda5)

_Radio buttons feature new color mappings_

## Specs

[Image: Diagram of enabled radio button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmd8jp5v6-01-3P.png?alt=media&token=be9d2b02-1a2a-447a-99ad-3374eda8cc04)

_1. Radio button icon_

#### Tokens & specs

Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.6acb269a58d5f93f.md]

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Diagram of selected and unselected radio button colors.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmd8jpn14-02-3P.png?alt=media&token=07b7a3f4-c11b-4a24-b356-9b7665723560)

_Radio button color roles used for light and dark themes:

1. Primary
2. On surface variant_

##### Adjacent text label color

Use the color role **on surface** for adjacent text labels. This remains the same even if interacting with the label or component.

[Image: Radio buttons with labels. The labels are the same color for both selected and unselected radio buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmd8jq2c4-03-3P.png?alt=media&token=5139c7bd-b6b7-482a-8ec7-6f0ab70be705)

_The text color remains the same regardless if the button is selected or not_

#### States

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: Diagram of radio button states including enabled, hover, focus, pressed, and disabled.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmd8jqfvs-04-3P.png?alt=media&token=1b0973c2-4f09-49a9-8d23-17c22fa18ead)

_1. Enabled 
2. Hover 
3. Focus 
4. Pressed
5. Disabled_

State specs are in the token module above (https://m3.material.io/m3/pages/radio-button/specs#3eef19a6-cdcb-4ecf-b1af-2b8095d485ac)

#### Measurements

[Image: Diagram of radio button layout values.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmd8juo16-05-3P.png?alt=media&token=9241a630-7ef4-4e04-8741-21d6ea679187)

_Radio button size measurements_

| Attribute | Value |
| --- | --- |
| Icon size | 20dp |
| State layer size | 40dp |
| Target size | 48dp |

## Guidelines

[Image: 1 radio button is selected from a list of 4 radio buttons of different ringtones.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc92xj30-01.png?alt=media&token=bc7a6af6-e440-4e83-9cf9-cd221f402f47)

_Radio buttons_

#### Usage

Radio buttons are the recommended way to allow users to make a single selection from a list of options. 

Only one radio button can be selected at a time.

[Video: 1 of 3 languages is chosen using radio buttons. Selecting a language deselects the previous 1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcelfjb2-GM3_Radio-button_Guidelines_02_IA_v01.mp4?alt=media&token=0d82614e-b251-4aae-b4ef-3fade1f6b7a6)

_Radio buttons should always be accompanied by clear inline labels_

Use radio buttons to:

- Select a single option from a set
- Expose all available options

[Image: 2 radio buttons are used for allowing or turning off notifications. 2 checkboxes are used for microphone and location access.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc93t2tz-03.png?alt=media&token=7f07e07d-8370-4113-82b6-5721a31fd3dc)

_Radio buttons are single-select, unlike checkboxes which are multi-select_

[Image: Filter page with 4 sort by options as radio buttons. Relevance is selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc93whon-04-do.png?alt=media&token=0cc566db-1677-4900-be3a-bc24c75d71c7)

_Use radio buttons when only one option can be selected from a list_

[Image: Meal options page with the Additions item selected, along with 4 nested checkboxes for selecting various toppings. All checkboxes are selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc93wr1q-05-do.png?alt=media&token=4b1a71e3-2793-49ef-ab32-3a6493886899)

_Use checkboxes when multiple options can be selected from a list_

Avoid nesting radio buttons or using radio buttons to select multiple options.

[Image: Selected radio button with 2 nested radio buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc93ykkg-06_dont.png?alt=media&token=4ec7a39d-a607-42d0-9d65-4f5aa1a5ff8d)

_Don’t nest radio buttons_

[Image: 2 radio buttons selected at once from a list of 3 buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc93z4ss-07_dont.png?alt=media&token=0bc0f856-f056-4239-a7c7-81f173eb17f3)

_Don’t allow radio buttons to select multiple options_

##### Alternate selection controls

Radio buttons are one of several selection controls, which allow people to make choices such as selecting options or switching settings on or off.

Switches and checkboxes are alternative selection controls that can be used to change settings or preferences.

[Image: A selected and unselected switch.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc942yik-08.png?alt=media&token=4e62fb39-faac-4b27-a772-177524e99566)

_Switches_

[Image: An unselected and selected checkbox.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc942but-09.png?alt=media&token=d4f7cae0-6eea-4a17-b9d3-8fbb5c14152e)

_Checkboxes_

Use radio buttons when there are five or fewer options.

Consider using a drop-down menu instead of radio buttons when it’s important to save space on a screen. However, drop-down menus require additional steps for a person, both in the number of clicks and cognitive effort.

[Image: A filter UI with 1 radio button selected from a list of 3 buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc944w0k-10-do.png?alt=media&token=aa3e3c6c-e2a9-403a-b6dd-0143c3cdd3cc)

_Use radio buttons when there are five or fewer options_

[Image: A dropdown menu with a list of 4 options.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc945hgt-11-do.png?alt=media&token=8447a05a-5a0e-410b-8c1a-08854aa456b8)

_Consider using a drop-down menu instead of radio buttons when space is constrained_

#### Anatomy

[Image: 3 elements of a radio button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0z4md9-12.png?alt=media&token=1f3f5d82-b6f9-4b8f-b457-1a4935648df0)

_1. Selected icon
2. Adjacent label text
3. Unselected icon_

##### Adjacent label text

Always pair radio buttons with an adjacent label describing what the radio button selects.

Because only one radio button can be selected at a time, each choice must have its own label.

[Video: Checkout page with 2 radio buttons for home and office addresses. The labels are "Home" and "Office."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcelh3zd-GM3_Radio-button_Guidelines_13_IA_v01.mp4?alt=media&token=842f3d43-c21c-4b6f-b720-30f7b534bd17)

_Radio button always need label text_

#### Placement

Radio buttons are often arranged in stacked layouts.

[Image: Settings page with 3 stacked radio buttons for selecting a language.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc949gf8-14.png?alt=media&token=452d1dc1-2c20-4637-a479-3659c8737df7)

Radio buttons should be vertically listed and have one option always selected.

[Image: 3 radio buttons with 1 option selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc94bpsi-16_do.png?alt=media&token=b528a4f2-ab4a-40fc-bdf2-bbd1caa1d08c)

_Radio buttons should always have one option pre-selected_

[Image: 2 radio buttons side by side with 1 option selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwg86p38-16_caution.png?alt=media&token=e607157e-0a21-43aa-aa48-a01f13e6fb3b)

_Avoid using horizontal radio button lists_

#### Behavior

A radio button is successfully selected when a person clicks or taps either the radio button icon or the label.

[Video: Selecting the radio button for dark theme instantly changes the screen to dark theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcelja73-GM3_Radio-button_Guidelines_17_IA_v01.mp4?alt=media&token=421ebd62-4071-425d-adde-ddde3a7e7041)

_Radio buttons should take effect immediately, unless they're in a dialog or page that needs to be saved_

## Accessibility

#### Use cases

People should be able to do the following with assistive technology:

- 

Navigate to a radio button
- 

Select a radio button
- 

Get appropriate feedback based on input type

#### Interaction & style

A radio button can be either selected or unselected. Selecting one radio button deselects any others. A radio group can start with one radio button selected, or none selected.

Once a radio button is selected, the group can’t be deselected. To let people opt out of their selection, either provide a **Not applicable** or **No option** radio button, or provide a separate way to deselect all radio buttons, like **Clear selection**.

People should be able to select either the text label or the radio button to select an option.

[Video: Selecting between radio buttons for a home and office address.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcelaxg0-GM3_Radio-button_Accessibility_01_IA_v01.mp4?alt=media&token=73b3e621-4cdd-443f-ad2d-3348de408d8d)

_Only one radio button is selected at a time_

##### Avoid applying density by default

Don't apply density to radio buttons by default. This lowers their targets below Material's recommendation of 48x48 CSS pixels. Instead, give people a way to choose a higher density, like selecting a denser layout or changing the theme.

To ensure this density setting can be easily reverted when it's active, keep all targets to change it at a minimum of 48x48 CSS pixels each.

#### Initial focus

When outside the radio group, **Tab** moves focus directly to the selected radio button, or the first one if none are selected. 

**Shift+Tab** instead focuses on the last radio if none are selected. 

Use the **arrows** to navigate between options.

[Image: The Tab key focuses on the first of 2 stacked radio buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmc94qafr-02.png?alt=media&token=638e9dfc-3ae8-41e6-932c-be168461fa20)

_Tab brings the focus to the initially selected item or the initial radio option_

[Image: The up and down arrow keys move through a list of stacked radio buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0z51u6-03.png?alt=media&token=3d528eb7-dbb4-4460-a556-b4660f3bc8f0)

_Arrows move to next element in a list_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Moves focus into the group to the selected radio button, or the first if none are selected |
| **Shift** + **Tab** | Moves focus into the group to the selected radio button, or the last if none are selected |
| **Arrows** | Moves focus and selects the previous or next radio button. Wraps focus and selection between the first and last radio buttons. |
| **Space** | Selects a focused radio button. If already selected, does nothing. |

#### Labeling elements

If the UI text is correctly linked to the radio button, assistive tech such as a screenreader will read the UI text, followed by the component’s role.

The accessibility label for a group of radio buttons is typically the same as its title. The role is **Radio group**.

[Image: Accessibility tags for a radio button group.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd3jpo7w-04.png?alt=media&token=1f68a095-10b8-4914-9273-7f58c99a7f5e)

_Label the radio group based on the category title_

The accessibility label for an individual radio button is typically the same as its adjacent text label.

[Image: Accessibility tags for a radio button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0z56zm-05.png?alt=media&token=eff0ba7d-34fe-434b-b962-755ddac009ad)

_Label the radio button based on its label text_
