# Transitions

Source: <https://m3.material.io/styles/motion/transitions> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:34:42.925Z)

> Transitions help guide people as they navigate an app

## Transition patterns

starNote:M3 transitions use the legacy easing and duration system. They'll eventually be updated to use the motion physics system.

Transitions are short animations that connect individual elements or full-screen views of an app. They are fundamental to a great user experience because they help users understand how an app works. Well-designed transitions makes an experience feel high quality and expressive. They should be the top priority for a strong motion implementation. 

These are six common transition patterns:

1. Container transform (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#b67cba74-6240-4663-a423-d537b6d21187)
2. Forward and backward (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#df9c7d76-1454-47f3-ad1c-268a31f58bad)
3. Lateral (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#8d4ec98f-60dc-47a9-901e-88fa2c43f18a)
4. Top level (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#f852afd2-396f-49fd-a265-5f6d96680e16)
5. Enter and exit (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#e1c2a650-d7a4-4a6d-9025-e6b7845291ed)
6. Skeleton loaders (https://m3.material.io/m3/pages/motion-transitions/transition-patterns#b39a0641-1b44-4864-83f5-fac38e0bd94a)

[Video: Small, colorful blobs are animated with different motion styles corresponding to the six transition patterns.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfqbdij-GM3-Transitions-TransitionPatterns-1-v01.mp4?alt=media&token=37344f9a-dc0e-4bf7-86a3-826d46ba788b)

#### Container transform

This pattern is used to seamlessly transform an element to show more detail, like a Card expanding into a details page.

- 

**Commonly used with:** Cards, lists, image galleries, search boxes, sheets, FABs, and chips
- 

**Read more:** UX Research (https://material.io/blog/motion-research-container-transform), Guidelines (https://m3.material.io/m3/pages/motion-transitions/applying-transitions#50f9fc3f-c7e2-4099-b614-7c36b1c5285d), Android implementation (https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md#container-transform)

Persistent elements are used to seamlessly connect the start and end state of the transition. The most common persistent element is a container, which is a shape used to represent an enclosed area. It can also be an important element, like a hero image. Of all transition patterns, this one creates the strongest relationship between elements. It's also perceived to be the most expressive.

[Video: Podcast app is selected from home screen, then individual card is selected, both taking over the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfqc556-GM3-Transitions-TransitionPatterns-2-v01.mp4?alt=media&token=0c23dd89-b0ec-445b-80fe-50c04378ed4d)

_A container transform is used when opening an app and a card. This makes the relationship between screens clear and gives an expressive quality to the transition._

###### Between full-screen views

[Video: 1-year memory of flowers is selected within a carousel and takes over screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfqdipk-GM3-Transitions-TransitionPatterns-3-1-v01.mp4?alt=media&token=e5a7ca2c-e68c-42f9-8e15-669bc5136c9a)

_A container transform is used to expand this image to a fullscreen view_

[Video: Individual message is selected in messaging app and expands to view complete message.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrbw3w-GM3-Transitions-TransitionPatterns-3-2-v01.mp4?alt=media&token=30769f42-b523-4302-83a3-3bc23f0f7e11)

_A container transform is used to expand this List item to a fullscreen view_

[Video: Grocery list is selected within notes and expands to take over screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrcr6e-GM3-Transitions-TransitionPatterns-3-3-v01.mp4?alt=media&token=8dd88ac4-99df-4d53-966f-2e9021a23b4b)

_A container transform is used to expand this Card and Search box to a fullscreen view_

###### Within a screen

[Video: Search box for replies within messaging app expands to reveal recent searches and contacts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrdrxa-GM3-Transitions-TransitionPatterns-3-4-v01.mp4?alt=media&token=7bf2552b-c418-4154-87c4-3ccb336861c0)

_A container transform is used to expand this search box_

[Video: FAB is selected and expands to reveal Compose Now action and shortlist of contacts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrem0q-GM3-Transitions-TransitionPatterns-3-5-v01.mp4?alt=media&token=7c4de1b8-3f8f-460a-b2f6-5c52f845a5cf)

_This container transform FAB transition has a persistent container and icon_

[Video: Song is selected from banner on bottom of screen and expands to take over.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrf9ld-GM3-Transitions-TransitionPatterns-3-6-v01.mp4?alt=media&token=a5dc8901-3704-4be7-b8a6-ddb0889fe4cd)

_A container transform is used on an expanding Sheet_

#### Forward and backward

This pattern is used for navigating between screens at consecutive levels of hierarchy, like navigating from an inbox to a message thread.

- **Commonly used with**: Lists, cards, buttons, links
- **Read more:** Guidelines (https://m3.material.io/m3/pages/motion-transitions/applying-transitions#41b11a78-b88f-4972-904c-880bc348acc8), Android implementation (https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md#shared-axis)

A horizontal sliding motion indicates moving forward or backward between screens. Android and iOS have different default styles:

**1. Android** uses a fade as screens slide. This reduces the amount of motion, since the screens don't have to slide the full width of the device. 

**2. iOS** uses a parallax effect, meaning the background slides slower than the foreground. This also reduces the amount of motion.

[Video: Two motions contrasted in messaging app, with top showing Android’s fading movement and bottom showing iOS’s swiftly moving foreground transition.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrilua-GM3-Transitions-TransitionPatterns-4-v01.mp4?alt=media&token=fa5b76e6-9baf-41a5-b0bb-a46b1eae0b07)

_1. Android’s default forward and backward transition
2. iOS’ default forward and backward transition_

[Video: WiFi set-up screen demonstrates Android fade effect when next button is selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrjhm3-GM3-Transitions-TransitionPatterns-4-1-v01.mp4?alt=media&token=f5f1caac-0bba-4402-9e12-d7550905bc9f)

_A filled button on Android uses a forward and backward transition_

[Video: Music card uses iOS transition to move back to music app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrkcfn-GM3-Transitions-TransitionPatterns-4-2-v01.mp4?alt=media&token=31167b8c-9aa6-44e0-8583-f1159a42aba2)

_A card on iOS uses a forward and backward transition_

[Video: Fading transitions between photos app search bar and selection of Family &amp; friends option.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrldpn-GM3-Transitions-TransitionPatterns-4-3-v01.mp4?alt=media&token=6ca0882e-0f25-4aa5-bcfe-a834b427c409)

_A search icon button in Android uses a forward and backward transition_

[Video: Email is selected from inbox demonstrating Android transition.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrmnfg-GM3-Transitions-TransitionPatterns-4-4-v01.mp4?alt=media&token=f7c9ab56-e46f-43db-8569-b50966797597)

_Tapping a list item on a tablet uses a forward and backward transition_

#### Lateral

This pattern is used for navigating between peer content at the same level of hierarchy, like swiping between tabs of a content library.

- **Commonly used with: **Tabs, carousels, and image galleries
- **Read more:** Guidelines (https://m3.material.io/m3/pages/motion-transitions/applying-transitions#3d5c16ce-7350-4a33-9d2b-598a7591d4e6)

Lateral transitions use a sliding motion similar to a forward and backward pattern, but it does not use a fade or parallax effect. Instead elements are grouped and slide in unison, creating a strong peer relationship. This also hints at being able to gesturally swipe elements to navigate.

[Video: Toggling between tabs for artists and albums in music app reveals lateral movement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrnslm-GM3-Transitions-TransitionPatterns-5-1-v01.mp4?alt=media&token=09d0ed16-e36b-4ce4-af48-cf21f4f82b5c)

_A lateral transition is used when tapping or swiping a Tab component_

[Video: Photos are swiped through horizontally, each filling the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfroshf-GM3-Transitions-TransitionPatterns-5-2-v01.mp4?alt=media&token=2927b2a2-8ac7-4f9c-9f90-607efa692e93)

_A lateral transition is used when swiping through a photo album_

[Video: Carousel is scrolled through horizontally without use of fades.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrpmn2-GM3-Transitions-TransitionPatterns-5-3-v01.mp4?alt=media&token=6ceb61d3-2aef-4e50-aa04-cf1f5087f874)

_A lateral transition used with a Carousel component_

#### Top level

This pattern is used to navigate between top-level destinations of an app, like tapping a destination in a Navigation bar.

- **Commonly used with:** Navigation bar, navigation rail, and navigation drawer
- **Read more:** Guidelines (https://m3.material.io/m3/pages/motion-transitions/applying-transitions#ab8885f6-5517-419d-80de-bea50cd10467), Android implementation (https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md#fade-through)

The exiting screen quickly fades out and then the entering screen fades in. Since the content of top level destinations isn't necessarily related, the motion intentionally does not use grouping or persistent elements to create a strong relationship between screens.

[Video: Home and Music options in the navigation are toggled between with fading indicating distinctness of items.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfrrw39-GM3-Transitions-TransitionPatterns-6-1-v01.mp4?alt=media&token=870012dd-e750-4cab-b482-38664dc86ad3)

_A navigation bar uses a top level transition_

[Video: Inbox menu item selected fades to reveal inbox contents.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfs0nn2-GM3-Transitions-TransitionPatterns-6-2-v01.mp4?alt=media&token=b0b86abe-7f8b-4c46-badd-809fbf94192e)

_Tapping an item in a navigation drawer uses a top level transition to move between destinations_

[Video: Chat and Mail options in navigation both produce swift transitions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfs1jfp-GM3-Transitions-TransitionPatterns-6-3-v01.mp4?alt=media&token=e4eacdac-a0ee-4a02-8d09-e50445052491)

_A navigation rail uses a top level transition_

#### Enter and exit

This pattern is used to introduce or remove a component on the screen. Components can enter and exit within the screen bounds, like a dialog appearing over an app. They can also enter and exit by crossing the screen bounds, like a navigation drawer or bottom sheet that slides on and off screen.

##### Within screen bounds

- **Commonly used with:** FABs, dialogs, menus, snackbars, time pickers and tooltips
- **Read more: **Guidelines (https://m3.material.io/m3/pages/motion-transitions/applying-transitions#56675bd6-5e69-4fa8-b075-d694e8cb3ad4)

**Android** components expand and collapse along the x or y axis as they enter and exit. Scale and z-axis motion is avoided since they imply elevation change, which doesn't match M3's reduced elevation model.

**iOS** components uniformly scale as they enter and fade out to exit.

[Video: Message to permanently delete an email pops up without elevation for both Android and iOS.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfs2znj-GM3-Transitions-TransitionPatterns-7-1-v01.mp4?alt=media&token=cc20bc71-2e97-42c5-b08c-4cf7f32ce059)

_1. Android enter and exit transitions 
2. iOS enter and exit transitions_

The direction a component enters is informed by their location on screen, expanding away from the device edge. A menu at the top of the screen expands downwards, and a snackbar at the bottom of the screen expands upwards.

[Video: Image menu in upper right corner expands downward.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfs4dk9-GM3-Transitions-TransitionPatterns-7-2-v01.mp4?alt=media&token=5ea9b2aa-b72c-4a22-b72b-4a08fa05f323)

_A menu at the top of the screen expands downwards as it enters_

[Video: A snackbar alert pops up from bottom of inbox screen and FAB emerges from lower right.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfs56ki-GM3-Transitions-TransitionPatterns-7-3-v01.mp4?alt=media&token=7ff7b7a9-3ab7-482b-98cd-8ea1add1fa77)

_A snackbar and FAB use an enter and exit transition_

##### Beyond screen bounds

- **Commonly used with: **App bars, banners, navigation bar, navigation rail, navigation drawer, and sheets
- **Read more:** Guidelines (https://m3.material.io/m3/pages/motion-transitions/applying-transitions#1b704202-167d-48d5-bca1-614cf050de1b)

**Android** components expand and collapse along the x or y axis as they slide on and off screen. This emphasizes their shape, making an otherwise simple transition more expressive.

**iOS** components slide on and off screen without changing shape.

[Video: Android and iOS demonstrations of navigation emerging from left edge and new message alert emerging from top edge.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flyfs6out-GM3-Transitions-TransitionPatterns-7-4-v01.mp4?alt=media&token=ff23a41c-989a-45a4-95ab-1d898b942148)

_1. Android enter and exit transitions 
2. iOS enter and exit transitions_

Components like a side sheet can also enter and exit at the same elevation as the main content. Coplanar sheets shrink the available area for content.

[Video: Selection of comments icon shrinks the main draft field.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygxnh2p-GM3-Transitions-TransitionPatterns-7-5-v01.mp4?alt=media&token=5e781c81-9041-407b-bea7-58a93d13f889)

_A coplanar side sheet uses an enter and exit transition_

Components can enter and exit from beyond the screen bounds based on a scroll gesture. This allows for more screen space to browse.

[Video: Top Stories header disappears as user scrolls deeper into news.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygxorck-GM3-Transitions-TransitionPatterns-7-6-v01.mp4?alt=media&token=bc2ebd28-4182-4699-a155-d2a2e8dcee0b)

_A top app bar slides off and on screen during a scroll_

[Video: Scrolling lower through photos hides navigation, saving room for browsing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygxpdy1-GM3-Transitions-TransitionPatterns-7-7-v01.mp4?alt=media&token=c4e1de2b-4fe7-4f6d-869c-b905fd4dcd7f)

_A navigation bar slides off and on screen during a scroll_

The location components enter and exit help establish a coherent spatial model of an app:

1. A **notification** enters from the top indicating the notification drawer can also be pulled down from the top
2. A **nav drawer** enters from the left helping users understand where it's located when it's off screen
3. A **bottom sheet** and the keyboard enters from the bottom of the screen. This is a sensible default location for sheets to enter since the bottom of the screen is easiest to reach.

[Video: Email notification emerges from top of screen, navigation emerges from left, and keyboard enter from below, all in sequence.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygxqtbv-GM3-Transitions-TransitionPatterns-7-8-v01.mp4?alt=media&token=2a6aaa1b-6445-41f7-84d5-4c49d6d54cfe)

_The direction of enter and exit transitions help establish a coherent spatial model_

#### Skeleton loaders

This pattern is used to transition from a temporary loading state to a fully loaded UI.

- 

**Read more**: Guidelines (https://m3.material.io/m3/pages/motion-transitions/applying-transitions#b82b5150-609b-4540-903b-2b900ef830aa)

Skeleton loaders are UI abstractions that hint at where content will appear once it's loaded. They're used in combination with other transitions to reduce perceived latency and stabilize layouts as content loads.

[Video: Music app is selected, producing a skeleton soon populated by individual music items in each corresponding outline.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygxs24v-GM3-Transitions-TransitionPatterns-8-1-v01.mp4?alt=media&token=2caf8946-4b3f-4f1b-98a2-baad902a2430)

_A skeleton loader is used after an app launches to indicate content is loading_

Skeleton loaders have a subtle pulsing animation to indicate indeterminate progress. It starts at the top left of the screen and moves down to the bottom right.

Once content is loaded, it quickly fades in on top of the skeleton loader.

[Video](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygxtkjx-GM3-Transitions-TransitionPatterns-8-2-v01.mp4?alt=media&token=199f90b4-51da-4019-a29d-06158f78f198)

_A pulsing animation indicates indeterminant loading_

[Video](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygxuime-GM3-Transitions-TransitionPatterns-8-3-v01.mp4?alt=media&token=9909e287-adde-4135-88a4-ce1bfeb9f646)

_Content quickly fades in once it's loaded_

## Applying transitions

starNote:M3 transitions use the legacy easing and duration system. They'll eventually be updated to use the motion physics system.

#### What makes a good transition?

Well-designed transitions should have these characteristics:

##### Follows accessibility settings

Most platforms have a reduced animation setting to help users with a sensitivity to motion. If that setting is on, transitions should:

- Use subtle fades instead of intense sliding or scaling animations
- Disable decorative effects like parallax or shape morphing

[Video: Podcast is selected and exited quickly on the left, while a podcast is selected and exited more slowly on the right.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygy2t4f-GM3-Styles-Motion-Transitions-ApplyingTransitions-1-v01.mp4?alt=media&token=fa2a937d-d78a-40e2-b173-1df231d43a25)

_1. Transitions with a default motion setting 
2. Transitions with a reduced motion setting turned on_

##### Consistent

Consistently applying the right type of transition helps make apps feel cohesive and predictable to use.

[Video: Multiple apps move in tandem with the same motion effect, appearing in sync.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygy4536-GM3-Styles-Motion-Transitions-ApplyingTransitions-2-v01.mp4?alt=media&token=3e39ddab-c487-4fc7-a1b0-ed4d44607bea)

_These four Android apps use the same forward and backward transition, making them feel like a cohesive family of apps_

##### Stable layouts

Use skeleton loaders so that UI elements are coherent and stable during a transition. Avoid content shifting positions or instantly popping in as it loads. It can be distracting and frustrating to use.

[Video: Podcast window opens with pulsing outline that frames content added slowly.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygy6hgi-GM3-Styles-Motion-Transitions-ApplyingTransitions-3-1-v01.mp4?alt=media&token=cc8be2fb-be03-4593-b660-228e3ec752ff)

_Transitions should use skeleton loaders with a subtle pulsing animation to stabilize a layout as it loads_

[Video: Podcast window opens with no outline, and content added into haphazard clusters.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygy75ou-GM3-Styles-Motion-Transitions-ApplyingTransitions-3-2-v01.mp4?alt=media&token=63bb733f-6d3d-41a2-a555-07a17fdf7c3d)

_Content should not pop in and shift locations during a transition_

##### No jarring jump cuts

Jump cuts should generally be avoided as a default setting since they can be disorienting. Instantly transitioning from one screen to the next offers no clues to help a user orient themselves.

If pure efficiency is a top priority, like opening a menu in a productivity app, a jump cut may be preferred.

[Video: Items in a music library are smoothly transitioned between.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygy7y9g-GM3-Styles-Motion-Transitions-ApplyingTransitions-4-1-v01.mp4?alt=media&token=0593dada-d203-46cb-94ff-e77013860d3f)

_Animated transitions help users orient themselves as they navigate_

[Video: Items in a library are selected with stark, quick transitions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygy8zr2-GM3-Styles-Motion-Transitions-ApplyingTransitions-4-2-v01.mp4?alt=media&token=28543c41-8af9-4581-a2fe-ea1df61fe367)

_For most common transitions, jump cuts are jarring and disorienting_

##### Coherent spatial model

Transitions are used to establish a coherent spatial model. This helps users understand the physical layout of an app.

[Video: An image within a horizontal carousel is also scrolled horizontally.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygya5u9-GM3-Styles-Motion-Transitions-ApplyingTransitions-5-1-v01.mp4?alt=media&token=52f9a8d8-4bad-4a86-9d73-0129dbf5755d)

_These carousel transitions have a coherent spatial layout while navigating between a collapsed and expanded view_

[Video: An image within a horizontal carousel is scrolled vertically.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyav9v-GM3-Styles-Motion-Transitions-ApplyingTransitions-5-2-v01.mp4?alt=media&token=70a694a8-87f0-4aac-92ca-e35839278d67)

_Switching between horizontal and vertical carousel layouts creates a confusing spatial model_

##### Unified direction

A transition should have a unified direction of movement. Elements are grouped and move along a primary axis instead of moving in independent directions. Only important elements like hero images remain persistent throughout the transition. This helps guide a users focus.

[Video: Selected song expands in a cohesive upward direction, marked by two blue lines showing unified movement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygybwyn-GM3-Styles-Motion-Transitions-ApplyingTransitions-6-1-v01.mp4?alt=media&token=8196d5ad-4a88-4115-9a49-85658394f5cf)

_This transition has a simple vertical motion that’s easy to follow_

[Video: Selected song expands in a jarring manner with multiple elements moving in different directions, marked by multiple red lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygycnpj-GM3-Styles-Motion-Transitions-ApplyingTransitions-6-2-v01.mp4?alt=media&token=d80d50cd-5995-43d4-8bc8-cbd915fdfe4b)

_Don’t animate many persistent elements independently. The various moving parts are distracting_

##### Clean fades

Fully fade out content before fading new content in. This avoids the overlap of partially transparent elements resulting in distracting and messy frames.

If a cross fade needs to occur, keep it quick and hide it during the fastest part of the transition.

[Video: Selected restaurant information fades out as it shrinks to reveal Google Map beneath..](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygydts6-GM3-Styles-Motion-Transitions-ApplyingTransitions-7-1-v01.mp4?alt=media&token=78f2f378-2cf8-49b3-b4bb-5503c0fb3db5)

_Fade content out before fading new content in to maintain a clean design_

[Video: Restaurant information remains visible as it shrinks and reveals the map beneath.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyekln-GM3-Styles-Motion-Transitions-ApplyingTransitions-7-2-v01.mp4?alt=media&token=433fc94f-c7f5-4ab1-80e4-b623db721de2)

_Avoid showing cross faded content, the overlap of partially transparent elements can result in messy and distracting frames_

Don't slowly fade components on top of other content as they enter or exit. This creates distracting cross faded frames. If a fade is needed, like with a Dialog entering in the middle of the screen, the fade should use a short duration to hide that part of the transition.

[Video: Message window remains transparent with details visible as it shrinks causing text beneath to become obscured.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyfxw6-GM3-Styles-Motion-Transitions-ApplyingTransitions-8-v01.mp4?alt=media&token=2376992f-18fd-4b9a-b261-20e362cc6721)

_Don't fade a bottom sheet as it enters and exits, it creates distracting cross faded frames_

##### Simple style

Transitions are not receptive to highly stylized motion. They're frequent, often occupy large portions of the screen, and are primarily meant to help users accomplish a task.

[Video: Calendar event expands evenly and quickly comes to a rest.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyi588-GM3-Styles-Motion-Transitions-ApplyingTransitions-9-1-v01.mp4?alt=media&token=f130ce91-0fc7-4fdf-ac08-88bc74fd4e9a)

_Transitions should have a simple style_

[Video: Calendar event expands with window bouncing momentarily and bouncing again on collapse.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyja80-GM3-Styles-Motion-Transitions-ApplyingTransitions-9-2-v01.mp4?alt=media&token=0a238ff8-344a-4732-a814-16d3aa28d0fa)

_Common transitions should not use overt style effects like bouncy springs_

#### Choosing a transition pattern

Consider the following to choose the right transition for a given use case:

##### Container transform

This pattern is highly effective at creating a relationship between elements. It's also the most dramatic pattern in terms of style and should be reserved for the right context. Consider using it for:

1. Hero moments that should be expressive
2. Shallow hierarchies where you expand an element for more detail then collapse it
3. Creating a seamless connection between elements

**Read the research for the benefits of container transform here (https://material.io/blog/motion-research-container-transform).**

[Video: Image within a carousel is selected and expands to fill the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygykdgf-GM3-Styles-Motion-Transitions-ApplyingTransitions-10-1-v01.mp4?alt=media&token=f68eb6c5-da7a-4083-b92d-12c5de44078b)

_A container transform creates a clear connection between the thumbnail and expanded image. It also makes this hero transition more expressive._

[Video: Battery life menu item among many setting options is selected and expanded to fill the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyl1ui-GM3-Styles-Motion-Transitions-ApplyingTransitions-10-2-v01.mp4?alt=media&token=dbf61b87-7dd4-4bb9-a2b5-0089aa24655e)

_Don't use container transform in apps with deep hierarchies, the motion becomes excessive. The expressive style also doesn't fit this utility focused navigation._

Use a container transform transition for hero moments rather than a forward and backward transition.

[Video: A One-Year-Ago photo memory is selected and expanded to take over the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyn2vj-GM3-Styles-Motion-Transitions-ApplyingTransitions-11-v01.mp4?alt=media&token=3dc00c81-255a-4949-aecc-9d7eea660815)

_Don't use forward and backward transitions on hero moments like opening a photo memory_

##### Forward and backward

Both Android and iOS should use platform defaults for forward and backward navigation. It's easy to implement and stays current as platforms update. They have a simple motion style suitable for such a common transition.

[Video: Individual message is selected with simple motion, and moves back with simple motion.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyo6nk-GM3-Styles-Motion-Transitions-ApplyingTransitions-12-1-v01.mp4?alt=media&token=22d57293-6a2e-483c-bded-47eba23c5d2b)

_Platform default forward and backward transitions are a sensible choice for common navigation_

[Video: Individual message is selected, causing a more radical take-over of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyoxdg-GM3-Styles-Motion-Transitions-ApplyingTransitions-12-2-v01.mp4?alt=media&token=45cdc5a3-f523-4333-8cf4-5d8d4cd36553)

_Container transform transitions require custom implementations and the motion may feel excessive when used frequently_

##### Lateral

Lateral transitions are used to browse peer content that's part of the same set, like navigating between tabs in a media library. By sliding content horizontally, it hints at being able to swipe the content area to navigate between peers.

[Video: Tabs in a music app shift horizontally without interruption when selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyq7yo-GM3-Styles-Motion-Transitions-ApplyingTransitions-13-1-v01.mp4?alt=media&token=c39877a5-0920-4662-8380-90a83c5f0643)

_A tab component uses a lateral transition type_

[Video: Tabs in a music app fade as they rotate horizontally.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyr0oo-GM3-Styles-Motion-Transitions-ApplyingTransitions-13-2-v01.mp4?alt=media&token=cc21a566-1e6d-4994-adbd-12cd0607d5ed)

_Fading content as it slides makes the peer relationship and swipe gesture less obvious. The style also may be confused with a forward and backward transition._

Don't use a Lateral transition for navigating hierarchical screens. Sliding content the full width of the screen is excessive for a high frequency transition. It also implies an equal peer relationship which isn't accurate to the hierarchy of the screens.

[Video: Message selected within messaging app moves laterally.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygysi3q-GM3-Styles-Motion-Transitions-ApplyingTransitions-14-v01.mp4?alt=media&token=b0016c76-ff2f-4192-82cc-3291a864a9ec)

_A lateral transition should not be used for common forward and backward navigation as it results in an excessive amount of motion_

##### Top level

When tapping a navigation bar, rail or drawer, a quick fade is used to transition to a new destination. Top level destinations aren't necessarily related, so the motion intentionally does not create a connection between screens.

A lateral transition pattern is not recommended for this type of navigation. It implies you can swipe between top level destinations which conflicts with other components like carousels or swipe-able list items.

[Video: Navigation between home and music app occurs with a quick fade, suggesting that items in each are distinct.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygytotc-GM3-Styles-Motion-Transitions-ApplyingTransitions-15-1-v01.mp4?alt=media&token=949878aa-a1be-410e-a1fc-a3e275e7bc06)

_A top level transition type is used with a navigation bar, rail and drawer_

[Video: Navigation between home a music app occurs in a seamless lateral scroll, falsely suggesting that items in each are connected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyuc8i-GM3-Styles-Motion-Transitions-ApplyingTransitions-15-2-v01.mp4?alt=media&token=2490f24e-1064-4e3e-b45c-6ec8ebbfe4be)

_Don't use a lateral transition to move between top level destinations. The gesture conflicts with carousel and list item gestures._

##### Enter and Exit

This transition pattern is used to introduce a component in context of the screen’s main UI. It can be modal, like a dialog requiring a user to take action. Or it can allow for simultaneously using both regions of the UI, like a standard bottom sheet over a map.

Don't use this pattern for navigating hierarchical screens. Sliding content the full height of the screen is excessive and it creates an unclear relationship between screens.

[Video: Animation showing a standard bottom sheet using the enter and exit transition over a map.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygyvia4-GM3-Styles-Motion-Transitions-ApplyingTransitions-16-1-v01.mp4?alt=media&token=b38ee2a8-163e-4e4a-92c8-32ceb19c1ae7)

_This bottom sheet uses an enter and exit transition pattern_

[Video: Animation showing a card expanding to a full screen on click and using the enter and exit transition.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flygywcfr-GM3-Styles-Motion-Transitions-ApplyingTransitions-16-2-v01.mp4?alt=media&token=418b8b05-eb02-4fcd-b251-9e38fa6ab2db)

_Don't use an enter and exit pattern for navigating hierarchical screens_
