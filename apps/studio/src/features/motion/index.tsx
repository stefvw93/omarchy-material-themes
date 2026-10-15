import { Schema } from "effect";
import { Action, Task, define } from "@wych/react";
import type { Draft } from "@wych/react";
import { cssLinear, motionSchemes, settleTime, springStep, type Spring } from "@stef/motion";
import { defaultTokens, type Tokens, TokensSchema } from "@stef/tokens";
import { component } from "../shared";
import { LoadTokens, SaveTokens } from "../tokens/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ChartSeries, SpringChart } from "./spring-chart";

const Scheme = Schema.Literals(["standard", "expressive"]);
const SetScheme = Action("SetScheme", { scheme: Scheme });
const SetTable = Action("SetTable", { table: Schema.Boolean });
const Play = Action("Play", {});

const MotionDefinition = define({
  props: Schema.Struct({}),
  state: Schema.Struct({ tokens: TokensSchema, table: Schema.Boolean, plays: Schema.Number }),
  tasks: { load: LoadTokens, save: SaveTokens },
  actions: [SetScheme, SetTable, Play],
});

const speeds = ["fast", "default", "slow"] as const;
const colors = ["var(--series-1)", "var(--series-2)", "var(--series-3)"];

const seriesOf = (scheme: typeof Scheme.Type, kind: "spatial" | "effects"): ChartSeries[] =>
  speeds.map((speed, i) => ({
    name: speed,
    spring: motionSchemes[scheme][`${kind}_${speed}`],
    color: colors[i]!,
  }));

const peakOf = (spring: Spring) =>
  Math.max(...Array.from({ length: 2000 }, (_, ms) => springStep(ms, spring)));

const reducer = MotionDefinition.reducer({
  Mounted: (_, { tasks }) => tasks.load.start(),

  LoadTokensResolved: ({ value }, { draft }) => {
    draft.tokens = value as Draft<Tokens>;
    return draft;
  },

  /** The scheme is the motion.scheme token: saved, and previewed in Hyprland like the Tokens page. */
  SetScheme: ({ scheme }, { state, draft, tasks }) => {
    const next: Tokens = { ...state.tokens, motion: { ...state.tokens.motion, scheme } };
    draft.tokens = next as Draft<Tokens>;
    return tasks.save.start({ tokens: next, preview: true });
  },
  SetTable: ({ table }, { draft }) => {
    draft.table = table;
    return draft;
  },
  Play: (_, { state, draft }) => {
    draft.plays = state.plays + 1;
    return draft;
  },
});

/** A dot that travels on the spring's CSS linear() easing: what Studio's UI moves with. */
const Preview = ({ spring, color, plays }: { spring: Spring; color: string; plays: number }) => {
  const { easing, durationMs } = cssLinear(spring);
  return (
    <div className="relative h-4 rounded bg-muted">
      <div
        key={plays}
        className="absolute top-0.5 left-0.5 size-3 rounded-full"
        style={{
          background: color,
          animation: `motion-lab-travel ${durationMs}ms ${easing} forwards`,
        }}
      />
    </div>
  );
};

const render = MotionDefinition.render(({ state, dispatch }) => {
  const scheme = state.tokens.motion.scheme;
  const spatial = seriesOf(scheme, "spatial");
  const effects = seriesOf(scheme, "effects");
  const all = [
    ...spatial.map((s) => ({ ...s, group: "spatial" })),
    ...effects.map((s) => ({ ...s, group: "effects" })),
  ];
  // Both charts share one time axis, so the two families compare directly;
  // it ends a little after the slowest spring settles.
  const duration =
    Math.ceil((Math.max(...all.map((s) => settleTime(s.spring, 0.01))) * 1.15) / 50) * 50;

  return (
    <div className="flex flex-col gap-3 p-3 min-h-0 overflow-auto">
      <style>{`@keyframes motion-lab-travel { from { left: 2px } to { left: calc(100% - 14px) } }`}</style>
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Material 3 springs (mass 1) as Hyprland evaluates them. Spatial springs move things,
          effects springs change colour and opacity. The scheme is saved to tokens.json and applied
          to Hyprland, the plugins and Studio.
        </p>
        <Label htmlFor="motion-scheme">Motion scheme</Label>
        <Select
          items={[
            { value: "standard", label: "standard" },
            { value: "expressive", label: "expressive" },
          ]}
          value={scheme}
          onValueChange={(value) =>
            dispatch(SetScheme.make({ scheme: value === "expressive" ? "expressive" : "standard" }))
          }
        >
          <SelectTrigger id="motion-scheme">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="standard">standard</SelectItem>
              <SelectItem value="expressive">expressive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label className="flex items-center gap-2">
          <Switch
            checked={state.table}
            onCheckedChange={(table) => dispatch(SetTable.make({ table }))}
          />
          Table
        </Label>
      </div>

      {Task.isRejected(state.load) && (
        <p className="text-destructive">Could not read tokens: {state.load.error}</p>
      )}
      {Task.isRejected(state.save) && (
        <p className="text-destructive">Not saved: {state.save.error}</p>
      )}

      {state.table ? (
        <table className="text-sm">
          <thead className="text-muted-foreground text-left">
            <tr>
              <th className="font-normal py-1">spring</th>
              <th className="font-normal">stiffness</th>
              <th className="font-normal">ratio</th>
              <th className="font-normal">settles (±0.1%)</th>
              <th className="font-normal">peak</th>
              <th className="font-normal">at 100 ms</th>
              <th className="font-normal">at 200 ms</th>
            </tr>
          </thead>
          <tbody>
            {all.map((s) => (
              <tr key={`${s.group}_${s.name}`} className="border-t">
                <td className="py-1">
                  {s.group}_{s.name}
                </td>
                <td>{s.spring.stiffness}</td>
                <td>{s.spring.ratio}</td>
                <td>{settleTime(s.spring)} ms</td>
                <td>{peakOf(s.spring).toFixed(3)}</td>
                <td>{springStep(100, s.spring).toFixed(3)}</td>
                <td>{springStep(200, s.spring).toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <Card>
            <CardContent>
              <SpringChart title="Spatial" series={spatial} durationMs={duration} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <SpringChart title="Effects" series={effects} durationMs={duration} />
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            Each spring as a CSS linear() easing over its settle time
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {all.map((s) => (
            <div
              key={`${s.group}_${s.name}`}
              className="grid grid-cols-[9rem_1fr] items-center gap-3 text-sm"
            >
              <span className="text-muted-foreground">
                {s.group}_{s.name}
              </span>
              <Preview spring={s.spring} color={s.color} plays={state.plays} />
            </div>
          ))}
          <Button variant="outline" className="self-start" onClick={() => dispatch(Play.make({}))}>
            Play
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});

export const MotionPage = component(
  MotionDefinition.create({
    initialState: () => ({ tokens: defaultTokens, table: false, plays: 0 }),
    reducer,
    render,
  }),
  { name: "Motion" },
);
