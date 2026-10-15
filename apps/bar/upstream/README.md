# Upstream

`qml/Bar.qml` and `qml/BarModel.js` are a close fork of Omarchy's stock bar
(`/usr/share/omarchy/shell/plugins/bar/`, MIT, © Basecamp / the Omarchy
contributors). This folder holds the untouched upstream files the fork is based
on: **omarchy 4.0.4-1**.

To follow an Omarchy update: diff the new upstream against these files, apply
the changes to `qml/`, then replace these files with the new upstream and
update the version above.

```bash
diff -u apps/bar/upstream/Bar.qml /usr/share/omarchy/shell/plugins/bar/Bar.qml
diff -u apps/bar/upstream/Bar.qml apps/bar/qml/Bar.qml   # our changes
```

## Forked widgets

`upstream/widgets/` holds the stock widgets stef.bar draws from its own forks
(`qml/*Widget.qml`, plus `qml/TrayModel.js` unchanged), from the same Omarchy
version. Bar.qml's `forkedWidgets` maps their ids to the forks.

| Fork                         | Upstream                                       |
| ---------------------------- | ---------------------------------------------- |
| `qml/MenuWidget.qml`         | `plugins/menu/BarWidget.qml`                   |
| `qml/WorkspacesWidget.qml`   | `plugins/bar/widgets/Workspaces.qml`           |
| `qml/IndicatorsWidget.qml`   | `plugins/bar/widgets/Indicators.qml`           |
| `qml/TrayWidget.qml`         | `plugins/bar/widgets/Tray.qml` (+ `TrayModel.js`) |

```bash
diff -u apps/bar/upstream/widgets/Tray.qml /usr/share/omarchy/shell/plugins/bar/widgets/Tray.qml
diff -u apps/bar/upstream/widgets/Tray.qml apps/bar/qml/TrayWidget.qml   # our changes
```

The indicators fork loads Omarchy's own indicators (`Dnd.qml`, …) from its
install (`$OMARCHY_PATH/shell/plugins/bar/indicators/`), as the bar loads every
other stock widget.
