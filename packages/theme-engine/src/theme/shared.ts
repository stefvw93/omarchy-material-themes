import { Brand, Context, Effect, FileSystem, Path, PlatformError, Schema, flow } from "effect";

export type ThemePath = string & Brand.Brand<"ThemePath">;
export const ThemePath = Brand.nominal<ThemePath>();
/** Directory the theme files are written to, e.g. `~/.config/omarchy/themes/<name>`. */
export const ThemeOutputDirectory = Context.Service<ThemePath>(
  "@stef/theme-engine/ThemeOutputDirectory",
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
  "@stef/theme-engine/OmarchyThemeError",
  { cause: Schema.Defect() },
) {}
