import { Effect, Layer } from "effect";
import { HttpClient, HttpClientResponse, type HttpClientRequest } from "effect/http";

/** One scripted answer: a status, and a JSON body or raw bytes with their type. */
export interface Answer {
  readonly status: number;
  readonly body?: unknown;
  readonly bytes?: Uint8Array;
  readonly contentType?: string;
}

/**
 * A fake HttpClient answering each request with the next scripted answer
 * (the last one repeats); `requests` records what was sent. Services built on
 * HttpClient keep their own middleware (base URL, retries, status filter,
 * schema decoding) in the test.
 */
export const HttpClientTest = (...answers: ReadonlyArray<Answer>) => {
  const requests: Array<HttpClientRequest.HttpClientRequest> = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const answer = answers[Math.min(requests.length, answers.length - 1)]!;
      requests.push(request);
      const body = answer.bytes ?? JSON.stringify(answer.body ?? {});
      return HttpClientResponse.fromWeb(
        request,
        new Response(body as BodyInit, {
          status: answer.status,
          headers: { "content-type": answer.contentType ?? "application/json" },
        }),
      );
    }),
  );
  return { layer: Layer.succeed(HttpClient.HttpClient, client), requests };
};
