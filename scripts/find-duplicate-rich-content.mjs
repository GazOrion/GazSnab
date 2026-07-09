import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Dynamic import compiled TS won't work easily; parse index manually
const indexText = fs.readFileSync(path.join(root, "lib/product-content/index.ts"), "utf8");
const slugMatches = [...indexText.matchAll(/"([a-z0-9-]+)":\s*[A-Z_][A-Z0-9_]*/g)];
const spreadMatches = [...indexText.matchAll(/\.\.\.([A-Z_][A-Z0-9_]*)_CONTENT_BY_SLUG/g)];

console.log("Static slugs in index:", slugMatches.length);
console.log("Spread maps:", spreadMatches.map((m) => m[1]));
