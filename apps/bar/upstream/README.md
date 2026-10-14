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
