import { Button } from "@/components/ui/button";
import { Effect, Schema } from "effect";
import { Action, Children, Command, define } from "react-argon";
import { component } from "../shared";
import { ColorPicker, ColorPickerHex, ColorPickerInput } from "@/components/ui/color-picker";
import { HexColor } from "../material/_colors";
import { Input } from "@/components/ui/input";
import { WallhavenSearchPayload, WallhavenService } from "../wallhaven/service";

const Props = Schema.Struct({
  children: Schema.optionalKey(Children),
});

const State = Schema.Struct({
  colorValue: Schema.String,
  isSearchPending: Schema.Boolean,
  searchResults: Schema.optionalKey(WallhavenSearchPayload),
});

const InputColor = Action("InputColor", { hex: HexColor });
const ClickedSearch = Action("ClickedSearch", {});
const SearchPending = Action("SearchPending", {});
const SearchFulfilled = Action("SearchFulfilled", { data: WallhavenSearchPayload });
const SearchRejected = Action("SearchRejected", {});

const SeedAction = Action.of([
  InputColor,
  ClickedSearch,
  SearchPending,
  SearchFulfilled,
  SearchRejected,
]);

const SeedFactory = define({
  props: Props,
  state: State,
  action: SeedAction,
});

const initialState = SeedFactory.initialState(() => ({
  colorValue: "#000000",
  isSearchPending: false,
}));

const reducer = SeedFactory.reducer({
  InputColor: (action, { state }) => ({ ...state, colorValue: action.hex }),

  SearchPending: (_action, { state }) => ({ ...state, isSearchPending: true }),

  SearchFulfilled: (action, { state }) => ({
    ...state,
    isSearchPending: false,
    searchResults: action.data,
  }),

  SearchRejected: (_action, { state }) => ({ ...state, isSearchPending: false }),

  ClickedSearch: (_action, { state }) => {
    return [
      { ...state },
      Command.batch(
        Command.effect((dispatch) => dispatch(SearchPending.make({}))),
        Command.restart(
          "search",
          Command.effect((dispatch) =>
            Effect.gen(function* () {
              const wallhaven = yield* WallhavenService;
              yield* dispatch(SearchFulfilled.make({ data: yield* wallhaven.search({}) }));
            }).pipe(Effect.catch(() => dispatch(SearchRejected.make({})))),
          ),
        ),
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
      <Button disabled={state.isSearchPending} onClick={() => dispatch(ClickedSearch.make({}))}>
        {state.isSearchPending ? "Searching..." : "Search"}
      </Button>
    </div>
  </div>
));

const seed = SeedFactory.create({ initialState, reducer, render });

const Seed = component(seed, { name: "Seed" });

export { Seed };
