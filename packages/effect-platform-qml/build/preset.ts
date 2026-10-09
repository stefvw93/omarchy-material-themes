import { fileURLToPath } from "node:url";
import type { UserConfig } from "vite-plus/pack";
import { qmlCompat } from "./qml-compat.ts";

const shim = (file: string) => fileURLToPath(new URL(`../src/${file}`, import.meta.url));

/**
 * tsdown (`vp pack`) options for bundles that run in Quickshell's QML (V4)
 * engine. See SPIKE.md for why each piece exists:
 * - es2017 syntax: V4 can't parse object spread, class fields or async.
 * - everything bundled: QML resolves relative `.mjs` imports only.
 * - shims injected for globals V4 lacks or gets wrong (globalThis, timers,
 *   BigInt, Object.hasOwn, Object.defineProperties with symbol keys).
 * - qmlCompat: inlines `super()` arrows V4 rejects.
 */
export const qmlPackOptions = (): UserConfig => ({
  format: ["esm"],
  platform: "neutral",
  target: "es2017",
  fixedExtension: true,
  dts: false,
  deps: { alwaysBundle: [/.*/] },
  plugins: [qmlCompat()],
  inputOptions: {
    transform: {
      inject: {
        setTimeout: [shim("timers.ts"), "setTimeout"],
        clearTimeout: [shim("timers.ts"), "clearTimeout"],
        globalThis: [shim("global.ts"), "globalObject"],
        BigInt: [shim("bigint.ts"), "BigIntShim"],
        "Object.hasOwn": [shim("builtins.ts"), "hasOwn"],
        "Object.defineProperties": [shim("builtins.ts"), "defineProperties"],
      },
    },
  },
});
