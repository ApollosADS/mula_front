import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin, Video } from 'lucide-react';
import { Logo } from '../Logo';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6">
          {/* Brand */}
          <div className="space-y-2 text-center md:text-left">
            <Logo className="bg-white rounded-full p-1 sm:p-1.5 md:p-2 inline-block border-none" size="footer" />
            <p className="text-gray-200 text-sm leading-relaxed font-semibold">
              Fabriqué par Société SOUZA<br />
              Made in Cameroun
            </p>
          </div>

          {/* Links, Contact, Social - Optimisé pour toutes les tailles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-0 lg:gap-6 md:col-span-1 lg:col-span-3">
            {/* Links */}
            <div className="text-center sm:text-center md:text-left lg:text-left">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">Navigation</h3>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><Link href="/" className="hover:text-mula-red transition-colors">Accueil</Link></li>
                <li><Link href="/boutique" className="hover:text-mula-red transition-colors">Boutique</Link></li>
                <li><Link href="/a-propos" className="hover:text-mula-red transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-mula-red transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-center md:text-left lg:text-left">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">Contact</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-[10px] xs:text-xs sm:text-sm">
                <li className="flex flex-col items-center sm:items-center md:items-start gap-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-mula-green flex-shrink-0" />
                    <span className="break-words">+237 697 543 682</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-mula-green flex-shrink-0 opacity-0" />
                    <span className="break-words">+237 688 598 981</span>
                  </div>
                </li>
                <li className="flex items-center justify-center sm:justify-center md:justify-start gap-1.5 sm:gap-2">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-mula-green flex-shrink-0" />
                  <span className="break-all text-[10px] xs:text-xs">abdelrazack080@gmail.com</span>
                </li>
                <li className="flex items-center justify-center sm:justify-center md:justify-start gap-1.5 sm:gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-mula-green flex-shrink-0" />
                  <span className="break-words text-[10px] xs:text-xs">Akwa-Nord Douala</span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="text-center sm:text-center md:text-left lg:text-left">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">Suivez-nous</h3>
              <div className="flex justify-center sm:justify-center md:justify-start lg:justify-start space-x-2 sm:space-x-4">
                <a href="#" className="bg-gray-800 p-1.5 sm:p-2 rounded-full hover:bg-mula-red transition-colors" aria-label="Facebook" title="Facebook">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-1.5 sm:p-2 rounded-full hover:bg-mula-red transition-colors" aria-label="Instagram" title="Instagram">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://tiktok.com/@abdoulrazzaq07" target="_blank" rel="noreferrer noopener" className="bg-gray-800 p-1.5 sm:p-2 rounded-full hover:bg-mula-red transition-colors group" title="TikTok" aria-label="TikTok">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                </a>
              </div>
              <p className="text-[10px] xs:text-xs text-gray-500 mt-1 sm:mt-2 text-center sm:text-center md:text-left lg:text-left">@abdoulrazzaq07</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} MŪLA - Société Souza. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

