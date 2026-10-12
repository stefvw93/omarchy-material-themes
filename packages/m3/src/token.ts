import type { Context, Resolved, Token } from "./types.ts";

/** Light, standard contrast, standard motion, fixed-weight fonts. */
export const defaultContext: Context = {
  theme: "light",
  contrast: "standard",
  motionScheme: "standard",
  font: "static",
};

/** One generated token's value in `ctx`. No token tables imported: safe for small bundles. */
export const resolveToken = (token: Token, ctx: Context = defaultContext): Resolved => {
  if (!("by" in token)) return token;
  const key = token.by.map((d) => ctx[d]).join("|");
  const r = token.cases[key];
  if (!r) throw new Error(`no case ${key}`);
  return r;
};
