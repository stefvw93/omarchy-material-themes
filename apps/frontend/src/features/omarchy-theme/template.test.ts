import { describe, expect, it } from "@effect/vitest";
import {
  colorToShellHex,
  hexToRgb,
  mixColors,
  parseMixAmount,
  renderTemplate,
  resolveToken,
} from "./template";

// Expected values below were produced by the bash functions in
// /usr/bin/omarchy-theme-set-templates (mix_color, hypr_gradient_value,
// shell_gradient_value, gradient_start_value, hex_to_rgb) with this palette.
const palette = {
  background: "#1a1b26",
  foreground: "#c0caf5",
  accent: "#7aa2f7",
  red: "#f7768e",
  hyprland_active_border: "accent red 45deg",
  literal_border: "rgba(ff0000ee) #00ff00 -30deg",
  dec_border: "rgb(300,0,12,0.5)",
  hex_border: "0xaa112233",
  not_hex: "rgba(595959aa)",
} as const;

describe("hexToRgb", () => {
  it("converts 6-digit hex to decimal r,g,b", () => {
    expect(hexToRgb("#1a1b26")).toBe("26,27,38");
  });
});

describe("parseMixAmount", () => {
  it("accepts percentages, fractions and bare integers", () => {
    expect(parseMixAmount("34%")).toBeCloseTo(0.34);
    expect(parseMixAmount("0.3")).toBeCloseTo(0.3);
    expect(parseMixAmount("30")).toBeCloseTo(0.3);
  });

  it("clamps to [0, 1]", () => {
    expect(parseMixAmount("150%")).toBe(1);
    expect(parseMixAmount("0")).toBe(0);
  });
});

describe("mixColors", () => {
  it("matches Omarchy's per-channel blend", () => {
    expect(mixColors("#c0caf5", "#1a1b26", "34%")).toBe("#888faf");
    expect(mixColors("#1a1b26", "#c0caf5", "6%")).toBe("#242632");
    expect(mixColors("#1a1b26", "#f7768e", "15%")).toBe("#3b2936");
  });

  it("treats fractions and bare integers the same as percentages", () => {
    expect(mixColors("#1a1b26", "#c0caf5", "0.3")).toBe("#4c5064");
    expect(mixColors("#1a1b26", "#c0caf5", "30")).toBe("#4c5064");
    expect(mixColors("#1a1b26", "#c0caf5", 0.3)).toBe("#4c5064");
  });

  it("clamps out-of-range amounts to the endpoints", () => {
    expect(mixColors("#1a1b26", "#c0caf5", "150%")).toBe("#c0caf5");
    expect(mixColors("#1a1b26", "#c0caf5", "0")).toBe("#1a1b26");
  });
});

describe("colorToShellHex", () => {
  it("normalises every notation Hyprland accepts", () => {
    expect(colorToShellHex("#7aa2f7")).toBe("#7aa2f7");
    expect(colorToShellHex("#7aa2f7ee")).toBe("#7aa2f7");
    expect(colorToShellHex("rgba(ff0000ee)")).toBe("#ff0000");
    expect(colorToShellHex("rgb(300,0,12,0.5)")).toBe("#ff000c");
    expect(colorToShellHex("0xaa112233")).toBe("#112233");
  });

  it("passes unknown notations through", () => {
    expect(colorToShellHex("accent")).toBe("accent");
  });
});

describe("renderTemplate: plain tokens", () => {
  it("substitutes palette keys", () => {
    expect(renderTemplate('bg = "{{ background }}"', palette)).toBe('bg = "#1a1b26"');
  });

  it("replaces every occurrence, across lines", () => {
    const out = renderTemplate("{{ accent }}\n{{ accent }} {{ red }}", palette);
    expect(out).toBe("#7aa2f7\n#7aa2f7 #f7768e");
  });

  it("supports the _strip modifier", () => {
    expect(renderTemplate("{{ background_strip }}", palette)).toBe("1a1b26");
    expect(renderTemplate("{{ not_hex_strip }}", palette)).toBe("rgba(595959aa)");
  });

  it("supports the _rgb modifier for 6-digit hex only", () => {
    expect(renderTemplate("rgb({{ background_rgb }})", palette)).toBe("rgb(26,27,38)");
    expect(renderTemplate("{{ not_hex_rgb }}", palette)).toBe("{{ not_hex_rgb }}");
  });

  it("prefers a literal key over a modifier interpretation", () => {
    const out = renderTemplate("{{ foo_strip }}", { foo: "#111111", foo_strip: "custom" });
    expect(out).toBe("custom");
  });

  it("leaves unknown tokens verbatim", () => {
    expect(renderTemplate("{{ nope }} {{ nope_rgb }}", palette)).toBe("{{ nope }} {{ nope_rgb }}");
  });

  it("requires exactly one space on each side, like the sed pattern", () => {
    expect(renderTemplate("{{background}}", palette)).toBe("{{background}}");
    expect(renderTemplate("{{  background }}", palette)).toBe("{{  background }}");
    expect(renderTemplate("{{ background  }}", palette)).toBe("{{ background  }}");
    expect(renderTemplate("{{\tbackground\t}}", palette)).toBe("{{\tbackground\t}}");
  });

  it("does not interpret `$` sequences in values", () => {
    expect(renderTemplate("{{ v }}", { v: "$& $1 $$" })).toBe("$& $1 $$");
  });
});

describe("renderTemplate: mix", () => {
  it("blends two palette keys", () => {
    expect(renderTemplate("{{ mix foreground background 34% }}", palette)).toBe("#888faf");
  });

  it("supports mix_strip and mix_rgb", () => {
    expect(renderTemplate("{{ mix_strip foreground background 34% }}", palette)).toBe("888faf");
    expect(renderTemplate("{{ mix_rgb background foreground 6% }}", palette)).toBe("36,38,50");
  });

  it("leaves the token when either side is missing or not 6-digit hex", () => {
    expect(renderTemplate("{{ mix nope background 34% }}", palette)).toBe(
      "{{ mix nope background 34% }}",
    );
    expect(renderTemplate("{{ mix not_hex background 34% }}", palette)).toBe(
      "{{ mix not_hex background 34% }}",
    );
  });

  it("leaves the token when the amount is malformed", () => {
    expect(renderTemplate("{{ mix foreground background lots }}", palette)).toBe(
      "{{ mix foreground background lots }}",
    );
  });

  it("tolerates any whitespace, like the grep that locates function tokens", () => {
    expect(renderTemplate("{{mix foreground background 34%}}", palette)).toBe("#888faf");
    expect(renderTemplate("{{  mix   foreground\tbackground  34%  }}", palette)).toBe("#888faf");
  });
});

describe("renderTemplate: hypr_gradient", () => {
  it("emits a Lua table for multi-colour specs", () => {
    expect(renderTemplate("{{ hypr_gradient hyprland_active_border accent }}", palette)).toBe(
      '{ colors = { "#7aa2f7", "#f7768e" }, angle = 45 }',
    );
  });

  it("falls back to a palette key when the spec key is missing", () => {
    expect(renderTemplate("{{ hypr_gradient hyprland_inactive_border accent }}", palette)).toBe(
      '"#7aa2f7"',
    );
  });

  it("falls back to a literal when the fallback is not a palette key", () => {
    expect(
      renderTemplate("{{ hypr_gradient hyprland_inactive_border rgba(595959aa) }}", palette),
    ).toBe('"rgba(595959aa)"');
  });

  it("keeps literal colours and negative angles", () => {
    expect(renderTemplate("{{ hypr_gradient literal_border accent }}", palette)).toBe(
      '{ colors = { "rgba(ff0000ee)", "#00ff00" }, angle = -30 }',
    );
  });

  it("quotes the key itself when nothing resolves", () => {
    expect(renderTemplate("{{ hypr_gradient nope }}", palette)).toBe('"nope"');
  });

  it("tolerates any whitespace around the token", () => {
    expect(renderTemplate("{{hypr_gradient hyprland_inactive_border accent}}", palette)).toBe(
      '"#7aa2f7"',
    );
  });
});

describe("renderTemplate: shell_gradient", () => {
  it("joins resolved colours with the angle suffixed", () => {
    expect(renderTemplate("{{ shell_gradient hyprland_active_border accent }}", palette)).toBe(
      "#7aa2f7 #f7768e 45deg",
    );
  });

  it("falls back to a palette key", () => {
    expect(
      renderTemplate("{{ shell_gradient hyprland_inactive_border foreground }}", palette),
    ).toBe("#c0caf5");
  });

  it("keeps literal colours", () => {
    expect(renderTemplate("{{ shell_gradient literal_border accent }}", palette)).toBe(
      "rgba(ff0000ee) #00ff00 -30deg",
    );
  });
});

describe("renderTemplate: gradient_start", () => {
  it("returns the first colour normalised to #rrggbb", () => {
    expect(renderTemplate("{{ gradient_start hyprland_active_border accent }}", palette)).toBe(
      "#7aa2f7",
    );
    expect(renderTemplate("{{ gradient_start literal_border accent }}", palette)).toBe("#ff0000");
    expect(renderTemplate("{{ gradient_start dec_border accent }}", palette)).toBe("#ff000c");
    expect(renderTemplate("{{ gradient_start hex_border accent }}", palette)).toBe("#112233");
  });

  it("normalises a literal fallback", () => {
    expect(renderTemplate("{{ gradient_start nope rgba(595959aa) }}", palette)).toBe("#595959");
  });

  it("returns the key verbatim when nothing resolves", () => {
    expect(renderTemplate("{{ gradient_start nope }}", palette)).toBe("nope");
  });
});

describe("resolveToken", () => {
  it("takes the raw body between the braces", () => {
    expect(resolveToken(palette, " background ")).toBe("#1a1b26");
    expect(resolveToken(palette, "background")).toBeUndefined();
  });

  it("rejects empty and unknown function tokens", () => {
    expect(resolveToken(palette, "")).toBeUndefined();
    expect(resolveToken(palette, " ")).toBeUndefined();
    expect(resolveToken(palette, " frobnicate accent red ")).toBeUndefined();
    expect(resolveToken(palette, " mix ")).toBeUndefined();
  });
});

describe("renderTemplate: shipped templates", () => {
  it("renders the hyprland.lua template", () => {
    const tpl = [
      "local active_border_color = {{ hypr_gradient hyprland_active_border accent }}",
      "local inactive_border_color = {{ hypr_gradient hyprland_inactive_border rgba(595959aa) }}",
    ].join("\n");

    expect(renderTemplate(tpl, palette)).toBe(
      [
        'local active_border_color = { colors = { "#7aa2f7", "#f7768e" }, angle = 45 }',
        'local inactive_border_color = "rgba(595959aa)"',
      ].join("\n"),
    );
  });

  it("renders a shell.toml excerpt", () => {
    const tpl = [
      "[hyprland]",
      'active-border            = "{{ shell_gradient hyprland_active_border accent }}"',
      'active-border-foreground = "{{ shell_gradient hyprland_active_border foreground }}"',
      "",
      "[lock]",
      'background       = "{{ background }}"',
      'placeholder      = "{{ mix foreground background 34% }}"',
      'text-error       = "{{ red }}"',
    ].join("\n");

    expect(renderTemplate(tpl, palette)).toBe(
      [
        "[hyprland]",
        'active-border            = "#7aa2f7 #f7768e 45deg"',
        'active-border-foreground = "#7aa2f7 #f7768e 45deg"',
        "",
        "[lock]",
        'background       = "#1a1b26"',
        'placeholder      = "#888faf"',
        'text-error       = "#f7768e"',
      ].join("\n"),
    );
  });
});
