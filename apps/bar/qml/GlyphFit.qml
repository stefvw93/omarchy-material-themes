pragma ComponentBehavior: Bound
import QtQuick
import qs.Commons
import "lib/model.mjs" as Model

// The one rule for every icon button in the bar, stock or ours
// (interpretation bar.icons; SPEC.md, Segments: Icon buttons): a single-glyph
// button is the theme's icon slot wide, and its glyph is sized so its visible
// extent fills a Material icon's live area, whichever icon font it comes from.
// Anything else (a percentage beside an icon) keeps the button's own sizing.
// Created by Bar.qml for each BarIconButton in a slot.
TextMetrics {
  id: fit

  required property Item button
  readonly property int reference: 100
  readonly property string glyph: String(fit.button.text) // qmllint disable missing-property
  readonly property bool applies: Model.isSingleGlyph(fit.glyph) // qmllint disable missing-property
  readonly property real extentPerPx: Math.max(fit.tightBoundingRect.width, fit.tightBoundingRect.height) / fit.reference

  font.family: fit.button.fontFamily // qmllint disable missing-property
  font.pixelSize: fit.reference
  text: fit.glyph

  Component.onCompleted: {
    // qmllint disable missing-property
    fit.button.fontSize = Qt.binding(function() {
      return fit.applies ? Model.glyphFontSize(Style.bar.iconCanvas, fit.extentPerPx) : Style.bar.iconFont
    })
    fit.button.fixedWidth = Qt.binding(function() {
      return fit.button.vertical ? -1 : (fit.applies ? Style.bar.iconSlot : fit.button.slotSize)
    })
    // qmllint enable missing-property
  }
}
