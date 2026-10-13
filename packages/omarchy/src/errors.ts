import { Schema } from "effect";

/** Omarchy's commands failed: `omarchy-shell` or `omarchy` exited non-zero, or couldn't run. */
export class OmarchyError extends Schema.TaggedError<OmarchyError>()("@stef/omarchy/OmarchyError", {
  message: Schema.String,
  cause: Schema.optionalKey(Schema.Defect()),
}) {}
