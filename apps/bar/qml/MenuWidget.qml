// qmllint disable
// stef.bar: a close fork of Omarchy's menu bar widget (plugins/menu/BarWidget.qml) (MIT, © Basecamp / the
// Omarchy contributors); see upstream/README.md. Our changes are marked
// `stef.bar:`.
import QtQuick
import qs.Ui

BarWidget {
  id: root
  moduleName: "omarchy.menu"

  implicitWidth: button.implicitWidth
  implicitHeight: button.implicitHeight

  // stef.bar: an icon button like every other in the bar (interpretation bar.icons).
  BarIconButton {
    id: button
    anchors.fill: parent
    bar: root.bar
    text: "\ue900"
    fontFamily: "omarchy"
    onPressed: function(button) {
      if (!root.bar) return
      if (button === Qt.RightButton) root.bar.run("xdg-terminal-exec")
      else root.bar.run("omarchy-shell shell toggle omarchy.menu '{\"menu\":\"root\"}'")
    }
  }
}
