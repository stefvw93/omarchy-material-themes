// Material 3 tokens generated from the spec (m3.material.io), their
// resolution per context, and the citations and interpretations the engine
// builds on. Plain ES2017 with no dependencies: the QML plugins bundle it.
export { type CitationId, type Citation, citations } from "./citations.ts";
export { type ColorRole, colorRoles, deprecatedColorRoles } from "./generated/color-roles.ts";
export { colorTones, type TonalPaletteName } from "./generated/color-tones.ts";
export { type CompTokenName, compTokens } from "./generated/comp.ts";
export { type SysTokenName, sysTokens } from "./generated/sys.ts";
export {
  componentElevation,
  spec,
  webElevationShadows,
  webSpringCurves,
} from "./generated/tables.ts";
export {
  type Interpretation,
  type InterpretationId,
  type SpecException,
  interpretation,
  interpretations,
} from "./interpretations.ts";
export {
  colorRoleOf,
  defaultContext,
  isToken,
  numberOf,
  resolve,
  shapeOf,
  type TokenName,
  typographyOf,
  valueOf,
} from "./resolve.ts";
export { resolveToken } from "./token.ts";
export type * from "./types.ts";
