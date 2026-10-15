pragma ComponentBehavior: Bound
import QtQuick
import qs.Commons
import "lib/model.mjs" as Model

// The one rule for every icon button in the bar, stock or ours
// (interpretation bar.icons; SPEC.md, Segments: Icon buttons): a single-glyph
// button is the bar's icon button wide, its icon box the icon size, and its
// glyph sized so its visible extent fills a Material icon's live area,
// whichever icon font it comes from. Vertically the glyph stays centred on its
// line, as Nerd Font draws its icons, but on a whole pixel: a line box centred
// at half a pixel put thin glyphs (the more icons' dots) a pixel off.
// Anything else (a percentage beside an icon) keeps the button's own sizing.
// Created by Bar.qml for each BarIconButton in a slot.
TextMetrics {
  id: fit

  required property Item button
  // Bar.qml: its `iconButton`, the width and icon size from the tokens.
  required property Item host
  readonly property int reference: 100
  readonly property string glyph: String(fit.button.text) // qmllint disable missing-property
  readonly property bool applies: Model.isSingleGlyph(fit.glyph) // qmllint disable missing-property
  readonly property real extentPerPx: Math.max(fit.tightBoundingRect.width, fit.tightBoundingRect.height) / fit.reference

  font.family: fit.button.fontFamily // qmllint disable missing-property
  font.pixelSize: fit.reference
  text: fit.glyph

  // The OpticalGlyph's Text in `item`: the one whose parent measures it.
  function glyphText(item) {
    var kids = item.children || []
    for (var i = 0; i < kids.length; i++) {
      var kid = kids[i]
      if (kid.baselineOffset !== undefined && kid.parent && kid.parent.tightWidth !== undefined) return kid // qmllint disable missing-property
      var found = fit.glyphText(kid)
      if (found) return found
    }
    return null
  }

  Component.onCompleted: {
    // qmllint disable missing-property
    fit.button.fontSize = Qt.binding(function() {
      return fit.applies ? Model.glyphFontSize(fit.host.iconButton.iconSize, fit.extentPerPx) : Style.bar.iconFont
    })
    fit.button.fixedWidth = Qt.binding(function() {
      return fit.button.vertical ? -1 : (fit.applies ? fit.host.iconButton.width : fit.button.slotSize)
    })
    fit.button.opticalSize = Qt.binding(function() {
      return fit.applies ? fit.host.iconButton.iconSize : Style.bar.iconCanvas
    })
    var glyph = fit.glyphText(fit.button)
    if (glyph) glyph.anchors.verticalCenterOffset = Qt.binding(function() {
      var y = (glyph.parent.height - glyph.height) / 2
      return Math.floor(y) - y
    })
    // qmllint enable missing-property
  }
}
