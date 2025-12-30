'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, ShoppingBag, ArrowLeft, Send, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Review } from '@/types';
import { useProducts } from '@/hooks/useProducts';
import Link from 'next/link';

export default function ProductDetail() {
  const params = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  
  // Trouver le produit par ID ou slug
  const product = products.find(p => 
    p.id?.toString() === params.slug || 
    p._id === params.slug ||
    p.id === Number(params.slug)
  );

  // Mock initial reviews
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, userName: "Aminata Koné", rating: 5, comment: "Excellente qualité, le goût est authentique comme au village !", date: "2023-10-10", address: "Abidjan" },
    { id: 2, userName: "Paul Kouassi", rating: 4, comment: "Bon produit, livraison rapide sur Douala.", date: "2023-10-12", address: "Douala" }
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', address: '' });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-gray-500">Chargement du produit...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
        <Link href="/boutique" className="text-mula-red hover:underline">Retour à la boutique</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const review: Review = {
        id: Date.now(),
        userName: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('fr-FR'),
        address: newReview.address || undefined
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '', address: '' });
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <Link href="/boutique" className="inline-flex items-center text-gray-500 hover:text-mula-red mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la boutique
        </Link>
        
        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
                <div className="mb-4">
                  {product.tag && (
                    <span className="inline-block bg-mula-green text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {product.tag}
                    </span>
                  )}
                  <h1 className="text-4xl font-black text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-sm text-gray-500">({reviews.length} avis)</span>
                  </div>
                </div>

                <p className="text-3xl font-bold text-mula-red mb-6">{product.price.toLocaleString()} FCFA</p>
                
                <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
                  <p>{product.description}</p>
                  <p className="mt-4">
                    <strong>Volume :</strong> {product.volume}<br/>
                    <strong>Origine :</strong> Cameroun<br/>
                    <strong>Type :</strong> Huile de palme rouge vierge
                  </p>
                </div>
                
                <button 
                    onClick={() => addToCart(product)}
                    className="w-full md:w-auto px-8 py-4 bg-mula-red text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                    <ShoppingBag className="w-5 h-5" /> Ajouter au panier
                </button>
            </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              Avis Clients 
              <span className="bg-gray-100 text-gray-600 text-sm py-1 px-3 rounded-full">{reviews.length}</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Review List */}
                <div className="space-y-6">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-mula-red/10 rounded-full flex items-center justify-center text-mula-red font-bold">
                                    {review.userName.charAt(0)}
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        {review.userName}
                                        {review.address && (
                                            <span className="text-xs font-normal text-gray-500 flex items-center gap-0.5">
                                                <MapPin className="w-3 h-3" /> {review.address}
                                            </span>
                                        )}
                                    </h3>
                                    <div className="flex text-yellow-400 text-xs">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-100">{review.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed ml-13 pl-13">{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* Add Review Form */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm h-fit sticky top-24">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Partagez votre expérience</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Note globale</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setNewReview({...newReview, rating: star})}
                                        className="focus:outline-none transform hover:scale-110 transition-transform"
                                    >
                                        <Star className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Votre nom</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Ex: Jean Kouassi"
                                value={newReview.name}
                                onChange={e => setNewReview({...newReview, name: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Votre adresse physique <span className="text-gray-400 font-normal">(Facultatif)</span></label>
                            <input 
                                type="text" 
                                placeholder="Ex: Akwa-Nord, Douala"
                                value={newReview.address}
                                onChange={e => setNewReview({...newReview, address: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Votre avis</label>
                            <textarea 
                                required
                                rows={4}
                                placeholder="Dites-nous ce que vous avez pensé du produit..."
                                value={newReview.comment}
                                onChange={e => setNewReview({...newReview, comment: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-mula-red transition-colors flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" /> Publier l'avis
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

