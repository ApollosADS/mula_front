import React from 'react';

/**
 * INTERFACES DE DONNÉES MŪLA
 * Ces interfaces sont synchronisées avec les modèles Mongoose du backend
 * pour assurer une cohérence de bout en bout.
 */

/**
 * Représente le format physique d'un produit (ex: 1L, 5L, 20L).
 */
export interface Format {
  _id: string;
  volume: number; // Valeur numérique en litres
  description?: string;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Représente un produit MŪLA.
 * Inclut des champs de compatibilité (id, volume, tag) pour supporter
 * l'ancienne logique du frontend basée sur des constantes.
 */
export interface Product {
  _id?: string; // ID MongoDB
  id?: string | number; // Alias pour compatibilité avec l'existant
  name: string;
  description?: string;
  price: number;
  stock?: number;
  format?: string | Format; // Peut être un ID simple ou l'objet complet si .populate("format") est utilisé
  image?: string;
  metadata?: Record<string, any>;
  // Champs dérivés ou pour compatibilité (utilisés dans le frontend)
  volume?: string; 
  tag?: string; 
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Un élément individuel d'une commande.
 */
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number; // Prix unitaire au moment de la commande
  name?: string; // Nom du produit pour affichage rapide (non requis en DB)
}

/**
 * Représente une commande complète dans le système.
 */
export interface Order {
  _id?: string;
  paymentId?: string; // ID de transaction Stripe ou Mobile Money
  customer_email?: string;
  merchant_email?: string;
  items: OrderItem[];
  payment_method: "card" | "mobile";
  status: "ORDER_STATUS_PENDING" | "ORDER_STATUS_COMPLETED" | "ORDER_STATUS_CANCELED";
  currency?: string; // Par défaut "XAF"
  transaction_details?: Record<string, any>; // Détails spécifiques du prestataire (Stripe, etc.)
  metadata?: Record<string, any>; // Infos supplémentaires (adresse, téléphone, nom)
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Extension de Product pour l'état interne du panier.
 */
export interface CartItem extends Product {
  quantity: number;
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  isPositive?: boolean;
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  address?: string;
}

