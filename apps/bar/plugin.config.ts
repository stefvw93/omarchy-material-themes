import { definePlugin } from "@stef/plugin-kit";

export default definePlugin({
  id: "stef.bar",
  name: "Bar",
  version: "1.0.0",
  author: "Stef",
  description:
    "An M3 replacement for the Omarchy bar: follows Periphery's focus area and hosts the stock widgets",
  kinds: ["bar"],
  entryPoints: { bar: "Bar.qml" },
  libs: { model: "src/model/index.ts" },
  files: ["README.md"],
  smoke: "smoke.ts",
});
