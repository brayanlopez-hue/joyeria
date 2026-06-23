"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, Loader2, GripVertical } from "lucide-react";
import { categories } from "@/lib/site";
import type { Product, ProductImage } from "@/lib/types";

type FormProduct = Omit<Product, "_id">;

const METALS = ["oro", "plata"] as const;

interface Props {
  initial?: Product;
  mode: "create" | "edit";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProductForm({ initial, mode }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormProduct>({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    excerpt: initial?.excerpt ?? "",
    description: initial?.description ?? "",
    metal: initial?.metal ?? "oro",
    purity: initial?.purity ?? "14k",
    category: initial?.category ?? "anillos",
    subcategory: initial?.subcategory ?? "",
    images: initial?.images ?? [],
    priceFrom: initial?.priceFrom,
    featured: initial?.featured ?? false,
    engraving: initial?.engraving ?? false,
  });

  const [slugManual, setSlugManual] = useState(mode === "edit");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const currentCategory = categories.find((c) => c.slug === form.category);
  const subcategories = currentCategory?.subcategories ?? [];

  function set<K extends keyof FormProduct>(key: K, val: FormProduct[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleNameChange(name: string) {
    set("name", name);
    if (!slugManual) set("slug", slugify(name));
  }

  function handleCategoryChange(cat: string) {
    const newCat = categories.find((c) => c.slug === cat);
    set("category", cat);
    set("subcategory", newCat?.subcategories[0]?.slug ?? "");
  }

  async function handleImageUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!res.ok) {
          const d = await res.json();
          setError(d.error ?? "Error al subir imagen");
          return;
        }
        const { url } = await res.json();
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, { src: url, alt: prev.name }],
        }));
      }
    } finally {
      setUploading(false);
    }
  }

  function removeImage(idx: number) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  }

  function updateAlt(idx: number, alt: string) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === idx ? { ...img, alt } : img)),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.slug) return setError("El slug es obligatorio");
    if (!form.name) return setError("El nombre es obligatorio");

    setSaving(true);
    try {
      const url =
        mode === "edit"
          ? `/api/admin/productos/${initial!.slug}`
          : "/api/admin/productos";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Error al guardar");
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      {/* ── Información básica ─────────────────────────────── */}
      <section className="rounded-xl border border-[#e8e2d9] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#0e0e10]">Información básica</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-xs font-medium text-[#2a2a2e]">Nombre del producto *</label>
            <input
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className="input-admin"
              placeholder="Ej: Anillo Solitario de Compromiso"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#2a2a2e]">
              Slug (URL){" "}
              <button
                type="button"
                onClick={() => setSlugManual(!slugManual)}
                className="text-[#c9a24b] text-[10px] ml-1"
              >
                {slugManual ? "(auto)" : "(manual)"}
              </button>
            </label>
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugManual(true);
                set("slug", slugify(e.target.value));
              }}
              required
              readOnly={mode === "edit"}
              className="input-admin font-mono text-xs disabled:opacity-60"
              placeholder="anillo-solitario-oro"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#2a2a2e]">Precio desde (MXN)</label>
            <input
              type="number"
              value={form.priceFrom ?? ""}
              onChange={(e) => set("priceFrom", e.target.value ? Number(e.target.value) : undefined)}
              min={0}
              className="input-admin"
              placeholder="8500"
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-xs font-medium text-[#2a2a2e]">Descripción corta (para tarjetas)</label>
            <input
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              className="input-admin"
              placeholder="Solitario clásico en oro de 14k con engaste de 6 garras."
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-xs font-medium text-[#2a2a2e]">Descripción completa</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="input-admin resize-none"
              placeholder="Descripción detallada del producto…"
            />
          </div>
        </div>
      </section>

      {/* ── Clasificación ─────────────────────────────────── */}
      <section className="rounded-xl border border-[#e8e2d9] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#0e0e10]">Clasificación</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#2a2a2e]">Metal *</label>
            <select
              value={form.metal}
              onChange={(e) => set("metal", e.target.value as "oro" | "plata")}
              className="input-admin"
            >
              {METALS.map((m) => (
                <option key={m} value={m} className="capitalize">{m.charAt(0).toUpperCase() + m.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#2a2a2e]">Pureza / Quilataje</label>
            <input
              value={form.purity}
              onChange={(e) => set("purity", e.target.value)}
              className="input-admin"
              placeholder="14k, 18k, .925"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#2a2a2e]">Categoría *</label>
            <select
              value={form.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="input-admin"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#2a2a2e]">Subcategoría</label>
            <select
              value={form.subcategory}
              onChange={(e) => set("subcategory", e.target.value)}
              className="input-admin"
            >
              <option value="">— Sin subcategoría —</option>
              {subcategories.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-[#2a2a2e]">
              <input
                type="checkbox"
                checked={form.featured ?? false}
                onChange={(e) => set("featured", e.target.checked)}
                className="h-4 w-4 accent-[#c9a24b]"
              />
              Producto destacado (aparece en Home)
            </label>
            <label className="flex items-center gap-2 text-sm text-[#2a2a2e]">
              <input
                type="checkbox"
                checked={form.engraving ?? false}
                onChange={(e) => set("engraving", e.target.checked)}
                className="h-4 w-4 accent-[#c9a24b]"
              />
              Permite grabado personalizado
            </label>
          </div>
        </div>
      </section>

      {/* ── Fotos ─────────────────────────────────────────── */}
      <section className="rounded-xl border border-[#e8e2d9] bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-base font-semibold text-[#0e0e10]">Fotos</h2>
        <p className="mb-4 text-xs text-[#8d8d86]">JPG, PNG o WebP · máx 5 MB por foto · la primera es la principal</p>

        <div className="grid gap-3 sm:grid-cols-3">
          {form.images.map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl border border-[#e8e2d9] bg-[#f5f3ef]">
              <div className="relative aspect-square">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <input
                  value={img.alt}
                  onChange={(e) => updateAlt(idx, e.target.value)}
                  placeholder="Texto alternativo"
                  className="w-full rounded border border-[#e8e2d9] bg-white px-2 py-1 text-xs outline-none focus:border-[#c9a24b]"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-[#8d8d86] shadow hover:text-red-600"
              >
                <X size={14} />
              </button>
              {idx === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-[#c9a24b] px-2 py-0.5 text-[10px] text-white">
                  Principal
                </span>
              )}
            </div>
          ))}

          {/* Botón de agregar */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#e8e2d9] text-[#8d8d86] transition-colors hover:border-[#c9a24b] hover:text-[#c9a24b] disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <Upload size={24} />
            )}
            <span className="text-xs">{uploading ? "Subiendo…" : "Agregar foto"}</span>
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="hidden"
          onChange={(e) => handleImageUpload(e.target.files)}
        />
      </section>

      {/* ── Acciones ──────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-lg border border-[#e8e2d9] px-5 py-2.5 text-sm text-[#2a2a2e] hover:bg-[#f5f3ef]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-[#c9a24b] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saving ? "Guardando…" : mode === "edit" ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>

      <style>{`
        .input-admin {
          border-radius: 0.5rem;
          border: 1px solid #e8e2d9;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          width: 100%;
          background: white;
          color: #0e0e10;
        }
        .input-admin:focus {
          border-color: #c9a24b;
          box-shadow: 0 0 0 2px rgba(201,162,75,0.15);
        }
      `}</style>
    </form>
  );
}
