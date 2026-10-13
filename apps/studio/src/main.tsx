import "./style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { Effect } from "effect";
import { FollowerLayer } from "./features/shared.ts";
import { followAppliedTheme, showFallbackScheme } from "./m3/scheme.ts";
import { followTextScale, showDefaultTextScale } from "./m3/text-scale.ts";

showFallbackScheme();
showDefaultTextScale();
// Outside Tauri (a plain browser on the dev server) there are no files to follow.
if ("__TAURI_INTERNALS__" in window) {
  Effect.runFork(
    Effect.all([followAppliedTheme, followTextScale], { concurrency: "unbounded" }).pipe(
      Effect.provide(FollowerLayer),
      Effect.tapCause(Effect.logError),
    ),
  );
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
