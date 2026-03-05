import HeroSection from '@/components/sections/HeroSection';
import TestimonialsSectionClient from '@/components/sections/TestimonialsSectionClient';
import PartnersSectionClient from '@/components/sections/PartnersSectionClient';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Catégories de formations
const formationCategories = [
  {
    id: 'langues',
    title: 'Langues',
    slug: 'langues',
    description: 'Maîtrisez le français, l\'anglais ou d\'autres langues avec nos cours adaptés à tous les niveaux. Préparation aux certifications officielles (DELF, FIDE, Cambridge).',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    color: 'from-[#FF4040] to-[#cc2020]',
    bgLight: 'bg-[#FF4040]/10',
    textColor: 'text-[#FF4040]',
    hex: '#FF4040',
    features: ['Français (A1-C1)', 'Anglais (A1-C1)', 'Préparation DELF/FIDE', 'Cours intensifs'],
    hasTest: true,
  },
  {
    id: 'informatique',
    title: 'Informatique',
    slug: 'informatique',
    description: 'Développez vos compétences numériques : bureautique, outils collaboratifs, initiation au web. Formations certifiantes ECDL disponibles.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-[#F0E815] to-[#c9c310]',
    bgLight: 'bg-[#F0E815]/10',
    textColor: 'text-[#a8a200]',
    hex: '#F0E815',
    features: ['Word, Excel, PowerPoint', 'Certification ECDL', 'Outils collaboratifs', 'Internet & sécurité'],
    hasTest: false,
  },
  {
    id: 'accompagnement',
    title: 'Accompagnement',
    slug: 'accompagnement',
    description: 'Un suivi personnalisé pour atteindre vos objectifs : coaching professionnel, aide à l\'insertion, préparation aux entretiens et orientation de carrière.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'from-[#BF5EDC] to-[#9e45c2]',
    bgLight: 'bg-[#BF5EDC]/10',
    textColor: 'text-[#BF5EDC]',
    hex: '#BF5EDC',
    features: ['Coaching individuel', 'Aide à l\'insertion', 'Préparation entretiens', 'Bilan de compétences'],
    hasTest: false,
  },
  {
    id: 'ateliers',
    title: 'Atelier de prévention',
    slug: 'ateliers',
    description: 'Des sessions pratiques et interactives pour développer votre bien-être personnel et professionnel : croyances limitantes, confiance en soi, prévention burn-out.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-[#61CB80] to-[#3fb865]',
    bgLight: 'bg-[#61CB80]/10',
    textColor: 'text-[#2a9e54]',
    hex: '#61CB80',
    features: ['Croyances limitantes', 'Confiance en soi', 'Prévention burn-out', 'Gestion des conflits'],
    hasTest: false,
  },
];

const whyChooseUs = [
  {
    title: 'Formateurs Experts',
    description: 'Des professionnels certifiés et expérimentés, passionnés par l\'enseignement et votre réussite.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Méthodes Adaptées',
    description: 'Approches pédagogiques personnalisées selon votre niveau et vos objectifs personnels.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Horaires Flexibles',
    description: 'Cours en journée, soirée et weekend pour s\'adapter à votre emploi du temps.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Suivi Personnalisé',
    description: 'Accompagnement individuel pour garantir votre progression et votre réussite.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Nos Formations par Catégorie */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{color: '#25318D'}}>Nos Formations</h2>
            <p className="section-subtitle mx-auto">
              Découvrez nos domaines de formation conçus pour vous aider à atteindre vos objectifs professionnels et personnels
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {formationCategories.map((category) => (
              <Link
                key={category.id}
                href={`/formations?categorie=${category.slug}`}
                className="group bg-white rounded-xl shadow-sm border-2 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
                style={{ borderColor: category.hex }}
              >
                {/* Badge test de niveau */}
                {category.hasTest && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Test gratuit
                    </span>
                  </div>
                )}

                {/* Icône */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>

                {/* Titre */}
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>

                {/* Lien discret */}
                <span className={`inline-flex items-center text-sm font-medium ${category.textColor} group-hover:gap-2 transition-all`}>
                  Découvrir
                  <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3" style={{color: '#25318D'}}>
              Pourquoi nous choisir
            </h2>
            <p className="text-xl font-semibold text-orange-500 mb-2">La réussite pour tous !</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Depuis plus de 15 ans, nous accompagnons nos étudiants vers leurs objectifs avec passion et professionnalisme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icône en bleu homogène */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white" style={{backgroundColor: '#25318D'}}>
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Partenaires - Ceux qui nous font confiance */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mb-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={{color: '#25318D'}}>
              Ceux qui nous font confiance
            </h2>
          </div>
        </div>

        {/* Carrousel defilant */}
        <div className="relative">
          {/* Gradient gauche */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          {/* Gradient droit */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          <PartnersSectionClient />
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mb-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{color: '#25318D'}}>
              Ce qu'ils disent du KIC
            </h2>
            <p className="section-subtitle mx-auto">
              Les retours de nos étudiants satisfaits
            </p>
          </div>
        </div>

        {/* Carrousel avec flèches */}
        <TestimonialsSectionClient />
      </section>

      {/* Formulaire de Contact */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="section-subtitle mx-auto">
              Une question ? Notre équipe vous répond sous 24h
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Formulaire */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form className="space-y-5">
                {/* Nom & Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-firstName" className="label">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="home-firstName"
                      name="firstName"
                      required
                      className="input"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-lastName" className="label">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="home-lastName"
                      name="lastName"
                      required
                      className="input"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                {/* Email & Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-email" className="label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="home-email"
                      name="email"
                      required
                      className="input"
                      placeholder="jean.dupont@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-phone" className="label">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="home-phone"
                      name="phone"
                      className="input"
                      placeholder="+41 XX XXX XX XX"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label htmlFor="home-subject" className="label">
                    Sujet *
                  </label>
                  <select
                    id="home-subject"
                    name="subject"
                    required
                    className="input"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="information">Demande d'information</option>
                    <option value="inscription">Question sur une inscription</option>
                    <option value="partenariat">Partenariat / Entreprise</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="home-message" className="label">
                    Votre message *
                  </label>
                  <textarea
                    id="home-message"
                    name="message"
                    required
                    rows={4}
                    className="input resize-none"
                    placeholder="Décrivez votre demande..."
                  ></textarea>
                </div>

                {/* RGPD */}
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    J'accepte le traitement de mes données personnelles *
                  </span>
                </label>

                {/* Submit */}
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
