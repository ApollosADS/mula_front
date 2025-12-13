'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, TrendingUp, Users, DollarSign } from 'lucide-react';
import { MOCK_ORDERS, SALES_DATA, MULA_RED, MULA_GREEN } from '@/lib/constants';
import { StatCardProps } from '@/types';

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, isPositive }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-gray-50 rounded-lg text-gray-600">{icon}</div>
      {change && (
        <span className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
    <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-black text-mula-red">MŪLA <span className="text-gray-400 text-xs align-top">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-50 text-mula-red font-bold rounded-lg">
                <TrendingUp className="w-5 h-5" /> Dashboard
            </a>
            <a href="/admin/produits" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                <Package className="w-5 h-5" /> Produits
            </a>
            <a href="/admin/commandes" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                <Users className="w-5 h-5" /> Commandes
            </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Vue d'ensemble</h2>
                <button className="bg-mula-red text-white px-4 py-2 rounded-lg text-sm font-bold">Nouvelle Promo</button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Revenu Total" 
                    value="2,4M FCFA" 
                    icon={<DollarSign className="w-6 h-6" />} 
                    change="+12%" 
                    isPositive={true} 
                />
                <StatCard 
                    title="Commandes" 
                    value="145" 
                    icon={<Package className="w-6 h-6" />} 
                    change="+5%" 
                    isPositive={true} 
                />
                <StatCard 
                    title="Clients" 
                    value="1,203" 
                    icon={<Users className="w-6 h-6" />} 
                    change="+18%" 
                    isPositive={true} 
                />
                <StatCard 
                    title="Taux Conv." 
                    value="3.2%" 
                    icon={<TrendingUp className="w-6 h-6" />} 
                    change="-1%" 
                    isPositive={false} 
                />
            </div>

            {/* Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Ventes de la semaine</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={SALES_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="sales" fill={MULA_GREEN} radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Commandes Récentes</h3>
                    <div className="space-y-4">
                        {MOCK_ORDERS.map((order) => (
                            <div key={order.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                <div>
                                    <p className="font-bold text-gray-900">{order.customer}</p>
                                    <p className="text-xs text-gray-500">{order.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-mula-red">{order.total.toLocaleString()} F</p>
                                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                        order.status === 'Livré' ? 'bg-green-100 text-green-700' : 
                                        order.status === 'En attente' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

