import { Layer } from "effect";
import { FetchHttpClient } from "effect/unstable/http";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";

export const TauriFetchLayer = Layer.succeed(FetchHttpClient.Fetch, tauriFetch);
export const layer = FetchHttpClient.layer.pipe(Layer.provide(TauriFetchLayer));
