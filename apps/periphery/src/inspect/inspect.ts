// What the stress test looks for in the plugin's own view of its ghosts.
// See specs.md.

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GhostState {
  address: string;
  launched: boolean;
  flying: boolean;
  rect: Rect;
  target?: Rect | undefined;
  z?: number | undefined;
}

export interface CardState {
  address: string;
  leaving: boolean;
  rect: Rect;
}

export interface Sample {
  at: number;
  phase: string;
  ghosts: GhostState[];
  cards?: CardState[] | undefined;
}

export type Rule =
  | "idle ghost"
  | "resting ghost"
  | "stuck ghost"
  | "grounded ghost"
  | "double"
  | "fading card"
  | "wrong stacking";

export interface Problem {
  rule: Rule;
  address: string;
  at: number;
}

/** How long a flying ghost may keep one rect short of its target. */
export const STUCK_MS = 300;
/** How long a launched ghost may stay grounded during a flight. */
export const GROUNDED_MS = 100;

/** Everything wrong across a run of samples, in time order. */
export function findProblems(samples: readonly Sample[]): Problem[] {
  const problems: Problem[] = [];
  // Per window, since when it has had this rect, and been grounded, within
  // the current run of flying samples; and which rules it already broke.
  let still = new Map<string, { since: number; rect: Rect }>();
  let grounded = new Map<string, number>();
  const reported = new Set<string>();
  const report = (rule: Rule, address: string, at: number) => {
    if (reported.has(rule + address)) return;
    reported.add(rule + address);
    problems.push({ rule, address, at });
  };
  let phase = "";
  for (const s of samples) {
    if (s.phase !== phase) reported.clear();
    phase = s.phase;
    if (s.phase !== "flying") {
      still = new Map();
      grounded = new Map();
    }
    const nextStill = new Map<string, { since: number; rect: Rect }>();
    const nextGrounded = new Map<string, number>();
    for (const g of s.ghosts) {
      if (s.phase === "idle") report("idle ghost", g.address, s.at);
      if (!g.launched) report("resting ghost", g.address, s.at);
      if (s.phase !== "flying") continue;
      const before = still.get(g.address);
      const since = before && sameRect(before.rect, g.rect) ? before.since : s.at;
      nextStill.set(g.address, { since, rect: g.rect });
      if (g.target && !sameRect(g.rect, g.target) && s.at - since >= STUCK_MS)
        report("stuck ghost", g.address, s.at);
      if (g.launched && !g.flying) {
        const from = grounded.get(g.address) ?? s.at;
        nextGrounded.set(g.address, from);
        if (s.at - from >= GROUNDED_MS) report("grounded ghost", g.address, s.at);
      }
    }
    const ghosts = new Set(s.ghosts.map((g) => g.address));
    for (const c of s.cards ?? []) {
      if (ghosts.has(c.address)) report("double", c.address, s.at);
      if (c.leaving) report("fading card", c.address, s.at);
    }
    if (s.phase === "flying") {
      still = nextStill;
      grounded = nextGrounded;
    }
  }
  return problems;
}

const sameRect = (a: Rect, b: Rect) => a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h;

/** Floating ghosts drawn out of Hyprland's order (back to front). */
export function stackingProblems(sample: Sample, order: readonly string[]): Problem[] {
  const z = new Map(sample.ghosts.map((g) => [g.address, g.z ?? 0]));
  const drawn = order.filter((a) => z.has(a));
  return drawn
    .filter((a, i) => drawn.slice(0, i).some((before) => z.get(before)! >= z.get(a)!))
    .map((address) => ({ rule: "wrong stacking" as const, address, at: sample.at }));
}
