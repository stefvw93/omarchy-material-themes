import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vite-plus/test";

const app = join(import.meta.dirname, "..");
const read = (...parts: ReadonlyArray<string>) => readFileSync(join(...parts), "utf8");
const installed = join(process.env["OMARCHY_PATH"] ?? "/usr/share/omarchy", "shell/plugins/lock");

describe("the stock lock logic", () => {
  // The lock's logic stays Omarchy's: only the view is ours.
  it("is an untouched copy of upstream/Service.qml", () => {
    expect(read(app, "qml/Service.qml")).toBe(read(app, "upstream/Service.qml"));
  });

  // Fails after an Omarchy update: follow upstream/README.md.
  it.each(["Service.qml", "LockView.qml", "manifest.json"])(
    "upstream/%s matches the installed Omarchy",
    (file) => {
      expect(read(app, "upstream", file)).toBe(read(installed, file));
    },
  );
});
