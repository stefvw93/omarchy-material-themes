import { describe, expect, it } from "vite-plus/test";
import { inlineSuperArrows } from "./qml-compat.ts";

describe("inlineSuperArrows", () => {
  it("inlines the class-field super arrow at its call site", () => {
    const code = [
      "class E extends Base {",
      "\tconstructor(issue) {",
      "\t\tvar _super = (..._args) => (super(..._args), _defineProperty(this, K, K), this);",
      "\t\ttry {",
      '\t\t\t_super({ issue, note: "a)b" });',
      "\t\t} finally {}",
      "\t}",
      "}",
    ].join("\n");
    const out = inlineSuperArrows(code);
    expect(out).not.toContain("_super");
    expect(out).toContain('(super({ issue, note: "a)b" }), _defineProperty(this, K, K), this);');
  });

  it("evaluates to the same instance as the original in Node", () => {
    const code = `
      class Base { constructor(o) { this.o = o } }
      class E extends Base {
        constructor(x) {
          var _super = (..._args) => (super(..._args), this.f = 1, this);
          try { _super({ x }); } finally {}
        }
      }
      return new E(3);`;
    // oxlint-disable-next-line typescript/no-implied-eval -- runs the fixture code to compare behaviour
    const run = (src: string) => new Function(src)() as { o: { x: number }; f: number };
    expect(run(inlineSuperArrows(code))).toEqual(run(code));
  });

  it("leaves code without super arrows untouched", () => {
    const code = "const a = (x) => x + 1;\n";
    expect(inlineSuperArrows(code)).toBe(code);
  });
});
