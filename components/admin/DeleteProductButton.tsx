"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteProductButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/productos/${slug}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Error al eliminar el producto");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 rounded-lg border border-[#e8e2d9] px-2.5 py-1.5 text-xs text-[#8d8d86] hover:border-red-200 hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 size={12} />
      {loading ? "…" : "Eliminar"}
    </button>
  );
}
