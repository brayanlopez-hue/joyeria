export const metadata = { title: "Admin — Joyería Diamante", robots: "noindex" };

// Layout mínimo: login vive aquí sin auth check.
// Las páginas protegidas usan app/admin/(dashboard)/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
