import { siteConfig } from "@/lib/site";

/**
 * Mapa embebido de Google Maps. Usa la API key si está configurada
 * (Maps Embed API); de lo contrario recurre al embed clásico sin key.
 */
export function MapEmbed() {
  const { mapsApiKey, mapsQuery, name } = siteConfig;
  const src = mapsApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${mapsQuery}`
    : `https://maps.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <iframe
      title={`Ubicación de ${name}`}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="h-full min-h-[320px] w-full rounded-2xl border border-stone-1"
    />
  );
}
