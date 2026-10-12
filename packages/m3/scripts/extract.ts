// Builds packages/m3/spec/extract.json from the downloaded spec: every token
// of the dsdb modules merged (each module repeats the reference trees of the
// tokens it shows; they are identical), filtered to the public Web baseline,
// plus the page tables and the linked Web shadow implementation the engine
// needs.
import path from "node:path";
import type {
  Extract,
  ExtractEntry,
  ExtractGroup,
  ExtractSet,
  ExtractToken,
  ExtractValue,
  MwcShadow,
} from "./extract-types.ts";
import { tables } from "./html.ts";
import { chunksOf, type RefNode, SITE, type Spec, type Value } from "./source.ts";

/** Entries tagged with these are for Google's own products or for iOS. */
const isDropped = (tags: Readonly<Record<string, string>>) =>
  tags["audience"] === "1p.baseline" ||
  (tags["platform"] !== undefined && tags["platform"] !== "web") ||
  Object.keys(tags).some((g) => g.startsWith("ios."));

const round = (n: number) => Math.round(n * 1e6) / 1e6;

const UNITS: Record<string, "dp" | "pt" | "%"> = { DIPS: "dp", POINTS: "pt", PERCENT: "%" };

const unitOf = (v: Value | undefined): "dp" | "pt" | "%" => {
  const unit = UNITS[v?.["unit"] ?? "DIPS"];
  if (!unit) throw new Error(`unknown unit ${v?.["unit"]}`);
  return unit;
};

/** A length in dp, or a percentage as "N%". */
const dp = (v: Value | undefined): number | string => {
  const value = round(v?.["value"] ?? 0);
  return unitOf(v) === "%" ? `${value}%` : value;
};

const channel = (c: Value, k: string) =>
  Math.round((c[k] ?? 0) * 255)
    .toString(16)
    .padStart(2, "0");

const normalize = (v: Value | undefined): ExtractValue => {
  if (!v || "undefined" in v) return { type: "undefined" };
  if ("color" in v) {
    const c = v["color"] as Value;
    const alpha = c["alpha"] ?? 1;
    return {
      type: "color",
      hex: `#${channel(c, "red")}${channel(c, "green")}${channel(c, "blue")}${alpha === 1 ? "" : channel(c, "alpha")}`,
    };
  }
  if ("opacity" in v) return { type: "opacity", value: round(v["opacity"]) };
  if ("numeric" in v) return { type: "number", value: round(v["numeric"]) };
  if ("durationMs" in v) return { type: "duration", ms: v["durationMs"] };
  for (const k of ["length", "elevation", "fontSize", "lineHeight", "fontTracking"]) {
    if (k in v) {
      return { type: "length", value: round(v[k]?.["value"] ?? 0), unit: unitOf(v[k]) };
    }
  }
  if ("fontWeight" in v) return { type: "fontWeight", value: v["fontWeight"] };
  if ("fontNames" in v) return { type: "fontNames", names: v["fontNames"]?.["values"] ?? [] };
  if ("axisValue" in v)
    return {
      type: "axis",
      tag: v["axisValue"]?.["tag"],
      value: round(v["axisValue"]?.["value"] ?? 0),
    };
  if ("cubicBezier" in v) {
    const c = v["cubicBezier"] as Value;
    return {
      type: "cubicBezier",
      x0: round(c["x0"] ?? 0),
      y0: round(c["y0"] ?? 0),
      x1: round(c["x1"] ?? 0),
      y1: round(c["y1"] ?? 0),
    };
  }
  if ("svgPath" in v) return { type: "path", svg: v["svgPath"] };
  if ("motionPath" in v) return { type: "motionPath", path: v["motionPath"]?.["standardPath"] };
  if ("textTransform" in v) return { type: "textTransform", value: v["textTransform"] };
  if ("shape" in v) {
    const s = v["shape"] as Value;
    const family = String(s["family"] ?? "")
      .replace("SHAPE_FAMILY_", "")
      .toLowerCase()
      .replaceAll("_", "-");
    if (family !== "rounded-corners" && family !== "circular")
      throw new Error(`unknown shape family ${family}`);
    const corners: Record<string, number | string> = {};
    for (const k of ["topLeft", "topRight", "bottomLeft", "bottomRight"])
      if (k in s) corners[k] = dp(s[k]);
    const known = new Set([
      "family",
      "defaultSize",
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight",
    ]);
    const unknown = Object.keys(s).filter((k) => !known.has(k));
    if (unknown.length) throw new Error(`unknown shape fields ${unknown.join(", ")}`);
    return {
      type: "shape",
      family,
      ...("defaultSize" in s ? { size: dp(s["defaultSize"]) } : {}),
      ...(Object.keys(corners).length ? { corners } : {}),
    };
  }
  if ("type" in v) {
    const t = v["type"] as Value;
    const axes: Record<string, number> = {};
    for (const [k, a] of Object.entries((t["variationAxes"] ?? {}) as Record<string, Value>))
      axes[k] = round(a["axisValue"] ?? 0);
    return {
      type: "typography",
      fonts: t["fontNames"]?.["values"] ?? [],
      ...("fontWeight" in t ? { weight: t["fontWeight"] } : {}),
      ...("fontSize" in t ? { size: round(t["fontSize"]?.["value"] ?? 0) } : {}),
      ...("lineHeight" in t ? { lineHeight: round(t["lineHeight"]?.["value"] ?? 0) } : {}),
      ...("fontTracking" in t ? { tracking: round(t["fontTracking"]?.["value"] ?? 0) } : {}),
      axes,
    };
  }
  if ("properties" in v) {
    const properties: Record<string, ExtractValue> = {};
    for (const [k, p] of Object.entries(v["properties"] as Record<string, Value>))
      properties[k] = normalize(p["resolvedValue"]);
    return { type: "composite", properties };
  }
  throw new Error(`unknown value ${JSON.stringify(v).slice(0, 200)}`);
};

const chainOf = (node: RefNode | undefined): string[] => {
  const names: string[] = [];
  while (node) {
    if (node.tokenName) names.push(node.tokenName);
    node = node.childNodes?.length === 1 ? node.childNodes[0] : undefined;
  }
  return names;
};

/** Field -> chain for a node whose children each feed one field of a composite. */
const fieldsOf = (node: RefNode | undefined) => {
  if (!node?.childNodes || node.childNodes.length < 2) return undefined;
  const fields: Record<string, string[]> = {};
  for (const child of node.childNodes)
    for (const field of child.fieldNames ?? []) fields[field] = chainOf(child);
  return Object.keys(fields).length ? fields : undefined;
};

/** JSON with object keys in a stable order, so the extract diffs cleanly. */
const stable = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value).sort())
      out[k] = stable((value as Record<string, unknown>)[k]);
    return out;
  }
  return value;
};

const findTable = (spec: Spec, slug: string, header: ReadonlyArray<string>) => {
  const page = spec.pages.get(slug);
  if (!page) throw new Error(`page ${slug} missing`);
  for (const chunk of chunksOf(page)) {
    for (const t of tables(chunk.htmlValue ?? "")) {
      if (header.every((h, i) => t[0]?.[i] === h)) return { page: slug, rows: t };
    }
  }
  throw new Error(`table [${header.join(" | ")}] not found on ${slug}`);
};

/** The shadows of the Web elevation implementation the elevation page links to. */
const mwcElevation = async (spec: Spec): Promise<Extract["mwcElevation"]> => {
  const page = JSON.stringify(spec.pages.get("styles/elevation") ?? {});
  const commit = /material-components\/material-web\/blob\/([0-9a-f]{40})\//.exec(page)?.[1];
  if (!commit) throw new Error("MWC link not found on styles/elevation");
  const url = `https://raw.githubusercontent.com/material-components/material-web/${commit}/elevation/internal/_elevation.scss`;
  const scss = await spec.cached(
    path.join(spec.cache, "external", `mwc-elevation-${commit}.scss`),
    url,
  );
  const parse = (block: string) => {
    const levels: MwcShadow[] = [
      ...block.matchAll(/\/\/ level(\d): box-shadow: (-?\d+)px (-?\d+)px (-?\d+)px (-?\d+)px;/g),
    ].map(([, level, x, y, blur, spread]) => ({
      level: Number(level),
      x: Number(x),
      y: Number(y),
      blur: Number(blur),
      spread: Number(spread),
    }));
    const opacity = Number(/opacity: ([0-9.]+);/.exec(block)?.[1]);
    if (levels.length !== 6 || !Number.isFinite(opacity))
      throw new Error("unexpected MWC elevation source");
    return { opacity, levels };
  };
  const keyStart = scss.indexOf("// Key box shadow");
  const ambientStart = scss.indexOf("// Ambient box shadow");
  if (keyStart < 0 || ambientStart < 0) throw new Error("MWC shadow blocks not found");
  return {
    url,
    commit,
    key: parse(scss.slice(keyStart, ambientStart)),
    ambient: parse(scss.slice(ambientStart)),
  };
};

/**
 * Colour roles are computed by material-color-utilities from the user's seed,
 * so for any token that references an md.sys.color role only that reference
 * matters: the chain stops at the role, the baseline hex is dropped, and
 * entries that become identical collapse into one untagged entry.
 * md.sys.color tokens themselves keep their palette chains (the oracle test
 * checks our role wiring against them).
 */
const throughColorRole = (entries: ExtractEntry[]): ExtractEntry[] => {
  const truncated = entries.map((e): ExtractEntry => {
    const role = e.chain.findIndex((n, i) => i > 0 && n.startsWith("md.sys.color."));
    if (role < 0 || e.value.type !== "color") return e;
    return { ...e, chain: e.chain.slice(0, role + 1), value: { type: "color" } };
  });
  const first = truncated[0];
  const distinct = new Set(truncated.map((e) => JSON.stringify([e.chain, e.fields, e.value])));
  if (first && distinct.size === 1 && first.value.type === "color") {
    return [{ tags: {}, score: 0, chain: first.chain, value: first.value }];
  }
  return truncated;
};

export const buildExtract = async (spec: Spec): Promise<Extract> => {
  const groups: Record<string, ExtractGroup> = {};
  const groupByName = new Map<string, string>();
  const tagByName = new Map<string, { group: string; tag: string }>();
  const sets: Record<string, ExtractSet> = {};
  const tokens: Record<string, ExtractToken> = {};
  let designSystem = { name: "", revisionId: "", revisionCreateTime: "" };

  const modules = [...spec.modules.keys()].filter((m) => !m.startsWith("STATUS_TABLE")).sort();
  for (const module of modules) {
    const system = spec.system(module);
    if (system.revisionId && system.revisionId > designSystem.revisionId)
      designSystem = {
        name: system.displayName ?? "",
        revisionId: system.revisionId,
        revisionCreateTime: system.revisionCreateTime ?? "",
      };
    for (const g of system.contextTagGroups ?? []) groupByName.set(g.name, g.contextTagGroupName);
    for (const t of system.tags ?? []) {
      const group = groupByName.get(t.name.split("/tags/")[0]!);
      if (group) tagByName.set(t.name, { group, tag: t.tagName });
    }
    const ranked = [...(system.contextTagGroups ?? [])].sort(
      (a, b) => a.specificity - b.specificity,
    );
    ranked.forEach((g, rank) => {
      const tags: Record<string, string> = {};
      for (const t of system.tags ?? [])
        if (t.name.startsWith(`${g.name}/tags/`)) tags[t.tagName] = t.displayName;
      groups[g.contextTagGroupName] = {
        display: g.displayName,
        specificity: g.specificity,
        rank,
        default: tagByName.get(g.defaultTag ?? "")?.tag ?? "",
        tags: { ...groups[g.contextTagGroupName]?.tags, ...tags },
      };
    });
  }

  for (const module of modules) {
    const system = spec.system(module);
    const setNames = new Map<string, string>();
    for (const s of system.tokenSets ?? []) {
      if (!s.tokenSetName) continue;
      setNames.set(s.name, s.tokenSetName);
      sets[s.tokenSetName] = {
        display: s.displayName ?? "",
        ...(s.description ? { description: s.description } : {}),
        deprecated: (s.displayName ?? "").includes("[Deprecated]"),
      };
    }
    for (const t of system.tokens ?? []) {
      const name = t.tokenName;
      if (!name || name.startsWith("md.ref.palette.") || tokens[name]) continue;
      const tree = system.contextualReferenceTrees?.[t.name]?.contextualReferenceTree;
      if (!tree) continue;
      const entries: ExtractEntry[] = [];
      for (const e of tree) {
        const tags: Record<string, string> = {};
        let score = 0;
        for (const id of e.contextTags ?? []) {
          const tag = tagByName.get(id);
          if (!tag) throw new Error(`unknown context tag ${id}`);
          tags[tag.group] = tag.tag;
          score += 2 ** groups[tag.group]!.rank;
        }
        if (isDropped(tags)) continue;
        const fields = fieldsOf(e.referenceTree);
        entries.push({
          tags,
          score,
          chain: chainOf(e.referenceTree),
          ...(fields ? { fields } : {}),
          value: normalize(e.resolvedValue ?? e.resolvedCustomCompositeValue),
        });
      }
      entries.sort(
        (a, b) => b.score - a.score || JSON.stringify(a.tags).localeCompare(JSON.stringify(b.tags)),
      );
      const deprecated = (t as { deprecationMessage?: { message?: string } }).deprecationMessage
        ?.message;
      tokens[name] = {
        display: t.displayName ?? "",
        ...(t.description ? { description: t.description } : {}),
        set: setNames.get(t.name.split("/tokens/")[0]!) ?? name.split(".").slice(0, -1).join("."),
        ...(t.tokenValueType ? { valueType: t.tokenValueType } : {}),
        ...(deprecated ? { deprecated } : {}),
        entries: name.startsWith("md.sys.color.") ? entries : throughColorRole(entries),
      };
    }
  }

  return stable({
    source: {
      site: SITE,
      version: spec.version,
      designSystem: designSystem.name,
      revisionId: designSystem.revisionId,
      revisionCreateTime: designSystem.revisionCreateTime,
    },
    groups,
    sets,
    tokens,
    tables: {
      webSpringCurves: findTable(spec, "styles/motion/overview", ["Spring", "Curve"]),
      componentElevation: findTable(spec, "styles/elevation", [
        "Resting level",
        "Component",
        "DP Height",
      ]),
    },
    mwcElevation: await mwcElevation(spec),
  }) as Extract;
};
