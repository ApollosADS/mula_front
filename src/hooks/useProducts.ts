import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook personnalisé pour récupérer et transformer les produits depuis l'API.
 * Gère le chargement, les erreurs et la compatibilité avec l'ancien système d'IDs.
 * 
 * @returns {UseProductsReturn} Objet contenant les produits, l'état de chargement, les erreurs et une fonction de rafraîchissement.
 */
export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Récupère les produits depuis l'endpoint /api/products et les transforme
   * pour correspondre à l'interface Product attendue par le frontend.
   */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
      }

      const data = await response.json();
      
      /**
       * TRANSFORMATION DES DONNÉES :
       * Le backend utilise MongoDB (_id), mais le front utilisait des IDs numériques.
       * On mappe _id vers id pour assurer la compatibilité avec le CartContext et les routes.
       */
      const transformedProducts: Product[] = data.map((product: any) => ({
        _id: product._id,
        id: product._id || product.id, 
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock || 0,
        format: product.format,
        image: product.image || '/images/product/1L.png',
        metadata: product.metadata || {},
        // Extraction du volume depuis l'objet format ou les métadonnées
        volume: typeof product.format === 'object' && product.format?.volume 
          ? `${product.format.volume}L` 
          : product.metadata?.volume || '1L',
        tag: product.metadata?.tag,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }));

      setProducts(transformedProducts);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des produits');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

