'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { getData } from '@/lib/db';

interface CalendarEvent {
  id: string;
  formationTitle: string;
  date: string;
  time: string;
  duration?: string;
  location: string;
  availableSeats: number;
  category: string;
}

export default function CalendrierPage() {
  const [sessions, setSessions] = useState<CalendarEvent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');

  useEffect(() => {
    getData<{ items: CalendarEvent[] }>('calendar', { items: [] }).then(data => {
      setSessions(data.items || []);
    });
  }, []);

  const categories = ['Toutes', 'Langues', 'Informatique', 'Accompagnement', 'Ateliers'];

  const filteredSessions = selectedCategory === 'Toutes'
    ? sessions
    : sessions.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Calendrier des Formations
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Consultez toutes nos sessions à venir et inscrivez-vous dès maintenant
          </p>
        </div>
      </section>

      {/* Filtres & Sessions */}
      <section className="section">
        <div className="container">
          {/* Filtres par catégorie */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">
                Filtrer par catégorie
              </h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              <strong>{filteredSessions.length}</strong> session(s) à venir
            </p>
          </div>

          {/* Liste des sessions */}
          <div className="space-y-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => {
                const availabilityColor =
                  session.availableSeats > 8 ? 'bg-green-500' :
                  session.availableSeats > 4 ? 'bg-orange-500' :
                  'bg-red-500';

                return (
                  <div key={session.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 bg-primary-50 rounded-lg p-4 text-center min-w-[80px]">
                            <div className="text-3xl font-bold text-primary-600">
                              {new Date(session.date).getDate()}
                            </div>
                            <div className="text-sm text-primary-600 uppercase font-medium">
                              {new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(new Date(session.date))}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">{session.category}</span>
                              <div className={`w-3 h-3 rounded-full ${availabilityColor}`}></div>
                            </div>
                            <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                              {session.formationTitle}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{session.time}{session.duration ? ` — ${session.duration}` : ''}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <span>{session.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{session.availableSeats} place(s) disponible(s)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-center lg:text-right">
                        <Button href="/contact" variant="primary" size="md">
                          S'inscrire
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Aucune session disponible</h3>
                <p className="text-gray-600 mb-6">Il n'y a pas de session pour cette catégorie actuellement</p>
                <Button href="/contact" variant="outline">Nous contacter</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Vous ne trouvez pas la session qui vous convient ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Contactez-nous pour planifier une session adaptée à vos besoins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg" className="!bg-white !text-primary-600 hover:!bg-gray-100">
              Nous contacter
            </Button>
            <Button href="/formations" variant="outline" size="lg" className="!bg-transparent !border-white !text-white hover:!bg-white hover:!text-primary-600">
              Voir toutes les formations
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
