'use client';

import { useState, useEffect } from 'react';
import { getData } from '@/lib/db';

interface Partner {
  id: string;
  name: string;
}

const defaultPartners: Partner[] = [
  { id: '1', name: 'Rolex' },
  { id: '2', name: 'Nestlé' },
  { id: '3', name: 'UBS' },
  { id: '4', name: 'Credit Suisse' },
  { id: '5', name: 'Swisscom' },
  { id: '6', name: 'Novartis' },
  { id: '7', name: 'ABB' },
  { id: '8', name: 'Zurich Insurance' },
  { id: '9', name: 'Migros' },
  { id: '10', name: 'Coop' },
];

export default function PartnersSectionClient() {
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);

  useEffect(() => {
    getData<{ partners?: Partner[] }>('accueil', {}).then(data => {
      if (data.partners && data.partners.length > 0) {
        setPartners(data.partners);
      }
    });
  }, []);

  return (
    <>
      {/* Premiere ligne - defilement vers la gauche */}
      <div className="flex animate-scroll-left mb-6">
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={`row1-${index}`}
            className="flex-shrink-0 mx-8 w-40 h-20 bg-white rounded-xl shadow-sm flex items-center justify-center px-6 hover:shadow-md transition-shadow"
          >
            <span className="text-gray-700 font-semibold text-lg whitespace-nowrap">{partner.name}</span>
          </div>
        ))}
      </div>

      {/* Deuxieme ligne - defilement vers la droite */}
      <div className="flex animate-scroll-right">
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={`row2-${index}`}
            className="flex-shrink-0 mx-8 w-40 h-20 bg-white rounded-xl shadow-sm flex items-center justify-center px-6 hover:shadow-md transition-shadow"
          >
            <span className="text-gray-700 font-semibold text-lg whitespace-nowrap">{partner.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
