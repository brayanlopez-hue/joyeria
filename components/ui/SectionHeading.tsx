import type { ReactNode } from "react";

/** Encabezado de sección con epígrafe, título serif y filete dorado. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: As = "h2",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  light?: boolean;
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
          {eyebrow}
        </span>
      )}
      <As className={`font-display text-3xl sm:text-4xl ${light ? "text-ivory" : "text-ink"}`}>{title}</As>
      <span className={`gold-rule my-5 ${align === "center" ? "" : "ml-0"}`} />
      {description && (
        <p className={`max-w-2xl text-base leading-relaxed ${light ? "text-stone-2" : "text-graphite/80"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
