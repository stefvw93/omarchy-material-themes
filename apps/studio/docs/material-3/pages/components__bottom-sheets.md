# Bottom sheets

Source: <https://m3.material.io/components/bottom-sheets> (content version 2026-09-23_06-10-05, page updated 2026-07-28T07:45:12.661Z)

## Overview

- 

Use bottom sheets in compact and medium breakpoints
- 

Two variants: standard and modal
- 

Content should be additional or secondary (not the app’s main content)
- 

Bottom sheets can be dismissed in order to interact with the main content

[Image: Side by side view of standard bottom sheet modal bottom sheet](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp3m82k-1.png?alt=media&token=57a51bb9-a0b7-40f2-b057-0afe7d122a59)

_1. Standard bottom sheet
2. Modal bottom sheet_

#### Availability & resources

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color
- Shape: Bottom sheets have a 28dp top corner radius
- Layout: New max-width of 640dp and an optional drag handle with an accessible 48dp hit target

[Image: Diagram of floating sheet set on screen background](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp3mrmz-2.png?alt=media&token=156bba60-2635-4d1e-a928-cd2e4012f499)

## Specs

Modal bottom sheets are above a scrim while standard bottom sheets don't have a scrim. Besides this, both variants of bottom sheets have the same specs.

[Image: Diagram of container, drag handle, scrim](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flvutved1-1.png?alt=media&token=255fee5a-992a-4df3-bae9-ea3fde9c08a7)

_1. Container
2. Drag handle (optional)
3. Scrim_

#### Tokens and specs

Browse the component elements, attributes, tokens, and their values. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.75e530a1014802b3.md]

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Two diagrams featuring color opposites of scrim, container, drag handle](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flvutweax-2.png?alt=media&token=b648cac3-38a8-4ca1-8897-a573240be757)

_Bottom sheet color roles used for both light and dark schemes:

1. 

Scrim*
2. 

On surface variant
3. 

Surface container low

*On Android platforms, the scrim color and opacity is automatically handled by the system UI._

#### Measurements

[Image: Bottom sheet on larger device with 56dp top and 56dp side margins](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flvutx4kk-3.png?alt=media&token=dd4a1d99-3cfc-444a-ae94-1c577604b3dc)

_Bottom sheet padding and size measurements_

Bottom sheets span the full window width up to 640dp. When the window width exceeds 640dp, bottom sheets adjust to have a top margin of 56dp and side margins of 56dp. 

| Attribute | Value |
| --- | --- |
| Drag handle alignment (horizontal) | Center |
| Drag handle padding top/bottom | 22dp |
| Top margin | 72dp |
| Top margin (window width > 640dp) | 56dp |
| Start/end margin (window width > 640dp) | 56dp |
| Width | Full width, up to max-width 640dp |
| Height | Variable |

## Guidelines

[Image: Two variants of bottom sheets.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7eqa7-1.png?alt=media&token=7a1b0b63-7f7a-48b1-9be2-7d0b84457733)

_1. Standard bottom sheets
2. Modal bottom sheets_

#### Usage

Bottom sheets display supplementary content and actions on a mobile screen.

[Image: Photo sharing bottom sheet with contact list, app icons, and action buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7jb72-2.png?alt=media&token=56a1f44f-75e1-4b64-b89a-af51f31743bf)

_Bottom sheet containing contacts and applications_

Bottom sheets are a versatile component that can contain a wide variety of information and layouts, including menu items (in list or grid layouts), actions, and supplemental content.

[Image: Bottom sheet displaying 3 menu options.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7jy07-3.png?alt=media&token=cb9aef4d-3f8f-4d7a-bcae-c81ca2267ec2)

_Bottom sheet with menu items in a list_

#### Anatomy

A container is the only required element of a bottom sheet. Bottom sheet layouts can vary widely to support the kinds of content they contain.

[Image: 3 elements of a bottom sheet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7l25p-4.png?alt=media&token=26b70d10-837b-47dc-8c19-66941c28cf55)

_1. Container
2. Drag handle (optional)
3. Scrim (modal only)_

##### Container

Bottom sheet containers hold all bottom sheet elements. Their size is determined by the space those elements occupy.

The container is the only required element of a bottom sheet. All other elements are optional.

[Image: Empty bottom sheet container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7llpd-5.png?alt=media&token=8dd51782-efbc-480d-b8d1-fc9703331372)

_Bottom sheets are flexible containers that adapt to their content and available space_

##### List items (optional)

Lists are a continuous group of text or images. List items can include label text, icons, and text buttons, among other elements.

[Image: A bottom sheet displaying a list of actions for a song.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7m0a5-6.png?alt=media&token=f5e46b6c-e4a2-4691-8be7-6531cac198f8)

_Bottom sheet containing a list with icons_

##### Dividers (optional)

Dividers can be used to separate related content in bottom sheets.

[Image: Bottom sheet with image action buttons and contact list separated by an inset divider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7t324-7.png?alt=media&token=3415430e-1af4-44bb-9b80-a419efd68993)

_Bottom sheet with a divider separating kinds of actions_

##### Media (optional)

**Thumbnail**
Bottom sheets can include thumbnails for an avatar or logo.

**Image**
Bottom sheets can include photos, illustrations, and other graphics, such as weather icons.

**Video**
Bottom sheets can include video.

[Image: A bottom sheet displaying various media formats, including thumbnails, images, and video.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7tqb3-8.png?alt=media&token=ec559377-ab42-40ae-b622-14e39ed36b06)

_Bottom sheets can contain thumbnails, images, and video_

#### Standard bottom sheets

Standard bottom sheets co-exist with the screen’s main UI region and allow for simultaneously viewing and interacting with both regions, especially when the main UI region is frequently scrolled or panned.

Use a standard bottom sheet to display content that complements the screen’s primary content, such as an audio player in a music app.

[Image: Bottom sheet with music player controls visible while browsing albums.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7ubva-9.png?alt=media&token=bc8efc23-0926-4ab3-8f15-284858ef6d08)

_The music player in this standard bottom sheet allows people to control their music while browsing albums_

At full-screen height, standard bottom sheets contain a collapse icon in an app bar to return to their initial position.

Standard bottom sheets can contain supplementary content that continues below the screen, such as location information over a map.

[Video](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvpbsatl-GM3-Components-BottomSheets-Guidelines-1-v01.mp4?alt=media&token=c677fadb-25d2-4238-b839-35e92e247261)

_A bottom sheet can have preset positions from full-screen height to preview_

#### Modal bottom sheets

Like dialogs, modal bottom sheets appear in front of app content, disabling all other app functionality when they appear, and remaining on screen until confirmed, dismissed, or a required action has been taken.

[Image: A modal sheet with filter options to categorize files in the app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp7yz9g-11.png?alt=media&token=88ce960b-06e9-49fb-85cf-e02a44792b1c)

_A modal bottom sheet must be interacted with or dismissed. Its blocking behavior makes it suitable for a menu, such as in this files app, to help people focus on their available choices._

Use a modal bottom sheet as an alternative to inline menus or simple dialogs on mobile, especially when offering a long list of action items, or when items require longer descriptions and icons.

Modal bottom sheets are used in mobile apps only.

[Image: A modal bottom sheet displayed as an alternative to a traditional menu, presenting a list of actions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvqcnuc5-12.png?alt=media&token=5f8e64bf-e732-4bf6-a53b-bfda05089971)

_Modal bottom sheets can be used instead of menus to present additional actions_

##### Visibility

To provide access to its top actions, the initial vertical position of modal bottom sheets is capped at 50% of the screen height.

Modal bottom sheets whose contents exceed 50% of the screen height can then be pulled across the full screen and scrolled internally to access their remaining items.

[Image: A modal bottom sheet covering half of the screen, so both images and actions are accessible.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flwb1px3f-13.png?alt=media&token=7df61eec-3159-4ac6-a274-d9f1c71bcb0c)

_The initial vertical position of modal bottom sheets can't exceed 50% of the screen height_

Modal bottom sheets appear when triggered by a user action, such as tapping a button or an overflow icon. They can be dismissed by:

- Tapping a menu item or action within the bottom sheet
- Tapping the scrim
- Swiping the sheet down
- Using a close affordance within the bottom sheet’s app bar, if available

Display a close affordance in a full-screen modal bottom sheet.

[Image: A modal bottom sheet disappearing by tapping the scrim.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp80k55-14.png?alt=media&token=9201f643-2086-4620-b7d0-0bc4c1f60ce8)

_Tapping the scrim dismisses a modal bottom sheet_

[Image: A modal bottom sheet disappearing by swiping the sheet down.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp81a31-Bottom_sheet_dismiss_swipe.png?alt=media&token=d0275463-fc3a-459f-b4c0-b0285236638e)

_A modal bottom sheet can be dismissed by swiping the sheet down_

#### Responsive layout

##### Compact breakpoint

In compact breakpoints, like mobile devices, bottom sheets extend across the width of a screen and are elevated above the primary content.

[Image: A bottom sheet extended to the width of a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp86bt1-15.png?alt=media&token=9f8beb94-0e17-4f0d-991f-ba04bb46270d)

_Bottom sheets should extend to the width of the screen on mobile_

##### Medium and expanded breakpoints

For larger screens with medium and expanded breakpoints, bottom sheets have a default max-width to prevent undesired layouts and awkward spacing. However, this can be overridden if needed. For more complex tasks and flows, consider using a non-transient surface such as a floating sheet.

[Image: A bottom sheet extended to its max-width on a large screen device, not spanning the full screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp86pgb-16.png?alt=media&token=52847dda-fc2f-4c38-9d06-6cd94604456b)

_Bottom sheets on larger screens like tablet have a max width that can be overridden_

On larger expanded breakpoints, like desktop, a bottom sheet can be swapped for a side sheet that shows similar content.

[Image: A side sheet on desktop.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp877lp-17.png?alt=media&token=3c16d91e-e6ee-4f55-8677-253ce146a929)

_Side sheets can contain the same content as bottom sheets and may be more suitable for desktop_

#### Behavior

Bottom sheets can offer an expansion option where the sheet is fully raised and toggled between a collapsed and expanded state. This provides a more predictable footprint of the sheet, and can be set by the system or toggled by the user.

[Image: Bottom sheet fully raised, showing photo actions, sharing options, and albums to add the photo to.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp87qvd-18.png?alt=media&token=d9e9bffb-5011-41e2-b919-66246450697f)

_A bottom sheet for sharing can appear fully raised if needed_

[Image: Collapsed bottom sheet, showing focused set of options.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp8870t-19.png?alt=media&token=3f9b36b6-7621-48f9-bec4-8260503c7e75)

_Alternately, a bottom sheet for sharing can appear collapsed for a more focused set of actions_

##### Custom positioning

The drag handle can be dragged or selected to change the bottom sheet height. 

Sheets should be able to cycle through preset heights and close completely without dragging. Selecting the drag handle should toggle through preset heights or close the sheet, while selecting the scrim should always close the bottom sheet.

If the bottom sheet has multiple preset heights but can’t use a drag handle, Material requires the inclusion of a single-pointer alternative to change height.

[Image: Bottom sheet with a visible drag handle that can be used to adjust its height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp8argg-20.png?alt=media&token=231c71e3-b060-4163-907b-540125d26d9d)

_Interacting with the drag handle can quickly move a bottom sheet through preset heights_

[Image: Bottom sheet resized using the visible drag handle.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp8b6u5-21.png?alt=media&token=787093f2-94a4-49fd-92a5-b12b6020c915)

_A bottom sheet can automatically resize to another height after interacting with the drag handle_

##### Scrolling

Bottom sheets can be horizontally scrolled, independent of the rest of the screen’s content.

[Image: Bottom sheet that can be scrolled horizontally.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp8bo42-22.png?alt=media&token=7d24f701-094b-47fe-9a78-5712e0e61cde)

_Bottom sheets should be scrollable when their content exceeds the initial viewable height_

##### Back

On Android, a gesture called predictive back allows a user to swipe left or right on the bottom sheet. 

- Bottom sheet detaches from the left and right edges of the screen to signal it will close
- Previous screen is revealed in a preview

A list of compatible components is available in the gestures article (https://m3.material.io/m3/pages/gestures).

[Video](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvpbtr1r-GM3-Components-BottomSheets-Guidelines-2-v01.mp4?alt=media&token=32073447-f2f2-4cd6-8208-bf3458a7fae6)

_Preview of the result of the gesture, **release** to commit, **fling** to commit, and **cancel**_

## Accessibility

#### Use cases

Users should be able to:

- Resize bottom sheets without having to rely on touch gestures

#### Interaction & style

##### Touch target area

The top 48dp portion of the bottom sheet is interactive when user-initiated resizing is available and the drag handle is present.

[Image: Touch target area of a bottom sheet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp8g5p9-1.png?alt=media&token=8e64004e-3857-4101-b39c-99d3a1202671)

_To ensure touch target accessibility, the top portion of a bottom sheet can be reserved for resize interactions_

##### Initial focus

The optional drag handle can be focused in the tab order and interacted with using non-touch inputs, such as keyboard or switch controls.

[Image: Focus on the drag handle of a bottom sheet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp8gmd5-bottom-sheet-focus.png?alt=media&token=cdb9816d-b6f1-4f2d-a6c9-57c7f19adf6a)

_Visible focus shown on the drag handle affordance_

##### Dragging

Include a single-pointer alternative for any action that can be completed by dragging.

Drag handles should cycle the bottom sheet through available heights when selected. If a drag handle can’t be used, add a button to do this action.

[Image: Bottom sheet with focused drag handle at lower preset height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm33eulyj-20.png?alt=media&token=d5774ee7-5188-4627-bcb9-af10bdf399f7)

_Interacting with the drag handle can quickly move a bottom sheet through preset heights_

[Image: Bottom sheet with drag handle at higher preset height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm33euvu0-21.png?alt=media&token=0d41a86a-77e7-45d2-b8f8-711a008b7c01)

_A bottom sheet can automatically resize to another height after interacting with the drag handle_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Tab | Focus lands on drag handle |
| Space / Enter | Toggles between available heights |

#### Labeling

Label only the drag handle. The accessibility role for the drag handle is “button.”

[Image: Labeled drag handle with role of button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm4bunmcg-2.png?alt=media&token=52a1294c-a753-4e62-a1f3-3379fa80b31f)

_Label the drag handle_
