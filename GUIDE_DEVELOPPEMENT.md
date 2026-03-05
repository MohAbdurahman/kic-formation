# 🚀 GUIDE DE DÉVELOPPEMENT COMPLET - KIC-FORMATIONS

## ✅ ÉTAT ACTUEL DU PROJET

### Déjà Implémenté

- ✅ **Configuration Next.js + TypeScript + Tailwind**
- ✅ **Types TypeScript complets** (`types/index.ts`)
- ✅ **Layout global** avec Header, Footer responsive
- ✅ **Page d'accueil complète** avec toutes les sections
- ✅ **Page catalogue formations** avec filtres
- ✅ **Composants UI réutilisables** (Button, Badge, WhatsAppButton)
- ✅ **Design system** (couleurs, typographies, styles globaux)

### Serveur de Développement

```bash
npm run dev
```

Le site est accessible sur **http://localhost:3000**

---

## 📂 STRUCTURE COMPLÈTE DU PROJET

```
KIC_FORMATION/
├── app/
│   ├── layout.tsx                 ✅ Layout principal
│   ├── page.tsx                   ✅ Page d'accueil
│   ├── globals.css                ✅ Styles globaux
│   │
│   ├── formations/
│   │   ├── page.tsx               ✅ Catalogue formations
│   │   └── [slug]/
│   │       └── page.tsx           🔴 À créer - Page détail formation
│   │
│   ├── calendrier/
│   │   └── page.tsx               🔴 À créer - Calendrier sessions
│   │
│   ├── inscription/
│   │   └── [sessionId]/
│   │       └── page.tsx           🔴 À créer - Formulaire inscription
│   │
│   ├── services/
│   │   └── page.tsx               🔴 À créer - Services & accompagnements
│   │
│   ├── a-propos/
│   │   └── page.tsx               🔴 À créer - À propos
│   │
│   ├── temoignages/
│   │   └── page.tsx               🔴 À créer - Témoignages
│   │
│   ├── blog/
│   │   ├── page.tsx               🔴 À créer - Liste articles
│   │   └── [slug]/
│   │       └── page.tsx           🔴 À créer - Article détail
│   │
│   ├── contact/
│   │   └── page.tsx               🔴 À créer - Contact
│   │
│   ├── rendez-vous/
│   │   └── page.tsx               🔴 À créer - Prise de rendez-vous
│   │
│   ├── faq/
│   │   └── page.tsx               🔴 À créer - FAQ
│   │
│   ├── mentions-legales/
│   │   └── page.tsx               🔴 À créer - Mentions légales
│   │
│   ├── confidentialite/
│   │   └── page.tsx               🔴 À créer - Politique confidentialité
│   │
│   ├── cookies/
│   │   └── page.tsx               🔴 À créer - Politique cookies
│   │
│   ├── cgv/
│   │   └── page.tsx               🔴 À créer - CGV
│   │
│   └── api/
│       ├── contact/
│       │   └── route.ts           🔴 À créer - API contact
│       ├── newsletter/
│       │   └── route.ts           🔴 À créer - API newsletter
│       ├── inscriptions/
│       │   └── route.ts           🔴 À créer - API inscriptions
│       └── payment/
│           ├── create-intent/
│           │   └── route.ts       🔴 À créer - API Stripe
│           └── webhook/
│               └── route.ts       🔴 À créer - Webhook Stripe
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx             ✅ Bouton réutilisable
│   │   ├── Badge.tsx              ✅ Badge réutilisable
│   │   ├── WhatsAppButton.tsx     ✅ Bouton WhatsApp flottant
│   │   ├── Input.tsx              🔴 À créer
│   │   ├── Select.tsx             🔴 À créer
│   │   ├── Textarea.tsx           🔴 À créer
│   │   ├── Checkbox.tsx           🔴 À créer
│   │   ├── Modal.tsx              🔴 À créer
│   │   ├── Card.tsx               🔴 À créer
│   │   ├── Loading.tsx            🔴 À créer
│   │   └── Pagination.tsx         🔴 À créer
│   │
│   ├── layout/
│   │   ├── Header.tsx             ✅ Header avec nav
│   │   ├── Footer.tsx             ✅ Footer complet
│   │   └── CookieBanner.tsx       🔴 À créer
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx        ✅ Hero homepage
│   │   ├── FormationCard.tsx      🔴 À créer
│   │   ├── TestimonialCard.tsx    🔴 À créer
│   │   ├── BlogCard.tsx           🔴 À créer
│   │   └── StatsSection.tsx       🔴 À créer
│   │
│   └── forms/
│       ├── ContactForm.tsx        🔴 À créer
│       ├── NewsletterForm.tsx     🔴 À créer
│       ├── RegistrationForm.tsx   🔴 À créer
│       ├── TestimonialForm.tsx    🔴 À créer
│       └── AppointmentForm.tsx    🔴 À créer
│
├── lib/
│   ├── data/
│   │   ├── formations.ts          🔴 À créer - Données formations
│   │   ├── testimonials.ts        🔴 À créer - Données témoignages
│   │   ├── blog-posts.ts          🔴 À créer - Données blog
│   │   └── faq.ts                 🔴 À créer - Données FAQ
│   │
│   ├── utils/
│   │   ├── validation.ts          🔴 À créer - Validation formulaires
│   │   ├── format.ts              🔴 À créer - Formatage dates/prix
│   │   └── email.ts               🔴 À créer - Envoi emails
│   │
│   └── stripe.ts                  🔴 À créer - Config Stripe
│
├── types/
│   └── index.ts                   ✅ Types complets
│
├── public/
│   ├── images/
│   │   ├── logo.png               🔴 À ajouter
│   │   ├── og-image.jpg           🔴 À ajouter
│   │   ├── formations/            🔴 À ajouter - Images formations
│   │   └── testimonials/          🔴 À ajouter - Photos témoignages
│   │
│   ├── favicon.ico                🔴 À ajouter
│   ├── apple-touch-icon.png       🔴 À ajouter
│   ├── favicon-32x32.png          🔴 À ajouter
│   └── favicon-16x16.png          🔴 À ajouter
│
├── prisma/
│   └── schema.prisma              🔴 À créer - Schéma DB
│
├── .env.local                     🔴 À créer - Variables environnement
├── .env.example                   🔴 À créer - Exemple variables
├── .gitignore                     🔴 À créer
├── README.md                      🔴 À créer
└── package.json                   ✅ Configuré
```

---

## 🔴 FICHIERS À CRÉER - PAR PRIORITÉ

### PRIORITÉ 1 - Essentiels pour fonctionnement de base

#### 1.  Page Détail Formation
**Fichier**: `app/formations/[slug]/page.tsx`

```typescript
// Template à suivre :
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Récupérer formation depuis données
  return {
    title: `Formation Title | KIC-FORMATIONS`,
    description: 'Description formation',
  };
}

export default function FormationDetailPage({ params }: { params: { slug: string } }) {
  // Structure :
  // - Breadcrumb
  // - Hero avec image formation
  // - Sidebar sticky (prix, sessions, CTA inscription)
  // - Description complète
  // - Objectifs
  // - Programme
  // - Prérequis
  // - Calendrier sessions
  // - Formateur (si applicable)
  // - Témoignages relatifs
  // - FAQ formation
  // - Formations similaires
}
```

#### 2. Page Contact
**Fichier**: `app/contact/page.tsx`

Structure :
- Formulaire contact (prénom, nom, email, téléphone, sujet, message)
- Validation en temps réel
- Infos de contact (adresse, téléphone, email, horaires)
- Carte Google Maps
- Liens réseaux sociaux
- CTA rendez-vous

#### 3. Pages Légales (RGPD)

**`app/mentions-legales/page.tsx`**
```typescript
export default function MentionsLegalesPage() {
  return (
    <div className="container py-24">
      <h1>Mentions Légales</h1>
      // Contenu légal obligatoire
    </div>
  );
}
```

Même structure pour :
- `app/confidentialite/page.tsx`
- `app/cookies/page.tsx`
- `app/cgv/page.tsx`

#### 4. Composant Cookie Banner
**Fichier**: `components/layout/CookieBanner.tsx`

```typescript
'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setShow(false);
  };

  // Banner avec options : Accepter / Refuser / Personnaliser
}
```

Ajouter dans `app/layout.tsx` :
```typescript
import CookieBanner from '@/components/layout/CookieBanner';

// Dans le body, après <WhatsAppButton />
<CookieBanner />
```

---

### PRIORITÉ 2 - Fonctionnalités clés

#### 5. Système d'Inscription

**`app/inscription/[sessionId]/page.tsx`**

Multi-étapes :
1. Informations formation (niveau actuel, besoins)
2. Coordonnées personnelles
3. Paiement Stripe
4. Confirmation

Utiliser un state management (useState ou Context) pour gérer les étapes.

#### 6. API Routes

**`app/api/contact/route.ts`**
```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation
    // Envoi email via Resend/SendGrid
    // Sauvegarde en DB (optionnel)

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
```

Même structure pour :
- `app/api/newsletter/route.ts`
- `app/api/inscriptions/route.ts`

#### 7. Intégration Stripe

**`lib/stripe.ts`**
```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});
```

**`app/api/payment/create-intent/route.ts`**
```typescript
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { amount, sessionId } = await request.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // En centimes
    currency: 'chf',
    metadata: { sessionId },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
```

#### 8. Variables d'Environnement

**`.env.local`**
```env
# Database (si Prisma)
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

**`.env.example`**
```env
# Copier en .env.local et remplir les valeurs

DATABASE_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GA_ID=
```

---

### PRIORITÉ 3 - Pages complémentaires

#### 9. Page Services
**`app/services/page.tsx`**

Sections par onglets ou accordéon :
- Langues - Français (A1/A2, Oral, B1/B2, Naturalisation, Alphabétisation)
- Langues - Anglais (A1/A2, B1/B2, Professionnel)
- Informatique (Découverte, ECDL, IA)
- Accompagnement (Troubles apprentissage, Coaching)
- Ateliers (Croyances, Conflits, Anxiété, Burn-out, Estime)

Chaque service avec :
- Description
- Public cible
- Bénéfices
- CTA vers formations ou contact

#### 10. Page À Propos
**`app/a-propos/page.tsx`**

- Notre histoire
- Nos valeurs (Excellence, Bienveillance, Adaptation)
- Notre équipe (photos + bios formateurs)
- Certifications & agréments
- Nos locaux (galerie photos)
- Chiffres & impact

#### 11. Page Témoignages
**`app/temoignages/page.tsx`**

- Note globale (4.8/5)
- Filtres (formation, note)
- Grille de témoignages avec pagination
- Formulaire ajout témoignage (avec modération)

#### 12. Page FAQ
**`app/faq/page.tsx`**

Accordéon par catégories :
- Inscriptions
- Tarifs & Paiements
- Déroulement
- Certifications
- Contact

Avec barre de recherche.

#### 13. Blog
**`app/blog/page.tsx`** et **`app/blog/[slug]/page.tsx`**

Liste articles avec :
- Featured article (hero)
- Filtres par catégorie
- Grid d'articles
- Pagination

Article détail avec :
- Featured image
- Contenu riche
- Partage social
- Articles similaires
- Newsletter CTA

#### 14. Calendrier
**`app/calendrier/page.tsx`**

- Vue calendrier interactif (librairie : react-big-calendar ou custom)
- Filtres par catégorie formation
- Clic sur date → voir sessions du jour
- Liste des sessions à venir
- CTA inscription

#### 15. Rendez-vous
**`app/rendez-vous/page.tsx`**

- Sélection type de RDV (visite, orientation, coaching)
- Calendrier avec créneaux disponibles
- Formulaire coordonnées
- Confirmation par email

---

### PRIORITÉ 4 - Optimisations

#### 16. Composants UI Additionnels

**`components/ui/Input.tsx`**
```typescript
interface InputProps {
  label: string;
  type?: string;
  error?: string;
  // ...
}

export default function Input({ label, type = 'text', error, ...props }: InputProps) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        className={`input ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
```

Créer également :
- `Select.tsx`
- `Textarea.tsx`
- `Checkbox.tsx`
- `Modal.tsx`
- `Card.tsx`
- `Loading.tsx` (spinner)
- `Pagination.tsx`

#### 17. Données Statiques

**`lib/data/formations.ts`**
```typescript
import { Formation } from '@/types';

export const formations: Formation[] = [
  // Toutes les formations avec détails complets
];

export function getFormationBySlug(slug: string) {
  return formations.find(f => f.slug === slug);
}

export function getFeaturedFormations() {
  return formations.filter(f => f.isFeatured);
}
```

Même principe pour :
- `lib/data/testimonials.ts`
- `lib/data/blog-posts.ts`
- `lib/data/faq.ts`

#### 18. Utilitaires

**`lib/utils/validation.ts`**
```typescript
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePhone(phone: string): boolean {
  const regex = /^(\+41|0)[0-9]{9}$/;
  return regex.test(phone.replace(/\s/g, ''));
}

// Autres validations...
```

**`lib/utils/format.ts`**
```typescript
export function formatPrice(price: number): string {
  return `CHF ${price}.-`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}
```

**`lib/utils/email.ts`**
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: any) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: 'info@kic-formations.ch',
    subject: `Nouveau contact : ${data.subject}`,
    html: `<p>${data.message}</p>`,
  });
}

// Templates pour autres emails...
```

---

### PRIORITÉ 5 - Base de données (optionnel au début)

#### 19. Prisma Setup

**Installation** :
```bash
npm install prisma @prisma/client
npx prisma init
```

**`prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Formation {
  id                String   @id @default(cuid())
  slug              String   @unique
  category          String
  title             String
  shortDescription  String
  fullDescription   String   @db.Text
  objectives        String[]
  prerequisites     String
  duration          Int
  level             String
  modality          String
  price             Float
  promoPrice        Float?
  maxParticipants   Int
  imageUrl          String
  syllabus          String?  @db.Text
  isActive          Boolean  @default(true)
  isFeatured        Boolean  @default(false)
  seoTitle          String
  seoDescription    String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  sessions          Session[]
  testimonials      Testimonial[]
}

model Session {
  id                    String   @id @default(cuid())
  formationId           String
  formation             Formation @relation(fields: [formationId], references: [id])
  startDate             DateTime
  endDate               DateTime
  schedule              String
  availableSeats        Int
  location              String
  instructor            String?
  status                String
  registrationDeadline  DateTime

  registrations         Registration[]
}

model Registration {
  id                    String   @id @default(cuid())
  sessionId             String
  session               Session  @relation(fields: [sessionId], references: [id])

  firstName             String
  lastName              String
  email                 String
  phone                 String
  dateOfBirth           DateTime?
  address               String?
  city                  String?
  postalCode            String?
  country               String   @default("Suisse")

  currentLevel          String?
  specialNeeds          String?  @db.Text
  comments              String?  @db.Text

  registrationDate      DateTime @default(now())
  status                String
  paymentStatus         String
  paymentId             String?

  documentsSubmitted    Boolean  @default(false)
  documentsUrls         String[]

  consentMarketing      Boolean
  consentDataProcessing Boolean
  ipAddress             String

  payment               Payment?
}

model Payment {
  id                      String   @id @default(cuid())
  registrationId          String   @unique
  registration            Registration @relation(fields: [registrationId], references: [id])
  amount                  Float
  currency                String   @default("CHF")
  method                  String
  status                  String
  transactionId           String?
  stripePaymentIntentId   String?
  paypalOrderId           String?
  paidAt                  DateTime?
  refundedAt              DateTime?
  refundAmount            Float?
  createdAt               DateTime @default(now())
}

model Testimonial {
  id                String   @id @default(cuid())
  studentName       String
  formationId       String?
  formation         Formation? @relation(fields: [formationId], references: [id])
  rating            Int
  comment           String   @db.Text
  photo             String?
  isApproved        Boolean  @default(false)
  isVisible         Boolean  @default(false)
  createdAt         DateTime @default(now())
}

model ContactRequest {
  id                String   @id @default(cuid())
  firstName         String
  lastName          String
  email             String
  phone             String?
  subject           String
  message           String   @db.Text
  formationType     String?
  status            String   @default("NEW")
  createdAt         DateTime @default(now())
}

model NewsletterSubscriber {
  id                String   @id @default(cuid())
  email             String   @unique
  firstName         String?
  subscribedAt      DateTime @default(now())
  isActive          Boolean  @default(true)
  unsubscribedAt    DateTime?
}
```

**Commandes Prisma** :
```bash
# Générer le client
npx prisma generate

# Créer/migrer la DB
npx prisma migrate dev --name init

# Studio (interface admin)
npx prisma studio
```

---

## 🎨 ASSETS À CRÉER/OBTENIR

### Images Nécessaires

1. **Logo KIC-FORMATIONS** (`public/logo.png`)
   - Format PNG transparent
   - Versions : logo complet, logo icon

2. **Images formations** (`public/images/formations/`)
   - Une image par formation
   - Format: 800x600px minimum
   - Optimiser avec TinyPNG

3. **Photos témoignages** (`public/images/testimonials/`)
   - Photos professionnelles ou avatars
   - Format: 400x400px (carré)

4. **Image Open Graph** (`public/og-image.jpg`)
   - 1200x630px
   - Pour partage réseaux sociaux

5. **Favicons**
   - Générer avec https://realfavicongenerator.net/
   - Placer tous les fichiers dans `public/`

### Contenus Textuels

Rédiger/obtenir :
- Descriptions complètes de chaque formation
- Biographies formateurs
- Articles de blog (au moins 5)
- FAQ (au moins 20 questions/réponses)
- CGV complètes
- Politique de confidentialité conforme RGPD

---

## 📦 DÉPENDANCES SUPPLÉMENTAIRES

```bash
# Stripe
npm install stripe @stripe/stripe-js @stripe/react-stripe-js

# Email
npm install resend

# Validation formulaires
npm install zod react-hook-form @hookform/resolvers

# Dates
npm install date-fns

# Calendrier (si besoin)
npm install react-big-calendar

# Icons (optionnel)
npm install lucide-react

# Prisma (si DB)
npm install prisma @prisma/client
npm install -D prisma
```

---

## 🚀 PROCHAINES ÉTAPES RECOMMANDÉES

### Semaine 1 : Pages essentielles
1. Créer page détail formation
2. Créer pages légales (mentions, confidentialité, cookies, CGV)
3. Créer page contact avec formulaire
4. Implémenter cookie banner

### Semaine 2 : Formulaires et API
1. Créer composants formulaires (Input, Select, etc.)
2. Implémenter API routes (contact, newsletter)
3. Créer page services
4. Créer page à propos

### Semaine 3 : Inscription et paiement
1. Créer formulaire d'inscription multi-étapes
2. Intégrer Stripe
3. Créer API paiement et webhooks
4. Tester parcours complet

### Semaine 4 : Contenu et finitions
1. Créer pages témoignages, FAQ, calendrier
2. Créer système de blog
3. Créer page rendez-vous
4. Ajouter toutes les images
5. Rédiger tous les contenus

### Semaine 5 : Base de données (optionnel)
1. Setup Prisma
2. Migrer données statiques vers DB
3. Créer admin panel (optionnel)

### Semaine 6 : Tests et déploiement
1. Tests sur tous navigateurs
2. Tests responsive
3. Optimisations performances
4. SEO final
5. Déploiement Vercel

---

## 📊 MÉTRIQUES DE SUCCÈS

Avant le lancement, vérifier :
- ✅ Google PageSpeed > 90 (mobile et desktop)
- ✅ Tous les liens fonctionnent
- ✅ Formulaires testés et fonctionnels
- ✅ Paiement de test réussi
- ✅ Emails envoyés correctement
- ✅ Responsive parfait sur mobile/tablette/desktop
- ✅ SEO : meta tags sur toutes les pages
- ✅ Accessibilité : navigation au clavier
- ✅ RGPD : conformité totale
- ✅ Analytics configurés
- ✅ Favicon et Open Graph

---

## 🛠️ OUTILS UTILES

- **Conception** : Figma (maquettes)
- **Images** : Unsplash, Pexels (photos libres)
- **Icons** : Lucide, Heroicons
- **Optimisation images** : TinyPNG, Squoosh
- **Testing** : Chrome DevTools, Lighthouse
- **SEO** : Google Search Console, Screaming Frog
- **Analytics** : Google Analytics 4, Hotjar
- **Monitoring** : Sentry, Vercel Analytics

---

## 📞 SUPPORT

Pour toute question sur le développement :
1. Consulter la documentation Next.js : https://nextjs.org/docs
2. Documentation Tailwind : https://tailwindcss.com/docs
3. Documentation Stripe : https://stripe.com/docs
4. Stack Overflow pour questions spécifiques

---

**✨ Bon développement ! L'architecture est solide, il ne reste plus qu'à implémenter les fonctionnalités une par une.**
