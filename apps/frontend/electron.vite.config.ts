import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "electron-vite";

// Electron 42 ships Chromium 142 / Node 22 — no downlevel transpilation needed.
const CHROME_TARGET = "chrome142";
const NODE_TARGET = "node22";

export default defineConfig({
  main: {
    build: {
      // electron-vite leaves main/preload unminified by default.
      minify: "esbuild",
      sourcemap: false,
      target: NODE_TARGET,
    },
  },
  preload: {
    build: {
      minify: "esbuild",
      sourcemap: false,
      target: NODE_TARGET,
    },
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [react()],
    build: {
      minify: "esbuild",
      sourcemap: false,
      target: CHROME_TARGET,
      reportCompressedSize: false,
      // Small assets are loaded over file:// anyway — inlining them removes
      // separate asar entries.
      assetsInlineLimit: 16 * 1024,
      chunkSizeWarningLimit: 2048,
    },
  },
});
