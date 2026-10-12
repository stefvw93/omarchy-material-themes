import { sourceColorFromImageBytes } from "@material/material-color-utilities";
import { Context, Effect, flow, Layer, Match, Option, Schema } from "effect";
import { HttpClient } from "effect/http";
import { quantizeMaxSize, type ThemePalette } from "@stef/theme-engine";
import {
  MaterialWorkerEventData,
  MaterialWorkerMessageData,
  type PaletteRequest,
} from "./protocol";

export interface MaterialServiceImpl {
  /**
   * Fetch the raw (still-encoded) image file. Main thread only: Tauri's IPC lives on
   * `window.__TAURI_INTERNALS__`, which a worker cannot reach.
   */
  fetchImageBytes: (url: URL) => Effect.Effect<Uint8Array, MaterialServiceError>;
  /** The image's source colour (material-color-utilities). Worker-safe: no DOM, no IPC. */
  quantizeSource: (imageBytes: Uint8Array) => Effect.Effect<number, MaterialServiceError>;
  /** Fetches the image and has the worker generate the theme's palette from it. */
  createPaletteFromImage: (
    url: URL,
    options: PaletteRequest,
  ) => Effect.Effect<ThemePalette, Schema.SchemaError | MaterialServiceError>;
}

export class MaterialService extends Context.Service<MaterialService, MaterialServiceImpl>()(
  "features/material/MaterialService",
) {
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

            const width = Math.max(1, Math.ceil(Math.min(quantizeMaxSize, bitmap.width)));
            const height = Math.max(
              1,
              Math.ceil(Math.min(quantizeMaxSize / aspectRatio, bitmap.height)),
            );

            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext("2d");

            if (!ctx) throw new Error("Failed to get canvas context");

            ctx.drawImage(bitmap, 0, 0, width, height);
            bitmap.close();

            const { data } = ctx.getImageData(0, 0, width, height);

            return sourceColorFromImageBytes(data);
          }),
        ),
        Effect.tapError(Effect.logError),
        Effect.catch((error) => new MaterialServiceError({ cause: error })),
      );

      const createPaletteFromImage: MaterialServiceImpl["createPaletteFromImage"] = flow(
        Effect.fn("MaterialService.createPaletteFromImage")((url, options) =>
          Effect.gen(function* () {
            if (Option.isNone(worker)) {
              return yield* new MaterialServiceError({ cause: "worker is not available" });
            }

            const activeWorker = worker.value;

            // Fetched here, not in the worker: Tauri's IPC is only reachable from the window.
            const imageBytes = yield* fetchImageBytes(url);

            const id = crypto.randomUUID();

            const message = yield* Schema.encodeEffect(MaterialWorkerEventData)({
              _tag: "CreatePalette",
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
                  Match.tag("CreatePalette", ({ palette }) => Effect.succeed(palette)),
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
        createPaletteFromImage,
      };
    }),
  );
}

export class MaterialServiceError extends Schema.TaggedError<MaterialServiceError>()(
  "app/features/material/MaterialServiceError",
  { cause: Schema.Defect() },
) {}
