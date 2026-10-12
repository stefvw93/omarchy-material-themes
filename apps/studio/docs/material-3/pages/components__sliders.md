# Sliders

Source: <https://m3.material.io/components/sliders> (content version 2026-09-23_06-10-05, page updated 2026-07-17T07:13:18.037Z)

## Overview

- 

Three variants: Standard, centered, range
- 

Has five sizes, vertical and horizontal orientation, and an optional inset icon
- 

Sliders should present the full range of available values
- 

The slider value should take effect immediately

[Video: A vertical slider changes the brightness of bedroom lights.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7ll9aj1-GM3_Expressive_Slider_Overview_01_IA_V01.mp4?alt=media&token=e9b46e6a-d3c9-4b05-bcec-725447cda4e6)

_Sliders change values along a range_

#### Availability & resources

#### M3 Expressive update

**May 2025**

The slider includes expressive configurations for orientation, shape sizes, and an inset icon. More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

Updated on Android Views (MDC-Android) and Jetpack Compose.

Variants and naming: 

- 

Changed **continuous** slider to **standard** slider
- 

The **discrete** slider is now the **stops** configuration

New configurations: 

- 

Orientation: Horizontal, vertical
- 

Optional inset icon (standard slider only)
- 

Sizes: XS (existing default), S, M, L, XL

[Image: 3 M3 Expressive sliders.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lii3kv-02.png?alt=media&token=315a4297-8491-4398-9ceb-ee02c42bce76)

_1. Standard slider
2. Centered slider
3. Range slider_

#### Previous updates

##### Visual refresh to improve non-text contrast

**Dec 2023:** Updated on Android Views (MDC-Android) and Jetpack Compose.

- 

**Configuration:** Added centered configuration and range selection
- 

**Shape: **New shape for slider tracks and handles. Slider elements change shape when selected.
- 

**Motion:** Slider handle adjusts width upon selection. Slider tracks adjust in shape when sliding to the edge.
- 

**Color: **Refreshed color mappings

[Image: M3 visually-refreshed slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lirx37-03.png?alt=media&token=938a41c7-a272-4f54-b226-a138dbc77dbd)

_M3 visual refresh: Sliders have a stop indicator, larger label text, and a vertical handle that narrows when pressed. Centered sliders start from the middle instead of the leading edge._

#### Differences from M2

- **Color**: New color mappings and compatibility with dynamic color

[Image: M2 slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7livqfr-04.png?alt=media&token=04f22602-6e80-4772-84e6-e36473774b80)

_M2: Sliders have a circular handle and a small label when pressed_

[Image: Original M3 slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7liwct9-05.png?alt=media&token=92017b6d-1e41-4639-9a31-6e78d744afe0)

_M3: Sliders have new color mappings and support dynamic color_

## Specs

#### Variants

[Image: 3 variants of sliders.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6a7kht-01-3P.png?alt=media&token=1f16d3a6-fc72-447e-83d7-ef38b37ff8fd)

_1. 

Standard
2. 

Centered
3. 

Range_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Standard | Available as “continuous” slider | Available |
| Centered | Available (web only) | Available |
| Range | Available | Available |
| Discrete | Available | Available as “stops” configuration |

#### Configurations

[Image: Orientation and size configurations of sliders.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6a86b2-02-3P.png?alt=media&token=fbacd23b-0918-427c-9803-cd4c7050ed9f)

_1. Orientation: Horizontal, vertical
2. Size: XS, S, M, L, XL_

[Image: Optional anatomy configurations of sliders.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6a8q7u-03-3P.png?alt=media&token=799e249c-9c5f-496b-b4ce-ef9b61ae2466)

_1. Inset icon
2. Stops 
3. Value indicator_

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Inset icon | No (default) | Available | Available |
| Yes | -- | Available |  |
| Orientation | Horizontal (default) | Available | Available |
| Vertical | -- | Available |  |
| Size | XS (default) | Available | Available |
| S, M, L, XL | -- | Available on Android Views (MDC-Android). Available as tokens on other platforms.* |  |
| Stop indicators | No (default), Yes | Available as “discrete” slider | Available |
| Value Indicator | No (default), Yes | Available | Available |

*Configurations only available using tokens don’t have implemented presets in code. To change the size, swap the default size tokens md.comp.slider.**xsmall**.[...] with those of the desired size.

#### Tokens & specs

Slider tokens are organized into a common token set, and token sets for each size. Switch token sets from the table’s menu. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.0045edb815f2325e.md]

#### Anatomy

[Image: 6 elements of a slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6a99lg-04-3p.png?alt=media&token=c1f10fb4-9cb1-4093-8305-6d3df903a22d)

_1. Value indicator (optional)
2. Stop indicators (optional)
3. Active track
4. Handle
5. Inactive track
6. Inset icon (optional)_

#### Color

[Image: 9 color roles of a slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6aa21o-05-3P.png?alt=media&token=d3fe982f-6f76-4973-aaf6-aa65a59956d3)

_Slider color roles used for light and dark schemes:

1. Inverse surface
2. Inverse on surface
3. Primary
4. On primary
5. Primary
6. Secondary container
7. On secondary container
8. On secondary container
9. On primary_

#### States

[Image: 5 states of sliders in light and dark schemes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6aaode-06-3P.png?alt=media&token=5b594eb5-38dd-45e4-a53e-2a976e720a09)

_1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed_

#### Measurements

[Image: Common slider padding and size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6abaty-07-3P.png?alt=media&token=ecddf256-7f72-45c7-a4b2-64a91b405704)

_Padding and size measurements for common sliders_

[Image: Slider padding and size measurements at each size configuration, XS to XL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma6absmo-07-3P.png?alt=media&token=e564d492-18b4-45d1-8efe-a62a5278e577)

_Padding and size measurements for XS, S, M, L, and XL sliders_

| Attribute | XS | S | M | L | XL |
| --- | --- | --- | --- | --- | --- |
| Track height | 16dp | 24dp | 40dp | 56dp | 96dp |
| Label container height | 44dp |  |  |  |  |
| Label container width | 48dp |  |  |  |  |
| Handle height | 44dp | 44dp | 52dp | 68dp | 108dp |
| Handle width | 4dp |  |  |  |  |
| Track shape | 8dp | 8dp | 12dp | 16dp | 28dp |
| Inset icon size | -- | -- | 24dp | 24dp | 32dp |

## Guidelines

[Video: Photo editor with sliders labeled pop, sharpen, and denoise being adjusted.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7m4gc9t-slider%20motion.mp4?alt=media&token=95c022a4-1968-4b5a-9175-2407bbf7fe20)

_Sliders can adjust values in real time, such as image attributes_

#### Usage

Sliders are used to select values along a track. They’re ideal for adjusting settings such as volume and brightness, or changing the intensity of image filters.

Sliders can use icons or labels to represent a numeric or relative scale.

[Image: Sound settings screen with continuous sliders labeled call volume and alarm volume.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmabg8tbj-02.png?alt=media&token=ada3febd-596c-46d4-ae20-0aa3b4228c1e)

_Use sliders to pick a value from a range, like volume loudness_

Changes made with sliders must take effect immediately, so people can understand the effects of their selection as they're moving the slider.

[Video: The brightness slider changes the screen’s brightness in real time.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7llbz94-GM3_Expressive_Slider_guideline_3b_IA_V02%20.mp4?alt=media&token=134b459d-b198-4115-8188-1321d56605a5)

_Selection changes are immediate_

There are three different variants of sliders: **standard**, **centered**, and **range:**

Standard sliders select one value from a range of values. Use this when the slider should start from zero or the beginning of a sequence.

[Image: Horizontal standard slider with an end stop indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lk01w5-04.png?alt=media&token=6cd6a040-a82f-4ef7-8d4b-badc8c6eb27b)

_Horizontal standard slider_

[Image: Vertical standard slider with an end stop indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lk1j0t-05.png?alt=media&token=3b884058-21ca-4d72-ba5e-5afdb59fa01e)

_Vertical standard slider_

Centered sliders select a value from a positive and negative value range. Use this when zero, or the default value, is in the middle of the range.

[Image: Horizontal centered slider with a negative value and visible stop indicators at each end.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lk3lyv-06.png?alt=media&token=eeb21a3d-5711-46a4-8751-5995fadab337)

_Horizontal centered slider_

[Image: Vertical centered slider with a negative value and visible stop indicators at each end.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lk4tsn-07.png?alt=media&token=55d86dc7-7b06-47fa-9d1a-7ae9dff73c91)

_Vertical centered slider_

Range sliders select two values on one slider to create a range. Use this when defining a minimum and maximum value.

Avoid using range sliders vertically, as this can add too much cognitive load. People are used to most sliders being horizontal.

[Image: Horizontal range selection slider with 2 values selected, and a stop indicator at each end.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lk6981-08.png?alt=media&token=67bf8680-0cc1-4109-aee0-b50e319a3ae9)

_Horizontal range slider_

[Image: Vertical range slider with 2 values selected, and a stop indicator at each end.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7ln45vm-09%20-%20don't.png?alt=media&token=bb49eedd-2d76-45c9-99ab-8e9be6103673)

_Because of the additional cognitive load of a range slider, avoid using it in vertical orientation._

#### Anatomy

[Image: 6 elements of a slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7m553sk-04-1.png?alt=media&token=03f97ae2-c5e8-41b8-8416-ba8201534a1b)

_1. Value indicator (optional)
2. Stop indicators (optional)
3. Active track
4. Handle
5. Inactive track
6. Inset icon (optional)_

##### Track

The track shows the full range of values that can be selected on the slider. It has two sections: active and inactive.

- The **active **section of the track is from the minimum value to the handle. For range sliders, the active track is between the two handles.
- The **inactive** section of the track is from the handle to the maximum value, or outside the two handles of a range slider.

For left-to-right (LTR) languages, the values increase from left to right. For right-to-left (RTL) languages, this is reversed.

[Image: Sliders for font size and display size with stop indicators along the track.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lk9dsb-11.png?alt=media&token=ac3c7b80-ec76-498e-931e-6f6b573be9c6)

_The track on a slider shows the available range_

##### Handle

The handle can be moved along the track to choose a value.

When sliders have two handles, the handles choose the minimum and maximum values in a range.

The handle changes shape to indicate when it’s pressed.

[Image: The handle is a vertical line on the current value of the slider. It shrinks in width when selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkaurk-12.png?alt=media&token=8ee46da2-b5f5-4990-a851-44f5acaadba6)

_A handle changes shape when it's being pressed or dragged_

[Image: 2 unselected handles on a slider with range selection.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkbdhm-13.png?alt=media&token=bc2bb7bf-9f18-4ff2-988b-34a85bdc8084)

_Two handles are used for sliders with range selection_

#### Configurations

##### Value

The value displays the specific value that corresponds with the handle’s placement. 

A value appears when interacting with the corresponding handle. For range sliders, only one value should be shown at a time.

If the value is shown elsewhere, the indicator is not required.

[Image: A value of 50 is above a slider handle in the middle of the track.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1s2vu5-13.png?alt=media&token=94e8f2b1-9fac-4303-ab60-acb9e7a32bd9)

_A value can appear while the handle is being pressed or dragged_

[Image: A value of 75 is above the pressed range slider handle. The unselected slider doesn’t show the value.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkclo7-14.png?alt=media&token=68ab779d-bed3-4d20-a2fb-e9f742ee269c)

_For range sliders, the value only appears on one handle at a time_

Instead of showing the built-in value label, a separate text input field can be added outside of the slider. If this is added, the slider and value in this text field should automatically update to match each other.

Make sure people can tab to the text field directly after the slider.

[Video: Navigating to an adjacent text label, changing the value to 100 using arrow keys. The slider auto-updates based on input value.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tgm3i-GM3-Components-Sliders-3-v01.mp4?alt=media&token=ff66bc1d-5841-4740-a9b0-d73fae991edb)

_Use **Tab** to navigate to values that are shown outside the slider, like a text input field_

##### Stop indicators

Stop indicators show which predetermined values can be chosen on the slider. The slider handle snaps to the closest stop. 

Avoid having too many stop indicators on a slider, because it can become visually crowded and difficult to adjust the value.

All sliders have stops at the end of the inactive track to ensure at least a 3:1 contrast with the background. If the inactive track has this level of contrast already, the end stops can be removed.

[Image: Stop indicators are equally spaced out on a slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1s1ozg-10.png?alt=media&token=313ed48c-5478-4e59-9e89-4baf04fa38fd)

_Stop indicators show each available value on a slider_

Icons or text can be added outside the slider to indicate the range of values and make the slider more accessible. This can be used instead of a stop indicator.

[Image: Plus and minus icons on each end of the slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkfou6-17.png?alt=media&token=1a441aac-51d1-452b-8a1a-ec87e9f5dafd)

_Plus and minus icons, or text, can be added to the left and right of the slider_

##### Orientation

Sliders can be oriented either horizontally or vertically, depending on what is best for your use case.

[Image: Horizontal slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkhuu1-18.png?alt=media&token=9195aa36-4723-4ce8-91c3-c74694c2824e)

_Standard slider in horizontal orientation_

[Image: Vertical slider. Zero is at the bottom.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkj1b8-19.png?alt=media&token=09bb620d-8745-48b4-8b03-34cbdc78d9a2)

_Standard slider in vertical orientation_

##### Inset icon

Standard sliders that are M, L, or XL can include an icon within the track. This icon should illustrate what the slider controls. Avoid adding inset icons to XS or S sliders.

When there’s not enough space for the icon on the active track, like at a low value, the icon moves to the inactive track.

Consider swapping which icon is displayed at zero, like a volume icon becoming a mute icon.

[Image: Inset icon on the active track when the handle is at 50%, and on the inactive track when the handle is at 0.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkmte8-20.png?alt=media&token=fef6e46e-5b1c-42fe-bf92-904ef3d1611a)

_Inset icons change placement based on the handle_

[Image: An inset icon on an XS slider. The icon bounds are cut off by the slider container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lni1k4-21%20-%20don't.png?alt=media&token=f36c7b22-9cce-489e-a73e-42d3a6dcae59)

_Don’t use an inset icon with sliders that have track thicknesses under 40dp_

Don’t use inset icons on centered or range sliders. It makes it unclear where the start of the slider is.

[Image: Centered slider with an inset icon on one end, and a stop indicator on the other.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lnlfie-22%20-%20don't.png?alt=media&token=2deb8b76-5ccd-4412-81ba-a098a903d102)

_Don’t use an inset icon on a centered slider_

[Image: Range slider with an inset icon on one end, and a stop indicator on the other.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lnor7e-23%20-%20don't.png?alt=media&token=6de66860-09fe-425f-b6b9-c6aa960411cc)

_Don’t use an inset icon on a range slider_

##### Size

Sliders come in different sizes: XS, S, M, L, and XL. Use larger sizes to increase the targets and provide a larger visual emphasis.

The active and inactive tracks should always be the same size.

[Image: 5 sizes of sliders.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkolpk-24.png?alt=media&token=f87a9fd7-2914-4706-bcce-9edf4814fbc1)

_1. XS: 16dp
2. S: 24dp
3. M: 40dp
4. L: 56dp
5. XL: 96dp_

XL sliders should be reserved for hero moments, where the slider itself is the most important element on the page.

[Image: An XL slider used to adjust living room temperature on mobile. No other controls are on screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7lkr4j4-25.png?alt=media&token=e382cedc-e5ef-4cd5-9fd8-eb0dd4b0e729)

_XL sliders should be the focus of the page_

#### Behaviors

##### Select & drag

Select a value by dragging the handle.

[Video: Slider handle moves smoothly. The value increases and decreases by single digits.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tddmn-GM3-Components-Sliders-4-1-v01.mp4?alt=media&token=17272aa8-8278-45d0-82b0-8de39ccde83b)

_**Standard slider**: The handle drags smoothly_

[Video: Slider handle snaps to the nearest multiple of 10 when moved.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tdv5o-GM3-Components-Sliders-4-2-v01.mp4?alt=media&token=387283e5-b7ce-4ee2-b8d6-58f88d0a8af2)

_**Slider with stop indicators:** The handle snaps to the closest stop indicator while dragged_

##### Select jump

Select a value by selecting part of the track.

[Video: Slider handle moves smoothly to selected value of the slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tec5h-GM3-Components-Sliders-5-1-v01.mp4?alt=media&token=ed186b3e-0cc8-4875-a2b7-c541130754e2)

_**Standard slider**: The handle moves to the selected location_

[Video: Slider handle moves smoothly to the closest stop indicator value.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tep43-GM3-Components-Sliders-5-2-v01.mp4?alt=media&token=f31f5f31-9bcd-4b8c-be5d-eb2b8268e0ba)

_**Slider with stop indicators:** The handle moves to the closest stop indicator_

##### Select & arrow

Select a value using the keyboard.

**Tab:** Focus lands on handle 

**Arrows: **Selected value increases or decreases by one value or stop indicator

**Space & arrows:** Selected value increases or decreases by a larger interval or stop indicator

[Video: Tab selects the slider, and arrow keys move the value by 1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tf2t6-GM3-Components-Sliders-6-1-v01.mp4?alt=media&token=ac491860-373d-4f82-a5c0-8b49514e8521)

_**Standard slider**: The handle moves one value_

[Video: Tab selects the slider, and arrow keys move the value by 10.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tffc3-GM3-Components-Sliders-6-2-v01.mp4?alt=media&token=ea5e3c11-2f1c-47ea-99ed-d688be210ad2)

_**Slider with stop indicators: **The handle moves to the next stop indicator_

## Accessibility

#### Use cases

People should be able to do the following using assistive technology:

- Navigate to a slider 
- Select a range by controlling a handle along a track
- Get appropriate feedback based on input type

#### Interaction & style

The slider handle shrinks in width and the value appears to provide a visual cue to the user that the handle is being pressed.

**Touch**

When tapped or dragged, the handle width shrinks to provide interaction feedback, and the value appears.

**Cursor**

When hovered, the cursor changes. When clicked and dragged, the handle width shrinks, and the value appears.

[Video: Dragging a slider using a mouse cursor and by touch. Handle width shrinks when dragged.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tjccg-GM3-Components-accessibility-Sliders-1-v01_1.mp4?alt=media&token=1f2cb7c0-7e6c-4add-a536-e35a15ee94ce)

_The slider handle changes width during interaction_

##### Focus and navigation

Initial focus lands directly on the handle, since it’s the primary interactive element of the slider.

The slider value can then be adjusted using the arrow keys or other keyboard navigation options.

[Video: Using keyboard navigation on a slider. Tab to the handle, and use arrow keys to change the value.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2tk5qd-GM3-Components-accessibility-Sliders-2-v01.mp4?alt=media&token=7eb948e5-7fa9-47aa-b899-1b05f65b51db)

_Use arrow keys to change the slider value_

#### Color contrast

Use visual anchors so the end of the slider’s inactive track has at least 3:1 contrast with the background. The stop indicator makes the end easily visible on most backgrounds.

[Image: The inactive track has contrast below 3:1 with the background. The stop indicator is above 3:1. Slider is accessible.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1s6sg3-3.png?alt=media&token=fe50b51b-a15f-496e-b0ff-7b65ef7598f4)

_A stop indicator on the inactive track makes it easier to identify the end of the slider on a low-contrast background_

Alternatively, icons or other elements that have a 3:1 contrast with the background can be used to indicate the ends of the slider’s inactive track.

[Image: The inactive track has contrast ratio below 3:1 with the background. The icon is above 3:1. The slider is accessible.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx1s73wl-4.png?alt=media&token=f00826a6-95c4-46d0-aa63-2da4e4b7759c)

_Icons make it easier to identify the ends of the slider on a low-contrast background_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Tab | Moves focus to the slider handle |
| Arrows | Increase and decrease the value by one value or one stop indicator |
| Space & Arrows | Increase and decrease the value by one interval or one stop indicator |
| Home or End | Set the slider to the first and last values on the slider |

#### Labeling elements

The accessibility label for a slider is typically the same as the slider's adjacent text label. It should have the **slider** role.

[Image: Annotated aria tags of a slider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0o6wp1l-5.png?alt=media&token=99be26c8-7f4d-4336-8b83-f50fbf4f56b3)

_A slider’s accessibility label should match the adjacent UI text_

If the UI text is correctly linked to the slider, assistive tech (such as a screenreader) will read the UI text followed by the component’s role.

[Image: Annotated aria tags of a slider with stepper icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm3601h6w-6.png?alt=media&token=9855912f-4437-40d5-aa5a-6662501a6d06)

_Icon buttons placed outside the slider should have the button role_
