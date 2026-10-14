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

export interface Plan {
  fly: string[];
  card: string[];
}

/** Which windows fly and which only move as their card. */
export function planFlight(input: PlanInput): Plan {
  const { before, after, cards, groups, shown, target } = input;
  const afterShown = shownAfter(groups, shown, target);
  const hiddenBefore = (a: string) => isHiddenTab(a, groups, shown);
  const hiddenAfter = (a: string) => isHiddenTab(a, groups, afterShown);
  const plan: Plan = { fly: [], card: [] };
  for (const a of before) {
    if (after.includes(a)) {
      if (!hiddenBefore(a) && !hiddenAfter(a)) plan.fly.push(a);
    } else if (cards.includes(a)) (hiddenBefore(a) ? plan.card : plan.fly).push(a);
  }
  for (const a of after) if (!before.includes(a)) (hiddenAfter(a) ? plan.card : plan.fly).push(a);
  return plan;
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
