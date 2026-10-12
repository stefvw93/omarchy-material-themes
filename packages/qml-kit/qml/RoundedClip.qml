pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Effects

// Clips its children to a rounded rectangle: `clip` only cuts square, and a
// window capture (ScreencopyView) ignores the radius of anything around it,
// so its corners would show past a rounded border.
//   RoundedClip { anchors.fill: parent; radius: 12; ScreencopyView { anchors.fill: parent } }
// Vendored by @stef/plugin-kit; edit packages/qml-kit.
Item {
  id: rounded

  property real radius: 0
  default property alias content: inner.data
  readonly property Item maskItem: mask

  Item {
    id: inner
    anchors.fill: parent
    layer.enabled: rounded.radius > 0
    layer.effect: MultiEffect {
      maskEnabled: true
      maskSource: rounded.maskItem
      maskThresholdMin: 0.5
      maskSpreadAtMin: 1.0
    }
  }

  Item {
    id: mask
    anchors.fill: parent
    visible: false
    layer.enabled: true
    Rectangle { anchors.fill: parent; radius: rounded.radius; color: "black" }
  }
}
