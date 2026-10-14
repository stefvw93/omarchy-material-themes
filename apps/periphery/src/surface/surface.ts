// Surface: a band as one plane, hinged on the monitor's outer edge and seen in
// perspective from in front of the monitor's centre. See specs.md.

export interface SurfaceInput {
  /** The card's top-left corner, monitor-local pixels. */
  x: number;
  y: number;
  /** +1 for the left band, −1 for the right band. */
  side: number;
  /** How far the plane is turned back, degrees (≥ 0). */
  angle: number;
  /** The hinge line: 0 for the left band, monW for the right. */
  hingeX: number;
  /** The point the viewer looks at, and how far in front of the screen. */
  eyeX: number;
  eyeY: number;
  distance: number;
}

/**
 * The card's transform, a row-major 4×4 matrix in its own coordinates.
 *
 * A card point (u, v) is the world point (x + u, y + v). Turned about the
 * hinge it is at hinge + a cos θ, depth −s a sin θ (a = x + u − hinge), and
 * drawn at eye + (p − eye) × w⁻¹ with w = 1 + s a sin θ / distance. Written
 * homogeneously and moved back into the card's coordinates (minus x, y
 * times w), every entry is affine in (u, v): one matrix.
 */
export function cardSurface(input: SurfaceInput): number[] {
  const t = (input.angle * Math.PI) / 180;
  const c = Math.cos(t);
  const k = (input.side * Math.sin(t)) / input.distance;
  const a = input.x - input.hingeX;
  const m = [
    c + k * (input.eyeX - input.x),
    0,
    0,
    input.hingeX + a * (c + k * input.eyeX) - input.x * (1 + k * a),
    k * (input.eyeY - input.y),
    1,
    0,
    k * a * (input.eyeY - input.y),
    0,
    0,
    1,
    0,
    k,
    0,
    0,
    1 + k * a,
  ];
  // No -0 entries: an untilted card's matrix is exactly the identity.
  return m.map((v) => v + 0);
}
