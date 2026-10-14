# Bar (`stef.bar`)

A replacement for the Omarchy bar. It is a close fork of the stock bar ([upstream/](upstream/README.md)), so every widget, command module and gesture keeps working. On top of that, the bar narrows to Periphery's focus area on the tokens' springs. M3 versions of the widgets follow in later milestones. [SPEC.md](SPEC.md) has the behaviour.

## Install

```bash
pnpm stef deploy bar --dev   # try it: selects stef.bar.dev as the bar
pnpm stef undeploy bar       # remove the dev build: the bar you had before comes back
pnpm stef deploy bar         # make stef.bar your bar
```

The shell selects a bar with `shell.json` `bar.id`. Without it, or when the selected bar fails to load, the stock `omarchy.bar` runs. The widgets and their order still come from `shell.json` `bar.layout`.

## Check that it works

```bash
omarchy-shell shell debugBarGeometry   # one row per configured entry
hyprctl layers -j | jq '.[].levels."2"[] | select(.namespace == "omarchy-bar")'
```

With Periphery on, the bar floats over the focus area as a pill; off, it spans the screen.
