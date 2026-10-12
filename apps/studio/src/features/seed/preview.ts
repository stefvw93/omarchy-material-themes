import type { ThemePalette } from "@stef/theme-engine";
import { showPreview } from "@/m3/scheme";

/**
 * Shows a generated theme on Studio itself: its M3 roles replace the applied
 * theme's (interpretation studio.colors), and m3.generated.css carries them to
 * Tailwind and the shadcn variables. Returns a function that ends the preview.
 */
export const applyPreviewColors = (palette: ThemePalette): (() => void) =>
  showPreview({ mode: palette.source.mode, color: palette.system });
