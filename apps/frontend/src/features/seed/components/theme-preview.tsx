import { useEffect } from "react";
import { Task } from "@wych/react";
import { Seed } from "@/features/seed";
import { applyPreviewColors } from "../preview";

/**
 * Renders nothing. Whenever the generated colours resolve, applies them to the app's
 * own CSS variables so the UI previews the theme; restores the defaults on unmount.
 */
export const ThemePreview = () => {
  const { state } = Seed.useFeature();
  const colors = Task.isResolved(state.omarchyColors) ? state.omarchyColors.value : undefined;

  useEffect(() => {
    if (!colors) return;
    return applyPreviewColors(colors);
  }, [colors]);

  return null;
};
