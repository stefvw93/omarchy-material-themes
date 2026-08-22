import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
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
