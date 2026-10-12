import { readFileSync } from "node:fs";
import { describe, expect, it } from "vite-plus/test";
import { kitContext, kitM3Data, renderKitM3 } from "./m3-data.ts";

describe("src/m3.generated.ts", () => {
  it("is up to date (vp run kit-generate)", () => {
    const file = readFileSync(new URL("../src/m3.generated.ts", import.meta.url), "utf8");
    expect(file).toBe(renderKitM3());
  });

  // The module is resolved once; Scheme.qml supplies the theme and contrast,
  // the tokens the motion scheme. Nothing in it may depend on them.
  it("holds the same values in every theme, contrast and motion scheme", () => {
    const base = kitM3Data();
    for (const theme of ["light", "dark"] as const)
      for (const contrast of ["standard", "medium", "high"] as const)
        for (const motionScheme of ["standard", "expressive"] as const)
          expect(kitM3Data({ ...kitContext, theme, contrast, motionScheme })).toEqual(base);
  });
});
