import { Cause, Effect, Schema, Stream } from "effect";
import { Action, Subscription, Task, define } from "@wych/react";
import { Hyprland, structuralEvents } from "@stef/hyprland";
import { component } from "../shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Event = Schema.Struct({ at: Schema.Number, name: Schema.String, data: Schema.String });
const keep = 300;

const errorText = (cause: Cause.Cause<unknown>) => {
  const error = Cause.squash(cause);
  return error instanceof Error ? error.message : String(error);
};

const Snapshot = Task("Snapshot", {
  success: Schema.Struct({
    monitors: Schema.Array(
      Schema.Struct({ name: Schema.String, size: Schema.String, reserved: Schema.String }),
    ),
    clients: Schema.Array(
      Schema.Struct({
        address: Schema.String,
        class: Schema.String,
        title: Schema.String,
        workspace: Schema.String,
      }),
    ),
  }),
  onError: errorText,
  run: () =>
    Effect.gen(function* () {
      const hyprland = yield* Hyprland;
      const monitors = yield* hyprland.monitors;
      const clients = yield* hyprland.clients;
      return {
        monitors: monitors.map((m) => ({
          name: m.name,
          size: `${m.width}×${m.height} @${m.scale}`,
          reserved: m.reserved.join(" "),
        })),
        clients: clients.map((c) => ({
          address: c.address,
          class: c.class,
          title: c.title,
          workspace: c.workspace.name,
        })),
      };
    }),
});

const Received = Action("Received", Event.fields);
const StreamFailed = Action("StreamFailed", { message: Schema.String });
const SetPaused = Action("SetPaused", { paused: Schema.Boolean });
const SetStructural = Action("SetStructural", { structural: Schema.Boolean });
const SetFilter = Action("SetFilter", { filter: Schema.String });
const Clear = Action("Clear", {});
const RefreshSnapshot = Action("RefreshSnapshot", {});

const InspectorDefinition = define({
  props: Schema.Struct({}),
  state: Schema.Struct({
    events: Schema.Array(Event),
    paused: Schema.Boolean,
    structural: Schema.Boolean,
    filter: Schema.String,
    streamError: Schema.optional(Schema.String),
  }),
  tasks: { snapshot: Snapshot },
  actions: [Received, StreamFailed, SetPaused, SetStructural, SetFilter, Clear, RefreshSnapshot],
});

const reducer = InspectorDefinition.reducer({
  Mounted: (_, { tasks }) => tasks.snapshot.start(),
  RefreshSnapshot: (_, { tasks }) => tasks.snapshot.start(),
  Received: (event, { state, draft }) => {
    draft.events = [event, ...state.events.slice(0, keep - 1)];
    return draft;
  },
  StreamFailed: ({ message }, { draft }) => {
    draft.streamError = message;
    return draft;
  },
  SetPaused: ({ paused }, { draft }) => {
    draft.paused = paused;
    return draft;
  },
  SetStructural: ({ structural }, { draft }) => {
    draft.structural = structural;
    return draft;
  },
  SetFilter: ({ filter }, { draft }) => {
    draft.filter = filter;
    return draft;
  },
  Clear: (_, { draft }) => {
    draft.events = [];
    return draft;
  },
});

const render = InspectorDefinition.render(({ state, dispatch }) => {
  const shown = state.events.filter(
    (e) =>
      (!state.structural || structuralEvents.has(e.name)) &&
      (state.filter === "" || `${e.name}>>${e.data}`.includes(state.filter)),
  );
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 p-3 min-h-0 flex-1">
      <section className="flex flex-col gap-2 min-h-0">
        <div className="flex items-center gap-3">
          <h2 className="font-medium flex-1">Events</h2>
          <Input
            className="w-40"
            placeholder="filter"
            value={state.filter}
            onChange={(e) => dispatch(SetFilter.make({ filter: e.target.value }))}
          />
          <Label className="flex items-center gap-2">
            <Switch
              checked={state.structural}
              onCheckedChange={(structural) => dispatch(SetStructural.make({ structural }))}
            />
            structural
          </Label>
          <Label className="flex items-center gap-2">
            <Switch
              checked={state.paused}
              onCheckedChange={(paused) => dispatch(SetPaused.make({ paused }))}
            />
            paused
          </Label>
          <Button variant="outline" size="sm" onClick={() => dispatch(Clear.make({}))}>
            Clear
          </Button>
        </div>
        {state.streamError && <p className="text-destructive text-sm">{state.streamError}</p>}
        <ol className="font-mono text-xs overflow-auto min-h-0 flex-1 border rounded-md p-2">
          {shown.map((e, i) => (
            <li key={`${e.at}-${i}`} className="flex gap-2">
              <span className="text-muted-foreground">{new Date(e.at).toLocaleTimeString()}</span>
              <span className="font-semibold">{e.name}</span>
              <span className="truncate">{e.data}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-2 min-h-0">
        <div className="flex items-center gap-3">
          <h2 className="font-medium flex-1">Snapshot</h2>
          <Button variant="outline" size="sm" onClick={() => dispatch(RefreshSnapshot.make({}))}>
            Refresh
          </Button>
        </div>
        {Task.match(state.snapshot, {
          Idle: () => null,
          Pending: () => <p className="text-sm text-muted-foreground">Reading Hyprland…</p>,
          Rejected: ({ error }) => <p className="text-destructive text-sm">{error}</p>,
          Resolved: ({ value }) => (
            <div className="overflow-auto min-h-0 text-sm flex flex-col gap-3">
              <table>
                <thead className="text-muted-foreground text-left">
                  <tr>
                    <th className="font-normal">monitor</th>
                    <th className="font-normal">size</th>
                    <th className="font-normal">reserved (l t r b)</th>
                  </tr>
                </thead>
                <tbody>
                  {value.monitors.map((m) => (
                    <tr key={m.name} className="border-t">
                      <td className="py-1">{m.name}</td>
                      <td>{m.size}</td>
                      <td>{m.reserved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table>
                <thead className="text-muted-foreground text-left">
                  <tr>
                    <th className="font-normal">window</th>
                    <th className="font-normal">workspace</th>
                    <th className="font-normal">address</th>
                  </tr>
                </thead>
                <tbody>
                  {value.clients.map((c) => (
                    <tr key={c.address} className="border-t">
                      <td className="py-1">
                        <div>{c.class}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-64">
                          {c.title}
                        </div>
                      </td>
                      <td>{c.workspace}</td>
                      <td className="font-mono text-xs">{c.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        })}
      </section>
    </div>
  );
});

export const InspectorPage = component(
  InspectorDefinition.create({
    initialState: () => ({ events: [], paused: false, structural: false, filter: "" }),
    reducer,
    render,
    // While not paused, socket2's events stream in; pausing drops the key and
    // the runtime stops the stream (and the Rust reader with it).
    subscriptions: ({ state }) =>
      state.paused
        ? {}
        : {
            events: Subscription.effect((dispatch) =>
              Effect.gen(function* () {
                const hyprland = yield* Hyprland;
                yield* Stream.runForEach(hyprland.events, (e) =>
                  dispatch(Received, { at: Date.now(), name: e.name, data: e.data }),
                );
              }).pipe(Effect.catch((error) => dispatch(StreamFailed, { message: error.message }))),
            ),
          },
  }),
  { name: "Inspector" },
);
