import { Cause, Effect, Schema } from "effect";
import { Action, Task, define } from "@wych/react";
import { OmarchyShell, readState, Variant } from "@stef/omarchy";
import { component } from "../shared";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const PluginRow = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  kinds: Schema.Array(Schema.String),
  enabled: Schema.Boolean,
  /** For a stef plugin: which variant `stef deploy`/`stef dev` made live. */
  live: Schema.optional(Variant),
});

const errorText = (cause: Cause.Cause<unknown>) => {
  const error = Cause.squash(cause);
  return error instanceof Error ? error.message : String(error);
};

/** Every plugin the shell knows that isn't first-party: ours, and anything else installed. */
const ListPlugins = Task("ListPlugins", {
  success: Schema.Array(PluginRow),
  onError: errorText,
  run: () =>
    Effect.gen(function* () {
      const shell = yield* OmarchyShell;
      const state = yield* readState;
      const plugins = yield* shell.listPlugins;
      return plugins
        .filter((p) => !p.firstParty)
        .map((p) => {
          const base = p.id.replace(/\.dev$/, "");
          const live = state.active[base];
          return {
            id: p.id,
            name: p.name,
            kinds: p.kinds,
            enabled: p.enabled,
            ...(live ? { live } : {}),
          };
        });
    }),
});

const SetEnabled = Task("SetEnabled", {
  success: Schema.Void,
  onError: errorText,
  run: ({ id, enabled }: { readonly id: string; readonly enabled: boolean }) =>
    Effect.flatMap(OmarchyShell, (shell) => shell.setPluginEnabled(id, enabled)),
});

const TogglePlugin = Task("TogglePlugin", {
  success: Schema.Void,
  onError: errorText,
  run: (id: string) => Effect.flatMap(OmarchyShell, (shell) => shell.toggle(id)),
});

const Refresh = Action("Refresh", {});
const Enable = Action("Enable", { id: Schema.String, enabled: Schema.Boolean });
const Open = Action("Open", { id: Schema.String });

const PluginsDefinition = define({
  props: Schema.Struct({}),
  state: Schema.Struct({}),
  tasks: { plugins: ListPlugins, enable: SetEnabled, toggle: TogglePlugin },
  actions: [Refresh, Enable, Open],
});

const reducer = PluginsDefinition.reducer({
  Mounted: (_, { tasks }) => tasks.plugins.start(),
  Refresh: (_, { tasks }) => tasks.plugins.start(),
  Enable: ({ id, enabled }, { tasks }) => tasks.enable.start({ id, enabled }),
  // The registry persists the change; read it back rather than assuming it.
  SetEnabledResolved: (_, { tasks }) => tasks.plugins.start(),
  Open: ({ id }, { tasks }) => tasks.toggle.start(id),
});

const render = PluginsDefinition.render(({ state, dispatch }) => (
  <div className="flex flex-col gap-3 p-3 min-h-0 overflow-auto">
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground flex-1">
        Plugins the Omarchy shell has installed. Build, deploy and live-develop them from the repo
        with <code>pnpm stef deploy &lt;app&gt;</code> and <code>pnpm stef dev &lt;app&gt;</code>.
      </p>
      <Button variant="outline" onClick={() => dispatch(Refresh.make({}))}>
        Refresh
      </Button>
    </div>
    {Task.isRejected(state.enable) && <p className="text-destructive">{state.enable.error}</p>}
    {Task.isRejected(state.toggle) && <p className="text-destructive">{state.toggle.error}</p>}
    {Task.match(state.plugins, {
      Idle: () => null,
      Pending: () => <p className="text-sm text-muted-foreground">Asking the shell…</p>,
      Rejected: ({ error }) => <p className="text-destructive">{error}</p>,
      Resolved: ({ value }) => (
        <table className="text-sm">
          <thead className="text-muted-foreground text-left">
            <tr>
              <th className="font-normal py-1">plugin</th>
              <th className="font-normal">kind</th>
              <th className="font-normal">live variant</th>
              <th className="font-normal">enabled</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {value.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="py-2">
                  <div>{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.id}</div>
                </td>
                <td>{p.kinds.join(", ")}</td>
                <td>{p.live ?? "—"}</td>
                <td>
                  <Switch
                    checked={p.enabled}
                    aria-label={`Enable ${p.name}`}
                    onCheckedChange={(enabled) => dispatch(Enable.make({ id: p.id, enabled }))}
                  />
                </td>
                <td className="text-right">
                  {p.kinds.some((k) => k === "panel" || k === "overlay" || k === "menu") && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!p.enabled}
                      onClick={() => dispatch(Open.make({ id: p.id }))}
                    >
                      Toggle
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    })}
  </div>
));

export const PluginsPage = component(
  PluginsDefinition.create({ initialState: () => ({}), reducer, render }),
  { name: "Plugins" },
);
