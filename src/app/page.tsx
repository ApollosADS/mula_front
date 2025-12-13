'use client';

import React, { useState } from 'react';
import { ArrowRight, Play, Phone, Mail, MapPin, ShoppingBag } from 'lucide-react';
import { LocalFlorist, Favorite, Verified, CheckCircle } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/constants';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  const [activeTab, setActiveTab] = useState('1L');
  const { addToCart } = useCart();
  
  // Animations au scroll
  const heroAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const featuredAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const videoAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const dealAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const productsAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const contactAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  
  // Find product for "Best Deal" section
  const dealProduct = PRODUCTS.find(p => p.volume === activeTab) || PRODUCTS[0];

  return (
    <main className="flex-col w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-gray-900 overflow-hidden">
        <Image 
            src="/images/palmiste1.jpg" 
            alt="Palmeraie MULA - Huile de palme rouge" 
            fill
            priority
            className="object-cover opacity-50"
            quality={90}
        />
        
        <div ref={heroAnim.elementRef} className={`relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 ${heroAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
            <h1 className={`font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-tight mb-4 sm:mb-6 ${heroAnim.isVisible ? 'animate-fade-in-up' : ''}`}>
                L'OR ROUGE <br className="hidden sm:block"/>
                <span className="text-white">NATUREL</span> DE CHEZ NOUS
            </h1>
            <p className={`text-white text-sm sm:text-base md:text-lg max-w-xl mb-6 sm:mb-8 font-light ${heroAnim.isVisible ? 'animate-fade-in-up delay-200' : ''}`}>
              Découvrez MŪLA, l'huile de palme rouge extra vierge qui sublime vos plats traditionnels avec une saveur authentique et une qualité incomparable.
            </p>
            <div className={`flex ${heroAnim.isVisible ? 'animate-fade-in-up delay-300' : ''}`}>
                <Link href="/boutique" className="bg-mula-red hover:bg-orange-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base rounded-full transition-all duration-300 smooth-hover">
                    Commander maintenant
                </Link>
            </div>
        </div>
      </section>

      {/* 2. FEATURED SECTION */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div ref={featuredAnim.elementRef} className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${featuredAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
                {/* Image Side */}
                <div className={`relative ${featuredAnim.isVisible ? 'scroll-scale-in visible delay-200' : 'scroll-scale-in'}`}>
                    <div className="relative rounded-tl-[80px] overflow-hidden shadow-2xl">
                        <Image 
                            src="/images/baril0.png" 
                            alt="Huile de palme rouge MŪLA" 
                            width={548}
                            height={500}
                            className="w-full h-[500px] object-cover image-zoom"
                            quality={90}
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-mula-red p-4 rounded-full shadow-lg hidden md:block">
                         <div className="bg-white p-3 rounded-full">
                             <img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" alt="Icon" className="w-8 h-8" />
                         </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className={`${featuredAnim.isVisible ? 'scroll-fade-in visible delay-300' : 'scroll-fade-in'}`}>
                    <span className={`text-mula-red font-bold uppercase tracking-wider text-xs sm:text-sm mb-2 block ${featuredAnim.isVisible ? 'animate-fade-in-up' : ''}`}>| MŪLA Caractéristiques</span>
                    <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight ${featuredAnim.isVisible ? 'animate-fade-in-up delay-100' : ''}`}>
                        Meilleure Qualité & <br className="hidden sm:block"/> Goût Authentique
                    </h2>

                    <div className="space-y-4 sm:space-y-6">
                         {/* Accordion Item 1 */}
                         <div className={`bg-gray-50 p-4 sm:p-6 rounded-lg border-l-4 border-mula-red shadow-sm smooth-hover ${featuredAnim.isVisible ? 'scroll-fade-in visible delay-200' : 'scroll-fade-in'}`}>
                            <div className="flex items-start gap-4 mb-3">
                                <div className="p-2 bg-mula-red/10 rounded-lg flex-shrink-0">
                                    <LocalFlorist sx={{ fontSize: 24, color: '#E00000' }} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display text-xl font-bold text-gray-900 mb-2">100% Naturel</h3>
                                    <p className="text-gray-600 border-b border-gray-200 pb-4 mb-4">
                                        Une huile extraite mécaniquement sans aucun produit chimique, respectant le savoir-faire de la société Souza.
                                    </p>
                                    <span className="text-sm text-gray-500 flex items-center gap-2">
                                        <CheckCircle sx={{ fontSize: 16, color: '#E00000' }} /> Aucun additif
                                    </span>
                                </div>
                            </div>
                         </div>

                         {/* Simpler Items */}
                         <div className={`bg-white p-4 sm:p-6 rounded-lg shadow-card border border-gray-100 flex items-start gap-3 sm:gap-4 smooth-hover ${featuredAnim.isVisible ? 'scroll-fade-in visible delay-300' : 'scroll-fade-in'}`}>
                             <div className="p-2 sm:p-2.5 bg-mula-green/10 rounded-lg flex-shrink-0">
                                 <Favorite sx={{ fontSize: { xs: 20, sm: 24 }, color: '#009000' }} />
                             </div>
                             <div>
                                 <h3 className="font-display font-bold text-gray-900 text-base sm:text-lg">Santé & Bien-être</h3>
                                 <p className="text-gray-500 text-xs sm:text-sm">Riche en Vitamine A et E, idéale pour toute la famille.</p>
                             </div>
                         </div>
                         
                         <div className={`bg-white p-4 sm:p-6 rounded-lg shadow-card border border-gray-100 flex items-start gap-3 sm:gap-4 smooth-hover ${featuredAnim.isVisible ? 'scroll-fade-in visible delay-400' : 'scroll-fade-in'}`}>
                             <div className="p-2 sm:p-2.5 bg-mula-red/10 rounded-lg flex-shrink-0">
                                 <Verified sx={{ fontSize: { xs: 20, sm: 24 }, color: '#E00000' }} />
                             </div>
                             <div>
                                 <h3 className="font-display font-bold text-gray-900 text-base sm:text-lg">Traçabilité Totale</h3>
                                 <p className="text-gray-500 text-xs sm:text-sm">De la palmeraie à la bouteille, nous contrôlons tout.</p>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. VIDEO VIEW SECTION */}
      <section ref={videoAnim.elementRef} className={`relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden ${videoAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
         <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
         >
            <source src="/images/video_back.webm" type="video/webm" />
         </video>
         <div className="absolute inset-0 bg-black/50"></div>
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <span className={`text-mula-red font-bold uppercase tracking-wider text-sm mb-4 block ${videoAnim.isVisible ? 'animate-fade-in-up' : ''}`}>| Vidéo Découverte</span>
             <h2 className={`font-display text-4xl md:text-5xl font-black text-white mb-12 max-w-3xl mx-auto ${videoAnim.isVisible ? 'animate-fade-in-up delay-200' : ''}`}>
                 Plongez au cœur de notre tradition et sentez la différence
             </h2>
             
             {/* Play Button */}
             <div className={`relative inline-flex items-center justify-center ${videoAnim.isVisible ? 'animate-scale-in delay-300' : ''}`}>
                <div className="absolute w-24 h-24 bg-white/20 rounded-full animate-ping"></div>
                <button 
                    type="button"
                    aria-label="Lire la vidéo de découverte"
                    title="Lire la vidéo de découverte"
                    className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center text-mula-red hover:scale-110 transition-all duration-300 shadow-2xl smooth-hover"
                >
                    <Play className="w-8 h-8 fill-current ml-1" />
                </button>
             </div>
         </div>

         {/* Floating Stats - VILLA Style */}
         <div className={`absolute -bottom-16 left-1/2 w-full max-w-5xl px-4 hidden md:block ${videoAnim.isVisible ? 'scroll-fade-in-slow-centered visible delay-400' : 'scroll-fade-in-slow-centered'}`}>
             <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-3 divide-x divide-gray-100 smooth-hover">
                 <div className="text-center px-3 md:px-4 pb-2">
                     <span className="block text-3xl md:text-4xl font-black text-mula-red mb-2">15</span>
                     <span className="text-gray-500 font-medium uppercase text-[10px] xs:text-xs tracking-wider leading-tight block min-h-[32px] flex items-center justify-center">Plantations Partenaires</span>
                     <span className="block w-2 h-2 bg-mula-red rounded-full mx-auto mt-3 md:mt-4"></span>
                 </div>
                 <div className="text-center px-3 md:px-4 pb-2">
                     <span className="block text-3xl md:text-4xl font-black text-mula-red mb-2">5</span>
                     <span className="text-gray-500 font-medium uppercase text-[10px] xs:text-xs tracking-wider leading-tight block min-h-[32px] flex items-center justify-center">Années d'Expérience</span>
                     <span className="block w-2 h-2 bg-mula-red rounded-full mx-auto mt-3 md:mt-4"></span>
                 </div>
                 <div className="text-center px-3 md:px-4 pb-2">
                     <span className="block text-3xl md:text-4xl font-black text-mula-red mb-2">9</span>
                     <span className="text-gray-500 font-medium uppercase text-[10px] xs:text-xs tracking-wider leading-tight block min-h-[32px] flex items-center justify-center">Litres Vendus</span>
                     <span className="block w-2 h-2 bg-mula-red rounded-full mx-auto mt-3 md:mt-4"></span>
                 </div>
             </div>
         </div>
      </section>

      {/* 4. BEST DEAL SECTION (Interactive) */}
      <section ref={dealAnim.elementRef} className={`pt-12 sm:pt-16 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gray-50 ${dealAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 md:mb-12 gap-4 md:gap-0">
                  <div>
                      <span className="text-mula-red font-bold uppercase tracking-wider text-xs sm:text-sm mb-2 block">| Meilleur Choix</span>
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">Trouvez votre format idéal</h2>
                  </div>
                  {/* Tabs */}
                  <div className="flex bg-gray-200 p-1 rounded-lg w-full md:w-auto">
                      {['1L', '5L', '20L'].map(vol => (
                          <button
                            key={vol}
                            type="button"
                            onClick={() => setActiveTab(vol)}
                            className={`flex-1 md:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-md text-xs sm:text-sm font-bold transition-all ${
                                activeTab === vol 
                                ? 'bg-mula-red text-white shadow-md' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                              Format {vol}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Deal Card */}
              <div className="bg-white rounded-xl shadow-card overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                      
                      {/* Left Specs */}
                      <div className="lg:col-span-3 p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                              <div className="text-center lg:text-left">
                                  <span className="text-gray-400 text-xs sm:text-sm block mb-1">Volume Total</span>
                                  <span className="text-xl sm:text-2xl font-bold text-gray-900">{dealProduct.volume}</span>
                              </div>
                              <div className="text-center lg:text-left">
                                  <span className="text-gray-400 text-xs sm:text-sm block mb-1">Prix Unitaire</span>
                                  <span className="text-xl sm:text-2xl font-bold text-gray-900">{dealProduct.price.toLocaleString()} F</span>
                              </div>
                              <div className="text-center lg:text-left">
                                  <span className="text-gray-400 text-xs sm:text-sm block mb-1">Disponibilité</span>
                                  <span className="text-base sm:text-lg font-semibold text-mula-green">En Stock</span>
                              </div>
                              <div className="text-center lg:text-left">
                                  <span className="text-gray-400 text-xs sm:text-sm block mb-1">Usage</span>
                                  <span className="text-sm sm:text-base text-gray-700">Cuisine & Friture</span>
                              </div>
                          </div>
                      </div>

                      {/* Middle Image */}
                      <div className="lg:col-span-5 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-gray-100">
                          <Image 
                            key={dealProduct.id}
                            src={dealProduct.image} 
                            alt={dealProduct.name} 
                            fill
                            className="object-contain sm:object-cover"
                            quality={90}
                          />
                      </div>

                      {/* Right Info */}
                      <div className="lg:col-span-4 p-8 flex flex-col justify-center bg-white">
                          <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Info sur le produit</h3>
                          <p className="text-gray-600 mb-8 leading-relaxed">
                              {dealProduct.description}
                              <br/><br/>
                              Idéal pour les familles ou les professionnels. Conservez-le dans un endroit sec et à l'abri de la lumière pour maintenir sa couleur rouge éclatante et ses nutriments.
                          </p>
                          <button 
                            onClick={() => addToCart(dealProduct)}
                            className="flex items-center justify-center gap-3 bg-mula-black text-white w-full py-4 rounded-full font-bold hover:bg-mula-red transition-colors"
                          >
                             <ShoppingBag className="w-5 h-5" />
                             Ajouter au panier
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. PROPERTIES / PRODUCTS GRID */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div ref={productsAnim.elementRef} className={`text-center mb-10 sm:mb-12 md:mb-16 px-4 ${productsAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
                  <span className={`text-mula-red font-bold uppercase tracking-wider text-xs sm:text-sm mb-2 block ${productsAnim.isVisible ? 'animate-fade-in-up' : ''}`}>| La Boutique</span>
                  <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4 ${productsAnim.isVisible ? 'animate-fade-in-up delay-200' : ''}`}>
                      Nos Produits Vedettes
                  </h2>
                  <p className={`text-gray-500 text-sm sm:text-base max-w-2xl mx-auto ${productsAnim.isVisible ? 'animate-fade-in-up delay-300' : ''}`}>
                      Nous offrons la meilleure qualité d'huile de palme sur le marché. Commandez aujourd'hui et faites-vous livrer.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRODUCTS.map((product, index) => {
                      const delayClass = index === 0 ? '' : index === 1 ? 'delay-100' : index === 2 ? 'delay-200' : 'delay-300';
                      return (
                          <div key={product.id} className={`${productsAnim.isVisible ? `scroll-fade-in visible ${delayClass}` : 'scroll-fade-in'}`}>
                              <ProductCard product={product} />
                          </div>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section className="relative py-24 bg-center bg-cover contact-section-bg">
          <div className="absolute inset-0 bg-mula-green/80"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div ref={contactAnim.elementRef} className={`text-white ${contactAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
                      <span className={`text-mula-red font-bold uppercase tracking-wider text-sm mb-2 block bg-white w-fit px-2 py-1 rounded ${contactAnim.isVisible ? 'animate-fade-in-up' : ''}`}>| Contactez-nous</span>
                      <h2 className={`font-display text-5xl font-black mb-6 ${contactAnim.isVisible ? 'animate-fade-in-up delay-200' : ''}`}>
                          Besoin d'aide ou d'une grosse commande ?
                      </h2>
                      <p className={`text-lg opacity-90 mb-12 ${contactAnim.isVisible ? 'animate-fade-in-up delay-300' : ''}`}>
                          Nos agents sont disponibles pour répondre à toutes vos questions concernant nos produits, les livraisons ou les partenariats.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                              <Phone className="w-8 h-8 text-mula-red mb-4" />
                              <span className="block text-sm text-gray-300 uppercase tracking-wide">Téléphone</span>
                              <span className="block text-xl font-bold">+237 697 543 682 / +237 688 598 981</span>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                              <Mail className="w-8 h-8 text-mula-red mb-4" />
                              <span className="block text-sm text-gray-300 uppercase tracking-wide">Email</span>
                              <span className="block text-sm font-bold break-all">abdelrazack080@gmail.com</span>
                          </div>
                      </div>
                  </div>

                  {/* Form */}
                  <div className="bg-white rounded-3xl p-8 shadow-2xl">
                      <form className="space-y-6">
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Nom Complet</label>
                              <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-mula-red transition-colors" placeholder="Votre nom" />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                              <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-mula-red transition-colors" placeholder="votre@email.com" />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                              <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-mula-red transition-colors" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                          </div>
                          <button type="button" className="w-full bg-mula-black text-white font-bold py-4 rounded-full hover:bg-mula-red transition-colors">
                              Envoyer le message
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </section>

    </main>
  );
}

