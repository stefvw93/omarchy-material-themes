import { PlatformError } from "effect";

export const errorTagOfCause = (cause: unknown): PlatformError.SystemErrorTag => {
  const msg = String(cause);
  if (/os error 2\b|No such file or directory/.test(msg)) return "NotFound";
  if (/os error 13\b|forbidden path|permission denied/i.test(msg)) return "PermissionDenied";
  if (/os error 20\b|Not a directory/.test(msg)) return "NotFound";
  if (/os error 17\b|already exists/i.test(msg)) return "AlreadyExists";
  return "Unknown";
};
