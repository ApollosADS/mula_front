import { Product } from '@/types';

export const MULA_RED = '#E00000'; // Bright Red from logo
export const MULA_GREEN = '#009000'; // Bright Green from logo

// Mock Data mimicking the provided images and description
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MŪLA Huile Rouge 1L",
    volume: "1L",
    price: 1500,
    description: "Bouteille pratique pour un usage quotidien. Huile de palme rouge 100% naturelle, riche en vitamines.",
    image: "/images/product/1L.png",
    tag: "Best-seller"
  },
  {
    id: 2,
    name: "MŪLA Bidon Familial 5L",
    volume: "5L",
    price: 6500,
    description: "Le format idéal pour les familles. Qualité supérieure garantie par la Société Souza.",
    image: "/images/product/5L.png",
    tag: "Économique"
  },
  {
    id: 3,
    name: "MŪLA Grand Format 20L",
    volume: "20L",
    price: 24000,
    description: "Pour les grandes occasions, les restaurants et les revendeurs. Le goût authentique en grande quantité.",
    image: "/images/product/20L.png",
  }
];

export const SALES_DATA = [
  { name: 'Lun', sales: 4000 },
  { name: 'Mar', sales: 3000 },
  { name: 'Mer', sales: 2000 },
  { name: 'Jeu', sales: 2780 },
  { name: 'Ven', sales: 1890 },
  { name: 'Sam', sales: 2390 },
  { name: 'Dim', sales: 3490 },
];

export const MOCK_ORDERS = [
  { id: '#CMD-1024', customer: 'Awa Touré', total: 6500, status: 'Livré' },
  { id: '#CMD-1025', customer: 'Jean Kouassi', total: 1500, status: 'En attente' },
  { id: '#CMD-1026', customer: 'Restaurant Chez Tantie', total: 48000, status: 'En cours' },
  { id: '#CMD-1027', customer: 'Michel Zongo', total: 3000, status: 'Livré' },
];

