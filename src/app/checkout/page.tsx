'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CreditCard, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
      name: '', phone: '', address: '', paymentMethod: 'mobile_money'
  });
  const [step, setStep] = useState<'details' | 'success'>('details');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API call
      setTimeout(() => {
          clearCart();
          setStep('success');
      }, 1500);
  };

  if (step === 'success') {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-mula-green" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Commande Confirmée !</h1>
              <p className="text-gray-600 mb-8 max-w-md">
                  Merci pour votre confiance. Votre commande <span className="font-mono font-bold text-gray-900">#CMD-{Math.floor(Math.random()*10000)}</span> a bien été enregistrée.
              </p>
              <Link href="/" className="px-8 py-3 bg-mula-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                  Retour à l'accueil
              </Link>
          </div>
      );
  }

  if (cart.length === 0) {
    router.push('/panier');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Finaliser la commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
                <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de livraison</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                            <input required type="text" name="name" onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all" placeholder="Jean Kouassi" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone (Mobile Money)</label>
                            <input required type="tel" name="phone" onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all" placeholder="07 07 00 00 00" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse de livraison</label>
                        <input required type="text" name="address" onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all" placeholder="Cocody, Riviera 2, Rue..." />
                    </div>

                    <div className="pt-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Moyen de paiement</h2>
                        <div className="space-y-3">
                            <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:border-mula-green transition-colors bg-gray-50">
                                <input type="radio" name="paymentMethod" value="mobile_money" defaultChecked className="text-mula-red focus:ring-mula-red h-4 w-4" />
                                <span className="ml-3 font-medium text-gray-900">Mobile Money (OM, MOMO, Wave)</span>
                            </label>
                            <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:border-mula-green transition-colors bg-gray-50">
                                <input type="radio" name="paymentMethod" value="card" className="text-mula-red focus:ring-mula-red h-4 w-4" />
                                <span className="ml-3 font-medium text-gray-900 flex items-center gap-2">Carte Bancaire (Stripe) <CreditCard className="w-4 h-4 text-gray-500"/></span>
                            </label>
                        </div>
                    </div>
                </form>
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

                    <div className="space-y-3">
                         <button 
                            type="submit"
                            form="checkout-form"
                            className="w-full py-4 bg-mula-green text-white font-bold rounded-xl hover:bg-green-800 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Confirmer la commande
                        </button>
                         <Link 
                            href="/panier"
                            className="w-full py-2 text-gray-500 font-medium text-sm hover:text-gray-900 block text-center"
                        >
                            Retour au panier
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

