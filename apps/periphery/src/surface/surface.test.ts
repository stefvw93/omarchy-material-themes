import { describe, expect, it } from "vite-plus/test";
import { cardSurface } from "./surface.ts";
import type { SurfaceInput } from "./surface.ts";

const monW = 2560;
const monH = 1440;
const eye = { eyeX: monW / 2, eyeY: monH / 2, distance: 2160 };
const left = { side: 1, hingeX: 0, ...eye };
const right = { side: -1, hingeX: monW, ...eye };

// A card point (u, v) through the matrix, back in monitor coordinates.
function draw(input: SurfaceInput, u: number, v: number) {
  const m = cardSurface(input);
  const w = m[12]! * u + m[13]! * v + m[15]!;
  return {
    x: input.x + (m[0]! * u + m[1]! * v + m[3]!) / w,
    y: input.y + (m[4]! * u + m[5]! * v + m[7]!) / w,
  };
}

// The world model of specs.md, independent of the matrix.
function world(hingeX: number, side: number, angle: number, x: number, y: number) {
  const t = (angle * Math.PI) / 180;
  const a = x - hingeX;
  const xr = hingeX + a * Math.cos(t);
  const z = -side * a * Math.sin(t);
  const f = eye.distance / (eye.distance - z);
  return { x: eye.eyeX + (xr - eye.eyeX) * f, y: eye.eyeY + (y - eye.eyeY) * f };
}

describe("cardSurface", () => {
  it("is the identity at no tilt", () => {
    expect(cardSurface({ ...left, x: 40, y: 300, angle: 0 })).toEqual([
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    ]);
  });

  it("draws a left band card where the hinged plane puts it", () => {
    const card = { ...left, x: 40, y: 300, angle: 8 };
    for (const [u, v] of [
      [0, 0],
      [300, 0],
      [0, 200],
      [300, 200],
    ] as const) {
      const p = draw(card, u, v);
      const q = world(0, 1, 8, 40 + u, 300 + v);
      expect(p.x).toBeCloseTo(q.x, 6);
      expect(p.y).toBeCloseTo(q.y, 6);
    }
  });

  it("draws a right band card where its hinged plane puts it", () => {
    const card = { ...right, x: 2200, y: 900, angle: 8 };
    const p = draw(card, 340, 200);
    const q = world(monW, -1, 8, 2540, 1100);
    expect(p.x).toBeCloseTo(q.x, 6);
    expect(p.y).toBeCloseTo(q.y, 6);
  });

  it("keeps points on the hinge line in place", () => {
    const card = { ...left, x: 0, y: 500, angle: 12 };
    const p = draw(card, 0, 37);
    expect(p.x).toBeCloseTo(0, 6);
    expect(p.y).toBeCloseTo(537, 6);
  });

  it("puts the inner edge further away than the outer edge", () => {
    const card = { ...left, x: 20, y: 600, angle: 8 };
    const outer = draw(card, 0, 240).y - draw(card, 0, 0).y;
    const inner = draw(card, 340, 240).y - draw(card, 340, 0).y;
    expect(inner).toBeLessThan(outer);
  });

  it("agrees between two cards of one band: a world point lands on the same pixel", () => {
    const a = { ...left, x: 20, y: 100, angle: 8 };
    const b = { ...left, x: 120, y: 400, angle: 8 };
    // World point (200, 450): (180, 350) in a, (80, 50) in b.
    const pa = draw(a, 180, 350);
    const pb = draw(b, 80, 50);
    expect(pa.x).toBeCloseTo(pb.x, 6);
    expect(pa.y).toBeCloseTo(pb.y, 6);
  });
});
