# 🎓 KIC-FORMATIONS

**Site web officiel du centre de formation continue KIC-FORMATIONS à Genève**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 À Propos

KIC-FORMATIONS est un centre de formation continue basé à Genève proposant :
- 🇫🇷 **Cours de langues** (Français, Anglais) - Niveaux A1 à B2
- 💻 **Formations en informatique** (Bureautique, ECDL, IA)
- 🎯 **Ateliers de développement personnel**
- 🤝 **Accompagnements personnalisés**

**Slogan** : *La réussite pour tous*

## ✨ Fonctionnalités

### Implémenté
- ✅ Page d'accueil complète et responsive
- ✅ Catalogue des formations avec filtres
- ✅ Navigation responsive avec menu mobile
- ✅ Design system complet (Tailwind CSS)
- ✅ Composants UI réutilisables
- ✅ Bouton WhatsApp flottant
- ✅ Footer avec toutes les informations
- ✅ Types TypeScript complets
- ✅ SEO optimisé avec metadata

### À Venir
- 🔜 Pages détail des formations
- 🔜 Système d'inscription en ligne
- 🔜 Intégration paiement Stripe
- 🔜 Calendrier des sessions
- 🔜 Blog
- 🔜 Témoignages
- 🔜 Formulaire de contact
- 🔜 Conformité RGPD complète

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le dépôt (si applicable)
git clone https://github.com/votre-org/kic-formations.git
cd kic-formations

# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📂 Structure du Projet

```
kic-formations/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── formations/        # Catalogue et détails
│   ├── contact/           # Page contact
│   └── api/               # API Routes
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   ├── layout/           # Header, Footer
│   ├── sections/         # Sections de pages
│   └── forms/            # Formulaires
├── lib/                   # Utilitaires et helpers
│   ├── data/             # Données statiques
│   └── utils/            # Fonctions utilitaires
├── types/                 # Types TypeScript
├── public/                # Assets statiques
└── prisma/                # Schéma base de données
```

## 🛠️ Technologies

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router)
- **Language** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS 4](https://tailwindcss.com/)
- **Base de données** : [Prisma](https://www.prisma.io/) + PostgreSQL (à venir)
- **Paiement** : [Stripe](https://stripe.com/) (à venir)
- **Email** : [Resend](https://resend.com/) (à venir)
- **Déploiement** : [Vercel](https://vercel.com/)

## 📜 Scripts Disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de développement

# Production
npm run build        # Build pour production
npm run start        # Démarrer le serveur de production

# Qualité du code
npm run lint         # Linter ESLint

# Base de données (Prisma)
npx prisma generate  # Générer le client Prisma
npx prisma migrate   # Appliquer les migrations
npx prisma studio    # Interface admin DB
```

## 🌍 Variables d'Environnement

Créer un fichier `.env.local` :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/kic_formations"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# Email
RESEND_API_KEY="re_xxx"
EMAIL_FROM="info@kic-formations.ch"

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaXXX"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

## 📖 Documentation

- [Guide de développement complet](GUIDE_DEVELOPPEMENT.md)
- [Architecture du système](ARCHITECTURE.md)

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Convention de Code

- **Composants** : PascalCase (`FormationCard.tsx`)
- **Fonctions** : camelCase (`getFormationBySlug()`)
- **Constantes** : UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Fichiers** : kebab-case pour les routes (`a-propos/`)
- **Commits** : [Conventional Commits](https://www.conventionalcommits.org/)

## 📊 Performance

Objectifs de performance :
- Google PageSpeed Score : > 90
- First Contentful Paint : < 1.5s
- Time to Interactive : < 3s
- Cumulative Layout Shift : < 0.1

## 🔒 Sécurité

- HTTPS obligatoire en production
- Variables sensibles dans `.env.local` (jamais commitées)
- Validation server-side de tous les formulaires
- Protection CSRF sur toutes les API routes
- Conformité RGPD totale

## 📞 Contact

**KIC-FORMATIONS**
- 📍 Adresse : Rue des Pâquis 11, 1201 Genève, Suisse
- 📞 Téléphone : [+41 77 211 23 23](tel:+41772112323)
- ✉️ Email : [info@kic-formations.ch](mailto:info@kic-formations.ch)
- 🌐 Site web : https://kic-formations.ch

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ pour KIC-FORMATIONS**

*La réussite pour tous*
