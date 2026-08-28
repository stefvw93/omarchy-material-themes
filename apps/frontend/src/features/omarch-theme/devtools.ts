import { Context, Effect, FileSystem, Layer } from "effect";

export class OmarchyThemeDevtools extends Context.Service<OmarchyThemeDevtools, {}>()(
  "frontend/features/omarchy-theme/OmarchyThemeDevtools",
) {
  static readonly layer = Layer.effect(
    this,
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      console.log({ fs });
      return {};
    }),
  );
}
