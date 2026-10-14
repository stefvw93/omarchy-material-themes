import { describe, expect, it } from "vite-plus/test";
import { cn } from "./utils";

describe("cn", () => {
  it("lets a later size-* or h-* replace h-text-*", () => {
    expect(cn("h-text-8 px-2", "size-full")).toBe("px-2 size-full");
    expect(cn("h-text-8", "h-auto")).toBe("h-auto");
  });

  it("keeps h-text-* when nothing overrides the height", () => {
    expect(cn("h-text-8", "w-full")).toBe("h-text-8 w-full");
    expect(cn("h-8", "h-text-7")).toBe("h-text-7");
  });
});
