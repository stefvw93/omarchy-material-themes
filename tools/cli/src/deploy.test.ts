import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { HyprlandTest } from "@stef/hyprland/testing";
import { OmarchyPathsAt, readState } from "@stef/omarchy";
import { OmarchyShellTest } from "@stef/omarchy/testing";
import { Effect, Layer } from "effect";
import { describe, expect, it } from "vite-plus/test";
import { deploy, undeployDev } from "./deploy.ts";
import { pluginApp } from "./workspace.ts";

describe("deploy", () => {
  it("installs the dev variant beside prod, then puts prod back", { timeout: 60_000 }, async () => {
    const home = mkdtempSync(join(tmpdir(), "stef-cli-"));
    const shell = OmarchyShellTest();
    const hypr = HyprlandTest({ responses: {}, events: [] });
    const run = <A, E>(effect: Effect.Effect<A, E, never>) => Effect.runPromise(effect);
    const provide = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
      effect.pipe(
        Effect.provide(
          Layer.mergeAll(OmarchyPathsAt(home), shell.layer, hypr.layer).pipe(
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
