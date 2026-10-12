// m3.generated.css: Material 3 in Studio's Tailwind config, and the
// shadcn variables defined from it, so the shadcn components keep their class
// names and draw spec values (interpretations studio.shadcn and
// studio.tailwind-scale). Colours are --md-sys-color-* variables set at
// runtime (src/m3/scheme.ts, interpretation studio.colors).
import {
  colorRoleOf,
  colorRoles,
  type CompTokenName,
  type Context,
  interpretation,
  numberOf,
  type TokenName,
  typographyOf,
  valueOf,
  webElevationShadows,
} from "@stef/m3";
import { springsOf, defaultTokens } from "@stef/tokens";

/** Studio draws in the user's Omarchy font: static weights, not Roboto Flex. */
const ctx: Context = {
  theme: "light",
  contrast: "standard",
  motionScheme: "standard",
  font: "static",
};

export const cornerSteps = [
  "none",
  "extra-small",
  "small",
  "medium",
  "large",
  "large-increased",
  "extra-large",
  "extra-large-increased",
  "extra-extra-large",
] as const;

export const typeRoles = [
  "display-large",
  "display-medium",
  "display-small",
  "headline-large",
  "headline-medium",
  "headline-small",
  "title-large",
  "title-medium",
  "title-small",
  "body-large",
  "body-medium",
  "body-small",
  "label-large",
  "label-medium",
  "label-small",
] as const;

/** Tailwind v4's default sizes in px, which its names keep meaning by nearest M3 step. */
const tailwindText = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
} as const;
const tailwindRadius = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  "2xl": 16,
  "3xl": 24,
  "4xl": 32,
} as const;
/** Tailwind's shadows, smallest first, onto elevation levels 1 to 5. */
const tailwindShadow = {
  "2xs": 1,
  xs: 1,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
} as const;

const cornerOf = (step: (typeof cornerSteps)[number]) => {
  const v = valueOf(`md.sys.shape.corner.${step}` as TokenName, ctx) as { size?: number };
  return v.size ?? 0;
};

const typeOf = (role: (typeof typeRoles)[number]) => {
  const t = typographyOf(`md.sys.typescale.${role}` as TokenName, ctx);
  return {
    size: t.size ?? 0,
    lineHeight: t.lineHeight ?? 0,
    weight: t.weight ?? 400,
    tracking: t.tracking ?? 0,
  };
};

/** The key whose value is nearest `px` (ties go to the smaller, as in shell.spacing). */
const nearest = <K extends string>(px: number, values: Readonly<Record<K, number>>): K => {
  let best: K | undefined;
  for (const key of Object.keys(values) as K[]) {
    const d = Math.abs(values[key] - px);
    if (
      best === undefined ||
      d < Math.abs(values[best] - px) ||
      (d === Math.abs(values[best] - px) && values[key] < values[best])
    )
      best = key;
  }
  return best!;
};

/** One elevation level as a CSS box-shadow: the Web implementation's key and ambient shadows. */
const shadowOf = (level: number) => {
  if (level === 0) return "none";
  const layer = (s: {
    readonly levels: ReadonlyArray<{
      readonly level: number;
      readonly x: number;
      readonly y: number;
      readonly blur: number;
      readonly spread: number;
    }>;
    readonly opacity: number;
  }) => {
    const l = s.levels.find((x) => x.level === level)!;
    return `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px color-mix(in srgb, var(--md-sys-color-shadow) ${Math.round(s.opacity * 100)}%, transparent)`;
  };
  return `${layer(webElevationShadows.key)}, ${layer(webElevationShadows.ambient)}`;
};

const role = (name: CompTokenName) => colorRoleOf(name, ctx);

/** shadcn variable → [M3 role, where it comes from] (interpretation studio.shadcn). */
export const shadcnColors = (): ReadonlyArray<readonly [string, string, string]> => {
  const comp = (v: string, name: CompTokenName) => [v, role(name), name] as const;
  const sys = (v: string, r: string) => [v, r, `md.sys.color.${r}`] as const;
  return [
    sys("--background", "surface"),
    sys("--foreground", "on-surface"),
    comp("--card", "md.comp.elevated-card.container.color"),
    sys("--card-foreground", "on-surface"),
    comp("--popover", "md.comp.menus.standard.container.color"),
    comp("--popover-foreground", "md.comp.menus.standard.menu-item.label-text.color"),
    comp("--primary", "md.comp.button.filled.container.color"),
    comp("--primary-foreground", "md.comp.button.filled.label-text.color"),
    comp("--secondary", "md.comp.button.tonal.container.color"),
    comp("--secondary-foreground", "md.comp.button.tonal.label-text.color"),
    sys("--muted", "surface-container-high"),
    sys("--muted-foreground", "on-surface-variant"),
    sys("--accent", "surface-container-highest"),
    sys("--accent-foreground", "on-surface"),
    sys("--destructive", "error"),
    comp("--border", "md.comp.outlined-card.outline.color"),
    comp("--input", "md.comp.outlined-text-field.outline.color"),
    comp("--ring", "md.comp.menus.menu-item.focus.indicator.color"),
    sys("--chart-1", "primary"),
    sys("--chart-2", "tertiary"),
    sys("--chart-3", "secondary"),
    sys("--chart-4", "error"),
    sys("--chart-5", "on-surface-variant"),
    sys("--sidebar", "surface-container-low"),
    sys("--sidebar-foreground", "on-surface"),
    comp("--sidebar-primary", "md.comp.button.filled.container.color"),
    comp("--sidebar-primary-foreground", "md.comp.button.filled.label-text.color"),
    comp("--sidebar-accent", "md.comp.list.list-item.selected.container.color"),
    comp("--sidebar-accent-foreground", "md.comp.list.list-item.selected.label-text.color"),
    comp("--sidebar-border", "md.comp.outlined-card.outline.color"),
    comp("--sidebar-ring", "md.comp.menus.menu-item.focus.indicator.color"),
  ];
};

const px = (n: number) => `${n}px`;

export const renderM3Css = (): string => {
  interpretation("studio.shadcn");
  interpretation("studio.tailwind-scale");
  const corners = Object.fromEntries(cornerSteps.map((s) => [s, cornerOf(s)])) as Record<
    (typeof cornerSteps)[number],
    number
  >;
  const types = Object.fromEntries(typeRoles.map((r) => [r, typeOf(r)])) as Record<
    (typeof typeRoles)[number],
    ReturnType<typeof typeOf>
  >;
  // Roles of equal size: body first (Tailwind's text sizes set running text),
  // then label, title, headline and display.
  const preference = ["body", "label", "title", "headline", "display"];
  const byPreference = [...typeRoles].sort(
    (a, b) => preference.indexOf(a.split("-")[0]!) - preference.indexOf(b.split("-")[0]!),
  );
  const typeSizes = Object.fromEntries(byPreference.map((r) => [r, types[r].size])) as Record<
    (typeof typeRoles)[number],
    number
  >;
  const state = (name: string) => numberOf(`md.sys.state.${name}` as TokenName, ctx);
  const springs = springsOf(defaultTokens);
  const lines: string[] = [];
  const out = (s = "") => lines.push(s);

  out("/* Generated by apps/studio/src/m3/css.ts (vp test -u) from @stef/m3. Do not edit. */");
  out("/* Interpretations studio.shadcn and studio.tailwind-scale; colours: studio.colors. */");
  out();
  out(":root {");
  out("  /* md.sys.shape.corner */");
  for (const s of cornerSteps) out(`  --md-sys-shape-corner-${s}: ${px(corners[s])};`);
  out("  --md-sys-shape-corner-full: 9999px;");
  out("  /* md.sys.state */");
  for (const s of ["hover", "focus", "pressed", "dragged", "disabled"])
    out(`  --md-sys-state-${s}-state-layer-opacity: ${state(`${s}.state-layer-opacity`)};`);
  out(`  --md-sys-state-focus-indicator-thickness: ${px(state("focus-indicator.thickness"))};`);
  out(
    `  --md-sys-state-focus-indicator-outer-offset: ${px(state("focus-indicator.outer-offset"))};`,
  );
  out("  /* md.sys.typescale (static fonts) */");
  for (const r of typeRoles) {
    const t = types[r];
    out(`  --md-sys-typescale-${r}-size: ${px(t.size)};`);
    out(`  --md-sys-typescale-${r}-line-height: ${px(t.lineHeight)};`);
    out(`  --md-sys-typescale-${r}-weight: ${t.weight};`);
    out(`  --md-sys-typescale-${r}-tracking: ${px(t.tracking)};`);
  }
  out("  /* md.sys.elevation: the Web implementation's shadows (elevation.hyprland-shadow) */");
  for (let l = 0; l <= 5; l++) out(`  --md-sys-elevation-level${l}: ${shadowOf(l)};`);
  out("  /* shadcn, from M3 roles (studio.shadcn) */");
  for (const [v, r, source] of shadcnColors())
    out(`  ${v}: var(--md-sys-color-${r}); /* ${source} */`);
  out(`  --radius: var(--md-sys-shape-corner-medium);`);
  out("}");
  out();
  out("@theme inline {");
  out(
    "  /* 1rem = 16dp; Tailwind's spacing unit is the 4dp grid step (md.sys.measurement.space50) */",
  );
  out(`  --spacing: ${numberOf("md.sys.measurement.space50" as TokenName, ctx) / 16}rem;`);
  out("  /* Colour roles: bg-surface-container-high, text-on-surface-variant, … */");
  for (const r of colorRoles) out(`  --color-${r}: var(--md-sys-color-${r});`);
  out("  /* shadcn colours */");
  for (const [v] of shadcnColors()) out(`  --color-${v.slice(2)}: var(${v});`);
  out("  /* Corners: rounded-<step>, and Tailwind's names at the nearest step */");
  for (const s of cornerSteps) out(`  --radius-${s}: var(--md-sys-shape-corner-${s});`);
  for (const [name, value] of Object.entries(tailwindRadius))
    out(`  --radius-${name}: var(--md-sys-shape-corner-${nearest(value, corners)});`);
  out("  /* Type roles: text-<role>, and Tailwind's names at the nearest role */");
  const text = (name: string, r: (typeof typeRoles)[number]) => {
    out(`  --text-${name}: var(--md-sys-typescale-${r}-size);`);
    out(`  --text-${name}--line-height: var(--md-sys-typescale-${r}-line-height);`);
    out(`  --text-${name}--letter-spacing: var(--md-sys-typescale-${r}-tracking);`);
    out(`  --text-${name}--font-weight: var(--md-sys-typescale-${r}-weight);`);
  };
  for (const r of typeRoles) text(r, r);
  for (const [name, value] of Object.entries(tailwindText)) text(name, nearest(value, typeSizes));
  out("  /* Elevation: shadow-level<n>, and Tailwind's names in order */");
  for (let l = 0; l <= 5; l++) out(`  --shadow-level${l}: var(--md-sys-elevation-level${l});`);
  for (const [name, level] of Object.entries(tailwindShadow))
    out(`  --shadow-${name}: var(--md-sys-elevation-level${level});`);
  out("  /* Motion: ease-<kind>-<speed> on the tokens' springs (set at runtime: --stef-*) */");
  for (const name of Object.keys(springs)) {
    const [kind, speed] = name.split("_");
    out(`  --ease-${kind}-${speed}: var(--stef-${kind}-${speed}-easing);`);
  }
  out("  /* The user's Omarchy font: the fontconfig alias omarchy-font-set writes */");
  out("  --font-sans: monospace;");
  out("  --font-mono: monospace;");
  out("  --font-heading: monospace;");
  out("}");
  out();
  return lines.join("\n");
};
