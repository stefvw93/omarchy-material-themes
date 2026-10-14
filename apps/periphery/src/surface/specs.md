# Surface (`src/surface`)

Where a card is drawn in world space. Each band is one flat plane, hinged on the monitor's outer edge and turned back by the tilt, seen in perspective from its own eye in front of the band. Every card of a band lies on that plane, so a band reads as one surface with one vanishing point, and a tilted card looks narrower, as a turned card does. Pure: numbers in, a matrix out. Terms as in [SPEC.md](../../SPEC.md#ubiquitous-language).

## World

All coordinates are monitor-local pixels. The screen is the plane z = 0; z < 0 is further from the viewer.

- **Hinge.** The left band's plane turns about the vertical line x = 0, the right band's about x = `monW`. The side `s` is +1 for the left band and −1 for the right band.
- **Tilt.** A point at distance `a = x − hinge` from the hinge, on a plane turned by the angle θ (degrees, ≥ 0), moves to `x′ = hinge + a × cos θ` and back to `z′ = −s × a × sin θ`: the further from the screen edge, the further away. The hinge itself stays on the screen plane, so every tilted point is at or behind it, and a card at θ = 0 is on the screen plane, in front of every tilted card.
- **Eye.** Each band is seen from in front of its own centre: `eyeX` is the middle of the band, `eyeY` the monitor's middle height, `distance` pixels in front of the screen. A point at depth `z′` is drawn at `eye + (p − eye) × distance / (distance − z′)` on both axes.

  Why not one eye at the monitor's centre: seen from there, the receding inner side of a band converges towards the centre, like a corridor wall, which stretches a card towards the focus area and cancels its narrowing. From in front of the band, the turn foreshortens the card.

- **Foreshortening.** At the defaults (25°, `distance` = the monitor height) a band-wide card is drawn at about 87% of its width, its inner edge about 10% shorter than its outer edge.

## Card transform

`cardSurface({ x, y, side, angle, hingeX, eyeX, eyeY, distance })` gives the transform for a card whose top-left corner is at (`x`, `y`): the 4×4 matrix, row-major, that maps a point (u, v) of the card (its own coordinates) to where it is drawn, in the card's own coordinates again (the plugin applies it as the card's `transform`, before its position).

- At θ = 0 it is the identity.
- The card's points on the hinge line stay where they are.
- Two cards of the same band at the same angle agree: a world point drawn through either card's transform lands on the same pixel.
