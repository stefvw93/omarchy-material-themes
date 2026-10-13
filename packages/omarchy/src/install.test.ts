import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { TestClock } from "effect/testing";
import {
  hooksIncludeBlock,
  installHooksInclude,
  installPlugin,
  legacyPeripheryHookBlock,
  readState,
  writeHooksFile,
  writeState,
} from "./install.ts";
import { OmarchyPathsAt } from "./paths.ts";

/** A throwaway $HOME with a built plugin folder next to it, on the real file system. */
const setup = () => {
  const root = mkdtempSync(join(tmpdir(), "stef-omarchy-"));
  const home = join(root, "home");
  const built = join(root, "built");
  mkdirSync(join(built, "lib"), { recursive: true });
  writeFileSync(join(built, "manifest.json"), '{"id":"stef.x"}');
  writeFileSync(join(built, "hypr.lua"), "-- hook");
  writeFileSync(join(built, "lib/kit.mjs"), "export {}");
  const layer = Layer.provideMerge(OmarchyPathsAt(home), NodeServices.layer);
  return { home, built, layer };
};

describe("installPlugin", () => {
  it.effect("copies the build in, and replaces an earlier install whole", () => {
    const { home, built, layer } = setup();
    const target = join(home, ".config/omarchy/plugins/stef.x");
    mkdirSync(target, { recursive: true });
    writeFileSync(join(target, "stale.qml"), "old");
    return Effect.gen(function* () {
      yield* installPlugin(built, "stef.x");
      expect(readdirSync(target).sort()).toEqual(["hypr.lua", "lib", "manifest.json"]);
      expect(readFileSync(join(target, "lib/kit.mjs"), "utf8")).toBe("export {}");
      // Nothing left behind in the staging area or next to the plugin.
      expect(readdirSync(join(home, ".config/omarchy/stef/staging"))).toEqual([]);
      expect(readdirSync(join(home, ".config/omarchy/plugins"))).toEqual(["stef.x"]);
    }).pipe(Effect.provide(layer));
  });

  it.effect("refuses to replace a git checkout", () => {
    const { home, built, layer } = setup();
    mkdirSync(join(home, ".config/omarchy/plugins/stef.x/.git"), { recursive: true });
    return Effect.gen(function* () {
      expect(yield* Effect.flip(installPlugin(built, "stef.x"))).toMatch(/git repository/);
    }).pipe(Effect.provide(layer));
  });
});

describe("hooks", () => {
  it.effect("loads the live variant's hook only", () => {
    const { home, built, layer } = setup();
    return Effect.gen(function* () {
      yield* installPlugin(built, "stef.x");
      yield* installPlugin(built, "stef.x.dev");
      yield* writeState({ active: { "stef.x": "dev" } });
      const result = yield* writeHooksFile;

      const lua = readFileSync(join(home, ".config/hypr/stef/plugins.lua"), "utf8");
      expect(result.hooks).toBe(1);
      expect(lua).toContain("/plugins/stef.x.dev/hypr.lua");
      expect(lua).not.toContain("/plugins/stef.x/hypr.lua");
      expect((yield* readState).active).toEqual({ "stef.x": "dev" });
    }).pipe(Effect.provide(layer));
  });

  it.effect("swaps periphery's legacy block for the include, with a backup", () => {
    const { home, layer } = setup();
    const hypr = join(home, ".config/hypr");
    mkdirSync(hypr, { recursive: true });
    const original = `dofile("bootstrap")\n${legacyPeripheryHookBlock}\nrequire("default")\n`;
    writeFileSync(join(hypr, "hyprland.lua"), original);
    return Effect.gen(function* () {
      yield* TestClock.setTime(1_700_000_000_000);
      const first = yield* installHooksInclude;
      expect(first._tag).toBe("Installed");
      if (first._tag === "Installed") {
        expect(first.backup).toBe(join(hypr, "hyprland.lua.bak-1700000000000"));
      }
      const text = readFileSync(join(hypr, "hyprland.lua"), "utf8");
      expect(text).toBe(`dofile("bootstrap")\n${hooksIncludeBlock}\nrequire("default")\n`);
      if (first._tag === "Installed") expect(readFileSync(first.backup, "utf8")).toBe(original);

      expect((yield* installHooksInclude)._tag).toBe("AlreadyInstalled");
    }).pipe(Effect.provide(layer));
  });

  it.effect("leaves an unrecognised hyprland.lua alone", () => {
    const { home, layer } = setup();
    mkdirSync(join(home, ".config/hypr"), { recursive: true });
    writeFileSync(join(home, ".config/hypr/hyprland.lua"), "-- custom\n");
    return Effect.gen(function* () {
      expect((yield* installHooksInclude)._tag).toBe("Manual");
      expect(existsSync(join(home, ".config/hypr/hyprland.lua"))).toBe(true);
      expect(readFileSync(join(home, ".config/hypr/hyprland.lua"), "utf8")).toBe("-- custom\n");
    }).pipe(Effect.provide(layer));
  });
});
