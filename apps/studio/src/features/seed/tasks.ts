import { Task } from "@wych/react";
import { Schema, Effect } from "effect";
import { OmarchyTheme } from "../omarchy-theme";
import type { OmarchyColors } from "@stef/theme-engine";

export const ApplyOmarchyTheme = Task("ApplyOmarchyTheme", {
  success: Schema.Void,
  run: ({ imageUrl, colors }: { readonly imageUrl: URL; readonly colors: OmarchyColors }) =>
    Effect.gen(function* () {
      const omarchyTheme = yield* OmarchyTheme;
      yield* omarchyTheme.clean();

      yield* Effect.all(
        [omarchyTheme.writeBackgroundImage(imageUrl), omarchyTheme.writeTheme(colors)],
        { concurrency: "unbounded" },
      );

      yield* omarchyTheme.setTheme();
    }),
});
