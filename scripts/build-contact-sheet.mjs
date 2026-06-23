// Genera una hoja de contacto HTML (imágenes embebidas en base64) para revisar
// qué foto recibió cada producto. Salida: scripts/contact-sheet.html
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const imgDir = join(root, "public", "images", "products");
const products = JSON.parse(readFileSync(join(root, "data", "products.json"), "utf-8"));

// Veredicto curado tras inspección visual.
const VERDICT = {
  "anillo-compromiso-solitario-oro": ["ok", "Excelente"],
  "anillo-compromiso-pave-oro": ["ok", "Bien"],
  "anillo-promesa-trenzado-plata": ["ok", "Bien (anillo de plata)"],
  "anillo-promesa-infinito-oro": ["ok", "Bien (argollas entrelazadas)"],
  "pulsera-tipo-rolex-oro": ["warn", "Aceptable — tiene props (conchas)"],
  "pulsera-de-pulso-plata": ["ok", "Excelente"],
  "esclava-nombre-oro": ["warn", "Aceptable — en estuche, fondo cálido"],
  "esclava-nombre-plata": ["ok", "Excelente"],
  "esclava-diseno-grabado-oro": ["warn", "Aceptable — varias piezas"],
  "cadena-confirmacion-oro": ["warn", "Aceptable — dije dice 'mama'"],
  "cadena-xv-anos-oro": ["ok", "Bien"],
  "cadena-torzal-oro": ["ok", "Excelente (cadena torzal)"],
  "cadena-torzal-plata": ["ok", "Bien"],
  "cadena-italiana-oro": ["ok", "Excelente"],
  "cadena-italiana-plata": ["ok", "Bien"],
  "dije-cristo-oro": ["ok", "Bien (crucifijo dorado)"],
  "dije-san-benito-plata": ["warn", "Auténtica, pero fondo oscuro"],
  "dije-figura-personalizada-oro": ["ok", "Bien (dije de oro)"],
  "dije-santa-muerte-plata": ["pend", "Sube tu foto — sin stock"],
  "dije-santa-muerte-oro": ["pend", "Sube tu foto — sin stock"],
  "dije-san-judas-oro": ["pend", "Sube tu foto — sin stock"],
};

const COLORS = { ok: "#1f9d57", warn: "#c98a1b", pend: "#b3471f" };
const LABELS = { ok: "LISTA", warn: "ACEPTABLE", pend: "PENDIENTE" };

const cards = products
  .map((p) => {
    const [kind, note] = VERDICT[p.slug] ?? ["warn", "—"];
    const file = `photo-${p.slug}.jpg`;
    let media;
    if (existsSync(join(imgDir, file))) {
      const b64 = readFileSync(join(imgDir, file)).toString("base64");
      media = `<img src="data:image/jpeg;base64,${b64}" alt="${p.name}">`;
    } else {
      media = `<div class="ph">Placeholder SVG</div>`;
    }
    return `
    <figure class="card">
      <div class="imgwrap">${media}<span class="badge" style="background:${COLORS[kind]}">${LABELS[kind]}</span></div>
      <figcaption>
        <strong>${p.name}</strong>
        <span class="cat">${p.category} · ${p.metal}</span>
        <span class="note">${note}</span>
      </figcaption>
    </figure>`;
  })
  .join("");

const okCount = Object.values(VERDICT).filter((v) => v[0] === "ok").length;
const warnCount = Object.values(VERDICT).filter((v) => v[0] === "warn").length;
const pendCount = Object.values(VERDICT).filter((v) => v[0] === "pend").length;

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fotos de productos — Joyería Diamante</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:#f6f4ef; color:#1a1a1e; }
  header { padding: 28px 20px 8px; max-width:1100px; margin:0 auto; }
  h1 { font-family: Georgia, serif; font-size: 1.6rem; margin:0 0 6px; }
  p.sub { margin:0; color:#5b5b62; font-size:.92rem; }
  .legend { display:flex; gap:16px; flex-wrap:wrap; max-width:1100px; margin:14px auto 0; padding:0 20px; font-size:.82rem; }
  .legend span { display:inline-flex; align-items:center; gap:6px; }
  .dot { width:10px; height:10px; border-radius:50%; display:inline-block; }
  .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap:16px; max-width:1100px; margin:18px auto 40px; padding:0 20px; }
  .card { margin:0; background:#fff; border:1px solid #e6e2d8; border-radius:14px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.05); }
  .imgwrap { position:relative; aspect-ratio:1/1; background:#fafafa; display:flex; align-items:center; justify-content:center; }
  .imgwrap img { width:100%; height:100%; object-fit:cover; display:block; }
  .ph { color:#b3471f; font-size:.85rem; font-weight:600; }
  .badge { position:absolute; top:8px; left:8px; color:#fff; font-size:.62rem; font-weight:700; letter-spacing:.06em; padding:3px 8px; border-radius:999px; }
  figcaption { padding:10px 12px 14px; display:flex; flex-direction:column; gap:3px; }
  figcaption strong { font-size:.92rem; }
  .cat { font-size:.72rem; text-transform:uppercase; letter-spacing:.05em; color:#9a8f74; }
  .note { font-size:.8rem; color:#444; margin-top:2px; }
</style></head><body>
<header>
  <h1>Fotos de productos · Joyería Diamante</h1>
  <p class="sub">${products.length} productos · ${okCount} listas · ${warnCount} aceptables (puedes mejorarlas) · ${pendCount} pendientes de tu foto</p>
  <div class="legend">
    <span><i class="dot" style="background:${COLORS.ok}"></i> Lista — foto buena, fondo claro</span>
    <span><i class="dot" style="background:${COLORS.warn}"></i> Aceptable — sirve, pero puedes subir una mejor</span>
    <span><i class="dot" style="background:${COLORS.pend}"></i> Pendiente — no hay stock; sube la tuya en /admin</span>
  </div>
</header>
<div class="grid">${cards}</div>
</body></html>`;

const out = join(root, "scripts", "contact-sheet.html");
writeFileSync(out, html, "utf-8");
console.log("Escrito:", out, `(${(html.length / 1024).toFixed(0)} KB)`);
