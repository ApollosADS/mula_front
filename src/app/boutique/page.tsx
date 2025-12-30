'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';

export default function Boutique() {
  const [filter, setFilter] = useState<string>('all');
  const { products, loading, error } = useProducts();

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
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Chargement des produits...</p>
            </div>
        ) : error ? (
            <div className="text-center py-20">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        ) : (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id || product._id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Aucun produit trouvé pour ce filtre.</p>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
}

