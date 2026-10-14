import { definePlugin } from "@stef/plugin-kit";

// A clone of Omarchy's lock: the shell disables omarchy.lock while this is
// enabled and gives it the lock's authentication capability. Service.qml is
// the stock one, untouched; only LockView.qml is ours.
export default definePlugin({
  id: "stef.lock",
  name: "Lock Screen",
  version: "1.0.0",
  author: "Stef",
  description: "An M3 lock screen view on Omarchy's stock lock logic",
  kinds: ["service"],
  keepLoaded: true,
  entryPoints: { service: "Service.qml" },
  omarchy: { clonedFrom: "omarchy.lock" },
  qmllintSkip: ["Service.qml"],
  libs: { view: "src/view/index.ts" },
  files: ["README.md"],
  smoke: "smoke.ts",
});
