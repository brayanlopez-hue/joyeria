// Genera public/images/og-image.jpg (1200x630) para vista previa al
// compartir el sitio en WhatsApp/redes. Usa sharp (ya incluido con Next).
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const photoPath = join(root, "public", "images", "products", "photo-anillo-compromiso-solitario-oro.jpg");
const photoB64 = readFileSync(photoPath).toString("base64");

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#141416"/>
      <stop offset="1" stop-color="#0e0e10"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.32" cy="0.5" r="0.7">
      <stop offset="0" stop-color="#c9a24b" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#c9a24b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldtxt" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e3c77e"/>
      <stop offset="1" stop-color="#a07e2e"/>
    </linearGradient>
    <pattern id="lattice" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M28 0L56 28L28 56L0 28Z" fill="none" stroke="#c9a24b" stroke-opacity="0.10"/>
    </pattern>
    <clipPath id="photoClip">
      <circle cx="905" cy="315" r="225"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#lattice)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Foto del anillo en círculo con aro dorado -->
  <image href="data:image/jpeg;base64,${photoB64}" x="680" y="90" width="450" height="450"
         clip-path="url(#photoClip)" preserveAspectRatio="xMidYMid slice"/>
  <circle cx="905" cy="315" r="225" fill="none" stroke="url(#goldtxt)" stroke-width="4"/>
  <circle cx="905" cy="315" r="238" fill="none" stroke="#c9a24b" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Texto -->
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="80" y="180" font-size="30" letter-spacing="10" fill="#e3c77e">JOYERÍA</text>
    <text x="76" y="278" font-size="88" fill="#faf8f3">Diamante</text>
    <text x="76" y="380" font-size="88" font-style="italic" fill="url(#goldtxt)">López</text>
  </g>
  <rect x="80" y="425" width="120" height="2" fill="url(#goldtxt)"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="80" y="480" font-size="30" fill="#cfc8bb">Piezas únicas en oro y plata</text>
    <text x="80" y="522" font-size="30" fill="#cfc8bb">hechas a tu medida</text>
  </g>
  <g font-family="Arial, sans-serif">
    <text x="80" y="578" font-size="22" letter-spacing="3" fill="#8d8d86">CENTRO HISTÓRICO · CDMX · COTIZA POR WHATSAPP</text>
  </g>

  <!-- Rombos decorativos -->
  <rect x="46" y="171" width="10" height="10" fill="#c9a24b" transform="rotate(45 51 176)"/>
</svg>`;

const out = join(root, "public", "images", "og-image.jpg");
const buf = await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer();
writeFileSync(out, buf);
console.log("OG image:", out, `${(buf.length / 1024).toFixed(0)} KB`);
