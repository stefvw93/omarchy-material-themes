// Downloads the Material 3 spec from m3.material.io and writes
//   apps/studio/docs/material-3/   the spec as Markdown, for people and agents
//   packages/m3/spec/extract.json  the token data the engine is generated from
//
//   pnpm run m3-spec             reuses .cache/m3/<version> when it is complete
//   pnpm run m3-spec --refresh   downloads everything again
//
// The raw download (~185 MB) stays in packages/m3/.cache, which git ignores.
import fs from "node:fs";
import path from "node:path";
import { writeDocs } from "./docs.ts";
import { buildExtract } from "./extract.ts";
import { loadSpec } from "./source.ts";

const pkg = path.join(import.meta.dirname, "..");
const repo = path.join(pkg, "../..");

const spec = await loadSpec(path.join(pkg, ".cache/m3"), process.argv.includes("--refresh"));
writeDocs(spec, path.join(repo, "apps/studio/docs/material-3"));

const extract = await buildExtract(spec);
const out = path.join(pkg, "spec/extract.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
// One token per line: readable diffs when the spec changes, without a 20 MB file.
const { tokens, ...rest } = extract;
const head = JSON.stringify(rest, null, 1).slice(0, -2);
const body = Object.entries(tokens)
  .map(([name, token]) => `  ${JSON.stringify(name)}: ${JSON.stringify(token)}`)
  .join(",\n");
fs.writeFileSync(out, `${head},\n "tokens": {\n${body}\n }\n}\n`);
const entries = Object.values(extract.tokens).reduce((n, t) => n + t.entries.length, 0);
console.log(
  `wrote ${path.relative(repo, out)}: ${Object.keys(extract.tokens).length} tokens, ${entries} entries, ${Object.keys(extract.groups).length} context groups`,
);
