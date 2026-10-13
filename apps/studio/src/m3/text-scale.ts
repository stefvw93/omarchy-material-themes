/**
 * Studio's text size (interpretation text.scale): Omarchy's text size (the
 * shell's [font] base-size in ~/.config/omarchy/shell.toml) times
 * tokens.type.scale, as --stef-text-scale on <html>. m3.generated.css
 * multiplies the type roles by it and grows text containers (h-text-*);
 * spacing, icons and the root font size stay at 1×.
 */
import { resolveTokens } from "@stef/tokens/runtime";
import { fontBaseSizeOf, OMARCHY_TEXT_BASE, textScaleOf } from "@stef/tokens/text-scale";
import { OmarchyPaths } from "@stef/omarchy";
import { Effect, Stream } from "effect";
import { polled } from "./polled";

let baseSize = OMARCHY_TEXT_BASE;
let typeScale = 1;

const render = () => {
  const scale = textScaleOf({ typeScale, sizes: {}, containers: {} }, baseSize);
  document.documentElement.style.setProperty("--stef-text-scale", String(scale));
};

/** The Tokens page's type.scale while it is being edited, ahead of tokens.json. */
export const setTypeScale = (scale: number) => {
  typeScale = scale;
  render();
};

/** Sets --stef-text-scale from the defaults, before the files are read. */
export const showDefaultTextScale = render;

/** Omarchy's text size ([font] base-size in shell.toml), each time it changes. */
export const baseSizes = Stream.unwrap(
  Effect.gen(function* () {
    const paths = yield* OmarchyPaths;
    return polled(paths.shellToml).pipe(
      Stream.map((shell) => fontBaseSizeOf(shell ?? "") ?? OMARCHY_TEXT_BASE),
    );
  }),
);

/** tokens.type.scale from tokens.json, each time the file changes. */
export const typeScales = Stream.unwrap(
  Effect.gen(function* () {
    const paths = yield* OmarchyPaths;
    return polled(paths.tokensJson).pipe(Stream.map((tokens) => resolveTokens(tokens).type.scale));
  }),
);

/**
 * Follows the text size and tokens.json. Each is applied only when its own
 * file changes, so a change to shell.toml never undoes a type scale the
 * Tokens page is still editing.
 */
export const followTextScale = Effect.all(
  [
    Stream.runForEach(baseSizes, (size) =>
      Effect.sync(() => {
        baseSize = size;
        render();
      }),
    ),
    Stream.runForEach(typeScales, (scale) => Effect.sync(() => setTypeScale(scale))),
  ],
  { concurrency: "unbounded", discard: true },
);
