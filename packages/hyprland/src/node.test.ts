import { describe, expect, it } from "@effect/vitest";
import { ConfigProvider, Effect } from "effect";
import { socketPath } from "./node.ts";

const env = (vars: Record<string, string>) =>
  ConfigProvider.layer(ConfigProvider.fromEnv({ env: vars }));

describe("socketPath", () => {
  it.effect("is under the runtime dir, per Hyprland instance", () =>
    Effect.gen(function* () {
      expect(yield* socketPath(".socket2.sock")).toBe("/run/user/1000/hypr/abc_123/.socket2.sock");
    }).pipe(
      Effect.provide(
        env({ XDG_RUNTIME_DIR: "/run/user/1000", HYPRLAND_INSTANCE_SIGNATURE: "abc_123" }),
      ),
    ),
  );

  it.effect("fails with a HyprlandError outside Hyprland", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(socketPath(".socket.sock"));
      expect(error._tag).toBe("@stef/hyprland/HyprlandError");
      expect(error.message).toContain("not inside Hyprland");
    }).pipe(Effect.provide(env({ XDG_RUNTIME_DIR: "/run/user/1000" }))),
  );
});
