import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import ContactInfoClient from '@/components/contact/ContactInfoClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez KIC-FORMATIONS pour toute question sur nos formations continues à Genève. Réponse sous 24h.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Une question sur nos formations ? Notre équipe vous répond sous 24h
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Formulaire - 60% */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Informations - 40% */}
            <div className="lg:col-span-2 space-y-6">
              <ContactInfoClient />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
