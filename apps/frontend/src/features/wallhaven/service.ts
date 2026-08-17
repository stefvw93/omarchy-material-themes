import { Context, Effect, flow, Layer, Schedule, Schema, SchemaTransformation } from "effect";
import { HttpClient, HttpClientRequest, HttpClientResponse } from "effect/unstable/http";
import { TauriHttpClient } from "effect-platform-tauri";
import { HexColor } from "../material/_colors";

export const WallhavenCategory = Schema.Union([
  Schema.Literal("general"),
  Schema.Literal("anime"),
  Schema.Literal("people"),
]);

export const WallhavenPurity = Schema.Union([
  Schema.Literal("sfw"),
  Schema.Literal("sketchy"),
  Schema.Literal("nsfw"),
]);

export const WallhavenItem = Schema.Struct({
  id: Schema.String,
  url: Schema.URLFromString,
  short_url: Schema.URLFromString,
  views: Schema.Number,
  favorites: Schema.Number,
  source: Schema.String,
  purity: WallhavenPurity,
  category: WallhavenCategory,
  dimension_x: Schema.Number,
  dimension_y: Schema.Number,
  resolution: Schema.String,
  ratio: Schema.String,
  file_size: Schema.Number,
  file_type: Schema.String,
  created_at: Schema.DateFromString,
  colors: Schema.Array(HexColor),
  path: Schema.URLFromString,
  thumbs: Schema.Struct({
    large: Schema.URLFromString,
    original: Schema.URLFromString,
    small: Schema.URLFromString,
  }),
});

export const WallhavenPayloadMeta = Schema.Struct({
  current_page: Schema.Number,
  last_page: Schema.Number,
  per_page: Schema.Number,
  total: Schema.Number,
  query: Schema.NullOr(Schema.String),
  seed: Schema.NullOr(Schema.String),
});

export const WallhavenPayload = <T extends Schema.Constraint>(data: T) =>
  Schema.Struct({
    data,
    meta: WallhavenPayloadMeta,
  });

export const WallhavenSearchPayload = WallhavenPayload(Schema.Array(WallhavenItem));
export type WallhavenSearchPayload = typeof WallhavenSearchPayload.Type;

export const WallhavenSearchSorting = Schema.Union([
  Schema.Literal("date_added"),
  Schema.Literal("relevance"),
  Schema.Literal("random"),
  Schema.Literal("views"),
  Schema.Literal("favorites"),
  Schema.Literal("toplist"),
]);
export type WallhavenSearchSorting = typeof WallhavenSearchSorting.Type;

export const WallhavenSearchOrder = Schema.Union([Schema.Literal("desc"), Schema.Literal("asc")]);
export type WallhavenSearchOrder = typeof WallhavenSearchOrder.Type;

export const WallhavenSearchTopRange = Schema.Union([
  Schema.Literal("1d"),
  Schema.Literal("3d"),
  Schema.Literal("1w"),
  Schema.Literal("1M"),
  Schema.Literal("3M"),
  Schema.Literal("6M"),
  Schema.Literal("1y"),
]);
export type WallhavenSearchTopRange = typeof WallhavenSearchTopRange.Type;

export const WallhavenSearchColors = Schema.Union([
  Schema.Literal("660000"),
  Schema.Literal("990000"),
  Schema.Literal("cc0000"),
  Schema.Literal("cc3333"),
  Schema.Literal("ea4c88"),
  Schema.Literal("993399"),
  Schema.Literal("663399"),
  Schema.Literal("333399"),
  Schema.Literal("0066cc"),
  Schema.Literal("0099cc"),
  Schema.Literal("66cccc"),
  Schema.Literal("77cc33"),
  Schema.Literal("669900"),
  Schema.Literal("336600"),
  Schema.Literal("666600"),
  Schema.Literal("999900"),
  Schema.Literal("cccc33"),
  Schema.Literal("ffff00"),
  Schema.Literal("ffcc33"),
  Schema.Literal("ff9900"),
  Schema.Literal("ff6600"),
  Schema.Literal("cc6633"),
  Schema.Literal("996633"),
  Schema.Literal("663300"),
  Schema.Literal("000000"),
  Schema.Literal("999999"),
  Schema.Literal("cccccc"),
  Schema.Literal("ffffff"),
]);
export type WallhavenSearchColors = typeof WallhavenSearchColors.Type;

/**
 * `"foo,bar,baz"` (Encoded) <-> `["foo", "bar", "baz"]` (Type).
 * Percent-encoding is left to `URLSearchParams`.
 */
const CommaSeparated = <S extends Schema.Codec<any, string>>(item: S) =>
  Schema.String.pipe(
    Schema.decodeTo(
      Schema.Array(item),
      SchemaTransformation.transform<ReadonlyArray<S["Encoded"]>, string>({
        decode: (str) => (str === "" ? [] : (str.split(",") as ReadonlyArray<S["Encoded"]>)),
        encode: (arr) => arr.join(","),
      }),
    ),
  );

export const WallhavenSearchParams = Schema.Struct({
  q: Schema.optional(Schema.String),
  categories: Schema.optional(Schema.String),
  purity: Schema.optional(Schema.String),
  sorting: Schema.optional(WallhavenSearchSorting),
  order: Schema.optional(WallhavenSearchOrder),
  topRange: Schema.optional(WallhavenSearchTopRange),
  atleast: Schema.optional(Schema.String),
  resolutions: Schema.optional(CommaSeparated(Schema.String)),
  ratios: Schema.optional(CommaSeparated(Schema.String)),
  colors: Schema.optional(CommaSeparated(WallhavenSearchColors)),
  page: Schema.optional(Schema.NumberFromString),
  seed: Schema.optional(Schema.String),
});
export type WallhavenSearchParams = typeof WallhavenSearchParams.Type;

/**
 * @docs https://wallhaven.cc/help/api
 */
export class WallhavenService extends Context.Service<
  WallhavenService,
  {
    search(
      params: WallhavenSearchParams,
    ): Effect.Effect<WallhavenSearchPayload, WallhavenServiceError | Schema.SchemaError>;
  }
>()("app/features/wallhaven/WallhavenService") {
  static readonly baseUrl = new URL("https://wallhaven.cc/api/v1");
  static readonly layer = Layer.effect(
    this,
    Effect.gen(function* () {
      // Take the base HttpClient and apply middleware that should run on every
      // request this service makes.
      const client = (yield* HttpClient.HttpClient).pipe(
        // Prepend a base URL and ask for JSON on all requests.
        HttpClient.mapRequest(
          flow(
            HttpClientRequest.prependUrl("https://wallhaven.cc/api/v1"),
            HttpClientRequest.acceptJson,
          ),
        ),
        // Turn non-2xx responses into a typed failure.
        HttpClient.filterStatusOk,
        // Retry transient failures (network errors, 5xx, 429) with backoff.
        HttpClient.retryTransient({
          schedule: Schedule.exponential(100),
          times: 3,
        }),
      );

      const search = Effect.fn("WallhavenService.search")(function* (
        params: WallhavenSearchParams,
      ) {
        const encodedParams = yield* Schema.encodeEffect(WallhavenSearchParams)(params);
        const urlSearchParams = new URLSearchParams(encodedParams);
        return yield* client.get(`/search?${urlSearchParams}`).pipe(
          Effect.flatMap(HttpClientResponse.schemaBodyJson(WallhavenSearchPayload)),
          Effect.mapError((cause) => new WallhavenServiceError({ cause })),
        );
      });

      return WallhavenService.of({ search });
    }),
  ).pipe(Layer.provide(TauriHttpClient.TauriHttpClientLayer));
}

export class WallhavenServiceError extends Schema.TaggedError<WallhavenServiceError>()(
  "app/features/wallhaven/WallhavenServiceError",
  { cause: Schema.Defect() },
) {}
