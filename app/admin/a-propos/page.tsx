'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import { getData, saveKicData } from '@/lib/db';

interface Value {
  id: string;
  title: string;
  description: string;
  iconType: string;
  color: string;
}

interface Stat {
  id: string;
  value: string;
  label: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  gradient: string;
}

interface LocalPhoto {
  id: string;
  src: string;
  label: string;
  alt: string;
}

interface AboutData {
  heroTitle: string;
  heroSubtitle: string;
  historyText: string[];
  values: Value[];
  stats: Stat[];
  teamText: string;
  teamMembers: TeamMember[];
  localPhotos: LocalPhoto[];
}

const defaultAboutData: AboutData = {
  heroTitle: 'Qui sommes-nous ?',
  heroSubtitle: 'Centre de formation continue à Genève, nous accompagnons chaque apprenant vers la réussite depuis 2010',
  historyText: [
    'Fondé en 2010 à Genève, KIC-FORMATIONS est né d\'une conviction simple : la formation continue est la clé de la réussite professionnelle et personnelle.',
    'Depuis plus de 15 ans, nous accompagnons des centaines d\'apprenants dans leur parcours de formation.',
    'Notre approche se distingue par une attention particulière portée à chaque étudiant.',
  ],
  values: [
    { id: '1', iconType: 'excellence', color: 'from-primary-500 to-primary-600', title: 'Excellence', description: 'Nous visons l\'excellence dans chaque formation.' },
    { id: '2', iconType: 'bienveillance', color: 'from-pink-500 to-rose-600', title: 'Bienveillance', description: 'Un environnement d\'apprentissage positif.' },
    { id: '3', iconType: 'adaptation', color: 'from-[#25318D] to-[#1e2477]', title: 'Adaptation', description: 'Des formations flexibles et adaptées.' },
    { id: '4', iconType: 'accompagnement', color: 'from-green-500 to-green-600', title: 'Accompagnement', description: 'Un suivi personnalisé pour votre réussite.' },
  ],
  stats: [
    { id: '1', value: '1200+', label: 'Étudiants formés' },
    { id: '2', value: '95%', label: 'Taux de réussite' },
    { id: '3', value: '15+', label: 'Années d\'expérience' },
    { id: '4', value: '25+', label: 'Formations actives' },
  ],
  teamText: 'Notre équipe est composée de formateurs certifiés et expérimentés dans leur domaine.',
  localPhotos: [
    { id: '1', src: '', label: 'Entrée & Accueil', alt: 'Entrée et accueil de KIC-FORMATIONS' },
    { id: '2', src: '', label: 'Salle de cours', alt: 'Salle de cours KIC-FORMATIONS' },
    { id: '3', src: '', label: 'Espace informatique', alt: 'Espace informatique KIC-FORMATIONS' },
    { id: '4', src: '', label: 'Salle de réunion', alt: 'Salle de réunion KIC-FORMATIONS' },
    { id: '5', src: '', label: 'Espace détente', alt: 'Espace détente KIC-FORMATIONS' },
  ],
  teamMembers: [
    { id: '1', name: 'Mme. Ishola', role: 'Responsable de formation\nFormatrice de français', gradient: 'from-[#25318D] to-[#4F46E5]' },
    { id: '2', name: 'M. Ishola', role: 'Responsable commercial', gradient: 'from-[#25318D] to-[#1e2477]' },
    { id: '3', name: 'M. Giger', role: 'Coach en management', gradient: 'from-emerald-500 to-emerald-600' },
    { id: '4', name: 'M. Weber', role: "Formateur d'informatique", gradient: 'from-amber-500 to-amber-600' },
    { id: '5', name: 'Mme. Grobet', role: 'Formatrice de français', gradient: 'from-purple-500 to-purple-600' },
    { id: '6', name: 'Mme. Carlin Rigo', role: "Formatrice d'anglais", gradient: 'from-rose-500 to-rose-600' },
    { id: '7', name: 'Mme. Hromova', role: "Formatrice d'anglais\net chinois", gradient: 'from-teal-500 to-teal-600' },
    { id: '8', name: 'Mme. Mukoya', role: 'Assistante administrative', gradient: 'from-[#25318D] to-[#1e2777]' },
    { id: '9', name: 'Mme. Castanheira', role: 'Stagiaire chargée\nde communication', gradient: 'from-pink-500 to-pink-600' },
  ],
};

const gradientOptions = [
  { label: 'Bleu KIC', value: 'from-[#25318D] to-[#4F46E5]' },
  { label: 'Bleu foncé', value: 'from-[#25318D] to-[#1e2477]' },
  { label: 'Emeraude', value: 'from-emerald-500 to-emerald-600' },
  { label: 'Ambre', value: 'from-amber-500 to-amber-600' },
  { label: 'Violet', value: 'from-purple-500 to-purple-600' },
  { label: 'Rose', value: 'from-rose-500 to-rose-600' },
  { label: 'Teal', value: 'from-teal-500 to-teal-600' },
  { label: 'Pink', value: 'from-pink-500 to-pink-600' },
  { label: 'Orange', value: 'from-orange-500 to-orange-600' },
  { label: 'Vert', value: 'from-green-500 to-green-600' },
];

export default function AdminAProposPage() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData);
  const [editingValue, setEditingValue] = useState<Value | null>(null);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<LocalPhoto | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    getData<AboutData>('about', defaultAboutData).then(saved => {
      setAboutData({ ...defaultAboutData, ...saved });
    });
  }, []);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const saveData = async () => {
    setIsSaving(true);
    try {
      await saveKicData('about', aboutData);
      setSaveMessage('Modifications enregistrées !');
    } catch {
      setSaveMessage('Erreur lors de la sauvegarde');
    }
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Valeurs CRUD
  const addValue = () => setEditingValue({ id: generateId(), title: '', description: '', iconType: 'excellence', color: 'from-primary-500 to-primary-600' });

  const saveValue = () => {
    if (!editingValue) return;
    const exists = aboutData.values.find(v => v.id === editingValue.id);
    setAboutData({ ...aboutData, values: exists ? aboutData.values.map(v => v.id === editingValue.id ? editingValue : v) : [...aboutData.values, editingValue] });
    setEditingValue(null);
  };

  const deleteValue = (id: string) => {
    if (confirm('Supprimer cette valeur ?')) setAboutData({ ...aboutData, values: aboutData.values.filter(v => v.id !== id) });
  };

  // Stats CRUD
  const addStat = () => setEditingStat({ id: generateId(), value: '', label: '' });

  const saveStat = () => {
    if (!editingStat) return;
    const exists = aboutData.stats.find(s => s.id === editingStat.id);
    setAboutData({ ...aboutData, stats: exists ? aboutData.stats.map(s => s.id === editingStat.id ? editingStat : s) : [...aboutData.stats, editingStat] });
    setEditingStat(null);
  };

  const deleteStat = (id: string) => {
    if (confirm('Supprimer ce chiffre ?')) setAboutData({ ...aboutData, stats: aboutData.stats.filter(s => s.id !== id) });
  };

  // Membres CRUD
  const addMember = () => setEditingMember({ id: generateId(), name: '', role: '', gradient: 'from-[#25318D] to-[#4F46E5]' });

  const saveMember = () => {
    if (!editingMember) return;
    const exists = aboutData.teamMembers.find(m => m.id === editingMember.id);
    setAboutData({ ...aboutData, teamMembers: exists ? aboutData.teamMembers.map(m => m.id === editingMember.id ? editingMember : m) : [...aboutData.teamMembers, editingMember] });
    setEditingMember(null);
  };

  const deleteMember = (id: string) => {
    if (confirm('Supprimer ce membre ?')) setAboutData({ ...aboutData, teamMembers: aboutData.teamMembers.filter(m => m.id !== id) });
  };

  const handlePhotoUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError('');
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', 'locaux');
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur upload');
      setEditingPhoto(prev => prev ? { ...prev, src: data.path, alt: prev.alt || file.name.replace(/\.[^.]+$/, '') } : prev);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Erreur lors de l\'upload');
    } finally {
      setIsUploading(false);
    }
  };

  // Galerie locaux CRUD
  const addPhoto = () => setEditingPhoto({ id: generateId(), src: '', label: '', alt: '' });

  const savePhoto = () => {
    if (!editingPhoto) return;
    const photos = aboutData.localPhotos || [];
    const exists = photos.find(p => p.id === editingPhoto.id);
    setAboutData({ ...aboutData, localPhotos: exists ? photos.map(p => p.id === editingPhoto.id ? editingPhoto : p) : [...photos, editingPhoto] });
    setEditingPhoto(null);
  };

  const deletePhoto = (id: string) => {
    if (confirm('Supprimer cette photo ?')) setAboutData({ ...aboutData, localPhotos: (aboutData.localPhotos || []).filter(p => p.id !== id) });
  };

  const cls = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent';

  return (
    <AdminPageWrapper title="Qui sommes-nous ?" subtitle="Gérez le contenu de la page À propos">
      {/* Save Button */}
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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
        {/* Section Hero */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            Section Hero
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre principal</label>
              <input type="text" value={aboutData.heroTitle} onChange={(e) => setAboutData({ ...aboutData, heroTitle: e.target.value })} className={cls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
              <textarea value={aboutData.heroSubtitle} onChange={(e) => setAboutData({ ...aboutData, heroSubtitle: e.target.value })} rows={2} className={cls} />
            </div>
          </div>
        </div>

        {/* Section Histoire */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-[#25318D]/15 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#25318D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            Notre Histoire
          </h2>
          <div className="space-y-4">
            {aboutData.historyText.map((text, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paragraphe {index + 1}</label>
                <textarea
                  value={text}
                  onChange={(e) => {
                    const newHistory = [...aboutData.historyText];
                    newHistory[index] = e.target.value;
                    setAboutData({ ...aboutData, historyText: newHistory });
                  }}
                  rows={3}
                  className={cls}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section Valeurs */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Nos Valeurs
            </h2>
            <button onClick={addValue} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Ajouter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutData.values.map((value) => (
              <div key={value.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${value.color} flex items-center justify-center text-white text-sm font-bold`}>{value.title.charAt(0)}</div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingValue(value)} className="text-[#25318D] hover:text-[#25318D]/80 p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => deleteValue(value.id)} className="text-red-600 hover:text-red-700 p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Statistiques */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              Chiffres Clés
            </h2>
            <button onClick={addStat} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Ajouter
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {aboutData.stats.map((stat) => (
              <div key={stat.id} className="border border-gray-200 rounded-lg p-4 text-center hover:border-primary-300 transition-colors">
                <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="flex justify-center gap-2 mt-3">
                  <button onClick={() => setEditingStat(stat)} className="text-[#25318D] hover:text-[#25318D]/80 p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => deleteStat(stat.id)} className="text-red-600 hover:text-red-700 p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Membres d'équipe */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              Membres de l&apos;équipe ({aboutData.teamMembers.length})
            </h2>
            <button onClick={addMember} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Ajouter
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte d&apos;introduction de l&apos;équipe</label>
            <textarea value={aboutData.teamText} onChange={(e) => setAboutData({ ...aboutData, teamText: e.target.value })} rows={3} className={cls} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {aboutData.teamMembers.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg p-3 hover:border-primary-300 transition-colors text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                  {member.name.charAt(0)}
                </div>
                <p className="font-semibold text-gray-900 text-sm leading-tight">{member.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 whitespace-pre-line leading-tight">{member.role}</p>
                <div className="flex justify-center gap-2 mt-2">
                  <button onClick={() => setEditingMember(member)} className="text-[#25318D] hover:text-[#25318D]/80 p-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => deleteMember(member.id)} className="text-red-600 hover:text-red-700 p-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Galerie locaux */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              Galerie — Nos locaux
            </h2>
            <button onClick={addPhoto} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Ajouter une photo
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Chemin de l&apos;image : ex. <code className="bg-gray-100 px-1 rounded">/images/Photos_wcms_1/5.jpg</code> (1 à 34 disponibles)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(aboutData.localPhotos || []).map((photo) => (
              <div key={photo.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors">
                <div className="relative h-32 bg-gray-100">
                  {photo.src ? (
                    <Image src={photo.src} alt={photo.alt || photo.label} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs">Aucune image</span>
                    </div>
                  )}
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{photo.label || '(sans titre)'}</p>
                    <p className="text-xs text-gray-400 truncate">{photo.src || 'Chemin non défini'}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0 ml-2">
                    <button onClick={() => setEditingPhoto(photo)} className="text-[#25318D] hover:text-[#25318D]/80 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => deletePhoto(photo.id)} className="text-red-600 hover:text-red-700 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {(aboutData.localPhotos || []).length === 0 && (
              <p className="col-span-3 text-center text-gray-400 py-8 text-sm">Aucune photo ajoutée. Cliquez sur &quot;Ajouter une photo&quot; pour commencer.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Valeur */}
      {editingValue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {aboutData.values.find(v => v.id === editingValue.id) ? 'Modifier' : 'Ajouter'} une valeur
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input type="text" value={editingValue.title} onChange={(e) => setEditingValue({ ...editingValue, title: e.target.value })} className={cls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editingValue.description} onChange={(e) => setEditingValue({ ...editingValue, description: e.target.value })} rows={3} className={cls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                <select value={editingValue.color} onChange={(e) => setEditingValue({ ...editingValue, color: e.target.value })} className={cls}>
                  <option value="from-primary-500 to-primary-600">Bleu primaire</option>
                  <option value="from-pink-500 to-rose-600">Rose</option>
                  <option value="from-[#25318D] to-[#1e2477]">Bleu KIC</option>
                  <option value="from-green-500 to-green-600">Vert</option>
                  <option value="from-purple-500 to-purple-600">Violet</option>
                  <option value="from-amber-500 to-orange-500">Orange</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setEditingValue(null)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
              <button onClick={saveValue} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Stat */}
      {editingStat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {aboutData.stats.find(s => s.id === editingStat.id) ? 'Modifier' : 'Ajouter'} un chiffre
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valeur</label>
                <input type="text" value={editingStat.value} onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })} placeholder="ex: 1200+, 95%" className={cls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input type="text" value={editingStat.label} onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })} placeholder="ex: Étudiants formés" className={cls} />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setEditingStat(null)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
              <button onClick={saveStat} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Membre */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {aboutData.teamMembers.find(m => m.id === editingMember.id) ? 'Modifier' : 'Ajouter'} un membre
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input type="text" value={editingMember.name} onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })} placeholder="ex: Mme. Dupont" className={cls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle / Poste</label>
                <textarea value={editingMember.role} onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })} rows={2} placeholder="ex: Formatrice de français" className={cls} />
                <p className="text-xs text-gray-400 mt-1">Saut de ligne pour afficher sur 2 lignes</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de l&apos;avatar</label>
                <div className="grid grid-cols-5 gap-2">
                  {gradientOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setEditingMember({ ...editingMember, gradient: opt.value })}
                      className={`w-full aspect-square rounded-full bg-gradient-to-br ${opt.value} flex items-center justify-center transition-all ${editingMember.gradient === opt.value ? 'ring-2 ring-offset-2 ring-gray-800 scale-110' : 'hover:scale-105'}`}
                      title={opt.label}
                    >
                      {editingMember.gradient === opt.value && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setEditingMember(null)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
              <button onClick={saveMember} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Photo */}
      {editingPhoto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {(aboutData.localPhotos || []).find(p => p.id === editingPhoto.id) ? 'Modifier' : 'Ajouter'} une photo
            </h3>
            <div className="space-y-4">
              {/* Zone upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <label className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isUploading ? 'border-gray-300 bg-gray-50' : 'border-primary-300 hover:border-primary-500 hover:bg-primary-50'}`} style={{ minHeight: '120px' }}>
                  {editingPhoto.src ? (
                    <div className="relative w-full h-36 rounded-xl overflow-hidden">
                      <Image src={editingPhoto.src} alt="Aperçu" fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Changer l&apos;image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-6 text-gray-400">
                      {isUploading ? (
                        <>
                          <svg className="animate-spin w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span className="text-sm text-primary-600">Upload en cours...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium">Cliquez pour parcourir vos fichiers</span>
                          <span className="text-xs">JPG, PNG, WEBP — max 10 Mo</span>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); }}
                  />
                </label>
                {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
                {editingPhoto.src && (
                  <p className="text-xs text-gray-400 mt-1 truncate">{editingPhoto.src}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Légende</label>
                <input
                  type="text"
                  value={editingPhoto.label}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, label: e.target.value })}
                  placeholder="ex: Salle de cours"
                  className={cls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Texte alternatif <span className="text-gray-400 font-normal">(optionnel)</span></label>
                <input
                  type="text"
                  value={editingPhoto.alt}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, alt: e.target.value })}
                  placeholder="ex: Salle de cours de KIC-FORMATIONS"
                  className={cls}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => { setEditingPhoto(null); setUploadError(''); }} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
              <button onClick={savePhoto} disabled={isUploading} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </AdminPageWrapper>
  );
}
