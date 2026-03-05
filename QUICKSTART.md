# ⚡ DÉMARRAGE RAPIDE - KIC-FORMATIONS

## 🚀 Lancer le projet MAINTENANT

```bash
cd "c:\Users\moham\OneDrive\Bureau\Web Vitrine\KIC_FORMATION"
npm run dev
```

**Ouvrir** : http://localhost:3000

---

## ✅ CE QUI FONCTIONNE DÉJÀ

### Pages accessibles
- **Page d'accueil** : http://localhost:3000
- **Catalogue formations** : http://localhost:3000/formations
- **Contact** : http://localhost:3000/contact

### Navigation
- Header avec menu complet (responsive mobile ✅)
- Footer avec toutes les infos
- Bouton WhatsApp flottant

---

## 📋 FICHIERS PRINCIPAUX

| Fichier | Description |
|---------|-------------|
| `ARCHITECTURE.md` | 📚 Architecture complète (100+ pages) |
| `GUIDE_DEVELOPPEMENT.md` | 🛠️ Guide technique détaillé |
| `RECAP_PROJET.md` | 📊 État actuel + roadmap |
| `README.md` | 📖 Documentation utilisateur |
| `types/index.ts` | 🎯 Tous les types TypeScript |

---

## 🔴 À FAIRE EN PRIORITÉ

### Cette semaine
1. ✅ **Page détail formation** (`app/formations/[slug]/page.tsx`)
2. ✅ **Pages légales** (mentions, confidentialité, cookies, CGV)
3. ✅ **Cookie banner** (`components/layout/CookieBanner.tsx`)

### Code template pour page détail formation

```typescript
// app/formations/[slug]/page.tsx
import { formations } from '@/lib/data/formations'; // À créer

export default function FormationDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const formation = formations.find(f => f.slug === params.slug);

  if (!formation) {
    return <div>Formation non trouvée</div>;
  }

  return (
    <div>
      {/* Breadcrumb */}
      {/* Hero avec image */}
      {/* Sidebar prix + sessions + CTA */}
      {/* Description complète */}
      {/* Objectifs */}
      {/* Programme */}
      {/* Prérequis */}
      {/* Calendrier sessions */}
      {/* Témoignages */}
      {/* Formations similaires */}
    </div>
  );
}
```

### Exemple page légale

```typescript
// app/mentions-legales/page.tsx
export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-heading font-bold mb-8">
          Mentions Légales
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">
              1. Éditeur du site
            </h2>
            <p>Raison sociale : KIC-FORMATIONS</p>
            <p>Adresse : Rue des Pâquis 11, 1201 Genève, Suisse</p>
            <p>Téléphone : +41 77 211 23 23</p>
            <p>Email : info@kic-formations.ch</p>
          </section>

          {/* Autres sections légales */}
        </div>
      </div>
    </div>
  );
}
```

---

## 🎨 DESIGN TOKENS

### Couleurs (à utiliser dans le code)

```tsx
// Boutons
<Button variant="primary">Orange</Button>
<Button variant="secondary">Bleu</Button>
<Button variant="outline">Transparent</Button>

// Badges
<Badge variant="niveau">A1</Badge>
<Badge variant="modalite">Présentiel</Badge>
<Badge variant="promo">-15%</Badge>

// Classes Tailwind
className="bg-primary-600"      // Bleu foncé
className="bg-accent-500"       // Orange
className="bg-success-500"      // Vert
className="text-primary-600"    // Texte bleu
```

### Sections
```tsx
<section className="section">          // Padding vertical standard
  <div className="container">          // Container centré max-width
    <h2 className="section-title">     // Titre de section
    <p className="section-subtitle">   // Sous-titre
  </div>
</section>
```

---

## 🔧 COMMANDES UTILES

```bash
# Développement
npm run dev              # Lancer le serveur

# Build & Production
npm run build            # Build pour production
npm run start            # Serveur production

# Code
npm run lint             # Linter ESLint

# Installer dépendances additionnelles
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
npm install resend
npm install zod react-hook-form
```

---

## 📁 OÙ CRÉER LES NOUVEAUX FICHIERS

### Pages
```
app/
├── formations/
│   └── [slug]/
│       └── page.tsx          ← Détail formation
├── mentions-legales/
│   └── page.tsx              ← Mentions légales
├── confidentialite/
│   └── page.tsx              ← Politique confidentialité
└── cookies/
    └── page.tsx              ← Politique cookies
```

### Composants
```
components/
├── ui/
│   ├── Input.tsx             ← Input avec validation
│   ├── Select.tsx            ← Select stylisé
│   └── Modal.tsx             ← Modal réutilisable
├── layout/
│   └── CookieBanner.tsx      ← Banner cookies
└── forms/
    ├── ContactForm.tsx       ← Formulaire contact
    └── NewsletterForm.tsx    ← Formulaire newsletter
```

### Données
```
lib/
└── data/
    ├── formations.ts         ← Données formations
    ├── testimonials.ts       ← Données témoignages
    └── faq.ts                ← Données FAQ
```

---

## 💡 ASTUCES RAPIDES

### Ajouter une nouvelle page

1. Créer fichier `app/ma-page/page.tsx`
2. Template de base :

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Titre de ma page',
  description: 'Description de ma page',
};

export default function MaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary-600 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl font-heading font-bold">
            Titre de ma page
          </h1>
        </div>
      </section>

      {/* Contenu */}
      <section className="section">
        <div className="container">
          {/* Votre contenu */}
        </div>
      </section>
    </div>
  );
}
```

3. Ajouter le lien dans `components/layout/Header.tsx` ou `Footer.tsx`

### Ajouter une formation

Modifier `app/formations/page.tsx` :

```typescript
const allFormations = [
  // ... formations existantes
  {
    id: '19',
    slug: 'nouvelle-formation',
    category: 'Français',
    title: 'Ma Nouvelle Formation',
    shortDescription: 'Description courte',
    level: 'B1',
    modality: 'Présentiel',
    price: 850,
    duration: 40,
    nextSession: '15 avril 2026',
    rating: 4.8,
    reviewCount: 10,
  },
];
```

### Changer les couleurs

Modifier `tailwind.config.ts` :

```typescript
colors: {
  primary: {
    // Changer ces valeurs
    500: '#3b82f6',
    600: '#2563eb',
    // ...
  },
}
```

---

## 🐛 PROBLÈMES COURANTS

### Le serveur ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur TypeScript
```bash
# Vérifier tsconfig.json
# Redémarrer le serveur
```

### Page blanche
- Vérifier la console navigateur (F12)
- Vérifier logs terminal
- Vérifier que tous les imports sont corrects

---

## 📞 SUPPORT

### Consulter la documentation
1. **Problème technique** → `GUIDE_DEVELOPPEMENT.md`
2. **Vision projet** → `ARCHITECTURE.md`
3. **État actuel** → `RECAP_PROJET.md`

### Ressources externes
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

---

## ✅ CHECKLIST QUOTIDIENNE

- [ ] Lancer `npm run dev`
- [ ] Tester sur navigateur
- [ ] Coder une fonctionnalité
- [ ] Tester responsive (mobile)
- [ ] Commit changements (si git configuré)
- [ ] Consulter `GUIDE_DEVELOPPEMENT.md` si bloqué

---

## 🎯 OBJECTIF CETTE SEMAINE

**Livrable** : Site avec 6 pages fonctionnelles
1. ✅ Accueil (fait)
2. ✅ Catalogue (fait)
3. ✅ Contact (fait)
4. 🔴 Détail formation
5. 🔴 Mentions légales
6. 🔴 Politique confidentialité

**Temps estimé** : 10-15h de développement

---

🚀 **Bon développement !**

*Consulter `RECAP_PROJET.md` pour la roadmap complète*
