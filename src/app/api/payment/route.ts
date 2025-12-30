import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialise Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "XAF" } = body;

    // Vérification que le montant est un entier positif
    if (!Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Le montant doit être un entier positif." },
        { status: 400 }
      );
    }

    // Crée un PaymentIntent Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(), // Stripe utilise "xaf" en minuscules
      automatic_payment_methods: { enabled: true },
    });

    // Retourne le client secret pour le front
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

