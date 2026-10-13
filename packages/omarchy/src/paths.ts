import { Config, Context, Effect, Layer, Path } from "effect";

/** Where Omarchy and the stef tooling keep things, all under one $HOME. */
export interface OmarchyPathsImpl {
  readonly home: string;
  /** ~/.config/omarchy/plugins: the shell reloads on any write here. */
  readonly pluginsDir: string;
  readonly pluginDir: (id: string) => string;
  /** ~/.config/omarchy/themes: one folder per installed theme. */
  readonly themesDir: string;
  /** ~/.config/omarchy/shell.toml: the shell's settings ([font] base-size is the text size). */
  readonly shellToml: string;
  /** ~/.local/state/omarchy/current/theme: the applied theme's files. */
  readonly currentThemeDir: string;
  /** ~/.config/omarchy/stef: tokens.json and the tooling's state. */
  readonly stefDir: string;
  readonly tokensJson: string;
  readonly stateJson: string;
  /** ~/.config/hypr */
  readonly hyprDir: string;
  /** ~/.config/hypr/stef: generated Lua (plugins.lua, tokens.lua). */
  readonly stefHyprDir: string;
}

export class OmarchyPaths extends Context.Service<OmarchyPaths, OmarchyPathsImpl>()(
  "@stef/omarchy/OmarchyPaths",
) {
  static readonly make = (home: string) =>
    Effect.map(Path.Path, (path): OmarchyPathsImpl => {
      const config = path.join(home, ".config");
      const pluginsDir = path.join(config, "omarchy/plugins");
      const stefDir = path.join(config, "omarchy/stef");
      return {
        home,
        pluginsDir,
        pluginDir: (id) => path.join(pluginsDir, id),
        themesDir: path.join(config, "omarchy/themes"),
        shellToml: path.join(config, "omarchy/shell.toml"),
        currentThemeDir: path.join(home, ".local/state/omarchy/current/theme"),
        stefDir,
        tokensJson: path.join(stefDir, "tokens.json"),
        stateJson: path.join(stefDir, "state.json"),
        hyprDir: path.join(config, "hypr"),
        stefHyprDir: path.join(config, "hypr/stef"),
      };
    });
}

/** Paths under `home`; tests pass a throwaway directory. */
export const OmarchyPathsAt = (home: string) => Layer.effect(OmarchyPaths, OmarchyPaths.make(home));

/** Paths under the real $HOME. */
export const OmarchyPathsNode = Layer.effect(
  OmarchyPaths,
  Effect.gen(function* () {
    return yield* OmarchyPaths.make(yield* Config.String("HOME"));
  }),
);

/** Where Omarchy is installed: $OMARCHY_PATH, or the package's location. */
export const omarchyPath = Config.String("OMARCHY_PATH").pipe(
  Config.withDefault("/usr/share/omarchy"),
);
