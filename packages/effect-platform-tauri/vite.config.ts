import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    // TypeScript 7: the declaration generator defaults to tsgo.
    dts: true,
    exports: {
      devExports: true,
    },
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
