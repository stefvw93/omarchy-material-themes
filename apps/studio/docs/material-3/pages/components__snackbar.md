# Snackbar

Source: <https://m3.material.io/components/snackbar> (content version 2026-09-23_06-10-05, page updated 2026-07-28T08:03:08.607Z)

## Overview

- Snackbars shouldn’t interrupt the user’s experience 
- Usually appear at the bottom of the UI
- Can disappear on their own or remain on screen until the user takes action

[Image: Diagram of snackbar placement](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwow6ukp-1.png?alt=media&token=24ee05cc-c58f-4ecb-8348-804d66e04ab4)

#### Availability & resources

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color
- Behavior: Clarified that snackbars can either appear temporarily (dismissive) or persist until the user takes an action (non-dismissive)

[Image: Example of snackbar on screen bottom](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwow95bc-2.png?alt=media&token=6719d9ee-ca40-4021-8b1c-1e07c2a88258)

_Snackbars have new color mappings_

## Specs

[Image: Diagram of snackbar indicating the four parts of its anatomy](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkvpjhzt-01-3P.png?alt=media&token=6b576463-6ebb-4dce-8b7b-ec988f189091)

_1. 

Container
2. 

Icon (optional close affordance)
3. 

Action (optional)
4. 

Supporting text_

#### Tokens and specs

Browse the component elements, attributes, tokens, and their values. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.346ae12a744b45dd.md]

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Diagram of snackbar indicating color and inverse text and labels](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flxlhysf9-2.png?alt=media&token=bdd60717-341a-4897-92a8-f69e82d01678)

_Snackbar color roles used for light and dark schemes:

1. Inverse surface
2. Inverse on surface
3. Inverse primary
4. Inverse on surface_

#### Measurements

[Image: Diagram of snackbar with action](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8otc9es-3-3P.png?alt=media&token=4f3390bd-7907-45b6-b9ac-638802fca181)

_Snackbar padding and size measurements_

#### Configurations

[Image: 5 snackbar configurations.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flxli48dd-5.png?alt=media&token=f82b1a9e-b006-4266-983f-78f956d8b70a)

_1. Single line
2. Single line with action
3. Two lines
4. Two lines with action
5. Two lines with longer action_

## Guidelines

[Image: Snackbar at the bottom of a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6a9x4e1-1.png?alt=media&token=a139356b-4222-4b76-9c80-cfefdb00ced0)

#### Usage

Snackbars inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen.

They shouldn't interrupt the user experience. People can browse the page content without being required to interact with the snackbar.

**Frequency**
Only one snackbar may be displayed at a time.

**Actions**
A snackbar can contain a single action. "Dismiss" or "cancel" actions are optional.

[Image: Snackbar showing 'Email archived' text with an 'Undo' text button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6a9y0k8-2.png?alt=media&token=e904bf19-99d6-4d22-9a44-1f986f1574c8)

##### Similar components

Dialogs are also designed to show important messages.

Choose the right component based on the importance of the message. This component messaging strategy can help avoid overusing snackbars.

[Image: Dialog on a phone requiring the user to sign in to continue. Dismissing prevents them from progressing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8ov80w7-4.png?alt=media&token=c4c52f38-503e-4cd3-a40f-65423db893e4)

_Dialogs require immediate action_

**When to use snackbars**
Snackbars communicate messages that are minimally interruptive and don’t require user action.

| Component | Priority | User action |
| --- | --- | --- |
| Snackbar | Low priority | Optional: Snackbars disappear automatically |
| Dialog | High priority | Required: Dialogs block app usage until the user takes a dialog action or exits the dialog (if available) |

##### Accessibility requirements for web

On web, auto-dismissing snackbars are inaccessible for people with low vision or who require additional time to perceive information. This can be solved in 2 ways:

###### 1. Add inline feedback

Information in auto-dismissing snackbars must also be communicated using another accessible method inline or near the action that triggered the snackbar. 

For example, update the label on a "Save" button to “Saved”, and trigger an auto-dismissing snackbar that communicates the same message. 

###### 2. Make the snackbar actionable

Alternatively, add actions to the snackbar so it doesn't dismiss until acted on.

[Image: A button labelled "Save" changes to "Saved" after a moment. A snackbar confirms all changes are saved.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoxyec0-5.png?alt=media&token=ba932f45-20b3-4494-b4e9-0bd9ff22208e)

_Also communicate snackbar information near the action that triggered the snackbar_

#### Anatomy

[Image: 4 elements of a snackbar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoy0ibw-6.png?alt=media&token=e4018d28-38b2-4af5-b7b0-d6f07688ee41)

_1. Container
2. Supporting text
3. Action (optional)
4. Close button (optional)_

##### Text label

Snackbars contain a text label that directly relates to the process being performed. In compact breakpoints, the text label can contain up to two lines of text.

[Image: Snackbar on a mobile device reading: "Saved in Vacation album".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoy1q93-7.png?alt=media&token=cc87fff5-d0bc-4790-a163-98557189a683)

_Text labels are short, clear updates on processes that have been performed_

[Image: Snackbar on mobile with one line of content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoy2p4f-8.png?alt=media&token=afb9be61-cec7-4121-a176-37c0909a64e8)

_Keep the snackbar text label to one line long when possible_

[Image: Snackbar on mobile with two lines of content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoy3zcx-9.png?alt=media&token=8e9c9a97-1872-447b-8a36-36afb1bcef62)

_On mobile, the text label can be up to two lines long_

[Image: Snackbar on mobile with an icon and one line of content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoy4zjx-10.png?alt=media&token=4b2e802b-b450-4558-9e80-15d0ea989e1a)

_Avoid adding icons to snackbars. If your message needs an icon, consider using a different component such as a dialog._

[Image: Snackbar on mobile with bolded and hyperlinked words.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoy6dj7-11.png?alt=media&token=5d757758-41ea-418e-854b-ce251f747327)

_Avoid using stylized text or inline links in snackbars; they can add unwanted complexity. If your message needs a link, add a button instead, or use a different component._

##### Container

Snackbars are displayed in rectangular containers with a grey background. Containers should be completely opaque, so that text labels remain legible.

[Image: Snackbar showing a light text label on a black color container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoy7luk-12.png?alt=media&token=6127148e-439e-4246-80fa-0a72d1ab71f8)

_Snackbar containers use a solid background color with a shadow to stand out against content_

[Image: A snackbar with button text the same color as supporting text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkvoz7q4-13.png?alt=media&token=f27da7c5-9427-436b-9706-d79c1277bdd1)

_The text label shouldn’t share the same color as the text button_

[Image: A snackbar with the action in elevated style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkvoydmj-14.png?alt=media&token=75f28fcf-e04e-4d6b-b9b0-b08daec054d7)

_Don’t use a filled or elevated button in a snackbar, as it draws too much attention_

[Image: An extended snackbar on tablet with a long text label.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoyabsh-13.png?alt=media&token=1ecad806-a4f9-4fcc-bcec-f3909c59e4d6)

_In wide layouts, extend the container width to accommodate longer text labels_

[Image: Snackbar with a slightly transparent container and a clearly visible text label.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoyc9yp-14.png?alt=media&token=30ca81d2-71b7-4ac3-9adb-3be7c41313d4)

_An app can apply slight transparency to the container background, as long as text remains clearly legible_

[Image](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoydoed-15.png?alt=media&token=5695ca2c-49c2-4a86-b11e-b415266f6ad5)

_Avoid significantly altering the shape of a snackbar container_

##### Action

Snackbars can display a single text button that lets users take action on a process performed by the app. Snackbars shouldn’t be the only way to access a core use case, to make an app usable.

[Image: A snackbar container with rounded corners.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoyf085-16.png?alt=media&token=dc457470-6654-493b-b1fa-633c991d9a61)

_To distinguish the action from the text label, text buttons should display colored text_

[Image: Snackbar with a long text button displayed on a third line.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxktjsxn-19.png?alt=media&token=89f6106f-fd53-4132-815f-8b6ed99b52be)

_If an action is long, it can be displayed on a third line_

[Image: Snackbar with a single text button labeled undo.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoz8scg-20.png?alt=media&token=6539a4cf-fb1c-47d4-9e71-59a2b10dca6b)

_To allow users to amend choices, display an "Undo" action_

[Image: Snackbar with a single text button labeled dismiss.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoza8yz-21.png?alt=media&token=131c7a24-1324-4fef-880e-3d62d1156345)

_A dismiss action is unnecessary, as snackbar disappears on their own by default_

#### Placement

##### At the bottom of a UI

Snackbars should be placed at the bottom of a UI, in front of the main content. In some cases, snackbars can be nudged upwards to avoid overlapping with other UI elements near the bottom, such as FABs or docked toolbars.

Avoid placing a snackbar in front of frequently used touch targets or navigation.

[Image: Snackbar appearing in front of photo content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6aa5hcy-22.png?alt=media&token=28ca12e4-37a3-42ef-910a-77f7e93539d8)

_Place a snackbar in front of the main content_

[Image: Snackbar placed in front of the navigation components.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6aa6688-23.png?alt=media&token=f80dfa9d-e09c-4d14-a503-34133ee3754b)

_Avoid placing snackbars in front of navigation components_

To ensure accessibility for keyboard users on the web, avoid positioning the snackbar in a way that completely obscures actionable elements. Blocking elements makes it difficult to know what is being focused and selected.

[Image: Thin snackbar in front of a focused element that is still visible.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkvpb7sp-24.png?alt=media&token=99ae9b7b-a057-469a-88d6-d06755e8ecd7)

_Adjust the size of the snackbar to avoid blocking elements in focus_

[Image: Larger snackbar that is obscuring a focused element.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkvpbire-25.png?alt=media&token=53edc50c-ca3c-4a81-902c-8f5c455c94e8)

_Don’t let the snackbar fully cover elements in focus_

Snackbars can span the entire width of the screen only when a UI does not use persistent navigation components like app bars or navigation bars.

Snackbars that span the entire width of a UI can push up FABs when they appear.

[Image: Snackbar spanning the width of a mobile device is placed in front of the navigation components and FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6aa171j-26.png?alt=media&token=0ca0a009-f201-4574-9c7f-1b37050bc6b5)

_Snackbars can span the entire width of a UI. However, they should not appear in front of navigation or other important UI elements like floating action buttons._

**Snackbars and floating action buttons (FABs)**

Snackbars should appear above FABs.

[Image: Snackbar placed above a FAB on a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6aa25mm-27.png?alt=media&token=b110ee1b-9457-4f9a-a789-13eee60b7ef5)

_Snackbar above a FAB_

[Image: Snackbar placed in front of a FAB on a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6aa35y8-28.png?alt=media&token=7bbf8d02-d6da-4fff-b9c1-9407d260d303)

_Don’t place a snackbar in front of a FAB_

[Image: Snackbar placed behind a FAB on a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6aa41vd-29.png?alt=media&token=196c1cfa-db40-4a5c-88fe-3c1e175670af)

_Don’t place a snackbar behind a FAB_

#### Responsive layout

##### Compact breakpoint

In compact breakpoints, snackbars should expand vertically from 48dp to 64dp to accommodate one or two lines of text, while maintaining a  fixed distance from the leading, trailing, and bottom edges of the screen.

[Image: Snackbar with its label text extending to the second line and maintaining fixed distance from the edges of a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxktk5oy-28.png?alt=media&token=62ea237a-9fb2-4b02-af6a-6a1d860be406)

##### Medium & expanded breakpoints

On medium and expanded breakpoints, like tablet and desktop, snackbars should scale horizontally to accommodate longer text strings, keeping in mind that the ideal line length for text is typically between 40-60 characters.

Snackbars use a flexible distance from the trailing edge of the screen. Whenever possible, snackbars on medium and large displays should aim for a single line of text with an  optional button.

[Image: A horizontally expanded snackbar placed at the bottom of screen on a medium-size device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwoztb40-29.png?alt=media&token=6f2bb46d-080a-4fdf-b1ef-136b1a0e52d0)

In wider layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen.

[Image: A left-aligned snackbar placed at the bottom of screen on a medium-size device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwozw4lz-30.png?alt=media&token=1e5ae92c-43f8-4c9c-ab67-b51993825dd7)

_Left-aligned snackbar_

[Image: A center-aligned snackbar placed at the bottom of screen on a medium-size device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwozx768-31.png?alt=media&token=488159aa-db6a-467d-a7ee-01503dacf742)

_Center-aligned snackbar_

[Image: Snackbar displayed at the left edge of the screen, near the bottom, on a medium-sized device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkvpdu5k-34.png?alt=media&token=39738286-872d-49de-93fb-bb20a4086903)

_Don’t place snackbars flush to one edge of the layout_

[Image: 2 snackbars placed side-by-side at the bottom of the screen on a medium-size device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmkvpefif-35.png?alt=media&token=6b320904-cbe2-4fc0-80e4-ad801de9eefb)

_Don’t place consecutive snackbars side by side or next to one another_

#### Behavior

##### Appearing and disappearing

Snackbars appear without warning, but they don’t block users from interacting with page content.

Snackbars without actions can auto-dismiss after 4–10 seconds, depending on platform. Avoid using auto-dismissing snackbars on web unless there's also inline feedback.

[Video: Snackbar without an action button appearing and disappearing within 4 seconds from the screen of a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp03p7p-GM3-Components-Snackbar-Guidelines-1-v01.mp4?alt=media&token=536dcebe-84fa-47e0-8452-3e268b1ca53d)

Snackbars with actions should remain on the screen until the user takes an action on the snackbar, or dismisses it.

[Video: Snackbars with actions should remain on the screen until the user takes an action on the snackbar, or dismisses it.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm7ca02x7-m6f92ux5-GM3-Components-Snackbar-Behavior-1-v01.mp4?alt=media&token=90969bc8-5ceb-4891-8d29-521f673e0b14)

##### Consecutive snackbars

Consecutive snackbars must appear one at a time. 

Snackbars without actions appear and disappear automatically, while those with actions remain on screen until dismissed. However, a snackbar with updated information can immediately replace an outdated snackbar.

[Video: Two snackbars appear sequentially on a mobile device. The first includes an action button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp06c42-GM3-Components-Snackbar-Guidelines-2-4-v02.mp4?alt=media&token=b9c1add8-52de-43e6-b85f-d3939e38de77)

[Video: 2 snackbars appear sequentially on a mobile device and are stacked on top of one another. The first includes an action button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp08dxf-GM3-Components-Snackbar-Guidelines-3-v01.mp4?alt=media&token=97486710-862f-4282-915f-7e4de7f808be)

_Don’t stack snackbars on top of one another_

[Video: FAB's position is displaced when a snackbar enters the screen of a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp0a03k-GM3-Components-Snackbar-Guidelines-2-3-v01.mp4?alt=media&token=f7e5aecd-5cbf-4a5b-8c04-baf3b30727ec)

_Don’t animate other components along with snackbar animations, such as the floating action button_

## Accessibility

##### Use cases

Users should be able to:

- Be alerted, but not disrupted, when a snackbar appears
- Move focus to an actionable snackbar
- Take action on a snackbar using assistive technology

##### Interaction & style

Snackbars with actions shouldn't auto-dismiss. This way, users can read and interact with it at their own pace.

Snackbars without actions can auto-dismiss after a sufficient amount of time, however this can still present difficulties on web without additional feedback. 

Each platform has its own requirements for auto-dismiss durations, however common acceptable durations are 4–10 seconds.

[Image: A snackbar saying "Email marked as read" with no button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp0j72d-1.png?alt=media&token=fbcb708c-f8d8-4b0a-810f-f68a6bfcc444)

_Auto-dismissing snackbars should remain on screen long enough to read the information_

Snackbars use a color intended to stand out against UI elements. Use the default color mapping to avoid color conflict issues.

[Image: Snackbar with a dark container on a UI page in light theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp0k0la-2.png?alt=media&token=0c86aabd-9c0f-47f6-9dcd-c872748ddfd2)

_Snackbar should visually stand out_

##### Accessibility requirements on web

On web, auto-dismissing snackbars can be difficult to navigate for people with low vision or who require additional time to perceive information. This information can be made clearer for all users in two ways:

###### 1. Add inline feedback

Information in auto-dismissing snackbars must also be communicated inline or near the action that triggered the snackbar.

For example, update the label on a "Save" button to “Saved”, and trigger an auto-dismissing snackbar that communicates the same message.

###### 2. Make the snackbar actionable

Alternatively, add actions to the snackbar so it doesn't dismiss until acted on. Actionable snackbars shouldn't auto-dismiss.

[Image: A "save" button changes to say "saved", alongside a snackbar that confirms changes were saved.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp0kqjx-3.png?alt=media&token=cdc2d281-4288-4a6d-830f-8c72184d2dc8)

_Communicate snackbar information near the action that triggered the snackbar_

**Note: Material Web doesn't yet include the snackbar component. This guidance still applies to custom-made snackbars.**

##### Focus

Snackbars have the following focus requirements:

- When a snackbar appears, announce the message but don't move focus.
- Don't automatically move focus.
- Don't trap focus in the snackbar. Users should be able to freely navigate in and out.
- On web, a shortcut should exist for users to move focus to snackbars with actions (like Alt+G). Ensure that this shortcut is clearly documented, like in a help article.

[Video: Taking a menu item action moves focus to a snackbar. Moving focus out of the snackbar returns it to the same menu item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp0eako-GM3-Components-Snackbar-Accessibility-1-v01.mp4?alt=media&token=c77a347f-6dae-4211-9430-e6508f305e31)

_Focus returns from the snackbar (1) to the previously focused element (2)_

Focus exits the snackbar differently per platform:

- Ideally, focus should either return to the element that triggered the snackbar, or go to the next most logical element on the page. 
- On Android Compose, focus may move to the nearest visible element, or to the first actionable item on the page.

[Video: Confirming in a dialog moves focus to a snackbar. Moving focus out of the snackbar returns it to a page element.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwp0g1ed-GM3-Components-Snackbar-Accessibility-2-v01.mp4?alt=media&token=b8f4684d-424c-486b-8756-c7a148f56f72)

_If the previously focused element is no longer on the page, focus should move from the snackbar (1) to the next most logical element (2)_

##### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Tab | Moves focus between interactive elements |
| Esc | Dismisses the snackbar when in focus |

##### Labeling elements

Snackbars should be announced once they appear on the screen, but shouldn’t grab focus or prevent people from completing their current task. 

- On Android and web, use a live region with a polite (queued) announcement instead of an assertive announcement.
- On iOS 17+, snackbars use polite announcements by default.

If a snackbar appears when the app is launched, it should be announced after the page’s title, but not receive focus.

[Image: Snackbar accessibility label examples.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmff15na8-06.png?alt=media&token=ad79461e-ce22-40ce-aad1-1af62fcca9c7)

_Snackbars are announced when they appear, but don't trap focus_
