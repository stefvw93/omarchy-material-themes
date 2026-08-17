import { Button } from "@/components/ui/button";
import { Effect, Schema } from "effect";
import { Action, Children, Command, define } from "react-argon";
import { component } from "../shared";
import { ColorPicker, ColorPickerHex, ColorPickerInput } from "@/components/ui/color-picker";
import { HexColor } from "../material/_colors";
import { Input } from "@/components/ui/input";
import { WallhavenService } from "../wallhaven/service";

const Props = Schema.Struct({
  children: Schema.optionalKey(Children),
});

const State = Schema.Struct({
  colorValue: Schema.String,
});

const InputColor = Action("InputColor", {
  hex: HexColor,
});

const ClickedSearch = Action("ClickedSearch", {});

const SeedAction = Action.of([InputColor, ClickedSearch]);

const SeedFactory = define({
  props: Props,
  state: State,
  action: SeedAction,
});

const initialState = SeedFactory.initialState(() => ({ colorValue: "#000000" }));

const reducer = SeedFactory.reducer({
  InputColor: (action, { state }) => ({ ...state, colorValue: action.hex }),
  ClickedSearch: (_action, { state }) => {
    return [
      { ...state },
      Command.effect((_dispatch) =>
        Effect.gen(function* () {
          const wallhaven = yield* WallhavenService;
          const result = yield* wallhaven.search({});
          console.log({ result });
        }).pipe(Effect.catch(() => Effect.void)),
      ),
    ];
  },
});

const render = SeedFactory.render(({ state, dispatch }) => (
  <div className="grid grid-cols-12 gap-4">
    <div className="col-span-3">
      {false && (
        <ColorPicker>
          <ColorPickerHex
            color={state.colorValue}
            onChange={(hex) => dispatch(InputColor.make({ hex }))}
          />
          <ColorPickerInput
            type="text"
            value={state.colorValue}
            onChange={(e) => dispatch(InputColor.make({ hex: e.target.value }))}
          />
        </ColorPicker>
      )}

      <Input type="file" accept="image/*" />
    </div>

    <div className="col-span-9">
      <Button onClick={() => dispatch(ClickedSearch.make({}))}>Search</Button>
    </div>
  </div>
));

const seed = SeedFactory.create({ initialState, reducer, render });

const Seed = component(seed, { name: "Seed" });

export { Seed };
