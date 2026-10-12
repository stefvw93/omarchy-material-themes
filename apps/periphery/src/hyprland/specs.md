# Hyprland strings (`src/hyprland`)

What the plugin reads from and writes to Hyprland as text: the workspace animation, the selection state for the hook, and the decoration options. Pure: strings and numbers in, strings and numbers out. Behaviour as in [SPEC.md](../../SPEC.md#hyprlands-workspace-animation).

## Workspace animation

Input: the output of `hyprctl animations -j`. That is either a list of animations or a list whose first element is that list (followed by the curves).

The animation call for the leaf `workspaces`, rebuilt as Lua:

- Not found: an empty string.
- Disabled, and no style given: `hl.animation({ leaf = "workspaces", enabled = false })`.
- Otherwise `hl.animation({ leaf = "workspaces", enabled = true, speed = <speed>, <curve>, style = "<style>" })`:
  - the curve is `spring = "<name>"` when Hyprland reports `bezier` as `spring:<name>`, else `bezier = "<name>"`, left out when empty;
  - the style is the given style (to set the mode's style with the theme's curve and speed), else the animation's own, left out when neither exists.
- Input that is not JSON throws.

The off call is also available on its own, for a flight's switch.

## Card travel

How far cards travel with a workspace switch, following Hyprland's style string:

- No `slide` in the style: 0.
- A percentage in the style (`slidefade 10%`): that share of the monitor's extent on the slide's axis.
- Otherwise the whole extent.
- The axis is vertical when the style contains `vert` (height), else horizontal (width).

## Selection state for the hook

The `hyprctl eval` string that hands the plugin's state to `hypr.lua`:

- Mode off: `if periphery_close then periphery_close() end`.
- Mode on: `if periphery_open then periphery_open(<left>, <right>, <x0>, <x1>, <y0>, <y1>); periphery_select(<selected>) end`
  - `left`, `right`: whether each band has cards (`true`/`false`);
  - `x0`, `x1`: the focus area's left and right edge, `y0`, `y1`: the monitor's top and bottom, global pixels, rounded;
  - `selected`: the address in double quotes, or `nil`.
- An address that is not `0x` followed by hex digits counts as no selection: nothing but an address ever reaches Lua code.
- The `if … then` guard keeps the eval harmless when the hook is not loaded.

## Decoration

From the output of `hyprctl -j getoption general:border_size; hyprctl -j getoption decoration:rounding` (two JSON objects, one after the other): the border width and the rounding, each as an integer, or absent when not found.

## Blur

From the output of `hyprctl -j getoption` for `decoration:blur:enabled`, `size`, `passes`, `contrast`, `brightness` and `vibrancy` (JSON objects, one after the other; `enabled` is a bool, `size` and `passes` ints, the rest floats): each value, or absent when not found.

The ghost's `MultiEffect` settings from those (interpretation `periphery.ghost-blur`, SPEC.md [What a ghost copies from its window](../../SPEC.md#what-a-ghost-copies-from-its-window)):

- radius: size × 2^passes; 0 when blur is off, or size or passes is missing;
- `blurMax` 64; `blur` = min(1, radius / 64); `blurMultiplier` = max(0, radius / 64 − 1), so `blurMax × blur × (1 + blurMultiplier)` is the radius;
- `contrast` = contrast − 1, `brightness` = brightness − 1, `saturation` = vibrancy; a missing one is 0 (no change).

## Window properties

What a ghost copies from its window: `opacity`, `opacity_inactive`, `border_size` and `rounding`.

- The `hyprctl --batch` argument that reads them: `j/getprop address:<a> <prop>` for each address and property, in that order, joined with `;`. Only addresses (`0x` and hex digits) are asked for; others are skipped.
- Its output has one block per query, in the order asked, separated by blank lines: a JSON object `{"<prop>": <number>}`, or an error text (`window not found` for a window that closed meanwhile). The result maps each address to `{ opacity, opacityInactive, borderSize, rounding }`. A window with any of the four missing is left out.

## Flight batch

The `hyprctl --batch` argument of a flight's switch (SPEC.md, The Exposé flight, step 2), in order:

1. `dispatch hl.dsp.window.set_prop({ window = "address:<a>", prop = "no_shadow", value = "1" })` for each window to keep shadowless;
2. `eval` of the workspace animation off call;
3. the switch: `dispatch hl.dsp.focus({ window = "address:<a>" })` for a flight to a window, or `eval if periphery_run then periphery_run(<token>) end` for a routed switch.

Joined with `;`. The shadows come back with `value = "unset"` in the same form (so a window rule's `no_shadow` stays). Only addresses reach these strings: others are skipped, and a flight to something that isn't an address has no switch step.

## Routed switch

The `hyprctl eval` string that runs a routed switch without a flight: `if periphery_run then periphery_run(<token>) end`. The token comes over IPC as text: only a whole number from 1 up (digits only) is a token. Anything else gives an empty string: nothing but a number reaches Lua code.

## Shown tabs

The arguments of the `tabs` IPC call (one string, addresses separated by spaces): the set of shown tabs. Only addresses count; the rest is dropped. Addresses are compared lower-case.
