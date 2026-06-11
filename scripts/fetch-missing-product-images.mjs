import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");

/** Кадр карусели на tehnomer.ru (остальные слайды 873×545). */
const SMT_KOMPLEKS_HERO_FRAME = { width: 873, height: 545 };
const SMT_KOMPLEKS_HERO_PNG =
  "https://tehnomer.ru/assets/images/products/197/smt-kompleks.png";
const SMT_KOMPLEKS_K_HERO_PNG =
  "https://tehnomer.ru/assets/images/products/198/smt-kompleks-1.png";
const SMT_KOMPLEKS_G40_HERO_PNG =
  "https://tehnomer.ru/assets/images/products/199/40-2.png";
const SMT_KOMPLEKS_G65_HERO_PNG =
  "https://tehnomer.ru/assets/images/products/200/100.png";

/** Только фото СМТ-Комплекс с tehnomer.ru (страница, которую передал заказчик). */
const SMT_DOWNLOADS = [
  {
    dest: "media/products/smt/smt-kompleks.webp",
    heroPng: SMT_KOMPLEKS_HERO_PNG
  },
  {
    dest: "media/products/smt/smt-kompleks-1-60-3-1.webp",
    url: "https://tehnomer.ru/assets/images/products/197/product_card_big_1280/1-60-3-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-2-30-3-1.webp",
    url: "https://tehnomer.ru/assets/images/products/197/product_card_big_1280/2-30-3-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-3-0-3-1.webp",
    url: "https://tehnomer.ru/assets/images/products/197/product_card_big_1280/3-0-3-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-4-30-3-1.webp",
    url: "https://tehnomer.ru/assets/images/products/197/product_card_big_1280/4-30-3-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-5-60-3-1.webp",
    url: "https://tehnomer.ru/assets/images/products/197/product_card_big_1280/5-60-3-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-k.webp",
    heroPng: SMT_KOMPLEKS_K_HERO_PNG
  },
  {
    dest: "media/products/smt/smt-kompleks-k-1-60-4-1.webp",
    url: "https://tehnomer.ru/assets/images/products/198/product_card_big_1280/1-60-4-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-k-2-30-4-1.webp",
    url: "https://tehnomer.ru/assets/images/products/198/product_card_big_1280/2-30-4-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-k-3-0-4-1.webp",
    url: "https://tehnomer.ru/assets/images/products/198/product_card_big_1280/3-0-4-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-k-4-30-4-1.webp",
    url: "https://tehnomer.ru/assets/images/products/198/product_card_big_1280/4-30-4-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-k-5-60-4-1.webp",
    url: "https://tehnomer.ru/assets/images/products/198/product_card_big_1280/5-60-4-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g40.webp",
    heroPng: SMT_KOMPLEKS_G40_HERO_PNG
  },
  {
    dest: "media/products/smt/smt-kompleks-g40-1-60-5-1.webp",
    url: "https://tehnomer.ru/assets/images/products/199/product_card_big_1280/1-60-5-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g40-2-30-5-1.webp",
    url: "https://tehnomer.ru/assets/images/products/199/product_card_big_1280/2-30-5-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g40-3-0-5-1.webp",
    url: "https://tehnomer.ru/assets/images/products/199/product_card_big_1280/3-0-5-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g40-4-30-5-1.webp",
    url: "https://tehnomer.ru/assets/images/products/199/product_card_big_1280/4-30-5-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g40-5-60-5-1.webp",
    url: "https://tehnomer.ru/assets/images/products/199/product_card_big_1280/5-60-5-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g65.webp",
    heroPng: SMT_KOMPLEKS_G65_HERO_PNG
  },
  {
    dest: "media/products/smt/smt-kompleks-g65-1-60-6-1.webp",
    url: "https://tehnomer.ru/assets/images/products/200/product_card_big_1280/1-60-6-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g65-2-30-6-1.webp",
    url: "https://tehnomer.ru/assets/images/products/200/product_card_big_1280/2-30-6-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g65-3-0-6-1.webp",
    url: "https://tehnomer.ru/assets/images/products/200/product_card_big_1280/3-0-6-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g65-4-30-6-1.webp",
    url: "https://tehnomer.ru/assets/images/products/200/product_card_big_1280/4-30-6-1.webp"
  },
  {
    dest: "media/products/smt/smt-kompleks-g65-5-60-6-1.webp",
    url: "https://tehnomer.ru/assets/images/products/200/product_card_big_1280/5-60-6-1.webp"
  }
];

console.log("[images] sync service photos from /media …");
execSync("node scripts/sync-service-media.mjs", { cwd: root, stdio: "inherit" });

console.log("[images] sync product photos from /media …");
execSync("node scripts/sync-product-media.mjs", { cwd: root, stdio: "inherit" });

async function download(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; GazSnab/1.0)" },
    redirect: "follow"
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
  console.log("ok", path.relative(publicRoot, destPath), `(${Math.round(buf.length / 1024)} KB)`);
}

async function downloadCarouselHero(pngUrl, destPath) {
  const res = await fetch(pngUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; GazSnab/1.0)" },
    redirect: "follow"
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const sharp = (await import("sharp")).default;
  const out = await sharp(Buffer.from(await res.arrayBuffer()))
    .resize(SMT_KOMPLEKS_HERO_FRAME.width, SMT_KOMPLEKS_HERO_FRAME.height, {
      fit: "contain",
      background: "#ffffff"
    })
    .webp({ quality: 88 })
    .toBuffer();
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, out);
  console.log(
    "ok",
    path.relative(publicRoot, destPath),
    `(${Math.round(out.length / 1024)} KB, ${SMT_KOMPLEKS_HERO_FRAME.width}×${SMT_KOMPLEKS_HERO_FRAME.height})`
  );
}

let failed = 0;
for (const item of SMT_DOWNLOADS) {
  const destPath = path.join(publicRoot, item.dest);
  try {
    if (item.heroPng) {
      await downloadCarouselHero(item.heroPng, destPath);
    } else {
      await download(item.url, destPath);
    }
  } catch (error) {
    failed += 1;
    console.error("fail", item.dest, error.message);
  }
}

if (failed > 0) process.exitCode = 1;
