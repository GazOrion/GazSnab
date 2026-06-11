import fs from "fs";
import path from "path";

const root = process.cwd();
const sourceDir = path.join(root, "media");
const targetDir = path.join(root, "public", "media", "categories");

const pumpsDir = path.join("Новая папка");

const mapping = [
  { from: "фильтр.webp", to: "filtr.webp" },
  { from: "сигнализатор загазованности.webp", to: "signalizator-zagazovannosti.webp" },
  { from: "регулятор давления.webp", to: "regulator-davleniya.webp" },
  { from: "запорный кран.webp", to: "zapornyy-kran.webp" },
  { from: "запорная арматура.webp", to: "zapornaya-armatura.webp" },
  { from: path.join(pumpsDir, "Насосы.webp"), to: "pumps.webp" },
  {
    from: path.join(pumpsDir, "ИНТЕЛЛЕКТУАЛЬНЫЕ ЦИРКУЛЯЦИОННЫЕ НАСОСЫ С МОКРЫМ РОТОРОМ.webp"),
    to: path.join("pumps", "intelligent-wet-rotor.webp")
  },
  {
    from: path.join(pumpsDir, "ТРЕХСКОРОСТНЫЕ ЦИРКУЛЯЦИОННЫЕ НАСОСЫ С МОКРЫМ РОТОРОМ.webp"),
    to: path.join("pumps", "three-speed-wet-rotor.webp")
  },
  {
    from: path.join(pumpsDir, "ЛИНЕЙНЫЕ ЦИРКУЛЯЦИОННЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "inline-circulation.webp")
  },
  {
    from: path.join(pumpsDir, "ВЕРТИКАЛЬНЫЕ МНОГОСТУПЕНЧАТЫЕ ЦЕНТРОБЕЖНЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "vertical-multistage.webp")
  },
  {
    from: path.join(pumpsDir, "ГОРИЗОНТАЛЬНЫЕ МНОГОСТУПЕНЧАТЫЕ ЦЕНТРОБЕЖНЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "horizontal-multistage.webp")
  },
  {
    from: path.join(pumpsDir, "КОНСОЛЬНО-МОНОБЛОЧНЫЕ ЦЕНТРОБЕЖНЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "monoblock-console.webp")
  },
  {
    from: path.join(pumpsDir, "ЦЕНТРОБЕЖНЫЕ НАСОСЫ КОНСОЛЬНОГО ТИПА.webp"),
    to: path.join("pumps", "console-centrifugal.webp")
  },
  {
    from: path.join(pumpsDir, "ПОГРУЖНЫЕ КАНАЛИЗАЦИОННЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "submersible-sewage.webp")
  }
];

fs.mkdirSync(targetDir, { recursive: true });

for (const { from, to } of mapping) {
  const src = path.join(sourceDir, from);
  const dest = path.join(targetDir, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(src)) {
    console.error("missing:", from);
    process.exitCode = 1;
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log("ok", `${from} → categories/${to}`);
}
