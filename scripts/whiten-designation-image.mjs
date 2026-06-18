import fs from "fs";
import path from "path";
import sharp from "sharp";

async function whitenGrayBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const avg = (r + g + b) / 3;

    if (max - min < 35 && avg >= 140) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 255;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .webp({ quality: 92 })
    .toFile(outputPath);
}

const root = process.cwd();
const source = process.argv[2] ?? path.join(root, "public", "processed", "фотка обозначения CHL.webp");
const target =
  process.argv[3] ?? path.join(root, "public", "media", "categories", "pumps", "designation-chl.webp");

if (!fs.existsSync(source)) {
  console.error("source not found:", source);
  process.exit(1);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
await whitenGrayBackground(source, target);
console.log("wrote", target);
