import { Schema } from "effect";
import { OmarchyColors, SchemeKind } from "./colors";

export const MaterialWorkerEventData = Schema.TaggedUnion({
  CreateOmarchyColors: {
    /** Correlates the reply with its request; one worker serves every concurrent call. */
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
  /** Posted when the job fails, so the caller resumes instead of waiting forever. */
  Failure: {
    id: Schema.String,
    message: Schema.String,
  },
});
