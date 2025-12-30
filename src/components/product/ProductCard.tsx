'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group smooth-hover">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <Link href={`/produit/${product.id}`} className="block w-full h-full">
            <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full product-image"
            />
        </Link>
        <div className="absolute top-4 left-4">
             <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                {product.tag || 'Naturel'}
             </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
             <h4 className="font-bold text-base text-gray-900 leading-tight w-2/3">
                <Link href={`/produit/${product.id}`} className="hover:text-mula-red transition-colors">
                    {product.name}
                </Link>
             </h4>
             <span className="text-xl font-bold text-mula-red whitespace-nowrap">
                {product.price.toLocaleString()} FCFA
             </span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200/60">
            <span className="flex items-center gap-1">
                Volume: <strong className="text-gray-900">{product.volume}</strong>
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-1">
                Origine: <strong className="text-gray-900">CM</strong>
            </span>
        </div>
        
        <div className="flex justify-center">
            <button 
                onClick={() => addToCart(product)}
                className="bg-mula-black hover:bg-mula-red text-white text-sm font-medium py-3 px-8 rounded-full transition-colors duration-300 flex items-center gap-2"
            >
                Ajouter au panier
            </button>
        </div>
      </div>
    </div>
  );
};

