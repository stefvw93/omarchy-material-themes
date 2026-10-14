# Lock: rules

An Omarchy shell `service` plugin that clones the stock lock screen (`omarchy.lock`), built with `@stef/plugin-kit`. [README.md](README.md) covers install and recovery, [SPEC.md](SPEC.md) the behaviour.

- `qml/Service.qml` is Omarchy's, untouched. Never edit it: a test fails if it differs from `upstream/Service.qml`. Follow Omarchy updates through [upstream/README.md](upstream/README.md).
- `qml/LockView.qml` is ours. It keeps the stock view's properties and signals exactly (`Service.qml` binds them) and the stock behaviour listed in SPEC.md. Logic of ours goes in `src/view/` with tests, not in QML functions.
- `tests/compile.engine.qml` is the deploy gate. Keep it passing; extend it when the view's interface grows.
- Never lock the session from here (`omarchy-shell lock lock`). See the view with `omarchy-shell lock preview`, a `grim` screenshot, then `omarchy-shell lock hidePreview`. A real lock and unlock is the user's hand-check.
- Deploys restart the shell: post a `heads-up` on the agent board first.
- QML style as in `apps/bar/CLAUDE.md`: `pragma ComponentBehavior: Bound`, qualified ids, same-line `// qmllint disable <category>` only where qmllint can't type.
