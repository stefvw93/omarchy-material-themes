# Search

Source: <https://m3.material.io/components/search> (content version 2026-09-23_06-10-05, page updated 2026-07-27T04:04:05.736Z)

## Overview

- 

Use search for navigating a product with queries
- 

A search bar can include a leading search icon, hinted search text, and optional trailing icons
- 

Search can display suggested keywords or phrases as a person types
- 

A search bar displays search suggestions or results in a list
- 

Use a search app bar to provide an emphasized, global entry-point

[Video: Mobile UI shows a person typing into an email search bar. It expands to show a list of results.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlb0x4f4-GM3%20-%20Search%20Bar%20-%20Overview%2001%20-v2.mp4?alt=media&token=4438710d-8472-4698-ab9d-183b972998ad)

_When inputting text, search suggestions or results appear below the search bar_

#### Availability & resources

#### M3 Expressive update

Search has a new visual style, motion, and more flexibility for trailing icons. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

**February 2025** 

Naming

- 

Search bar and search view are now collectively named **search**

Configurations

- 

Styles: Search can be contained (recommended) or divided
- 

Gaps can separate results into groups

Motion

- 

The search bar grows wider when focused

Supported platforms:

- 

Jetpack Compose (https://developer.android.com/reference/kotlin/androidx/compose/material3/package-summary#SearchBar(androidx.compose.material3.SearchBarState,kotlin.Function0,androidx.compose.ui.Modifier,androidx.compose.ui.graphics.Shape,androidx.compose.material3.SearchBarColors,androidx.compose.ui.unit.Dp,androidx.compose.ui.unit.Dp))

[Video: A recipe search with “Search recipes” hinted text, “Mexican dishes” is entered, then results appear in a list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlb19j2i-GM3%20-%20Search%20Bar%20-%20Overview%2002%20-v2.mp4?alt=media&token=99e6f5e3-f3d1-4d83-88c9-5e37c8a0437b)

_The **contained** search style features a persistent, filled search container_

#### Differences from M2 to M3 baseline

- 

Color: New color mappings and compatibility with dynamic color
- 

Elevation: Lower elevation and no shadow by default
- 

Name: Search was formerly known as open search bar
- 

Variants: Two official variants of search components: search bar and search view

[Image: M2 open search bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlb1gn7s-04.png?alt=media&token=dc445e20-469e-40b2-9175-8d198effc998)

_M2 open search bars were square and elevated_

[Image: M3 search bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlb1hcrs-05.png?alt=media&token=ae55f13c-75fb-4b39-bc09-f503ea5b156a)

_M3 search bars are rounded, use tonal surface, and support dynamic color_

## Specs

#### Variants

[Video: Typing “Ping” into a search bar reveals a list of email results.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm28azl5-GM3%20-%20Search%20Bar%20-%20Specs%2001%20-%203P%20-%20v02.mp4?alt=media&token=c021590d-7b43-4a69-bff1-1e4f9a20090d)

_When a person executes a **search**, results appear in a list below the search bar_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Search | Available | Available |

#### Configurations

##### Style

Search comes in two styles:

- 

Contained: Has an expressive look and feel. It uses a filled container to separate a search bar from a list of suggestions or results
- 

Divided (baseline): Doesn’t have the latest visual style, motion, or flexibility

[Image: An email inbox search bar in a contained style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17d95o-02-3P.png?alt=media&token=3dd43ef8-9815-432c-a639-2096e63eecab)

_The contained style has a persistent, filled container, expressive motion, and rounded shape_

[Image: An email inbox search bar in a divided style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17dfzg-03-3P.png?alt=media&token=a5179e49-d0ca-4f96-bba7-c00613a268e3)

_The divided (baseline) style uses a divider to separate the search bar from suggestions and results_

##### Layout

Search suggestions and results appear in customizable lists, with two layout options: full-screen and docked. More on search layouts (https://m3.material.io/m3/pages/search/guidelines#4f6c921c-795f-4e06-9b12-27ae7d502adb)

[Image: Full-screen search results with a search bar in the contained style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17dsh8-04-3P.png?alt=media&token=7f0819f0-1c4c-4a4c-94ed-8cedf764f46b)

_Full-screen layout in the contained style_

[Image: Docked search results with a search bar in the contained style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17e01j-05-3P.png?alt=media&token=2ae8c274-80c6-40f8-97e9-8d234a057db5)

_Docked layout in the contained style_

[Image: Full-screen search results with a search bar in the divided style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17e8r8-06-3P.png?alt=media&token=5b199df1-1199-4653-b21d-dc28174c9195)

_Full-screen layout in the divided style_

[Image: Docked search results with a search bar in the divided style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17efaq-07-3P.png?alt=media&token=a5cba1d3-cd20-463b-90ee-e5c20d299f1e)

_Docked layout in the divided style_

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Style | Contained | -- | Available |
|  | Divided | Available | Not recommended. Use contained. |
| Layout | Docked, full-screen | Available | Available |

#### Tokens & specs

Use the table's menu to select a token set. The **search bar** set only contains tokens for the unfocused search bar. The **search view** set contains all other tokens when interacting with search, including all styles and layouts. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.07341534518f78d0.md]

#### Anatomy

Search includes a search bar and a container for suggestions and results. The container is empty by default. Use the list component to add content. In the divided (baseline) style, a divider separates the search bar and results.

[Image: 6 elements of search.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17eoxh-08-3P.png?alt=media&token=0b029fa9-9818-4d4b-bf50-0e31ac6f028b)

_1. 

Search bar container
2. 

Leading icon
3. 

Supporting text
4. 

Trailing icon and avatar (optional)
5. 

Input text
6. 

Container for search suggestions or results_

##### Examples

1. 

With avatar
2. 

With one trailing icon button
3. 

With two trailing icon buttons
4. 

With trailing icon button and avatar

[Image: 4 search bars with different trailing elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17exdj-10-3P.png?alt=media&token=5506d812-c90c-4751-9449-d72f1842589e)

#### Color

Color values are implemented through design tokens. For designers, this means working with color values that correspond with tokens. In implementation, a color value will be a token that references a value.

##### Full-screen layout

[Image: 6 full-screen search color roles in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17f6n2-12-3P.png?alt=media&token=9857d8cf-493e-4ba0-bec5-d819cb3dd0d2)

_Full-screen search color roles used in light and dark themes:

1. 

Surface container low
2. 

On surface variant
3. 

On surface variant
4. 

Surface container high
5. 

On surface variant
6. 

On surface_

##### Docked layout

[Image: 6 docked search color roles in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17g3kb-13.png?alt=media&token=91890bd0-2429-40dc-ba11-945fe2ca3e6e)

_Docked search color roles used in light and dark themes:

1. 

Surface container high 
2. 

On surface variant
3. 

On surface variant
4. 

Surface container high
5. 

On surface variant
6. 

On surface_

#### States

States are visual representations used to communicate the status of a component or an interactive element. In focused search (https://m3.material.io/m3/pages/search/guidelines#a9b2df31-8561-4326-82cd-41ed6532b765), individual elements maintain their own interaction states. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

##### Search bar

[Image: 4 search bar states in light and dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17mvvh-14-3P.png?alt=media&token=992b5b83-efa3-4964-8f53-39e96f3f2f2c)

_1. 

Enabled
2. 

Hovered
3. 

Focused
4. 

Pressed (ripple)_

##### Search suggestions & results

Search includes a container for suggestions and results. The container is empty by default. Use the list component to add content.

[Image: 4 search result states in light and dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17n640-15-3P.png?alt=media&token=953f72ef-b883-441c-abda-7a67010a712d)

_1. 

Enabled
2. 

Hovered
3. 

Focused
4. 

Pressed (ripple)_

#### Measurements

##### Search bar

[Image: Search bar with leading and trailing icon size and padding measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17ne69-16.png?alt=media&token=786cbf19-9e17-44e0-af46-b1529da17e45)

_Unfocused search bar with leading and trailing icon measurements_

[Image: Search bar with trailing avatar size and padding measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17njuh-17.png?alt=media&token=b754034d-5aba-4479-9e77-b487f599fa00)

_Unfocused search bar with avatar measurements_

In M3 Expressive, the search bar expands when focused. The margins change from 24dp to 12dp.

[Image: Unfocused search bar margins of 24dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17o030-18.png?alt=media&token=8850da02-b54e-4ab3-b287-8cf416d92e98)

_Unfocused search bar margin measurements_

[Image: Focused search bar margins of 12dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17o810-19.png?alt=media&token=039ffe87-1dfe-4131-ba73-0b062518d946)

_Focused search bar margin measurements_

| Element | Attribute | Value |
| --- | --- | --- |
| Container | Width | Min: 360dp, max: 720dp |
| Height | 56dp |  |
| Label alignment | Start-aligned |  |
| Leading padding | Unfocused: 24dp, focused: 12dp |  |
| Trailing padding | Unfocused: 24dp, focused: 12dp |  |
| Leading icon and label padding (from tap target) | 4dp |  |
| Label and trailing icon padding (from tap target) | 4dp |  |
| Avatar | Size | 30dp |

##### Focused search

###### Contained style

[Image: Full-screen layout size and padding measurements in contained style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17on8b-20.png?alt=media&token=afb59bc7-c6e5-4d5d-9cf4-64eae9f48d57)

_Full-screen search padding and size measurements for contained style_

[Image: Docked layout size and padding measurements in contained style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17oub1-21.png?alt=media&token=208c144b-ecb2-4f7b-8f10-e8b23a404d0f)

_Docked search padding and size measurements for contained style_

| Element | Attribute | Value |
| --- | --- | --- |
| Full-screen container | Width | Full width |
| Height | Full height |  |
| Docked container | Width | Min: 360dp, max: 720dp |
| Height | Min: 240dp, max: 2/3 of screen height |  |
| Search bar container | Height | 56dp |
| Label alignment | Start-aligned |  |
| Leading padding | 16dp |  |
| Trailing padding | 16dp |  |
| Leading icon and label padding (from tap target) | 4dp |  |
| Leading icon and label padding (from tap target) | 4dp |  |

###### Divided style

[Image: Full-screen layout size and padding measurements in divided style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17p24v-22-3P.png?alt=media&token=5c455e0b-4880-49d8-a4af-679db21c48e1)

_Full-screen search padding and size measurements for divided style_

[Image: Docked layout size and padding measurements in divided style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmm17p7ru-23-3P.png?alt=media&token=992a87d3-eac3-48d0-b226-932a3b1a9015)

_Docked search padding and size measurements for divided style_

## Guidelines

[Video: A mobile UI search with hinted text “Search recipes”, “Mexican dishes” is entered, and a list of recipe results appear.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfkefwf-GM3%20-%20Search%20Bar%20-%20Guidelines%2001%20-%20v02.mp4?alt=media&token=5e327f53-cfd2-4860-8f1f-4cd819f7b34f)

_When focused, a search bar can show a list of search suggestions. As text is entered, search results appear._

#### Usage

Search helps people find information quickly.

Use search for products with many items to manage, such as files or messages.

[Image: Mobile UI shows a search bar at the top of a message inbox.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfkhcoi-02.png?alt=media&token=0bbcd761-04b2-482f-8b01-e11cf9dd25c0)

_Search helps people find information in large inboxes like messages or emails_

##### Different ways to search

The search entry point is dependent on a product’s needs, and should be easy to find:

- 

Search bar: Use to search contents in a specific view, like **Search your messages**
- 

Search app bar: Use this app bar variant when search is the primary, global function
- 

Search icon button: Use when search is a secondary action or not the main focus

[Image: A mobile app with a search bar below the page title.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfkodgz-03.png?alt=media&token=55ab08bb-f4bc-49d6-abc2-76bf93ba2ada)

_Add a **search bar** below a title to search specific content_

[Image: A mobile app with a search app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfkpcee-04.png?alt=media&token=6dea133b-5732-4c6f-9dfa-29ca6e892083)

_For global search, use a persistent **search app bar**, integrated into an app bar_

[Image: A mobile app with a magnifying glass icon on the leading side of the app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfkq5y2-05.png?alt=media&token=d94669aa-81c7-4c69-b709-ac4eb84a8302)

_Use a **searchicon button** when search is a secondary action_

##### Focused search

When a search entry point is selected, it opens focused search.  

- 

Search suggestions can appear before text is entered
- 

Search results can show as someone is typing or after a search is executed
- 

Individual elements maintain their own interaction states when search is focused

More on search states (https://m3.material.io/m3/pages/search/specs#65c58b10-4569-43d6-9c11-64a5b02f3099)

[Image: Focused search with a list of suggestions on a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfkz1fo-06.png?alt=media&token=b2a28b95-5ca4-4c6e-a4a4-eda05d83c4e6)

_When focused, a search bar expands to show search suggestions or results in a list_

If search is the primary action, focused search can be a standalone destination reached from a navigation bar.

[Image: Focused search on a mobile screen with a list of suggested contacts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfkth1m-07.png?alt=media&token=384b3aed-87d1-4265-a957-5b21037e9eba)

_Focused search can be a standalone destination, reached by selecting an item in a navigation bar_

##### Search suggestions & results

Search suggestions and results both appear in a list component by default.

To help people find information quickly, consider adding variety and context, such as:

- 

Leading icons related to suggestions
- 

Category labels, like **Recent**, **Contacts**, or **Suggestions**
- 

Avatars or other high-priority items
- 

Filter chips to narrow down results

[Image: Search with suggestions organized in a column, ending with a row of 5 contact avatars with names.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlflqra9-09.png?alt=media&token=b100c40a-d13b-4601-90ce-3a7e2087ac4d)

_Include high-priority items like avatars in search suggestions or results_

##### Gaps

Use gaps to separate a list of suggestions or results into groups.

More on using gaps in lists (https://m3.material.io/m3/pages/lists/guidelines#9e96fd72-5bf3-49df-9baf-e025dcca344d)

[Image: A gap separates the location and calendar list items from people and pets avatars.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfm1yld-10.png?alt=media&token=9cd70993-130a-449e-8807-4c9ffe215f9a)

_To separate list items into distinct groups, use a gap_

#### Placement

A search bar is typically placed at the top of a screen to remain prominent and accessible. Its location depends on whether search is the primary focus of a product or a secondary action.

[Image: Mobile UI with a search bar directly below a Settings headline.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfmbc2s-21.png?alt=media&token=bdf6a965-f280-48a6-b28a-bf42f57e1d1e)

_A search bar can be the primary focus of a page_

[Image: Mobile UI with a search bar centered at the top of the screen, above a row of Favorites avatars.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfmc255-22.png?alt=media&token=ad6fbc7a-15a6-42ed-8ec4-6450a6f9c87e)

_Search bars should usually be placed at the top of the content_

[Image: A photos app with a search icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfmcmiv-23.png?alt=media&token=ec5cb486-7355-492f-9480-3e36fc614a51)

_Search can be a secondary action_

##### Focused search layouts

When focused, search suggestions and results appear in a list below the search bar.  

There are two layout options:

- 

**Docked** opens a list below the search bar, with a scrim covering main content
- 

**Full-screen** expands to fill the screen

More on adaptive design (https://m3.material.io/m3/pages/search/guidelines#eb45ccc4-d1b5-4ea1-bee5-ea1c3d1c5436)

[Image: Tablet UI shows a list of search results docked below the search bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfmf49n-08.png?alt=media&token=7b717895-53e2-47ec-9b26-e42e3a4971e8)

_Docked layout on a tablet_

[Image: Mobile UI shows a list of search results filling the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfmg7bg-07.png?alt=media&token=3be246ec-c24e-4d73-b43f-af6883770d08)

_Full-screen layout on mobile_

#### Anatomy

[Image: 6 elements of search.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgr3p93-11.png?alt=media&token=802aed8a-e993-42d2-8ef7-17aaba8ac5ad)

_1. 

Search bar container
2. 

Leading icon
3. 

Supporting text
4. 

Avatar or trailing icon (optional)
5. 

Input text
6. 

Container for search suggestions or results_

##### Search bar container

In the contained style, the search bar container remains the same shape in both the unfocused and focused states. Avoid changing the container behavior. 

The container’s margins should be:

- 

Unfocused: 24dp
- 

Focused: 12dp

In the divided (baseline) style, a divider separates the search bar and results.

[Image: Side-by-side comparison of a search container in unfocused and focused states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfmu14l-13.png?alt=media&token=f1e5fa3a-be6f-49fb-9314-34f76eac6971)

_Search bar containers have persistent, rounded corners_

###### Container color

Search bars use the **surface container high** color role. This role applies when the screen background is white or a tonal **surface** color, ensuring the container has clear contrast.

[Image: 2 mobile UIs show search bars on white and tonal backgrounds.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfmvyj4-14.png?alt=media&token=ec01deec-54a8-417f-8287-634d57db53c8)

_Search bars use **surface container high** to provide clear contrast_

Avoid using a **surface container high** color on a **surface container** background. This can cause the search bar to blend in, making it difficult for people to find.

To ensure proper contrast, use surface container roles that are more than one step apart.

[Image: A “surface container high” search bar on a “surface container” background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfn371r-15.png?alt=media&token=8015480f-71dc-40f0-8a0e-a36611b9b70e)

_Using a **surface container high** color on a **surface container** background reduces contrast and may affect accessibility_

##### Icons & icon buttons

###### Leading icons

The leading side of a search bar should include either: 

- 

A navigational icon button, such as a menu or arrow
- 

A non-functional search icon

[Image: A search bar on a tablet screen contains a non-functional search icon and a trailing avatar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfn8hr6-16.png?alt=media&token=00a26f0f-ed92-46ab-89ac-1c179529ef4f)

_A search bar can contain a non-functional search icon_

###### Trailing icons

A search bar should have one or two trailing icons or icon buttons.

Trailing actions can include:

- 

Additional modes of searching like voice search
- 

A separate high-level action such as current location or profile
- 

An overflow menu
- 

A decorative search icon

[Image: A search bar with 2 trailing icon buttons: a microphone and an overflow menu.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfnb1td-17.png?alt=media&token=4ee36dd9-e75a-4109-82fe-0d0805a43d24)

_Use a maximum of two trailing icons_

[Image: A search bar with a trailing microphone icon and avatar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfncrm8-18.png?alt=media&token=e3b1a784-65b2-4462-a2e9-908577627e04)

_Combine an avatar with up to one other trailing icon button_

[Image: Focused search with a trailing x icon to clear input text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfndiyw-19-VQA.png?alt=media&token=3b6d8d61-8e80-4005-b1e2-ab6fa33d9361)

_Focused search can show an optional **clear** icon to remove input text_

##### Text

###### Hinted search text

Provide a short description of the information people can search, like **Search replies** or **Search your messages**.

###### Input text

When a person starts typing, the hinted text is replaced with the input text.

[Video: A search bar labeled “Search replies”. “Peanut is entered and “Quick results” appear.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfngra0-GM3%20-%20Search%20Bar%20-%20Guidelines%2020%20-%20v02.mp4?alt=media&token=c8f9d59f-1e34-4530-9a39-dab7ce72dff2)

_Hinted search text is replaced when a search query is entered_

#### Adaptive design

The search bar position and alignment should scale with the layout, and stay close to the searchable content.

In most cases, a search bar should:

- 

Stay in its pane and scale in width accordingly
- 

Internal elements anchor to the left and right as the parent container scales

More on applying layout (https://m3.material.io/m3/pages/layout-overview/)

[Video: A search bar keeps its layout region and scales with different window sizes and layouts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfnplfk-GM3%20-%20Search%20Bar%20-%20Guidelines%2024%20-%20v01.mp4?alt=media&token=dbd513fe-e17b-4f4b-8787-ac6e98995bce)

_Keep the search bar close to the content a person can search_

##### Focused search

When focused, search can switch between showing suggestions or results in a:

- 

**Docked layout**: Best for medium and expanded windows
- 

**Full-screen layout**: Default for compact breakpoints

More on search layouts (https://m3.material.io/m3/pages/search/specs#fc12e839-f356-4f48-9bd5-0ed210565bfe)

[Image: Search suggestions in docked and full screen layouts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfnv4wh-25.png?alt=media&token=2b99ff8b-9274-46e4-a6a9-ea64d7b4110c)

_1. 

A docked layout on a large screen
2. 

A full-screen layout, the default for compact screens_

Search suggestions or results should swap from full-screen in compact windows to docked in larger breakpoints.

[Video: Animation shows search suggestions adapting from full-screen on mobile to a docked layout as the window size increases.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlfo0cyf-GM3%20-%20Search%20Bar%20-%20Guidelines%2026%20-%20v02.mp4?alt=media&token=bdee5106-fe0c-4807-a558-1d11626b2248)

_Search suggestions and results should adapt to fit different window sizes_

#### Behavior

##### Focused search

When a search bar is selected, search becomes focused and can:

- 

Show historical suggestions before typing
- 

Show suggestions or results as someone is typing
- 

Wait to show suggestions or results until a search is queried 

The **back** icon releases focus, dismisses any suggestions or results, and returns the search bar to its original state.

[Video: When a search bar is tapped, it becomes focused, and suggestions appear in a list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgr7r58-GM3%20-%20Search%20Bar%20-%20Guidelines%2027%20-%20v02.mp4?alt=media&token=e0bc001e-3c87-4f5e-8ef7-f63e007e00ca)

_When focused, a list of search suggestions can appear_

[Video: A person searches a photo app. The back icon returns the search bar to its original state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgr95m2-GM3%20-%20Search%20Bar%20-%20Guidelines%2030%20-%20v01.mp4?alt=media&token=05d76d3e-302b-4f96-ba5a-12999c829d2b)

_Focus is released when the back icon is selected_

##### Scroll

Depending on needs, a search bar can: 

- 

Scroll away with content, then reappear when a person begins scrolling up 
- 

Remain fixed at the top of the screen

[Video: Scrolling up hides the search bar. It reappears when scrolling down.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrahif-GM3%20-%20Search%20Bar%20-%20Guidelines%2029%20-%20v01.mp4?alt=media&token=3326f168-fa15-43f8-95f0-259760cfb0bb)

_A search bar can scroll up with content, then reappear when a person scrolls down_

##### Search results

To execute a search, a person can:

- 

Type a query and press **Enter**
- 

Select a suggestion or result without querying a search

Search results appear in a list below the bar, and scroll beneath the bar.   

For accessibility, focused search needs a clear status indicator that it’s searching content, like a search icon or **Results** label. More on search accessibility (https://m3.material.io/m3/pages/search/accessibility/)

[Image: “Peanut” is the entered search query and the first suggestion in the list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrceqs-32.png?alt=media&token=e8f6528f-ec6d-49b5-937a-c8a9ee80baed)

_Show search results in a compact, organized list, with an indicator like **Quick results**_

When search results are queried, the input text should remain visible, but not in focus.

[Video: “Pla” is entered into the search bar, “Plants” is suggested and selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrdhl9-GM3%20-%20Search%20Bar%20-%20Guidelines%2033%20-%20v02.mp4?alt=media&token=823169dd-7cb6-4ef2-abc3-152fb758d30a)

_Search suggestions and results display in a list, and the input text remains visible_

##### Predictive back

On Android, predictive back (https://github.com/material-components/material-components-android/blob/master/docs/foundations/PredictiveBack.md) allows a person to swipe left or right on search. 

- 

Search detaches from the screen edge to signal the full-screen layout will minimize
- 

The previous screen is revealed in a preview

More predictive back design guidance (https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture)

[Video: Swiping left on search causes the Android screen to scale left.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrejsr-GM3%20-%20Search%20Bar%20-%20Guidelines%2034%20-%20v02.mp4?alt=media&token=aed3f171-531b-4e45-a363-dd8dc7938193)

_The search surface and content scale back in the direction of the gesture_

## Accessibility

#### Use cases

People should be able to use assistive technology to:

- 

Navigate to and focus on a search bar
- 

View the hinted search text or persistent label
- 

Input text and complete a search
- 

Interact with a list of search suggestions and results 
- 

Clear the input text

#### Interaction & style

##### Autosuggest

When search suggestions and results appear, the screen reader must announce the change. This lets people know list items are available for selection.

[Image: Hinted search text and autocomplete results on a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrjdxa-01.png?alt=media&token=aa3e6409-1ddc-4c1e-abf3-fd8b8feeb81f)

_Autocomplete results should be announced by the screen reader_

#### Initial focus

Initial focus lands on the first interactive element. This is often a leading icon button or text field. A leading icon button usually activates search directly or opens a navigation component.

[Image: Search bar with a focused leading icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrkpb6-02.png?alt=media&token=7d04e34b-36b3-4858-a352-2e88a041d2c1)

_Initial focus can land on a leading icon_

[Image: Search bar with no leading icon. The text field is focused.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrl9ca-03.png?alt=media&token=28bc66bb-b098-4ef9-9065-b84a54a72406)

_If there’s no leading icon, focus lands on the text field_

#### Keyboard navigation

| **Keys** | **Actions** |
| --- | --- |
| **Tab** or **Shift** + **Tab** | Navigate between interactive elements |
| **Space** or **Enter** | Activate the search text field for input |
| **Arrows** | Navigate between search result items |

#### Labeling elements

The hinted search text should be used as the accessibility label describing the search bar.  

The role for the input field should be:

- 

Android: **Text field**
- 

iOS: **Search field**

[Image: Search bar with “Label: Search messages” and “Role: Text field”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrql4p-04.png?alt=media&token=4f1e2151-e990-4df2-8c46-96bdefa77b75)

_The accessibility label should match the hinted search text_

Leading and trailing icon buttons should be labeled according to their accessibility guidance (https://m3.material.io/m3/pages/icon-buttons/accessibility).

[Image: A search bar with accessibility labels for its leading icon button and trailing avatar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrt6xt-05.png?alt=media&token=9676908b-e093-44a0-b913-00b638bd7e7f)

_Use icon labels for icon buttons_

Search suggestions and results use the list component. Screen readers automatically announce the results as a list.

For accessibility labels, follow the list accessibility guidelines (https://m3.material.io/m3/pages/lists/accessibility).

[Image: A search bar on mobile, showing search results in a list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlgrwf25-06.png?alt=media&token=ca00ca47-b6c1-4848-9842-9d89485e98b7)

_Search suggestions and results are created using lists_
