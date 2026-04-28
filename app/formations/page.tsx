'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { getData } from '@/lib/db';

interface Formation {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  duration?: number;
}

// Catégories de formations
const formationCategories = [
  {
    id: 'langues',
    title: 'Langues',
    slug: 'langues',
    description: 'Maîtrisez le français et l\'anglais avec nos cours adaptés à tous les niveaux. Nos formations sont conçues pour répondre à vos objectifs personnels et professionnels.',
    longDescription: 'Que vous souhaitiez apprendre une nouvelle langue pour votre carrière, préparer un examen officiel ou simplement communiquer au quotidien, nos formateurs expérimentés vous accompagnent avec des méthodes pédagogiques éprouvées.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    color: 'from-[#FF4040] to-[#cc2020]',
    bgLight: 'bg-[#FF4040]/10',
    textColor: 'text-[#FF4040]',
    borderColor: 'border-[#FF4040]/20',
    hasSubCategories: false,
    formations: [],
  },
  {
    id: 'informatique',
    title: 'Informatique',
    slug: 'informatique',
    description: 'Développez vos compétences numériques essentielles pour le monde professionnel d\'aujourd\'hui. De la bureautique aux outils collaboratifs, nous vous accompagnons dans votre montée en compétences.',
    longDescription: 'Nos formations informatiques sont conçues pour tous les niveaux. Que vous découvriez l\'ordinateur ou souhaitiez maîtriser les outils avancés, nos formateurs patients et pédagogues vous guident pas à pas.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-[#F0E815] to-[#c9c310]',
    bgLight: 'bg-[#F0E815]/10',
    textColor: 'text-[#a8a200]',
    borderColor: 'border-[#F0E815]/20',
    hasSubCategories: false,
    formations: [],
  },
  {
    id: 'accompagnement',
    title: 'Accompagnement',
    slug: 'accompagnement',
    description: 'Un suivi personnalisé pour atteindre vos objectifs professionnels et personnels. Notre équipe de coachs certifiés vous accompagne dans votre développement.',
    longDescription: 'L\'accompagnement individuel est au cœur de notre approche. Nous croyons que chaque personne a un potentiel unique à révéler. Nos coachs vous aident à identifier vos forces et à surmonter vos obstacles.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'from-[#BF5EDC] to-[#9e45c2]',
    bgLight: 'bg-[#BF5EDC]/10',
    textColor: 'text-[#BF5EDC]',
    borderColor: 'border-[#BF5EDC]/20',
    formations: [],
  },
  {
    id: 'ateliers',
    title: 'Atelier de prévention',
    slug: 'ateliers',
    description: 'Des sessions pratiques et interactives pour développer votre bien-être personnel et professionnel. Nos ateliers en petit groupe favorisent l\'échange et la mise en pratique immédiate.',
    longDescription: 'Nos ateliers de prévention sont conçus pour être dynamiques et participatifs. En petit groupe, vous apprenez par la pratique et repartez avec des outils concrets applicables dès le lendemain.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-[#61CB80] to-[#3fb865]',
    bgLight: 'bg-[#61CB80]/10',
    textColor: 'text-[#2a9e54]',
    borderColor: 'border-[#61CB80]/20',
    formations: [],
  },
];

function FormationsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categorie');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(categoryParam);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>(formationCategories);

  useEffect(() => {
    getData<{ items: Formation[] }>('formations', { items: [] }).then(data => {
      const items = data.items || [];
      setCategories(formationCategories.map(cat => ({
        ...cat,
        formations: items
          .filter(f => f.category === cat.title)
          .map(f => ({ name: f.title, description: f.shortDescription, slug: f.slug })),
      })));
    });
  }, []);

  // Sync with URL parameter
  useEffect(() => {
    setSelectedCategorySlug(categoryParam);
  }, [categoryParam]);

  const selectedCategory = selectedCategorySlug
    ? categories.find(c => c.slug === selectedCategorySlug)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Nos Formations
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Découvrez nos domaines de formation et trouvez le programme adapté à vos objectifs
          </p>
        </div>
      </section>

      {/* Layout Master-Detail */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Colonne gauche : Liste des catégories */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 text-white">
                  <h2 className="font-semibold">Catégories</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategorySlug(cat.slug);
                      }}
                      className={`w-full text-left p-4 transition-all flex items-center gap-3 ${
                        selectedCategorySlug === cat.slug
                          ? `${cat.bgLight} border-l-4 ${cat.textColor.replace('text-', 'border-')}`
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-white flex-shrink-0`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {cat.id === 'langues' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10" />}
                          {cat.id === 'informatique' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                          {cat.id === 'accompagnement' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />}
                          {cat.id === 'ateliers' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                        </svg>
                      </div>
                      <div>
                        <h3 className={`font-semibold ${selectedCategorySlug === cat.slug ? cat.textColor : 'text-gray-900'}`}>
                          {cat.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {`${cat.formations?.length || 0} formations`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite : Contenu */}
            <div className="lg:w-3/4">
              {selectedCategory ? (
                <div className="space-y-6">
                  {/* Header de la catégorie */}
                  <div className={`bg-gradient-to-r ${selectedCategory.color} rounded-2xl overflow-hidden text-white`}>
                    <div className="flex items-stretch">
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/20 rounded-xl flex-shrink-0">
                            {selectedCategory.icon}
                          </div>
                          <div>
                            <h2 className="text-2xl font-heading font-bold">{selectedCategory.title}</h2>
                            <p className="text-white/80 text-sm mt-1">{selectedCategory.description}</p>
                          </div>
                        </div>
                      </div>
                      {selectedCategory.id === 'langues' && (
                        <div className="hidden md:block w-44 flex-shrink-0 relative">
                          <Image
                            src="/images/formations/langues/Image13.jpg"
                            alt="Cours de langues KIC-FORMATIONS"
                            fill
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                      )}
                      {selectedCategory.id === 'informatique' && (
                        <div className="hidden md:block w-44 flex-shrink-0 relative">
                          <Image
                            src="/images/formations/informatique/Image17.jpg"
                            alt="Formations informatique KIC-FORMATIONS"
                            fill
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Test de niveau pour les langues */}
                  {selectedCategory.id === 'langues' && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                            Évaluez votre niveau gratuitement
                          </h3>
                          <p className="text-gray-700 text-sm">
                            Découvrez votre niveau actuel en français ou anglais en 15 minutes. Notre test adaptatif vous orientera vers la formation la plus adaptée.
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button href="/test-niveau" variant="primary" size="lg">
                            Passer le test
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Galerie photo - section langues */}
                  {selectedCategory.id === 'langues' && (
                    <div className="grid grid-cols-3 gap-3 rounded-2xl overflow-hidden h-60">
                      {/* Grande photo à gauche */}
                      <div className="col-span-2 relative">
                        <Image
                          src="/images/Photos_wcms_1/23.jpg"
                          alt="Cours de langues KIC-FORMATIONS"
                          fill
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute bottom-3 left-4 text-white text-sm font-semibold drop-shadow">Nos cours en salle</span>
                      </div>
                      {/* Deux petites photos empilées à droite */}
                      <div className="flex flex-col gap-3">
                        <div className="flex-1 relative">
                          <Image
                            src="/images/Photos_wcms_1/14.jpg"
                            alt="Formation langues KIC-FORMATIONS"
                            fill
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                        <div className="flex-1 relative">
                          <Image
                            src="/images/Photos_wcms_1/26.jpg"
                            alt="Apprentissage des langues"
                            fill
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Galerie photo - section informatique */}
                  {selectedCategory.id === 'informatique' && (
                    <div className="grid grid-cols-3 gap-3 rounded-2xl overflow-hidden h-80">
                      {/* Deux petites photos empilées à gauche */}
                      <div className="flex flex-col gap-3">
                        <div className="flex-1 relative">
                          <Image
                            src="/images/Photos_wcms_1/2.jpg"
                            alt="Formation informatique KIC-FORMATIONS"
                            fill
                            className="object-cover object-[center_20%]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                        <div className="flex-1 relative">
                          <Image
                            src="/images/Photos_wcms_1/3.jpg"
                            alt="Cours informatique KIC-FORMATIONS"
                            fill
                            className="object-cover object-[center_20%]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                      </div>
                      {/* Grande photo à droite */}
                      <div className="col-span-2 relative">
                        <Image
                          src="/images/Photos_wcms_1/1.jpg"
                          alt="Formations numériques KIC-FORMATIONS"
                          fill
                          className="object-cover object-[center_20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute bottom-3 right-4 text-white text-sm font-semibold drop-shadow">Nos ateliers numériques</span>
                      </div>
                    </div>
                  )}

                  {/* Galerie photo - section accompagnement */}
                  {selectedCategory.id === 'accompagnement' && (
                    <div className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden h-56">
                      <div className="relative">
                        <Image
                          src="/images/Photos_wcms_1/34.jpg"
                          alt="Accompagnement personnalisé KIC-FORMATIONS"
                          fill
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 left-4 text-white text-sm font-semibold drop-shadow">Suivi individuel</span>
                      </div>
                      <div className="relative">
                        <Image
                          src="/images/Photos_wcms_1/32.jpg"
                          alt="Coaching KIC-FORMATIONS"
                          fill
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 right-4 text-white text-sm font-semibold drop-shadow">Coaching certifié</span>
                      </div>
                    </div>
                  )}

                  {/* Galerie photo - section ateliers */}
                  {selectedCategory.id === 'ateliers' && (
                    <div className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden h-56">
                      <div className="relative">
                        <Image
                          src="/images/Photos_wcms_1/27.jpg"
                          alt="Ateliers pratiques KIC-FORMATIONS"
                          fill
                          className="object-cover object-[center_20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 left-4 text-white text-sm font-semibold drop-shadow">Ateliers pratiques</span>
                      </div>
                      <div className="relative">
                        <Image
                          src="/images/Photos_wcms_1/30.jpg"
                          alt="Activités KIC-FORMATIONS"
                          fill
                          className="object-cover object-[center_20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 right-4 text-white text-sm font-semibold drop-shadow">Activités en groupe</span>
                      </div>
                    </div>
                  )}

                  {/* Liste des formations de la catégorie */}
                  {selectedCategory.formations && selectedCategory.formations.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center text-gray-500 border-2 border-gray-100">
                      Aucune formation disponible dans cette catégorie pour le moment.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCategory.formations && selectedCategory.formations.map((formation: { name: string; description: string; slug: string }, index: number) => (
                        <Link
                          key={index}
                          href={`/formations/${formation.slug}`}
                          className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer block"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full ${selectedCategory.bgLight} ${selectedCategory.textColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-semibold ${selectedCategory.textColor} group-hover:underline`}>
                                {formation.name}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {formation.description}
                              </p>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-600 flex-shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Message quand aucune catégorie n'est sélectionnée */
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                    Sélectionnez une catégorie
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Cliquez sur une catégorie à gauche pour découvrir les formations disponibles
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Global */}
      <section className="section bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Besoin d'un conseil personnalisé ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour vous orienter vers la formation la plus adaptée à vos objectifs.
          </p>
          <Button href="/contact" variant="secondary" size="lg" className="!bg-white !text-primary-600 hover:!bg-gray-100">
            Contactez-nous
          </Button>
        </div>
      </section>
    </div>
  );
}

export default function FormationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" /></div>}>
      <FormationsContent />
    </Suspense>
  );
}
