import { definePlugin } from "@stef/plugin-kit";

export default definePlugin({
  id: "stef.omaterial",
  name: "Omaterial",
  version: "1.0.0",
  author: "Stef",
  description: "Scales an Omaterial theme's type and text containers with Omarchy's text size",
  kinds: ["service"],
  keepLoaded: true,
  entryPoints: { service: "Service.qml" },
  libs: { text: "src/text.ts" },
  files: ["README.md"],
});
