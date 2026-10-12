# Motion physics system

Source: <https://m3.material.io/styles/motion/overview> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:25:55.367Z)

> The motion physics system makes a UI expressive and easy to use

## How it works

[Video: Showcase of expressive components and motion curves.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9d3dbjl-00_Hero%20Expressive%20New_Export.mp4?alt=media&token=8e65768c-f1ca-4bc8-8738-36ca6ca76a2e)

__

#### A motion system designed for expression

**May 2025**

Material introduced the **motion physics system** with M3 Expressive. This new physics-based system makes interactions and transitions feel more alive, fluid, and natural. It represents a new motion language for Google products, and is easier to implement and customize than ever before. 

The physics system is replacing the previous system based on easing and duration (https://m3.material.io/m3/pages/motion-easing-and-duration/applying-easing-and-duration/).

More on M3 Expressive (https://m3.material.io/blog/building-with-m3-expressive)

#### Availability & resources

| **Type** | **Link** | **Status** |
| --- | --- | --- |
| Implementation | Android Views (MDC-Android) (https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md) | Available. Not added to components. See specs (https://m3.material.io/styles/motion/overview/specs) |
| Flutter | Unavailable |  |
| Jetpack Compose (https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme) | Available |  |
| Web | Compatible with Compose springs. See specs (https://m3.material.io/styles/motion/overview/specs) |  |

#### The basics: Motion schemes

The physics system has two preset motion schemes: **expressive** and **standard**. The motion scheme you choose defines how your product feels. While most motion in a product should use the same scheme, products can make advanced customizations (https://m3.material.io/m3/pages/motion-overview/how-it-works#fef83d57-b139-4c40-b538-9f1e9872df1b) to swap the scheme to emphasize key moments.

**Expressive** is Material’s opinionated motion scheme, and should be used for most situations, particularly hero moments and key interactions.

[Video: A circle moves across the screen with expressive motion. It has a trail showing the level of bounce applied.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g74buu-00_Scheme_Spring%20Expressive%20Export.mp4?alt=media&token=36db86e1-4e85-4905-89fb-f82c1fa64091)

_The expressive motion scheme overshoots the final values to add bounce_

**Standard** feels more functional with minimal bounce, and should be used for utilitarian products.

[Video: A circle moves across the screen with standard motion. It has a trail showing the lack of bounce applied.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g75t7b-00_Scheme_Spring%20Standard%20Export.mp4?alt=media&token=37eb508f-ab3e-42e7-8491-1eac28f85f3a)

_The standard motion scheme eases into the final values_

Need something other than the preset schemes? Create your own! (https://m3.material.io/m3/pages/motion-overview/how-it-works#f4ec8b84-3e39-4699-bba3-0fe7ec5cb79e) The physics system makes it easy to create custom motion schemes beyond expressive and standard, while still leveraging theming. Schemes can be easily switched between expressive, standard, or custom as needed.

#### How it works: Springs

Motion schemes use **springs**. A spring is a combination of three attributes which control all motion behavior: stiffness, damping, and initial velocity.

**Springs are versatile**. One spring can apply to many situations, such as transitions, button effects, or gestures. This makes the motion and expression feel consistent throughout the product.

**Springs feel natural**. Springs are designed to be predictable, like how objects move and bounce. They handle gestures, interruptions, and retargeting animations seamlessly.

[Video: Buttons, FAB menus, and toolbars moving with expressive motion springs.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g79o8z-00_Versatile%20Export.mp4?alt=media&token=5fa65ca6-0cb0-470a-8856-841efe260166)

_All component motion is driven by two tokens: expressive fast spatial and expressive fast effects_

#### Spring tokens

On Jetpack Compose and Android Views (MDC-Android), these springs are available as spring tokens (https://m3.material.io/m3/pages/motion-overview/specs/)**.** Use tokens to easily apply motion to any element, making all motion feel predictable and consistent across multiple platforms. See specs (https://m3.material.io/m3/pages/motion-overview/specs) for how to convert springs to other platforms like Web.

There are tokens for **spatial** movement and **effects**, with three durations each: **default**, **fast**, and **slow**.

For example, to apply fast, spatial, expressive motion, call the "expressive" motion scheme, then use the token: md.sys.motion.spring.fast.spatial.

Notice that the "expressive" scheme isn't part of the token itself. Rather, it's called at the product level and applied to all tokens. This makes it easier to swap schemes without changing assigned tokens.

[Image: A chart of the token structure. A scheme has 3 speeds. Each speed has a spatial token and an effects token.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8or28vc-5.png?alt=media&token=12806c6a-d624-4706-87bf-91cc61506aa1)

_Each scheme (expressive, standard) has three speeds (fast, default, slow) for two types of movement (spatial, effects)_

##### Style

**Spatial** spring tokens are used for animations that move something on screen, for example the x and y position, rotation, size, rounded corners. This spring overshoots the final value and bounces into place.

[Video: A moving shape bounces into place.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g7et1l-00_Tokens%20Spatial%20Pos%20Export.mp4?alt=media&token=589eb77a-314a-4fb3-917f-5ca18dcc1fd5)

_Spatial springs apply to movement_

[Video: A spinning shape bounces into place.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g8hvpt-00_Tokens%20Spatial%20Rotation%20Export.mp4?alt=media&token=8515f662-83e8-4a7c-92b1-b796942741e4)

_Spatial springs apply to rotation_

**Effects** spring tokens are used to animate properties such as color and opacity animations, where there shouldn’t be any overshoot.

[Video: A shape fades in and eases into view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g8j35o-00_Tokens%20Effects%20Opacity%20Export.mp4?alt=media&token=b6ff1430-d858-4053-bbbb-bac2d4dc9ca8)

_Effects springs applied to opacity_

[Video: A shape changes color and eases into the final result.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g8k2bk-00_Tokens%20Effects%20Color%20Export.mp4?alt=media&token=eb6350cb-81b8-410c-b991-1ccbad5c7079)

_Effects springs applied to color_

##### Speed

Spatial and effect spring tokens come in three speeds: **default**, **fast**, and **slow**. Most motion should use the default speed, while smaller elements may use fast and larger elements may use slow.

| Speed | Spatial example | Effects example |
| --- | --- | --- |
| Default | Animations that partially cover the screen, such as bottom sheet and expanded navigation rail | Opacity of the content within a navigation rail |
| Fast | Small components, such as switches and buttons | Color change of the switch handle |
| Slow | Full-screen animations | Full-screen content refresh |

[Video: Effects motion in fast, default, and slow speeds](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g8v98f-00_AllSpeeds_Expressive%20Export.mp4?alt=media&token=e2706336-378f-4bd8-a5bb-5e0708fd9338)

_Spatial motion in fast, default, and slow speeds_

[Video: Spatial motion in fast, default, and slow speeds](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g8u69a-00_AllSpeeds_Standard%20Export.mp4?alt=media&token=875faef0-4f97-4143-9839-cc66fc6d51ac)

_Effects motion in fast, default, and slow speeds_

Spring tokens work across devices. For example, the spatial fast token will always be faster than default or slow, but the exact values of each token differ depending on if the device is a wearable, phone, or tablet. This ensures the movement feels fast in the context of the device.

#### Application

##### Components

On Jetpack Compose, 21 Material components use the motion physics system by default. Android Views (MDC-Android) support is coming soon. To add the motion physics system to other components, including custom-built components, use spring tokens. View full specs (https://m3.material.io/m3/pages/motion-overview/specs)

[Video: A collection of expressive components in motion.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g8ypfu-00_Components%20Export.mp4?alt=media&token=7a1812c2-c6a8-458b-bec1-840659b329f0)

_Material components use the physics motion system to feel more expressive_

#### Advanced customizations

There are a few different levels for applying motion. Choose the level that applies best to your product or specific component.

##### Level 1: Use a default motion scheme

The expressive and standard schemes should be sufficient for all motion needs. On Jetpack Compose, components use these schemes by default.

[Video: Switch using the expressive motion scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g90urt-00_Customization%20Switch%20Expressive%20Export.mp4?alt=media&token=431a79da-59d7-445e-96cc-23be15820673)

_Switch using the expressive motion scheme_

[Video: Switch using the standard motion scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qp1jmp-00_Customization%20Switch%20Standard%20Export.mp4?alt=media&token=d914f315-63fd-4f3a-991a-c279d6e97e6b)

_Switch using the standard motion scheme_

##### Level 2: Create a custom motion scheme

On Jetpack Compose, to change the default motion scheme that all components and transitions use, create a custom MotionScheme object, and return different AnimationSpec for each property of the motion scheme.

[Video: FAB menu with an extra stiff custom scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g93afq-00_Customization%20Fab%20Instant%20Export.mp4?alt=media&token=929f4440-1e93-4437-8234-a587c30a6542)

_FAB menu with an extra stiff custom scheme_

[Video: FAB menu with a minimally stiff custom scheme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0g946r2-00_Customization%20Fab%20Soft%20Export.mp4?alt=media&token=37c06170-cc10-4273-94db-5e7ab434c3a6)

_FAB menu with very low stiffness custom scheme_

##### Level 3: Swap the default motion scheme per element

Why use just one scheme when you can use multiple? On Jetpack Compose, to use one scheme for most of the product, such as **expressive**, but on certain elements swap it for another scheme, like **standard**, override the CompositionLocal for that particular composable, screen, or element.

## Specs

#### Cross-platform experiences

The motion physics system is available on Jetpack Compose and Android Views (MDC-Android), and can be easily adapted to other platforms.

| Platform | Status | How to apply |
| --- | --- | --- |
| Jetpack Compose | Available | Use built-in components and spring tokens. |
| Android Views (MDC-Android) | Available. Not added to components. | Use built-in spring tokens. |
| Web | Compatible | Use springs when possible, otherwise use curves that mimic the springs for animations without interruptions or gestures. View web conversion table (https://m3.material.io/m3/pages/motion-overview/specs#e3e4f10b-6314-47b7-9051-988066081fa0) |

#### Tokens and specs

The **spring composite **tokens are used in the motion physics system. These composites combine two **spring** tokens (damping and stiffness) into a single token for ease of use. The **easing**, **duration**, and **path** tokens are used by the legacy system, so can be ignored.

[Token table: see ../tokens/TOKEN_TYPE_UNSPECIFIED.20543ce18892f7d9.md]

#### Web: Convert springs to curves

| Spring | Curve |
| --- | --- |
| Expressive fast spatial | 0.42, 1.67, 0.21, 0.90. Duration = 350ms |
| Expressive default spatial | 0.38, 1.21, 0.22, 1.00. Duration = 500ms |
| Expressive slow spatial | 0.39, 1.29, 0.35, 0.98. Duration = 650ms |
| Expressive fast effects | 0.31, 0.94, 0.34, 1.00. Duration = 150ms |
| Expressive default effects | 0.34, 0.80, 0.34, 1.00. Duration = 200ms |
| Expressive slow effects | 0.34, 0.88, 0.34, 1.00. Duration = 300ms |
| Standard fast spatial | 0.27, 1.06, 0.18, 1.00. Duration = 350ms |
| Standard default spatial | 0.27, 1.06, 0.18, 1.00. Duration = 500ms |
| Standard slow spatial | 0.27, 1.06, 0.18, 1.00. Duration = 750ms |
| Standard fast effects | 0.31, 0.94, 0.34, 1.00. Duration = 150ms |
| Standard default effects | 0.34, 0.80, 0.34, 1.00. Duration = 200ms |
| Standard slow effects | 0.34, 0.88, 0.34, 1.00. Duration = 300ms |

#### Easing and duration

The original easing and duration tokens are still available to use as a fallback, and are currently used for animating transitions. View easing and duration system (https://m3.material.io/m3/pages/motion-easing-and-duration/applying-easing-and-duration)
