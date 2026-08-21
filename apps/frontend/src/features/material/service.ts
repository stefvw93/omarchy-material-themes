import {
  Blend,
  Contrast,
  DynamicScheme,
  Hct,
  SchemeFidelity,
  sourceColorFromImageBytes,
  hexFromArgb as unsafeHexFromArgb,
} from "@material/material-color-utilities";
import { Context, Effect, flow, Layer, pipe, Schema } from "effect";
import { HttpClient } from "effect/unstable/http";
import { HexColor, MATERIAL_REFERENCE_COLORS_2014_ARGB, type OmarchyColors } from "./_colors";

export interface MaterialServiceImpl {
  quantizeSource: (url: URL) => Effect.Effect<number, MaterialServiceError>;
  createScheme: (sourceArgb: number) => Effect.Effect<DynamicScheme>;
  schemeToOmarchyColors: (
    scheme: DynamicScheme,
  ) => Effect.Effect<OmarchyColors, Schema.SchemaError>;
}

export class MaterialService extends Context.Service<MaterialService, MaterialServiceImpl>()(
  "features/material/MaterialService",
) {
  static readonly quantizeMaxSize = 256;

  static readonly layer = Layer.effect(
    this,
    Effect.gen(function* () {
      const client = (yield* HttpClient.HttpClient).pipe(
        HttpClient.tapRequest((req) => Effect.log(req.toJSON())),
        HttpClient.tap(Effect.log),
        HttpClient.filterStatusOk,
      );

      const quantizeImage = (url: URL) =>
        Effect.gen(function* () {
          const response = yield* client.get(url.toString());
          const arrayBuffer = yield* response.arrayBuffer;
          const blob = new Blob([arrayBuffer]);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) throw new Error("Failed to get canvas context");

          const objectUrl = URL.createObjectURL(blob);
          const image = yield* Effect.tryPromise(
            () =>
              new Promise<HTMLImageElement>((resolve, reject) => {
                const image = new Image();
                image.src = objectUrl;
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error("Failed to load image"));
              }),
          );

          const aspectRatio = image.width / image.height;
          const compressedWidth = Math.min(MaterialService.quantizeMaxSize, image.width);
          const compressedHeight = Math.min(
            MaterialService.quantizeMaxSize / aspectRatio,
            image.height,
          );
          ctx.drawImage(image, 0, 0, compressedWidth, compressedHeight);
          const imageData = ctx.getImageData(0, 0, compressedWidth, compressedHeight);
          const sourceArgb = sourceColorFromImageBytes(imageData.data);
          return { objectUrl, sourceArgb, canvas, image };
        }).pipe(Effect.tapError(Effect.logError));

      const quantizeSource: MaterialServiceImpl["quantizeSource"] = flow(
        Effect.fn("MaterialService.quantizeSource")(function* (url: URL) {
          const blob = yield* client.get(url.toString()).pipe(
            Effect.flatMap((res) => res.arrayBuffer),
            Effect.map((data) => new Blob([data])),
          );

          const objUrl = URL.createObjectURL(blob);

          yield* Effect.addFinalizer(() => Effect.succeed(URL.revokeObjectURL(objUrl)));

          const { sourceArgb } = yield* Effect.acquireRelease(quantizeImage(url), (resource) =>
            Effect.succeed(URL.revokeObjectURL(resource.objectUrl)),
          );

          return sourceArgb;
        }),
        Effect.scoped,
        Effect.tapError(Effect.logError),
        Effect.catch((error) => new MaterialServiceError({ cause: error })),
      );

      const createScheme: MaterialServiceImpl["createScheme"] = flow(
        Effect.fn("MaterialService.createScheme")((sourceArgb: number) =>
          Effect.sync(() => {
            const sourceHct = Hct.fromInt(sourceArgb);
            return new SchemeFidelity(
              sourceHct,
              true, // isDark
              0, // contrastLevel: -1 to 1, 0 = default
            );
          }),
        ),
      );

      const schemeToOmarchyColors: MaterialServiceImpl["schemeToOmarchyColors"] = flow(
        Effect.fn("MaterialService.schemeToOmarchyColors")((scheme: DynamicScheme) =>
          Effect.gen(function* () {
            const decodeHexColor = Schema.decodeEffect(HexColor);
            const hexFromArgb = (argb: number) => pipe(unsafeHexFromArgb(argb), decodeHexColor);

            const harmonize = (argb: number) =>
              pipe(
                argb,
                (argb) => Blend.harmonize(argb, scheme.sourceColorArgb),
                hexFromArgb,
                Effect.flatMap(decodeHexColor),
              );

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
              dark_foreground: yield* hexFromArgb(Contrast.darkerUnsafe(scheme.onSurface, 1)),
              light_foreground: yield* hexFromArgb(Contrast.lighterUnsafe(scheme.onSurface, 1)),
              bright_foreground: yield* hexFromArgb(Contrast.lighterUnsafe(scheme.onSurface, 1.4)),

              red: yield* hexFromArgb(scheme.error),
              // red: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.red),
              yellow: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.yellow),
              green: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.green),
              cyan: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.cyan),
              blue: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.blue),
              magenta: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.magenta),

              bright_red: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_red),
              bright_yellow: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_yellow),
              bright_green: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_green),
              bright_cyan: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_cyan),
              bright_blue: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_blue),
              bright_magenta: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_magenta),

              orange: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.orange),
              brown: yield* harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.brown),
            };

            return colors;
          }),
        ),
        Effect.tapError(Effect.logError),
      );

      return {
        quantizeSource,
        createScheme,
        schemeToOmarchyColors,
      };
    }),
  );
}

export class MaterialServiceError extends Schema.TaggedError<MaterialServiceError>()(
  "app/features/material/MaterialServiceError",
  { cause: Schema.Defect() },
) {}
