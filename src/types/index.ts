import React from 'react';

// Format interface (correspond au modèle backend)
export interface Format {
  _id: string;
  volume: number;
  description?: string;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

// Product interface (correspond au modèle backend)
export interface Product {
  _id?: string;
  id?: string | number; // Pour compatibilité avec l'existant
  name: string;
  description?: string;
  price: number;
  stock?: number;
  format?: string | Format; // ObjectId ou Format popoulé
  image?: string;
  metadata?: Record<string, any>;
  // Champs de compatibilité avec l'existant
  volume?: string; // 1L, 5L, 20L - pour compatibilité
  tag?: string; // Pour compatibilité
  createdAt?: string;
  updatedAt?: string;
}

// Order Item interface (correspond au modèle backend)
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name?: string; // Pour affichage (non stocké en DB)
}

// Order interface (correspond au modèle backend)
export interface Order {
  _id?: string;
  paymentId?: string;
  customer_email?: string;
  merchant_email?: string;
  items: OrderItem[];
  payment_method: "card" | "mobile";
  status: "ORDER_STATUS_PENDING" | "ORDER_STATUS_COMPLETED" | "ORDER_STATUS_CANCELED";
  currency?: string;
  transaction_details?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

// CartItem interface (pour le panier frontend)
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

