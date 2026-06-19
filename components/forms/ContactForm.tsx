"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

/** Formulario de contacto estándar. Envía a /api/contacto (email vía Resend). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
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
        <h3 className="mt-3 font-display text-2xl text-ink">¡Mensaje enviado!</h3>
        <p className="mt-2 text-graphite/80">
          Gracias por escribirnos. Te responderemos muy pronto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-stone-1 bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Nombre</label>
          <input
            name="nombre"
            required
            placeholder="Tu nombre"
            className="w-full rounded-lg border border-stone-2 bg-ivory px-4 py-2.5 text-graphite outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Teléfono
          </label>
          <input
            name="telefono"
            type="tel"
            placeholder="55 1234 5678"
            className="w-full rounded-lg border border-stone-2 bg-ivory px-4 py-2.5 text-graphite outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="tucorreo@ejemplo.com"
          className="w-full rounded-lg border border-stone-2 bg-ivory px-4 py-2.5 text-graphite outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Mensaje</label>
        <textarea
          name="mensaje"
          rows={4}
          required
          placeholder="¿En qué podemos ayudarte?"
          className="w-full rounded-lg border border-stone-2 bg-ivory px-4 py-2.5 text-graphite outline-none focus:border-gold"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-ivory transition-colors hover:bg-graphite disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Enviando…
          </>
        ) : (
          "Enviar mensaje"
        )}
      </button>
    </form>
  );
}
