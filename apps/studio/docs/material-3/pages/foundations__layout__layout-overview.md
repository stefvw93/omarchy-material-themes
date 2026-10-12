# Layout overview

Source: <https://m3.material.io/foundations/layout/layout-overview> (content version 2026-09-23_06-10-05, page updated 2026-08-18T21:59:38.343Z)

> Layout is the visual and strategic arrangement of elements on a screen

## Overview

- 

Use layout to organize all elements in a screen, signal hierarchy, and draw attention to key actions
- 

Adapt layouts to compact, medium, expanded, large, and extra-large breakpoints (previously window size classes)
- 

Build from an established canonical layout example (https://m3.material.io/m3/pages/canonical-examples)
- 

Design for bidirectionality (https://m3.material.io/m3/pages/bidirectionality-rtl) to support both left-to-right (LTR) and right-to-left (RTL) languages
- 

Apply consistent arrangement, sizing, and spacing to create a functional layout structure
- 

Material layout guidance is implemented on Android and applies to web

[Image: 7 elements of layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3ukjvm-01.png?alt=media&token=6f4fdd25-559d-4ed3-964a-ffb0c5f7b5f7)

_1. 

Column
2. 

Fold
3. 

Margin
4. 

Bar
5. 

Drag handle
6. 

Pane
7. 

Rail_

#### Availability & resources

| **Type** | **Resource** | **Status** |
| --- | --- | --- |
| Design | M3 Design Kit (https://www.figma.com/community/file/1035203688168086460) (Figma) | Available |
| Spacing system & tokens (https://m3.material.io/m3/pages/spacing/overview) | Available |  |
| Implementation | Jetpack Compose: Canonical layouts (https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts) | Available |
| Jetpack Compose: Rulers (https://developer.android.com/reference/kotlin/androidx/compose/ui/layout/Ruler) | Available |  |
| Android Views (MDC-Android): Canonical layouts (https://github.com/android/user-interface-samples/tree/main/CanonicalLayouts) | Available |  |
| Jetpack Compose: Navigation3 (https://developer.android.com/guide/navigation/navigation-3/migration-guide) | Available |  |

#### What's new

When creating new layouts, use the layout scaffold, start from a canonical layout example, and ensure layouts scale across breakpoints.

###### **May 2026** 

Layout structure and design:

- 

Introduced layout scaffold, to create adaptive layouts efficiently
- 

New adaptive guidelines for mobile, desktop, and spatial devices
- 

Updated canonical layout examples
- 

Spacing system (https://m3.material.io/m3/pages/spacing/overview)

Naming:

- 

Window size classes renamed to breakpoints
- 

Responsive layout renamed to adaptive design (https://m3.material.io/m3/pages/layout-overview/adaptive-design)

[Image: Compact and expanded layouts for differently sized screens.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3uxdvt-02.png?alt=media&token=a4cf0742-9a81-4697-8963-46b936eeb5f3)

_The Material layout scaffold enables layouts to adapt across different screen sizes_

#### Layout terms

- 

**Adaptive design**: Techniques that allow an interface to dynamically respond to contexts like user preferences, device type, state, and breakpoints
- 

**Bars**: Can frame the page to help people navigate through a product, and typically house the app bar and bottom navigation bar
- 

**Bidirectionality**: A writing system that displays text and content from right-to-left (RTL) 
- 

**Breakpoints**: Opinionated window sizes where a layout changes to match available space, device conventions, and ergonomics (previously window size classes)
- 

**Column**: One or more vertical blocks of content within a pane
- 

**Drag handle**: The component that resizes panes
- 

**Fold**: A flexible area of the screen or a hinge that separates two displays on foldable devices
- 

**Gap**: The space between components or elements within a container
- 

**Margin**: The space between the edge of the screen and any elements inside of it
- 

**Multi-window mode**: Enables multiple apps to share the same screen simultaneously
- 

**Pane**: A layout container that houses other components and elements within a single app. A pane can be fixed, flexible, floating, or semi-permanent.
- 

**Rails**: The perimeter space surrounding panes that holds key elements such as navigation rails, toolbars, and pane control
- 

**Right-to-left (RTL) language**: Languages written and read right-to-left, such as Arabic, Hebrew, and Farsi, used by over 2 billion people (https://www.w3.org/International/questions/qa-scripts.en.html)
- 

**Rulers**: An opinionated set of global alignment lines that help organize building blocks in a layout
- 

**Safety region**: Zones reserved for system UI elements outside the application space, such as status bar or gesture bar
- 

**Scaffold**: A fundamental UI design structure that provides a standard platform for assembling key screen components
- 

**Spacer**: The space between two panes on a foldable device

## Parts of layout

#### Parts of layout

##### Windows

A window frames and contains an app or product.

Many systems support multi-window views, which display multiple apps at once.

Multi-window support guide for Android (https://developer.android.com/develop/ui/compose/layouts/adaptive/support-multi-window-mode)

[Image: Stacked windows with a single taskbar underneath.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3yuwss-01.png?alt=media&token=1040af33-3239-4b03-bd3c-4196c3456b87)

_Two windows can be shown at once with a taskbar underneath_

On desktop, windows can be resized and moved around freely. They should adapt to various screen sizes.

More on adaptive design (https://m3.material.io/m3/pages/layout-overview/adaptive-design)

[Image: 2 overlapping desktop windows.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3z1fl4-02.png?alt=media&token=431b13e9-b426-4874-8c2c-2b1e20882b6a)

_Windows can be moved around, resized, and adapt to different screen sizes_

##### Grids

The layout grid is the foundation for every layout. It provides a structural framework for organizing components, content, and actions.

Use the grid to:

- 

Group related information in columns
- 

Apply spacing consistently
- 

Create focal points for primary actions
- 

Align building blocks like bars, rails, and panes

More on grids (https://m3.material.io/m3/pages/grids-spacing/grids)

[Image: Side-by-side compact and expanded windows with different grid spacing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3z8y9f-03.png?alt=media&token=fc4a96db-308a-40f6-984b-8d70ff3451fe)

_Column count, width, and spacing dynamically adjust to different breakpoints_

#### Layout scaffold

##### Bars

Bars help people navigate through a product. Use bars to:

- 

Frame the main content
- 

Contain an app bar or navigation bar
- 

Span one or multiple panes  

More on bars (https://m3.material.io/m3/pages/scaffold/bars)

[Image: A photo app with an app bar below the safety region.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp45sv4u-04.png?alt=media&token=b9c750d7-b9de-450e-809c-c6e6c0081531)

_1. App bars are placed at the top of the screen to help people navigate by providing a description of the screen and 1–2 essential actions, like search or back navigation_

##### Rails

Rails are the next level in layout after bars, filling the perimeter space surrounding panes, or floating above them. They contain key elements such as navigation rails, toolbars, chat inputs, FABs, and other primary controls.

More on rails (https://m3.material.io/m3/pages/scaffold/rails)

[Image: Mobile layout with a toolbar, and a desktop layout with a start-aligned navigation rail.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp45u0ar-05.png?alt=media&token=dcbfcab8-3ece-4159-90ea-8dd3456bd01b)

_1. 

On mobile, the rail region can contain a toolbar
2. 

On desktop, the rail region can contain the navigation rail_

##### Panes

Just like panes of glass that make up a window in the real world, panes in Material make up most of the layout in a window.

All content must be in a pane. A layout can contain 1–3 panes of various widths, which adapt dynamically to the breakpoint (formerly window size class) and the person’s language setting. For right-to-left (RTL) languages, navigation components will be on the right.

People can navigate to or between panes. Presenting multiple panes at once can make a product more efficient and easier to use.

More on panes (https://m3.material.io/m3/pages/scaffold/panes/)

[Image: 2-pane layout on a tablet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp46vx4x-07.png?alt=media&token=b1eae581-b735-4691-921c-4737a95d7ac8)

_1. 

First pane
2. 

Second pane_

###### Containment

On most devices, panes can blend in with the background. This is called implicit grouping, and helps show relationships between panes.

Explicit grouping uses distinct colors or outlines to visually delineate content.

More on spacing to group content (https://m3.material.io/m3/pages/grids-spacing/spacing#e7e6d1ac-031a-4757-afcf-b223f23654ea)

[Image: 2 panes in an email app, with the same color as the background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp46z833-08.png?alt=media&token=9423401d-c17a-496d-bf1c-1155b8520bb9)

_In multiple-pane layouts, use color to show emphasis and close spacing to group related content_

In spatial environments, panes use a container color to separate them from the passthrough or virtual environment.

[Image: 2-pane layout in a spatialized environment, with a virtual reality background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp472v90-08.png?alt=media&token=a5d93025-d8c9-422b-84ac-92cb190ea868)

_Use contrast between panes and the background to create a spatial effect in XR_

##### Drag handles

Drag handles can be used to resize panes in a layout. They can:

- 

Adjust the width of flexible panes
- 

Fully collapse and expand fixed panes to quickly switch between a single and two-pane layout

[Video: A drag handle is used to collapse a two-pane layout into a single-pane layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4771l5-GM3_Applaying%20Layout_Understanding_Part_11_IA_v01.mp4?alt=media&token=3f0901d9-f02d-417c-b4cc-08937a5710ef)

_Drag handles can adjust pane size in a list-detail layout_

##### Rulers

Rulers are a set of global alignment lines. They help to align elements across all layers of the layout.

How to implement rulers in Compose (https://developer.android.com/reference/kotlin/androidx/compose/ui/layout/Ruler)

[Image: A 2-pane email in box, with rulers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp47dohx-10.png?alt=media&token=dc25aee8-0729-4814-b09f-8ec2c5d16c30)

_Rulers ensure global alignment across a product, keeping margins and placement consistent_

## Adaptive design

#### What’s adaptive design?

Adaptive design is a set of techniques to change an interface to fit different contexts. While responsive design scales a single layout to fit any screen, adaptive design customizes a product to optimize the experience on each device.

Designing adaptive experiences goes beyond customizable properties like color, typography, and shape. The structure, individual components, and entire layouts can adapt based on:

- 

People: Individual preferences and settings
- 

Devices: Watch, phone, foldable, tablet, desktop, or XR device
- 

Usage: Screens dynamically change as a person resizes windows, changes orientation, or switches device

#### Designing adaptive experiences

Layouts must be versatile, designed to adapt fluidly across three primary experience types: **mobile**, **desktop**, and **spatial**. Start with mobile and make sure your product's layout and components can scale and adapt seamlessly all the way up to spatial environments. 

While each experience has different primary input methods, designs should be built with all inputs in mind—touch, pointer, and physical keyboard—since users may use your product in a desktop environment regardless of their device type.

##### Mobile

Mobile experiences include phones, foldables, and tablets.

On mobile, an app can be shown in several window modes:

- 

Full-screen: The app takes up the entire screen, the default for mobile
- 

Split-screen: Two or more apps share the screen simultaneously, common on tablets and foldables
- 

Bubbles: Floating windows that let people multitask without leaving their current context

[Image: A mobile app in full screen mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3w1k0w-01.png?alt=media&token=9c6f0a31-d9d0-4bb1-8c6d-d4e17582281f)

_Mobile layouts default to a full-screen window_

##### Desktop

Desktop experiences use free-form windows that adapt across breakpoints.

People can use split screens, floating windows, and free-form windows for multi-tasking.

A tablet can convert to a desktop experience when a physical keyboard and mouse are connected. Similarly, Android mobile devices can transition into a desktop-like environment when connected to an external monitor.

[Image: 2 desktop layouts adapted to large and medium breakpoints.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3w5izv-02.png?alt=media&token=49610536-6345-47a0-a231-7bc5c57d44ad)

_A desktop layout can adjust from three to two columns to fit a medium breakpoint_

##### Spatial

Extended reality (XR) experiences use multiple free-form windows within virtually limitless screens. Immersive modes, such as Android XR’s full space (https://developer.android.com/design/ui/xr/guides/foundations), allow components to be positioned freely in 3D space.

More on XR design (https://m3.material.io/m3/pages/xr-design)

[Image: An XR layout inimmersive full space mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3wl9n4-03.png?alt=media&token=71b00525-bfa6-4796-9f01-8fc05e966f15)

_In an XR full space layout, a navigation rail can become an orbiter, and float to the side of the main pane_

#### Adaptive layouts

The Material 3 adaptive system uses panes and breakpoints to organize content into adaptive layouts.

Panes are the building blocks of layout; a pane is a single destination in the product. For example, in a messaging app, the list of messages is one pane, and and a specific conversation thread is another.

[Image: Mobile and tablet in portrait layout with 1 pane. Tablet in landscape layout with 2 panes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3wz2eh-04.png?alt=media&token=37210793-f4fe-4412-860b-9a45ad6a45be)

_Panes are the primary segments of a layout, and can change based on context_

As the pane or window resizes—or as someone navigates a product—panes may change size, enter and exit the screen, and reorganize themselves to make the experience more usable or easier to navigate. These patterns are called adaptive strategies. Material has three adaptive strategies that create a cohesive experience across breakpoints: show and hide (https://m3.material.io/m3/pages/scaffold/panes#bbe68948-bc05-4f7c-b870-6254439e4fd8), levitate (https://m3.material.io/m3/pages/scaffold/panes#96bf71b8-04b8-4fff-97c7-9bc782fbf401), and reflow (https://m3.material.io/m3/pages/scaffold/panes#e0a573e9-8c62-4772-8d81-47955ff83196).

[Image: A foldable open screen with 2 co-planar panes displayed side by side.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3xrm51-Placeholder.png?alt=media&token=0434aa91-113d-454e-bf02-6029ad242814)

_Co-planar: Panes are displayed side by side_

[Image: A foldable open screen with a floating pane displayed above other elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3xtdfv-Placeholder%20(1).png?alt=media&token=5825b45f-fde6-46a5-a345-946dcadef428)

_Floating: A pane is displayed above other panes or content, like a dialog_

[Image: A foldable open screen with a docked pane to the bottom of the screen displayed above other elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3xuwp5-Placeholder%20(Cmd%2BV%20to%20replace).png?alt=media&token=cb3ac17e-eb33-48f7-9297-1bee14918ffe)

_Docked: A pane is displayed above other panes and one of its edges extends beyond one side of the screen, like a bottom sheet_

In Compose, the Navigation 3 (https://developer.android.com/guide/navigation/navigation-3) library allows multiple destinations to be shown on screen at the same time, and enables layouts to adapt seamlessly across window sizes and screens.

[Video: A video demonstrating how navigation destinations remain consistent across screen sizes using the Navigation 3 library.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsz6rtgu-Layout%20-%20Adaptive%20Design%20-%20IA%20-%20v01.mp4?alt=media&token=7c47d5ad-bb46-4951-a9c5-a92b431b1375)

_Navigation destinations remain consistent regardless of screen sizes with Navigation 3_

##### Adapting components

Components can adapt in appearance, placement, and behavior based on factors like:

- 

Where components are placed in relation to their containers, content, and pane boundaries
- 

How components use space
- 

How components enable usage across different device and input types

Most Material components respond using three main strategies: resizing, showing and hiding, and presentation changes.

###### Resizing

Components should resize in response to their content and their placement in a layout.

For example, buttons may scale along with their parent container, or hug their contents and maintain a left or right alignment.

[Image: A card with a button that spans the full width, and a card with a button that’s start-aligned and hugs its contents.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3xf0z5-05.png?alt=media&token=e3bbf0fb-d15b-48d1-b2f8-4962085f22e9)

_Buttons can hug their contents or span their containers based on context_

###### Showing & hiding

Components should show and hide information, or collapse and expand to selectively reveal content that best suits the space.

For example, list items may reveal descriptions or other additional information as their parent container scales.

[Image: A list on mobile and on tablet. List items show additional text on tablet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3xgph2-06.png?alt=media&token=78670577-b953-454b-b7c5-4f667f748970)

_List items can reveal more text on a tablet_

###### Presentation changes

Presentation changes include the orientation of elements and changes to specific properties, like color, type, and shape.

Components can also change configurations. For example, when a window size increases, a FAB can change to an extended FAB, and navigation rails can be automatically expanded.

[Image: A large desktop window with an extended FAB. A smaller window shows a standard FAB.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3xiwiu-07.png?alt=media&token=e55520df-a90f-4ef3-af75-8d269ee6a97d)

_The extended FAB can change to a standard FAB when the window is smaller_
