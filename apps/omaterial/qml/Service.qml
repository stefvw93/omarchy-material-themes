import QtQuick
import Quickshell.Hyprland
import Quickshell.Io
import qs.Commons
import "lib/text.mjs" as Text

// Live text resizing for Omaterial themes (interpretation text.scale).
// `omarchy display text size` sets the shell's [font] base-size, but an
// Omaterial theme pins every type size, so nothing follows it. This service
// rescales the theme's sizes and text containers by base-size / 12 whenever
// the text size or the theme changes, from the unscaled sizes the theme ships
// in omaterial.json. What comes from the tokens (the type scale, the bar and
// its icon buttons) is taken from the live tokens.json, so Studio's changes
// apply without re-applying the theme. Under other themes there is no
// omaterial.json; it does nothing.
Item {
  id: root

  // Injected by omarchy-shell (the first-party service loader).
  property var shell: null
  property var manifest: null

  // omaterial.json's `text`, or null when the current theme isn't Omaterial.
  property var spec: null
  property string appliedGroupbar: ""

  // The user's design tokens, live from tokens.json.
  Tokens {
    id: tokens
    textBase: Style.fontBaseSize // qmllint disable missing-property
    onValueChanged: Qt.callLater(root.apply)
  }

  function apply() {
    if (!root.spec) return
    var base = Style.fontBaseSize // qmllint disable missing-property
    var spec = Text.liveSpec(root.spec, tokens.value, tokens.m3.comp) // qmllint disable missing-property
    var patch = Text.shellPatch(spec, base, Color.themeShellValues) // qmllint disable missing-property
    if (patch) {
      // Same path as a theme switch: the theme's values, then the user's on top.
      Color.themeShellValues = patch // qmllint disable missing-property
      Color.mergeShell() // qmllint disable missing-property
    }
    var lua = Text.groupbarLua(spec, base) // qmllint disable missing-property
    if (lua !== root.appliedGroupbar && !groupbarProc.running) {
      root.appliedGroupbar = lua
      if (lua) {
        groupbarProc.command = ["hyprctl", "eval", lua]
        groupbarProc.running = true
      }
    }
  }

  FileView {
    id: omaterialFile
    path: Color.currentThemePath + "/omaterial.json" // qmllint disable missing-property
    watchChanges: false
    printErrors: false
    onLoaded: {
      root.spec = Text.specOf(text()) // qmllint disable missing-property
      root.apply()
    }
    onLoadFailed: root.spec = null
  }

  // A theme switch replaces the theme's values (and omaterial.json with them);
  // a text size change moves base-size. Our own patch also lands here, and
  // finds nothing left to change. Both signals fire in the middle of
  // Style.applyShellValues, which would overwrite a patch merged from inside
  // it with the values it started from: apply once it has returned.
  Connections {
    target: Color // qmllint disable missing-property
    function onThemeShellValuesChanged() { Qt.callLater(omaterialFile.reload) }
  }
  Connections {
    target: Style // qmllint disable missing-property
    function onFontBaseSizeChanged() { Qt.callLater(root.apply) }
  }

  // A config reload puts back the group bar the theme was written with.
  Connections {
    target: Hyprland
    function onRawEvent(event) {
      if (event && event.name === "configreloaded") {
        root.appliedGroupbar = ""
        root.apply()
      }
    }
  }

  Process {
    id: groupbarProc
    onRunningChanged: if (!running) root.apply()
  }

  Component.onCompleted: omaterialFile.reload()
}
