'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate submission
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-mula-black text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596131473200-a403e72f7902?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 text-center">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-3 sm:mb-4">Contactez-nous</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Notre équipe reste disponible pour toute question, commande spécifique ou demande d'informations professionnelles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-card">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-6">Nos Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-mula-red/10 p-3 rounded-full text-mula-red flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase">Téléphone</p>
                    <p className="font-bold text-gray-900 text-lg">+237 697 543 682</p>
                    <p className="font-bold text-gray-900 text-lg">+237 688 598 981</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-mula-red/10 p-3 rounded-full text-mula-red flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase">Email</p>
                    <p className="font-bold text-gray-900 break-all">abdelrazack080@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-mula-red/10 p-3 rounded-full text-mula-red flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase">Adresse</p>
                    <p className="font-bold text-gray-900">Akwa-Nord, Douala</p>
                    <p className="text-gray-600">Cameroun</p>
                  </div>
                </div>

                 <div className="flex items-start gap-4">
                  <div className="bg-mula-red/10 p-3 rounded-full text-mula-red flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase">Horaires</p>
                    <p className="font-bold text-gray-900">Lun - Sam : 08h - 18h</p>
                    <p className="text-gray-600">Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Box */}
             <div className="bg-mula-black text-white p-8 rounded-2xl relative overflow-hidden shadow-card">
                <div className="relative z-10">
                    <h3 className="font-display text-xl font-bold mb-4">Suivez MŪLA</h3>
                    <p className="text-gray-400 mb-6 text-sm">Découvrez nos recettes et la vie à la plantation sur TikTok.</p>
                    <a href="https://tiktok.com/@abdoulrazzaq07" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-mula-red text-white px-6 py-3 rounded-full font-bold hover:bg-mula-redDark transition-colors">
                        @abdoulrazzaq07
                    </a>
                </div>
             </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-8 md:p-12">
                {!submitted ? (
                    <>
                        <h2 className="font-display text-2xl font-black text-gray-900 mb-6">Envoyez-nous un message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom Complet</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mula-red focus:border-transparent transition-all" 
                                        placeholder="Votre nom"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mula-red focus:border-transparent transition-all" 
                                        placeholder="votre@email.com"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Sujet</label>
                                <select 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mula-red focus:border-transparent transition-all"
                                    value={formData.subject}
                                    onChange={e => setFormData({...formData, subject: e.target.value})}
                                >
                                    <option value="">Sélectionnez un sujet</option>
                                    <option value="order">Question sur une commande</option>
                                    <option value="wholesale">Achat en gros / Revendeur</option>
                                    <option value="info">Information produit</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea 
                                    rows={6} 
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mula-red focus:border-transparent transition-all" 
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-mula-red text-white font-bold py-4 rounded-xl hover:bg-mula-redDark transition-colors flex items-center justify-center gap-2">
                                <Send className="w-5 h-5" /> Envoyer le message
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="w-10 h-10 text-mula-green" />
                        </div>
                        <h2 className="font-display text-3xl font-black text-gray-900 mb-4">Message envoyé !</h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais à l'adresse <strong>{formData.email}</strong>.
                        </p>
                        <button onClick={() => setSubmitted(false)} className="text-mula-red font-bold hover:underline">
                            Envoyer un autre message
                        </button>
                    </div>
                )}
            </div>
          </div>
        </div>

        {/* Map Section (Visual representation) */}
        <div className="mt-20 rounded-3xl overflow-hidden shadow-card h-96 bg-gray-200 relative border-4 border-white">
             <img 
                src="https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Map Location" 
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                <div className="bg-white px-6 py-4 rounded-full shadow-xl flex items-center gap-3 animate-bounce">
                    <MapPin className="w-6 h-6 text-mula-red" />
                    <div className="text-left">
                        <span className="block font-black text-gray-900 text-sm">SIÈGE SOCIAL</span>
                        <span className="block text-gray-600 text-xs">Akwa-Nord, Douala</span>
                    </div>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
}

