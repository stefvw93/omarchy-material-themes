import { Effect, Schema } from "effect";
import { parseArgs } from "util";
import { HexColor, Mode, omarchyColorsFromMaterialSeed } from "./colors";

const main = Effect.gen(function* () {
  yield* Effect.void;

  const { values } = parseArgs({
    args: process.argv,
    options: {
      accent: {
        type: "string",
      },
      mode: {
        type: "string",
      },
    },
    strict: true,
    allowPositionals: true,
  });

  const accent = Schema.decodeUnknownSync(HexColor)(values.accent);
  const mode = Schema.decodeUnknownSync(Mode)(values.mode);

  const colors = yield* omarchyColorsFromMaterialSeed(accent, mode);

  yield* Effect.log(colors);
});

void Effect.runPromise(main);
