# Typography

Source: <https://m3.material.io/styles/typography> (content version 2026-09-23_06-10-05, page updated 2026-08-28T15:09:40.768Z)

> Use typography to make content readable and beautiful

## Overview

- M3 type scale has 30 type styles: 15 baseline and 15 emphasized
- Use variable fonts for more control over expression in editorial treatments
- Use Material tokens to easily define font, line height, size, tracking, weight, and more

[Image: Type at different scales.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmac4t99d-1.png?alt=media&token=5c81069b-a395-423a-8628-e21378271a22)

#### Availability & resources

This shows where the type scale is available and implemented into Material components.

| Type | Link | Status |
| --- | --- | --- |
| Design | Design Kit (https://goo.gle/m3-design-kit) | Available |
| Google Fonts (https://fonts.google.com/) | Available |  |
| Implementation | Flutter (https://api.flutter.dev/flutter/material/Typography/Typography.material2021.html) | Available |
| Jetpack Compose (https://developer.android.com/develop/ui/compose/designsystems/material3#typography) | Available |  |
| Jetpack Compose: Expressive (https://developer.android.com/reference/kotlin/androidx/compose/material3/Typography) | Available |  |
| Android Views (MDC-Android) (https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md) | Available |  |
| Android Views (MDC-Android): Expressive (https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md) | Available |  |
| Web (https://github.com/material-components/material-web/blob/main/docs/theming/typography.md) | Available |  |
| Web: Expressive | Unavailable |  |

#### Updates

**Aug 2026**

##### Language script height support

Material’s type scale can adapt line height automatically based on language script height category: small, medium, large, and extra large.

Components can then adapt their size based on these language heights.

More on language height (https://m3.material.io/m3/pages/typography/type-scale-tokens#fcae9063-6c70-4512-87f9-3b6e0d8aea04)

[Image: Different line heights produced by different languages using Roboto Flex.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsnchyy9-07-3p.png?alt=media&token=131541ad-d85a-4594-b59e-b9455ae0b2c6)

_Line heights for styles like display large can automatically adapt to language height_

#### M3 Expressive update

**May 2025**

##### Updated M3 type scale with emphasized styles

Material’s type scale includes fifteen **baseline** type styles, the same as before, and fifteen new **emphasized** type styles. 

The emphasized type styles add more expression to highlighted moments.

Roboto Flex can be used on its own to show a range of emotional states, but is not yet part of the M3 typescale.

More on how to use emphasized styles (https://m3.material.io/m3/pages/typography/type-scale-tokens#0020d4d9-4f5b-4666-b3ce-c26db849bd73)

More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

[Image: Type scale showing roles for “display”, “headline,” “title,” “label,” and “body.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmac5g88o-2.png?alt=media&token=e6f292d1-1724-4a58-bd97-4a880f6ee0b2)

_The expressive type scale includes fifteen baseline type styles and fifteen emphasized type styles_

##### Emphasized type style tokens

Design tokens offer an improved way to define typography in products by assigning an element's type style by a configurable value, rather than a set value.

Emphasized tokens allow for clearer hierarchies and prioritized components within a layout.

Type roles describe size—such as small, medium, and large—enabling them to adapt and respond to the device or context.

[Image: Close crop of markdown text showing type scales referenced as “display-large” and “display-large-emphasized.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmac5las9-3.png?alt=media&token=dc037127-f767-45bd-b54f-8e0c21af01da)

_Typography tokens describe scalable size that adapts to devices or settings, including updating the style on boldness_

##### Google Design: Making Google Sans Flex

Learn how seven design problems shaped Google’s iconic typeface — from inception to going open-source.

Read the article on design.google (https://design.google/library/google-sans-flex-font)

[Video: Animation with different Google Sans Flex font styles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmphesmyk-01_GSF-Hero-Light-mode--16x9%205%20(1).mp4?alt=media&token=927ba121-361d-4f71-b279-d67beef529f9)

_Google Sans Flex can morph into an impressive range of styles, powered by its six variable axes_

#### Previous updates

##### Variable fonts

**Roboto Flex, Roboto Serif, & Roboto Mono**

Updated considerations for using variable fonts and different combinations of their customizable axes, including grade, width, weight, slant, and optical size.

[Image: Roboto Flex, Roboto Mono, and Roboto Serif type rendered in different weights.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmac5s4nr-4.png?alt=media&token=c35d6d6c-ff83-494a-8ec5-addb16c6f331)

_Roboto Flex, Roboto Serif, and Roboto Mono have a fluid range of axes, like weight, across all optical sizes_

##### Style roles

Type styles are defined by five roles: display, headline, title, body, and label.

These names are more descriptive, allowing for easier matching of type style to use case.

[Image: Different examples of Roboto scaled to their respective roles: display, headline, title, body, and label.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmac5vn8t-5.png?alt=media&token=51e80a07-4893-4d93-8b06-b402e90e1164)

_M3 has five distinct type styles: display, headline, title, body, and label_

## Fonts

Static fonts like Roboto (https://fonts.google.com/specimen/Roboto) are currently applied by default to all Material 3 components. Variable fonts (https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts) like Roboto Flex (https://fonts.google.com/specimen/Roboto+Flex) have many more axes for expression, but aren't yet part of the M3 typescale.

#### Default typefaces

##### Roboto

Roboto (https://fonts.google.com/specimen/Roboto) is the default typeface for Android, and is used in the M3 typescale (https://m3.material.io/m3/pages/typography/type-scale-tokens#6a9f9f26-99bb-4185-82fc-a49725da0d01). 

Roboto includes over 3,300 glyphs for representing hundreds of languages around the world.

[Image: A type specimen of Roboto.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmac6ta60-1.png?alt=media&token=22279a66-9af0-4f58-b1dc-fa0226060f88)

_Roboto is the default typeface in Android and Material 3_

##### Roboto Flex

Roboto Flex (https://fonts.google.com/specimen/Roboto+Flex) is a variable font which adds more flexibility to typography. It has an extended range of weights, widths, and additional customizable attributes (like size-specific designs), and includes over 900 glyphs with support for Latin, Greek, and Cyrillic.

Roboto Flex is available (https://fonts.google.com/specimen/Roboto+Flex) as a standalone font.

[Image: A type specimen of Roboto Flex.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmac6xqph-2.png?alt=media&token=725b3d28-c1ba-432f-8e27-f9fb43eb203a)

_Roboto Flex includes the styles of Roboto plus many more weights and widths optimized for larger and smaller sizes_

##### Roboto Serif

Roboto Serif (https://fonts.google.com/specimen/Roboto+Serif) is another variable font family, designed to create a comfortable reading experience. Minimal and highly functional, it can be used anywhere (even in app interfaces) due to its extensive set of weights and widths across a broad range of sizes.

[Image: A type specimen of Roboto Serif.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmac73g8d-3.png?alt=media&token=2aa33950-324d-4836-90e4-1f55ca0d01d2)

_Roboto Serif offers a functional set of weights and widths_

##### Roboto Mono

Roboto Mono (https://fonts.google.com/specimen/Roboto+Mono?query=roboto) is a monospaced version of the classic Roboto design. Being monospaced means each letter has equal space, and letterforms are adjusted to properly fill the space. 

Monospaced fonts are easier to scan vertically, so are particularly useful for code and keeping numbers aligned. Learn more about monospaced numbers (https://m3.material.io/m3/pages/typography/applying-type#f0f79df7-3174-4012-871e-93ce9a89d08b)

[Image: A type specimen of Roboto Mono.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaca32t3-4.png?alt=media&token=4e19a983-a787-4f06-8368-65112f03d582)

_Equal sizing for each character keeps uniformity of spacing_

##### Noto Sans

Noto Sans (https://fonts.google.com/noto/specimen/Noto+Sans) is a global font collection for all modern and ancient languages.

Each Noto Sans family is compatible with Roboto and Noto Sans supports more than 150 scripts and thousands of languages. It is used as a “fallback” font, when a language is unsupported.

Learn more about typography language considerations (https://m2.material.io/design/typography/language-support.html#language-considerations)

[Image: A type specimen of several Noto Sans fonts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaca7fj8-5.png?alt=media&token=93b0a97a-e4d5-4a00-9ef0-808628b7688e)

_Several Noto Sans fonts for different writing systems_

| Variable font | Available axes |
| --- | --- |
| Roboto Flex | Slant, Width, Weight, Grade, Optical Size. **Advanced axes: **Thick stroke (XOPQ), thin stroke (YOPQ), counter width (XTRA), uppercase height (YTUC), lowercase height (YTLC), ascender height (YTAS), descender depth (YTDE), figure height (YTFI) |
| Roboto Mono | Weight, Italic |
| Noto Sans | Width, Weight, Italic |

#### Fallback protection with variable fonts

Font fallback is when a similar font is used as a replacement when the current font doesn't support the text's characters.

For example, products using the variable font Roboto Flex should apply font fallback in the following order:

1. Roboto Flex
2. Roboto
3. Noto Sans font collection

This ensures that text will have a consistent visual style regardless of font support. Designers should connect with their product and engineering partners to confirm that font fallback is available.

[Image: Text examples from Roboto Flex, Roboto, and Noto Sans all show similar styling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacamced-6.png?alt=media&token=0b67278d-ff95-4b5a-adb4-6deee8db786e)

_Font branding is preserved when moving from Roboto Flex to Roboto to Noto Sans Japanese_

## Type scale & tokens

#### Type scale

A **type scale** is a selection of type styles used across a product to ensure consistency.

##### M3 type scale

Material 3 has one **type scale** containing two sets of **type styles: 15 baseline** and **15 emphasized**. Both of these style sets follow the same scale from Display Large to Label Small.

The **emphasized** styles were added in the expressive update. They have a higher weight and other minor adjustments compared to the baseline styles, and are best applied to bold, selection, and other areas of emphasis. Baseline and emphasized styles are meant to be used together.

[Image: Diagram of the M3 type scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacb26zl-1.png?alt=media&token=85df7aac-915a-4d7b-81b2-3768e32d3cd1)

_The scale is a range of contrasting styles that support the needs of various product contexts and content. No single product will use all the styles. Instead, select styles from the scale that are most appropriate._

#### Type scale tokens

Each of the 30 styles has a single token that captures all the default properties. Tokens are separated into the **baseline** and **emphasized** sets. Each axis and property, such as font, line height, size, tracking, and weight, also has an individual token for greater customization. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

##### Baseline type style tokens

[Token table: see ../tokens/TYPOGRAPHY.20543ce18892f7d9.md]

#### Emphasized type styles

The M3 type scale has 15 emphasized type styles. Use both baseline and emphasized type styles together to achieve expressive experiences. Material recommends using emphasized styles for selection, actions, headlines, and other editorial treatments (https://m3.material.io/m3/pages/typography/editorial-treatments#19e5796e-9db8-4687-b20c-c6cee77e7df8).

##### Emphasized type style tokens

[Token table: see ../tokens/TYPOGRAPHY.20543ce18892f7d9.md]

#### Where emphasized styles can be used

##### Components

When used in components, emphasized type styles can communicate hierarchy or importance, such as an active or selected component, or an unread message. The emphasized styles work well with:

- Badges
- Buttons (for primary actions)
- Extended FAB
- Selected list items
- Selected menu items

Material components don’t use emphasized type styles by default. To use an emphasized type style, swap the baseline token for the emphasized token of the same style. For example:

- Baseline: md.sys.typescale.display-large
- Emphasized: md.sys.typescale.**emphasized**.display-large

##### Weight

Use the emphasized styles on text that already uses weight (such as medium, bold) to communicate hierarchy.

##### Context

Use emphasized styles to draw attention to specifics aspects of components, such as selected states, unread messages, or key interactions.

Emphasized context and weight can be used at the same time.

[Image: Diagram showing emphasized styles being applied in and UI of an active call with live translation turned on.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacdkln0-2.png?alt=media&token=5a6210f3-6f9b-4a9f-a696-dd9c5fb72d93)

_1. Weight: Apply emphasized styles to text already bolded for an expressive style
2. Context: Apply emphasized styles to text in selective places to better communicate hierarchy or state_

#### Customize the typeface

The M3 type scale has the option to set different typefaces at different sizes. 

- The **brand** typeface is used for larger type styles, like Headline and Display, to focus on expression. 
- The **plain** typeface is used for smaller type styles, like Body and Label, to focus on readability. 
- Roboto is the default for both typefaces.

Consider replacing Roboto with different typefaces to boost brand expression in your product. On emphasized styles, this can help important text stand out even more.

[Image: Diagram showing emphasized styles being applied in a UI of an active call with live translation turned on.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmace0z70-3.png?alt=media&token=33689c0e-cfd1-447c-bc91-4d0b4923186c)

_Roboto can be replaced with another font, like Roboto Flex_

##### Brand and plain typeface tokens

[Token table: see ../tokens/TYPOGRAPHY.20543ce18892f7d9.md]

#### Language height support

The type scale can adapt line height automatically based on language height category: small, medium, large, and extra large.

Development considerations:

- 

It’s recommended to default to **medium language height**, as most languages fall in that category, and switch to other sizes based on detected language.
- 

Material components that use **vertical padding** should adapt to language height automatically. Components with fixed heights are built for **small** values and may not adapt by default.
- 

Ignoring language height can lead to overlapping text and broken UI elements, leading to major internationalization issues and failing readability standards.

[Image: Different font stylings produced by Google Sans Flex.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsnco8tv-07-3p.png?alt=media&token=adb2954c-fe1a-4e1d-badb-6970864162ee)

_Line heights for styles like **display large** can automatically adapt to language height category_

##### Language script categories

- 

**Small (base)**: Cyrillic, Greek, Hebrew, Latin-based languages (except Vietnamese)
- 

**Medium (~7% taller)**: Amharic, Arabic, Armenian, Bangla, Chinese, Gujarati, Hindi, Japanese, Kannada, Khmer, Korean, Lao, Malayalam, Odia, Punjabi, Sinhala, Tamil, Thai, Vietnamese, most other languages.
- 

**Large (~30% taller)**: Burmese, Telugu
- 

**Extra large (~100% taller)**: Nastaliq

##### Language height tokens

To view the language height tokens:

- 

Open the line height folder (Note: Other tokens like fonts and weights are in the same token set)
- 

Change the language height context at the top of the token module

[Token table: see ../tokens/TYPOGRAPHY.20543ce18892f7d9.md]

#### Customizing type styles

To customize existing type styles, follow these steps:

1. If using a different typeface, change the **brand** and **plain** typeface tokens. 
2. Adjust properties like line height and letter spacing to refine the appearance. Avoid changing the type size; this can affect how components render and reflow.
3. Repeat for both baseline and emphasized type styles. Try to keep emphasized styles visually consistent, like all wider than baseline.

Heavier fonts may require wider letter spacing, while fonts with long ascenders and descenders will require different line heights. Axes can be further adjusted as necessary.

**Note: **Customizing the M3 type scale or individual styles may prevent you from receiving typography token updates from Material.

[Image: Example type scales with custom typefaces and weights.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmace6o98-4.png?alt=media&token=6137e281-ba4e-433d-95df-73919fab36be)

_Adjust variable axes, like weight and width, to customize fonts like Roboto Flex_

Different typefaces can be used for baseline and emphasized type styles.

[Image: Example type scales with custom typefaces and weights.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaceaanz-5.png?alt=media&token=535cedd3-5009-4e2f-ba09-58491b257c94)

_Custom typefaces can be used together, like Baskervville and Jacquard_

#### Customizing your type scale

When different sizes from the defaults are needed, such as for different devices, you can customize the **type scale** by adding or removing styles, and even swapping out Roboto for a font of your choice.

Material Design uses the Major Second (https://cieden.com/book/sub-atomic/typography/different-type-scale-types#:~:text=with%2520dense%2520content.-,Major%2520Second%2520(1.125),-The%2520Major%2520Second) type scale with 14 as its key base size. This anchors to the most essential style used most often for typesetting body text.

[Image: Material Design’s default type scale; showing display, headline, and title sizes shown next to the Major Second type scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaceu8zs-6.png?alt=media&token=db16dfbe-1515-4a50-b087-d94eefd86868)

_The Material Design type scale uses the Major Second scale (1.125)_

Sizes on the rendered type scale should aim to provide impactful contrast between sizes by avoiding small differences.

[Image: Material Design’s default type scale; showing display, headline, and title sizes shown next to the Major Second type scale](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmafu03rn-7.png?alt=media&token=5efa840c-9af9-4768-ae1e-96bf43bcda65)

_Material’s default typescale of 15 styles allows distinction between each_

[Image: Display, headline, and title sizes shown next to the Major Second type scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmafu0asd-8.png?alt=media&token=15982f63-7760-4c29-a1cc-542da5bdde34)

_Your product likely will not need all 15 default styles from the Material Design type scale. In this example, five sizes are chosen for a reduced set while the rest are removed._

[Image: A size modification of Material Design’s default type scale where display medium is a larger size than the original scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmafu0fju-9.png?alt=media&token=3567a3d3-2a94-43b3-97dd-4bd9b04dbe85)

_If the default sizes from the Material Design type scale do not meet your needs, values can be changed instead. Here the default size of display medium is adjusted to another size from the Major Second type scale._

##### Font size units

The following units are used to express font size on Android and the web.

| Platform | Android | Web |
| --- | --- | --- |
| Font size unit | sp | rem |
| Conversion ratio | 1.0 | 0.0625 |

Web browsers calculate the REM (the root em size) based on the root element size. The default for modern web browsers is 16px, so the conversion is SP_SIZE/16 = rem.

###### Example conversions

| Android | Web |
| --- | --- |
| 10sp | 0.625rem |
| 12sp | 0.75rem |
| 24sp | 1.5rem |
| 60sp | 3.75rem |

##### Letter spacing units

The following units are for spacing letters in a UI.

| Platform | Android | Web |
| --- | --- | --- |
| Letter spacing unit | em | rem |
| Conversion ratio | (Tracking value in px / font size in sp) = letter spacing | (Tracking value in px / font size in sp) = letter spacing |

###### Letter spacing examples

| Android | Web |
| --- | --- |
| (.2 tracking / 16sp font size) = 0.0125 em | (.2 tracking / 16px font size) = 0.0125 rem |

## Applying type

#### Applying type

The Material 3 type scale organizes styles into five roles that are named to describe their purposes: display, headline, title, label, body. Each role has three sizes: large, medium, and small. These roles and sizes create clear page hierarchy and work across many devices.

#### Roles

##### Display

There are three display styles in the default type scale: Large, medium, and small. As the largest text on the screen, display styles are reserved for short, important text or numerals. They work best on large screens.

For display type, consider choosing a more expressive font, such as a handwritten or script style.

If available, set the appropriate optical size to your usage.

[Image: Example display typeface.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacjmd1h-01.png?alt=media&token=79a2e037-f740-45af-928b-d7797f4f54c2)

_An expressive typeface can be used for display styles, as shown here with Bagel Fat One_

[Image: Card featuring display size font.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacjqddd-02.png?alt=media&token=d3791091-145c-4dd9-9828-69754731b7dc)

_A card using a display size_

[Image: Large expressive typeface set above text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacjwt1d-03.png?alt=media&token=7596b7fa-53da-458a-b850-72b9c54d4d77)

_An expressive typeface can entice readers to engage with an eye-catching design, as shown here with Anton_

##### Headline

Headlines are best-suited for short, high-emphasis text on smaller screens. These styles can be good for marking primary passages of text or important regions of content.

Headlines can also make use of expressive typefaces, provided that appropriate line height and letter spacing is also integrated to maintain readability.

[Image: Example expressive headline typeface on phone screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacjyz7x-04.png?alt=media&token=e36cd441-e5e5-4f24-90d1-0d2fbea7b583)

_Expressive typefaces can be used for headlines styles as well, as shown here with Anton_

[Image: The name Ana Russo in headline style in a contact card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmack0w9r-05.png?alt=media&token=ccdae452-bdd9-442b-bc4e-e09435155f8e)

_Headline style used for short text on a small screen_

[Image: Headline style set above body text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmack28hn-06.png?alt=media&token=0cef2ada-0475-4f19-b7a7-b0076ac858bf)

_Dialog using a headline style_

##### Title

Titles are smaller than headline styles, and should be used for medium-emphasis text that remains relatively short. For example, consider using title styles to divide secondary passages of text or secondary regions of content.

For titles, use caution when using expressive fonts, including display, handwritten, and script styles.

[Image: An article card using title style for the article title.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmack408c-07.png?alt=media&token=8dab31f2-ae06-48a5-8476-a665639cad64)

_A news article title using the title style to capture attention, as shown here with Bebas Neue_

[Image: Top app bar using title style for the contact name, Aki Aro.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmack6viy-08.png?alt=media&token=016b3b3c-05cd-42d5-8741-7406e7ce4f54)

_App bar using title style_

[Image: Title style stating ‘Top News’ above headlines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmack8igb-09.png?alt=media&token=838a9a15-4226-4338-8760-3103c3be9d23)

_Example of title style applied to a category header: Top News_

##### Body

Body styles are used for longer passages of text in your app.

Use typefaces intended for body styles, which are readable at smaller sizes and can be comfortably read in longer passages.

Avoid expressive or decorative fonts for body text because these can be harder to read at small sizes.

[Image: Body-style typeface.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmackbvpu-10.png?alt=media&token=8b6efb52-c3bb-4ce6-8019-d8a0dbee9bad)

_Body styles must be readable for long passages_

[Image: Body style text in article.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmackfzlx-11.png?alt=media&token=69c8cd48-e4e7-4233-b6a8-a0fce3602393)

_Body style used throughout an article about pesto_

[Image: Three stacked examples of body style in app setup flow.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmackjtaf-12.png?alt=media&token=a028295b-e392-4b03-83cb-80422605e25e)

_Example of body style used throughout a setup flow_

##### Label

Label styles are smaller, utilitarian styles, used for things like the text inside components or for very small text in the content body, such as captions.

Buttons, for example, use the label large style.

[Image: Several label-style buttons on compact window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm845h3dq-13-3P.png?alt=media&token=8c767bd8-69da-4967-bccf-ffc786b6c393)

_Label styles should enable quick reading at small sizes, such as in buttons_

[Image: Music player timecode featuring label style.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmackqp3j-14.png?alt=media&token=d89cf9a7-ef1e-40c9-8948-4c08304d31e1)

_A music player using label style for the timecode_

[Image: Five labels set horizontally across the navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmafuf50h-15.png?alt=media&token=50f6ace8-34dc-49fa-9316-ac13f2e67fc4)

_A navigation bar using label style for the destination text_

#### Typesetting

Vertical typesetting relies on padding, bounding boxes, and baselines to ensure text legibility at any size.

Take engineering considerations and the conventions of your platform into account when making decisions for typesetting, text resizing, density, and using text in adaptive layouts.

##### Using padding and bounding boxes

Use this method for web products, and iOS products, where applicable. Note that some design tools also use bounding boxes for typesetting, but their methods vary and will need to be reconciled with the engineering implementation.

In web UIs, the line height and bounding box height are the same. Text is vertically centered within the bounding box, following the “half-leading (https://www.w3.org/TR/css-inline-3/#leading-trim)” behavior established by CSS.

The vertical position of the text isn’t controlled directly, but through the combination of the bounding box and font metrics.

[Image: Diagram of bounding box equaling line height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmackyuk9-16.png?alt=media&token=d6defbe4-08a7-4a42-912e-c0c27c52175b)

_The bounding box height is defined by the line height specified, with equal space placed above and below the text_

Padding is the space between UI elements, such as between an image and a bounding box, or between the inner edge of the bounding box and the text.

[Image: Diagram of 20 dp padding above text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacl0ia5-17.png?alt=media&token=f1dc7c2b-a738-42d2-8bc3-c3c5c56f31e2)

_The padding surrounding the text bounding box_

Specify the distance of UI elements from fixed reference points, such as the container edge. For the web, automate this calculation using Sass or CSS.

[Image: Measurements of label text padding.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacl33y5-18.png?alt=media&token=7f8ef37f-b95a-4023-b919-836853e548ec)

_Use line-height, padding, and container measurements for setting typography on the web and iOS_

Vertical alignment using padding and bounding boxes:

1. **Line height** 
Measure the height of the bounding box.
2. **Centering** 
Ensure equal top and bottom padding around the inner edge of the bounding box by using center align
3. **Spacing** 
Use the height of the bounding box, and top and bottom padding to determine spacing

[Image: Diagram of using padding and bounding boxes to measure line height, alignment, and spacing,](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacl7cnr-19.png?alt=media&token=ac4b207c-53aa-4d2c-b106-2fefe2a5c2a6)

__

##### Using the baseline

Use this method for Android products or platform-agnostic specs.

The baseline is the invisible line upon which a line of text rests. In Material Design, the baseline is an important specification in measuring the vertical distance between text and an element.

[Image: Diagram indicating the baseline of text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacldncz-20.png?alt=media&token=064eb61b-e569-4dfd-80b9-88936dc70d75)

_A line of text rests on the invisible baseline_

For Android, specifying distances relative to baseline enables accurate implementation.

The baseline can also be used to communicate text position between designers in a way that's agnostic to the platform or design tool.

[Image: Diagram of the distances between overline and container edge, plus subhead, overline, and caption text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmafug7pc-21.png?alt=media&token=05424831-215d-4ebd-8801-a1fe5a1b78ca)

_Android screens rely on distance to baselines for spacing_

Vertical alignment using the baseline: 

1. **Line height **
Measure distance from the text baseline of one line to the text baseline of the next line
2. **Centering** 
Specify center alignment as a reference instead of measuring the distance to the text baseline
3. **Spacing** 
Use the distance from a reference point to the text baseline

[Image: Diagram of using distance to baseline to measure line height, alignment, and spacing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacln6jx-22.png?alt=media&token=05b53438-a7bb-4621-a8b2-108ae53206e2)

__

#### Ensuring readability

**Line height**

Line height is the space between each line of text and is directly connected to type size.

Material’s type tokens are optimized for intended size and use.

[Image: An example of larger type with a line height ratio of 1.2](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacludjq-23.png?alt=media&token=ae09c5ab-7dfa-411b-943e-5661ce0cec90)

_For larger type legibility using styles like title, headline, and display, we recommend a line height ratio of 1.2 times the type size_

[Image: An example of body type with a line height ratio of 1.5.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaclv7q4-24.png?alt=media&token=164888ea-394c-41c9-b268-6475926bd0ec)

_For smaller body copy using styles like body and label, we recommend a line height ratio around 1.5 times the type size. If your line height is too tight, you’ll undermine the flow of the text. Too loose, and the lines won’t feel cohesive._

**Tabular numbers**

Use tabular figures (also known as monospaced numbers) rather than proportional digits in tables or places where values may change often, such as clocks.

Use monospaced tabular numbers to keep values optically aligned for better scanning.

[Image: Vertical view showing the spacing variation in proportional numbers versus monospacing of tabular numbers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmacly990-25.png?alt=media&token=ae46732a-1028-4011-bcd0-7c18c0e90a7a)

_1. Proportional numbers
2. Monospaced tabular numbers_

[Image: Times displayed in tabular numbers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaclzivd-26.png?alt=media&token=730baca9-cf88-4725-b797-8dfaed9f45e9)

_Use tabular numbers to prevent layout shifting when values change, such as in a clock UI_

#### Using Material Symbols with typography

Properly aligning typography with Material Symbols can improve cohesion and unity in your product. Learn more about matching icons and text (https://m3.material.io/m3/pages/icons/applying-icons#f9db4adc-ca78-473f-85eb-a351b73c39ac)

#### Accessibility

##### Color & contrast

Support visual accessibility by choosing the appropriate **color contrast** between your product’s text and background. Contrast is the perceived difference between the lightness or darkness of two colors, and is quantified by a **contrast ratio**.

[Image: Contrast between two colors, quantified by a contrast ratio, supports visual accessibility.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadkak1u-27.png?alt=media&token=9f51bcec-912b-4e88-b710-a8a0acb9b46b)

_Label styles should enable quick reading at small sizes, such as in buttons_

Text should achieve sufficient contrast between its color and that of its background. 

Material aims for two main text contrast levels:

- 3:1 for large text
- 4.5:1 for small text

Learn more about contrast ratios (https://m3.material.io/m3/pages/designing/color-contrast#b248ecd2-9abd-4877-8f5e-ebfbb87e2048)

[Image: Large text should achieve a contrast ratio of 3:1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadpdpks-28.png?alt=media&token=7b0fb1fe-941b-4336-a2f1-e1d1bd770bb2)

_Large text should achieve a contrast ratio of 3:1_

[Image: Small text should achieve a contrast ratio of 4.5:1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadpf3uf-29.png?alt=media&token=5b7520dc-7812-4096-9ad5-fdcc2af54e01)

_Small text should achieve a contrast ratio of 4.5:1_

The default color for typography is **on surface**, although **on surface variant** is a strong alternative.

[Image: Diagram showing the default color for text is "on surface."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadpks74-30.png?alt=media&token=72c714c0-5c5d-41a7-a67c-6d4ce6ba5336)

_Default typography colors_

For hyperlinked text appearing on top of a surface color, use primary. However, tertiary can be used to make links less prominent.

Hyperlinked text must also be underlined.

[Image: In a paragraph, md.sys.color.primary color is applied to an underlined hyperlink.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadprtta-31.png?alt=media&token=fa506f5c-76d0-4896-a1ef-f2d96edf97c7)

_Hyperlinks should be underlined and use primary or tertiary color_

## Editorial treatments

#### Editorial treatments

Editorial treatments are standalone, showcase moments driven by type. They involve dynamic, attention-grabbing use of custom sizes, which can involve larger display type or a blockier look and feel. They should depart from purely functional layouts or basic stages in a user flow. 

In the expressive system, editorial treatments can be combined with elements such as motion, shape, or color, to create product-wide hero moments.

[Image: A series of editorial moments making dynamic use of type, including a calculator, lock screen, and temperature.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadq1nd5-01type.png?alt=media&token=9db6d416-d4ea-453d-be71-145a3b505a93)

_In editorial treatments, type can freely dominate the screen_

#### Examples of editorial treatments

Use editorial treatments in three key ways: to celebrate content, to highlight the voice of the user, or to draw attention to bespoke functionality within the product.

##### Celebrating content

Editorial treatments can dramatically take over the screen to mark a particular user action, memory, or preference.

Try matching the text to the tone of the product or a strong emotion, like a narrow, thin style for serenity, or a bolder, italicized style for liveliness.

[Image: Large type reading “Mesa Verde National Park” with a hiker in the foreground.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadq59l2-02.png?alt=media&token=acbe49b8-adf2-4ff1-8902-fac245b3e1e0)

_Use an exuberant cover image for a photo album, here shown with Roboto Flex_

##### Voice of the user

Express the voice of the user by letting them personalize the appearance of typography or by adjusting text based on their input.

Use customization selectively to frame a user’s mood and make it stand out.

[Image: A text exchange in which one party is responding enthusiastically in extremely large letters.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadq8d7w-03.png?alt=media&token=e80c73ee-1a91-4d82-a6d4-083c704da11f)

_A response with the right type treatment can convey ecstatic emotion. Here, the text is shown in Roboto Flex and PT Serif Caption._

##### Bespoke functionality

Editorial treatments can also be used to help express moments of unique functionality within the product experience.

[Image: A slider to adjust bedroom lights. The characters increase in width and weight as the brightness is increased.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadqb4ho-04.png?alt=media&token=c653a859-971b-47b4-a0ed-fa87c9572436)

_The increase in the bedroom light brightness prompts an algorithmic response in the width and weight axes_

#### Editorial treatment best practices

As there is intentionally much room for choice in developing editorial treatments, there are a few guard rails that will prevent inconsistency, illegibility, or distracting design.

These best practices include:

- Ensuring consistency between similar-looking editorial moments, creating tokens for each where needed
- Matching the emotional tone of text to the task at hand
- Not mixing multiple or clashing styles in the same layout
- Not mimicking personalization theming

[Image: A UI showing two instances of editorial treatments with consistent styling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadqewpk-05.png?alt=media&token=c01f4019-695c-4153-8d48-6a0848574e52)

_Create tokens for editorial treatments to apply them consistently in your product_

[Image: A UI featuring a name in which the first is using a different custom type treatment than the last.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaeb01ji-06.png?alt=media&token=036d06d4-fff4-4a49-aaee-824e9f7df613)

_Use caution when mixing different editorial treatments in the same layout. Try to keep them consistent._

#### Use variable axes to make editorial treatments

Adjust variable font axes like weight, grade, width, and optical size to match the font to the feeling. Baseline and emphasized type styles can still be used. Though, editorial treatments shouldn’t be used in labels or just to give information.

##### Weight

Weight is the primary attribute that defines the overall thickness of a typeface’s strokes in any given font. The most common weights are regular and bold, but weights can cover extremes from the very light to the very heavy.

If the typeface is variable, it provides a full, continuous range of stroke thicknesses, making the number of weights effectively unlimited.

Learn more about weight on Google Fonts (https://fonts.google.com/knowledge/choosing_type/exploring_typefaces_with_multiple_weights_or_grades)

[Image: Many examples of Roboto Flex weights.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaeb490s-07.png?alt=media&token=875edc77-65fb-42e2-9596-9894e8d5b4e8)

_A variable font, Roboto Flex offers a fluid range of weights_

[Image: Light text in use as body text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadqr5nh-08.png?alt=media&token=137b7e87-696c-4eef-b3ae-999bfe9335ac)

_Be careful when using very light weight for body text. Lower-resolution displays can struggle to show thin typography, especially at small sizes. Instead, consider lighter weights at larger font sizes, such as display type._

[Image: Navigation bar using bold typography for label text, making it challenging to read.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaebxgxh-09.png?alt=media&token=aa01d321-efbd-4aa7-9897-5bb0052ab708)

_Excessive weight at smaller sizes can make text harder to read_

##### Grade

Grade is a secondary modifier of a typeface’s optical weight, independent of the weight axis. Both weight and grade axes affect a letter’s thickness, but adjustments with grade are much more granular and don’t change any letter widths or line breaks.

Learn more about grade on Google Fonts (https://fonts.google.com/knowledge/choosing_type/exploring_typefaces_with_multiple_weights_or_grades)

[Image: Three ampersands set in Roboto Flex without grade over Roboto Flex with 150 grade.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadqz6gm-11.png?alt=media&token=de2d264e-eea0-4aed-a108-d00d1b2d1cca)

_Roboto Flex offers a positive grade of 150 and a negative grade of 200_

[Image: A light and dark screen each showing the letter B.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadr3fuu-12.png?alt=media&token=c56d07ea-49cf-41ab-bf44-eff3470b765e)

_When switching between dark and light mode, the same text may appear heavier despite having the same settings. Consider using a negative grade to counteract this._

[Image: A list of amenities where the filter chip for “Elevator” and “Cats OK” are selected and have a heavier grade applied.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaec8aam-13.png?alt=media&token=1cec73a8-ef3b-4888-a97f-5314eb0c3048)

_Grade can change the emphasis without reflowing text_

##### Width

Width is the result of how much horizontal space is taken up by a typeface’s characters.

A narrow width allows more characters to fit per line while a wider width may offer more personality.

Learn more about width on Google Fonts (https://fonts.google.com/knowledge/glossary/width)

[Image: The letter ‘N’, set in Roboto Flex, rendered in varying widths.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaecbedx-14.png?alt=media&token=7b874a31-977d-4550-85e9-79b2627a6519)

_Roboto Flex offers a fluid range of widths, from 25 to 150_

[Image: A bottom navigation bar with four icons using narrow label text under the icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadrfrnd-15.png?alt=media&token=9157fcba-00c2-43c6-8119-361ce599270c)

_A thinner width can allow for more characters to fit at small sizes, such as in a label_

[Image: Top app bar with the title best thrift stores in wide type next to three icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaecc80f-16.png?alt=media&token=27677fb6-f0e7-4a16-ac5b-af705373b51b)

_Since wider styles take up more space, avoid using them for areas with limited space, such as in a top app bar_

##### Optical size

Optical sizes are different versions of a typeface optimized for use at different sizes.

Small size designs focus on enhancing readability, while large size designs can show off the intricacies of the letter forms and offer many more weights and widths.

Learn about choosing typefaces that have optical sizes. (https://fonts.google.com/knowledge/choosing_type/choosing_typefaces_that_have_optical_sizes)

[Image: The word hello at a small optical size overlaid over the word hello at a large optical size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaecgvtl-17.png?alt=media&token=f9c8a7df-cb5f-4e83-9d36-ddc19c6807fc)

_The typeface Literata has a continuous range of optical size, from 7pt to 72pt_

[Image: The words “massive” and “tiny” with optical sizes that match their type size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmadru5uv-18.png?alt=media&token=15ad23a7-ebf4-4db9-a5b6-e8c4a1c7cb00)

_Use an optical size that matches your type size_

[Image: Two paragraphs of text set with an optical size larger than the type size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmaechab8-19.png?alt=media&token=add731a0-daeb-463d-99d6-2db357ea1755)

_Don’t use large optical type sizes at small sizes. Instead use a smaller optical size, if available._
