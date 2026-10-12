import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vite-plus/test";
import { citations } from "../src/citations.ts";
import { componentSets } from "./allowlist.ts";
import { allowlisted, generate, pkg, readExtract } from "./generate.ts";

const extract = readExtract();
const docs = path.join(pkg, "../../apps/studio/docs");

describe("generated files", () => {
  it("are up to date with spec/extract.json (run pnpm run m3-generate)", () => {
    for (const [file, content] of generate(extract)) {
      expect(fs.readFileSync(path.join(pkg, file), "utf8"), file).toBe(content);
    }
  });

  it("cover every allowlisted component set", () => {
    const names = allowlisted(extract);
    for (const set of Object.values(componentSets).flat()) {
      expect(
        names.some((n) => extract.tokens[n]?.set === set),
        set,
      ).toBe(true);
    }
  });
});

describe("citations", () => {
  it.each(Object.entries(citations))("%s is still in the spec snapshot", (_id, c) => {
    const page = fs.readFileSync(path.join(docs, "material-3/pages", c.page), "utf8");
    expect(page).toContain(c.quote);
  });
});
