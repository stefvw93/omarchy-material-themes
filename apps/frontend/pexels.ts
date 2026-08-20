import { createClient, type Photo, type Photos } from "pexels";
import fs from "node:fs";
import path from "node:path";

const apiKey = process.env.PEXELS_API_KEY;

if (!apiKey) {
  throw new Error("PEXELS_API_KEY is not set");
}

const outFile = path.join(import.meta.dirname, "src/assets/pexels/curated.json");

const client = createClient(apiKey);

const response = await client.photos.curated({ per_page: 80 });

if ("error" in response) {
  throw new Error(response.error);
}

const existing: Photo[] = fs.existsSync(outFile)
  ? (JSON.parse(fs.readFileSync(outFile, "utf8")) as Photo[])
  : [];

const byId = new Map<number, Photo>();
for (const photo of [...existing, ...(response as Photos).photos]) {
  byId.set(photo.id, photo);
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify([...byId.values()], null, 2));
