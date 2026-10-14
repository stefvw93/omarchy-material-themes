import { Effect, FileSystem, Layer, PlatformError } from "effect";
import { OmarchyCli, type OmarchyCliImpl } from "./cli.ts";
import { OmarchyError, OmarchyShell, type OmarchyShellImpl } from "./shell.ts";

const notFound = (method: string, path: string) =>
  PlatformError.systemError({
    _tag: "NotFound",
    module: "FileSystem",
    method,
    pathOrDescriptor: path,
    description: "no such file or directory",
  });

const under = (dir: string) => (path: string) => path === dir || path.startsWith(`${dir}/`);

/**
 * An in-memory FileSystem over `files` (path -> text or bytes), which tests
 * can seed and read back. Directories exist when made or when a file is
 * under them. Only exists, read, write, makeDirectory, readDirectory and
 * remove are implemented; anything else fails (`FileSystem.layerNoop`), which
 * documents what a unit touches.
 */
export const MemoryFileSystem = (files = new Map<string, string | Uint8Array>()) => {
  const dirs = new Set<string>();
  const isDir = (path: string) =>
    dirs.has(path) || [...files.keys()].some((f) => f.startsWith(`${path}/`));
  const bytes = (content: string | Uint8Array) =>
    typeof content === "string" ? new TextEncoder().encode(content) : content;
  const read = (method: string, path: string) =>
    Effect.suspend(() => {
      const content = files.get(path);
      return content === undefined ? Effect.fail(notFound(method, path)) : Effect.succeed(content);
    });

  const layer = FileSystem.layerNoop({
    exists: (path) => Effect.sync(() => files.has(path) || isDir(path)),
    readFile: (path) => Effect.map(read("readFile", path), bytes),
    readFileString: (path) =>
      Effect.map(read("readFileString", path), (c) =>
        typeof c === "string" ? c : new TextDecoder().decode(c),
      ),
    writeFile: (path, data) => Effect.sync(() => void files.set(path, data)),
    writeFileString: (path, data) => Effect.sync(() => void files.set(path, data)),
    makeDirectory: (path) => Effect.sync(() => void dirs.add(path)),
    readDirectory: (path) =>
      Effect.suspend(() => {
        if (!isDir(path)) return Effect.fail(notFound("readDirectory", path));
        const names = new Set<string>();
        for (const p of [...files.keys(), ...dirs])
          if (p.startsWith(`${path}/`)) names.add(p.slice(path.length + 1).split("/")[0]!);
        return Effect.succeed([...names].sort());
      }),
    remove: (path, options) =>
      Effect.suspend(() => {
        if (!files.has(path) && !isDir(path)) {
          return options?.force ? Effect.void : Effect.fail(notFound("remove", path));
        }
        const inside = under(path);
        for (const f of files.keys()) if (inside(f)) files.delete(f);
        for (const d of dirs) if (inside(d)) dirs.delete(d);
        return Effect.void;
      }),
  });
  return { layer, files, dirs };
};

/**
 * A fake shell that, like the real one, only knows a new plugin folder once
 * its inotify rescan has run: the first setPluginEnabled of an id fails.
 * `calls` records rescans, enables and disables in order.
 */
export const OmarchyShellTest = (overrides: Partial<OmarchyShellImpl> = {}) => {
  const calls: string[] = [];
  const seen = new Set<string>();
  const layer = Layer.succeed(OmarchyShell, {
    listPlugins: Effect.succeed([]),
    rescanPlugins: Effect.sync(() => void calls.push("rescan")),
    setPluginEnabled: (id, enabled) =>
      Effect.suspend(() => {
        if (!seen.has(id)) {
          seen.add(id);
          return Effect.fail(new OmarchyError({ message: "unknown" }));
        }
        calls.push(`${enabled ? "enable" : "disable"} ${id}`);
        return Effect.void;
      }),
    toggle: (id) => Effect.sync(() => void calls.push(`toggle ${id}`)),
    ipc: () => Effect.succeed(""),
    ...overrides,
  });
  return { layer, calls };
};

/** A fake `omarchy` command: `calls` records each invocation as its argument line. */
export const OmarchyCliTest = (overrides: Partial<OmarchyCliImpl> = {}) => {
  const calls: string[] = [];
  const layer = Layer.succeed(OmarchyCli, {
    setTheme: (name) => Effect.sync(() => void calls.push(`theme set ${name}`)),
    restartShell: Effect.sync(() => void calls.push("restart shell")),
    ...overrides,
  });
  return { layer, calls };
};
