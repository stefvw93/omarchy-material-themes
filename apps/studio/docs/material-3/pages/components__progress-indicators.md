# Progress indicators

Source: <https://m3.material.io/components/progress-indicators> (content version 2026-09-23_06-10-05, page updated 2026-07-29T13:37:52.778Z)

## Overview

- 

Two variants: linear and circular
- 

Use the same configuration for all instances of a process (like loading)
- 

They capture attention through motion
- 

Option to apply a wave to the active track for use cases that would benefit from increased expressiveness

[Image: 8 progress indicators configured to show different thickness and shape.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmleotj2q-01.png?alt=media&token=8d1f2405-86ed-4634-8847-af33a549410d)

_Linear and circular progress indicators have visual configurations for shape and thickness_

#### Availability & resources

#### M3 Expressive update

**Aug 2024**

The progress indicators have configurations for height and wavy shape. Choose the visual style that best fits your product. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

- Track height: Configurable
- Shape: Wavy

[Video: Progress indicators used when loading a page and for processing a payment.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qvxgu6-Progress-Indicator-Overview.mp4?alt=media&token=2131e37c-feab-4c1c-b117-16ad223b0078)

_Progress indicators have a new rounded, colorful style, and more configurations to choose from, including a wavy shape and variable track height_

#### Previous updates

**Dec 2023: Non-text contrast (NTC)**

- Anatomy: Added an end stop indicator to improve accessibility
- Contrast: Higher contrast between track and active indicator to enhance the perception of progress
- Motion: New motion behavior
- Shape: Rounded corners

[Image: GM3 linear and circular progress indicators](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmleov4bo-03.png?alt=media&token=ec54810c-b325-4dd1-a547-b66d15d3b260)

_Progress indicators have a new rounded, colorful style_

#### Differences from M2

**July 2022: Added to Material 3**

- **Color:** New color mappings and compatibility with dynamic color

[Image: M2 linear and circular progress indicators.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c2if7i-04.png?alt=media&token=2cccabb4-c40c-4db4-9321-51c34cae3d25)

_M2: Progress indicators have a boxier, neutral style_

[Image: M3 linear and circular progress indicators.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c2jf26-05.png?alt=media&token=2ee132f7-2c47-46e2-8826-910fbdfe4547)

_M3: Progress indicators are compatible with dynamic color_

## Specs

#### Variants

[Image: 2 variant of progress indicators.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz0082-01-3P.png?alt=media&token=7398f087-5c03-4034-89bf-b5df8884ccf1)

_1. Linear progress indicator
2. Circular progress indicator_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Linear progress indicator | Available | Available |
| Circular progress indicator | Available | Available |

#### Configurations

[Image: 4 configurations of the linear determinate progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz0zuq-02-3P.png?alt=media&token=d3ebb66e-f2a4-4489-83d2-f827a5f54f9c)

_1. Behavior: Determinate and indeterminate
2. Thickness: Default (4dp) and variable
3. Shape: Flat and wavy_

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Behavior | Determinate (default), Indeterminate | Available | Available |
| Track thickness | Fixed (4dp) | Available | Available |
| Configurable | -- | Available |  |
| Shape | Flat (default) | Available | Available |
| Wavy | -- | Available |  |

#### Tokens & specs

Browse the component elements, attributes, tokens, and their values. View baseline tokens (https://m3.material.io/m3/pages/progress-indicators/specs#c6f484b0-2bc6-4d37-bd75-f859a35a3594)

[Token table: see ../tokens/TOKEN_TABLE.6f51f7ab7775a392.md]

#### Anatomy

[Image: 3 elements of a progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz1qik-03-3P.png?alt=media&token=e6f61f40-8a57-4255-82ce-99c8b6c5ac95)

_1. Active indicator
2. Track
3. Stop indicator_

#### Color

[Image: 2 color roles of a linear progress indicator in light and dark themes: the active indicator and stop indicator are primary and the track is secondary container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz2lzv-04-3P.png?alt=media&token=230849fe-6e25-46d1-839f-37a02b0323fb)

_Progress indicator color roles used for light and dark schemes:

1. 

Primary
2. 

Secondary container_

#### Measurements

Wavy indicators use **amplitude** and **wavelength** to determine the shape of the wave. The height is the overall container height.

[Image: Definitions of wave measurements for height and amplitude.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz3iks-05-3P.png?alt=media&token=fbe4684e-a3ce-4635-9b3c-e79a27e62a0f)

_**Amplitude** measures from the center of the resting position to the center of the peak_

[Image: Definitions of wave measurements for wavelength.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz3ss3-06-3P.png?alt=media&token=3eb483c9-5b25-4690-98ee-79b9f571d13e)

_**Wavelength** measures the distance between two adjacent peaks_

[Image: Linear progress indicator measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz4e98-07-3P.png?alt=media&token=9f230cb1-e0e3-4b44-a7ae-dbe345881407)

_Size measurements for linear progress indicators. The thicker variants are provided as sample measurement for makers to adjust the default version based on their use cases._

[Image: Circular progress indicator measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz4zbx-08-3P.png?alt=media&token=09e56fb3-e3bd-4798-b336-a5329bdf7585)

_Size measurements for circular progress indicators. The thicker variants are provided as sample measurement for makers to adjust the default version based on their use cases._

[Image: 4dp padding on the left and right of the linear progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmloz5p1v-09-3P.png?alt=media&token=dc44f577-a8b4-4052-9bf2-e750bbcbc8b9)

_The linear progress indicator is inset from the edge of the screen by 4dp_

#### Baseline tokens

The circular and linear progress indicator had separate token sets. These are no longer recommended.

[Token table: see ../tokens/TOKEN_TABLE.6f51f7ab7775a392.md]

## Guidelines

[Video: Primary colored horizontal line fills a contrasting track from left to right and reaches the end when the app is loaded.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm37ri5xn-Progress-Indicator-A_1.mp4?alt=media&token=12f49d7a-8022-4387-ba18-e01026d196d6)

_Progress indicators communicate the status of an ongoing process_

#### Usage

Use progress indicators to show the status of ongoing processes, such as loading an app, submitting a form, or saving updates.

When multiple items are loading, use a single progress indicator to show progress for the group. Don’t add progress indicators to every activity.

[Video: One progress indicator showing the loading progress for a page of podcasts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0h3mssg-Progress-Indicator-B.mp4?alt=media&token=49cf61f1-00e0-431c-ac53-9f7c366540c7)

_Indicate overall progress of a group of items_

[Video: Two progress indicators showing the loading progress of two podcasts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0h3n5x5-Progress-Indicator-C.mp4?alt=media&token=540710ca-d428-4f87-8099-a891280ffa6f)

_Don’t show the progress of each activity in a group_

Choose a loading or progress indicator that corresponds to the expected wait time and kind of process. 

If the wait is very long, consider allowing people to navigate away from the page while the process finishes up.

| **Expected wait time** | **Recommendation** |
| --- | --- |
| Instant (under 200ms) | No indicator |
| Short (between 200ms and 5s) | Loading indicator |
| Long (Over 5s) | Progress indicator |

[Video: Screen without latency without progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0h3nu79-Progress_Indicator-C.mp4?alt=media&token=1ec2bfd0-5878-4530-8f1a-2ae5d8c21407)

_**Instant (under 200ms):** Display the content immediately_

[Video: Screen with slight lag with loading indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0h3o5um-Progress_Indicator-D.mp4?alt=media&token=d6cf8057-eef7-41e2-b309-49ef255c9e12)

_**Short (between 200ms and 5s):** Use a loading indicator_

[Video: Screen with long lag and progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm37rcxcs-Loading-Indicator-E_2.mp4?alt=media&token=15080baf-7d26-41aa-b6ed-f6e3ac35aab9)

_**Long (over 5s): **Use a progress indicator_

There are two variants of progress indicators:

1. 

Linear
2. 

Circular

**Linear** indicators are best when placed on the edge of a container.

**Circular** indicators are best when centered in an element.

A process should be represented by the same variant of progress indicator throughout the product. For example, if refreshing uses a circular indicator in one place, it should use circular indicators everywhere.

[Image: 1. A primary colored horizontal line fills a contrasting track from left to right. 2. A circle appears from 0 to 360 degrees.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlep5ivu-07.png?alt=media&token=4c51b00b-6b08-4638-a331-1e6340c7d5ea)

_1. Linear indicator  
2. Circular indicator_

Progress indicators behave differently based on the time of progress being tracked:

- **Determinate**: Known progress and wait time
- **Indeterminate**: Unknown progress and wait time

When using a **determinate** indicator, the indicator must accurately represent the progress of what it's measuring. 

Use **indeterminate** indicators to show that a process is happening, but the wait time is unknown.

[Video: Linear and circular progress indicators show both determinate and indeterminate progress.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw0hzu-Progress-Indicator-G.mp4?alt=media&token=22494899-6e26-4535-be27-9e21a1d9b7de)

_1. Determinate progress indicators fill from 0% to 100%
2. Indeterminate progress indicators move along a fixed track, growing and shrinking in size_

As more information about a process becomes available, a progress indicator should change from **indeterminate** to **determinate**.

[Video: On a track, a contrasting primary-colored horizontal line grows and shrinks, then fills it from left to right as app loads.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw2h3o-Progress-Indicator-K.mp4?alt=media&token=20e232fe-707a-4619-b7a6-295516430e93)

_A linear progress indicator changes from indeterminate to determinate while loading a screen_

#### Anatomy

[Video: 1. The track is a horizontal line. 2. A primary colored line over the contrasting colored track is the progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw333o-Progress-Indicator-H.mp4?alt=media&token=f8f9dfed-e386-4c89-9fce-7f3ef92439c7)

_1. Active indicator
2. Track
3. Stop indicator_

##### Active indicator

The active indicator shows the progress that has been made so far. 

In indeterminate processes, it grows and shrinks along the track repeatedly.

[Video: A primary colored horizontal line fills a contrasting line from left to right.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw3uto-Progress-Indicator-I.mp4?alt=media&token=220d7779-79b1-4dc5-a07e-b3aaa5ee2e38)

_Linear indicators animate from the leading to the trailing edge along the track. Circular indicators animate from the top of the track, clockwise by default._

The active indicator appears as soon as progress begins. At low percentages where space is limited, this should appear as a dot to help people understand that there’s progress underway.

[Image: A linear and circular progress indicator at 1% progress, where the active indicator has only just appeared.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlep6b3j-12.png?alt=media&token=8aa71e47-95c1-48b7-9949-1b12b43093f6)

_When progress first begins, the active indicator appears as a dot_

The active indicator has two shape options: **flat** and **wavy**. Use the shape that best fits the product’s tone.

The wavy shape can make longer processes feel less static and is best used when a more expressive style is appropriate.

When using the wavy shape, the overall height of the component changes. At very small sizes, the wavy shape may not be as visible.

[Video: Examples of flat and wavy active indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw4l6g-Progress-Indicator-J.mp4?alt=media&token=f46594f6-6dec-4153-98e5-2684fff598d9)

_Wavy linear indicators increase the height of the overall container_

##### Stop indicator

The stop indicator is a 4dp circle that marks the end of a linear determinate progress indicator to meet Material's accessibility standards.

It's not used for indeterminate or circular progress indicators.

The stop indicator is required if the track has a contrast below 3:1 with its container or the surface behind the container.

[Image: A primary colored horizontal line fills a contrasting line from left to right.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlep7pxt-16.png?alt=media&token=9f8c2fcb-6249-4ff4-bd3c-d8ee67658bf7)

_Use a stop indicator when placing the progress indicator inside a container with low contrast_

[Image: An invisible circular track fills with color from 0 to 360 degrees.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlep87pn-17.png?alt=media&token=c35ef411-e39f-4bc4-abe8-f4372b570d19)

_Only remove the end stop indicator if there's a visual contrast of at least 3:1 with surrounding surfaces_

#### Placement

Place a linear progress indicator along the edge of a container that’s loading. If the container changes shape, place it on the edge that animates. It can also be placed in the middle of a container.

Use a single progress indicator at the top of a page to show progress of the whole group. Don’t add one for every element unless they’re activated independently.

[Video: Progress indicator at top of screen, indicating page content is loading.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw57zf-Progress-Indicator-L.mp4?alt=media&token=7c60ef03-e605-4c80-8259-ef607744c7f5)

_When at the top of a screen, a progress indicator shows that all of the page content is loading_

[Video: Progress indicator on a card, indicating that the card's content is loading.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw6vq0-Progress-Indicator-M.mp4?alt=media&token=870b64b5-6c08-4507-add6-b40864b888d2)

_When attached to a card, a progress indicator shows that just the card content is loading_

[Video: Linear indicator shows the loading progress of a selected news article in a list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm37rivp2-Progress-Indicator-N_1.mp4?alt=media&token=078eb6df-fe3e-4b23-af7e-68bf89206761)

_A progress indicator on the expanding edge of a card shows that the edge may expand to show the loaded content_

Circular progress indicators should be centered directly on the container or page that's loading, such as a button or card.

When loading more items on a page, place the circular progress indicator in the empty space where the new content will appear, not overlapping existing content.

However, if the content does not take long to load, consider using a loading indicator instead.

[Video: As content loads, the screen is blank except for a circular progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw7zgb-Progress-Indicator-O.mp4?alt=media&token=31eeacfa-6698-4f50-b5ad-bfcb1bcb5a69)

_A circular progress indicator can show that the page is loading_

[Video: As container content loads, the container is blank except for a circular progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qw8fla-Progress-Indicator-P.mp4?alt=media&token=6a1386e7-6461-47a1-98ac-703c0ee61b3c)

_A circular progress indicator can show where new items will appear on a page. A loading indicator also works well in this space._

##### Progress indicators in buttons

A circular indicator can be placed in a button to show that the button’s action is currently in progress.

In very small buttons, use the flat shape since the wavy shape is not as visible at that size.

To ensure a minimum 3:1 contrast ratio, change the active indicator color to be the same color as the button’s icon or label text, and remove the track.

[Video: Determinate circular indicator active for 2 seconds after download button is selected, reflecting download progress.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qwbhkm-Progress-Indicator-Q.mp4?alt=media&token=7dd18739-daa4-4e6f-bba1-7b24e0943703)

_Use circular indicators for short, indeterminate activities under 5 seconds_

[Video: Shows idea of indeterminate circular indicators active on multiple buttons as cluttered and confusing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qwbvqt-Progress-Indicator-R.mp4?alt=media&token=4b18b8f4-63f2-4e78-baf8-cc6ef6e4166b)

_Avoid applying progress indicators to every button in a list_

#### Responsive layout

##### Right-to-left languages

Linear progress indicators should be mirrored horizontally for products using right-to-left (RTL) languages. 

Circular progress indicators don’t need to be mirrored.

[Image: Mirrored right-to-left progress indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlep96rs-25.png?alt=media&token=75581f65-e1d4-4ac1-99a3-e8c371691127)

_Linear progress indicators can flow from right to left in right-to-left (RTL) languages_

##### Large screens

Circular progress indicators have flexible sizes. They can range from 24dp to 240dp, depending on the placement and the breakpoint. Avoid exceeding the minimum and maximum sizes.

Reserve very large progress indicators for large and extra-large windows, such as desktop.

[Image: Circular progress indicators can range in size from 24dps to 240dps.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlep9qg1-26.png?alt=media&token=3406dfaa-947f-4dec-8e16-66b6c3da848f)

_The waveform should scale with the size so the proportions look the same across sizes_

Linear progress indicators dynamically adjust to fit the width of the window or element they’re placed within, such as a card. They shouldn’t be used in any elements smaller than 40dp.

The padding on each end should be 4dp minimum, but can be modified.

[Image: Linear progress indicators can dynamically adjust to any width.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlepa8w9-27.png?alt=media&token=b5dada5d-07ab-408a-a520-1eee7956020e)

_The linear progress indicator should always span the width of the UI element it’s placed within_

## Accessibility

#### Use cases

People should be able to do the following using the assistive technology:

- Navigate to the progress indicator
- Understand what progress the indicator is communicating

#### Interaction & style

The active indicator, which displays progress, provides visual contrast of at least 3:1 against most background colors.

[Image: Dark line of progress indicator stands out against the lighter colored track.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlepc1r2-01.png?alt=media&token=db30ced4-ea77-4efd-b2e1-369f42d4961c)

_The progress indicator and stop indicator provide visual contrast of at least 3:1 against most background colors_

When integrated into another component, such as a button, make sure that the active indicator provides visual contrast of at least 3:1 against the other component. 

For the active indicator, use the same color as the label text or icon. The track should be removed.

[Image: Circular indicator on button passes 3 to 1 contrast test.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlepcmau-02.png?alt=media&token=817a604f-513b-4d2b-bce8-576092f29233)

_Ensure the indicator’s color provides at least 3:1 contrast against the surface it's on_

[Image: Circular indicator on button fails 3 to 1 contrast test.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlepd6dk-03.png?alt=media&token=28250ceb-a903-4145-9423-59a609cf5049)

_Avoid using a color below 3:1 contrast_

For linear progress indicators, the stop indicator is required if the track has a contrast below 3:1 with its container or the surface behind the container.

Essentially, the end of the track must be easy to identify.

[Image: Bright container holding the progress bar is on a dark surface, passing the 3:1 color contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlepdozy-04.png?alt=media&token=5c4c02ed-76e6-41bb-9431-d215f1cec071)

_Only remove the stop indicator when the linear progress indicator has at least a 3:1 color contrast with surrounding containers and surfaces_

[Image: Bright container holding progress indicator is on a bright surface, failing the 3:1 color contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlepe18t-05.png?alt=media&token=58f9d951-ddc2-47c4-9ab8-3707bfac503d)

_Avoid removing the stop indicator if any adjacent containers or surfaces are below the 3:1 color contrast_

#### Labeling elements

Since the progress indicator is a visual cue, it needs an accessibility label to describe the kind and amount of progress made.

Use the **progress bar **accessibility role, and write an accessibility label that describes the purpose of the progress indicator. The label should include the process, such as "loading,” and the affected content, such as a page, article, or episode. For example: "Loading news article" or "Refreshing page."

[Image: Determinate linear progress indicator has an accessibility label of “loading news article” and role of “progressbar”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlepereg-06.png?alt=media&token=71630831-8fa7-41a6-acb2-ae63c344ab9f)

_Progress indicator labels should explain which items are loading_

[Image: Indeterminate linear progress indicator has an accessibility label of “loading my episodes” and role of “progressbar.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlepf1vr-07.png?alt=media&token=31415e5b-41fb-4ebe-a455-8ebbc9f47abd)

_A label on an intedeterminate progress indicator on a screen which is loading a set of podcast episodes_
