# Lock (`stef.lock`)

An M3 lock screen for Omarchy. It is a clone of the stock lock (`omarchy.lock`): `qml/Service.qml` is Omarchy's own, untouched (session lock, PAM password and fingerprint, wake and blank, stranded-lock recovery), and only `qml/LockView.qml`, what you see, is ours. [upstream/](upstream/README.md) holds the stock files it follows. [SPEC.md](SPEC.md) has the view.

While `stef.lock` is enabled, the shell keeps `omarchy.lock` disabled and gives the clone the lock's `authentication` capability; disabling `stef.lock` puts the stock lock back.

## Install

```bash
pnpm stef deploy lock --dev   # try it as stef.lock.dev
pnpm stef undeploy lock       # remove the dev build: the stock lock comes back
pnpm stef deploy lock         # make stef.lock your lock
```

Deploy only finishes once the lock answers (`omarchy-shell lock status`); if it doesn't, deploy puts the stock lock back and fails. It also installs `~/.local/bin/stef-lock-rescue`.

## See it without locking

```bash
omarchy-shell lock preview       # the view as an overlay; click to dismiss
omarchy-shell lock hidePreview
```

Changes to the view need `omarchy-restart-shell` (the lock stays loaded across plugin reloads); deploy does that.

## If the lock gets stuck

When the lock screen is up but won't unlock:

1. Press **Ctrl+Alt+F2** for a text console and log in.
2. Run `stef-lock-rescue`.
3. Press **Ctrl+Alt+F1** to go back, and unlock with the stock lock screen.

`stef-lock-rescue` disables `stef.lock` through the running shell, which brings `omarchy.lock` back; the stock lock notices the session is still locked and takes it over. If the shell doesn't answer, it removes `stef.lock` from `~/.config/omarchy/shell.json` (a backup is kept next to it) and restarts the shell. `omarchy-restart-shell` alone won't do: it refuses while a lock is held. If both fail, reboot: Hyprland never opens the session unlocked.
