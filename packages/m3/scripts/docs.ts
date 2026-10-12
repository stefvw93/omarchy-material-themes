// The spec snapshot as Markdown: one file per page, one per token table.
import fs from "node:fs";
import path from "node:path";
import { absolute, decode, toMarkdown } from "./html.ts";
import { type RefNode, SITE, type Spec, type System, type Value, fileName } from "./source.ts";

const media = (kind: string, alt: string, url: string | null | undefined, link?: string | null) => {
  const label = alt ? `${kind}: ${alt.replace(/[[\]]/g, "").replace(/\s+/g, " ")}` : kind;
  const shown = url ? `[${label}](${url})` : `[${label}]`;
  return link ? `${shown} (links to ${absolute(link)})` : shown;
};

/** Contexts for Google's own products and for iOS: not the public M3 baseline. */
const DROPPED = new Set(["Platform=iOS", "Audience=1P Baseline"]);

const num = (n: number) => String(Math.round(n * 1e6) / 1e6);
const unit = (v: Value | undefined) =>
  `${num(v?.["value"] ?? 0)}${({ DIPS: "dp", POINTS: "pt" } as Record<string, string>)[v?.["unit"]] ?? (v?.["unit"] ?? "").toLowerCase()}`;
const hex = (c: Value) => {
  const ch = (k: string) =>
    Math.round((c[k] ?? 0) * 255)
      .toString(16)
      .padStart(2, "0");
  const a = c["alpha"] ?? 1;
  return `#${ch("red")}${ch("green")}${ch("blue")}${a === 1 ? "" : ` @${num(a)}`}`;
};

const format = (v: Value | undefined): string => {
  if (!v) return "";
  if ("undefined" in v) return "(undefined)";
  if ("color" in v) return hex(v["color"]);
  if ("opacity" in v) return `opacity ${num(v["opacity"])}`;
  if ("numeric" in v) return num(v["numeric"]);
  if ("durationMs" in v) return `${v["durationMs"]}ms`;
  for (const k of ["length", "elevation", "fontSize", "lineHeight", "fontTracking"])
    if (k in v) return unit(v[k]);
  if ("fontWeight" in v) return `weight ${v["fontWeight"]}`;
  if ("fontNames" in v) return (v["fontNames"]?.["values"] ?? []).join(", ");
  if ("axisValue" in v) return `${v["axisValue"]?.["tag"]}=${num(v["axisValue"]?.["value"] ?? 0)}`;
  if ("cubicBezier" in v)
    return `cubic-bezier(${["x0", "y0", "x1", "y1"].map((k) => num(v["cubicBezier"][k] ?? 0)).join(", ")})`;
  if ("shape" in v) {
    const { family = "", defaultSize, ...rest } = v["shape"] as Value;
    return [
      String(family).replace("SHAPE_FAMILY_", "").toLowerCase(),
      ...(defaultSize ? [unit(defaultSize)] : []),
      ...Object.entries(rest).map(
        ([k, x]) =>
          `${k}=${x && typeof x === "object" && "unit" in x ? unit(x as Value) : JSON.stringify(x)}`,
      ),
    ].join(" ");
  }
  if ("type" in v) {
    const t = v["type"] as Value;
    const axes = Object.entries((t["variationAxes"] ?? {}) as Record<string, Value>);
    return [
      (t["fontNames"]?.["values"] ?? []).join(", "),
      ...("fontWeight" in t ? [`weight ${t["fontWeight"]}`] : []),
      ...["fontSize", "lineHeight", "fontTracking"]
        .filter((k) => k in t)
        .map((k) => `${k} ${unit(t[k])}`),
      ...(axes.length
        ? [`axes ${axes.map(([k, a]) => `${k}=${num(a["axisValue"] ?? 0)}`).join(" ")}`]
        : []),
    ]
      .filter(Boolean)
      .join("; ");
  }
  if ("properties" in v)
    return `{${Object.entries(v["properties"] as Record<string, Value>)
      .map(([k, p]) => `${k}: ${format(p["resolvedValue"])}`)
      .join(", ")}}`;
  return JSON.stringify(v);
};

/** The token names along a single-child reference chain. */
const chain = (node: RefNode | undefined): string[] => {
  const names: string[] = [];
  while (node) {
    if (node.tokenName) names.push(node.tokenName);
    node = node.childNodes?.length === 1 ? node.childNodes[0] : undefined;
  }
  return names;
};

const writePages = (spec: Spec, outDir: string) => {
  const index: Array<{ slug: string; title: string; file: string }> = [];
  for (const { slug } of spec.routes) {
    const page = spec.pages.get(slug)!;
    const title = page.headerTitle || page.title || slug;
    const lines = [
      `# ${title}`,
      "",
      `Source: <${SITE}/${slug}> (content version ${spec.version}, page updated ${page.updatedTimestamp ?? "?"})`,
      "",
    ];
    if (page.description) lines.push(`> ${page.description}`, "");
    for (const section of [...page.sections].sort(
      (a, b) => (a.position ?? 0) - (b.position ?? 0),
    )) {
      if (section.isVisible === false) continue;
      if (section.name) lines.push(`## ${section.name}`, "");
      for (const block of section.contentBlocks) {
        if (block.isHidden) continue;
        if (block.title) lines.push(`### ${block.title}`, "");
        for (const chunk of block.contentChunks ?? []) {
          const alt = (chunk.altText ?? "").trim();
          switch (chunk.contentChunkType) {
            case "TEXT":
              if (chunk.htmlValue) lines.push(toMarkdown(chunk.htmlValue), "");
              break;
            case "IMAGE":
              lines.push(media("Image", alt, chunk.imageUrl, chunk.linkUrl), "");
              break;
            case "VIDEO":
              lines.push(media("Video", alt, chunk.videoUrl, chunk.linkUrl), "");
              break;
            case "CRB":
              if (chunk.prototypeUrl) lines.push(media("Embed", alt, chunk.prototypeUrl), "");
              break;
            case "SNIPPET":
              if (chunk.htmlValue)
                lines.push("```", decode(chunk.htmlValue.replace(/<[^>]+>/g, "")), "```", "");
              break;
            case "RESOURCE":
              if (
                chunk.libraryModuleType &&
                chunk.libraryModuleType !== "STATUS_TABLE" &&
                chunk.resourceName
              ) {
                const id = `${chunk.libraryModuleType}.${chunk.resourceName.split("/").at(-1)}`;
                lines.push(`[Token table: see ../tokens/${id}.md]`, "");
              }
              break;
          }
          if (chunk.footer) lines.push(`_${toMarkdown(chunk.footer)}_`, "");
        }
      }
    }
    const file = `pages/${fileName(slug)}.md`;
    fs.writeFileSync(
      path.join(outDir, file),
      `${lines
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()}\n`,
    );
    index.push({ slug, title, file });
  }
  return index;
};

const writeTokens = (spec: Spec, outDir: string) => {
  const index: Array<{ title: string; file: string }> = [];
  for (const [id, usedOn] of [...spec.modules].sort(([a], [b]) => a.localeCompare(b))) {
    const kind = id.split(".")[0]!;
    if (kind === "STATUS_TABLE") continue;
    const system: System = spec.system(id);
    const tags = new Map((system.tags ?? []).map((t) => [t.name, t.displayName]));
    const groups = new Map((system.contextTagGroups ?? []).map((g) => [g.name, g.displayName]));
    const tagLabel = (name: string) =>
      `${groups.get(name.split("/tags/")[0]!) ?? "?"}=${tags.get(name) ?? name.split("/").at(-1)}`;
    const sets = new Map((system.tokenSets ?? []).map((s) => [s.name, s]));
    const bySet = new Map<string, NonNullable<System["tokens"]>[number][]>();
    for (const token of system.tokens ?? []) {
      const set = token.name.split("/tokens/")[0]!;
      bySet.set(set, [...(bySet.get(set) ?? []), token]);
    }
    const setName = (set: string) => {
      const first = bySet.get(set)![0]!;
      const derived =
        first.tokenName && first.tokenNameSuffix
          ? first.tokenName.slice(0, -first.tokenNameSuffix.length - 1)
          : set;
      return sets.get(set)?.tokenSetName ?? derived;
    };

    const title =
      kind === "TOKEN_TABLE"
        ? (system.components?.[0]?.displayName ?? id)
        : kind.charAt(0) + kind.slice(1).toLowerCase();
    const lines = [
      `# Tokens: ${title} (${id})`,
      "",
      `Source: <${SITE}/_dsm/data/dsdb-m3/${spec.version}/${id}.json>, design system '${system.displayName}' revision ${system.revisionId} (${system.revisionCreateTime}).`,
      `Used on: ${[...usedOn]
        .sort()
        .map((s) => `<${SITE}/${s}>`)
        .join(", ")}`,
      "",
      "Each token lists its value per context. `->` shows the reference chain (component token -> system token -> reference token); " +
        "the resolved value is what the baseline scheme produces in that context. Contexts with identical chain and value are merged.",
      "",
    ];
    for (const set of [...bySet.keys()].sort((a, b) => setName(a).localeCompare(setName(b)))) {
      const meta = sets.get(set);
      lines.push(`## ${setName(set)}${meta?.displayName ? ` — ${meta.displayName}` : ""}`, "");
      if (meta?.description) lines.push(meta.description, "");
      const tokens = [...bySet.get(set)!].sort((a, b) =>
        (a.tokenName ?? "").localeCompare(b.tokenName ?? ""),
      );
      for (const token of tokens) {
        const merged = new Map<string, { ref: string; value: string; contexts: string[] }>();
        for (const entry of system.contextualReferenceTrees?.[token.name]
          ?.contextualReferenceTree ?? []) {
          const labels = (entry.contextTags ?? []).map(tagLabel);
          if (labels.some((l) => DROPPED.has(l) || l.startsWith("iOS "))) continue;
          const ref = chain(entry.referenceTree).slice(1).join(" -> ");
          const value = format(entry.resolvedValue ?? entry.resolvedCustomCompositeValue);
          const key = `${ref}\u0000${value}`;
          const item = merged.get(key) ?? { ref, value, contexts: [] };
          item.contexts.push(labels.sort().join(" + ") || "default");
          merged.set(key, item);
        }
        lines.push(
          `- **${token.tokenName}** (${token.displayName ?? ""})${token.description ? ` — ${token.description}` : ""}`,
        );
        const items = [...merged.values()];
        const shown = (i: (typeof items)[number]) => `${i.ref ? `-> ${i.ref} = ` : ""}${i.value}`;
        if (items.length === 1) {
          const [only] = items as [(typeof items)[number]];
          lines.push(
            `  - ${shown(only)}${only.contexts.length === 1 && only.contexts[0] === "default" ? "" : ` [${only.contexts.join("; ")}]`}`,
          );
        } else for (const i of items) lines.push(`  - [${i.contexts.join("; ")}]: ${shown(i)}`);
      }
      lines.push("");
    }
    const file = `tokens/${id}.md`;
    fs.writeFileSync(path.join(outDir, file), `${lines.join("\n")}\n`);
    index.push({ title, file });
  }
  return index;
};

/** Rewrites `outDir` (docs/material-3) from the spec. */
export const writeDocs = (spec: Spec, outDir: string) => {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(outDir, "pages"), { recursive: true });
  fs.mkdirSync(path.join(outDir, "tokens"), { recursive: true });
  const pages = writePages(spec, outDir);
  const tokens = writeTokens(spec, outDir);

  const readme = [
    "# Material 3 specification (snapshot)",
    "",
    `Text and token data from <${SITE}>, content version \`${spec.version}\`, from the site's own content JSON ` +
      "(`/_dsm/content/m3/<version>/<page>.json`) and token database (`/_dsm/data/dsdb-m3/<version>/<module>.json`). " +
      "Converted to Markdown mechanically: page text is verbatim; images, videos and embeds appear as their alt text with a link to the original file " +
      "(`[Image: alt](url)`), so they can be fetched and inspected; component status tables are omitted. " +
      "Token values are filtered to the public M3 contexts: entries tagged `Platform=iOS` or `Audience=1P Baseline` (Google's own products) are left out.",
    "",
    "Generated by `packages/m3/scripts/fetch-spec.ts`; do not edit by hand. Regenerate with `pnpm run m3-spec` in `packages/m3` " +
      "(or `pnpm run m3-docs` in `apps/studio`; `--refresh` re-downloads instead of reusing `packages/m3/.cache/m3/<version>`).",
    "",
    "## Pages",
    "",
    ...pages.map(({ slug, title, file }) => `- [${title}](${file}) — \`${slug || "/"}\``),
    "",
    "## Token tables",
    "",
    ...tokens
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(({ title, file }) => `- [${title}](${file})`),
    "",
  ];
  fs.writeFileSync(path.join(outDir, "README.md"), readme.join("\n"));
  console.log(`wrote ${pages.length} pages and ${tokens.length} token tables to ${outDir}`);
};
