# Tokens: Token_type_unspecified (TOKEN_TYPE_UNSPECIFIED.20543ce18892f7d9)

Source: <https://m3.material.io/_dsm/data/dsdb-m3/2026-09-23_06-10-05/TOKEN_TYPE_UNSPECIFIED.20543ce18892f7d9.json>, design system 'Google Material 3' revision 7989 (2026-05-27T22:44:15.009106Z).
Used on: <https://m3.material.io/foundations/interaction/states>, <https://m3.material.io/styles/motion/easing-and-duration>, <https://m3.material.io/styles/motion/overview>, <https://m3.material.io/styles/shape>

Each token lists its value per context. `->` shows the reference chain (component token -> system token -> reference token); the resolved value is what the baseline scheme produces in that context. Contexts with identical chain and value are merged.

## md.sys.motion — Motion

For all motion. Includes spring tokens (physics system), and legacy easing and duration tokens.

- **md.sys.motion.duration.extra-long1** (Extra long 1)
  - 700ms
- **md.sys.motion.duration.extra-long2** (Extra long 2)
  - 800ms
- **md.sys.motion.duration.extra-long3** (Extra long 3)
  - 900ms
- **md.sys.motion.duration.extra-long4** (Extra long 4)
  - 1000ms
- **md.sys.motion.duration.long1** (Long 1)
  - 450ms
- **md.sys.motion.duration.long2** (Long 2)
  - 500ms
- **md.sys.motion.duration.long3** (Long 3)
  - 550ms
- **md.sys.motion.duration.long4** (Long 4)
  - 600ms
- **md.sys.motion.duration.medium1** (Medium 1)
  - 250ms
- **md.sys.motion.duration.medium2** (Medium 2)
  - 300ms
- **md.sys.motion.duration.medium3** (Medium 3)
  - 350ms
- **md.sys.motion.duration.medium4** (Medium 4)
  - 400ms
- **md.sys.motion.duration.short1** (Short 1)
  - 50ms
- **md.sys.motion.duration.short2** (Short 2)
  - 100ms
- **md.sys.motion.duration.short3** (Short 3)
  - 150ms
- **md.sys.motion.duration.short4** (Short 4)
  - 200ms
- **md.sys.motion.easing.emphasized** (Emphasized)
  - [Platform=Compose]: cubic-bezier(0.2, 0, 0, 1)
  - [Platform=Android]: {"svgPath":"M 0,0 C 0.05, 0, 0.133333, 0.06, 0.166666, 0.4 C 0.208333, 0.82, 0.25, 1, 1, 1"}
  - [Platform=Web]: -> md.sys.motion.easing.standard = cubic-bezier(0.2, 0, 0, 1)
- **md.sys.motion.easing.emphasized.accelerate** (Emphasized accelerate)
  - cubic-bezier(0.3, 0, 0.8, 0.15)
- **md.sys.motion.easing.emphasized.decelerate** (Emphasized decelerate)
  - cubic-bezier(0.05, 0.7, 0.1, 1)
- **md.sys.motion.easing.legacy** (Legacy)
  - cubic-bezier(0.4, 0, 0.2, 1)
- **md.sys.motion.easing.legacy.accelerate** (Legacy accelerate)
  - cubic-bezier(0.4, 0, 1, 1)
- **md.sys.motion.easing.legacy.decelerate** (Legacy decelerate)
  - cubic-bezier(0, 0, 0.2, 1)
- **md.sys.motion.easing.linear** (Linear)
  - cubic-bezier(0, 0, 1, 1)
- **md.sys.motion.easing.standard** (Standard)
  - cubic-bezier(0.2, 0, 0, 1)
- **md.sys.motion.easing.standard.accelerate** (Standard accelerate)
  - cubic-bezier(0.3, 0, 1, 1)
- **md.sys.motion.easing.standard.decelerate** (Standard decelerate)
  - cubic-bezier(0, 0, 0, 1)
- **md.sys.motion.path** (Motion path)
  - {"motionPath":{"standardPath":"LINEAR"}}
- **md.sys.motion.spring.default.effects** (Motion spring default effects )
  - {damping: 1, stiffness: 1600} [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.default.effects.damping** (Motion spring default effects damping)
  - 1 [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.default.effects.stiffness** (Motion spring default effects stiffness)
  - 1600 [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.default.spatial** (Motion spring default spatial)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: {damping: 0.8, stiffness: 380}
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: {damping: 0.9, stiffness: 700}
- **md.sys.motion.spring.default.spatial.damping** (Motion spring default spatial damping)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: 0.8
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: 0.9
- **md.sys.motion.spring.default.spatial.stiffness** (Motion spring default spatial stiffness)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: 380
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: 700
- **md.sys.motion.spring.fast.effects** (Motion spring fast effects )
  - {damping: 1, stiffness: 3800} [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.fast.effects.damping** (Motion spring fast effects damping)
  - 1 [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.fast.effects.stiffness** (Motion spring fast effects stiffness)
  - 3800 [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.fast.spatial** (Motion spring fast spatial)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: {damping: 0.6, stiffness: 800}
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: {damping: 0.9, stiffness: 1400}
- **md.sys.motion.spring.fast.spatial.damping** (Motion spring fast spatial damping)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: 0.6
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: 0.9
- **md.sys.motion.spring.fast.spatial.stiffness** (Motion spring fast spatial stiffness)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: 800
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: 1400
- **md.sys.motion.spring.slow.effects** (Motion spring slow effects )
  - {damping: 1, stiffness: 800} [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.slow.effects.damping** (Motion spring slow effects damping)
  - 1 [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.slow.effects.stiffness** (Motion spring slow effects stiffness)
  - 800 [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android; Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]
- **md.sys.motion.spring.slow.spatial** (Motion spring slow spatial)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: {damping: 0.8, stiffness: 200}
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: {damping: 0.9, stiffness: 300}
- **md.sys.motion.spring.slow.spatial.damping** (Motion spring slow spatial damping)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: 0.8
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: 0.9
- **md.sys.motion.spring.slow.spatial.stiffness** (Motion spring slow spatial stiffness)
  - [Motion scheme=Expressive + Platform=Compose; Motion scheme=Expressive + Platform=Web; Motion scheme=Expressive + Platform=Android]: 200
  - [Motion scheme=Standard + Platform=Compose; Motion scheme=Standard + Platform=Web; Motion scheme=Standard + Platform=Android]: 300

## md.sys.shape — Shape

Corner shape and directional modifier (like "top" or "end") tokens.

- **md.sys.shape.corner-value.extra-extra-large** (Extra extra large corner value)
  - 48dp
- **md.sys.shape.corner-value.extra-large** (Extra large corner value)
  - 28dp
- **md.sys.shape.corner-value.extra-large-increased** (Extra large increased corner value)
  - 32dp
- **md.sys.shape.corner-value.extra-small** (Extra small corner value)
  - 4dp
- **md.sys.shape.corner-value.large** (Large corner value)
  - 16dp
- **md.sys.shape.corner-value.large-increased** (Large increased corner value)
  - 20dp
- **md.sys.shape.corner-value.medium** (Medium corner value)
  - 12dp
- **md.sys.shape.corner-value.none** (No corner value)
  - 0dp
- **md.sys.shape.corner-value.small** (Small corner value)
  - 8dp
- **md.sys.shape.corner.extra-extra-large** (Extra extra large rounding)
  - rounded_corners 48dp
- **md.sys.shape.corner.extra-large** (Extra large rounding)
  - rounded_corners 28dp
- **md.sys.shape.corner.extra-large-increased** (Extra large increased rounding)
  - rounded_corners 32dp
- **md.sys.shape.corner.extra-large.top** (Extra large top rounding)
  - rounded_corners 0dp topLeft=28dp topRight=28dp
- **md.sys.shape.corner.extra-small** (Extra small rounding)
  - rounded_corners 4dp
- **md.sys.shape.corner.extra-small.top** (Extra small top rounding)
  - rounded_corners 0dp topLeft=4dp topRight=4dp
- **md.sys.shape.corner.full** (Fully rounded) — Use for: Badge, Buttons, Icon buttons, Sliders, Switches, Search bar
  - circular
- **md.sys.shape.corner.large** (Large rounding)
  - rounded_corners 16dp
- **md.sys.shape.corner.large-increased** (Large increased rounding)
  - rounded_corners 20dp
- **md.sys.shape.corner.large.end** (Large end rounding)
  - rounded_corners 0dp topRight=16dp bottomRight=16dp
- **md.sys.shape.corner.large.start** (Large start rounding)
  - rounded_corners 0dp topLeft=16dp bottomLeft=16dp
- **md.sys.shape.corner.large.top** (Large top rounding)
  - rounded_corners 0dp topLeft=16dp topRight=16dp
- **md.sys.shape.corner.medium** (Medium rounding)
  - rounded_corners 12dp
- **md.sys.shape.corner.none** (No rounding)
  - rounded_corners 0dp
- **md.sys.shape.corner.small** (Small rounding)
  - rounded_corners 8dp

## md.sys.state — State opacities

Opacity values for state layers.

- **md.sys.state.disabled.state-layer-opacity** (Disabled state layer opacity)
  - opacity 0.38
- **md.sys.state.dragged.state-layer-opacity** (Dragged state layer opacity)
  - opacity 0.16
- **md.sys.state.focus.state-layer-opacity** (Focus state layer opacity)
  - opacity 0.1
- **md.sys.state.hover.state-layer-opacity** (Hover state layer opacity)
  - opacity 0.08
- **md.sys.state.pressed.state-layer-opacity** (Pressed state layer opacity)
  - opacity 0.1

