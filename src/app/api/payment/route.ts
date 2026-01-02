import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialise Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

/**
 * Endpoint API pour initialiser un paiement Stripe.
 * Crée un PaymentIntent qui sera utilisé par le PaymentElement côté client.
 * 
 * @param {NextRequest} req - La requête contenant le montant (amount) et la devise (currency).
 * @returns {NextResponse} Le clientSecret nécessaire pour finaliser le paiement sur le front.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "XAF" } = body;

    // VALIDATION : Stripe exige des montants entiers (centimes pour USD/EUR, mais unité pour XAF)
    if (!Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Le montant doit être un entier positif." },
        { status: 400 }
      );
    }

    /**
     * CRÉATION DU PAYMENT INTENT :
     * Permet de suivre le cycle de vie d'un paiement.
     * On active les méthodes de paiement automatiques pour plus de flexibilité.
     */
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(), // IMPORTANT : Stripe utilise des codes en minuscules (ex: "xaf")
      automatic_payment_methods: { enabled: true },
    });

    // On renvoie uniquement le client_secret pour des raisons de sécurité
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

