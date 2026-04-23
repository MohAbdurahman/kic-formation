'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import { getData, saveKicData } from '@/lib/db';

interface FormationModule {
  title: string;
  content: string;
}

interface Formation {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  prerequisites: string;
  program: FormationModule[];
  level: string;
  modality: string;
  price: number;
  promoPrice?: number;
  duration: number;
  maxParticipants: number;
}

const defaultFormations: Formation[] = [
  {
    id: '1',
    slug: 'francais-a1-debutant',
    category: 'Langues',
    title: 'Français A1 - Débutant',
    shortDescription: 'Apprenez les bases du français pour communiquer dans la vie quotidienne',
    fullDescription: 'Cette formation de français niveau A1 est idéale pour les débutants complets.',
    objectives: ['Comprendre et utiliser des expressions familières', 'Se présenter et présenter les autres'],
    prerequisites: 'Aucun prérequis',
    program: [{ title: 'Module 1', content: 'Se présenter' }],
    level: 'A1',
    modality: 'Présentiel',
    price: 850,
    promoPrice: 720,
    duration: 40,
    maxParticipants: 12,
  },
  {
    id: '2',
    slug: 'bureautique-ecdl',
    category: 'Informatique',
    title: 'Bureautique ECDL',
    shortDescription: 'Maîtrisez Word, Excel, PowerPoint avec certification',
    fullDescription: 'Formation complète à la bureautique avec certification ECDL.',
    objectives: ['Maîtriser Word', 'Maîtriser Excel', 'Maîtriser PowerPoint'],
    prerequisites: 'Connaissances de base en informatique',
    program: [{ title: 'Word', content: 'Traitement de texte' }],
    level: 'Intermédiaire',
    modality: 'Hybride',
    price: 950,
    promoPrice: 850,
    duration: 50,
    maxParticipants: 10,
  },
];

export default function AdminFormationsPage() {
  const searchParams = useSearchParams();
  const [formations, setFormations] = useState<Formation[]>(defaultFormations);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [filter, setFilter] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    getData<{ items: Formation[] }>('formations', { items: defaultFormations }).then(data => {
      setFormations(data.items || defaultFormations);
    });
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      addFormation();
    }
  }, [searchParams]);

  const generateId = () => Math.random().toString(36).substr(2, 9);
  const generateSlug = (title: string) => title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const saveData = async () => {
    setIsSaving(true);
    try {
      await saveKicData('formations', { items: formations });
      setSaveMessage('Formations enregistrées !');
    } catch {
      setSaveMessage('Erreur lors de la sauvegarde');
    }
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const addFormation = () => {
    setEditingFormation({
      id: generateId(),
      slug: '',
      category: 'Langues',
      title: '',
      shortDescription: '',
      fullDescription: '',
      objectives: [''],
      prerequisites: '',
      program: [{ title: '', content: '' }],
      level: 'A1',
      modality: 'Présentiel',
      price: 0,
      duration: 0,
      maxParticipants: 10,
    });
  };

  const saveFormation = () => {
    if (!editingFormation) return;
    editingFormation.slug = generateSlug(editingFormation.title);
    const exists = formations.find(f => f.id === editingFormation.id);
    if (exists) {
      setFormations(formations.map(f => f.id === editingFormation.id ? editingFormation : f));
    } else {
      setFormations([...formations, editingFormation]);
    }
    setEditingFormation(null);
  };

  const deleteFormation = (id: string) => {
    if (confirm('Supprimer cette formation ?')) {
      setFormations(formations.filter(f => f.id !== id));
    }
  };

  const filteredFormations = formations.filter(f =>
    f.title.toLowerCase().includes(filter.toLowerCase()) ||
    f.category.toLowerCase().includes(filter.toLowerCase())
  );

  const categories = ['Langues', 'Informatique', 'Accompagnement', 'Ateliers'];
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'Débutant', 'Intermédiaire', 'Avancé'];
  const modalities = ['Présentiel', 'En ligne', 'Hybride'];

  return (
    <AdminPageWrapper title="Formations" subtitle="Gérez vos formations et leurs contenus">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher une formation..."
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
            onClick={addFormation}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle formation
          </button>
        </div>
      </div>

      {/* Liste des formations */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Formation</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Catégorie</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Niveau</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Prix</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Durée</th>
              <th className="text-right py-4 px-6 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredFormations.map((formation) => (
              <tr key={formation.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{formation.title}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{formation.shortDescription}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {formation.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">{formation.level}</td>
                <td className="py-4 px-6">
                  {formation.promoPrice ? (
                    <div>
                      <span className="font-medium text-gray-900">CHF {formation.promoPrice}.-</span>
                      <span className="text-sm text-gray-400 line-through ml-2">CHF {formation.price}.-</span>
                    </div>
                  ) : (
                    <span className="font-medium text-gray-900">CHF {formation.price}.-</span>
                  )}
                </td>
                <td className="py-4 px-6 text-gray-600">{formation.duration}h</td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingFormation(formation)}
                      className="p-2 text-[#25318D] hover:bg-[#25318D]/10 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteFormation(formation.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFormations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p>Aucune formation trouvée</p>
          </div>
        )}
      </div>

      {/* Modal Formation */}
      {editingFormation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {formations.find(f => f.id === editingFormation.id) ? 'Modifier' : 'Nouvelle'} formation
              </h3>
              <button onClick={() => setEditingFormation(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Infos de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    type="text"
                    value={editingFormation.title}
                    onChange={(e) => setEditingFormation({ ...editingFormation, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Ex: Français A1 - Débutant"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={editingFormation.category}
                    onChange={(e) => setEditingFormation({ ...editingFormation, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <select
                    value={editingFormation.level}
                    onChange={(e) => setEditingFormation({ ...editingFormation, level: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description courte</label>
                <input
                  type="text"
                  value={editingFormation.shortDescription}
                  onChange={(e) => setEditingFormation({ ...editingFormation, shortDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description complète</label>
                <textarea
                  value={editingFormation.fullDescription}
                  onChange={(e) => setEditingFormation({ ...editingFormation, fullDescription: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Détails pratiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modalité</label>
                  <select
                    value={editingFormation.modality}
                    onChange={(e) => setEditingFormation({ ...editingFormation, modality: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {modalities.map(mod => <option key={mod} value={mod}>{mod}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée (h)</label>
                  <input
                    type="number"
                    value={editingFormation.duration}
                    onChange={(e) => setEditingFormation({ ...editingFormation, duration: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (CHF)</label>
                  <input
                    type="number"
                    value={editingFormation.price}
                    onChange={(e) => setEditingFormation({ ...editingFormation, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix promo</label>
                  <input
                    type="number"
                    value={editingFormation.promoPrice || ''}
                    onChange={(e) => setEditingFormation({ ...editingFormation, promoPrice: parseInt(e.target.value) || undefined })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Optionnel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max participants</label>
                <input
                  type="number"
                  value={editingFormation.maxParticipants}
                  onChange={(e) => setEditingFormation({ ...editingFormation, maxParticipants: parseInt(e.target.value) || 0 })}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Prérequis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prérequis</label>
                <textarea
                  value={editingFormation.prerequisites}
                  onChange={(e) => setEditingFormation({ ...editingFormation, prerequisites: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Objectifs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objectifs (un par ligne)</label>
                <textarea
                  value={editingFormation.objectives.join('\n')}
                  onChange={(e) => setEditingFormation({ ...editingFormation, objectives: e.target.value.split('\n').filter(o => o.trim()) })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Objectif 1&#10;Objectif 2&#10;Objectif 3"
                />
              </div>

              {/* Programme */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Programme</label>
                  <button
                    onClick={() => setEditingFormation({
                      ...editingFormation,
                      program: [...editingFormation.program, { title: '', content: '' }]
                    })}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    + Ajouter un module
                  </button>
                </div>
                <div className="space-y-3">
                  {editingFormation.program.map((module, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => {
                            const newProgram = [...editingFormation.program];
                            newProgram[index].title = e.target.value;
                            setEditingFormation({ ...editingFormation, program: newProgram });
                          }}
                          placeholder="Titre du module"
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                        <input
                          type="text"
                          value={module.content}
                          onChange={(e) => {
                            const newProgram = [...editingFormation.program];
                            newProgram[index].content = e.target.value;
                            setEditingFormation({ ...editingFormation, program: newProgram });
                          }}
                          placeholder="Contenu"
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newProgram = editingFormation.program.filter((_, i) => i !== index);
                          setEditingFormation({ ...editingFormation, program: newProgram });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-4">
              <button
                onClick={() => setEditingFormation(null)}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={saveFormation}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
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
