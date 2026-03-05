import type { Metadata } from 'next';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';

export const metadata: Metadata = {
  title: 'Administration - KIC-FORMATIONS',
  description: 'Panel d\'administration KIC-FORMATIONS',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  );
}
