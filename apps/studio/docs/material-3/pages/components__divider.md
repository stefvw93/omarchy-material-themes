# Divider

Source: <https://m3.material.io/components/divider> (content version 2026-09-23_06-10-05, page updated 2026-07-17T07:13:07.955Z)

## Overview

- Make dividers visible but not bold
- Only use dividers if items can’t be grouped with open space
- Use dividers to group things, not separate individual items

[Image: Screen shot of five stacked dividers](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6aebbf-1.png?alt=media&token=00e7e89b-a308-4fed-9e37-e08af6dfd8a6)

_Dividers separating items in a list_

#### Availability & resources

#### Differences from M2

- Color: New color mappings and compatibility with dynamic color
- Configurations: Ability to have vertical dividers

[Image: Screen shot of three dividers](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6afl2u-2.png?alt=media&token=47c716a5-f6e6-4018-bc89-6fd9e7fb5260)

_Dividers have new color mappings_

## Specs

[Image: Diagram of divider set on horizontal line](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flvdgvb10-1.png?alt=media&token=33e2a703-65c2-43ed-9d28-0debf4306507)

_1. Divider_

#### Tokens and specs

Browse the component elements, attributes, tokens, and their values.

[Token table: see ../tokens/TOKEN_TABLE.77f7657eb270e53d.md]

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview/825906c9-6eed-47d1-8812-450910c1356e)

[Image: Divider on light background and dark background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flvdgvshh-2.png?alt=media&token=12a3db31-a65a-4668-94bf-7be61e0eeb33)

_Divider color roles used for light and dark schemes:

1. Outline variant_

#### Measurements

[Image: Divider's measurement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flvdgwerz-3.png?alt=media&token=3897448c-4415-4e21-985e-3fbe9b50f072)

_Measurements_

| Attribute | Value |
| --- | --- |
| Divider full-width | 100% |
| Divider inset left margin | 16dp |
| Divider inset right margin | 0dp |
| Divider middle-inset left margin | 16dp |
| Divider middle-inset right margin | 16dp |
| Space between divider & supporting-text | 4dp |
| Divider right margin | 8dp |
| Divider bottom margin | 8dp |

## Guidelines

[Image: Inbox app using full-width dividers to separate messages.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6awcxp-1.png?alt=media&token=12fe2d89-f8a2-4225-af54-9e3ed1e5696a)

_Full-width dividers_

#### Usage

Dividers are one way to visually group components and create hierarchy. They can also be used to imply nested parent/child relationships.

The divider can be used in two ways: 

1. 

Full width
2. 

Inset

[Image: Inbox app using full-width dividers to separate messages.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6ax8hs-2.png?alt=media&token=df5af949-7c28-4ff5-ae9d-2921bb69aad3)

_Full-width divider_

[Image: Music app using inset dividers to separate songs in a playlist.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6axm30-3.png?alt=media&token=8b4961e0-942d-44c1-ba45-c1c519b505d6)

_Inset divider_

#### Anatomy

A divider is a simple line.

[Image: Illustration of a divider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6ayhl6-4.png?alt=media&token=8ab69ad7-2649-4d61-8ea0-e78c883c69d5)

_1. Divider_

#### Full-width dividers

Use full-width dividers to separate larger sections of unrelated content. They can be used directly on a surface or inside other components like cards or lists.

Full-width dividers can also separate interactive areas from non-interactive areas. 

They are used to group visual elements together, and indicate when elements are related to each other from an interaction perspective.

[Image: Inbox messages visually separated by full-width dividers for improved readability.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6az64p-5.png?alt=media&token=8b64b7fe-bbf1-4a08-ae49-5d64147889e2)

_Full-width dividers to indicate separation of content_

[Image: Non-interactive information on a card and a clickable read more link separated by a full-width divider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6azny5-6-do.png?alt=media&token=f0067f91-a5c2-4623-9abe-c9f2f6ef2c90)

_Use full-width divider lines to separate interactive and non-interactive areas of a container such as a card_

[Image: Full-width dividers used after every piece of content on a page.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6b0986-7-caution.png?alt=media&token=d783f10a-ac99-47ae-93aa-30a247a78516)

_Use full-width dividers sparingly. Too many divider lines will make an interface look cluttered._

#### Inset dividers

Use inset dividers to separate related content within a section.

Inset dividers are equally indented from both sides of the screen by default.

[Image: 2 different content sections separated by an inset divider.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6b0tzg-8.png?alt=media&token=6f18c7dd-6395-4c8b-b986-995b10563a2a)

_Inset dividers separate related content, such as emails in a list. They should be used with anchoring elements such as icons or avatars, and align with the leading edge of the screen._

[Image: 3 types of related content separated by inset dividers on a mobile screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6b1g5j-9.png?alt=media&token=dcc21e9f-b77f-4d73-ad44-836bfcdc6e90)

_Inset dividers in a list of related items_

[Image: Inset divider separating body text and selection chips.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6b1yh0-10.png?alt=media&token=e4fafa7d-57c0-4167-8d06-e572c40b6204)

_Inset dividers can be placed in the middle of a layout to separate elements such as body text from selection chips_

##### Using dividers both ways on the same screen

If dividers are used both ways in a UI, they must reinforce the hierarchy of information within different sections.

1. 

To separate a different kind of content, use a full-width divider
2. 

To separate nested content items, use inset dividers

[Image: Dividers used to show content hierarchy: full-width for sections, inset for related items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6b2hjo-11-do.png?alt=media&token=fa232ddc-b5f2-4533-b074-c777e4e68607)

_Use a combination of inset and full-width dividers to reflect the hierarchy of information_

List items with repetitive formats may not require an inset divider, in which using only the margin between items is acceptable.

[Image: List with repetitive item formats. Visual separation achieved through margins only.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6b329x-12-do.png?alt=media&token=1aefe556-bb41-4d12-b1da-7426eec7d7ae)

_Content may not require a divider line_

#### Vertical divider

A vertical divider can be used to arrange content on a larger screen, such as separating paragraph text from video or imagery media.

[Image: Image and text side-by-side, separated by a vertical divider on a large screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6b3p0d-13.png?alt=media&token=19b15218-15a7-41dd-8a17-46f023941776)

_Vertical divider in a large screen context_

## Accessibility

Dividers are decorative elements, which have no contrast minimums.

[Image: Divider separating messages in an inbox that are already separated with type styles and spacing is annotated as decorative.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flv6b63ho-1.png?alt=media&token=e34807f4-1539-40bb-98d4-a974ef5b2bfa)

_Decorative elements have no contrast minimums_
