import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { Diamond, LayoutGrid, Plus, ExternalLink } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await isAdminAuthenticated();
  if (!auth) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#f5f3ef]">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-[#e8e2d9] bg-white md:flex">
        {/* Brand */}
        <div className="flex items-center gap-2.5 border-b border-[#f0ece4] px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c9a24b]/10">
            <Diamond size={16} className="text-[#c9a24b]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0e0e10]">Joyería Diamante</p>
            <p className="text-[10px] text-[#8d8d86]">Panel admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[#2a2a2e] transition hover:bg-[#f5f3ef] hover:text-[#c9a24b]"
          >
            <LayoutGrid size={16} />
            Productos
          </Link>
          <Link
            href="/admin/productos/nuevo"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[#2a2a2e] transition hover:bg-[#f5f3ef] hover:text-[#c9a24b]"
          >
            <Plus size={16} />
            Nuevo producto
          </Link>
        </nav>

        {/* Footer */}
        <div className="border-t border-[#f0ece4] px-3 py-4 flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-[#8d8d86] transition hover:text-[#0e0e10]"
          >
            <ExternalLink size={13} />
            Ver sitio público
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex items-center justify-between border-b border-[#e8e2d9] bg-white px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <Diamond size={16} className="text-[#c9a24b]" />
            <span className="font-serif text-base text-[#0e0e10]">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/productos/nuevo" className="text-xs text-[#c9a24b] font-medium">+ Nuevo</Link>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
