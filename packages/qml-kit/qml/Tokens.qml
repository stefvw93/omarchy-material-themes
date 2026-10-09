import QtQuick
import Quickshell
import Quickshell.Io
import "lib/kit.mjs" as Kit

// Design tokens for this plugin: the defaults baked in at build time,
// overridden live by ~/.config/omarchy/stef/tokens.json (Omaterial Studio or
// `stef tokens`). Vendored by @stef/plugin-kit; edit packages/qml-kit.
QtObject {
  id: tokens

  property var value: Kit.defaultTokens // qmllint disable missing-property
  readonly property var springs: Kit.springsOf(tokens.value) // qmllint disable missing-property

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
