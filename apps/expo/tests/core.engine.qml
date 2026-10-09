import Quickshell
import QtQuick
import "plugin/lib/core.mjs" as Core
import "plugin" as Plugin

// The exposé's Effect core inside Quickshell's real QML engine, with QML
// Timers as its clock: open lays out at once, a burst of events is folded
// into one refresh and one snapshot 80 ms later, other events are ignored.
ShellRoot {
  id: test

  Plugin.HostTimers { id: timers }

  property var toplevels: [
    { ipc: { address: "0x1", workspace: { id: 2, name: "2" }, at: [0, 0], size: [800, 600] }, address: "0x1", title: "", ref: null },
  ]
  property var relayouts: []
  property int refreshes: 0
  property var core: null

  readonly property var host: ({
    startTimer: timers.start,
    stopTimer: timers.stop,
    log: function(message) { console.log("ENGINE-FAIL core log: " + message) },
    refresh: function() { test.refreshes++ },
    toplevels: function() { return test.toplevels },
    relayout: function(groups) { test.relayouts = test.relayouts.concat([groups]) },
  })

  function fail(why) { console.log("ENGINE-FAIL " + why); Qt.quit() }

  Component.onCompleted: {
    test.core = Core.start(test.host)
    test.core.dispatch({ _tag: "Open", monX: 0, monY: 0 })
    step1.start()
  }

  Timer {
    id: step1
    interval: 120
    onTriggered: {
      if (test.relayouts.length !== 1) return test.fail("open: expected 1 relayout, got " + test.relayouts.length)
      if (test.relayouts[0][0].windows[0].address !== "0x1") return test.fail("open: wrong snapshot")
      if (test.refreshes !== 1) return test.fail("open: expected 1 refresh, got " + test.refreshes)
      test.toplevels = test.toplevels.concat([
        { ipc: { address: "0x2", workspace: { id: 3, name: "3" }, at: [10, 10], size: [400, 300] }, address: "0x2", title: "", ref: null },
      ])
      test.core.dispatch({ _tag: "RawEvent", name: "openwindow" })
      test.core.dispatch({ _tag: "RawEvent", name: "movewindowv2" })
      test.core.dispatch({ _tag: "RawEvent", name: "activelayout" })
      step2.start()
    }
  }

  Timer {
    id: step2
    interval: 40
    onTriggered: {
      if (test.relayouts.length !== 1) return test.fail("burst: relaid out before the 80 ms delay")
      step3.start()
    }
  }

  Timer {
    id: step3
    interval: 120
    onTriggered: {
      if (test.refreshes !== 2) return test.fail("burst: expected one more refresh, got " + (test.refreshes - 1))
      if (test.relayouts.length !== 2) return test.fail("burst: expected 2 relayouts, got " + test.relayouts.length)
      if (test.relayouts[1].length !== 2) return test.fail("burst: expected 2 workspaces")
      test.core.dispose()
      console.log("ENGINE-PASS")
      Qt.quit()
    }
  }
}
