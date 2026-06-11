import { execSync, spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const ports = [3000, 3001];

for (const port of ports) {
  execSync(`node scripts/kill-port.mjs ${port}`, { cwd: root, stdio: "inherit" });
}

if (process.argv.includes("--clean") && existsSync(resolve(root, ".next"))) {
  try {
    rmSync(resolve(root, ".next"), { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
    console.log("[dev] removed .next cache");
  } catch (error) {
    console.warn("[dev] could not remove .next (close dev server and retry):", error.message);
  }
}

const useTurbopack = !process.argv.includes("--webpack");

const child = spawn(
  "npx",
  ["next", "dev", "-p", "3000", ...(useTurbopack ? ["--turbopack"] : [])],
  {
    cwd: root,
    stdio: "inherit",
    shell: true,
    env: { ...process.env, FORCE_COLOR: "1" }
  }
);

child.on("exit", (code) => process.exit(code ?? 0));

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
