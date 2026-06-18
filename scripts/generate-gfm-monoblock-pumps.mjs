import fs from "fs";
import path from "path";

const lines = `GFm32-125B*|50x32|220|0.75|5.15|18|17.5|нержавеющая сталь|2900
GFm32-125A*|50x32|220|1.1|7|24|22|нержавеющая сталь|2900
GFm32-160C*|50x32|220|1.5|9.44|18|25.4|нержавеющая сталь|2900
GFm32-160B*|50x32|220|2.2|13.4|24|31|нержавеющая сталь|2900
GFm32-160A*|50x32|220|3|18|27|35|нержавеющая сталь|2900
GFm40-125C|65x40|220|1.1|7|36|14.7|чугун|2900
GFm40-125B|65x40|220|1.5|9.44|42|18.1|чугун|2900
GFm40-125A|65x40|220|2.2|13.4|48|24.5|чугун|2900
GFm40-160B|65x40|220|3|18|42|31.8|чугун|2900
GFm50-125C|65x50|220|2.2|13.4|72|17|чугун|2900
GFm50-125B|65x50|220|3|18|72|20|чугун|2900`
  .trim()
  .split("\n");

const rows = lines.map((line) => {
  const [model, connection, voltage, powerKw, currentA, flow, head, material, speed] = line.split("|");
  return { model, connection, voltage, powerKw, currentA, flow, head, material, speed };
});

const models = rows.map((row) => row.model);
const duplicates = models.filter((model, index) => models.indexOf(model) !== index);
if (duplicates.length) {
  console.error("duplicate models:", duplicates);
  process.exit(1);
}

const out = `export type MonoblockConsolePumpRow = {
  model: string;
  connection: string;
  voltage: "220" | "380";
  powerKw: string;
  currentA: string;
  flow: string;
  head: string;
  material: string;
  speed: string;
};

export const GFM_MONOBLOCK_PUMPS: MonoblockConsolePumpRow[] = ${JSON.stringify(rows, null, 2)};
`;

const target = path.join(process.cwd(), "prisma", "data", "gfm-monoblock-pumps.ts");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out);
console.log("wrote", target, "rows", rows.length);
