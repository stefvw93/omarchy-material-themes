import { Schema } from "effect";

/**
 * Omarchy shell plugin manifest, `manifest.json` in the plugin folder.
 * Mirrors `validateManifest` in $OMARCHY_PATH/shell/services/PluginRegistry.qml:
 * a manifest that fails there is skipped by the shell with only a warning, so
 * the build rejects it first.
 */

export const PluginKind = Schema.Literals([
  "bar-widget",
  "panel",
  "overlay",
  "menu",
  "service",
  "bar",
]);
export type PluginKind = typeof PluginKind.Type;

/** No "/", no "..", not empty: the id names the plugin folder. */
export const PluginId = Schema.String.check(Schema.isPattern(/^(?!.*\.\.)[^/]+$/));

/** Relative to the plugin folder, and never escaping it. */
export const EntryPoint = Schema.String.check(Schema.isPattern(/^(?!\/)(?!.*\.\.).+$/));

export const EntryPoints = Schema.Struct({
  barWidget: Schema.optionalKey(EntryPoint),
  panel: Schema.optionalKey(EntryPoint),
  overlay: Schema.optionalKey(EntryPoint),
  menu: Schema.optionalKey(EntryPoint),
  service: Schema.optionalKey(EntryPoint),
  bar: Schema.optionalKey(EntryPoint),
});

/**
 * Omarchy's own metadata. `clonedFrom` names the first-party plugin this one
 * replaces: the shell disables that plugin when the clone is enabled, and
 * hands the clone its trusted capabilities (the lock's `authentication`).
 */
export const OmarchyMetadata = Schema.Struct({
  clonedFrom: Schema.optionalKey(PluginId),
  capabilities: Schema.optionalKey(Schema.Array(Schema.String)),
});

export const PluginManifest = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  id: PluginId,
  name: Schema.String,
  version: Schema.String,
  author: Schema.optionalKey(Schema.String),
  description: Schema.optionalKey(Schema.String),
  kinds: Schema.NonEmptyArray(PluginKind),
  entryPoints: EntryPoints,
  keepLoaded: Schema.optionalKey(Schema.Boolean),
  omarchy: Schema.optionalKey(OmarchyMetadata),
});
export type PluginManifest = typeof PluginManifest.Type;
