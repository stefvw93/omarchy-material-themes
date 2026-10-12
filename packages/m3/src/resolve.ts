import type { ColorRole } from "./generated/color-roles.ts";
import { type CompTokenName, compTokens } from "./generated/comp.ts";
import { type SysTokenName, sysTokens } from "./generated/sys.ts";
import { defaultContext, resolveToken } from "./token.ts";
import type { Context, Resolved, Shape, Token, TokenValue, Typography } from "./types.ts";

export type TokenName = SysTokenName | CompTokenName;

export { defaultContext };

const lookup = (name: string): Token | undefined =>
  (sysTokens as Readonly<Record<string, Token>>)[name] ??
  (compTokens as Readonly<Record<string, Token>>)[name];

export const isToken = (name: string): name is TokenName => lookup(name) !== undefined;

/** The token's value in `ctx`. */
export const resolve = (name: TokenName, ctx: Context = defaultContext): Resolved => {
  const token = lookup(name);
  if (!token) throw new Error(`unknown token ${name}`);
  return resolveToken(token, ctx);
};

export const valueOf = (name: TokenName, ctx: Context = defaultContext): TokenValue => {
  const { value } = resolve(name, ctx);
  if (value === undefined) throw new Error(`${name} is a colour role reference, not a value`);
  return value;
};

/** A length or plain number. Fails for percentages, shapes and composites. */
export const numberOf = (name: TokenName, ctx: Context = defaultContext): number => {
  const v = valueOf(name, ctx);
  if (typeof v !== "number") throw new Error(`${name} is not a number: ${JSON.stringify(v)}`);
  return v;
};

export const shapeOf = (name: TokenName, ctx: Context = defaultContext): Shape => {
  const v = valueOf(name, ctx);
  if (!v || typeof v !== "object" || !("family" in v)) throw new Error(`${name} is not a shape`);
  return v as Shape;
};

export const typographyOf = (name: TokenName, ctx: Context = defaultContext): Typography => {
  const v = valueOf(name, ctx);
  if (!v || typeof v !== "object" || !("fonts" in v))
    throw new Error(`${name} is not a type style`);
  return v as Typography;
};

/** The md.sys.color role a colour token resolves to, following references. */
export const colorRoleOf = (name: TokenName, ctx: Context = defaultContext): ColorRole => {
  let current: string = name;
  for (let i = 0; i < 16; i++) {
    if (current.indexOf("md.sys.color.") === 0)
      return current.slice("md.sys.color.".length) as ColorRole;
    if (!isToken(current)) break;
    const { ref } = resolve(current, ctx);
    if (!ref) break;
    current = ref;
  }
  throw new Error(`${name} does not resolve to a colour role`);
};
