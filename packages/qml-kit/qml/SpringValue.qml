import QtQuick
import "lib/kit.mjs" as Kit

// A number that follows `target` on a Material 3 spring: the exact mass-1
// damped spring (Kit.springAdvance), stepped once per frame, so it moves as
// Hyprland and Studio do and keeps its velocity when the target changes.
//   SpringValue { id: x; spring: tokens.springs.spatial_default; target: card.x }
//   ... x: x.value
// Vendored by @stef/plugin-kit; edit packages/qml-kit.
QtObject {
  id: s

  // { stiffness, ratio } from tokens.springs.
  property var spring: ({ stiffness: 700, ratio: 0.9 })
  property real target: 0
  property real value: 0
  property real velocity: 0
  // Settled once within this of the target, moving slower than it per frame.
  property real epsilon: 0.001
  // False: the value follows the target at once (like a disabled Behavior).
  property bool animated: true
  readonly property bool running: frames.running

  // Puts the value at `v` with no motion; the target (often a binding) is
  // left alone, so a value away from it moves back on the next change.
  function jump(v) {
    frames.stop()
    s.velocity = 0
    s.value = v
  }

  // Not assigned here: that would replace a `target` binding for good.
  onTargetChanged: {
    if (!s.animated) s.jump(s.target)
    else if (s.value !== s.target) frames.start()
  }
  // Starts on its target: a binding's first value doesn't animate.
  Component.onCompleted: s.value = s.target

  property FrameAnimation frames: FrameAnimation {
    onTriggered: {
      var next = Kit.springAdvance(s.value, s.velocity, s.target, frameTime * 1000, s.spring) // qmllint disable missing-property
      if (Math.abs(next.x - s.target) < s.epsilon && Math.abs(next.v) * frameTime < s.epsilon) {
        // Land first, so `running` turns false on the final value.
        s.velocity = 0
        s.value = s.target
        stop()
      } else {
        s.velocity = next.v
        s.value = next.x
      }
    }
  }
}
