import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongoDB";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import path from "path";

/**
 * Endpoint API pour gérer les commandes (création et récupération).
 */

/**
 * Crée une nouvelle commande, génère un reçu PDF et envoie une confirmation par email.
 * Le processus est conçu pour ne pas bloquer la création de la commande si l'envoi d'email échoue.
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      paymentId,
      customer_email,
      merchant_email = process.env.SMTP_USER || "abdelrazack080@gmail.com",
      items,
      payment_method,
      status = "ORDER_STATUS_PENDING",
      currency = "XAF",
      transaction_details = {},
      metadata = {}
    } = body;

    // VALIDATIONS DE BASE
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "La commande doit contenir au moins un item." },
        { status: 400 }
      );
    }

    if (!payment_method || !["card", "mobile"].includes(payment_method)) {
      return NextResponse.json(
        { error: "payment_method doit être 'card' ou 'mobile'." },
        { status: 400 }
      );
    }

    // SAUVEGARDE EN BASE DE DONNÉES
    const order = new Order({
      paymentId,
      customer_email,
      merchant_email,
      items,
      payment_method,
      status,
      currency,
      transaction_details,
      metadata
    });

    const savedOrder = await order.save();

    /**
     * PROCESSUS DE CONFIRMATION (PDF + EMAIL) :
     * Exécuté uniquement si les variables SMTP sont configurées.
     */
    if (process.env.SMTP_HOST && customer_email) {
      try {
        // Chargement de la police pour le PDF (nécessaire pour certains serveurs node)
        const fontPath = path.join(process.cwd(), "public/font/Roboto-VariableFont_wdth,wght.ttf");
        const doc = new PDFDocument({
          font: fontPath
        });
        
        // Flux pour capturer le PDF en mémoire
        const stream = new PassThrough();
        const chunks: Buffer[] = [];
        doc.pipe(stream);
        stream.on("data", (chunk) => chunks.push(chunk));

        const pdfPromise = new Promise<Buffer>((resolve, reject) => {
          stream.on("end", () => resolve(Buffer.concat(chunks)));
          stream.on("error", reject);
        });

        // Construction du contenu du PDF
        doc.fontSize(18).text("Reçu de commande MŪLA", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Order ID: ${savedOrder._id}`);
        doc.text(`Customer Email: ${customer_email}`);
        doc.text(`Payment Method: ${payment_method}`);
        doc.text(`Status: ${status}`);
        doc.text(`Currency: ${currency}`);
        doc.moveDown();
        doc.text("Items:");
        items.forEach((item: any, index: number) => {
          doc.text(`${index + 1}. Product ID: ${item.productId} - Quantity: ${item.quantity} x ${item.price} ${currency}`);
        });
        doc.moveDown();
        const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        doc.fontSize(14).text(`Total: ${total} ${currency}`, { align: "right" });

        doc.end();

        const pdfBuffer = await pdfPromise;

        // CONFIGURATION ET ENVOI DE L'EMAIL
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: process.env.SMTP_SECURE === "true" || true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
          }
        });

        await transporter.sendMail({
          from: `"MŪLA" <${process.env.SMTP_USER}>`,
          to: customer_email,
          subject: "Votre commande MŪLA est confirmée",
          text: "Merci pour votre commande. Veuillez trouver votre reçu en pièce jointe.",
          html: `
            <h2>Merci pour votre commande MŪLA !</h2>
            <p>Votre commande #${savedOrder._id} a été confirmée.</p>
            <p>Méthode de paiement: ${payment_method}</p>
            <p>Statut: ${status}</p>
            <p>Vous trouverez votre reçu en pièce jointe.</p>
          `,
          attachments: [
            {
              filename: `order-${savedOrder._id}.pdf`,
              content: pdfBuffer
            }
          ]
        });
      } catch (emailError: any) {
        // CRITIQUE : On log l'erreur mais on ne bloque pas la réponse
        // La commande est sauvée, c'est le plus important.
        console.error("Error during confirmation process (email/pdf):", emailError);
      }
    }

    return NextResponse.json(savedOrder, { status: 201 });

  } catch (err: any) {
    console.error("Critical error in POST /api/orders:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * Récupère toutes les commandes, triées par date décroissante.
 * Popule les informations des produits pour un affichage complet dans l'admin.
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 }).populate("items.productId");

    return NextResponse.json(orders, { status: 200 });
  } catch (err: any) {
    console.error("Erreur lors de la récupération des commandes :", err);
    return NextResponse.json(
      { error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

