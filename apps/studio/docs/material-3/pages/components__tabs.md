# Tabs

Source: <https://m3.material.io/components/tabs> (content version 2026-09-23_06-10-05, page updated 2026-07-17T07:03:01.541Z)

## Overview

- 

Use tabs to group content into helpful categories
- 

Two variants: primary and secondary
- 

Tabs can horizontally scroll, so a UI can have as many tabs as needed
- 

Place tabs next to each other as peers

[Image: A bar of primary tabs with destinations labeled Flights, Trips, and Explore. And a bar of secondary tabs with destinations labeled Overview and Specifications](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2kfqg9k-1.png?alt=media&token=0b9bbd9d-bec7-468e-8e83-1a7b6d08763a)

_1. Primary tabs
2. Secondary tabs_

#### Availability & resources

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color
- Layout: Icons and labels are now vertically centered within the container

[Image: Bar of primary tabs with destinations labeled Flights, Trips, and Explore](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k3okei-2.png?alt=media&token=cbbae98e-4d7c-4c85-8e63-1056f6e38129)

_Tab icons and labels are positioned in the vertical center of the container_

## Specs

#### Tokens and specs

Select a component variant below to see its elements, attributes, tokens, and their values.

[Token table: see ../tokens/TOKEN_TABLE.6039f0080a95df1e.md]

#### Primary tabs

[Image: 6 elements of primary tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2lequcy-1.png?alt=media&token=e30b24d1-ba44-45b8-a4e3-8d260ba61783)

_1. Container
2. Badge (optional)
3. Icon (optional)
4. Label
5. Divider
6. Active indicator_

##### Primary tabs color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 7 color roles applied to primary tabs in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2lerpx7-2.png?alt=media&token=61392b0c-376b-4e53-bec0-592dc867150d)

_Primary tab color roles used for light and dark schemes:

1. Surface
2. Primary
3. Primary
4. On surface variant
5. On surface variant
6. Outline variant
7. Primary_

##### Primary tabs states

[Image: Diagram of all primary tab states in both light and dark mode](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8t9w5tr-03-3P.png?alt=media&token=ab51d1db-3cf4-4f3c-95ee-72ffb1f6dd3d)

_1. Enabled (active destination)
2. Hover (active destination)
3. Focused (active destination)
4. Pressed (active destination)
5. Enabled (inactive destination)
6. Hover (inactive destination)
7. Focused (inactive destination)
8. Pressed (inactive destination)_

#### Secondary tabs

[Image: 5 elements of secondary tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2letsf5-4.png?alt=media&token=53f548f7-a618-4720-ba08-563be29dce2b)

_1. Container
2. Badge (optional)
3. Label
4. Divider
5. Active indicator_

##### Secondary tabs color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 5 color roles applied to secondary tabs in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2leuvo3-5.png?alt=media&token=ad58a754-c7b2-4ae3-9eaa-b24f4f04e6ae)

_Secondary tab color roles used for light and dark schemes:

1. Surface
2. On surface
3. On surface variant
4. Outline variant
5. Primary_

##### Secondary tabs states

[Image: Diagram of all secondary tab states in both light and dark mode](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8t9wue2-06-3P.png?alt=media&token=c4d4a82a-f2b2-484e-8eb3-0511a6a4aa81)

_1. Enabled (active destination)
2. Hover (active destination)
3. Focused (active destination)
4. Pressed  (active destination)
5. Enabled (inactive destination)
6. Hover (inactive destination)
7. Focused (inactive destination)
8. Pressed (inactive destination)_

#### Measurements

[Image: Diagram of measurements for four and two tabs per container, including icon and label placement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm92tisv3-07-3P.png?alt=media&token=3f3fca3c-6b4d-4034-9c84-94f9bf7c785d)

_Tabs are divided into equal sections, with labels and icons positioned vertically centered. The divider is included in the height, placed inside the container._

[Image: Diagram of Primary tab active indicator measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm92thj1h-08-3P.png?alt=media&token=76d7e053-1d60-462d-900c-9e65d537a4d7)

_Primary tab active indicators are inset 2dp on each side, have a fully rounded corner radius, and a minimum length of 24dp._

| Attribute | Value |
| --- | --- |
| Container height (label text only) | 48dp |
| Container height (icon and label text) | 64dp |
| Icon size | 24dp |
| Divider height | 1dp |
| Primary active indicator height | 3dp |
| Secondary active indicator height | 2dp |
| Active indicator shape | 3, 3, 0, 0 |
| Active indicator minimum length | 24dp |
| Padding between inline icon and text | 8dp |
| Padding between inline text and badge | 4dp |
| Overlap of badge on stacked icon | 6dp |

## Guidelines

#### Usage

Tabs organize groups of related content that are at the same level of hierarchy.

[Image: Mobile screen with 3 tabs: video, photos and audio. Each tab has an an icon and text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k0hhto-1.png?alt=media&token=faff99ee-2899-443c-af57-12c65d59fbff)

_Tab labels can include icons and text. Text labels should be short._

There are two variants of tabs:

1. 

Primary tabs
2. 

Secondary tabs

Primary tabs are placed at the top of the content pane under an app bar. They display the main content destinations.

Secondary tabs are used within a content area to further separate related content and establish hierarchy.

[Image: 3 primary tabs above 3 secondary tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2neyv4z-2.png?alt=media&token=63c8ff69-43a0-4546-b67d-8a4bb5717c60)

_1. Primary tabs

2. Secondary tabs_

##### Related content

Use tabs to group related content, not _sequential_ content.

[Image: Scrolling up and down through content, then swiping left through tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k0jkg6-3.png?alt=media&token=45142db9-88cd-4311-b2b7-fcd6f1bf4666)

_Utilize tabs to categorize related groups of content into clearly defined sets_

[Image: Mobile screen with scrollable tabs of sequential content: Chapter 1, Chapter 2, Chapter 3 and Chapter 4.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k0jyu3-4.png?alt=media&token=47a63c09-2bf0-41e1-80fc-92f8783b19a8)

_Don’t use tabs to move through sequential content that needs to be read in a particular order. Instead, create hierarchy within the content using techniques like typography style and open space._

#### Anatomy

[Image: Six components of tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k0lum1-5.png?alt=media&token=07a5972d-391d-41a3-9a79-eafe77cd8f25)

_1. Container
2. Icon (optional)
3. Badge (optional)
4. Label
5. Divider
6. Active indicator_

##### Container

The container holds multiple tabs. Its contents can be fixed or scrollable.

The container should always extend the full width of the window and be divided into equal sections, one for each tab.

The container is defined by a divider on the bottom edge to separate it from the content below. Content may scroll under the container.

[Image: Mobile screen with fixed tabs with a dotted border to illustrate the container area.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k0mdfv-6.png?alt=media&token=6eab5596-fd3e-4c96-b8dc-3bdd18a576ae)

_The container is the area that contains the tabs directly under the title above_

##### Icon (optional)

Icons communicate the kind of content within a tab. Icons should be simple and recognizable.

[Image: Mobile screen with tabs that use both icons and labels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k0o3dw-7.png?alt=media&token=4453d8d6-48b9-4c46-bdef-c67469c6874e)

_Tabs can use a combination of labels and icons_

Icons alone aren’t as effective as text labels at communicating complex content.

Use caution when representing tab content with icons alone, as an icon’s meaning may not be clear.

[Image: Mobile screen with tabs represented by icons for “wishlist” and “location”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k0sbsy-8.png?alt=media&token=feb6c69b-48e7-47c7-a3ef-c8101a1d086a)

_Use icons that are globally recognized when using icons alone_

[Image: Mobile screen where "purchases” tab has text only and “wishlist” tab has text and icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k0t3i6-9.png?alt=media&token=8943b2f8-f6e6-4806-8b42-19cbdd777e22)

_Don’t use tabs with both icons and text labels on only some tabs, but not others_

##### Label

Text labels should clearly and succinctly describe the content within the tab.

Tab labels appear in a single row. Labels can use a second line if needed, with truncated text. Alternatively, scrollable tabs can allow room for longer titles.

[Image: Mobile screen with scrollable tabs in a single row.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k1942z-10.png?alt=media&token=c814722a-2e66-42b2-a087-253f3dffcadc)

_Tab labels should be short and succinct. There should be a clear relationship to the title above._

When using scrollable tabs, the first visible tab should be offset by 52dp from the left side of the device for both web and mobile. The width of each tab is defined by the length of its text label.

Avoid using inconsistent padding on each tab.

[Image: Screen with scrollable tabs offset from the leading edge by 52dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k19jjz-11.png?alt=media&token=ba85424e-ac68-4880-8ce6-9772253d3871)

_Offset the first scrollable tab 52dp from the leading edge so it's clear that more content is available_

[Image: Screen with scrollable tabs, 2 of which are truncated to “Australian” showing how truncation can confuse users.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k1a0sc-12.png?alt=media&token=d0344e50-67db-4791-99d8-05f7c782bf67)

_Don’t truncate labels unless required, as truncated text can impede comprehension_

##### Badges (optional) 

Badges can be used on primary or secondary tabs to show notifications or updates related to a specific tab. Limit badge content to four characters, including a "+".

Once the user views the relevant content in the tab, the badge value should update or the badge should disappear entirely.

Small and large badges can both be used with tabs. Read the badge guidance (https://m3.material.io/m3/pages/badges/overview) for more details.

[Image: Mobile screen with tabs that use both icons and labels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k1yl6w-13.png?alt=media&token=b128a5c0-f67d-4194-bc94-d69b547ddc8c)

_Badges are used to highlight notifications related to tab specific content_

##### Active indicator

To differentiate an active tab from an inactive tab, apply an underline and color change to the active tab’s text and icon.

[Video: Selecting a tab creates an underline below the icon and text, both which have changed color to show the tab is active.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60drx93-GM3-Components-Tabs-Guidelines-1-v01.mp4?alt=media&token=01dba97f-6d23-422f-a8da-fbc765f43b95)

_An underline and color change differentiate an active tab from the inactive ones_

#### Choosing the tab variant

Primary tabs should be used when just one set of tabs are needed.

Secondary tabs are necessary when a screen requires more than one level of tabs. These tabs use a simpler style of indicator, but their function is identical to primary tabs.

[Image: Mobile screen with primary tabs near the top of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k20o4c-15.png?alt=media&token=1c7dd05f-a6bd-4c00-a290-5ebdd692a1fb)

_Tabs can be joined with components like app bars, embedded in a specific UI region, or nested within components like cards and sheets. Tabs control the UI region displayed below them._

#### Placement

Tabs are displayed in a single row, with each tab connected to the content it represents. As a set, all tabs are unified by a shared topic.

Secondary tabs should always be placed below primary tabs.

[Image: Mobile screen with secondary tabs below the primary tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k217y6-16.png?alt=media&token=3a2e7337-2872-4ea8-a56e-9292b857d1cf)

_Secondary tabs are found within other content to assist users with greater detail_

#### Responsive layout

For fixed tabs, the maximum width for each tab should be determined by the width of the widest tab. The group of tabs should use a fluid margin and align to the center or leading edge of the body region.

Avoid using more than four tabs at once. At five or more tabs, the container becomes cramped.

[Image: Four fixed tabs spaced to match one another.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm6fa9q27-17.png?alt=media&token=cc7ab597-a356-4567-9e55-1741827fc898)

_Tabs can grow in width in relation to the number of items contained within_

#### Behavior

##### States

By default, tabs inherit enabled states with one active state.The inactive and active states of a tab can inherit a hover, focus, and pressed states.

[Image: Four states of a tab.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k2312r-18.png?alt=media&token=097ee5d4-3881-444a-8729-143cad991109)

_Active, hover, focused, and pressed states_

##### Fixed tabs

Fixed tabs display all tabs in a set simultaneously. They are best for switching between related content quickly, such as between transportation methods in a map. To navigate between fixed tabs, tap an individual tab, or swipe left or right in the content area.

[Video: Mobile screen with fixed tabs, text only.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60dtw9m-GM3-Components-Tabs-Guidelines-2-v01.mp4?alt=media&token=9eb59133-809d-45dd-8ac1-f5ce4ef3f482)

_Fixed tabs allow users to see all possible kinds of content available_

###### Tap a tab

Navigate to a tab by tapping on it.

[Video: Tapping a tab selects it.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60duq4j-GM3-Components-Tabs-Guidelines-3-v01.mp4?alt=media&token=1f45151f-f0a7-44bc-8e3e-c285696673ad)

_Tapping on a tab directly_

###### Swipe within the content area

To navigate between tabs, users can swipe left or right within the content area.

[Video: Swiping left or right on the content area moves the focus between fixed tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60dvuo4-GM3-Components-Tabs-Guidelines-4-v01.mp4?alt=media&token=7d119b6f-4276-488b-bee9-0814d15c61aa)

_Users can swipe between fixed tabs to see related content quickly_

Use caution when placing other swipeable content (such as interactive maps or list items) in the content area.

[Video: Scrolling up and down through content, then swiping left through tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60dwpex-GM3-Components-Tabs-Guidelines-5.1-v01.mp4?alt=media&token=544702cf-ae9c-400e-a038-cfde92c1a9a5)

_Use different gesture directions when using tabs_

[Video: Swiping to change tabs accidentally swipes to delete a list item in the UI instead.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60dxhwe-GM3-Components-Tabs-Guidelines-5.2-v01.mp4?alt=media&token=37281524-6317-465c-b382-4099b0e3c796)

_Avoid placing swipeable items in the content area of a UI that has tabs, as the user may mistakenly swipe the wrong component_

##### Scrollable tabs

When a set of tabs cannot fit on screen, use scrollable tabs. Scrollable tabs can use longer text labels and a larger number of tabs. They are best used for browsing on touch interfaces.

[Video: Scrolling left and right on scrollable tabs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60dygta-GM3-Components-Tabs-Guidelines-6-v01.mp4?alt=media&token=445c40d5-20a1-4afe-885a-ed9bea0640ed)

_Padding should remain the same when using scrolllable tabs and long labels_

##### Scrolling content

When a screen scrolls up and down through content, tabs can either be fixed to the top of the screen, or scroll off the screen. If they scroll off the screen, they will return when the user scrolls upward.

[Video: Scrolling through content with fixed tabs at top of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60dz0ae-GM3-Components-Tabs-Guidelines-7-v01.mp4?alt=media&token=4a834ae7-454d-4029-b581-892fb2052430)

_Tabs can be use to create elevation_

[Video: When scrolling up through content, tabs scroll off screen, then reappear when scrolling back down.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60dztv7-GM3-Components-Tabs-Guidelines-8.1.mp4?alt=media&token=d909f8c1-c29d-448b-be0f-8beb0c552208)

_Tabs can scroll offscreen on scroll, and reappear when the page is scrolled up_

[Video: When scrolling up through content, tabs scroll behind the app bar then reappear when scrolling back down.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60e0d2q-GM3-Components-Tabs-Guidelines-8.2.mp4?alt=media&token=53c95ac9-7bb1-47ea-8aa7-a392191e844e)

_Don’t scroll tabs behind an app bar. When tabs are attached to a component, they should appear and move as a single unit._

## Accessibility

#### Use cases

Users should be able to:

- Undertake actions or invoke navigation to a new destination with assistive tech
- Select an action or destination from an off screen tab with assistive tech
- Maintain access of primary actions when the content is in a scrolled state

#### Interaction & style

**Touch**

- When a user taps on an icon button, a touch ripple appears, indicating interaction feedback
- The selected indicator becomes active and shifts into position once the touch has been engaged

[Video: The ripple effect resulting from tapping on an action item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60bkpen-GM3-Components-Tabs-Accessibility-1-v01.mp4?alt=media&token=0e70cb1d-d5e6-4442-b894-95179d1da7f0)

_Touch: Tap_

**Scrollable**

- When a set of tabs cannot fit on screen, scrollable tabs are used. They are best used for browsing on touch interfaces.
- To navigate between scrollable tabs, users swipe the set left or right. Users can also use arrow/tab to navigate through.
- It's **not recommended** to loop a tab set where it scrolls infinitely. This can trap users who are navigating linearly with a screen reader.
- To select an individual tab, users tap or press space/enter.
- Horizontal scrolling tabs meet accessibility requirements because they need to increase in width to respond to label text without affecting the layout, and horizontal scrolling is necessary to view those labels.

[Video: Swiping right and left scrolls through tabs when scrolling is enabled.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60bllqp-GM3-Components-Tabs-Accessibility-2-v01.mp4?alt=media&token=c852313d-ba99-4db7-95b0-dd3736385156)

_Scrollable: Scrollable Tabs_

**Cursor**

- When hovered, the hover state appears, providing a visual cue that the icon button is interactive. When clicked (in both active and inactive states), a ripple appears and the indicator shifts into position, showing the user feedback.

[Video: Hover state appears when hovering over tabs, clicking on them changes the state to active.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60bmbt7-GM3-Components-Tabs-Accessibility-3-v01.mp4?alt=media&token=e8ae2e95-3425-4f09-9b1c-0bb2249ab12f)

_Cursor: Hover, Click_

**Keyboard/Switch **

- When tabbed, a focus indicator appears, providing a visual cue to the user that the destination is now selected
- When the user engages with the selected tab via Space/Enter in active states, the user is taken to a new destination
- Within the tab menu, the user is able to arrow/tab through the menu items, Space/Enter to select an item, or tab to exit the active state

[Video: Tabbing through navigation items. The focus indicator appears when an item is selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60bmwk8-GM3-Components-Tabs-Accessibility-4-v01.mp4?alt=media&token=313f83d3-6732-48c2-99c3-9d6e637c5bc4)

_Keyboard/Switch: Tab, Space/Enter, Arrow_

##### Avoid applying density by default

Don't apply density to tabs by default — this lowers their targets below our best practice of 48x48 CSS pixels. Instead, give people a way to choose a higher density, like selecting a denser layout or changing the theme.

To ensure that this density setting can be easily reverted when it's active, keep all the targets to change it at minimum 48x48 CSS pixels each.

#### Initial focus

On arrow/tab in a tab menu, the active indicator appears on the first interactive element, providing feedback to the user that it is selected. The user is then able to tab to additional interactive elements until all available items are complete within the tab menu.

[Video: Arrow or Tab being used to navigate through a tab menu.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60bo0sa-GM3-Components-Tabs-Accessibility-5.1-v01.mp4?alt=media&token=ef562741-1b5e-40e8-8107-22c2e664ca23)

_Use Arrow/Tab to navigate through items_

[Video: Space or Enter being used to navigate through a tab menu.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm60bot9i-GM3-Components-Tabs-Accessibility-5.2-v01.mp4?alt=media&token=13673350-f957-4807-94ec-446fa068e117)

_Don't use Space/Enter for navigating tabs. Space/Enter is only used for completing actions._

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Arrow | Focus lands on the next available navigation destination |
| Space / Enter | Activates the focused navigation destination |
| Arrow | Allows navigation through menu items |

#### Labeling elements

When the visible UI text is ambiguous, or there is no visible UI text, accessibility labels need to be more descriptive. For example, an icon button that visually represents a “video camera” requires additional information in its accessibility label to clarify the icon’s intent.

[Image: Small device screen with the tab highlighted and the label and role illustrated.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2k3h2mn-7.png?alt=media&token=47b7122f-9754-488f-8436-39a6b015175a)

_While the icon visually represents a “Video camera,” the accessibility label for this tab clarifies its function: “Video format media content”_
