import QtQuick

// A rect ({ x, y, w, h }) that follows `target` on one Material 3 spring:
// four SpringValues, one per side of the geometry.
//   SpringRect { id: place; spring: tokens.springs.spatial_default; target: card.rest }
//   ... x: place.x; width: place.w
// Vendored by @stef/plugin-kit; edit packages/qml-kit.
QtObject {
  id: r

  property var target: null
  property var spring: ({ stiffness: 700, ratio: 0.9 })
  property real epsilon: 0.25
  // False: the rect follows the target at once (see SpringValue).
  property bool animated: true
  readonly property real x: sx.value
  readonly property real y: sy.value
  readonly property real w: sw.value
  readonly property real h: sh.value
  readonly property bool running: sx.running || sy.running || sw.running || sh.running

  property SpringValue sx: SpringValue { spring: r.spring; epsilon: r.epsilon; animated: r.animated; target: r.target ? r.target.x : 0 }
  property SpringValue sy: SpringValue { spring: r.spring; epsilon: r.epsilon; animated: r.animated; target: r.target ? r.target.y : 0 }
  property SpringValue sw: SpringValue { spring: r.spring; epsilon: r.epsilon; animated: r.animated; target: r.target ? r.target.w : 0 }
  property SpringValue sh: SpringValue { spring: r.spring; epsilon: r.epsilon; animated: r.animated; target: r.target ? r.target.h : 0 }
}
