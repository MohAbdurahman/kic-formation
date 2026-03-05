'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      formation: formData.get('formation'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur lors de l'envoi");
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Message envoyé !
        </h2>
        <p className="text-gray-600 mb-6">
          Merci pour votre message. Notre équipe vous répondra sous 24h ouvrées.
          Un email de confirmation vous a été envoyé.
        </p>
        <Button
          variant="primary"
          onClick={() => setStatus('idle')}
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
        Envoyez-nous un message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom & Prénom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="label">
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="input"
              placeholder="Jean"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="label">
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="input"
              placeholder="Dupont"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input"
            placeholder="jean.dupont@email.com"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label htmlFor="phone" className="label">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="input"
            placeholder="+41 XX XXX XX XX"
          />
        </div>

        {/* Sujet */}
        <div>
          <label htmlFor="subject" className="label">
            Sujet *
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="input"
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="information">Demande d&apos;information</option>
            <option value="inscription">Question sur une inscription</option>
            <option value="partenariat">Partenariat / Entreprise</option>
            <option value="reclamation">Réclamation</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        {/* Formation concernée */}
        <div>
          <label htmlFor="formation" className="label">
            Formation concernée (optionnel)
          </label>
          <select
            id="formation"
            name="formation"
            className="input"
          >
            <option value="">Aucune formation spécifique</option>
            <option value="francais-a1">Français A1</option>
            <option value="francais-a2">Français A2</option>
            <option value="francais-b1">Français B1</option>
            <option value="francais-b2">Français B2</option>
            <option value="anglais-a1-a2">Anglais A1/A2</option>
            <option value="anglais-b1">Anglais B1</option>
            <option value="anglais-b2">Anglais B2</option>
            <option value="bureautique">Bureautique ECDL</option>
            <option value="informatique">Découverte Numérique</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="label">
            Votre message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="input resize-none"
            placeholder="Décrivez votre demande..."
          ></textarea>
        </div>

        {/* RGPD */}
        <div className="space-y-3">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">
              J&apos;accepte le traitement de mes données personnelles conformément à la{' '}
              <a href="/confidentialite" className="text-primary-600 hover:underline">
                politique de confidentialité
              </a>{' '}
              *
            </span>
          </label>

          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">
              J&apos;accepte de recevoir des informations sur les formations et actualités de KIC-FORMATIONS
            </span>
          </label>
        </div>

        {/* Error message */}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          * Champs obligatoires - Nous vous répondrons sous 24h ouvrées
        </p>
      </form>
    </div>
  );
}
