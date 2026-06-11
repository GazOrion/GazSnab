import sharp from "sharp";
import fs from "fs";
import path from "path";

const src =
  "C:/Users/User1/.cursor/projects/c-Users-User1-Desktop-GazSnab/assets/c__Users_User1_AppData_Roaming_Cursor_User_workspaceStorage_713cad5f1a312807082d8d538664b029_images_______________2026-06-01_113738-9f95bf02-2a47-4f88-a4ae-fda9288640f5.png";
const outDir = "public/media/services";
fs.mkdirSync(outDir, { recursive: true });

const crops = [
  { name: "zatochka-sverl", top: 52 },
  { name: "robot-svarka", top: 186 },
  { name: "sverlenie-metalla", top: 320 },
  { name: "gibka-lista", top: 454 },
  { name: "rezba-trub", top: 588 },
  { name: "3d-pechat", top: 722 },
  { name: "raspil-metalla", top: 818 }
];

for (const c of crops) {
  await sharp(src)
    .extract({ left: 14, top: c.top, width: 116, height: 116 })
    .resize(800, 800, { fit: "cover" })
    .jpeg({ quality: 88 })
    .toFile(path.join(outDir, `${c.name}.jpg`));
  console.log("ok", c.name);
}
