import fs from "fs";
import path from "path";

const lines = `CHJ2-20|1"x1"|220|0.37|2.4|2|14
CHJ2-30|1"x1"|220|0.37|2.4|2|21
CHJ2-40|1"x1"|220|0.55|3.8|2|28
CHJ2-50|1"x1"|220|0.55|3.8|2|35
CHJ2-60|1"x1"|220|0.75|5.2|2|42
CHJ4-20|1.25"x1"|220|0.55|3.8|4|15
CHJ4-30|1.25"x1"|220|0.75|5.2|4|22
CHJ4-40|1.25"x1"|220|0.75|5.2|4|30
CHJ4-50T|1.25"x1"|380|1|Δ4.2/Y2.4|4|38
CHJ4-60T|1.25"x1"|380|1.1|Δ4.5/Y2.6|4|45
CHJ8-10|1.5"x1.5"|220|0.55|3.8|8|9
CHJ8-20|1.5"x1.5"|220|0.75|5.2|8|19
CHJ8-30T|1.5"x1.5"|380|1.1|Δ4.5/Y2.6|8|26
CHJ8-40T|1.5"x1.5"|380|1.5|Δ6/Y3.5|8|37
CHJ8-50T|1.5"x1.5"|380|2.2|Δ8.4/Y4.9|8|46.5
CHJ8-60T|1.5"x1.5"|380|3|Δ11/Y6.3|8|52
CHJ12-10|1.5"x1.5"|220|0.75|5.2|12|9.5
CHJ12-20T|1.5"x1.5"|380|1.1|Δ4.5/Y2.6|12|19.5
CHJ12-30T|1.5"x1.5"|380|1.85|Δ7.1/Y4.1|12|29.5
CHJ12-40T|1.5"x1.5"|380|2.2|Δ8.4/Y4.9|12|39.5
CHJ12-50T|1.5"x1.5"|380|3|Δ11/Y6.3|12|50
CHJ16-10T|2"x2"|380|1|Δ4.2/Y2.4|16|10
CHJ16-20T|2"x2"|380|1.5|Δ6/Y3.5|16|20
CHJ16-30T|2"x2"|380|2.2|Δ8.4/Y4.9|16|30
CHJ16-40T|2"x2"|380|3|Δ11/Y6.3|16|40
CHJ20-10T|2"x2"|380|1|Δ4.2/Y2.4|20|10.5
CHJ20-20T|2"x2"|380|1.85|Δ7.1/Y4.1|20|20
CHJ20-30T|2"x2"|380|3|Δ11/Y6.3|20|31.5
CHJ20-40T|2"x2"|380|4|9.6|20|40`
  .trim()
  .split("\n");

const rows = lines.map((line) => {
  const [model, connection, voltage, powerKw, currentA, flow, head] = line.split("|");
  return { model, connection, voltage, powerKw, currentA, flow, head };
});

const models = rows.map((row) => row.model);
const duplicates = models.filter((model, index) => models.indexOf(model) !== index);
if (duplicates.length) {
  console.error("duplicate models:", duplicates);
  process.exit(1);
}

const out = `export type HorizontalMultistagePumpRow = {
  model: string;
  connection: string;
  voltage: "220" | "380";
  powerKw: string;
  currentA: string;
  flow: string;
  head: string;
};

export const CHJ_HORIZONTAL_PUMPS: HorizontalMultistagePumpRow[] = ${JSON.stringify(rows, null, 2)};
`;

const target = path.join(process.cwd(), "prisma", "data", "chj-horizontal-pumps.ts");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out);
console.log("wrote", target, "rows", rows.length);
