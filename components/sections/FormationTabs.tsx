'use client';

import { useState } from 'react';

interface Module {
  title: string;
  content: string;
}

interface FormationTabsProps {
  objectives: string[];
  program: Module[];
  prerequisites: string;
  duration: number;
  modality: string;
  maxParticipants: number;
  price: number;
  promoPrice?: number;
}

type TabId = 'objectifs' | 'programme' | 'deroule' | 'prerequis' | 'tarif';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'objectifs',
    label: 'Les objectifs',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'programme',
    label: 'Le programme',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'deroule',
    label: 'Le déroulé',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'prerequis',
    label: 'Les prérequis',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'tarif',
    label: 'Tarif & financement',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function FormationTabs({
  objectives,
  program,
  prerequisites,
  duration,
  modality,
  maxParticipants,
  price,
  promoPrice,
}: FormationTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('objectifs');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'objectifs':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              À l'issue de cette formation, vous serez capable de :
            </p>
            <ul className="space-y-3">
              {objectives.map((obj, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'programme':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Découvrez le contenu détaillé de la formation :
            </p>
            <div className="space-y-4">
              {program.map((module, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-6 py-3 bg-gray-50 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                  <p className="text-gray-600 text-sm">{module.content}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'deroule':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-6">
              Informations pratiques sur le déroulement de la formation :
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Durée</h3>
                </div>
                <p className="text-gray-700 text-lg font-medium">{duration} heures</p>
              </div>

              <div className="bg-[#25318D]/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#25318D] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Modalité</h3>
                </div>
                <p className="text-gray-700 text-lg font-medium">{modality}</p>
              </div>

              <div className="bg-accent-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Effectif</h3>
                </div>
                <p className="text-gray-700 text-lg font-medium">Maximum {maxParticipants} participants</p>
              </div>

              <div className="bg-success-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-success-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Lieu</h3>
                </div>
                <p className="text-gray-700 text-lg font-medium">Rue des Pâquis 11, Genève</p>
              </div>
            </div>
          </div>
        );

      case 'prerequis':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Conditions requises pour suivre cette formation :
            </p>
            <div className="bg-primary-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prérequis</h3>
                  <p className="text-gray-700">{prerequisites}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tarif':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-6">
              Investissez dans votre avenir avec cette formation :
            </p>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8">
              <div className="text-center mb-6">
                {promoPrice ? (
                  <>
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <span className="text-4xl font-bold text-primary-600">
                        CHF {promoPrice}.-
                      </span>
                      <span className="text-2xl text-gray-400 line-through">
                        CHF {price}.-
                      </span>
                    </div>
                    <p className="text-success-600 font-medium">
                      Économisez CHF {price - promoPrice}.- !
                    </p>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-primary-600">
                    CHF {price}.-
                  </span>
                )}
              </div>

              <div className="border-t border-primary-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-center">Le tarif comprend :</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{duration} heures de formation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Supports de cours inclus</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Accès aux ressources en ligne</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Attestation de formation</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-primary-200">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">Options de financement</h3>
                <p className="text-gray-600 text-center text-sm">
                  Paiement en plusieurs fois possible. Contactez-nous pour plus d'informations sur les possibilités de financement.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Titre de la section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-5">
        <h2 className="text-xl font-heading font-bold text-white">
          L'essentiel de la formation
        </h2>
      </div>

      {/* Navigation des onglets */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 bg-primary-50'
                  : 'border-transparent text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="p-8">
        {renderTabContent()}
      </div>
    </div>
  );
}
