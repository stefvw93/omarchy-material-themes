/**
 * Stand-in for `BigInt`, which Quickshell's QML engine does not define. Effect
 * uses it for Duration/Clock nanoseconds and BigDecimal. Operators cannot be
 * polyfilled on objects, so this returns integer-valued Numbers: arithmetic and
 * comparisons keep working, exact above 2^53 is lost (~256ns granularity on
 * epoch nanos), and `typeof` reports "number". Fine for UI timing; don't use
 * BigDecimal or bigint Schemas in QML bundles.
 */
export const BigIntShim = (value: unknown): number => {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new RangeError(`Cannot convert ${String(value)} to a BigInt`);
  return Math.trunc(n);
};
