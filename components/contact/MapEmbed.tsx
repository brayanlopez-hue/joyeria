import { MapPin, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Mapa embebido de Google Maps.
 * Con API key usa Maps Embed API; sin key usa embed clásico + enlace de fallback.
 */
export function MapEmbed() {
  const { mapsApiKey, mapsQuery, name, address } = siteConfig;

  const src = mapsApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${encodeURIComponent(address)}`
    : `https://maps.google.com/maps?q=${mapsQuery}&t=m&z=16&output=embed`;

  const mapsLink = `https://maps.google.com/maps?q=${mapsQuery}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-1 bg-cream/40">
      <iframe
        title={`Ubicación de ${name}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-[300px] w-full"
      />
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-start gap-2 text-sm text-graphite">
          <MapPin size={15} className="mt-0.5 shrink-0 text-gold-deep" />
          <span>{address}</span>
        </div>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1.5 text-xs font-medium text-gold-deep transition-colors hover:bg-gold/8 hover:border-gold"
        >
          Cómo llegar
          <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}
