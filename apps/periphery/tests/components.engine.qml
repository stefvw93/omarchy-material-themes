import Quickshell
import QtQuick
import "plugin" as Plugin

// The window parts in Quickshell's real QML engine: a SpringRect settles on
// its target and jumps while not animated, a WindowCopy without a frame
// fills its box, and a WindowBorder's active border fades in.
ShellRoot {
  id: test

  function fail(why) { console.log("ENGINE-FAIL " + why); Qt.quit() }
  function near(a, b) { return Math.abs(a - b) < 0.5 }

  // What WindowBorder reads from the plugin root.
  readonly property var host: ({
    springEffectsFast: { stiffness: 3800, ratio: 1 },
    inactiveBorder: { color: "#444444", gradient: null },
    activeBorder: { color: "#88aaff", gradient: null },
    borderAt: function(spec, width) { return { color: spec.color, gradient: spec.gradient, widths: { top: width, right: width, bottom: width, left: width } } },
  })

  Plugin.SpringRect {
    id: rect
    spring: ({ stiffness: 1400, ratio: 0.9 })
    target: ({ x: 0, y: 0, w: 10, h: 10 })
  }

  Plugin.SpringRect {
    id: still
    animated: false
    target: ({ x: 0, y: 0, w: 10, h: 10 })
  }

  Item {
    width: 200
    height: 100

    Plugin.WindowCopy { id: copy; anchors.fill: parent; radius: 12 }
    Plugin.WindowBorder { id: border; host: test.host; borderWidth: 3; radius: 12 }
  }

  Component.onCompleted: {
    rect.target = { x: 100, y: 50, w: 40, h: 20 }
    still.target = { x: 7, y: 8, w: 9, h: 10 }
    if (!(still.x === 7 && still.y === 8 && still.w === 9 && still.h === 10)) test.fail("SpringRect not animated didn't jump: " + [still.x, still.y, still.w, still.h])
    if (!rect.running) test.fail("SpringRect didn't start moving")
    if (copy.hasContent) test.fail("WindowCopy has content without a window")
    border.active = true
    settle.start()
  }

  Timer {
    id: settle
    interval: 1000
    onTriggered: {
      if (rect.running || !(test.near(rect.x, 100) && test.near(rect.y, 50) && test.near(rect.w, 40) && test.near(rect.h, 20)))
        return test.fail("SpringRect didn't settle on its target: " + [rect.x, rect.y, rect.w, rect.h, rect.running])
      var view = copy.children[0].children[0]
      if (!(view && view.width === 200 && view.height === 100)) return test.fail("WindowCopy without a frame doesn't fill its box: " + (view ? [view.width, view.height] : "no view"))
      if (border.children[1].opacity !== 1) return test.fail("WindowBorder's active border didn't fade in: " + border.children[1].opacity)
      console.log("ENGINE-PASS")
      Qt.quit()
    }
  }
}
