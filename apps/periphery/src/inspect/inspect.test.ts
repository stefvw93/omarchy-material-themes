import { describe, expect, it } from "vite-plus/test";
import {
  type CardState,
  findProblems,
  stackingProblems,
  GROUNDED_MS,
  type GhostState,
  type Sample,
  STUCK_MS,
} from "./inspect.ts";

const tile = { x: 391, y: 55, w: 1778, h: 1374 };
const ghost = (rect = tile, more: Partial<GhostState> = {}): GhostState => ({
  address: "0xa",
  launched: true,
  flying: true,
  rect,
  target: tile,
  ...more,
});
const sample = (at: number, phase: string, ...ghosts: GhostState[]): Sample => ({
  at,
  phase,
  ghosts,
});
const halfway = { x: 1200, y: 300, w: 900, h: 700 };

describe("findProblems", () => {
  it("finds nothing in a clean flight", () => {
    expect(
      findProblems([
        sample(0, "idle"),
        sample(50, "pending", ghost(tile, { flying: false })),
        sample(100, "flying", ghost(halfway)),
        sample(300, "flying", ghost({ ...halfway, x: 800 })),
        sample(500, "flying", ghost()),
        sample(900, "flying", ghost()),
        sample(1000, "unhiding", ghost()),
        sample(1100, "idle"),
      ]),
    ).toEqual([]);
  });

  it("flags a ghost drawn while idle", () => {
    expect(findProblems([sample(10, "idle", ghost())])).toEqual([
      { rule: "idle ghost", address: "0xa", at: 10 },
    ]);
  });

  it("reports a rule once per window while the phase lasts", () => {
    expect(findProblems([sample(10, "idle", ghost()), sample(20, "idle", ghost())])).toEqual([
      { rule: "idle ghost", address: "0xa", at: 10 },
    ]);
  });

  it("flags a drawn ghost that isn't launched", () => {
    expect(
      findProblems([sample(10, "flying", ghost(tile, { launched: false, flying: false }))]),
    ).toEqual([{ rule: "resting ghost", address: "0xa", at: 10 }]);
  });

  it("flags a flying ghost that stops short of its target", () => {
    const problems = findProblems([
      sample(100, "flying", ghost(halfway)),
      sample(100 + STUCK_MS - 1, "flying", ghost(halfway)),
      sample(100 + STUCK_MS, "flying", ghost(halfway)),
    ]);
    expect(problems).toEqual([{ rule: "stuck ghost", address: "0xa", at: 100 + STUCK_MS }]);
  });

  it("doesn't flag a ghost resting on its target, or one without a target", () => {
    expect(
      findProblems([
        sample(0, "flying", ghost(), ghost(halfway, { address: "0xb", target: undefined })),
        sample(
          STUCK_MS * 2,
          "flying",
          ghost(),
          ghost(halfway, { address: "0xb", target: undefined }),
        ),
      ]),
    ).toEqual([]);
  });

  it("flags a launched ghost left grounded during a flight", () => {
    const grounded = ghost(halfway, { flying: false });
    expect(
      findProblems([
        sample(0, "flying", grounded),
        sample(GROUNDED_MS - 1, "flying", grounded),
        sample(GROUNDED_MS, "flying", grounded),
      ]),
    ).toEqual([{ rule: "grounded ghost", address: "0xa", at: GROUNDED_MS }]);
  });

  it("starts over when another phase comes between two flying samples", () => {
    expect(
      findProblems([
        sample(0, "flying", ghost(halfway, { flying: false })),
        sample(50, "idle"),
        sample(60, "pending", ghost(halfway, { flying: false })),
        sample(400, "flying", ghost(halfway, { flying: false })),
      ]),
    ).toEqual([]);
  });

  it("names each window on its own", () => {
    const b = (rect = halfway) => ghost(rect, { address: "0xb" });
    expect(
      findProblems([
        sample(0, "flying", ghost(halfway), b()),
        sample(STUCK_MS, "flying", ghost({ ...halfway, x: 700 }), b()),
      ]),
    ).toEqual([{ rule: "stuck ghost", address: "0xb", at: STUCK_MS }]);
  });

  const card = (more: Partial<CardState> = {}): CardState => ({
    address: "0xa",
    leaving: false,
    rect: { x: 2200, y: 300, w: 340, h: 260 },
    ...more,
  });

  it("flags a window drawn as a card and a ghost at once", () => {
    expect(findProblems([{ ...sample(10, "flying", ghost(halfway)), cards: [card()] }])).toEqual([
      { rule: "double", address: "0xa", at: 10 },
    ]);
  });

  it("flags a leaving card drawn, in any phase", () => {
    expect(
      findProblems([
        { ...sample(10, "flying"), cards: [card({ leaving: true })] },
        { ...sample(20, "idle"), cards: [card({ leaving: true })] },
      ]),
    ).toEqual([
      { rule: "fading card", address: "0xa", at: 10 },
      { rule: "fading card", address: "0xa", at: 20 },
    ]);
  });

  it("leaves cards that stay alone", () => {
    expect(
      findProblems([{ ...sample(10, "idle"), cards: [card(), card({ address: "0xb" })] }]),
    ).toEqual([]);
  });
});

describe("stackingProblems", () => {
  const at = (address: string, z: number) => ghost(halfway, { address, z });

  it("accepts ghosts stacked in Hyprland's order", () => {
    expect(
      stackingProblems(sample(5, "flying", at("0xa", 10), at("0xb", 20)), ["0xa", "0xb"]),
    ).toEqual([]);
  });

  it("flags the window drawn behind one it is in front of", () => {
    expect(
      stackingProblems(sample(5, "flying", at("0xa", 20), at("0xb", 10)), ["0xa", "0xb"]),
    ).toEqual([{ rule: "wrong stacking", address: "0xb", at: 5 }]);
  });

  it("only compares windows in the order whose ghosts are drawn", () => {
    expect(
      stackingProblems(sample(5, "flying", at("0xa", 20), at("0xc", 0)), ["0xa", "0xb"]),
    ).toEqual([]);
  });
});
