// packages/m3/spec/extract.json: the parts of the spec the engine is built
// from, normalised and deterministic. Written by fetch-spec.ts, read by
// generate.ts and by the tests.

/** A resolved token value, normalised from the dsdb protobuf JSON. Lengths are in dp. */
export type ExtractValue =
  | { readonly type: "undefined" }
  /** `hex` only on md.sys.color tokens: the baseline scheme, for the oracle test. */
  | { readonly type: "color"; readonly hex?: string }
  | { readonly type: "opacity"; readonly value: number }
  | { readonly type: "number"; readonly value: number }
  | { readonly type: "length"; readonly value: number; readonly unit: "dp" | "pt" | "%" }
  | { readonly type: "duration"; readonly ms: number }
  | {
      readonly type: "cubicBezier";
      readonly x0: number;
      readonly y0: number;
      readonly x1: number;
      readonly y1: number;
    }
  | { readonly type: "path"; readonly svg: string }
  | { readonly type: "motionPath"; readonly path: string }
  | {
      readonly type: "shape";
      readonly family: "rounded-corners" | "circular";
      /** dp, or "N%". */
      readonly size?: number | string;
      readonly corners?: Readonly<
        Partial<Record<"topLeft" | "topRight" | "bottomLeft" | "bottomRight", number | string>>
      >;
    }
  | { readonly type: "fontNames"; readonly names: ReadonlyArray<string> }
  | { readonly type: "fontWeight"; readonly value: number }
  | { readonly type: "axis"; readonly tag: string; readonly value: number }
  | {
      readonly type: "typography";
      readonly fonts: ReadonlyArray<string>;
      readonly weight?: number;
      readonly size?: number;
      readonly lineHeight?: number;
      readonly tracking?: number;
      readonly axes: Readonly<Record<string, number>>;
    }
  | { readonly type: "textTransform"; readonly value: string }
  | {
      readonly type: "composite";
      readonly properties: Readonly<Record<string, ExtractValue>>;
    };

export interface ExtractEntry {
  /** Context tag per group (group name -> tag name), as the spec data tags the value. */
  readonly tags: Readonly<Record<string, string>>;
  /** The spec's specificity score: sum of 2^rank over the tag groups. Highest matching wins. */
  readonly score: number;
  /** This token, then each token it references, single-child path. */
  readonly chain: ReadonlyArray<string>;
  /** For composites whose fields reference different tokens: field -> chain. */
  readonly fields?: Readonly<Record<string, ReadonlyArray<string>>>;
  readonly value: ExtractValue;
}

export interface ExtractToken {
  readonly display: string;
  readonly description?: string;
  readonly set: string;
  readonly valueType?: string;
  readonly deprecated?: string;
  readonly entries: ReadonlyArray<ExtractEntry>;
}

export interface ExtractGroup {
  readonly display: string;
  readonly specificity: number;
  /** Position in specificity order; an entry's score adds 2^rank for this group. */
  readonly rank: number;
  readonly default: string;
  readonly tags: Readonly<Record<string, string>>;
}

export interface ExtractSet {
  readonly display: string;
  readonly description?: string;
  readonly deprecated: boolean;
}

export interface MwcShadow {
  readonly level: number;
  readonly x: number;
  readonly y: number;
  readonly blur: number;
  readonly spread: number;
}

export interface Extract {
  readonly source: {
    readonly site: string;
    readonly version: string;
    readonly designSystem: string;
    readonly revisionId: string;
    readonly revisionCreateTime: string;
  };
  readonly groups: Readonly<Record<string, ExtractGroup>>;
  readonly sets: Readonly<Record<string, ExtractSet>>;
  readonly tokens: Readonly<Record<string, ExtractToken>>;
  /** Tables quoted from spec pages, header row first. */
  readonly tables: Readonly<
    Record<
      "webSpringCurves" | "componentElevation",
      { readonly page: string; readonly rows: ReadonlyArray<ReadonlyArray<string>> }
    >
  >;
  /** The Web implementation the elevation page links for shadows ("each platform determines"). */
  readonly mwcElevation: {
    readonly url: string;
    readonly commit: string;
    readonly key: { readonly opacity: number; readonly levels: ReadonlyArray<MwcShadow> };
    readonly ambient: { readonly opacity: number; readonly levels: ReadonlyArray<MwcShadow> };
  };
}
