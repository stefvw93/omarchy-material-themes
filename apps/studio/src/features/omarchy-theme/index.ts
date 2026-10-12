import { Context, Effect, FileSystem, Layer, Path, PlatformError } from "effect";
import { configDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/core";
import { HttpClient } from "effect/http";
import {
  makeThemeWriters,
  OmarchyThemeError,
  ThemeOutputDirectory,
  ThemePath,
  ThemeTokens,
  writeTheme,
  type ThemePalette,
} from "@stef/theme-engine";
import { OmarchyPaths, readTokens, type TokensError } from "@stef/omarchy";

export interface OmarchyThemeImpl {
  /** The theme name passed to `omarchy theme set`. */
  name: string;
  clean: () => Effect.Effect<void, PlatformError.PlatformError, never>;
  setTheme: () => Effect.Effect<void, OmarchyThemeError, never>;
  writeBackgroundImage: (url: URL) => Effect.Effect<void, OmarchyThemeError, never>;
  /**
   * Writes every theme file (colors.toml, hyprland.lua, shell.*.toml,
   * omaterial.json), rendered with the tokens in tokens.json at that moment.
   */
  writeTheme: (
    palette: ThemePalette,
  ) => Effect.Effect<void, PlatformError.PlatformError | TokensError, never>;
}

const imageContentTypeToExtension: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/bmp": "bmp",
  "image/svg+xml": "svg",
  "image/tiff": "tiff",
};

const imageExtensionFromContentType = (contentType: string | undefined): string => {
  const mimeType = contentType?.split(";")[0]?.trim().toLowerCase();
  return (mimeType && imageContentTypeToExtension[mimeType]) ?? "jpg";
};

export class OmarchyTheme extends Context.Service<OmarchyTheme, OmarchyThemeImpl>()(
  "studio/features/omarchy-theme/OmarchyTheme",
) {
  static readonly themeName = "omaterial-dev";

  static readonly layer = Layer.effect(
    this,
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const paths = yield* OmarchyPaths;

      const client = (yield* HttpClient.HttpClient).pipe(
        HttpClient.tapRequest((req) => Effect.log(req.toJSON())),
        HttpClient.tap(Effect.log),
        HttpClient.filterStatusOk,
      );

      const themePath = path.join(
        yield* Effect.promise(configDir),
        "omarchy/themes",
        OmarchyTheme.themeName,
      );
      const backgroundImagesPath = path.join(themePath, "backgrounds");

      yield* fs.makeDirectory(backgroundImagesPath, { recursive: true });

      const writers = yield* makeThemeWriters.pipe(
        Effect.provideService(ThemeOutputDirectory, ThemePath(themePath)),
      );

      const clean: OmarchyThemeImpl["clean"] = () =>
        Effect.gen(function* () {
          yield* Effect.log("Cleaning theme...", themePath);
          yield* fs.remove(themePath, { recursive: true });
          yield* fs.makeDirectory(backgroundImagesPath, { recursive: true });
        });

      const setTheme: OmarchyThemeImpl["setTheme"] = () =>
        Effect.tryPromise({
          try: () => invoke("set_theme", { name: OmarchyTheme.themeName }),
          catch: (cause) => new OmarchyThemeError({ cause }),
        });

      const writeBackgroundImage: OmarchyThemeImpl["writeBackgroundImage"] = (url) =>
        Effect.gen(function* () {
          const res = yield* client.get(url.toString());
          const data = yield* res.arrayBuffer;

          const extension = imageExtensionFromContentType(res.headers["content-type"]);
          const imagePath = path.join(
            backgroundImagesPath,
            `background-${crypto.randomUUID()}.${extension}`,
          );

          yield* fs.writeFile(imagePath, new Uint8Array(data));
        }).pipe(Effect.catch((e) => Effect.fail(new OmarchyThemeError({ cause: e }))));

      return {
        name: OmarchyTheme.themeName,
        clean,
        setTheme,
        writeBackgroundImage,
        writeTheme: (palette) =>
          Effect.gen(function* () {
            const tokens = yield* readTokens.pipe(
              Effect.provideService(OmarchyPaths, paths),
              Effect.provideService(FileSystem.FileSystem, fs),
            );
            yield* writeTheme(writers, palette).pipe(Effect.provideService(ThemeTokens, tokens));
          }),
      } satisfies OmarchyThemeImpl;
    }),
  );
}
