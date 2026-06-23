"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, Loader2 } from "lucide-react";
import { whatsappHref } from "@/lib/whatsapp";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_MB = 8;

/**
 * Formulario dinámico de cotización de compostura. Sube la foto de la pieza
 * rota + datos y los envía a /api/taller (email vía Resend). La foto no puede
 * adjuntarse por wa.me, por eso va por este formulario; se ofrece además
 * WhatsApp para contacto rápido sin foto.
 */
export function RepairUploadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return setPreview(null);
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`La imagen supera los ${MAX_MB} MB.`);
      e.target.value = "";
      setPreview(null);
      return;
    }
    setError(null);
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch("/api/taller", { method: "POST", body: data });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error al enviar");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ocurrió un error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/40 bg-cream/60 p-8 text-center">
        <CheckCircle2 className="mx-auto text-gold-deep" size={40} />
        <h3 className="mt-3 font-display text-2xl text-ink">¡Solicitud enviada!</h3>
        <p className="mt-2 text-graphite/80">
          Recibimos los datos de tu pieza. Te contactaremos con la cotización lo
          antes posible.
        </p>
        <a
          href={whatsappHref(
            "Hola, acabo de enviar una solicitud de compostura desde el sitio.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white"
        >
          Dar seguimiento por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-stone-1 bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" required placeholder="Tu nombre" />
        <Field
          label="Teléfono / WhatsApp"
          name="telefono"
          required
          type="tel"
          placeholder="55 1234 5678"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Tipo de servicio
        </label>
        <select
          name="servicio"
          className="w-full rounded-lg border border-stone-2 bg-ivory px-4 py-2.5 text-graphite outline-none focus:border-gold"
          defaultValue="soldadura"
        >
          <option value="soldadura">Soldadura de precisión (pieza/cadena rota)</option>
          <option value="ajuste-agrandar">Ajuste de talla — agrandar</option>
          <option value="ajuste-achicar">Ajuste de talla — achicar</option>
          <option value="limpieza">Limpieza y pulido profesional</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Describe el problema
        </label>
        <textarea
          name="descripcion"
          rows={3}
          required
          placeholder="Ej. Se rompió el broche de mi cadena de oro…"
          className="w-full rounded-lg border border-stone-2 bg-ivory px-4 py-2.5 text-graphite outline-none focus:border-gold"
        />
      </div>

      {/* Carga de foto */}
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Foto de la pieza
        </label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stone-2 bg-ivory px-4 py-6 text-center text-sm text-graphite/70 transition-colors hover:border-gold"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Vista previa de la pieza"
              width={140}
              height={140}
              className="h-32 w-32 rounded-lg object-cover"
              unoptimized
            />
          ) : (
            <>
              <UploadCloud size={28} className="text-gold-deep" />
              <span>Toca para subir una foto (máx. {MAX_MB} MB)</span>
            </>
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          name="foto"
          accept="image/*"
          capture="environment"
          onChange={onFileChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-ink transition-colors hover:bg-gold-deep hover:text-ivory disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Enviando…
          </>
        ) : (
          "Enviar solicitud de cotización"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-stone-2 bg-ivory px-4 py-2.5 text-graphite outline-none focus:border-gold"
      />
    </div>
  );
}
