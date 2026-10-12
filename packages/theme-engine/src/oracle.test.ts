// Colour roles come from the spec's md.sys.color tone table (generated into
// @stef/m3) applied to material-color-utilities' palettes. At standard
// contrast the spec's table is the tone map of MCU's 2021 algorithm, so for
// every variant the two must agree; at medium and high contrast the spec's
// tables differ from MCU's continuous contrast, and the spec wins.
import { argbFromHex, Hct } from "@material/material-color-utilities";
import { colorRoles } from "@stef/m3";
import { describe, expect, it } from "vite-plus/test";
import { Mode, Variant } from "./colors.ts";
import { createPalettes, roleArgb, variants } from "./scheme.ts";

const getter = (role: string) => role.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

describe("spec tone table vs material-color-utilities' 2021 algorithm (standard contrast)", () => {
  it.each(Variant.literals.flatMap((variant) => Mode.literals.map((mode) => ({ variant, mode }))))(
    "agree on every role within half a tone ($variant, $mode)",
    ({ variant, mode }) => {
      for (const seed of ["#6750a4", "#4285f4", "#e05a2b", "#3a7d44"]) {
        const source = argbFromHex(seed);
        const palettes = createPalettes(source, variant);
        const mcu = new variants[variant](Hct.fromInt(source), mode === "dark", 0, "2021");
        for (const role of colorRoles) {
          const ours = Hct.fromInt(roleArgb(palettes, role, mode, "standard")).tone;
          const theirs = Hct.fromInt(
            (mcu as unknown as Record<string, number>)[getter(role)]!,
          ).tone;
          expect(Math.abs(ours - theirs), `${seed} ${role}`).toBeLessThanOrEqual(0.5);
        }
      }
    },
  );
});
