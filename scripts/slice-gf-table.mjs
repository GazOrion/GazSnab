import fs from "fs";
import path from "path";
import sharp from "sharp";

const src =
  "C:/Users/User1/.cursor/projects/c-Users-User1-Desktop-GazSnab/assets/c__Users_User1_AppData_Roaming_Cursor_User_workspaceStorage_713cad5f1a312807082d8d538664b029_images_image-aeee0861-ca4c-4fe2-9a5e-bb416e2ef626.png";
const outDir = path.join(process.cwd(), "public", "processed", "gf-table-slices");
fs.mkdirSync(outDir, { recursive: true });
const meta = await sharp(src).metadata();
const rows = 25;
const h = Math.ceil(meta.height / rows);
for (let i = 0; i < rows; i++) {
  const top = i * h;
  const height = Math.min(h, meta.height - top);
  await sharp(src)
    .extract({ left: 0, top, width: meta.width, height })
    .png()
    .toFile(path.join(outDir, `${String(i).padStart(2, "0")}.png`));
}
console.log("slices", rows, meta.width, meta.height);
