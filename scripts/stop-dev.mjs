import { execSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

for (const port of [3000, 3001]) {
  execSync(`node scripts/kill-port.mjs ${port}`, { cwd: root, stdio: "inherit" });
}

console.log("[stop-dev] ports 3000 and 3001 are free");
