pragma ComponentBehavior: Bound

import Quickshell
import Quickshell.Hyprland
import Quickshell.Wayland
import QtQuick
import qs.Commons
import "lib/core.mjs" as Core
import "lib/kit.mjs" as Kit
import "lib/meta.mjs" as Meta

// Mission Control style overview: one miniature per occupied workspace with
// live thumbnails of its windows at their real tiled positions. Left/Right
// walk windows in order, Up/Down move spatially, Enter focuses, 1-9 jump to a workspace.
Item {
  id: root

  // Shape, spacing, type and motion, live from ~/.config/omarchy/stef/tokens.json
  // (tokens.m3 holds the resolved Material 3 values); type follows the
  // Omarchy text size.
  Tokens {
    id: tokens
    textBase: Style.fontBaseSize // qmllint disable missing-property
  }
  // The theme's M3 colour roles (omaterial.json), or an approximation from
  // Omarchy's colours under other themes.
  Scheme {
    id: scheme
    omarchy: ({ background: Color.background, foreground: Color.foreground, accent: Color.accent, muted: Color.muted, urgent: Color.urgent }) // qmllint disable missing-property
  }
  readonly property var m3: tokens.m3
  // A component token's colour, through the scheme.
  function compColor(name) { return scheme.color[root.m3.comp[name].role] }
  // An M3 type style on a Text: size, line height, weight, tracking.
  function typeOf(style) { return root.m3.type[style] }

  // The Effect core (src/core.ts) tracks which windows exist and hands
  // changed snapshots to relayout(); this file lays them out and draws them.
  HostTimers { id: timers }
  property var core: null
  readonly property var coreHost: ({
    startTimer: timers.start,
    stopTimer: timers.stop,
    log: function(message) { console.warn("stef.expo core: " + message) },
    refresh: function() {
      Hyprland.refreshToplevels()
      Hyprland.refreshWorkspaces()
    },
    toplevels: function() {
      var out = []
      var toplevels = Hyprland.toplevels.values
      for (var i = 0; i < toplevels.length; i++) {
        var t = toplevels[i]
        out.push({ ipc: t.lastIpcObject, address: t.address, title: t.title, ref: t })
      }
      return out
    },
    relayout: function(groups) { root.relayout(groups) },
  })
  Component.onCompleted: root.core = Core.start(root.coreHost) // qmllint disable missing-property
  Component.onDestruction: if (root.core) root.core.dispose()

  property var shell: null
  property var manifest: null

  property bool opened: false
  property var groups: []
  property var flat: []
  property int selectedIndex: -1
  property string selectedAddress: ""

  // Which M3 component each part is: interpretation expo.components.
  // The scrim; the compositor blurs what's behind it (layer rule on
  // omarchy-expo in hypr/looknfeel.lua).
  readonly property color scrim: Qt.alpha(scheme.color.scrim, root.m3.scrimOpacity)
  readonly property color onSurface: scheme.color["on-surface"]
  readonly property color onSurfaceVariant: scheme.color["on-surface-variant"]
  readonly property color miniBackdrop: scheme.color["surface-container-high"]
  // Workspace tiles: filled cards.
  readonly property color tileColor: root.compColor("md.comp.filled-card.container.color")
  readonly property int tileCorner: root.m3.comp["md.comp.filled-card.container.shape"]
  readonly property color hoverLayer: Qt.alpha(root.compColor("md.comp.filled-card.hover.state-layer.color"), root.m3.comp["md.comp.filled-card.hover.state-layer.opacity"])
  // The focused workspace: a primary navigation tab's active state.
  readonly property color activeLabel: root.compColor("md.comp.primary-navigation-tab.with-label-text.active.label-text.color")
  readonly property color inactiveLabel: root.compColor("md.comp.primary-navigation-tab.with-label-text.inactive.label-text.color")
  readonly property color activeIndicator: root.compColor("md.comp.primary-navigation-tab.active-indicator.color")
  readonly property int activeIndicatorHeight: root.m3.comp["md.comp.primary-navigation-tab.active-indicator.height"]
  // The selected window: the card's focus indicator.
  readonly property color focusColor: root.compColor("md.comp.filled-card.focus.indicator.color")
  readonly property int focusThickness: root.m3.comp["md.comp.filled-card.focus.indicator.thickness"]
  readonly property int focusOffset: root.m3.comp["md.comp.filled-card.focus.indicator.outline.offset"]
  // A window without a capture: an outlined card.
  readonly property color placeholderColor: root.compColor("md.comp.outlined-card.container.color")
  readonly property color placeholderOutline: root.compColor("md.comp.outlined-card.outline.color")
  readonly property int placeholderOutlineWidth: root.m3.comp["md.comp.outlined-card.outline.width"]
  // The selected window's title: a plain tooltip.
  readonly property color tooltipColor: root.compColor("md.comp.plain-tooltip.container.color")
  readonly property color tooltipText: root.compColor("md.comp.plain-tooltip.supporting-text.color")
  readonly property int tooltipCorner: root.m3.comp["md.comp.plain-tooltip.container.shape"]
  readonly property var tooltipType: root.m3.comp["md.comp.plain-tooltip.supporting-text.type"]
  property string fontFamily: Style.font.menuFamily // qmllint disable missing-property

  readonly property int outerMargin: root.m3.expo.outerMargin
  readonly property int tileGap: root.m3.expo.tileGap
  readonly property int tilePadding: root.m3.expo.tilePadding
  // The label line, then the tile padding to the miniature.
  readonly property int headerHeight: root.typeOf("title-medium").lineHeight + root.tilePadding

  // Motion uses the tokens' Material 3 scheme, the one Hyprland's curves come
  // from: tiles move on spatial_default and fade on effects_default,
  // staggered in reading order. Hyprland's layersIn fade brings in the
  // blurred backdrop.
  readonly property var springSpatial: root.m3.springs.spatial_default
  readonly property var springEffects: root.m3.springs.effects_default
  readonly property int tileStagger: root.m3.expo.tileStagger
  readonly property int windowStagger: root.m3.expo.windowStagger
  readonly property int windowLead: root.m3.expo.windowLead
  readonly property real tileScaleFrom: root.m3.expo.tileScaleFrom
  readonly property real windowScaleFrom: root.m3.expo.windowScaleFrom
  readonly property int riseDistance: root.m3.expo.rise
  // Milliseconds since open; every delegate derives its progress from it.
  property real clock: 0

  // Damped spring step response (mass 1) at t ms, as Hyprland evaluates the
  // theme's curves: 0 before start, settling on 1.
  function spring(ms, token) { return Kit.springStep(ms, token) } // qmllint disable missing-property

  property var targetScreen: null
  property real monX: 0
  property real monY: 0
  property real monW: 1920
  property real monH: 1080

  function open(payloadJson) {
    var mon = Hyprland.focusedMonitor
    if (mon) {
      var geometry = Kit.monitorGeometry(mon, Quickshell.screens) // qmllint disable missing-property
      root.monX = geometry.x
      root.monY = geometry.y
      root.monW = geometry.w
      root.monH = geometry.h
      root.targetScreen = geometry.screen
    }
    var active = Hyprland.activeToplevel
    root.selectedAddress = active ? normalizeAddress(active.address) : ""
    root.clock = 0
    root.opened = true
    clockAnimation.restart()
    root.core.dispatch({ _tag: "Open", monX: root.monX, monY: root.monY })
    Qt.callLater(function() { keyCatcher.forceActiveFocus() })
  }

  function close() {
    root.opened = false
    root.groups = []
    if (root.core) root.core.dispatch({ _tag: "Close" })
    root.flat = []
    root.selectedIndex = -1
  }

  function dismiss() {
    root.close()
    if (root.shell && typeof root.shell.hide === "function")
      root.shell.hide((root.manifest && root.manifest.id) || Meta.pluginId) // qmllint disable missing-property
  }

  function toggle() {
    if (root.opened) root.dismiss()
    else root.open("{}")
  }

  function normalizeAddress(address) { return Kit.normalizeAddress(address) } // qmllint disable missing-property

  // Lays tiles out in the grid that makes them as large as possible, and
  // records each window's center in overview coordinates for arrow-key
  // navigation.
  function relayout(source) {
    var list = source || root.groups
    var n = list.length
    var availW = Math.max(1, panel.width - root.outerMargin * 2)
    var availH = Math.max(1, panel.height - root.outerMargin * 2)
    var aspect = root.monW / root.monH
    var chrome = root.tilePadding * 2

    var best = { cols: 1, w: 0 }
    for (var cols = 1; cols <= Math.max(1, n); cols++) {
      var rows = Math.ceil(n / cols)
      var byWidth = (availW - (cols - 1) * root.tileGap) / cols - chrome
      var byHeight = ((availH - (rows - 1) * root.tileGap) / rows - root.headerHeight - chrome) * aspect
      var w = Math.min(byWidth, byHeight, root.monW * 0.45)
      if (w > best.w) best = { cols: cols, w: w }
    }

    var miniW = Math.max(40, best.w)
    var miniH = miniW / aspect
    var tileW = miniW + chrome
    var tileH = miniH + chrome + root.headerHeight
    var cols = best.cols
    var rowCount = Math.ceil(n / cols)
    var gridH = rowCount * tileH + (rowCount - 1) * root.tileGap
    var top = (panel.height - gridH) / 2
    var scale = miniW / root.monW

    var flat = []
    for (var i = 0; i < n; i++) {
      var row = Math.floor(i / cols)
      var inRow = Math.min(cols, n - row * cols)
      var rowW = inRow * tileW + (inRow - 1) * root.tileGap
      var g = list[i]
      g.groupIndex = i
      g.x =(panel.width - rowW) / 2 + (i - row * cols) * (tileW + root.tileGap)
      g.y = top + row * (tileH + root.tileGap)
      g.w = tileW
      g.h = tileH
      g.miniW = miniW
      g.miniH = miniH
      g.scale = scale
      for (var j = 0; j < g.windows.length; j++) {
        var win = g.windows[j]
        win.x = Math.max(0, win.rx * scale)
        win.y = Math.max(0, win.ry * scale)
        win.w = Math.max(8, Math.min(win.rw * scale, miniW - win.x))
        win.h = Math.max(8, Math.min(win.rh * scale, miniH - win.y))
        win.cx = g.x + root.tilePadding + win.x + win.w / 2
        win.cy = g.y + root.headerHeight + root.tilePadding + win.y + win.h / 2
        win.flatIndex = flat.length
        win.groupIndex = i
        flat.push(win)
      }
    }

    root.flat = flat
    root.groups = list.slice()

    var idx = -1
    for (var k = 0; k < flat.length; k++)
      if (flat[k].address === root.selectedAddress) idx = k
    if (idx < 0 && flat.length > 0) idx = 0
    root.selectedIndex = idx
  }

  function select(index) {
    if (index < 0 || index >= root.flat.length) return
    root.selectedIndex = index
    root.selectedAddress = root.flat[index].address
  }

  // Left/Right walk the windows in order and flow across workspaces and
  // rows, wrapping at the ends.
  function step(delta) {
    var n = root.flat.length
    if (n === 0) return
    if (root.selectedIndex < 0) { root.select(delta > 0 ? 0 : n - 1); return }
    root.select((root.selectedIndex + delta + n) % n)
  }

  // Up/Down pick the nearest window in that direction, across tiles.
  function move(dx, dy) {
    if (root.flat.length === 0) return
    if (root.selectedIndex < 0) { root.select(0); return }
    var cur = root.flat[root.selectedIndex]
    var bestIndex = -1
    var bestScore = Infinity
    for (var i = 0; i < root.flat.length; i++) {
      if (i === root.selectedIndex) continue
      var vx = root.flat[i].cx - cur.cx
      var vy = root.flat[i].cy - cur.cy
      var primary = dx !== 0 ? vx * dx : vy * dy
      if (primary <= 1) continue
      var secondary = dx !== 0 ? Math.abs(vy) : Math.abs(vx)
      var score = primary + secondary * 2
      if (score < bestScore) { bestScore = score; bestIndex = i }
    }
    if (bestIndex >= 0) root.select(bestIndex)
  }

  function activateWindow(index) {
    if (index < 0 || index >= root.flat.length) return
    var address = root.flat[index].address
    root.dismiss()
    Hyprland.dispatch('hl.dsp.focus({ window = "address:' + address + '" })')
  }

  function activateWorkspace(group) {
    if (!group) return
    root.dismiss()
    if (group.id < 0)
      Hyprland.dispatch('hl.dsp.workspace.toggle_special("' + String(group.name).replace(/^special:/, "") + '")')
    else
      Hyprland.dispatch('hl.dsp.focus({ workspace = "' + group.id + '" })')
  }

  // Hyprland events go to the core, which picks the structural ones.
  Connections {
    target: Hyprland
    enabled: root.opened
    function onRawEvent(event) { root.core.dispatch({ _tag: "RawEvent", name: event.name }) }
  }

  // Long enough for the last tile and its windows to settle; delegates
  // created later (refreshes while open) read a settled clock and appear
  // without animating.
  NumberAnimation {
    id: clockAnimation
    target: root
    property: "clock"
    from: 0
    to: 3000
    duration: 3000
  }

  PanelWindow { // qmllint disable uncreatable-type
    id: panel
    visible: root.opened
    screen: root.targetScreen
    anchors { top: true; bottom: true; left: true; right: true }
    color: "transparent"
    WlrLayershell.namespace: "omarchy-expo"
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.keyboardFocus: WlrKeyboardFocus.Exclusive
    exclusionMode: ExclusionMode.Ignore

    onWidthChanged: root.relayout()
    onHeightChanged: root.relayout()

    Rectangle {
      anchors.fill: parent
      color: root.scrim
    }

    MouseArea {
      anchors.fill: parent
      onClicked: root.dismiss()
    }

    Item {
      id: keyCatcher
      anchors.fill: parent
      focus: true

      Keys.priority: Keys.BeforeItem
      Keys.onPressed: function(event) {
        if (event.key === Qt.Key_Escape) {
          root.dismiss()
        } else if (event.key === Qt.Key_Left) {
          root.step(-1)
        } else if (event.key === Qt.Key_Right) {
          root.step(1)
        } else if (event.key === Qt.Key_Up) {
          root.move(0, -1)
        } else if (event.key === Qt.Key_Down) {
          root.move(0, 1)
        } else if (event.key === Qt.Key_Return || event.key === Qt.Key_Enter || event.key === Qt.Key_Space) {
          root.activateWindow(root.selectedIndex)
        } else if (event.key >= Qt.Key_1 && event.key <= Qt.Key_9) {
          var target = event.key - Qt.Key_0
          for (var i = 0; i < root.groups.length; i++)
            if (root.groups[i].id === target) { root.activateWorkspace(root.groups[i]); break }
        } else {
          return
        }
        event.accepted = true
      }
    }

    Text {
      anchors.centerIn: parent
      visible: root.opened && root.groups.length === 0
      textFormat: Text.PlainText
      text: "No open windows"
      color: root.onSurfaceVariant
      font.family: root.fontFamily
      font.pixelSize: root.typeOf("title-large").size
      font.weight: root.typeOf("title-large").weight
    }

    Repeater {
      model: root.groups

      delegate: Rectangle {
        id: tile
        required property var modelData
        readonly property real localTime: root.clock - modelData.groupIndex * root.tileStagger
        readonly property real spatial: root.spring(localTime, root.springSpatial)
        readonly property real effects: root.spring(localTime, root.springEffects)
        readonly property bool isActive: Hyprland.focusedWorkspace && Hyprland.focusedWorkspace.id === modelData.id

        x: modelData.x
        y: modelData.y + (1 - spatial) * root.riseDistance
        width: modelData.w
        height: modelData.h
        opacity: effects
        scale: root.tileScaleFrom + (1 - root.tileScaleFrom) * spatial
        // Fade the tile as one flattened surface; per-item opacity would let
        // the card, backdrop and thumbnails show through each other mid-fade.
        layer.enabled: effects < 0.999
        radius: root.tileCorner
        color: root.tileColor

        // The card's hover state layer.
        HoverHandler { id: tileHover }
        Rectangle {
          anchors.fill: parent
          radius: tile.radius
          color: root.hoverLayer
          visible: tileHover.hovered
        }

        MouseArea {
          anchors.fill: parent
          cursorShape: Qt.PointingHandCursor
          onClicked: root.activateWorkspace(tile.modelData)
        }

        Row {
          x: root.tilePadding
          y: root.tilePadding
          height: root.typeOf("title-medium").lineHeight
          spacing: root.tilePadding

          Text {
            id: workspaceLabel
            anchors.verticalCenter: parent.verticalCenter
            textFormat: Text.PlainText
            text: tile.modelData.label
            color: tile.isActive ? root.activeLabel : root.inactiveLabel
            font.family: root.fontFamily
            font.pixelSize: root.typeOf("title-medium").size
            font.weight: root.typeOf("title-medium").weight

            // The active tab's indicator, under the label.
            Rectangle {
              visible: tile.isActive
              anchors.top: parent.bottom
              width: parent.width
              height: root.activeIndicatorHeight
              color: root.activeIndicator
            }
          }

          Text {
            anchors.verticalCenter: parent.verticalCenter
            textFormat: Text.PlainText
            text: tile.modelData.windows.length + (tile.modelData.windows.length === 1 ? " window" : " windows")
            color: root.onSurfaceVariant
            font.family: root.fontFamily
            font.pixelSize: root.typeOf("body-small").size
            font.weight: root.typeOf("body-small").weight
          }
        }

        Item {
          id: mini
          x: root.tilePadding
          y: root.headerHeight + root.tilePadding
          width: tile.modelData.miniW
          height: tile.modelData.miniH
          // Thumbnails are the windows at this scale, corners included.
          readonly property real thumbCorner: root.m3.windowCorner * tile.modelData.scale

          // The miniature's backdrop arrives with the windows, so it never
          // flashes as an empty slab.
          Rectangle {
            anchors.fill: parent
            radius: mini.thumbCorner
            color: root.miniBackdrop
            opacity: root.spring(tile.localTime - root.windowLead, root.springEffects)
          }

          Repeater {
            model: tile.modelData.windows

            delegate: Item {
              id: win
              required property var modelData
              required property int index
              readonly property bool selected: root.selectedIndex === modelData.flatIndex
              readonly property real localTime: tile.localTime - root.windowLead - index * root.windowStagger
              readonly property real spatial: root.spring(localTime, root.springSpatial)

              x: modelData.x
              y: modelData.y
              width: modelData.w
              height: modelData.h
              z: selected ? 2 : (modelData.floating ? 1 : 0)
              opacity: root.spring(localTime, root.springEffects)
              scale: root.windowScaleFrom + (1 - root.windowScaleFrom) * spatial

              // No capture yet: an outlined card with the class and title.
              Rectangle {
                anchors.fill: parent
                radius: mini.thumbCorner
                color: root.placeholderColor
                border.color: root.placeholderOutline
                border.width: root.placeholderOutlineWidth
                visible: !thumb.hasContent

                Column {
                  anchors.centerIn: parent
                  width: parent.width - root.tilePadding * 2

                  Text {
                    width: parent.width
                    textFormat: Text.PlainText
                    text: win.modelData.appClass
                    color: root.onSurface
                    font.family: root.fontFamily
                    font.pixelSize: root.typeOf("body-medium").size
                    font.weight: root.typeOf("body-medium").weight
                    horizontalAlignment: Text.AlignHCenter
                    elide: Text.ElideRight
                  }

                  Text {
                    width: parent.width
                    textFormat: Text.PlainText
                    text: win.modelData.title
                    color: root.onSurfaceVariant
                    font.family: root.fontFamily
                    font.pixelSize: root.typeOf("body-small").size
                    font.weight: root.typeOf("body-small").weight
                    horizontalAlignment: Text.AlignHCenter
                    elide: Text.ElideRight
                  }
                }
              }

              // Rounded like its window.
              RoundedClip {
                anchors.fill: parent
                radius: mini.thumbCorner

                ScreencopyView {
                  id: thumb
                  anchors.fill: parent
                  captureSource: root.opened && win.modelData.toplevel ? win.modelData.toplevel.wayland : null
                  live: root.opened
                }
              }

              // The focus indicator, outside the window by its outer offset.
              Rectangle {
                visible: win.selected
                anchors.fill: parent
                anchors.margins: -(root.focusOffset + root.focusThickness)
                radius: mini.thumbCorner + root.focusOffset + root.focusThickness
                color: "transparent"
                border.color: root.focusColor
                border.width: root.focusThickness
              }

              // The title: a plain tooltip, fading on the effects fast spring
              // (a small element).
              SpringValue { id: tooltipFade; spring: root.m3.springs.effects_fast; target: win.selected ? 1 : 0 }
              Rectangle {
                opacity: tooltipFade.value
                visible: opacity > 0
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.bottom: parent.bottom
                anchors.bottomMargin: root.tilePadding
                width: Math.min(parent.width - root.tilePadding * 2, label.implicitWidth + root.m3.plainTooltip.padding * 2)
                height: Math.max(root.m3.plainTooltip.height, label.implicitHeight)
                radius: root.tooltipCorner
                color: root.tooltipColor

                Text {
                  id: label
                  anchors.centerIn: parent
                  width: Math.min(implicitWidth, parent.width - root.m3.plainTooltip.padding * 2)
                  textFormat: Text.PlainText
                  text: win.modelData.title || win.modelData.appClass
                  color: root.tooltipText
                  font.family: root.fontFamily
                  font.pixelSize: root.tooltipType.size
                  font.weight: root.tooltipType.weight
                  elide: Text.ElideRight
                }
              }

              MouseArea {
                anchors.fill: parent
                hoverEnabled: true
                cursorShape: Qt.PointingHandCursor
                // Only real pointer movement selects; a delegate appearing under
                // a resting cursor must not steal the keyboard selection.
                onPositionChanged: root.select(win.modelData.flatIndex)
                onClicked: root.activateWindow(win.modelData.flatIndex)
              }
            }
          }
        }

      }
    }
  }
}
