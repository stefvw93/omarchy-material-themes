# Dialogs

Source: <https://m3.material.io/components/dialogs> (content version 2026-09-23_06-10-05, page updated 2026-07-28T07:11:33.307Z)

## Overview

- 

Use dialogs to make sure users act on information
- 

Two variants: basic and full-screen
- 

Should be dedicated to completing a single task
- 

Can also display information relevant to the task
- 

Commonly used to confirm high-risk actions like deleting progress

[Image: Basic and full-screen dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fml9yk7iw-01.png?alt=media&token=50a39047-4d06-477e-a9d8-84dd6a5afae9)

_1. Basic dialog
2. Full-screen dialog_

#### Availability & resources

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color
- Layout: Greater padding to account for the increased corner-radius and title size
- Position: Option for custom basic dialog positioning
- Shape: Increased corner-radius
- Typography: Larger and darker headline

[Image: Basic dialog with rounded corner, larger headline.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fml9ykeuk-02.png?alt=media&token=02244cb3-7889-4321-9a65-aa3040bbadc1)

_New updates to color, layout, position, shape, and typography_

## Specs

#### Tokens & specs

Select a component variant below to see its elements, attributes, tokens, and their values.

[Token table: see ../tokens/TOKEN_TABLE.0b1e39a67d5bafdc.md]

#### Basic dialogs

[Image: Anatomy diagram numbering dialog elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmk29t71i-01-3P.png?alt=media&token=107d201b-e3d7-4dcc-aa58-71f053c9364c)

_1. Container
2. Icon (optional) 
3. Headline (optional)
4. Supporting text 
5. Divider (optional) 
6. Button label text
7. Scrim_

##### Basic dialog color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Color mapping diagram labeling 6 color roles across the dialog and scrim.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fml9yledn-02-3P.png?alt=media&token=d1f0e8c8-54da-41e3-81a8-ad46dcb5d3b7)

_Basic dialog color roles used for light and dark themes:

1. Surface container high 
2. Secondary 
3. On surface 
4. On surface variant
5. Primary 
6. Scrim_

##### Basic dialog measurements

[Image: Annotated diagram showing padding values.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fml9ynrkv-03-3P.png?alt=media&token=8e554b7e-0509-4f02-8563-7453e0bb40e9)

_Basic dialog padding and size measurements_

| Attribute | Value |
| --- | --- |
| Container shape | 28dp corner radius |
| Container height | Dynamic |
| Container width | Min 280dp; Max 560dp |
| Divider height | 1dp |
| Icon size | 24dp |
| Minimum width | 280dp |
| Maximum width | 560dp |
| Alignment with icon | Center-aligned |
| Alignment without icon | Start-aligned |
| Top/Left/right/bottom padding | 24dp |
| Padding between buttons | 8dp |
| Padding between title and body | 16dp |
| Padding between icon and title | 16dp |
| Padding between body and actions | 24dp |

#### Full-screen dialogs

[Image: Diagram numbering 6 full-screen dialog elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm9h7yor0-04-3P.png?alt=media&token=26b84960-cb4d-4ddc-b996-2fdc771c1432)

_1. Container 
2. Header 
3. Icon (close affordance) 
4. Headline (optional) 
5. Text button 
6. Divider (optional)_

##### Full-screen dialog color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value.

[Image: Color mapping diagram shows 5 callout markers across the dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm9h7z23b-05-3P.png?alt=media&token=0db0c4c5-bdf2-4697-964e-4d38cf508d2b)

_Full-screen dialog color roles used for light and dark themes:

1. Surface container high 
2. On surface
3. On surface
4. Primary
5. On surface variant_

##### Full-screen dialog measurements

[Image: Diagram noting layout measurements for padding values, title, height, and action regions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmafq2x4i-06-3P.png?alt=media&token=4cc6deb6-b269-43d4-b21a-7234ae0d2d49)

_Full-screen dialog padding and size measurements_

| Attribute | Value |
| --- | --- |
| Container shape | 0dp corner radius |
| Container height | Dynamic |
| Container width | Container width; Max 560dp |
| Header height | 56dp |
| Header width | Container width |
| Headline text alignment | Start-aligned |
| Divider height | 1dp |
| Icon (close affordance) size | 24dp |
| Bottom action bar height | 56dp |
| Bottom action bar width | Container width |
| Top/left/right padding | 24dp |
| Padding between elements | 8dp |

## Guidelines

[Image: Basic dialog in isolation](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sf9qay-01.png?alt=media&token=5e8c7d9f-1451-4104-b5a4-c64b2e98296f)

_A basic dialog_

#### Usage

A dialog is a modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.

Dialogs are purposefully interruptive, so they should be used sparingly. A less disruptive alternative is to use a dropdown menu, which provides options without interrupting a user’s experience.

[Image: Diagram of basic and full-screen dialogs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfc7pz-02.png?alt=media&token=48e473e3-7381-4089-8e91-11de31b32586)

_There are two variants of dialogs:

1. 

Basic dialog
2. 

Full-screen dialog_

[Image: Dialog in front of app content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfcqhr-03_do.png?alt=media&token=3655fc78-54b9-44f6-a239-d93670bb087e)

_Use dialogs for prompts that block an app’s normal operation, and for critical information that requires a specific user task, decision, or acknowledgement_

[Image: Low-priority dialog in front of app content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfdc9w-03_dont.png?alt=media&token=6a548db0-3131-46af-9f44-d30b74de4904)

_Don’t use dialogs for low- or medium-priority information. Instead use a snackbar, which can be dismissed or disappear automatically._

##### Similar components

Snackbars are also designed to show important messages.

Choose the right component based on the importance of the message. This component messaging strategy helps avoid overusing dialogs.

[Image: Snackbar on a phone saying that new photos were synced to the device. No buttons exist.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmk29xmfo-05-3P.png?alt=media&token=89e12852-9fec-44ab-82ca-d281460b0ba7)

_Snackbars can disappear automatically_

| **Component** | **Importance** | **Action needed** |
| --- | --- | --- |
| Snackbar | Low importance | Optional: Snackbars may not have a button, and can disappear automatically |
| Dialog | High importance | Required: Dialogs block the main content until an action is confirmed |

#### Anatomy

##### Basic dialog

[Image: Diagram of 7 elements of basic dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfhos4-07.png?alt=media&token=c26b3dc0-c5bd-4fe6-8081-13019a21814c)

_1. Container
2. Icon (optional)
3. Headline (optional)
4. Supporting text
5. Divider (optional)
6. Buttons label text
7. Scrim_

##### Full-screen dialog

[Image: 6 elements of full-screen dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfick9-08.png?alt=media&token=7287dba3-0638-4a9f-afde-dcc94ce608e2)

_1. Container
2. Header region
3. Icon (close affordance)
4. Headline (optional)
5. Button label text
6. Divider (optional)_

##### Container and scrim

Dialog containers appear above other screen elements and hold the dialog’s headline, text, buttons, and list items.

To focus attention on the dialog, surfaces behind the container are scrimmed with a temporary overlay to make them less prominent.

[Image: Basic dialog shown above a scrim overlay that reduces the prominence of the background elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfkf69-09.png?alt=media&token=76b7d3c2-c1db-4dc4-aabb-8df0851f4dd7)

_Basic dialogs appear over a background scrim_

##### Headline (optional)

A dialog’s purpose should be communicated by its headline and buttons or actionable items.

Headlines should:

- Contain a brief, clear statement or question
- Avoid apologies (“Sorry for the interruption”), alarm (“Warning!”), or ambiguity (“Are you sure?”)

[Image: Dialog title asking “Use location service?”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfl8j1-10_do.png?alt=media&token=6685809e-faa9-4002-a1ca-7b6355cc0c4a)

_This dialog title poses a specific question, concisely explains what’s involved in the request, and provides clear actions_

[Image: Dialog title asking “Are you sure?”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sflmm0-11_don't.png?alt=media&token=2b32fc1c-10ea-4041-8719-5a0bbd515d5e)

_Don’t use dialog titles that pose an ambiguous question_

Headlines should always be succinct. They can wrap to a second line if necessary, and be truncated.

In full-screen dialogs, long headlines or headlines of variable lengths (such as translations), can be placed in the content area instead of the app bar.

[Image: Example full-screen dialog with truncated long headline.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfm2yt-12_Caution.png?alt=media&token=bb20aab8-9a35-4eaf-9f8c-f2fc29f20a6c)

_Avoid placing long headlines in a full-screen dialog’s app bar (1), as the truncated text may lead to misunderstanding_

[Image: Example full-screen dialog with short headline, and longer text in content area.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfmezr-13_do.png?alt=media&token=5244a6e2-9faa-44ec-998d-12d486666021)

_Find ways to shorten app bar text, and place longer headlines into the content area (1) of a full-screen dialog_

##### Buttons 

Dialog actions are most often represented as buttons and allow users to confirm, dismiss, or acknowledge something.

Buttons are aligned to the trailing edge of the dialog for easier interaction. The confirmation button is always closest to the edge. 

Button alignment responds automatically for right-to-left languages, where the confirmation button is aligned to the left edge.

[Image: Dialog with the confirmation button disabled because a required radio selection is missing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfmqqd-14_do.png?alt=media&token=12972233-4c46-4c82-9b80-86136ae125ca)

_Disable confirming actions (1) until a choice is made. Dismissive actions are never disabled._

[Image: Dialog with the dismissing action "Cancel" on the right of the 2 buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfn276-15_don't.png?alt=media&token=51d3809f-8761-4ad0-91d1-d3b4b9bc21dc)

_Don’t place dismissive actions (1) to the right of confirming actions. Instead, place them to the left of confirming actions._

[Image: Dialog with a single-action button: “OK”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfq9tm-16_do.png?alt=media&token=1ac568e8-5f77-443d-9a0f-ee24e2d5ae71)

_A single action may be provided only if it’s an acknowledgement_

[Image: Dialog with 2 button choices: “Cancel”, “Got it”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfqm2i-17_don't.png?alt=media&token=834d6d37-9c33-4d38-a72a-ba3fc1c84783)

_Avoid presenting people with unclear choices. **Cancel** doesn't make sense here because no clear action is proposed._

Dialogs should contain a maximum of two actions.

- If a single action is provided, it must be an acknowledgement action
- If two actions are provided, one must be a confirming action, and the other a dismissing action

[Image: Dialog with 2 buttons side-by-side: “Disagree”, “Agree”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfqzp1-18_do.png?alt=media&token=0c0f6350-ea79-41f6-a82b-8adcb6ef4f5d)

_Display two text buttons next to one another_

[Image: Dialog with 2 stacked buttons: “Turn on speed boost”, “No thanks”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfre4i-19_caution.png?alt=media&token=e19e944e-1e50-437b-81e7-643e4dd9dd6b)

_Stacked buttons accommodate longer button text, but take up more room. Confirming actions appear above dismissive actions._

Providing a third action, such as **Learn more**, is not recommended as it navigates the user away from the dialog, leaving the dialog task unfinished.

Rather than adding a third action, an inline expansion can display more information. If more extensive information is needed, provide it prior to entering the dialog.

[Image: Dialog with 3 text buttons: Learn more, Disagree, Agree.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfrskh-20.png?alt=media&token=ce701d0c-c122-4fda-9244-be331795f9a5)

_The **Learn more** action (1) navigates away from this dialog, potentially leaving it in an indeterminate state_

#### Basic dialog

Basic dialogs interrupt users with urgent information, details, or actions. Common use cases for basic dialogs include alerts, quick selection, and confirmation.

[Image: Example of basic dialog action request.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfumns-21.png?alt=media&token=f60188e3-24f3-4ede-a5c2-ae41ebbda58f)

_Basic dialogs require a person to take action before it will close_

[Image: Example of basic dialog confirmation.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfuxlx-22.png?alt=media&token=356b591f-4aa3-4889-95f5-2c579e0c699f)

_Basic dialogs can give people the ability to provide confirmation of a choice before committing to it_

Basic dialogs most often appear as alerts or lists, but can have a variety of layouts and component combinations, including lists, date pickers, and time pickers.

[Image: Date picker dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfzk1g-23.png?alt=media&token=5d0f7fb7-2646-4c2d-9450-71e463c72f7f)

_Date picker dialogs allow people to tap a date, then confirm it by tapping **OK**_

[Image: Time picker dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sfxxnd-24.png?alt=media&token=3b205d81-1479-4bf5-aa8c-c803aa41e7de)

_Time picker dialogs allow people to move the clock hand and then confirm by tapping **OK**_

#### Full-screen dialog

Full-screen dialogs fill the entire screen, containing actions that require a series of tasks to complete. One example is creating a calendar entry with the event title, date, location, and time.

Because they take up the entire screen, full-screen dialogs are the only dialogs over which other dialogs can appear.

Use a container transform (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#b67cba74-6240-4663-a423-d537b6d21187) pattern to transition a FAB into a full-screen dialog.

[Video: A FAB transitioning into a full-screen dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmbh08c2v-GM3_Dialogs_Guidelines_25_IA_v02.mp4?alt=media&token=4d9bc267-de3b-41ba-a59a-b96aa5200dc8)

_Full-screen dialogs contain actions that require a series of tasks to complete_

When a full-screen dialog is closed without being saved, a basic dialog appears in front of it to confirm selections should be discarded without saving changes.

[Video: Closing a full-screen dialog triggers a basic dialog asking to discard the changes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmbh098mh-GM3_Dialogs_Guidelines_26_IA_v01.mp4?alt=media&token=77730ed0-06cc-49a3-a5cd-1c2c8cf1606a)

_A basic modal dialog appears when a full-screen dialog is closed without being saved_

Full-screen dialogs may be used for content or tasks that meet any of these criteria:

- 

Dialogs that include components which require keyboard input, such as form fields
- 

When changes aren’t saved instantly
- 

When components within the dialog open additional dialogs

Full-screen dialogs are for compact breakpoints only, like mobile devices. For medium and expanded breakpoints, use a basic dialog.

##### Saving selections

To save a selection in a full-screen dialog, use **Save**.  The close icon or dismissive action, such as **Cancel** or **Back**, should close the dialog.

##### Confirmation

The confirmation action should be clear about what happens next, like **Send** or **Create**. Avoid using vague terms like **Done**, **OK**, or **Close**. Only trigger an additional basic dialog if the action fails. Don’t disable the confirmation button.

[Image: Full-screen dialog with create button as confirmation action.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sg5wkr-27_do.png?alt=media&token=8aa1b2c7-d3e9-4c8d-a171-dd8f5920102a)

_A **Create** button is clear that the event will be created_

[Image: Full-screen dialog with an additional basic dialog asking if you want to create this event.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sg67kv-28_don't.png?alt=media&token=a6a5c838-d758-4465-b05e-f29ac5eb0d3f)

_Don’t trigger a basic dialog when the confirming action is selected_

##### Dismissing

When someone dismisses a full-screen dialog, a basic dialog should appear to confirm that they want to discard the unsaved changes.

[Image: A basic dialog with options to either keep editing or discard unsaved changes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sg91cq-29_do.png?alt=media&token=1829089e-6440-4fcf-8d7b-5b4dd688ad92)

_Use a basic dialog to confirm that the user wants to discard unsaved changes_

[Image: A full-screen dialog with a Close button as the confirming action.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sg9bz5-30_don't.png?alt=media&token=0d99e0df-e3f2-4c02-9a9c-598c311f8e7c)

_Don’t use the confirming action to dismiss the full-screen dialog_

##### Error messages

Errors about the dialog fields should always appear inline where they occur. Some components like text fields have built-in error messaging, while others like checkboxes and radio buttons need error messages to be added next to the fields.

General errors such as network issues preventing saving or submitting should appear in a basic dialog when the confirming action fails.

Error messages should clearly but briefly explain the source of the error and how to fix it. Show all errors on the page at once so people can fix everything before trying again.

[Image: A full-screen dialog with inline error messages for text fields.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sg9nzm-31_do.png?alt=media&token=80b7cdd4-6892-4661-a674-6e85c62b9122)

_Error messages related to the fields should be displayed inline_

[Image: A basic dialog mentioning that entries were not saved due to a connection issue.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sg9xoh-32_caution.png?alt=media&token=5d180627-2303-4b00-92e5-39d90741c8fd)

_Errors unrelated to the fields can be displayed in a basic dialog_

##### Dialog windows

Launching a full-screen dialog temporarily resets the app’s perceived elevation, allowing simple menus or dialogs to appear above the full-screen dialog. They cover the screen and don’t appear as a floating modal window.

##### Navigation

Because full-screen dialogs can only be completed, dismissed, or closed, the close “X” icon button should be the only navigation option in the app bar.

#### Adaptive design

Dialogs can swap variants as the breakpoint changes. For example, a full-screen dialog can change into a basic dialog at larger breakpoints.

[Image: Example of full-screen dialog on left, simple dialog on right](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sgbmj3-33.png?alt=media&token=17fd8879-6435-409a-a3a9-8bd390799892)

_1. Full-screen dialog on mobile
2. Dialog on a tablet_

##### Medium breakpoint

Basic dialogs appear in a center position by default.

Their position can be overridden to provide a more ergonomic experience.

[Image: Basic dialog on tablet photos app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sgc676-34.png?alt=media&token=9bc72c88-69cf-49e2-a631-070890d60754)

_Dialog custom positioned on the right side of the screen_

##### Expanded breakpoint

Dialogs on expanded breakpoints, like desktop, are modal windows above a scrim. This puts the dialog at the forefront of a person's view, calling attention to the action prompted in the dialog.

[Image: Example of desktop dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sgj2r1-35.png?alt=media&token=a9f16af1-69fe-43cc-9806-883818a87845)

_Desktop dialogs call attention to the required action_

Basic dialogs can be custom-positioned anywhere on larger screens, respecting margins to prevent edge collision.

[Image: Basic dialog position diagram.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sgjir4-36.png?alt=media&token=e2dd2b5a-1e2e-4051-a0da-4ec15079f2ce)

_Custom placement area for basic dialogs that respects a 56dp margin from the edges of the screen_

#### Behavior

##### Appearing

Dialogs appear without warning, requiring users to stop their current task. They should be used sparingly, as not every choice or setting warrants interruption.

Dialogs use an enter and exit (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#e1c2a650-d7a4-4a6d-9025-e6b7845291ed) transition pattern to appear on screen.

[Video: Dialog entering and exiting screen using fade transition.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmbh0yk3u-GM3_Dialogs_Guidelines_37_IA_v01.mp4?alt=media&token=2b4cff4a-041a-4ade-9ef3-5ba676b77f4d)

_A dialog appears with an enter and exit transition_

##### Position

Dialogs retain focus until dismissed or an action has been taken, such as choosing a setting. They shouldn’t be obscured by other elements or appear partially on screen, with the exception of full-screen dialogs.

[Image: A basic dialog covering a full-screen dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sgqe15-38.png?alt=media&token=9a9c7716-0f17-4ee5-a3c9-a6fb5114547a)

_Dialogs shouldn’t be obscured by other elements except for full-screen dialogs_

##### Scrolling

Most dialog content should avoid scrolling. Even when scrolling is required, the dialog title is pinned at the top, with buttons pinned at the bottom. This ensures selected content remains visible alongside the title and buttons, even upon scroll.

Dialogs don’t scroll with elements outside of the dialog, such as the background.

[Video: Example of fixed dialog title and buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmbh0z34p-GM3_Dialogs_Guidelines_39_IA_v01.mp4?alt=media&token=5c6d756b-f497-46fa-9ccb-973051ae5d8b)

_When viewing a scrollable list of options, the dialog title and buttons remain fixed_

## Accessibility

#### Use cases

People should be able to use assistive technology to:

- Open and close a dialog
- Provide and submit other inputs if the dialog is interactive, such as a text field or selectable list
- Scroll the dialog to access all of its contents if that content extends beyond the container of the dialog

#### Interaction & style

##### Use sparingly

Dialogs are purposefully interruptive. This means they appear in front of app content and disrupt the flow of content for people who may, for example, be using a screen reader to navigate the page.

As such, dialogs should be used sparingly and only to provide critical information. Less critical information should be presented in a non-blocking way within the flow of app content.

[Image: An inline tooltip doesn’t block a photo app’s content on a mobile screen. A modal dialog blocks the content of a photo app on a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sgve0z-01_do.png?alt=media&token=15a731c6-5d4e-4b65-afb3-23b6275d0935)

_Present non-critical information using other UI within the flow of app content_

[Image: A modal dialog blocks the content of a photo app on a mobile screen. A modal dialog blocks the content of a photo app on a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sgvt7t-02_don't.png?alt=media&token=f88b6702-ef51-4b3b-97fc-c338539dc884)

_Avoid putting non-critical information in a dialog_

##### 200% text size

Avoid excessive text wrapping or truncation by choosing concise strings. 

On Android, headlines should be kept concise enough to fit within **four** lines after the text size is increased to 200%. If a headline exceeds this limit and gets truncated, provide an alternative way to access the full content in a single tap.

[Image: A dialog with 200% text wraps multiple times in the header and description. It covers most of the mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8sh8mb2-03_caution.png?alt=media&token=f2a9bb8e-dfb7-46a9-a33f-20f895f8a834)

_Avoid excessive text wrapping or truncation by choosing concise strings_

##### Elements within dialogs

Because dialogs can contain various elements within them, refer to the relevant accessibility guidelines for each element. 

Some common examples include:

1. Text fields
2. Typography
3. Buttons

[Image: 3 elements of a full-screen dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8x3m4cu-04.png?alt=media&token=4e645417-fc9a-48de-a66f-a3b5c5d16723)

_Full-screen dialogs can contain various elements such as (1) text fields, (2) typography, and (3) buttons, which each may have their own accessibility guidelines_

#### Initial focus

When a dialog appears, focus should automatically land on the first interactive element within the dialog.

[Image: A modal dialog titled “Permanently delete?” whose second interactive element is focused by selecting the Tab key.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8wqpp2r-05.png?alt=media&token=d5214cf8-9fa2-458f-9e17-5db4e07235ba)

_Initial focus lands on the first interactive element within a dialog. The tab key moves focus through the next interactive elements in a cycle._

[Image: A modal dialog titled “Permanently delete?” whose previous interactive element is focused on by selecting both the Shift and Tab keys.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8wqq56l-06.png?alt=media&token=2eae0221-4a71-4ca5-b873-6d3bf94cbd23)

_The shift and tab keys together move focus in the opposite direction. The space or enter key triggers or commits the action of the focused element._

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Tab | Focus lands on the next interactive element contained in the dialog, or the first element if focus is currently on the last element |
| Shift + Tab | Focus lands on the previous interactive element contained in the dialog, or the last element if focus is currently on the first element |
| Space or Enter | Triggers or commits the action of the focused element |
| Escape | Closes the dialog |

#### Labeling elements

The accessibility label for a dialog is typically the same as the dialog’s title or headline.

On web, basic dialogs should have the **alert dialog** role.

[Image: An alert dialog with a title “Set up traffic updates?” Its label is “Set up traffic updates?” and its role as “Alert Dialog.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmk2a1j0z-07.png?alt=media&token=f67fa051-a23b-4607-a062-bcd540ddcaef)

_Basic dialogs are known as alert dialogs on web_

Components contained within the dialog, such as buttons, should be labeled according to the guidelines specific to those components.

For common examples, see:

- Buttons
- Text fields

[Image: A full-screen dialog titled “New event” containing a “Save” button and a text field, both with their own accessibility labels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmk2a20m5-08.png?alt=media&token=0478cb5e-0c5f-4154-9888-0ba7de7a3247)

_Elements within a dialog should be labeled according to their guidelines_
