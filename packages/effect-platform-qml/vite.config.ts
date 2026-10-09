import { defineConfig } from "vite-plus";
import { qmlPackOptions } from "./build/preset.ts";

export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**"],
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {},
  pack: {
    ...qmlPackOptions(),
    entry: { spike: "spike/spike.ts" },
    outDir: "dist/qml",
    clean: true,
  },
});
