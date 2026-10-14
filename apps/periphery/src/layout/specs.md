# Layout (`src/layout`)

Places the windows of the other workspaces as cards in the bands, Mission Control style: each workspace is a group at its own scale, its windows packed in columns on the side they tile on, its tab groups piled up. Pure: windows and geometry in, cards and group headers out. Terms as in [SPEC.md](../../SPEC.md#ubiquitous-language).

## Input

- **Windows:** every window on the monitor that is not on the current workspace, with its workspace id and name, title, class, floating state, its real position and size (`rx`, `ry`, `rw`, `rh`, global pixels), its tab group (`tabGroup`: a key shared by the tabs of one Hyprland group, `""` for a window on its own) and whether it is the tab its tile shows (`shownTab`). Windows on special workspaces (id ≤ 0) are left out by the caller.
- **Current:** the id of the workspace in the focus area.
- **Geometry:** monitor width and height, `sideW`, `bandMargin`, `cardGap`, `groupGap`, `headerHeight`, and the space reserved at the monitor's top and bottom (`top`, `bottom`: the bar; 0 when absent).

## Bands

1. Each occupied workspace is a group.
2. Groups with a lower id than the current workspace go in the left band, groups with a higher id in the right band.
3. Each band orders its groups by id, from top to bottom.
4. Wrap rule: if the left band is empty and the right band has 2 or more groups, the group with the highest id moves to the left band. If the right band is empty and the left band has 2 or more groups, the group with the lowest id moves to the right band.

| Current | Occupied (others) | Left   | Right  |
| ------- | ----------------- | ------ | ------ |
| 1       | 2, 3, 4           | 4      | 2, 3   |
| 2       | 1, 3, 4           | 1      | 3, 4   |
| 4       | 1, 2, 3           | 2, 3   | 1      |
| 1       | 2                 | (none) | 2      |
| 3       | 1, 2              | 2      | 1      |
| 3       | 1                 | 1      | (none) |

## Reading order

Within a group, windows are in reading order: tiled windows first, left to right (x differing by more than 4 px), then top to bottom; floating windows last.

## Units

A group's windows form units, each placed as one block:

- A window on its own is a unit.
- The tabs of one tab group (the same non-empty `tabGroup`) are one unit, a **pile**. Its real rect is the tabs' bounding box. The shown tab is in front; the other tabs are behind it in input order, the first one furthest back. Without a shown tab, the last tab is in front.

A pile is `pileStep × min(pileMax, tabs − 1)` larger than one card, both ways (`pileStep` 7 px, `pileMax` 3). The front tab sits at the bottom right; each tab further back is `pileStep` further up and left, until `pileMax` steps; tabs beyond that sit at the last step. Every tab of a pile has the same card size: the pile's real rect at the group's scale.

The **tiled units** of a group are its units of tiled windows. Its floating windows are units only when the group has no tiled window (see [Floating windows](#floating-windows)).

## Columns

1. **Real columns.** Tiled units whose real x ranges overlap by more than 4 px are in the same real column, also through a chain (a wide window above two narrow ones makes one column of three). Real columns are ordered left to right. Within one, units run top to bottom by real y, then left to right.
2. **Candidates.** A group can be laid out in k columns, k from 1 to min(real columns, 3). For k smaller than the number of real columns, adjacent real columns are merged: of all the ways to split them into k runs, the one whose tallest column (in real pixels, summed heights) is lowest; ties go to the earlier split. A merged column holds its real columns' units one after another, left real column first; k = 1 puts every real column in one column that way.
3. **Packing at scale `s`.** A unit is its real size × `s` (plus the pile's extra). A column is as wide as its widest unit; its units are stacked `cardGap` apart, each centred in the column's width. Columns stand side by side, `cardGap` apart. A column shorter than the tallest is centred against it (a staggered masonry). The packed width and height are the bounding box of the columns.

## Floating windows

In a group with tiled windows, a floating window's card overlaps the tiled cards where the window really sits:

- Its size is its real size × the group's scale.
- Its centre maps from the bounding box of the group's tiled windows (real rects) onto the packed rect, both axes independently.
- It is kept inside the group's body: the packed width, and the group's height (below). A card larger than the body in one axis is centred on it in that axis.
- The group's height is the larger of the packed height and its tallest floating card.

## Scale

Every group of a band gets its own scale:

1. **Width-limited scale** per candidate: the largest `s`, at most `maxScale` (0.5), at which the packing is at most `bandW = sideW − 2 × bandMargin` wide and at most the band's free height tall (below).
2. **Common factor.** Each group uses a candidate. Every group's scale is its candidate's width-limited scale × one factor μ, the largest μ ≤ 1 at which the groups' heights fit the band's free height: `bandH − 2 × bandMargin − groups × headerHeight − (groups − 1) × groupGap`, where `bandH = monH − top − bottom`.
3. **Choice.** The candidates are the combination that gives the largest product of the groups' scales. With more than 729 combinations, every group takes its candidate with the most columns.

Consequence: a lone window fills the band's width, unless that makes it more than half its real size or too tall.

## Placement

- The band spans from `top` to `monH − bottom`: the bar keeps the full width above or below it. The left band's inner area starts at x = `bandMargin`, the right band's at x = `monW − sideW + bandMargin`.
- Groups stack top to bottom: a header of `headerHeight`, then the group's body, then `groupGap` before the next header. The stack is centred vertically in the band.
- A group's packed columns are centred horizontally in the band's inner width.

## Stacking

Each card has a `z`: within a band, a higher `z` is drawn in front. Tiled cards (and floating cards of a group without tiled windows) have `z` 0 + the tab's place in its pile from the back (0 for a window on its own); floating cards in a group with tiled windows have 100 + the same.

## Fan

A pile can fan out (the plugin opens it when one of its tabs is selected). For every tab of a pile, the layout also gives its **fan rect**:

- The tabs keep their card size and line up vertically, from the furthest back at the top to the front tab at the bottom, each `cardH / 2` below the one before: every tab shows at least its top half.
- Horizontally the fan is centred on the pile; it is kept inside the band's inner width.
- Vertically the fan is centred on the pile, then kept inside the band (between `top + bandMargin` and `monH − bottom − bandMargin`). When the band is too short for half-height steps, the steps shrink to fit.
- A window on its own has no fan rect (`null`).

## Headers

Each group has a header: its workspace label, `headerHeight` tall, directly above the group's topmost card. The header's rect spans the band's inner width and reaches down to the group's lowest card. It is also the drop target of the group.

## Output

- **Cards** keyed by window address: the window's fields (address, title, class, workspace id, and anything else the caller passed along) without its real rect, with the card rect `x`, `y`, `w`, `h` in monitor-local pixels (at rest), `z`, `pile` (its tab group key, `""` for a window on its own) and `fan` (its fan rect, or `null`).
- **Headers:** `{ id, label, x, y, w, h }` per group, left band first, each band top to bottom.
- **Left and right:** the workspace ids per band, in order.
