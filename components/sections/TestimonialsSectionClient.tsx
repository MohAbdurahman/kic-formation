'use client';

import { useState, useEffect } from 'react';
import TestimonialsCarousel from './TestimonialsCarousel';
import { getData } from '@/lib/db';

interface Testimonial {
  id: string;
  name: string;
  formation: string;
  rating: number;
  comment: string;
}

const defaultTestimonials: Testimonial[] = [
  { id: '1', name: 'Sophie M.', formation: 'Français B1', rating: 5, comment: "Une expérience exceptionnelle ! Les formateurs sont à l'écoute et la méthode est très efficace. J'ai pu progresser rapidement et obtenir ma naturalisation." },
  { id: '2', name: 'Ahmed K.', formation: 'Bureautique', rating: 5, comment: "Excellente formation, très pratique et applicable directement dans mon travail. Le formateur était patient et compétent." },
  { id: '3', name: 'Maria G.', formation: 'Anglais B2', rating: 5, comment: "Horaires flexibles et approche personnalisée. C'est exactement ce dont j'avais besoin pour concilier formation et vie professionnelle." },
  { id: '4', name: 'Jean-Pierre L.', formation: 'Français A2', rating: 5, comment: "Grâce à KIC-FORMATIONS, j'ai pu améliorer mon français et décrocher un meilleur poste. Je recommande vivement !" },
  { id: '5', name: 'Elena R.', formation: 'Informatique', rating: 5, comment: "Formation complète et bien structurée. Les exercices pratiques m'ont permis de maîtriser Excel et Word en quelques semaines." },
];

export default function TestimonialsSectionClient() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  useEffect(() => {
    getData<{ testimonials?: Testimonial[] }>('accueil', {}).then(data => {
      if (data.testimonials && data.testimonials.length > 0) {
        setTestimonials(data.testimonials);
      }
    });
  }, []);

  return <TestimonialsCarousel testimonials={testimonials} />;
}
