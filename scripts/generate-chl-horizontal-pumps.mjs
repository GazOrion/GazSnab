import fs from "fs";
import path from "path";

const lines = `CHL2-20|1"x1"|220|0.37|2.4|2|14
CHL2-30|1"x1"|220|0.37|2.4|2|21
CHL2-40|1"x1"|220|0.55|3.8|2|28
CHL2-50|1"x1"|220|0.55|3.8|2|35
CHL2-60|1"x1"|220|0.75|5.2|2|42
CHL2-20T|1"x1"|380|0.37|Δ1.7/Y1|2|14
CHL2-30T|1"x1"|380|0.37|Δ1.7/Y1|2|21
CHL2-40T|1"x1"|380|0.55|Δ2.4/Y1.4|2|28
CHL2-50T|1"x1"|380|0.55|Δ2.4/Y1.4|2|35
CHL2-60T|1"x1"|380|0.75|Δ3.2/Y1.8|2|42
CHL4-20|1.25"x1"|220|0.55|3.8|4|15
CHL4-30|1.25"x1"|220|0.75|5.2|4|22
CHL4-40|1.25"x1"|220|0.75|5.2|4|30
CHL4-50|1.25"x1"|220|1|6.2|4|38
CHL4-60|1.25"x1"|220|1.1|7|4|45
CHL4-20T|1.25"x1"|380|0.55|Δ2.4/Y1.4|4|15
CHL4-30T|1.25"x1"|380|0.75|Δ3.2/Y1.8|4|22
CHL4-40T|1.25"x1"|380|0.75|Δ3.2/Y1.8|4|30
CHL4-50T|1.25"x1"|380|1|Δ4.2/Y2.4|4|38
CHL4-60T|1.25"x1"|380|1.1|Δ4.5/Y2.6|4|45
CHL8-10|1.5"x1.5"|220|0.55|3.8|8|9
CHL8-20|1.5"x1.5"|220|0.75|5.2|8|19
CHL8-30|1.5"x1.5"|220|1.1|7|8|26
CHL8-40|1.5"x1.5"|220|1.5|9.2|8|37
CHL8-50|1.5"x1.5"|220|2.2|14|8|46.5
CHL8-10T|1.5"x1.5"|380|0.55|Δ2.4/Y1.4|8|9
CHL8-20T|1.5"x1.5"|380|0.75|Δ3.2/Y1.8|8|19
CHL8-30T|1.5"x1.5"|380|1.1|Δ4.5/Y2.6|8|26
CHL8-40T|1.5"x1.5"|380|1.5|Δ6/Y3.5|8|37
CHL8-50T|1.5"x1.5"|380|2.2|Δ8.4/Y4.9|8|46.5
CHL12-10|1.5"x1.5"|220|0.75|5.2|12|9.5
CHL12-20|1.5"x1.5"|220|1.1|7|12|19.5
CHL12-30|1.5"x1.5"|220|1.85|13|12|29.5
CHL12-40|1.5"x1.5"|220|2.2|14|12|39.5
CHL12-10T|1.5"x1.5"|380|0.75|Δ3.2/Y1.8|12|9.5
CHL12-20T|1.5"x1.5"|380|1.1|Δ4.5/Y2.6|12|19.5
CHL12-30T|1.5"x1.5"|380|1.85|Δ7.1/Y4.1|12|29.5
CHL12-40T|1.5"x1.5"|380|2.2|Δ8.4/Y4.9|12|39.5
CHL12-50T|1.5"x1.5"|380|3|Δ11/Y6.3|12|50
CHL16-10T|2"x2"|380|1|Δ4.2/Y2.4|16|10
CHL16-20T|2"x2"|380|1.5|Δ6/Y3.5|16|20
CHL16-30T|2"x2"|380|2.2|Δ8.4/Y4.9|16|30
CHL20-10T|2"x2"|380|1|Δ4.2/Y2.4|20|10.5
CHL20-20T|2"x2"|380|1.85|Δ7.1/Y4.1|20|20
CHL20-30T|2"x2"|380|3|Δ11/Y6.3|20|31.5`
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

export const CHL_HORIZONTAL_PUMPS: HorizontalMultistagePumpRow[] = ${JSON.stringify(rows, null, 2)};
`;

const target = path.join(process.cwd(), "prisma", "data", "chl-horizontal-pumps.ts");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out);
console.log("wrote", target, "rows", rows.length);
