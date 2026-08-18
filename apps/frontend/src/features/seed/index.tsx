import { Button } from "@/components/ui/button";
import { Effect, Match, Schema } from "effect";
import { Action, Async, Children, define, Next } from "react-argon";
import { component } from "../shared";
import { Input } from "@/components/ui/input";
import {
  WALLHAVEN_CATEGORIES,
  WALLHAVEN_CATEGORY,
  WALLHAVEN_PURITIES,
  WALLHAVEN_PURITY,
  WallhavenSearchParams,
  WallhavenSearchPayload,
  WallhavenService,
} from "../wallhaven/service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES: { value: WALLHAVEN_CATEGORY; label: string }[] = WALLHAVEN_CATEGORIES.map(
  (value) => ({ value, label: value }),
);

const PURITY: { value: WALLHAVEN_PURITY; label: string }[] = WALLHAVEN_PURITIES.map((value) => ({
  value,
  label: value,
}));

const InputType = Schema.Union([Schema.Literal("file"), Schema.Literal("wallhaven")]);

const Props = Schema.Struct({
  children: Schema.optionalKey(Children),
});

const search = Async("search", {
  success: WallhavenSearchPayload,
  onError: Async.message,
});

const State = Schema.Struct({
  inputType: InputType,
  searchParams: WallhavenSearchParams,
  ...search.field,
});

const ClickedSearch = Action("ClickedSearch", {});
const InputTypeChanged = Action("InputTypeChanged", { inputType: InputType });
const SearchParamsChanged = Action("SearchParamsChanged", { searchParams: WallhavenSearchParams });
const SeedAction = Action.of([
  ClickedSearch,
  InputTypeChanged,
  SearchParamsChanged,
  ...search.actions,
]);

const SeedFactory = define({
  props: Props,
  state: State,
  action: SeedAction,
});

const initialState = SeedFactory.initialState(() => ({
  inputType: "file" as const,
  searchParams: {
    categories: ["general"],
    purity: ["sfw"],
    sorting: "toplist",
  },
  search: search.idle,
}));

const reducer = SeedFactory.reducer({
  InputTypeChanged: (action, { state }) => {
    if (action.inputType === "file") {
      return { ...state, inputType: action.inputType };
    }

    const operation = search.start(
      state,
      Effect.flatMap(WallhavenService, (wallhaven) => wallhaven.search(state.searchParams)),
    );

    const command = Next.command(operation)!;
    const nextState = Next.state(operation);
    const next = { ...state, ...nextState, inputType: action.inputType };

    return [next, command];
  },

  SearchParamsChanged: (action, { state }) => ({ ...state, searchParams: action.searchParams }),

  ClickedSearch: (_action, { state }) =>
    search.start(
      state,
      Effect.flatMap(WallhavenService, (wallhaven) => wallhaven.search(state.searchParams)),
    ),

  ...search.handlers,
});

const render = SeedFactory.render(({ state, dispatch }) => {
  return (
    <div className="grid grid-cols-12 flex-1 min-h-0 gap-4 p-4">
      <div className="col-span-6 flex flex-col flex-1 min-h-0 gap-4">
        <Tabs
          value={state.inputType}
          onValueChange={(value) => dispatch(InputTypeChanged.make({ inputType: value }))}
          className="flex-1 min-h-0"
        >
          <TabsList>
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="wallhaven">Wallhaven</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="flex flex-col gap-4">
            Add a file.
            <Input type="file" accept="image/*" />
          </TabsContent>

          <TabsContent value="wallhaven" className="flex flex-col flex-1 min-h-0 gap-4">
            <div className="flex gap-2">
              <Select
                items={CATEGORIES}
                value={[...(state.searchParams.categories ?? ["general"])]}
                onValueChange={(values) =>
                  dispatch(
                    SearchParamsChanged.make({
                      searchParams: { ...state.searchParams, categories: values },
                    }),
                  )
                }
                multiple
              >
                <SelectTrigger>
                  <SelectValue placeholder="category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CATEGORIES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select items={PURITY} value={[...(state.searchParams.purity ?? ["sfw"])]} multiple>
                <SelectTrigger>
                  <SelectValue placeholder="purity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PURITY.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button
                disabled={state.search._tag === "Pending"}
                onClick={() => dispatch(ClickedSearch.make({}))}
              >
                {state.search._tag === "Pending" ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="flex flex-col flex-1 min-h-0">
              {Match.type<typeof state.search>().pipe(
                Match.tag("Idle", () => <></>),
                Match.tag("Pending", () => "Searching..."),
                Match.tag("Rejected", (result) => `Error: ${result.error}`),
                Match.tag("Resolved", (result) => (
                  <div className="flex flex-col flex-1 min-h-0 gap-4">
                    <div className="grid grid-cols-3 flex-1 min-h-0 overflow-auto gap-4">
                      {result.value.data.map((item) => (
                        <div key={item.id} className="aspect-4/3 relative">
                          <img
                            src={item.thumbs.large.toString()}
                            className="size-full absolute object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p>{`Ok: ${result.value.data.length} of ${result.value.meta.total}`}</p>
                  </div>
                )),
                Match.exhaustive,
              )(state.search)}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="col-span-6"></div>
    </div>
  );
});

const seed = SeedFactory.create({ initialState, reducer, render });

const Seed = component(seed, { name: "Seed" });

export { Seed };
