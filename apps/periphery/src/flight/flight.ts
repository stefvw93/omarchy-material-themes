// What each window does in a flight, and how a ghost looks along the way.
// See specs.md.

/** Per window: the addresses of every tab in its tab group (empty outside one). */
export type TabGroups = Readonly<Record<string, readonly string[]>>;

/** Whether a window is a hidden tab. */
export function isHiddenTab(
  address: string,
  groups: TabGroups,
  shown: ReadonlySet<string>,
): boolean {
  return (groups[address]?.length ?? 0) >= 2 && !shown.has(address);
}

/** The shown tabs after a switch: a flight to a window shows it. */
export function shownAfter(
  groups: TabGroups,
  shown: ReadonlySet<string>,
  target: string,
): Set<string> {
  const after = new Set(shown);
  if (!target) return after;
  for (const tab of groups[target] ?? []) after.delete(tab);
  after.add(target);
  return after;
}

/** The focus area windows whose ghosts go up on their tiles at a flight's start. */
export function ghostsOnTiles(
  focus: readonly string[],
  groups: TabGroups,
  shown: ReadonlySet<string>,
): string[] {
  return focus.filter((a) => !isHiddenTab(a, groups, shown));
}

export interface PlanInput {
  before: readonly string[];
  after: readonly string[];
  cards: readonly string[];
  groups: TabGroups;
  shown: ReadonlySet<string>;
  /** The window a flight goes to, or "". */
  target: string;
}

/** The windows whose ghosts fly; every other window's card moves itself. */
export function planFlight(input: PlanInput): string[] {
  const { before, after, cards, groups, shown, target } = input;
  const afterShown = shownAfter(groups, shown, target);
  const shownBefore = (a: string) => !isHiddenTab(a, groups, shown);
  const shownAtEnd = (a: string) => !isHiddenTab(a, groups, afterShown);
  return [
    ...before.filter((a) =>
      after.includes(a) ? shownBefore(a) && shownAtEnd(a) : cards.includes(a) && shownBefore(a),
    ),
    ...after.filter((a) => !before.includes(a) && shownAtEnd(a)),
  ];
}

export interface StackInput {
  floating: boolean;
  pinned: boolean;
  /** Hyprland's: 0 for the most recently focused, −1 or absent for never. */
  focusHistoryID?: number | undefined;
}

/** How many z values a stacking layer (floating, pinned) spans. */
const LAYER = 1000000;

/** A ghost's z, higher in front: the way Hyprland stacks its window. */
export function ghostZ(input: StackInput): number {
  if (!input.floating && !input.pinned) return 0;
  // Each layer is LAYER deep: never focused at its back (1), focused
  // windows ahead of it, the most recent in front.
  const layer = input.pinned ? 2 : 1;
  const id = input.focusHistoryID ?? -1;
  const age = id >= 0 ? Math.min(id, LAYER - 2) : LAYER - 1;
  return layer * LAYER - age;
}

export interface LookInput {
  travel: number;
  fromTile: boolean;
  toTile: boolean;
  activeAtTile: boolean;
  opacity: number;
  opacityInactive: number;
  borderSize: number;
  rounding: number;
  /** Tilt at the start and at the end, degrees: a card's, or 0 on a tile. */
  fromTilt: number;
  toTilt: number;
}

export interface Look {
  contentOpacity: number;
  borderOffset: number;
  outerRadius: number;
  blurOpacity: number;
  tilt: number;
}

/** How a ghost looks at a point of its flight. */
export function ghostLook(input: LookInput): Look {
  const still = input.fromTile && input.toTile;
  const t = still ? 1 : Math.min(1, Math.max(0, input.travel));
  const w = input.toTile ? t : 1 - t;
  const tileOpacity = input.activeAtTile ? input.opacity : input.opacityInactive;
  const half = Math.min(1, 2 * t);
  return {
    contentOpacity: 1 + (tileOpacity - 1) * w,
    borderOffset: input.borderSize * w,
    outerRadius: input.rounding + input.borderSize * w,
    blurOpacity: input.toTile ? half : 1 - half,
    tilt: input.fromTilt + (input.toTilt - input.fromTilt) * Math.min(1, Math.max(0, input.travel)),
  };
}
