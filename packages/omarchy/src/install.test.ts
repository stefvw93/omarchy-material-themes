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
import { Effect, Layer } from "effect";
import { describe, expect, it } from "vite-plus/test";
import {
  hooksIncludeBlock,
  installHooksInclude,
  installPlugin,
  legacyPeripheryHookBlock,
  readState,
  writeHooksFile,
  writeState,
} from "./install.ts";
import { OmarchyPaths, OmarchyPathsAt } from "./paths.ts";

/** A throwaway $HOME with a built plugin folder next to it. */
const setup = () => {
  const root = mkdtempSync(join(tmpdir(), "stef-omarchy-"));
  const home = join(root, "home");
  const built = join(root, "built");
  mkdirSync(join(built, "lib"), { recursive: true });
  writeFileSync(join(built, "manifest.json"), '{"id":"stef.x"}');
  writeFileSync(join(built, "hypr.lua"), "-- hook");
  writeFileSync(join(built, "lib/kit.mjs"), "export {}");
  const run = <A, E>(effect: Effect.Effect<A, E, OmarchyPaths | NodeServices.NodeServices>) =>
    Effect.runPromise(
      Effect.provide(effect, Layer.provideMerge(OmarchyPathsAt(home), NodeServices.layer)),
    );
  return { home, built, run };
};

describe("installPlugin", () => {
  it("copies the build in, and replaces an earlier install whole", async () => {
    const { home, built, run } = setup();
    const target = join(home, ".config/omarchy/plugins/stef.x");
    mkdirSync(target, { recursive: true });
    writeFileSync(join(target, "stale.qml"), "old");

    await run(installPlugin(built, "stef.x"));

    expect(readdirSync(target).sort()).toEqual(["hypr.lua", "lib", "manifest.json"]);
    expect(readFileSync(join(target, "lib/kit.mjs"), "utf8")).toBe("export {}");
    // Nothing left behind in the staging area or next to the plugin.
    expect(readdirSync(join(home, ".config/omarchy/stef/staging"))).toEqual([]);
    expect(readdirSync(join(home, ".config/omarchy/plugins"))).toEqual(["stef.x"]);
  });

  it("refuses to replace a git checkout", async () => {
    const { home, built, run } = setup();
    mkdirSync(join(home, ".config/omarchy/plugins/stef.x/.git"), { recursive: true });
    await expect(run(installPlugin(built, "stef.x"))).rejects.toThrow(/git repository/);
  });
});

describe("hooks", () => {
  it("loads the live variant's hook only", async () => {
    const { home, built, run } = setup();
    await run(installPlugin(built, "stef.x"));
    await run(installPlugin(built, "stef.x.dev"));
    await run(writeState({ active: { "stef.x": "dev" } }));
    const result = await run(writeHooksFile);

    const lua = readFileSync(join(home, ".config/hypr/stef/plugins.lua"), "utf8");
    expect(result.hooks).toBe(1);
    expect(lua).toContain("/plugins/stef.x.dev/hypr.lua");
    expect(lua).not.toContain("/plugins/stef.x/hypr.lua");
    expect((await run(readState)).active).toEqual({ "stef.x": "dev" });
  });

  it("swaps periphery's legacy block for the include, with a backup", async () => {
    const { home, run } = setup();
    const hypr = join(home, ".config/hypr");
    mkdirSync(hypr, { recursive: true });
    const original = `dofile("bootstrap")\n${legacyPeripheryHookBlock}\nrequire("default")\n`;
    writeFileSync(join(hypr, "hyprland.lua"), original);

    const first = await run(installHooksInclude);
    expect(first._tag).toBe("Installed");
    const text = readFileSync(join(hypr, "hyprland.lua"), "utf8");
    expect(text).toBe(`dofile("bootstrap")\n${hooksIncludeBlock}\nrequire("default")\n`);
    if (first._tag === "Installed") expect(readFileSync(first.backup, "utf8")).toBe(original);

    expect((await run(installHooksInclude))._tag).toBe("AlreadyInstalled");
  });

  it("leaves an unrecognised hyprland.lua alone", async () => {
    const { home, run } = setup();
    mkdirSync(join(home, ".config/hypr"), { recursive: true });
    writeFileSync(join(home, ".config/hypr/hyprland.lua"), "-- custom\n");
    expect((await run(installHooksInclude))._tag).toBe("Manual");
    expect(existsSync(join(home, ".config/hypr/hyprland.lua"))).toBe(true);
    expect(readFileSync(join(home, ".config/hypr/hyprland.lua"), "utf8")).toBe("-- custom\n");
  });
});
