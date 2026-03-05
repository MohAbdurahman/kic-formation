import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Conseils, astuces et actualités pour réussir votre apprentissage. Actualités sur les langues, l\'informatique et le développement personnel.',
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
