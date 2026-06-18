import fs from "fs";
import path from "path";

function readLines(file) {
  return fs
    .readFileSync(path.join(process.cwd(), "scripts", "data", file), "utf8")
    .trim()
    .split("\n")
    .filter(Boolean);
}

function parseWqModel(model) {
  const match = model.match(/^(\d+)WQ(\d+)-(\d+)-([\d.]+)/i);
  if (!match) {
    throw new Error(`bad WQ model: ${model}`);
  }

  return { flow: match[2], head: match[3] };
}

function mapWqLine(line) {
  const [model, outletInches, powerKw, currentA, weightKg, maxHeadM, solidsMm, speed] = line.split("|");
  const { flow, head } = parseWqModel(model);

  return {
    model,
    outletInches,
    voltage: "380",
    powerKw,
    currentA,
    flow,
    head,
    weightKg,
    maxHeadM,
    solidsMm,
    speed
  };
}

function mapWqkLine(line) {
  const [model, outletInches, powerKw, currentA, flow, head, speed] = line.split("|");

  return {
    model,
    outletInches,
    voltage: "380",
    powerKw,
    currentA,
    flow,
    head,
    speed
  };
}

const wqRows = readLines("wq-pumps.lines.txt").map(mapWqLine);
const wqkRows = readLines("wqk-pumps.lines.txt").map(mapWqkLine);
const rows = [...wqRows, ...wqkRows];

const models = rows.map((row) => row.model);
const duplicates = models.filter((model, index) => models.indexOf(model) !== index);
if (duplicates.length) {
  console.error("duplicate models:", duplicates);
  process.exit(1);
}

const out = `export type SubmersibleSewagePumpRow = {
  model: string;
  outletInches: string;
  voltage: "220" | "380";
  powerKw: string;
  currentA: string;
  flow: string;
  head: string;
  speed: string;
  weightKg?: string;
  maxHeadM?: string;
  solidsMm?: string;
};

export const WQ_SUBMERSIBLE_SEWAGE_PUMPS: SubmersibleSewagePumpRow[] = ${JSON.stringify(wqRows, null, 2)};

export const WQK_SUBMERSIBLE_SEWAGE_PUMPS: SubmersibleSewagePumpRow[] = ${JSON.stringify(wqkRows, null, 2)};
`;

const target = path.join(process.cwd(), "prisma", "data", "wq-submersible-sewage-pumps.ts");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out);
console.log("wrote", target, "WQ", wqRows.length, "WQK", wqkRows.length);
