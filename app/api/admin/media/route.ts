import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"]
]);

function safeSegment(value: string | null) {
  const cleaned = (value || "catalog").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  return cleaned.replace(/^-+|-+$/g, "") || "catalog";
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const formData = await request.formData();
  const folder = safeSegment(String(formData.get("folder") || ""));
  const files = formData.getAll("files").filter((item): item is File => item instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "Выберите файлы." }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "media", "uploads", "products", folder);
  await mkdir(uploadDir, { recursive: true });

  const uploaded = [];

  for (const file of files) {
    const extension = ALLOWED_TYPES.get(file.type);

    if (!extension) {
      return NextResponse.json({ error: `Неверный формат файла: ${file.name}` }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `Файл слишком большой: ${file.name}` }, { status: 400 });
    }

    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const diskPath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(diskPath, buffer);

    uploaded.push({
      url: `/media/uploads/products/${folder}/${fileName}`,
      alt: file.name.replace(/\.[^.]+$/, "")
    });
  }

  return NextResponse.json({ files: uploaded });
}
