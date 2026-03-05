'use client';

import { useState, useEffect } from 'react';

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

const defaults: ContactData = {
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

export default function ContactInfoClient() {
  const [c, setC] = useState<ContactData>(defaults);

  useEffect(() => {
    const saved = localStorage.getItem('kic_contact');
    if (saved) {
      try { setC({ ...defaults, ...JSON.parse(saved) }); } catch {}
    }
  }, []);

  const phoneClean = c.phone.replace(/\s/g, '');
  const mapsQuery = encodeURIComponent(`${c.address}, ${c.city}`);

  return (
    <>
      {/* Coordonnées */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Nos Coordonnées</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Adresse</p>
              <p className="text-gray-600">{c.address}</p>
              <p className="text-gray-600">{c.city}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Téléphone</p>
              <a href={`tel:${phoneClean}`} className="text-primary-600 hover:underline">{c.phone}</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <a href={`mailto:${c.email}`} className="text-primary-600 hover:underline">{c.email}</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Horaires</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Lun - Ven : {c.hoursWeekdays}</p>
                <p>Samedi : {c.hoursSaturday}</p>
                <p>Dimanche : {c.hoursSunday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-64 relative">
          <iframe
            src={c.mapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation KIC-FORMATIONS"
            className="absolute inset-0"
          />
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-center text-sm text-primary-600 font-medium"
        >
          Ouvrir dans Google Maps →
        </a>
      </div>

      {/* CTA Rendez-vous */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-heading font-bold mb-2">Préférez un rendez-vous ?</h3>
        <p className="text-primary-100 mb-4 text-sm">
          Visitez nos locaux ou planifiez un entretien d&apos;orientation
        </p>
        <a
          href="/rendez-vous"
          className="block w-full text-center bg-white text-primary-600 hover:bg-gray-100 font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          Prendre rendez-vous
        </a>
      </div>

      {/* Réseaux sociaux */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Suivez-nous</h3>
        <div className="flex gap-3">
          {c.socialInstagram && (
            <a href={c.socialInstagram} target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-medium text-sm">Instagram</span>
            </a>
          )}
          {c.socialFacebook && (
            <a href={c.socialFacebook} target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-[#1877F2] hover:bg-[#166FE5] text-white p-4 rounded-lg flex items-center justify-center gap-2 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-medium text-sm">Facebook</span>
            </a>
          )}
          {c.socialLinkedin && (
            <a href={c.socialLinkedin} target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-[#0A66C2] hover:bg-[#095196] text-white p-4 rounded-lg flex items-center justify-center gap-2 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-medium text-sm">LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
