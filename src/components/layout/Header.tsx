'use client';

import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Mail, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../Logo';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Boutique', path: '/boutique' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path ? 'text-mula-red font-semibold' : 'text-gray-900 hover:text-mula-red';

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:flex justify-between items-center py-2 md:py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
         <div className="flex gap-4">
             {/* Socials could go here */}
         </div>
         <div className="flex gap-4 xl:gap-6 text-xs md:text-sm text-gray-500">
             <div className="flex items-center gap-2"><Mail className="w-3 h-3 md:w-4 md:h-4 text-mula-red flex-shrink-0" /> <span className="truncate">abdelrazack080@gmail.com</span></div>
             <div className="flex items-center gap-2"><MapPin className="w-3 h-3 md:w-4 md:h-4 text-mula-red flex-shrink-0" /> <span className="hidden xl:inline">Akwa-Nord Douala, Cameroun</span><span className="xl:hidden">Douala, Cameroun</span></div>
         </div>
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 cursor-pointer">
              <Logo />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path} className={`text-xs md:text-sm uppercase tracking-wide transition-colors duration-200 ${isActive(link.path)}`}>
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Button (Cart) */}
            <div className="hidden md:flex items-center">
              <Link href="/panier" className="flex items-center justify-center bg-mula-black hover:bg-mula-red text-white p-2 rounded-full transition-all duration-300 relative">
                 <ShoppingCart className="w-4 h-4" />
                 {cartCount > 0 && (
                     <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-mula-red rounded-full border-2 border-white">
                     {cartCount}
                     </span>
                 )}
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg z-50">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-mula-red hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/panier" className="block px-3 py-3 text-base font-medium text-mula-red font-bold" onClick={() => setIsMenuOpen(false)}>
                  Mon Panier ({cartCount})
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

