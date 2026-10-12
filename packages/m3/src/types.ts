// Types of the generated token data (src/generated). Plain data, ES2017: the
// QML plugins bundle it.

/**
 * The context dimensions a token value can depend on. Platform and audience
 * are fixed to the public Web baseline (see the `platform.web` interpretation).
 */
export interface Context {
  readonly theme: "light" | "dark";
  readonly contrast: "standard" | "medium" | "high";
  readonly motionScheme: "standard" | "expressive";
  /** Static: fixed-weight fonts (shell, plugins). Variable: Roboto Flex axes (Studio). */
  readonly font: "static" | "variable";
}

export type Dim = keyof Context;

export interface Typography {
  readonly fonts: ReadonlyArray<string>;
  readonly weight?: number;
  /** sp, numerically equal to dp (see the `unit.sp` interpretation). */
  readonly size?: number;
  readonly lineHeight?: number;
  readonly tracking?: number;
  readonly axes: Readonly<Record<string, number>>;
}

export interface Shape {
  readonly family: "rounded-corners" | "circular";
  /** dp, or "N%". */
  readonly size?: number | string;
  readonly corners?: Readonly<
    Partial<Record<"topLeft" | "topRight" | "bottomLeft" | "bottomRight", number | string>>
  >;
}

/**
 * A resolved value. Lengths are dp (or "N%"), durations ms, opacities 0..1,
 * cubic béziers [x1, y1, x2, y2]. null: the spec leaves it unspecified here.
 */
export type TokenValue =
  | null
  | number
  | string
  | ReadonlyArray<string>
  | readonly [number, number, number, number]
  | Shape
  | Typography
  | { readonly tag: string; readonly value: number }
  | { readonly [field: string]: TokenValue };

export interface Resolved {
  /** The first token this one references, e.g. md.sys.color.surface-container-low. */
  readonly ref?: string;
  /** For composites whose fields reference different tokens. */
  readonly fields?: Readonly<Record<string, string>>;
  /** Absent for colour roles: material-color-utilities computes those. */
  readonly value?: TokenValue;
}

/** A token whose value depends on some context dimensions. Keys: dimension values joined by "|". */
export interface Varying {
  readonly by: ReadonlyArray<Dim>;
  readonly cases: Readonly<Record<string, Resolved>>;
}

export type Token = Resolved | Varying;

export interface TokenInfo {
  readonly display: string;
  readonly description?: string;
  readonly set: string;
}
