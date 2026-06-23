#!/usr/bin/env bash
# Descarga + valida fotos de producto (fondo blanco, licencia comercial libre).
# Deduplica: ningún producto reutiliza una foto ya asignada a otro.
set -u

DEST="C:/Users/braya/joyeria/public/images/products"
TMP="$(mktemp -d)"
declare -A CLAIMED   # url -> 1 si ya fue usada por un producto previo
MANIFEST="C:/Users/braya/joyeria/scripts/photo-manifest.txt"
: > "$MANIFEST"

# Validación de un archivo de imagen descargado.
valid_image() {
  local f="$1"
  [ -s "$f" ] || return 1
  local mt; mt=$(file --mime-type -b "$f")
  case "$mt" in
    image/jpeg|image/png) ;;
    *) return 1 ;;
  esac
  local bytes; bytes=$(stat -c%s "$f")
  [ "$bytes" -ge 10000 ] || return 1
  [ "$bytes" -le 8000000 ] || return 1
  # Dimensiones: tomar el último patrón NxN o "N x N" de `file`.
  local dims w h
  dims=$(file "$f" | grep -oE '[0-9]+ ?x ?[0-9]+' | tail -1 | tr -d ' ')
  [ -n "$dims" ] || return 1
  w=${dims%x*}; h=${dims#*x}
  [ "$w" -ge 400 ] || return 1
  [ "$h" -ge 400 ] || return 1
  return 0
}

# try_product <slug> <url1> <url2> ...
try_product() {
  local slug="$1"; shift
  local url ok=0
  for url in "$@"; do
    if [ "${CLAIMED[$url]:-}" = "1" ]; then
      continue  # ya usada por otro producto -> mantener distinción
    fi
    local tmpf="$TMP/$slug.bin"
    local code
    code=$(curl --ssl-no-revoke -L -s --max-time 35 \
      -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" \
      -o "$tmpf" -w "%{http_code}" "$url" 2>/dev/null)
    if [ "$code" = "200" ] && valid_image "$tmpf"; then
      cp "$tmpf" "$DEST/photo-$slug.jpg"
      CLAIMED[$url]=1
      local dims; dims=$(file "$DEST/photo-$slug.jpg" | grep -oE '[0-9]+ ?x ?[0-9]+' | tail -1 | tr -d ' ')
      echo "OK   $slug  ($dims)  $url" | tee -a "$MANIFEST"
      ok=1
      break
    else
      echo "skip $slug  http=$code  $url" >> "$MANIFEST"
    fi
  done
  if [ "$ok" = "0" ]; then
    echo "FAIL $slug  (sin candidato válido)" | tee -a "$MANIFEST"
  fi
}

# ── Asignación curada (primario = elección anti-duplicados) ──────────────
try_product anillo-compromiso-solitario-oro \
  "https://images.pexels.com/photos/14466162/pexels-photo-14466162.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.unsplash.com/photo-1514612497953-05d1e5e171fa?w=900&q=80&auto=format&fit=crop"

try_product anillo-compromiso-pave-oro \
  "https://images.unsplash.com/photo-1595321398361-a96bfd6a5d7f?w=900&q=80&auto=format&fit=crop" \
  "https://images.pexels.com/photos/12194367/pexels-photo-12194367.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product anillo-promesa-trenzado-plata \
  "https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=900&q=80&auto=format&fit=crop" \
  "https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product anillo-promesa-infinito-oro \
  "https://images.unsplash.com/photo-1602751584581-2e0372975b46?w=900&q=80&auto=format&fit=crop" \
  "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=900&q=80&auto=format&fit=crop"

try_product pulsera-tipo-rolex-oro \
  "https://images.unsplash.com/photo-1684616289712-dd118c126fae?w=900&q=80&auto=format&fit=crop" \
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=80&auto=format&fit=crop"

try_product pulsera-de-pulso-plata \
  "https://images.unsplash.com/photo-1679973299719-7b17cf739a6e?w=900&q=80&auto=format&fit=crop" \
  "https://images.unsplash.com/photo-1748017554732-025f961fcd60?w=900&q=80&auto=format&fit=crop"

try_product esclava-nombre-oro \
  "https://images.pexels.com/photos/28933801/pexels-photo-28933801.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.pexels.com/photos/28933800/pexels-photo-28933800.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product esclava-nombre-plata \
  "https://images.unsplash.com/photo-1681091639085-c6d0f85e39a3?w=900&q=80&auto=format&fit=crop" \
  "https://images.unsplash.com/photo-1640774011898-2b42eb0e81d8?w=900&q=80&auto=format&fit=crop"

try_product esclava-diseno-grabado-oro \
  "https://images.pexels.com/photos/37401774/pexels-photo-37401774.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.pexels.com/photos/11476471/pexels-photo-11476471.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product cadena-confirmacion-oro \
  "https://images.unsplash.com/photo-1611012525567-90be7e060d92?w=900&q=80&auto=format&fit=crop" \
  "https://images.pexels.com/photos/10581731/pexels-photo-10581731.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product cadena-xv-anos-oro \
  "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=900&q=80&auto=format&fit=crop" \
  "https://images.pexels.com/photos/10581731/pexels-photo-10581731.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product cadena-torzal-oro \
  "https://images.pexels.com/photos/14111396/pexels-photo-14111396.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.pexels.com/photos/10581731/pexels-photo-10581731.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product cadena-torzal-plata \
  "https://images.unsplash.com/photo-1611851326061-c2f271bb3d91?w=900&q=80&auto=format&fit=crop" \
  "https://images.pexels.com/photos/16124724/pexels-photo-16124724.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product cadena-italiana-oro \
  "https://images.pexels.com/photos/14111400/pexels-photo-14111400.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.pexels.com/photos/8105125/pexels-photo-8105125.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product cadena-italiana-plata \
  "https://images.pexels.com/photos/16124724/pexels-photo-16124724.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.pexels.com/photos/16109322/pexels-photo-16109322.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.pexels.com/photos/16109320/pexels-photo-16109320.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product dije-cristo-oro \
  "https://images.pexels.com/photos/4202954/pexels-photo-4202954.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product dije-san-judas-oro \
  "https://images.pexels.com/photos/19025993/pexels-photo-19025993.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.pexels.com/photos/4070997/pexels-photo-4070997.jpeg?auto=compress&cs=tinysrgb&w=900" \
  "https://images.pexels.com/photos/735276/pexels-photo-735276.jpeg?auto=compress&cs=tinysrgb&w=900"

try_product dije-san-benito-plata \
  "https://cdn.pixabay.com/photo/2020/08/07/15/44/medal-5470952_1280.jpg" \
  "https://cdn.pixabay.com/photo/2013/11/22/23/27/medallion-216043_640.jpg"

try_product dije-figura-personalizada-oro \
  "https://images.unsplash.com/photo-1605201206717-cb9eca0d2eb2?w=900&q=80&auto=format&fit=crop" \
  "https://images.unsplash.com/photo-1620135104013-1abdff4b1ca7?w=900&q=80&auto=format&fit=crop"

echo ""
echo "=== RESUMEN ==="
grep -c '^OK ' "$MANIFEST" | xargs echo "Exitosas:"
grep -c '^FAIL' "$MANIFEST" | xargs echo "Fallidas:"
rm -rf "$TMP"
