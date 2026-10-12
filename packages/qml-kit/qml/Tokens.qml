import QtQuick
import Quickshell
import Quickshell.Io
import "lib/kit.mjs" as Kit

// Design tokens for this plugin: the defaults baked in at build time,
// overridden live by ~/.config/omarchy/stef/tokens.json (Omaterial Studio or
// `stef tokens`). `m3` is every Material 3 value they resolve to, in px.
// Vendored by @stef/plugin-kit; edit packages/qml-kit.
QtObject {
  id: tokens

  // The user's Omarchy text size; bind to Style.fontBaseSize so m3.type
  // follows it (interpretation text.scale). 12 is 1×.
  property int textBase: 12

  property var value: Kit.defaultTokens // qmllint disable missing-property
  readonly property var springs: Kit.springsOf(tokens.value) // qmllint disable missing-property
  readonly property var m3: Kit.resolveM3(tokens.value, tokens.textBase) // qmllint disable missing-property

  property FileView file: FileView {
    path: Quickshell.env("HOME") + "/" + Kit.tokensFile // qmllint disable missing-property
    watchChanges: true
    printErrors: false
    onLoaded: tokens.value = Kit.resolveTokens(text()) // qmllint disable missing-property
    // text() is stale in the change signal itself; reload, then onLoaded parses.
    onFileChanged: reload()
    onLoadFailed: tokens.value = Kit.defaultTokens // qmllint disable missing-property
  }
}
