import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    server: {
      // material-color-utilities ships extensionless relative imports, which Node's
      // ESM resolver rejects. Inlining routes it through Vite's resolver instead.
      deps: {
        inline: ["@material/material-color-utilities"],
      },
    },
  },
});
