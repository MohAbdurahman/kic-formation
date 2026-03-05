'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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

const defaultTeamMembers: TeamMember[] = [
  { id: '1', name: 'Mme. Ishola', role: 'Responsable de formation\nFormatrice de français', gradient: 'from-[#25318D] to-[#4F46E5]' },
  { id: '2', name: 'M. Ishola', role: 'Responsable commercial', gradient: 'from-[#25318D] to-[#1e2477]' },
  { id: '3', name: 'M. Giger', role: 'Coach en management', gradient: 'from-emerald-500 to-emerald-600' },
  { id: '4', name: 'M. Weber', role: "Formateur d'informatique", gradient: 'from-amber-500 to-amber-600' },
  { id: '5', name: 'Mme. Grobet', role: 'Formatrice de français', gradient: 'from-purple-500 to-purple-600' },
  { id: '6', name: 'Mme. Carlin Rigo', role: "Formatrice d'anglais", gradient: 'from-rose-500 to-rose-600' },
  { id: '7', name: 'Mme. Hromova', role: "Formatrice d'anglais\net chinois", gradient: 'from-teal-500 to-teal-600' },
  { id: '8', name: 'Mme. Mukoya', role: 'Assistante administrative', gradient: 'from-[#25318D] to-[#1e2777]' },
  { id: '9', name: 'Mme. Castanheira', role: 'Stagiaire chargée\nde communication', gradient: 'from-pink-500 to-pink-600' },
];

const defaultLocalPhotos: LocalPhoto[] = [
  { id: '1', src: '', label: 'Entrée & Accueil', alt: 'Entrée et accueil de KIC-FORMATIONS' },
  { id: '2', src: '', label: 'Salle de cours', alt: 'Salle de cours KIC-FORMATIONS' },
  { id: '3', src: '', label: 'Espace informatique', alt: 'Espace informatique KIC-FORMATIONS' },
  { id: '4', src: '', label: 'Salle de réunion', alt: 'Salle de réunion KIC-FORMATIONS' },
  { id: '5', src: '', label: 'Espace détente', alt: 'Espace détente KIC-FORMATIONS' },
];

const photoGradients = [
  'from-[#25318D] to-[#1e2777]',
  'from-[#FF4040] to-[#cc2020]',
  'from-[#a8a200] to-[#c9c310]',
  'from-[#BF5EDC] to-[#9e45c2]',
  'from-[#61CB80] to-[#3fb865]',
];

const CameraIcon = ({ size = 'lg' }: { size?: 'sm' | 'lg' }) => (
  <svg
    className={size === 'lg' ? 'w-14 h-14 text-white/30' : 'w-9 h-9 text-white/30'}
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function AProposPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [localPhotos, setLocalPhotos] = useState<LocalPhoto[]>(defaultLocalPhotos);
  const [heroTitle, setHeroTitle] = useState('Qui sommes-nous ?');
  const [heroSubtitle, setHeroSubtitle] = useState('KIC-FORMATIONS, votre partenaire de confiance pour la formation continue à Genève');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [teamText, setTeamText] = useState('Rencontrez une équipe passionnée, engagée et à l\'écoute, composée d\'une direction visionnaire et de formateurs experts dans leur domaine.');

  useEffect(() => {
    const saved = localStorage.getItem('kic_about');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.heroTitle) setHeroTitle(data.heroTitle);
        if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
        if (data.teamMembers && data.teamMembers.length > 0) setTeamMembers(data.teamMembers);
        if (data.teamText) setTeamText(data.teamText);
        if (data.localPhotos && data.localPhotos.length > 0) setLocalPhotos(data.localPhotos);
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4" style={{color: 'white'}}>
            {heroTitle}
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Centre de formation continue */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" style={{color: '#25318D'}}>
            CENTRE DE FORMATION CONTINUE
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              Depuis sa création, <strong>KIC-Formations</strong> s'engage à accompagner les professionnels et les particuliers dans le développement de leurs compétences, leur épanouissement et la concrétisation de leurs ambitions.
            </p>
            <p className="text-lg leading-relaxed">
              Notre approche repose sur une conviction forte : la formation est un levier durable de transformation personnelle et professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Notre mission */}
      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" style={{color: '#25318D'}}>
            Notre mission
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              Créer un cadre d'apprentissage stimulant et humain, où chaque formation est conçue pour répondre concrètement aux besoins du monde d'aujourd'hui.
            </p>
            <p className="text-lg leading-relaxed">
              Nous plaçons l'humain au cœur de chaque parcours, en favorisant la montée en compétences, la confiance en soi et la réussite durable de chacun.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={{color: '#25318D'}}>
              Nos valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Exigence et qualité */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{backgroundColor: '#25318D'}}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                Exigence et qualité
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nous visons l'excellence dans chaque formation, avec des méthodes pédagogiques éprouvées et des formateurs passionnés.
              </p>
            </div>

            {/* Accessibilité et bienveillance */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{backgroundColor: '#25318D'}}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                Accessibilité et bienveillance
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Un environnement d'apprentissage positif et encourageant où chacun progresse à son rythme dans le respect et l'écoute.
              </p>
            </div>

            {/* Innovation et avenir */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{backgroundColor: '#25318D'}}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                Innovation et avenir
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Des formations tournées vers l'avenir, intégrant les dernières innovations pédagogiques et technologiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre engagement */}
      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" style={{color: '#25318D'}}>
            Notre engagement
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              Que vous soyez en reconversion professionnelle, en phase d'intégration, ou concerné·e par des troubles de l'apprentissage, <strong>KIC-Formations</strong> est votre allié de confiance pour développer vos compétences et renforcer votre confiance en vous.
            </p>
            <p className="text-lg leading-relaxed">
              Nous collaborons également avec les institutions et organismes partenaires souhaitant soutenir l'inclusion, la formation continue et la réussite de chacun.
            </p>
          </div>
        </div>
      </section>

      {/* Où nous sommes implantés */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" style={{color: '#25318D'}}>
            Où nous sommes implantés
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              Implanté au cœur du canton de Genève, <strong>KIC-Formations</strong> s'inscrit pleinement dans le tissu professionnel et social genevois.
            </p>
            <p className="text-lg leading-relaxed">
              Nous collaborons avec des acteurs locaux, des institutions partenaires et des organismes de formation pour proposer des parcours adaptés aux réalités du marché genevois.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6" style={{color: '#25318D'}}>
              Notre équipe
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              {teamText}
            </p>
          </div>

          {/* Équipe dynamique */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg ring-4 ring-white`}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="font-heading font-semibold text-gray-900 text-sm">{member.name}</h4>
                  <p className="text-xs text-gray-500 whitespace-pre-line leading-tight">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Locaux */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={{color: '#25318D'}}>
              Nos locaux
            </h2>
            <p className="text-lg text-gray-600">
              Des espaces modernes et accueillants au cœur de Genève
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Emplacement Idéal
              </h3>
              <p className="text-gray-600 mb-4">
                Situés au cœur de Genève, Rue des Pâquis 11, nos locaux sont facilement
                accessibles en transports publics (bus, tram) et disposent de parkings à proximité.
              </p>
              <div className="text-sm text-gray-600 space-y-3">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" style={{color: '#25318D'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Arrêt de bus à 2 min
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" style={{color: '#25318D'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Gare Cornavin à 10 min
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" style={{color: '#25318D'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Parking public à 100m
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#25318D] to-[#1e2477] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                Équipements Modernes
              </h3>
              <p className="text-gray-600 mb-4">
                Des salles lumineuses équipées de matériel pédagogique moderne pour
                un apprentissage dans les meilleures conditions.
              </p>
              <div className="text-sm text-gray-600 space-y-3">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" style={{color: '#25318D'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Ordinateurs récents
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" style={{color: '#25318D'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  Vidéoprojecteurs
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" style={{color: '#25318D'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Espace détente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie photos des locaux */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3" style={{color: '#25318D'}}>
              Nos espaces en images
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos salles de formation lumineuses et notre environnement d'apprentissage moderne
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:h-[480px]">

              {/* Grande image gauche */}
              <div
                className="relative rounded-xl overflow-hidden h-64 md:h-full cursor-pointer group"
                onClick={() => setLightboxIndex(0)}
              >
                {localPhotos[0]?.src ? (
                  <Image
                    src={localPhotos[0].src}
                    alt={localPhotos[0].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${photoGradients[0]} flex flex-col items-center justify-center gap-3`}>
                    <CameraIcon size="lg" />
                    <span className="text-white/60 font-medium">{localPhotos[0].label}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold">{localPhotos[0]?.label}</p>
                </div>
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Agrandir
                </div>
              </div>

              {/* Grille 2×2 droite */}
              <div className="grid grid-cols-2 gap-3">
                {localPhotos.slice(1).map((photo, i) => photo && (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden h-40 md:h-full cursor-pointer group"
                    onClick={() => setLightboxIndex(i + 1)}
                  >
                    {photo.src ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${photoGradients[(i + 1) % photoGradients.length]} flex flex-col items-center justify-center gap-2`}>
                        <CameraIcon size="sm" />
                        <span className="text-white/60 text-sm font-medium text-center px-2">{photo.label}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-semibold">{photo.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {localPhotos.every(p => !p.src) && (
              <p className="text-center text-sm text-gray-400 mt-5 italic">
                Photos à venir — Contactez-nous pour visiter nos locaux
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Fermer */}
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Précédent */}
          <button
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + localPhotos.length) % localPhotos.length); }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Suivant */}
          <button
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % localPhotos.length); }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Contenu */}
          <div
            className="w-full max-w-4xl mx-16 md:mx-28"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl">
              {localPhotos[lightboxIndex].src ? (
                <div className="relative w-full" style={{ height: '65vh' }}>
                  <Image
                    src={localPhotos[lightboxIndex].src}
                    alt={localPhotos[lightboxIndex].alt}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className={`w-full bg-gradient-to-br ${photoGradients[lightboxIndex % photoGradients.length]} flex flex-col items-center justify-center gap-5`} style={{ height: '55vh' }}>
                  <svg className="w-24 h-24 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-white/50 text-xl">Photo à venir</p>
                </div>
              )}
              <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
                <span className="text-white font-semibold">{localPhotos[lightboxIndex].label}</span>
                <span className="text-gray-400 text-sm tabular-nums">{lightboxIndex + 1} / {localPhotos.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
