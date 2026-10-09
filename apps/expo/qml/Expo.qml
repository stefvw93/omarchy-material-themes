pragma ComponentBehavior: Bound

import Quickshell
import Quickshell.Hyprland
import Quickshell.Wayland
import QtQuick
import qs.Commons
import qs.Ui
import "lib/kit.mjs" as Kit
import "lib/meta.mjs" as Meta

// Mission Control style overview: one miniature per occupied workspace with
// live thumbnails of its windows at their real tiled positions. Left/Right
// walk windows in order, Up/Down move spatially, Enter focuses, 1-9 jump to a workspace.
Item {
  id: root

  // Shape and motion, live from ~/.config/omarchy/stef/tokens.json.
  Tokens { id: tokens }

  property var shell: null
  property var manifest: null

  property bool opened: false
  property var groups: []
  property var flat: []
  property int selectedIndex: -1
  property string selectedAddress: ""
  property string layoutSignature: ""

  // Shares the [menu] surface tokens, like the emoji picker, so themes that
  // style the menu also style the overview.
  property color background: Color.menu.background // qmllint disable missing-property
  property color foreground: Color.menu.text // qmllint disable missing-property
  property color border: Color.menu.border // qmllint disable missing-property
  property var borderSpec: Border.surfaceSpec("menu", "border", border, Math.max(1, Style.space(2)))
  // Light theme-tinted wash; the compositor blurs what's behind it
  // (layer rule on omarchy-expo in hypr/looknfeel.lua).
  property color scrim: Qt.rgba(Color.menu.scrim.r, Color.menu.scrim.g, Color.menu.scrim.b, Math.min(Color.menu.scrim.a, 0.3)) // qmllint disable missing-property
  property color selectedText: Color.menu.selectedText // qmllint disable missing-property
  property color accent: Color.accent
  readonly property int cornerRadius: Style.cornerRadius
  property string fontFamily: Style.font.menuFamily // qmllint disable missing-property

  readonly property int outerMargin: Style.space(tokens.value.expo.outerMargin)
  readonly property int tileGap: Style.space(tokens.value.expo.tileGap)
  readonly property int tilePadding: Style.space(tokens.value.expo.tilePadding)
  readonly property int headerHeight: Style.font.title + Style.spacing.md * 2 // qmllint disable missing-property
  readonly property int selectionWidth: Math.max(2, Style.space(3))

  // Motion uses the tokens' Material 3 scheme, the one Hyprland's curves come
  // from: tiles move on spatial_default and fade on effects_default,
  // staggered in reading order. Hyprland's layersIn fade brings in the
  // blurred backdrop.
  readonly property var springSpatial: tokens.springs.spatial_default
  readonly property var springEffects: tokens.springs.effects_default
  readonly property int tileStagger: tokens.value.expo.tileStagger
  readonly property int windowStagger: tokens.value.expo.windowStagger
  readonly property int windowLead: tokens.value.expo.windowLead
  readonly property real tileScaleFrom: tokens.value.expo.tileScaleFrom
  readonly property real windowScaleFrom: tokens.value.expo.windowScaleFrom
  readonly property int riseDistance: Style.space(tokens.value.expo.rise)
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
    root.rebuild()
    clockAnimation.restart()
    Hyprland.refreshToplevels()
    Hyprland.refreshWorkspaces()
    refreshTimer.restart()
    Qt.callLater(function() { keyCatcher.forceActiveFocus() })
  }

  function close() {
    root.opened = false
    root.layoutSignature = ""
    root.groups = []
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

  function workspaceLabel(ws) {
    if (ws.id < 0) {
      var name = String(ws.name || "").replace(/^special:/, "")
      return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Special"
    }
    return String(ws.name || ws.id)
  }

  function rebuild() {
    if (!root.opened) return
    var byWs = {}
    var toplevels = Hyprland.toplevels.values
    for (var i = 0; i < toplevels.length; i++) {
      var t = toplevels[i]
      var ipc = t.lastIpcObject
      if (!ipc || !ipc.workspace || !ipc.at || !ipc.size) continue
      if (ipc.mapped === false) continue
      var wsId = ipc.workspace.id
      if (!byWs[wsId]) byWs[wsId] = { id: wsId, name: ipc.workspace.name, windows: [] }
      byWs[wsId].windows.push({
        toplevel: t,
        address: normalizeAddress(ipc.address || t.address),
        title: ipc.title || t.title || "",
        appClass: ipc["class"] || "",
        floating: !!ipc.floating,
        rx: ipc.at[0] - root.monX,
        ry: ipc.at[1] - root.monY,
        rw: ipc.size[0],
        rh: ipc.size[1],
      })
    }

    var list = []
    for (var key in byWs) list.push(byWs[key])
    // Regular workspaces in order, special workspaces (scratchpad) last.
    list.sort(function(a, b) {
      if ((a.id < 0) !== (b.id < 0)) return a.id < 0 ? 1 : -1
      return Math.abs(a.id) - Math.abs(b.id)
    })
    for (var g = 0; g < list.length; g++) {
      list[g].label = workspaceLabel(list[g])
      // Reading order within a workspace: tiled left-to-right then
      // top-to-bottom, floating last (drawn on top).
      list[g].windows.sort(Kit.compareReadingOrder) // qmllint disable missing-property
    }

    // Skip unchanged snapshots so delegates (and their live captures) aren't
    // recreated for nothing.
    var signature = JSON.stringify(list.map(function(g) {
      return [g.id, g.windows.map(function(w) { return [w.address, w.rx, w.ry, w.rw, w.rh] })]
    }))
    if (signature === root.layoutSignature) return
    root.layoutSignature = signature
    root.relayout(list)
  }

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

  // Structural window/workspace events only; keyboard layout and title events
  // fire on ordinary key presses and must not disturb the selection.
  readonly property var refreshEvents: [
    "openwindow", "closewindow", "movewindow", "movewindowv2", "changefloatingmode",
    "createworkspace", "createworkspacev2", "destroyworkspace", "destroyworkspacev2",
    "moveworkspace", "moveworkspacev2", "fullscreen", "pin",
  ]

  // Refresh the IPC snapshot and rebuild a moment later so lastIpcObject is
  // current.
  Connections {
    target: Hyprland
    enabled: root.opened
    function onRawEvent(event) {
      if (root.refreshEvents.indexOf(event.name) < 0) return
      if (!refreshTimer.running) {
        Hyprland.refreshToplevels()
        Hyprland.refreshWorkspaces()
        refreshTimer.restart()
      }
    }
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

  Timer {
    id: refreshTimer
    interval: 80
    onTriggered: root.rebuild()
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
      color: root.foreground
      opacity: 0.7
      font.family: root.fontFamily
      font.pixelSize: Style.font.heading // qmllint disable missing-property
    }

    Repeater {
      model: root.groups

      delegate: BorderSurface {
        id: tile
        required property var modelData
        readonly property real localTime: root.clock - modelData.groupIndex * root.tileStagger
        readonly property real spatial: root.spring(localTime, root.springSpatial)
        readonly property real effects: root.spring(localTime, root.springEffects)
        readonly property bool isActive: Hyprland.focusedWorkspace && Hyprland.focusedWorkspace.id === modelData.id
        readonly property bool hasSelection: root.selectedIndex >= 0 && root.flat[root.selectedIndex] && root.flat[root.selectedIndex].groupIndex === modelData.groupIndex

        x: modelData.x
        y: modelData.y + (1 - spatial) * root.riseDistance
        width: modelData.w
        height: modelData.h
        opacity: effects
        scale: root.tileScaleFrom + (1 - root.tileScaleFrom) * spatial
        // Fade the tile as one flattened surface; per-item opacity would let
        // the card, backdrop and thumbnails show through each other mid-fade.
        layer.enabled: effects < 0.999
        radius: root.cornerRadius
        color: root.background
        borderSpec: root.borderSpec

        MouseArea {
          anchors.fill: parent
          cursorShape: Qt.PointingHandCursor
          onClicked: root.activateWorkspace(tile.modelData)
        }

        Row {
          x: root.tilePadding
          height: root.headerHeight
          spacing: Style.spacing.md // qmllint disable missing-property

          Text {
            anchors.verticalCenter: parent.verticalCenter
            textFormat: Text.PlainText
            text: tile.modelData.label
            color: tile.isActive ? root.selectedText : root.foreground
            font.family: root.fontFamily
            font.pixelSize: Style.font.title // qmllint disable missing-property
            font.bold: tile.isActive
          }

          Text {
            anchors.verticalCenter: parent.verticalCenter
            textFormat: Text.PlainText
            text: tile.modelData.windows.length + (tile.modelData.windows.length === 1 ? " window" : " windows")
            color: root.foreground
            opacity: 0.55
            font.family: root.fontFamily
            font.pixelSize: Style.font.bodySmall // qmllint disable missing-property
          }
        }

        Item {
          id: mini
          x: root.tilePadding
          y: root.headerHeight + root.tilePadding
          width: tile.modelData.miniW
          height: tile.modelData.miniH
          clip: true

          // Empty-workspace backdrop: a faint tint that arrives with the
          // windows, so the miniature never flashes as a lighter empty slab.
          Rectangle {
            anchors.fill: parent
            radius: root.cornerRadius
            color: Util.alpha(root.foreground, 0.04)
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

              Rectangle {
                anchors.fill: parent
                radius: root.cornerRadius
                color: root.background
                border.color: root.border
                border.width: 1
                visible: !thumb.hasContent

                Column {
                  anchors.centerIn: parent
                  width: parent.width - Style.spacing.md * 2 // qmllint disable missing-property
                  spacing: Style.spacing.xs // qmllint disable missing-property

                  Text {
                    width: parent.width
                    textFormat: Text.PlainText
                    text: win.modelData.appClass
                    color: root.foreground
                    font.family: root.fontFamily
                    font.pixelSize: Style.font.body // qmllint disable missing-property
                    horizontalAlignment: Text.AlignHCenter
                    elide: Text.ElideRight
                  }

                  Text {
                    width: parent.width
                    textFormat: Text.PlainText
                    text: win.modelData.title
                    color: root.foreground
                    opacity: 0.6
                    font.family: root.fontFamily
                    font.pixelSize: Style.font.caption // qmllint disable missing-property
                    horizontalAlignment: Text.AlignHCenter
                    elide: Text.ElideRight
                  }
                }
              }

              ScreencopyView {
                id: thumb
                anchors.fill: parent
                captureSource: root.opened && win.modelData.toplevel ? win.modelData.toplevel.wayland : null
                live: root.opened
              }

              Rectangle {
                anchors.fill: parent
                radius: root.cornerRadius
                color: "transparent"
                border.color: root.accent
                border.width: root.selectionWidth
                visible: win.selected
              }

              Rectangle {
                visible: win.selected
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.bottom: parent.bottom
                anchors.bottomMargin: Style.spacing.md // qmllint disable missing-property
                width: Math.min(parent.width - Style.spacing.md * 2, label.implicitWidth + Style.spacing.md * 2) // qmllint disable missing-property
                height: label.implicitHeight + Style.spacing.xs * 2 // qmllint disable missing-property
                radius: root.cornerRadius
                color: root.background

                Text {
                  id: label
                  anchors.centerIn: parent
                  width: Math.min(implicitWidth, parent.width - Style.spacing.md * 2) // qmllint disable missing-property
                  textFormat: Text.PlainText
                  text: win.modelData.title || win.modelData.appClass
                  color: root.selectedText
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption // qmllint disable missing-property
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

        Rectangle {
          anchors.fill: parent
          radius: root.cornerRadius
          color: "transparent"
          border.color: root.accent
          border.width: Math.max(1, Style.space(2))
          visible: tile.isActive
          opacity: tile.hasSelection ? 1 : 0.6
        }
      }
    }
  }
}
