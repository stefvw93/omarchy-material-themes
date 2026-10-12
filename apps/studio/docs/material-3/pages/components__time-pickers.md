# Time pickers

Source: <https://m3.material.io/components/time-pickers> (content version 2026-09-23_06-10-05, page updated 2026-07-17T07:13:07.343Z)

## Overview

- 

Time pickers are modal and cover the main content
- 

Two variants: dial and input
- 

People can select hours, minutes, or periods of time
- 

Make sure time can easily be selected by hand on a mobile device

[Image: Dial time picker dial and input time picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcyz4dh2-01.png?alt=media&token=726495da-d131-42f3-a766-cd787c29a235)

_1. Time picker dial
2. Time picker input_

#### Availability & resources

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color

[Image: Time picker’s old color mappings. The selected hour of 7 and AM text is purple, on a purple background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcz00a3d-02.png?alt=media&token=195f2e65-d46e-466a-b952-e7cfa9761d48)

_M2: Time pickers had different color mappings_

[Image: Time picker's new color mappings. The selected hour of 7 and AM text is black, with different background colors.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmcz04x96-03.png?alt=media&token=a2f4ba54-7a25-4967-b3d9-bb113e40713e)

_M3: Time pickers have new color mappings compatible with dynamic color_

## Specs

#### Tokens & specs

Select a component variant below to see its elements, attributes, tokens, and their values. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.39f4b152dd9bd292.md]

#### Anatomy

##### Time picker dial

[Image: Diagram indicating the 14 elements of a time picker dial.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmdcxf11n-01-3P.png?alt=media&token=3ecd0554-c896-4456-819b-c56c8313bbf1)

_1. Headline
2. Time selector separator
3. Container
4. Period selector container
5. Period selector label text
6. Clock dial selector center
7. Clock dial selector track
8. Text button
9. Icon button
10. Clock dial selector container
11. Clock dial label text
12. Clock dial container
13. Time selector label text
14. Time selector container_

##### Time picker input

[Image: Diagram indicating the 10 elements of a time picker input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmdcxfokb-02-3P.png?alt=media&token=490ea902-f5a1-434a-bf2c-9013a3b71b07)

_1. Headline
2. Time input field seperator
3. Container
4. Period selector container
5. Period selector label text
6. Text button
7. Icon button
8. Time input field supporting text
9. Time input field label text
10. Time input field container_

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

##### Time picker dial color

[Image: Side-by-side diagram indicating the 17 different color elements of a time picker dial.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fl6nxwe4v-%5B1P%5D%20color-time-pickers%20(1).jpg?alt=media&token=f0bbaf37-d293-45c1-91e2-2d9fe41ace48)

_Time picker dial color roles used for light and dark themes:

1. On surface variant
2. On surface
3. Surface container highest
4. On surface
5. Tertiary container
6. On tertiary container
7. Surface container high
8. Outline
9. On surface
10. Primary
11. On primary
12. Primary
13. On surface variant
14. On surface
15. Surface container highest
16. On primary container
17. Primary container_

##### Time picker input color

[Image: Side-by-side diagram indicating the 13 different color elements of a time picker input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fl6nxy34v-%5B1P%5D%20color-time-input%20(1).jpg?alt=media&token=463baa36-094b-470a-995d-2db6970ab755)

_Time picker input color roles used for light and dark themes:

1. On surface variant
2. On surface
3. Surface container highest
4. On surface
5. Tertiary container
6. On tertiary container
7. Surface container high
8. Outline
9. On surface
10. Primary
11. On surface variant
12. On primary container
13. Primary container_

#### States

[Image: Diagram showing the 4 interactive states of a time picker, in both light theme and dark theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8t5j9hb-5b.png?alt=media&token=841395db-38a8-47d7-86af-8716459b6032)

_1. Enabled
2. Hover

3. Focus

4. Pressed_

States specs can be found in the token module above (https://m3.material.io/m3/pages/time-pickers/specs#2ccd9809-9246-4667-85fa-7747f4ac7349)

#### Measurements

##### Time picker dial - vertical

[Image: Diagram of vertical time picker dial measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fl6p241d2-%5B1P%5D%20layout-time-pickers-vertical%20(1).png?alt=media&token=cf0e2679-196d-4b0f-8b1e-1fb589e239f4)

_Vertical time picker dial padding and size measurements_

| Element | Attribute | Value |
| --- | --- | --- |
| Container | Width | Dynamic |
| Height | Dynamic |  |
| Headline alignment | Left |  |
| Top/bottom padding | 24dp |  |
| Left/right padding | 24dp |  |
| Time selector container | Width | 96dp |
| Width (24h vertical) | 114dp |  |
| Height | 80dp |  |
| Period selector container | Width (vertical layout) | 52dp |
| Height (vertical layout) | 80dp |  |
| Width (horizontal layout) | 216dp |  |
| Height (horizontal layout) | 38dp |  |
| Clock dial container | Size | 256dp |
| Clock dial selector handle | Size | 48dp |
| Clock dial selector center | Size | 8dp |
| Clock dial selector track | Width | 2dp |

##### Time picker dial - horizontal

[Image: Diagram of horizontal time picker dial measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fl6p279e1-%5B1P%5D%20layout-time-pickers-horizontal%20(3).png?alt=media&token=ffeb93b2-0e9b-48d5-9350-36ab567fce0f)

_Horizontal time picker dial padding and size measurements_

| Element | Attribute | Value |
| --- | --- | --- |
| Container | Width | Dynamic |
| Height | Dynamic |  |
| Headline alignment | Left |  |
| Top/bottom padding | 24dp |  |
| Left/right padding | 24dp |  |
| Time selector container | Width | 96dp |
| Width (24h vertical) | 114dp |  |
| Height | 80dp |  |
| Period selector container | Width (vertical layout) | 52dp |
| Height (vertical layout) | 80dp |  |
| Width (horizontal layout) | 216dp |  |
| Height (horizontal layout) | 38dp |  |
| Clock dial container | Size | 256dp |
| Clock dial selector handle | Size | 48dp |
| Clock dial selector center | Size | 8dp |
| Clock dial selector track | Width | 2dp |

##### Time picker input

[Image: Diagram of time picker input measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fl6p28zo3-%5B1P%5D%20layout-time-input%20(1).png?alt=media&token=c1fe856d-0deb-4101-98cf-da76f23414cd)

_Time picker input padding and size measurements_

| Element | Attribute | Value |
| --- | --- | --- |
| Container | Width | Dynamic |
| Height | Dynamic |  |
| Headline alignment | Left |  |
| Top/bottom padding | 24dp |  |
| Left/right padding | 24dp |  |
| Time input field container | Width | 96dp |
| Height | 72dp |  |
| Period selector container | Width | 52dp |
| Height | 72dp |  |

#### Configurations

##### Vertical orientation and horizontal orientation

[Image: Comparing vertical and horizontal time picker dials.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fl7ao2hx2-%5B1P%5D%20guideline-time-pickers-configurations.png?alt=media&token=e43accb7-46d8-4afe-9258-ceffc4f81158)

_1. Vertical layout (default on mobile)

2. Horizontal layout_

##### 24-hour time picker dial

[Image: 2 24-hour time picker dials with vertical and horizontal layouts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fl7ao3ny7-%5B1P%5D%20guideline-time-pickers-configurations-24h.png?alt=media&token=68160ebd-03b8-44d2-8eff-b21bacb9d372)

_1. 24h dial in vertical layout (default on mobile)

2. 24h dial in horizontal layout_

##### 12-hour and 24-hour time picker inputs

[Image: Compare 12-hour and 24-hour time picker inputs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fl7ao513q-%5B1P%5D%20guideline-time-input-configurations.png?alt=media&token=161a6bfb-8df3-4318-bc4c-2af54a37e7ce)

_1. 12h input

2. 24h input_

## Guidelines

[Image: Time picker. It has a dial and keyboard input for hours and minutes, and a setting for AM or PM.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2pwu0i-01.png?alt=media&token=a9c2389d-af1b-43a9-9c96-59e999c31a6c)

_Dial selector time picker for a 12-hour clock_

#### Usage

Time pickers allow people to enter a specific time value. They’re displayed in dialogs and can be used to select hours, minutes, or periods of time.

They can be used for a wide range of scenarios. Common use cases include:

- Setting an alarm
- Scheduling a meeting

Time pickers are not ideal for nuanced or granular time selection, such as milliseconds for a stopwatch application.

[Image: Time picker with dial input selecting hour 7.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2q22nz-02.png?alt=media&token=029a62a3-faff-4ea6-aaff-d5c7e3d0145c)

_Hour selection in a mobile calendar picker_

##### Time input picker

Time input pickers allow people to specify a time using keyboard numbers. This input option should be accessible from any other mobile time picker interface by tapping the keyboard icon.

[Image: Input time picker with keyboard active for the hour.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2q5unb-03.png?alt=media&token=9cbe187b-c1c2-4581-a086-4e51f593861d)

_Hour input with keyboard entry_

##### 24-hour time selection

The dial view can be changed to reflect time selection across 24 hours. This option is set outside of the time picker component, typically through system settings.

[Image: Time picker with dial input selecting hour 20. Hours 0–11 use an outer dial, hours 12–23 use an inner dial.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2q7fdq-04.png?alt=media&token=4d6c29d8-df4a-4cb8-98a9-994284bb9984)

_24-hour dial view_

#### Anatomy

[Image: 17 elements of a dial time picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2u47yh-05.png?alt=media&token=a671138b-6e5b-4d58-8dd2-84aeea14195d)

_1. Label (headline)
2. Time selector separator
3. Input field
4. Input text 
5. Period selector (selected)
6. Period selector text (selected)
7. Container
8. Period selector outline
9. Period selector text
10. Dial selector track
11. Dial label (selected)
12. Text buttons
13. Icon button
14. Dial label (unselected)
15. Clock dial
16. Input text (selected)
17. Input field (selected)_

[Image: 13 elements of an input time picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2u4xoe-06.png?alt=media&token=f64fe914-9b52-445d-b071-2f5833ff0f83)

_1. Label (headline)
2. Time selector separator
3. Input field
4. Input text 
5. Period selector (selected)
6. Period selector text (selected)
7. Container
8. Period selector outline
9. Period selector text (unselected)
10. Text buttons
11. Icon button
12. Input text (selected)
13. Input field (selected)_

##### Container

Like dialogs, the container should appear above other screen elements. To focus attention, surfaces behind the container have a temporary scrim overlay to make them less prominent.

[Image: Time picker container, all elements inside.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2u8t61-07.png?alt=media&token=824ffe77-2a95-46e0-a1ab-3ca315414499)

_The container includes all time picker elements_

##### Input selector

The input selector is a unique kind of text field input. It differs from typical text field inputs in that it has:

- 

An added highlight to call attention to the selected field
- 

A larger shape, size, and font
- 

A label below the field

Hours and minutes should have separate inputs. For people using a 12-hour clock, an AM/PM selector appears to the right of minutes. For people using a 24-hour clock, the AM/PM selector shouldn’t appear.

[Image: Input time picker with the hour field active, and so highlighted.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2ugmkj-08.png?alt=media&token=52517d18-15f3-48f7-b64b-d0297ae21e2e)

_Input selector for a 12-hour clock_

##### Dial selector

Dial selectors always mimic a round watch face. Hours and minutes can be selected by tapping a number or dragging the dial selector track.

When representing a 12-hour dial, all numbers appear in the outer ring. When representing a 24-hour dial, even numbers appear in an inner ring, and odd numbers appear in an outer ring.

[Image: Dial time picker with hour 7 selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2uji74-09.png?alt=media&token=829a268c-cf9b-43e6-83be-5c388f6d1908)

_Dial selector for a 12-hour clock_

##### Text & icon buttons

Icon buttons are used to switch between the input selector, represented by a keyboard, and the dial selector, represented by a clock.

Text buttons are used to exit the dialog (**Cancel**) and save the selector input (**OK**).

[Image: Time picker buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2uqf01-10.png?alt=media&token=2af68f32-68f1-4c1f-86e5-9d3fada4e35f)

_The keyboard icon allows people to switch between the dial selector (pictured) and the input selector_

##### Landscape orientation

The clock dial interface adapts to a device’s orientation. In landscape mode, the stacked input and selection options are positioned side-by-side.

[Image: Time picker in landscape orientation on mobile.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2wil5z-11.png?alt=media&token=a0b081bd-3ad5-48bf-b57c-4ef8e5f2b6d2)

_On mobile, the time picker can adapt to landscape orientation_

#### Placement

Time pickers shouldn’t be obscured by other elements.  

Time pickers should change orientation or variant to ensure they aren't cropped by the edge of the screen.

Time pickers are modal windows above a scrim. This puts the time pickers at the forefront of a person's view, calling attention to make a selection of time.

[Image: Input time picker in landscape orientation on mobile. It's fully visible despite the limited device height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw7tgqq3-12.png?alt=media&token=c0a7ba7e-4362-49d9-bf35-3bc8bcde7c5f)

_The time picker should change to fit the size of the screen so the time picker is always fully visible_

#### Adaptive design

Time pickers can swap between orientation or variant depending on device orientation and viewport constraints. 

For example, the time picker can change to landscape orientation on larger breakpoints or when viewport height is limited, to avoid scrolling the dial presentation. 

Time pickers can fallback to the input time picker when there isn’t enough vertical real estate to present the landscape orientation without scrolling.

[Image: Dial time picker in portrait orientation on mobile.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2uzinf-13.png?alt=media&token=bb6a904b-40c3-4353-9c57-7299f455b020)

_High-density time picker displayed on mobile_

##### Density

Don’t apply density to the time picker dial when the viewport is constrained. Instead, use an input picker.

[Image: Dial time picker in portrait orientation, too tall to fully fit on a mobile device in landscape mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2v1wt2-14_dont.png?alt=media&token=776c2e3f-538d-4912-8815-ef79f77aba0c)

_Don’t apply density to the time picker dial when the viewport is constrained. Instead, use an input picker._

#### Behavior

There are two primary methods for selecting time with the mobile time picker. People can:

- Type in a specific value in the hour and minute fields
- Select the hour or minute field from the text input and adjust the clock dial to simultaneously change the corresponding time field above

[Video: Dial time picker possible interactions. Dial selector adjusts to match manual input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw8wa0wg-GM3-Components-TimePickers-Guidelines-1-v01.mp4?alt=media&token=303bca0c-902b-49c5-9fd3-8d14448f02fc)

_The dial time picker supports both manual and dial input_

##### Appearing & disappearing

Like other kinds of dialogs, time pickers use an enter and exit transition pattern to appear on the screen.

To exit a time picker, the input can either be confirmed (**OK**) or dismissed (**Cancel**). Interacting outside of the dialog will also dismiss the time picker. Unless one of these actions is taken, a time picker will continue to retain focus.

[Video: Time picker enter and exit transitions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw8waqdc-GM3-Components-TimePickers-Guidelines-2-v01.mp4?alt=media&token=7a222829-9aba-4cdc-be4b-97160cb6602c)

_**OK** confirms the entry and closes the dialog_

##### Toggle between dial & input

Tapping the keyboard icon on a mobile time picker switches the view to the input picker.

[Video: Time picker transitioning between dial and input selectors.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw8wbaye-GM3-Components-TimePickers-Guidelines-3-v01.mp4?alt=media&token=507fb3f4-bfff-4e43-8221-3efa566af7ee)

_The keyboard icon in the lower left toggles between the input picker and the dial picker_

##### Scrolling

Time pickers should avoid scrolling, and swap component orientation or variant based on device orientation or viewport size. 

Time pickers don’t scroll with elements outside of the modal window, such as the background.

[Image: Input time picker in landscape orientation to fit a mobile device in landscape mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2v8xeq-18.png?alt=media&token=b4c07a4b-ff96-497f-88bf-e9eca05fc5f8)

_Time pickers shouldn’t scroll_

## Accessibility

#### Use cases

People should be able to use assistive technology to: 

- Select or enter hours/minutes, and in some cases, seconds/milliseconds
- Choose from multiple time formats, including 24-hour clock view and AM/PM
- Enter time selection manually using input fields

#### Interaction & style

Time pickers should allow manual time entry through text input, rather than exclusively through the dial selector. This makes it easier for those using keyboard inputs rather than touchscreens. 

If a screen is not large enough to display the dial selector, consider displaying the input selector alone. Currently for Android Views, the dial selector is always visible.

The input selector should be accessible from the dial selector via the keyboard icon. This interaction allows multiple input methods and makes the time picker accessible for assistive technology users.

[Image: Time picker with active manual text input for hours.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2w3xxn-01.png?alt=media&token=84c832db-808d-448c-a8dd-9d89620c4d1f)

_For time selection that doesn’t require a dial view, make a time input picker the default option_

##### Targets

Targets for dial selectors should be 48x48dp.

[Image: Time picker dial selector specs, selecting hour 7.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2w61b9-02.png?alt=media&token=92a4708a-fda3-4fca-b285-153413dd00b4)

_Dial selector targets should be 48x48dp_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Focus lands on (non-disabled) time slot |
| **Space** or **Enter** | Activates the (non-disabled) time slot |

#### Labeling elements

If the input text is correctly linked, assistive tech like a screenreader will read the component’s role first, then the UI text.

[Image: Accessibility tags on the time picker's hour input field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2w8i4o-03.png?alt=media&token=da4a19d6-ee3a-4eaf-bce3-256e3d0681b1)

_The hour and minute fields have the text input role_

The dial selector will read a selection of total hours, such as **Hour 7 of 12**.

[Image: Accessibility tag on the time picker's dial selector.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd2w9ugu-04.png?alt=media&token=07079a68-62a9-49fd-ab7f-2638edda3047)

_A screen reader reads the text label of a dial selector_

##### Dial selector

| Element | Accessibility label | Role (Wiz and Jetpack Compose) | Role (Android Views) |
| --- | --- | --- | --- |
| Hour input (input picker) | Hour | Text input | - |
| Minutes input | Minute | Text input | - |
| AM/PM selection | AM or PM | Radio button (in list) | Checkbox (in list) |
| Keyboard button | Toggle input picker | Button | Button |
| Cancel button | Cancel | Button | Button |
| OK button | OK | Button | Button |
| Clock dial time selection (dial selector) | {Value} Hours or minutes of {Total} | Button | - |

##### Input selector

| Element | Accessibility label | Role (Wiz and Jetpack Compose) | Role (Android Views) |
| --- | --- | --- | --- |
| Hour input (input picker) | Hour | Text input | - |
| Minutes input | Minute | Text input | - |
| Clock button | Toggle dial picker | Button | Button |
| Cancel button | Cancel | Button | Button |
| OK button | OK | Button | Button |
