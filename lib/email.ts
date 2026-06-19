import "server-only";
import { Resend } from "resend";
import { siteConfig } from "./site";

/**
 * Envío de correo con Resend. Degradación elegante: si no hay RESEND_API_KEY
 * (p.ej. en desarrollo), no falla — registra el contenido en consola y reporta
 * `delivered: false` para que la UX del formulario siga funcionando.
 */

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? "Joyería Diamante <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

export interface MailAttachment {
  filename: string;
  content: Buffer;
}

export async function sendMail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}): Promise<{ delivered: boolean }> {
  if (!resend) {
    console.info(
      `[email] RESEND_API_KEY no configurado — correo simulado.\n  Para: ${TO}\n  Asunto: ${opts.subject}`,
    );
    return { delivered: false };
  }

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
    attachments: opts.attachments,
  });
  return { delivered: true };
}
