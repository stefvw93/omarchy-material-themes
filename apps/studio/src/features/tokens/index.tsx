import { Cause, Effect, Schema } from "effect";
import { Action, Task, define } from "@wych/react";
import type { Draft } from "@wych/react";
import { Hyprland } from "@stef/hyprland";
import { readTokens, writeTokens } from "@stef/omarchy";
import {
  cssVariables,
  defaultTokens,
  hyprlandTokensLua,
  type Tokens,
  TokensSchema,
} from "@stef/tokens";
import { component } from "../shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Slider ranges per token; the Schema still has the last word on save. */
const ranges: Record<string, { min: number; max: number; step: number; unit?: string }> = {
  "gaps.inner": { min: 0, max: 32, step: 1, unit: "px" },
  "gaps.outer": { min: 0, max: 64, step: 1, unit: "px" },
  "gaps.workspaces": { min: 0, max: 128, step: 1, unit: "px" },
  "border.width": { min: 0, max: 8, step: 1, unit: "px" },
  "border.gradientAngle": { min: 0, max: 360, step: 1, unit: "°" },
  "blur.size": { min: 0, max: 20, step: 1 },
  "blur.passes": { min: 0, max: 8, step: 1 },
  "shadow.range": { min: 0, max: 200, step: 1, unit: "px" },
  "shadow.renderPower": { min: 1, max: 4, step: 1 },
  "shadow.lightAngle": { min: 0, max: 360, step: 1, unit: "°" },
  "shadow.distance": { min: 0, max: 40, step: 1, unit: "px" },
  "expo.tileScaleFrom": { min: 0.5, max: 1, step: 0.01 },
  "expo.windowScaleFrom": { min: 0.5, max: 1, step: 0.01 },
};
const rangeOf = (path: string) =>
  ranges[path] ??
  (/(Stagger|Lead|Duration)$/.test(path)
    ? { min: 0, max: 1000, step: 5, unit: "ms" }
    : { min: 0, max: 200, step: 1, unit: "px" });

const groups: ReadonlyArray<{ key: keyof Tokens; title: string; description: string }> = [
  { key: "gaps", title: "Gaps", description: "Hyprland general:gaps_*" },
  { key: "border", title: "Border", description: "Width and the active-border gradient angle" },
  { key: "blur", title: "Blur", description: "Hyprland decoration:blur" },
  { key: "shadow", title: "Shadow", description: "Hyprland decoration:shadow" },
  { key: "expo", title: "Exposé", description: "stef.expo layout and entrance" },
  { key: "periphery", title: "Periphery", description: "stef.periphery bands and flights" },
];

/** Studio's own CSS follows the tokens, so its UI moves like the desktop. */
const applyCss = (tokens: Tokens) =>
  Effect.sync(() => {
    for (const [name, value] of Object.entries(cssVariables(tokens))) {
      document.documentElement.style.setProperty(name, value);
    }
  });

const LoadTokens = Task("LoadTokens", {
  success: TokensSchema,
  onError: (cause) => String(Cause.squash(cause)),
  run: () => Effect.tap(readTokens, applyCss),
});

/**
 * Debounced by the take-latest default: a new edit interrupts the sleep.
 * tokens.json reaches running plugins on its own (Tokens.qml watches it);
 * Hyprland gets the generated Lua through `hyprctl eval`, which lasts until
 * the next config reload.
 */
const SaveTokens = Task("SaveTokens", {
  success: Schema.Void,
  onError: (cause) => String(Cause.squash(cause)),
  run: (input: { readonly tokens: Tokens; readonly preview: boolean }) =>
    Effect.gen(function* () {
      yield* Effect.sleep("250 millis");
      yield* writeTokens(input.tokens);
      yield* applyCss(input.tokens);
      if (input.preview) {
        const hyprland = yield* Hyprland;
        yield* hyprland.eval(hyprlandTokensLua(input.tokens));
      }
    }),
});

const SetToken = Action("SetToken", {
  group: Schema.String,
  key: Schema.String,
  value: Schema.Union([Schema.Number, Schema.String]),
});
const SetPreview = Action("SetPreview", { preview: Schema.Boolean });
const ResetTokens = Action("ResetTokens", {});

const TokensDefinition = define({
  props: Schema.Struct({}),
  state: Schema.Struct({ tokens: TokensSchema, preview: Schema.Boolean }),
  tasks: { load: LoadTokens, save: SaveTokens },
  actions: [SetToken, SetPreview, ResetTokens],
});

const reducer = TokensDefinition.reducer({
  Mounted: (_, { tasks }) => tasks.load.start(),

  LoadTokensResolved: ({ value }, { draft }) => {
    draft.tokens = value as Draft<Tokens>;
    return draft;
  },

  SetToken: ({ group, key, value }, { state, draft, tasks }) => {
    const current = state.tokens[group as keyof Tokens] as Record<string, unknown>;
    const next = { ...state.tokens, [group]: { ...current, [key]: value } } as Tokens;
    draft.tokens = next as Draft<Tokens>;
    return tasks.save.start({ tokens: next, preview: state.preview });
  },

  SetPreview: ({ preview }, { draft }) => {
    draft.preview = preview;
    return draft;
  },

  ResetTokens: (_, { state, draft, tasks }) => {
    draft.tokens = defaultTokens as Draft<Tokens>;
    return tasks.save.start({ tokens: defaultTokens, preview: state.preview });
  },
});

const render = TokensDefinition.render(({ state, dispatch }) => (
  <div className="flex flex-col gap-3 p-3 min-h-0 overflow-auto">
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground flex-1">
        Saved to ~/.config/omarchy/stef/tokens.json as you edit; open plugins pick changes up live.
        Applying a theme on the Theme page makes the Hyprland values permanent.
      </p>
      <Label className="flex items-center gap-2">
        <Switch
          checked={state.preview}
          onCheckedChange={(preview) => dispatch(SetPreview.make({ preview }))}
        />
        Preview in Hyprland
      </Label>
      <Button variant="outline" onClick={() => dispatch(ResetTokens.make({}))}>
        Reset to defaults
      </Button>
    </div>

    {Task.isRejected(state.load) && (
      <p className="text-destructive">Could not read tokens: {state.load.error}</p>
    )}
    {Task.isRejected(state.save) && (
      <p className="text-destructive">Not saved: {state.save.error}</p>
    )}

    <Card>
      <CardHeader>
        <CardTitle>Motion</CardTitle>
        <CardDescription>The Material 3 scheme Hyprland and the plugins move with</CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          items={[
            { value: "standard", label: "standard" },
            { value: "expressive", label: "expressive" },
          ]}
          value={state.tokens.motion.scheme}
          onValueChange={(value) =>
            dispatch(SetToken.make({ group: "motion", key: "scheme", value: value ?? "standard" }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="standard">standard</SelectItem>
              <SelectItem value="expressive">expressive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {groups.map((group) => (
        <Card key={group.key}>
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {Object.entries(state.tokens[group.key] as Record<string, number>).map(
              ([key, value]) => {
                const range = rangeOf(`${group.key}.${key}`);
                const set = (v: number) =>
                  dispatch(SetToken.make({ group: group.key, key, value: v }));
                return (
                  <div key={key} className="grid grid-cols-[10rem_1fr_6rem] items-center gap-3">
                    <Label htmlFor={`${group.key}.${key}`}>{key}</Label>
                    <Slider
                      min={range.min}
                      max={range.max}
                      step={range.step}
                      value={value}
                      onValueChange={(v) => set(v as number)}
                    />
                    <div className="flex items-center gap-1">
                      <Input
                        id={`${group.key}.${key}`}
                        type="number"
                        min={range.min}
                        step={range.step}
                        value={value}
                        onChange={(event) => {
                          const v = event.target.valueAsNumber;
                          if (Number.isFinite(v)) set(v);
                        }}
                      />
                      <span className="text-xs text-muted-foreground w-5">{range.unit}</span>
                    </div>
                  </div>
                );
              },
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
));

export const TokensPage = component(
  TokensDefinition.create({
    initialState: () => ({ tokens: defaultTokens, preview: true }),
    reducer,
    render,
  }),
  { name: "Tokens" },
);
