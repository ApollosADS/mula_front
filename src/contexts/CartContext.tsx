'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Contexte de gestion du panier d'achat.
 * Gère l'ajout, la suppression et la mise à jour des quantités de produits.
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  /**
   * Ajoute un produit au panier ou incrémente sa quantité s'il existe déjà.
   * Gère la dualité d'ID (id vs _id) pour assurer la compatibilité entre
   * les anciennes constantes et les données provenant de MongoDB.
   */
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const productId = product.id || product._id;
      const existing = prev.find((item) => (item.id || item._id) === productId);
      if (existing) {
        return prev.map((item) =>
          (item.id || item._id) === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /**
   * Retire un produit du panier en fonction de son identifiant (string ou number).
   */
  const removeFromCart = (productId: string | number) => {
    setCart((prev) => prev.filter((item) => (item.id || item._id) !== productId));
  };

  /**
   * Met à jour la quantité d'un produit spécifique.
   * Si la quantité tombe à 0 ou moins, le produit est retiré du panier.
   */
  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => ((item.id || item._id) === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

