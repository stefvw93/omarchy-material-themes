import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { HyprlandTest } from "@stef/hyprland/testing";
import { OmarchyPathsAt, readState } from "@stef/omarchy";
import { OmarchyCliTest, OmarchyShellTest } from "@stef/omarchy/testing";
import { Effect, Layer } from "effect";
import { deploy, undeployDev } from "./deploy.ts";
import { pluginApp } from "./workspace.ts";

describe("deploy", () => {
  // it.live: the enable retries really sleep (the shell's rescan is async).
  it.live(
    "installs the dev variant beside prod, then puts prod back",
    () => {
      const home = mkdtempSync(join(tmpdir(), "stef-cli-"));
      const shell = OmarchyShellTest();
      const omarchy = OmarchyCliTest();
      const hypr = HyprlandTest({ responses: {}, events: [] });
      const plugins = join(home, ".config/omarchy/plugins");
      return Effect.gen(function* () {
        const app = yield* pluginApp("periphery");

        yield* deploy(app, "dev");
        expect(existsSync(join(plugins, "stef.periphery.dev/manifest.json"))).toBe(true);
        expect(
          JSON.parse(readFileSync(join(plugins, "stef.periphery.dev/manifest.json"), "utf8")).id,
        ).toBe("stef.periphery.dev");
        expect(readFileSync(join(plugins, "stef.periphery.dev/hypr.lua"), "utf8")).toContain(
          'local PLUGIN_ID = "stef.periphery.dev" -- plugin-kit:id',
        );
        expect((yield* readState).active).toEqual({ "stef.periphery": "dev" });
        const hooks = readFileSync(join(home, ".config/hypr/stef/plugins.lua"), "utf8");
        expect(hooks).toContain("stef.periphery.dev/hypr.lua");
        expect(shell.calls).toContain("enable stef.periphery.dev");
        expect(hypr.requests).toContain("reload config-only");
        // A first install: the shell has no code of it cached.
        expect(omarchy.calls).not.toContain("restart shell");

        yield* undeployDev(app);
        expect(existsSync(join(plugins, "stef.periphery.dev"))).toBe(false);
        expect((yield* readState).active).toEqual({ "stef.periphery": "prod" });
        // prod isn't installed in this $HOME: its hook is not loaded.
        expect(readFileSync(join(home, ".config/hypr/stef/plugins.lua"), "utf8")).not.toContain(
          "dofile",
        );
      }).pipe(
        Effect.provide(
          Layer.mergeAll(OmarchyPathsAt(home), shell.layer, omarchy.layer, hypr.layer).pipe(
            Layer.provideMerge(NodeServices.layer),
          ),
        ),
      );
    },
    { timeout: 60_000 },
  );
  it.live(
    "restarts the shell when it already knew the plugin",
    () => {
      const home = mkdtempSync(join(tmpdir(), "stef-cli-"));
      const known = { name: "", kinds: ["panel"], enabled: true, firstParty: false };
      const shell = OmarchyShellTest({
        listPlugins: Effect.succeed([{ ...known, id: "stef.periphery" }]),
      });
      const omarchy = OmarchyCliTest();
      const hypr = HyprlandTest({ responses: {}, events: [] });
      return Effect.gen(function* () {
        const app = yield* pluginApp("periphery");
        yield* deploy(app, "prod");
        expect(shell.calls.at(-1)).toBe("enable stef.periphery");
        expect(omarchy.calls).toEqual(["restart shell"]);
      }).pipe(
        Effect.provide(
          Layer.mergeAll(OmarchyPathsAt(home), shell.layer, omarchy.layer, hypr.layer).pipe(
            Layer.provideMerge(NodeServices.layer),
          ),
        ),
      );
    },
    { timeout: 60_000 },
  );
});
