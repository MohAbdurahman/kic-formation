'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getData } from '@/lib/db';

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

const defaultArticles: Article[] = [
  {
    id: '1',
    slug: '5-astuces-apprendre-francais',
    title: '5 Astuces pour Apprendre le Français Rapidement',
    excerpt: 'Découvrez nos meilleures techniques pour progresser rapidement en français et atteindre vos objectifs linguistiques.',
    content: '',
    category: 'Conseils',
    author: 'Marie Durand',
    date: '2026-01-10',
    published: true,
  },
  {
    id: '2',
    slug: 'certification-ecdl-pourquoi',
    title: 'Pourquoi Obtenir la Certification ECDL ?',
    excerpt: 'La certification ECDL est reconnue dans toute l\'Europe. Découvrez tous les avantages de cette certification informatique.',
    content: '',
    category: 'Informatique',
    author: 'Pierre Martin',
    date: '2026-01-08',
    published: true,
  },
  {
    id: '3',
    slug: 'gerer-anxiete-examen',
    title: 'Comment Gérer l\'Anxiété Avant un Examen',
    excerpt: 'Techniques éprouvées pour gérer le stress et aborder sereinement vos examens et tests de langue.',
    content: '',
    category: 'Développement Personnel',
    author: 'Sophie Legrand',
    date: '2026-01-05',
    published: true,
  },
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getData<{ items: Article[] }>('articles', { items: defaultArticles }).then(data => {
      const items = data.items || defaultArticles;
      setArticles(items.filter((a: Article) => a.published));
    });
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-CH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  // Trier par date décroissante
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Actualités KIC-FORMATIONS
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Conseils, actualités et ressources pour votre apprentissage
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="section">
        <div className="container max-w-5xl">
          {sortedArticles.length > 0 ? (
            <div className="space-y-8">
              {sortedArticles.map((post) => (
                <Link
                  key={post.id}
                  href={`/articles/${post.slug}`}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3 bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center min-h-[200px] relative overflow-hidden">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized={post.imageUrl.startsWith('data:')}
                        />
                      ) : (
                        <div className="text-white text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">{post.category}</p>
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="niveau">{post.category}</Badge>
                        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                        <span className="text-sm text-gray-500">• {getReadTime(post.content || post.excerpt)} de lecture</span>
                      </div>

                      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span>{post.author}</span>
                        </div>

                        <span className="text-primary-600 font-medium flex items-center gap-2 group">
                          Lire l'actualité
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-500 text-lg">Aucune actualité publiée pour le moment</p>
              <p className="text-gray-400 mt-2">Revenez bientôt pour découvrir nos nouveaux contenus !</p>
            </div>
          )}

        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ne Manquez Aucune Actualité
            </h2>
            <p className="text-primary-100 mb-6">
              Recevez nos derniers conseils et actualités directement par email
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <Button type="submit" variant="secondary" className="!bg-white !text-primary-600 hover:!bg-gray-100">
                S'abonner
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
