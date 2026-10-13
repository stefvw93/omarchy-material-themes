import { Layer } from "effect";
import { FetchHttpClient } from "effect/http";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";

export const FetchTauri = Layer.succeed(FetchHttpClient.Fetch, tauriFetch);
export const HttpClientTauri = FetchHttpClient.layer.pipe(Layer.provide(FetchTauri));
