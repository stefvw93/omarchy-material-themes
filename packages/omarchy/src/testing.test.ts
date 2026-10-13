import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem } from "effect";
import { MemoryFileSystem } from "./testing.ts";

describe("MemoryFileSystem", () => {
  it.effect("reads back text and bytes, either way", () => {
    const { layer } = MemoryFileSystem();
    return Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.writeFileString("/a.txt", "hé");
      yield* fs.writeFile("/b.bin", new Uint8Array([104, 105]));
      expect(new TextDecoder().decode(yield* fs.readFile("/a.txt"))).toBe("hé");
      expect(yield* fs.readFileString("/b.bin")).toBe("hi");
    }).pipe(Effect.provide(layer));
  });

  it.effect("fails reading a missing file with NotFound", () => {
    const { layer } = MemoryFileSystem();
    return Effect.gen(function* () {
      const error = yield* Effect.flip((yield* FileSystem.FileSystem).readFileString("/nope"));
      expect(error.reason._tag).toBe("NotFound");
    }).pipe(Effect.provide(layer));
  });

  it.effect("has directories that were made or hold files", () => {
    const { layer } = MemoryFileSystem(new Map([["/t/x/a.toml", ""]]));
    return Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.makeDirectory("/t/empty", { recursive: true });
      expect(yield* fs.exists("/t/x")).toBe(true);
      expect(yield* fs.exists("/t/empty")).toBe(true);
      expect(yield* fs.exists("/t/y")).toBe(false);
      expect(yield* fs.readDirectory("/t")).toEqual(["empty", "x"]);
    }).pipe(Effect.provide(layer));
  });

  it.effect("removes a directory with everything under it, and nothing else", () => {
    const { layer, files } = MemoryFileSystem(
      new Map([
        ["/t/x/a", "1"],
        ["/t/x/b/c", "2"],
        ["/t/xy", "3"],
      ]),
    );
    return Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      yield* fs.remove("/t/x", { recursive: true });
      expect([...files.keys()]).toEqual(["/t/xy"]);
      expect((yield* Effect.flip(fs.remove("/t/x"))).reason._tag).toBe("NotFound");
      yield* fs.remove("/t/x", { force: true });
    }).pipe(Effect.provide(layer));
  });

  it.effect("fails any call it doesn't implement", () => {
    const { layer } = MemoryFileSystem();
    return Effect.gen(function* () {
      const exit = yield* Effect.exit((yield* FileSystem.FileSystem).rename("/a", "/b"));
      expect(exit._tag).toBe("Failure");
    }).pipe(Effect.provide(layer));
  });
});
