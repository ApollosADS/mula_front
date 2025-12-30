'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { OrderItem } from '@/types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');


interface CheckoutFormProps {
  formData: {
    name: string;
    phone: string;
    address: string;
    email: string;
  };
  cartTotal: number;
  cart: any[];
  clientSecret: string;
  onSuccess: (orderId: string) => void;
  onError: (error: string) => void;
}

function CheckoutForm({ formData, cartTotal, cart, clientSecret, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Confirmer le paiement
      const { error: submitError } = await elements.submit();
      if (submitError) {
        onError(submitError.message || 'Erreur lors de la soumission du formulaire');
        setIsProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
        redirect: 'if_required',
      });

      if (error) {
        onError(error.message || 'Erreur lors du paiement');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Créer la commande
        const orderItems: OrderItem[] = cart.map(item => ({
          productId: item.id?.toString() || item._id || '',
          quantity: item.quantity,
          price: item.price,
          name: item.name
        }));

        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: paymentIntent.id,
            customer_email: formData.email,
            items: orderItems,
            payment_method: 'card',
            status: 'ORDER_STATUS_COMPLETED',
            currency: 'XAF',
            transaction_details: {
              payment_intent_id: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency
            },
            metadata: {
              name: formData.name,
              phone: formData.phone,
              address: formData.address
            }
          })
        });

        if (orderResponse.ok) {
          const order = await orderResponse.json();
          onSuccess(order._id || order.id);
        } else {
          const errorData = await orderResponse.json();
          onError(errorData.error || 'Erreur lors de la création de la commande');
        }
      }
    } catch (error: any) {
      onError(error.message || 'Une erreur est survenue');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-mula-green text-white font-bold rounded-xl hover:bg-green-800 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          'Payer avec ma carte'
        )}
      </button>
    </form>
  );
}

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
      name: '', phone: '', address: '', email: '', paymentMethod: 'mobile' as 'card' | 'mobile'
  });
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [orderId, setOrderId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Créer le PaymentIntent quand on passe à l'étape payment avec carte
  useEffect(() => {
    if (step === 'payment' && formData.paymentMethod === 'card' && !clientSecret && !loadingPayment) {
      setLoadingPayment(true);
      const createPaymentIntent = async () => {
        try {
          const response = await fetch('/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: cartTotal,
              currency: 'XAF'
            })
          });

          const data = await response.json();
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError(data.error || 'Erreur lors de la création du paiement');
            setStep('details');
          }
        } catch (error: any) {
          setError(error.message || 'Erreur lors de la création du paiement');
          setStep('details');
        } finally {
          setLoadingPayment(false);
        }
      };

      createPaymentIntent();
    }
  }, [step, formData.paymentMethod, cartTotal, clientSecret, loadingPayment]);

  const handleMobileMoneySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // Pour mobile money, on crée directement la commande
      const orderItems: OrderItem[] = cart.map(item => ({
        productId: item.id?.toString() || item._id || '',
        quantity: item.quantity,
        price: item.price,
        name: item.name
      }));

      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_email: formData.email,
          items: orderItems,
          payment_method: 'mobile',
          status: 'ORDER_STATUS_PENDING',
          currency: 'XAF',
          transaction_details: {
            phone: formData.phone
          },
          metadata: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address
          }
        })
      });

      if (orderResponse.ok) {
        const order = await orderResponse.json();
        setOrderId(order._id || order.id);
        clearCart();
        setStep('success');
      } else {
        const errorData = await orderResponse.json();
        setError(errorData.error || 'Erreur lors de la création de la commande');
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardPaymentSuccess = (orderId: string) => {
    setOrderId(orderId);
    clearCart();
    setStep('success');
  };

  if (step === 'success') {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-mula-green" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Commande Confirmée !</h1>
              <p className="text-gray-600 mb-8 max-w-md">
                  Merci pour votre confiance. Votre commande <span className="font-mono font-bold text-gray-900">#{orderId || 'CMD-' + Math.floor(Math.random()*10000)}</span> a bien été enregistrée.
              </p>
              <Link href="/" className="px-8 py-3 bg-mula-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                  Retour à l'accueil
              </Link>
          </div>
      );
  }

  if (cart.length === 0) {
    router.push('/panier');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Finaliser la commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    {step === 'details' ? (
                        <>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de livraison</h2>
                            
                            <form id="checkout-form" onSubmit={(e) => {
                                e.preventDefault();
                                if (formData.paymentMethod === 'card') {
                                    setStep('payment');
                                } else {
                                    handleMobileMoneySubmit(e);
                                }
                            }} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                                        <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all" placeholder="Jean Kouassi" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all" placeholder="jean@example.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                        <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all" placeholder="07 07 00 00 00" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse de livraison</label>
                                        <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mula-red focus:border-transparent outline-none transition-all" placeholder="Cocody, Riviera 2, Rue..." />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Moyen de paiement</h2>
                                    <div className="space-y-3">
                                        <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:border-mula-green transition-colors bg-gray-50 group">
                                            <input 
                                                type="radio" 
                                                name="paymentMethod" 
                                                value="mobile" 
                                                checked={formData.paymentMethod === 'mobile'}
                                                onChange={handleInputChange}
                                                className="text-mula-red focus:ring-mula-red h-4 w-4" 
                                            />
                                            <div className="ml-3 flex-1">
                                                <span className="font-medium text-gray-900 block mb-2">Mobile Money</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-50 border border-orange-200 rounded-lg">
                                                        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">OM</span>
                                                        </div>
                                                        <span className="text-xs font-semibold text-orange-700">Orange Money</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                        <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">M</span>
                                                        </div>
                                                        <span className="text-xs font-semibold text-yellow-700">MTN MOMO</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                                                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">W</span>
                                                        </div>
                                                        <span className="text-xs font-semibold text-blue-700">Wave</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:border-mula-green transition-colors bg-gray-50">
                                            <input 
                                                type="radio" 
                                                name="paymentMethod" 
                                                value="card" 
                                                checked={formData.paymentMethod === 'card'}
                                                onChange={handleInputChange}
                                                className="text-mula-red focus:ring-mula-red h-4 w-4" 
                                            />
                                            <span className="ml-3 font-medium text-gray-900 flex items-center gap-2">Carte Bancaire (Stripe) <CreditCard className="w-4 h-4 text-gray-500"/></span>
                                        </label>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-mula-green text-white font-bold rounded-xl hover:bg-green-800 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Traitement en cours...
                                        </>
                                    ) : formData.paymentMethod === 'card' ? (
                                        'Continuer vers le paiement'
                                    ) : (
                                        'Confirmer la commande'
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Paiement par carte</h2>
                                <button
                                    onClick={() => setStep('details')}
                                    className="text-sm text-gray-500 hover:text-gray-900"
                                >
                                    ← Retour
                                </button>
                            </div>
                            
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
                                    {error}
                                </div>
                            )}

                            {loadingPayment ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin text-mula-red" />
                                    <span className="ml-3 text-gray-600">Initialisation du paiement...</span>
                                </div>
                            ) : clientSecret ? (
                                <Elements 
                                    stripe={stripePromise} 
                                    options={{ 
                                        clientSecret,
                                        appearance: { theme: 'stripe' } 
                                    }}
                                >
                                    <CheckoutForm
                                        formData={formData}
                                        cartTotal={cartTotal}
                                        cart={cart}
                                        clientSecret={clientSecret}
                                        onSuccess={handleCardPaymentSuccess}
                                        onError={setError}
                                    />
                                </Elements>
                            ) : (
                                <div className="text-red-500 text-center py-4">
                                    Impossible de créer le paiement. Veuillez réessayer.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Récapitulatif</h2>
                    
                    <div className="space-y-3 mb-4">
                        {cart.map((item) => (
                            <div key={item.id || item._id} className="flex justify-between text-sm">
                                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                                <span className="font-medium">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 mb-6 space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Sous-total</span>
                            <span>{cartTotal.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Livraison</span>
                            <span className="text-green-600 font-medium">Gratuite</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-900 text-lg">Total</span>
                            <span className="font-black text-mula-red text-xl">{cartTotal.toLocaleString()} FCFA</span>
                        </div>
                    </div>

                    <Link 
                        href="/panier"
                        className="w-full py-2 text-gray-500 font-medium text-sm hover:text-gray-900 block text-center"
                    >
                        Retour au panier
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}

