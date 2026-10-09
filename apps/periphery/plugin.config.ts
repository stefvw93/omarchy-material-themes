import { definePlugin } from "@stef/plugin-kit";

export default definePlugin({
  id: "stef.periphery",
  name: "Periphery exposé",
  version: "1.0.0",
  author: "Stef",
  description:
    "Compacts tiling and the bar into a centred focus area and shows the other workspaces as live miniatures in the side bands",
  kinds: ["panel"],
  entryPoints: { panel: "Periphery.qml" },
  hyprHook: "hypr/hypr.lua",
  libs: {
    layout: "src/layout/index.ts",
    selection: "src/selection/index.ts",
    hyprland: "src/hyprland/index.ts",
  },
  files: ["README.md"],
  smoke: "smoke.ts",
});
