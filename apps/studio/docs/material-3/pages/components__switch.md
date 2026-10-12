# Switch

Source: <https://m3.material.io/components/switch> (content version 2026-09-23_06-10-05, page updated 2026-07-17T07:03:01.922Z)

## Overview

- 

Use switches (not radio buttons) if the items in a list can be independently controlled
- 

Switches are the best way to let people adjust settings
- 

Make sure the switch’s selection (on or off) is visible at a glance

[Image: A switch in two states, off and on.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwa9bnl5-1.png?alt=media&token=8a4b85d3-5a30-49e2-b32d-927fc4c6fc2d)

_Switches can be toggled on and off_

#### Availability & resources

#### Differences from M2

- 

Accessibility: Visual presentation is more accessible
- 

Color: New color mappings meet Material's non-text-contrast requirements in addition to compatibility with dynamic color
- 

Icons: Ability to have an optional icon within the switch handle
- 

Layout: Track is taller and wider

[Image: M2 switches in off and on states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg65z0ro-02.png?alt=media&token=4fdec8c9-1449-43cd-86b8-7aca1f7a1ad1)

_M2: Switches have a circular handle that extends beyond the edge of the track_

[Image: M3 switch shown toggled off and toggled on. When switched on, it has a checkmark icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg65zp7b-03.png?alt=media&token=bffcc9c3-bdaa-45b5-9065-d67bccd8dcf3)

_M3: Switches have a taller and wider track, new color mappings, and the ability to show an icon in the handle_

## Specs

[Image: 3 elements of a switch.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66415n-01-3P.png?alt=media&token=27830702-c236-42e4-9f51-90de8d2b302c)

_1. Track 
2. Handle (formerly "thumb")
3. Icon_

#### Tokens & specs

Browse the component elements, attributes, tokens, and their values. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.33b1b2925d9ff561.md]

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Image: 6 color roles of a switch in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66ckmz-02-3P.png?alt=media&token=a6c6fc8c-15bd-4364-bd5e-f9ba0422a8a4)

_Switch color roles used for light and dark themes:

1. Surface container highest
2. Outline
3. Outline
4. Primary
5. On primary
6. On primary container_

##### Adjacent text label color

Use the color role **on surface** for adjacent text labels. This remains the same even if interacting with the label or component.

[Image: The large body text adjacent to switches uses "on surface" color and the body text uses "on surface variant."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66fz7u-03-3P.png?alt=media&token=2c476a53-996e-45b0-b337-e2b0cd25e166)

_The text label uses **on surface**. Supporting text may use **on surface variant**._

#### States

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states)

[Image: 5 states of a switch shown in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66iwsh-04-3P.png?alt=media&token=45f45be7-4760-4f45-b752-da18d5f646e4)

_1. 

Enabled 
2. 

Hovered 
3. 

Focused 
4. 

Pressed 
5. 

Disabled_

State specs are in the token module above (https://m3.material.io/m3/pages/switch/specs#3708644e-b4d7-4237-bb0a-7afeeae4a9b0)

#### Measurements

[Image: Measurements of switches without icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66jzjg-05-3P.png?alt=media&token=03d410e2-0e07-4deb-b2d1-bffaf49c4e13)

_Switches without icons_

[Image: Measurements of pressed switches without icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66kbil-06-3P.png?alt=media&token=0a28f42d-8777-4c2f-87c8-eccad6e33f66)

_Pressed switches without icons_

[Image: Measurements of switches with icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66mxl5-07-3P.png?alt=media&token=5d9528c6-a0a0-4a9a-bad7-6247ad057d37)

_Switches with icons_

[Image: Measurements of pressed switches with icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66nbzr-08-3P.png?alt=media&token=aabf8a3a-33eb-4ed4-8992-3de1ad2e7e57)

_Pressed switches with icons_

| Element | Attribute | Value |
| --- | --- | --- |
| Track | Height | 32dp |
| Width | 52dp |  |
| Outline width | 2dp |  |
| Shape | md.sys.shape.corner.full (https://m3.material.io/m3/pages/shape/corner-radius-scale#56e2bfb5-4bec-49bd-b3a3-bd822c8ab88e) |  |
| Handle | Height (unselected) | 16dp |
| Height - with icon | 24dp |  |
| Height (selected) | 24dp |  |
| Height (pressed) | 28dp |  |
| Width (unselected) | 16dp |  |
| Width - with icon | 24dp |  |
| Width (selected) | 24dp |  |
| Width (pressed) | 28dp |  |
| Shape | md.sys.shape.corner.full (https://m3.material.io/m3/pages/shape/corner-radius-scale#56e2bfb5-4bec-49bd-b3a3-bd822c8ab88e) |  |
| State layer | Size | 40dp |
| Shape | md.sys.shape.corner.full (https://m3.material.io/m3/pages/shape/corner-radius-scale#56e2bfb5-4bec-49bd-b3a3-bd822c8ab88e) |  |
| Target | Size | 48dp |
| Icon | Size (selected) | 16dp |
| Icon | Size (unselected) | 16dp |

#### Configurations

1. Without icons
2. Icon on selected switch
3. Icon on selected and unselected switch

[Image: 3 example switches with and without icons in on and off states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg66of2m-09-3P.png?alt=media&token=299c633b-e204-4717-bc64-c54b7a5100e6)

## Guidelines

[Image: A switch in 2 states, off and on.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7sxhp8-01.png?alt=media&token=9cf20c7f-1383-4349-a75b-f6242b3a8aaf)

_Switches change settings and other options immediately_

#### Usage

Switches are best used to adjust settings and other standalone options. 

They make a binary selection:

- 

On and off
- 

True and false

The effects of a switch should start immediately, without needing to save.

[Video: Toggling a switch turns on dark mode in Settings on a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwa9phy3-GM3-Components-Switch-1-v01.mp4?alt=media&token=87034bac-0c9d-4b3f-91e4-29c02c97964d)

_Use a switch to turn an option on and off_

Use switches to:

- Toggle a single item on or off
- Immediately activate or deactivate something

[Image: Switch used in notification settings to turn on and off the "play over notifications" function.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7txet6-03.png?alt=media&token=9dde367e-511f-44db-a9cd-6f3ea4c2630c)

_Switches are commonly used on mobile to turn settings on or off_

Switches control binary options, not opposing ones. A binary option represents a single selection that's either on or off.

Opposing options are when only one option in a set can be selected at a time, like a list or map view. Use a connected button group instead.

[Image: A connected button group with options of List View and Map View.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7uio91-05%20-%20do.png?alt=media&token=b2b0ba0d-c3d0-4239-8b0f-d96c53e9457c)

_Use a connected button group to choose between opposing options_

[Image: A switch with non-binary options of List View and Map View.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7ukia8-06%20-%20dont.png?alt=media&token=79ae5e92-2043-4265-b926-1965e7805d0b)

_Avoid using switches to toggle between opposing options_

##### Alternate selection controls

Checkboxes, radio buttons, and switches are the three main kinds of selection controls. They help people make choices, like selecting options or turning settings on and off.

Use checkboxes to select multiple related options in a list.

Use radio buttons to select a single option in a list.

Use switches to select standalone or more verbose options in a list, like settings.

[Image: 2 checkboxes, 1 unchecked and 1 checked.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7ul4t0-07.png?alt=media&token=95b2a20a-6385-4636-8418-d6322ab44f62)

_Checkboxes_

[Image: 2 radio buttons, 1 in an enabled state, 1 in a disabled state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7ulhxp-08.png?alt=media&token=3f1f093d-f109-41cc-94b9-8275abe131d8)

_Radio buttons_

[Image: Mobile screen with checkboxes to select list items and call to action button to update the list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7ustxv-09_Do.png?alt=media&token=2f9d9c72-a27f-4bb4-a475-f1bdaa198acf)

_Use checkboxes (not switches) to let people select one or more options from a list_

[Image: Mobile screen with checkboxes to select list items and call to action switch to update the list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7ut60g-10_Don't.png?alt=media&token=258cf8f8-e60a-4b0f-b0f0-9c08f5a70a8f)

_A switch can't replace a button. People expect a call to action to be a button, not a switch._

[Image: Radio buttons used to select a language for a mobile app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7uvzmf-11_do.png?alt=media&token=07dcfa64-19b2-481b-b65d-4703baafa5e0)

_Use radio buttons (not switches) when only one item can be selected from a list_

[Image: Mobile screen with switches to select list items and call to action button to update the list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7vc3q1-12_don't.png?alt=media&token=3176413a-9e5d-448f-b807-36ca1b72ac04)

_Avoid using a switch to select multiple options that require people to save. Switches should be immediate. Use checkboxes instead._

#### Anatomy

[Image: 3 elements of a switch.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7vge0i-13.png?alt=media&token=082b9467-6cbf-4fea-a904-be06d0b5b7ef)

_1. Track
2. Handle
3. Icon (optional)_

##### Icon (optional)

The switch handle can contain an optional icon.

[Video: A checkmark appears on the filled circle of a handle when the switch is toggled on.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwabkmev-GM3-Components-Switch-2-v01.mp4?alt=media&token=c11da5d1-2565-4717-86b8-172964ae3708)

_The icon within the handle should always communicate the switch's selection_

Icons can be used to visually emphasize the switch’s selection. The icon’s meaning should be clear and unambiguous to help the people understand whether switch is on or off.

[Image: 2 switches, the unselected state icon is an X, and the selected state is a checkmark.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7vjfr0-15_Do.png?alt=media&token=a17fe805-0167-4f6a-b155-f7c3f5aacb4b)

_Use icons that clearly communicate whether the switch is on or off, such as an X and a checkmark_

[Image: A switch’s unselected handle icon is a moon and the selected state icon is a pencil.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7vpyog-16_Don't.png?alt=media&token=70eb3f5d-9352-484d-8077-26b25f8c8339)

_Avoid using more ambiguous or non-binary icons, such as a moon or edit icon_

##### Label text

Switches should always be paired with an inline label describing what the switch controls when selected.

[Image: Switch label text: 1. Permission manager, App has access to your data. 2. Camera access, app has access to your camera. 3. Show password.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7vyj3y-17_do.png?alt=media&token=dca3bc09-c973-4f83-8394-4012f61b958b)

_Keep labels short and direct. A label should describe what the control does when the switch is on._

[Image: On a mobile screen’s privacy settings, 2 switches have “On” label text and checkmark icons. The last switch has “Off” label text and no icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7vz4xm-18_don't.png?alt=media&token=e81167e0-82e8-487e-af0a-4b91d93360e9)

_Don't add label text into the switch; the font size would be too small to be accessible. Use an appropriate icon instead._

#### Placement

Switches are often arranged in stacked layouts.

[Image: Screen showing labels and stacked switches in varying on/off modes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg7xvplw-19_placement.png?alt=media&token=73f5211c-64e5-4b82-b081-95ab81ae7b9d)

_Settings screens are common places to use switches_

#### Behavior

A switch is successfully toggled when the handle slides to the other side of the track after an interaction.

[Video: A switch is toggled to turn on airplane mode and Wi-Fi switch automatically turns off.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwabqhfg-GM3-Components-Switch-3-v01.mp4?alt=media&token=b03a8301-b5e1-43b1-91d5-2fcb30f3ba71)

_When selected, the switch handle slides to the opposite end of the track_

When a person toggles a switch, its handle size changes and the corresponding action takes effect immediately.

[Video: When selected the switch’s handle gets larger and a checkmark appears on the filled circle.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwabqzdx-GM3-Components-Switch-4-v01.mp4?alt=media&token=71a78019-9dac-4493-a0d1-ad40a4c505af)

_The **on** state of the switch is indicated by a larger handle size_

## Accessibility

#### Use cases

People should be able to do the following with assistive technology:

- 

Navigate to a switch with a keyboard or switch input
- 

Toggle the switch on and off
- 

Get appropriate feedback based on input type documented under Interaction & style (https://m3.material.io/m3/pages/switch/accessibility#c0e9fae1-48df-428b-b028-4f7be071ada3)

#### Interaction & style

The switch handle increases in size to indicate interactivity for both touch and cursor control interactions.

**Touch**
When tapped or dragged, the handle size grows, providing interaction feedback.

**Cursor**
When hovered (in both on and off states), the hover area grows, providing a visual cue that the handle is interactive. When clicked, the handle size grows.

[Image: The switch handle increases in size when tapped and dragged.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg68ycaw-01.png?alt=media&token=9c11889d-7f24-4d5a-bb90-9b469937fc21)

_Touch: Tap, Drag_

[Image: The cursor changes from an arrow to a hand pointer when hovering over and clicking the switch.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg68z1uk-02.png?alt=media&token=bc75a5a2-35c9-4f57-aea5-6b74a1befbed)

_Cursor: Hover, Click_

##### Avoid applying density by default

Don't apply density to switches by default — this lowers their targets below our best practice of 48x48 CSS pixels. Instead, give people a way to choose a higher density, like selecting a denser layout or changing the theme.

To ensure that this density setting can easily be reverted when it's active, keep all targets to change it at a minimum 48x48 CSS pixels each.

#### Initial focus

Initial focus lands directly on the switch’s handle, since it’s the primary interactive element of the component.

[Image: The focus is on the switch handle, which is toggled on.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg692flh-03.png?alt=media&token=ab8f62a5-12ae-463c-9d74-a96cdbdb270c)

_Focus lands on the switch handle_

[Image: Space or Enter is used to toggle the switch off.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg692zv4-04.png?alt=media&token=e69e20fa-da0a-4bbe-814a-1bbfbf3d0973)

_The switch is toggled using **Space** or **Enter**_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Focus lands on the switch handle |
| **Space **or** Enter** | Toggles the handle on and off |

#### Labeling elements

The accessibility label for a switch uses the adjacent label text if implemented correctly. 

Assistive tech such as a screen reader will read the UI text followed by the component’s role.

[Image: “Dark theme” is the switch’s adjacent label text and the accessibility label.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg695w5m-05.png?alt=media&token=dda98de5-3d58-48c6-bf03-15d563c4e742)

_A switch’s accessibility label can incorporate its adjacent UI text_

When the visible UI text is ambiguous, accessibility labels need to be more descriptive. For example, a switch visibly labelled **Photo album** would benefit from additional information to clarify the switch’s function.

Consider making the adjacent label text more descriptive when possible. This reduces the need for different accessibility text.

[Image: The accessibility label for the switch is “Photo album access” though the label text is “photo album.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg698bn2-06.png?alt=media&token=5ef0f417-dae7-4548-8214-6003ed547f91)

_While the visible label text reads **Photo album**, the accessibility label for this switch clarifies its function: **Photo album access**_
