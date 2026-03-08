'use client';

import { useState, useEffect } from 'react';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';

interface ContactData {
  address: string;
  city: string;
  phone: string;
  email: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  hoursSunday: string;
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedin: string;
  mapsUrl: string;
}

export const defaultContactData: ContactData = {
  address: 'Rue des Pâquis 11',
  city: '1201 Genève, Suisse',
  phone: '+41 77 211 23 23',
  email: 'info@kic-formations.ch',
  hoursWeekdays: '9h00 - 18h00',
  hoursSaturday: '9h00 - 12h00',
  hoursSunday: 'Fermé',
  socialInstagram: 'https://instagram.com/kic-formations',
  socialFacebook: 'https://facebook.com/kic-formations',
  socialLinkedin: 'https://linkedin.com/company/kic-formations',
  mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.073927647955!2d6.143258776753395!3d46.20858788376895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c652f1c3b2fd9%3A0x5f8c7f3a8b4c1234!2sRue%20des%20P%C3%A2quis%2011%2C%201201%20Gen%C3%A8ve%2C%20Suisse!5e0!3m2!1sfr!2sch!4v1706000000000!5m2!1sfr!2sch',
};

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData>(defaultContactData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kic_contact');
    if (saved) {
      try { setData({ ...defaultContactData, ...JSON.parse(saved) }); } catch {}
    }
  }, []);

  const saveData = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 500));
    localStorage.setItem('kic_contact', JSON.stringify(data));
    setSaveMessage('Coordonnées enregistrées !');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const cls = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent';

  return (
    <AdminPageWrapper title="Contact & Coordonnées" subtitle="Gérez les informations affichées sur la page Contact">
      {/* Barre sauvegarde */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {saveMessage && (
            <span className="text-green-600 font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {saveMessage}
            </span>
          )}
        </div>
        <button
          onClick={saveData}
          disabled={isSaving}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? (
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          Enregistrer les modifications
        </button>
      </div>

      <div className="space-y-6">
        {/* Adresse */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            Adresse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rue / Numéro</label>
              <input type="text" value={data.address} onChange={e => setData({ ...data, address: e.target.value })} className={cls} placeholder="Rue des Pâquis 11" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code postal & Ville</label>
              <input type="text" value={data.city} onChange={e => setData({ ...data, city: e.target.value })} className={cls} placeholder="1201 Genève, Suisse" />
            </div>
          </div>
        </div>

        {/* Téléphone & Email */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            Téléphone & Email
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input type="tel" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} className={cls} placeholder="+41 77 211 23 23" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className={cls} placeholder="info@kic-formations.ch" />
            </div>
          </div>
        </div>

        {/* Horaires */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Horaires d'ouverture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lundi – Vendredi</label>
              <input type="text" value={data.hoursWeekdays} onChange={e => setData({ ...data, hoursWeekdays: e.target.value })} className={cls} placeholder="9h00 - 18h00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Samedi</label>
              <input type="text" value={data.hoursSaturday} onChange={e => setData({ ...data, hoursSaturday: e.target.value })} className={cls} placeholder="9h00 - 12h00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimanche</label>
              <input type="text" value={data.hoursSunday} onChange={e => setData({ ...data, hoursSunday: e.target.value })} className={cls} placeholder="Fermé" />
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </span>
            Réseaux Sociaux
          </h2>
          <div className="space-y-4">
            {[
              { key: 'socialInstagram', label: 'Instagram', bg: 'from-purple-500 to-pink-500', isBg: true, path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              { key: 'socialFacebook', label: 'Facebook', bg: '#1877F2', isBg: false, path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { key: 'socialLinkedin', label: 'LinkedIn', bg: '#0A66C2', isBg: false, path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
            ].map(({ key, label, bg, isBg, path }) => (
              <div key={key} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isBg ? `bg-gradient-to-br ${bg}` : ''}`}
                  style={!isBg ? { backgroundColor: bg } : {}}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">{label}</label>
                  <input
                    type="url"
                    value={(data as unknown as Record<string, string>)[key]}
                    onChange={e => setData({ ...data, [key]: e.target.value })}
                    className={cls}
                    placeholder={`https://${label.toLowerCase()}.com/...`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Maps URL */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </span>
            URL Google Maps (iframe)
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Google Maps → Partager → Intégrer une carte → copier l'URL du champ <code className="bg-gray-100 px-1 rounded text-xs">src</code>
          </p>
          <input
            type="url"
            value={data.mapsUrl}
            onChange={e => setData({ ...data, mapsUrl: e.target.value })}
            className={`${cls} font-mono text-sm`}
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
        </div>
      </div>
    </AdminPageWrapper>
  );
}
