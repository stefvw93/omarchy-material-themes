# Cards

Source: <https://m3.material.io/components/cards> (content version 2026-09-23_06-10-05, page updated 2026-07-24T06:14:10.548Z)

## Overview

- 

Use cards to contain related elements
- 

Three variants: elevated, filled, outlined
- 

Contents can include anything from images to headlines, supporting text, buttons, and lists
- 

Can also contain other components
- 

Cards have flexible layouts and dimensions based on their contents

[Image: 3 variants of cards](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuilyza-1.png?alt=media&token=f4bfb5e7-e96f-41b7-8c6e-e00ab2260001)

_1. Elevated card
2. Filled card
3. Outlined card_

#### Availability & resources

#### Differences from M2

- 

Color: New color mappings and compatibility with dynamic color
- 

Elevation: Lower elevation and no shadow by default
- 

Variants: Three official card variants – elevated, filled, and outlined

[Image: M3-style card](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuimnd8-2.png?alt=media&token=c9ef2b3a-985a-487b-b521-de02ce44c8e0)

_Cards have updated colors, elevation, and variants_

## Specs

#### Tokens & specs

Select a component variant below to see its elements, attributes, tokens, and their values.

[Token table: see ../tokens/TOKEN_TABLE.100ebfb4332adab1.md]

#### Elevated card

[Image: Diagram indicating elevated card container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flx8i6cjo-1.png?alt=media&token=37a9669d-e573-49fc-ae35-4ccabecb1102)

_1. Container_

##### Elevated card color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Image: Color diagram indicating elevated card surface color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flx8i798w-2.png?alt=media&token=30b428b3-43f3-4dd9-8048-fea7716c1c65)

_Elevated card color roles used for light and dark themes:

1. Surface container low_

##### Elevated card states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states)

[Image: Diagram of 5 elevated card states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8tathzk-3.png?alt=media&token=41f8d8f7-c77f-4911-b8d5-a736289fe745)

_Elevated card states: 

1. Hovered
2. Focused 
3. Pressed 
4. Dragged 
5. Disabled_

#### Filled card

[Image: Diagram indicating filled card container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flx8i88xc-4.png?alt=media&token=3e4703b7-1619-4058-9bd1-45ac27602cbb)

_1. Container_

##### Filled card color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Image: Color diagram indicating filled card surface color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flx8i8kna-5.png?alt=media&token=fc1a890b-971a-424b-a558-b089f8937345)

_Filled card color roles used for light and dark themes:

1. Surface container highest_

##### Filled card states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states)

[Image: Diagram of 5 filled card states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8taswqd-7.png?alt=media&token=0b047a36-4652-47b9-b0ce-e637b869edc2)

_Filled card states: 

1. Hovered
2. Focused 
3. Pressed 
4. Dragged 
5. Disabled_

#### Outlined card

[Image: Diagram indicating outlined card container and outline.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flx8ia1sc-8.png?alt=media&token=95f75fa6-624a-4f6c-a9a3-c6116871c37c)

_1. Container
2. Outline_

##### Outlined card color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/)

[Image: Outlined card color roles in light and dark themes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flx8iah38-9.png?alt=media&token=77dadefc-e058-4948-a4cd-5f7beff55ed5)

_Outlined card color roles used for light and dark themes:

1. Surface
2. Outline variant_

##### Outlined card states

States are visual representations used to communicate the status of a component or interactive element. Learn more about interaction states (https://m3.material.io/m3/pages/interaction-states)

[Image: Diagram of 5 outlined card states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm8taue2l-10.png?alt=media&token=ff253d81-6cfb-468f-9a62-ab1e33fa7afa)

_Outlined card states: 

1. Hovered 
2. Focused 
3. Pressed 
4. Dragged 
5. Disabled_

#### Measurements

[Image: Diagram with card layout measurements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flx8ibavc-11.png?alt=media&token=bcefa149-71c2-41fd-bf75-618453a2c32f)

_Card padding and size measurements_

| Attribute | Value |
| --- | --- |
| Shape | 12dp corner radius |
| Left/right padding | 16dp |
| Padding between cards | 8dp max |
| Label text alignment | Start-aligned |

## Guidelines

[Image: 3 variants of cards: elevated, filled, and outlined.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwujy207-1.png?alt=media&token=8f53bf0b-4e76-4d15-a467-e79d95d585c8)

#### Usage

Use a card to display content and actions on a single topic.

Cards should be easy to scan for relevant and actionable information. 

Elements like text and images should be placed on cards in a way that clearly indicates hierarchy.

[Image: Example card containing an image, title, text, and button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwujyk5p-2.png?alt=media&token=27bccb24-2751-42f5-9ed6-a573c9637b1e)

_Cards can display content and actions on a single topic_

Cards can serve as entry points into deeper levels of detail or navigation, such as a music album or details on an upcoming vacation.

[Image: Example world tour card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwujz8zw-3.png?alt=media&token=f8b81a9b-d1c1-4104-b827-de3275cc35d7)

_Card text and image show a clear hierarchy_

[Image: Card displaying connected details about a world tour.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwujzmmd-4.png?alt=media&token=03f44ff5-55ce-437d-b8e7-c956f44d54f5)

_Use cards to display related information on a single subject_

Cards can be displayed together in a grid, vertical list, or carousel.

[Image: 4 cards together in a grid layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk08jk-5.png?alt=media&token=f64f5002-eb4a-4af2-bf74-481bd4c3e36c)

_Cards can be shown together_

[Image: 5 albums in a vertical list of cards.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk0pob-6.png?alt=media&token=17c72a08-afc1-4ed3-afa6-cb04a3d880a1)

_Don't force content into cards when spacing, headlines, or dividers would create a simpler visual hierarchy_

There are three card variants:

- 

Elevated
- 

Filled
- 

Outlined

Each provides the same legibility and functionality, so the variant you use depends on style alone.

[Image: 3 variants of cards.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk16p3-7.png?alt=media&token=4bbc3151-4713-4962-85d3-2655c3656413)

_1. Elevated card
2. Filled card 
3. Outlined card_

[Image: Example elevated card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk25nc-8.png?alt=media&token=c16cb758-7e06-4e65-a635-1d19c85413c7)

_Elevated cards have a drop shadow, providing more separation from the background than filled cards, but less than outlined cards_

[Image: Example filled card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk2m44-9.png?alt=media&token=874c860e-a76b-47c2-a6b8-e1b9bee9354a)

_Filled cards provide subtle separation from the background. This has less emphasis than elevated or outlined cards._

[Image: Example outlined card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk337j-10.png?alt=media&token=94eedf65-056a-4352-a906-601748f7e531)

_Outlined cards have a visual boundary around the container. This can provide greater emphasis than the other variants._

#### Anatomy

The card container is the only required element in a card. Card layouts can vary to support the kinds of content they contain. Below is a common configuration of elements.

[Image: Diagram labeling the 6 parts of card anatomy.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmk6jnfqn-11.png?alt=media&token=de656112-72e8-4772-9560-cd5ea4d56733)

_1. 

Container
2. 

Image
3. 

Button
4. 

Supporting text
5. 

Subhead
6. 

Headline_

##### Container

Card containers hold all card elements. Their size is determined by the space those elements occupy. Card elevation is expressed by the container.

The card container is the only required element of a card. All other elements are optional.

[Image: 3 card containers with various elements: 1 with all elements except a button. 1 with a container, headline, supporting text, button. 1 with a container, headline, supporting text, 2 buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk4ddn-12.png?alt=media&token=3466c990-89bc-4904-9379-b926506469f6)

_Card size is determined by the elements it contains_

##### Content blocks

Card contents are grouped into blocks. Content can have different levels of visual emphasis depending on importance.

Card layouts vary to support the kinds of content they contain.

[Image: Diagram of card content blocks.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk4w24-13.png?alt=media&token=922c8fc3-b6be-443f-b583-307b41c04549)

_Cards can contain a headline, subhead, supporting text, media, and actions_

##### Dividers

Dividers (https://m3.material.io/m3/pages/divider/specs) can separate regions in cards or indicate areas of a card that can expand.

[Image: A divider running the entire width of the card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk5dl8-14.png?alt=media&token=167906e1-0d38-4e3b-9b6a-ae34e30896c8)

_1. Use full-width dividers for content that can be expanded_

[Image: An inset divider indented from the edge of card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk5r9g-15.png?alt=media&token=9fe4e4eb-940d-4879-b72a-5326475e2ad1)

_1. Use inset dividers, which don’t run the full width of a card, to separate related content_

##### Media

**Thumbnail**
Cards can include thumbnails for an avatar or logo.

**Image**
Cards can include photos, illustrations, and other graphics, such as weather icons.

**Video**
Cards can include video.

[Image: A mobile chat app with: 5 cards with images, 1 card with a thumbnail avatar, and 1 card with a video.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuk7ixf-16.png?alt=media&token=8be9c48a-b857-4251-be30-27fb662351f7)

_Cards can contain thumbnails, images, and video_

##### Text

**Headline**
Headline text often communicates the subject of the card, such as the name of a photo album or article.

**Subhead**
Subheads are smaller text elements, such as an article byline or a tagged location.

**Supporting text**
Supporting text includes body content, such as an article summary or a restaurant description.

[Image: card container with several elementsA tablet email app with an email summary card with multiple text elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukrum6-17.png?alt=media&token=6a042f0c-08aa-4406-83ca-3ad8ed923fc7)

_Headline, subhead, and supporting text in a card_

###### Layering text, icons, and images

It isn’t recommended to place text or icons on images. If it’s necessary, ensure the background image provides sufficient contrast for the text to meet accessibility standards.

Add a translucent scrim or bounding shape beneath the text or icon to help ensure proper contrast.

[Image: Layered text contrasts with the background image.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuke2rr-18.png?alt=media&token=1678fd07-8e19-478e-a63f-7c6883e05769)

_Ensure that text on images meets accessible contrast standards_

[Image: Icon within a bounding shape, placed on an image.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukejwa-19.png?alt=media&token=e1f6b168-b200-4c74-b4db-6f14d5c9130a)

_When placing text or icons on images, consider using a bounding shape to ensure proper contrast_

##### Actions

###### **Primary action area**

Cards can be one large touch target triggering an expanded detail screen.

[Image: The action area of a card contains rich media and supporting text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukf67i-20.png?alt=media&token=2b6fc020-ea02-4eeb-b689-9dde4ba174d8)

_Cards can include a primary action area that expands into a full-screen view_

**Buttons**
Cards can include buttons for actions such as **Learn more** or **Add to cart**.

**Icon buttons**
Cards can include icon buttons for actions such as **Save**, **Heart**, or **Leave a 4-star review**.

**Selection controls**
Cards can also include chips, sliders, checkboxes, and other selection controls.

**Linked text**
There can be a link in the supporting text on a card.

[Image: Supplemental text and actions at the top and bottom of the card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukfjtw-21.png?alt=media&token=b45cbe2c-3206-4d87-b552-3919097b31cc)

_Cards can include multiple action areas containing buttons, links, and other controls_

[Image: Album card with an option to give a star rating.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukg62l-22.png?alt=media&token=68263c29-c142-4fb6-b01b-0f0e53a5d7b9)

_Cards can contain icon buttons like stars to rate content_

[Image: Card to purchase tickets with choice chips for 3 event times.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukgix5-23.png?alt=media&token=05e68c11-3d87-4fea-9614-2e9815698e43)

_Cards can contain choice chips in the action area_

[Image: Card with slider to control a song’s volume.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukgu3i-24.png?alt=media&token=1429bc3e-e20e-45f3-9d55-8a889683204a)

_Cards can contain a slider control in the action area_

**Overflow menu**
Overflow menus contain related actions. They are typically placed in the upper-right or lower-right corner of a card.

[Image: 2 cards: 1 with an overflow menu in the upper-right corner, the other with it in the lower right.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukh83p-25.png?alt=media&token=b0bcfe54-83e6-4668-b466-d4fba42975b9)

_Overflow menus are usually located in the upper-right or lower-right corner of a card_

#### Cards in a collection

Multiple cards can be grouped together into collections displayed in a grid, list, or carousel. 

By default, cards in a collection are coplanar. They share the same resting elevation unless they're picked up or dragged.

[Image: 9 cards in a grid layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukhv18-26.png?alt=media&token=db2e3965-ccbc-474e-bbba-22ad76c67a3b)

_Multiple cards can be grouped into collections with a shared resting elevation_

###### Filtering and sorting

Card collections can be filtered in a variety of ways, including by date or alphabetical order. If a collection can be filtered, the filter must apply to each card in the collection. 

Filter or sorting options should be placed outside of the card collection.

[Image: A sort-by-date option placed above a card collection.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukig38-27.png?alt=media&token=0bbb40be-5f28-4052-bdcb-ef201193bf6a)

_Card collections can be filtered in a variety of ways, including by date:
1. A sort-by-date option is placed outside of the card collection_

Organize card collections so that they'e easy to use. Their layout affects how they are perceived.

[Image: A template for an 8-card collection layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukiwuu-28.png?alt=media&token=140d478a-a331-4060-9e2a-f3c1c0b6eb37)

_Place cards in a collection in a straightforward, easy-to-use manner_

##### Grid

Cards can be displayed together in a grid.

[Video: A set of 4 cards in a grid.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwumleea-GM3-Components-Cards-Guidelines-1-v01.mp4?alt=media&token=b5a86012-1b58-4343-93a9-d12d9e332eeb)

_Cards displayed in a grid_

The default grid can be customized in code to show cards in staggered or mosaic grids.

[Image: 5 menu item cards in a mosaic grid.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukjfiq-30.png?alt=media&token=7c16205a-8284-4b8d-98d5-8cbb7eb0027d)

_Custom mosaic grid_

[Image: 4 menu item cards in a staggered grid.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukk75c-31.png?alt=media&token=e4ead563-bccd-411b-9868-5710a67d212f)

_Custom staggered grid_

##### Vertical list

Cards can be displayed together in a vertical list.

[Video: 3 cards in vertical list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwummhcq-GM3-Components-Cards-Guidelines-2-v01.mp4?alt=media&token=883ac981-471e-40a8-9774-c27ffffcb2d8)

_Cards can be shown in a vertical list_

##### Carousel

Cards can be displayed together in a horizontal row or carousel.

[Video: 3 event reservation cards in a horizontal row.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwumodmh-GM3-Components-Cards-Guidelines-3-v01.mp4?alt=media&token=2be19f23-469e-4bd4-b7e9-bc1f3a814205)

_Cards displayed together in a horizontal row or carousel_

#### Adaptive design

As cards scale to adapt to different breakpoints (https://m3.material.io/m3/pages/breakpoints), their position and alignment can also change.

Cards and their elements can align left, right, or center as the layout scales.

[Image: 2 cards on a mobile screen row expand to 4 cards on a tablet screen row.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukkvy8-34.png?alt=media&token=92195d5b-d44d-434e-98d5-dbe6c60d798b)

_Card position and alignment changes as the screen size changes_

##### Ergonomics

Adjust the layout of cards to meet the ergonomic needs of large screens. 

For example, a horizontally-oriented card in a compact breakpoint may become a larger, vertically-oriented card in an expanded breakpoint, with more space for images and text on the larger screen.

[Image: Card sizes change from mobile to tablet, with larger images in the tablet layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuklb57-35.png?alt=media&token=888f14f9-99d5-4ab6-8dae-282257f1f47e)

_Adjust the card layout so content remains the main focus on large screens_

##### Visual presentation

To adjust the presentation of content-focused components, begin with spacing. 

Allow components like lists, cards, and images to optimize space while filling the region of a screen that suits a device breakpoint’s ergonomic needs.

[Image: 2 cards with optimized space: 1 narrow rectangle, 1 wide square.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukluzj-36.png?alt=media&token=ecf624d2-b9a0-4222-8159-044022c2bce0)

_Spacing adjusts for components such as cards, lists, and images_

[Image: 2 examples of the same card: 1 vertical with an image at the top, 1 horizontal with an image on the left.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukmfqz-37.png?alt=media&token=b5f7ca2b-ac45-47fe-832f-0fe359568750)

_Example of the same card with two different orientations and element positioning_

##### Column-based layouts

In mobile layouts, components such as lists or cards are stretched to fit the full width of the screen without compromising visual quality or user experience. When designing for large screens with an expanded breakpoint, use multiple columns to display content.

Avoid extending UI elements across the screen when possible. On larger screens, rearrange groups of related cards into horizontal rows or carousels, to allow for better content organization.

[Image: 3 related cards in a carousel.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwukn6ma-38.png?alt=media&token=98eabd10-f4cd-457d-a7fc-d4767ce3ef57)

_When designing for large screens, use multiple columns to display content_

##### Small screens

On smaller screens with the compact breakpoint, consider swapping cards for lists, which can display images and text in a more compact form. 

Make sure that controls, actions, and other component-specific elements are maintained.

[Video: Cards on a large screen adapt to a list on a small mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwumrs3a-GM3-Components-Cards-Guidelines-4-v01.mp4?alt=media&token=450f4017-ee5e-466d-a712-8976fa5a9d8e)

_Certain devices or user contexts require different components to meet platform expectations_

#### Behavior

##### Expanding

Cards can use a container transform (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#b67cba74-6240-4663-a423-d537b6d21187) transition pattern to reveal additional content. Reserve this pattern for hero moments that are meant to be expressive.

[Video: An album card expands to fill the screen and shows additional related content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwunn86t-GM3-Components-Cards-Guidelines-6-v01.mp4?alt=media&token=13eed0ab-adb0-4314-81d6-210ad15afdc2)

_A card expands to fill the full screen using a parent-child transition_

[Video: A card expands, showing all content at once.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwumvwvk-GM3-Components-Cards-Guidelines-7-1-v01.mp4?alt=media&token=2049b6fd-afd0-4360-83e3-152030354274)

_Expand a card to reveal information_

[Video: A card expands, internally scrolling to only show some information.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwumwjkp-GM3-Components-Cards-Guidelines-7-2-v01.mp4?alt=media&token=de1274d9-8fde-4a8d-bf93-82e0757aee00)

_Don’t scroll within a card to reveal information_

##### Navigation

Cards can use a forward and backward (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#df9c7d76-1454-47f3-ad1c-268a31f58bad) transition pattern to navigate between screens at consecutive levels of hierarchy. This pattern has a simpler motion style compared to container transform, which makes it suitable for common navigation transitions.

[Video: Card interaction transitioning to full screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwumxklj-GM3-Components-Cards-Guidelines-8-v01.mp4?alt=media&token=a6a4e415-025b-4810-b6cf-92ccfc326e93)

_Cards can use a forward and backward transition pattern to navigate between screens_

##### Gestures

###### Swipe

A swipe gesture can be performed on a single card at a time, anywhere on that card.

It can be used to:

- Dismiss a card
- Change the state of a card, such as flagging or archiving it

[Video: A card with 1 assigned swipe: to heart the entire card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwumypwh-GM3-Components-Cards-Guidelines-9-1-v01.mp4?alt=media&token=57103755-db42-48a3-89e0-259529d743a4)

_A card should only have one swipe action assigned to it_

[Video: A card with an image carousel and a swipe motion to heart only the bottom text on the card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwumzbld-GM3-Components-Cards-Guidelines-9-2-v01.mp4?alt=media&token=f6e05fa1-da38-492c-9d59-944c67f403ce)

_Cards shouldn’t contain content that can be swiped, such as an image carousel or pagination. Also, swipe gestures shouldn’t cause portions of cards to detach upon swiping._

###### Pick up & move

The pick-up-and-move gesture allows users to move and reorder cards in a collection.

[Video: A card is elevated above all other cards when moved.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwun0601-GM3-Components-Cards-Guidelines-10-1-v01.mp4?alt=media&token=9c8fe299-5e1e-4b7c-9476-cf8a113eb1d6)

_When moving a card, increase its elevation_

[Video: A moved card bumps other cards around, and isn’t elevated above them.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwun0v03-GM3-Components-Cards-Guidelines-10-2-v01.mp4?alt=media&token=6f972a4e-1817-4ed0-92c1-d3fb926340ce)

_Don’t let cards bump other elements out of the way. When a card is picked up, it appears in front of all elements, except app bars and navigation._

###### Scrolling

Card content that’s taller than the maximum card height is truncated and doesn’t scroll, but can be displayed by expanding the height of a card.  

A card can expand beyond the maximum height of the screen, in which case the card scrolls within the screen.

[Video: Scrolling a page with an expanded card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwun21j4-GM3-Components-Cards-Guidelines-11-1-v01.mp4?alt=media&token=e4719dcd-adaf-49b0-84df-c25d21371d32)

_On a mobile device, cards can expand to reveal more content, scrolling within the screen. Content within cards doesn’t scroll._

[Video: Expanded card on mobile with internal scrolling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwun2kqe-GM3-Components-Cards-Guidelines-11-2-v01.mp4?alt=media&token=861b95aa-4172-469d-8a63-988c0f8548ab)

_On a mobile device, cards can't internally scroll, as it could cause two scroll bars to be displayed_

###### Scrolling on desktop

On a desktop device, card content can expand and scroll within a card.

[Video: Expanded card on desktop with internal scrolling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwun3hn1-GM3-Components-Cards-Guidelines-12-v01.mp4?alt=media&token=80657520-eb45-4383-8738-301c0063eb26)

_On a desktop, content can expand and scroll within a card_

## Accessibility

#### Use cases

People should be able to do the following using assistive technology:

- Navigate to a card and the elements within a card 
- Get appropriate feedback based on input type documented under Interaction & style (https://m3.material.io/m3/pages/cards/accessibility#ce764d54-6b59-42db-807f-b3cb370eecdb)

#### Interaction & style

A card can be a non-actionable container that holds actions like buttons and links, or it can be directly actionable without any buttons or links. This is to avoid stacking actionable elements. An action shouldn’t be placed on an actionable surface.

[Image: 2 possible card interaction behaviors.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuobzmz-1.png?alt=media&token=43522d6c-0a33-4b98-8cf8-3e7db99cd337)

_1. Non-actionable card with buttons
2. Directly actionable card with no buttons_

##### Touch

When a user taps on a directly actionable card, a touch ripple appears across the card, indicating feedback. 

Non-actionable cards don’t ripple.

[Video: Ripple effect created when tapping on a card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuonrmp-GM3-Components-Cards-Accessibility-1-v01%203.21.14%E2%80%AFPM.mp4?alt=media&token=98280acb-35c0-466e-8b8c-a8301adbd956)

_Touch: Tap_

##### Dragging and dismissing

To meet Material's accessibility standards, any dragging and swiping interactions need a single-pointer alternative, like selecting the same actions from a menu.

For example, tapping a card, or pressing and holding, should open a menu to change its position in a list. That menu could also contain an action to delete the card.

[Video: A list of cards has its order reshuffled using a single-pointer option.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm6gok77f-Components-Cards-Accessibility-1-v01%20(1).mp4?alt=media&token=1d8244ec-d550-41e5-8cde-ef41ffb5d001)

_Use containers like bottom sheets or menus to show single-pointer options_

It isn’t recommended to place menus on top of the card on the draggable state. If doing so is necessary, ensure that the interaction can be completed.

[Image: A menu over a card that doesn't totally obscure the card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm4ivybyo-3-a.png?alt=media&token=dd43ecb5-f57b-4079-bda5-e822258fb7c9)

_Ensure that the menu doesn't cover the card_

##### Cursor

When a directly actionable card is hovered, the hover state provides a visual cue to the person that the element is interactive. Non-actionable cards don’t have a hover state.

When a directly actionable card is clicked, a ripple appears, providing feedback.

[Video: Hover state and touch ripple effect of a card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuoolew-GM3-Components-Cards-Accessibility-2-v01%203.24.03%E2%80%AFPM.mp4?alt=media&token=2d157501-1a56-4c87-afa9-bfcc84685d50)

_Cursor: Hover, Click_

##### Keyboard

A focus indicator appears around actionable elements when tabbing through cards. This provides a visual cue to a person that the destination is now focused and an action can be taken.

A person can **Tab** to navigate between actionable elements of the cards. If the cards are non-actionable, **Tab** navigates directly to the actionable buttons or links within the cards.

When engaging with a focused actionable card or element using the **Space** or **Enter** key, an action is performed or a secondary action is available, such as a menu.

Within the menu, a person is able to **Arrow** through the menu items, **Space** or **Enter** to select an item, or **Tab** to exit.

[Video: Navigating cards with a keyboard.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuop9fg-GM3-Components-Cards-Accessibility-3-v01.mp4?alt=media&token=e9ed72c1-14d5-438a-9db4-7356c58e9d8b)

_Keyboard: Tab, Arrows_

#### Focus

All interactive elements of cards need a tab stop so they can be focused. Directly actionable cards are tab stops.

For non-actionable cards, the card itself is not a tab stop. However, every actionable element in the card is a tab stop so they’re all visited before focus navigates to the next card.

[Image: The focus areas of a card with interactive elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuodgu3-5.png?alt=media&token=3f2cf54f-c991-49bf-bf2a-447a25e2657a)

_Use **Tab** to navigate through all buttons in a card_

[Image: Cards forming a list on mobile and cards forming a gallery on tablet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwuoeob6-6.png?alt=media&token=be7c42c2-1676-4bb7-a654-8bdfcc83691b)

_Card layouts can change on different devices_

#### Keyboard navigation

| Keys | Actions |
| --- | --- |
| **Tab** | Move to the next actionable element **Directly actionable cards:** Move to next card container **Non-actionable cards with actionable elements:** Move to next actionable element |
| **Space** or **Enter** | Confirm action |

#### Labeling elements

The informative contents of a card are verbalized when navigating to them using a screen reader. If an image in a card is purely decorative, hide it from screen readers. All actionable elements must receive both screen reader and keyboard focus.

Directly actionable cards can have the **button** or **link** role, depending on how they’re used. 

Non-actionable cards are purely containers, so they don’t need a role.

[Image: Card elements annotated in the order that a screen reader tabs through them.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmk6jw3io-09.png?alt=media&token=e51c3965-4c45-4a0d-bdc7-9874af242848)

_Non-actionable card elements are navigable, focused in order, and verbalized when in focus. In this example, the order is:

1. Heading
2. Image
3. Body text
4. Primary button
5. Secondary button_
