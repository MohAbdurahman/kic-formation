'use client';

import { useState, useEffect } from 'react';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';

interface Testimonial {
  id: string;
  name: string;
  formation: string;
  rating: number;
  comment: string;
}

interface Partner {
  id: string;
  name: string;
}

interface AccueilData {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
  testimonials: Testimonial[];
  partners: Partner[];
}

const defaultAccueilData: AccueilData = {
  heroBadge: 'Inscriptions ouvertes 2026',
  heroTitle: 'Votre réussite commence ici',
  heroHighlight: 'réussite',
  heroSubtitle: 'Centre de formation continue à Genève. Développez vos compétences linguistiques et numériques avec nos formateurs experts.',
  trustBadge1: 'Certifié EduQua',
  trustBadge2: '98% de réussite',
  trustBadge3: 'Horaires flexibles',
  testimonials: [
    { id: '1', name: 'Sophie M.', formation: 'Français B1', rating: 5, comment: "Une expérience exceptionnelle ! Les formateurs sont à l'écoute et la méthode est très efficace. J'ai pu progresser rapidement et obtenir ma naturalisation." },
    { id: '2', name: 'Ahmed K.', formation: 'Bureautique', rating: 5, comment: "Excellente formation, très pratique et applicable directement dans mon travail. Le formateur était patient et compétent." },
    { id: '3', name: 'Maria G.', formation: 'Anglais B2', rating: 5, comment: "Horaires flexibles et approche personnalisée. C'est exactement ce dont j'avais besoin pour concilier formation et vie professionnelle." },
    { id: '4', name: 'Jean-Pierre L.', formation: 'Français A2', rating: 5, comment: "Grâce à KIC-FORMATIONS, j'ai pu améliorer mon français et décrocher un meilleur poste. Je recommande vivement !" },
    { id: '5', name: 'Elena R.', formation: 'Informatique', rating: 5, comment: "Formation complète et bien structurée. Les exercices pratiques m'ont permis de maîtriser Excel et Word en quelques semaines." },
  ],
  partners: [
    { id: '1', name: 'Rolex' },
    { id: '2', name: 'Nestlé' },
    { id: '3', name: 'UBS' },
    { id: '4', name: 'Credit Suisse' },
    { id: '5', name: 'Swisscom' },
    { id: '6', name: 'Novartis' },
    { id: '7', name: 'ABB' },
    { id: '8', name: 'Zurich Insurance' },
    { id: '9', name: 'Migros' },
    { id: '10', name: 'Coop' },
  ],
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function AdminAccueilPage() {
  const [data, setData] = useState<AccueilData>(defaultAccueilData);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kic_accueil');
    if (saved) {
      try { setData({ ...defaultAccueilData, ...JSON.parse(saved) }); } catch {}
    }
  }, []);

  const saveData = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 500));
    localStorage.setItem('kic_accueil', JSON.stringify(data));
    setSaveMessage('Page d\'accueil enregistrée !');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Témoignages CRUD
  const saveTestimonial = () => {
    if (!editingTestimonial) return;
    const exists = data.testimonials.find(t => t.id === editingTestimonial.id);
    if (exists) {
      setData({ ...data, testimonials: data.testimonials.map(t => t.id === editingTestimonial.id ? editingTestimonial : t) });
    } else {
      setData({ ...data, testimonials: [...data.testimonials, editingTestimonial] });
    }
    setEditingTestimonial(null);
  };

  const deleteTestimonial = (id: string) => {
    if (confirm('Supprimer ce témoignage ?')) {
      setData({ ...data, testimonials: data.testimonials.filter(t => t.id !== id) });
    }
  };

  // Partenaires CRUD
  const savePartner = () => {
    if (!editingPartner) return;
    const exists = data.partners.find(p => p.id === editingPartner.id);
    if (exists) {
      setData({ ...data, partners: data.partners.map(p => p.id === editingPartner.id ? editingPartner : p) });
    } else {
      setData({ ...data, partners: [...data.partners, editingPartner] });
    }
    setEditingPartner(null);
  };

  const deletePartner = (id: string) => {
    if (confirm('Supprimer ce partenaire ?')) {
      setData({ ...data, partners: data.partners.filter(p => p.id !== id) });
    }
  };

  const cls = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent';

  const StarRating = ({ rating, onChange }: { rating: number; onChange: (r: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button key={star} type="button" onClick={() => onChange(star)}>
          <svg className={`w-6 h-6 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );

  return (
    <AdminPageWrapper title="Page d'accueil" subtitle="Gérez le contenu de la page principale du site">
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
        {/* Section Hero */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-[#25318D]/15 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#25318D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
            Section Hero (bannière principale)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge d'annonce</label>
              <input type="text" value={data.heroBadge} onChange={e => setData({ ...data, heroBadge: e.target.value })} className={cls} placeholder="Inscriptions ouvertes 2026" />
              <p className="text-xs text-gray-400 mt-1">Texte affiché dans la pastille verte en haut</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre principal</label>
                <input type="text" value={data.heroTitle} onChange={e => setData({ ...data, heroTitle: e.target.value })} className={cls} placeholder="Votre réussite commence ici" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot mis en évidence (orange)</label>
                <input type="text" value={data.heroHighlight} onChange={e => setData({ ...data, heroHighlight: e.target.value })} className={cls} placeholder="réussite" />
                <p className="text-xs text-gray-400 mt-1">Ce mot sera coloré en orange dans le titre</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
              <textarea rows={3} value={data.heroSubtitle} onChange={e => setData({ ...data, heroSubtitle: e.target.value })} className={cls} placeholder="Centre de formation continue à Genève..." />
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Arguments de confiance (3 badges)
          </h2>
          <p className="text-sm text-gray-500 mb-4">Ces 3 textes apparaissent sous les boutons de la bannière</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['trustBadge1', 'trustBadge2', 'trustBadge3'] as const).map((key, i) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge {i + 1}</label>
                <input type="text" value={data[key]} onChange={e => setData({ ...data, [key]: e.target.value })} className={cls} />
              </div>
            ))}
          </div>
        </div>

        {/* Témoignages */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              Témoignages ({data.testimonials.length})
            </h2>
            <button
              onClick={() => setEditingTestimonial({ id: generateId(), name: '', formation: '', rating: 5, comment: '' })}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {data.testimonials.map(t => (
              <div key={t.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{t.name}</span>
                      <span className="text-xs text-gray-400">–</span>
                      <span className="text-sm text-gray-500">{t.formation}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{t.comment}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => setEditingTestimonial(t)} className="p-1.5 text-[#25318D] hover:bg-[#25318D]/10 rounded transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partenaires */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Partenaires ({data.partners.length})
            </h2>
            <button
              onClick={() => setEditingPartner({ id: generateId(), name: '' })}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.partners.map(p => (
              <div key={p.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:border-primary-300 transition-colors">
                <span className="font-medium text-gray-700 text-sm">{p.name}</span>
                <button onClick={() => setEditingPartner(p)} className="text-[#25318D] hover:text-[#25318D]/80 p-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => deletePartner(p.id)} className="text-red-600 hover:text-red-700 p-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Témoignage */}
      {editingTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {data.testimonials.find(t => t.id === editingTestimonial.id) ? 'Modifier' : 'Ajouter'} un témoignage
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input type="text" value={editingTestimonial.name} onChange={e => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} className={cls} placeholder="Sophie M." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formation suivie</label>
                  <input type="text" value={editingTestimonial.formation} onChange={e => setEditingTestimonial({ ...editingTestimonial, formation: e.target.value })} className={cls} placeholder="Français B1" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <StarRating rating={editingTestimonial.rating} onChange={r => setEditingTestimonial({ ...editingTestimonial, rating: r })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Témoignage</label>
                <textarea rows={4} value={editingTestimonial.comment} onChange={e => setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })} className={cls} placeholder="Ce que dit l'apprenant..." />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setEditingTestimonial(null)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
              <button onClick={saveTestimonial} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Partenaire */}
      {editingPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {data.partners.find(p => p.id === editingPartner.id) ? 'Modifier' : 'Ajouter'} un partenaire
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du partenaire / entreprise</label>
              <input type="text" value={editingPartner.name} onChange={e => setEditingPartner({ ...editingPartner, name: e.target.value })} className={cls} placeholder="Nom de l'entreprise" autoFocus />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setEditingPartner(null)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
              <button onClick={savePartner} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </AdminPageWrapper>
  );
}
