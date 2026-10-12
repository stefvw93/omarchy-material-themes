# States

Source: <https://m3.material.io/foundations/interaction/states> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:30:22.307Z)

> States show the interaction status of a component or UI element

## Overview

- States have two visual indicators to ensure accessibility
- States can be combined, such as selection and hover
- Apply states consistently across components

#### Resources

| Type | Link | Status |
| --- | --- | --- |
| Design | Design Kit (http://goo.gle/m3-design-kit) | Available |

1. Enabled
 (https://m3.material.io/m3/pages/interaction-states/applying-states#39b2fc90-01db-41b5-b6f8-47be61ed1479)An enabled state communicates an interactive component or element.

2. Disabled (https://m3.material.io/m3/pages/interaction-states/applying-states#4aff9c51-d20f-4580-a510-862d2e25e931)
A disabled state communicates an inoperable component or element.

[Image: Enabled button has a strong contrast between container and text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2n4rwz-1p-Enabled%20button.png?alt=media&token=d51bf56c-de76-4d8c-bcb7-29ef54bf1dd8)

_Enabled button_

[Image: Disabled button has low contrast grey text on grey container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2n5ghx-1p-Disabled%20button.png?alt=media&token=29088245-b4e1-4c89-8be5-2bd64aafca55)

_Disabled button_

3. Hover (https://m3.material.io/m3/pages/interaction-states/applying-states#71c347c2-dd75-485b-892e-04d2900bd844)
A hover state communicates when a user has placed a cursor above an interactive element.

4. Focused (https://m3.material.io/m3/pages/interaction-states/applying-states#bc6d6853-48ef-490e-8076-448e89e69f0f)
A focused state communicates when a user has highlighted an element, using an input method such as a keyboard or voice.

[Image: Cursor positioned over a button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2ndeib-1p-Hovered%20button.png?alt=media&token=82061a85-c778-492f-9faf-93ed72a377bf)

_Hovered button_

[Image: The focused button has a strong contrast between container and text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2negg3-1p-Focused%20button.png?alt=media&token=fd25e436-79cc-46fc-97f6-f0bc86545c5e)

_Focused button_

5. Pressed (https://m3.material.io/m3/pages/interaction-states/applying-states#c3690714-b741-492d-97b0-5fc1960e43e6)
A pressed state communicates a user tap.

6. Dragged (https://m3.material.io/m3/pages/interaction-states/applying-states#c97582c4-5fef-42ce-9c34-71f8dcc5b8ad)
A dragged state communicates when a user presses and moves an element.

[Image: The pressed button has a strong contrast between container and text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qd3dz-1p-Pressed%20button.png?alt=media&token=dbcd674e-5bb0-4176-8362-e3451b8d538b)

_Pressed button_

[Image: Dragged chip](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qdrga-1p-Dragged%20chip.png?alt=media&token=84e211bb-d118-44c7-b4d9-cb4b86e9f884)

_Dragged chip_

## State layers

#### State layers

A state layer is a semi-transparent covering on an element that indicates its state. State layers provide a systematic approach to visualizing states by using opacity. A layer can be applied to an entire element or in a circular shape and only one state layer can be applied at a given time.

To transition from an enabled style to a stateful style requires the addition of a state layer. 

The state layer is an overlay with a fixed opacity for each state and uses the same color as the content. 

For example, if the enabled style uses the **secondary container** color for the container and **on secondary container** for content, the state layer will be an overlay using the **on secondary container** color.  

If the enabled style uses the **surface** color for the container and the **primary** color role for content, then the state layer will be an overlay using the **primary** color.

[Image: State layer sandwiched between the container and content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qh1yi-1p_State%20Layers_1.png?alt=media&token=40e0a636-b5f9-4547-a0ad-90cccc333d70)

_1. Container
2. State layer
3. Content_

The size of state layers is 40dp while the interactive target size is 48dp.

[Image: Interaction target is larger than the state layer.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qhye4-1p_State%20Layers_2.png?alt=media&token=772b1316-6175-4fb3-bae0-d523c06b125b)

_1. State layer
2. Interactive target_

##### On colors

By default, a component’s state layer color is derived from the color of its content, either the color of an icon or label text if no icon is present.

An on color (https://m3.material.io/m3/pages/color-roles#19e75989-7485-4f5b-a769-940c4e4364bc) is a color role used by the content. Each container color has its own corresponding on color. 

For example, if a container color is **secondary container**, the content will use the **on secondary container** color role.

[Image: State layer sandwiched between the content and container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qisol-1p_on_colors.png?alt=media&token=8c883e0d-7010-4c6e-8a25-fc4aa4d92370)

_Order of surface layers shows the state layer (2) between the container (1) and content (3) layers_

##### State layer tokens & values

The state layer uses a fixed percentage for the opacity for each state. A state layer uses the color used by content (usually the on color (https://m3.material.io/m3/pages/color-roles#19e75989-7485-4f5b-a769-940c4e4364bc)) and the percentage opacity for its respective state.

[Image: The opacity values of four overlay states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qnx2g-1p_state_layer_tokens%26value.png?alt=media&token=bf0becab-a73a-4693-bd6b-bd89c858de30)

_Four overlay states and their values:

1. Hover +8% opacity 
2. Focus +10% opacity 
3. Press +10% opacity
4. Drag +16% opacity_

[Token table: see ../tokens/TOKEN_TYPE_UNSPECIFIED.20543ce18892f7d9.md]

## Applying states

#### Enabled

An enabled state communicates an interactive component or element. Enabled states use the default styling for each interactive component.

[Image: Enabled state of 4 components.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qpw4a-1.png?alt=media&token=0bec13e6-8bd8-4dc3-9439-6e9d9ff68b4e)

_Enabled states for:

1. Button
2. FAB
3. Switch
4. Text field_

#### Disabled

A disabled state communicates when a component or element isn’t interactive. This state is visually communicated through color changes and reduced elevation.

**Disabled states don't need to meet Material's contrast requirements.**

[Image: Low opacity solitary button labeled disabled, indicates a disabled/inoperable state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qrzig-2.png?alt=media&token=fc37d2ef-40ff-4d49-9c55-d1c580dae532)

_Disabled button_

Disabled states **are** inherited by action, selection, and input components:

- Buttons
- Cards
- Checkboxes
- Chips
- List items
- Radio buttons
- Switches
- Text fields

[Image: Inoperable state of 4 components.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qtg0r-3.png?alt=media&token=469e37f6-f896-42c0-8d8a-2024ad74a6ee)

_Disabled states for:

1. Checkbox
2. Icon button
3. Radio button
4. Segmented button_

Disabled states **aren't** inherited by communication, containment, navigation, and some actions components: 

- App bars
- Badges
- Dialogs
- Floating action buttons (FABs)
- Menus
- Navigation bar, drawer, and rail
- Sheets
- Tabs
- Tooltips

[Image: Screen erroneously showing edit FAB in inoperable state, though the edit function is unavailable.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2quyuj-4.png?alt=media&token=3366711f-aafa-4b7e-ab99-1a0f6c67378e)

_If the action represented in the FAB is unavailable, the FAB shouldn't appear_

##### Behavior

Disabled components can’t be focused, dragged, or pressed, and they don’t change state when tapped or hovered over.

[Video: A cursor moves over and clicks on an disabled/inoperable button and the button doesn’t change.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2vtf7p-GM3-Foundations-Interaction-States-DisabledBehavior-v01.mp4?alt=media&token=929e0dbc-d1ff-4268-8c6a-d41e1a476f0e)

_A disabled button doesn’t inherit hover or other state layers_

There can be any number of disabled states in a layout.

[Image: Disabled components on a screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyml0ix7-6.png?alt=media&token=c6c1365d-7e53-471d-a1e4-8babbf37b298)

_1. Disabled redo icon button
2. Disabled checklist icon button_

#### Hover

Hover states are initiated by the user pausing over an interactive element using a cursor.

The lower-emphasis surface overlay for hover states can be applied to the entire component, elements within a component, or as a circular shape over part of the component.

[Image: Cursor moves toward button which reads “enabled” and when the cursor touches the button text changes to “hovered.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2vwc74-7.png?alt=media&token=728c0b8a-43b5-49a2-8640-a0c368d2e966)

_Hovered button_

Hover states **are** inherited by action, selection, and input components:

- Buttons
- Cards
- Checkbox
- Chips
- Date and time pickers
- List items
- Slider
- Switch
- Text fields

[Image: Hover state of 4 components.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2vxl8i-8.png?alt=media&token=4f810fc7-a579-445c-a178-ebc7a19caeb2)

_Hovered states for:

1. FAB
2. Icon button
3. Chip
4. Segmented buttons_

Hover states **aren’t** inherited by communication, containment, or navigation components: 

- App bars
- Badges
- Dialogs
- Menus
- Navigation bar, drawer, and rail
- Sheets
- Tabs

[Image: Mobile screen with the whole app bar wrongly in hover state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2vymng-9.png?alt=media&token=5cf648b1-7239-43fd-a65f-9198fd11f289)

_The individual components that are actionable within the app bar inherit hover states, not the whole app bar_

##### Behavior

Hover states are initiated by the user pausing over an interactive element using a cursor.

[Video: Button’s text“Enabled” changes to“Hovered” when cursor moves over the button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2w0utg-GM3-Foundations-Interaction-States-HoverBehavior-1-v01.mp4?alt=media&token=d62f89ca-33da-4b39-97a9-f766f45ba432)

_Hover states appear and disappear using a low-emphasis animated fade_

Hover states can be combined with focused, activated, selected, or pressed states.

[Video: Filter chip text matches state as it's unselected, hovered, and selected by a cursor.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmq7s3uq1-03%20-%20GM3-Foundations-Interaction-States-HoverBehavior-2-v02.mp4?alt=media&token=76495a04-e402-450d-b673-ecfaabfa552a)

_A selected filter chip in both selected and hover states_

There can only be one hover state at a time in a layout.

[Video: Hover state moves from one card to another with cursor movement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2w8zl5-GM3-Foundations-Interaction-States-HoverBehavior-3-v01.mp4?alt=media&token=e1229bd4-baf1-44c7-9f68-3f0f56c1afb7)

_Hover state can only be on one element at a time based on cursor position_

#### Focused

A focused state communicates when a user has highlighted an element using a keyboard or voice. Focus states apply to all interactive components.

The higher-emphasis surface overlay for focused states can be applied to the entire component, elements within a component, or as a circular shape over part of the component.

[Image: A button in focused state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wa79s-13.png?alt=media&token=7bf4ddd9-516f-4ab7-b20e-e19ab3a26cdd)

_Focused button_

Focus states **are** inherited by action, selection, and input components:

- Buttons
- Cards
- Checkbox
- Chips
- Date and time pickers
- List items
- Selection controls
- Text fields

[Image: Focus state of 4 components.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wb5y9-14.png?alt=media&token=292090a2-1e6f-4e36-84ba-5ebafeb0e3af)

_Focused states for:

1. FAB
2. Icon button
3. Chip
4. Segmented buttons_

Focus states **aren’t** inherited by most communication, containment, or navigation components:

- App bars
- Badges
- Banner
- Card
- Dialogs
- Navigation bar, drawer, and rail
- Sheets

[Image: Mobile screen showing entire app bar in focus state, which is an error.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wctgk-15.png?alt=media&token=871fc6c8-7cf7-48d9-aed1-4f876be97c67)

_The individual components that are actionable within the app bar inherit focus states, not the whole app bar_

##### Keyboard focus indicator

Many people use the **Tab** key or other shortcut to navigate the interactive elements of a web page, like links, buttons, and chips.

When an element is tabbed to, it appears in its focused state with a ring-like **keyboard focus indicator**. This indicator helps web users know where they are on the page.

While focused, an element can be acted on with the keyboard.

[Image: A single filled button in focused state, displaying the keyboard focus indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wdmfh-16.png?alt=media&token=68221847-c082-4963-8058-4e75a9c38465)

_Keyboard focus indicator for a filled button_

##### Behavior

Focus states are initiated by the user by pressing the **Tab **key on the keyboard (or equivalent).

Focus states can be represented in combination with hover, activated, or selected states.

[Image: A single filter chip simultaneously in selected state and focus state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wf3qd-17.png?alt=media&token=67048848-6bba-4299-9dfd-3b5fe3c753ec)

_A selected filter chip in both selected and focused states_

There can only be one focus state at a time in a layout.

[Video: Cursor moving from one card in focus state to another card moves the focus state to the second card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2whda4-GM3-Foundations-Interaction-States-FocusedBehavior-v01.mp4?alt=media&token=7154f56e-a56d-423e-8de2-fea1290c9ef4)

_A focus state applied to one card at a time_

#### Pressed

A pressed state communicates a user-initiated tap or click via cursor, keyboard, or voice input. This state applies to all interactive components.

Pressed states trigger a change in composition and should be high-emphasis.

A ripple overlay signifies a pressed state. It can be applied to an entire component or elements within a component, or as a circular shape over part of the component.

[Image: Button using a ripple overlay to signify it’s in a pressed state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wj03t-25.png?alt=media&token=776a2614-2e05-4545-96d3-a6bc53947375)

_Pressed button_

Some components, such as buttons or cards, can inherit elevation to signify a pressed state.

[Image: Button using elevation to signify it’s in a pressed state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wk46q-26.png?alt=media&token=b1e55cc3-9ee8-44b0-8722-0a4a23636069)

_Pressed button with elevation_

Pressed states **are** inherited by action, selection, and some containment components: 

- Buttons
- Cards
- Checkbox
- Chips
- List items
- Text fields

[Image: Four components shown in pressed state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wl23l-27.png?alt=media&token=b2dff0e0-1bf2-47fb-a689-040b778ffcf1)

_Pressed states for:

1. FAB
2. Icon button
3. Chip
4. Segmented button_

Pressed states **aren’t** inherited by communication, navigation, or some containment components: 

- App bars
- Badges
- Bottom navigation
- Dialogs
- Menus
- Sheets
- Tabs

[Image: Mobile screen showing entire app bar in pressed state is an error.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wo5k7-28.png?alt=media&token=93cc4266-18d2-497d-a0d9-55a73988142f)

_The individual components that are actionable within the app bar inherit pressed states, not the whole app bar_

##### Behavior

Pressed states are initiated by user keyboard or voice input on an interactive element.

[Video: Enabled state activated to pressed state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wqo0t-GM3-Foundations-Interaction-States-PressedBehavior-1-v01.mp4?alt=media&token=878dc910-8f6c-4cb6-bfdb-3fb88a2ee40a)

_Activated states appear in user-initiated order_

Pressed states can be combined with hovered, focused, activated, or selected states.

[Video: Hovered state activated to a pressed state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wrufa-GM3-Foundations-Interaction-States-PressedBehavior-2-v01.mp4?alt=media&token=37adbaa0-9c13-4684-90fe-ed200d7f9013)

_Activated states can be represented in combination with hover and focus_

There may only be a single pressed state at a time in a layout.

[Video: Pressed state on one card at a time.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wt4k8-GM3-Foundations-Interaction-States-PressedBehavior-3-v01.mp4?alt=media&token=6f49e3db-4639-4ed8-8556-54a86ee743c4)

_A pressed state applied to one card at a time_

#### Dragged

A dragged state occurs when a user presses and moves an element or component. Dragged states should be low emphasis, to avoid distracting users from their task.

Dragged states use a lower emphasis overlay. It can be applied to the entire component or to elements within a component.

Some components, such as list items, chips, or cards, can inherit elevation to signify a dragged state.

[Image: List item shown in dragged state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wu37e-32.png?alt=media&token=fefabf35-2cb5-4fdd-b0bb-4cee4442d148)

_Dragged list item_

Dragged states **are** inherited by some containment and selection components: 

- Cards
- Chips
- List items
- Sliders

[Image: A chip and a card both shown in dragged state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wv77r-33.png?alt=media&token=a3ace83a-7173-47cb-9fc2-60646fe0dd47)

_Dragged states for:

1. Chip
2. Card_

Dragged states **aren’t** inherited by action, communication, navigation, or some containment components: 

- App bars
- Badges
- Buttons
- Dialogs
- Menus
- Navigation bar, drawer, and rail

[Image: Mobile screen with app bar in dragged state is an error.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2ww2lq-34.png?alt=media&token=33a7d3f2-493d-4137-a038-289ddac5488c)

_Components like an app bar that require consistent placement should not inherit dragged states_

##### Behavior

Dragged states are initiated when users touch and hold elements, using an input method such as a tap or click.

[Video: Going through the states of a draggable list item: enabled, hovered, dragged.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wxglg-GM3-Foundations-Interaction-States-DraggedBehavior-1-v01.mp4?alt=media&token=1a50ed48-7d69-4df1-b0d2-37034ad3431b)

_A list item in a dragged state_

There may only be a single dragged state at a time within a layout.

[Video: Cursor dragging cards one at a time.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2wyr5e-GM3-Foundations-Interaction-States-DraggedBehavior-2-v01.mp4?alt=media&token=6ea2d536-318a-4749-9233-52eefb9baab5)

_Dragged state applied to one card at a time_
