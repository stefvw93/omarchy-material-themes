# Lock (`stef.lock`): spec

An Omarchy shell `service` plugin, cloned from `omarchy.lock`. Status: v1 (view).

## Behaviour

- **Logic is stock.** `qml/Service.qml` is Omarchy's own, byte-identical (a test checks it): locking, PAM password and fingerprint, failed attempts, wake and blank, stranded-lock recovery and the `lock` IPC target all behave as in `omarchy.lock`.
- **The view keeps the stock interface.** It takes `backgroundPath`, `backgroundVersion`, `fingerprintConfigured`, `authenticatingPassword`, `failureMessage`, `failedAttempts`, `inputEnabled`, `loadBackground`, `passwordText`, and emits `submitPassword`, `passwordTextEdited`, `clearFailureRequested`, `wakeRequested`.
- **The view keeps the stock behaviour.** Typing wakes the screen and clears a shown failure; Enter submits; Escape or Ctrl+U clears the field; a click or mouse move wakes; the field takes focus whenever input is enabled; the dots shrink to fit a long password.

## The view

Which M3 component each part is: interpretation `lock.components`.

| Part            | What                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------ |
| Wallpaper       | The current background, sharp, under the scrim (scrim role, 32%).                          |
| Clock           | Time (display-large) and date (title-medium), white.                                       |
| Avatar          | 96dp circle: `~/.face`, else the user name's initial on primary-container.                 |
| Name            | `$USER`, title-large, white.                                                               |
| Password        | Filled text field, always focused: 2dp primary active indicator, error in the error state. |
| Fingerprint     | Leading glyph in the field when a sensor is enrolled.                                      |
| Submit          | Arrow icon button in the field; disabled while the field is empty or a check runs.         |
| Supporting text | The failure (error), or "Checking…" while PAM runs.                                        |

## Safety

A lock that doesn't load leaves nothing answering `omarchy-shell lock lock`: idle, the keybind and sleep stop locking. So:

- `stef deploy lock` refuses unless the view lints and both files compile in Quickshell's engine (`tests/compile.engine.qml`), and only finishes once `lock status` answers from the clone; otherwise it puts the stock lock back.
- `stef-lock-rescue`, installed by deploy, brings the stock lock back from a TTY (README.md).

## Out of scope (v1)

- The status row (battery, network, keyboard layout).
- Anything in `Service.qml`.
