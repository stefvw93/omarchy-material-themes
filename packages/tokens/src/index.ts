import { cssLinear, hyprlandDampening, motionSchemes } from "@stef/motion";
import { Schema } from "effect";
import { type Tokens, springsOf } from "./runtime.ts";

export * from "./runtime.ts";

const Px = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));
const Ms = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));
const Degrees = Schema.Number.check(Schema.isBetween({ minimum: 0, maximum: 360 }));
const Fraction = Schema.Number.check(Schema.isBetween({ minimum: 0, maximum: 1 }));

/**
 * The tokens.json Schema: what Studio edits and `stef tokens` validates.
 * Plugins don't bundle it (Effect is large); they use `resolveTokens`, which
 * falls back per key instead of failing.
 */
export const TokensSchema = Schema.Struct({
  gaps: Schema.Struct({ inner: Px, outer: Px, workspaces: Px }),
  border: Schema.Struct({ width: Px, gradientAngle: Degrees }),
  blur: Schema.Struct({
    size: Px,
    passes: Schema.Int.check(Schema.isBetween({ minimum: 0, maximum: 8 })),
  }),
  shadow: Schema.Struct({
    range: Px,
    renderPower: Schema.Int.check(Schema.isBetween({ minimum: 1, maximum: 4 })),
    lightAngle: Degrees,
    distance: Px,
  }),
  motion: Schema.Struct({ scheme: Schema.Literals(["standard", "expressive"]) }),
  expo: Schema.Struct({
    outerMargin: Px,
    tileGap: Px,
    tilePadding: Px,
    rise: Px,
    tileStagger: Ms,
    windowStagger: Ms,
    windowLead: Ms,
    tileScaleFrom: Fraction,
    windowScaleFrom: Fraction,
  }),
  periphery: Schema.Struct({
    bandMargin: Px,
    cardGap: Px,
    groupGap: Px,
    slideDuration: Ms,
    fadeDuration: Ms,
    ghostBlur: Px,
  }),
});

/**
 * `~/.config/hypr/stef/tokens.lua`: the theme-independent shape and motion,
 * sourced from hyprland.lua so it applies under any theme. Curves are named
 * `stef_<spring>`.
 */
export const hyprlandTokensLua = (tokens: Tokens): string => {
  const curves = Object.entries(springsOf(tokens))
    .map(
      ([name, spring]) =>
        `hl.curve("stef_${name}", { type = "spring", mass = 1, stiffness = ${spring.stiffness}, dampening = ${round(hyprlandDampening(spring))} })`,
    )
    .join("\n");
  return `-- Generated from ~/.config/omarchy/stef/tokens.json by @stef/tokens. Do not edit:
-- change the tokens (Omaterial Studio, or \`stef tokens set\`) and regenerate.

hl.config({
  general = {
    gaps_in = ${tokens.gaps.inner},
    gaps_out = ${tokens.gaps.outer},
    gaps_workspaces = ${tokens.gaps.workspaces},
    border_size = ${tokens.border.width},
  },
  decoration = {
    blur = { size = ${tokens.blur.size}, passes = ${tokens.blur.passes} },
    shadow = { range = ${tokens.shadow.range}, render_power = ${tokens.shadow.renderPower} },
  },
})

-- Material 3 "${tokens.motion.scheme}" springs (mass 1).
${curves}
`;
};

/** CSS custom properties for Studio, so its UI shares the desktop's shape and motion. */
export const cssVariables = (tokens: Tokens): Record<string, string> => {
  const springs = springsOf(tokens);
  const vars: Record<string, string> = {
    "--stef-gap-inner": `${tokens.gaps.inner}px`,
    "--stef-gap-outer": `${tokens.gaps.outer}px`,
    "--stef-border-width": `${tokens.border.width}px`,
  };
  for (const name of Object.keys(springs) as Array<keyof typeof springs>) {
    const { easing, durationMs } = cssLinear(springs[name]);
    const id = name.replace("_", "-");
    vars[`--stef-${id}-easing`] = easing;
    vars[`--stef-${id}-duration`] = `${durationMs}ms`;
  }
  return vars;
};

const round = (n: number) => Math.round(n * 1000) / 1000;

export { motionSchemes };
