import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <p className="font-display text-7xl text-gold-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl text-ink">
        No encontramos esta página
      </h1>
      <p className="mt-2 max-w-md text-graphite/75">
        Es posible que el enlace haya cambiado o la pieza ya no esté disponible.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/catalogo" variant="outline">
          Ver catálogo
        </ButtonLink>
      </div>
    </Container>
  );
}
