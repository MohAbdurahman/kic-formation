import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendrier des Formations',
  description: 'Consultez le calendrier de toutes nos sessions de formation à venir à Genève. Inscrivez-vous en ligne facilement.',
};

export default function CalendrierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
