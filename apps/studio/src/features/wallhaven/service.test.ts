import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Fiber, Layer } from "effect";
import { HttpClient, HttpClientResponse, type HttpClientRequest } from "effect/http";
import { TestClock } from "effect/testing";
import { WallhavenService, WallhavenServiceError } from "./service";

const item = {
  id: "abc123",
  url: "https://wallhaven.cc/w/abc123",
  short_url: "https://whvn.cc/abc123",
  views: 10,
  favorites: 2,
  source: "",
  purity: "sfw",
  category: "general",
  dimension_x: 3840,
  dimension_y: 2160,
  resolution: "3840x2160",
  ratio: "1.78",
  file_size: 1000,
  file_type: "image/jpeg",
  created_at: "2026-01-01 00:00:00",
  colors: ["#424153"],
  path: "https://w.wallhaven.cc/full/ab/wallhaven-abc123.jpg",
  thumbs: {
    large: "https://th.wallhaven.cc/lg/ab/abc123.jpg",
    original: "https://th.wallhaven.cc/orig/ab/abc123.jpg",
    small: "https://th.wallhaven.cc/small/ab/abc123.jpg",
  },
};

const payload = {
  data: [item],
  meta: { current_page: 1, last_page: 1, per_page: 24, total: 1, query: null, seed: null },
};

/**
 * WallhavenService over a fake HttpClient: `respond` answers each request in
 * turn (the last answer repeats), and `requests` records what was sent.
 */
const fakeWallhaven = (...respond: ReadonlyArray<{ status: number; body?: unknown }>) => {
  const requests: Array<HttpClientRequest.HttpClientRequest> = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const answer = respond[Math.min(requests.length, respond.length - 1)]!;
      requests.push(request);
      return HttpClientResponse.fromWeb(
        request,
        new Response(JSON.stringify(answer.body ?? {}), {
          status: answer.status,
          headers: { "content-type": "application/json" },
        }),
      );
    }),
  );
  const layer = WallhavenService.layer.pipe(
    Layer.provide(Layer.succeed(HttpClient.HttpClient, client)),
  );
  return { requests, layer };
};

describe("WallhavenService.search", () => {
  it.effect("asks the API for JSON, with categories and purity as bit flags", () => {
    const { requests, layer } = fakeWallhaven({ status: 200, body: payload });
    return Effect.gen(function* () {
      const wallhaven = yield* WallhavenService;
      yield* wallhaven.search({
        q: "forest",
        categories: ["general", "people"],
        purity: ["sfw"],
        colors: ["0066cc", "ffffff"],
        page: 2,
      });
      const url = new URL(requests[0]!.url);
      expect(`${url.origin}${url.pathname}`).toBe("https://wallhaven.cc/api/v1/search");
      expect(Object.fromEntries(url.searchParams)).toEqual({
        q: "forest",
        categories: "101",
        purity: "100",
        colors: "0066cc,ffffff",
        page: "2",
      });
      expect(requests[0]!.headers["accept"]).toBe("application/json");
    }).pipe(Effect.provide(layer));
  });

  it.effect("decodes the payload", () => {
    const { layer } = fakeWallhaven({ status: 200, body: payload });
    return Effect.gen(function* () {
      const result = yield* (yield* WallhavenService).search({});
      expect(result.data[0]!.id).toBe("abc123");
      expect(result.data[0]!.path).toBeInstanceOf(URL);
      expect(result.meta.total).toBe(1);
    }).pipe(Effect.provide(layer));
  });

  it.effect("answers a repeated search from its cache for five minutes", () => {
    const { requests, layer } = fakeWallhaven({ status: 200, body: payload });
    return Effect.gen(function* () {
      const wallhaven = yield* WallhavenService;
      yield* wallhaven.search({ q: "forest" });
      yield* wallhaven.search({ q: "forest" });
      expect(requests).toHaveLength(1);
      yield* TestClock.adjust("5 minutes");
      yield* wallhaven.search({ q: "forest" });
      expect(requests).toHaveLength(2);
    }).pipe(Effect.provide(layer));
  });

  it.effect("fails with a WallhavenServiceError on a client error, without retrying", () => {
    const { requests, layer } = fakeWallhaven({ status: 404 });
    return Effect.gen(function* () {
      const exit = yield* Effect.exit((yield* WallhavenService).search({}));
      expect(Exit.isFailure(exit)).toBe(true);
      expect(Exit.isFailure(exit) && String(exit.cause)).toContain(WallhavenServiceError.name);
      expect(requests).toHaveLength(1);
    }).pipe(Effect.provide(layer));
  });

  it.effect("fails with a WallhavenServiceError on a payload that doesn't match", () => {
    const { layer } = fakeWallhaven({ status: 200, body: { data: "nope" } });
    return Effect.gen(function* () {
      const exit = yield* Effect.exit((yield* WallhavenService).search({}));
      expect(Exit.isFailure(exit) && String(exit.cause)).toContain(WallhavenServiceError.name);
    }).pipe(Effect.provide(layer));
  });

  it.effect("retries a server error with backoff", () => {
    const { requests, layer } = fakeWallhaven(
      { status: 503 },
      { status: 503 },
      { status: 200, body: payload },
    );
    return Effect.gen(function* () {
      const fiber = yield* Effect.forkChild((yield* WallhavenService).search({}));
      yield* TestClock.adjust("1 second");
      const result = yield* Fiber.join(fiber);
      expect(result.data).toHaveLength(1);
      expect(requests).toHaveLength(3);
    }).pipe(Effect.provide(layer));
  });
});
