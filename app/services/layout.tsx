import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services',
  description: 'Découvrez tous nos services de formation : langues (français, anglais), informatique, accompagnement personnalisé et ateliers de développement personnel à Genève.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
