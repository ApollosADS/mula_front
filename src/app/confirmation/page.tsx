'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Confirmation() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-mula-green" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Commande Confirmée !</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Merci pour votre confiance. Votre commande a bien été enregistrée.
      </p>
      <Link href="/" className="px-8 py-3 bg-mula-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
        Retour à l'accueil
      </Link>
    </div>
  );
}

