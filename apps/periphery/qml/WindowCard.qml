import Quickshell.Wayland
import QtQuick
import QtQuick.Effects
import qs.Ui

// One window in the periphery: a live thumbnail at the window's aspect.
// Hovering selects it (the close and fullscreen keys then act on it). Click
// focuses it (switching workspace); dragging it into the focus area moves it
// onto the current workspace, onto another workspace group moves it there.
// Its parts are M3 components (interpretation periphery.components); the
// host gives their resolved colours and sizes.
Item {
  id: card

  required property var win
  required property var host

  // The periphery selection: hovered, or reached with the focus keys.
  readonly property bool selected: host.selected === win.address && !dragging
  readonly property bool dragging: host.dragAddress === win.address
  // Its window's own rounding and border width, as Hyprland draws them, so a
  // ghost lands on a card that looks like it.
  readonly property var props: host.propsOf(win.address)
  // 0 at rest, 1 lifted (selected): the shadow fades in with the lift.
  property real liftAmount: 0
  // Sliding to a new place (set by the host).
  property bool moving: false

  // Lifted: the elevated card's hover shadow.
  RectangularShadow {
    anchors.fill: parent
    radius: card.props.rounding
    blur: card.host.liftShadow.blur
    spread: card.host.liftShadow.spread
    offset: Qt.vector2d(card.host.liftShadow.x, card.host.liftShadow.y)
    color: Qt.alpha(card.host.scheme.color.shadow, card.host.liftShadow.opacity)
    opacity: card.liftAmount
    visible: opacity > 0
  }

  // No frame yet: an outlined card with the window class.
  Rectangle {
    anchors.fill: parent
    radius: card.props.rounding
    color: card.host.placeholderColor
    border.color: card.host.placeholderOutline
    border.width: card.host.placeholderOutlineWidth
    visible: !thumb.hasContent

    Text {
      anchors.centerIn: parent
      width: parent.width - card.host.m3.plainTooltip.padding * 2
      textFormat: Text.PlainText
      text: card.win.appClass
      color: card.host.onSurfaceVariant
      font.family: card.host.fontFamily
      font.pixelSize: card.host.typeOf("body-small").size
      font.weight: card.host.typeOf("body-small").weight
      horizontalAlignment: Text.AlignHCenter
      elide: Text.ElideRight
    }
  }

  // Rounded like its window and its border below.
  RoundedClip {
    anchors.fill: parent
    radius: card.props.rounding

    // Covers the card at the frame's own aspect, cropped by the clip: a
    // stale frame of a hidden window (its old size) never letterboxes.
    ScreencopyView {
      id: thumb
      readonly property real aspect: sourceSize.width > 0 && sourceSize.height > 0 ? sourceSize.width / sourceSize.height : parent.width / Math.max(1, parent.height)
      anchors.centerIn: parent
      width: Math.max(parent.width, parent.height * aspect)
      height: Math.max(parent.height, parent.width / aspect)
      captureSource: card.host.opened && card.win.toplevel ? card.win.toplevel.wayland : null
      live: card.host.opened
    }
  }

  // The window's border, as Hyprland would draw it: active when selected.
  // Hyprland moves border colour on the effects fast spring (its `border`
  // leaf); the active border fading in over the inactive one blends the same.
  BorderOverlay {
    borderSpec: card.host.borderAt(card.host.inactiveBorder, card.props.borderSize)
    radius: card.props.rounding
  }
  SpringValue { id: activeFade; spring: card.host.springEffectsFast; target: card.selected ? 1 : 0 }
  BorderOverlay {
    borderSpec: card.host.borderAt(card.host.activeBorder, card.props.borderSize)
    radius: card.props.rounding
    opacity: activeFade.value
    visible: opacity > 0
  }

  // The title: a plain tooltip, the card gap above the card's bottom edge.
  // It fades on the effects fast spring (a small element), like the border.
  SpringValue { id: tooltipFade; spring: card.host.springEffectsFast; target: card.selected ? 1 : 0 }
  Rectangle {
    opacity: tooltipFade.value
    visible: opacity > 0
    anchors.horizontalCenter: parent.horizontalCenter
    anchors.bottom: parent.bottom
    anchors.bottomMargin: card.host.cardGap
    width: Math.min(parent.width - card.host.cardGap * 2, label.implicitWidth + card.host.m3.plainTooltip.padding * 2)
    height: Math.max(card.host.m3.plainTooltip.height, label.implicitHeight)
    radius: card.host.tooltipCorner
    color: card.host.tooltipColor

    Text {
      id: label
      anchors.centerIn: parent
      width: Math.min(implicitWidth, parent.width - card.host.m3.plainTooltip.padding * 2)
      textFormat: Text.PlainText
      text: card.win.title || card.win.appClass
      color: card.host.tooltipText
      font.family: card.host.fontFamily
      font.pixelSize: card.host.tooltipType.size
      font.weight: card.host.tooltipType.weight
      elide: Text.ElideRight
    }
  }

  MouseArea {
    id: mouse
    anchors.fill: parent
    hoverEnabled: true
    cursorShape: card.dragging ? Qt.ClosedHandCursor : Qt.PointingHandCursor

    property point pressAt
    property bool moved: false

    onPressed: function(event) {
      pressAt = Qt.point(event.x, event.y)
      moved = false
    }
    // Pointer input selects the card, also after the focus keys moved the
    // selection away while the pointer stayed here (latest input wins). Only
    // the pointer moving counts: a card that slides under a still pointer,
    // or is still sliding, isn't selected.
    function pointed(x, y) {
      var moved = card.host.pointerMoved(mapToItem(null, x, y))
      if (moved && !card.moving && !card.selected) card.host.select(card.win.address)
    }
    onEntered: {
      card.host.pointerOn(card.win.address)
      pointed(mouseX, mouseY)
    }
    // Pointing away lets go of the card (host.pointerOff); sliding away from
    // under the pointer doesn't.
    onExited: card.host.pointerOff(card.win.address, card.moving)
    onPositionChanged: function(event) {
      if (!pressed) {
        pointed(event.x, event.y)
        return
      }
      var p = mapToItem(null, event.x, event.y)
      if (!moved && Math.abs(event.x - pressAt.x) + Math.abs(event.y - pressAt.y) < 8) return
      if (!moved) {
        moved = true
        card.host.beginDrag(card.win, card.width, card.height, pressAt.x, pressAt.y)
      }
      card.host.updateDrag(p.x, p.y)
    }
    onReleased: function(event) {
      if (moved) {
        var p = mapToItem(null, event.x, event.y)
        card.host.endDrag(p.x, p.y)
      } else {
        card.host.flyTo(card.win.address)
      }
      moved = false
    }
    onCanceled: {
      if (moved) card.host.cancelDrag()
      moved = false
    }
  }
}
