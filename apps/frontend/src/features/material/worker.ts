/// <reference lib="webworker" />
import { Effect, ManagedRuntime, Match, Schema } from "effect";
import { SchemeKind } from "./colors";
import { MaterialWorkerEventData, MaterialWorkerMessageData } from "./protocol";
import { MaterialService } from "./service";

if (
  "DedicatedWorkerGlobalScope" in globalThis &&
  globalThis instanceof DedicatedWorkerGlobalScope
) {
  console.log("[worker] live");

  onmessage = async (event) => {
    const MainLayer = await import("../shared").then((m) => m.MainLayer);
    const workerRuntimeMain = ManagedRuntime.make(MainLayer);

    // Read before decoding: a malformed request still needs a reply the caller can match.
    const requestId = (event.data as { id?: unknown } | null)?.id;

    void workerRuntimeMain.runPromise(
      Effect.gen(function* () {
        const data = yield* Schema.decodeUnknownEffect(MaterialWorkerEventData)(event.data);
        const result = yield* Match.type<typeof MaterialWorkerEventData.Type>().pipe(
          Match.tag("CreateOmarchyColors", (data) =>
            createOmarchyColors(data.imageBytes, data.options).pipe(
              Effect.andThen((colors) =>
                Schema.encodeEffect(MaterialWorkerMessageData)({
                  _tag: "CreateOmarchyColors",
                  id: data.id,
                  ...colors,
                }),
              ),
            ),
          ),
          Match.exhaustive,
        )(data);

        postMessage(result);
      }).pipe(
        Effect.tap(Effect.log),
        Effect.tapError(Effect.logError),
        Effect.catch((error) =>
          Effect.gen(function* () {
            if (typeof requestId !== "string") return;

            const failure = yield* Schema.encodeEffect(MaterialWorkerMessageData)({
              _tag: "Failure",
              id: requestId,
              message: error instanceof Error ? error.message : String(error),
            });

            postMessage(failure);
          }).pipe(Effect.catch(() => Effect.void)),
        ),
      ),
    );
  };
}

const createOmarchyColors = (
  imageBytes: Uint8Array,
  options: { schemeKind: typeof SchemeKind.Type; isDark?: boolean },
) =>
  Effect.gen(function* () {
    const material = yield* MaterialService;
    const { sourceArgb, hues } = yield* material.quantizeSource(imageBytes);
    const scheme = yield* material.createScheme(options.schemeKind, sourceArgb, options.isDark);
    const colors = yield* material.schemeToOmarchyColors(scheme, hues);
    return colors;
  });
