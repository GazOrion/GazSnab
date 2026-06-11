import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const prisma = new PrismaClient();
const products = await prisma.product.findMany({
  select: { slug: true, title: true, imageUrl: true },
  orderBy: { title: "asc" }
});

for (const p of products) {
  if (!p.imageUrl) {
    console.log("[NO URL]", p.slug);
    continue;
  }
  if (p.imageUrl.startsWith("/")) {
    const filePath = path.join(root, "public", p.imageUrl.replace(/^\//, ""));
    const ok = fs.existsSync(filePath) && fs.statSync(filePath).size > 10_000;
    console.log(ok ? "[OK file]" : "[MISSING file]", p.slug, p.imageUrl);
    continue;
  }
  console.log("[OK remote]", p.slug);
}

await prisma.$disconnect();
