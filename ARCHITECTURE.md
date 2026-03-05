# ARCHITECTURE COMPLÈTE - KIC-FORMATIONS

## 📋 RÉSUMÉ EXÉCUTIF

### Vision du Projet
Plateforme web institutionnelle moderne permettant la découverte, l'inscription et le paiement en ligne pour un centre de formation continue basé à Genève.

### Objectif Principal
Créer un parcours utilisateur fluide : **Découverte → Information → Inscription → Paiement → Confirmation**

### KPIs de Succès
- Taux de conversion inscription : objectif 5-8%
- Temps moyen de parcours inscription : < 5 minutes
- Taux de complétion paiement : > 80%
- Score Google PageSpeed : > 90
- Taux de rebond : < 40%

---

## 🏗️ ARCHITECTURE SYSTÈME

### Stack Technique Recommandée

#### Option 1 : Next.js (Recommandé pour performance & SEO)
```
Frontend:
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)

Backend:
- Next.js API Routes
- Prisma ORM
- PostgreSQL

Services Tiers:
- Stripe (paiement)
- PayPal (paiement alternatif)
- Resend / SendGrid (emails transactionnels)
- Uploadthing (gestion documents)
- Google Maps API
- Google Analytics 4

Déploiement:
- Vercel (recommandé)
- Alternative: AWS / Azure
```

#### Option 2 : WordPress (Si préférence CMS)
```
- WordPress 6.4+
- WooCommerce (gestion formations)
- Elementor Pro / Bricks Builder
- LearnDash / LifterLMS
- Stripe for WooCommerce
- WPML (multilingue si besoin)
```

#### Option 3 : Stack Full Séparée
```
Frontend:
- React / Vue.js
- Vite

Backend:
- Node.js + Express
- ou Django / FastAPI (Python)

Base de données:
- PostgreSQL
- Redis (cache)
```

**✅ Recommandation : Next.js** pour :
- SEO optimal (SSR/SSG)
- Performance native
- Développement moderne
- Évolutivité
- Coût d'hébergement réduit

---

## 📊 MODÈLE DE DONNÉES

### Entités Principales

```typescript
// FORMATIONS
Formation {
  id: string
  slug: string
  category: Category (LANGUES_FR | LANGUES_EN | INFORMATIQUE | ACCOMPAGNEMENT | ATELIERS)
  title: string
  shortDescription: string
  fullDescription: string
  objectives: string[]
  prerequisites: string
  duration: number (heures)
  level: Level (A1 | A2 | B1 | B2 | DEBUTANT | INTERMEDIAIRE | AVANCE)
  modality: Modality (PRESENTIEL | LIGNE | HYBRIDE)
  price: decimal
  promoPrice?: decimal
  maxParticipants: number
  imageUrl: string
  syllabus?: string
  isActive: boolean
  isFeatured: boolean
  seoTitle: string
  seoDescription: string
  createdAt: datetime
  updatedAt: datetime
}

// SESSIONS DE FORMATION
Session {
  id: string
  formationId: string (FK)
  startDate: datetime
  endDate: datetime
  schedule: string (ex: "Lundi/Mercredi 18h-20h")
  availableSeats: number
  location: string
  instructor?: string
  status: SessionStatus (UPCOMING | ONGOING | COMPLETED | CANCELLED)
  registrationDeadline: datetime
}

// INSCRIPTIONS
Registration {
  id: string
  sessionId: string (FK)
  userId?: string (FK - si compte créé)

  // Informations personnelles
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth?: date
  address?: string
  city?: string
  postalCode?: string
  country?: string

  // Informations formation
  currentLevel?: string
  specialNeeds?: string
  comments?: text

  // Informations administratives
  registrationDate: datetime
  status: RegistrationStatus (PENDING | CONFIRMED | CANCELLED | COMPLETED)
  paymentStatus: PaymentStatus (PENDING | PAID | REFUNDED | FAILED)
  paymentId?: string

  // Documents
  documentsSubmitted: boolean
  documentsUrls?: string[]

  // RGPD
  consentMarketing: boolean
  consentDataProcessing: boolean
  ipAddress: string
}

// PAIEMENTS
Payment {
  id: string
  registrationId: string (FK)
  amount: decimal
  currency: string (CHF)
  method: PaymentMethod (STRIPE | PAYPAL | BANK_TRANSFER)
  status: PaymentStatus
  transactionId?: string
  stripePaymentIntentId?: string
  paypalOrderId?: string
  paidAt?: datetime
  refundedAt?: datetime
  refundAmount?: decimal
}

// UTILISATEURS (optionnel - pour espace membre)
User {
  id: string
  email: string (unique)
  passwordHash?: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole (STUDENT | INSTRUCTOR | ADMIN)
  isVerified: boolean
  createdAt: datetime
  lastLogin?: datetime
}

// TÉMOIGNAGES
Testimonial {
  id: string
  studentName: string
  formationId?: string (FK)
  rating: number (1-5)
  comment: text
  photo?: string
  isApproved: boolean
  isVisible: boolean
  createdAt: datetime
}

// BLOG
BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: text
  featuredImage: string
  category: string
  tags: string[]
  authorId: string (FK)
  publishedAt?: datetime
  isPublished: boolean
  seoTitle: string
  seoDescription: string
  viewCount: number
}

// CONTACTS / DEMANDES
ContactRequest {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: text
  formationType?: string
  status: ContactStatus (NEW | IN_PROGRESS | RESOLVED)
  createdAt: datetime
}

// NEWSLETTER
NewsletterSubscriber {
  id: string
  email: string (unique)
  firstName?: string
  subscribedAt: datetime
  isActive: boolean
  unsubscribedAt?: datetime
}

// PARTENAIRES
Partner {
  id: string
  name: string
  logo: string
  website?: string
  description?: text
  order: number
  isVisible: boolean
}

// RENDEZ-VOUS
Appointment {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  requestedDate: datetime
  requestedTime: string
  purpose: string
  message?: text
  status: AppointmentStatus (PENDING | CONFIRMED | CANCELLED | COMPLETED)
  confirmedDateTime?: datetime
}
```

---

## 🗺️ ARCHITECTURE DES PAGES

### 1. Page d'Accueil (`/`)

**Objectif** : Convertir en maximum 10 secondes

**Structure** :

```
┌─────────────────────────────────────┐
│ HEADER STICKY                       │
│ - Logo KIC-FORMATIONS               │
│ - Menu principal                    │
│ - Bouton CTA "S'inscrire"          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ HERO SECTION                        │
│ - Slogan : "La réussite pour tous" │
│ - Sous-titre percutant             │
│ - CTA primaire : "Découvrir"       │
│ - CTA secondaire : "Nous contacter"│
│ - Image/vidéo inspirante           │
│ - Trust badges (certifications)    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ FORMATIONS PHARES (3-4 cartes)     │
│ - Titre + description courte        │
│ - Prix + niveau                     │
│ - Badge "Places limitées"          │
│ - CTA "En savoir plus"             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ POURQUOI KIC-FORMATIONS ?          │
│ - 4 piliers en grid:               │
│   • Formateurs experts             │
│   • Méthodes adaptées              │
│   • Horaires flexibles             │
│   • Suivi personnalisé             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ OFFRES FLASH / PROMOTIONS          │
│ - Bannière colorée                  │
│ - Compte à rebours si limité       │
│ - CTA urgent                        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ TÉMOIGNAGES (Carousel)             │
│ - 5-6 témoignages avec photos      │
│ - Note étoiles                      │
│ - Nom + formation suivie           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CHIFFRES CLÉS                       │
│ - X étudiants formés               │
│ - X% de réussite                   │
│ - X années d'expérience            │
│ - X formations disponibles         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ PARTENAIRES / CERTIFICATIONS       │
│ - Logos en slider                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ARTICLES BLOG (3 derniers)         │
│ - Thumbnail + titre + excerpt       │
│ - CTA "Lire l'article"             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NEWSLETTER                          │
│ - Titre accrocheur                  │
│ - Formulaire email                  │
│ - RGPD checkbox                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ FOOTER                              │
│ - Liens rapides                     │
│ - Coordonnées complètes            │
│ - Réseaux sociaux                  │
│ - Mentions légales                  │
└─────────────────────────────────────┘

[BOUTON WHATSAPP FLOTTANT]
```

**SEO** :
- Title : "KIC-FORMATIONS Genève | Centre de Formation Continue - Langues & Informatique"
- Meta Description : "Centre de formation continue à Genève. Cours de français, anglais, informatique et ateliers personnalisés. Inscriptions et paiement en ligne. La réussite pour tous."
- Schema.org : EducationalOrganization

---

### 2. Catalogue des Formations (`/formations`)

**Objectif** : Permettre une recherche et filtrage rapide

**Structure** :

```
┌─────────────────────────────────────┐
│ HERO COMPACT                        │
│ - Titre : "Nos Formations"         │
│ - Barre de recherche globale       │
└─────────────────────────────────────┘

┌──────────────┬──────────────────────┐
│ FILTRES      │ RÉSULTATS            │
│ (Sidebar)    │ (Grid 3 colonnes)    │
│              │                      │
│ Catégorie:   │ [Carte Formation 1]  │
│ □ Langues FR │ [Carte Formation 2]  │
│ □ Langues EN │ [Carte Formation 3]  │
│ □ Informatique│ [Carte Formation 4]  │
│ □ Ateliers   │ ...                  │
│              │                      │
│ Niveau:      │ Tri par:             │
│ □ A1-A2      │ [Popularité ▼]       │
│ □ B1-B2      │                      │
│ □ Débutant   │ X formations trouvées│
│              │                      │
│ Modalité:    │                      │
│ □ Présentiel │                      │
│ □ En ligne   │                      │
│ □ Hybride    │                      │
│              │                      │
│ Prix:        │                      │
│ [Slider]     │                      │
│              │                      │
│ Disponibilité:│                     │
│ □ Démarrage  │                      │
│   immédiat   │                      │
└──────────────┴──────────────────────┘
```

**Carte de Formation** :
```
┌─────────────────────────────┐
│ [Image]                     │
│ BADGE: Niveau + Modalité    │
│                             │
│ Titre Formation             │
│ ⭐⭐⭐⭐⭐ (12 avis)         │
│                             │
│ 📅 Prochaine session:       │
│    15 mars 2026             │
│                             │
│ ⏱ Durée: 40h               │
│                             │
│ 💰 CHF 850.-               │
│ BADGE: -15% jusqu'au 31/01  │
│                             │
│ [Bouton: En savoir plus]    │
└─────────────────────────────┘
```

**SEO** :
- Title : "Catalogue Formations - KIC-FORMATIONS Genève"
- Meta Description : "Découvrez toutes nos formations continues à Genève : français, anglais, informatique, développement personnel. Inscriptions ouvertes."
- URL canonique : /formations

---

### 3. Page Détail Formation (`/formations/[slug]`)

**Objectif** : Informer et convertir (CTA inscription visible)

**Structure** :

```
┌─────────────────────────────────────┐
│ BREADCRUMB                          │
│ Accueil > Formations > [Titre]     │
└─────────────────────────────────────┘

┌──────────────────┬──────────────────┐
│ CONTENU PRINCIPAL│ SIDEBAR STICKY   │
│ (66%)            │ (33%)            │
│                  │                  │
│ [Image Hero]     │ ┌──────────────┐│
│                  │ │ CHF 850.-    ││
│ TITRE FORMATION  │ │ Promo: 720.- ││
│ Catégorie • Niv. │ │              ││
│ ⭐⭐⭐⭐⭐ (15)   │ │ 📅 Sessions: ││
│                  │ │ • 15 mars    ││
│ DESCRIPTION      │ │ • 10 avril   ││
│ [Texte riche]    │ │              ││
│                  │ │ [S'INSCRIRE] ││
│ 🎯 OBJECTIFS     │ │              ││
│ • Objectif 1     │ │ 📍 Lieu:     ││
│ • Objectif 2     │ │ Genève       ││
│ • Objectif 3     │ │              ││
│                  │ │ ⏱ 40 heures  ││
│ 📋 PROGRAMME     │ │              ││
│ Module 1: ...    │ │ 👥 Max 12    ││
│ Module 2: ...    │ │              ││
│                  │ │ ✉️ Contact   ││
│ ✅ PRÉREQUIS    │ │              ││
│ [Description]    │ │ 🔗 Partager ││
│                  │ └──────────────┘│
│ 📅 CALENDRIER    │                  │
│ [Sessions dispo] │                  │
│                  │                  │
│ 👨‍🏫 FORMATEUR   │                  │
│ [Si disponible]  │                  │
│                  │                  │
│ 💬 TÉMOIGNAGES   │                  │
│ [Carousel]       │                  │
│                  │                  │
│ ❓ FAQ FORMATION │                  │
│ [Accordéon]      │                  │
└──────────────────┴──────────────────┘

┌─────────────────────────────────────┐
│ FORMATIONS SIMILAIRES (3)          │
│ [Carousel de suggestions]           │
└─────────────────────────────────────┘
```

**SEO** :
- Title dynamique : "[Titre Formation] - KIC-FORMATIONS Genève"
- Meta Description dynamique : "[Description courte] - Inscription en ligne - Prochaine session : [date]"
- Schema.org : Course
- Open Graph pour partage réseaux sociaux

---

### 4. Calendrier (`/calendrier`)

**Objectif** : Vue d'ensemble des sessions disponibles

**Structure** :

```
┌─────────────────────────────────────┐
│ VUE CALENDRIER                      │
│ [Janvier 2026        ◀ ▶]         │
│                                     │
│ Lun  Mar  Mer  Jeu  Ven  Sam  Dim │
│  1    2    3    4    5    6    7  │
│  8    9   [10]  11   12   13   14 │
│      📚FR        📚FR              │
│      A1          B1                │
│                                     │
│ 15   16   17   18   19   20   21  │
│ 💻PC                               │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ LÉGENDE                             │
│ 📚 Langues | 💻 Informatique        │
│ 🎯 Ateliers | 🤝 Accompagnement    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ SESSIONS À VENIR (Liste)           │
│                                     │
│ 📅 15 mars 2026                    │
│ Français A1                         │
│ Présentiel • 18h-20h               │
│ [S'inscrire]                       │
│                                     │
│ 📅 17 mars 2026                    │
│ Bureautique ECDL                    │
│ En ligne • 14h-17h                 │
│ [S'inscrire]                       │
└─────────────────────────────────────┘
```

**Fonctionnalités** :
- Filtre par catégorie de formation
- Clic sur une date → voir sessions du jour
- Export iCal pour synchronisation agenda
- Vue mois / semaine / liste

---

### 5. Inscription & Paiement (`/inscription/[sessionId]`)

**Objectif** : Conversion maximale avec le moins de friction

**Parcours Multi-Étapes** :

```
┌─────────────────────────────────────┐
│ BARRE DE PROGRESSION                │
│ ●━━━○━━━○━━━○                      │
│ 1.Info  2.Coordonnées  3.Paiement  │
│         4.Confirmation              │
└─────────────────────────────────────┘

═══════════════════════════════════════
ÉTAPE 1 : INFORMATIONS FORMATION
═══════════════════════════════════════

┌─────────────────────────────────────┐
│ RÉCAPITULATIF                       │
│                                     │
│ Formation: Français A1              │
│ Session: 15 mars 2026               │
│ Horaires: Lun/Mer 18h-20h          │
│ Durée: 40 heures                    │
│ Lieu: Genève, Rue des Pâquis 11    │
│                                     │
│ Prix: CHF 850.-                     │
│ Promo -15%: CHF 720.-              │
│                                     │
│ [Modifier la session]               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ VOTRE NIVEAU ACTUEL                 │
│ ○ Débutant complet                 │
│ ○ Quelques notions                 │
│ ○ Niveau intermédiaire             │
│                                     │
│ Besoins spécifiques ? (optionnel)  │
│ [Textarea]                          │
└─────────────────────────────────────┘

[Continuer →]

═══════════════════════════════════════
ÉTAPE 2 : VOS COORDONNÉES
═══════════════════════════════════════

┌─────────────────────────────────────┐
│ INFORMATIONS PERSONNELLES           │
│                                     │
│ Prénom *                            │
│ [Input]                             │
│                                     │
│ Nom *                               │
│ [Input]                             │
│                                     │
│ Email *                             │
│ [Input]                             │
│                                     │
│ Téléphone *                         │
│ [Input avec format CH]              │
│                                     │
│ Date de naissance (optionnel)      │
│ [Date picker]                       │
│                                     │
│ Adresse (optionnel)                 │
│ [Input]                             │
│                                     │
│ NPA / Ville *                       │
│ [Input] [Input]                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CONSENTEMENTS RGPD                  │
│                                     │
│ ☑ J'accepte le traitement de mes  │
│   données personnelles *            │
│   [Lien: Politique de confidentialité]│
│                                     │
│ ☐ J'accepte de recevoir des infos │
│   sur les formations (newsletter)   │
└─────────────────────────────────────┘

[← Retour]  [Continuer vers paiement →]

═══════════════════════════════════════
ÉTAPE 3 : PAIEMENT SÉCURISÉ
═══════════════════════════════════════

┌─────────────────────────────────────┐
│ RÉCAPITULATIF FINAL                 │
│                                     │
│ Formation Français A1               │
│ Session du 15 mars 2026             │
│                                     │
│ Sous-total:        CHF 850.00      │
│ Promotion (-15%):  CHF -130.00     │
│ ───────────────────────────────    │
│ TOTAL À PAYER:     CHF 720.00      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ MÉTHODE DE PAIEMENT                 │
│                                     │
│ ○ 💳 Carte bancaire (Stripe)       │
│ ○ 🅿️ PayPal                        │
│ ○ 🏦 Virement bancaire             │
│                                     │
│ [Si carte sélectionnée:]            │
│ ┌─────────────────────────────┐   │
│ │ [Stripe Payment Element]    │   │
│ │ - Numéro carte              │   │
│ │ - Expiration                │   │
│ │ - CVC                       │   │
│ │ - Nom titulaire             │   │
│ └─────────────────────────────┘   │
│                                     │
│ 🔒 Paiement 100% sécurisé          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ☑ J'ai lu et j'accepte les CGV *   │
│   [Lien: Conditions générales]      │
└─────────────────────────────────────┘

[← Retour]  [VALIDER ET PAYER 720 CHF]

═══════════════════════════════════════
ÉTAPE 4 : CONFIRMATION
═══════════════════════════════════════

┌─────────────────────────────────────┐
│        ✅ INSCRIPTION CONFIRMÉE     │
│                                     │
│ Merci Jean Dupont !                 │
│                                     │
│ Votre inscription à la formation    │
│ "Français A1" a bien été validée.  │
│                                     │
│ Un email de confirmation vous a     │
│ été envoyé à : jean@email.com      │
│                                     │
│ Numéro de confirmation:             │
│ #KIC-2026-00123                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ PROCHAINES ÉTAPES                   │
│                                     │
│ 1️⃣ Vérifiez votre email            │
│                                     │
│ 2️⃣ Préparez les documents suivants:│
│    • Pièce d'identité              │
│    • Photo récente                  │
│    • [Autres selon formation]       │
│                                     │
│ 3️⃣ Rendez-vous le 15 mars 2026    │
│    à 18h00                          │
│    Rue des Pâquis 11, 1201 Genève  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ [Télécharger le récapitulatif PDF] │
│ [Ajouter à mon calendrier]          │
│ [Retour à l'accueil]                │
└─────────────────────────────────────┘
```

**Fonctionnalités Critiques** :
- Sauvegarde automatique à chaque étape
- Validation en temps réel des champs
- Messages d'erreur clairs et constructifs
- Option "Sauvegarder et continuer plus tard"
- Récupération panier abandonné (email automatique après 24h)
- Support multi-devises si besoin (CHF/EUR)
- Génération PDF récapitulatif automatique

**Tracking** :
- Google Analytics Enhanced Ecommerce
- Facebook Pixel (conversion)
- Heatmaps (Hotjar/Microsoft Clarity)

---

### 6. À Propos (`/a-propos`)

**Objectif** : Établir la crédibilité et la confiance

**Structure** :

```
┌─────────────────────────────────────┐
│ HERO                                │
│ "Notre Mission : Votre Réussite"   │
│ [Image équipe / locaux]             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NOTRE HISTOIRE                      │
│                                     │
│ [Texte narratif - 200-300 mots]    │
│ - Fondation                         │
│ - Valeurs                           │
│ - Vision                            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NOS VALEURS (Grid 3 colonnes)     │
│                                     │
│ [Icône] Excellence                  │
│ [Icône] Bienveillance              │
│ [Icône] Adaptation                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NOTRE ÉQUIPE                        │
│                                     │
│ [Photos + Bios des formateurs clés]│
│ - Nom                               │
│ - Spécialité                        │
│ - Expérience                        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CERTIFICATIONS & AGRÉMENTS         │
│                                     │
│ [Logos/badges officiels]            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NOS LOCAUX                          │
│                                     │
│ [Galerie photos]                    │
│ - Salles de cours                   │
│ - Espaces détente                   │
│ - Équipements                       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CHIFFRES & IMPACT                   │
│                                     │
│ [Animated counters]                 │
│ 1200+ étudiants formés              │
│ 95% de satisfaction                 │
│ 15 ans d'expérience                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CTA                                 │
│ "Rejoignez-nous !"                  │
│ [Bouton: Voir les formations]       │
└─────────────────────────────────────┘
```

---

### 7. Services & Accompagnements (`/services`)

**Structure par onglets ou sections** :

```
┌─────────────────────────────────────┐
│ Navigation Services                 │
│ [Langues] [Informatique] [Ateliers] │
│ [Accompagnement personnalisé]       │
└─────────────────────────────────────┘

SECTION: LANGUES - FRANÇAIS
───────────────────────────

┌────────────┬────────────┬────────────┐
│ Français   │ Français   │ Français   │
│ A1 / A2    │ Oral       │ B1 / B2    │
│            │            │            │
│ [Description]│[Description]│[Description]│
│ [En savoir +]│[En savoir +]│[En savoir +]│
└────────────┴────────────┴────────────┘

┌────────────┬────────────┐
│ Naturalisation│Alphabétisation│
│ [Description]│[Description]│
│ [En savoir +]│[En savoir +]│
└────────────┴────────────┘

SECTION: LANGUES - ANGLAIS
───────────────────────────
[Même structure]

SECTION: INFORMATIQUE
───────────────────────────
[Découverte numérique]
[Bureautique ECDL]
[IA & Présentations professionnelles]

SECTION: ACCOMPAGNEMENT PERSONNALISÉ
───────────────────────────
[Troubles d'apprentissage]
[Coaching individuel]

SECTION: ATELIERS DE PRÉVENTION
───────────────────────────
[Croyances limitantes]
[Gestion des conflits]
[Anxiété sociale]
[Prévention burn-out]
[Confiance et estime de soi]
```

Chaque service mène vers :
- Page détail dédiée OU
- Section formation correspondante dans le catalogue

---

### 8. Témoignages (`/temoignages`)

**Structure** :

```
┌─────────────────────────────────────┐
│ "Ce qu'ils disent de nous"         │
│                                     │
│ Note globale: ⭐⭐⭐⭐⭐ 4.8/5      │
│ Basée sur 127 avis                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ FILTRES                             │
│ Toutes formations ▼  |  5 étoiles ▼│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ [Photo] Sophie M.                   │
│ ⭐⭐⭐⭐⭐                            │
│ Formation: Français B1              │
│                                     │
│ "Une expérience exceptionnelle...   │
│  [Texte témoignage]                 │
│                                     │
│ Il y a 2 mois                       │
└─────────────────────────────────────┘

[Grille de témoignages avec pagination]

┌─────────────────────────────────────┐
│ VOUS AUSSI, PARTAGEZ VOTRE AVIS    │
│ [Bouton: Laisser un témoignage]     │
└─────────────────────────────────────┘
```

**Formulaire témoignage** :
- Nom (public ou anonyme)
- Formation suivie
- Note sur 5
- Commentaire
- Photo optionnelle
- Validation admin avant publication

---

### 9. FAQ (`/faq`)

**Structure accordéon par catégorie** :

```
┌─────────────────────────────────────┐
│ Questions Fréquentes                │
│                                     │
│ [Barre de recherche dans la FAQ]    │
└─────────────────────────────────────┘

📚 INSCRIPTIONS
▼ Comment s'inscrire à une formation ?
▼ Quels sont les modes de paiement acceptés ?
▼ Puis-je annuler mon inscription ?
▼ Y a-t-il des prérequis ?

💰 TARIFS & PAIEMENTS
▼ Les prix incluent-ils le matériel ?
▼ Proposez-vous des facilités de paiement ?
▼ Y a-t-il des réductions ?

📅 DÉROULEMENT
▼ Où se déroulent les cours ?
▼ Quelle est la durée d'une formation ?
▼ Les cours en ligne, comment ça marche ?

🎓 CERTIFICATIONS
▼ Les formations sont-elles certifiantes ?
▼ Recevrai-je un diplôme ?

📞 CONTACT
▼ Comment vous joindre ?
▼ Puis-je visiter vos locaux ?

[+ Ajouter section selon besoins]
```

**Fonctionnalités** :
- Recherche en temps réel
- Ancres pour partage direct d'une question
- "Cette réponse vous a-t-elle aidé ?" (👍👎)
- "Vous n'avez pas trouvé ? Contactez-nous"

---

### 10. Blog (`/blog`)

**Structure** :

```
┌─────────────────────────────────────┐
│ Le Blog KIC-FORMATIONS              │
│ Conseils, actualités et ressources  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ARTICLE FEATURED (Hero)             │
│ [Grande image]                      │
│ [Titre]                             │
│ [Excerpt]                           │
│ [Lire l'article →]                  │
└─────────────────────────────────────┘

┌──────────────┬──────────────────────┐
│ CATÉGORIES   │ ARTICLES (Grid)      │
│              │                      │
│ □ Tous       │ ┌──────────────┐    │
│ □ Langues    │ │ [Thumbnail]  │    │
│ □ Informatique│ │ Titre        │    │
│ □ Conseils   │ │ Excerpt      │    │
│ □ Actualités │ │ Date • 5 min │    │
│              │ └──────────────┘    │
│ TAGS         │                      │
│ #motivation  │ [Autres articles...] │
│ #apprentissage│                     │
└──────────────┴──────────────────────┘

[Pagination ou infinite scroll]
```

**Page Article** (`/blog/[slug]`) :

```
┌─────────────────────────────────────┐
│ [Image featured]                    │
│                                     │
│ TITRE DE L'ARTICLE                  │
│                                     │
│ Par [Auteur] • 15 janvier 2026     │
│ Temps de lecture: 5 min             │
│ [Tags: #motivation #apprentissage]  │
│                                     │
│ [Partage: Facebook Twitter LinkedIn]│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ [CONTENU ARTICLE]                   │
│ [Rich text avec images, citations]  │
│                                     │
│ [Table des matières flottante]      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CTA IN-ARTICLE                      │
│ "Intéressé par nos formations ?"   │
│ [Découvrir le catalogue]            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ARTICLES SIMILAIRES (3)            │
│ [Carousel]                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NEWSLETTER                          │
│ "Recevez nos derniers articles"    │
│ [Formulaire email]                  │
└─────────────────────────────────────┘
```

**Idées de contenu** :
- "5 astuces pour apprendre le français rapidement"
- "Pourquoi obtenir la certification ECDL ?"
- "Comment gérer l'anxiété avant un examen"
- "Témoignage : Mon parcours vers la naturalisation"
- "L'IA au service de l'apprentissage"

---

### 11. Contact (`/contact`)

**Structure** :

```
┌──────────────────┬──────────────────┐
│ FORMULAIRE       │ INFORMATIONS     │
│ (60%)            │ (40%)            │
│                  │                  │
│ Votre demande    │ 📍 ADRESSE       │
│                  │ Rue des Pâquis 11│
│ Prénom *         │ 1201 Genève      │
│ [Input]          │ Suisse           │
│                  │                  │
│ Nom *            │ 📞 TÉLÉPHONE     │
│ [Input]          │ +41 77 211 23 23│
│                  │                  │
│ Email *          │ ✉️ EMAIL         │
│ [Input]          │ info@kic-        │
│                  │ formations.ch    │
│ Téléphone        │                  │
│ [Input]          │ 🕒 HORAIRES      │
│                  │ Lun-Ven          │
│ Sujet *          │ 9h-18h           │
│ [Select]         │ Sam 9h-12h       │
│ • Demande infos  │                  │
│ • Inscription    │ [CARTE GOOGLE]   │
│ • Partenariat    │ [Map embed]      │
│ • Autre          │                  │
│                  │                  │
│ Formation        │ 🌐 RÉSEAUX       │
│ concernée        │ [Instagram]      │
│ [Select - opt.]  │ [Facebook]       │
│                  │ [LinkedIn]       │
│ Message *        │                  │
│ [Textarea]       │                  │
│                  │                  │
│ ☑ RGPD *         │                  │
│                  │                  │
│ [ENVOYER]        │                  │
└──────────────────┴──────────────────┘

┌─────────────────────────────────────┐
│ RENDEZ-VOUS                         │
│ "Préférez un rendez-vous ?"        │
│ [Prendre rendez-vous]               │
└─────────────────────────────────────┘
```

**Fonctionnalités** :
- Validation en temps réel
- Protection anti-spam (reCAPTCHA v3 invisible)
- Email auto-réponse immédiat
- Notification admin
- Enregistrement en base de données
- SLA de réponse affiché ("Réponse sous 24h")

---

### 12. Prise de Rendez-vous (`/rendez-vous`)

**Intégration Calendly ou système custom** :

```
┌─────────────────────────────────────┐
│ Prenez rendez-vous avec nous        │
│                                     │
│ Sélectionnez le type de rendez-vous:│
│                                     │
│ ○ Visite des locaux (30 min)       │
│ ○ Entretien d'orientation (45 min) │
│ ○ Rendez-vous coaching (60 min)    │
└─────────────────────────────────────┘

┌──────────────┬──────────────────────┐
│ CALENDRIER   │ INFORMATIONS         │
│              │                      │
│ [Calendrier  │ Date sélectionnée:   │
│  interactif  │ 20 janvier 2026      │
│  avec créneaux│                     │
│  disponibles]│ Créneaux disponibles:│
│              │ ○ 09:00 - 09:30      │
│              │ ○ 10:00 - 10:30      │
│              │ ○ 14:00 - 14:30      │
│              │ ○ 16:00 - 16:30      │
└──────────────┴──────────────────────┘

┌─────────────────────────────────────┐
│ VOS COORDONNÉES                     │
│ [Formulaire standard]               │
│ [CONFIRMER LE RENDEZ-VOUS]          │
└─────────────────────────────────────┘
```

**Après confirmation** :
- Email confirmation avec iCal
- SMS rappel 24h avant (optionnel)
- Lien visio si rendez-vous en ligne
- Option de report/annulation

---

### 13. Mentions Légales (`/mentions-legales`)

**Contenu légal obligatoire** :

```
MENTIONS LÉGALES

1. ÉDITEUR DU SITE
Raison sociale: KIC-FORMATIONS
Forme juridique: [À compléter]
Siège social: Rue des Pâquis 11, 1201 Genève, Suisse
Téléphone: +41 77 211 23 23
Email: info@kic-formations.ch
[Numéro SIREN/IDE si applicable]

2. DIRECTEUR DE PUBLICATION
[Nom du responsable légal]

3. HÉBERGEMENT
[Nom hébergeur]
[Adresse hébergeur]

4. PROPRIÉTÉ INTELLECTUELLE
[Texte standard]

5. DONNÉES PERSONNELLES
Voir notre Politique de Confidentialité

6. COOKIES
Voir notre Politique de Cookies

7. CRÉDITS
Design & Développement: [Agence/Développeur]
Photos: [Sources]
Icônes: [Sources]
```

---

### 14. Politique de Confidentialité (`/confidentialite`)

**Conformité RGPD** :

```
POLITIQUE DE CONFIDENTIALITÉ

Dernière mise à jour: [Date]

1. RESPONSABLE DU TRAITEMENT
KIC-FORMATIONS
Rue des Pâquis 11, 1201 Genève
info@kic-formations.ch

2. DONNÉES COLLECTÉES
• Données d'identification
• Données de contact
• Données de paiement
• Données de navigation
• [Détail exhaustif]

3. FINALITÉS DU TRAITEMENT
• Gestion des inscriptions
• Traitement des paiements
• Communication formations
• Amélioration du site
• [Liste complète]

4. BASE LÉGALE
• Consentement
• Exécution du contrat
• Obligation légale
• Intérêt légitime

5. DESTINATAIRES DES DONNÉES
• Personnel KIC-FORMATIONS
• Prestataires de paiement (Stripe, PayPal)
• Hébergeur
• [Liste exhaustive]

6. DURÉE DE CONSERVATION
• Données inscriptions: 3 ans après fin formation
• Données comptables: 10 ans
• Données marketing: jusqu'à opposition
• [Détail par catégorie]

7. VOS DROITS
• Droit d'accès
• Droit de rectification
• Droit à l'effacement
• Droit à la limitation
• Droit à la portabilité
• Droit d'opposition
• Droit de retrait du consentement

Pour exercer vos droits:
✉️ info@kic-formations.ch

8. COOKIES
[Voir Politique Cookies détaillée]

9. SÉCURITÉ
[Mesures de sécurité mises en place]

10. MODIFICATIONS
[Politique de mise à jour]

11. RÉCLAMATION
Vous pouvez introduire une réclamation auprès de:
Préposé fédéral à la protection des données (PFPDT)
www.edoeb.admin.ch
```

---

### 15. Politique de Cookies (`/cookies`)

**Banner + Page dédiée** :

```
GESTION DES COOKIES

┌─────────────────────────────────────┐
│ PARAMÈTRES DES COOKIES              │
│                                     │
│ ✅ COOKIES ESSENTIELS (Obligatoires)│
│ Nécessaires au fonctionnement       │
│ • Session utilisateur               │
│ • Panier d'inscription              │
│ • Sécurité                          │
│                                     │
│ ☑ COOKIES ANALYTIQUES               │
│ Statistiques de visite (anonymes)   │
│ • Google Analytics                  │
│                                     │
│ ☑ COOKIES MARKETING                 │
│ Publicité et remarketing            │
│ • Facebook Pixel                    │
│ • Google Ads                        │
│                                     │
│ [Tout accepter] [Tout refuser]      │
│ [Enregistrer mes préférences]       │
└─────────────────────────────────────┘

[Tableau détaillé des cookies]
Nom | Durée | Finalité | Éditeur
```

---

## 🔄 PARCOURS UTILISATEURS COMPLETS

### Parcours 1 : Découverte et Inscription Directe

```
1. Utilisateur arrive sur homepage (Google/Réseaux)
   ↓
2. Clique sur formation phare OU "Découvrir formations"
   ↓
3. Arrive sur catalogue, filtre par catégorie
   ↓
4. Clique sur carte formation
   ↓
5. Lit page détail formation
   ↓
6. Clique "S'inscrire" (sidebar sticky)
   ↓
7. Sélectionne une session dans le calendrier
   ↓
8. Remplit formulaire inscription (étape 1-2)
   ↓
9. Effectue le paiement (étape 3)
   ↓
10. Reçoit confirmation (étape 4)
    ↓
11. Reçoit email récapitulatif + PDF
```

**Temps estimé** : 5-7 minutes
**Points de friction à minimiser** :
- Chargement des pages (< 2s)
- Validation formulaire (temps réel)
- Processus paiement (one-click si possible)

---

### Parcours 2 : Recherche d'Information puis Contact

```
1. Utilisateur arrive sur homepage
   ↓
2. Navigue vers "À propos" ou "Services"
   ↓
3. Consulte plusieurs pages (FAQ, Témoignages)
   ↓
4. Hésite, quitte le site (panier abandonné)
   ↓
5. Reçoit email de relance automatique (24h)
   ↓
6. Revient via lien email
   ↓
7. Utilise formulaire contact ou WhatsApp
   ↓
8. Équipe KIC répond (< 24h)
   ↓
9. Échange → Prise de RDV
   ↓
10. Conversion offline ou retour au parcours 1
```

**Objectif** : Convertir 30% des contacts en inscriptions

---

### Parcours 3 : Recherche Organique (SEO)

```
1. Recherche Google: "formation français genève"
   ↓
2. Clique sur résultat KIC-FORMATIONS
   ↓
3. Arrive directement sur page formation Français
   ↓
4. Scroll, lit contenu optimisé SEO
   ↓
5. Clique CTA "S'inscrire" OU "Contact"
   ↓
[Rejoint parcours 1 ou 2]
```

**Critère de succès** : 40% du trafic organique

---

### Parcours 4 : Retour Utilisateur (Newsletter/Blog)

```
1. Utilisateur inscrit newsletter (homepage/blog)
   ↓
2. Reçoit email hebdomadaire avec:
   - Article blog
   - Formation du mois
   - Offre flash
   ↓
3. Clique sur lien formation
   ↓
4. Arrive sur page détail
   ↓
[Rejoint parcours 1]
```

---

## 🎨 SPÉCIFICATIONS UX/UI

### Charte Graphique Recommandée

**Couleurs Primaires** :
```
Bleu Institutionnel: #1E3A8A (Confiance, professionnalisme)
Bleu Clair: #3B82F6 (Liens, CTA secondaires)
Vert Succès: #10B981 (Validations, badges réussite)
Orange Accent: #F59E0B (CTA primaires, promotions)
```

**Couleurs Secondaires** :
```
Gris Foncé: #1F2937 (Textes)
Gris Moyen: #6B7280 (Textes secondaires)
Gris Clair: #F3F4F6 (Backgrounds)
Blanc: #FFFFFF
```

**Couleurs Sémantiques** :
```
Erreur: #EF4444
Attention: #F59E0B
Info: #3B82F6
Succès: #10B981
```

**Typographie** :
```
Titres (H1-H6):
- Font: Inter ou Montserrat
- Poids: 700 (Bold) pour H1-H2
- Poids: 600 (Semi-bold) pour H3-H6

Corps de texte:
- Font: Inter ou Open Sans
- Poids: 400 (Regular)
- Taille: 16px (base)
- Line-height: 1.6

Boutons:
- Font: Inter
- Poids: 600
- Uppercase pour CTA primaires
```

**Spacing System** :
```
4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px
(Multiples de 8 pour cohérence)
```

**Border Radius** :
```
Boutons: 8px
Cartes: 12px
Modales: 16px
Inputs: 6px
```

**Ombres** :
```
Légère (cartes): 0 1px 3px rgba(0,0,0,0.1)
Moyenne (hover): 0 4px 6px rgba(0,0,0,0.1)
Forte (modales): 0 20px 25px rgba(0,0,0,0.15)
```

---

### Composants UI Réutilisables

#### Boutons

```
CTA Primaire:
- Background: Orange #F59E0B
- Hover: #D97706
- Text: Blanc
- Padding: 12px 32px
- Border-radius: 8px
- Box-shadow au hover
- Transition: 200ms

CTA Secondaire:
- Background: Transparent
- Border: 2px solid #3B82F6
- Text: #3B82F6
- Hover: Background #3B82F6, Text blanc

Bouton Disabled:
- Background: #E5E7EB
- Text: #9CA3AF
- Cursor: not-allowed
```

#### Cartes de Formation

```
┌─────────────────────────────┐
│ [Image 16:9]                │
│ [Badge niveau] [Badge mode] │
│                             │
│ Titre Formation             │
│ ⭐⭐⭐⭐⭐ (X avis)         │
│                             │
│ 📅 Session: DD/MM/YYYY     │
│ ⏱ Durée: XXh              │
│ 💰 CHF XXX.-               │
│                             │
│ [CTA: En savoir plus]       │
└─────────────────────────────┘

Hover:
- Translation Y: -4px
- Shadow augmentée
- Scale image: 1.05
```

#### Badges

```
Niveau:
- Background: #DBEAFE (bleu clair)
- Text: #1E40AF
- Padding: 4px 12px
- Border-radius: 12px (pill)

Modalité:
- Background: #D1FAE5 (vert clair)
- Text: #065F46

Promo:
- Background: #FEF3C7 (jaune)
- Text: #92400E
```

#### Formulaires

```
Input:
- Border: 1px solid #D1D5DB
- Focus: Border #3B82F6, Ring 3px #BFDBFE
- Padding: 12px 16px
- Font-size: 16px (éviter zoom mobile)
- Border-radius: 6px

Label:
- Font-weight: 500
- Margin-bottom: 6px
- Couleur: #374151

Erreur:
- Border rouge
- Message en #EF4444 en dessous
- Icône ⚠️

Validation:
- Border verte
- Icône ✓
```

---

### Principes UX

**1. Clarté > Complexité**
- Maximum 1 objectif par page
- Hiérarchie visuelle forte (H1 > H2 > Corps)
- Contrastes suffisants (WCAG AA minimum)

**2. Rapidité**
- Lazy loading images
- Skeleton loaders pendant chargement
- Optimistic UI (feedback immédiat)

**3. Accessibilité**
- Alt text sur toutes images
- Labels sur tous inputs
- Navigation au clavier
- Lecteurs d'écran compatibles
- ARIA labels

**4. Mobile-First**
- Design responsive natif
- Touch targets minimum 44x44px
- Menus hamburger clairs
- Formulaires optimisés mobile

**5. Trust & Réassurance**
- Badges de sécurité paiement
- Avis clients visibles
- Coordonnées complètes toujours accessibles
- Photos réelles (éviter stock photos génériques)

---

## 🔌 INTÉGRATIONS TIERCES

### 1. Stripe (Paiement)

**Fonctionnalités** :
- Payment Intents API
- Checkout Session ou Payment Element
- Webhooks pour confirmations
- Gestion remboursements
- Support 3D Secure (obligatoire EU)

**Workflow** :
```
1. Utilisateur valide inscription
   → Backend crée Payment Intent (montant, devise)
2. Frontend affiche Stripe Payment Element
3. Utilisateur entre CB
4. Stripe traite paiement
5. Webhook confirme → Update DB (status: PAID)
6. Email confirmation envoyé
```

**Sécurité** :
- Clés API en variables d'environnement
- HTTPS obligatoire
- Validation server-side des montants

---

### 2. PayPal

**Intégration** :
- PayPal Smart Buttons
- PayPal Checkout
- Webhooks IPN pour confirmations

**Alternative** : permettre uniquement Stripe si budget limité

---

### 3. Emails Transactionnels

**Provider recommandé** : Resend ou SendGrid

**Templates emails** :
```
1. Confirmation inscription
   - Récapitulatif formation
   - Date/heure/lieu
   - Documents à apporter
   - Lien PDF récapitulatif

2. Rappel session (J-7)
   - Détails pratiques
   - Lien ajout calendrier

3. Panier abandonné (H+24)
   - Relance douce
   - Lien retour panier
   - Offre incitative (optionnel: -5%)

4. Newsletter
   - Articles blog
   - Nouvelles formations
   - Offres du mois

5. Demande avis (après formation)
   - Lien formulaire témoignage
   - Incitation (réduction prochaine formation)
```

---

### 4. Google Maps

**Utilisation** :
- Embed map page Contact
- API Geocoding si besoin
- Directions link vers locaux

---

### 5. Google Analytics 4

**Configuration** :
- Enhanced Ecommerce:
  - view_item_list (catalogue)
  - view_item (page formation)
  - begin_checkout (début inscription)
  - add_payment_info
  - purchase (confirmation)

- Custom Events:
  - cta_click
  - form_start
  - form_abandon
  - newsletter_signup

- Conversions Goals:
  - Inscription complétée
  - Contact envoyé
  - Newsletter inscrit
  - Téléchargement PDF

---

### 6. Facebook Pixel

**Events** :
- ViewContent (page formation)
- InitiateCheckout
- Purchase
- Lead (contact/newsletter)

---

### 7. WhatsApp Business

**Intégration** :
- Bouton flottant avec lien wa.me/41772112323
- Message pré-rempli: "Bonjour, j'aimerais des informations sur vos formations"

---

### 8. Calendly ou Cal.com (Rendez-vous)

**Alternative** : système custom avec disponibilités admin

---

### 9. CRM (Optionnel)

**Options** :
- HubSpot (gratuit pour start)
- Pipedrive
- Monday.com

**Synchronisation** :
- Contacts depuis formulaires
- Inscriptions
- Statuts paiements

---

## 🔒 CONFORMITÉ & SÉCURITÉ

### RGPD - Checklist Complète

✅ **Politique de confidentialité** claire et accessible
✅ **Consentement explicite** pour traitement données
✅ **Opt-in newsletter** (double opt-in recommandé)
✅ **Droit d'accès** : formulaire ou email dédié
✅ **Droit à l'effacement** : processus en place
✅ **Droit de rectification** : formulaire ou contact
✅ **Portabilité des données** : export JSON/CSV
✅ **Registre des traitements** (documentation interne)
✅ **DPO** si nécessaire (> 250 employés ou données sensibles)
✅ **Cookies** : banner avec consentement granulaire
✅ **Durée de conservation** définie et respectée
✅ **Transferts hors UE** : garanties appropriées
✅ **Sous-traitants** : DPA signés (Stripe, hébergeur...)
✅ **Breach notification** : procédure < 72h

---

### Sécurité Technique

**Hébergement** :
- SSL/TLS (HTTPS) obligatoire
- Certificat Let's Encrypt (gratuit) minimum
- Firewall WAF actif
- Sauvegardes quotidiennes automatiques
- Plan de reprise après sinistre

**Backend** :
- Validation et sanitisation de tous les inputs
- Protection CSRF
- Protection XSS
- Prepared statements (SQL injection)
- Rate limiting API
- Logs d'accès et d'erreurs

**Authentification** (si espace membre) :
- Hash passwords (bcrypt/argon2)
- Session tokens sécurisés
- 2FA optionnel pour admins
- Verrouillage après X tentatives échouées

**Données sensibles** :
- Encryption at rest (DB)
- Encryption in transit (HTTPS)
- Clés API en variables d'env (jamais en code)
- Accès DB restreint (principe du moindre privilège)

**Paiements** :
- PCI-DSS compliance via Stripe (pas de stockage CB)
- Validation server-side des montants
- Logs transactions

---

## 📈 SEO & PERFORMANCE

### SEO On-Page

**Structure HTML sémantique** :
```html
<header> → Navigation
<main> → Contenu principal
<article> → Articles blog
<aside> → Sidebars
<footer> → Pied de page
<nav> → Menus
```

**Balises meta** :
```html
<!-- Toutes les pages -->
<title>Page Title | KIC-FORMATIONS</title>
<meta name="description" content="...">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://kic-formations.ch/page">

<!-- Open Graph (réseaux sociaux) -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

**Hiérarchie Hn** :
- 1 seul H1 par page (titre principal)
- H2 pour sections principales
- H3 pour sous-sections
- Jamais sauter de niveau

**URLs** :
```
✅ /formations/francais-a1
✅ /blog/apprendre-francais-rapidement
❌ /page.php?id=123
❌ /formations/123456
```

**Images** :
- Alt text descriptif
- Lazy loading
- Format WebP + fallback
- Compression (TinyPNG, Squoosh)
- Responsive (srcset)

**Données structurées (Schema.org)** :
```json
// Page d'accueil
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "KIC-FORMATIONS",
  "description": "Centre de formation continue à Genève",
  "url": "https://kic-formations.ch",
  "logo": "https://kic-formations.ch/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rue des Pâquis 11",
    "addressLocality": "Genève",
    "postalCode": "1201",
    "addressCountry": "CH"
  },
  "telephone": "+41772112323",
  "email": "info@kic-formations.ch"
}

// Page formation
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Français A1",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "name": "KIC-FORMATIONS"
  },
  "offers": {
    "@type": "Offer",
    "price": "720",
    "priceCurrency": "CHF"
  }
}

// Témoignages
{
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Sophie M."
  }
}
```

**Sitemap XML** :
- Généré automatiquement
- Soumis à Google Search Console
- Mis à jour à chaque nouveau contenu

**Robots.txt** :
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /inscription/panier-abandonne

Sitemap: https://kic-formations.ch/sitemap.xml
```

---

### Performance

**Core Web Vitals Targets** :
- LCP (Largest Contentful Paint) : < 2.5s
- FID (First Input Delay) : < 100ms
- CLS (Cumulative Layout Shift) : < 0.1

**Optimisations** :
- ✅ Minification CSS/JS
- ✅ Code splitting (charger uniquement nécessaire)
- ✅ Tree shaking (supprimer code inutilisé)
- ✅ Compression Gzip/Brotli
- ✅ CDN pour assets statiques
- ✅ Cache browser (headers Cache-Control)
- ✅ Prefetch/Preload ressources critiques
- ✅ Font display: swap (éviter FOIT)
- ✅ Defer JS non-critique
- ✅ Inline CSS critique (above-the-fold)

**Monitoring** :
- Google PageSpeed Insights (hebdomadaire)
- Lighthouse CI (automatisé)
- WebPageTest
- Real User Monitoring (RUM) via Analytics

---

### SEO Local (Genève)

**Google My Business** :
- Créer/optimiser fiche
- Photos locaux
- Horaires à jour
- Avis clients
- Posts réguliers

**Mots-clés locaux** :
- "formation genève"
- "cours français genève"
- "centre formation continue suisse"
- "apprendre anglais genève"
- "formation informatique genève"

**Citations locales** :
- Annuaires suisses (local.ch, search.ch)
- Pages Jaunes Suisse
- NAP consistency (Name, Address, Phone identiques partout)

---

## 📱 RESPONSIVE DESIGN

### Breakpoints

```css
/* Mobile First */
/* Base: Mobile (< 640px) */

/* Small tablets */
@media (min-width: 640px) { ... }  /* sm */

/* Tablets */
@media (min-width: 768px) { ... }  /* md */

/* Desktop */
@media (min-width: 1024px) { ... } /* lg */

/* Large desktop */
@media (min-width: 1280px) { ... } /* xl */

/* Extra large */
@media (min-width: 1536px) { ... } /* 2xl */
```

### Adaptations Mobile

**Navigation** :
- Menu hamburger < 768px
- Sticky header réduit au scroll
- CTA "S'inscrire" toujours visible

**Homepage** :
- Hero : 1 colonne, texte centré
- Formations : 1 carte par ligne
- Témoignages : 1 par slide

**Catalogue** :
- Filtres en modal/drawer
- 1 formation par ligne
- Sticky "Filtrer" button

**Formulaire inscription** :
- 1 colonne
- Inputs pleine largeur
- Keyboard-friendly (type="tel", type="email")
- Avoid zoom (font-size >= 16px)

**Paiement** :
- Récapitulatif collapsible
- Stripe mobile-optimized
- Apple Pay / Google Pay si activé

---

## 🚀 DÉPLOIEMENT & MAINTENANCE

### Environnements

```
Development → Staging → Production

Development:
- Local machine
- Hot reload
- Debug mode
- DB de test

Staging:
- URL: staging.kic-formations.ch
- Copie proche production
- Tests UAT
- Pas d'indexation Google

Production:
- URL: kic-formations.ch
- SSL
- Monitoring actif
- Backups automatiques
```

---

### CI/CD Pipeline

```
1. Commit code → Git (GitHub/GitLab)
   ↓
2. CI déclenche tests automatisés
   - Linters (ESLint, Prettier)
   - Tests unitaires
   - Tests e2e (Playwright/Cypress)
   ↓
3. Si tests ✅ → Build
   ↓
4. Deploy Staging
   ↓
5. Tests manuels UAT
   ↓
6. Approbation manuelle
   ↓
7. Deploy Production
   ↓
8. Smoke tests
   ↓
9. Monitoring (alertes si erreurs)
```

**Outils recommandés** :
- GitHub Actions (gratuit)
- Vercel (auto-deploy sur push)
- Netlify (alternative)

---

### Monitoring & Analytics

**Uptime Monitoring** :
- UptimeRobot (gratuit)
- Pingdom
- Alertes SMS/email si down

**Error Tracking** :
- Sentry (erreurs JS/backend)
- Logs centralisés

**Analytics** :
- Google Analytics 4
- Hotjar ou Microsoft Clarity (heatmaps)
- Dashboard custom (Metabase/Grafana)

**KPIs à suivre** :
- Trafic (sessions, utilisateurs)
- Sources (organique, direct, social, payant)
- Taux de conversion inscription
- Taux abandon panier
- Temps moyen parcours
- Pages les plus vues
- Revenus par formation
- LTV (Lifetime Value) étudiant

---

### Maintenance Régulière

**Quotidien** :
- Vérifier emails contact/inscriptions
- Modérer nouveaux témoignages
- Vérifier paiements en attente

**Hebdomadaire** :
- Répondre commentaires blog
- Publier article blog (1-2/semaine)
- Analyser analytics
- Backup manuel si pas automatique

**Mensuel** :
- Mettre à jour calendrier formations
- Audit SEO (positions, backlinks)
- Revue performances (PageSpeed)
- Mise à jour contenus (prix, dates)
- Newsletter

**Trimestriel** :
- Audit sécurité
- Mise à jour dépendances (npm, plugins)
- A/B tests (CTA, couleurs, wording)
- Revue UX (heatmaps, session recordings)

**Annuel** :
- Refonte partielle design si besoin
- Audit RGPD complet
- Revue stratégie SEO
- Analyse ROI marketing

---

## 📋 CHECKLIST DE LANCEMENT

### Pré-lancement

**Contenu** :
- ✅ Tous les textes rédigés et relus
- ✅ Images optimisées et alt text
- ✅ Formations saisies (minimum 10)
- ✅ Sessions calendrier (3 mois à venir)
- ✅ Témoignages (minimum 5)
- ✅ FAQ (minimum 15 questions)
- ✅ Blog (minimum 3 articles)
- ✅ Coordonnées à jour partout

**Technique** :
- ✅ SSL actif
- ✅ Stripe en mode production
- ✅ Emails transactionnels configurés
- ✅ Google Analytics actif
- ✅ Google Search Console configurée
- ✅ Sitemap.xml généré
- ✅ Robots.txt configuré
- ✅ Redirections 301 si ancien site
- ✅ Performance > 90 (PageSpeed)
- ✅ Tests multi-navigateurs
- ✅ Tests multi-devices

**Légal** :
- ✅ Mentions légales complètes
- ✅ Politique confidentialité
- ✅ CGV (conditions générales de vente)
- ✅ Politique cookies
- ✅ Banner cookies conforme
- ✅ Formulaires RGPD (checkboxes)

**Tests** :
- ✅ Parcours inscription complet (test paiement)
- ✅ Formulaires contact
- ✅ Newsletter
- ✅ WhatsApp
- ✅ Emails automatiques reçus
- ✅ PDFs générés correctement
- ✅ Calendrier iCal
- ✅ Liens réseaux sociaux
- ✅ Cartes Google Maps

---

### Post-lancement

**Semaine 1** :
- ✅ Monitorer erreurs (Sentry)
- ✅ Vérifier analytics (trafic)
- ✅ Tester inscriptions réelles
- ✅ Solliciter premiers avis

**Mois 1** :
- ✅ SEO : soumettre sitemap manuellement
- ✅ Créer profils réseaux sociaux
- ✅ Lancer campagne Google Ads (optionnel)
- ✅ Partenariats/backlinks locaux
- ✅ Communiqué de presse local

**Mois 3** :
- ✅ Analyse données (ajustements UX)
- ✅ A/B tests (CTA, landing pages)
- ✅ Contenu blog régulier
- ✅ Optimisations SEO continues

---

## 💰 ESTIMATION BUDGÉTAIRE (Indicatif)

### Option 1 : Next.js Custom (Développement sur-mesure)

**Développement** :
- Design UI/UX : CHF 3'000 - 5'000
- Développement frontend : CHF 8'000 - 12'000
- Développement backend : CHF 6'000 - 10'000
- Intégrations (Stripe, emails, etc.) : CHF 2'000 - 3'000
- Tests & QA : CHF 2'000 - 3'000
- **Total développement : CHF 21'000 - 33'000**

**Coûts récurrents annuels** :
- Hébergement (Vercel Pro) : CHF 240
- Base de données (Supabase/PlanetScale) : CHF 300
- Emails (Resend) : CHF 240
- Stripe (commission 1.5% + CHF 0.25/transaction)
- Domaine : CHF 20
- SSL : Gratuit (Let's Encrypt)
- **Total annuel : ~CHF 800 + commissions**

---

### Option 2 : WordPress/WooCommerce

**Setup initial** :
- Thème premium + personnalisation : CHF 1'000 - 2'000
- Plugins : CHF 500 - 1'000
- Configuration & contenu : CHF 2'000 - 4'000
- **Total setup : CHF 3'500 - 7'000**

**Coûts récurrents annuels** :
- Hébergement WordPress géré : CHF 300 - 600
- Licences plugins : CHF 300 - 500
- Maintenance : CHF 1'000 - 2'000
- **Total annuel : CHF 1'600 - 3'100**

---

### Comparaison

| Critère | Next.js Custom | WordPress |
|---------|---------------|-----------|
| **Coût initial** | Plus élevé | Plus abordable |
| **Performance** | Excellente | Bonne (dépend config) |
| **SEO** | Optimal | Très bon |
| **Évolutivité** | Très haute | Moyenne |
| **Maintenance** | Plus technique | Plus simple |
| **Personnalisation** | Illimitée | Limitée par plugins |

**Recommandation** : Next.js si budget permet, WordPress si contrainte budgétaire.

---

## 🎯 ROADMAP POST-LANCEMENT

### Phase 1 (Mois 1-3) : Stabilisation
- Monitoring quotidien
- Corrections bugs rapides
- Optimisations performances
- Contenu blog régulier

### Phase 2 (Mois 4-6) : Optimisation
- A/B testing (pages clés)
- Amélioration conversion
- SEO avancé (backlinks, contenu)
- Intégration CRM

### Phase 3 (Mois 7-12) : Expansion
- Espace membre étudiant
  - Historique formations
  - Certificats téléchargeables
  - Ressources pédagogiques
- Application mobile (optionnel)
- Live chat support
- Formations en ligne (e-learning)
  - LMS intégré
  - Vidéos on-demand
  - Quiz interactifs

### Phase 4 (An 2+) : Échelle
- Marketplace formateurs externes
- API publique (partenariats)
- Multi-langues (DE, IT, EN)
- Extension géographique

---

## 📞 SUPPORT & DOCUMENTATION

### Documentation Utilisateur

**Guide Admin** :
- Ajouter une formation
- Modifier le calendrier
- Gérer les inscriptions
- Traiter les paiements
- Modérer témoignages
- Publier un article blog

**Guide Formateur** (si espace dédié) :
- Accéder au planning
- Voir liste étudiants
- Uploader ressources

---

### Support Technique

**Niveaux** :
- **L1** : FAQ / Documentation
- **L2** : Email support (info@kic-formations.ch)
- **L3** : Support développeur (si prestataire)

**SLA** :
- Critique (site down) : < 2h
- Majeur (fonction bloquante) : < 24h
- Mineur (bug cosmétique) : < 7 jours
- Évolution : Planifiée

---

## 🏁 CONCLUSION

Cette architecture fournit une base complète et professionnelle pour le site KIC-FORMATIONS.

**Forces du système proposé** :
✅ Parcours utilisateur optimisé pour la conversion
✅ Design moderne et rassurant
✅ Conformité RGPD totale
✅ Performance et SEO de haut niveau
✅ Scalabilité assurée
✅ Maintenance facilitée

**Prochaines étapes recommandées** :
1. Validation de l'architecture par les parties prenantes
2. Choix de la stack technique (Next.js vs WordPress)
3. Sélection prestataire ou équipe interne
4. Planning de développement (8-12 semaines)
5. Rédaction contenus (parallèle au développement)
6. Tests utilisateurs (beta testeurs)
7. Lancement progressif (soft launch → official)

---

**Document préparé pour : KIC-FORMATIONS**
**Version : 1.0**
**Date : Janvier 2026**
**Auteur : Architecture & Stratégie Digitale**

---

*Ce document constitue la base technique et stratégique complète pour le développement du site web KIC-FORMATIONS. Toutes les spécifications sont prêtes à être traduites en code ou en cahier des charges pour prestataire.*
