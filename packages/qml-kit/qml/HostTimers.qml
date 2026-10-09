import QtQuick

// One-shot timers for an Effect core (`@stef/effect-platform-qml`): Quickshell's
// JS engine has no setTimeout, so the core's clock runs on QML Timers.
// Vendored by @stef/plugin-kit; edit packages/qml-kit.
QtObject {
  id: timers

  property Component timerComponent: Component {
    Timer { repeat: false }
  }

  function start(callback, ms) {
    var timer = timers.timerComponent.createObject(timers, { interval: ms })
    timer.triggered.connect(function() { callback(); timer.destroy() })
    timer.start()
    return timer
  }

  function stop(timer) {
    timer.stop()
    timer.destroy()
  }
}
