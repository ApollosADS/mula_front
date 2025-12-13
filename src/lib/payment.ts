// Types pour les méthodes de paiement
export type PaymentMethod = 'stripe' | 'mobile_money' | 'cinetpay' | 'yoomee';

export interface PaymentConfig {
  stripe?: {
    publishableKey: string;
    secretKey: string;
  };
  mobileMoney?: {
    provider: 'cinetpay' | 'yoomee' | 'other';
    apiKey?: string;
    siteId?: string;
    secretKey?: string;
  };
}

// Configuration des agrégateurs Mobile Money au Cameroun
export const MOBILE_MONEY_PROVIDERS = {
  cinetpay: {
    name: 'CinetPay',
    supportedMethods: ['MTN Mobile Money', 'Orange Money', 'Express Union'],
    apiUrl: 'https://api.cinetpay.com',
  },
  yoomee: {
    name: 'Yoomee Pay',
    supportedMethods: ['MTN Mobile Money', 'Orange Money'],
    apiUrl: 'https://api.yoomeepay.com',
  },
} as const;

// Fonction pour initialiser le paiement Mobile Money
export async function initiateMobileMoneyPayment(
  provider: 'cinetpay' | 'yoomee',
  amount: number,
  phone: string,
  currency: string = 'XAF'
) {
  // TODO: Implémenter l'appel API selon l'agrégateur choisi
  // Exemple pour CinetPay:
  // const response = await fetch(`${MOBILE_MONEY_PROVIDERS.cinetpay.apiUrl}/v1/payment/init`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ amount, phone, currency, ... })
  // });
  
  return {
    transactionId: `TXN_${Date.now()}`,
    provider,
    status: 'pending',
  };
}

// Fonction pour créer une session Stripe
export async function createStripeCheckoutSession(amount: number, orderId: string) {
  // TODO: Implémenter l'appel API Stripe
  // const response = await fetch('/api/payment/stripe/create-session', {
  //   method: 'POST',
  //   body: JSON.stringify({ amount, orderId })
  // });
  
  return {
    sessionId: `cs_${Date.now()}`,
    url: '#',
  };
}

