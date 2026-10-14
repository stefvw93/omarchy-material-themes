#!/usr/bin/env node
import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Hyprland } from "@stef/hyprland";
import { HyprlandNode } from "@stef/hyprland/node";
import {
  installHooksInclude,
  OmarchyPathsNode,
  OmarchyShell,
  OmarchyCliNode,
  OmarchyShellNode,
  readState,
  type SmokeTest,
  variantId,
} from "@stef/omarchy";
import {
  buildPlugin,
  checkBundles,
  checkEngineTests,
  checkLua,
  checkQml,
  checkTokens,
} from "@stef/plugin-kit";
import { Console, Effect, Layer, Path } from "effect";
import { Argument, Command, Flag } from "effect/cli";
import { deploy, undeployDev } from "./deploy.ts";
import { devLive, harness } from "./dev.ts";
import { migrateOverview } from "./migrate.ts";
import { record } from "./record.ts";
import { applyTokens, migrateTokensFile, setToken, showTokens } from "./tokens.ts";
import { CliError, pluginApp, pluginApps } from "./workspace.ts";

const app = Argument.String("app").pipe(
  Argument.withDescription("Plugin app: folder name (periphery) or id (stef.periphery)"),
);
const dev = Flag.Boolean("dev").pipe(
  Flag.withDescription("The side-by-side dev variant (<id>.dev)"),
  Flag.withDefault(false),
);

const list = Command.make("list", {}, () =>
  Effect.gen(function* () {
    const state = yield* readState;
    for (const a of yield* pluginApps) {
      const live = state.active[a.config.id] ?? "prod";
      yield* Console.log(`${a.name.padEnd(12)} ${a.config.id.padEnd(18)} live: ${live}`);
    }
  }),
).pipe(Command.withDescription("List the plugin apps and which variant is live"));

const build = Command.make("build", { app, dev }, ({ app: name, dev: isDev }) =>
  Effect.gen(function* () {
    const a = yield* pluginApp(name);
    const out = yield* buildPlugin(a.root, a.config, isDev ? "dev" : "prod");
    yield* Console.log(`built ${out}`);
  }),
).pipe(Command.withDescription("Build dist/<prod|dev>/<id>"));

const check = Command.make("check", { app }, ({ app: name }) =>
  Effect.gen(function* () {
    const a = yield* pluginApp(name);
    const out = yield* buildPlugin(a.root, a.config, "prod");
    yield* checkQml(a.root, out, a.config.qmllintSkip);
    yield* checkBundles(out);
    yield* checkTokens(out);
    yield* checkEngineTests(a.root, out);
    yield* checkLua(a.root, a.config);
    yield* Console.log(`${a.config.id}: qml, bundles, tokens, lua ok`);
  }),
).pipe(Command.withDescription("QML lint, bundles and tokens in the QML engine, Lua hook tests"));

const deployCmd = Command.make("deploy", { app, dev }, ({ app: name, dev: isDev }) =>
  Effect.flatMap(pluginApp(name), (a) => deploy(a, isDev ? "dev" : "prod")),
).pipe(
  Command.withDescription(
    "Build, install into ~/.config/omarchy/plugins, make it the live variant and enable it",
  ),
);

const undeploy = Command.make("undeploy", { app }, ({ app: name }) =>
  Effect.flatMap(pluginApp(name), undeployDev),
).pipe(Command.withDescription("Remove the dev variant and put prod back"));

const devCmd = Command.make("dev", { app }, ({ app: name }) =>
  Effect.flatMap(pluginApp(name), devLive),
).pipe(
  Command.withDescription(
    "Live dev in the real shell: deploy <id>.dev, rebuild on every change, restore prod on exit",
  ),
);

const harnessCmd = Command.make("harness", { app }, ({ app: name }) =>
  Effect.flatMap(pluginApp(name), harness),
).pipe(
  Command.withDescription(
    "The dev build in its own qs process (a crash leaves the shell alone); hooks still reach the main shell",
  ),
);

const smoke = Command.make("smoke", { app }, ({ app: name }) =>
  Effect.gen(function* () {
    const a = yield* pluginApp(name);
    if (a.config.smoke === undefined) {
      return yield* new CliError({
        message: `${a.name} has no smoke test (plugin.config.ts smoke)`,
      });
    }
    const path = yield* Path.Path;
    const test = (yield* Effect.promise(
      () =>
        import(path.join(a.root, a.config.smoke!)) as Promise<{
          readonly default: SmokeTest<Hyprland | OmarchyShell>;
        }>,
    )).default;
    const live = (yield* readState).active[a.config.id] ?? "prod";
    yield* test({ id: variantId(a.config.id, live) });
  }),
).pipe(Command.withDescription("Live checks against the running session, on the live variant"));

const hyprRecord = Command.make(
  "record",
  {
    file: Argument.String("file"),
    seconds: Flag.Int("seconds").pipe(Flag.withDefault(10)),
  },
  ({ file, seconds }) => record(file, seconds),
).pipe(Command.withDescription("Record a Hyprland fixture (snapshots + events) for tests"));

const hypr = Command.make("hypr").pipe(Command.withSubcommands([hyprRecord]));

const tokens = Command.make("tokens").pipe(
  Command.withDescription("Design tokens in ~/.config/omarchy/stef/tokens.json"),
  Command.withSubcommands([
    Command.make("show", {}, () => showTokens),
    Command.make(
      "set",
      { key: Argument.String("key"), value: Argument.String("value") },
      ({ key, value }) => setToken(key, value),
    ),
    Command.make("apply", {}, () => applyTokens),
    Command.make("migrate", {}, () => migrateTokensFile),
  ]),
);

const hooks = Command.make("hooks").pipe(
  Command.withSubcommands([
    Command.make("install", {}, () =>
      Effect.flatMap(installHooksInclude, (result) =>
        Console.log(
          result._tag === "Installed"
            ? `hyprland.lua now loads ~/.config/hypr/stef/plugins.lua (backup: ${result.backup}); run hyprctl reload`
            : result._tag === "AlreadyInstalled"
              ? "already installed"
              : result.reason,
        ),
      ),
    ).pipe(
      Command.withDescription(
        "Point hyprland.lua at the generated plugins.lua instead of periphery's hook",
      ),
    ),
  ]),
);

const migrate = Command.make("migrate").pipe(
  Command.withSubcommands([
    Command.make("overview", {}, () => Effect.flatMap(pluginApp("expo"), migrateOverview)).pipe(
      Command.withDescription(
        "Replace stef.overview with stef.expo: deploy, keybinding, blur rule, retire the old folder",
      ),
    ),
  ]),
);

const stef = Command.make("stef").pipe(
  Command.withDescription("Build, run and deploy the omarchy-stef plugins"),
  Command.withSubcommands([
    list,
    build,
    check,
    deployCmd,
    undeploy,
    devCmd,
    harnessCmd,
    smoke,
    hypr,
    tokens,
    hooks,
    migrate,
  ]),
);

const services = Layer.mergeAll(
  OmarchyPathsNode,
  OmarchyShellNode,
  OmarchyCliNode,
  HyprlandNode,
).pipe(Layer.provideMerge(NodeServices.layer));

Command.run(stef, { version: "0.0.0" }).pipe(Effect.provide(services), NodeRuntime.runMain);
