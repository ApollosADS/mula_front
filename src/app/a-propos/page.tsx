'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { 
  LocalFlorist, 
  Favorite, 
  People, 
  CheckCircle, 
  Spa, 
  Visibility, 
  Group, 
  Star
} from '@mui/icons-material';
import { Logo } from '@/components/Logo';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const heroAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const missionAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const valuesAnim = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div ref={heroAnim.elementRef} className={`relative h-[50vh] sm:h-[55vh] md:h-[60vh] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] overflow-hidden ${heroAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
         <img 
            src="/images/plantation.jpg" 
            alt="Palmeraie Cameroun" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/70"></div>
         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
             <Logo className={`mb-4 sm:mb-6 md:mb-8 scale-100 sm:scale-105 md:scale-110 ${heroAnim.isVisible ? 'animate-scale-in' : ''}`} />
             <h1 className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white uppercase mb-4 sm:mb-5 md:mb-6 tracking-wide px-4 ${heroAnim.isVisible ? 'animate-fade-in-up delay-200' : ''}`}>
                 Savoir-faire, Tradition & <br className="hidden sm:block"/> <span className="text-mula-green">Authenticité</span>
             </h1>
             <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl font-light px-4">
                 Découvrez l'histoire de la société Souza et notre engagement pour une huile de palme d'exception.
             </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        
        {/* Section 1: Qui sommes-nous & Origine */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 scroll-fade-in ${heroAnim.isVisible ? 'visible' : ''}`}>
            <div className={`${heroAnim.isVisible ? 'scroll-fade-in visible delay-200' : 'scroll-fade-in'}`}>
                <span className={`text-mula-red font-bold uppercase tracking-wider text-sm mb-2 block ${heroAnim.isVisible ? 'animate-fade-in-up' : ''}`}>| Notre Histoire</span>
                <h2 className={`font-display text-3xl md:text-4xl font-black text-gray-900 mb-6 ${heroAnim.isVisible ? 'animate-fade-in-up delay-200' : ''}`}>Qui sommes-nous ?</h2>
                <div className="prose prose-lg text-gray-600 space-y-6">
                    <p>
                        Mūla est une marque d'huile de palme rouge 100 % naturelle, née au sein de la <strong>société Souza</strong>, engagée depuis plusieurs années dans la valorisation des richesses agricoles locales du Cameroun.
                    </p>
                    <p>
                        Nous mettons au cœur de notre activité le savoir-faire traditionnel, la transparence et le respect strict des normes de qualité pour offrir un produit d'exception.
                    </p>
                </div>

                <div className="mt-10 pt-10 border-t border-gray-100">
                    <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Notre origine</h3>
                    <p className="text-gray-600">
                        Implantée dans un environnement agricole riche, Mūla tire ses forces d'une filière maîtrisée, composée de producteurs locaux passionnés. Nous travaillons en étroite collaboration avec eux afin de garantir une huile pure, saine et fidèle aux exigences des consommateurs d'aujourd'hui.
                    </p>
                </div>
            </div>
            <div className={`relative ${heroAnim.isVisible ? 'scroll-scale-in visible delay-300' : 'scroll-scale-in'}`}>
                <div className="absolute inset-0 bg-mula-green/10 transform translate-x-6 translate-y-6 rounded-3xl"></div>
                <Image 
                    src="/images/product/personnage_0.png" 
                    alt="Production huile rouge" 
                    width={487}
                    height={608}
                    className="relative rounded-3xl shadow-xl w-full object-cover aspect-[4/5] image-zoom" 
                    quality={90}
                />
            </div>
        </div>

        {/* Section 2: Mission */}
        <div ref={missionAnim.elementRef} className={`bg-gray-50 rounded-3xl p-8 md:p-16 mb-24 relative overflow-hidden ${missionAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-mula-red/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
                <span className={`text-mula-red font-bold uppercase tracking-wider text-sm mb-2 block ${missionAnim.isVisible ? 'animate-fade-in-up' : ''}`}>| Notre Vocation</span>
                <h2 className={`font-display text-3xl md:text-4xl font-black text-gray-900 mb-4 ${missionAnim.isVisible ? 'animate-fade-in-up delay-200' : ''}`}>Notre Mission</h2>
                <p className={`text-gray-600 text-lg ${missionAnim.isVisible ? 'animate-fade-in-up delay-300' : ''}`}>
                    Notre objectif est de fournir aux ménages, aux restaurants et aux entreprises une huile de palme d'exception, fidèle à son goût authentique et à son identité africaine.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Pure et non raffinée", icon: <LocalFlorist sx={{ fontSize: 32, color: '#009000' }}/>, color: '#009000' },
                    { title: "Naturelle et saine", icon: <Favorite sx={{ fontSize: 32, color: '#E00000' }}/>, color: '#E00000' },
                    { title: "Accessible à tous", icon: <People sx={{ fontSize: 32, color: '#009000' }}/>, color: '#009000' },
                    { title: "Normes d'hygiène", icon: <CheckCircle sx={{ fontSize: 32, color: '#E00000' }}/>, color: '#E00000' },
                ].map((item, idx) => {
                    const delayClass = idx === 0 ? '' : idx === 1 ? 'delay-100' : idx === 2 ? 'delay-200' : 'delay-300';
                    const bgColorClass = item.color === '#009000' ? 'bg-icon-green' : 'bg-icon-red';
                    return (
                        <div key={idx} className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center smooth-hover ${missionAnim.isVisible ? `scroll-fade-in visible ${delayClass}` : 'scroll-fade-in'}`}>
                            <div className={`bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${bgColorClass}`}>
                                {item.icon}
                            </div>
                            <h3 className="font-display font-bold text-gray-900">{item.title}</h3>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Section 3: Values */}
        <div ref={valuesAnim.elementRef} className={`mb-24 ${valuesAnim.isVisible ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}>
            <div className="text-center mb-16">
                <h2 className={`font-display text-3xl md:text-4xl font-black text-gray-900 mb-6 ${valuesAnim.isVisible ? 'animate-fade-in-up' : ''}`}>Nos Valeurs</h2>
                <p className={`text-gray-600 max-w-2xl mx-auto ${valuesAnim.isVisible ? 'animate-fade-in-up delay-200' : ''}`}>
                    Chez Mūla, nous croyons fermement en des principes qui guident chacune de nos actions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        title: "La Qualité",
                        desc: "Sélection rigoureuse des noix et extraction contrôlée pour un produit fini irréprochable.",
                        icon: <Star sx={{ fontSize: 24, color: 'white' }} />,
                        color: "bg-mula-red"
                    },
                    {
                        title: "La Durabilité",
                        desc: "Respect de l'environnement et gestion responsable des ressources locales.",
                        icon: <Spa sx={{ fontSize: 24, color: 'white' }} />,
                        color: "bg-mula-green"
                    },
                    {
                        title: "La Transparence",
                        desc: "Une chaîne de production claire et responsable, du producteur au consommateur.",
                        icon: <Visibility sx={{ fontSize: 24, color: 'white' }} />,
                        color: "bg-mula-red"
                    },
                    {
                        title: "Soutien Local",
                        desc: "Contribution directe au développement des communautés rurales et des producteurs.",
                        icon: <Group sx={{ fontSize: 24, color: 'white' }} />,
                        color: "bg-mula-green"
                    },
                    {
                        title: "L'Innovation",
                        desc: "Modernisation progressive des techniques pour un meilleur rendement et une meilleure qualité.",
                        icon: <Lightbulb className="w-6 h-6 text-white" />,
                        color: "bg-mula-red"
                    }
                ].map((val, idx) => {
                    const delayClass = idx === 0 ? '' : idx === 1 ? 'delay-100' : idx === 2 ? 'delay-200' : idx === 3 ? 'delay-300' : 'delay-400';
                    return (
                        <div key={idx} className={`flex gap-4 p-6 rounded-xl border border-gray-100 smooth-hover bg-white ${valuesAnim.isVisible ? `scroll-fade-in visible ${delayClass}` : 'scroll-fade-in'}`}>
                        <div className={`${val.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            {val.icon}
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{val.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>

        {/* Closing Quote */}
        <div className="bg-mula-black text-white rounded-3xl p-12 text-center relative overflow-hidden">
             <div className="relative z-10 max-w-4xl mx-auto">
                 <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-6">
                     "Mūla, c'est bien plus qu'une huile : c'est le reflet d'un savoir-faire local préservé et d'une vision tournée vers l'avenir."
                 </p>
                 <div className="w-20 h-1 bg-mula-red mx-auto rounded-full"></div>
             </div>
        </div>

      </div>
    </div>
  );
}

