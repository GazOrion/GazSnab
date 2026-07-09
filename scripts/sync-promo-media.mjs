import fs from "fs";
import path from "path";

const root = process.cwd();
const sourceDir = path.join(root, "media");
const targetDir = path.join(root, "public", "media");

/** Исходники в `media/` → файлы для сайта в `public/media/`. */
const mapping = [
  { from: "main banner.png", to: "main-banner.png" },
  { from: "gotovoe oboryd.png", to: "gotovoe-oborudovanie.png" },
  { from: "metalloobr banner.png", to: "metalloobr.png" },
  { from: "баннер на каталог.webp", to: "catalog-banner.webp" },
  { from: "баннер для услуг.webp", to: "services-banner.webp" },
  { from: "баннер для счетчиков.webp", to: "gas-meters-banner.webp" },
  { from: "баннер для БПЭК.webp", to: "telemetry-banner.webp" },
  { from: "баннер для по.webp", to: "software-banner.webp" },
  { from: "Баннер для доп оборудования.webp", to: "additional-equipment-banner.webp" },
  { from: "баннер для кабелей.webp", to: "bpek-cables-banner.webp" },
  { from: "баннер для узлов учета газа.webp", to: "gas-metering-units-banner.webp" },
  { from: "баннер для регуляторов.webp", to: "regulators-banner.webp" },
  { from: "баннер для сигнализаторов.webp", to: "gas-alarm-banner.webp" },
  { from: "баннер фильтров.webp", to: "filters-banner.webp" },
  { from: "баннер для кранов шаровых.webp", to: "ball-valves-banner.webp" },
  { from: "Баннер  для корректоров.webp", to: "korrektory-gaza-banner.webp" },
  { from: path.join("Новая папка", "баннер для насосов.webp"), to: "pumps-banner.webp" },
  { from: "vidget.png", to: "vidget.png" }
];

fs.mkdirSync(targetDir, { recursive: true });

for (const { from, to } of mapping) {
  const src = path.join(sourceDir, from);
  const dest = path.join(targetDir, to);
  if (!fs.existsSync(src)) {
    console.warn("skip (нет файла):", from);
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log("ok", `${from} → ${to}`);
}
