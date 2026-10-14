# Surface (`src/surface`)

Where a card is drawn in world space. Each band is one flat plane, hinged on the monitor's outer edge and turned back by the tilt, seen in perspective from an eye in front of the monitor's centre. Every card of a band lies on that plane, so a band reads as one surface with one vanishing point, like a curved display. Pure: numbers in, a matrix out. Terms as in [SPEC.md](../../SPEC.md#ubiquitous-language).

## World

All coordinates are monitor-local pixels. The screen is the plane z = 0; z < 0 is further from the viewer.

- **Hinge.** The left band's plane turns about the vertical line x = 0, the right band's about x = `monW`. The side `s` is +1 for the left band and −1 for the right band.
- **Tilt.** A point at distance `a = x − hinge` from the hinge, on a plane turned by the angle θ (degrees, ≥ 0), moves to `x′ = hinge + a × cos θ` and back to `z′ = −s × a × sin θ`: the further from the screen edge, the further away. The hinge itself stays on the screen plane, so every tilted point is at or behind it, and a card at θ = 0 is on the screen plane, in front of every tilted card.
- **Eye.** The viewer looks at the monitor's centre (`eyeX`, `eyeY`) from `distance` pixels in front of the screen. A point at depth `z′` is drawn at `eye + (p − eye) × distance / (distance − z′)` on both axes.

## Card transform

`cardSurface({ x, y, side, angle, hingeX, eyeX, eyeY, distance })` gives the transform for a card whose top-left corner is at (`x`, `y`): the 4×4 matrix, row-major, that maps a point (u, v) of the card (its own coordinates) to where it is drawn, in the card's own coordinates again (the plugin applies it as the card's `transform`, before its position).

- At θ = 0 it is the identity.
- The card's points on the hinge line stay where they are.
- Two cards of the same band at the same angle agree: a world point drawn through either card's transform lands on the same pixel.
