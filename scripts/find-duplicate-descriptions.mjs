import fs from "node:fs";

const text = fs.readFileSync("prisma/seed.ts", "utf8");
const slugRe = /slug:\s*"([^"]+)"/g;
const slugs = [];
let m;
while ((m = slugRe.exec(text))) slugs.push({ idx: m.index, slug: m[1] });

const items = slugs.map(({ idx, slug }, i) => {
  const chunk = text.slice(idx, slugs[i + 1]?.idx ?? idx + 1200);
  const descM = chunk.match(/description:\s*(?:"([^"]*)"|([A-Z_][A-Z0-9_]*))/);
  const detM = chunk.match(/details:\s*(?:"([^"]*)"|([A-Z_][A-Z0-9_]*)|''|"")/);
  const titleM = chunk.match(/title:\s*"([^"]*)"/);
  return {
    slug,
    title: titleM?.[1] ?? "",
    description: descM?.[1] ?? descM?.[2] ?? "",
    details: detM?.[1] ?? detM?.[2] ?? ""
  };
});

function groupBy(keyFn) {
  const map = new Map();
  for (const p of items) {
    const key = keyFn(p);
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(p);
  }
  return [...map.entries()].filter(([, arr]) => arr.length > 1).sort((a, b) => b[1].length - a[1].length);
}

console.log("Duplicate descriptions:", groupBy((p) => p.description).length);
for (const [desc, arr] of groupBy((p) => p.description).slice(0, 20)) {
  console.log(`\n--- ${arr.length} products ---`);
  console.log("Desc:", desc.slice(0, 100) + (desc.length > 100 ? "..." : ""));
  for (const p of arr) console.log(" ", p.slug, "|", p.title.slice(0, 60));
}

console.log("\n\nDuplicate details:", groupBy((p) => p.details).length);
for (const [det, arr] of groupBy((p) => p.details).slice(0, 20)) {
  console.log(`\n--- ${arr.length} products ---`);
  console.log("Det:", det.slice(0, 100) + (det.length > 100 ? "..." : ""));
  for (const p of arr) console.log(" ", p.slug, "|", p.title.slice(0, 60));
}
