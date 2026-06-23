"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 rounded-lg border border-[#e8e2d9] px-3 py-1.5 text-xs text-[#8d8d86] transition-colors hover:border-red-200 hover:text-red-600"
    >
      <LogOut size={12} />
      Salir
    </button>
  );
}
