# Upstream

`Service.qml`, `LockView.qml` and `manifest.json` are Omarchy's stock lock screen (`/usr/share/omarchy/shell/plugins/lock/`, MIT, © Basecamp / the Omarchy contributors), untouched: **omarchy 4.0.4-1**.

- `qml/Service.qml` must stay byte-identical to `upstream/Service.qml` (a test checks it): the lock's logic is Omarchy's.
- `qml/LockView.qml` started from `upstream/LockView.qml` and keeps its interface: the properties and signals `Service.qml` binds.

To follow an Omarchy update (the upstream test fails):

```bash
diff -u apps/lock/upstream/Service.qml /usr/share/omarchy/shell/plugins/lock/Service.qml
diff -u apps/lock/upstream/LockView.qml /usr/share/omarchy/shell/plugins/lock/LockView.qml
```

Copy the new `Service.qml` over both `upstream/` and `qml/`, carry interface or behaviour changes in the stock `LockView.qml` over to ours, replace `upstream/LockView.qml` and `manifest.json`, and update the version above.
