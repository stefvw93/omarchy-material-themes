import { defaultTokens, type Tokens } from "@stef/tokens/runtime";
import { Brand, Context, Effect, FileSystem, Path, PlatformError, Schema } from "effect";

export type ThemePath = string & Brand.Brand<"ThemePath">;
export const ThemePath = Brand.nominal<ThemePath>();
/** Directory the theme files are written to, e.g. `~/.config/omarchy/themes/<name>`. */
export const ThemeOutputDirectory = Context.Service<ThemePath>(
  "@stef/theme-engine/ThemeOutputDirectory",
);

export type ThemeFileWriter<Input = undefined> = Input extends undefined
  ? () => Effect.Effect<void, PlatformError.PlatformError>
  : (input: Input) => Effect.Effect<void, PlatformError.PlatformError>;

/**
 * The design tokens theme files are rendered with (gaps, borders, blur,
 * motion scheme). Defaults to `defaultTokens`, which reproduce the theme
 * exactly as it was before tokens existed.
 */
export const ThemeTokens = Context.Reference<Tokens>("@stef/theme-engine/ThemeTokens", {
  defaultValue: () => defaultTokens,
});

export const makeThemeFileWriter = <Input = undefined>(
  fileId: string,
  template: Input extends undefined
    ? (input: undefined, tokens: Tokens) => string
    : (input: Input, tokens: Tokens) => string,
) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const outDir = yield* ThemeOutputDirectory;
    const tokens = yield* ThemeTokens;
    const outPath = path.join(outDir, fileId);
    const render = template as (input: Input, tokens: Tokens) => string;
    return ((input: Input) =>
      fs.writeFileString(outPath, render(input, tokens))) as ThemeFileWriter<Input>;
  });

export class OmarchyThemeError extends Schema.TaggedError<OmarchyThemeError>()(
  "@stef/theme-engine/OmarchyThemeError",
  { cause: Schema.Defect() },
) {}
