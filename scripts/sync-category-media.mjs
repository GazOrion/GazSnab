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
    from: path.join(
      pumpsDir,
      "для карточек ТРЕХСКОРОСТНЫЕ ЦИРКУЛЯЦИОННЫЕ НАСОСЫ С МОКРЫМ РОТОРОМ.webp"
    ),
    to: path.join("pumps", "three-speed-wet-rotor-card.webp")
  },
  {
    from: path.join(pumpsDir, "фотка обозначения ups.png"),
    to: path.join("pumps", "designation-ups.png")
  },
  {
    from: path.join(pumpsDir, "фотка обозначения geb.png"),
    to: path.join("pumps", "designation-geb.png")
  },
  {
    from: path.join(pumpsDir, "фотка обозначения gem.png"),
    to: path.join("pumps", "designation-gem.png")
  },
  {
    from: path.join(pumpsDir, "ЛИНЕЙНЫЕ ЦИРКУЛЯЦИОННЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "inline-circulation.webp")
  },
  {
    from: path.join(pumpsDir, "для карточек ЛИНЕЙНЫЕ ЦИРКУЛЯЦИОННЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "inline-circulation-card.webp")
  },
  {
    from: path.join(pumpsDir, "ВЕРТИКАЛЬНЫЕ МНОГОСТУПЕНЧАТЫЕ ЦЕНТРОБЕЖНЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "vertical-multistage.webp")
  },
  {
    from: path.join(
      pumpsDir,
      "для карточек ВЕРТИКАЛЬНЫЕ МНОГОСТУПЕНЧАТЫЕ ЦЕНТРОБЕЖНЫЕ НАСОСЫ.webp"
    ),
    to: path.join("pumps", "vertical-multistage-card.webp")
  },
  {
    from: path.join(pumpsDir, "фотка обозначения cdl.png"),
    to: path.join("pumps", "designation-cdl.png")
  },
  {
    from: path.join(pumpsDir, "фотка для СНТ.webp"),
    to: path.join("pumps", "designation-cht.webp")
  },
  {
    from: path.join(pumpsDir, "фотка обозначения CHL.webp"),
    to: path.join("pumps", "designation-chl.webp")
  },
  {
    from: path.join(pumpsDir, "для карточекCHL.webp"),
    to: path.join("pumps", "chl-horizontal-multistage-card.webp")
  },
  {
    from: path.join(pumpsDir, "дял карточек CHJ.webp"),
    to: path.join("pumps", "chj-horizontal-multistage-card.webp")
  },
  {
    from: path.join(pumpsDir, "для карточек GF.webp"),
    to: path.join("pumps", "gf-monoblock-console-card.webp")
  },
  {
    from: path.join(pumpsDir, "длля карточек GF(m).webp"),
    to: path.join("pumps", "monoblock-console-card.webp")
  },
  {
    from: path.join(pumpsDir, "фотка обозначения GF(m).webp"),
    to: path.join("pumps", "designation-gfm.webp")
  },
  {
    from: path.join(pumpsDir, "ГОРИЗОНТАЛЬНЫЕ МНОГОСТУПЕНЧАТЫЕ ЦЕНТРОБЕЖНЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "horizontal-multistage.webp")
  },
  {
    from: path.join(
      pumpsDir,
      "для карточек ГОРИЗОНТАЛЬНЫЕ МНОГОСТУПЕНЧАТЫЕ ЦЕНТРОБЕЖНЫЕ НАСОСЫ СНТ .webp"
    ),
    to: path.join("pumps", "horizontal-multistage-card.webp")
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
    from: path.join(pumpsDir, "для карточек GSM.webp"),
    to: path.join("pumps", "gsm-console-centrifugal-card.webp")
  },
  {
    from: path.join(pumpsDir, "Фотка обозначения GSM.webp"),
    to: path.join("pumps", "designation-gsm.webp")
  },
  {
    from: path.join(pumpsDir, "ПОГРУЖНЫЕ КАНАЛИЗАЦИОННЫЕ НАСОСЫ.webp"),
    to: path.join("pumps", "submersible-sewage.webp")
  },
  {
    from: path.join(pumpsDir, "для карточек WQWQK .webp"),
    to: path.join("pumps", "wq-submersible-sewage-card.webp")
  },
  {
    from: path.join(pumpsDir, "фотка обозначения WQ.webp"),
    to: path.join("pumps", "designation-wq.webp")
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
