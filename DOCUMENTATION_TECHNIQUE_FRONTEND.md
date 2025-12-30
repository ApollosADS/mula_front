# Documentation Technique - Frontend MŪLA

## Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Architecture et Structure](#architecture-et-structure)
3. [Technologies Utilisées](#technologies-utilisées)
4. [Flux de Données](#flux-de-données)
5. [Composants Principaux](#composants-principaux)
6. [API Routes](#api-routes)
7. [Contextes et Hooks](#contextes-et-hooks)
8. [Types TypeScript](#types-typescript)
9. [Intégration Stripe](#intégration-stripe)
10. [Gestion du Panier](#gestion-du-panier)
11. [Routing](#routing)
12. [Styling](#styling)
13. [Variables d'Environnement](#variables-denvironnement)

---

## Vue d'Ensemble

Le frontend MŪLA est une application e-commerce moderne construite avec **Next.js 14** (App Router) et **React 18**. L'application permet aux utilisateurs de :

- Parcourir le catalogue de produits (huile de palme rouge)
- Ajouter des produits au panier
- Effectuer des commandes avec paiement par carte (Stripe) ou Mobile Money
- Recevoir des confirmations de commande par email avec PDF

### Caractéristiques Principales

- ✅ **Server-Side Rendering (SSR)** avec Next.js App Router
- ✅ **Client-Side State Management** avec React Context API
- ✅ **Paiement en ligne** via Stripe PaymentIntent
- ✅ **Paiement Mobile Money** (Orange Money, MTN MoMo, Wave)
- ✅ **Génération de PDF** pour les reçus de commande
- ✅ **Envoi d'emails** avec Nodemailer
- ✅ **Animations au scroll** avec Intersection Observer
- ✅ **TypeScript** pour la sécurité des types
- ✅ **Tailwind CSS** pour le styling

---

## Architecture et Structure

### Structure des Dossiers

```text
src/
├── app/                    # Pages Next.js (App Router)
│   ├── api/                # API Routes (Backend)
│   │   ├── auth/           # Authentification
│   │   ├── formats/        # Gestion des formats
│   │   ├── orders/         # Gestion des commandes
│   │   ├── payment/        # Paiements (Stripe, Mobile Money)
│   │   ├── products/       # Gestion des produits
│   │   └── webhook/         # Webhooks (Stripe, etc.)
│   ├── boutique/           # Page catalogue
│   ├── checkout/            # Page checkout
│   ├── confirmation/       # Page confirmation commande
│   ├── contact/            # Page contact
│   ├── panier/             # Page panier
│   ├── produit/[slug]/     # Page détail produit
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil
│   └── globals.css         # Styles globaux
├── components/            # Composants React
│   ├── layout/             # Header, Footer
│   ├── product/            # ProductCard
│   ├── payment/            # PaymentMethodSelector
│   ├── providers/          # Providers (Stripe, Theme)
│   └── ui/                 # Composants UI réutilisables
├── contexts/               # React Contexts
│   └── CartContext.tsx     # Gestion du panier
├── hooks/                  # Custom Hooks
│   ├── useProducts.ts      # Hook pour récupérer les produits
│   └── useScrollAnimation.ts # Hook pour animations scroll
├── lib/                    # Utilitaires et helpers
│   ├── auth.ts             # Authentification
│   ├── mongoose.ts         # Configuration MongoDB
│   ├── payment.ts          # Helpers paiement
│   └── utils.ts            # Utilitaires généraux
├── models/                 # Modèles Mongoose
│   ├── Admin.ts
│   ├── Format.ts
│   ├── Order.ts
│   └── Product.ts
└── types/                  # Types TypeScript
    └── index.ts
```

### Architecture de l'Application

```text
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Pages      │  │  API Routes │  │  Components  │    │
│  │  (Client)    │  │  (Server)   │  │  (Client)    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────┘
         │                    │                    │
         │                    │                    │
    ┌────▼────┐          ┌────▼────┐          ┌────▼────┐
    │ Context │          │ MongoDB │          │ Stripe  │
    │   API   │          │         │          │   API   │
    └─────────┘          └─────────┘          └─────────┘
```

---

## Technologies Utilisées

### Core Framework

- **Next.js 14.2.0** : Framework React avec App Router
- **React 18.2.0** : Bibliothèque UI
- **TypeScript 5.8.2** : Typage statique

### Bibliothèques de Styling

- **Tailwind CSS 3.4.10** : Framework CSS utility-first
- **Material-UI 6.1.0** : Composants UI avancés (pour cas complexes)
- **Lucide React** : Icônes
- **Emotion** : CSS-in-JS (pour MUI)

### Backend & Database

- **Mongoose 9.0.0** : ODM pour MongoDB
- **MongoDB** : Base de données NoSQL

### Paiements

- **Stripe 17.3.1** : SDK Stripe (backend)
- **@stripe/stripe-js 4.8.0** : SDK Stripe (frontend)
- **@stripe/react-stripe-js 2.9.0** : Composants React Stripe

### Utilitaires

- **Nodemailer 7.0.12** : Envoi d'emails
- **PDFKit 0.17.2** : Génération de PDF
- **NextAuth.js** : Authentification
- **Recharts 3.5.1** : Graphiques (dashboard admin)

---

## Flux de Données

### 1. Récupération des Produits

```text
┌─────────────┐
│   Page      │
│ (Home, etc.) │
└──────┬──────┘
       │
       │ useProducts()
       ▼
┌─────────────┐
│   Hook      │
│ useProducts │
└──────┬──────┘
       │
       │ fetch('/api/products')
       ▼
┌─────────────┐
│ API Route   │
│ /api/products│
└──────┬──────┘
       │
       │ Product.find().populate('format')
       ▼
┌─────────────┐
│  MongoDB    │
└─────────────┘
```

### 2. Gestion du Panier

```text
┌─────────────┐
│   Component │
│ (ProductCard)│
└──────┬──────┘
       │
       │ addToCart(product)
       ▼
┌─────────────┐
│ CartContext │
│  (Context)  │
└──────┬──────┘
       │
       │ setCart([...cart, product])
       ▼
┌─────────────┐
│   State     │
│  (React)    │
└─────────────┘
```

### 3. Processus de Checkout

```text
┌─────────────┐
│  Checkout   │
│    Page     │
└──────┬──────┘
       │
       │ 1. Remplir formulaire
       │ 2. Choisir méthode paiement
       │
       ├─── Carte ───────────┐
       │                     │
       │ createPaymentIntent │
       │     (Stripe)        │
       │                     │
       │ confirmPayment      │
       │                     │
       │ createOrder         │
       │                     │
       └─── Mobile Money ────┤
                             │
                             ▼
                    ┌─────────────┐
                    │   Order      │
                    │   Created    │
                    └─────────────┘
```

---

## Composants Principaux

### 1. Layout Components

#### Header (`src/components/layout/Header.tsx`)

- Navigation principale
- Compteur de panier (via `CartContext`)
- Menu mobile responsive
- Liens actifs selon la route

#### Footer (`src/components/layout/Footer.tsx`)

- Informations de contact
- Liens utiles
- Réseaux sociaux

### 2. Product Components

#### ProductCard (`src/components/product/ProductCard.tsx`)

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}
```

**Fonctionnalités** :

- Affichage du produit (image, nom, prix, volume)
- Bouton "Ajouter au panier"
- Lien vers la page détail

### 3. Payment Components

#### PaymentMethodSelector (`src/components/payment/PaymentMethodSelector.tsx`)

- Sélection entre Carte et Mobile Money
- Affichage des logos (Orange Money, MTN MoMo, Wave)

#### CheckoutForm (`src/app/checkout/page.tsx`)

- Formulaire Stripe PaymentElement
- Gestion du PaymentIntent
- Confirmation du paiement
- Création de la commande après paiement réussi

### 4. UI Components (`src/components/ui/`)

- **Button** : Bouton avec variantes (primary, secondary, outline, etc.)
- **Card** : Carte avec header, content, actions
- **Input** : Input avec validation (Tailwind ou MUI)

---

## API Routes

### 1. `/api/products` (GET, POST)

**GET** : Récupère tous les produits

```typescript
// Retourne : Product[] avec format populé
const products = await Product.find()
  .sort({ createdAt: -1 })
  .populate("format");
```

**POST** : Crée un nouveau produit

```typescript
// Body : FormData avec name, price, format, image, etc.
const product = await Product.create(productData);
```

### 2. `/api/orders` (GET, POST)

**GET** : Récupère toutes les commandes

```typescript
const orders = await Order.find()
  .sort({ createdAt: -1 })
  .populate("items.productId");
```

**POST** : Crée une nouvelle commande

```typescript
// Body :
{
  paymentId?: string;
  customer_email: string;
  items: OrderItem[];
  payment_method: "card" | "mobile";
  status: "ORDER_STATUS_PENDING" | "ORDER_STATUS_COMPLETED";
  currency: "XAF";
  transaction_details: {};
  metadata: {};
}

// Actions :
// 1. Sauvegarde la commande
// 2. Génère un PDF
// 3. Envoie un email avec PDF en pièce jointe
```

### 3. `/api/payment` (POST)

#### Création d'un PaymentIntent Stripe

```typescript
// Body :
{
  amount: number;      // Montant en centimes
  currency: "XAF";     // Converti en "xaf" pour Stripe
}

// Retourne :
{
  clientSecret: string; // Pour initialiser Stripe Elements
}
```

### 4. `/api/formats` (GET, POST)

**GET** : Récupère tous les formats (volumes)
**POST** : Crée un nouveau format

### 5. `/api/auth/[...nextauth]` (GET, POST)

**Authentification** via NextAuth.js

---

## Contextes et Hooks

### CartContext (`src/contexts/CartContext.tsx`)

#### État global du panier

```typescript
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}
```

**Utilisation** :

```typescript
const { cart, addToCart, cartTotal, cartCount } = useCart();
```

**Stockage** : État React (pas de persistance localStorage pour l'instant)

### useProducts (`src/hooks/useProducts.ts`)

#### Hook pour récupérer les produits

```typescript
const { products, loading, error, refetch } = useProducts();
```

**Fonctionnalités** :

- Fetch automatique au montage du composant
- Transformation des données pour compatibilité
- Gestion des états (loading, error)
- Fonction `refetch` pour recharger

**Transformation** :

- Convertit `format` ObjectId en objet avec `volume`
- Ajoute des champs de compatibilité (`volume`, `tag`)
- Image par défaut si absente

### useScrollAnimation (`src/hooks/useScrollAnimation.ts`)

#### Hook pour animations au scroll

```typescript
const { elementRef, isVisible } = useScrollAnimation({
  threshold: 0.2,
  triggerOnce: true
});
```

**Utilisation** :

```tsx
<div ref={elementRef} className={isVisible ? 'fade-in' : ''}>
  Contenu animé
</div>
```

**Implémentation** : Utilise `IntersectionObserver` API

---

## Types TypeScript

### Interfaces Principales (`src/types/index.ts`)

#### Product

```typescript
interface Product {
  _id?: string;
  id?: string | number;        // Compatibilité
  name: string;
  description?: string;
  price: number;
  stock?: number;
  format?: string | Format;     // ObjectId ou Format populé
  image?: string;
  metadata?: Record<string, any>;
  volume?: string;              // "1L", "5L", "20L" (compatibilité)
  tag?: string;                 // "Best-seller", etc.
  createdAt?: string;
  updatedAt?: string;
}
```

#### Order

```typescript
interface Order {
  _id?: string;
  paymentId?: string;
  customer_email?: string;
  merchant_email?: string;
  items: OrderItem[];
  payment_method: "card" | "mobile";
  status: "ORDER_STATUS_PENDING" | "ORDER_STATUS_COMPLETED" | "ORDER_STATUS_CANCELED";
  currency?: string;
  transaction_details?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}
```

#### OrderItem

```typescript
interface OrderItem {
  productId: string;            // ObjectId MongoDB
  quantity: number;
  price: number;
  name?: string;                // Pour affichage PDF (non stocké)
}
```

#### CartItem

```typescript
interface CartItem extends Product {
  quantity: number;
}
```

---

## Intégration Stripe

### Configuration

**Variables d'environnement** :

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
```

### Flux de Paiement

#### 1. Création du PaymentIntent

```typescript
// Frontend : src/app/checkout/page.tsx
useEffect(() => {
  const createPaymentIntent = async () => {
    const response = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        amount: cartTotal,
        currency: 'XAF'
      })
    });
    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };
  createPaymentIntent();
}, [cartTotal]);
```

#### 2. Initialisation de Stripe Elements

```typescript
<Elements 
  stripe={stripePromise} 
  options={{ 
    clientSecret,
    appearance: { theme: 'stripe' } 
  }}
>
  <CheckoutForm clientSecret={clientSecret} />
</Elements>
```

#### 3. Confirmation du Paiement

```typescript
const { error, paymentIntent } = await stripe.confirmPayment({
  elements,
  clientSecret,
  confirmParams: {
    return_url: `${window.location.origin}/confirmation`,
  },
  redirect: 'if_required',
});

if (paymentIntent?.status === 'succeeded') {
  // Créer la commande
  await createOrder(paymentIntent.id);
}
```

### Backend (`src/app/api/payment/route.ts`)

```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount,
  currency: currency.toLowerCase(), // "xaf" pour Stripe
  automatic_payment_methods: { enabled: true },
});

return NextResponse.json({ 
  clientSecret: paymentIntent.client_secret 
});
```

---

## Gestion du Panier

### Ajout au Panier

```typescript
// Dans ProductCard ou page produit
const { addToCart } = useCart();

const handleAddToCart = () => {
  addToCart(product);
};
```

### Logique d'Ajout (`CartContext.tsx`)

```typescript
const addToCart = (product: Product) => {
  setCart((prev) => {
    const productId = product.id || product._id;
    const existing = prev.find((item) => 
      (item.id || item._id) === productId
    );
    
    if (existing) {
      // Incrémente la quantité
      return prev.map((item) =>
        (item.id || item._id) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    
    // Ajoute un nouveau produit
    return [...prev, { ...product, quantity: 1 }];
  });
};
```

### Calcul du Total

```typescript
const cartTotal = cart.reduce(
  (sum, item) => sum + item.price * item.quantity, 
  0
);

const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity, 
  0
);
```

### Gestion des IDs

Le panier gère à la fois :

- `id` (number) : Pour compatibilité avec anciennes données
- `_id` (string) : ObjectId MongoDB

```typescript
const productId = product.id || product._id;
```

---

## Routing

### Next.js App Router

**Structure** :

```text
app/
├── page.tsx              → /
├── boutique/page.tsx     → /boutique
├── panier/page.tsx       → /panier
├── checkout/page.tsx     → /checkout
├── produit/[slug]/page.tsx → /produit/:slug
└── api/                  → /api/*
```

### Navigation

```typescript
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Lien
<Link href="/boutique">Boutique</Link>

// Navigation programmatique
const router = useRouter();
router.push('/checkout');
```

### Routes Dynamiques

**Page produit** : `app/produit/[slug]/page.tsx`

```typescript
export default function ProductDetail() {
  const params = useParams();
  const product = products.find(p => 
    (p.id?.toString() || p._id) === params.slug
  );
  // ...
}
```

---

## Styling

### Tailwind CSS

**Configuration** : `tailwind.config.js`

**Classes personnalisées** :

```css
.mula-red    → #DC2626
.mula-green  → #16A34A
```

**Utilisation** :

```tsx
<button className="bg-mula-red text-white px-4 py-2 rounded-lg">
  Ajouter au panier
</button>
```

### Material-UI

**Utilisé pour** :

- Composants UI complexes (Select, Dialog, etc.)
- Icônes (`@mui/icons-material`)

**Provider** : `ThemeProvider` dans `layout.tsx`

### Animations

**Scroll Animations** : Via `useScrollAnimation` hook

```css
.scroll-fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s, transform 0.6s;
}

.scroll-fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Variables d'Environnement

### Fichier `.env.local`

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/mula

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Utilisation

**Client-side** : Variables préfixées par `NEXT_PUBLIC_`

```typescript
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
```

**Server-side** : Toutes les variables

```typescript
const mongoUri = process.env.MONGODB_URI;
```

---

## Points Techniques Importants

### 1. Gestion des IDs Produits

Le système supporte deux formats d'ID :

- **Ancien** : `id` (number) pour compatibilité
- **Nouveau** : `_id` (string, ObjectId MongoDB)

**Pattern utilisé** :

```typescript
const productId = product.id || product._id;
```

### 2. Transformation des Produits

Le hook `useProducts` transforme les données :

```typescript
const transformedProducts = data.map((product) => ({
  ...product,
  id: product._id || product.id,  // Compatibilité
  volume: product.format?.volume 
    ? `${product.format.volume}L` 
    : product.metadata?.volume || '1L',
}));
```

### 3. Gestion d'Erreur Email

L'envoi d'email ne fait **pas échouer** la commande :

```typescript
try {
  await transporter.sendMail({...});
} catch (emailError) {
  console.error("Error sending email:", emailError);
  // La commande est déjà sauvegardée
}
```

### 4. Currency Stripe

Stripe exige la currency en **minuscules** :

```typescript
currency: currency.toLowerCase() // "XAF" → "xaf"
```

### 5. PaymentIntent Flow

1. **Création** : Dans le composant parent (`Checkout`)
2. **Initialisation** : `clientSecret` passé à `Elements`
3. **Confirmation** : Dans `CheckoutForm` après soumission
4. **Création commande** : Après paiement réussi

---

## Bonnes Pratiques

### 1. TypeScript

- ✅ Types stricts pour toutes les interfaces
- ✅ Pas de `any` sauf cas exceptionnels
- ✅ Types alignés avec les modèles backend

### 2. Gestion d'État

- ✅ Context API pour état global (panier)
- ✅ useState pour état local
- ✅ Pas de prop drilling inutile

### 3. Performance

- ✅ Lazy loading des images (Next.js Image)
- ✅ Animations optimisées (Intersection Observer)
- ✅ Fetch conditionnel (uniquement si nécessaire)

### 4. Sécurité

- ✅ Clés Stripe côté serveur uniquement
- ✅ Validation des données avant envoi
- ✅ Sanitization des inputs utilisateur

### 5. UX

- ✅ États de chargement (loading)
- ✅ Gestion d'erreurs avec messages clairs
- ✅ Feedback visuel (animations, transitions)

---

## Développement

### Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm start

# Linter
npm run lint
```

### Structure de Développement

1. **Pages** : Dans `app/`
2. **Composants** : Dans `components/`
3. **Hooks** : Dans `hooks/`
4. **Contextes** : Dans `contexts/`
5. **Types** : Dans `types/`
6. **API** : Dans `app/api/`

---

## Conclusion

Le frontend MŪLA est une application moderne, type-safe et performante construite avec les meilleures pratiques React/Next.js. L'architecture est modulaire, scalable et maintenable.

**Points forts** :

- ✅ Architecture claire et organisée
- ✅ TypeScript pour la sécurité des types
- ✅ Intégration Stripe robuste
- ✅ Gestion d'état efficace
- ✅ UX optimisée avec animations

**Améliorations futures possibles** :

- 🔄 Persistance du panier (localStorage)
- 🔄 Cache des produits (React Query)
- 🔄 Optimistic UI updates
- 🔄 Tests unitaires et E2E
