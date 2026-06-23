import { siteConfig, categories, getCategory } from "./site";

/**
 * Builder central de enlaces a WhatsApp (wa.me) con mensajes prellenados.
 * El "Cotizador" del sitio convierte por este canal: cada sección genera un
 * mensaje contextual distinto (requisito: botón de WhatsApp adaptativo).
 */

const BASE = `https://wa.me/${siteConfig.whatsapp}`;

/** Construye el href de WhatsApp con un mensaje ya codificado. */
export function whatsappHref(message: string): string {
  return `${BASE}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_MESSAGE = `Hola, me gustaría recibir información sobre las piezas de ${siteConfig.name}.`;

export interface QuoteContext {
  categorySlug?: string;
  subcategorySlug?: string;
  productName?: string;
  metal?: string;
  /** Texto de grabado elegido (esclavas con nombre). */
  engraving?: string;
}

/** Genera el mensaje de cotización según el contexto (producto/categoría). */
export function contextualMessage(ctx: QuoteContext = {}): string {
  const { categorySlug, subcategorySlug, productName, metal, engraving } = ctx;

  // Producto concreto → mensaje específico.
  if (productName) {
    let msg = `Hola, me interesa cotizar: *${productName}*`;
    if (metal) msg += ` (${metal})`;
    if (engraving) msg += `, con el grabado: "${engraving}"`;
    msg += ". ¿Me podrían dar más información?";
    return msg;
  }

  // Subcategoría → mensaje afinado.
  if (categorySlug) {
    const cat = getCategory(categorySlug);
    const sub = cat?.subcategories.find((s) => s.slug === subcategorySlug);
    if (sub) {
      return `Hola, me interesa cotizar ${article(sub.name)} *${sub.name}* (${cat?.name}). ¿Me podrían ayudar?`;
    }
    if (cat) {
      return `Hola, me interesa conocer su catálogo de *${cat.name}*. ¿Me podrían ayudar?`;
    }
  }

  return DEFAULT_MESSAGE;
}

/** Mensaje del botón flotante derivado de la ruta actual. */
export function messageForPathname(pathname: string): string {
  if (pathname === "/" || pathname === "") return DEFAULT_MESSAGE;
  if (pathname.startsWith("/taller")) {
    return "Hola, quiero cotizar mi reparación en el taller (compostura/ajuste de talla).";
  }
  if (pathname.startsWith("/contacto")) {
    return "Hola, me gustaría ponerme en contacto con Joyería Diamante.";
  }
  // /catalogo o /catalogo/<categoria>
  const match = pathname.match(/^\/catalogo\/?([^/?]+)?/);
  if (match) {
    const slug = match[1];
    if (slug && categories.some((c) => c.slug === slug)) {
      return contextualMessage({ categorySlug: slug });
    }
    return "Hola, estoy viendo su catálogo y me gustaría cotizar una pieza.";
  }
  return DEFAULT_MESSAGE;
}

/** Artículo gramatical simple para el mensaje ("un"/"una"). */
function article(name: string): string {
  return /^(esclava|pulsera|cadena|medalla)/i.test(name) ? "una" : "un";
}
