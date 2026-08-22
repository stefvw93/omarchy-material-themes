import { Button } from "@/components/ui/button";
import { Effect, Schema } from "effect";
import { Action, Async, Children, Command, define } from "react-argon";
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
import { PexelsPhoto, PexelsService } from "@/features/pexels/service";
import { ImageGrid } from "./components/image-grid";
import { OmarchyColors, SchemeKind } from "@/features/material/colors";
import { MaterialService } from "@/features/material/service";
import { ColorsGrid } from "./components/colors-grid";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES: { value: WALLHAVEN_CATEGORY; label: string }[] = WALLHAVEN_CATEGORIES.map(
  (value) => ({ value, label: value }),
);

const PURITY: { value: WALLHAVEN_PURITY; label: string }[] = WALLHAVEN_PURITIES.filter(
  (p) => p !== "nsfw",
).map((value) => ({
  value,
  label: value,
}));

const CONSTRUCTORS = Object.keys(MaterialService.schemeContstructors).map((key) => ({
  value: key,
  label: key,
}));

const InputKind = Schema.Union([
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
  inputType: InputKind,
  wallhaven: Schema.Struct({
    searchParams: WallhavenSearchParams,
  }),
  selectedImageUrl: Schema.UndefinedOr(Schema.URLFromString).pipe(Schema.optional),
  omarchyColors: Schema.UndefinedOr(OmarchyColors).pipe(Schema.optional),
  schemeKind: SchemeKind,
  search: Async.slice(WallhavenSearchPayload),
  curated: Async.slice(Schema.Array(PexelsPhoto)),
});
type State = typeof State.Type;

const ClickedSearch = Action("ClickedSearch", {});
const ClickedWallhavenPaginator = Action("ClickedWallhavenPaginator", { page: Schema.Number });
const ClickedImageThumb = Action("ClickedImageThumb", { url: Schema.URLFromString });
const SetInputKind = Action("SetInputKind", { inputType: InputKind });
const SetSearchParams = Action("SetSearchParams", { searchParams: WallhavenSearchParams });
const SetOmarchyColors = Action("SetOmarchyColors", { colors: OmarchyColors });
const SetSchemeKind = Action("SetSchemeKind", { schemeKind: SchemeKind });

const SeedAction = Action.of([
  ClickedSearch,
  ClickedWallhavenPaginator,
  ClickedImageThumb,
  SetInputKind,
  SetSearchParams,
  SetOmarchyColors,
  SetSchemeKind,
  ...wallhavenSearch.actions,
  ...pexelsCurated.actions,
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
      page: 1,
      categories: ["general"],
      purity: ["sfw"],
      sorting: "toplist",
      topRange: "1y",
      atleast: "2560x1440",
    },
  },
  schemeKind: "neutral",
  search: Async.idle,
  curated: Async.idle,
}));

const createOmarchyColors = (url: URL, state: typeof State.Type) =>
  Effect.gen(function* () {
    const material = yield* MaterialService;

    const colors = yield* material.createOmarchyColorsFromImage(url, {
      schemeKind: state.schemeKind,
      isDark: true,
    });

    return colors;
  });

const reducer = SeedFactory.reducer({
  SetInputKind: (action, { state }) => {
    const next = { ...state, inputType: action.inputType };

    if (action.inputType === "pexels")
      return [{ ...next, curated: Async.pending }, pexelsCurated.run()];

    if (action.inputType === "wallhaven")
      return [
        { ...next, search: Async.pending },
        wallhavenSearch.run(state.wallhaven.searchParams),
      ];

    return next;
  },

  ClickedWallhavenPaginator: (action, { state }) => {
    const searchParams = {
      ...state.wallhaven.searchParams,
      page: action.page || state.wallhaven.searchParams.page || 1,
    };

    return [
      {
        ...state,
        wallhaven: { ...state.wallhaven, searchParams },
        search: Async.pending,
      },
      wallhavenSearch.run(searchParams),
    ];
  },

  ClickedImageThumb: (action, { state }) => [
    { ...state, selectedImageUrl: action.url, omarchyColors: undefined },
    Command.effect((dispatch) =>
      Effect.gen(function* () {
        yield* dispatch(
          SetOmarchyColors.make({ colors: yield* createOmarchyColors(action.url, state) }),
        );
      }).pipe(
        Effect.catch((err) => {
          console.error(err.cause);
          return Effect.void;
        }),
      ),
    ),
  ],

  SetSchemeKind: (action, { state }) => [
    { ...state, omarchyColors: undefined, schemeKind: action.schemeKind },
    Command.effect((dispatch) =>
      Effect.gen(function* () {
        if (!state.selectedImageUrl) return;
        yield* dispatch(
          SetOmarchyColors.make({
            colors: yield* createOmarchyColors(state.selectedImageUrl, state),
          }),
        );
      }).pipe(
        Effect.catch((err) => {
          console.error(err.cause);
          return Effect.void;
        }),
      ),
    ),
  ],

  SetOmarchyColors: (action, { state }) => ({ ...state, omarchyColors: action.colors }),

  SetSearchParams: (action, { state }) => ({
    ...state,
    wallhaven: { ...state.wallhaven, searchParams: action.searchParams },
  }),

  ClickedSearch: (_action, { state }) => [
    { ...state, search: Async.pending },
    wallhavenSearch.run(state.wallhaven.searchParams),
  ],

  WallhavenSearchResolved: (action, { state }) => ({
    ...state,
    search: Async.resolved(action.value),
  }),
  WallhavenSearchRejected: (action, { state }) => ({
    ...state,
    search: Async.rejected(action.error),
  }),

  PexelsCuratedResolved: (action, { state }) => ({
    ...state,
    curated: Async.resolved(action.value),
  }),
  PexelsCuratedRejected: (action, { state }) => ({
    ...state,
    curated: Async.rejected(action.error),
  }),
});

const render = SeedFactory.render(({ state, dispatch }) => {
  return (
    <div className="grid grid-cols-12 flex-1 min-h-0 gap-4 p-4">
      <div className="col-span-6 flex flex-col flex-1 min-h-0 gap-4">
        <Tabs
          value={state.inputType}
          onValueChange={(value) => dispatch(SetInputKind.make({ inputType: value }))}
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
                    SetSearchParams.make({
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
                    SetSearchParams.make({
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
                disabled={Async.isPending(state.search)}
                onClick={() => dispatch(ClickedSearch.make({}))}
              >
                {Async.isPending(state.search) ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="flex flex-col flex-1 min-h-0">
              {Async.match(state.search, {
                Idle: () => <></>,
                Pending: () => "Searching...",
                Rejected: (rejected) => `Error: ${rejected.error}`,
                Resolved: (resolved) => (
                  <div className="flex flex-col flex-1 min-h-0 gap-4 @container">
                    <ImageGrid
                      onItemClick={(item) => {
                        dispatch(ClickedImageThumb.make({ url: item.path }));
                      }}
                      items={resolved.value.data}
                    >
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
                    </ImageGrid>
                  </div>
                ),
              })}
            </div>
          </TabsContent>

          <TabsContent value="pexels" className="flex flex-col flex-1 min-h-0 gap-4">
            <div className="flex flex-col flex-1 min-h-0">
              {Async.match(state.curated, {
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

      <div className="col-span-6 flex flex-col gap-4" id="output">
        {state.selectedImageUrl ? (
          <div className="relative w-full aspect-video">
            <img
              key={state.selectedImageUrl.toString()}
              src={state.selectedImageUrl.toString()}
              className="size-full absolute object-cover"
            />
          </div>
        ) : (
          <Skeleton className="aspect-video" />
        )}

        <Select
          items={CONSTRUCTORS}
          value={state.schemeKind}
          onValueChange={(value) =>
            dispatch(SetSchemeKind.make({ schemeKind: value ?? "neutral" }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {CONSTRUCTORS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-6 gap-1">
          <ColorsGrid omarchyColors={state.omarchyColors} />
        </div>
      </div>
    </div>
  );
});

const seed = SeedFactory.create({ initialState, reducer, render });

const Seed = component(seed, { name: "Seed" });

export { Seed };
