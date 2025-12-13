import React from 'react';

export interface Product {
  id: number;
  name: string;
  volume: string; // 1L, 5L, 20L
  price: number;
  description: string;
  image: string;
  tag?: string;
}

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

