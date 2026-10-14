import type { PluginManifest } from "./manifest.ts";

/** What a plugin app declares in its `plugin.config.ts`. */
export interface PluginConfig extends Omit<PluginManifest, "schemaVersion"> {
  /** Directory of QML files copied to the plugin root. Default `"qml"`. */
  readonly qml?: string;
  /**
   * Hyprland Lua hook, copied as `hypr.lua`. It must contain the line
   * `local PLUGIN_ID = "<id>" -- plugin-kit:id`, which the build rewrites to
   * the built id (e.g. `stef.periphery.dev`).
   */
  readonly hyprHook?: string;
  /**
   * QML files `check` doesn't lint: untouched copies of Omarchy's own files,
   * whose diff against upstream must stay empty.
   */
  readonly qmllintSkip?: ReadonlyArray<string>;
  /** TypeScript entries bundled for the QML engine: `lib/<name>.mjs`. */
  readonly libs?: Readonly<Record<string, string>>;
  /** Extra files copied to the plugin root as-is, e.g. `README.md`. */
  readonly files?: ReadonlyArray<string>;
  /**
   * Live checks against the running session, run by `stef smoke`: a module
   * whose default export is `(ctx: { id }) => Effect` (see `SmokeTest`).
   */
  readonly smoke?: string;
}

export const definePlugin = <const C extends PluginConfig>(config: C): C => config;

/**
 * prod builds the real plugin; dev builds a side-by-side copy whose id gets a
 * `.dev` suffix, so both can be installed and enabled independently.
 */
export type BuildMode = "prod" | "dev";

export const pluginIdFor = (config: Pick<PluginConfig, "id">, mode: BuildMode): string =>
  mode === "dev" ? `${config.id}.dev` : config.id;
