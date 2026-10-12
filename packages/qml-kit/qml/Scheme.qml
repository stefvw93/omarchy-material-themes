import QtQuick
import Quickshell
import Quickshell.Io
import "lib/kit.mjs" as Kit

// The current theme's Material 3 colour scheme: `color.<role>` (e.g.
// scheme.color["surface-container-high"]). An Omaterial theme ships every
// role in omaterial.json; under other themes the roles are approximated from
// the five Omarchy colours in `omarchy` (interpretation qml.scheme-fallback),
// and `exact` is false. Bind `omarchy` to qs.Commons Color:
//   Scheme { omarchy: ({ background: Color.background, foreground: Color.foreground,
//                        accent: Color.accent, muted: Color.muted, urgent: Color.urgent }) }
// Vendored by @stef/plugin-kit; edit packages/qml-kit.
QtObject {
  id: scheme

  property var omarchy: ({
    background: "#101315", foreground: "#cacccc", accent: "#cacccc", muted: "#707880", urgent: "#a55555"
  })
  // ~/.local/state/omarchy/current: the theme Omarchy last applied.
  property string currentPath: Quickshell.env("HOME") + "/.local/state/omarchy/current"

  property string omaterialJson: ""
  readonly property var resolved: Kit.schemeOf(scheme.omaterialJson, { // qmllint disable missing-property
    background: String(scheme.omarchy.background), foreground: String(scheme.omarchy.foreground),
    accent: String(scheme.omarchy.accent), muted: String(scheme.omarchy.muted), urgent: String(scheme.omarchy.urgent)
  })
  readonly property bool exact: resolved.exact
  readonly property string mode: resolved.mode
  readonly property var color: resolved.color

  // Omarchy rewrites theme.name on every theme switch (the shell itself gets
  // the theme over IPC, not from files), so it is the signal to re-read.
  property FileView themeName: FileView {
    path: scheme.currentPath + "/theme.name"
    watchChanges: true
    printErrors: false
    onFileChanged: { reload(); scheme.omaterialFile.reload() }
  }
  property FileView omaterialFile: FileView {
    path: scheme.currentPath + "/theme/omaterial.json"
    printErrors: false
    onLoaded: scheme.omaterialJson = text()
    onLoadFailed: scheme.omaterialJson = ""
  }

  Component.onCompleted: scheme.omaterialFile.reload()
}
