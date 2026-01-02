'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';
import { useProducts } from '@/hooks/useProducts';
import { AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';

export default function Boutique() {
  const [filter, setFilter] = useState<string>('all');
  const { products, loading, error, refetch } = useProducts();

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.volume === filter);

  const filters = [
      { id: 'all', label: 'Tout voir' },
      { id: '1L', label: '1 Litre' },
      { id: '5L', label: '5 Litres' },
      { id: '20L', label: '20 Litres' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">La Boutique MŪLA</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos différents formats, du quotidien aux grands événements. 
            Toujours la même qualité premium.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12 flex-wrap gap-2">
            {filters.map(f => (
                <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        filter === f.id 
                        ? 'bg-mula-red text-white shadow-lg scale-105' 
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                    {f.label}
                </button>
            ))}
        </div>

        {/* Grid */}
        {loading ? (
            <ProductGridSkeleton count={6} />
        ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-red-50 rounded-2xl border border-red-100">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Une erreur est survenue</h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">{error}</p>
                <button 
                  onClick={() => refetch()}
                  className="flex items-center gap-2 px-6 py-3 bg-mula-red text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-lg"
                >
                  <RefreshCw className="w-4 h-4" />
                  Réessayer
                </button>
            </div>
        ) : (
            <>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id || product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">Aucun produit trouvé pour ce filtre.</p>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
}

