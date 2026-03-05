'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface HeroData {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
}

const defaults: HeroData = {
  heroBadge: 'Inscriptions ouvertes 2026',
  heroTitle: 'Votre réussite commence ici',
  heroHighlight: 'réussite',
  heroSubtitle: 'Centre de formation continue à Genève. Développez vos compétences linguistiques et numériques avec nos formateurs experts.',
  trustBadge1: 'Certifié EduQua',
  trustBadge2: '98% de réussite',
  trustBadge3: 'Horaires flexibles',
};

export default function HeroSection() {
  const [c, setC] = useState<HeroData>(defaults);

  useEffect(() => {
    const saved = localStorage.getItem('kic_accueil');
    if (saved) {
      try { setC({ ...defaults, ...JSON.parse(saved) }); } catch {}
    }
  }, []);

  const renderTitle = () => {
    const highlight = c.heroHighlight.trim();
    if (!highlight) return <>{c.heroTitle}</>;
    const idx = c.heroTitle.indexOf(highlight);
    if (idx === -1) return <>{c.heroTitle}</>;
    const before = c.heroTitle.slice(0, idx);
    const after = c.heroTitle.slice(idx + highlight.length);
    return (
      <>
        {before}
        <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          {highlight}
        </span>
        {after}
      </>
    );
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="/images/Photos_wcms_1/11.jpg"
          alt="KIC-FORMATIONS"
          fill
          className="object-cover object-[65%_20%]"
          priority
          quality={100}
          sizes="100vw"
          unoptimized={true}
        />
      </div>

      {/* Overlay sombre pour lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-white/90 text-sm font-medium">{c.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-[1.1]">
            {renderTitle()}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            {c.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button href="/formations" variant="primary" size="lg" className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent-500/30 text-base px-8">
              Decouvrir nos formations
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="!bg-transparent border-2 !border-white/30 !text-white hover:!bg-white hover:!text-gray-900 backdrop-blur-sm text-base px-8">
              Nous contacter
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center items-center">
            {[c.trustBadge1, c.trustBadge2, c.trustBadge3].filter(Boolean).map((badge, i) => (
              <div key={i} className="flex items-center gap-2.5 text-gray-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vague decorative en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 sm:h-24" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 74V24C240 60 480 74 720 60C960 46 1200 32 1440 24V74H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
