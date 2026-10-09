/**
 * Events from Hyprland's socket2: one `name>>data` line each. Arguments are
 * comma-separated, but the last one may itself contain commas (window
 * titles), so split with the arity the event is known to have.
 */
export interface HyprEvent {
  readonly name: string;
  readonly data: string;
}

export const parseEvent = (line: string): HyprEvent | undefined => {
  const at = line.indexOf(">>");
  if (at <= 0) return undefined;
  return { name: line.slice(0, at), data: line.slice(at + 2) };
};

/** The first `count - 1` comma-separated fields, then the rest as one. */
export const eventArgs = (event: HyprEvent, count: number): string[] => {
  const parts: string[] = [];
  let rest = event.data;
  while (parts.length < count - 1) {
    const comma = rest.indexOf(",");
    if (comma < 0) break;
    parts.push(rest.slice(0, comma));
    rest = rest.slice(comma + 1);
  }
  parts.push(rest);
  return parts;
};

/**
 * Events that change which windows exist or where they are: what the plugins
 * rebuild on (their 80 ms-debounced `onRawEvent` filter).
 */
export const structuralEvents: ReadonlySet<string> = new Set([
  "openwindow",
  "closewindow",
  "movewindow",
  "movewindowv2",
  "changefloatingmode",
  "createworkspace",
  "createworkspacev2",
  "destroyworkspace",
  "destroyworkspacev2",
  "moveworkspace",
  "moveworkspacev2",
  "renameworkspace",
  "fullscreen",
  "pin",
  "focusedmon",
  "workspace",
  "workspacev2",
]);
