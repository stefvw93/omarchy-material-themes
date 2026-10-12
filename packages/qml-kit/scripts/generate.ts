import { writeFileSync } from "node:fs";
import { renderKitM3 } from "./m3-data.ts";

writeFileSync(new URL("../src/m3.generated.ts", import.meta.url), renderKitM3());
console.log("generated src/m3.generated.ts");
