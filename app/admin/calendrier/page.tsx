'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import { getData, saveKicData } from '@/lib/db';

interface CalendarEvent {
  id: string;
  formationTitle: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  availableSeats: number;
  category: string;
}

const defaultEvents: CalendarEvent[] = [];

export default function AdminCalendrierPage() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<CalendarEvent[]>(defaultEvents);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [filter, setFilter] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    getData<{ items: CalendarEvent[] }>('calendar', { items: [] }).then(data => {
      setEvents(data.items || []);
    });
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      addEvent();
    }
  }, [searchParams]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const saveData = async () => {
    setIsSaving(true);
    try {
      await saveKicData('calendar', { items: events });
      setSaveMessage('Calendrier enregistré !');
    } catch {
      setSaveMessage('Erreur lors de la sauvegarde');
    }
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const addEvent = () => {
    setEditingEvent({
      id: generateId(),
      formationTitle: '',
      date: '',
      time: '',
      duration: '',
      location: 'Genève - Rue des Pâquis 11',
      availableSeats: 10,
      category: 'Langues',
    });
  };

  const saveEvent = () => {
    if (!editingEvent) return;
    const exists = events.find(e => e.id === editingEvent.id);
    if (exists) {
      setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
    } else {
      setEvents([...events, editingEvent]);
    }
    setEditingEvent(null);
  };

  const deleteEvent = (id: string) => {
    if (confirm('Supprimer cet événement ?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const filteredEvents = events.filter(e =>
    e.formationTitle.toLowerCase().includes(filter.toLowerCase()) ||
    e.category.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedEvents = [...filteredEvents].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-CH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const categories = ['Langues', 'Informatique', 'Accompagnement', 'Ateliers'];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Langues': return 'bg-[#FF4040]/15 text-[#FF4040]';
      case 'Informatique': return 'bg-[#F0E815]/20 text-[#a8a200]';
      case 'Accompagnement': return 'bg-[#BF5EDC]/15 text-[#BF5EDC]';
      case 'Ateliers': return 'bg-[#61CB80]/20 text-[#2a9e54]';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminPageWrapper title="Calendrier" subtitle="Gérez les sessions de formation">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher une session..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          {saveMessage && (
            <span className="text-green-600 font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {saveMessage}
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={saveData}
            disabled={isSaving}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            Sauvegarder
          </button>
          <button
            onClick={addEvent}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle session
          </button>
        </div>
      </div>

      {/* Liste des événements */}
      <div className="space-y-4">
        {sortedEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {/* Date */}
                <div className="text-center min-w-[80px]">
                  <div className="text-3xl font-bold text-primary-600">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-sm text-gray-500 uppercase">
                    {new Date(event.date).toLocaleDateString('fr-CH', { month: 'short' })}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(event.date).getFullYear()}
                  </div>
                </div>

                {/* Détails */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{event.formationTitle}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.availableSeats} places
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingEvent(event)}
                  className="p-2 text-[#25318D] hover:bg-[#25318D]/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {sortedEvents.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Aucune session programmée</p>
          </div>
        )}
      </div>

      {/* Modal Event */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {events.find(e => e.id === editingEvent.id) ? 'Modifier' : 'Nouvelle'} session
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Formation</label>
                <input
                  type="text"
                  value={editingEvent.formationTitle}
                  onChange={(e) => setEditingEvent({ ...editingEvent, formationTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: Français A1 - Débutant"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horaire</label>
                  <input
                    type="text"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    placeholder="18h00-20h00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée totale</label>
                  <input
                    type="text"
                    value={editingEvent.duration}
                    onChange={(e) => setEditingEvent({ ...editingEvent, duration: e.target.value })}
                    placeholder="40h"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                <input
                  type="text"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Places disponibles</label>
                <input
                  type="number"
                  value={editingEvent.availableSeats}
                  onChange={(e) => setEditingEvent({ ...editingEvent, availableSeats: parseInt(e.target.value) || 0 })}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={saveEvent}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminPageWrapper>
  );
}
