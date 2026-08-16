import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  test: {
    server: {
      deps: {
        // @material/material-color-utilities@0.4.0 ships an extensionless
        // relative import (dynamiccolor/color_spec_2025.js -> './dynamic_color'),
        // which Node's ESM resolver rejects. Inlining lets Vite resolve it.
        inline: ["@material/material-color-utilities"],
      },
    },
  },
});
