pragma ComponentBehavior: Bound

import QtQuick
import qs.Ui

// A window's border as Hyprland draws it: the inactive border, with the
// active one fading over it on the effects fast spring (Hyprland's `border`
// leaf), so the two blend the way Hyprland's do.
Item {
  id: border

  // The plugin root: its theme borders and springs.
  required property var host
  property int borderWidth: 1
  property real radius: 0
  property bool active: false
  // False: the colour changes at once.
  property bool animated: true

  anchors.fill: parent

  BorderOverlay {
    borderSpec: border.host.borderAt(border.host.inactiveBorder, border.borderWidth)
    radius: border.radius
  }
  SpringValue { id: fade; spring: border.host.springEffectsFast; animated: border.animated; target: border.active ? 1 : 0 }
  BorderOverlay {
    borderSpec: border.host.borderAt(border.host.activeBorder, border.borderWidth)
    radius: border.radius
    opacity: fade.value
    visible: opacity > 0
  }
}
