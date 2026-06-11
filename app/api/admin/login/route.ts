import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD || "root";

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Неверный пароль." }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
