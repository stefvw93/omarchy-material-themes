/**
 * Build-time workarounds for Quickshell's QML (V4) engine. Node-side only:
 * used from vite.config.ts, never bundled into QML.
 */

/**
 * Lowering class fields to es2017 wraps a nested `super(...)` in an arrow:
 *
 *   var _super = (..._args) => (super(..._args), _defineProperty(this, K, V), this);
 *   try { _super({ issue }); } finally { ... }
 *
 * V4 throws "super() already called" for *any* `super()` inside an arrow, but
 * accepts `super()` directly inside `try`. So each call site is inlined back
 * into the constructor:
 *
 *   try { (super({ issue }), _defineProperty(this, K, V), this); } finally { ... }
 */
const SUPER_ARROW =
  /var (_super[\w$]*) = \(\.\.\._args\) => \(super\(\.\.\._args\), (.*), this\);\n/g;

export const inlineSuperArrows = (code: string): string => {
  let out = code;
  for (const match of code.matchAll(SUPER_ARROW)) {
    const [declaration, name, body] = match as unknown as [string, string, string];
    out = out.replace(declaration, "");
    out = replaceCalls(out, name, (args) => `(super(${args}), ${body}, this)`);
  }
  if (/=>\s*\(?\s*super\(/.test(out)) {
    throw new Error("qml-compat: a super() call inside an arrow function survived; V4 rejects it");
  }
  return out;
};

/** Replaces every `name(args)` call, matching parentheses and skipping strings. */
const replaceCalls = (code: string, name: string, render: (args: string) => string): string => {
  const pattern = new RegExp(`(?<![\\w$.])${name.replace(/\$/g, "\\$")}\\(`, "g");
  let result = "";
  let last = 0;
  for (let m = pattern.exec(code); m !== null; m = pattern.exec(code)) {
    const open = m.index + m[0].length - 1;
    const close = matchingParen(code, open);
    result += code.slice(last, m.index) + render(code.slice(open + 1, close));
    last = close + 1;
    pattern.lastIndex = last;
  }
  return result + code.slice(last);
};

const matchingParen = (code: string, open: number): number => {
  let depth = 0;
  let quote: string | undefined;
  for (let i = open; i < code.length; i++) {
    const c = code[i];
    if (quote !== undefined) {
      if (c === "\\") i++;
      else if (c === quote) quote = undefined;
    } else if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "(") depth++;
    else if (c === ")" && --depth === 0) return i;
  }
  throw new Error("qml-compat: unbalanced parentheses after super arrow call");
};

/** Rolldown plugin applying the V4 workarounds to every output chunk. */
export const qmlCompat = () => ({
  name: "qml-compat",
  renderChunk: (code: string) => ({ code: inlineSuperArrows(code), map: null }),
});
