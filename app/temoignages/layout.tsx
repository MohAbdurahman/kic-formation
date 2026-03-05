import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Témoignages',
  description: 'Découvrez les avis et témoignages de nos étudiants satisfaits. Note moyenne : 4.8/5.',
};

export default function TemoignagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
