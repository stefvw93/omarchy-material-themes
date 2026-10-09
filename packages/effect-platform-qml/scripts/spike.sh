#!/usr/bin/env bash
# Runs dist/qml/spike.mjs inside Quickshell's QML engine (headless `qs -p`,
# offscreen) with a QML Timer-backed host, and prints the SPIKE report lines.
set -euo pipefail
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cp -r dist/qml "$tmp/lib"
cat > "$tmp/Runner.qml" <<'QML'
import QtQuick
import "lib/spike.mjs" as Spike

QtObject {
  function start(host, done) { Spike.run(host, done) }
}
QML
cat > "$tmp/shell.qml" <<'QML'
import Quickshell
import QtQuick

ShellRoot {
  id: root

  Component {
    id: timerComponent
    Timer { repeat: false }
  }

  Component.onCompleted: {
    const host = {
      startTimer: function (callback, ms) {
        const t = timerComponent.createObject(root, { interval: ms })
        t.triggered.connect(function () { callback(); t.destroy() })
        t.start()
        return t
      },
      stopTimer: function (t) { t.stop(); t.destroy() },
      log: function (message) { console.log(message) },
    }
    // Compiling the runner evaluates the bundle: the cost a plugin pays on open.
    const tLoad = Date.now()
    const runner = Qt.createComponent("Runner.qml").createObject(root)
    console.log("SPIKE module-load ok " + JSON.stringify({ ms: Date.now() - tLoad }))
    const t0 = Date.now()
    runner.start(host, function () {
      console.log("SPIKE done ok " + JSON.stringify({ totalMs: Date.now() - t0 }))
    })
    console.log("SPIKE sync-section ok " + JSON.stringify({ ms: Date.now() - t0 }))
  }
}
QML
out=$(QT_QPA_PLATFORM=offscreen timeout 8 qs -p "$tmp/shell.qml" 2>&1 & pid=$!; sleep 5; kill $pid 2>/dev/null; wait $pid 2>/dev/null) || true
grep -a -oE "SPIKE .*" <<<"$out" || { echo "no SPIKE output; engine said:" >&2; grep -a -E "Error|error|Unexpected|unavailable|not defined" <<<"$out" | head -20 >&2; exit 1; }
grep -a -E "TypeError|ReferenceError|SyntaxError|Unexpected|unavailable" <<<"$out" | head -10 >&2 || true
ls -l dist/qml/*.mjs | awk '{print "SIZE", $5, $9}'
! grep -aq "SPIKE .* FAIL" <<<"$out"
