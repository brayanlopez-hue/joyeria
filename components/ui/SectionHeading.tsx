import type { ReactNode } from "react";

/** Encabezado de sección con epígrafe, título serif y filete dorado. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
          {eyebrow}
        </span>
      )}
      <As className="font-display text-3xl text-ink sm:text-4xl">{title}</As>
      <span className={`gold-rule my-5 ${align === "center" ? "" : "ml-0"}`} />
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-graphite/80">
          {description}
        </p>
      )}
    </div>
  );
}
