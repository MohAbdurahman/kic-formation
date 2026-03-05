'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FormationTabs from '@/components/sections/FormationTabs';
import { getFormationBySlug } from '@/data/formations';

export default function FormationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const formation = getFormationBySlug(slug);

  if (!formation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Formation non trouvée
          </h1>
          <p className="text-gray-600 mb-8">
            Désolé, cette formation n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Button href="/formations" variant="primary">
            Voir toutes les formations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Accueil</Link>
            <span>›</span>
            <Link href="/formations" className="hover:text-primary-600">Formations</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{formation.title}</span>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <section className="section">
        <div className="container">
          <div className="lg:flex gap-8">
            {/* Colonne principale (66%) */}
            <div className="lg:w-2/3">
              {/* Hero formation */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="niveau">{formation.level}</Badge>
                  <Badge variant="modalite">{formation.modality}</Badge>
                  {formation.promoPrice && (
                    <Badge variant="promo">
                      -{Math.round(((formation.price - formation.promoPrice) / formation.price) * 100)}%
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                  {formation.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(formation.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2">{formation.rating} ({formation.reviewCount} avis)</span>
                  </div>
                  <span>•</span>
                  <span>{formation.duration}h de formation</span>
                  <span>•</span>
                  <span>Max {formation.maxParticipants} participants</span>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {formation.fullDescription}
                </p>
              </div>

              {/* L'essentiel de la formation - Onglets */}
              <FormationTabs
                objectives={formation.objectives}
                program={formation.program}
                prerequisites={formation.prerequisites}
                duration={formation.duration}
                modality={formation.modality}
                maxParticipants={formation.maxParticipants}
                price={formation.price}
                promoPrice={formation.promoPrice}
              />
            </div>

            {/* Sidebar (33%) */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                {/* Prix */}
                <div className="mb-6">
                  {formation.promoPrice ? (
                    <>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-bold text-primary-600">
                          CHF {formation.promoPrice}.-
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          CHF {formation.price}.-
                        </span>
                      </div>
                      <p className="text-sm text-success-600 font-medium">
                        Économisez CHF {formation.price - formation.promoPrice}.- !
                      </p>
                    </>
                  ) : (
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      CHF {formation.price}.-
                    </div>
                  )}
                  <p className="text-sm text-gray-600">
                    {formation.duration}h de formation • {formation.modality}
                  </p>
                </div>

                {/* Sessions disponibles */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Prochaines sessions
                  </h3>
                  <div className="space-y-3">
                    {formation.sessions.map((session, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <p className="font-medium text-gray-900">{session.date}</p>
                        <p className="text-sm text-gray-600">{session.time}</p>
                        <p className="text-sm text-gray-600">
                          {session.availableSeats} place(s) disponible(s)
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button href="/contact" variant="primary" size="lg" fullWidth className="mb-4">
                  S&apos;inscrire maintenant
                </Button>

                <Button href="/contact" variant="outline" size="md" fullWidth>
                  Demander des informations
                </Button>

                {/* Infos pratiques */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>Rue des Pâquis 11, Genève</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+41772112323" className="hover:text-primary-600">
                      +41 77 211 23 23
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous dès maintenant et commencez votre parcours vers la réussite
          </p>
          <Button href="/contact" variant="secondary" size="lg" className="!bg-white !text-primary-600 hover:!bg-gray-100">
            S&apos;inscrire à cette formation
          </Button>
        </div>
      </section>
    </div>
  );
}
