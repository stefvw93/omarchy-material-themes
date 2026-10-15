import { Schema } from "effect";
import { Action, Task, define } from "@wych/react";
import type { Draft } from "@wych/react";
import { defaultTokens, tokenChoices, type Tokens, TokensSchema } from "@stef/tokens";
import { component } from "../shared";
import { LoadTokens, SaveTokens } from "./tasks";
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

/** Slider ranges for the tokens that are plain numbers; the Schema has the last word on save. */
const ranges: Record<string, { min: number; max: number; step: number; unit?: string }> = {
  // One step is 1px of body text (md.sys.typescale.body-medium is 14).
  "type.scale": { min: 10 / 14, max: 28 / 14, step: 1 / 14, unit: "×" },
  "translucency.bar.alpha": { min: 0.5, max: 1, step: 0.01 },
  "translucency.flyouts.alpha": { min: 0.5, max: 1, step: 0.01 },
  "blur.size": { min: 0, max: 20, step: 1 },
  "blur.passes": { min: 0, max: 8, step: 1 },
  "expo.tileScaleFrom": { min: 0.5, max: 1, step: 0.01 },
  "expo.windowScaleFrom": { min: 0.5, max: 1, step: 0.01 },
};
const rangeOf = (path: string) =>
  ranges[path] ??
  (/(Stagger|Lead)$/.test(path)
    ? { min: 0, max: 1000, step: 5, unit: "ms" }
    : { min: 0, max: 100, step: 1 });

const groups: ReadonlyArray<{
  readonly title: string;
  readonly description: string;
  readonly paths: ReadonlyArray<string>;
}> = [
  {
    title: "Material 3",
    description:
      "Motion scheme, window corners, density (components and layout, 4dp per level), borders and type scale",
    paths: ["motion.scheme", "shape.windowCorner", "density", "border.width", "type.scale"],
  },
  {
    title: "Layout",
    description:
      "Space around and between windows, as md.sys.measurement steps; density removes 4dp per level",
    paths: ["layout.margin", "layout.spacer", "layout.workspaceGap"],
  },
  {
    title: "Window groups",
    description:
      "Hyprland's group tabs as an M3 connected button group: button size, square or round corners, and the padding between tabs and to the window (the spec's 2dp by default)",
    paths: ["groupbar.size", "groupbar.shape", "groupbar.padding"],
  },
  {
    title: "Bar",
    description:
      "stef.bar's segments, an M3 connected button group: round (outer corners full, inner the size's corner) or square, the button size's corner, the gap between segments (the spec's 2dp), the padding at a text segment's ends (icon buttons space themselves), the docked bar's inset from the screen's sides, and the width of every icon button (M3's narrow, default or wide extra-small icon button)",
    paths: ["bar.shape", "bar.size", "bar.gap", "bar.padding", "bar.inset", "bar.iconWidth"],
  },
  {
    title: "Translucency (not M3)",
    description:
      "A spec exception, as ChromeOS's shelf: the bar and the flyouts opened from it are translucent over the blur, each at its own alpha; off is opaque, as M3 has it",
    paths: [
      "translucency.bar.enabled",
      "translucency.bar.alpha",
      "translucency.flyouts.enabled",
      "translucency.flyouts.alpha",
    ],
  },
  {
    title: "Special workspace",
    description:
      "Behind the scratchpad: the M3 scrim, always; a blur on top of it is not M3 (as Android blurs behind its shade)",
    paths: ["special.blur"],
  },
  {
    title: "Blur (not M3)",
    description:
      "Hyprland's one blur, behind the translucent bar and flyouts and the special workspace",
    paths: ["blur.size", "blur.passes"],
  },
  {
    title: "Exposé",
    description: "stef.expo spacing (steps) and entrance choreography (not M3)",
    paths: [
      "expo.outerMargin",
      "expo.tileGap",
      "expo.tilePadding",
      "expo.rise",
      "expo.tileStagger",
      "expo.windowStagger",
      "expo.windowLead",
      "expo.tileScaleFrom",
      "expo.windowScaleFrom",
    ],
  },
  {
    title: "Periphery",
    description: "stef.periphery spacing (steps)",
    paths: ["periphery.bandMargin", "periphery.cardGap", "periphery.groupGap"],
  },
];

type Leaf = string | number | boolean;

const getIn = (tokens: Tokens, path: string): Leaf =>
  path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], tokens) as Leaf;

const setIn = (value: unknown, keys: ReadonlyArray<string>, leaf: Leaf): unknown => {
  const [key, ...rest] = keys;
  if (key === undefined) return leaf;
  const obj = value as Record<string, unknown>;
  return { ...obj, [key]: setIn(obj[key], rest, leaf) };
};

const SetToken = Action("SetToken", {
  path: Schema.String,
  value: Schema.Union([Schema.Number, Schema.String, Schema.Boolean]),
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

  SetToken: ({ path, value }, { state, draft, tasks }) => {
    const next = setIn(state.tokens, path.split("."), value) as Tokens;
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

/** Labels where the key alone would be ambiguous ("scheme" reads as the colour scheme). */
const labels: Record<string, string> = { "motion.scheme": "motion scheme" };
const label = (path: string) => labels[path] ?? (path.split(".").slice(1).join(".") || path);

const Field = ({
  path,
  value,
  set,
}: {
  readonly path: string;
  readonly value: Leaf;
  readonly set: (value: Leaf) => void;
}) => {
  const choices = tokenChoices[path];
  if (choices) {
    // Choices can be numbers (density); the select works on their text.
    const items = choices.map((c) => ({ value: String(c), label: String(c) }));
    const pick = (text: string | null) => {
      const choice = choices.find((c) => String(c) === text);
      if (choice !== undefined) set(choice as Leaf);
    };
    return (
      <Select items={items} value={String(value)} onValueChange={pick}>
        <SelectTrigger id={path}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  if (typeof value === "boolean") {
    return <Switch id={path} checked={value} onCheckedChange={(checked) => set(checked)} />;
  }
  const range = rangeOf(path);
  return (
    <div className="grid grid-cols-[1fr_6rem] items-center gap-3">
      <Slider
        min={range.min}
        max={range.max}
        step={range.step}
        value={value as number}
        onValueChange={(v) => set(v as number)}
      />
      <div className="flex items-center gap-1">
        <Input
          id={path}
          type="number"
          min={range.min}
          step={range.step}
          value={value as number}
          onChange={(event) => {
            const v = event.target.valueAsNumber;
            if (Number.isFinite(v)) set(v);
          }}
        />
        <span className="text-xs text-muted-foreground w-5">{range.unit}</span>
      </div>
    </div>
  );
};

const render = TokensDefinition.render(({ state, dispatch }) => (
  <div className="flex flex-col gap-3 p-3 min-h-0 overflow-auto">
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground flex-1">
        Saved to ~/.config/omarchy/stef/tokens.json as you edit; open plugins pick changes up live.
        Applying a theme on the Theme page renders the tokens into it.
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

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {groups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {group.paths.map((path) => (
              <div key={path} className="grid grid-cols-[10rem_1fr] items-center gap-3">
                <Label htmlFor={path}>{label(path)}</Label>
                <Field
                  path={path}
                  value={getIn(state.tokens, path)}
                  set={(value) => dispatch(SetToken.make({ path, value }))}
                />
              </div>
            ))}
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
