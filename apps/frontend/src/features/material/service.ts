import {
  argbFromRgb,
  Contrast,
  DynamicScheme,
  Hct,
  QuantizerCelebi,
  SchemeExpressive,
  SchemeFidelity,
  SchemeNeutral,
  SchemeVibrant,
  SchemeRainbow,
  Score,
  sourceColorFromImageBytes,
  hexFromArgb as unsafeHexFromArgb,
} from "@material/material-color-utilities";
import { Context, Effect, flow, Layer, Match, Option, pipe, Schema } from "effect";
import { HttpClient } from "effect/unstable/http";
import { buildAnsiColors } from "./ansi";
import { HexColor, OmarchyColors, SchemeKind } from "./colors";
import { MaterialWorkerEventData, MaterialWorkerMessageData } from "./protocol";

/** The seed image reduced to what scheme building needs: one source colour, and the hues actually in it. */
export interface QuantizedSeed {
  sourceArgb: number;
  hues: number[];
}

export interface MaterialServiceImpl {
  /**
   * Fetch the raw (still-encoded) image file. Main thread only: Tauri's IPC lives on
   * `window.__TAURI_INTERNALS__`, which a worker cannot reach.
   */
  fetchImageBytes: (url: URL) => Effect.Effect<Uint8Array, MaterialServiceError>;
  /** Decode, downscale and quantize the image file. Worker-safe: no DOM, no IPC. */
  quantizeSource: (imageBytes: Uint8Array) => Effect.Effect<QuantizedSeed, MaterialServiceError>;
  createScheme: (
    kind: keyof typeof MaterialService.schemeContstructors,
    sourceArgb: number,
    isDark?: boolean,
    contrastLevel?: number,
  ) => Effect.Effect<DynamicScheme>;
  schemeToOmarchyColors: (
    scheme: DynamicScheme,
    imageHues: readonly number[],
  ) => Effect.Effect<OmarchyColors, Schema.SchemaError>;
  createOmarchyColorsFromImage: (
    url: URL,
    options: { schemeKind: typeof SchemeKind.Type; isDark?: boolean },
  ) => Effect.Effect<OmarchyColors, Schema.SchemaError | MaterialServiceError>;
}

export class MaterialService extends Context.Service<MaterialService, MaterialServiceImpl>()(
  "features/material/MaterialService",
) {
  static readonly schemeContstructors = {
    expressive: SchemeExpressive,
    fidelity: SchemeFidelity,
    neutral: SchemeNeutral,
    vibrant: SchemeVibrant,
    rainbow: SchemeRainbow,
  } as const;

  static readonly quantizeMaxSize = 128;

  static readonly layer = Layer.effect(
    this,
    Effect.gen(function* () {
      const worker: Option.Option<Worker> = !("DedicatedWorkerGlobalScope" in globalThis)
        ? Option.some(new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }))
        : Option.none();

      if (Option.isSome(worker)) {
        yield* Effect.addFinalizer(() => Effect.sync(() => worker.value.terminate()));
      }

      const client = (yield* HttpClient.HttpClient).pipe(
        HttpClient.tapRequest((req) => Effect.log(req.toJSON())),
        HttpClient.tap(Effect.log),
        HttpClient.filterStatusOk,
      );

      /**
       * The ranked hues present in the image. `sourceColorFromImageBytes` collapses the
       * whole wallpaper to a single colour, which is what made every generated terminal
       * palette look alike — this keeps the rest of the distribution around.
       */
      const imageHues = (bytes: Uint8ClampedArray) => {
        const pixels: number[] = [];

        for (let i = 0; i < bytes.length; i += 4) {
          if (bytes[i + 3]! < 255) continue;
          pixels.push(argbFromRgb(bytes[i]!, bytes[i + 1]!, bytes[i + 2]!));
        }

        const ranked = Score.score(QuantizerCelebi.quantize(pixels, 128), {
          desired: 12,
          filter: true,
        });

        return ranked.map((argb) => Hct.fromInt(argb).hue);
      };

      const fetchImageBytes: MaterialServiceImpl["fetchImageBytes"] = flow(
        Effect.fn("MaterialService.fetchImageBytes")(function* (url: URL) {
          const data = yield* client
            .get(url.toString())
            .pipe(Effect.flatMap((res) => res.arrayBuffer));

          return new Uint8Array(data);
        }),
        Effect.tapError(Effect.logError),
        Effect.catch((error) => new MaterialServiceError({ cause: error })),
      );

      const quantizeSource: MaterialServiceImpl["quantizeSource"] = flow(
        Effect.fn("MaterialService.quantizeSource")((imageBytes: Uint8Array) =>
          Effect.tryPromise(async () => {
            const bitmap = await createImageBitmap(new Blob([imageBytes as BlobPart]));
            const aspectRatio = bitmap.width / bitmap.height;

            const width = Math.max(
              1,
              Math.ceil(Math.min(MaterialService.quantizeMaxSize, bitmap.width)),
            );
            const height = Math.max(
              1,
              Math.ceil(Math.min(MaterialService.quantizeMaxSize / aspectRatio, bitmap.height)),
            );

            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext("2d");

            if (!ctx) throw new Error("Failed to get canvas context");

            ctx.drawImage(bitmap, 0, 0, width, height);
            bitmap.close();

            const { data } = ctx.getImageData(0, 0, width, height);

            return {
              sourceArgb: sourceColorFromImageBytes(data),
              hues: imageHues(data),
            } satisfies QuantizedSeed;
          }),
        ),
        Effect.tapError(Effect.logError),
        Effect.catch((error) => new MaterialServiceError({ cause: error })),
      );

      const createScheme: MaterialServiceImpl["createScheme"] = flow(
        Effect.fn("MaterialService.createScheme")(
          (
            kind: keyof typeof MaterialService.schemeContstructors,
            sourceArgb: number,
            isDark = false,
            contrastLevel = 0,
          ) =>
            Effect.sync(() => {
              const sourceHct = Hct.fromInt(sourceArgb);
              return new MaterialService.schemeContstructors[kind](
                sourceHct,
                isDark,
                contrastLevel,
              );
            }),
        ),
      );

      const schemeToOmarchyColors: MaterialServiceImpl["schemeToOmarchyColors"] = flow(
        Effect.fn("MaterialService.schemeToOmarchyColors")(
          (scheme: DynamicScheme, imageHues: readonly number[]) =>
            Effect.gen(function* () {
              const decodeHexColor = Schema.decodeEffect(HexColor);
              const hexFromArgb = (argb: number) => pipe(unsafeHexFromArgb(argb), decodeHexColor);

              const ansi = buildAnsiColors(scheme, imageHues);

              const colors: OmarchyColors = {
                mode: scheme.isDark ? "dark" : "light",

                accent: yield* hexFromArgb(scheme.primary),
                selection: yield* hexFromArgb(scheme.primaryContainer),
                muted: yield* hexFromArgb(scheme.onSurfaceVariant),

                background: yield* hexFromArgb(scheme.surface),
                dark_background: yield* hexFromArgb(scheme.surfaceContainerLow),
                darker_background: yield* hexFromArgb(scheme.surfaceContainerLowest),
                lighter_background: yield* hexFromArgb(scheme.surfaceBright),

                foreground: yield* hexFromArgb(scheme.onSurface),
                dark_foreground: yield* hexFromArgb(
                  (() => {
                    const hct = Hct.fromInt(scheme.onSurface);
                    const tone = Contrast.darkerUnsafe(hct.tone, 2);
                    hct.tone = tone;
                    return hct.toInt();
                  })(),
                ),
                light_foreground: yield* hexFromArgb(
                  (() => {
                    const hct = Hct.fromInt(scheme.onSurface);
                    const tone = Contrast.lighterUnsafe(hct.tone, 2);
                    hct.tone = tone;
                    return hct.toInt();
                  })(),
                ),
                bright_foreground: yield* hexFromArgb(
                  (() => {
                    const hct = Hct.fromInt(scheme.onSurface);
                    const tone = Contrast.lighterUnsafe(hct.tone, 3);
                    hct.tone = tone;
                    return hct.toInt();
                  })(),
                ),

                red: yield* hexFromArgb(ansi.red),
                yellow: yield* hexFromArgb(ansi.yellow),
                green: yield* hexFromArgb(ansi.green),
                cyan: yield* hexFromArgb(ansi.cyan),
                blue: yield* hexFromArgb(ansi.blue),
                magenta: yield* hexFromArgb(ansi.magenta),

                bright_red: yield* hexFromArgb(ansi.bright_red),
                bright_yellow: yield* hexFromArgb(ansi.bright_yellow),
                bright_green: yield* hexFromArgb(ansi.bright_green),
                bright_cyan: yield* hexFromArgb(ansi.bright_cyan),
                bright_blue: yield* hexFromArgb(ansi.bright_blue),
                bright_magenta: yield* hexFromArgb(ansi.bright_magenta),

                orange: yield* hexFromArgb(ansi.orange),
                brown: yield* hexFromArgb(ansi.brown),
              };

              return colors;
            }),
        ),
        Effect.tapError(Effect.logError),
      );

      const createOmarchyColorsFromImage: MaterialServiceImpl["createOmarchyColorsFromImage"] =
        flow(
          Effect.fn("MaterialService.createOmarchyColorsFromImage")((url, options) =>
            Effect.gen(function* () {
              if (Option.isNone(worker)) {
                return yield* new MaterialServiceError({ cause: "worker is not available" });
              }

              const activeWorker = worker.value;

              // Fetched here, not in the worker: Tauri's IPC is only reachable from the window.
              const imageBytes = yield* fetchImageBytes(url);

              const id = crypto.randomUUID();

              const message = yield* Schema.encodeEffect(MaterialWorkerEventData)({
                _tag: "CreateOmarchyColors",
                id,
                imageBytes,
                options,
              });

              const result = yield* Effect.callback<unknown, MaterialServiceError>((resume) => {
                const cleanup = () => {
                  activeWorker.removeEventListener("message", messageHandler);
                  activeWorker.removeEventListener("error", errorHandler);
                };

                const messageHandler = (event: MessageEvent) => {
                  // Every in-flight call listens on the same worker, so ignore other replies.
                  if ((event.data as { id?: unknown } | null)?.id !== id) return;

                  cleanup();
                  resume(Effect.succeed(event.data));
                };

                const errorHandler = (event: ErrorEvent) => {
                  cleanup();
                  resume(
                    Effect.fail(
                      new MaterialServiceError({ cause: event.message ?? "unknown error" }),
                    ),
                  );
                };

                activeWorker.addEventListener("message", messageHandler);
                activeWorker.addEventListener("error", errorHandler);
                activeWorker.postMessage(message, [message.imageBytes.buffer]);

                return Effect.sync(cleanup);
              }).pipe(
                Effect.flatMap(Schema.decodeUnknownEffect(MaterialWorkerMessageData)),
                Effect.flatMap(
                  Match.type<typeof MaterialWorkerMessageData.Type>().pipe(
                    Match.tag("CreateOmarchyColors", ({ id: _id, ...colors }) =>
                      Effect.succeed(colors),
                    ),
                    Match.tag("Failure", ({ message }) =>
                      Effect.fail(new MaterialServiceError({ cause: message })),
                    ),
                    Match.exhaustive,
                  ),
                ),
              );

              return result;
            }),
          ),
          Effect.tapError(Effect.logError),
        );

      return {
        fetchImageBytes,
        quantizeSource,
        createScheme,
        schemeToOmarchyColors,
        createOmarchyColorsFromImage,
      };
    }),
  );
}

export class MaterialServiceError extends Schema.TaggedError<MaterialServiceError>()(
  "app/features/material/MaterialServiceError",
  { cause: Schema.Defect() },
) {}
