import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { fixtureTransport } from "@stef/hyprland";
import { OmarchyError, OmarchyPaths, OmarchyShell, readState } from "@stef/omarchy";
import { Effect, Layer } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { deploy, undeployDev } from "./deploy.ts";
import { pluginApp } from "./workspace.ts";

/**
 * A fake shell that, like the real one, only knows a new plugin folder once
 * its inotify rescan has run: the first setPluginEnabled of an id fails.
 */
const fakeShell = () => {
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
    toggle: () => Effect.void,
    ipc: () => Effect.succeed(""),
  });
  return { calls, layer };
};

describe("deploy", () => {
  it("installs the dev variant beside prod, then puts prod back", { timeout: 60_000 }, async () => {
    const home = mkdtempSync(join(tmpdir(), "stef-cli-"));
    const shell = fakeShell();
    const hypr = fixtureTransport({ responses: {}, events: [] });
    const run = <A, E>(effect: Effect.Effect<A, E, never>) => Effect.runPromise(effect);
    const provide = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
      effect.pipe(
        Effect.provide(
          Layer.mergeAll(OmarchyPaths.layerAt(home), shell.layer, hypr.layer).pipe(
            Layer.provideMerge(NodeServices.layer),
          ),
        ),
      ) as Effect.Effect<A, E, never>;

    const app = await run(provide(pluginApp("periphery")));
    const plugins = join(home, ".config/omarchy/plugins");

    await run(provide(deploy(app, "dev")));
    expect(existsSync(join(plugins, "stef.periphery.dev/manifest.json"))).toBe(true);
    expect(
      JSON.parse(readFileSync(join(plugins, "stef.periphery.dev/manifest.json"), "utf8")).id,
    ).toBe("stef.periphery.dev");
    expect(readFileSync(join(plugins, "stef.periphery.dev/hypr.lua"), "utf8")).toContain(
      'local PLUGIN_ID = "stef.periphery.dev" -- plugin-kit:id',
    );
    expect((await run(provide(readState))).active).toEqual({ "stef.periphery": "dev" });
    const hooks = readFileSync(join(home, ".config/hypr/stef/plugins.lua"), "utf8");
    expect(hooks).toContain("stef.periphery.dev/hypr.lua");
    expect(shell.calls).toContain("enable stef.periphery.dev");
    expect(hypr.requests).toContain("reload config-only");

    await run(provide(undeployDev(app)));
    expect(existsSync(join(plugins, "stef.periphery.dev"))).toBe(false);
    expect((await run(provide(readState))).active).toEqual({ "stef.periphery": "prod" });
    // prod isn't installed in this $HOME: its hook is not loaded.
    expect(readFileSync(join(home, ".config/hypr/stef/plugins.lua"), "utf8")).not.toContain(
      "dofile",
    );
  });
});
