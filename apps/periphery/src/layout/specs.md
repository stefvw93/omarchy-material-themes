# Layout (`src/layout`)

Places the windows of the other workspaces as cards in the bands, Mission Control style: each workspace is a group at its own scale, its windows packed in columns on the side they tile on, its tab groups piled up. Cards never overlap, except the tabs of a pile. Pure: windows and geometry in, cards and group headers out. Terms as in [SPEC.md](../../SPEC.md#ubiquitous-language).

## Input

- **Windows:** every window on the monitor that is not on the current workspace, with its workspace id and name, title, class, floating state, its real position and size (`rx`, `ry`, `rw`, `rh`, global pixels), its tab group (`tabGroup`: a key shared by the tabs of one Hyprland group, `""` for a window on its own) and whether it is the tab its tile shows (`shownTab`). Windows on special workspaces (id ≤ 0) are left out by the caller.
- **Current:** the id of the workspace in the focus area.
- **Open pile:** the tab group key of the pile that is open (`""` for none). The plugin opens the pile of the selected card.
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
- The tabs of the **open pile** are units on their own, in input order: the band is packed again with every tab as a card of its own, and the other cards move aside to make room for them.

A pile is `pileStep × min(pileMax, tabs − 1)` larger than one card, both ways (`pileStep` 7 px, `pileMax` 3). The front tab sits at the bottom, on the band's inner side (towards the focus area); each tab further back is `pileStep` further up and towards the band's outer edge (left in the left band, right in the right band), until `pileMax` steps; tabs beyond that sit at the last step. The pile recedes the way its band's plane does: away from the focus area. Every tab of a pile has the same card size: the pile's real rect at the group's scale.

The **tiled units** of a group are its units of tiled windows, its **floating units** its units of floating windows.

## Columns

1. **Real columns.** Tiled units whose real x ranges overlap by more than 4 px are in the same real column, also through a chain (a wide window above two narrow ones makes one column of three). Real columns are ordered left to right. A group without tiled windows makes its real columns from its floating units the same way.
   **Floating units** of a group with tiled windows join the real column whose real x range is nearest their real centre x (distance 0 inside it; on a tie, the left one). They never join or bridge columns.
   Within a real column, units run top to bottom by real y, then by real x, then in input order.
2. **Candidates.** A group can be laid out in k columns, k from 1 to min(real columns, 3). For k smaller than the number of real columns, adjacent real columns are merged: of all the ways to split them into k runs, the one whose tallest column (in real pixels, summed heights) is lowest; ties go to the earlier split. A merged column holds its real columns' units one after another, left real column first; k = 1 puts every real column in one column that way.
3. **Packing at scale `s`.** A unit is its real size × `s` (plus the pile's extra). A column is as wide as its widest unit; its units are stacked `cardGap` apart, each centred in the column's width. Columns stand side by side, `cardGap` apart. A column shorter than the tallest is centred against it (a staggered masonry). The packed width and height are the bounding box of the columns.

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

Each card has a `z`: within a band, a higher `z` is drawn in front. A closed pile's tab has its place in the pile from the back (0 furthest back); every other card has 0. Only a closed pile's tabs overlap.

## Headers

Each group has a header: its workspace label, `headerHeight` tall, directly above the group's topmost card. The header's rect spans the band's inner width and reaches down to the group's lowest card. It is also the drop target of the group.

## Output

- **Cards** keyed by window address: the window's fields (address, title, class, workspace id, and anything else the caller passed along) without its real rect, with the card rect `x`, `y`, `w`, `h` in monitor-local pixels (at rest), `z` and `pile` (its tab group key, open or closed; `""` for a window on its own).
- **Headers:** `{ id, label, x, y, w, h }` per group, left band first, each band top to bottom.
- **Left and right:** the workspace ids per band, in order.
