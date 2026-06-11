import fs from "fs";
import path from "path";

const root = process.cwd();
const sourceDir = path.join(root, "media");
const catalogDir = path.join(root, "public", "media", "products", "catalog");
const gasMeteringDir = path.join(root, "public", "media", "products", "gas-metering-units");
const pumpsIntelligentDir = path.join(
  root,
  "public",
  "media",
  "products",
  "pumps",
  "intelligent-wet-rotor"
);

const pumpsSourceDir = path.join(
  sourceDir,
  "Новая папка",
  "ИНТЕЛЛЕКТУАЛЬНЫЕ ЦИРКУЛЯЦИОННЫЕ НАСОСЫ С МОКРЫМ РОТОРОМ"
);

const catalogMapping = [
  { from: "Фильтр газовый промышленный ФГ.webp", to: "filtr-gazovyy-fg.webp" },
  { from: "Клапан предохранительно-запорный КПЗ.webp", to: "klapan-kpz.webp" }
];

const gasMeteringMapping = [
  { from: "Узел учета газа коммерческий.webp", to: "uzel-ucheta-gaza.webp" }
];

const pumpsIntelligentMapping = ["1.png", "2.png", "3.png", "4.png", "5.png"].map((file) => ({
  from: path.join(pumpsSourceDir, file),
  to: path.join(pumpsIntelligentDir, file)
}));

fs.mkdirSync(catalogDir, { recursive: true });
fs.mkdirSync(gasMeteringDir, { recursive: true });
fs.mkdirSync(pumpsIntelligentDir, { recursive: true });

let failed = 0;

function copyMapping(targetDir, mapping, sourceBase = sourceDir) {
  for (const { from, to } of mapping) {
    const src = path.isAbsolute(from) ? from : path.join(sourceBase, from);
    const dest = path.isAbsolute(to) ? to : path.join(targetDir, to);
    if (!fs.existsSync(src)) {
      console.error("missing:", from);
      failed += 1;
      continue;
    }
    fs.copyFileSync(src, dest);
    console.log("ok", path.relative(root, dest));
  }
}

copyMapping(catalogDir, catalogMapping);
copyMapping(gasMeteringDir, gasMeteringMapping);
copyMapping(pumpsIntelligentDir, pumpsIntelligentMapping, root);

process.exit(failed > 0 ? 1 : 0);
