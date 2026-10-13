import { describe, expect, it } from "@effect/vitest";
import { OmarchyPathsAt } from "@stef/omarchy";
import { MemoryFileSystem, OmarchyCliTest } from "@stef/omarchy/testing";
import { createPaletteFromHex } from "@stef/theme-engine";
import { Effect, Layer, Path } from "effect";
import { TestClock } from "effect/testing";
import { HttpClientTest, type Answer } from "@/testing/http";
import { OmarchyTheme } from ".";

const theme = "/home/.config/omarchy/themes/omaterial-dev";
const tokensJson = "/home/.config/omarchy/stef/tokens.json";

/**
 * OmarchyTheme over an in-memory $HOME (/home), a fake `omarchy` and a fake
 * HttpClient answering with `answers`.
 */
const setup = (
  files = new Map<string, string | Uint8Array>(),
  ...answers: ReadonlyArray<Answer>
) => {
  const fs = MemoryFileSystem(files);
  const omarchy = OmarchyCliTest();
  const http = HttpClientTest(...(answers.length ? answers : [{ status: 200 }]));
  const platform = Layer.provideMerge(
    OmarchyPathsAt("/home"),
    Layer.mergeAll(fs.layer, Path.layer),
  );
  const layer = OmarchyTheme.layer.pipe(
    Layer.provide(Layer.mergeAll(omarchy.layer, http.layer)),
    Layer.provide(platform),
  );
  return { layer, files, dirs: fs.dirs, calls: omarchy.calls, requests: http.requests };
};

const palette = createPaletteFromHex("#4285f4", {
  variant: "tonal-spot",
  mode: "dark",
  contrast: "standard",
});

describe("OmarchyTheme", () => {
  it.effect("clean empties the theme folder, keeping backgrounds/", () => {
    const { layer, files, dirs } = setup(
      new Map<string, string | Uint8Array>([
        [`${theme}/colors.toml`, "old"],
        [`${theme}/backgrounds/old.jpg`, "old"],
        ["/home/.config/omarchy/themes/other/colors.toml", "keep"],
      ]),
    );
    return Effect.gen(function* () {
      yield* (yield* OmarchyTheme).clean();
      expect([...files.keys()]).toEqual(["/home/.config/omarchy/themes/other/colors.toml"]);
      expect(dirs.has(`${theme}/backgrounds`)).toBe(true);
    }).pipe(Effect.provide(layer));
  });

  it.effect("writes the background with the extension of its content type", () => {
    const image = new Uint8Array([137, 80, 78, 71]);
    const { layer, files, requests } = setup(new Map(), {
      status: 200,
      bytes: image,
      contentType: "image/png; charset=binary",
    });
    return Effect.gen(function* () {
      yield* TestClock.setTime(42);
      yield* (yield* OmarchyTheme).writeBackgroundImage(new URL("https://example.com/w.png"));
      expect(requests[0]!.url).toBe("https://example.com/w.png");
      expect(files.get(`${theme}/backgrounds/background-42.png`)).toEqual(image);
    }).pipe(Effect.provide(layer));
  });

  it.effect("falls back to .jpg for an unknown content type", () => {
    const { layer, files } = setup(new Map(), {
      status: 200,
      bytes: new Uint8Array([1]),
      contentType: "application/octet-stream",
    });
    return Effect.gen(function* () {
      yield* (yield* OmarchyTheme).writeBackgroundImage(new URL("https://example.com/w"));
      expect([...files.keys()]).toEqual([`${theme}/backgrounds/background-0.jpg`]);
    }).pipe(Effect.provide(layer));
  });

  it.effect("fails with an OmarchyThemeError when the image can't be fetched", () => {
    const { layer, files } = setup(new Map(), { status: 404 });
    return Effect.gen(function* () {
      const error = yield* Effect.flip(
        (yield* OmarchyTheme).writeBackgroundImage(new URL("https://example.com/w.png")),
      );
      expect(error._tag).toBe("@stef/theme-engine/OmarchyThemeError");
      expect(files.size).toBe(0);
    }).pipe(Effect.provide(layer));
  });

  it.effect("writes every theme file, rendered with the tokens in tokens.json", () => {
    const { layer, files } = setup(
      new Map<string, string | Uint8Array>([
        [tokensJson, JSON.stringify({ version: 2, shape: { windowCorner: "extra-large" } })],
      ]),
    );
    return Effect.gen(function* () {
      yield* (yield* OmarchyTheme).writeTheme(palette);
      const written = [...files.keys()]
        .filter((f) => f.startsWith(`${theme}/`))
        .map((f) => f.slice(theme.length + 1));
      expect(written).toEqual(
        expect.arrayContaining(["colors.toml", "hyprland.lua", "omaterial.json", "shell.bar.toml"]),
      );
      expect(written.filter((f) => f.startsWith("shell."))).toHaveLength(13);
      expect(files.get(`${theme}/hyprland.lua`)).toContain("rounding = 28,");
    }).pipe(Effect.provide(layer));
  });

  it.effect("applies the theme with `omarchy theme set`", () => {
    const { layer, calls } = setup();
    return Effect.gen(function* () {
      yield* (yield* OmarchyTheme).setTheme();
      expect(calls).toEqual(["theme set omaterial-dev"]);
    }).pipe(Effect.provide(layer));
  });
});
