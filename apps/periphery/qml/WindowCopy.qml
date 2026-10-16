pragma ComponentBehavior: Bound

import Quickshell.Wayland
import QtQuick
import "lib/kit.mjs" as Kit

// A window's live pixels, rounded like the window, covering the item at the
// frame's own aspect: a stale frame of a hidden window (its old size) is
// cropped, never letterboxed. Cards, switch ghosts and the dragged card all
// draw their window with it.
RoundedClip {
  id: copy

  // The HyprlandToplevel to capture, or null.
  property var toplevel: null
  property bool live: true
  // ScreencopyView doesn't blend: it overwrites what is under it with the
  // window's own pixels and alpha, so a translucent window wiped what it was
  // drawn over. In its own layer it is drawn with normal blending.
  property bool layered: false
  property real contentOpacity: 1
  readonly property bool hasContent: view.hasContent

  ScreencopyView {
    id: view
    readonly property var size: Kit.coverSize(sourceSize.width, sourceSize.height, copy.width, copy.height) // qmllint disable missing-property
    anchors.centerIn: parent
    width: view.size.w
    height: view.size.h
    captureSource: copy.toplevel ? copy.toplevel.wayland : null
    live: copy.live
    layer.enabled: copy.layered
    opacity: copy.contentOpacity
  }
}
