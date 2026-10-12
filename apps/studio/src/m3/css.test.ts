import { describe, expect, it } from "vite-plus/test";
import { renderM3Css, shadcnColors } from "./css.ts";

describe("m3.generated.css", () => {
  it("is up to date (vp test -u regenerates it)", async () => {
    await expect(renderM3Css()).toMatchFileSnapshot("./m3.generated.css");
  });

  it("defines every shadcn colour from an M3 role", () => {
    const names = shadcnColors().map(([v]) => v);
    for (const v of ["--background", "--primary", "--card", "--ring", "--sidebar-accent"])
      expect(names).toContain(v);
    expect(shadcnColors().find(([v]) => v === "--ring")?.[1]).toBe("secondary");
  });

  it("maps Tailwind's names to the nearest M3 step", () => {
    const css = renderM3Css();
    expect(css).toContain("--text-sm: var(--md-sys-typescale-body-medium-size);");
    expect(css).toContain("--text-xs: var(--md-sys-typescale-body-small-size);");
    expect(css).toContain("--radius-xl: var(--md-sys-shape-corner-medium);");
    expect(css).toContain("--spacing: 0.25rem;");
  });
});
