"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Error desconocido");
        return;
      }
      router.push(searchParams.get("from") ?? "/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1a1a1e] to-[#2a2a2e] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#c9a24b]/50 shadow-lg shadow-black/40">
            <Image
              src="/images/logo-seal.jpg"
              alt="Sello Joyería Diamante López"
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-2xl text-white">Diamante López</h1>
            <p className="mt-0.5 text-sm text-white/40">Panel de administración</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">Usuario</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="username"
                required
                className="rounded-xl border border-white/10 bg-white/8 px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#c9a24b]/60 focus:ring-2 focus:ring-[#c9a24b]/20"
                placeholder="admin"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="rounded-xl border border-white/10 px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#c9a24b]/60 focus:ring-2 focus:ring-[#c9a24b]/20"
                placeholder="••••••••"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#c9a24b] py-2.5 text-sm font-semibold text-white transition hover:bg-[#b8913a] disabled:opacity-60"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          Acceso exclusivo para administradores
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
