import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");
const baseUrl = "https://orion-rostov.ru";

/** Фото ГРПШ кладут вручную в `public/media/products/gas-metering-units/`. */
const items = [];

let failed = 0;
for (const { dest, src } of items) {
  const url = `${baseUrl}${encodeURI(src)}`;
  const destPath = path.join(publicRoot, dest);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GazSnab/1.0)" },
      redirect: "follow"
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, buf);
    console.log("ok", dest, Math.round(buf.length / 1024), "KB");
  } catch (error) {
    failed += 1;
    console.error("fail", dest, error.message);
  }
}

process.exit(failed > 0 ? 1 : 0);
