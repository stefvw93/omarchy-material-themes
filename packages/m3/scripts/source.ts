// The Material 3 spec as m3.material.io serves it. The site is an Angular
// app, but its content is plain JSON: the main bundle holds the content
// version and the route table (slug -> page file), pages live at
// /_dsm/content/m3/<version>/<id>.json and the token tables they embed at
// /_dsm/data/dsdb-m3/<version>/<MODULE>.<id>.json.
import fs from "node:fs";
import path from "node:path";

export const SITE = "https://m3.material.io";

export interface Chunk {
  readonly contentChunkType?: string;
  readonly htmlValue?: string | null;
  readonly footer?: string | null;
  readonly altText?: string | null;
  readonly imageUrl?: string | null;
  readonly videoUrl?: string | null;
  readonly linkUrl?: string | null;
  readonly prototypeUrl?: string | null;
  readonly libraryModuleType?: string | null;
  readonly resourceName?: string | null;
}

export interface Page {
  readonly title?: string;
  readonly headerTitle?: string;
  readonly description?: string;
  readonly updatedTimestamp?: string;
  readonly sections: ReadonlyArray<{
    readonly name?: string;
    readonly position?: number;
    readonly isVisible?: boolean;
    readonly contentBlocks: ReadonlyArray<{
      readonly title?: string | null;
      readonly isHidden?: boolean;
      readonly contentChunks?: ReadonlyArray<Chunk> | null;
    }>;
  }>;
}

export type Value = Record<string, any>;

export interface RefNode {
  readonly tokenName?: string;
  readonly fieldNames?: ReadonlyArray<string>;
  readonly childNodes?: ReadonlyArray<RefNode>;
}

export interface TreeEntry {
  readonly contextTags?: ReadonlyArray<string>;
  readonly referenceTree?: RefNode;
  readonly resolvedValue?: Value;
  readonly resolvedCustomCompositeValue?: Value;
}

/** One token module of the dsdb design-system database. */
export interface System {
  readonly displayName?: string;
  readonly revisionId?: string;
  readonly revisionCreateTime?: string;
  readonly components?: ReadonlyArray<{ readonly displayName: string }>;
  readonly tags?: ReadonlyArray<{
    readonly name: string;
    readonly displayName: string;
    readonly tagName: string;
  }>;
  readonly contextTagGroups?: ReadonlyArray<{
    readonly name: string;
    readonly displayName: string;
    readonly contextTagGroupName: string;
    readonly specificity: number;
    readonly defaultTag?: string;
  }>;
  readonly tokenSets?: ReadonlyArray<{
    readonly name: string;
    readonly tokenSetName?: string;
    readonly displayName?: string;
    readonly description?: string;
  }>;
  readonly tokens?: ReadonlyArray<{
    readonly name: string;
    readonly tokenName?: string;
    readonly tokenNameSuffix?: string;
    readonly displayName?: string;
    readonly description?: string;
    readonly tokenValueType?: string;
  }>;
  readonly contextualReferenceTrees?: Record<
    string,
    { readonly contextualReferenceTree: ReadonlyArray<TreeEntry> }
  >;
}

export interface Spec {
  readonly version: string;
  readonly routes: ReadonlyArray<{ readonly slug: string; readonly file: string }>;
  readonly pages: ReadonlyMap<string, Page>;
  /** Token modules by `<MODULE>.<id>`, with the pages that embed them. */
  readonly modules: ReadonlyMap<string, ReadonlyArray<string>>;
  readonly cache: string;
  readonly get: (url: string) => Promise<string>;
  readonly cached: (file: string, url: string) => Promise<string>;
  readonly system: (module: string) => System;
}

/** Runs `task` over `items` with at most `limit` in flight. */
const pool = async <T>(
  items: ReadonlyArray<T>,
  limit: number,
  task: (item: T) => Promise<void>,
) => {
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) await task(items[next++]!);
    }),
  );
};

export const fileName = (slug: string) => slug.replaceAll("/", "__") || "home";

export const chunksOf = (page: Page) =>
  page.sections.flatMap((s) => s.contentBlocks.flatMap((b) => b.contentChunks ?? []));

/**
 * Downloads the spec into `<cacheRoot>/<version>`, reusing what is cached
 * unless `refresh` is set.
 */
export const loadSpec = async (cacheRoot: string, refresh: boolean): Promise<Spec> => {
  const get = async (url: string): Promise<string> => {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    return res.text();
  };
  const cached = async (file: string, url: string): Promise<string> => {
    if (!refresh && fs.existsSync(file)) return fs.readFileSync(file, "utf8");
    const text = await get(url);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
    return text;
  };

  const home = await get(`${SITE}/`);
  const mainPath = /src="(\/static\/angular\/main\.[0-9a-f]+\.js)"/.exec(home)?.[1];
  if (!mainPath) throw new Error("main bundle not found in the home page");
  const bundle = await get(SITE + mainPath);
  const version = /carbonVersion:"([^"]+)"/.exec(bundle)?.[1];
  if (!version) throw new Error("carbonVersion not found in the main bundle");
  const routes = [
    ...bundle.matchAll(/\{"slug":"([^"]*)","exportedCarbonFileId":"([0-9a-f-]{36}\.json)"/g),
  ].map(([, slug, file]) => ({ slug: slug!, file: file! }));
  console.log(`content version ${version}: ${routes.length} pages`);

  const cache = path.join(cacheRoot, version);
  const pages = new Map<string, Page>();
  await pool(routes, 8, async ({ slug, file }) => {
    const text = await cached(
      path.join(cache, "pages", `${fileName(slug)}.json`),
      `${SITE}/_dsm/content/m3/${version}/${file}`,
    );
    pages.set(slug, JSON.parse(text) as Page);
  });

  const modules = new Map<string, string[]>();
  for (const { slug } of routes) {
    for (const chunk of chunksOf(pages.get(slug)!)) {
      if (!chunk.libraryModuleType || !chunk.resourceName) continue;
      const id = `${chunk.libraryModuleType}.${chunk.resourceName.split("/").at(-1)}`;
      const usedOn = modules.get(id) ?? [];
      if (!usedOn.includes(slug)) usedOn.push(slug);
      modules.set(id, usedOn);
    }
  }
  await pool([...modules.keys()], 8, async (id) => {
    await cached(
      path.join(cache, "data", `${id}.json`),
      `${SITE}/_dsm/data/dsdb-m3/${version}/${id}.json`,
    );
  });
  console.log(`${modules.size} token modules cached in ${cache}`);

  const systems = new Map<string, System>();
  const system = (module: string) => {
    let s = systems.get(module);
    if (!s) {
      const file = path.join(cache, "data", `${module}.json`);
      s = (JSON.parse(fs.readFileSync(file, "utf8")) as { system: System }).system;
      systems.set(module, s);
    }
    return s;
  };

  return { version, routes, pages, modules, cache, get, cached, system };
};
