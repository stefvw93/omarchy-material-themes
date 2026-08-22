import { Schema } from "effect";
import { OmarchyColors, SchemeKind } from "./colors";

export const MaterialWorkerEventData = Schema.TaggedUnion({
  CreateOmarchyColors: {
    id: Schema.String,
    imageBytes: Schema.Uint8Array,
    options: Schema.Struct({
      schemeKind: SchemeKind,
      isDark: Schema.optional(Schema.Boolean),
    }),
  },
});

export const MaterialWorkerMessageData = Schema.TaggedUnion({
  CreateOmarchyColors: {
    id: Schema.String,
    ...OmarchyColors.fields,
  },
  Failure: {
    id: Schema.String,
    message: Schema.String,
  },
});
