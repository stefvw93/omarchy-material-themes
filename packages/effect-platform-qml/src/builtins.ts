/**
 * ES2019+ built-ins missing from Quickshell's QML engine, injected by the
 * plugin build for the matching property accesses (e.g. `Object.hasOwn`).
 * Lowering syntax to es2017 does not add these.
 */
export const hasOwn = (object: object, key: PropertyKey): boolean =>
  Object.prototype.hasOwnProperty.call(object, key);

/**
 * V4's `Object.defineProperties` silently skips symbol keys. The es2017 object
 * spread helper copies prototypes with it, which loses Effect's
 * `[Symbol.iterator]` and breaks `yield*` in `Effect.gen`.
 */
export const defineProperties = <T extends object>(
  object: T,
  descriptors: PropertyDescriptorMap,
): T => {
  for (const key of Reflect.ownKeys(descriptors)) {
    const descriptor = (descriptors as Record<PropertyKey, PropertyDescriptor | undefined>)[key];
    if (descriptor !== undefined) Object.defineProperty(object, key, descriptor);
  }
  return object;
};
