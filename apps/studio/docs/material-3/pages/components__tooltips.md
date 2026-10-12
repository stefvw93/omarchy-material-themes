# Tooltips

Source: <https://m3.material.io/components/tooltips> (content version 2026-09-23_06-10-05, page updated 2026-07-17T07:03:02.412Z)

## Overview

- 

Use tooltips to add additional context to a button or other UI element
- 

Two variants: plain and rich
- 

Use plain tooltips to describe elements or actions of icon buttons
- 

Use rich tooltips to provide more details, like describing the value of a feature
- 

Rich tooltips can include an optional title, link, and buttons

[Image: 2 variants of tooltips.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6q4295-01.png?alt=media&token=103d96af-908d-4764-9169-910ec6d9ad26)

_1. Plain tooltip
2. Rich tooltip_

#### Availability & resources

#### Differences from M2

- 

**Color**: New color mappings and compatibility with dynamic color
- 

**Shape**: Rich tooltips have more rounded corners

[Image: GM2 rich tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmjh9u4lo-02.png?alt=media&token=e4043ce7-5389-49bc-b42c-40973d0e9fba)

_M2: Rich tooltips have slightly rounded corners_

[Image: GM3 rich tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6q4dmm-03.png?alt=media&token=3e7f1900-0e76-458f-a6dd-e226fe64a633)

_M3: Rich tooltips have more rounded corners and support dynamic color_

## Specs

#### Tokens & specs

Select a component variant below to see its attributes, tokens, and values.

[Token table: see ../tokens/TOKEN_TABLE.37697297db0555a6.md]

#### Plain tooltip

[Image: 2 elements of a plain tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg6beegk-01-3P.png?alt=media&token=bc9cfc37-50ed-4dc0-a792-31616c3b822e)

_1. Supporting text
2. Container_

##### Plain tooltip colors

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 2 color roles of a plain tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg6bfggt-02-3P.png?alt=media&token=77ecaad6-24fd-4b5b-83c6-31d409422518)

_Plain tooltip color roles used for light and dark themes:

1. Inverse on surface
2. Inverse surface_

##### Plain tooltip measurements

[Image: Measurements of a plain tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg6bgjww-03-3P.png?alt=media&token=9c29e9c5-7681-4a6a-b926-d0120e71350a)

_Plain tooltip padding and size measurements_

| Attribute | Value |
| --- | --- |
| Container height | 24dp |
| Padding | 8dp |

#### Rich tooltip

[Image: 4 elements of a rich tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg6bgxay-04-3P.png?alt=media&token=46a4b568-3a02-4814-8411-95ef51193943)

_1. Subhead
2. Container
3. Supporting text
4. Text button_

##### Rich tooltip colors

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 4 color roles of a rich tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg6bi2oc-05-3P.png?alt=media&token=dbe6be0c-aca7-490d-a39f-cca377a2fbd2)

_Rich tooltip color roles used for light and dark themes:

1. On surface variant 
2. Surface container
3. On surface variant 
4. Primary_

##### Rich tooltip measurements

[Image: Measurements of a rich tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg6big7s-06-3P.png?alt=media&token=2a5f5dbd-2798-4a2f-9d93-f1a7f23575fa)

_Rich tooltip padding and size measurements_

| Attribute | Value |
| --- | --- |
| Top padding | 12dp |
| Bottom padding | 8dp |
| Left and right padding | 16dp |

##### Rich tooltip configurations

Rich tooltips can have a headline, body, and up to two buttons. The headline and number of buttons can be configured.

[Image: 5 common configurations of a rich tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg6biuoq-07-3P.png?alt=media&token=0c5bd1c9-b9d9-4ee7-b940-80f5ed6189cc)

_1. Subhead, supporting text, and two buttons
2. Subhead, supporting text, and one button
3. Subhead and supporting text
4. Supporting text and one button
5. Supporting text and two buttons_

## Guidelines

[Image: A plain tooltip labeling a button, and a rich tooltip announcing new settings available.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6qnzgx-01.png?alt=media&token=c4796854-42a4-4c7d-9431-f4328e29d320)

_Plain and rich tooltips serve different purposes_

#### Usage

A tooltip provides additional context for a UI element. 

**Plain tooltips**
Plain tooltips briefly describe a UI element. They're best used for labelling UI elements with no text, like icon-only buttons and fields.

**Rich tooltips**
Rich tooltips provide additional context about a UI element. They can optionally contain a subhead, buttons, and hyperlinks.

Rich tooltips are best used for longer text like definitions or explanations.

[Image: 2 variants of tooltips.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6qs96y-02.png?alt=media&token=793c9573-a7f8-4a87-a6b5-a49f92a22c0b)

_1. Plain tooltip
2. Rich tooltip_

[Image: Plain tooltip labeling an icon-only button in Google Meet as "Present now".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6qu5gx-03-do.png?alt=media&token=54c7e12c-059a-40ad-b68f-e4f3b1946ff6)

_Use plain tooltips to label icon-only buttons_

[Image: Button with an icon and label text saying "Edit". It has a plain tooltip on hover that also says "Edit".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6quvhe-04-dont.png?alt=media&token=466cc2dc-80ff-4403-8acb-f6b0d41e053d)

_Plain tooltips aren't needed when the UI element already has label text_

[Image: Rich tooltip describing a new button for adding people. It has a subhead, description, and a button to learn more.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6qx7on-05-do.png?alt=media&token=50c9d4d6-aadf-417e-a29e-81b9e1d2cc79)

_Use rich tooltips to provide extra information and actions about a UI element or new feature_

[Image: Rich tooltip explaining that an action is destructive and permanently deletes files.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6qywbu-6-dont.png?alt=media&token=c5310581-00d7-418b-bbe9-029a15177797)

_Don't hide critical information within tooltips as it’s easy to miss. Use an interruptive dialog instead._

#### Anatomy

##### Plain tooltip

[Image: 2 elements of a plain tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6r0a08-07.png?alt=media&token=2c7ae948-db69-4d73-afbd-3825d4d0435c)

_1. Container
2. Supporting text_

##### Supporting text

[Image: Plain tooltip for an icon-only button shaped like a gear. The tooltip text is "Settings".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6r2ci0-08-do.png?alt=media&token=2c4dcc41-7aa5-4460-8420-5c5f7ed17184)

_Briefly describe a UI element_

[Image: Plain tooltip for the account switcher. The supporting text includes the user's name and email address on new lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6r3rse-09-caution.png?alt=media&token=b4c31f25-226a-484f-8620-0972b9fa0e17)

_Avoid wrapping text to multiple lines or including many pieces of information_

##### Rich tooltip

[Image: 4 elements of a rich tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmk6kierd-10.png?alt=media&token=f916eb0c-e4c2-4f9c-99ef-038b26064791)

_1. Subhead (optional)
2. Container
3. Supporting text
4. Text button (optional)_

##### Subhead (optional)

Keep subheads brief, ideally to one line. They should summarize or describe the message of the rich tooltip.

Subheads are important to include when the rich tooltip appears automatically, like when the page loads.

[Image: Rich tooltip with a brief subhead, supporting text, and a text button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6r9edz-11-do.png?alt=media&token=c560ef69-f81e-4510-ba45-8426d28f9236)

_Summarize the message in a few words_

[Image: Rich tooltip with a subhead wrapping to multiple lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6ra39j-12-dont.png?alt=media&token=6ff1b6f2-1f88-4a08-8628-1f11e09ecf10)

_Avoid wrapping to more than one line_

##### Text buttons (optional)

Rich tooltips can have up to two text buttons. These should be brief and relevant to the message in the supporting text.

Keep buttons short so they can be side by side. Avoid stacking them when possible.

[Image: Rich tooltip with 2 buttons stacked on each other.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6rdax0-13-Caution.png?alt=media&token=5ac76c53-02d0-4be4-aaf5-3387d8cf6672)

_Avoid stacking buttons_

#### Placement

##### Plain tooltips

By default, plain tooltips are positioned directly above the parent element. 

- If there's a visual boundary, like a button, the distance is 4dp
- If there's no visual boundary, like with text baselines, the distance is 8dp

If the element is in an app bar, the plain tooltip appears below the element at the same distance.

[Image: Plain tooltip appearing 4dp below a button with a clear visual boundary.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6rg1hz-14.png?alt=media&token=c2d92bab-3dc6-4be2-9bac-836c1d2ada4b)

_Plain tooltip with a 4dp distance between the target and tooltip_

##### Rich tooltips

By default, rich tooltips are positioned to the bottom right of the parent element. They adjust position to avoid going off screen.  Tooltips shouldn't cover the parent element. 

**Dynamic positioning**
The position of the tooltip adjusts in increments of 8dp to avoid going off-screen.

**Desktop placement**
On desktop, tooltips may appear centered below the parent element and remain visible while moving within the target region.

[Image: A rich tooltip in 4 different corners. It changes position to remain fully on screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6riq0z-15.png?alt=media&token=0b5c26d7-7287-4e8e-a53b-26450413f75a)

_Four different rich tooltip locations based on dynamic positioning_

#### Behavior

To show a tooltip, hover on the parent element on desktop, or tap and hold the element on mobile. Persistent rich tooltips only appear when clicked or tapped.

##### Transient by default

Both plain and rich tooltips disappear 1.5 seconds after navigating away from the target region.

Triggering a new tooltip immediately closes any other open tooltip.

[Video: Hovering and moving from a button with a plain tooltip.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj9io0m-GM3-Components-ToolTips-Guidelines-1-v01.mp4?alt=media&token=72f5b4fc-4410-4e4b-84f2-2f601e6e4113)

_Tooltips disappear after a 1.5 second delay when no other element is hovered_

[Image: 2 buttons both showing plain tooltips at once.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6ro0ii-17-dont.png?alt=media&token=41b0681c-f04b-4767-b998-67f6b140a4ce)

_Only display one tooltip at a time_

##### Persistent rich tooltips

Persistent rich tooltips appear when either:

- The parent element is clicked
- The page loads and a new feature is being explained

Persistent rich tooltips remain active even when leaving the target region. They only disappear once a person interacts with another UI element. Hovering doesn't trigger the tooltip.

When appearing on page load, the tooltip can introduce and explain new features on various parent elements.

Avoid using persistent rich tooltips on icon buttons.

[Image: Persistent rich tooltip about a new sharing feature in the Photos app. The button says "Learn more.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6rq50p-18-dont.png?alt=media&token=bd1b821d-c434-4c6d-8591-2e6ce417a95d)

_Don’t use a persistent rich tooltip on icon buttons_

## Accessibility

#### Use cases

People should be able to do the following using assistive technology:

- Receive a tooltip message
- Activate a tooltip with a keyboard or switch input

#### Interaction & style

Plain and rich tooltips without required actions should remain on screen long enough for people to receive the information without disrupting their existing flow or task.

[Video: A cursor hovers over an icon that identifies it as a star, which remains after moving away.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm1i00uln-lwj9io0m-GM3-Components-ToolTips-Guidelines-1-v01.mp4?alt=media&token=fa4d2602-417f-40f2-b3b1-9979db691f9e)

_Plain tooltips should remain on the screen temporarily after the cursor moves away_

Tooltips can appear when an actionable element, like a button or navigation rail, is hovered or focused. However, this tooltip shouldn’t hide crucial information.

Rich tooltips can also appear by selecting an element instead of hovering or focusing on it.

[Image: A cursor hovers over a favorite button producing text about finding this item later in favorites.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6ru5uh-02.png?alt=media&token=1a4085d9-9e8f-42d5-9aab-470093ca7dbf)

_Tooltips can appear on hover or focus to explain actions_

[Image: An information button in a selected state produces text about finding this item later in favorites.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6ruf33-03.png?alt=media&token=98c44750-5967-4b0e-8e26-933fd0cdcdbe)

_Rich tooltips can appear when an element is selected_

#### Focus order

Tooltip containers should not block important information or prevent a person from completing an action. 

Focus order within the rich tooltip moves top to bottom between interactive elements. 

Avoid trapping screen reader and keyboard focus on rich tooltips.

People should be able to move linearly through the rest of the page.

[Image: Different elements of a rich tooltip are given a focus order, moving from parent element to inline link to text button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmjha0vdq-04.png?alt=media&token=4f27369d-0b43-49ff-8a0e-3b074298eefc)

_1. Parent element
2. Inline link
3. Text button_

#### Keyboard navigation

| **Keys** | **Actions** |
| --- | --- |
| **Tab** | Focus lands on button, if available |
| **Space** or **Enter** | Activates the focused element |

#### Labeling elements

Tooltips should have the **Tooltip** role, or similar. 

Label all elements in the tooltip according to their own accessibility guidance.

[Image: A rich and plain tooltip with all elements matched to accessibility labels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme6ry9ry-05.png?alt=media&token=8d4b4d42-2cb4-4496-ac89-02fed5e0e0fb)

_The tooltip container should have the **Tooltip** role_
