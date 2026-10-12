# Date pickers

Source: <https://m3.material.io/components/date-pickers> (content version 2026-09-23_06-10-05, page updated 2026-07-27T14:12:27.562Z)

## Overview

- 

Date pickers can display past, present, or future dates
- 

Three variants: docked, modal, modal input
- 

Clearly indicate important dates, such as current and selected days
- 

Follow common patterns, like a calendar view

[Image: 3 variants of date pickers side-by-side. The docked date picker has an outlined text field above a calendar view. The modal date picker allows people to select a date from a calendar view. The modal date input lets someone type in a date.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5mxu7o-01.png?alt=media&token=14c0b956-fdb9-439e-a756-23f4628ecc57)

_1. Docked date picker
2. Modal date picker
3. Modal date input_

#### Availability & resources

#### Differences from M2

- 

Typography and spacing: Titles and labels are larger and have increased spacing to accommodate 48dp target size
- 

Color: New color mappings and compatibility with dynamic color
- 

Variants: The three variants of date pickers have been renamed to not be device-dependent. The former desktop date picker is now known as the docked date picker. The former mobile date picker and date input are now known as modal date picker and modal date input to reinforce that the user must take an action.

[Image: Old version of a date picker with a white background and shadows.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fle4qmou9-1P-datepicker_whatsnew_1.png?alt=media&token=771d7d4e-4ed2-4492-915e-9b82218f4848)

_M2: Date pickers had a drop shadow and different color mappings_

[Image: New version of date picker with a colorful background, rounded corners, and no shadows.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmd5mtxw0-03.png?alt=media&token=d52e7f85-ffd0-4403-9a9b-bdbb6c9d6dad)

_M3: Date pickers have larger typography, no shadow, and new color mappings compatible with dynamic color_

## Specs

#### Tokens & specs

Select a component variant below to see its elements, attributes, tokens, and their values.

[Token table: see ../tokens/TOKEN_TABLE.01c5310367774eb8.md]

#### Docked date picker

[Image: Diagram indicating the 11 elements of a docked date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vnbm5-01-3P.png?alt=media&token=f8cfe189-33cd-4fc4-a6dc-bd6450d2e6a1)

_1. Outlined text field
2. Menu button: Month selection
3. Menu button: Year selection
4. Icon button
5. Weekdays label text
6. Unselected date
7. Today’s date
8. Outside month date
9. Text buttons
10. Selected date
11. Container_

[Image: Diagram indicating 8 elements of a docked date picker with an open dropdown menu showing the months May to November.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vo1av-02-3P.png?alt=media&token=cba8add3-87cc-4939-add2-d986a5c24e70)

_1. Outlined text field
2. Menu button: Month selection (pressed)
3. Menu button: Year selection (disabled)
4. Header
5. Menu
6. Selected list item
7. Unselected menu list item
8. Container_

##### Docked date picker color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Image: 11 color roles of a docked date picker in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vofa8-03-3P.png?alt=media&token=3bd8bafd-1d95-4cf2-af69-9023191c7f36)

_Docked date picker color roles used for light and dark themes:

1. Primary
2. On surface variant
3. On surface variant
4. On surface
5. On surface
6. Primary
7. On surface variant
8. Primary
9. Surface container high
10. Primary
11. On primary_

[Image: 7 color roles of a docked date picker menu in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vovcl-04-3P.png?alt=media&token=1a14476e-327e-4930-8f5e-21b31ebe0633)

_Docked date picker menu color roles used for light and dark themes:

1. Primary
2. On surface variant
3. On surface
4. Outline variant
5. Surface container high
6. Surface variant
7. On surface_

##### Docked date picker measurements

[Image: Diagram of padding, size, and layout measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmel11ou5-05-3P.png?alt=media&token=02f8923f-d188-460f-af59-6fe54d826576)

_Docked date picker padding and size measurements_

[Image: Diagram of padding, size, and layout measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmel12gcl-06-3P.png?alt=media&token=9fa12372-b9a0-418d-9723-c45792f3ed8d)

_Docked date picker month menu padding and size measurements_

##### Docked date picker configurations

[Image: 3 configurations of docked date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vrc28-07-3P.png?alt=media&token=85602f38-74d4-4677-9fab-3d0c70e3e2ab)

_1. Day selection
2. Month selection
3. Year selection_

#### Modal date picker

[Image: Diagram indicating the 13 elements of a modal date picker in the day selection view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vsstf-08-3P.png?alt=media&token=f8917782-dc39-459c-82c1-25a58cc38522)

_1. Headline
2. Supporting text
3. Header
4. Container
5. Icon button
6. Icon buttons
7. Weekdays
8. Today’s date
9. Unselected date
10. Text buttons
11. Selected date
12. Menu button
13. Divider_

[Image: 10 elements of a modal date picker menu.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vtc2f-09-3P.png?alt=media&token=83ed57ad-19ce-49fd-ae71-8abbffaa04c0)

_1. Headline
2. Supporting text 
3. Header
4. Container
5. Icon button
6. Unselected year
7. Selected year
8. Text buttons
9. Divider
10. Menu button_

[Image: Diagram indicating the 15 elements of a modal date picker when selecting a range of dates.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vtxo6-10-3P.png?alt=media&token=f05f53b5-59da-4e5f-9ec9-7203ad1f9580)

_1. Headline
2. Supporting text
3. Icon button
4. Header
5. Text button
6. Icon button
7. Weekdays label text
8. Container
9. Today’s date 
10. Unselected date
11. In-range active indicator
12. In-range date
13. Month subhead
14. Selected date
15. Divider_

##### Modal date picker color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Image: 12 color roles of a modal date picker day selection view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vuima-11-3P.png?alt=media&token=1b73b296-3144-48af-8be5-d480a52c7c25)

_Modal date picker color roles used for light and dark themes in a day selection menu:

1. On surface
2. On surface variant
3. Surface container high
4. On surface variant
5. On surface variant
6. On surface
7. Primary
8. On surface
9. Primary
10. Primary
11. On surface variant
12. Outline variant_

[Image: Diagram of 9 color roles of a modal date picker year selection view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vuwh7-12-3P.png?alt=media&token=fb15589b-0448-409d-86f3-8abe2ea61b51)

_Modal date picker color roles used for light and dark themes in a year selection menu:

1. On surface
2. On surface variant
3. Surface container high
4. On surface variant
5. On surface variant
6. Primary
7. Primary
8. Outline variant
9. On surface variant_

[Image: Diagram of 14 color roles of a modal date picker when selecting a range of dates.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vv9ft-13-3P.png?alt=media&token=2d71a3a0-7075-4060-b90d-8e7b4e923f91)

_Modal date picker range selector color roles used for light and dark themes:

1. On surface

2. On surface variant

3. On surface variant

4. Surface container high

5. Primary

6. On surface variant

7. On surface

8. Primary

9. On surface

10. Secondary container 

11. On secondary container 

12. Outline variant

13. On surface variant

14. Primary_

##### Modal date picker measurements

[Image: Diagram of size and padding measurements in day selection view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmel16bx5-14-3P.png?alt=media&token=32b56f0d-5b77-413c-9223-f2ae6d5cc275)

_Modal date picker padding and size measurements_

[Image: Diagram of size and padding measurements in year selection view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmel16puv-15-3P.png?alt=media&token=dec9ac5f-f517-4f99-b9e8-4f0d672a76e0)

_Modal date picker year selector padding and size measurements_

[Image: Diagram of size and padding measurements when selecting a range of dates.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmel175wp-16-3P.png?alt=media&token=4cd021d6-ccee-4180-94d2-4cdc83d3b60f)

_Modal date picker date range selector padding and size measurements_

##### Modal date picker configurations

[Image: 3 configurations of a modal date picker shown in dark mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vxg0z-17-3P.png?alt=media&token=0c687b22-f9e0-400f-b021-a647102e0d5b)

_1. Single date selection
2. Date range selection
3. Year selection_

#### Modal date input

[Image: Diagram indicating the 8 elements of a modal date input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vxz7r-18-3P.png?alt=media&token=bd73746c-8b00-49a3-9e3c-e5424fedbc59)

_1. Headline
2. Supporting text
3. Header
4. Container
5. Icon button
6. Outlined text field
7. Text buttons
8. Divider_

##### Modal date input color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Image: Diagram indicating the 7 color roles of a modal date input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vyfrl-19-3P.png?alt=media&token=78be5f98-a2b6-4572-85c3-b4f56cc6fecb)

_Modal date input color roles used for light and dark themes:

1. On surface
2. On surface variant
3. Surface container high
4. On surface variant
5. Primary
6. Primary
7. Outline variant_

##### Modal date input measurements

[Image: Diagram of the padding and size measurements of a modal date input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vyzk0-20-3P.png?alt=media&token=48c3f31a-3c58-4f58-9d95-2ffbbec4ea12)

_Modal date input padding and size measurements_

##### Modal date input configurations

[Image: 2 configurations of modal date input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6vzozd-21-3P.png?alt=media&token=9efa75cb-9f0e-4244-855d-97c76e55e80e)

_1. Single date input
2. Date range input_

#### Element states

[Image: Diagram of 5 various states for date and year elements within date pickers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fme6w02sb-22b-3P.png?alt=media&token=39741611-fe07-4d4f-a3ab-91c2ae665a5d)

_States for date and year selection: 

1. Default (enabled) 
2. Disabled 
3. Hovered 
4. Focused 
5. Pressed (ripple)_

## Guidelines

[Image: A date picker opens in a form UI.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5o0x3j-01.png?alt=media&token=2fde5553-057a-47ca-9e87-19b956f2ad78)

_Docked date picker on desktop_

#### Usage

Date pickers let people select a date or range of dates. They should be suitable for the context in which they appear.

Date pickers can be embedded into:

1. 

Dialogs on compact breakpoints (https://m3.material.io/m3/pages/breakpoints) like mobile
2. 

Text field drop-downs on medium and expanded breakpoints like tablet and desktop

[Image: 2 date picker variations: a dialog on mobile and a dropdown within a text field on desktop.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5sha07-02.png?alt=media&token=4d9b7796-166a-4e83-8a17-abf61a83c6ae)

_1. Date picker dialog on mobile

2. Date picker text field dropdown on desktop_

There are three variants of date pickers:

1. 

Docked date picker
2. 

Modal date picker
3. 

Modal date input

[Image: A docked date picker component.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5si8zx-03.png?alt=media&token=84db16d1-ec55-415e-b2d1-76214fa1336a)

_1. Docked date picker_

[Image: A modal date picker component.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5sj3v5-04.png?alt=media&token=9c5f5c53-5d9c-4fc0-98ec-417a001994a1)

_2. Modal date picker_

[Image: A modal date input component.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme1yy2eb-05.png?alt=media&token=eb5f6437-120f-4436-8382-78df0df143f8)

_3. Modal date input_

#### Anatomy

##### Docked date picker

[Image: 7 elements of a docked date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5skthv-06.png?alt=media&token=4ef9f1b3-6e99-4787-8150-6c64b1808315)

_1. Text field
2. Menu button
3. Icon button
4. Label text
5. Menu
6. Text buttons
7. Container_

[Image: 3 elements of a docked date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5slanf-07.png?alt=media&token=fbc898d0-972d-46fb-a595-ecb0db8f514c)

_1. Text field 
2. Menu button 
3. Menu_

##### Modal date picker

[Image: 12 elements of a modal date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5sma00-08.png?alt=media&token=1723a5d5-4cdc-4758-a1bc-bb362780ad84)

_1. Headline 
2. Supporting text
3. Container
4. Icon button
5. Previous/next month buttons
6. Day of week labels
7. Today’s date 
8. Unselected date 
9. Text buttons
10. Selected date 
11. Menu button
12. Divider_

[Image: 9 elements of a modal date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5smpl6-09.png?alt=media&token=e4cbb084-d156-4210-a569-37fcda9a9ad4)

_1. Headline
2. Supporting text
3. Container
4. Icon button
5. Unselected year 
6. Selected year 
7. Text buttons
8. Divider
9. Menu button_

##### Modal date input

[Image: 7 elements of a modal date input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5sng56-10.png?alt=media&token=5d099ed8-e13b-4f7d-8148-7564dd7c636e)

_1. Headline 
2. Supporting text
3. Container
4. Icon button
5. Date input
6. Text buttons
7. Divider_

##### Full-screen date picker

[Image: 14 elements of a full-screen date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5srxxg-11.png?alt=media&token=342f4eea-5c39-4b69-b4f5-32d5ae50042b)

_1. Headline
2. Supporting text
3. Icon button
4. Container
5. Text button
6. Icon button
7. Divider
8. Day of week labels
9. Today’s date 
10. Selected date range 
11. Unselected date 
12. Text buttons
13. Selected date range start date 
14. Month label_

#### Docked date picker

##### Usage

Docked date pickers allow the selection of a specific date and year. The docked date picker displays a date input field by default, and a dropdown calendar appears when the user taps on the input field. Either form of date entry can be interacted with.

Docked date pickers are ideal for navigating dates in both the near future or past and the distant future or past, as they provide multiple ways to select dates.

[Image: Docked date picker on a desktop screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhhvs4s-12.png?alt=media&token=b3de10d4-789a-4203-b950-97a19de11e56)

_Docked date picker on desktop_

##### Behavior

Dates can be added by using a keyboard or by navigating the calendar UI; both options are immediately available when the docked date picker is accessed.

[Image: Docked date picker with a text field and the UI picker showing the selected date.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5swv36-13.png?alt=media&token=e9e8a585-7d28-4714-b57c-8ad56ad35932)

_Docked date picker_

[Video: Animation of a docked date picker adjusting its size to the selected month.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhi1ze1-GM3-Components-DatePickers-Guidelines-1-v01.mp4?alt=media&token=14718388-0acf-4f51-8bfd-f3a42d76e283)

_Docked date pickers adjust size dynamically_

[Video: Animation of a docked date picker changing from calendar view to year selection menu view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhi7618-GM3-Components-DatePickers-Guidelines-1-2-v01.mp4?alt=media&token=39201a22-7ffc-4cd4-9687-32cd38f60260)

_The year selection menu replaces the calendar view_

##### Month selection

Month selection can be navigated with the corresponding back and next arrows or by tapping the dropdown menu.

[Image: Docked date picker with a list of months May through September. August is selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5sxs60-16.png?alt=media&token=8e25c888-0ff4-41b3-bc49-bcb15ee42958)

_Docked date picker month selection_

##### Year selection

Year selection can be navigated with the corresponding back and next arrows or by tapping the dropdown menu.

[Image: Docked date picker with a list of years 2025 to 2029. 2025 is selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5t0t93-17.png?alt=media&token=62987e8d-906f-4598-bc57-2b24c75d6f99)

_Docked date picker year selection_

#### Modal date picker

##### Behavior

Modal date pickers navigate across dates in several ways:

- To navigate across months, swipe horizontally
- To navigate across years, scroll vertically
- To access the year picker, tap the year

Don’t use a modal date picker to prompt for dates in the distant past or future, such as a date of birth. In these cases, use a modal input picker or a docked date picker instead.

[Video: Animation of a docked date picker being swiped horizontally to navigate across months.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhkhvz2-GM3-Components-DatePickers-Guidelines-2-v01.mp4?alt=media&token=f4bbefe5-6937-423a-b476-bf0017f6fcf4)

_To navigate across months, swipe horizontally_

[Video: Animation of a year picker in a docked date picker being tapped and scrolled vertically to navigate across years.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhkizck-GM3-Components-DatePickers-Guidelines-2-1-v01.mp4?alt=media&token=285c6117-593f-4534-8e21-ea29c2b37fb6)

_To navigate across years, tap the year picker and scroll vertically_

##### Date range selection

Date range selection provides a start and end date. Common use cases include:

- Booking a flight
- Reserving a hotel

Modal date pickers navigate across date ranges in several ways:

- To select a range of dates, tap the start and end dates on the calendar
- To navigate across months, scroll vertically

[Video: Animation of a date range being selected on a modal date range picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhklm21-GM3-Components-DatePickers-Guidelines-3-1-v01.mp4?alt=media&token=d7feb81d-26c5-47e5-9fca-4bc3cd16d2a4)

_Modal date range picker_

[Video: Animation of a modal date range picker being scrolled vertically to navigate across months.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhkmci9-GM3-Components-DatePickers-Guidelines-3-2-v01.mp4?alt=media&token=d1bdd71c-9ab4-4c3a-80fc-1627c3246c48)

_Modal date range picker with vertical scroll_

#### Modal date input

##### Usage

Modal date inputs allow the manual entry of dates using the numbers on a keyboard. People can input a date or a range of dates in a dialog.

[Image: A modal date input component.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5t2vbx-22.png?alt=media&token=c323b202-962d-44d8-b4b5-fd7e3c3cf2f6)

_Modal date with manual input_

[Image: A modal date input component showing a day in 1979, which would be difficult to choose using UI.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5t44vn-23-do.png?alt=media&token=ef86d677-f014-4215-877c-dc501c32eae2)

_For dates that don’t require a calendar view, the modal date input can be the default view_

[Image: A modal date input with hint text for entering the date.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5t675k-24-do.png?alt=media&token=335d8130-c5c5-4080-a5c4-ba8454108840)

_Alternatively, a text field with appropriate hint text can prompt for dates, such as in a form_

##### Behavior

You can swap between the modal date picker and modal date input using the edit or calendar icon.

[Video: Animation of a modal date picker switching to a modal date input when the range selection icon is tapped.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhkrz7i-GM3-Components-DatePickers-Guidelines-4-1-v01.mp4?alt=media&token=76f08e5e-c703-45fe-b531-7345581c51d8)

_Switching from a modal date picker to a mobile date input for selecting ranges_

[Video: Animation of a modal date picker switching to a modal date input when the edit icon is tapped.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhksla9-GM3-Components-DatePickers-Guidelines-4-2-v01.mp4?alt=media&token=06f2bb29-37a9-4905-8635-f2393d27ed36)

_Switching from a modal date picker to a modal date input for selecting a single date_

##### Compact breakpoint

On compact breakpoints (https://m3.material.io/m3/pages/breakpoints/overview), such as mobile, a full-screen modal date picker is recommended to increase readability and touch target size. It can cover the entire screen.

[Image: A full-screen view of modal date picker on a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5t84q0-27.png?alt=media&token=05e79f57-4608-4f32-96b6-3731d33645ee)

_A full-screen modal date picker on mobile_

##### Medium and expanded breakpoints

The docked date picker works best for medium and expanded breakpoints. It displays a date input field by default, and a dropdown calendar appears when a person taps on the input field. A person can interact with either form of date entry.

Docked date pickers are ideal for navigating dates in both the near future or past, and in the distant future or past, as they provide multiple ways to select dates.

[Image: A docked date picker displaying a full calendar view on a large screen device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5t9e1o-28.png?alt=media&token=b002f7a4-2450-47c1-bba0-3475b334d19b)

_A docked date picker with a full calendar view is best used on larger devices_

##### Selection

Selection is indicated through color, drawing visual attention. In date ranges, start and end dates are selected, while dates in-between appear connected with a subtle highlight.

[Video: Animation of a modal date range picker showing visual differences between selecting a date range and today's date.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhkykpc-GM3-Components-DatePickers-Guidelines-5-v01.mp4?alt=media&token=106350df-2005-4bcb-bd3f-85d759d55eac)

_Differences between selected the selected date range (August 17–23) and today's date (August 5) are shown through color and fill_

##### Appearing and disappearing

Like other kinds of dialogs, modal date pickers use an enter and exit transition pattern to appear on the screen.

To exit a date picker, the input can either be confirmed (**OK**) or dismissed (**Cancel**). Interacting outside of the dialog will also dismiss the time picker. Unless one of these actions is taken, a time picker will continue to retain focus. Mobile full-screen pickers also have an additional close affordance (x) icon button and **Save** confirmation.

Docked date pickers appear just below the input field.

[Video: Animation of a modal date picker's enter and exit transition.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhl1ir9-GM3-Components-DatePickers-Guidelines-6-1-v01.mp4?alt=media&token=7e8088e1-11c9-47ed-81df-3a972cf0c87e)

_Modal date pickers can be dismissed through interacting with content outside the dialog, or with the action buttons in the lower right_

[Video: Animation of a docked date picker's calendar icon being clicked making the calendar view appear for date selection.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhl2xgp-GM3-Components-DatePickers-Guidelines-6-2-v01.mp4?alt=media&token=9cb11627-c019-4d3d-947e-e01368c33f7d)

_Interacting with the input for a docked date picker makes the calendar view appear below_

##### Responsive layout

The sizing of the docked and modal date picker components don’t scale responsively to different breakpoints.

[Image: Docked date picker enlarged on a large screen responsively.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tb2d5-32.png?alt=media&token=ab567470-5b68-45ed-a913-8c80288f7894)

_Don’t scale the date picker responsively to a larger size_

## Accessibility

#### Use cases

People should be able to:

- Enter dates manually by inputting text, without using the picker
- Use multiple input methods, making it accessible to those using assistive technology

On the docked date picker, the text field can be used for input.
On the modal date picker, the date input option should be available using the edit icon.

#### Interaction & style

The edit icon indicates the ability to switch to the modal date input.

Interactive targets for all elements meet Material's 48x48dp minimum touch target requirement. Increasing density would negatively impact accessibility by limiting tappable/clickable targets.

[Image: Date picker with the edit icon focused.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tcq2g-01.png?alt=media&token=c53d3a22-1ce5-4bfb-bf36-77548890bd4a)

_The edit icon indicates the ability to switch to the modal date input_

[Image: Touch target used to select September 17 to 23 on a date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tdrn3-02.png?alt=media&token=2770d845-5def-4bc1-a7a9-22b8d83f43ef)

_Touch targets are 48x48dp_

#### Date entry methods

The date entry component offers two ways to enter a date:

- Direct text entry into a text field
- Through the date picker

The calendar icon is the exclusive entry point for the date picker.

This improves efficiency for a screen reader and other keyboard users, as it makes interaction with the date picker optional and reduces the amount of key presses required to input a date.

Each input is a separate tab stop, which improves discoverability of the control.

[Image: Text input field next to a date picker icon provides a choice of how to enter the date.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwhl9jct-3.png?alt=media&token=ec79be27-46b7-4560-8c67-2ff253e3b94d)

_Entering a date either through direct text entry or the date picker_

#### Accessible date input

Automatically format the date after the user hits “Enter“ or navigates out of the text field. Don't automatically format the date by adding slashes or other special characters while the user is typing (also known as input masks). This can cause confusion for people using screen readers because it changes what they typed.  

To reduce errors, accept a range of formats including dashes, spaces, slashes, dots, and 0 to the left of a single digit month/day. This is especially helpful for assistive technology users who might be more prone to errors when interacting with complex inputs.

[Image: Numeric entry 08172323 automatically formatted to 08/17/2023.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tjcxl-04.png?alt=media&token=5fa49d5e-5f45-4258-b90e-390d8e9aa4ed)

_The text field's logic can adapt to the user's actual input format, applying the correct formatting after the user has completed their text entry_

#### Optional **Clear** button

If it's not needed for your use case, remove the **Clear** button from the screen to reduce the number of tab stops for keyboard users.

[Image: Optional clear button on lower left corner of a date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tl1kf-05.png?alt=media&token=2c6fd134-3e07-439b-a93f-1ae9cec2a1bf)

_Remove non-critical actions to reduce the number of tab stops for keyboard users_

#### Affordance for keyboard shortcuts

Ensure keyboard shortcuts are readily available for keyboard and screen reader users by providing the shortcut key in the tooltip. It should be included in the hint description to be read out by the screen reader.

As shown here, the previous year button is interactive and can therefore be focused via the keyboard. Upon focus, the tooltip explains the behavior of the button and shows the shortcut key.

[Image: Shift + Page up is the keyboard shortcut to go to the previous year on a date picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tmhkf-06.png?alt=media&token=78a780bd-c455-4e42-a20d-fcb0ef5b1e3f)

_Keyboard tooltip example for date picker_

#### Truncated labels & tooltips

Truncating labels isn't ideal, but tooltips allow the full text to be shown on hover or keyboard focus.

Days of the week are not interactive and are therefore not focusable via keyboard, yet the tooltip is available on hover. The date picker relies on the conventionality of these abbreviations for some assistive technology users.

[Image: A pointer hover over the “T” day on a date picker produces the tooltip “Tuesday.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tnt2t-07.png?alt=media&token=af48202f-5abc-49e2-8988-43052d0c84e0)

_Days of the week are not navigable via keyboard, so the tooltip is shown only on pointer hover_

#### Color contrast between dates

Dates should have contrast of at least 4.5:1 between the link text colors and the background.

[Image: A date picker’s label text passes the color contrast minimum of 4.5:1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tp1fs-08.png?alt=media&token=f5cf6a07-9a3b-400a-9cc6-7183fdc69832)

_Dates pass the 4.5:1 contrast minimum_

#### Keyboard navigation

| **Keys** | **Actions** |
| --- | --- |
| Enter/return | Enter/return |
| Enter/return | Closes the calendar and saves the selected date |
| Page up/down | Move to the same date on next/previous month |
| Home/End | Move to the first day of the month |
| Shift + Page up/down | Moves to the same date in the next/previous year |
| Shift + M | Moves to the month list dropdown |
| Shift + Y | Moves to the year list dropdown |

#### Labeling elements

The text field's accessibility label should clearly state the purpose of the input (for example, event date or reservation date) and should match the placeholder text when the field is empty.

The helper text (below the text field) should specify the date format (for example, MM/DD/YYYY or YYYY/MM/DD) and act as a description for the text field. The default helper text is "MM/DD/YYYY," but this can be customized.

[Image: Text field accessibility labels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tqs6i-09.png?alt=media&token=b7d6086d-5892-421e-96ed-a8da8de62ec7)

_The accessibility label clearly states the kind of input as an event date_

| **Element** | **A11y label** | **Role** |
| --- | --- | --- |
| Previous / next month and year | “{label}” | Button |
| Month and year dropdowns | “{label}” | Button |
| Days of the week | Column header |  |
| Month grid | Grid |  |

#### Screen reader verbalizations

To support screen reader users, labels are used to enumerate the complete date. This allows screen reader users to hear the full context of "Monday, August 17” instead of just part of the date.

[Image: Current date label providing day, month, and year for screen reader accessibility.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmd5tw17z-10.png?alt=media&token=43c1af13-8f5b-439f-b238-443d703699d5)

_Screen readers will state the full day, month, date, and year instead of just the number 17_
