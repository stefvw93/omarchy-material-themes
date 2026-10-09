import type { UserConfig } from "vite-plus";

/** Lint settings every workspace shares; the root config applies them repo-wide. */
export const lint = {
  options: { typeAware: true, typeCheck: true },
} satisfies UserConfig["lint"];
