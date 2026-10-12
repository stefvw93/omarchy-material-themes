import "./style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { followAppliedTheme } from "./m3/scheme.ts";

void followAppliedTheme();

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
