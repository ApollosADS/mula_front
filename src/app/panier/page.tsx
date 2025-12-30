'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function Panier() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
        <Link href="/boutique" className="text-mula-red hover:underline font-medium">Découvrir nos produits</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {cart.map((item) => {
                const itemId = item.id || item._id;
                return (
                  <li key={itemId} className="p-6 flex items-center gap-6">
                    <img src={item.image || "/images/product/1L.png"} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-50" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.volume}</p>
                      <p className="text-mula-red font-bold mt-1">{item.price.toLocaleString()} FCFA</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(itemId, item.quantity - 1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(itemId, item.quantity + 1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(itemId)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Récapitulatif</h2>
            
            <div className="space-y-4 mb-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{cartTotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="text-green-600 font-medium">Calculé à l'étape suivante</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-black text-mula-red text-xl">{cartTotal.toLocaleString()} FCFA</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              className="w-full py-4 bg-mula-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl block text-center"
            >
              Passer au paiement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

