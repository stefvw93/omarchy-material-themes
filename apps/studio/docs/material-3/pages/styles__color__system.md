# Color system

Source: <https://m3.material.io/styles/color/system> (content version 2026-09-23_06-10-05, page updated 2026-07-23T20:32:56.894Z)

> Create accessible, personal color schemes communicating your product's hierarchy, state, and brand

## Overview

**The Material color system includes:**

- Built-in set of accessible color relationships
- 26+ color roles mapped to Material Components
- Built-in dark theme colors
- Static baseline color scheme with default colors assigned to each color role
- Dynamic color features including user-generated and content-based color

Learn how the system works (https://m3.material.io/m3/pages/color/how-the-system-works)

[Video: Introduction to color guidance](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flinbli4g-MAT020.01-v4.mp4?alt=media&token=9731ccc6-7d03-42ec-bff6-115bddc39fc0)

_Learn about the value and function of Material 3’s dynamic color system and how it differs from past color systems_

View transcript

[Image: Primary, on primary, primary container, and on primary container roles shown in baseline light theme color scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm4hetcer-4.png?alt=media&token=232f45a0-28ae-45b4-891d-f656da56fe91)

_The baseline color scheme doesn't dynamically change_

[Image: Diagram showing an input color resulting in a simplified illustration of four roles of a color scheme. Shown in green and yellow in light theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9uoi8a-dynamic%20color.png?alt=media&token=a7969547-b71e-4d76-84d6-fe0ad98c7e62)

_A dynamic color scheme changes the UI's colors based on different inputs, like a wallpaper_

[Image: Diagram showing an orange input color generating a static orange color scheme for an auto heating UI element.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9uorlq-semantic-colors.png?alt=media&token=32f5150c-8487-48f8-bdc1-4491dc057f84)

_Specific colors, such as semantic colors, can be set to not dynamically change_

Products with dynamic color can automatically generate and assign colors to each element in the UI.

This provides:

- Personalized UI
- Accessible contrast
- User-controlled contrast
- Automatic dark theme

[Video: Screen of an email app changing color from red to green to yellow](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0ob8aeg-Untitled%20video%20(1).mp4?alt=media&token=983ab349-d3b4-44ed-81c6-8e5e491130a3)

_The UI colors change dynamically_

#### Resources

| Type | Link | Status |
| --- | --- | --- |
| Design | Design Kit (https://www.figma.com/community/file/1035203688168086460) (Figma) | Available |
| Implementation | Android Views (MDC-Android) (https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md) | Available |
| Jetpack Compose (https://developer.android.com/develop/ui/compose/designsystems/material3#dynamic_color_schemes) | Available |  |
| Flutter (https://pub.dev/packages/dynamic_color) | Available |  |
| Tools | Material Theme Builder (https://www.figma.com/community/plugin/1034969338659738588/material-theme-builder) | Available |

#### What's new

May 2025

##### Three levels of contrast

Color roles support three levels of contrast so people can select the one that best suits their vision needs. Contrasts also are tokenized.

[Image: Email app in standard contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrw9ybms-05.png?alt=media&token=3abcfad5-ee12-4b75-a29c-ca290b86876a)

_Standard contrast_

[Image: Email app in medium contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwa03ny-06.png?alt=media&token=f43cb4a5-1f6f-4626-a693-68a8cecc1119)

_Medium contrast_

[Image: Email app in high contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwa0o3p-07.png?alt=media&token=eedfb51e-40eb-4441-b53b-5854e7b21152)

_High contrast_

August 2024

##### More colorful text and icons

The following color roles are updated in light theme to be more colorful while still having accessible color contrast:

- On primary container
- On secondary container
- On tertiary container
- On error container 

Affected components:

- Badges
- Buttons

  - Buttons
  - Extended FAB
  - FAB
  - Icon buttons
  - Segmented buttons

- Chips
- Lists
- Menus
- Navigation bar
- Navigation drawer 
- Navigation rail 
- Switches
- Toolbars

[Image: Comparison of the color before and after the update, with FAB and button examples.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwa1hcg-08.png?alt=media&token=fe61c87c-7f96-421f-94a4-1f8c8c80208c)

_Colors used for text and icons now appear more colorful_

Oct 2023

##### Reorganized guidelines

Same color system, explained in a new way. Updated sections include:

- How the system works (https://m3.material.io/m3/pages/color/how-the-system-works)
- Advanced customizations (https://m3.material.io/m3/pages/advanced/overview)
- Color resources (https://m3.material.io/m3/pages/color-resources)

[Image: Diagram illustrating guidelines being reorganized](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9upnnh-reorganized-guidelines.png?alt=media&token=57c601ca-75fe-49c9-aef5-952f3bf00e68)

_The guidelines have been reorganized and updated_

Feb 2023

##### Tone-based surface colors

Tone-based surface color roles (https://material.io/blog/tone-based-surface-color-m3) have replaced the previous approach of surfaces at +1 to +5 elevation.  The new color roles are not tied to elevation and offer more flexibility and support for color features, such as user-controlled contrast.

[Image: Simplified tablet UI showcasing the application of surface roles, shown in light theme](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9urd5o-%5B1P%5D%20what-is-new-surface.png?alt=media&token=0c9aba76-eda9-4503-ac75-6114e7e99d8b)

_New tone-based surface colors offer more flexibility and support_

Technical changes were made to align the color system with Android SysUI:

- Updated the default light theme surface from tone 99 to tone 98
- Updated the chroma for the neutral palette, increasing it from 4 to 6
- Slightly darkened surface roles in dark theme

[Image: Before and after swatch of the default light theme surface, showcasing the difference in chroma and tone](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9urxta-chroma-tone-update.png?alt=media&token=9ae5f3c9-525d-4602-b0ed-d59af40ba43e)

_Changes in tone and chroma in the default light theme surface_

Feb 2023

##### Additional accent colors

Additional accent colors in the scheme provide more flexibility and choice for color application. In particular, a new set of fixed colors for the **primary**, **secondary**, and **tertiary** accent groups provide colors which stay the same across light and dark themes.

[Image: Fab and star icon show in fixed and fixed dim roles, in both light and dark theme](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9utr1z-whats-new-fixed-colors.png?alt=media&token=5f8ce61b-6eb8-4b8f-a336-08b01c9af58a)

_Additional accent colors provide more choice for color application_

## How the system works

#### It's like paint-by-number

Imagine your product screen as a paint-by-number canvas:

- Each element on the screen has a number
- Each number is assigned a color

[Image: UI in "x-ray" view where each element has a number instead of a color](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4mxjs2l-1.png?alt=media&token=a123a83d-6785-40ed-9dae-13d566e3399d)

_Each part of a UI is assigned a "number," and each "number" is assigned a color_

You can hand-pick a color for every "number" to create a static color scheme.

[Image: Green icon button in the UI, assigned a hand-picked color using a color picker](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4mxjwiz-2.png?alt=media&token=b53af031-c021-4fb8-ba5e-1c6c2b4c9c10)

_Static colors are hand-picked, like this green icon button_

But now, you can also use Material's dynamic color system to automatically generate an entire palette of accessible colors for each "number" from a single source.

This source can be a user's wallpaper, or in-app content like imagery. If the source changes, the product colors update to match.

[Image: Image showcasing how a source color is automatically applied to each "number"](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4mxk5mu-3.png?alt=media&token=b2543282-21d2-472f-87ed-ef63ec926c4f)

_Colors are generated dynamically from a user's wallpaper or in-app content_

You can customize how dynamic color appears in your product by:

- Setting the color source
- Adding static or harmonized colors
- Changing which "numbers" are assigned to which elements

Learn about advanced customizations (https://m3.material.io/m3/pages/advanced/define-new-colors)

[Image: Image showing a color wheel where a light red color is picked, which then populates the UI. In this example, some UI elements have been mapped to different "numbers"](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4mxkasm-4.png?alt=media&token=b0cb1a67-16ef-44dd-b951-d63f75ce011b)

_The color source can be changed, automatically changing the color scheme. The UI elements can have other "numbers" assigned to them._

#### Essential terms

##### Color role 

Like the "numbers" on a paint-by-number canvas, color roles are assigned to specific UI elements. They have semantic names like **primary**, **on primary**, and **primary container,** and matching color tokens. See all color roles (https://m3.material.io/m3/pages/color-roles)

##### Dynamic color

Dynamic color takes a single color from a user's wallpaper or in-app content and creates an accessible color scheme assigned to elements in the UI. If the user's wallpaper or the in-app content changes, the colors in the UI will change to match.

##### Static color

UI colors that don't change based on the user's wallpaper or in-app content. Static colors can be hand-picked or generated in design tools like the Material Theme Builder. Once assigned to their respective color roles and UX elements, the colors remain constant.

###### **Baseline static color**

The default static color scheme for Material products. See the baseline color scheme (https://m3.material.io/m3/pages/static/)

[Image: Diagram illustrating the steps from source color to key colors to tonal palettes to color roles to the UI](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9uzzb5-from-source-color-to-UI.png?alt=media&token=962f5bc2-868a-404e-a314-37b1467ecba8)

_The dynamic color process is automatic. A single source color is used to generate five key colors, which are used to make tonal palettes. Tones from the palettes are then assigned to color roles, which are in turn assigned to elements of the UI._

[Video: How dynamic color schemes are created.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flinbo537-MAT020.03-v3.mp4?alt=media&token=d22f7ac8-7c43-4730-831d-90ceaddfc783)

_The system generates dynamic color schemes using colors from images like wallpapers and in-app content_

#### How dynamic color generates color schemes

##### 1. It starts with a source color

There are three ways to get a source color.

###### **A. Generate it from a wallpaper**

User-generated color is sourced from a user's personal wallpaper. The wallpaper is digitally analyzed through a process called quantization, and a single color is selected as the source color.

[Image: Red source color is extracted from a wallpaper](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9v1jfc-wallpaper-source-color.png?alt=media&token=6fe82ae6-f02c-488e-b0e1-e1b94ee1ca78)

_Source color from a user's wallpaper_

###### **B. Generate it from in-app content**

Content-based color is sources from in-app content, like an album thumbnail image, logo, or video preview. 

Like user-generated color, the image is digitally analyzed through quantization, and a single color selected as the source color.

[Image: Blue source color is extracted from an podcast cover](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9v2356-in-app-content.png?alt=media&token=07c31cfd-52e9-493a-a4d6-b92fbeaf80ea)

_Source color from in-app-content_

###### **C. Pick it by hand**

A hand-picked source color is deliberately selected by a designer.

**Did you know? **The baseline static color scheme uses a hand-picked source color.

[Image: Green source color selected from a color picker](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9v32x5-hand-picked-color.png?alt=media&token=66bd9129-5bbd-447c-bb2d-98ce379b9bf1)

_Source color hand-picked by a designer_

##### 2. Feed the source color into an algorithm

Dynamic color is powered by the Material Color Utilities (https://github.com/material-foundation/material-color-utilities) (MCU), a set of color libraries containing algorithms and utilities that develop color themes and schemes in your app.

There are many color algorithms, but the most common ones are:

- **User-generated color algorithm
**Uses personal wallpaper to identify source color. Maps colors of specific tones (lighter or darker) into the scheme according to a combination of system design choices and user preferences.

- **Content-based color algorithm**
Uses image for source color. Tones are adjusted to match the appearance of the source image, while maintaining accessible contrast. 

- **Custom colors **
Colors closely match the chosen input colors, such as those representing brand or semantic meaning.

[Image: Color palette made by the user-generated algorithm](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9v56si-content-vs-user-left-user.png?alt=media&token=e6855edb-f3f7-4c8b-96c5-53a54ae48ca6)

_1. When run through the **user-generated color** algorithm, the source color is turned into a full color scheme_

[Image: Color palette made by the content-based algorithm](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9v5j63-content-vs-user-right-content.png?alt=media&token=7fd0ac00-3154-4d51-a4cf-75758d48022b)

_2. When run through **content-based color** algorithm, the same source color creates a slightly different color scheme. Some tones are adjusted to better match the appearance of the source image._

[Image: Color palette made by the custom color algorithm](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flnc8pq3o-content-vs-user-right-content.png?alt=media&token=c5300a4d-cbf4-4670-8e80-0dab375f0e6a)

_3. Custom colors, such as brand colors, can individually run through the algorithm to create a custom scheme that matches the brand_

##### 3. The algorithm generates key colors

Material's color algorithms manipulate the source color's hue and chroma to generate **five complimentary key colors**.

1. Primary
2. Secondary
3. Tertiary
4. Neutral
5. Neutral variant

[Image: Diagram of a source color generating five key colors: primary, secondary, tertiary, neutral and neutral variant](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9w1sps-from-source-color-to-key-colors.png?alt=media&token=44238439-ec0c-4d45-b7a2-6f2aea5f3dee)

_A source color generates five key colors_

##### 4. The algorithm creates tonal palettes

The system then manipulates tone and chroma values to create a **tonal palette** for each key color. Colors in these palettes are given a number from 0 to 100 in increments of 10, as well as 95, 98, and 99. Some palettes include more values.

[Image: Primary, secondary, tertiary, neutral and neutral variant tonal palettes, consisting of 13 tonal steps](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm612xcmj-13.png?alt=media&token=8cdf6484-55c8-45f7-b989-b2becd9ef8f8)

_The smaller the tonal value, the darker the color_

##### 5. The algorithm assigns tones to color roles

The algorithm uses accessible color relationships to **assign specific tones to the 26 color roles** in both light and dark theme.

For example, the algorithm assigns the color tone primary40 to the **primary** role and the tone primary100 to the **on primary** role.

See all color roles (https://m3.material.io/m3/pages/color-roles)

[Image: Diagram mapping color tones to roles](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm612xkza-14.png?alt=media&token=65142248-ae42-4818-9ade-d30b5cf2c110)

_Tones from the tonal palette are assigned to different roles_

[Image: Diagram of tonal palettes mapped to all color roles across light and dark themes](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm612xrj4-15.png?alt=media&token=141b2627-4abd-4db8-9342-37432e4b162b)

_Colors from the five tonal palettes are assigned to color roles. For example, primary roles are picked from the primary tonal palette, while surface roles are picked from the neutral tonal palette._

Dark theme colors are also automatically assigned so that apps receive both light and dark themes through a single set of color roles.

[Image: Diagram of dark theme colors](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flnem28e4-color-roles-dark-theme.png?alt=media&token=cfc39eb0-67a9-4414-9bb6-b0e43087babf)

_The same color roles are used in light and dark themes_

##### 6. The new colors are applied to the UI

The 26 standard color roles are already assigned to elements of the UI. When a new source color is picked, the UI dynamically changes color.

[Image: Diagram of all the color roles with an example of how it would look applied to a UI](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flna5nn2o-color-roles-UI-elements.png?alt=media&token=09e3359f-ca02-4ee0-b762-d2e14e1bfe33)

_Color roles assigned to the UI_

#### Color roles support three levels of contrast

In addition to light and dark theme, color roles also support three levels of contrast. This helps people select the contrast setting that best suits their vision needs:

- Standard (default)
- Medium
- High

The standard contrast emphasizes visual hierarchy using high and low contrast elements. People with vision disabilities may choose medium or high contrast options for better support.

[Image: Email app in standard contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwa95yk-18.png?alt=media&token=076d2645-3429-4db7-9b7a-6c11217f9238)

_**Standard contrast**

The baseline color scheme already uses mixed levels of contrast to reduce cognitive load_

[Image: Email app in medium contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwa99t2-19.png?alt=media&token=080c22f3-57b8-4e76-a5f5-1f93abd34689)

_**Medium contrast**

Provides a minimum contrast ratio of 3:1 for those who need more contrast, but may experience visual discomfort with higher contrasts from effects like halation._

[Image: Email app in high contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwa9f4u-20.png?alt=media&token=f202b60e-a2de-4d2e-956d-bff1f1da61d4)

_**High contrast**

Further emphasizes essential elements with a 7:1 contrast ratio to reduce visual distractions and enable users to focus. For example, high contrast is applied to the content in a card but not the card container._

The contrast settings are automatically applied to both light and dark themes.

[Image: The same mail app at three contrast levels, all in light theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwa9ldv-21.png?alt=media&token=1842c116-7ee0-438b-8816-44c371130dfb)

_Light theme_

[Image: The same mail app at three contrast levels, all in dark theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwa9q8s-22.png?alt=media&token=c39860c1-74fc-44e0-a5c0-73b744d85b05)

_Dark theme_

Custom components can support contrast levels by using Material's appropriate color roles. For example, use **primary container** and **on primary container**.

Use design tokens to apply color roles to custom components.

[Image: Custom volume slider component using Primary Container and On Primary Container roles, whose colors change automatically at standard contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flna5s0mi-user-controlled-contrast_12.png?alt=media&token=7a4b2a09-68dc-44e6-bcc2-84ae230ac73f)

_A custom volume slider can use **primary container** and **on primary container **color roles to support contrast levels_

[Image: Custom volume slider component using Primary Container and On Primary Container roles, whose colors change automatically at standard contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flna5shuk-user-controlled-contrast_13.png?alt=media&token=98766331-252a-48d2-a820-53dc11630029)

_At medium and other contrast levels, those color roles apply the necessary new color values_

#### Pairing accessible tones

The system manipulates hue, chroma, and tone (HCT) values to **create a tonal palette for each color** with tones ranging from 0 to 100.

Color has physical limitations—whether it's actual physics, our own biological visual limitations, or the limitations of on-screen color rendering. For example, some hues cannot exist with certain chroma or tones. Color limitations are the reason colors such as bright light blue or bright light red are not quite possible. This is why the chroma value may increase or decrease for some tones in a tonal palette.

[Image: 13 tones derived from a key color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm612y8rt-25.png?alt=media&token=e4d5c0e1-185c-44fa-908b-9c3002839c62)

_Tonal values range from 0 (black) to 100 (white). The smaller the tonal value, the darker the color._

Material's color algorithms use these palettes to find and **pair contrasting tones, **creating accessible color combinations.

Because tone can describe the lightness or darkness of a color, it's used to define accessible color relationships. Those relationships are built into Material's color algorithms.

For example, the algorithms assign a dark tone to a button's container color and a light tone to its label color, ensuring that the colors have a 3:1 contrast.

[Image: Colors of tones 50 and 98 used for button fill color and background fill color, which create a contrast greater than 3:1 between a button and its background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm612yd3c-26.png?alt=media&token=1ebd4f8b-1e78-4589-bc02-f411dbf29283)

_Using tones 50 and 98 for a button and its label creates an accessible 3:1 contrast_

For even more contrast, the algorithms assign tones even farther apart, achieving a 7:1 contrast.

This is the concept powering **user-controlled contrast** features.

[Image: Colors of tones 30 and 98 used for button fill color and background fill color, which create a contrast greater than 7:1 between a button and its background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6134eza-27.png?alt=media&token=17bc3773-7657-4067-9821-a118a42a0909)

_Using colors of tones 30 and 98 for a button and its label create a 7:1 contrast_

#### Defining colors with hue, chroma, and tone (HCT)

**The system uses a color space called HCT**, which defines all colors using three dimensions: hue, chroma, and tone.

Changing HCT values lets you manipulate colors in flexible but predictable ways. Unlike other color spaces (like HSL or RGB), HCT allows the manipulation of a color's hue and chroma without affecting its tone. Watch to learn more:

[Video: Animated video explaining the three color dimensions (hue, chroma, and tone) and how they relate to accessible color schemes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Four-fake-design-system%2Fimages%2Flfmpm0pq-MAT020.02-v3.mp4?alt=media&token=39ca7b87-2339-4ad8-b2e2-2b69286c7e2e)

_Hue, chroma, and tone are the three color dimensions used to create accessible color schemes_

##### Hue

Hue is the perception of a color as red, orange, yellow, green, blue, violet, and so on. Hue is quantified by a number ranging from 0-360 and is a circular spectrum (values 0 and 360 are the same hue).

[Image: The hue spectrum looks like a rainbow circle.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flna5w3u0-hue.png?alt=media&token=61b24e9f-2268-4135-b3e3-df102b6ee769)

_360 degree **hue** spectrum_

##### Chroma

Chroma is how colorful or neutral (grey, black or white) a color appears. Chroma is quantified by a number ranging from 0 (completely grey, black or white) to infinity (most vibrant), though Chroma values in HCT top out at roughly 120.

Because of biological and screen rendering limitations, different hues and different tones will have different maximal chroma values.

[Image: Diagram showing chroma range from 120 (maximum intensity) to 0 (pure grey). A second diagram shows how pure black and pure white also correspond to 0 chroma](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flna5x1is-chroma.png?alt=media&token=f7e93869-ad3a-4938-95c3-66f5d344339f)

_1. The higher the color purity, the higher the **chroma**
2. Note how lightening and darkening a hue also affects its **chroma** value_

##### Tone

Tone is how light or dark a color appears. Tone is sometimes also referred to as luminance. Tone is quantified by a number ranging from 0 (pure black, no luminance) to 100 (pure white, complete luminance).

Tone is crucial for visual accessibility because it determines contrast. Colors with a greater difference in tone create higher contrast, while those with a smaller difference create lower contrast.

[Image: Gradient showing the range of tones from 1 (black) to 100 (white)](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flna5xncz-tone.png?alt=media&token=665bed68-9373-41e6-b15d-d5d7d1e1a05f)

_The 100 **tone** is always 100% white, the lightest **tone** in the range; the 0 **tone** is 100% black, the darkest** tone** in the range_

##### HCT isn't interchangeable with other color spaces

Values from models like hue, saturation, and lightness (HSL) won't perfectly map to Material's hue, chroma, and tone (HCT). Don’t conflate color spaces when inspecting or adjusting colors.

For example, colors with the same perceived brightness share the same tone value in HCT, but can have different HSL lightness values.

[Image: 3 color dots with the same HCT tone of 78, and varying HSL lightness values of 83, 65, and 77.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmrwafnpo-31.png?alt=media&token=6ffd59be-4877-4311-8a49-4bd11342d36d)

_HCT tone values remain constant when they have the same perceived brightness, while HSL lightness values can vary_
