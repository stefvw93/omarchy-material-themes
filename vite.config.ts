import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  // Golden test output must stay byte-exact; the M3 spec snapshot, its extract
  // and the tokens generated from it are machine-written. The bar's upstream
  // snapshot and its forked BarModel.js stay as Omarchy wrote them, so they
  // diff cleanly against upstream.
  fmt: {
    ignorePatterns: [
      "**/__golden__/**",
      "apps/bar/upstream/**",
      "apps/bar/qml/BarModel.js",
      "apps/studio/docs/material-3/**",
      "apps/studio/docs/m3-interpretations.md",
      "packages/m3/spec/**",
      "packages/m3/src/generated/**",
      "packages/qml-kit/src/m3.generated.ts",
      "apps/studio/src/m3/m3.generated.css",
    ],
  },
  lint: {
    ignorePatterns: ["apps/bar/upstream/**", "apps/bar/qml/BarModel.js"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
  test: {
    // Delegate to each workspace's own vite.config.ts so `vp test` from the
    // repo root behaves the same as running it inside a package.
    projects: ["packages/*", "apps/*", "tools/*"],
  },
});
