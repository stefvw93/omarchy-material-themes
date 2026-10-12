import { Cause, Effect, Schema } from "effect";
import { Action, Task, Children, define } from "@wych/react";
import type { Draft } from "@wych/react";
import { component } from "../shared";
import { Input } from "@/components/ui/input";
import {
  WallhavenSearchParams,
  WallhavenSearchPayload,
  WallhavenService,
} from "../wallhaven/service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PexelsPhoto, PexelsService } from "@/features/pexels/service";
import { Contrast, Mode, ThemePalette, Variant } from "@stef/theme-engine";
import { MaterialService } from "@/features/material/service";
import { WallhavenInputs } from "./components/wallhaven-inputs";
import { WallhavenResults } from "./components/wallhaven-results";
import { PexelsResults } from "./components/pexels-results";
import { OutputPanel } from "./components/output-panel";
import { ThemePreview } from "./components/theme-preview";
import { ApplyOmarchyTheme } from "./tasks";

const InputKind = Schema.Union([
  Schema.Literal("file"),
  Schema.Literal("wallhaven"),
  Schema.Literal("pexels"),
]);

const Props = Schema.Struct({
  children: Schema.optionalKey(Children),
});

const WallhavenSearch = Task("WallhavenSearch", {
  success: WallhavenSearchPayload,
  onError: (cause) => {
    const error: unknown = Cause.squash(cause);
    if (!(error instanceof Error)) return String(error);
    return error.message !== "" ? error.message : error.name;
  },
  run: (params: typeof WallhavenSearchParams.Type) =>
    Effect.flatMap(WallhavenService, (wallhaven) => wallhaven.search(params)),
});

const PexelsCurated = Task("PexelsCurated", {
  success: Schema.Array(PexelsPhoto),
  run: () => Effect.flatMap(PexelsService, (pexels) => pexels.curated),
});

type PaletteInput = Pick<SeedState, "selectedImageUrl" | "variant" | "mode" | "contrast">;

const CreatePalette = Task("CreatePalette", {
  success: ThemePalette,
  run: (input: PaletteInput) =>
    Effect.gen(function* () {
      if (!input.selectedImageUrl) {
        return yield* Effect.fail(new Error("No image selected"));
      }

      const material = yield* MaterialService;

      return yield* material.createPaletteFromImage(input.selectedImageUrl, {
        variant: input.variant,
        mode: input.mode,
        contrast: input.contrast,
      });
    }),
});

const SeedState = Schema.Struct({
  inputType: InputKind,
  selectedImageUrl: Schema.UndefinedOr(Schema.URLFromString).pipe(Schema.optional),
  variant: Variant,
  wallhavenSearchParams: WallhavenSearchParams,
  mode: Mode,
  contrast: Contrast,
});
type SeedState = typeof SeedState.Type;

//
// Actions
//

export const ClickedImageThumb = Action("ClickedImageThumb", { url: Schema.URLFromString });
export const ClickedWallhavenPaginator = Action("ClickedWallhavenPaginator", {
  page: Schema.Number,
});
const SearchWallhaven = Action("SearchWallhaven", WallhavenSearchParams.fields);
export const SetContrast = Action("SetContrast", { contrast: Contrast });
const SetInputKind = Action("SetInputKind", { inputType: InputKind });
export const SetMode = Action("SetMode", { mode: Mode });
export const SetVariant = Action("SetVariant", { variant: Variant });
const SetWallhavenSearchParams = Action("SetWallhavenSearchParams", WallhavenSearchParams.fields);
export const ApplyColors = Action("ApplyColors", {});

const SeedAction = [
  ApplyColors,
  ClickedImageThumb,
  ClickedWallhavenPaginator,
  SearchWallhaven,
  SetContrast,
  SetInputKind,
  SetMode,
  SetVariant,
  SetWallhavenSearchParams,
];

//
// Definitions
//

const SeedDefinition = define({
  props: Props,
  state: SeedState,
  tasks: {
    search: WallhavenSearch,
    curated: PexelsCurated,
    palette: CreatePalette,
    omarchyTheme: ApplyOmarchyTheme,
  },
  actions: SeedAction,
});

const initialState = SeedDefinition.initialState(() => ({
  inputType: "file" as const,
  variant: "tonal-spot",
  mode: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  contrast: "standard",
  wallhavenSearchParams: {
    page: 1,
    categories: ["general"],
    purity: ["sfw"],
    sorting: "toplist",
    topRange: "1y",
    atleast: "2560x1440",
  },
}));

// Task inputs are read from `state` or the payload, never from `draft`: the
// draft is revoked once the fold ends, before the task's effect runs.
const reducer = SeedDefinition.reducer({
  Mounted: (_, { state, draft, tasks }) =>
    state.inputType === "wallhaven" ? tasks.search.start(state.wallhavenSearchParams) : draft,

  SetContrast: ({ contrast }, { state, draft, tasks }) => {
    draft.contrast = contrast;
    return tasks.palette.start({ ...state, contrast });
  },

  SetInputKind: ({ inputType }, { state, draft, tasks }) => {
    draft.inputType = inputType;

    if (inputType === "pexels") {
      return tasks.curated.start();
    }

    if (inputType === "wallhaven") {
      return tasks.search.start(state.wallhavenSearchParams);
    }

    return draft;
  },

  // The preview shows the generated theme in its mode (src/m3/scheme.ts).
  SetMode: ({ mode }, { state, draft, tasks }) => {
    draft.mode = mode;
    return tasks.palette.start({ ...state, mode });
  },

  ClickedWallhavenPaginator: (payload, { state, draft, tasks }) => {
    const searchParams = {
      ...state.wallhavenSearchParams,
      page: payload.page || state.wallhavenSearchParams.page || 1,
    };

    draft.wallhavenSearchParams.page = searchParams.page;
    return tasks.search.start(searchParams);
  },

  ClickedImageThumb: ({ url }, { state, draft, tasks }) => {
    if (url === state.selectedImageUrl) return draft;

    draft.selectedImageUrl = url;
    return tasks.palette.start({ ...state, selectedImageUrl: url });
  },

  SetVariant: ({ variant }, { state, draft, tasks }) => {
    draft.variant = variant;
    return tasks.palette.start({ ...state, variant });
  },

  SetWallhavenSearchParams: (wallhavenSearchParams, { draft }) => {
    // The payload's arrays are readonly; the fold freezes the finished state either way.
    draft.wallhavenSearchParams = wallhavenSearchParams as Draft<typeof wallhavenSearchParams>;
    return draft;
  },

  ApplyColors: (_, { state, draft, tasks }) =>
    Task.isResolved(state.palette) && state.selectedImageUrl
      ? tasks.omarchyTheme.start({
          imageUrl: state.selectedImageUrl,
          palette: state.palette.value,
        })
      : draft,

  SearchWallhaven: (payload, { tasks }) => tasks.search.start(payload),
});

const render = SeedDefinition.render((snapshot) => {
  const { state, dispatch } = snapshot;

  return (
    <div className="grid grid-cols-12 flex-1 min-h-0 gap-2 p-2 min-w-2xl">
      <ThemePreview />
      <div className="col-span-5 lg:col-span-6 xl:col-span-8 flex flex-col flex-1 min-h-0 gap-2">
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
              loading={Task.isPending(state.search)}
              onChange={(params) => dispatch(SetWallhavenSearchParams.make(params))}
              onSubmit={(params) => dispatch(SearchWallhaven.make(params))}
            />
            <WallhavenResults />
          </TabsContent>

          <TabsContent value="pexels" className="flex flex-col flex-1 min-h-0 gap-2">
            <PexelsResults />
          </TabsContent>
        </Tabs>
      </div>

      <div className="col-span-7 lg:col-span-6 xl:col-span-4 h-full" id="output">
        <OutputPanel />
      </div>
    </div>
  );
});

export const Seed = component(
  SeedDefinition.create({
    initialState,
    reducer,
    render,
  }),
  {
    name: "Seed",
  },
);
