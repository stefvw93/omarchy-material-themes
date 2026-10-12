# Design for watches

Source: <https://m3.material.io/foundations/watches> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:36:36.316Z)

> Watches have special design considerations and interaction patterns

## Overview

#### Resources

| Type | Resource |
| --- | --- |
| Design | About M3 Expressive (https://m3.material.io/) |
| M3 Expressive on Wear OS (https://developer.android.com/design/ui/wear/guides/get-started) |  |
| Figma Design Kits for Wear OS (https://developer.android.com/design/ui/wear/guides/get-started/design-kits) |  |
| Implementation | Android Developers: Wear OS (https://developer.android.com/training/wearables) |
| Jetpack Compose for Wear OS (https://developer.android.com/training/wearables/compose?version=3) |  |

#### New in GM3 Expressive

Design expressive layouts for watches with harmonious shape, animation, color, and typography treatments. All examples shown here are based on Material for Wear OS. More on M3 Expressive on Wear OS (https://developer.android.com/design/ui/wear/guides/get-started)

##### Designed for round screens

A new shape system with edge-hugging containers and buttons creates variety and visual balance on round screens.

More on shape system for Wear OS (https://developer.android.com/design/ui/wear/guides/get-started/apply)

[Image: Watch screenshots using rounded buttons, progress bars, and page indicators.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4amaej-01.png?alt=media&token=d01a0fa2-1252-427b-8022-49f1bfffba32)

_Controls for smartwatches can adapt to the form factor_

##### Expressive motion & springs

A new physics-based system makes interactions and transitions feel more alive, fluid, and natural.

More on M3 motion physics (https://m3.material.io/m3/pages/motion-overview/how-it-works)

[Video: A settings screen scrolling through options.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmq5i6utk-Platforms%20-%20WearOS%20-%20Overview%2002%20-%20IA%20-V01.mp4?alt=media&token=d3a08845-cef6-49dd-91ae-28f898ab9421)

_Use motion to make interactions intuitive_

##### Shape morphing

With shape morphing, controls respond to show interaction. Containers change corner radius.

More on M3 shape morphing (https://m3.material.io/m3/pages/shape/shape-morph)

[Video: A number pad with buttons morphing from rounded to squared as they are pressed.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmq5i6n4r-Platforms%20-%20WearOS%20-%20Overview%2001%20-%20IA%20-%20v01.mp4?alt=media&token=c82907dc-210a-4399-82c4-02f02fd5004d)

_Selected buttons change shape to show interaction_

##### Rich color

Dynamic color and deep tonal palettes are applied in a system of color roles to create depth and variety.

More on color for Wear OS (https://developer.android.com/design/ui/wear/guides/styles/color)

[Image: A media player on a smartwatch displaying a song title, artist, and playback controls.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4aosfu-04%20alt.png?alt=media&token=1786de7a-3c31-4e74-9d9d-dfa3aba2baab)

_The color system includes three main colors and specific color roles to create depth and variety_

##### New type roles

Along with an updated and optimized type scale (https://developer.android.com/design/ui/wear/guides/styles/typography/type-scale-tokens), new styles serve specific use cases for watches:

- 

Arc (https://developer.android.com/design/ui/wear/guides/styles/typography/apply#arc-styles) text for curved titles
- 

Numeral (https://developer.android.com/design/ui/wear/guides/styles/typography/apply#numeral-styles) text for bigger, stylized text

More on typography for Wear OS (https://developer.android.com/design/ui/wear/guides/styles/typography)

[Image: 3 smartwatch screens showing a fitness tracker, a timer, and a calendar notification using Roboto Flex.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4antdv-05.png?alt=media&token=e8e038e9-3a5b-4bc3-8a7e-c56445600f98)

_The baseline type scale is optimized for round screens to keep text legible in a compact space_

## Foundations

#### Resources

| Type | Resource |
| --- | --- |
| Design | Get Started with M3 Expressive (https://m3.material.io/get-started) |
| UI Design for Wear OS (https://developer.android.com/design/ui/wear/guides/get-started/design-for-wearables) |  |
| Figma Design Kits for Wear OS (https://developer.android.com/design/ui/wear/guides/get-started/design-kits) |  |
| Implementation | Android Developers: Wear OS (https://developer.android.com/training/wearables) |
| Jetpack Compose for Wear OS (https://developer.android.com/training/wearables/compose?version=3) |  |

#### Anatomy

##### The watch face

Watch faces display the time, as well as  other information and can provide access to other functions through apps and tiles.

They can also include complications, self-contained details that can show contextual info like heart rate or progress.

Ongoing activities on the watch face show in-progress actions, like a stopwatch countdown or a workout timer.

[Image: A watch face with hands showing analog time readout, and complications showing the date in a calendar, heart rate, water consumption, and weather.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4b8pnm-01.png?alt=media&token=34c02240-e8a2-48c1-a2f7-9f3fe78955d3)

_**Complications** are details on the watch face that can be customized for style or function_

[Image: A watch face with an entry point for an ongoing exercise activity.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4b9kvw-02.png?alt=media&token=f502f8d2-51ec-475a-a1ce-d5b8e9dde49b)

_**1. Ongoing activities**, like timers, media players, or workouts, can be accessed from the watch face_

##### Physical buttons

Wearable devices can have a variety input surfaces, which include physical buttons and controls.

[Image: 3 watch faces with indications showing the locations of a rotating side button, system button, and multifuction button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bb056-04.png?alt=media&token=c5f5729d-7062-4ad6-bb30-6623034e4d67)

_1. 

Rotating side buttons: Used for volume control, or to scroll through options or lists
2. 

System buttons: Dedicated to OS functions like powering on and off, and cannot be customized
3. 

Multifunction buttons: Used by apps for custom actions like starting and stopping a stopwatch_

#### Design principles

- 

Tailor layouts for different screen sizes with adaptive design (https://developer.android.com/design/ui/wear/guides/foundations/adaptive-design)
- 

Design for short interactions to conserve battery
- 

Focus on one or two tasks at a time rather than a full app experience
- 

Test designs in situations that involve movement to make sure the design is usable at a glance

[Image: Calendar screen with date, time of dentist appointment, and more button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bcxbd-05-do.png?alt=media&token=62f68437-1882-4aa9-8d93-83782f72253f)

_At-a-glance views allow people to quickly see calendar events_

[Image: 3 columns with times, dates, and appointment names cut off.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bdrul-06-dont.png?alt=media&token=e9bc2019-549d-46b7-bc78-782c2ef2ec81)

_Don't create complex and detailed apps such as a calendar grid_

##### Always relevant

Watches are always with people. Consider how to update app content based on context, such as time, place, and activity.

[Image: A map search for a garden’s location on a watch and on a phone.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4befpv-07.png?alt=media&token=82769747-1860-4b35-af4d-450ca0ae21f4)

_Navigation on a watch complements the experience on a phone_

##### Works offline

Design for slow connections and offline use, such as exercising and commuting.

[Image: 2 watches: 1 with offline music downloads list. 1 with a dialog about no internet connection with dismiss and accept buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bf7c4-08.png?alt=media&token=f17e3796-9fed-4cd7-9a36-771d26f34e94)

_The network state can be communicated through:

1. 

An offline icon
2. 

A dialog_

#### Interaction patterns

##### Cross-device experiences

Watches are often dependent on connected phones for functionality or complex interactions. In some cases, a watch and a phone are used together to accomplish different parts of the same task.

Consider how experiences can be consistent and complement the strengths of each device.

More on multidevice development for Android (https://developer.android.com/multi-device-development)

[Image: A contact entry shown on a phone and a watch, with options to call or message.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bg988-09-do.png?alt=media&token=555a5877-f868-49c2-b980-5236f0d8d605)

_Consider which actions are appropriate for each device_

##### Always on displays

Watches can have always on displays, which allow ambient content to be shown when the watch isn’t in use.

This are especially helpful for ongoing experiences like a timer or a workout that should remain in view. Because they remain on the screen for long time periods, consider limiting the number of pixels that are illuminated.

More on always-on apps and system ambient mode in Wear OS (https://developer.android.com/training/wearables/always-on)

[Image: A watch face showing progress through a task and the current time.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bgxlg-10.png?alt=media&token=e086af86-527b-474e-b1c1-602529e31f38)

_Limit the number of illuminated pixels for a display that's always on_

## Styles

#### Resources

| Type | Resource |
| --- | --- |
| Design | M3 Expressive on Wear OS (https://developer.android.com/design/ui/wear/guides/get-started) |
| Typography for Wear OS (https://developer.android.com/design/ui/wear/guides/styles/typography) |  |
| Color for Wear OS (https://developer.android.com/design/ui/wear/guides/styles/color) |  |
| Motion for Wear OS (https://developer.android.com/design/ui/wear/guides/get-started/apply#shape-motion) |  |
| Implementation | Android Developers: Wear OS (https://developer.android.com/training/wearables) |
| Jetpack Compose for Wear OS (https://developer.android.com/training/wearables/compose?version=3) |  |

#### Typography

GM3 Expressive adds two type styles specially designed for watches. More on the type scale for Wear OS (https://developer.android.com/design/ui/wear/guides/styles/typography/type-scale-tokens)

##### Numerals

Numeral text styles display numbers, usually only a few digits at a time. This text can take on more expressive properties at larger display sizes without the accommodations usually required by text that must be localized.

[Image: A watch face with an indication for the numeral text style used to show the time.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bxhlf-22.png?alt=media&token=2ff2bd35-9cd1-4f00-bacf-a5f7398c7f13)

_1. 

Numeral Large_

##### Arc text

Arc text is specially designed for text following a curved path on a round screen, such as page titles, confirmation overlays, or a call to action. It optimizes character spacing for text displayed along a curve at the top or bottom of a round screen.

[Image: A close-up of a watch face with arc text showing “check your phone” hugging the bottom bevel of a round screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4byceo-23.png?alt=media&token=a50fa393-d91d-41d6-832c-7a2f0c8b89ce)

_1. 

Arc Large_

#### Color

Material for Wear OS provides a custom color system (https://developer.android.com/design/ui/wear/guides/styles/color/system) to create vibrant experiences and clear visual hierarchy.

##### Build from black

Watches are designed with a black background, instead of the tinted background that phones use.

[Image: 2 watch screens showing sleeping app and a number picker.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bz1nw-1.png?alt=media&token=d1c14f18-c914-47fd-8d9d-32154507faef)

_Watches use a black background to conserve battery_

##### Color roles

Since watches are used throughout the day, color tokens for Wear OS are specifically tailored for dark themes in low-light environments and light themes for daylight environments.

More on color roles for Wear OS (https://developer.android.com/design/ui/wear/guides/styles/color/roles-tokens)

[Image: 3 examples of “Accept” and “Decline” buttons that are legible.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4bzy9c-21.png?alt=media&token=aca53443-d026-4313-8e71-465fe89b3b1d)

_Buttons with (2) **on primary** on (1) **primary** and (4) **onprimary container** on (3) **primary container** stay legible as the contrast level changes_

[Image: Buttons with (2) primary dim on (1) primary or (4) primary dim on (3) primary container become illegible as contrast levels shift](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4c1f7y-22.png?alt=media&token=62f3d1b4-8389-4d0b-b6b2-7534316edd3b)

_Buttons with (2) **primary dim** on (1) **primary** or (4) **primary dim** on (3) **primary container** become illegible as contrast levels shift_

##### Recommended color combinations for Wear OS

Below are some common color pairings that can help establish priority, function, and elevation.

- 

Use **primary dim** to highlight important elements and **tertiary** to provide standout feedback, such as tap responses
- 

When the main action isn't clear, use **tertiary** and **primary** for main actions and **secondary container** for complementary actions
- 

Use **secondary** and **primary container** to show two equally important options or containers, while maintaining contrast

[Image: Three buttons, with the center one in Primary and side ones in Primary Dim.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4c3ekq-23.png?alt=media&token=a831349d-6b4f-4625-8714-ea0a653dcf47)

_1. 

Primary
2. 

Primary dim_

[Image: A number pad with most keys in Primary Dim and the pressed key in Tertiary.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4c4fsb-24.png?alt=media&token=b86e622b-f8de-4115-979c-3bd3c2b9e187)

_1. 

Primary dim
2. 

Tertiary_

[Image: Call button in tertiary color, open button in primary color and open on phone button in secondary-container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4c72hg-28.png?alt=media&token=21b40ca1-7517-4ed9-840f-d4e442b69f8a)

_1. 

Tertiary
2. 

Primary
3. 

Secondary container_

[Image: accept button in primary and delete button in primary container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4c6oau-30.png?alt=media&token=0b3a838a-4390-4f00-97f3-c8db07afd08d)

_1. 

Primary
2. 

Tertiary
3. 

Primary container_

[Image: Plus button in primary color, date button is in tertiary color and appointment summary is in primary container color.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4cam7e-27.png?alt=media&token=3ed8ef43-e3b5-479d-a71d-fde18a157042)

_1. 

Primary dim
2. 

Tertiary dim_

[Image: Bicycle button in primary, weight button in tertiary dim.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4c7zvn-31.png?alt=media&token=705e310c-fa24-4148-9c48-984c58b82536)

_1. 

Primary
2. 

Tertiary dim_

#### Motion and transitions

Expressive motion makes interactions feel more alive, fluid, and natural. Use transitions give intuitive feedback to show how an app works, such as standard patterns for changes in state or hierarchy.

More on shape and motion for Wear OS (https://developer.android.com/design/ui/wear/guides/get-started/apply#shape-motion)

[Video: A settings screen scrolling through options.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmq5ib9cq-Platforms%20-%20WearOS%20-%20Overview%2002%20-%20IA%20-V01.mp4?alt=media&token=76ea90c3-b7d5-471c-9001-d3f6f706847b)

_Use expressive motion to show items selected_

#### Haptics

Haptics are tactile effects used to grab a person’s attention for something important, or add emphasis to an interaction on the screen. You can use haptics to provide responsive feedback to scrolling and selecting items from a list, or controlling volume.

Use system-defined patterns and tokens (when available) to reinforce interaction expectations. Synchronize haptics with UI motion and sound to provide richer feedback.

- 

Use stronger haptics for key interactions, such as a payment confirmation
- 

Use subtler haptics for precision interactions, such as scrolling through a list

More on haptics for Wear OS (https://developer.android.com/develop/ui/views/haptics/haptics-principles)

[Image: 2 watch faces with lines indicating haptics for a payment being accepted and scrolling through notifications.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4c8vp7-x.png?alt=media&token=be98fca9-818a-438f-a010-844b5648e1a9)

_Use stronger haptics for key interactions and subtler feedback for precision interactions_

## Layout

#### Resources

| Type | Resource |
| --- | --- |
| Design | Wear OS common design layouts (https://developer.android.com/design/ui/wear/guides/foundations/common-layouts) |
| Adaptive layout for Wear OS (https://developer.android.com/design/ui/wear/guides/foundations/adaptive-design) |  |
| Figma Design Kit for Wear OS Apps (https://www.figma.com/community/file/1506418396052412186) |  |
| Figma Design Kit for Wear OS Tiles (https://www.figma.com/community/file/1507852095734722321/m3-wear-os-tiles-design-kit?fuid=1348995927136540612) |  |
| Implementation | Android Developers: Wear OS (https://developer.android.com/training/wearables) |

#### Layout principles

[Image: A social networking scrolling screen showing Followers, sorting and search.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4d4yba-01.png?alt=media&token=68b193f1-116c-41ad-86df-c5ee74302b63)

_**Prioritize content**

Place the most important information at the top of the screen._

[Image: An audio interface showing headphones are connected with volume indicator and controls.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4d5pli-02.png?alt=media&token=cae886e8-17c7-4bbd-95a0-8924bedd566e)

_**Limit choices**

Reduce the number of actions to prevent decision fatigue. Focus on critical tasks to help people get things done within seconds._

[Image: A dialog confirming device access to call log and contacts.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4d6ew9-03.png?alt=media&token=3c3d4626-2b9a-4324-9556-5a102e7d6c94)

_**Simplify navigation**

Use a clear, shallow hierarchy so people don't get lost in complex menus. Aim to display content and navigation inline._

#### Standard layouts

For scrolling and non-scrolling apps:

- 

The time is shown on most app screens
- 

Edge-hugging buttons are used for round screens
- 

Show an indicator if more content is available on a scrolling apps

Wear OS offers Figma Design Kits (https://developer.android.com/design/ui/wear/guides/get-started/design-kits) for standard layouts, with components, styles, and variables.

[Image: A watch screen showing a social media app and a watch screen showing a timer with element indicators.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4d7u52-04.png?alt=media&token=bae8674d-794c-43de-b2b7-19dd7e1dfda2)

_1. 

Time text
2. 

Page title
3. 

Scroll indicator
4. 

Action button_

##### Non-scrolling layouts

Non-scrolling layouts are for focused tasks or single-screen interactions where all content fits within the display, such as: 

- 

Media players
- 

Pickers and switchers
- 

Fitness tracking screens
- 

Confirmation dialogs 

More on non-scrolling layouts for Wear OS (https://developer.android.com/design/ui/wear/guides/surfaces/apps/layouts/scrolling)

[Image: A non-scrollable timer with current time 9:30, timer set for 00:25:52, and a start button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4d8mdi-05.png?alt=media&token=aa0d61fb-6677-4c4c-af3a-6c7cd873ac3f)

_Use non-scrolling layouts for focused tasks like a timer_

##### Scrolling layouts

Scrolling layouts can show content that exceeds the screen height, such as lists or dialogs. These might include:

- 

Message threads
- 

Contact lists
- 

Menu options

More on scrolling layouts for Wear OS (https://developer.android.com/design/ui/wear/guides/surfaces/apps/layouts/scrolling)

[Image: A scrollable layout with current time, search button, 1st follower and avatar on screen, and two followers off screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4d98d6-06.png?alt=media&token=f8ae3aad-0899-4c67-adb2-c91dae87fd56)

_Lists use scrolling layouts to show additional options_

##### Tiles

Tiles (or widgets) are designed for glanceability. Use them to show timely updates or to help people perform frequent tasks quickly, such as checking progress towards a goal or viewing the weather.

Tiles are accessible with a swipe from the watch face. They have a fixed screen height and don't scroll.

More on tiles for Wear OS (https://developer.android.com/design/ui/wear/guides/foundations/common-layouts/tiles)

[Image: Icon buttons for meditation, running, cycling, and a More button](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4dbada-07.png?alt=media&token=0654f832-abb0-4cdf-af88-d6c520acba66)

_Use tiles for quick access to to a few key options_

##### Notifications

Notifications can be expanded to offer more interactions, such as replying to a message, opening a location on a map, or playing a song.

Wear OS provides notification templates for instant messaging and calendar events.

More on notifications for Wear OS (https://developer.android.com/training/wearables/notifications)

[Image: A message notification shown in a drawer with dimmed notifications above and below.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4dbzlj-08.png?alt=media&token=c79e9e9a-fb2e-4a49-a811-157b0f4403bd)

_Notifications should offer easy access to more interactions_

##### Adaptive layout

Adaptive design allows apps to adapt to different screen sizes and device contexts. On Wear OS, this means apps scale and reorganize to maximize the available space on both small and large round displays. The Material 3 Compose component library (https://developer.android.com/jetpack/androidx/releases/compose-material3?_gl=1*1ntglil*_ga*NzMzMjg1Nzc1LjE3NDg5MTM2NjI.*_ga_QPQ2NRV856*czE3NjQ3MDkwMjUkbzc2JGcxJHQxNzY0NzEwNjAyJGo0MCRsMCRoMA..) has built-in adaptive behavior.

- 

Design for small screens first: Start by designing for the smallest common screen size
- 

Use percentages: Define margins and padding using percentages rather than fixed pixel values. This prevents clipping and ensures content remains centered and proportional as the screen size increases.
- 

Add value on larger screens: Use the extra space on screens larger to show more content, such as additional buttons, text lines, or data visualizations
- 

Test all font sizes: Font scaling and accessibility settings such as bold text may cause changes in the size of UI elements

More on adaptive layout for Wear OS (https://developer.android.com/design/ui/wear/guides/foundations/adaptive-design)

[Image: 5, 10, and 15 minute alarm buttons plus an edge-hugging more button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4dcvb2-09.png?alt=media&token=bbded910-14b8-4f43-aec2-cd846b328f2c)

_Design for small screens first, starting with a 192dp size watch_

[Image: 5, 10, 15, 20 &amp; 30 minute alarm buttons plus an edge-hugging more button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4dg8dm-10.png?alt=media&token=0eccef8b-54ec-4458-b12b-8d24dd060bbc)

_Show more content on devices that are larger than 225dp_
