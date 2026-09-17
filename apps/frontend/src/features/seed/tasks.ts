import { Task } from "@wych/react";
import { Schema, Effect } from "effect";
import { OmarchyTheme } from "../omarchy-theme";
import type { SeedState } from ".";

export const ApplyOmarchyTheme = Task("ApplyOmarchyTheme", {
  success: Schema.Void,
  onError: Task.errorMessage,
  run: (state: SeedState) =>
    Effect.gen(function* () {
      if (state.omarchyColors._tag !== "Resolved") return;
      if (!state.selectedImageUrl) return;

      const omarchyTheme = yield* OmarchyTheme;
      yield* omarchyTheme.clean();

      yield* Effect.all(
        [
          omarchyTheme.writeColorsToml(state.omarchyColors.value),
          omarchyTheme.writeBackgroundImage(state.selectedImageUrl),
          omarchyTheme.writeHyprlandLua(state.omarchyColors.value),
          omarchyTheme.writeShellBarToml(state.omarchyColors.value),
        ],
        { concurrency: "unbounded" },
      );

      yield* omarchyTheme.setTheme("omaterial-dev");
    }),
});
