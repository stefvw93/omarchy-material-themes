import { definePlugin } from "@stef/plugin-kit";

export default definePlugin({
  id: "stef.expo",
  name: "Exposé",
  version: "1.0.0",
  author: "Stef",
  description: "Mission Control style overview of all workspaces with live window thumbnails",
  kinds: ["overlay"],
  entryPoints: { overlay: "Expo.qml" },
  files: ["README.md"],
});
