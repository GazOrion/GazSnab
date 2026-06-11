"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminLogout() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button className="button secondary" onClick={logout} type="button">
      <LogOut size={18} />
      Выйти
    </button>
  );
}
