import { describe, expect, it } from "vite-plus/test";
import { canSubmit, initialOf } from "./view.ts";

describe("initialOf", () => {
  it("upper-cases the first letter", () => {
    expect(initialOf("stef")).toBe("S");
  });
  it("skips leading punctuation", () => {
    expect(initialOf("_.stef")).toBe("S");
  });
  it("keeps a leading digit", () => {
    expect(initialOf("7ef")).toBe("7");
  });
  it("handles non-latin letters", () => {
    expect(initialOf("émile")).toBe("É");
  });
  it("is empty without a letter or digit", () => {
    expect(initialOf("")).toBe("");
    expect(initialOf("._-")).toBe("");
  });
});

describe("canSubmit", () => {
  const ready = { inputEnabled: true, passwordLength: 3, authenticating: false };
  it("submits a typed password", () => {
    expect(canSubmit(ready)).toBe(true);
  });
  it("not while the field is empty", () => {
    expect(canSubmit({ ...ready, passwordLength: 0 })).toBe(false);
  });
  it("not while input is disabled", () => {
    expect(canSubmit({ ...ready, inputEnabled: false })).toBe(false);
  });
  it("not while a check is running", () => {
    expect(canSubmit({ ...ready, authenticating: true })).toBe(false);
  });
});
