# Shape

Source: <https://m3.material.io/styles/shape> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:28:54.725Z)

> The M3 shape system includes original shapes, a corner radius scale, and built-in shape morphing

## Overview & principles

- Use abstract shapes thoughtfully to add emphasis and decorative flair
- Leverage Material shapes for built-in shape morphing
- Rectangular shapes are fully rounded in all corners by default
- Individual corners can be adjusted to create asymmetrical rectangular shapes

[Image: Illustration of range of irregular shapes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c35amt-1.png?alt=media&token=ab563092-217d-4d71-986d-1b4d87b5ba3e)

_Abstract shapes can help people express themselves_

#### Availability & resources

| Type | Resource | Status |
| --- | --- | --- |
| Design | Shape library (http://figma.com/community/file/1035203688168086460/material-3-design-kit) (Figma Design Kit) | Available |
| Implementation | Jetpack Compose (https://developer.android.com/reference/kotlin/androidx/compose/material3/MaterialShapes) (Shape Library) | Available |
| Android Views (MDC-Android) (https://github.com/material-components/material-components-android/blob/master/docs/theming/Shape.md) | Available |  |

#### M3 Expressive update

**May 2025**

Added 35 **new shapes** and **shape morphing** to Material Shape Library (https://www.figma.com/community/file/1035203688168086460) (Figma Design Kit) and Jetpack Compose (https://developer.android.com/reference/kotlin/androidx/compose/material3/MaterialShapes).

Added new shape principles and a refreshed art direction.

Added corner radii tokens:

- Large increased (20dp)
- Extra large increased (32dp)
- Extra extra large (48dp)
- Updated fully rounded corners to use **full**. Previously, this was defined using 50% of the component size.

More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

[Video: Animation of available Material shapes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8q813wo-01%20-%20shape-Overview%20%26%20principles%202.mp4?alt=media&token=f7376b02-0d4b-4f63-8cec-5b581fd75404)

_Overview of Material shapes_

#### Shape library

[Image: 35 shapes in the shape set.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c3rf47-3.png?alt=media&token=1a6cef2c-83d4-4855-9b91-8121f8a8a0ae)

_M3 has 35 shapes to easily apply to designs_

#### Use shapes and text in harmony

Shapes are expressive elements of Material 3 that echo key visual attributes of M3 typography (https://m3.material.io/m3/pages/typography/overview/). 

Use shape and type together for products to feel cohesive and polished.

[Image: Fonts and mock UI screens showing a wide range of square, round, thin, and thick shapes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7pa01q8-4.png?alt=media&token=2bd24982-183f-4d94-8da0-d14252f165c4)

_M3 shapes and Google Sans Flex share roundness visual attributes_

[Video: While a person taps water and squeezes a soft cube, a button in the middle responds similarly.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fc1aun-03%20-%20shape-Overview%20%26%20principles-5.mp4?alt=media&token=81c96d25-cf31-47ab-9c10-c0abdb56b26b)

_Shape morphing should respond to user interaction_

#### Morph shapes to connect function and feeling

Shapes should morph to improve understanding and add moments of delight. Use shape morph to better communicate:

- Interaction states, like when a button is selected
- Actions in progress, like a friend typing, or a page loading
- Changes in the environment, like sound, temperature, or time of day

Think about how shapes could react to different interactions, such as tapping, swiping, scrolling, releasing, and long pressing.

#### Be bold and dare to embrace tension

Tension happens when the shape story changes unexpectedly, such as when contrasting shapes are used. This can be created using both square and rounded shapes, unconventional shapes, and other contrasting elements.

Material historically focused on rounded shapes. However, using sharp shapes, thereby adding tension, creates more dynamic design, one that’s more memorable and expressive.

This tension can be used in many ways, like conveying states, drawing attention to an element, or to improve the visual aesthetic.

[Image: Round and square shape side-by-side.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fc4dnp-6.png?alt=media&token=41b40132-0d83-4de4-9c1b-8b49902356e2)

_Create tension by using a combination of round and square shapes_

[Video: Use different types of shape in loading indicators to show progress.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7p9sea1-GM3_Expressive_Shape_Overview%20and%20Principles_7_v17.mp4?alt=media&token=d72dfebe-d9c9-4081-b6da-1338b9eefd93)

_Shapes and motion can communicate actions in progress_

#### Shape is versatile, not semantic

Avoid making shapes literal or assigning a specific function or meaning to a single shape.

For example, the loading indicator can be wavy, but the waveform is not a strict symbol of progression. Progress could just as easily be shown using rotating shapes or shape morph. 

Plus, waveforms could be used in other places unrelated to progress, like button containers.

#### Use abstract shapes sparingly

Be intentional when using shapes in product UI. Don’t compromise clarity for the sake of visual design.

When incorporating diverse shapes, think about how they fit into the overall design and consider how they balance with the entire composition. Ensure that shapes resonate with the product's narrative. Consider the 'why' behind their inclusion and the value they contribute to the overall user experience.

[Image: 8 shapes with icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c73wle-8.png?alt=media&token=f1bf9874-6d8e-43c4-ae44-c0d4912ca58b)

_Shapes without clear meaning behind why they’re different can add more visual clutter than delight_

[Video: Shapes morphing to indicate different states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7pa308e-GM3_Expressive_Shape_Overview%20and%20Principles_9_v17%20(1).mp4?alt=media&token=e495a6b9-987a-4449-aa23-62cf4f8d5cd0)

_Essential shapes can use shape morph to communicate change_

[Video: Shapes being applied as masks on photos to make them more interesting.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7pa3b28-GM3_Expressive_Shape_Overview%20and%20Principles_10_4x_V03.mp4?alt=media&token=8a05935d-719e-491f-a6c9-5524055fe4d4)

_Use abstract shapes on imagery and decorative UI_

#### Emphasize aesthetic moments with shape

Get creative when using shape in graphics, for photography cropping, personalized avatar masking, and other non-interactive elements.

Decorative moments offer the most flexible and creative uses of shape.

#### Shape can be 2.5D

When effectively used, shape and motion can make 2D visuals feel 3D. They provide the illusion of depth and volume, making visuals more eye-catching and natural.

[Video: Shapes spinning and a weather icon transforming into the current temperature.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmnxek75a-GM3%20-%20Shape%20-%20Overview%2012%20-%20v12.mp4?alt=media&token=195e7da0-07f2-42ab-9d90-5ee9f1562eb0)

_Apply motion and shape differently on each layer to give it the illusion of depth_

## Corner radius scale

Material components use a corner radius scale to define all rectangular shapes, such as buttons, carousels, and dialogs.

[Image: Illustration of range of shapes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c80f7i-1.png?alt=media&token=2bf0cf29-448a-4c9e-a5cf-6b61020ff7ed)

_M3 defines corner radii using a shape scale. This can be used to create both uniform and asymmetrical shapes._

#### Shape tokens

Material has shape corner tokens to define all corners, and corner-value tokens for individual corners. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TYPE_UNSPECIFIED.20543ce18892f7d9.md]

##### Corner radius scale

The Material 3 shape system uses a size-based scale with ten styles. Styles are assigned to components based on the desired amount of roundedness. 

1. None - 0dp
2. Extra small - 4dp
3. Small - 8dp
4. Medium - 12dp
5. Large - 16dp
6. Large increased - 20dp
7. Extra large - 28dp
8. Extra large increased - 32dp
9. Extra extra large - 48dp
10. Full - fully rounded corners

Apply shape styles using tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Image: 10 corner radii styles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c881mj-1.png?alt=media&token=fcb5e003-c5d3-4208-af8a-8766b55ad7ee)

_Steps on the scale are named for the amount of roundedness applied to the corner_

[Image: Components illustrating the old 3-level shape scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fc5xxg-3.png?alt=media&token=874497dc-6354-4952-9e46-cc37c088b431)

_M2: Three-level shape scale based on the size of the component container_

[Image: Components illustrating the new 10-level shape scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fc5nak-4.png?alt=media&token=76b165c6-fa5b-448c-abd8-cc7aef1c6bb4)

_M3: Ten-level shape scale based on the roundedness of shape corners_

#### Symmetry

Components can have either symmetric or asymmetric corner shapes. Symmetric shapes have the same values for all corners, while asymmetric shapes can have corners with different values.

Both symmetric and asymmetric shapes use the same 10-step scale.

Asymmetrical shapes are used in M3 components with closely-grouped items, such as menus and split buttons. These are called **inner corners**.

[Image: 3 shapes illustrating symmetrical and asymmetrical styles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c8fgh9-2.png?alt=media&token=e9d62c5c-3f8c-44b3-b487-bfe8c1cc0d6c)

_**Inner corner **component tokens always map to individual corner shape tokens_

#### Customizing shapes

Generally, products should consistently use the Material 3 shape styles. However, customization is sometimes necessary, and even encouraged, for hero moments or custom components. Shapes can be customized at the **style** or **component** level.

##### Style changes

The corner radius shape style, like **medium**, can be customized to be a different size.

This applies the change to all components mapped to that shape style, unless they have an override.

[Video: Shapes with different corner radii.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fbcwaf-08%20-%20Shape%20-%20Corner%20Radius%20Scale%206.mp4?alt=media&token=2a9a25cd-8429-42cb-8a0b-a741ce900430)

_Customizing the corner size of the **medium** style applies the change to all components using this style, such as cards and small FABs_

##### Component changes 

The style of a specific component, such as a button, can be changed by customizing which corner radius shape style it maps to.

For example, by default, buttons are mapped to the **full** corner radius shape style. If your product needs a less rounded shape, remap the token to another style in the shape scale, such as **small** or **medium**.

[Video: Components with different corner radii.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fbdqeg-09%20-%20Diagram%20Corner%20Rounding.mp4?alt=media&token=7767b025-5f33-4415-867b-af89fa105612)

_Remapping the shape for a component to a different style applies the change to just that component across the UI_

The shape style family can be customized from **rounded** to **cut**. This makes the corner a straight line instead of curved.  

Add extra padding to avoid cutting off content in information-dense components.   

For example, a large cut corner on a card will clip content and images in the area more than a rounded corner of the same size.

[Video: Card with text and full corners.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fma463q2b-10%20-%20shape%20-%20Corner%20Radius%20Scale%208.mp4?alt=media&token=982b9a51-c03d-4b4d-86fb-536b49701a44)

_Be careful not to apply large or full corners to information-dense components, such as cards_

[Image: Carousel with images with rounded corners.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c9cdvx-8.png?alt=media&token=563b34cc-3146-49fc-bb3f-0f10e7721697)

_Shapes can be intentionally rounder to add more visual variety_

[Image: Carousel with full rounded shapes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c9bsb5-9.png?alt=media&token=659af9fc-48eb-4dde-9246-1537ca7ca5fb)

_Add unexpected moments by switching between square and fully rounded shapes_

##### Adjust for optical roundness

When nesting rounded objects, avoid using the same corner radii for both objects. This can make the corners look unbalanced.

Instead, adjust the corner radii to be proportional to each other; this is called optical roundness. To calculate optical roundness:

- Outer radius - padding = inner radius
- For example: 48dp - 14dp = 34dp

[Image: 3 parts of corner radii to adjust.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c9fged-6-1.png?alt=media&token=e35e86ab-c7d6-4ade-bba4-9c151eb561f8)

_1. Padding
2. Outer radius
3. Inner radius_

[Image: Nested carousel with optical roundness.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c9h8uv-6.png?alt=media&token=896b2204-2886-49ac-82a3-bcd76cfce14e)

_Use different corner radii values for nested components so they have optical roundness_

[Image: Nested radii with the same roundness as its container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c9j8dt-7.png?alt=media&token=56cb6075-ef00-4915-8792-6a95257a4d6d)

_Avoid using the same corner radius value for nested objects_

##### Using the shape library

The Material 3 shape library can be used to create more interesting containers. Use the shape library for mostly visual elements. Avoid applying unconventional shapes to text-heavy containers. 

Shapes should be used sparingly to provide a stronger emphasis and moments of delight.

[Image: Unexpected shapes in carousel.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0c9mtiu-Frame%202134280407.png?alt=media&token=b4a4f136-7509-4d92-b9f7-4c1e11e1a27e)

_Leverage the Material shape library for moments of delight_

## Shape morph

The Material shape library supports easy transitioning, or morphing, between shapes. Shape morph is leveraged in the standard button group and loading indicator components.

#### Using shape morph

Access to the Material shape library and the shape morph functionality are available through a platform-specific API.

- For Android, use the Shapes in Compose API (https://developer.android.com/reference/kotlin/androidx/compose/material3/MaterialShapes)
- Web is not currently available

Shape morphing uses the expressive motion scheme by default. This can be switched to the standard motion scheme as needed.

[Video: Shapes available in the shape morph API library.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0f9yqna-11-shape_Shape%20morph%201.mp4?alt=media&token=9beace55-e94a-4106-9579-0c3146d3a5cd)

_The Material shape library contains many types of shapes that can all morph seamlessly into each other_

Material uses shape morphing in the standard button group and loading indicator components.

[Video: Morphing buttons react to user clicking.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0fa2ql9-12%20-%20Shape%20Morph%202.mp4?alt=media&token=c3bfdb2d-9657-417a-89f2-27d7b6e5048b)

_The standard button group uses shape morph to show interaction_

[Video: Loading indicator with shape morph.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0faip5r-13%20-%20Shape%20Morph%203.mp4?alt=media&token=4311f924-ea87-405a-87df-cc39e0a06e4f)

_The loading indicator uses shape morph to show progress_
