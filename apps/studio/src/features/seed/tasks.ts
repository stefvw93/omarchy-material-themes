import { Task } from "@wych/react";
import { Schema, Effect } from "effect";
import { OmarchyTheme } from "../omarchy-theme";
import type { ThemePalette } from "@stef/theme-engine";

export const ApplyOmarchyTheme = Task("ApplyOmarchyTheme", {
  success: Schema.Void,
  run: ({ imageUrl, palette }: { readonly imageUrl: URL; readonly palette: ThemePalette }) =>
    Effect.gen(function* () {
      const omarchyTheme = yield* OmarchyTheme;
      yield* omarchyTheme.clean();

      yield* Effect.all(
        [omarchyTheme.writeBackgroundImage(imageUrl), omarchyTheme.writeTheme(palette)],
        { concurrency: "unbounded" },
      );

      yield* omarchyTheme.setTheme();
    }),
});
