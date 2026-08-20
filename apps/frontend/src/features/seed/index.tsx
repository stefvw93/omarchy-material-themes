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
import { PexelsPhoto, PexelsService } from "../pexels/service";

const CATEGORIES: { value: WALLHAVEN_CATEGORY; label: string }[] = WALLHAVEN_CATEGORIES.map(
  (value) => ({ value, label: value }),
);

const PURITY: { value: WALLHAVEN_PURITY; label: string }[] = WALLHAVEN_PURITIES.map((value) => ({
  value,
  label: value,
}));

const InputType = Schema.Union([
  Schema.Literal("file"),
  Schema.Literal("wallhaven"),
  Schema.Literal("pexels"),
]);

const Props = Schema.Struct({
  children: Schema.optionalKey(Children),
});

const wallhavenSearch = Async("search", {
  success: WallhavenSearchPayload,
  onError: Async.message,
});

const loadPexelsCurated = Async("pexels", {
  success: Schema.Array(PexelsPhoto),
  onError: Async.message,
});

const State = Schema.Struct({
  inputType: InputType,
  wallhaven: Schema.Struct({
    searchParams: WallhavenSearchParams,
  }),
  ...wallhavenSearch.field,
  ...loadPexelsCurated.field,
});

const ClickedSearch = Action("ClickedSearch", {});
const InputTypeChanged = Action("InputTypeChanged", { inputType: InputType });
const SearchParamsChanged = Action("SearchParamsChanged", { searchParams: WallhavenSearchParams });
const SeedAction = Action.of([
  ClickedSearch,
  InputTypeChanged,
  SearchParamsChanged,
  ...wallhavenSearch.actions,
  ...loadPexelsCurated.actions,
]);

const SeedFactory = define({
  props: Props,
  state: State,
  action: SeedAction,
});

const initialState = SeedFactory.initialState(() => ({
  inputType: "file" as const,
  wallhaven: {
    searchParams: {
      categories: ["general"],
      purity: ["sfw"],
      sorting: "toplist",
    },
  },
  search: wallhavenSearch.idle,
  pexels: loadPexelsCurated.idle,
}));

const reducer = SeedFactory.reducer({
  InputTypeChanged: (action, { state }) => {
    if (action.inputType === "file") {
      return { ...state, inputType: action.inputType };
    }

    if (action.inputType === "pexels") {
      const operation = loadPexelsCurated.start(
        state,
        Effect.flatMap(PexelsService, (pexels) => pexels.curated),
      );

      const command = Next.command(operation)!;
      const nextState = Next.state(operation);
      const next = { ...state, ...nextState, inputType: action.inputType };

      return [next, command];
    }

    if (action.inputType === "wallhaven") {
      const operation = wallhavenSearch.start(
        state,
        Effect.flatMap(WallhavenService, (wallhaven) =>
          wallhaven.search(state.wallhaven.searchParams),
        ),
      );

      const command = Next.command(operation)!;
      const nextState = Next.state(operation);
      const next = { ...state, ...nextState, inputType: action.inputType };

      return [next, command];
    }

    return state;
  },

  SearchParamsChanged: (action, { state }) => ({
    ...state,
    wallhaven: { ...state.wallhaven, searchParams: action.searchParams },
  }),

  ClickedSearch: (_action, { state }) => {
    const operation = wallhavenSearch.start(
      state,
      Effect.flatMap(WallhavenService, (wallhaven) =>
        wallhaven.search(state.wallhaven.searchParams),
      ),
    );

    const command = Next.command(operation);
    const nextState = Next.state(operation);
    const next = { ...state, ...nextState };

    return command ? [next, command] : state;
  },

  ...wallhavenSearch.handlers,
  ...loadPexelsCurated.handlers,
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
            <TabsTrigger value="pexels">Pexels</TabsTrigger>
            <TabsTrigger value="wallhaven">Wallhaven</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="flex flex-col gap-4">
            Add a file.
            <Input type="file" accept="image/*" />
          </TabsContent>

          <TabsContent value="pexels" className="flex flex-col flex-1 min-h-0 gap-4">
            <div className="flex flex-col flex-1 min-h-0">
              {Match.type<typeof state.pexels>().pipe(
                Match.tag("Idle", () => <></>),
                Match.tag("Pending", () => "Loading..."),
                Match.tag("Rejected", (result) => `Error: ${result.error}`),
                Match.tag("Resolved", (result) => (
                  <div className="flex flex-col flex-1 min-h-0 gap-4 @container">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 overflow-auto gap-4">
                      {result.value.map((item) => (
                        // `thumbs.large` maxes out around 432x243, so keep cells
                        // small enough that they are not upscaled on HiDPI.
                        <button key={item.id} type="button" className="aspect-video relative">
                          <img
                            src={item.src.medium.toString()}
                            loading="lazy"
                            decoding="async"
                            className="size-full absolute object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    <p>{`${result.value.length} total`}</p>
                  </div>
                )),
                Match.exhaustive,
              )(state.pexels)}
            </div>
          </TabsContent>

          <TabsContent value="wallhaven" className="flex flex-col flex-1 min-h-0 gap-4">
            <div className="flex gap-2">
              <Select
                items={CATEGORIES}
                value={[...(state.wallhaven.searchParams.categories ?? ["general"])]}
                onValueChange={(values) =>
                  dispatch(
                    SearchParamsChanged.make({
                      searchParams: {
                        ...state.wallhaven.searchParams,
                        categories: values,
                      },
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

              <Select
                items={PURITY}
                value={[...(state.wallhaven.searchParams.purity ?? ["sfw"])]}
                onValueChange={(values) =>
                  dispatch(
                    SearchParamsChanged.make({
                      searchParams: {
                        ...state.wallhaven.searchParams,
                        purity: values,
                      },
                    }),
                  )
                }
                multiple
              >
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
                  <div className="flex flex-col flex-1 min-h-0 gap-4 @container">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 overflow-auto gap-4">
                      {result.value.data.map((item) => (
                        // `thumbs.large` maxes out around 432x243, so keep cells
                        // small enough that they are not upscaled on HiDPI.
                        <button key={item.id} type="button" className="aspect-video relative">
                          <img
                            src={item.thumbs.large.toString()}
                            loading="lazy"
                            decoding="async"
                            className="size-full absolute object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    <p>{`${result.value.data.length} of ${result.value.meta.total}`}</p>
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
