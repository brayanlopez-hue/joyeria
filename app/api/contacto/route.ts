import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

/** Recibe el formulario de contacto y lo envía por email. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nombre = String(body.nombre ?? "").trim();
    const email = String(body.email ?? "").trim();
    const telefono = String(body.telefono ?? "").trim();
    const mensaje = String(body.mensaje ?? "").trim();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
    }

    const html = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(telefono) || "—"}</p>
      <p><strong>Mensaje:</strong><br/>${escapeHtml(mensaje)}</p>
    `;

    await sendMail({
      subject: `Contacto web — ${nombre}`,
      html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contacto]", err);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 500 },
    );
  }
}
