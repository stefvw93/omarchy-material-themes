# Easing and duration

Source: <https://m3.material.io/styles/motion/easing-and-duration> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:03:58.337Z)

> Easing and duration create responsive and expressive motion

## Applying easing and duration

starNote:In the expressive update, components and motion now use the motion physics system (https://m3.material.io/m3/pages/motion-overview/), which uses springs. Products should migrate to the new system. The easing and duration system is still used for transitions and can be used by teams that haven't yet updated to GM3 Expressive, but is no longer maintained.

#### Suggested easing and duration pairs

Choosing the right combination of easing and duration can be complicated. As a simple starting point, these are sensible defaults that will work for most transitions.

| **Easing** | **Duration** | **Transition type** |
| --- | --- | --- |
| Emphasized | 500ms | Begin and end on screen |
| Emphasized decelerate | 400ms | Enter the screen |
| Emphasized accelerate | 200ms | Exit the screen |
| Standard | 300ms | Begin and end on screen |
| Standard decelerate | 250ms | Enter the screen |
| Standard accelerate | 200ms | Exit the screen |

#### Easing

In the physical world, objects don’t start or stop instantaneously. Instead, they take time to speed up and slow down. Transitions without easing look stiff and mechanical, while a transition with easing appears more natural.

[Video: Motion curve with and without easing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5kg57-GM3-Styles-Motion-EasingAndDuration-1-v01.mp4?alt=media&token=b0bfb5c9-b5e7-4c77-bfbe-f996b6c65820)

_1. A transition with easing 
2. A transition without easing_

Compared to the utilitarian style of M2, M3 easing is more expressive. Transitions have snappy take offs and very soft landings. 

Durations are slightly longer compared to M2. This gives transitions time to come to a gentle rest without feeling abrupt.

[Video: Comparison of M2 and M3 easing curves.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5kzx8-GM3-Styles-Motion-EasingAndDuration-2-v01.mp4?alt=media&token=a99083ca-5afd-4a10-9220-11c65b1ec8e1)

_1. M2 easing and duration 
2. M3 easing and duration_

##### Choosing an easing set

The **Emphasized easing set** (https://m3.material.io/m3/pages/motion-easing-and-duration/tokens-specs#cbea5c6e-7b0d-47a0-98c3-767080a38d95) is recommended for most transitions to capture the style of M3.

The **Standard easing set** (https://m3.material.io/m3/pages/motion-easing-and-duration/tokens-specs#601d5552-a6e6-4d74-9886-ff8f24b9ec35) can be used for small utility focused transitions that need to be quick. The Standard set is also a fallback for platforms that don't support Emphasized easing, like iOS and Web.

[Video: Expanding card in a note taking app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5meuq-04%20-%20Emphasized%20easing.mp4?alt=media&token=5b3caf5e-4108-49ab-ba89-9e7664fa9e7d)

_Emphasized easing is used for this full screen transition_

[Video: Text field selection in an email app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5ncde-GM3-Styles-Motion-EasingAndDuration-3-2-v01.mp4?alt=media&token=2461a8d8-ff5e-4d4c-9ea1-7f3d4721cbcc)

_Standard easing is used for this Text field transition on Web. The simple style fits the utility of this component._

##### Choosing an easing type

Easing types are chosen based on how a transition moves in relation to the screen.

###### Begin and end on screen

These transitions use **Emphasized** easing. It speeds up quickly and then comes to a gentle rest in order to emphasize the end of the transition.

[Video: Card expanding in a podcast app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5oi36-01%20-%20Start%20and%20End%20on%20screen_1.mp4?alt=media&token=df0b5b40-1394-4585-9c34-2f7098056e15)

_This transition begins and ends on screen so it uses Emphasized easing_

###### Enter the screen

These transitions use **Emphasized decelerate** easing. It begins at peak velocity then comes to a gentle rest.

###### Exit the screen permanently

These transitions use **Emphasized accelerate** easing. It begins at rest and ends at peak velocity. By ending at peak velocity, it gives the impression the exiting component cannot be retrieved.

[Video: Card rising from bottom of screen, then retreating quickly back to bottom of screen after being exited.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5p261-02%20-%20Enter%20and%20Exit%20the%20screen.mp4?alt=media&token=cec5c45c-53d5-4b5a-8540-2a3d7f3d7cb3)

_This Bottom sheet enters with Emphasized decelerate and exits permanently with Emphasized accelerate_

###### Exit the screen temporarily

These transitions use **Emphasized** easing. By ending at rest just off screen, it gives the impression the exiting component can be retrieved.

[Video: Calendar menu is temporarily collapsed to the left.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5po4q-03%20-%20Exit%20Temporarily.mp4?alt=media&token=c43ef98e-fe31-4e2e-9241-45d618d77d39)

_This drawer enters and exits temporarily with Emphasized easing_

#### Duration

Transitions shouldn’t be jarringly fast or so slow that users feel as though they’re waiting. The right combination of duration and easing produces smooth and responsive transitions.

[Video: Clock icon is expanded to smoothly take over the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5s08u-05%20-%20Duration%20-%20Do%202.mp4?alt=media&token=3a26c18a-b31d-400d-8f21-fc3131dcae4e)

_A transition with a well tuned duration is quick and easy to follow_

[Video: Clock icon is expanded rapidly, in abrupt fashion, to take over the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo5r2t6-04%20-%20Duration%20-%20Dont%202.mp4?alt=media&token=961208cd-0b72-4597-93da-e42b8d13fb90)

_Avoid transitions with such a short duration they become jarring_

##### Choosing a duration

Durations are chosen based on these criteria:

###### Transition size

Transitions that cover small areas of the screen have short durations. Those that traverse large areas have long durations. Scaling duration with the size of a transition area gives a consistent sense of speed.

[Video: A series of radio buttons are selected on the Settings screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7qkkx-06%20-%20Small%20area%202.mp4?alt=media&token=25551a98-881c-43bd-a04a-b7cd84f4a10e)

_This transition covers a small area with a short 200ms duration_

[Video: An album is selected that takes over the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7qvzl-08%20-%20Large%20area%202.mp4?alt=media&token=4b40a6da-65ba-435c-9a87-57eac0eca02a)

_This transition covers a large area with a long 500ms duration_

###### Enter vs. exit transitions

Transitions that exit, dismiss, or collapse an element use shorter durations. Exit transitions are faster because they require less attention than the user’s next task.

Transitions that enter or remain persistent on the screen use longer durations. This helps users focus attention on what's new on screen.

[Video: Pop up screen on an email draft has option to delete or cancel.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7rtzk-09%20-%20Enter%20Exit.mp4?alt=media&token=8ffff3e4-1ebb-47e8-999f-04c20b360f6a)

_1. An Enter transition has a long duration of 500ms 
2. An Exit transition has a short duration of 200ms_

[Video: Bottom sheet uses a longer animation duration to enter and a shorter duration to exit the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7sfc7-10%20-%20Enter%20Exit.mp4?alt=media&token=b1f8076f-4d05-4c67-886d-f3685b452c1e)

_1. An Enter transition has a long duration of 500ms
2. An Exit transition has a short duration of 200ms_

## Tokens & specs

starNote:In the expressive update, components and motion now use the motion physics system (https://m3.material.io/m3/pages/motion-overview/), which uses springs. Products should migrate to the new system. The easing and duration system is still used for transitions and can be used by teams that haven't yet updated to GM3 Expressive, but is no longer maintained.

#### Tokens

Motion easing and duration can be implemented using easing and duration tokens. Learn more about design tokens (https://m3.material.io/m3/pages/design-tokens/overview)

[Token table: see ../tokens/TOKEN_TYPE_UNSPECIFIED.20543ce18892f7d9.md]

#### Easing

##### Emphasized easing set

This set is the most common because it captures the expressive style of M3.

[Video: A line graph illustrating an emphasized easing pattern.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7ug8i-GM3-Styles-Motion-Easing_Duration-Tokens-1-1-v01.mp4?alt=media&token=879529b5-4b03-49b3-a203-46657b3148ac)

_Emphasized_

[Video: A line graph illustrating an emphasized decelerate easing pattern.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7uv91-GM3-Styles-Motion-Easing_Duration-Tokens-1-2-v01.mp4?alt=media&token=9f0d914d-4fd4-42ff-a924-54be8cf93e5a)

_Emphasized decelerate_

[Video: A line graph illustrating an emphasized accelerate easing pattern.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7v6ah-GM3-Styles-Motion-Easing_Duration-Tokens-1-3-v01.mp4?alt=media&token=6a20dec3-a717-4ac9-b39e-5bd93a90f222)

_Emphasized accelerate_

| Info/Platform | Emphasized | Emphasized decelerate | Emphasized accelerate |
| --- | --- | --- | --- |
| Token | md.sys.motion.easing.emphasized | md.sys.motion.easing.emphasized.decelerate | md.sys.motion.easing.emphasized.accelerate |
| Android | pathInterpolator(M 0,0 C 0.05, 0, 0.133333, 0.06, 0.166666, 0.4 C 0.208333, 0.82, 0.25, 1, 1, 1) (https://developer.android.com/reference/android/view/animation/PathInterpolator) | PathInterpolator(0.05f, 0.7f, 0.1f, 1f) (https://developer.android.com/reference/android/view/animation/PathInterpolator) | PathInterpolator(0.3f, 0f, 0.8f, 0.15f) (https://developer.android.com/reference/android/view/animation/PathInterpolator) |
| CSS | N/A (Use Standard as a fallback) | cubic-bezier(0.05, 0.7, 0.1, 1.0) (https://www.w3schools.com/cssref/func_cubic-bezier.asp) | cubic-bezier(0.3, 0.0, 0.8, 0.15) (https://www.w3schools.com/cssref/func_cubic-bezier.asp) |
| Flutter | easeInOutCubicEmphasized (https://api.flutter.dev/flutter/animation/Curves/easeInOutCubicEmphasized-constant.html) | Cubic(0.05, 0.7, 0.1, 1.0); (https://api.flutter.dev/flutter/animation/Cubic-class.html) | Cubic(0.3, 0.0, 0.8, 0.15); (https://api.flutter.dev/flutter/animation/Cubic-class.html) |
| iOS | N/A (Use Standard as a fallback) | ControlPoints:0.05f:0.7f:0.1f:1.0f]; (https://developer.apple.com/documentation/quartzcore/camediatimingfunction) | ControlPoints:0.3f:0.0f:0.8f:0.15f]; (https://developer.apple.com/documentation/quartzcore/camediatimingfunction) |
| After Effects | Use After Effects Easing Panel (https://storage.googleapis.com/material-io-static/resources/material-easing-1.1.3.zxp) (download) |  |  |

##### Standard easing set

This set is used for simple, small, or utility-focused transitions.

[Video: A line graph illustrating a standard easing pattern.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7vu4c-GM3-Styles-Motion-Easing_Duration-Tokens-2-1-v01.mp4?alt=media&token=7a7c72cc-6c0f-4836-8319-96a7fa2dd0a0)

_Standard_

[Video: A line graph illustrating a standard decelerate easing pattern.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7w7mt-GM3-Styles-Motion-Easing_Duration-Tokens-2-2-v01.mp4?alt=media&token=5dc6520f-ea02-4673-9527-51b9e214e1e4)

_Standard decelerate_

[Video: A line graph illustrating a standard accelerate easing pattern.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7wjde-GM3-Styles-Motion-Easing_Duration-Tokens-2-3-v01.mp4?alt=media&token=d104f24b-757c-4172-8ff5-10beb509865d)

_Standard accelerate_

|  | Standard | Standard decelerate | Standard accelerate |
| --- | --- | --- | --- |
| Token | md.sys.motion.easing.standard | md.sys.motion.easing.standard.decelerate | md.sys.motion.easing.standard.accelerate |
| Android | PathInterpolator(0.2f, 0f, 0f, 1f) (https://developer.android.com/reference/android/view/animation/PathInterpolator) | PathInterpolator(0f, 0f, 0f, 1f) (https://developer.android.com/reference/android/view/animation/PathInterpolator) | PathInterpolator(0.3f, 0f, 1f, 1f) (https://developer.android.com/reference/android/view/animation/PathInterpolator) |
| CSS | cubic-bezier(0.2, 0.0, 0, 1.0); (https://www.w3schools.com/cssref/func_cubic-bezier.asp) | cubic-bezier(0, 0, 0, 1); (https://www.w3schools.com/cssref/func_cubic-bezier.asp) | cubic-bezier(0.3, 0, 1, 1); (https://www.w3schools.com/cssref/func_cubic-bezier.asp) |
| Flutter | Cubic(0.2, 0.0, 0, 1.0); (https://api.flutter.dev/flutter/animation/Cubic-class.html) | Cubic(0, 0, 0, 1); (https://api.flutter.dev/flutter/animation/Cubic-class.html) | Cubic(0.3, 0, 1, 1); (https://api.flutter.dev/flutter/animation/Cubic-class.html) |
| iOS | ControlPoints:0.2f:0.0f:0.0f:1.0f (https://developer.apple.com/documentation/quartzcore/camediatimingfunction) | ControlPoints:0.0f:0.0f:0.0f:1.0f (https://developer.apple.com/documentation/quartzcore/camediatimingfunction) | ControlPoints:0.3f:0.0f:1.0f:1.0f]; (https://developer.apple.com/documentation/quartzcore/camediatimingfunction) |
| After Effects | Use After Effects Easing Panel (https://storage.googleapis.com/material-io-static/resources/material-easing-1.1.3.zxp) (download) |  |  |

#### Duration

##### Short durations

These are used for small utility-focused transitions.

| **Token** | **Value** |
| --- | --- |
| md.sys.motion.duration.short1 | 50ms |
| md.sys.motion.duration.short2 | 100ms |
| md.sys.motion.duration.short3 | 150ms |
| md.sys.motion.duration.short4 | 200ms |

[Video: Animation showing a 200ms duration and standard easing curve applied to selection control interactions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7xbhz-GM3-Styles-Motion-Easing_Duration-Tokens-3-v01.mp4?alt=media&token=1e5623d6-026a-425b-8c68-c8853a10882e)

_Selection controls have a short duration of 200ms with Standard easing_

##### Medium durations

These are used for transitions that traverse a medium area of the screen.

| **Token** | **Value** |
| --- | --- |
| md.sys.motion.duration.medium1 | 250ms |
| md.sys.motion.duration.medium2 | 300ms |
| md.sys.motion.duration.medium3 | 350ms |
| md.sys.motion.duration.medium4 | 400ms |

[Video: Animation showing a FAB expanding into a sheet with a 400ms duration and Emphasized easing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7xucu-GM3-Styles-Motion-Easing_Duration-Tokens-4-v01.mp4?alt=media&token=8e049eaf-5050-4c72-b3c7-fd5421f9d675)

_A FAB expanding into a Sheet uses a 400ms duration with Emphasized easing_

##### Long durations

These durations are often paired with Emphasized easing. They're used for large expressive transitions.

| **Token** | **Value** |
| --- | --- |
| md.sys.motion.duration.long1 | 450ms |
| md.sys.motion.duration.long2 | 500ms |
| md.sys.motion.duration.long3 | 550ms |
| md.sys.motion.duration.long4 | 600ms |

[Video: Animation showing a card expanding into a full screen with a 500ms duration and emphasized easing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7ysp0-GM3-Styles-Motion-Easing_Duration-Tokens-5-v01.mp4?alt=media&token=8a2cb049-a5d4-40f8-b7b6-3303a5f9166c)

_A Card expanding to full screen uses a long 500ms duration with Emphasized easing_

##### Extra long durations

Though rare, some transitions use durations above 600ms. These are usually used for ambient transitions that don't involve user input.

| **Token** | **Value** |
| --- | --- |
| md.sys.motion.duration.extra-long1 | 700ms |
| md.sys.motion.duration.extra-long2 | 800ms |
| md.sys.motion.duration.extra-long3 | 900ms |
| md.sys.motion.duration.extra-long4 | 1000ms |

[Video: Animation showing the transition of an ambient carousel auto-advancing with a 1000ms duration and emphasized easing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxo7z9jk-GM3-Styles-Motion-Easing_Duration-Tokens-6-v01.mp4?alt=media&token=2d3db148-918b-44e1-9368-780880ec63db)

_An ambient carousel auto-advance transition uses an extra long 1000ms duration with emphasized easing_
