import fs from "fs";
import path from "path";

const root = process.cwd();
const sourceDir = path.join(root, "media");
const targetDir = path.join(root, "public", "media", "services");

const mapping = [
  { from: "Заточка сверл до 20мм.webp", to: "zatochka-sverl-20mm.webp" },
  { from: "Роботизированная сварка.webp", to: "robotizirovannaya-svarka-metalla.webp" },
  { from: "Сверление металла.webp", to: "sverlenie-metalla.webp" },
  { from: "Гибка листового металла.webp", to: "gibka-listovogo-metalla.webp" },
  { from: "Нарезка резьбы.webp", to: "narrezka-rezby-trub.webp" },
  { from: "3-d печать пластиком.webp", to: "3d-pechat-plastik-tpu.webp" },
  { from: "Распил металла.webp", to: "raspil-metalla-lentopilnyy.webp" },
  {
    from: "Проектирование газового оборудования.webp",
    to: "proektirovanie-gazovogo-oborudovaniya.webp"
  },
  {
    from: "Сервисное обслуживание газового узла.webp",
    to: "servis-gazovogo-uzla.webp"
  }
];

fs.mkdirSync(targetDir, { recursive: true });

for (const { from, to } of mapping) {
  const src = path.join(sourceDir, from);
  const dest = path.join(targetDir, to);
  if (!fs.existsSync(src)) {
    console.warn("skip (missing):", from);
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log("ok", to);
}
