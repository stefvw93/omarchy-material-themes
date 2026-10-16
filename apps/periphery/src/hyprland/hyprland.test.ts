import { describe, expect, it } from "vite-plus/test";
import {
  cardTravel,
  flightBatch,
  ghostBlur,
  hookStateLua,
  parseBlur,
  parseDecoration,
  parseTabs,
  parseWindowProps,
  restoreFloatingBatch,
  runSwitchLua,
  windowPropsBatch,
  workspaceAnimationLua,
  workspacesOffLua,
} from "./hyprland.ts";

// Shapes as `hyprctl animations -j` prints them (Hyprland 0.56).
const workspaces = (fields: Record<string, unknown>) => ({
  name: "workspaces",
  overridden: true,
  bezier: "spring:omaterial_spatial_default",
  enabled: true,
  speed: 3,
  style: "slide",
  ...fields,
});
const nested = (...animations: object[]) =>
  JSON.stringify([
    [
      { name: "global", overridden: true, bezier: "default", enabled: true, speed: 10, style: "" },
      ...animations,
    ],
    [{ name: "quick", X0: 0.15, Y0: 0, X1: 0.1, Y1: 1 }],
  ]);

describe("workspaceAnimationLua", () => {
  it("rebuilds a spring animation with its own style", () => {
    expect(workspaceAnimationLua(nested(workspaces({})))).toBe(
      'hl.animation({ leaf = "workspaces", enabled = true, speed = 3, spring = "omaterial_spatial_default", style = "slide" })',
    );
  });

  it("rebuilds a bezier animation", () => {
    expect(workspaceAnimationLua(nested(workspaces({ bezier: "easeOutQuint", speed: 6 })))).toBe(
      'hl.animation({ leaf = "workspaces", enabled = true, speed = 6, bezier = "easeOutQuint", style = "slide" })',
    );
  });

  it("puts the given style in place of the animation's own", () => {
    expect(workspaceAnimationLua(nested(workspaces({})), "slidefade 10%")).toBe(
      'hl.animation({ leaf = "workspaces", enabled = true, speed = 3, spring = "omaterial_spatial_default", style = "slidefade 10%" })',
    );
  });

  it("leaves out an empty curve and a missing style", () => {
    expect(workspaceAnimationLua(nested(workspaces({ bezier: "", style: "" })))).toBe(
      'hl.animation({ leaf = "workspaces", enabled = true, speed = 3 })',
    );
  });

  it("turns a disabled animation off, unless a style is given", () => {
    expect(workspaceAnimationLua(nested(workspaces({ enabled: false })))).toBe(workspacesOffLua);
    expect(workspaceAnimationLua(nested(workspaces({ enabled: false })), "fade")).toContain(
      'style = "fade"',
    );
  });

  it("reads a flat list too", () => {
    expect(workspaceAnimationLua(JSON.stringify([workspaces({})]))).toContain(
      'leaf = "workspaces"',
    );
  });

  it("returns an empty string without a workspaces animation", () => {
    expect(workspaceAnimationLua(nested())).toBe("");
  });

  it("throws on output that is not JSON", () => {
    expect(() => workspaceAnimationLua("not json")).toThrow();
  });

  it("has the off call", () => {
    expect(workspacesOffLua).toBe('hl.animation({ leaf = "workspaces", enabled = false })');
  });
});

describe("cardTravel", () => {
  it.each([
    { style: "slidefade 10%", distance: 256, vertical: false },
    { style: "slide", distance: 2560, vertical: false },
    { style: "slidevert", distance: 1440, vertical: true },
    { style: "slidefadevert 20%", distance: 288, vertical: true },
    { style: "slidefade 12.5%", distance: 320, vertical: false },
    { style: "fade", distance: 0, vertical: false },
  ])("$style → $distance px", ({ style, distance, vertical }) => {
    expect(cardTravel(style, 2560, 1440)).toEqual({ distance, vertical });
  });
});

describe("hookStateLua", () => {
  const on = {
    opened: true,
    cardsLeft: true,
    cardsRight: false,
    monX: 0,
    monY: 0,
    monW: 2560,
    monH: 1440,
    sideW: 380,
    selected: "",
  };

  it("closes the hook's state when the mode is off", () => {
    expect(hookStateLua({ ...on, opened: false })).toBe(
      "if periphery_close then periphery_close() end",
    );
  });

  const rule = (workspace: string, t: number, r: number, b: number, l: number) =>
    `{ workspace = "${workspace}", gaps_out = { top = ${t}, right = ${r}, bottom = ${b}, left = ${l} } }`;

  it("opens it with the bands, the focus area and its rule, nothing selected", () => {
    expect(hookStateLua(on)).toBe(
      `if periphery_open then periphery_open(true, false, 380, 2180, 0, 1440, ${rule("s[false]", 0, 380, 0, 380)}, nil); periphery_select(nil) end`,
    );
  });

  it("passes the selected address and the monitor's offset", () => {
    expect(hookStateLua({ ...on, monX: 2560, monY: 100.4, selected: "0x56c7bf423bd0" })).toBe(
      `if periphery_open then periphery_open(true, false, 2940, 4740, 100, 1540, ${rule("s[false]", 0, 380, 0, 380)}, nil); periphery_select("0x56c7bf423bd0") end`,
    );
  });

  it("gives the monitor's regular workspaces the outer gaps plus the bands", () => {
    expect(hookStateLua({ ...on, monitor: "DP-3", gapsOut: [8, 6, 4, 2] })).toContain(
      `, ${rule("s[false] m[DP-3]", 8, 386, 4, 382)}, "DP-3");`,
    );
    expect(
      hookStateLua({ ...on, monitor: "HDMI-A-1", gapsOut: [8.4, 8, 8, 8], sideW: 379.6 }),
    ).toContain(rule("s[false] m[HDMI-A-1]", 8, 388, 8, 388));
  });

  it("has no rule without bands", () => {
    expect(hookStateLua({ ...on, sideW: 0, monitor: "DP-3" })).toContain(
      'periphery_open(true, false, 0, 2560, 0, 1440, nil, "DP-3");',
    );
  });

  it("never lets anything but a monitor name into the rule", () => {
    const lua = hookStateLua({ ...on, monitor: 'DP-3"] } os.execute("x") --' });
    expect(lua).toContain(rule("s[false]", 0, 380, 0, 380));
    expect(lua).not.toContain("os.execute");
    expect(lua).toContain(", nil); periphery_select");
  });

  it("never lets anything but an address into the Lua", () => {
    expect(hookStateLua({ ...on, selected: '0x1") os.execute("rm -rf /' })).toContain(
      "periphery_select(nil)",
    );
    expect(hookStateLua({ ...on, selected: "56c7bf423bd0" })).toContain("periphery_select(nil)");
  });
});

describe("parseDecoration", () => {
  it("reads the border width and rounding", () => {
    const text =
      '{"option": "general:border_size", "int": 1, "set": true }\n{"option": "decoration:rounding", "int": 8, "set": true }\n';
    expect(parseDecoration(text)).toEqual({ borderSize: 1, rounding: 8 });
  });

  it("leaves out what it can't find", () => {
    expect(parseDecoration('{"option": "general:border_size", "int": 2, "set": true }')).toEqual({
      borderSize: 2,
    });
    expect(parseDecoration("")).toEqual({});
  });

  const gaps = (css: string) => `{"option": "general:gaps_out", "css": "${css}", "set": true }`;

  it("reads the outer gaps as CSS shorthand", () => {
    expect(parseDecoration(gaps("8 6 4 2")).gapsOut).toEqual([8, 6, 4, 2]);
    expect(parseDecoration(gaps("5")).gapsOut).toEqual([5, 5, 5, 5]);
    expect(parseDecoration(gaps("4 10")).gapsOut).toEqual([4, 10, 4, 10]);
    expect(parseDecoration(gaps("1 2 3")).gapsOut).toEqual([1, 2, 3, 2]);
  });

  it("leaves out outer gaps it can't read", () => {
    expect(parseDecoration(gaps("a b")).gapsOut).toBeUndefined();
    expect(parseDecoration(gaps("1 2 3 4 5")).gapsOut).toBeUndefined();
    expect(parseDecoration(gaps("")).gapsOut).toBeUndefined();
  });
});

// As `hyprctl -j getoption` prints them, one after the other.
const option = (name: string, type: string, value: string | number | boolean) =>
  `{"option": "decoration:blur:${name}", "${type}": ${value}, "set": true }`;
const blurOptions = [
  option("enabled", "bool", true),
  option("size", "int", 6),
  option("passes", "int", 3),
  option("contrast", "float", "0.891600"),
  option("brightness", "float", "1.000000"),
  option("vibrancy", "float", "0.169600"),
].join("\n");

describe("parseBlur", () => {
  it("reads every blur option", () => {
    expect(parseBlur(blurOptions)).toEqual({
      enabled: true,
      size: 6,
      passes: 3,
      contrast: 0.8916,
      brightness: 1,
      vibrancy: 0.1696,
    });
  });

  it("reads blur off", () => {
    expect(parseBlur(option("enabled", "bool", false)).enabled).toBe(false);
  });

  it("leaves missing options out", () => {
    expect(parseBlur(option("size", "int", 8))).toEqual({ size: 8 });
    expect(parseBlur("")).toEqual({});
  });
});

describe("ghostBlur", () => {
  it("reaches size × 2^passes", () => {
    const blur = ghostBlur({ enabled: true, size: 6, passes: 3 });
    expect(blur.radius).toBe(48);
    expect(blur.blurMax).toBe(64);
    expect(blur.blur).toBeCloseTo(0.75);
    expect(blur.blurMultiplier).toBe(0);
  });

  it("stretches past blurMax with the multiplier", () => {
    const blur = ghostBlur({ enabled: true, size: 8, passes: 4 });
    expect(blur.radius).toBe(128);
    expect(blur.blur).toBe(1);
    expect(blur.blurMultiplier).toBe(1);
    expect(blur.blurMax * blur.blur * (1 + blur.blurMultiplier)).toBe(128);
  });

  it("maps contrast, brightness and vibrancy", () => {
    const blur = ghostBlur({
      enabled: true,
      size: 6,
      passes: 3,
      contrast: 0.8916,
      brightness: 1.2,
      vibrancy: 0.1696,
    });
    expect(blur.contrast).toBeCloseTo(-0.1084);
    expect(blur.brightness).toBeCloseTo(0.2);
    expect(blur.saturation).toBeCloseTo(0.1696);
  });

  it("has no radius when blur is off or size or passes is missing", () => {
    expect(ghostBlur({ enabled: false, size: 6, passes: 3 }).radius).toBe(0);
    expect(ghostBlur({ enabled: true, passes: 3 }).radius).toBe(0);
    expect(ghostBlur({ enabled: true, size: 6 }).radius).toBe(0);
    expect(ghostBlur({ enabled: true, size: 6 }).blur).toBe(0);
  });

  it("changes nothing for missing colour options", () => {
    const blur = ghostBlur({ enabled: true, size: 6, passes: 3 });
    expect([blur.contrast, blur.brightness, blur.saturation]).toEqual([0, 0, 0]);
  });
});

describe("windowPropsBatch", () => {
  it("asks for the four properties of each window, in order", () => {
    expect(windowPropsBatch(["0xa1"])).toBe(
      "j/getprop address:0xa1 opacity ; j/getprop address:0xa1 opacity_inactive ; " +
        "j/getprop address:0xa1 border_size ; j/getprop address:0xa1 rounding",
    );
  });

  it("skips anything but an address", () => {
    expect(windowPropsBatch(["0xa1; dispatch exit", "0xb2"])).toBe(windowPropsBatch(["0xb2"]));
    expect(windowPropsBatch([])).toBe("");
  });
});

describe("parseWindowProps", () => {
  // As `hyprctl --batch` prints it: one block per query, blank lines between.
  const out = (...blocks: string[]) => blocks.join("\n\n\n") + "\n";
  const props = (o: number, oi: number, b: number, r: number) => [
    `{"opacity": ${o}}`,
    `{"opacity_inactive": ${oi}}`,
    `{"border_size": ${b}}`,
    `{"rounding": ${r}}`,
  ];

  it("maps each window to its properties", () => {
    expect(
      parseWindowProps(["0xa1", "0xb2"], out(...props(0.985, 0.96, 3, 12), ...props(1, 1, 0, 0))),
    ).toEqual({
      "0xa1": { opacity: 0.985, opacityInactive: 0.96, borderSize: 3, rounding: 12 },
      "0xb2": { opacity: 1, opacityInactive: 1, borderSize: 0, rounding: 0 },
    });
  });

  it("leaves out a window that closed meanwhile, and keeps the rest in step", () => {
    const gone = ["window not found", "window not found", "window not found", "window not found"];
    expect(parseWindowProps(["0xa1", "0xb2"], out(...gone, ...props(1, 0.9, 2, 8)))).toEqual({
      "0xb2": { opacity: 1, opacityInactive: 0.9, borderSize: 2, rounding: 8 },
    });
  });

  it("leaves out a window with a property missing", () => {
    const [o, oi, b] = props(1, 1, 1, 1);
    expect(parseWindowProps(["0xa1"], out(o!, oi!, b!, "window not found"))).toEqual({});
  });

  it("skips the same non-addresses as the batch", () => {
    expect(parseWindowProps(["bad", "0xb2"], out(...props(1, 1, 1, 1)))).toEqual({
      "0xb2": { opacity: 1, opacityInactive: 1, borderSize: 1, rounding: 1 },
    });
  });
});

describe("flightBatch", () => {
  const shadow = (a: string, v: string) =>
    `dispatch hl.dsp.window.set_prop({ window = "address:${a}", prop = "no_shadow", value = "${v}" })`;
  const tag = (a: string, t: string) =>
    `dispatch hl.dsp.window.tag({ window = "address:${a}", tag = "${t}" })`;

  it("hides the floating windows, turns the workspace animation off, then focuses the window", () => {
    expect(flightBatch(["0xa1", "0xb2"], { window: "0xc3" })).toBe(
      [
        shadow("0xa1", "1"),
        tag("0xa1", "+periphery-hide"),
        shadow("0xb2", "1"),
        tag("0xb2", "+periphery-hide"),
        "eval " + workspacesOffLua,
        'dispatch hl.dsp.focus({ window = "address:0xc3" })',
      ].join(" ; "),
    );
  });

  it("runs a routed switch", () => {
    expect(flightBatch([], { token: 7 })).toBe(
      "eval " + workspacesOffLua + " ; eval if periphery_run then periphery_run(7) end",
    );
  });

  it("lets nothing but addresses through", () => {
    expect(flightBatch(['0xa1" }) ; dispatch exit', "0xb2"], { window: "nope" })).toBe(
      [shadow("0xb2", "1"), tag("0xb2", "+periphery-hide"), "eval " + workspacesOffLua].join(" ; "),
    );
  });

  it("has no switch for a token that isn't a whole number from 1", () => {
    expect(flightBatch([], { token: 0 })).toBe("eval " + workspacesOffLua);
    expect(flightBatch([], { token: 1.5 })).toBe("eval " + workspacesOffLua);
  });

  it("gives the floating windows their shadow back as unset, and shows them again", () => {
    expect(restoreFloatingBatch(["0xa1", "x"])).toBe(
      [shadow("0xa1", "unset"), tag("0xa1", "-periphery-hide")].join(" ; "),
    );
    expect(restoreFloatingBatch([])).toBe("");
  });
});

describe("runSwitchLua", () => {
  it("runs a token", () => {
    expect(runSwitchLua("7")).toBe("if periphery_run then periphery_run(7) end");
  });

  it("is empty for anything but a whole number from 1", () => {
    for (const bad of ["0", "-1", "1.5", "7 end; os.exit()", "", "x", "1e3"])
      expect(runSwitchLua(bad)).toBe("");
  });
});

describe("parseTabs", () => {
  it("is the set of addresses, lower-case", () => {
    expect([...parseTabs("0xA1 0xb2")]).toEqual(["0xa1", "0xb2"]);
  });

  it("drops anything but addresses", () => {
    expect([...parseTabs(" 0xa1  nope 0x 0xb2\n")]).toEqual(["0xa1", "0xb2"]);
    expect(parseTabs("").size).toBe(0);
  });
});
