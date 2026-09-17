import {
  Brand,
  Context,
  Effect,
  FileSystem,
  Layer,
  Path,
  PlatformError,
  Schema,
  flow,
} from "effect";

export type ThemePath = string & Brand.Brand<"ThemePath">;
export const ThemePath = Brand.nominal<ThemePath>();
export const ThemeOutputDirectory = Context.Service<ThemePath>(
  "app/features/omarchy-theme/ThemeOutputDirectory",
);

export const ThemeOutputDirectoryLive = Layer.succeed(
  ThemeOutputDirectory,
  ThemePath(`/home/stef/.config/omarchy/themes/omaterial-dev`),
);

export type ThemeFileWriter<Input = undefined> = Input extends undefined
  ? () => Effect.Effect<void, PlatformError.PlatformError>
  : (input: Input) => Effect.Effect<void, PlatformError.PlatformError>;

export const makeThemeFileWriter = <Input = undefined>(
  fileId: string,
  template: Input extends undefined ? () => string : (input: Input) => string,
) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const outDir = yield* ThemeOutputDirectory;
    const outPath = path.join(outDir, fileId);
    return flow(template as () => string, (content) => fs.writeFileString(outPath, content));
  });

export class OmarchyThemeError extends Schema.TaggedError<OmarchyThemeError>()(
  "app/features/omarchy-theme/OmarchyThemeError",
  { cause: Schema.Defect() },
) {}
