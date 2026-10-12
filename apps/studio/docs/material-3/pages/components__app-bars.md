# App bars

Source: <https://m3.material.io/components/app-bars> (content version 2026-09-23_06-10-05, page updated 2026-07-24T06:22:06.561Z)

## Overview

- 

Focus on describing the current page and provide 1–2 essential actions
- 

Displays labels and page navigation controls at the top of the page. (Use a toolbar to display page actions)
- 

Four variants: Search app bar, small, medium flexible, large flexible
- 

On scroll, apply a fill color to separate from body content
- 

Can animate on and off screen with another bar of controls, like a row of chips

[Image: 4 configurations of app bars stacked vertically to show differences.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlktxqjf-01.png?alt=media&token=fe608fa5-00d5-4278-a2a5-2edcdbb248d0)

_1. Search app bar
2. Small
3. Medium flexible
4. Large flexible_

#### Availability & resources

#### M3 Expressive update

**May 2025**
The new **search app bar** supports icons inside and outside the search bar, and centered text. It opens the search view (https://m3.material.io/m3/pages/search/overview) component when selected. 

The new **medium flexible** and **large flexible** app bars come with significant improvements, and should replace **medium** and **large** app bars, which are no longer recommended. The **small** app bar is updated with the same flexible improvements. 

More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

Variants and naming:

- 

Renamed component from **top app bar** to **app bar**
- 

Added **search app bar**
- 

**Medium** and **large** app bars are no longer recommended
- 

Added **medium flexible** and **large flexible **app bars with:

  - 

Reduced overall height
  - 

Larger title text
  - 

Subtitle
  - 

Left- and center-aligned text options
  - 

Text wrapping
  - 

More flexible elements for imagery and filled buttons

- 

Added features to **small **app bar:

  - 

Subtitle
  - 

Center-aligned text option
  - 

More flexible elements for imagery and filled buttons

[Image: 4 total app bar configurations.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlku5356-05.png?alt=media&token=76ad704f-5607-425a-83a1-0f2ae2ca8f2e)

_1. Search app bar
2. Small
3. Medium flexible
4. Large flexible_

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color
- On scroll: No drop shadow, instead a color fill creates separation from content
- Typography: Larger default text
- Layout: Smaller default height

[Image: M2 top app bar with elevation to separate it from main content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmdho0pd-04-3P.png?alt=media&token=da65583f-2790-41fc-81cb-d0fd0fed567c)

_M2: Elevation and a drop shadow raise the top app bar when content is present underneath_

[Image: M3 app bar with subtle color difference from main content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlkui2vk-07.png?alt=media&token=ab974573-5f3b-469a-9779-173b3101e1f0)

_M3: On scroll, a color fill overlay separates the app bar from the content beneath_

## Specs

#### Variants

[Image: 4 variants of app bars.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmagk85x-01-3P.png?alt=media&token=f4b3768f-c723-4ad0-b874-8add82998732)

_1. Search app bar
2. Small
3. Medium flexible
4. Large flexible_

##### Baseline variants

The baseline M3 **medium** and **large** app bars are no longer recommended in M3 Expressive, and should be replaced with **medium flexible** and **large flexible** app bars, which are similar visually, but have multi-line support, a shorter height, and can contain a wide variety of elements, like images. Jump to baseline app bar specs (https://m3.material.io/m3/pages/app-bars/specs#faec9baf-140f-41dc-8b88-2792e90d9d5d)

[Image: 2 baseline app bar variants, medium and large.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmar0379-01-deprecated-3P.png?alt=media&token=5bc2c581-dfea-4b04-af42-2eee017bc73a)

_Baseline variants

1. 

Medium
2. 

Large_

| Variant | M3 | M3 Expressive |
| --- | --- | --- |
| Search app bar | -- | Available |
| Small | Available | Available |
| Center-aligned | Available | Merged into **small**. Use centered-text configuration. |
| Medium (baseline) | Available | Not recommended. Use **medium flexible** |
| Medium flexible | -- | Available |
| Large (baseline) | Available | Not recommended. Use **large flexible** |
| Large flexible | -- | Available |

#### Configurations

##### Text alignment

[Image: 4 variants of app bars with different left and center aligned text headlines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmah1clb-02-3P.png?alt=media&token=8bb55fe8-792f-4e9d-bbe4-b8087281207e)

_Text labels, including supporting text, can be aligned to the leading edge or centered_

| Category | Configuration | M3 | M3 Expressive |
| --- | --- | --- | --- |
| Text alignment | Leading edge (default) | Available | Available |
| Centered | -- | Available |  |

#### Tokens & specs

Select a token set to view in the table's menu. App bar token sets are organized into a common token set, and size-specific tokens. Learn about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.3ec622835c7987b5.md]

##### Search component tokens & specs

The default search component tokens are used in the search app bar.

[Token table: see ../tokens/TOKEN_TABLE.07341534518f78d0.md]

#### Anatomy

[Image: 5 elements of the component.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmahcxrn-03-3P.png?alt=media&token=dee6a9ac-4550-46f7-afed-1503ba60e005)

_1. Container
2. Leading button
3. Trailing elements
4. Headline
5. Subtitle_

App bars can be customized to include:

- An image or logo
- A subtitle
- A filled icon button

Avoid customizing the size of the heading and subtitle, or adding too many actions.

[Image: 3 app bars: 1 with a newspaper logo, 1 with a subtitle, and 1 with a filled icon button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmahfvsg-04-3P.png?alt=media&token=3c3da553-0d20-4215-a307-7355f3e97a41)

_The app bar can have different layouts depending on which elements are shown_

##### Search

The search app bar can include trailing actions inside and outside the search bar. When the search bar is selected, it should open the search view component.

[Image: 5 elements of the search app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmahnmz2-05-3P.png?alt=media&token=22ee7ea7-1df4-4a7d-95ce-ff42f83ec483)

_1. Container
2. Leading icon button
3. Hinted search text
4. Trailing icon or avatar
5. Search container_

[Image: 3 layouts of icons in the search app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmahv36y-06-3P.png?alt=media&token=12c2ad1e-b608-4977-9dc6-b56085f99efd)

_1. A leading element and a trailing element outside search
2. A leading element, a trailing element inside search, and a trailing element outside search
3. A leading element and two trailing elements outside search_

##### Image 

An image can be placed in the app bar. In small app bars, this can replace the label text.

[Image: Graphic replacing text headline content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaiawq3-07-3P.png?alt=media&token=7973518d-24eb-47d4-bf91-29091cde0f79)

_Images can be added to app bars and can replace label text on small app bars_

##### Filled trailing icon button

The app bar's trailing icon buttons can be replaced with a single, primary, or tonal filled icon button in default or wide sizes.

[Image: App bars configured with filled trailing icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaiezk5-08-3P.png?alt=media&token=35d786d8-d9a1-4c18-9e4b-db1606b4ac43)

_The trailing icons can be configured to be a single filled icon button_

##### Subtitle

[Image: App bars configured with subtitles below their headlines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmao48ka-09-3P.png?alt=media&token=c99d158e-422b-4454-b89c-359a5c99e7af)

_The medium flexible and large flexible app bars hug the text contents, so they are taller when a subtitle is visible

1. Small
2. Small with subtitle
3. Medium flexible
4. Medium flexible with subtitle
5. Large flexible
6. Large flexible with subtitle_

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

All app bars share the same color roles. On scroll, the container changes color to **surface container**.

[Image: 4 color roles of the leading edge app bar in light and dark scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaoaorq-10-3P.png?alt=media&token=81cfa880-1bee-497e-8e12-dd4fcd127a37)

_App bar color roles used for light and dark themes:

1. Surface
2. On surface
3. On surface variant
4. On surface
5. On surface variant
6. Surface container (on scroll)_

[Image: 4 color roles of the center-aligned app bar in light and dark scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaod25k-11-3P.png?alt=media&token=6c3264aa-5fc5-473a-9be6-7df09e087e18)

_Search app bar color roles used for light and dark themes:

1. 

Surface 
2. 

On surface variant
3. 

On surface variant
4. 

On surface variant
5. 

Surface container
6. 

Surface container
7. 

Surface container highest_

##### Scroll states

[Image: Color roles for app bars when flat and on scroll.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaof4ew-12-3P.png?alt=media&token=d415b2d4-018a-427e-8dd5-c04161f65b1f)

_The app bar changes color when flat or on scroll. The search bar can also change color on scroll.

1. Flat
2. On scroll_

#### Measurements

##### Search app bar

[Image: Search app bar size and padding measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaonw2d-13-3P.png?alt=media&token=d231e0ce-4b66-4e1e-bdf4-3d0c05add1eb)

_Search app bar padding and size measurements_

##### Small app bar

[Image: Small app bar size and padding measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaoprdb-14-3P.png?alt=media&token=eb64f015-3fda-4a6f-a1ac-851b7e2b622b)

_Small app bar padding and size measurements_

##### Medium flexible app bar

[Image: Medium flexible app bar padding and size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmap4u9c-15-3P.png?alt=media&token=2aba72f0-d565-4ee3-aeb9-e4583c00069e)

_Medium flexible app bar padding and size measurements_

##### Large flexible app bar

[Image: Large flexible app bar padding and size measurements](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmapnkl4-16-3P.png?alt=media&token=98a8959d-34a9-40d4-9a2f-28f066ffdc74)

_Large flexible app bar padding and size measurements_

#### Baseline app bars

The **medium** and **large** app bars are no longer recommended in M3 Expressive. Use the **medium flexible** and **large flexible** app bars in their place.

[Image: 4 elements of medium and large app bars.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaqk9ki-17-deprecated-3P.png?alt=media&token=b1be4d49-8395-4deb-9fb3-4cbb0c03fdb7)

_Medium and large app bars have the same elements:

1. Container
2. Leading button
3. Trailing icons
4. Headline_

##### Tokens & specs

Select a token set to view in the table's menu. Baseline app bar token sets are organized into medium, large, and older baseline token sets. Learn about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TABLE.3ec622835c7987b5.md]

##### Color

Color values are implemented through design tokens. For designers, this means working with color values that correspond with tokens. In implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 4 color roles of the medium top app bar in light and dark scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaqrta6-18-deprecated-3P.png?alt=media&token=a54e3621-ef99-4168-b3a9-9cdc9606eb71)

_Medium top app bar color roles used for light and dark schemes:

1. Surface
2. On surface
3. On surface
4. On surface variant_

##### Measurements

###### Medium app bar

[Image: Diagram of medium app bar padding and size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaquor6-19-deprecated-3P.png?alt=media&token=f4fa6be1-bfde-4707-8d64-1d868073e86e)

_Medium app bar padding and size measurements_

###### Large app bar

[Image: Diagram of large app bar padding and size measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmmaqwh2h-20-deprecated-3P.png?alt=media&token=57be919c-7a77-45d1-880e-9afae140b506)

_Large app bar padding and size measurements_

## Guidelines

[Image: 4 app bars with headlines and action icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnt9v4x-01.png?alt=media&token=0cdcf9fb-c1f2-4dd5-8746-6e414feee9bb)

_App bars show information about the page, key actions, and navigation actions like **Back** or **Menu**_

#### Usage

Use an app bar to provide content and actions related to the current page, such as page navigation actions, headlines, images, and 1–2 essential actions.

The information and actions in the app bar should be contextual and specific to a page, but can also include global product controls, such as search or notifications.

[Image: App bar with navigation icon buttons and a 2-line title.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntdon8-02.png?alt=media&token=7474bc26-0192-42ed-9ae4-d429ee924607)

_App bars provide content and actions related to the current page_

App bars should only have one action, two if necessary. 

The primary action should alter or exit the entire page, like **Send**, **Save**, or **Edit**.

If the product has many actions, place those in a toolbar. Avoid placing an overflow menu in the app bar when possible.

[Image: App bar with content below.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnth1j3-03.png?alt=media&token=20971f34-e3ce-481d-ab93-7e6515060d07)

_App bars can display one high visibility action to boost its prominence_

To boost visibility of a primary action, change the style of the icon button to filled or tonal, and consider using a wide icon button.  

Avoid using multiple filled or tonal buttons.

[Image: App bar with 1 filled button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntiy4b-04-do.png?alt=media&token=377f38d5-e584-48cc-bc4c-7b6924efb2bd)

_Use a filled or tonal button for important actions_

[Image: App bar with 2 filled buttons, side by side.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntjjnv-05-dont.png?alt=media&token=7edfa0f2-f8ca-4ccc-a273-8fc079488693)

_Don’t put multiple filled or tonal buttons in the app bar_

The four variants of app bars are:

1. 

**Search app bar**
Use on home pages when search is key to the product. 

2. 

**Small**
Use in dense layouts or when a page is scrolled.

3. 

**Medium flexible**
Use to display a larger headline. It can collapse into a small app bar on scroll.

4. 

**Large flexible**
Use to emphasize the headline of the page.

[Image: The 4 app bar variants.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntmieq-06.png?alt=media&token=c19118e7-becf-4020-9834-4808d65dff6e)

_1. Search app bar
2. Small
3. Medium flexible
4. Large flexible_

##### Baseline app bars

There are two baseline app bars that are no longer recommended:

1. 

**Medium**
Replace with medium flexible.

2. 

**Large**
Replace with large flexible.

[Image: 2 baseline app bars.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntnwot-07.png?alt=media&token=dda26bc8-d2d7-4573-a638-b392ab477962)

_1. Medium 
2. Large_

#### Search app bar

Use a search app bar to provide an emphasized entry-point to open the search view.

[Image: A search bar within an app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntr0ls-08.png?alt=media&token=3d8eef75-94d0-4d8f-9ccf-fbda3f747b4e)

_Search app bars have a search field instead of heading text_

Search bars should always include the word **Search**. They can use various capitalization styles depending on the product.

1. 

**Search**
2. 

Searching a specific area
Example: **Search inbox**
3. 

Search [Product] 
Example: **Search Photos**

[Image: 3 examples of search text in an app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntrvt2-09.png?alt=media&token=1cbbdac4-2b41-433c-a6f0-f9eaefdb7f86)

_Use proper capitalization depending on what’s being searched_

##### Buttons in search app bar

In addition to a trailing avatar, search app bars can have up to two trailing icons on mobile. 

Trailing icons can be placed inside or outside the search bar.

[Image: 2 icons placed in the search bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntvpyq-10.png?alt=media&token=e8605375-74f6-4f86-95ba-3cbf97a0abb9)

_Put the most used actions on the left and least used on the right_

The leading element of a search app bar can be used for a product’s logo to brand the app’s overall experience. 

This logo can be purely cosmetic, or can trigger an action like returning to the home screen or refreshing it. 

Avoid using a logo to open an expanded navigation rail.

[Image: A search app bar with a logo, search bar, and avatar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlntz91y-11.png?alt=media&token=9075c294-0618-48e2-ad59-fa6c078f1d9f)

_The leading element can be a product logo_

Don’t use more than two trailing icon buttons with an avatar. 

If more actions are needed, place them in a toolbar instead.

[Image: 3 icons placed in a search app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnu01cf-12-Dont.png?alt=media&token=0e553615-403a-4262-82e9-e288d7c660e0)

_Don’t use three icons and an avatar in a search app bar_

##### Large screens

The search app bar dynamically adapts to available width. There should be up to four trailing icons on larger screens.

[Image: 4 actions placed in a search app bar on a large screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnu4je0-13.png?alt=media&token=7e18830b-0ad8-4daf-bd6c-a4444703e399)

_Increased horizontal space on larger screens allows for up to four trailing icons._

##### Alternate color options

By default, search containers in app bars use the **surface container** color to distinguish it from the app background. If the background is darker, use a lighter container color on the search bar, like **surface bright**.

When choosing alternate colors, make sure the search text and container have at least 3:1 contrast for readability.

[Image: App bar with a light search container color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnu68g2-14.png?alt=media&token=1a01e007-1a24-4d4e-844e-2974b56e060b)

_Search app bars can use different colors, like **surface bright**, for improved contrast with surrounding elements_

#### Anatomy

[Image: Diagram of app bar layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnub2xp-15.png?alt=media&token=3c28ab87-33b2-4e09-b2b7-207d28656b2f)

_1. Container
2. Headline
3. Trailing icons
4. Subtitle
5. Leading button_

##### Container

The app bar container holds all information and actions at the top of a screen, including navigation icons, headlines, and buttons. 

Avoid changing the position or shape of the container.

[Image: App bar with square corners.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnuf0r2-16-do.png?alt=media&token=1fb862a0-8a65-4d93-af58-23b8f45e9603)

_Use straight corners for app bars_

[Image: App bar with curved corners.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnugbt5-17-dont.png?alt=media&token=c7c569a5-2a81-4583-a069-489e9e24fba9)

_Don’t use curved shapes. This implies that the container can expand upon interaction._

Always use the default height of the app bar, and make it span the full width of the window.

[Image: App bar at default height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnuiiym-18-Do.png?alt=media&token=9eb7bc81-3b55-4eea-bd7b-056e75806c41)

_Default heights were chosen to ensure readability of on-screen elements_

[Image: App bar with reduced height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnuja9a-19-Don't.png?alt=media&token=1545b8ba-fdf0-47ac-8a4a-ff46376cd5d3)

_Don't make an app bar shorter than its default height_

##### Adding logos

Image logos can be used in app bars to bolster brand identity or visual appeal. 

The image should be high quality and pertinent, and shouldn’t disrupt the app bar's functionality.

[Image: A logo added to an app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnuliot-20.png?alt=media&token=adba677c-2152-4281-8bd4-f8716770b7af)

_Image logos can replace all text in small app bars, and appear above the text in other app bars_

##### Leading button

The leading button should be used for navigating the product. 

It typically is one of the following:

- 

A menu icon, which opens a modal expanded navigation rail
- 

A back arrow, which returns to the previous screen

[Image: Leading navigation icon aligned on left of app bar](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnumedg-21.png?alt=media&token=3e674e2f-9102-4572-8d2d-b53da2435447)

_1. Leading **Back** button_

##### Headline

The headline can describe:

- The current page
- The current section
- The product

Headline text should be brief enough to easily fit in the app bar. 

In medium flexible and large flexible app bars, the headline can wrap to a second line. 

Don’t truncate the headline text.

[Image: App bar headline text set in 2 lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnurf1u-22-Do.png?alt=media&token=3a5b3bbb-92c1-4a5b-9bd1-7e14e49c3ad2)

_If headline text is long, use a medium flexible or large flexible app bar and wrap the headline to two lines maximum_

[Image: Small app bar headline text wrapped on 2 lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnus8yg-23-Don't.png?alt=media&token=5fd85933-3b19-4bd6-8d78-f0740a229798)

_Don’t wrap text in a small app bar_

Headlines can be aligned to the leading edge or centered.

The headline’s typography size and style change depending on the app bar variant.

[Image: Search, small, medium and large flexible app bars with headline styles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnuwnod-24.png?alt=media&token=b7d50c26-4b22-499d-937e-b8a46da6c6d2)

_Headline typography style for each app bar

1. Search: Body large
2. Small: Title large
3. Medium flexible: Headline medium
4. Large flexible: Display small_

##### Subtitle

Subtitles can add additional context to a page. 

These can be leading-aligned or center-aligned with the headline text.

[Image: Small to large flexible app bars with headline and subtitle styles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnvaru4-25.png?alt=media&token=2f11cf07-6128-4ce8-b884-25d866b7a3ab)

_Subtitle typography style for each app bar:

1. Small: Label medium
2. Medium flexible: Label large
3. Large flexible: Title medium_

##### Trailing icon buttons

Up to two icon buttons can be placed after the headline, aligned to the trailing edge of the app bar. Place most-used actions closest to the leading edge.

Avoid using these buttons to open a menu with more actions. If more actions are needed, place them in a toolbar instead.

If changing the icon button color style to filled or tonal, only use one icon button.

[Image: 2 icons placed to right of headline, from most to least used.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnvbo80-26.png?alt=media&token=486aa96c-7657-4afe-9ef1-79af0f159f63)

_Put the most used actions on the left and least used on the right_

Use filled icons when possible for the best visibility. Outlined icons can also be used, particularly for unselected toggle buttons.

[Image: App bar with 2 filled icons, “save” and “download.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnvcdyc-27-Do.png?alt=media&token=cdca83fa-7075-404b-aa93-c226a2252ef5)

_Use filled icons for clear, visible actions_

[Image: App bar with 2 outlined icons, “save” and “download.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlnvcyu3-28-Caution.png?alt=media&token=bc0b91fe-454e-4dcc-ba4c-37c03fd1633c)

_Outlined icons can be used as needed, or when using toggle buttons_

#### Adaptive design

Adaptive design allows an interface to respond or change based on context, such as the user, device, and usage. More on adaptive design (https://m3.material.io/m3/pages/layout-overview/adaptive-design)

##### Resizing

The width of the app bar container responds to the view or device width. 

It should always span 100% of the window width.

[Video: App bar resizing to wider view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlp67nmz-GM3%20-%20Top%20App-Bar%20-%20Responsive%20-%201P%20-%20v01.mp4?alt=media&token=3817c0ad-c435-480d-8464-bfaf3ec1632d)

_The app bar’s container responds to always fill the window width_

Resizing may cause actions at the trailing edge of the app bar to collapse into an overflow menu at smaller breakpoints. 

These actions become visible again at larger sizes.

[Video: Trailing icons in app bar collapse into overflow when screen size shrinks.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmaco62fo-GM3_Adaptive_AppBar_Guidelines_25_IA_V01.mp4?alt=media&token=b95b82f8-cd29-4351-b159-3ef00dc7ed27)

_Actions at the trailing edge collapse into an overflow menu_

The search container of the search app bar should fill 100% of the space between leading and trailing app bar elements until it reaches 312dp. Then, it should only grow further to fill 50% of that space.

[Video: Search app bar resizing to wider view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlp6cznn-GM3%20-%20App-bar%20-%20Guidelines_31%20-%20IA%20-%20v05.mp4?alt=media&token=9baefced-7a09-4d12-89e1-a2bd3468c036)

_The search field adapts to the amount of space between other elements in the app bar_

##### Presentation

The app bar automatically supports right-to-left (RTL) languages by aligning the layout of elements to the leading and trailing edges of the container. 

This means that in RTL languages, the layout of the app bar is mirrored.

[Image: App bar in RTL with Hebrew text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlp6doc5-32.png?alt=media&token=c3eed041-8305-4c9b-94de-18360f723822)

_The app bar’s layout is mirrored for right-to-left (RTL) languages_

#### Behavior

##### Scrolling

App bars should initially be the same color as the background, then fill with a contrasting color on scroll to provide visual separation from the background.

The app bar can remain on a page at all times, or can hide and reappear when scrolling.

[Video: Scrolling app bar container fills with contrasting color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlp6geio-GM3%20-%20App-bar%20-%20Guidelines%2033%20-%20v01.mp4?alt=media&token=7d677477-0259-4855-85ff-0babbf9bbb27)

_Upon scrolling, an app bar container fills with contrasting color to create a visual separation_

To focus more on body content, consider setting the app bar container to be transparent on scroll. This allows the buttons to float above the content. 

Make sure icon buttons have a container fill. 

Consider using narrow-width icon buttons for actions, like **Back**, to reduce the amount of space they take up.

[Video: Medium flexible app bar compresses to transform into transparent small app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlp6hnuc-GM3%20-%20App-bar%20-%20Guideline%2034%20-%20IA%20-%20v03.mp4?alt=media&token=a2c8d4fc-4951-4bc3-a845-fa29260b8287)

_Upon scrolling, an app bar container remains transparent and actions inside become filled icon buttons_

Selecting the search bar should open the search view component.

[Video: A search app bar opening the search view component when selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlp6jluz-GM3%20-%20App-bar%20-%20Guidelines%2034%20-%20IA%20-%20v01.mp4?alt=media&token=7298f84c-2b09-41dc-a5a9-a500a37b55ba)

_When selected, a search app bar opens a search view_

When scrolled, **medium flexible** and **large flexible** app bars can transform into **small** app bars. They should remain small until the page is scrolled back to the top. Don’t transform app bars into a **search app bar**.

[Video: Scrolling top app bar compressing to scroll upwards or downward.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlp6o2a1-GM3%20-%20App-bar%20-%20Guidelines%2036%20-%20v01.mp4?alt=media&token=32fb22cd-ab4f-432e-92ba-5c895ba653f4)

_The app bar can hide when scrolling up and reveal when scrolling down_

[Video: Medium app bar compresses to transform into Compact top app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlp6pkl9-GM3%20-%20App-bar%20-%20Guidelines%2037%20-%20v01.mp4?alt=media&token=88f50bfa-9d7d-4a4c-8a99-60c239445e97)

_Medium and large flexible app bars can use the compress effect to transform into small app bars when scrolled_

## Accessibility

#### Use cases

People should be able to do the following using assistive technology:

- Understand what page they’re currently visiting
- Take actions or navigate to a new page destination
- Maintain access to app bar actions when the content is scrolled

#### Interaction & style

##### Touch

When tapping on an icon button, a touch ripple appears, indicating interaction feedback.

[Video: An animation of the user tapping on an action item and the ripple effect being shown.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlosdik1-GM3%20-%20App-bar%20-%20Accessibility%2001%20-%20IA%20-%20v01.mp4?alt=media&token=a64b98b3-db51-4137-bfa8-b481c5aa21ad)

_Touch: Tap_

##### Cursor

When hovered, the hover state provides a visual cue to the user that the element is interactive.

When clicked (in both active and inactive states), a ripple appears to indicate feedback.

[Video: A mouse hovering over a button in the app bar, then clicking.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlosc4c9-GM3%20-%20App-bar%20-%20Accessibility%20-%2002%20-%20IA%20-%20v01.mp4?alt=media&token=bee4841d-d415-4dd5-b247-ad3df00c5cf7)

_Cursor: Hover, Click_

##### Keyboard or switch

When navigating to an interactive element, a focus indicator appears to show that action can be taken.

When the element is selected, an action is then performed.

[Video: An example of how to navigate the app bar using a keyboard.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlosad0z-GM3%20-%20App-bar%20-%20Accessibility%20-%2003%20-%20IA%20-%20v01.mp4?alt=media&token=c39b29d2-ff9a-4bd4-a6f6-94e717cb2253)

_Interactive elements should have focus rings_

##### Initial focus

Focus should initially land on the leading button, since it’s the first interactive element of the app bar.

[Image: The tab button is used to navigate from the first button to the second button in the app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlos7r6g-04.png?alt=media&token=2389b948-f4b3-420d-9e6e-34f543525c2f)

_Use **Tabs** to navigate through interactive items_

[Image: The space or enter button activates the second action.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlos8gq8-05.png?alt=media&token=bafd0e8c-7cfe-4ee8-844e-d45367dc8a61)

_Use **Space** or **Enter** to activate actions_

#### Color

On search app bars, use the default color roles when possible.

- Search container: **surface container**
- Search label: **on surface variant**

On darker backgrounds, search bar containers can use the **surface bright** role to maintain strong visual contrast. 

If mapping to other color roles, make sure the text and container have 3:1 contrast to ensure readability.

[Image: A search app bar with default dark text on a light container background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlos5etv-06-do.png?alt=media&token=e55a083f-5a33-4ecc-9fef-d5946838d02d)

_Make sure search bars and their labels have at least 3:1 contrast. Use the default colors when possible._

[Image: A search app bar with custom light text on a light container background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlos65h6-07-dont.png?alt=media&token=0281bfc2-6d34-4c43-b2d3-e55f3b4e1e07)

_Avoid using custom color roles for the search bar container and search label text. If custom roles are necessary, make sure they have contrast of at least 3:1._

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| Tab | Move focus to the next interactive element |
| Space or Enter | Activate the focused element |

#### Labeling elements

The accessibility label for a title should be the same as the content within the title. If needed, add additional context to the accessibility label to ensure users understand what page they’re on or what content is being shown.

Screen readers will read the UI text followed by the component’s role.

[Image: The headline has accessibility role “Title”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlos1na5-08.png?alt=media&token=ad772624-922f-47f4-9bba-45c4e4129396)

_An app bar’s accessibility label can incorporate its UI text as well as additional context_

Label icon buttons according to their accessibility guidelines (https://m3.material.io/m3/pages/icon-buttons/accessibility).

[Image: The app bar icon button has the accessibility role “Button”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmlos0avb-09.png?alt=media&token=ea50a8f1-f6ec-4c0d-9693-c381e6b86ed0)

_An icon button should be clearly labeled on the action it takes, like **View on map**_
