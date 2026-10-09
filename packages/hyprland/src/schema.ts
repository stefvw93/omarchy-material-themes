import { Schema } from "effect";

/** The subset of `hyprctl -j` objects the plugins and tools read. Extra keys are ignored. */

export const WorkspaceRef = Schema.Struct({ id: Schema.Number, name: Schema.String });

export const Client = Schema.Struct({
  address: Schema.String,
  mapped: Schema.Boolean,
  hidden: Schema.Boolean,
  at: Schema.Tuple([Schema.Number, Schema.Number]),
  size: Schema.Tuple([Schema.Number, Schema.Number]),
  workspace: WorkspaceRef,
  floating: Schema.Boolean,
  monitor: Schema.Number,
  class: Schema.String,
  title: Schema.String,
  fullscreen: Schema.Number,
  pid: Schema.Number,
  focusHistoryID: Schema.Number,
});
export type Client = typeof Client.Type;

export const Monitor = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  x: Schema.Number,
  y: Schema.Number,
  width: Schema.Number,
  height: Schema.Number,
  scale: Schema.Number,
  focused: Schema.Boolean,
  /** left, top, right, bottom: space reserved by layer surfaces. */
  reserved: Schema.Tuple([Schema.Number, Schema.Number, Schema.Number, Schema.Number]),
  activeWorkspace: WorkspaceRef,
  specialWorkspace: WorkspaceRef,
});
export type Monitor = typeof Monitor.Type;

export const Workspace = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  monitor: Schema.String,
  windows: Schema.Number,
  hasfullscreen: Schema.Boolean,
});
export type Workspace = typeof Workspace.Type;

/** `hyprctl getoption -j`: exactly one of the value keys is present. */
export const OptionValue = Schema.Struct({
  option: Schema.String,
  int: Schema.optionalKey(Schema.Number),
  float: Schema.optionalKey(Schema.Number),
  str: Schema.optionalKey(Schema.String),
  set: Schema.Boolean,
});
export type OptionValue = typeof OptionValue.Type;

/** `hyprctl binds -j`, the fields a plugin's own binds are recognised by. */
export const Bind = Schema.Struct({
  description: Schema.String,
});
export type Bind = typeof Bind.Type;
