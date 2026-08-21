import { Button } from "@/components/ui/button";
import { Effect, Schema } from "effect";
import { Action, Async, Children, define } from "react-argon";
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
import { useMemo } from "react";

const CATEGORIES: { value: WALLHAVEN_CATEGORY; label: string }[] = WALLHAVEN_CATEGORIES.map(
  (value) => ({ value, label: value }),
);

const PURITY: { value: WALLHAVEN_PURITY; label: string }[] = WALLHAVEN_PURITIES.filter(
  (p) => p !== "nsfw",
).map((value) => ({
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

const wallhavenSearch = Async("WallhavenSearch", {
  success: WallhavenSearchPayload,
  onError: Async.message,
  run: (params: typeof WallhavenSearchParams.Type) =>
    Effect.flatMap(WallhavenService, (wallhaven) => wallhaven.search(params)),
});

const pexelsCurated = Async("PexelsCurated", {
  success: Schema.Array(PexelsPhoto),
  onError: Async.message,
  run: (_: void) => Effect.flatMap(PexelsService, (pexels) => pexels.curated),
});

const State = Schema.Struct({
  inputType: InputType,
  wallhaven: Schema.Struct({
    searchParams: WallhavenSearchParams,
  }),
  ...wallhavenSearch.field,
  ...pexelsCurated.field,
});

const ClickedSearch = Action("ClickedSearch", {});
const ClickedWallhavenPaginator = Action("ClickedWallhavenPaginator", { page: Schema.Number });
const InputTypeChanged = Action("InputTypeChanged", { inputType: InputType });
const SearchParamsChanged = Action("SearchParamsChanged", { searchParams: WallhavenSearchParams });
const SeedAction = Action.of([
  ClickedSearch,
  ClickedWallhavenPaginator,
  InputTypeChanged,
  SearchParamsChanged,
  ...wallhavenSearch.actions,
  ...pexelsCurated.actions,
]);

const SeedFactory = define({
  props: Props,
  state: State,
  action: SeedAction,
  useUnsafeHooks() {
    const canvas = useMemo(() => {
      const el = document.createElement("canvas");
      return el;
    }, []);
    return { canvas };
  },
});

const initialState = SeedFactory.initialState(() => ({
  inputType: "file" as const,
  wallhaven: {
    searchParams: {
      page: 1,
      categories: ["general"],
      purity: ["sfw"],
      sorting: "toplist",
      topRange: "1y",
      atleast: "2560x1440",
    },
  },
  ...wallhavenSearch.initial,
  ...pexelsCurated.initial,
}));

const reducer = SeedFactory.reducer({
  InputTypeChanged: (action, { state }) => {
    // `start` writes `Pending` into whatever state it is handed, so the tab
    // change and the work it triggers are one return — nothing to unwrap.
    const next = { ...state, inputType: action.inputType };

    if (action.inputType === "pexels") return pexelsCurated.start(next);
    if (action.inputType === "wallhaven")
      return wallhavenSearch.start(next, state.wallhaven.searchParams);

    return next;
  },

  ClickedWallhavenPaginator: (action, { state }) => {
    const next = {
      ...state,
      wallhaven: {
        ...state.wallhaven,
        searchParams: {
          ...state.wallhaven.searchParams,
          page: action.page || state.wallhaven.searchParams.page || 1,
        },
      },
    };
    return wallhavenSearch.start(next, next.wallhaven.searchParams);
  },

  SearchParamsChanged: (action, { state }) => ({
    ...state,
    wallhaven: { ...state.wallhaven, searchParams: action.searchParams },
  }),

  ClickedSearch: (_action, { state }) => wallhavenSearch.start(state, state.wallhaven.searchParams),

  ...wallhavenSearch.handlers,
  ...pexelsCurated.handlers,
});

const render = SeedFactory.render(({ state, dispatch, hooks }) => {
  console.log({ hooks });
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
            <TabsTrigger value="pexels">Pexels</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="flex flex-col gap-4">
            Add a file.
            <Input type="file" accept="image/*" />
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
                disabled={Async.isPending(state.wallhavenSearch)}
                onClick={() => dispatch(ClickedSearch.make({}))}
              >
                {Async.isPending(state.wallhavenSearch) ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="flex flex-col flex-1 min-h-0">
              {wallhavenSearch.match(state, {
                Idle: () => <></>,
                Pending: () => "Searching...",
                Rejected: (rejected) => `Error: ${rejected.error}`,
                Resolved: (resolved) => (
                  <div className="flex flex-col flex-1 min-h-0 gap-4 @container">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 overflow-auto gap-4">
                      {resolved.value.data.map((item) => (
                        // `thumbs.large` maxes out around 432x243, so keep cells
                        // small enough that they are not upscaled on HiDPI.
                        <button key={item.id} type="button" className="aspect-video relative">
                          <img
                            src={item.thumbs.large.toString()}
                            loading="lazy"
                            decoding="async"
                            className="size-full absolute object-cover inset-0"
                          />
                        </button>
                      ))}

                      <div className="col-span-full flex items-center justify-center gap-2">
                        <Button
                          onClick={() =>
                            dispatch(
                              ClickedWallhavenPaginator.make({
                                page: Math.max(1, (state.wallhaven.searchParams.page || 1) - 1),
                              }),
                            )
                          }
                        >
                          prev
                        </Button>
                        <span>
                          {`page ${resolved.value.meta.current_page} of ${Math.ceil(resolved.value.meta.total / resolved.value.meta.per_page)}`}
                        </span>
                        <Button
                          onClick={() =>
                            dispatch(
                              ClickedWallhavenPaginator.make({
                                page: (state.wallhaven.searchParams.page || 1) + 1,
                              }),
                            )
                          }
                        >
                          next
                        </Button>
                      </div>
                    </div>
                  </div>
                ),
              })}
            </div>
          </TabsContent>

          <TabsContent value="pexels" className="flex flex-col flex-1 min-h-0 gap-4">
            <div className="flex flex-col flex-1 min-h-0">
              {pexelsCurated.match(state, {
                Idle: () => <></>,
                Pending: () => "Loading...",
                Rejected: (rejected) => `Error: ${rejected.error}`,
                Resolved: (resolved) => (
                  <div className="flex flex-col flex-1 min-h-0 gap-4 @container">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 overflow-auto gap-4">
                      {resolved.value.map((item) => (
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
                    <p>{`${resolved.value.length} total`}</p>
                  </div>
                ),
              })}
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
