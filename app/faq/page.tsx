'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

const faqData = [
  {
    category: 'Inscriptions',
    questions: [
      {
        q: 'Comment s\'inscrire à une formation ?',
        a: 'Vous pouvez vous inscrire directement en ligne via notre site web, en cliquant sur le bouton "S\'inscrire" de la formation souhaitée. Vous pouvez également nous contacter par téléphone au +41 77 211 23 23 ou par email à info@kic-formations.ch.',
      },
      {
        q: 'Quels sont les modes de paiement acceptés ?',
        a: 'Nous acceptons les paiements par carte bancaire (via Stripe), PayPal, et virement bancaire. Le paiement peut être effectué en une fois ou en plusieurs fois selon les formations.',
      },
      {
        q: 'Puis-je annuler mon inscription ?',
        a: 'Oui, vous pouvez annuler votre inscription jusqu\'à 7 jours avant le début de la formation pour obtenir un remboursement complet. Au-delà de ce délai, un frais d\'annulation de 30% sera appliqué.',
      },
      {
        q: 'Y a-t-il des prérequis pour les formations ?',
        a: 'Cela dépend de la formation. Les cours de niveau débutant (A1, découverte) n\'ont pas de prérequis. Pour les niveaux intermédiaires et avancés, un test de niveau peut être nécessaire.',
      },
    ],
  },
  {
    category: 'Tarifs & Paiements',
    questions: [
      {
        q: 'Les prix incluent-ils le matériel de cours ?',
        a: 'Oui, tous nos tarifs incluent le matériel pédagogique (manuels, supports de cours, accès aux plateformes en ligne si applicable).',
      },
      {
        q: 'Proposez-vous des facilités de paiement ?',
        a: 'Oui, pour les formations de plus de CHF 800.-, nous proposons un paiement en 2 ou 3 fois sans frais. Contactez-nous pour plus d\'informations.',
      },
      {
        q: 'Y a-t-il des réductions ou promotions ?',
        a: 'Oui, nous proposons régulièrement des promotions (affichées sur notre site). Nous offrons également des tarifs préférentiels pour les demandeurs d\'emploi, étudiants, et inscriptions multiples.',
      },
    ],
  },
  {
    category: 'Déroulement',
    questions: [
      {
        q: 'Où se déroulent les cours ?',
        a: 'Les cours en présentiel ont lieu dans nos locaux au Rue des Pâquis 11, 1201 Genève. Les cours en ligne se déroulent via notre plateforme de visioconférence sécurisée.',
      },
      {
        q: 'Quelle est la durée d\'une formation ?',
        a: 'La durée varie selon les formations, de 12h pour les ateliers courts à 55h pour les cours de langues avancés. Chaque formation indique sa durée totale et le rythme hebdomadaire.',
      },
      {
        q: 'Les cours en ligne, comment ça marche ?',
        a: 'Les cours en ligne se déroulent en direct (pas de vidéos enregistrées) via une plateforme de visioconférence. Vous interagissez en temps réel avec le formateur et les autres participants. Seul requis : un ordinateur/tablette et une connexion internet.',
      },
      {
        q: 'Combien de participants par classe ?',
        a: 'Nous limitons nos groupes à 12 participants maximum pour garantir un suivi personnalisé et une interaction optimale avec le formateur.',
      },
    ],
  },
  {
    category: 'Certifications',
    questions: [
      {
        q: 'Les formations sont-elles certifiantes ?',
        a: 'Certaines formations débouchent sur des certifications reconnues (ECDL pour l\'informatique, DELF/DALF pour le français). Toutes nos formations donnent droit à une attestation de formation.',
      },
      {
        q: 'Recevrai-je un diplôme à la fin ?',
        a: 'Vous recevrez une attestation de suivi de formation mentionnant le nombre d\'heures, le niveau et les compétences acquises. Pour certaines formations, vous pouvez passer une certification officielle.',
      },
    ],
  },
  {
    category: 'Contact & Pratique',
    questions: [
      {
        q: 'Comment vous joindre ?',
        a: 'Par téléphone au +41 77 211 23 23 (Lun-Ven 9h-18h, Sam 9h-12h), par email à info@kic-formations.ch, ou via notre formulaire de contact sur le site. Vous pouvez également nous contacter par WhatsApp.',
      },
      {
        q: 'Puis-je visiter vos locaux avant de m\'inscrire ?',
        a: 'Absolument ! Nous serions ravis de vous accueillir pour vous présenter nos locaux et notre équipe. Prenez rendez-vous via notre page contact ou appelez-nous.',
      },
      {
        q: 'Proposez-vous des cours pour entreprises ?',
        a: 'Oui, nous proposons des formations sur mesure pour les entreprises. Contactez-nous pour discuter de vos besoins spécifiques et recevoir un devis personnalisé.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>
      </section>

      {/* Recherche */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-6 -mt-8 relative z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une question..."
                className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ par catégorie */}
      <section className="section pt-8">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            {faqData.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    catIndex === 0 ? 'bg-gradient-to-br from-[#25318D] to-[#1e2477]' :
                    catIndex === 1 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                    catIndex === 2 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    catIndex === 3 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                    'bg-gradient-to-br from-primary-500 to-accent-500'
                  }`}>
                    {catIndex === 0 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    )}
                    {catIndex === 1 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {catIndex === 2 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {catIndex === 3 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    )}
                    {catIndex === 4 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )}
                  </span>
                  {category.category}
                </h2>

                <div className="space-y-3">
                  {category.questions.map((item, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === key;

                    return (
                      <div
                        key={qIndex}
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(catIndex, qIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                        >
                          <span className="font-semibold text-gray-900 pr-4">
                            {item.q}
                          </span>
                          <svg
                            className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pas trouvé de réponse */}
      <section className="section bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg" className="!bg-white !text-primary-600 hover:!bg-gray-100">
              Nous contacter
            </Button>
            <Button href="tel:+41772112323" variant="outline" size="lg" className="!bg-transparent !border-white !text-white hover:!bg-white hover:!text-primary-600">
              Appeler : +41 77 211 23 23
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
