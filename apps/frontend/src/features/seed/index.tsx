import { Effect, Schema } from "effect";
import { Action, Async, Children, define } from "react-argon";
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
import { ContrastLevel, Mode, OmarchyColors, SchemeKind } from "@/features/material/colors";
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { OmarchyTheme } from "../omarchy-theme";
import { Button } from "@/components/ui/button";

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

const WallhavenSearch = Async("WallhavenSearch", {
  success: WallhavenSearchPayload,
  onError: Async.message,
  run: (params: typeof WallhavenSearchParams.Type) =>
    Effect.flatMap(WallhavenService, (wallhaven) => wallhaven.search(params)),
});

const PexelsCurated = Async("PexelsCurated", {
  success: Schema.Array(PexelsPhoto),
  onError: Async.message,
  run: (_: void) => Effect.flatMap(PexelsService, (pexels) => pexels.curated),
});

const CreateOmarchyColors = Async("CreateOmarchyColors", {
  success: OmarchyColors,
  onError: Async.message,
  run: (state: State) =>
    Effect.gen(function* () {
      if (!state.selectedImageUrl) {
        return yield* Effect.fail(new Error("No image selected"));
      }

      const material = yield* MaterialService;

      const colors = yield* material.createOmarchyColorsFromImage(state.selectedImageUrl, {
        schemeKind: state.schemeKind,
        isDark: state.mode === "dark",
        contrastLevel: state.contrastLevel,
      });

      return colors;
    }),
});

const ApplyOmarchyColors = Async("ApplyOmarchyColors", {
  success: Schema.Void,
  onError: Async.message,
  run: (state: State) =>
    Effect.gen(function* () {
      if (state.omarchyColors._tag !== "Resolved") return;
      if (!state.selectedImageUrl) return;

      const omarchyTheme = yield* OmarchyTheme;
      yield* omarchyTheme.writeColors(state.omarchyColors.value);
      yield* omarchyTheme.writeBackgroundImage(state.selectedImageUrl);
      yield* omarchyTheme.setTheme("omaterial-dev");
    }),
});

const State = Schema.Struct({
  inputType: InputKind,
  selectedImageUrl: Schema.UndefinedOr(Schema.URLFromString).pipe(Schema.optional),
  schemeKind: SchemeKind,
  wallhavenSearchParams: WallhavenSearchParams,
  mode: Mode,
  contrastLevel: ContrastLevel,
  search: Async.slice(WallhavenSearchPayload),
  curated: Async.slice(Schema.Array(PexelsPhoto)),
  omarchyColors: Async.slice(OmarchyColors),
  omarchyTheme: Async.slice(Schema.Void),
});
type State = typeof State.Type;

//
// Actions
//

const ClickedImageThumb = Action("ClickedImageThumb", { url: Schema.URLFromString });
const ClickedWallhavenPaginator = Action("ClickedWallhavenPaginator", { page: Schema.Number });
const CommitContrastLevel = Action("CommitContrastLevel", { contrastLevel: ContrastLevel });
const SearchWallhaven = Action("SearchWallhaven", WallhavenSearchParams.fields);
const SetContrastLevel = Action("SetContrastLevel", { contrastLevel: ContrastLevel });
const SetInputKind = Action("SetInputKind", { inputType: InputKind });
const SetMode = Action("SetMode", { mode: Mode });
const SetSchemeKind = Action("SetSchemeKind", { schemeKind: SchemeKind });
const SetWallhavenSearchParams = Action("SetWallhavenSearchParams", WallhavenSearchParams.fields);
const ApplyColors = Action("ApplyColors", {});

const SeedAction = Action.of([
  ...PexelsCurated.actions,
  ...WallhavenSearch.actions,
  ...CreateOmarchyColors.actions,
  ...ApplyOmarchyColors.actions,
  ApplyColors,
  CommitContrastLevel,
  ClickedImageThumb,
  ClickedWallhavenPaginator,
  SearchWallhaven,
  SetContrastLevel,
  SetInputKind,
  SetMode,
  SetSchemeKind,
  SetWallhavenSearchParams,
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
  mode: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  contrastLevel: 0,
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
  omarchyColors: Async.idle,
  omarchyTheme: Async.idle,
}));

const reducer = SeedFactory.reducer({
  Mounted: (_, { state }) => {
    if (state.inputType === "wallhaven") {
      return Async.start(state, "search", WallhavenSearch.run(state.wallhavenSearchParams));
    }

    return state;
  },

  SetContrastLevel: (payload, { state }) => ({ ...state, ...payload }),

  CommitContrastLevel: (payload, { state }) => {
    const nextState = { ...state, ...payload };
    return Async.start(nextState, "omarchyColors", CreateOmarchyColors.run(nextState));
  },

  SetInputKind: (payload, { state }) => {
    const next = { ...state, inputType: payload.inputType };

    if (payload.inputType === "pexels") {
      return Async.start(next, "curated", PexelsCurated.run());
    }

    if (payload.inputType === "wallhaven") {
      return Async.start(next, "search", WallhavenSearch.run(state.wallhavenSearchParams));
    }

    return next;
  },

  SetMode: (payload, { state }) => {
    const nextState = { ...state, mode: payload.mode };
    return Async.start(nextState, "omarchyColors", CreateOmarchyColors.run(nextState));
  },

  ClickedWallhavenPaginator: (payload, { state }) => {
    const searchParams = {
      ...state.wallhavenSearchParams,
      page: payload.page || state.wallhavenSearchParams.page || 1,
    };

    return Async.start(
      { ...state, wallhavenSearchParams: searchParams },
      "search",
      WallhavenSearch.run(searchParams),
    );
  },

  ClickedImageThumb: (payload, { state }) => {
    const nextState = { ...state, selectedImageUrl: payload.url };
    return Async.start(nextState, "omarchyColors", CreateOmarchyColors.run(nextState));
  },

  SetSchemeKind: (payload, { state }) => {
    const nextState = { ...state, schemeKind: payload.schemeKind };
    return Async.start(nextState, "omarchyColors", CreateOmarchyColors.run(nextState));
  },

  SetWallhavenSearchParams: (wallhavenSearchParams, { state }) => ({
    ...state,
    wallhavenSearchParams,
  }),

  ApplyColors: (_, { state }) => Async.start(state, "omarchyTheme", ApplyOmarchyColors.run(state)),

  SearchWallhaven: (payload, { state }) =>
    Async.start(state, "search", WallhavenSearch.run(payload)),

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

  CreateOmarchyColorsRejected: (payload, { state }) => ({
    ...state,
    omarchyColors: Async.rejected(payload.error),
  }),
  CreateOmarchyColorsResolved: (payload, { state }) => ({
    ...state,
    omarchyColors: Async.resolved(payload.value),
  }),

  ApplyOmarchyColorsRejected: (payload, { state }) => ({
    ...state,
    omarchyTheme: Async.rejected(payload.error),
  }),
  ApplyOmarchyColorsResolved: (payload, { state }) => ({
    ...state,
    omarchyTheme: Async.resolved(payload.value),
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

        {state.selectedImageUrl ? (
          <div className="flex gap-2">
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

            <Select
              items={[
                { value: "light", label: "light" },
                { value: "dark", label: "dark" },
              ]}
              value={state.mode}
              onValueChange={(value) => dispatch(SetMode.make({ mode: value ?? state.mode }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">light</SelectItem>
                  <SelectItem value="dark">dark</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center flex-1 gap-2 pl-1">
              <Label>contrast</Label>
              <Slider
                min={-1}
                max={1}
                step={0.1}
                value={state.contrastLevel}
                onValueCommitted={(value) =>
                  dispatch(CommitContrastLevel.make({ contrastLevel: value as number }))
                }
                onValueChange={(value) =>
                  dispatch(SetContrastLevel.make({ contrastLevel: value as number }))
                }
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-2 h-8" aria-hidden>
            <Skeleton className="flex-1" />
            <Skeleton className="flex-1" />
            <Skeleton className="flex-4" />
          </div>
        )}

        {Async.match(state.omarchyColors, {
          Idle: () => null,
          Pending: () => <ColorsGrid />,
          Rejected: (rejected) => `Error: ${rejected.error}`,
          Resolved: (resolved) => <ColorsGrid omarchyColors={resolved.value} />,
        })}

        <Button onClick={() => dispatch(ApplyColors.make({}))}>Apply</Button>
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
