import { Effect, Schema } from "effect";
import { Action, Async, Children, Command, define } from "react-argon";
import { component } from "../shared";
import { Input } from "@/components/ui/input";
import {
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { WallhavenInputs } from "./components/wallhaven-inputs";

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
  selectedImageUrl: Schema.UndefinedOr(Schema.URLFromString).pipe(Schema.optional),
  omarchyColors: Schema.UndefinedOr(OmarchyColors).pipe(Schema.optional),
  schemeKind: SchemeKind,
  wallhavenSearchParams: WallhavenSearchParams,
  search: Async.slice(WallhavenSearchPayload),
  curated: Async.slice(Schema.Array(PexelsPhoto)),
});
type State = typeof State.Type;

//
// Actions
//

const SearchWallhaven = Action("SearchWallhaven", WallhavenSearchParams.fields);
const ClickedWallhavenPaginator = Action("ClickedWallhavenPaginator", { page: Schema.Number });
const ClickedImageThumb = Action("ClickedImageThumb", { url: Schema.URLFromString });
const SetInputKind = Action("SetInputKind", { inputType: InputKind });
const SetOmarchyColors = Action("SetOmarchyColors", { colors: OmarchyColors });
const SetSchemeKind = Action("SetSchemeKind", { schemeKind: SchemeKind });
const SetWallhavenSearchParams = Action("SetWallhavenSearchParams", WallhavenSearchParams.fields);

const SeedAction = Action.of([
  SearchWallhaven,
  ClickedWallhavenPaginator,
  ClickedImageThumb,
  SetInputKind,
  SetOmarchyColors,
  SetSchemeKind,
  SetWallhavenSearchParams,
  ...wallhavenSearch.actions,
  ...pexelsCurated.actions,
]);

//
// Definitions
//

const SeedFactory = define({
  props: Props,
  state: State,
  action: SeedAction,
});

const initialState = SeedFactory.initialState(() => ({
  inputType: "file" as const,
  schemeKind: "neutral",
  wallhavenSearchParams: {
    page: 1,
    categories: ["general"],
    purity: ["sfw"],
    sorting: "toplist",
    topRange: "1y",
    atleast: "2560x1440",
  },
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
  Mounted: (_, { state }) => {
    if (state.inputType === "wallhaven") {
      return [state, wallhavenSearch.run(state.wallhavenSearchParams)];
    }

    return state;
  },

  SetInputKind: (payload, { state }) => {
    const next = { ...state, inputType: payload.inputType };

    if (payload.inputType === "pexels") {
      return [{ ...next, curated: Async.pending }, pexelsCurated.run()];
    }

    if (payload.inputType === "wallhaven") {
      return [{ ...next, search: Async.pending }, wallhavenSearch.run(state.wallhavenSearchParams)];
    }

    return next;
  },

  ClickedWallhavenPaginator: (payload, { state }) => {
    const searchParams = {
      ...state.wallhavenSearchParams,
      page: payload.page || state.wallhavenSearchParams.page || 1,
    };

    return [
      {
        ...state,
        wallhavenSearchParams: searchParams,
        search: Async.pending,
      },
      wallhavenSearch.run(searchParams),
    ];
  },

  ClickedImageThumb: (payload, { state }) => [
    { ...state, selectedImageUrl: payload.url, omarchyColors: undefined },
    Command.effect((dispatch) =>
      Effect.gen(function* () {
        yield* dispatch(
          SetOmarchyColors.make({ colors: yield* createOmarchyColors(payload.url, state) }),
        );
      }).pipe(
        Effect.catch((err) => {
          console.error(err.cause);
          return Effect.void;
        }),
      ),
    ),
  ],

  SetSchemeKind: (payload, { state }) => [
    { ...state, omarchyColors: undefined, schemeKind: payload.schemeKind },
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

  SetOmarchyColors: (payload, { state }) => ({ ...state, omarchyColors: payload.colors }),

  SetWallhavenSearchParams: (wallhavenSearchParams, { state }) => ({
    ...state,
    wallhavenSearchParams,
  }),

  SearchWallhaven: (payload, { state }) => [
    { ...state, search: Async.pending },
    wallhavenSearch.run(payload),
  ],

  WallhavenSearchResolved: (payload, { state }) => ({
    ...state,
    search: Async.resolved(payload.value),
  }),
  WallhavenSearchRejected: (payload, { state }) => ({
    ...state,
    search: Async.rejected(payload.error),
  }),

  PexelsCuratedResolved: (payload, { state }) => ({
    ...state,
    curated: Async.resolved(payload.value),
  }),
  PexelsCuratedRejected: (payload, { state }) => ({
    ...state,
    curated: Async.rejected(payload.error),
  }),
});

const render = SeedFactory.render(({ state, dispatch }) => {
  return (
    <div className="grid grid-cols-12 flex-1 min-h-0 gap-2 p-2">
      <div className="col-span-6 flex flex-col flex-1 min-h-0 gap-2">
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

          <TabsContent value="file" className="flex flex-col gap-2">
            Add a file.
            <Input type="file" accept="image/*" />
          </TabsContent>

          <TabsContent value="wallhaven" className="flex flex-col flex-1 min-h-0 gap-2">
            <WallhavenInputs
              value={state.wallhavenSearchParams}
              loading={Async.isPending(state.search)}
              onChange={(params) => dispatch(SetWallhavenSearchParams.make(params))}
              onSubmit={(params) => dispatch(SearchWallhaven.make(params))}
            />

            <div className="flex flex-col flex-1 min-h-0">
              {Async.match(state.search, {
                Idle: () => <></>,
                Pending: () => (
                  <div className="flex flex-col flex-1 min-h-0 gap-2">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 gap-2 pr-px">
                      {Array.from({ length: 24 }, (_, index) => (
                        <Skeleton key={index} className="aspect-video" />
                      ))}
                    </div>
                  </div>
                ),
                Rejected: (rejected) => `Error: ${rejected.error}`,
                Resolved: (resolved) => (
                  <div className="flex flex-col flex-1 min-h-0 gap-2">
                    <ImageGrid
                      onItemClick={(item) => {
                        dispatch(ClickedImageThumb.make({ url: item.path }));
                      }}
                      items={resolved.value.data}
                    />
                    <Pagination className="col-span-full">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            type="button"
                            onClick={() =>
                              dispatch(
                                ClickedWallhavenPaginator.make({
                                  page: Math.max(1, (state.wallhavenSearchParams.page || 1) - 1),
                                }),
                              )
                            }
                          />
                        </PaginationItem>

                        <PaginationItem>
                          <span className="px-1">
                            {`${resolved.value.meta.current_page} of ${Math.ceil(resolved.value.meta.total / resolved.value.meta.per_page)}`}
                          </span>
                        </PaginationItem>

                        <PaginationItem>
                          <PaginationNext
                            type="button"
                            onClick={() =>
                              dispatch(
                                ClickedWallhavenPaginator.make({
                                  page: (state.wallhavenSearchParams.page || 1) + 1,
                                }),
                              )
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                ),
              })}
            </div>
          </TabsContent>

          <TabsContent value="pexels" className="flex flex-col flex-1 min-h-0 gap-2">
            <div className="flex flex-col flex-1 min-h-0">
              {Async.match(state.curated, {
                Idle: () => <></>,
                Pending: () => "Loading...",
                Rejected: (rejected) => `Error: ${rejected.error}`,
                Resolved: (resolved) => (
                  <div className="flex flex-col flex-1 min-h-0 gap-2 @container">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 overflow-auto gap-2">
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

      <div className="col-span-6 flex flex-col gap-2" id="output">
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

        <ColorsGrid omarchyColors={state.omarchyColors} />
      </div>
    </div>
  );
});

export const Seed = component(
  SeedFactory.create({
    initialState,
    reducer,
    render,
  }),
  {
    name: "Seed",
  },
);
