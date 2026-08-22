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
import { Context, Effect, flow, Layer, pipe, Schema } from "effect";
import { HttpClient } from "effect/unstable/http";
import { buildAnsiColors } from "./ansi";
import { HexColor, type OmarchyColors } from "./colors";

/** The seed image reduced to what scheme building needs: one source colour, and the hues actually in it. */
export interface QuantizedSeed {
  sourceArgb: number;
  hues: number[];
}

export interface MaterialServiceImpl {
  quantizeSource: (url: URL) => Effect.Effect<QuantizedSeed, MaterialServiceError>;
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
      const imageHues = (imageData: ImageData) => {
        const bytes = imageData.data;
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

      const quantizeImage = (objectUrl: string) =>
        Effect.gen(function* () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) throw new Error("Failed to get canvas context");

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
          const width = Math.min(MaterialService.quantizeMaxSize, image.width);
          const height = Math.min(MaterialService.quantizeMaxSize / aspectRatio, image.height);

          // The canvas defaults to 300x150, so tall images would otherwise read back
          // rows that were never drawn to.
          canvas.width = Math.max(1, Math.ceil(width));
          canvas.height = Math.max(1, Math.ceil(height));

          ctx.drawImage(image, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          return {
            sourceArgb: sourceColorFromImageBytes(imageData.data),
            hues: imageHues(imageData),
          } satisfies QuantizedSeed;
        }).pipe(Effect.tapError(Effect.logError));

      const quantizeSource: MaterialServiceImpl["quantizeSource"] = flow(
        Effect.fn("MaterialService.quantizeSource")(function* (url: URL) {
          const blob = yield* client.get(url.toString()).pipe(
            Effect.flatMap((res) => res.arrayBuffer),
            Effect.map((data) => new Blob([data])),
          );

          const objectUrl = URL.createObjectURL(blob);

          yield* Effect.addFinalizer(() => Effect.succeed(URL.revokeObjectURL(objectUrl)));

          return yield* quantizeImage(objectUrl);
        }),
        Effect.scoped,
        Effect.tapError(Effect.logError),
        Effect.catch((error) => new MaterialServiceError({ cause: error })),
      );
      const createScheme: MaterialServiceImpl["createScheme"] = flow(
        Effect.fn("MaterialService.createScheme")(
          (
            kind: keyof typeof MaterialService.schemeContstructors,
            sourceArgb: number,
            isDark = true,
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
