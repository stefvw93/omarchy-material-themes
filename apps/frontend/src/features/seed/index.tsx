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
import { useEffect, useMemo } from "react";
import { ImageGrid } from "./components/image-grid";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import {
  Blend,
  Contrast,
  Hct,
  SchemeTonalSpot,
  hexFromArgb,
  sourceColorFromImageBytes,
} from "@material/material-color-utilities";
import { MATERIAL_REFERENCE_COLORS_2014_ARGB } from "../material/_colors";

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
  selectedImageUrl: Schema.optional(Schema.URLFromString),
  ...wallhavenSearch.field,
  ...pexelsCurated.field,
});

const ClickedSearch = Action("ClickedSearch", {});
const ClickedWallhavenPaginator = Action("ClickedWallhavenPaginator", { page: Schema.Number });
const ClickedImageThumb = Action("ClickedImageThumb", { url: Schema.URLFromString });
const InputTypeChanged = Action("InputTypeChanged", { inputType: InputType });
const SearchParamsChanged = Action("SearchParamsChanged", { searchParams: WallhavenSearchParams });
const SeedAction = Action.of([
  ClickedSearch,
  ClickedWallhavenPaginator,
  ClickedImageThumb,
  InputTypeChanged,
  SearchParamsChanged,
  ...wallhavenSearch.actions,
  ...pexelsCurated.actions,
]);

const SeedFactory = define({
  props: Props,
  state: State,
  action: SeedAction,
  useUnsafeHooks(_props, state) {
    const canvas = useMemo(() => document.createElement("canvas"), []);

    useEffect(() => {
      if (!state.selectedImageUrl) return;

      const controller = new AbortController();
      const signal = controller.signal;
      let objectUrl: string | undefined;

      console.time("seed:total");
      console.time("seed:fetch+decode");

      // Fetched through Tauri's native HTTP client (not the webview's fetch),
      // so the request never carries an Origin header and isn't subject to
      // CORS. The resulting blob: URL is same-origin, so drawing it onto the
      // canvas below won't taint it for getImageData.
      const op = tauriFetch(String(state.selectedImageUrl), { signal })
        .then((res) => res.blob())
        .then(
          (blob) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              objectUrl = URL.createObjectURL(blob);
              const img = new Image();
              img.src = objectUrl;
              img.onload = () => resolve(img);
              img.onerror = () => reject(new Error("Failed to load image"));
            }),
        );

      void op
        .then((img) => {
          console.timeEnd("seed:fetch+decode");

          const aspectRatio = img.width / img.height;
          const compressedHeight = Math.min(256, img.height);
          const compressedWidth = Math.min(256 * aspectRatio, img.width);
          console.log({
            aspectRatio,
            compressedHeight,
            compressedWidth,
            compressedRatio: compressedWidth / compressedHeight,
            nativeWidth: img.width,
            nativeHeight: img.height,
          });
          canvas.width = compressedWidth;
          canvas.height = compressedHeight;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            console.time("seed:canvas-draw+getImageData");
            ctx.drawImage(img, 0, 0, compressedWidth, compressedHeight);
            const { data } = ctx.getImageData(0, 0, compressedWidth, compressedHeight);
            console.timeEnd("seed:canvas-draw+getImageData");

            console.time("seed:quantize");
            const sourceArgb = sourceColorFromImageBytes(data);
            console.timeEnd("seed:quantize");

            const sourceHct = Hct.fromInt(sourceArgb);

            console.time("seed:scheme");
            const scheme = new SchemeTonalSpot(
              sourceHct,
              false, // isDark
              0, // contrastLevel: -1 to 1, 0 = default
            );
            console.timeEnd("seed:scheme");
            console.log({ scheme, img, canvas });

            // --- debug: dump the 24 OmarchyColors swatches straight into the DOM ---
            console.time("seed:swatches+dom");
            const hex = (argb: number) => hexFromArgb(argb);
            const harmonize = (argb: number) => hexFromArgb(Blend.harmonize(argb, sourceArgb));

            const swatches: Record<string, string> = {
              accent: hex(scheme.primary),
              selection: hex(scheme.primaryContainer),
              muted: hex(scheme.onSurfaceVariant),

              background: hex(scheme.surface),
              dark_background: hex(scheme.surfaceContainerLow),
              darker_background: hex(scheme.surfaceContainerLowest),
              lighter_background: hex(scheme.surfaceBright),

              foreground: hex(scheme.onSurface),
              dark_foreground: hex(Contrast.darkerUnsafe(scheme.onSurface, 1)),
              light_foreground: hex(Contrast.lighterUnsafe(scheme.onSurface, 1)),
              bright_foreground: hex(Contrast.lighterUnsafe(scheme.onSurface, 1.4)),

              red: hex(scheme.error),
              yellow: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.yellow),
              orange: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.orange),
              green: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.green),
              cyan: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.cyan),
              blue: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.blue),
              magenta: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.magenta),
              brown: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.brown),

              bright_red: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_red),
              bright_yellow: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_yellow),
              bright_green: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_green),
              bright_cyan: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_cyan),
              bright_blue: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_blue),
              bright_magenta: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_magenta),
            };

            const outputDebug = document.getElementById("output-debug");
            if (outputDebug) {
              outputDebug.style.cssText = "display:flex;flex-wrap:wrap;gap:4px;";

              const swatchNodes = Object.entries(swatches).map(([name, colorHex]) => {
                const swatch = document.createElement("div");
                swatch.title = `${name}: ${colorHex}`;
                swatch.style.cssText = `width:48px;height:48px;background:${colorHex};display:flex;align-items:flex-end;justify-content:center;`;

                const label = document.createElement("span");
                label.textContent = name;
                label.style.cssText =
                  "font:8px monospace;color:#fff;text-shadow:0 0 2px #000;line-height:1;";

                swatch.appendChild(label);
                return swatch;
              });

              outputDebug.replaceChildren(...swatchNodes);
            }
            console.timeEnd("seed:swatches+dom");
          }
        })
        .finally(() => {
          console.timeEnd("seed:total");
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        });

      return () => controller.abort();
    }, [state.selectedImageUrl]);

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

  ClickedImageThumb: (action, { state }) => ({ ...state, selectedImageUrl: action.url }),

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

      <div className="col-span-6" id="output">
        {state.selectedImageUrl && (
          <div className="relative w-full aspect-video">
            <img
              src={state.selectedImageUrl.toString()}
              className="size-full absolute object-cover"
            />
          </div>
        )}

        <div id="output-debug"></div>
      </div>
    </div>
  );
});

const seed = SeedFactory.create({ initialState, reducer, render });

const Seed = component(seed, { name: "Seed" });

export { Seed };
