import React from 'react';
import Button from '@/components/ui/Button';

const testimonials = [
  {
    id: '1',
    name: 'Sophie Martinez',
    formation: 'Français B1',
    rating: 5,
    date: 'Il y a 2 mois',
    comment: 'Une expérience exceptionnelle ! Les formateurs sont à l\'écoute et la méthode est très efficace. J\'ai pu progresser rapidement et obtenir ma naturalisation. Je recommande vivement KIC-FORMATIONS.',
    photo: null,
  },
  {
    id: '2',
    name: 'Ahmed Karim',
    formation: 'Bureautique ECDL',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Excellente formation, très pratique et applicable directement dans mon travail. Le formateur était patient et compétent. J\'ai obtenu ma certification du premier coup !',
    photo: null,
  },
  {
    id: '3',
    name: 'Maria Gonzalez',
    formation: 'Anglais B2',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment: 'Horaires flexibles et approche personnalisée. C\'est exactement ce dont j\'avais besoin pour concilier formation et vie professionnelle. Merci à toute l\'équipe !',
    photo: null,
  },
  {
    id: '4',
    name: 'Jean Dupont',
    formation: 'Découverte Numérique',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'À 65 ans, j\'appréhendais un peu l\'informatique. Mais grâce à la patience et la pédagogie du formateur, j\'utilise maintenant mon ordinateur quotidiennement. Formation au top !',
    photo: null,
  },
  {
    id: '5',
    name: 'Fatima Ben Ali',
    formation: 'Français A2',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Très bonne ambiance dans les cours. On apprend en s\'amusant et surtout on progresse vite. Les supports de cours sont clairs et bien organisés.',
    photo: null,
  },
  {
    id: '6',
    name: 'Carlos Silva',
    formation: 'Anglais Professionnel',
    rating: 4,
    date: 'Il y a 1 mois',
    comment: 'Formation adaptée au monde professionnel. J\'ai pu améliorer mes présentations en anglais et ma communication avec mes clients internationaux.',
    photo: null,
  },
];

export default function TemoignagesPage() {
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Témoignages
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Ce qu'ils disent de leurs expériences chez KIC-FORMATIONS
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <div className="bg-primary-50 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-8 h-8 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}/5</p>
            <p className="text-gray-600">
              Basé sur <strong>{testimonials.length} témoignages</strong> vérifiés
            </p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">{testimonial.date}</span>
                </div>

                {/* Comment */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.formation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Témoignage */}
      <section className="section bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Vous aussi, partagez votre expérience !
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Vous avez suivi une formation chez KIC-FORMATIONS ? Laissez-nous votre avis
          </p>
          <Button href="/contact" variant="secondary" size="lg" className="!bg-white !text-primary-600 hover:!bg-gray-100">
            Laisser un témoignage
          </Button>
        </div>
      </section>
    </div>
  );
}
