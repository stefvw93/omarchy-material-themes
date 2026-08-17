import { defineConfig } from "vite-plus";

export default defineConfig({
  server: {
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
