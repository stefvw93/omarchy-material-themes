import { argbFromHex } from "@material/material-color-utilities";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { OmarchyColors } from "./colors.ts";
import { createScheme, schemeConstructors, schemeToOmarchyColors } from "./scheme.ts";

const kinds = Object.keys(schemeConstructors) as Array<keyof typeof schemeConstructors>;

describe("schemeToOmarchyColors", () => {
  it.each(kinds.flatMap((kind) => [true, false].map((isDark) => [kind, isDark] as const)))(
    "%s (dark: %s) yields a complete, schema-valid palette",
    (kind, isDark) => {
      const scheme = createScheme(kind, argbFromHex("#4285f4"), isDark, 0);
      const colors = Effect.runSync(schemeToOmarchyColors(scheme, [27, 142, 258]));

      expect(colors.mode).toBe(isDark ? "dark" : "light");
      expect(Schema.decodeUnknownSync(OmarchyColors)(colors)).toEqual(colors);
      expect(colors.accent).toMatch(/^#[0-9a-f]{6}$/i);
      expect(colors.omaterial_primary).toBe(scheme.primary);
    },
  );
});
