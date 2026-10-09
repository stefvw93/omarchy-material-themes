import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  // Golden test output must stay byte-exact.
  fmt: { ignorePatterns: ["**/__golden__/**"] },
  lint: {
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
