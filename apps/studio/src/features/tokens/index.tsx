import { Cause, Effect, Schema } from "effect";
import { Action, Task, define } from "@wych/react";
import type { Draft } from "@wych/react";
import { Hyprland } from "@stef/hyprland";
import { readTokens, writeTokens } from "@stef/omarchy";
import {
  cssVariables,
  defaultTokens,
  hyprlandTokensLua,
  tokenChoices,
  type Tokens,
  TokensSchema,
} from "@stef/tokens";
import { setTypeScale } from "@/m3/text-scale";
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

/** Slider ranges for the tokens that are plain numbers; the Schema has the last word on save. */
const ranges: Record<string, { min: number; max: number; step: number; unit?: string }> = {
  // One step is 1px of body text (md.sys.typescale.body-medium is 14).
  "type.scale": { min: 10 / 14, max: 28 / 14, step: 1 / 14, unit: "×" },
  "flyouts.alpha": { min: 0.5, max: 1, step: 0.01 },
  "flyouts.blur.size": { min: 0, max: 20, step: 1 },
  "flyouts.blur.passes": { min: 0, max: 8, step: 1 },
  "expo.tileScaleFrom": { min: 0.5, max: 1, step: 0.01 },
  "expo.windowScaleFrom": { min: 0.5, max: 1, step: 0.01 },
  "periphery.ghostBlur": { min: 0, max: 200, step: 1, unit: "px" },
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
    title: "Bar flyouts (not M3)",
    description:
      "The one exception to M3's opaque surfaces: popups opened from the bar may be translucent over a blur",
    paths: ["flyouts.translucent", "flyouts.alpha", "flyouts.blur.size", "flyouts.blur.passes"],
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
    description: "stef.periphery spacing (steps) and wallpaper ghost blur (not M3)",
    paths: [
      "periphery.bandMargin",
      "periphery.cardGap",
      "periphery.groupGap",
      "periphery.ghostBlur",
    ],
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

/** Studio's own CSS follows the tokens, so its UI moves like the desktop. */
const applyCss = (tokens: Tokens) =>
  Effect.sync(() => {
    for (const [name, value] of Object.entries(cssVariables(tokens))) {
      document.documentElement.style.setProperty(name, value);
    }
    setTypeScale(tokens.type.scale);
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
 * the next config reload. Applying a theme renders the tokens into it.
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

const label = (path: string) => path.split(".").slice(1).join(".") || path;

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
