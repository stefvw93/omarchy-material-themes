// Generates packages/m3/src/generated from spec/extract.json, offline:
//   pnpm run m3-generate
// Each allowlisted token is resolved for every context (theme, contrast,
// motion scheme, font) by the spec's own rule: of the entries whose tags all
// match, the most specific one wins. A token that does not vary is emitted as
// one value.
import fs from "node:fs";
import path from "node:path";
import { citations } from "../src/citations.ts";
import { interpretations } from "../src/interpretations.ts";
import type { Context, Dim, Resolved, Token, TokenValue } from "../src/types.ts";
import { componentSets, systemSets } from "./allowlist.ts";
import type { Extract, ExtractEntry, ExtractValue } from "./extract-types.ts";

export const DIMS = {
  theme: ["light", "dark"],
  contrast: ["standard", "medium", "high"],
  motionScheme: ["standard", "expressive"],
  font: ["static", "variable"],
} as const satisfies { readonly [D in Dim]: ReadonlyArray<Context[D]> };

const DIM_ORDER: ReadonlyArray<Dim> = ["theme", "contrast", "motionScheme", "font"];

/** The spec's context tags for one of our contexts, on the public Web baseline. */
const tagsOf = (extract: Extract, ctx: Context): Readonly<Record<string, string>> => {
  const tags: Record<string, string> = {};
  for (const [group, g] of Object.entries(extract.groups)) tags[group] = g.default;
  return {
    ...tags,
    platform: "web",
    audience: "3p",
    theme: ctx.theme,
    contrast: { standard: "default", medium: "medium.contrast", high: "high.contrast" }[
      ctx.contrast
    ],
    "motion.scheme": ctx.motionScheme,
    font: ctx.font,
  };
};

export const contexts = (): Context[] => {
  const out: Context[] = [];
  for (const theme of DIMS.theme)
    for (const contrast of DIMS.contrast)
      for (const motionScheme of DIMS.motionScheme)
        for (const font of DIMS.font) out.push({ theme, contrast, motionScheme, font });
  return out;
};

/** The entry the spec applies in `tags`: all its tags match, highest score wins. */
export const pick = (
  entries: ReadonlyArray<ExtractEntry>,
  tags: Readonly<Record<string, string>>,
): ExtractEntry | undefined => {
  let best: ExtractEntry | undefined;
  for (const e of entries) {
    if (!Object.entries(e.tags).every(([g, t]) => tags[g] === t)) continue;
    if (!best || e.score > best.score) best = e;
  }
  return best;
};

const value = (v: ExtractValue): TokenValue | undefined => {
  switch (v.type) {
    case "undefined":
      return null;
    case "color":
      return undefined;
    case "opacity":
    case "number":
    case "fontWeight":
      return v.value;
    case "length":
      return v.unit === "%" ? `${v.value}%` : v.value;
    case "duration":
      return v.ms;
    case "cubicBezier":
      return [v.x0, v.y0, v.x1, v.y1];
    case "path":
      return v.svg;
    case "motionPath":
      return v.path;
    case "textTransform":
      return v.value;
    case "fontNames":
      return v.names;
    case "axis":
      return { tag: v.tag, value: v.value };
    case "shape": {
      const { type: _type, ...shape } = v;
      return shape;
    }
    case "typography": {
      const { type: _type, ...typography } = v;
      return typography;
    }
    case "composite": {
      const out: Record<string, TokenValue> = {};
      for (const [k, p] of Object.entries(v.properties)) {
        const pv = value(p);
        if (pv !== undefined) out[k] = pv;
      }
      return out;
    }
  }
};

const resolved = (e: ExtractEntry): Resolved => {
  const v = value(e.value);
  const fields = e.fields
    ? Object.fromEntries(
        Object.entries(e.fields)
          .filter(([, chain]) => chain[0] !== undefined)
          .map(([k, chain]) => [k, chain[0]!]),
      )
    : undefined;
  return {
    ...(e.chain[1] ? { ref: e.chain[1] } : {}),
    ...(fields && Object.keys(fields).length ? { fields } : {}),
    ...(v !== undefined ? { value: v } : {}),
  };
};

const keyOf = (ctx: Context, by: ReadonlyArray<Dim>) => by.map((d) => ctx[d]).join("|");

/** Resolves `name` in every context and folds away the dimensions it does not depend on. */
export const tokenFor = (extract: Extract, name: string): Token => {
  const entries = extract.tokens[name]?.entries ?? [];
  const all = contexts().map((ctx) => {
    const e = pick(entries, tagsOf(extract, ctx));
    if (!e) throw new Error(`${name}: no value for ${JSON.stringify(ctx)}`);
    return { ctx, r: resolved(e), json: JSON.stringify(resolved(e)) };
  });
  const by = DIM_ORDER.filter((dim) => {
    const rest = DIM_ORDER.filter((d) => d !== dim);
    const groups = new Map<string, Set<string>>();
    for (const { ctx, json } of all) {
      const k = keyOf(ctx, rest);
      groups.set(k, (groups.get(k) ?? new Set()).add(json));
    }
    return [...groups.values()].some((s) => s.size > 1);
  });
  if (by.length === 0) return all[0]!.r;
  const cases: Record<string, Resolved> = {};
  for (const { ctx, r } of all) cases[keyOf(ctx, by)] = r;
  return { by, cases };
};

/** Allowlisted token names, sorted. Colour roles are listed separately (MCU computes them). */
export const allowlisted = (extract: Extract): string[] => {
  const sets = new Set<string>([...systemSets, ...Object.values(componentSets).flat()]);
  for (const set of sets) {
    const meta = extract.sets[set];
    if (!meta && !Object.values(extract.tokens).some((t) => t.set === set))
      throw new Error(`allowlisted set ${set} is not in the spec`);
    if (meta?.deprecated) throw new Error(`allowlisted set ${set} is deprecated`);
  }
  return Object.entries(extract.tokens)
    .filter(([name, t]) => sets.has(t.set) && !t.deprecated && !name.startsWith("md.sys.color."))
    .map(([name]) => name)
    .sort();
};

const SPRING_ROW = /^(Expressive|Standard) (fast|default|slow) (spatial|effects)$/;
const CURVE = /^(-?[\d.]+), (-?[\d.]+), (-?[\d.]+), (-?[\d.]+)\. Duration = (\d+)ms$/;

const springCurves = (extract: Extract) =>
  extract.tables.webSpringCurves.rows.slice(1).map(([spring, curve]) => {
    const s = SPRING_ROW.exec(spring ?? "");
    const c = CURVE.exec(curve ?? "");
    if (!s || !c) throw new Error(`unexpected spring curve row: ${spring} | ${curve}`);
    return {
      scheme: s[1]!.toLowerCase(),
      speed: s[2]!,
      kind: s[3]!,
      curve: [Number(c[1]), Number(c[2]), Number(c[3]), Number(c[4])],
      durationMs: Number(c[5]),
    };
  });

const componentElevation = (extract: Extract) =>
  extract.tables.componentElevation.rows.slice(1).map(([level, components, height]) => {
    const dp = /^(\d+)dp$/.exec(height ?? "");
    if (!dp || !/^\d$/.test(level ?? "")) throw new Error(`unexpected elevation row: ${level}`);
    return { level: Number(level), dp: Number(dp[1]), components: components ?? "" };
  });

const PALETTE =
  /^md\.ref\.palette\.(primary|secondary|tertiary|neutral-variant|neutral|error)(\d+(?:\.\d+)?)$/;

/**
 * md.sys.color as the spec defines it: each role is a tone of a reference
 * palette, per theme and contrast level. Deprecated roles are left out.
 */
const colorTonesFile = (extract: Extract) => {
  const roles = Object.entries(extract.tokens)
    .filter(([n, t]) => n.startsWith("md.sys.color.") && !t.deprecated)
    .map(([n]) => n.slice("md.sys.color.".length))
    .sort();
  const tables: Record<string, Record<string, readonly [string, number]>> = {};
  for (const theme of DIMS.theme)
    for (const contrast of DIMS.contrast) {
      const tags = tagsOf(extract, { theme, contrast, motionScheme: "standard", font: "static" });
      const table: Record<string, readonly [string, number]> = {};
      for (const role of roles) {
        const ref = pick(extract.tokens[`md.sys.color.${role}`]!.entries, tags)?.chain[1] ?? "";
        const m = PALETTE.exec(ref);
        if (!m)
          throw new Error(
            `md.sys.color.${role} (${theme}, ${contrast}) is not a palette tone: ${ref}`,
          );
        table[role] = [m[1]!, Number(m[2])];
      }
      tables[`${theme}|${contrast}`] = table;
    }
  return [
    header(extract),
    'import type { ColorRole } from "./color-roles.ts";',
    "",
    'export type TonalPaletteName = "primary" | "secondary" | "tertiary" | "neutral" | "neutral-variant" | "error";',
    "",
    "/** md.sys.color: [reference palette, tone] per role, keyed by `<theme>|<contrast>`. */",
    "export const colorTones: Readonly<",
    "  Record<string, Readonly<Record<ColorRole, readonly [TonalPaletteName, number]>>>",
    "> = {",
    ...Object.entries(tables).map(([k, t]) => `  ${JSON.stringify(k)}: ${JSON.stringify(t)},`),
    "};",
    "",
  ].join("\n");
};

const header = (extract: Extract) =>
  `// Generated by packages/m3/scripts/generate.ts from spec/extract.json\n// (${extract.source.site}, content version ${extract.source.version}). Do not edit.\n`;

const line = (k: string, v: unknown) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`;

/** The generated files, by path relative to packages/m3. */
export const generate = (extract: Extract): Map<string, string> => {
  const names = allowlisted(extract);
  const files = new Map<string, string>();

  const tokenFile = (kind: string, typeName: string, list: string[]) =>
    [
      header(extract),
      'import type { Token } from "../types.ts";',
      "",
      `export type ${typeName} =`,
      ...list.map((n, i) => `  | ${JSON.stringify(n)}${i === list.length - 1 ? ";" : ""}`),
      "",
      `export const ${kind.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}Tokens: Readonly<Record<${typeName}, Token>> = {`,
      ...list.map((n) => line(n, tokenFor(extract, n))),
      "};",
      "",
    ].join("\n");
  const comp = names.filter((n) => n.startsWith("md.comp."));
  files.set("src/generated/comp.ts", tokenFile("comp", "CompTokenName", comp));
  // System tokens per area, so a bundle (the QML plugins) takes only what it imports.
  const areas = new Map<string, string[]>();
  for (const n of names.filter((n) => !n.startsWith("md.comp."))) {
    const area = n.startsWith("md.ref.") ? n.split(".")[2]! : n.split(".")[2]!;
    areas.set(area, [...(areas.get(area) ?? []), n]);
  }
  const typeName = (area: string) =>
    `${area.charAt(0).toUpperCase()}${area.slice(1).replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}TokenName`;
  for (const [area, list] of areas)
    files.set(
      `src/generated/sys/${area}.ts`,
      tokenFile(area, typeName(area), list).replace('from "../types.ts"', 'from "../../types.ts"'),
    );
  const sorted = [...areas.keys()].sort();
  files.set(
    "src/generated/sys.ts",
    [
      header(extract),
      'import type { Token } from "../types.ts";',
      ...sorted.map(
        (a) =>
          `import { type ${typeName(a)}, ${a.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}Tokens } from "./sys/${a}.ts";`,
      ),
      "",
      `export type SysTokenName = ${sorted.map(typeName).join(" | ")};`,
      "",
      "export const sysTokens: Readonly<Record<SysTokenName, Token>> = {",
      ...sorted.map((a) => `  ...${a.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}Tokens,`),
      "};",
      "",
    ].join("\n"),
  );
  files.set(
    "src/generated/info.ts",
    [
      header(extract),
      'import type { TokenInfo } from "../types.ts";',
      "",
      "/** Display names, descriptions and token sets, for documentation and Studio. */",
      "export const tokenInfo: Readonly<Record<string, TokenInfo>> = {",
      ...names.map((n) => {
        const t = extract.tokens[n]!;
        return line(n, {
          display: t.display,
          ...(t.description ? { description: t.description } : {}),
          set: t.set,
        });
      }),
      "};",
      "",
    ].join("\n"),
  );

  const roles = Object.entries(extract.tokens)
    .filter(([n]) => n.startsWith("md.sys.color."))
    .map(([n, t]) => ({ name: n.slice("md.sys.color.".length), deprecated: !!t.deprecated }))
    .sort((a, b) => a.name.localeCompare(b.name));
  files.set(
    "src/generated/color-roles.ts",
    [
      header(extract),
      "/** md.sys.color roles (kebab-case). Values come from material-color-utilities at runtime. */",
      "export const colorRoles = [",
      ...roles.filter((r) => !r.deprecated).map((r) => `  ${JSON.stringify(r.name)},`),
      "] as const;",
      "",
      "export type ColorRole = (typeof colorRoles)[number];",
      "",
      "/** Roles the spec marks deprecated; not emitted by the engine. */",
      `export const deprecatedColorRoles = ${JSON.stringify(roles.filter((r) => r.deprecated).map((r) => r.name))} as const;`,
      "",
    ].join("\n"),
  );

  files.set("src/generated/color-tones.ts", colorTonesFile(extract));

  files.set(
    "src/generated/tables.ts",
    [
      header(extract),
      `export const spec = ${JSON.stringify(extract.source)} as const;`,
      "",
      `/** ${extract.tables.webSpringCurves.page}: "Web: Convert springs to curves". */`,
      `export const webSpringCurves = ${JSON.stringify(springCurves(extract))} as const;`,
      "",
      `/** ${extract.tables.componentElevation.page}: resting elevation per component. */`,
      `export const componentElevation = ${JSON.stringify(componentElevation(extract))} as const;`,
      "",
      "/**",
      ` * Shadows of the Web implementation the elevation page links to (${extract.mwcElevation.url}).`,
      ' * The spec: "Tokens have no shadows or color; each platform determines the specific shadows".',
      " */",
      `export const webElevationShadows = ${JSON.stringify({ commit: extract.mwcElevation.commit, key: extract.mwcElevation.key, ambient: extract.mwcElevation.ambient })} as const;`,
      "",
    ].join("\n"),
  );
  files.set("../../apps/studio/docs/m3-interpretations.md", interpretationsDoc(extract));
  return files;
};

const cell = (s: string) => s.replaceAll("|", "\\|").replace(/\s+/g, " ");

/** apps/studio/docs/m3-interpretations.md: what the engine takes from page text, and where it chooses. */
const interpretationsDoc = (extract: Extract) =>
  [
    "# Material 3: citations and interpretations",
    "",
    `Generated by \`packages/m3/scripts/generate.ts\` from \`packages/m3/src/citations.ts\` and \`packages/m3/src/interpretations.ts\` (spec content version ${extract.source.version}). Do not edit.`,
    "",
    "Token values come from the spec's token data ([material-3/](material-3/README.md)). This page lists the rest: values the spec states only in page text, and every place where the spec is silent and the engine makes a choice.",
    "",
    "## Citations",
    "",
    "| Id | Value | Quote | Page |",
    "| --- | --- | --- | --- |",
    ...Object.entries(citations).map(
      ([id, c]) =>
        `| \`${id}\` | \`${cell(JSON.stringify(c.value))}\` | ${cell(c.quote)} | [${c.page}](material-3/pages/${c.page}) |`,
    ),
    "",
    "## Interpretations",
    "",
    ...Object.entries(interpretations).flatMap(([id, i]) => [
      `### \`${id}\`: ${i.area}`,
      "",
      `- **Spec:** ${i.spec}`,
      `- **Choice:** ${i.choice}`,
      `- **Why:** ${i.why}`,
      "",
    ]),
  ].join("\n");

export const pkg = path.join(import.meta.dirname, "..");

export const readExtract = (): Extract =>
  JSON.parse(fs.readFileSync(path.join(pkg, "spec/extract.json"), "utf8")) as Extract;

if (import.meta.main) {
  const files = generate(readExtract());
  for (const [file, content] of files) {
    fs.mkdirSync(path.dirname(path.join(pkg, file)), { recursive: true });
    fs.writeFileSync(path.join(pkg, file), content);
  }
  console.log(`generated ${[...files.keys()].join(", ")}`);
}
