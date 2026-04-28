'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import { getData, saveKicData } from '@/lib/db';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl?: string;
  published: boolean;
}

const defaultArticles: Article[] = [];

export default function AdminArticlesPage() {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [filter, setFilter] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    getData<{ items: Article[] }>('articles', { items: [] }).then(data => {
      setArticles(data.items || []);
    });
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      addArticle();
    }
  }, [searchParams]);

  const generateId = () => Math.random().toString(36).substr(2, 9);
  const generateSlug = (title: string) => title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const saveData = async () => {
    setIsSaving(true);
    try {
      await saveKicData('articles', { items: articles });
      setSaveMessage('Actualités enregistrées !');
    } catch {
      setSaveMessage('Erreur lors de la sauvegarde');
    }
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const addArticle = () => {
    setEditingArticle({
      id: generateId(),
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      category: 'Actualités',
      author: 'Équipe KIC',
      date: new Date().toISOString().split('T')[0],
      published: false,
    });
  };

  const saveArticle = () => {
    if (!editingArticle) return;
    editingArticle.slug = generateSlug(editingArticle.title);
    const exists = articles.find(a => a.id === editingArticle.id);
    if (exists) {
      setArticles(articles.map(a => a.id === editingArticle.id ? editingArticle : a));
    } else {
      setArticles([...articles, editingArticle]);
    }
    setEditingArticle(null);
  };

  const deleteArticle = (id: string) => {
    if (confirm('Supprimer cette actualité ?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const togglePublished = (id: string) => {
    setArticles(articles.map(a =>
      a.id === id ? { ...a, published: !a.published } : a
    ));
  };

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(filter.toLowerCase()) ||
    a.category.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedArticles = [...filteredArticles].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const categories = ['Actualités', 'Conseils', 'Formation', 'Événements', 'Témoignages'];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Actualités': return 'bg-[#25318D]/15 text-[#25318D]';
      case 'Conseils': return 'bg-green-100 text-green-700';
      case 'Formation': return 'bg-purple-100 text-purple-700';
      case 'Événements': return 'bg-orange-100 text-orange-700';
      case 'Témoignages': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <AdminPageWrapper title="Actualités" subtitle="Gérez les actualités du blog">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher une actualité..."
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
            onClick={addArticle}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle actualité
          </button>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="h-40 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center relative overflow-hidden">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  unoptimized={article.imageUrl.startsWith('data:')}
                />
              ) : (
                <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${article.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {article.published ? 'Publié' : 'Brouillon'}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{article.excerpt}</p>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>{article.author}</span>
                <span>{formatDate(article.date)}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => togglePublished(article.id)}
                  className={`text-sm font-medium ${article.published ? 'text-yellow-600 hover:text-yellow-700' : 'text-green-600 hover:text-green-700'}`}
                >
                  {article.published ? 'Dépublier' : 'Publier'}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingArticle(article)}
                    className="p-2 text-[#25318D] hover:bg-[#25318D]/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteArticle(article.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {sortedArticles.length === 0 && (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p>Aucune actualité trouvée</p>
          </div>
        )}
      </div>

      {/* Modal Article */}
      {editingArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {articles.find(a => a.id === editingArticle.id) ? 'Modifier' : 'Nouvelle'} actualité
              </h3>
              <button onClick={() => setEditingArticle(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Titre de l'actualité"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
                  <input
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={editingArticle.date}
                  onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                  className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Extrait (aperçu)</label>
                <textarea
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Court résumé de l'actualité..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
                <textarea
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                  placeholder="Contenu de l'actualité... (Markdown supporté)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image (optionnel)</label>
                <div className="space-y-3">
                  {/* Aperçu de l'image */}
                  {editingArticle.imageUrl && (
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={editingArticle.imageUrl}
                        alt="Aperçu"
                        fill
                        className="object-cover"
                        unoptimized={editingArticle.imageUrl.startsWith('data:')}
                      />
                      <button
                        type="button"
                        onClick={() => setEditingArticle({ ...editingArticle, imageUrl: undefined })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                        title="Supprimer l'image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Zone de sélection de fichier */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Vérifier la taille (max 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            alert('L\'image ne doit pas dépasser 5 Mo');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setEditingArticle({ ...editingArticle, imageUrl: event.target?.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-3 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
                    >
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">
                        {editingArticle.imageUrl ? 'Changer l\'image' : 'Cliquez pour sélectionner une image'}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Formats acceptés : JPG, PNG, GIF, WebP. Taille max : 5 Mo</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={editingArticle.published}
                  onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Publier immédiatement
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-4">
              <button
                onClick={() => setEditingArticle(null)}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={saveArticle}
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
