import { Task } from "@wych/react";
import { Schema, Effect } from "effect";
import { OmarchyTheme } from "../omarchy-theme";
import type { SeedState } from ".";

export const ApplyOmarchyColors = Task("ApplyOmarchyColors", {
  success: Schema.Void,
  onError: (cause) => {
    console.log({ cause });
    return Task.message(cause);
  },
  run: (state: SeedState) =>
    Effect.gen(function* () {
      if (state.omarchyColors._tag !== "Resolved") return;
      if (!state.selectedImageUrl) return;

      const omarchyTheme = yield* OmarchyTheme;
      yield* omarchyTheme.clean();

      yield* Effect.all(
        [
          omarchyTheme.writeColors(state.omarchyColors.value),
          omarchyTheme.writeBackgroundImage(state.selectedImageUrl),
          omarchyTheme.writeHyprlandLua(),
          omarchyTheme.writeShell(),
        ],
        { concurrency: "unbounded" },
      );

      yield* omarchyTheme.setTheme("omaterial-dev");
    }),
});
