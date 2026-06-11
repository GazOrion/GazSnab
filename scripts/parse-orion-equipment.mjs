import fs from "node:fs";

const html = fs.readFileSync("tmp-orion-oborudovanie.html", "utf8");

const imagePaths = new Set();
for (const match of html.matchAll(/url=([^&"]+?\.webp)/gi)) {
  try {
    const raw = match[1].startsWith("%") ? match[1] : decodeURIComponent(match[1]);
    const path = decodeURIComponent(raw).replace(/^%2F/, "/");
    if (path.includes("/banners/products/")) {
      imagePaths.add(path.startsWith("/") ? path : `/${path}`);
    }
  } catch {
    /* skip */
  }
}

const bulletsBlocks = [...html.matchAll(/<ul class="[^"]*list[^"]*"[^>]*>([\s\S]*?)<\/ul>/gi)];
console.log("images:", [...imagePaths]);
console.log("image count:", imagePaths.size);
