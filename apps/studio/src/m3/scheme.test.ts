import { describe, expect, it } from "vite-plus/test";
import { omarchyColorsOf } from "./scheme";

describe("omarchyColorsOf", () => {
  it("reads Omarchy's named keys", () => {
    const toml = [
      'accent = "#89b4fa"',
      'background = "#1e1e2e"',
      'foreground = "#cdd6f4"',
      'muted = "#6c7086"',
      'red = "#f38ba8"',
    ].join("\n");
    expect(omarchyColorsOf(toml)).toEqual({
      background: "#1e1e2e",
      foreground: "#cdd6f4",
      accent: "#89b4fa",
      muted: "#6c7086",
      urgent: "#f38ba8",
    });
  });

  it("falls back to the terminal colours, as Color.qml does", () => {
    const toml = [
      'color0 = "#000000"',
      'color1 = "#ff0000"',
      'color4 = "#0000ff"',
      'color7 = "#eeeeee"',
      'color8 = "#888888"',
    ].join("\n");
    expect(omarchyColorsOf(toml)).toEqual({
      background: "#000000",
      foreground: "#eeeeee",
      accent: "#0000ff",
      muted: "#888888",
      urgent: "#ff0000",
    });
  });

  it("falls back to the foreground for accent and muted, and to Omarchy's defaults", () => {
    expect(omarchyColorsOf('foreground = "#cdd6f4"')).toEqual({
      background: "#101315",
      foreground: "#cdd6f4",
      accent: "#cdd6f4",
      muted: "#cdd6f4",
      urgent: "#a55555",
    });
  });

  it("tolerates indentation and comments, and keeps only the six hex digits", () => {
    const toml = '  accent   =   "#89B4FAff" # the accent\n# background = "#ffffff"';
    expect(omarchyColorsOf(toml).accent).toBe("#89B4FA");
    expect(omarchyColorsOf(toml).background).toBe("#101315");
  });
});
