import "./style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { followAppliedTheme } from "./m3/scheme.ts";
import { followTextScale } from "./m3/text-scale.ts";

void followAppliedTheme();
void followTextScale();

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
