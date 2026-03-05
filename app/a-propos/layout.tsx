import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qui sommes-nous ?',
  description: 'Découvrez KIC-FORMATIONS, centre de formation continue à Genève depuis 2010. Notre histoire, nos valeurs, notre équipe.',
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
