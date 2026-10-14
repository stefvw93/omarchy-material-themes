import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import { manifestFor, metaModule, rewriteHookPluginId } from "./build.ts";
import { definePlugin } from "./define.ts";
import { PluginManifest } from "./manifest.ts";

const config = definePlugin({
  id: "stef.example",
  name: "Example",
  version: "1.0.0",
  author: "Stef",
  kinds: ["overlay"],
  entryPoints: { overlay: "Example.qml" },
});

describe("manifestFor", () => {
  it.effect("writes the prod manifest in Omarchy's field order", () =>
    Effect.gen(function* () {
      const manifest = yield* manifestFor(config, "prod");
      expect(Object.keys(manifest)).toEqual([
        "schemaVersion",
        "id",
        "name",
        "version",
        "author",
        "kinds",
        "entryPoints",
      ]);
      expect(manifest).toMatchObject({ schemaVersion: 1, id: "stef.example", name: "Example" });
    }),
  );

  it.effect("gives dev builds their own id and name", () =>
    Effect.gen(function* () {
      const manifest = yield* manifestFor(config, "dev");
      expect(manifest.id).toBe("stef.example.dev");
      expect(manifest.name).toBe("Example (dev)");
    }),
  );

  it.effect("keeps a clone's source in both variants", () =>
    Effect.gen(function* () {
      const clone = { ...config, omarchy: { clonedFrom: "omarchy.lock" } };
      expect((yield* manifestFor(clone, "prod")).omarchy).toEqual({ clonedFrom: "omarchy.lock" });
      expect((yield* manifestFor(clone, "dev")).omarchy).toEqual({ clonedFrom: "omarchy.lock" });
    }),
  );

  it.effect("rejects an entry point that escapes the plugin folder", () =>
    Effect.gen(function* () {
      const exit = yield* Effect.exit(
        manifestFor({ ...config, entryPoints: { overlay: "../Evil.qml" } }, "prod"),
      );
      expect(Exit.isFailure(exit)).toBe(true);
    }),
  );
});

describe("PluginManifest", () => {
  const decode = Schema.decodeUnknownExit(PluginManifest);
  const base = {
    schemaVersion: 1,
    id: "stef.x",
    name: "X",
    version: "1",
    kinds: ["panel"],
    entryPoints: { panel: "X.qml" },
  };

  it.each([
    ["schemaVersion 2", { schemaVersion: 2 }],
    ["an id with a slash", { id: "stef/x" }],
    ["an id with ..", { id: "stef..x" }],
    ["empty kinds", { kinds: [] }],
    ["an unknown kind", { kinds: ["widget"] }],
    ["an absolute entry point", { entryPoints: { panel: "/etc/X.qml" } }],
  ])("rejects %s, like PluginRegistry.validateManifest", (_, patch) => {
    expect(Exit.isFailure(decode({ ...base, ...patch }))).toBe(true);
  });

  it("accepts a valid manifest", () => {
    expect(Exit.isSuccess(decode(base))).toBe(true);
  });
});

describe("rewriteHookPluginId", () => {
  const hook = 'local x = 1\nlocal PLUGIN_ID = "stef.example" -- plugin-kit:id\nprint(PLUGIN_ID)\n';

  it.effect("points the hook at the built id", () =>
    Effect.gen(function* () {
      const out = yield* rewriteHookPluginId(hook, "stef.example.dev");
      expect(out).toContain('local PLUGIN_ID = "stef.example.dev" -- plugin-kit:id');
      expect(out).not.toContain('"stef.example"');
    }),
  );

  it.effect("fails when the marked line is missing", () =>
    Effect.gen(function* () {
      const exit = yield* Effect.exit(rewriteHookPluginId("print(1)\n", "stef.example"));
      expect(Exit.isFailure(exit)).toBe(true);
    }),
  );
});

describe("metaModule", () => {
  it("exports the id and mode as constants", () => {
    expect(metaModule("stef.example.dev", "dev")).toContain(
      'export const pluginId = "stef.example.dev";',
    );
  });
});
