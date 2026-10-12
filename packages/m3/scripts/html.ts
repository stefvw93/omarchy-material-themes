// The subset of the spec's HTML that page content uses, as Markdown or as
// table rows.
import { SITE } from "./source.ts";

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

export const decode = (s: string) =>
  s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code =
        e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });

export const absolute = (href: string) => (href.startsWith("/") ? SITE + href : href);

const TAG = /<(\/?)([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g;

export const toMarkdown = (html: string): string => {
  let out = "";
  const lists: Array<{ ordered: boolean; n: number }> = [];
  let table: string[][] | null = null;
  let cell: string | null = null;
  let href: string | null = null;
  const write = (s: string) => {
    if (cell !== null) cell += s;
    else out += s;
  };

  for (const [, close, tag, attrs, text] of html.matchAll(TAG)) {
    if (text !== undefined) {
      write(decode(cell === null && lists.length === 0 ? text.replace(/[ \t]+/g, " ") : text));
      continue;
    }
    const name = tag!.toLowerCase();
    if (!close) {
      if (/^h[1-6]$/.test(name)) write(`\n\n${"#".repeat(Math.min(6, Number(name[1]) + 2))} `);
      else if (name === "p") write("\n\n");
      else if (name === "br") write(cell !== null ? " " : "\n");
      else if (name === "ul" || name === "ol") {
        lists.push({ ordered: name === "ol", n: 0 });
        write("\n");
      } else if (name === "li") {
        const list = lists.at(-1);
        const indent = "  ".repeat(Math.max(0, lists.length - 1));
        if (list?.ordered) write(`\n${indent}${++list.n}. `);
        else write(`\n${indent}- `);
      } else if (name === "strong" || name === "b") write("**");
      else if (name === "em" || name === "i") write("_");
      else if (name === "code") write("`");
      else if (name === "a") href = /href="([^"]*)"/.exec(attrs ?? "")?.[1] ?? null;
      else if (name === "table") table = [];
      else if (name === "tr" && table) table.push([]);
      else if ((name === "td" || name === "th") && table) cell = "";
    } else {
      if (name === "ul" || name === "ol") {
        lists.pop();
        write("\n");
      } else if (name === "strong" || name === "b") write("**");
      else if (name === "em" || name === "i") write("_");
      else if (name === "code") write("`");
      else if (name === "a") {
        if (href && !href.startsWith("#")) write(` (${absolute(decode(href))})`);
        href = null;
      } else if ((name === "td" || name === "th") && cell !== null && table) {
        table.at(-1)?.push(cell.replace(/\s+/g, " ").trim().replaceAll("|", "\\|"));
        cell = null;
      } else if (name === "table" && table) {
        const rows = table.filter((r) => r.length > 0);
        table = null;
        if (rows.length > 0) {
          const width = Math.max(...rows.map((r) => r.length));
          const pad = (r: string[]) => [...r, ...Array<string>(width - r.length).fill("")];
          const line = (r: string[]) => `| ${pad(r).join(" | ")} |`;
          write(
            `\n\n${[line(rows[0]!), `|${" --- |".repeat(width)}`, ...rows.slice(1).map(line)].join("\n")}\n\n`,
          );
        }
      }
    }
  }
  return out
    .replace(/\*\*\s*\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

/** Every table in `html`, as rows of plain cell text. */
export const tables = (html: string): string[][][] => {
  const found: string[][][] = [];
  let table: string[][] | null = null;
  let cell: string | null = null;
  for (const [, close, tag, , text] of html.matchAll(TAG)) {
    if (text !== undefined) {
      if (cell !== null) cell += decode(text);
      continue;
    }
    const name = tag!.toLowerCase();
    if (!close) {
      if (name === "table") table = [];
      else if (name === "tr" && table) table.push([]);
      else if ((name === "td" || name === "th") && table) cell = "";
      else if (name === "br" && cell !== null) cell += " ";
    } else if ((name === "td" || name === "th") && cell !== null && table) {
      table.at(-1)?.push(cell.replace(/\s+/g, " ").trim());
      cell = null;
    } else if (name === "table" && table) {
      found.push(table.filter((r) => r.length > 0));
      table = null;
    }
  }
  return found;
};
