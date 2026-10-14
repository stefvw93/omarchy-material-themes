import Quickshell
import QtQuick
import "plugin/lib/view.mjs" as View

// engine-platform: wayland

// The deploy gate: a lock clone that doesn't compile leaves nothing to answer
// `omarchy-shell lock lock`, so the session silently stops locking. Both files
// must compile in Quickshell's engine, and the view must come up with the
// props and signals the stock service binds. The service is only compiled,
// never created: creating it would take a real session lock.
ShellRoot {
  id: test

  function fail(why) { console.log("ENGINE-FAIL " + why); Qt.quit() }
  function errors(c) { return c.errorString().replace(/\n/g, " | ") }
  // The shell loads a plugin's entry point by file URL (PluginRegistry
  // entryPointUrl); the qs: URL scheme doesn't find LockView as a sibling type.
  function pluginUrl(file) { return "file://" + Quickshell.shellDir + "/plugin/" + file }

  Component.onCompleted: {
    // The view's logic must evaluate in this engine, not only in Node.
    if (View.initialOf("_stef") !== "S") return test.fail("view.mjs: initialOf")
    if (View.canSubmit({ inputEnabled: true, passwordLength: 1, authenticating: false }) !== true) return test.fail("view.mjs: canSubmit")
    const view = Qt.createComponent(test.pluginUrl("LockView.qml"))
    if (view.status !== Component.Ready) return test.fail("LockView.qml: " + test.errors(view))

    const service = Qt.createComponent(test.pluginUrl("Service.qml"))
    if (service.status !== Component.Ready) return test.fail("Service.qml: " + test.errors(service))

    const submitted = []
    const instance = view.createObject(test, {
      backgroundPath: "",
      backgroundVersion: 0,
      fingerprintConfigured: true,
      authenticatingPassword: false,
      failureMessage: "",
      failedAttempts: 0,
      inputEnabled: true,
      loadBackground: false,
      passwordText: "",
    })
    if (!instance) return test.fail("LockView.qml: createObject returned null")
    for (const signal of ["submitPassword", "passwordTextEdited", "clearFailureRequested", "wakeRequested"]) {
      if (typeof instance[signal] !== "function") return test.fail("LockView.qml: no signal " + signal)
    }
    instance.submitPassword.connect(function(password) { submitted.push(password) })
    instance.submitPassword("x")
    if (submitted.length !== 1) return test.fail("LockView.qml: submitPassword did not emit")
    instance.failureMessage = "Wrong password"
    instance.authenticatingPassword = true
    instance.destroy()
    console.log("ENGINE-PASS")
    Qt.quit()
  }
}
