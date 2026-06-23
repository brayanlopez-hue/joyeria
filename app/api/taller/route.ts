import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

const SERVICIOS: Record<string, string> = {
  soldadura: "Soldadura de precisión (pieza/cadena rota)",
  "ajuste-agrandar": "Ajuste de talla — agrandar",
  "ajuste-achicar": "Ajuste de talla — achicar",
  limpieza: "Limpieza y pulido profesional",
  otro: "Otro",
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

/** Recibe la solicitud de compostura (incluida la foto) y la envía por email. */
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const nombre = String(form.get("nombre") ?? "").trim();
    const telefono = String(form.get("telefono") ?? "").trim();
    const servicioKey = String(form.get("servicio") ?? "otro");
    const descripcion = String(form.get("descripcion") ?? "").trim();

    if (!nombre || !telefono || !descripcion) {
      return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
    }

    const servicio = SERVICIOS[servicioKey] ?? servicioKey;

    // Adjuntar la foto si viene en el formulario.
    const attachments = [];
    const foto = form.get("foto");
    if (foto instanceof File && foto.size > 0) {
      if (foto.size > MAX_BYTES) {
        return NextResponse.json({ error: "La imagen es demasiado grande." }, { status: 400 });
      }
      const buffer = Buffer.from(await foto.arrayBuffer());
      attachments.push({ filename: foto.name || "pieza.jpg", content: buffer });
    }

    const html = `
      <h2>Nueva solicitud de compostura</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Teléfono/WhatsApp:</strong> ${escapeHtml(telefono)}</p>
      <p><strong>Servicio:</strong> ${escapeHtml(servicio)}</p>
      <p><strong>Descripción:</strong><br/>${escapeHtml(descripcion)}</p>
      <p>${attachments.length ? "Foto adjunta." : "Sin foto adjunta."}</p>
    `;

    await sendMail({
      subject: `Compostura: ${servicio} — ${nombre}`,
      html,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/taller]", err);
    return NextResponse.json(
      { error: "No se pudo procesar la solicitud." },
      { status: 500 },
    );
  }
}
