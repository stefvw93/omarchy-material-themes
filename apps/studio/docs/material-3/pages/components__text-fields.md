# Text fields

Source: <https://m3.material.io/components/text-fields> (content version 2026-09-23_06-10-05, page updated 2026-09-08T08:21:17.878Z)

## Overview

- 

Make sure text fields look interactive
- 

Two variants: filled and outlined
- 

The text field’s state (blank, with input, error, etc) should be visible at a glance
- 

Keep labels and error messages brief and easy to act on
- 

Text fields commonly appear in forms and dialogs

[Image: 2 variants of text fields, filled and outlined.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2u2h3p-1.png?alt=media&token=71a990c4-03bd-4c34-afc6-130018ed186e)

_1. Filled text field
2. Outlined text field_

#### Availability & resources

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color

[Image: A filled and outlined text field with M3 color mappings.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx2u3e4d-2.png?alt=media&token=896d9b04-c327-4904-9c1b-368bb684d53c)

_Text fields have new color mappings_

## Specs

#### Tokens & specs

Browse the component elements, attributes, tokens, and their values. Learn about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.60990dd98dea0998.md]

#### Filled text field

[Image: Diagram of a filled text field indicating the 10 parts of its anatomy.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2j3wjd6-1.png?alt=media&token=03c85687-5f77-4b5c-a7b0-a38799a7b42b)

_1. 

Container
2. 

Leading icon (optional)
3. 

Label text in empty field
4. 

Label text in populated field
5. 

Trailing icon (optional)
6. 

Focused active Indicator
7. 

Caret
8. 

Input text
9. 

Supporting text (optional)
10. 

Enabled active indicator_

##### Filled text field color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Diagram of a filled text field indicating its color mappings.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2j3x0d6-2-3P.png?alt=media&token=f9e0224e-9c4d-4c73-b313-88a8d4c63bd3)

_Filled text field color roles used for light and dark schemes:

1. 

Surface container highest
2. 

On surface variant
3. 

On surface variant
4. 

Primary
5. 

On surface variant
6. 

Primary
7. 

Primary
8. 

On surface
9. 

On surface variant
10. 

On surface_

##### Filled text field states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: Side by side view of empty and populated filled text fields across different states, showing the differences between enabled, focused, hovered, and disabled.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqwy2pr-3.png?alt=media&token=b8865528-a6d3-496c-a968-29b0b626d31e)

_1. Enabled (empty)
2. Focused (empty)
3. Hovered (empty)
4. Disabled (empty)
5. Enabled (populated)
6. Focused (populated)
7. Hovered (populated)
8. Disabled (populated)_

##### Filled text field error states

Error states are visual representations used to communicate the status of a component or interactive element. An error message can display instructions on how to fix it. Error messages are displayed below the text field as supporting text until fixed.

[Image: Side by side view of empty and populated filled text fields across different error states, showing the differences between enabled, focused, hovered.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqx5pjx-4.png?alt=media&token=ea761b5e-fc6e-4979-acd8-69d42c2737f2)

_1. Enabled (empty)
2. Focused (empty)
3. Hovered (empty)
4. Enabled (populated)
5. Focused (populated)
6. Hovered (populated)_

##### Filled text field measurements

[Image: Diagram showing layout values and paddings for filled text fields without icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqxam89-5.png?alt=media&token=d571e1d6-c212-4d3e-bb44-522da83b6fb1)

_Padding and size measurements without icons_

[Image: Diagram showing layout values and paddings for outlined text fields with leading and trailing icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqxhgvg-6.png?alt=media&token=3a26e5e8-ac4b-438d-b4c8-b56375deae62)

_Padding and size measurements with icons_

[Image: A diagram showing layout values and paddings for supporting text, and supporting text in combination with a character count.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm4adcnvc-7-3P.png?alt=media&token=0ceb08d6-a607-492b-a62f-a8b29e2db948)

_Padding and size measurements with supporting text and character count_

| Attribute | Value |
| --- | --- |
| Default container height | 56dp |
| Label alignment (unpopulated) | Vertically centered |
| Top/bottom padding | 8dp |
| Left/right padding without icons | 16dp |
| Left/right padding with icons | 12dp |
| Icon alignment | Vertically centered |
| Padding between icons and text | 16dp |
| Supporting text and character counter top padding | 4dp |
| Padding between supporting text and character counter | 16dp |
| Target size | 56dp |

##### Filled text field configurations

[Image: Side by side view of filled text fields in different configurations.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm84goiff-8%20-%203P.png?alt=media&token=17771e17-b866-4a9b-800b-ad5beed90873)

_Empty and populated filled text fields with:

1. 

Supporting text
2. 

Trailing icon
3. 

Leading icon
4. 

Leading and trailing icons
5. 

Prefix
6. 

Suffix
7. 

Multi-line text field_

#### Outlined text field

[Image: Diagram of an outlined text field indicating the 9 parts of its anatomy](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmhk4c6jn-09-3P.png?alt=media&token=f55d7652-a5bb-4963-8395-791263662261)

_1. 

Enabled container outline
2. 

Leading icon (optional)
3. 

Label text in empty field
4. 

Label text in populated field
5. 

Trailing icon (optional)
6. 

Focused container outline
7. 

Caret
8. 

Input text
9. 

Supporting text (optional)_

##### Outlined text field color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: Diagram of an outlined text field indicating its color mappings](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2j3xtlg-10-3P.png?alt=media&token=e7f9bb14-13e1-42e5-b79f-1ddd3178f252)

_Outlined text field color roles used for light and dark schemes:

1. Outline
2. On surface variant
3. On surface variant
4. Primary
5. On surface variant
6. Primary
7. Primary
8. On surface
9. On surface variant_

##### Outlined text field states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states/overview)

[Image: Side by side view of empty and populated outlined text fields across different states, showing the differences between enabled, focused, hovered, and disabled.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqy69rp-11.png?alt=media&token=ff991447-ecb4-414e-9fa4-9b72b3537e1d)

_1. Enabled (empty)
2. Focused (empty)
3. Hovered (empty)
4. Disabled (empty)
5. Enabled (populated)
6. Focused (populated)
7. Hovered (populated)
8. Disabled (populated)_

##### Outlined text field error states

Error states are visual representations used to communicate the status of a component or interactive element. An error message can display instructions on how to fix it. Error messages are displayed below the text field as supporting text until fixed.

[Image: Side by side view of empty and populated filled text fields across different error states, showing the differences between enabled, focused, hovered.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqya4uw-12.png?alt=media&token=4bd381a5-2489-4bdb-9d62-a5d37ae4fa2a)

_1. Enabled (empty)
2. Focused (empty)
3. Hovered (empty)
4. Enabled (populated)
5. Focused (populated)
6. Hovered (populated)_

##### Outlined text field measurements

[Image: A diagram showing layout values and paddings for outlined text fields without icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqys303-13.png?alt=media&token=76e0ea27-3e53-4a3e-bf9d-50d6b1f67a2d)

_Padding and size measurements without icons_

[Image: A diagram showing layout values and paddings for outlined text fields with leading and trailing icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqyuu9g-14.png?alt=media&token=84d6a030-ea94-4790-b658-cc477664a70c)

_Padding and size measurements with icons_

[Image: A diagram showing layout values and paddings for supporting text, and supporting text in combination with a character count.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flyqywif5-15.png?alt=media&token=91409e82-1dbb-45a6-869d-f024ee50f193)

_Padding and size measurements with supporting text and character count_

| Attribute | Value |
| --- | --- |
| Container height | 56dp |
| Left/right padding without icons | 16dp |
| Left/right padding with icons | 12dp |
| Padding between icons and text | 16dp |
| Icon alignment | Vertically centered |
| Supporting text and character counter top padding | 4dp |
| Padding between supporting text and character counter | 16dp |
| Label alignment | Vertically centered |
| Left/right padding populated label text | 4dp |
| Target size | 56dp |

##### Outlined text field configurations

[Image: A side by side view of outlined text fields in different configurations.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm84gq17k-16%20-%203P.png?alt=media&token=eefd975a-84d8-4f4b-9cc8-9707e31f383f)

_Empty and populated outlined text fields with:

1. 

Supporting text
2. 

Trailing icon
3. 

Leading icon
4. 

Leading and trailing icons
5. 

Prefix
6. 

Suffix
7. 

Multi-line text field_

## Guidelines

[Image: A side by side view of a filled and a outlined text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyqb5o7k-1%20(1).png?alt=media&token=3e8505af-c89e-46f1-a165-4150245058a6)

_Filled and outlined text fields_

#### Usage

Use a text field when someone needs to enter text into a UI, such as filling in contact or payment information.

[Image: Mobile UI of contact form with several text fields.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31ssyn-1.png?alt=media&token=17fe50a8-ccc7-491b-b8b2-a8c3bd1487f3)

_Contact form using outlined text fields_

There are two variants of text fields:

1. 

Filled text fields
2. 

Outlined text fields

Both variants of text fields use a container to provide a visual cue for interaction and provide the same functionality.

[Image: Side by side view of a populated and unpopulated filled text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31t4yp-2.png?alt=media&token=4a6e26a3-72f3-46d2-8372-47fc1cf66d7e)

_Filled text field_

[Image: Side by side view of a populated and unpopulated outlined text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31tc9a-3.png?alt=media&token=db27205f-c078-450b-b330-00c1afd09444)

_Outlined text field_

##### Outlined text fields

Outlined text fields have less visual emphasis than filled text fields. When they appear in places like forms (where many text fields are placed together), their reduced emphasis helps simplify the layout.

[Image: App screen with 1 focused and 1 unfocused outlined text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31u7r0-4.png?alt=media&token=bb9357e8-b1d0-4ff8-890f-b21939e78de0)

_Login screen with outlined text fields_

#### Choosing text fields

##### Choosing text fields

Both variants of text field provide the same functionality. The variant of text field used can depend on style alone.

Choose the variant that:

- 

Works best with an app’s visual style
- 

Best accommodates the UI's goals
- 

Is most distinct from other components (like buttons) and surrounding content

[Image: Mobile UI of a contact form with several filled text fields.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31v0nn-5.png?alt=media&token=205be2fa-2142-46e3-81fd-c69273b0601d)

_Mobile form using filled text fields_

[Image: Mobile UI of a contact form with several outlined text fields.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31vds5-6.png?alt=media&token=cfac905f-bbb9-4917-86cb-75d405a82628)

_The same mobile form using outlined text fields_

##### Using both text field variants on the same screen

If both variants of text field are used in a UI, they should be used consistently within different sections, and not intermixed within the same region. 

For example, use outlined text fields in one section and filled text fields in another.

[Image: Mobile UI of a contact form with several filled text fields, and an open dialog on top using an outlined text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31vnye-7_do.png?alt=media&token=776ccb86-55c6-4c1c-abd2-fe2e99551f3e)

_When using both variants of text fields in a UI, separate them by region_

[Image: Mobile UI of a contact form with a mix of outlined and filled text fields.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31vw2z-8_dont.png?alt=media&token=af4205b9-661c-4cb3-957c-a1fbda8d56ce)

_When using both variants of text fields, don't use both next to each other or within the same form_

#### Anatomy

##### Filled text field

[Image: Diagram of filled text field indicating the 10 parts of its anatomy.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2j3kn4a-9.png?alt=media&token=182bc4ba-6100-4b86-9c88-ab946296064e)

_1. 

Container
2. 

Leading icon (optional)
3. 

Label text in empty field
4. 

Label text in populated field
5. 

Trailing icon (optional)
6. 

Focused active Indicator
7. 

Caret
8. 

Input text
9. 

Supporting text (optional)
10. 

Enabled active Indicator_

##### Outlined text field

[Image: Diagram of an outlined text field indicating the 9 parts of its anatomy.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2j3kqed-10.png?alt=media&token=9dd5de19-42ba-4468-a2bc-843792fd7fc6)

_1. 

Enabled container outline
2. 

Label text in empty field
3. 

Leading icon (optional)
4. 

Label text in populated field
5. 

Trailing icon (optional)
6. 

Focused container outline
7. 

Caret
8. 

Input text
9. 

Supporting text (optional)_

##### Containers

Containers improve the discoverability of text fields by creating contrast between the text field and surrounding content.

**Fill and stroke**
A text field container has a fill and a stroke either around the entire container, or just the bottom edge. The color and thickness of a stroke can change to indicate when the text field is active. 

**Rounded corners**
The container of an outlined text field has rounded corners, while the container of a filled text field has rounded top corners and square bottom corners.

[Image: Side by side view of the containers of a filled and outlined text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31y44j-11.png?alt=media&token=7d4b4480-90b1-4bd6-b9db-a25f193c515a)

_Text field containers_

##### Label text

Label text tells people what information is requested. Every text field should have a label.

Label text should be aligned with the input text, and always visible. It can be placed in the middle of a text field, or rest near the top of the container.

Label text shouldn't be truncated or take up multiple lines. Keep it short, clear, and fully visible.

[Video: Animation of 2 text field’s label text changing position when empty and populated.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32tcjs-GM3-Components-TextFields-Guidelines-1-v01.mp4?alt=media&token=5d88de42-92e9-4aa3-a89a-124a0305b87d)

_Label text should always be visible. When the field is selected, the label text moves from the middle of the text field to the top._

[Image: Text field with very long label text, too long to display fully display inside the text field container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx31ykco-13_dont.png?alt=media&token=dc2a9d73-7d0f-42f0-aafa-072fcca98564)

_Don’t truncate label text. Keep it short, clear, and fully visible._

[Image: Text field with very long label text split into 2 lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx320mke-14_dont.png?alt=media&token=13140173-2eba-4d08-bb46-a9fa6cba1a59)

_Label text shouldn’t take up multiple lines_

##### Adjacent label

A text field doesn't require a label if the field's purpose is indicated by a separate, adjacent label. 

Adjacent labels should be aligned to the leading edge of the text field container.

[Image: Mobile UI of a contact form with label texts placed outside and on top of the text fields.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32132w-15.png?alt=media&token=7ec20bd3-7097-4d2e-85f5-eba578d7ce0f)

_Text fields with adjacent labels_

##### Required text indicator

To show a field is required, display an asterisk (*) next to the label text, and explain that asterisks indicate required fields in one of two ways:

- Supporting text

- A single note at the beginning of the form

Additional best practices include:

- Indicate all required fields

- If required text has a particular color, use the same color for the asterisk

[Image: Mobile UI of a contact form showing supporting text below the text field, indicating an input is required.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx322ilp-16.png?alt=media&token=43feb129-a6b6-4277-b1a8-044d68325b3d)

_Asterisk with required supporting text_

##### Input text

Input text is text a person has entered into a text field.

Text fields can display input text in the following ways:

- **Single line** text fields display only one line of text
- **Multi-line** text fields grow to accommodate multiple lines of text
- **Text areas** are fixed-height fields

[Image: Text field with populated input text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx322ww5-17.png?alt=media&token=fa62d7da-ffa4-49f8-bb0f-fa7273b6c4d2)

_Input text in a filled text field_

[Video: Text field with very long input text that scrolls sideways.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32tu4z-GM3-Components-TextFields-Guidelines-2-1-v01.mp4?alt=media&token=ce56cd51-c973-4fb2-9507-3108955d254c)

_In **single-line** fields, as the cursor reaches the right field edge, text longer than the input line automatically scrolls left. Single-line fields are not suitable for collecting long responses; use a multi-line text field or text area instead._

[Video: Text field with very long input text that wraps into a second line, expanding the text field container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32uir5-GM3-Components-TextFields-Guidelines-2-2-v01.mp4?alt=media&token=29c194ef-dc2f-4c0e-a20b-d5c3b720253d)

_In **multi-line** fields, overflow text causes the text field to expand, shifting screen elements downward and text wraps onto a new line. These fields initially appear as single-line fields, which is useful for compact layouts that need to accommodate large amounts of text._

[Video: Text area with enough space to allow a very long input text to wrap into a second line without the need to expand the container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32usx4-GM3-Components-TextFields-Guidelines-2-3-v01.mp4?alt=media&token=acf2e07c-b72b-47a0-9a8f-98dd14978a8d)

_**Text areas** are taller than text fields and wrap overflow text onto a new line. They are a fixed height and scroll vertically when the cursor reaches the bottom of the field. The large initial size indicates that longer responses are possible and encouraged. These should be used instead of multi-line fields on the web. Ensure the height of a text area fits within mobile screen sizes._

##### Prefix text

Text fields can contain prefix text such as currency symbol.

[Image: Text field with a currency prefix before the input text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx323bkz-21.png?alt=media&token=105d405f-12d6-4edd-831c-aeb168ae8d20)

_A text field with a currency symbol text prefix_

##### Suffix text

Text fields can contain suffix text such as unit of measurement or email domain.

[Image: Text field with a suffix after the input text indicating a maximum input of 100.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx323jpq-22.png?alt=media&token=0b58c2b9-439d-42b1-9ca3-f61852239672)

_A text field with a grading scale as suffix_

[Image: Text field with a suffix after the input text indicating an email address.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx3246iw-23.png?alt=media&token=1848c8cc-bb19-465d-bf22-2caea1371a3f)

_A text field with an email domain suffix_

##### Supporting text & character counter

Supporting text conveys additional information about the input field, such as how it will be used. It should ideally be one line, though may wrap to multiple lines if required. It can be either persistently visible or visible only on focus.

If there is a character or word limit, include a character or word counter. They display the ratio of characters used and the total character limit.

[Image: A side by side view of a text field with supporting text aligned with the trailing side, and a character counter aligned with the trailing side.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx324ofo-24.png?alt=media&token=309a0667-ded2-42a9-bd93-3b83d086f88f)

_1. Supporting text
2. Character counter_

##### Error text

For text fields that validate their content such as passwords, replace supporting text with error text. Swapping supporting text with error text prevents new lines of text from bumping content and changing the layout.

- If only one error is possible, error text should describe how to avoid the error
- If multiple errors are possible, error text should describe how to avoid the most likely error

[Video: Mobile UI of a sign up form indicating a invalid entry, and a hint on how to resolve as supporting text below the container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32v93h-GM3-Components-TextFields-Guidelines-3-1-v01.mp4?alt=media&token=2b4b2b54-a056-4a61-975d-553b5e06e4ca)

_Swap supporting text with error text_

[Video: Mobile UI of a sign up form with an invalid text field entry. The regular supporting text remains above the error message.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32vmu8-GM3-Components-TextFields-Guidelines-3-2-v01.mp4?alt=media&token=39d05576-568a-4739-b598-f9534900853f)

_Don't add error text in addition to supporting text, as their appearance will shift content_

[Image: Mobile UI of a sign up form with an invalid text field entry. The error message wraps to 2 lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx325xha-27_caution.png?alt=media&token=56146424-2703-4db8-b848-8e986a620685)

_Long errors can wrap to multiple lines if there isn't enough space to clearly describe the error. In this case, ensure padding between text fields is sufficient to prevent multi-lined errors from bumping layout content._

##### Error icon

It’s strongly recommended to show an error icon when the text field is in the error state. 

This highlights the error for people with visual impairments, and provides an additional sensory indicator.

[Image: 2 text fields with error messages. The active text field has a thicker border. Both text fields have a trailing error icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm5vj8xje-28.png?alt=media&token=37a70518-0bc9-48c5-add8-ddef99bb85b8)

_The error icon is an important second visual indicator that a text field has an error_

##### Icons & images

Icons in text fields are optional. Text field icons can: 

- Describe valid input methods such as a microphone icon
- Provide affordances to access additional functionality such as clearing the content of a field
- Express an error

Leading and trailing icons change their position based on LTR or RTL contexts.

Images that are 24dp in height can be placed inside of text fields. This image height allows for optimal top and bottom padding within the field and is consistent with icon size recommendations.

1. **Icon signifier 
**Icon signifiers can describe the type of input a text field requires, and be touch targets for nested components. For example, a calendar icon may be tapped to reveal a date picker.
2. **Valid or error icon
**Iconography can indicate both valid and invalid inputs, making error states clear for colorblind users. 
3. **Clear icon
**Clear icons let a person clear an entire input field. They appear only when input text is present.
4. **Voice input icon
**A microphone icon signifies that people can input characters using voice. 
5. **Dropdown icon
**A dropdown arrow indicates that a text field has a nested selection component.
6. **Image
**An image can help contextualize the required input text such as a credit card number.

[Image: Side by side view of text fields with different icons and images as trailing elements within the container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx3270td-28.png?alt=media&token=10a8c64f-9569-41f4-b334-66537b8c7930)

_1. Icon signifier
2. Valid or error icon 
3. Clear icon 
4. Voice input icon
5. Dropdown icon
6. Image_

##### Read-only fields

Read-only text fields display pre-filled text that people cannot edit. 

A read-only text field is styled the same as a regular text field and is clearly labeled as read-only.

[Image: Read only filled text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32b33u-29.png?alt=media&token=6200faed-0aab-45bd-af45-5dd7dff5020b)

_A filled read-only text field_

[Image: Read only outlined text field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32b91b-30.png?alt=media&token=d37f640d-c179-4935-ae4d-9e09c84a01cf)

_An outlined read-only text field_

#### Adaptive design

As layouts adapt to larger screens and different breakpoints, apply flexible container dimensions to text fields. Set minimum and maximum values for margins, padding, and container dimensions as layouts scale so that typography adjusts for better reading experiences.

[Image: UI for creating a new album in a side by side view on mobile and tablet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32c2h0-Full%20to%20max%20-%201P.png?alt=media&token=9b9c076b-53e3-4068-ae53-c050d0dbb37d)

_For compact breakpoints, text fields can span the full width of the display. For medium and expanded breakpoints, text fields should be bound by flexible margins or other containers._

As text fields expand in fluid layouts, avoid maintaining fixed margins and typography properties. This can lead to extra long text fields. 

For example, text fields should not span the full width of a large screen.

[Image: Tablet UI with text fields spanning the complete width of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32d5ny-responsive-layout-dont.png?alt=media&token=998e18d2-8016-4962-9652-e29fcfb4568b)

_Don’t use fixed text field margins on large devices. Text fields shouldn’t span the full width of a large screen._

##### Density

Dense text fields enable people to scan and take action on large amounts of information.

[Image: Tablet UI with desne text field as part of event creation form.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32dfqc-31.png?alt=media&token=a5b0b69e-bddf-49e4-9cfb-c30aae5f640d)

_A form with dense text fields_

###### **Avoid applying density by default**

Don't apply density to text fields by default. This lowers their targets below the recommended 48x48 CSS pixels. Instead, give people a way to choose a higher density, like selecting a denser layout or changing the theme.

To ensure this density setting can be easily reverted when it's active, keep all the targets to change it at a minimum of 48x48 CSS pixels each.

## Accessibility

#### Use cases

User should be able to:

- Navigate to and activate a text field with assistive technology
- Input information into the text field
- Receive and understand supporting text and error messages
- Navigate to and select interactive icons

#### Interaction & style

The containers for both filled and outlined text fields provide the same functionality. Changes to color and thickness of stroke help provide clear visual cues for interaction.

[Image: 2 filled text fields in enabled empty state and in focused populated state have visual cues to identify their state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmtsdrr40-01.png?alt=media&token=aae245fb-a2f0-4a3f-a1ca-27d3f866f74b)

_Filled text fields_

[Image: 2 outlined text fields in enabled empty state and in focused populated state have visual cues to identify their state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmtsdstko-02.png?alt=media&token=e4b7e284-6ba8-4288-9c5c-45c9d451a1cd)

_Outlined text fields_

Containers improve the discoverability of text fields by creating contrast between the text field and surrounding content. 

In some contexts, outlined text fields can improve the perception of the fields with a 3:1 or greater contrast ratio between the container outline and the background.

[Image: An outlined text field with label text that passes the minimum contrast of 3:1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32k7wf-3.png?alt=media&token=679bc72b-1edd-4a37-9f0c-462d91c195a6)

_Make sure the container outline has a minimum contrast of 3:1 to the background_

[Image: An outlined text field with label text fails the minimum 3:1 contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32kef6-4.png?alt=media&token=9677297e-c97b-4210-9a25-2c9268b02806)

_Don't choose colors that won't pass Material's minimum contrast of 3:1_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Tab | Focus lands on (non-disabled) text field |

#### Labeling elements

If the UI text is correctly linked, assistive tech (such as a screenreader) will read the UI text followed by the component’s role.

The accessibility label for a text field is the same as the text field label.

[Image: The text field and accessibility label both read “Email.” The role is “textbox.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32ks8b-5.png?alt=media&token=12c43d38-d18f-417c-b8fc-13110c145ffa)

_A text field’s label should include its UI text_

For text fields with interactive trailing icons, the accessibility label clarifies its function.

For example, when a password is hidden, the label for the view icon is "Show password," and when the password is visible, the label is "Hide password."

When an icon has no actionable role, like an error icon, the label is "Error."

[Image: The trailing icon’s accessibility label “Show Password.” The role is “Button.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32l5y8-6.png?alt=media&token=b4271bd0-47bf-4af4-b9f7-fb693bf843be)

_When a trailing icon in the field acts as a button, the label should clarify function, while the role explains the component type_

The prefix and suffix of a text field provides symbols and abbreviations to help users enter the correct values. 
 
The accessibility label for prefix and suffix needs to have a unique id attribute, for example, the currency name for a currency symbol prefix.

[Image: Text field accessibility labels “UI text” are “Euro” for a currency prefix and “At gmail dot com” for the email address suffix.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32leg0-7.png?alt=media&token=9d09f464-5f11-40c9-8310-af201dd18e29)

_A form containing fields with both a prefix for currency, and a suffix for email address_

When there is an error, "alert" is applied to the role and the error message to the text label.

If a text field displays both supporting text and error text, the label should include the supporting text first, followed by the error text.

[Image: The text field accessibility labels is: UI text “Not a valid ZIP code.” The role is “Alert.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32lojq-8.png?alt=media&token=a55926cc-d2d2-4451-8fe2-74a515db3a16)

_Text field error messages should be given an “alert” role in accessibility labels_

The accessibility label for the character counter clarifies the number of characters that can be entered into the text field.

[Image: A character counter's accessibility label reads: UI text (“Character count, 5/20”)](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32m4pa-9.png?alt=media&token=aac93da1-54a2-4b87-a1bc-68807f59bbd4)

_The remaining character counter should be called “character count” within the label_

The text displayed in the supporting text is also used for its accessibility label.

[Image: The accessibility label uses the supporting text. It reads: UI text (“Please use the company email address”). Role No role.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32meu7-10.png?alt=media&token=4caf165e-0a75-4e05-8be8-410f681c8874)

_Text field supporting text should have its own accessibility label_

If a text field requires input, indicate so with an asterisk at the end of the text field label. The accessibility label must include the asterisk.

[Image: Accessibility label reads: UI text (“Username*”). The role is “Textbox.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flx32mlzg-11.png?alt=media&token=72a43825-5286-49d6-9f49-7bb37a11e0f4)

_A required text field’s accessibility label should include any supporting text_
