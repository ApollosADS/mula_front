import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
      }

      const data = await response.json();
      
      // Transformer les produits pour compatibilité avec l'existant
      const transformedProducts: Product[] = data.map((product: any) => ({
        _id: product._id,
        id: product._id || product.id, // Pour compatibilité
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock || 0,
        format: product.format,
        image: product.image || '/images/product/1L.png', // Image par défaut
        metadata: product.metadata || {},
        // Champs de compatibilité
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

