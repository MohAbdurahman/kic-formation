import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Questions Fréquentes',
  description: 'Trouvez rapidement les réponses à vos questions sur nos formations, inscriptions, tarifs et modalités pratiques.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
