'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-black text-mula-red mb-2">MŪLA Admin</h1>
        <p className="text-gray-600 mb-8">Connectez-vous pour accéder au tableau de bord</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none"
              placeholder="admin@mula.cm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-mula-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

