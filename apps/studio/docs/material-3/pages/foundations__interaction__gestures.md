# Gestures

Source: <https://m3.material.io/foundations/interaction/gestures> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:06:24.826Z)

> Gestures are all the ways people interact with UI elements using touch

## Tab 1

- 

Gestures help people navigate, take action, or transform content
- 

UI elements should respond to gestures in real time
- 

Tap, scroll, and swipe are common gestures

#### Resources

| Type | Link | Status |
| --- | --- | --- |
| Design | Design Kit (Figma) (http://goo.gle/m3-design-kit) | Available |

#### Types of gestures

##### Tap

People can navigate to destinations and interact with elements through touch.

[Video: Mobile UI shows a tap on the 1st of 3 news cards. The card opens to show the full article.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1faal8-1P-Tap%202_NewSize.mp4?alt=media&token=1e06a816-015e-4f61-a574-fbdb11bbd0de)

_Tapping a card opens an article_

##### Double tap

Two quick taps allows people to zoom in and out of content.

[Video: Mobile UI shows a double tap on a floral photo. The image expands to fill the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1fboct-1P%20-%20Double%20tap_NewSize.mp4?alt=media&token=a137fb64-5c39-4881-8052-805a529b402f)

_Double tapping on a photo opens it to full screen_

##### Long press

People can access additional functionality by pressing on elements for an extended time.

[Video: A long press on an email reveals a selection checkmark and a container color change.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1fdbcl-1P-Long%20press_NewSize.mp4?alt=media&token=c8624dcf-0020-412f-a18a-42d4cc975c23)

_Long pressing a list item selects it_

##### Scroll and pan

People can slide surfaces vertically, horizontally, or in any direction to move through content.

[Video: Scrolling a feed.Scrolling up and down in a photo feed.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1fely6-1P%20-%20Scroll_NewSize.mp4?alt=media&token=84fade67-e1d5-4688-8bc0-b18a4dd72e32)

_Vertical scrolling reveals more content_

##### Swipe

People can navigate horizontally to:

- 

Switch between peer views like tabs
- 

Complete actions

[Video: A swipe right on an email reveals a favorites icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1ffjk8-1P%20-%20Swipe_NewSize.mp4?alt=media&token=57af395a-c306-40c7-84c9-930559f89d09)

_Swiping a list item can reveal additional actions_

##### Predictive back

On Android, a person can swipe left or right on certain components as a way to navigate to a previous destination. This gesture is called predictive back (https://github.com/material-components/material-components-android/blob/master/docs/foundations/PredictiveBack.md).

Before completing the swipe, the person can decide to continue to the previous view or stay in the current view.

Compatible components are:

- 

Bottom sheet

- 

Navigation bar

- 

Navigation rail

- 

Search bar

- 

Side sheet

[Video: Back swipe on a bottom sheet takes s person back to the previous screen of a photo feed.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1fhayy-BottomSheet_NewSize.mp4?alt=media&token=6a829f0d-482f-4254-8af0-2ea53a3efe67)

_A predictive back swipe on a bottom sheet goes back to the previous screen_

##### Drag

People can move elements around and slide surfaces in and out of view.

[Video: A person drags the second email in a mobile inbox to the third position and back to the second position.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1fj7qz-1P-Drag%202_NewSize.mp4?alt=media&token=5e2f57a3-2536-4c54-8bb0-00fec5235ef3)

_A list can be reordered by dragging a list item_

##### Pick up and move

A long press and drag allows people to reorder content.

[Video: Picking up and moving a calendar event to a new time.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1fk8sj-1P-Pick%20up%20and%20move_NewSize.mp4?alt=media&token=3062d6bc-f62a-4e25-a0e4-d7a91f042186)

_A calendar event can be picked up and moved to a new time_

##### Pinch

People can scale surfaces to navigate between screens.

[Video: Dragging two points apart opens photo to full screen, dragging them towards each other collapses the photo.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1fl32l-1P%20-%20Pinch%202_NewSize.mp4?alt=media&token=1c362a8f-ef9a-49c6-84fe-1e6bdc55b204)

_A photo can be pinched outward to a full screen view_

##### Compound gestures

Users can fluidly transition between various gestures, like panning and pinching in a map view.

[Video: Pan gesture moves map, then pinch gesture is used to zoom out then in.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1fm10s-1P%20-%20Compound_NewSize.mp4?alt=media&token=4462b3d6-eac5-4695-80a6-0bcce045261b)

_A map UI can be navigated through a combination of pan and pinch_
