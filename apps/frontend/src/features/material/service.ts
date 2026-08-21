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
import { decodeHexColor, MATERIAL_REFERENCE_COLORS_2014_ARGB, type OmarchyColors } from "./_colors";

export interface MaterialServiceImpl {
  quantizeSource: (url: URL) => Effect.Effect<number, MaterialServiceError>;
  createScheme: (sourceArgb: number) => Effect.Effect<DynamicScheme>;
  schemeToOmarchyColors: (scheme: DynamicScheme) => Effect.Effect<OmarchyColors>;
}

export class MaterialService extends Context.Service<MaterialService, MaterialServiceImpl>()(
  "features/material/MaterialService",
) {
  static readonly quantizeMaxSize = 256;

  static readonly layer = Layer.effect(
    this,
    Effect.gen(function* () {
      // Take the base HttpClient and apply middleware that should run on every
      // request this service makes.
      const client = (yield* HttpClient.HttpClient).pipe(
        HttpClient.tapRequest((req) => Effect.log(req.toJSON())),
        HttpClient.tap(Effect.log),
        HttpClient.tap((res) =>
          Effect.flatMap(res.json, (body) => Effect.log({ status: res.status, body })),
        ),
        // Turn non-2xx responses into a typed failure.
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
        });

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
          Effect.sync(() => {
            const hexFromArgb = (argb: number) =>
              pipe(unsafeHexFromArgb(argb), (hex) => decodeHexColor(hex));

            const harmonize = (argb: number) =>
              pipe(
                argb,
                (argb) => Blend.harmonize(argb, scheme.sourceColorArgb),
                hexFromArgb,
                decodeHexColor,
              );

            const colors: OmarchyColors = {
              mode: scheme.isDark ? "dark" : "light",

              accent: hexFromArgb(scheme.primary),
              selection: hexFromArgb(scheme.primaryContainer),
              muted: hexFromArgb(scheme.onSurfaceVariant),

              background: hexFromArgb(scheme.surface),
              dark_background: hexFromArgb(scheme.surfaceContainerLow),
              darker_background: hexFromArgb(scheme.surfaceContainerLowest),
              lighter_background: hexFromArgb(scheme.surfaceBright),

              foreground: hexFromArgb(scheme.onSurface),
              dark_foreground: hexFromArgb(Contrast.darkerUnsafe(scheme.onSurface, 1)),
              light_foreground: hexFromArgb(Contrast.lighterUnsafe(scheme.onSurface, 1)),
              bright_foreground: hexFromArgb(Contrast.lighterUnsafe(scheme.onSurface, 1.4)),

              red: hexFromArgb(scheme.error),
              // red: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.red),
              yellow: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.yellow),
              green: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.green),
              cyan: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.cyan),
              blue: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.blue),
              magenta: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.magenta),

              bright_red: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_red),
              bright_yellow: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_yellow),
              bright_green: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_green),
              bright_cyan: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_cyan),
              bright_blue: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_blue),
              bright_magenta: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.bright_magenta),

              orange: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.orange),
              brown: harmonize(MATERIAL_REFERENCE_COLORS_2014_ARGB.brown),
            };

            return colors;
          }),
        ),
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
