import { Task } from "@wych/react";
import { Schema, Effect } from "effect";
import { OmarchyTheme } from "../omarchy-theme";
import type { OmarchyColors } from "../material/colors";

export const ApplyOmarchyTheme = Task("ApplyOmarchyTheme", {
  success: Schema.Void,
  run: ({ imageUrl, colors }: { readonly imageUrl: URL; readonly colors: OmarchyColors }) =>
    Effect.gen(function* () {
      const omarchyTheme = yield* OmarchyTheme;
      yield* omarchyTheme.clean();

      yield* Effect.all(
        [
          omarchyTheme.writeBackgroundImage(imageUrl),
          omarchyTheme.writeColorsToml(colors),
          omarchyTheme.writeHyprlandLua(colors),
          omarchyTheme.writeShellBarToml(colors),
          omarchyTheme.writeShellControlsToml(colors),
          omarchyTheme.writeShellFontToml(colors),
          omarchyTheme.writeShellHyprlandToml(colors),
          omarchyTheme.writeShellImagePickerToml(colors),
          omarchyTheme.writeShellLauncherToml(colors),
          omarchyTheme.writeShellLockToml(colors),
          omarchyTheme.writeShellMenuToml(colors),
          omarchyTheme.writeShellNotificationsToml(colors),
          omarchyTheme.writeShellPolkitToml(colors),
          omarchyTheme.writeShellPopupsToml(colors),
          omarchyTheme.writeShellSpacingToml(colors),
          omarchyTheme.writeShellTooltipsToml(colors),
        ],
        { concurrency: "unbounded" },
      );

      yield* omarchyTheme.setTheme("omaterial-dev");
    }),
});
