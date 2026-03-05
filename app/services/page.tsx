import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const ServiceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'francais':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="0" y="0" width="16" height="48" fill="#002395"/>
          <rect x="16" y="0" width="16" height="48" fill="#FFFFFF"/>
          <rect x="32" y="0" width="16" height="48" fill="#ED2939"/>
        </svg>
      );
    case 'anglais':
      return (
        <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z"/>
          </clipPath>
          <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
          </clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      );
    case 'informatique':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'accompagnement':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'ateliers':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    default:
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
  }
};

const services = [
  {
    id: 'langues-francais',
    category: 'Langues - Français',
    iconType: 'francais',
    color: 'from-[#FF4040] to-[#cc2020]',
    items: [
      {
        title: 'Français A1 / A2',
        description: 'Apprenez les bases du français pour communiquer dans la vie quotidienne',
        level: 'Débutant',
        duration: '40-45h',
        href: '/formations/francais-a1-debutant',
      },
      {
        title: 'Français Oral',
        description: 'Perfectionnez votre expression orale et votre prononciation',
        level: 'A2',
        duration: '30h',
        href: '/formations/francais-oral',
      },
      {
        title: 'Français B1 / B2',
        description: 'Atteignez un niveau avancé pour une utilisation professionnelle',
        level: 'Intermédiaire / Avancé',
        duration: '50-55h',
        href: '/formations/francais-b1',
      },
      {
        title: 'Préparation à la Naturalisation',
        description: 'Préparez-vous efficacement pour votre examen de naturalisation suisse',
        level: 'B1',
        duration: '35h',
        href: '/formations/preparation-naturalisation',
      },
      {
        title: 'Alphabétisation',
        description: 'Apprentissage de la lecture et de l\'écriture en français',
        level: 'Débutant',
        duration: 'Sur mesure',
        href: '/contact',
      },
    ],
  },
  {
    id: 'langues-anglais',
    category: 'Langues - Anglais',
    iconType: 'anglais',
    color: 'from-[#FF4040] to-[#cc2020]',
    items: [
      {
        title: 'Anglais A1 / A2',
        description: 'Commencez l\'anglais depuis zéro avec une méthode progressive',
        level: 'Débutant',
        duration: '40h',
        href: '/formations/anglais-a1-a2',
      },
      {
        title: 'Anglais B1 / B2',
        description: 'Développez vos compétences pour voyager et travailler',
        level: 'Intermédiaire / Avancé',
        duration: '45-50h',
        href: '/formations/anglais-b1',
      },
      {
        title: 'Anglais Professionnel',
        description: 'Anglais des affaires et communication en entreprise',
        level: 'B1+',
        duration: '40h',
        href: '/formations/anglais-professionnel',
      },
    ],
  },
  {
    id: 'informatique',
    category: 'Informatique',
    iconType: 'informatique',
    color: 'from-[#F0E815] to-[#c9c310]',
    items: [
      {
        title: 'Découverte du Numérique',
        description: 'Prenez en main l\'ordinateur, internet et les outils digitaux de base',
        level: 'Débutant',
        duration: '30h',
        href: '/formations/decouverte-numerique',
      },
      {
        title: 'Bureautique ECDL',
        description: 'Maîtrisez Word, Excel, PowerPoint et obtenez la certification ECDL',
        level: 'Intermédiaire',
        duration: '50h',
        href: '/formations/bureautique-ecdl',
      },
      {
        title: 'IA & Présentations Professionnelles',
        description: 'Utilisez l\'intelligence artificielle pour créer des présentations impactantes',
        level: 'Intermédiaire',
        duration: '25h',
        href: '/formations/ia-presentations-professionnelles',
      },
    ],
  },
  {
    id: 'accompagnement',
    category: 'Accompagnement Personnalisé',
    iconType: 'accompagnement',
    color: 'from-[#BF5EDC] to-[#9e45c2]',
    items: [
      {
        title: 'Troubles d\'Apprentissage',
        description: 'Soutien personnalisé pour surmonter les difficultés d\'apprentissage (dyslexie, etc.)',
        level: 'Tous niveaux',
        duration: '20h',
        href: '/contact',
      },
      {
        title: 'Coaching Individuel',
        description: 'Accompagnement sur mesure pour atteindre vos objectifs de formation',
        level: 'Tous niveaux',
        duration: '15h',
        href: '/contact',
      },
    ],
  },
  {
    id: 'ateliers',
    category: 'Ateliers de Prévention',
    iconType: 'ateliers',
    color: 'from-[#61CB80] to-[#3fb865]',
    items: [
      {
        title: 'Croyances Limitantes',
        description: 'Identifiez et dépassez les blocages qui vous freinent dans votre apprentissage',
        level: 'Tous niveaux',
        duration: '12h',
        href: '/contact',
      },
      {
        title: 'Gestion des Conflits',
        description: 'Apprenez à gérer les conflits avec sérénité et assertivité',
        level: 'Tous niveaux',
        duration: '12h',
        href: '/contact',
      },
      {
        title: 'Gestion de l\'Anxiété Sociale',
        description: 'Techniques pour gérer le stress et l\'anxiété en situation sociale',
        level: 'Tous niveaux',
        duration: '15h',
        href: '/contact',
      },
      {
        title: 'Prévention du Burn-out',
        description: 'Reconnaître les signes et prévenir l\'épuisement professionnel',
        level: 'Tous niveaux',
        duration: '12h',
        href: '/contact',
      },
      {
        title: 'Confiance et Estime de Soi',
        description: 'Développez votre confiance pour mieux apprendre et progresser',
        level: 'Tous niveaux',
        duration: '15h',
        href: '/contact',
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Nos Services
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Une offre complète pour accompagner votre réussite professionnelle et personnelle
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className="space-y-16">
            {services.map((service) => (
              <div key={service.id} id={service.id} className="scroll-mt-24">
                {/* Titre catégorie */}
                <div className={`bg-gradient-to-r ${service.color} text-white rounded-2xl p-8 mb-6`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl ${service.iconType === 'francais' || service.iconType === 'anglais' ? 'overflow-hidden' : 'flex items-center justify-center bg-white/20'}`}>
                      <ServiceIcon type={service.iconType} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-bold">
                        {service.category}
                      </h2>
                      <p className="text-white/90 mt-1">
                        {service.items.length} formation(s) disponible(s)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grille des formations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6"
                    >
                      <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-2 mb-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Badge variant="niveau">{item.level}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Durée : {item.duration}</span>
                        </div>
                      </div>

                      <Button href={item.href} variant="primary" size="sm" fullWidth>
                        {item.href === '/contact' ? 'Nous contacter' : 'En savoir plus'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nos services */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Pourquoi choisir nos services ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une approche personnalisée et des méthodes éprouvées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                Qualité Certifiée
              </h3>
              <p className="text-gray-600 text-sm">
                Formateurs diplômés et expérimentés
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                Horaires Flexibles
              </h3>
              <p className="text-gray-600 text-sm">
                Cours en journée, soirée et weekend
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                Petits Groupes
              </h3>
              <p className="text-gray-600 text-sm">
                Maximum 12 participants pour un suivi optimal
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                Approche Bienveillante
              </h3>
              <p className="text-gray-600 text-sm">
                Un accompagnement humain et personnalisé
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Prêt à commencer votre formation ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un entretien d'orientation gratuit et trouvons ensemble la formation qui vous correspond
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/formations" variant="secondary" size="lg" className="!bg-white !text-primary-600 hover:!bg-gray-100">
              Voir toutes les formations
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="!bg-transparent !border-white !text-white hover:!bg-white hover:!text-primary-600">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
