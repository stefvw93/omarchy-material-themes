import { Schema } from "effect";
import { Contrast, Mode, ThemePalette, Variant } from "@stef/theme-engine";

export const PaletteRequest = Schema.Struct({
  variant: Variant,
  mode: Mode,
  contrast: Contrast,
});
export type PaletteRequest = typeof PaletteRequest.Type;

export const MaterialWorkerEventData = Schema.TaggedUnion({
  CreatePalette: {
    id: Schema.String,
    imageBytes: Schema.Uint8Array,
    options: PaletteRequest,
  },
});

export const MaterialWorkerMessageData = Schema.TaggedUnion({
  CreatePalette: {
    id: Schema.String,
    palette: ThemePalette,
  },
  Failure: {
    id: Schema.String,
    message: Schema.String,
  },
});
