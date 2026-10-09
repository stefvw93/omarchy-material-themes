/**
 * Stand-in for `globalThis`, which Quickshell's QML engine does not define.
 * Reads fall through to the real (read-only) QML global object; writes land on
 * this object instead. The plugin build injects it for bare `globalThis`.
 */
const realGlobal: object = (() => {
  try {
    // oxlint-disable-next-line typescript/no-implied-eval -- only way to reach the real global in a strict module
    return (Function("return this")() as object | undefined) ?? {};
  } catch {
    return {};
  }
})();

export const globalObject: Record<PropertyKey, unknown> = Object.create(realGlobal);
