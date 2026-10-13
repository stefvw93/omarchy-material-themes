import { describe, expect, it } from "@effect/vitest";
import { ConfigProvider, Effect, Layer, Path } from "effect";
import { omarchyPath, OmarchyPaths, OmarchyPathsNode } from "./paths.ts";

/** The environment a layer or Config reads, as a record. */
const env = (vars: Record<string, string>) =>
  ConfigProvider.layer(ConfigProvider.fromEnv({ env: vars }));

describe("OmarchyPathsNode", () => {
  it.effect("puts everything under $HOME", () =>
    Effect.gen(function* () {
      const paths = yield* OmarchyPaths;
      expect(paths.home).toBe("/home/u");
      expect(paths.tokensJson).toBe("/home/u/.config/omarchy/stef/tokens.json");
      expect(paths.pluginDir("stef.x")).toBe("/home/u/.config/omarchy/plugins/stef.x");
      expect(paths.stefHyprDir).toBe("/home/u/.config/hypr/stef");
      expect(paths.themesDir).toBe("/home/u/.config/omarchy/themes");
      expect(paths.shellToml).toBe("/home/u/.config/omarchy/shell.toml");
      expect(paths.currentThemeDir).toBe("/home/u/.local/state/omarchy/current/theme");
    }).pipe(
      Effect.provide(
        OmarchyPathsNode.pipe(Layer.provide(Layer.mergeAll(Path.layer, env({ HOME: "/home/u" })))),
      ),
    ),
  );

  it.effect("fails without $HOME", () =>
    Effect.gen(function* () {
      const paths = Effect.gen(function* () {
        return yield* OmarchyPaths;
      });
      const error = yield* Effect.flip(
        paths.pipe(
          Effect.provide(OmarchyPathsNode),
          Effect.provide(Layer.mergeAll(Path.layer, env({}))),
        ),
      );
      expect(error._tag).toBe("ConfigError");
    }),
  );
});

describe("omarchyPath", () => {
  it.effect("is $OMARCHY_PATH", () =>
    Effect.gen(function* () {
      expect(yield* omarchyPath).toBe("/opt/omarchy");
    }).pipe(Effect.provide(env({ OMARCHY_PATH: "/opt/omarchy" }))),
  );

  it.effect("defaults to the package's location", () =>
    Effect.gen(function* () {
      expect(yield* omarchyPath).toBe("/usr/share/omarchy");
    }).pipe(Effect.provide(env({}))),
  );
});
