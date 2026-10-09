import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";
import { qmlCompat } from "./build/qml-compat.ts";

const timers = fileURLToPath(new URL("./src/timers.ts", import.meta.url));
const global = fileURLToPath(new URL("./src/global.ts", import.meta.url));
const bigint = fileURLToPath(new URL("./src/bigint.ts", import.meta.url));
const builtins = fileURLToPath(new URL("./src/builtins.ts", import.meta.url));

export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**"],
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {},
  // The spike bundle targets Quickshell's QML engine: es2017 syntax (it
  // rejects object spread), and every bare setTimeout/clearTimeout routed to
  // the host-backed shim because the engine has neither. The engine also lacks
  // `globalThis` (Effect's global caches) and `BigInt` (Duration nanos).
  pack: {
    entry: { spike: "spike/spike.ts" },
    format: ["esm"],
    platform: "neutral",
    target: "es2017",
    outDir: "dist/qml",
    fixedExtension: true,
    dts: false,
    clean: true,
    // QML imports resolve relative files only, so Effect must be bundled in.
    noExternal: [/^effect(\/|$)/],
    plugins: [qmlCompat()],
    inputOptions: {
      transform: {
        inject: {
          setTimeout: [timers, "setTimeout"],
          clearTimeout: [timers, "clearTimeout"],
          globalThis: [global, "globalObject"],
          BigInt: [bigint, "BigIntShim"],
          "Object.hasOwn": [builtins, "hasOwn"],
          "Object.defineProperties": [builtins, "defineProperties"],
        },
      },
    },
  },
});
