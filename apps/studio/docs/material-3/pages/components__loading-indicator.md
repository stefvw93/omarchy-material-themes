# Loading indicator

Source: <https://m3.material.io/components/loading-indicator> (content version 2026-09-23_06-10-05, page updated 2026-07-29T13:35:08.589Z)

## Overview

- 

Recommended as a replacement for indeterminate circular progress indicators
- 

Always reflect an ongoing process and are never simply decorative
- 

Used for pull-to-refresh interactions
- 

Not used for processes that transition from indeterminate to determinate  
- 

Capture attention through motion

[Video: A looping sequence of morphs between 7 different shapes in a darker color, sitting on a circular background container in lighter color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fcl84h-Loading-Indicator-Overview-A-Sync.mp4?alt=media&token=d75aa987-4751-44cf-8013-2db500096066)

_1. Loading indicator

2. Contained loading indicator_

#### Availability & resources

#### M3 Expressive update

**May 2025**

The loading indicator is designed to show progress that loads in under five seconds. It should replace most uses of the indeterminate circular progress indicator. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

New component added to catalog.

Loading indicators:

- Are used in pull-to-refresh functionality

- Can be contained or uncontained

- Use shape and motion to capture attention

- Can scale in size

[Video: Loading indicator in news app with pull-to-refresh.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fcq8u9-Loading-Indicator-Overview-B.mp4?alt=media&token=e6966a82-22f1-46ac-82c8-2597e2815244)

_Loading indicators are used in the pull-to-refresh behavior_

## Specs

#### Variants

[Image: 2 elements of a loading indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6gd1jj-1-3P.png?alt=media&token=562f343f-e70c-45a8-bb18-0c86c1f8f300)

_1. Loading indicator_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Loading indicator | -- | Available |

#### Configurations

[Image: 2 configurations of loading indicators.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6gdew8-2-3P.png?alt=media&token=99bc7884-a3c5-4ad5-aca7-dd2513b1aff2)

_1. Default

2. Contained_

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Containment | Default | -- | Available |
| Contained | -- | Available |  |

#### Tokens & specs

Loading indicators have a single token set.

[Token table: see ../tokens/TOKEN_TABLE.68895be451a51c31.md]

#### Anatomy

[Image: 2 elements of a loading indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6ge8q8-3-3P.png?alt=media&token=73e297a0-6023-4493-a402-55ed8be14d94)

_1. Active indicator

2. Container_

#### Color

##### Default

Color values are implemented through design tokens. For designers, this means working with color values that correspond with tokens; in implementation, a color value will be a token that references a value.

[Image: 2 color roles of a loading progress indicator in light and dark themes.: the active indicator is primary and the container is secondary container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6geonn-4-3P.png?alt=media&token=20bf0764-7c45-481a-80fc-4b3e07bc0414)

_Loading indicator color roles used for light and dark schemes:

1. Primary_

##### Contained

[Image: 2 color roles of a loading progress indicator in light and dark themes. The active indicator is primary and the container is secondary container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6gf51h-5-3P.png?alt=media&token=7883ee05-b32e-4a72-952e-39a6ed705318)

_Contained loading indicator color roles used for light and dark schemes:

1. On primary container

2. Primary container_

#### Measurements

[Image: Loading progress indicator measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6gfgvp-6-3P.png?alt=media&token=a0a3c6be-ecd7-4240-ab28-436996abdc95)

_To ensure sufficient margins, the size is 48dp while the shape container is 38dp_

## Guidelines

[Video: Loading indicator on media player.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm41ke7ak-Loading_Indicator-A2.mp4?alt=media&token=a51cc2aa-021c-45b2-9f2d-91b17028f8ea)

_Loading indicators are best for indicating a short, indeterminate wait time_

#### Usage

Loading indicators use animation to grab attention, mitigate perceived latency, and indicate that an activity is in progress.

They should be used when progress isn’t detectable, or when it’s not necessary to indicate how long an activity will take.

While similar in function to circular progress indicators, loading indicators are a better alternative for short processes between 200ms and 5s.

[Video: Loading indicator in loading state with “Getting your device ready...”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fd0ml7-Loading_Indicator-B.mp4?alt=media&token=248b57ba-2102-40d2-9a0f-6e641bdb1e2b)

_Use a loading indicator when a background process is running_

Choose a loading or progress indicator that corresponds to the expected wait time and type of process. 

If the wait is very long, consider allowing users to navigate away from the page while the process finishes up.

| Expected wait time | Recommendation |
| --- | --- |
| Instant (under 200ms) | No indicator |
| Short (between 200ms and 5s) | Loading indicator |
| Long (Over 5s) | Progress indicator |

[Video: Content appearing on a screen quickly without a loading indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fd16y4-Loading_Indicator-C.mp4?alt=media&token=8c647d41-5e0b-4bfb-8dc9-612bbb314b88)

_**Instant (under 200ms):** Display the content immediately_

[Video: Content appearing on a screen with a slight lag and a loading indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fd1o64-Loading_Indicator-D.mp4?alt=media&token=f3dcfd0c-3686-4f8d-8362-bd5508ba3810)

_**Short (between 200ms and 5s):** Use a loading indicator_

[Video: Content appearing on a screen with a long lag and a progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fd27h6-Loading-Indicator-E.mp4?alt=media&token=cf468481-8c76-4fea-9358-928e6ad88ada)

_**Long (over 5s):** Use a progress indicator_

When a process can transition from indeterminate (unknown progress) to determinate (known remaining progress), transition between the corresponding progress indicators. 

Don’t transition a loading indicator into a progress indicator.

[Video: A screen transitioning from an indeterminate progress indicator to a determinate progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm5l84tah-Loading-Indicator-F3.mp4?alt=media&token=a87feb93-a4a9-4a13-ba52-86f0ac7d4509)

_Transition from an indeterminate progress indicator to a determinate progress indicator_

[Video: A screen transitioning from a loading indicator to a determinate progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm5l855gf-Loading-Indicator-G2.mp4?alt=media&token=4b0b72b8-3a3f-4587-90a5-68bd72ff0f84)

_Avoid transitioning from a loading indicator to a determinate progress indicator_

#### Anatomy

[Image: 2 parts of an active indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0cads86-7.png?alt=media&token=f27080ab-ebe2-410d-baa6-b0bc04ca5734)

_1. Active indicator

2. Container (optional)_

##### Active indicator

The active indicator is a looping shape morph sequence composed of seven unique Material 3 shapes.

More about the Material shape library (https://m3.material.io/m3/pages/shape/overview-principles#579dd4ba-39f3-4e60-bd9b-1d97ed6ef1bf)

[Image: Active indicator with shape morph.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0cafeiy-8.png?alt=media&token=bdcb1b69-8492-4871-b07b-2449155b0d42)

_The active indicator morphs shape to capture attention_

##### Container (optional)

When the container is visible, the active indicator should change color from **primary** to **on-primary-container**.

The container should be visible when the loading indicator is placed over other content. This helps it stand out better by giving it a stronger contrast. It’s not needed when the loading indicator is placed directly on a surface.

The container should be used with pull-to-refresh behavior.

[Image: Active indicator with container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0caha9b-9.png?alt=media&token=b9bf2aaa-19dd-4aa4-80f7-0484809b74dd)

_The container is a circle that provides extra contrast from body content_

#### Placement

While loading a page or container, the loading indicator should be centered on the element.

[Video: Active indicator with shape morph centered on a screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm41keuij-Loading-Indicator-H2.mp4?alt=media&token=eaa07c47-edab-44de-b221-edbf375c74b5)

_Center the loading indicator in the middle of the page or container_

When loading more items on a page with existing content, place the loading indicator in the empty space where the new content will appear. Avoid overlapping existing content.

[Video: Loading indicator with shape morph underneath photos in a photo app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fd4yi5-Loading-Indicator-I.mp4?alt=media&token=03c01309-62fa-44eb-957e-bea0b2a9c756)

_Center the loading indicator in the empty space where content will appear_

Loading indicators can be placed within other components, such as buttons, to indicate that the action is ongoing, such as validating a form or checking for updates.

[Video: Loading indicator in a button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fd5yv7-Loading-Indicator-J.mp4?alt=media&token=1a28be36-4f94-4cf9-9326-90a95f8e8bc3)

_Loading indicators can be placed in buttons that take a few seconds to take effect_

[Video: Loading indicator as the icon in a tab.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fd65dd-Loading-Indicator-K.mp4?alt=media&token=5f0b5b25-cad7-4c9d-917c-874b115e222f)

_Use loading indicators to show progress without taking up much space_

#### Responsive layout

Loading indicators default to 48dp, but the size is flexible. It should be between 24dp to 240dp, depending on the placement and the breakpoint. Avoid exceeding the minimum and maximum sizes.

The ratio between the container and the active indicator stays the same when resizing the loading indicator. 

Reserve very large progress indicators for large and extra-large windows, like desktop.

[Image: Loading indicators can range from 24dps to 240dps.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0caprda-12.png?alt=media&token=ac91d3fa-343a-4bc6-be14-466c85b2086d)

_Loading indicators can range in size from 24–240dp_

##### Larger windows

As the pane or window size grows, consider scaling the loading indicator as well, so it remains proportional in size to the empty space around it. The loading indicator shouldn’t exceed 240dp.

[Video: Loading indicator on mobile and tablet screens.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmbf4z7li-GM3_Expressive_Loading-Indicator_Guidelines_16_IA_v01.mp4?alt=media&token=1cb92c93-d0e0-46ff-bb04-002004298b8d)

_The loading indicator’s default size is ideal for mobile and other compact windows. The loading indicator should scale up in larger windows._

#### Behavior

##### Pull-to-refresh

The loading indicator is used in pull-to-refresh (https://developer.android.com/develop/ui/compose/components/pull-to-refresh) on Jetpack Compose only.

Pull-to-refresh is an Android system feature that manually refreshes screen content with an action or gesture. It’s used at the beginning of lists, grid lists, and card collections where the most recent content appears.

It’s best to use pull-to-refresh with dynamic content that can have frequent updates, where people have a high chance of seeing new content after refreshing.

[Video: A loading indicator can appear above content in pull-to-refresh.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fdewmr-Loading-Indicator-M.mp4?alt=media&token=96be3bee-071b-43bd-9743-60426e0d8d51)

_The loading indicator for pull-to-refresh can appear on top of the content or adjacent to it_

##### Threshold requirements

To ensure intentional usage of the pull-to-refresh gesture, the loading indicator must pass a threshold before the app will refresh.

[Video: Loading indicator with screen refresh after threshold time has passed.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fdfatx-Loading-Indicator-N.mp4?alt=media&token=8eb649d6-d2ac-4522-ab8b-9af9256cdc5b)

_After passing the threshold, completing the gesture initiates a refresh_

[Video: Loading indicator reversed can cancel refresh action.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fdfhyq-Loading-Indicator-O.mp4?alt=media&token=243511a3-b67c-4185-bf31-6780e0f911a6)

_Reversing the gesture past the threshold will cancel the refresh action_

The loading indicator remains visible until the refresh activity completes and any new content is visible, or someone navigates away from the refreshing content.

[Video: A loading indicator at the top of a screen, which appears until content loads.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fdfwxf-Loading-Indicator-P.mp4?alt=media&token=a6bc8b6f-85b8-46c6-bf76-39dcd70b86e4)

_Keep the loading indicator in view until the activity is completed to provide status of the refresh activity_

[Video: A loading indicator that scrolls off screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fdg3wa-Loading-Indicator-Q.mp4?alt=media&token=25ad40f1-6732-449a-9c50-53b64845fd9d)

_Don’t scroll the loading indicator off-screen, as it hides the status of the refresh activity. It could imply that the refresh activity is associated with a specific component, such as a card, instead of the entire screen._

## Accessibility

#### Use cases

People should be able to do the following with assistive technology:

- Navigate to the loading indicator
- Understand what progress the indicator is communicating
- Initiate a content refresh without relying on a gesture

#### Interaction & style

The active indicator, which displays progress, provides visual contrast of at least 3:1 against most container and surface colors.

The indicator itself must have 3:1 contrast with the background, but the container does not.

[Image: Loading indicator with 3:1 color contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmagv3srk-1.png?alt=media&token=85fc9e3b-7664-442d-940c-8d7b51cabda4)

_The loading indicator provides visual contrast of at least 3:1 against most background colors_

When integrated into another component, such as a button, make sure that the active indicator provides a visual contrast of at least 3:1 against the other component.

[Image: Loading indicator with correct color contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmaguuv6h-2_do.png?alt=media&token=8821caaf-6d1f-444d-8c96-12753282b334)

_Ensure at least 3:1 contrast between the indicator and the surface it's on_

[Image: Loading indicator with incorrect color contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmaguuziu-3_dont.png?alt=media&token=e8157014-aaa8-47cf-ae70-c8c3b986b36e)

_Avoid using when the contrast is under 3:1_

Pull-to-refresh interactions can’t be accessible by just swiping. Provide an alternate way to refresh the content with a single pointer, such as placing a refresh button in a menu or directly alongside the content.

[Video: Refreshing content initiated by an app bar action.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmbf509tn-GM3_Expressive_Loading-Indicator_Accesibility_16_04_v01.mp4?alt=media&token=2b731444-164e-4a5e-8dfe-b892b6b9dc6f)

_The refresh action can be in an app bar_

#### Labeling elements

Since the loading indicator is a visual cue, it needs an accessibility label to assist people who can't rely on visuals.

It should use the **progress bar** accessibility role. Write a label describing the purpose of the loading indicator, such as **loading news article** or **refreshing page**.

[Image: Loading indicator accessibility label and role.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0cb8rsa-5.png?alt=media&token=a2cd5924-9d13-4657-a26f-b5c6130d0c67)

_Loading indicator labels should explain which items are loading_
