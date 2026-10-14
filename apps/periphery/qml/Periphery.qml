pragma ComponentBehavior: Bound

import Quickshell
import Quickshell.Hyprland
import Quickshell.Io
import Quickshell.Wayland
import QtQuick
import QtQuick.Effects
import qs.Commons
import qs.Ui
// Lines marked `qmllint disable missing-property` read the untyped theme
// singletons (Color, Style) or the lib/*.mjs bundles, which qmllint can't see
// into; `uncreatable-type` is Quickshell's PanelWindow, created as intended.
import "lib/hyprland.mjs" as Hypr
import "lib/kit.mjs" as Kit
import "lib/meta.mjs" as Meta
import "lib/layout.mjs" as Layout
import "lib/selection.mjs" as Selection
import "lib/flight.mjs" as Flight

// Periphery exposé, after Scott Jenson's widescreen prototype: tiling and the
// bar are squeezed into a centred focus area (5:4 of the monitor height by
// default), and the windows of the other occupied workspaces sit exploded in
// the side bands, grouped per workspace and kept near their real relative
// positions. Lower-numbered workspaces go left, higher go right. Click a
// window to go to it; drag it into the focus area to pull it onto the current
// workspace, or onto another group to send it there. SUPER-dragging a real
// window onto a band sends it away too (see dropWindow and the release bind
// in hypr/bindings.lua).
//
// A workspace rule (hypr.lua, periphery_open) gives the monitor's regular
// workspaces the bands as side gaps, so they tile in the centre; special
// workspaces (the scratchpad) and the bar keep the full width. Cards are drawn on one fullscreen Bottom-layer surface (below
// windows, above the wallpaper) so they can slide between sides; a dragged
// card is drawn on an Overlay surface so it stays above the focus windows.
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
    id: themeScheme
    omarchy: ({ background: Color.background, foreground: Color.foreground, accent: Color.accent, muted: Color.muted, urgent: Color.urgent }) // qmllint disable missing-property
  }
  readonly property var m3: tokens.m3
  readonly property var scheme: themeScheme
  // A component token's colour, through the scheme.
  function compColor(name) { return root.scheme.color[root.m3.comp[name].role] }
  // An M3 type style: size, line height, weight, tracking.
  function typeOf(style) { return root.m3.type[style] }

  property var shell: null
  property var manifest: null

  property bool opened: false
  // Focus area width as a multiple of the monitor height; override per
  // invocation with a payload like '{"ratio": 1.333}'.
  property real ratio: 1.25

  // Window address -> { address, toplevel, title, appClass, wsId, x, y, w, h }.
  property var winData: ({})
  // Workspace groups: [{ id, label, x, y, w, h }], also the drop targets.
  property var headers: []
  property string layoutSignature: ""

  // Drag state; dragAddress is empty when nothing is being dragged.
  property string dragAddress: ""
  property var dragWin: null
  property real dragX: 0
  property real dragY: 0
  property real dragW: 0
  property real dragH: 0
  property real grabX: 0
  property real grabY: 0
  readonly property bool dragOverFocus: dragAddress !== "" && dragX > sideW && dragX < monW - sideW
  // Group under the dragged card, or null.
  readonly property var dragTarget: dragAddress !== "" && !dragOverFocus ? groupAt(dragX, dragY) : null

  // Window address -> { address, toplevel, fullscreen, x, y, w, h }: the
  // windows of the current workspace, monitor-local. Incoming ghosts fly here.
  property var focusRects: ({})
  // Address -> live card or ghost item, so a switch starts each flight from
  // where the window is drawn right now, mid-slide or not.
  property var cardItems: ({})
  property var ghostItems: ({})
  // Workspace switch: ghosts fly between the focus area and the bands while
  // a wallpaper backdrop hides the real, already switched, focus windows.
  property bool transitioning: false
  property double switchStarted: 0
  property int landedTicks: 0
  // A flight is running (flight), or set up and waiting for Hyprland to
  // switch (flightPending); dispatchedAt is when its switch went out (0
  // before), so a switch that never comes ends it (switchWaitMs).
  property bool flight: false
  property bool flightPending: false
  property double dispatchedAt: 0
  // The window a flight goes to ("" for a routed switch), and the active
  // window at each end: ghosts wear its border and opacity at the tile.
  property string flightTarget: ""
  property string activeBefore: ""
  property string activeAfter: ""
  // Tab groups: address -> the addresses of every tab in its group (Hyprland's
  // `grouped`), and the shown tabs, which only the hook knows (`tabs`).
  property var tabGroups: ({})
  property var shownTabs: Hypr.parseTabs("") // qmllint disable missing-property
  // Address -> { opacity, opacityInactive, borderSize, rounding }: what a
  // ghost copies from its window (hyprctl getprop, read once per window).
  property var windowProps: ({})
  // The ghosts' blurred wallpaper, from Hyprland's decoration:blur
  // (interpretation periphery.ghost-blur).
  property var blurFx: Hypr.ghostBlur({}) // qmllint disable missing-property
  // Address -> true while a ghost flies for that window; its card waits.
  property var ghosted: ({})
  // Resolved wallpaper file for the backdrop.
  property string wallpaper: ""
  // Hyprland's own workspace slide is off while the mode is on; this holds
  // the Lua that turns it back on.
  property bool hyprSlideOff: false
  // While the mode is on, Hyprland animates the switches that don't fly (a
  // bar click, a script: nothing went through the hook first) itself, with
  // the theme's curve and speed but this style: a short slide stays mostly
  // inside the focus area (a full slide would cross the bands, as windows
  // are drawn above them).
  readonly property string workspaceStyle: "slidefade 10%"
  // How far arriving and leaving cards travel, along with the focus area
  // (src/hyprland/specs.md).
  readonly property var cardTravel: Hypr.cardTravel(workspaceStyle, monW, monH) // qmllint disable missing-property
  readonly property bool cardSlideVertical: cardTravel.vertical
  readonly property real cardSlide: cardTravel.distance
  // The workspace in the focus area, and which way the last switch went:
  // 1 to a higher workspace (Hyprland slides the content left or up), -1 to
  // a lower one.
  property int shownWorkspace: -1
  property int switchDir: 0
  // The hl.animation call for that, built from the theme's animation.
  property string hyprModeLua: 'hl.animation({ leaf = "workspaces", enabled = true, speed = 3, bezier = "default", style = "' + workspaceStyle + '" })'
  readonly property string hyprOffLua: Hypr.workspacesOffLua
  property string hyprSlideRestore: ""
  // Address -> true for windows we turned the shadow off for, during a
  // flight: the floating windows of the other workspaces (tiled windows rest
  // at level 0), whose shadows would show past the backdrop ahead of their
  // ghosts (they are hidden until the switch, so they lose nothing).
  property var shadowless: ({})
  // The periphery selection: the card that has the focus instead of a focus
  // area window, set by hovering a card or by the focus keys moving past the
  // focus area's edge (latest input wins). hypr.lua points the close and
  // fullscreen keys at it and greys the active window's border.
  property string selected: ""
  // The window that was active when the card got selected.
  property string selectedOver: ""
  // The pile of the selected card, fanned out so each tab can be reached; it
  // closes when the selection leaves the pile.
  readonly property string openPile: root.selected && root.winData[root.selected] ? root.winData[root.selected].pile : ""
  // A card's rect as drawn: its fan rect while its pile is open.
  function drawnRect(card) { return card.pile !== "" && card.pile === root.openPile && card.fan ? card.fan : card }
  // A card's tilt at rest, unselected: its outer edge nearer, so the band
  // curves in towards the focus area like a curved display.
  function restTilt(rect) { return rect ? (rect.x + rect.w / 2 < root.monW / 2 ? 1 : -1) * root.cardTilt : 0 }
  function drawnCards() {
    var out = {}
    for (var a in root.winData) out[a] = root.drawnRect(root.winData[a])
    return out
  }
  // Which bands have cards, for the focus keys to move into.
  property bool cardsLeft: false
  property bool cardsRight: false
  // The state last sent to hypr.lua, and the one to send.
  property string luaSent: ""
  readonly property string luaState: Hypr.hookStateLua({ // qmllint disable missing-property
    opened: root.opened, cardsLeft: root.cardsLeft, cardsRight: root.cardsRight,
    monX: root.monX, monY: root.monY, monW: root.monW, monH: root.monH, sideW: root.sideW,
    selected: root.selected, monitor: root.targetMonitor ? root.targetMonitor.name : "", gapsOut: root.gapsOut,
  })
  onLuaStateChanged: root.sendLuaState()

  // Which M3 component each part is, and which spring moves it:
  // interpretation periphery.components.
  readonly property color onSurfaceVariant: root.scheme.color["on-surface-variant"]
  // A card without a frame yet: an outlined card.
  readonly property color placeholderColor: root.compColor("md.comp.outlined-card.container.color")
  readonly property color placeholderOutline: root.compColor("md.comp.outlined-card.outline.color")
  readonly property int placeholderOutlineWidth: root.m3.comp["md.comp.outlined-card.outline.width"]
  // A selected card's title: a plain tooltip.
  readonly property color tooltipColor: root.compColor("md.comp.plain-tooltip.container.color")
  readonly property color tooltipText: root.compColor("md.comp.plain-tooltip.supporting-text.color")
  readonly property int tooltipCorner: root.m3.comp["md.comp.plain-tooltip.container.shape"]
  readonly property var tooltipType: root.m3.comp["md.comp.plain-tooltip.supporting-text.type"]
  // The dragged card: the filled card's dragged elevation and state layer;
  // the card it left behind is unavailable meanwhile (the disabled opacity).
  readonly property var dragShadow: root.m3.shadowAt(root.m3.comp["md.comp.filled-card.dragged.container.elevation"])
  readonly property color dragLayer: Qt.alpha(root.scheme.color["on-surface"], root.m3.state.dragged)
  readonly property real draggedSourceOpacity: root.m3.state.disabled
  // Drop targets: primary at the hover opacity, a primary outline, the large corner.
  readonly property color dropFill: Qt.alpha(root.scheme.color.primary, root.m3.state.hover)
  readonly property color dropOutline: root.scheme.color.primary
  readonly property int dropOutlineWidth: root.m3.comp["md.comp.outlined-card.outline.width"]
  readonly property int dropCorner: root.m3.corner["large"]
  // Card borders stay Hyprland's (SPEC.md, Card borders): these feed them.
  property color border: Color.menu.border // qmllint disable missing-property
  property color accent: Color.accent
  // Cards are drawn like windows, in the theme's border: the inactive border
  // at rest, the active one (Hyprland's active-border gradient, from the
  // theme's [hyprland] shell tokens) when selected. The theme's popups border
  // is its Hyprland inactive border. Width and rounding are Hyprland's.
  property int windowBorder: 1
  property int windowRounding: 0
  // Hyprland's outer gaps [top, right, bottom, left]; the bands add to the sides.
  property var gapsOut: [0, 0, 0, 0]
  readonly property var activeBorder: Border.hyprlandActiveSpec(root.accent, root.windowBorder)
  readonly property var inactiveBorder: Border.surfaceSpec("popups", "border", root.border, root.windowBorder)
  // A window's own ghost properties, or the global ones until they are read.
  function propsOf(address) {
    return root.windowProps[address]
      || { opacity: 1, opacityInactive: 1, borderSize: root.windowBorder, rounding: root.windowRounding }
  }
  // A border spec at a window's own border width.
  function borderAt(spec, width) {
    return { color: spec.color, gradient: spec.gradient, widths: { top: width, right: width, bottom: width, left: width } }
  }
  property string fontFamily: Style.font.menuFamily // qmllint disable missing-property

  readonly property int bandMargin: root.m3.periphery.bandMargin
  readonly property int cardGap: root.m3.periphery.cardGap
  readonly property int groupGap: root.m3.periphery.groupGap
  // The title-small label line, then the card gap to the cards.
  readonly property int headerHeight: root.typeOf("title-small").lineHeight + root.cardGap
  // How far a card at rest turns towards the focus area, in degrees; a
  // selected or dragged card turns flat (interpretation periphery.components).
  readonly property real cardTilt: 8
  // Global animation speed: 1 is normal, 0.25 plays every animation 4x
  // slower to inspect it, 2 twice as fast. Scales the timeouts and the
  // springs (stiffness by speed² keeps their shape, in time scaled by speed).
  readonly property real animSpeed: 1
  function ms(duration) { return Math.round(duration / root.animSpeed) }
  function atSpeed(spring) { return { stiffness: spring.stiffness * root.animSpeed * root.animSpeed, ratio: spring.ratio } }

  // The tokens' motion scheme: geometry on spatial default, fades on effects
  // default, the drag grow (a small element) on spatial fast, border colour
  // on effects fast.
  readonly property var springSpatial: root.atSpeed(root.m3.springs.spatial_default)
  readonly property var springEffects: root.atSpeed(root.m3.springs.effects_default)
  readonly property var springFast: root.atSpeed(root.m3.springs.spatial_fast)
  // Card borders change colour as Hyprland's do (its `border` leaf).
  readonly property var springEffectsFast: root.atSpeed(root.m3.springs.effects_fast)
  // Geometry settles to within a quarter pixel.
  readonly property real pixelEpsilon: 0.25
  // Ghosts settle at least this long before the hand-off, so the refresh
  // that follows a switch can still retarget them; and at most this long.
  readonly property int switchMinMs: ms(120)
  readonly property int switchMaxMs: ms(1500)
  // A flight whose switch hasn't come this long after its dispatch (a key
  // to the workspace already shown) ends: its ghosts are still on the tiles.
  readonly property int switchWaitMs: ms(150)
  // How long after the pointer leaves the selected card, for a card that
  // isn't under it, the selection clears (pointerOff).
  readonly property int leaveMs: ms(120)
  // Trial ghost motion: emphasized decelerate over medium4 (see the ghosts).
  readonly property int easeMs: ms(400)
  readonly property var easeCurve: [0.05, 0.7, 0.1, 1, 1, 1]
  // How far the switch backdrop reaches into the bands, to cover the border
  // (general:border_size) of a window tiled flush against the band.
  readonly property int coverBleed: 2

  property var targetScreen: null
  // The Hyprland monitor the mode runs on; it keeps it when focus moves away.
  property var targetMonitor: null
  property int monId: -1
  property real monX: 0
  property real monY: 0
  property real monW: 1920
  property real monH: 1080
  readonly property real focusW: Math.min(monW, Math.round(monH * ratio))
  readonly property real sideW: Math.max(0, Math.floor((monW - focusW) / 2))
  // Reserved [left, top, right, bottom], for the bar above the tiling area.
  readonly property var reserved: targetMonitor && targetMonitor.lastIpcObject
    && targetMonitor.lastIpcObject.reserved ? targetMonitor.lastIpcObject.reserved : [0, 0, 0, 0]

  function open(payloadJson) {
    try {
      var payload = JSON.parse(payloadJson || "{}")
      if (payload && payload.ratio > 0) root.ratio = payload.ratio
    } catch (e) {}
    var mon = Hyprland.focusedMonitor
    if (mon) {
      var geometry = Kit.monitorGeometry(mon, Quickshell.screens) // qmllint disable missing-property
      root.targetMonitor = mon
      root.monId = mon.id
      root.monX = geometry.x
      root.monY = geometry.y
      root.monW = geometry.w
      root.monH = geometry.h
      root.targetScreen = geometry.screen
    }
    root.hookReset = true
    root.opened = true
    root.shownWorkspace = root.currentWorkspaceId()
    root.layoutSignature = ""
    root.disableHyprSlide()
    if (!wallpaperProc.running) wallpaperProc.running = true
    if (!decorProc.running) decorProc.running = true
    if (!blurProc.running) blurProc.running = true
    Hyprland.refreshToplevels()
    Hyprland.refreshWorkspaces()
    Hyprland.refreshMonitors()
    refreshTimer.restart()
  }

  function close() {
    root.clearSelection()
    root.opened = false
    root.finishSwitch()
    root.restoreHyprSlide()
    root.restoreShadows()
    root.targetMonitor = null
    root.layoutSignature = ""
    root.cancelDrag()
    root.winData = ({})
    root.focusRects = ({})
    root.windowProps = ({})
    root.headers = []
    slots.clear()
    ghosts.clear()
  }

  // The gaps are read now, so the first rule the mode sends has them.
  Component.onCompleted: decorProc.running = true
  Component.onDestruction: {
    root.restoreHyprSlide()
    root.restoreShadows()
    Quickshell.execDetached(["hyprctl", "eval", "if periphery_close then periphery_close() end"])
  }

  // One hyprctl at a time, so the states reach hypr.lua in order; a state
  // that changed meanwhile goes after.
  // The hook's state outlives the plugin (a shell restart skips the unload):
  // the first state after the mode turns on resets it in the same queue, so
  // it starts clean and reports the shown tabs again (SPEC.md, gotchas).
  property bool hookReset: false
  function sendLuaState() {
    if (luaProc.running || root.luaState === root.luaSent) return
    root.luaSent = root.luaState
    var reset = root.hookReset && root.opened
    if (reset) root.hookReset = false
    luaProc.command = ["hyprctl", "eval", (reset ? Hypr.hookStateLua({ opened: false }) + "; " : "") + root.luaState] // qmllint disable missing-property
    luaProc.running = true
  }

  Process {
    id: luaProc
    // Not onExited: `running` is still true there, so the next state waited
    // for good.
    onRunningChanged: if (!running) root.sendLuaState()
  }

  // over: the active window, when known better than activeToplevel (which
  // can lag behind a focus change).
  function select(address, over) {
    if (!root.opened || root.dragAddress !== "" || !root.winData[address]) return
    var t = Hyprland.activeToplevel
    if (over !== undefined) root.selectedOver = over
    else if (!root.selected) root.selectedOver = t ? root.normalizeAddress(t.address) : ""
    root.selected = address
  }

  function clearSelection() {
    root.selected = ""
  }

  // The card under the pointer ("" for none). Leaving the selected card
  // clears the selection unless the pointer is on a card leaveMs later: it
  // may be crossing a gap, or a pile may be fanning out under it.
  property string pointerCard: ""
  function pointerOn(address) {
    root.pointerCard = address
    leaveTimer.stop()
  }
  function pointerOff(address) {
    if (root.pointerCard === address) root.pointerCard = ""
    if (root.selected === address) leaveTimer.restart()
  }
  Timer {
    id: leaveTimer
    interval: root.leaveMs
    onTriggered: if (root.pointerCard === "" && root.dragAddress === "") root.clearSelection()
  }

  // A focus key moved past the focus area's edge towards a band ("l" or
  // "r"), from the active window (src/selection/specs.md).
  function enterBand(dir, active) {
    if (!root.opened) return
    var best = Selection.enterBand(root.winData, dir, root.focusRects[active] || null, root.monW, root.monH) // qmllint disable missing-property
    if (best) root.select(best, active)
  }

  // A focus key on the selected card (src/selection/specs.md).
  function stepSelection(dir) {
    var step = Selection.stepSelection(root.drawnCards(), root.selected, dir, root.focusRects, root.monW, root.sideW) // qmllint disable missing-property
    if (step.kind === "select") root.select(step.address)
    else if (step.kind === "focus") {
      root.clearSelection()
      if (step.address) root.activateWindow(step.address)
    } else if (step.kind === "clear") root.clearSelection()
  }

  // Also runs on plugin unload, when the dispatch socket may already be
  // gone, so it goes through hyprctl.
  function restoreShadows() {
    var batch = Hypr.restoreShadowsBatch(Object.keys(root.shadowless)) // qmllint disable missing-property
    root.shadowless = ({})
    if (batch) Quickshell.execDetached(["hyprctl", "--batch", batch])
  }

  // Reads the theme's workspaces animation, so it can be put back, and
  // switches it to workspaceStyle with the same curve and speed.
  function disableHyprSlide() {
    if (root.hyprSlideOff) return
    root.hyprSlideOff = true
    root.hyprSlideRestore = ""
    slideProc.running = true
  }

  function restoreHyprSlide() {
    if (!root.hyprSlideOff) return
    root.hyprSlideOff = false
    if (root.hyprSlideRestore) Quickshell.execDetached(["hyprctl", "eval", root.hyprSlideRestore])
    else Quickshell.execDetached(["hyprctl", "reload", "config-only"])
  }

  Process {
    id: slideProc
    command: ["hyprctl", "animations", "-j"]
    stdout: StdioCollector {
      onStreamFinished: {
        try {
          root.hyprSlideRestore = Hypr.workspaceAnimationLua(text) // qmllint disable missing-property
          var mode = Hypr.workspaceAnimationLua(text, root.workspaceStyle) // qmllint disable missing-property
          if (mode) root.hyprModeLua = mode
        } catch (e) { root.hyprSlideRestore = "" }
        if (root.hyprSlideOff) Quickshell.execDetached(["hyprctl", "eval", root.hyprModeLua])
      }
    }
    // The mode went off before the slide was disabled: put it back now.
    onRunningChanged: if (!running && !root.hyprSlideOff) { root.hyprSlideOff = true; root.restoreHyprSlide() }
  }

  // Hyprland's border width and rounding, for the cards.
  Process {
    id: decorProc
    command: ["sh", "-c", "hyprctl -j getoption general:border_size; hyprctl -j getoption decoration:rounding; hyprctl -j getoption general:gaps_out"]
    stdout: StdioCollector {
      onStreamFinished: {
        var decoration = Hypr.parseDecoration(text) // qmllint disable missing-property
        if (decoration.borderSize !== undefined) root.windowBorder = decoration.borderSize
        if (decoration.rounding !== undefined) root.windowRounding = decoration.rounding
        if (decoration.gapsOut !== undefined) root.gapsOut = decoration.gapsOut
      }
    }
  }

  // Hyprland's blur options, for the ghosts' blurred wallpaper.
  Process {
    id: blurProc
    command: ["sh", "-c", ["enabled", "size", "passes", "contrast", "brightness", "vibrancy"].map(function(o) {
        return "hyprctl -j getoption decoration:blur:" + o
      }).join("; ")]
    stdout: StdioCollector {
      onStreamFinished: root.blurFx = Hypr.ghostBlur(Hypr.parseBlur(text)) // qmllint disable missing-property
    }
  }

  // Reads the ghost properties of the windows that don't have them yet, one
  // batch at a time; windows that came in meanwhile go in the next.
  function readWindowProps() {
    if (propsProc.running || !root.opened) return
    var missing = Object.keys(root.winData).concat(Object.keys(root.focusRects)).filter(function(a) { return !root.windowProps[a] })
    var batch = Hypr.windowPropsBatch(missing) // qmllint disable missing-property
    if (!batch) return
    propsProc.addresses = missing
    propsProc.command = ["hyprctl", "--batch", batch]
    propsProc.running = true
  }

  Process {
    id: propsProc
    property var addresses: []
    stdout: StdioCollector {
      onStreamFinished: {
        var read = Hypr.parseWindowProps(propsProc.addresses, text) // qmllint disable missing-property
        var all = Object.assign({}, root.windowProps)
        for (var a in read) all[a] = read[a]
        root.windowProps = all
      }
    }
  }

  Process {
    id: wallpaperProc
    command: ["readlink", "-f", Quickshell.env("HOME") + "/.local/state/omarchy/current/background"]
    stdout: StdioCollector {
      onStreamFinished: root.wallpaper = String(text || "").trim()
    }
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

  function activateWindow(address) {
    Hyprland.dispatch('hl.dsp.focus({ window = "address:' + address + '" })')
  }

  function activeAddress() {
    var t = Hyprland.activeToplevel
    return t ? root.normalizeAddress(t.address) : ""
  }

  // Whether a switch can fly now: not during a drag, another flight, or
  // over a fullscreen window.
  function canFly() {
    var ws = root.targetMonitor ? root.targetMonitor.activeWorkspace : null
    return root.opened && root.dragAddress === "" && !root.transitioning && !(ws && ws.hasFullscreen)
  }

  // Card click: the Exposé flight. Only a window with a card switches
  // workspace: one in the focus area, on another monitor or on a special
  // workspace would leave the flight waiting for a switch that never comes.
  function flyTo(address) {
    if (!root.canFly() || !root.winData[address]) {
      root.activateWindow(address)
      return
    }
    root.startFlight({ window: address }, address)
  }

  // A routed switch from hypr.lua: flown, or run at once. During a flight it
  // runs at once and continues that flight (Hyprland's animation is off).
  function route(token) {
    if (root.canFly()) root.startFlight({ token: parseInt(token, 10) }, "")
    else {
      var lua = Hypr.runSwitchLua(token) // qmllint disable missing-property
      if (lua) Quickshell.execDetached(["hyprctl", "eval", lua])
    }
  }

  // The plugin starts this switch, so it can get ahead of Hyprland: it puts
  // the backdrop up with ghosts of the current focus windows on their tiles
  // (the screen looks the same), waits until that is on screen, then turns
  // Hyprland's workspace animation off for this switch and switches.
  // beginSwitch flies the ghosts; finishSwitch turns the animation back on.
  function startFlight(to, target) {
    root.clearSelection()
    wallBlurTex.scheduleUpdate()
    var ghosted = {}
    var onTiles = Flight.ghostsOnTiles(Object.keys(root.focusRects), root.tabGroups, root.shownTabs) // qmllint disable missing-property
    for (var i = 0; i < onTiles.length; i++) {
      var a = onTiles[i]
      if (!root.ghostItems[a]) continue
      root.ghostItems[a].launch(root.focusRects[a], true)
      ghosted[a] = true
    }
    root.ghosted = ghosted
    root.flight = true
    root.flightPending = true
    root.transitioning = true
    root.dispatchedAt = 0
    root.switchStarted = Date.now()
    root.flightTarget = target
    root.activeBefore = root.activeAddress()
    var shadowless = {}
    for (var w in root.winData) if (root.winData[w].floating) shadowless[w] = true
    root.shadowless = shadowless
    flightTimer.to = to
    flightTimer.restart()
  }

  Timer {
    id: flightTimer
    property var to: ({})
    // Two frames at 60 Hz: the backdrop is on screen before Hyprland switches.
    interval: 34
    onTriggered: {
      Quickshell.execDetached(["hyprctl", "--batch", Hypr.flightBatch(Object.keys(root.shadowless), flightTimer.to)]) // qmllint disable missing-property
      root.dispatchedAt = Date.now()
    }
  }

  // The workspace shown in the focus area: the target monitor's, not the
  // focused one, which is on another monitor when focus moves away.
  function currentWorkspaceId() {
    var ws = root.targetMonitor ? root.targetMonitor.activeWorkspace : Hyprland.focusedWorkspace
    return ws ? ws.id : -1
  }

  function moveToWorkspace(address, wsId) {
    Hyprland.dispatch('hl.dsp.window.move({ workspace = "' + wsId + '", follow = false, window = "address:' + address + '" })')
  }

  // Pulls a window onto the current workspace. Dwindle opens it next to the
  // tiled window under the cursor, which is where it was dropped.
  function moveToFocus(address) {
    var current = root.currentWorkspaceId()
    if (current <= 0) return
    root.moveToWorkspace(address, current)
    Hyprland.dispatch('hl.dsp.focus({ window = "address:' + address + '" })')
  }

  function groupAt(x, y) {
    return Selection.groupAt(root.headers, x, y, root.bandMargin, root.groupGap) // qmllint disable missing-property
  }

  function inBand(x) {
    return x < root.sideW || x > root.monW - root.sideW
  }

  // Lowest workspace number with nothing on it, for drops on empty band.
  function freeWorkspaceId() {
    var occupied = []
    var list = Hyprland.workspaces.values
    for (var i = 0; i < list.length; i++)
      if (list[i].id > 0 && list[i].toplevels && list[i].toplevels.values.length > 0) occupied.push(list[i].id)
    return Selection.freeWorkspaceId(occupied, root.currentWorkspaceId()) // qmllint disable missing-property
  }

  // Sends a window to the workspace group under (x, y) in a band, or to a
  // fresh workspace when dropped on empty band.
  function dropInBand(address, x, y) {
    var group = root.groupAt(x, y)
    root.moveToWorkspace(address, group ? group.id : root.freeWorkspaceId())
  }

  // Called from the SUPER+mouse:272 release bind with the active window
  // (Hyprland focuses the window it drags) and the cursor position.
  IpcHandler {
    target: Meta.pluginId // qmllint disable missing-property

    // Goes to a window the way a card click does (the Exposé flight).
    function flyTo(address: string): void {
      root.flyTo(root.normalizeAddress(address))
    }

    // From hypr.lua: a workspace key (a routed switch), run with
    // periphery_run(token).
    function route(token: string): void {
      root.route(token)
    }

    // From hypr.lua: the shown tab of every tab group ("none" without any).
    function tabs(list: string): void {
      root.shownTabs = Hypr.parseTabs(list) // qmllint disable missing-property
    }

    // From hypr.lua: a focus key ("l", "r", "u", "d") past the focus area's
    // edge (enter), or on a selected card (step).
    function enter(dir: string, active: string): void {
      root.enterBand(dir, active === "none" ? "" : root.normalizeAddress(active))
    }

    function step(dir: string): void {
      root.stepSelection(dir)
    }

    // From hypr.lua: Return on a selected card goes to its window (the
    // Exposé flight).
    function activate(): void {
      if (root.selected) root.flyTo(root.selected)
    }

    // From hypr.lua: Escape, or the pointer moved over the focus area, whose
    // windows get the focus back.
    function clear(): void {
      root.clearSelection()
    }

    function dropWindow(address: string, x: string, y: string): void {
      if (!root.opened) return
      var px = parseFloat(x) - root.monX
      var py = parseFloat(y) - root.monY
      if (!(px >= 0 && px <= root.monW && py >= 0 && py <= root.monH) || !root.inBand(px)) return
      var a = root.normalizeAddress(address)
      Hyprland.refreshToplevels()
      root.dropInBand(a, px, py)
    }
  }

  function beginDrag(win, w, h, gx, gy) {
    root.clearSelection()
    root.dragWin = win
    root.dragW = w
    root.dragH = h
    root.grabX = gx
    root.grabY = gy
    root.dragAddress = win.address
  }

  function updateDrag(x, y) {
    root.dragX = x
    root.dragY = y
  }

  function endDrag(x, y) {
    root.updateDrag(x, y)
    var address = root.dragAddress
    var win = root.dragWin
    var toFocus = root.dragOverFocus
    var group = root.groupAt(x, y)
    root.cancelDrag()
    if (!address) return
    if (toFocus) root.moveToFocus(address)
    else if (group && win && group.id !== win.wsId) root.moveToWorkspace(address, group.id)
    else if (!group && root.inBand(x)) root.moveToWorkspace(address, root.freeWorkspaceId())
  }

  function cancelDrag() {
    root.dragAddress = ""
    root.dragWin = null
  }

  function rebuild() {
    if (!root.opened) return
    var current = root.currentWorkspaceId()
    var others = []
    var focus = {}
    var groups = {}
    var toplevels = Hyprland.toplevels.values
    for (var i = 0; i < toplevels.length; i++) {
      var t = toplevels[i]
      var ipc = t.lastIpcObject
      if (!ipc || !ipc.workspace || !ipc.at || !ipc.size) continue
      if (ipc.mapped === false || ipc.hidden === true) continue
      if (root.monId >= 0 && ipc.monitor !== undefined && ipc.monitor !== root.monId) continue
      var wsId = ipc.workspace.id
      var address = normalizeAddress(ipc.address || t.address)
      groups[address] = (ipc.grouped || []).map(root.normalizeAddress)
      if (wsId === current) {
        focus[address] = { address: address, toplevel: t, fullscreen: !!ipc.fullscreen,
                           x: ipc.at[0] - root.monX, y: ipc.at[1] - root.monY,
                           w: Math.max(1, ipc.size[0]), h: Math.max(1, ipc.size[1]) }
        continue
      }
      if (wsId <= 0) continue
      others.push({
        toplevel: t,
        address: address,
        title: ipc.title || t.title || "",
        appClass: ipc["class"] || "",
        floating: !!ipc.floating,
        wsId: wsId,
        wsName: String(ipc.workspace.name || wsId),
        rx: ipc.at[0],
        ry: ipc.at[1],
        rw: Math.max(1, ipc.size[0]),
        rh: Math.max(1, ipc.size[1]),
        // A tab group piles up, its shown tab in front (src/layout/specs.md).
        tabGroup: (ipc.grouped || []).length > 1 ? root.normalizeAddress(ipc.grouped[0]) : "",
        shownTab: root.shownTabs.has(address),
      })
    }

    root.tabGroups = groups
    others.sort(function(a, b) { return a.address < b.address ? -1 : a.address > b.address ? 1 : 0 })
    var signature = JSON.stringify([root.sideW, root.reserved[1], root.reserved[3], current, others.map(function(w) {
      return [w.address, w.wsId, w.wsName, w.title, w.floating, w.rx, w.ry, w.rw, w.rh, w.tabGroup, w.shownTab]
    }), Object.keys(focus).map(function(a) { var f = focus[a]; return [a, f.fullscreen, f.x, f.y, f.w, f.h] })])
    if (signature === root.layoutSignature) return
    root.layoutSignature = signature
    root.focusRects = focus

    // See src/layout/specs.md.
    var layout = Layout.layoutBands(others, current, { // qmllint disable missing-property
      monW: root.monW, monH: root.monH, sideW: root.sideW, bandMargin: root.bandMargin,
      cardGap: root.cardGap, groupGap: root.groupGap, headerHeight: root.headerHeight,
      top: root.reserved[1], bottom: root.reserved[3],
    })
    root.winData = layout.cards
    root.headers = layout.headers
    if (root.selected && !layout.cards[root.selected]) root.clearSelection()
    root.cardsLeft = layout.left.length > 0
    root.cardsRight = layout.right.length > 0
    syncSlots(Object.keys(layout.cards))
    // Ghosts for every window on the monitor, band or focus area.
    syncModel(ghosts, Object.keys(layout.cards).concat(Object.keys(focus)))
    root.readWindowProps()
  }

  // Keeps one delegate per window alive across rebuilds: a card whose
  // workspace changes side slides there instead of being recreated, and a
  // ghost keeps its capture warm.
  function syncModel(model, addresses) {
    for (var i = model.count - 1; i >= 0; i--)
      if (addresses.indexOf(model.get(i).address) < 0) model.remove(i)
    for (var j = 0; j < addresses.length; j++) {
      var found = false
      for (var k = 0; k < model.count; k++)
        if (model.get(k).address === addresses[j]) found = true
      if (!found) model.append({ address: addresses[j] })
    }
  }

  ListModel { id: slots }

  // Cards: a card for a new band window is added; a card whose window left
  // the bands is not removed here but fades out first and then removes
  // itself (removeSlot). A window back before that just fades in again.
  function syncSlots(addresses) {
    for (var j = 0; j < addresses.length; j++) {
      var found = false
      for (var k = 0; k < slots.count; k++)
        if (slots.get(k).address === addresses[j]) found = true
      if (!found) slots.append({ address: addresses[j] })
    }
  }

  function removeSlot(address) {
    if (root.winData[address]) return
    for (var i = slots.count - 1; i >= 0; i--)
      if (slots.get(i).address === address) slots.remove(i)
  }

  function liveRect(item) {
    return { x: item.x, y: item.y, w: item.width, h: item.height }
  }

  // FLIP over a workspace switch. Reads where every window is drawn now,
  // relays out for the new workspace at once from the cached geometry, then
  // flies a ghost for each window the plan flies (src/flight/specs.md). The
  // refresh that follows the switch retargets ghosts whose real tiles differ
  // from the cache (hidden workspaces keep their old tiling).
  function beginSwitch() {
    if (!root.opened) return
    var current = root.currentWorkspaceId()
    root.clearSelection()
    root.switchDir = current > root.shownWorkspace ? 1 : current < root.shownWorkspace ? -1 : 0
    root.shownWorkspace = current
    // No flight running and none set up: a switch the plugin didn't start
    // (bar, script). Hyprland animates the focus area; the cards move to
    // their new places right away. During a flight Hyprland's animation is
    // off, so any switch continues the flight.
    if (!root.transitioning) {
      root.rebuild()
      return
    }
    root.flightPending = false
    var oldFocus = root.focusRects
    var from = {}
    for (var a in oldFocus) from[a] = oldFocus[a]
    for (var c in root.cardItems) if (root.cardItems[c].visible) from[c] = root.liveRect(root.cardItems[c])
    for (var g in root.ghosted) if (root.ghostItems[g]) from[g] = root.liveRect(root.ghostItems[g])
    var target = root.flightTarget
    root.flightTarget = ""
    var shown = root.shownTabs

    root.rebuild()

    var ws = root.targetMonitor ? root.targetMonitor.activeWorkspace : null
    var fullscreen = ws && ws.hasFullscreen
    for (var o in oldFocus) if (oldFocus[o].fullscreen) fullscreen = true
    if (fullscreen) { root.finishSwitch(); return }

    var plan = Flight.planFlight({ // qmllint disable missing-property
      before: Object.keys(oldFocus), after: Object.keys(root.focusRects), cards: Object.keys(root.winData),
      groups: root.tabGroups, shown: shown, target: target,
    })
    root.shownTabs = Flight.shownAfter(root.tabGroups, shown, target) // qmllint disable missing-property
    root.activeAfter = root.activeAddress()
    // Every flying ghost starts again from where it is drawn now; a hidden
    // tab's ghost is put away, its card fades instead.
    for (var h in root.ghosted) if (plan.fly.indexOf(h) < 0 && root.ghostItems[h]) root.ghostItems[h].land()
    var ghosted = {}
    for (var i = 0; i < plan.fly.length; i++) {
      var addr = plan.fly[i]
      if (!from[addr] || !root.ghostItems[addr]) continue
      root.ghostItems[addr].launch(from[addr], !!oldFocus[addr])
      ghosted[addr] = true
    }
    root.ghosted = ghosted
    for (var f in ghosted) root.ghostItems[f].fly()
    root.switchStarted = Date.now()
  }

  function checkLanded() {
    var now = Date.now()
    var elapsed = now - root.switchStarted
    // Waiting for Hyprland to switch: the ghosts sit on their tiles, landed.
    // A switch that doesn't come (the workspace already shown) ends it.
    if (root.flightPending) {
      if (root.dispatchedAt > 0 && now - root.dispatchedAt > root.switchWaitMs) root.finishSwitch()
      else if (elapsed >= root.switchMaxMs) root.finishSwitch()
      return
    }
    if (elapsed < root.switchMinMs) return
    if (elapsed < root.switchMaxMs) {
      for (var a in root.ghosted)
        if (root.ghostItems[a] && !root.ghostItems[a].landed) { root.landedTicks = 0; return }
      // Twice in a row, so a spring passing through its target doesn't count.
      if (++root.landedTicks < 2) return
    }
    root.finishSwitch()
  }

  // Hand-off: ghosts and backdrop go in the same frame, revealing the real
  // windows they sit on and the cards they landed on.
  function finishSwitch() {
    root.transitioning = false
    root.landedTicks = 0
    for (var a in root.ghosted) if (root.ghostItems[a]) root.ghostItems[a].land()
    root.ghosted = ({})
    root.flightPending = false
    root.dispatchedAt = 0
    root.flightTarget = ""
    if (root.flight && root.opened) Quickshell.execDetached(["hyprctl", "eval", root.hyprModeLua])
    if (root.flight) root.restoreShadows()
    root.flight = false
  }

  ListModel { id: ghosts }

  Connections {
    target: root.targetMonitor
    enabled: root.opened
    function onActiveWorkspaceChanged() { root.beginSwitch() }
  }

  // Focus moved to a window (pointer, keys, anything): it has the focus now,
  // not the card.
  Connections {
    target: Hyprland
    enabled: root.opened
    function onActiveToplevelChanged() {
      var t = Hyprland.activeToplevel
      if (t && root.normalizeAddress(t.address) !== root.selectedOver) root.clearSelection()
    }
  }

  Timer {
    interval: 16
    repeat: true
    running: root.transitioning
    onTriggered: root.checkLanded()
  }

  // Structural window/workspace events only; title and layout events fire on
  // ordinary use and would rebuild for nothing.
  readonly property var refreshEvents: [
    "openwindow", "closewindow", "movewindow", "movewindowv2", "changefloatingmode",
    "createworkspace", "createworkspacev2", "destroyworkspace", "destroyworkspacev2",
    "moveworkspace", "moveworkspacev2", "workspace", "workspacev2", "focusedmon",
    "fullscreen", "pin", "renameworkspace",
  ]

  Connections {
    target: Hyprland
    enabled: root.opened
    function onRawEvent(event) {
      // A reload starts hypr.lua afresh: it gets the state again.
      // A theme switch reloads too: the border width and rounding may change.
      // A reload or theme switch can change the blur and window rules too.
      if (event.name === "configreloaded") {
        root.luaSent = ""
        root.sendLuaState()
        // A theme switch repoints current/background before it reloads
        // Hyprland, so this is when the backdrop's wallpaper changes.
        if (!wallpaperProc.running) wallpaperProc.running = true
        if (!decorProc.running) decorProc.running = true
        if (!blurProc.running) blurProc.running = true
        root.windowProps = ({})
        root.readWindowProps()
      }
      if (root.refreshEvents.indexOf(event.name) < 0) return
      if (!refreshTimer.running) {
        Hyprland.refreshToplevels()
        Hyprland.refreshWorkspaces()
        refreshTimer.restart()
      }
    }
  }

  // The monitors too: the reserved area (where the backdrop and the bands
  // start) changes without an event when the bar resizes, as stef.bar does
  // when it floats in the focus area.
  Timer {
    id: refreshTimer
    interval: 80
    onTriggered: {
      Hyprland.refreshMonitors()
      root.rebuild()
    }
  }

  // Titles and sizes that change without a structural event are picked
  // up by a slow resync.
  Timer {
    interval: 3000
    repeat: true
    running: root.opened && root.dragAddress === ""
    onTriggered: {
      Hyprland.refreshToplevels()
      refreshTimer.restart()
    }
  }

  PanelWindow { // qmllint disable uncreatable-type
    id: stage
    visible: root.opened && root.sideW > 0
    screen: root.targetScreen
    anchors { top: true; bottom: true; left: true; right: true }
    color: "transparent"
    exclusionMode: ExclusionMode.Ignore
    WlrLayershell.namespace: "omarchy-periphery"
    WlrLayershell.layer: WlrLayer.Bottom
    WlrLayershell.keyboardFocus: WlrKeyboardFocus.None

    // Only the side bands take input; the focus area stays click-through.
    // A drag keeps the pointer grab past the band edge.
    mask: Region {
      item: leftBand
      Region { item: rightBand; intersection: Intersection.Combine }
    }

    Item { id: leftBand; x: 0; width: root.sideW; height: parent.height }
    Item { id: rightBand; x: parent.width - root.sideW; width: root.sideW; height: parent.height }

    Repeater {
      model: root.headers

      delegate: Text {
        required property var modelData
        x: modelData.x
        y: modelData.y
        width: modelData.w
        height: root.headerHeight
        verticalAlignment: Text.AlignVCenter
        textFormat: Text.PlainText
        text: modelData.label
        color: root.onSurfaceVariant
        font.family: root.fontFamily
        font.pixelSize: root.typeOf("title-small").size
        font.weight: root.typeOf("title-small").weight
      }
    }

    Repeater {
      model: slots

      delegate: WindowCard {
        id: card
        required property string address
        readonly property var entry: root.winData[address]
        // The last placement, so a leaving card fades out where it was.
        property var shown: entry
        onEntryChanged: if (entry) shown = entry
        // Its window left the bands (onto the focus area, or closed).
        readonly property bool leaving: !entry
        // Placement animates only once the card has settled in, so a new
        // card appears in place and fades in rather than flying from 0,0.
        property bool settled: false

        host: root
        win: shown || ({ address: address, title: "", appClass: "", toplevel: null })
        enabled: !leaving
        // Hidden, not faded, while its ghost flies: the ghost lands on it.
        visible: !!shown && !root.ghosted[address]
        // Placement moves on the spatial spring once the card has settled in.
        // Its pile fanned out: the card moves to its fan rect.
        readonly property var place: card.shown ? root.drawnRect(card.shown) : null
        readonly property bool fanned: !!card.shown && card.shown.pile !== "" && card.shown.pile === root.openPile
        SpringValue { id: cardX; spring: root.springSpatial; epsilon: root.pixelEpsilon; animated: card.settled; target: card.place ? card.place.x : 0 }
        SpringValue { id: cardY; spring: root.springSpatial; epsilon: root.pixelEpsilon; animated: card.settled; target: card.place ? card.place.y : 0 }
        SpringValue { id: cardW; spring: root.springSpatial; epsilon: root.pixelEpsilon; animated: card.settled; target: card.place ? card.place.w : 0 }
        SpringValue { id: cardH; spring: root.springSpatial; epsilon: root.pixelEpsilon; animated: card.settled; target: card.place ? card.place.h : 0 }
        // In front: floating cards over tiled ones, a pile's front tab over
        // the ones behind, an open pile over its neighbours, the selection
        // over everything.
        z: (card.shown && card.shown.z !== undefined ? card.shown.z : 0) + (card.fanned ? 500 : 0) + (card.selected ? 1000 : 0)
        // On whole pixels, like the ghosts that land on it.
        x: Math.round(cardX.value)
        y: Math.round(cardY.value)
        width: Math.round(cardW.value)
        height: Math.round(cardH.value)
        // Cards fade in and out while they travel with the focus area, the
        // way Hyprland slides the workspace: an arriving card (its window
        // just slid out of the focus area) comes from the switch side, a
        // leaving card (its window slides in) goes towards it. Not during a
        // flight: the ghost lands on the card, which must be in place.
        readonly property real travel: root.flight ? 0 : -root.switchDir * root.cardSlide
        readonly property real arriveFrom: -travel
        property real leaveTo: 0
        // The spatial spring, like Hyprland's workspace slide it travels with.
        SpringValue { id: slide; spring: root.springSpatial; epsilon: root.pixelEpsilon; target: card.leaving ? card.leaveTo : (card.settled ? 0 : card.arriveFrom) }
        // Turned towards the focus area, with perspective; flat while selected
        // or dragged.
        SpringValue { id: tilt; spring: root.springSpatial; target: card.selected || card.dragging ? 0 : 1 }
        readonly property real tiltAngle: root.restTilt(card.place) * tilt.value
        transform: [
          Translate {
            x: root.cardSlideVertical ? 0 : Math.round(slide.value)
            y: root.cardSlideVertical ? Math.round(slide.value) : 0
          },
          Rotation {
            origin.x: card.width / 2
            origin.y: card.height / 2
            axis { x: 0; y: 1; z: 0 }
            angle: card.tiltAngle
          }
        ]
        SpringValue { id: fade; spring: root.springEffects; target: card.settled && !card.leaving ? (card.dragging ? root.draggedSourceOpacity : 1) : 0 }
        opacity: fade.value
        onOpacityChanged: if (leaving && opacity === 0) root.removeSlot(address)
        onLeavingChanged: {
          if (leaving) leaveTo = travel
          if (leaving && opacity === 0) root.removeSlot(address)
        }


        Component.onCompleted: {
          root.cardItems[address] = card
          Qt.callLater(function() { card.settled = true })
        }
        Component.onDestruction: if (root.cardItems[address] === card) delete root.cardItems[address]
      }
    }
  }

  // Above everything: the switch ghosts over a wallpaper backdrop, and the
  // dragged card with its drop hints. Mapped for as long as the mode is on,
  // so a switch draws its first frame without waiting for a new surface.
  PanelWindow { // qmllint disable uncreatable-type
    visible: root.opened && root.sideW > 0
    screen: root.targetScreen
    anchors { top: true; bottom: true; left: true; right: true }
    color: "transparent"
    exclusionMode: ExclusionMode.Ignore
    mask: Region {}
    WlrLayershell.namespace: "omarchy-periphery-fx"
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.keyboardFocus: WlrKeyboardFocus.None

    // Covers the tiling area (the bar stays visible) so the real windows of
    // the new workspace, already in place, show only once the ghosts land.
    Item {
      x: root.sideW - root.coverBleed
      y: root.reserved[1]
      width: root.focusW + root.coverBleed * 2
      height: root.monH - root.reserved[1] - root.reserved[3]
      clip: true
      visible: root.transitioning

      Rectangle {
        anchors.fill: parent
        color: root.scheme.color.background
      }

      // Lined up with the full-screen wallpaper underneath.
      Image {
        x: -parent.x
        y: -parent.y
        width: root.monW
        height: root.monH
        source: Util.fileUrl(root.wallpaper)
        fillMode: Image.PreserveAspectCrop
        cache: true
      }
    }

    // The wallpaper, blurred once into a texture that each ghost samples.
    Item {
      id: wallSource
      width: root.monW
      height: root.monH
      visible: false

      Image {
        anchors.fill: parent
        source: Util.fileUrl(root.wallpaper)
        fillMode: Image.PreserveAspectCrop
        cache: true
      }
    }

    MultiEffect {
      id: wallBlur
      source: wallSource
      width: root.monW
      height: root.monH
      visible: false
      // Hyprland's decoration:blur, redone (interpretation periphery.ghost-blur).
      blurEnabled: root.blurFx.radius > 0
      blurMax: root.blurFx.blurMax
      blur: root.blurFx.blur
      blurMultiplier: root.blurFx.blurMultiplier
      contrast: root.blurFx.contrast
      brightness: root.blurFx.brightness
      saturation: root.blurFx.saturation
    }

    ShaderEffectSource {
      id: wallBlurTex
      sourceItem: wallBlur
      width: root.monW
      height: root.monH
      visible: false
      // Rendered once per switch (beginSwitch): rendering every frame cost
      // frames, and a texture rendered only once came back blank later.
      live: false
    }

    Repeater {
      model: ghosts

      // One per window on the monitor, for as long as the mode is on: a new
      // ScreencopyView takes a few hundred ms to get its first frame, so a
      // ghost made at switch time flew empty. Hidden until launched.
      delegate: Item {
        id: flyer
        required property string address
        // Where the window is going: its tile, or its card. Follows rebuilds.
        readonly property var target: root.focusRects[address] || root.winData[address] || null
        // Kept when the window closes mid-flight, so the ghost doesn't jump.
        property var lastTarget: target
        // The from rect of the current flight.
        property real fx: 0
        property real fy: 0
        property real fw: 0
        property real fh: 0
        // launched puts the ghost at its from rect; armed enables the springs
        // a step before flying moves it on to the target.
        property bool launched: false
        property bool armed: false
        property bool flying: false
        // Where it flies from and to, for how it looks along the way.
        property bool fromTile: false
        readonly property bool toTile: !!root.focusRects[address]
        // Its window's own opacity, border and rounding.
        readonly property var props: root.propsOf(address)
        // Whether it is the active window at the tile end (its border and
        // opacity there), and at each end of the flight (its border colour).
        readonly property bool activeAtStart: fromTile && address === root.activeBefore
        readonly property bool activeAtEnd: toTile && address === root.activeAfter
        readonly property var look: Flight.ghostLook({ // qmllint disable missing-property
          travel: travel, fromTile: fromTile, toTile: toTile, activeAtTile: toTile ? activeAtEnd : activeAtStart,
          opacity: props.opacity, opacityInactive: props.opacityInactive,
          borderSize: props.borderSize, rounding: props.rounding,
          fromTilt: fromTilt, toTilt: toTile ? 0 : root.restTilt(lastTarget),
        })
        // The card's tilt where the flight starts (0 on a tile): the ghost
        // turns from it to its end's, landing on its card at the card's tilt.
        property real fromTilt: 0
        // A target can move mid-flight (the refresh), so landing is
        // measured: on the target's pixels, where its card or tile is drawn.
        readonly property bool landed: !target || (x === Math.round(target.x) && y === Math.round(target.y)
          && width === Math.round(target.w) && height === Math.round(target.h))

        function launch(r, onTile) {
          armed = false
          flying = false
          fromTile = onTile
          fromTilt = !onTile && root.cardItems[address] ? root.cardItems[address].tiltAngle : 0
          fx = r.x; fy = r.y; fw = r.w; fh = r.h
          launched = true
        }

        function fly() {
          Qt.callLater(function() { flyer.armed = true; flyer.flying = true })
        }

        function land() {
          armed = false
          flying = false
          launched = false
        }

        onTargetChanged: if (target) lastTarget = target
        // At rest it sits on its target, at full size, so it keeps capturing.
        // armed: the spatial spring flies the ghost; otherwise it jumps.
        // Trial: an ease-out instead of the spatial spring. M3's pairing for
        // entering the screen: md.sys.motion.easing.emphasized.decelerate
        // over md.sys.motion.duration.medium4 (styles/motion/easing-and-duration).
        property real gx: flyer.launched && !flyer.flying ? flyer.fx : (flyer.lastTarget ? flyer.lastTarget.x : 0)
        property real gy: flyer.launched && !flyer.flying ? flyer.fy : (flyer.lastTarget ? flyer.lastTarget.y : 0)
        property real gw: flyer.launched && !flyer.flying ? flyer.fw : (flyer.lastTarget ? flyer.lastTarget.w : 1)
        property real gh: flyer.launched && !flyer.flying ? flyer.fh : (flyer.lastTarget ? flyer.lastTarget.h : 1)
        Behavior on gx { enabled: flyer.armed; NumberAnimation { duration: root.easeMs; easing.type: Easing.BezierSpline; easing.bezierCurve: root.easeCurve } }
        Behavior on gy { enabled: flyer.armed; NumberAnimation { duration: root.easeMs; easing.type: Easing.BezierSpline; easing.bezierCurve: root.easeCurve } }
        Behavior on gw { enabled: flyer.armed; NumberAnimation { duration: root.easeMs; easing.type: Easing.BezierSpline; easing.bezierCurve: root.easeCurve } }
        Behavior on gh { enabled: flyer.armed; NumberAnimation { duration: root.easeMs; easing.type: Easing.BezierSpline; easing.bezierCurve: root.easeCurve } }
        SpringValue { id: flyFade; spring: root.springEffects; target: flyer.target ? 1 : 0 }
        // On whole pixels: a window drawn at a fraction of a pixel is
        // resampled, soft, and would snap sharp at the hand-off.
        x: Math.round(flyer.gx)
        y: Math.round(flyer.gy)
        width: Math.round(flyer.gw)
        height: Math.round(flyer.gh)
        visible: !!root.ghosted[address]
        opacity: flyFade.value
        transform: Rotation {
          origin.x: flyer.width / 2
          origin.y: flyer.height / 2
          axis { x: 0; y: 1; z: 0 }
          angle: flyer.look.tilt
        }
        Component.onCompleted: root.ghostItems[address] = flyer
        Component.onDestruction: if (root.ghostItems[address] === flyer) delete root.ghostItems[address]

        // How far along its flight the ghost is, 0 at the start, 1 landed.
        readonly property real travel: {
          if (!lastTarget) return 1
          var d = Math.hypot(lastTarget.x - fx, lastTarget.y - fy)
          return d < 1 ? 1 : Math.min(1, Math.hypot(x - fx, y - fy) / d)
        }

        // Rounded like the window it is a copy of.
        RoundedClip {
          anchors.fill: parent
          radius: flyer.props.rounding

          // The blurred wallpaper behind the window, as Hyprland draws it in
          // the focus area; cards sit on the sharp wallpaper (look.blurOpacity).
          Item {
            anchors.fill: parent
            clip: true
            opacity: flyer.look.blurOpacity

            ShaderEffect {
              x: -flyer.x
              y: -flyer.y
              width: root.monW
              height: root.monH
              property variant source: wallBlurTex
            }
          }

          // ScreencopyView doesn't blend: it overwrites what is under it with
          // the window's own pixels and alpha. A translucent window (foot) then
          // wiped the blur patch and left the surface translucent, so the real
          // window behind showed through. Rendered alone into its own layer,
          // it is drawn over the patch with normal blending, at the window's
          // opacity on its tile.
          // Covers the ghost at the frame's own aspect, like a card's thumbnail.
          ScreencopyView {
            readonly property real aspect: sourceSize.width > 0 && sourceSize.height > 0 ? sourceSize.width / sourceSize.height : parent.width / Math.max(1, parent.height)
            anchors.centerIn: parent
            width: Math.max(parent.width, parent.height * aspect)
            height: Math.max(parent.height, parent.width / aspect)
            layer.enabled: flyer.visible
            opacity: flyer.look.contentOpacity
            captureSource: flyer.lastTarget && flyer.lastTarget.toplevel ? flyer.lastTarget.toplevel.wayland : null
            live: root.opened
          }
        }

        // The window's border: Hyprland's outside the window on its tile, the
        // card's inside the edge on a card. Colour moves on effects fast from
        // the start of the flight, as Hyprland's border leaf does.
        Item {
          x: -flyer.look.borderOffset
          y: -flyer.look.borderOffset
          width: flyer.width + flyer.look.borderOffset * 2
          height: flyer.height + flyer.look.borderOffset * 2

          BorderOverlay {
            borderSpec: root.borderAt(root.inactiveBorder, flyer.props.borderSize)
            radius: flyer.look.outerRadius
          }
          SpringValue { id: ghostActive; spring: root.springEffectsFast; animated: flyer.armed; target: (flyer.flying ? flyer.activeAtEnd : flyer.activeAtStart) ? 1 : 0 }
          BorderOverlay {
            borderSpec: root.borderAt(root.activeBorder, flyer.props.borderSize)
            radius: flyer.look.outerRadius
            opacity: ghostActive.value
            visible: opacity > 0
          }
        }
      }
    }

    // The focus area as the drop target.
    Rectangle {
      x: root.sideW + root.bandMargin / 2
      y: root.bandMargin / 2
      width: root.focusW - root.bandMargin
      height: root.monH - root.bandMargin
      radius: root.dropCorner
      color: root.dropFill
      border.color: root.dropOutline
      border.width: root.dropOutlineWidth
      SpringValue { id: focusDrop; spring: root.springEffects; target: root.dragOverFocus ? 1 : 0 }
      opacity: focusDrop.value
    }

    // The workspace group the card would land in.
    Repeater {
      model: root.headers

      delegate: Rectangle {
        id: groupDrop
        required property var modelData
        x: modelData.x - root.bandMargin / 2
        y: modelData.y - root.bandMargin / 2
        width: modelData.w + root.bandMargin
        height: modelData.h + root.bandMargin
        radius: root.dropCorner
        color: root.dropFill
        border.color: root.dropOutline
        border.width: root.dropOutlineWidth
        SpringValue {
          id: groupFade
          spring: root.springEffects
          target: root.dragTarget && root.dragTarget.id === groupDrop.modelData.id
            && root.dragWin && root.dragWin.wsId !== groupDrop.modelData.id ? 1 : 0
        }
        opacity: groupFade.value
      }
    }

    Item {
      id: ghost
      visible: root.dragAddress !== ""
      // Grows a little once it's over the focus area, on the fast spring.
      SpringValue { id: grow; spring: root.springFast; epsilon: 0.001; target: root.dragOverFocus ? 1.25 : 1.05 }
      width: root.dragW * grow.value
      height: root.dragH * grow.value
      x: root.dragX - root.grabX * grow.value
      y: root.dragY - root.grabY * grow.value

      // Lifted: the filled card's dragged elevation, as the Web draws it.
      RectangularShadow {
        anchors.fill: parent
        radius: root.windowRounding
        blur: root.dragShadow.blur
        spread: root.dragShadow.spread
        offset: Qt.vector2d(root.dragShadow.x, root.dragShadow.y)
        color: Qt.alpha(root.scheme.color.shadow, root.dragShadow.opacity)
      }

      Rectangle {
        anchors.fill: parent
        radius: root.windowRounding
        color: root.placeholderColor
      }

      // Own layer so it blends, like the switch ghosts (see there).
      RoundedClip {
        anchors.fill: parent
        radius: root.windowRounding

        ScreencopyView {
          anchors.fill: parent
          layer.enabled: ghost.visible
          captureSource: root.dragWin && root.dragWin.toplevel ? root.dragWin.toplevel.wayland : null
          live: root.dragAddress !== ""
        }
      }

      // The dragged state layer.
      Rectangle {
        anchors.fill: parent
        radius: root.windowRounding
        color: root.dragLayer
      }

      BorderOverlay {
        borderSpec: root.activeBorder
        radius: root.windowRounding
      }
    }
  }
}
