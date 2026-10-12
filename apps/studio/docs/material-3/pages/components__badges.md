# Badges

Source: <https://m3.material.io/components/badges> (content version 2026-09-23_06-10-05, page updated 2026-07-17T06:58:42.753Z)

## Overview

- 

Can contain labels or numbers
- 

Two variants: small and large
- 

Anchor badges inside the icon bounding box, at the upper trailing edge of the icon
- 

Limit content to four characters, including a **+**
- 

Keep the default color mapping

[Image: 3 icons with badges. 1 is a small dot. 2 is a larger circle with a 1 digit number. 3 is an oval with a 4 digit number.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8hopxl-01.png?alt=media&token=e9840156-17f4-4edf-b69a-eb62bd0b5c5c)

_1. Small badge on a navigation item
2. Large badge on a navigation item
3. Large badge with max characters on a navigation item_

#### Availability & resources

#### Differences from M2

- 

Color: New color mappings and compatibility with dynamic color

[Image: Navigation bar showing 4 icons with different badge variants in a bright red color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8hz0r2-02.png?alt=media&token=579d40e2-1895-4ed4-a074-22f71265f580)

_Badges have new color mappings_

## Specs

[Image: 5 aspects of badge anatomy on a navigation bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmamlcpos-1-3P.png?alt=media&token=915611ea-55ac-48cb-83bf-417ef338e02d)

_Navigation bar

1. Small badge
2. Large badge container
3. Large badge label
4. Large badge maximum character count container
5. Large badge maximum character count label_

[Image: 5 aspects of badge anatomy on a navigation rail.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmamlee0o-2-3P.png?alt=media&token=456c8e6e-e485-4c1f-87bc-f4185cabe437)

_Navigation rail

1. Small badge
2. Large badge container
3. Large badge label
4. Large badge maximum character count container
5. Large badge maximum character count label_

#### Tokens & specs

Browse the component elements, attributes, tokens, and their values.

[Token table: see ../tokens/TOKEN_TABLE.59a1b3a9a90ca8b3.md]

#### Color

Color values are implemented through design tokens. For design, this means working with color values that correspond with tokens. For implementation, a color value will be a token that references a value. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 5 applications of badge color on light and dark theme navigation bars.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmg0yc68n-03-3P.png?alt=media&token=b0199799-0f54-4989-9eb5-9ab7aac1a3d0)

_Badge color roles used for light and dark schemes in navigation bar:

1. Error
2. Error
3. On error
4. On error
5. Error_

[Image: 5 applications of badge color on light and dark theme navigation rails.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flz9ep1tz-4.png?alt=media&token=1fe78232-1ccb-4c41-92a7-c1b9ee36df28)

_Badge color roles used for light and dark schemes in navigation rail:

1. Error
2. On error
3. Error
4. On error
5. Error_

#### Measurements

[Image: Annotation of badge sizes, padding, and measurements from the corner of the icon to the badge opposite corner.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flz9eqf8f-badge_layout-correct.png?alt=media&token=5eef9643-a8a4-4adf-8cb5-1aead3ce6d05)

_Badge padding and size measurements_

| Attribute | Value |
| --- | --- |
| Small badge shape | 3dp corner radius |
| Small badge size (HxW) | 6dp |
| Large badge shape | 8dp corner radius |
| Large badge one digit size (HxW) | 16dp |
| Large badge max character count size (HxW) | 16x34dp |
| Small badge: distance from top trailing icon corner to bottom leading badge corner (HxW) | 6x6dp |
| Large badge: distance from top trailing icon corner to bottom leading badge corner (HxW) | 14x12dp |
| Large badge padding between badge and text container | 4dp |

#### Configuration

Different badges are shown on navigation destinations in various states.

[Image: Diagram of 3 badge variations shown on navigation destinations in various states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Flz9eqsps-6.png?alt=media&token=d12e4a0d-b307-4c34-8df1-27d87e4a5a4a)

1. Inactive with label - small badge
2. Inactive with label - large badge
3. Inactive with label - large badge max character count
4. Inactive - small badge
5. Inactive - large badge
6. Inactive - large badge max character count
7. Active with label - small badge
8. Active with label - large badge
9. Active with label - large badge max character count
10. Active nav bar no label - small badge
11. Active nav bar no label - large badge
12. Active nav bar no label - large badge max character count
13. Active nav rail no label - small badge
14. Active nav rail no label - large badge
15. Active nav rail no label - large badge max character count

## Guidelines

[Image: Diagram of 4 badges in different configurations on a navigation bar's destination icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0wmkr4-01.png?alt=media&token=2a5ee969-d4fd-499e-8716-f5c028e7dc71)

_Large badges and a small badge in a navigation bar_

#### Usage

Badges are used to indicate a notification, item count, or other information relating to a navigation destination. They are placed on the ending edge of icons, typically within other components.

There are two variants:

1. 

Small badge
2. 

Large badge

[Image: Diagram of 4 badges in different configurations on a navigation bar's destination icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0wmphl-02.png?alt=media&token=1f32b375-fb78-43fe-a17e-8b92081ed44b)

_Navigation bar with four badges_

A **small badge** is a simple circle, used to indicate an unread notification.  

A **large badge** contains label text communicating item count information.

[Image: A small badge is a circle with no characters.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmi46ui92-03.png?alt=media&token=2036ae76-31a4-44d1-b535-3dda6b642893)

_Small badge_

[Image: A large badge holds 4 characters and expands its container's width but not height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmi46uzu8-04.png?alt=media&token=2c742611-3a29-4104-80e3-fd3c425d0a76)

_Large badge_

##### With other components

Badges are most commonly used within other components, such as navigation bar, navigation rail, app bars, and tabs.

[Image: Navigation bar with 3 icon buttons. 2 icons buttons have badges and 1 doesn't.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvm8dp3k-5.png?alt=media&token=9e000d82-46f1-40c5-a9a7-e6b6046e04ae)

_In navigation bars, hide the badge once the destination has been selected_

#### Anatomy

[Image: Small and large badges on 2 icon buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvm8fkil-7.png?alt=media&token=3f431e5e-5e88-41bd-bbcd-052f2e6202fd)

_1. Small badge
2. Large badge container
3. Large badge label_

#### Container

There are two container options for the badge: 

- 

Small badge with no text
- 

Large badge with text

[Image: A small badge on a navigation item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0womos-07.png?alt=media&token=50e7d36f-b594-4edc-84bd-980b95aa1331)

_A small badge uses only shape to indicate a status change or new notification_

[Image: Number 10 displayed within large badge on a navigation item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8jybps-08.png?alt=media&token=9ceea2e2-7e57-4f49-add4-668242cc5b09)

_A large badge displays a number within a container to indicate a quantifiable status change related to a destination_

Badge containers are anchored inside the icon bounding box. As the number count increases for large badges, their width expands, but keeps the same placement.

Badges use a color intended to stand out against labels, icons, and navigation elements. Use the default color mapping to avoid color conflict issues.

[Image: Small and large badges on the left side of 2 navigation items in a right-to-left language.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8k2962-9-do.png?alt=media&token=532cb06e-da53-45d2-ba95-83ffc62ea499)

_Change the position of the badge for right-to-left languages_

[Image: Small and large badges at random positions on 3 icon buttons on a navigation rail.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8k2vet-10-dont.png?alt=media&token=6390c1de-9d89-42b8-b383-793abc96f691)

_Badges have fixed positions. Don’t change the position of the badge arbitrarily or place the badge over the icon._

[Image: Small and large badges in default red color on 3 navigation items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0wr0gz-11_do.png?alt=media&token=e91ea890-94ed-4e0b-a484-868b5f16308a)

_Use the default badge color_

[Image: Small and large badges in custom colors on 3 navigation items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0wr4mw-12_dont.png?alt=media&token=c58658ac-aea9-4126-a88c-9e7ee6b76930)

_Avoid using custom color roles for the badge container and label text. If custom roles are necessary, make sure they have contrast of at least 3:1._

##### Label text

Label large badges with counts or a status. The maximum number of characters within large badge label text is four, including a + to indicate more.

[Image: 4 icons with increasing number badges. The badges represent quantities, using a "+" symbol for quantities over 999.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8ks60f-13.png?alt=media&token=55a2ca2d-c2a3-4849-ab90-d860253ad5c2)

_Large badges with one to four characters_

Use the recommended maximum character count to ensure labels don’t extend beyond the badge container.

[Image: 4-digit numbers condensed to a 3-digit badge with "+" to fit the badge container's width.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0wrqi2-14_do.png?alt=media&token=37353d5f-7e7f-4ef8-b6c4-866d5015b818)

_Truncate badge labels as needed_

[Image: 4-digit and 5-digit number badges on navigation items exceed the badge container's width and get cut off at the edge.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0wru4w-15_dont.png?alt=media&token=79eceaeb-887c-4b7a-b950-b2ba0a84a24e)

_Don’t let the badge get cut off or collide with another element_

#### Placement

[Image: Large badge to the right of a navigation rail item.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0wsl1o-16_do.png?alt=media&token=85852fb2-22ac-43ad-90db-e27b958c792e)

_Use a large badge to show count information when visual collisions aren’t an issue, such as in a navigation rail_

[Image: Small badge on an icon button in an app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8kxkle-17_caution.png?alt=media&token=276fc105-e418-4f3f-887f-3a449899e5ee)

_Use a small badge when spaces are tightly constrained, such as app bars. Small badges won’t run into the edge of the screen._

[Image: Large badge placed at the end of a tab.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8kyp7i-18_do.png?alt=media&token=83a75fa1-4971-49ed-8297-51b97ce1ca52)

_When an icon with a badge is followed by text or another element, place a large badge at the trailing edge_

[Image: Large badge overlapping the icon and text in a tab.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8kzbcm-19_dont.png?alt=media&token=b7e028e1-cddb-46f2-9efd-7c671e6dae6e)

_Avoid using a large badge when it might overlap with a trailing element. Either place it at the trailing edge or use a small badge instead._

## Accessibility

#### Use cases

People should be able to use assistive technology to:

- Understand the dynamic information conveyed in badges, such as counts or labels
- Address badge announcements by selecting corresponding navigation destinations

#### Interaction & style

Badges are most commonly used within other components, such as navigation bar, navigation rail, app bars, and tabs.

When a badge is used to indicate an unread notification, the badge gets hidden once it's selected.

[Video: An animation of a badge disappearing once it's tapped.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvp03lg1-GM3-Components-Badges-Accessibility-1-v01.mp4?alt=media&token=b9cdb1a0-1689-4a26-bf91-3311b211f048)

#### Visual indicators

Badges use a color intended to stand out against labels, icons, and navigation elements. Use the default color mapping to avoid color conflict issues.

[Image: Diagram of large and small badges showing that they need to pass 3 to 1 contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0x2h51-02_do.png?alt=media&token=b6d4a7a7-0b46-4a00-84a8-96265cf1ef4b)

_Badges must use default color with at least 3:1 contrast_

[Image: Diagram of large and small badges not passing 3 to 1 contrast.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmg0x2kti-03_dont.png?alt=media&token=5c3e26cc-09ca-4769-9f83-701d6e8d83cb)

_Avoid using custom color roles for the badge container and label text. If custom roles are necessary, make sure they have contrast of at least 3:1._

#### Labeling elements

The accessibility label for a badge item will be read after its navigation destination. Any numerical badges will have their number read, while non-counting badges will simply announce **New notification**.

[Image: Navigation bar highlighting numerical badge.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8l8lhl-04.png?alt=media&token=99d7e919-9bb3-45ed-a8b9-b961d31ef91c)

_Numerical badges will have their number read_

[Image: Navigation bar highlighting non-counting badge.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fme8l9na6-05.png?alt=media&token=096422e0-2079-4674-8f91-1adb36552e46)

_Non-counting badges will simply announce **New notification**_
