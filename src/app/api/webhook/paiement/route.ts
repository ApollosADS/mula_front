import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      // Peut être un webhook Mobile Money (CinetPay, Yoomee, etc.)
      const data = JSON.parse(body);
      
      // TODO: Vérifier la signature selon l'agrégateur
      // TODO: Mettre à jour le statut de la commande dans la DB
      // TODO: Envoyer un email de confirmation
      
      return NextResponse.json({ received: true, provider: 'mobile_money' });
    }

    // Webhook Stripe
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Gérer les différents types d'événements
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: Mettre à jour le statut de la commande
        // TODO: Envoyer un email de confirmation
        console.log('Payment successful for order:', session.metadata?.orderId);
        break;
      
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // TODO: Traiter le paiement réussi
        console.log('Payment intent succeeded:', paymentIntent.id);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

