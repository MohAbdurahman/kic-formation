import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue des Formations',
  description: 'Découvrez toutes nos formations continues à Genève : français, anglais, informatique, développement personnel. Inscriptions ouvertes.',
};

export default function FormationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
