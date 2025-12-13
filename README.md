# MŪLA - E-commerce Huile de Palme Rouge

Site e-commerce Next.js pour la vente d'huile de palme rouge 100% naturelle.

## Structure du Projet

```
src/
├── app/
│   ├── page.tsx → Accueil
│   ├── boutique/ → Liste produits
│   ├── produit/[slug]/ → Détail produit
│   ├── panier/ → Panier
│   ├── checkout/ → Checkout invité
│   ├── confirmation/ → Page de confirmation
│   ├── a-propos/ → Page à propos
│   ├── contact/ → Page contact
│   ├── admin/
│   │   ├── login/ → Connexion admin
│   │   ├── dashboard/ → Tableau de bord
│   │   ├── produits/ → Gestion produits
│   │   ├── commandes/ → Gestion commandes
│   │   └── livraison/ → Tableau frais de port
│   ├── api/
│   │   ├── products/ → API produits
│   │   ├── orders/ → API commandes
│   │   ├── webhook/paiement/ → Callback paiement
│   │   └── auth/[...nextauth]/ → Authentification
│   └── layout.tsx → Layout principal
│
├── components/
│   ├── ui/ → Composants UI (Button, Card, Input, etc.)
│   ├── layout/ → Header, Footer
│   ├── product/ → ProductCard
│   ├── cart/ → Composants panier
│   └── admin/ → Sidebar, Table, StatsCard
│
├── lib/
│   ├── mongoose.ts → Connexion DB (à implémenter)
│   ├── auth.ts → Helpers authentification (à implémenter)
│   ├── utils.ts → Utilitaires
│   └── constants.ts → Constantes et données mock
│
├── models/ → Schémas Mongoose (à implémenter)
│   ├── Product.ts
│   ├── Order.ts
│   └── Admin.ts
│
├── contexts/ → Contextes React
│   └── CartContext.tsx → Gestion du panier
│
├── types/ → Types TypeScript
│   └── index.ts
│
└── public/images/ → Images statiques
```

## Technologies

- **Next.js 14** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (Icônes)
- **Recharts** (Graphiques)

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Fonctionnalités

### Front-end (Implémenté)
- ✅ Page d'accueil avec hero section
- ✅ Boutique avec filtres
- ✅ Détail produit avec avis
- ✅ Panier d'achat
- ✅ Checkout invité
- ✅ Pages À propos et Contact
- ✅ Dashboard admin (interface)
- ✅ Design responsive

### Back-end (À implémenter)
- ⏳ Connexion MongoDB/Mongoose
- ⏳ Authentification NextAuth
- ⏳ API produits
- ⏳ API commandes
- ⏳ Webhook paiement
- ⏳ Gestion admin complète

## Notes

- Le design et le contenu graphique sont préservés de la version React/Vite
- Les routes API sont prêtes mais nécessitent l'implémentation de la base de données
- Les modèles Mongoose sont préparés mais commentés en attendant la configuration DB
