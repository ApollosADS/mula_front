/**
 * Exemple d'utilisation des templates de facture et d'email
 * Ce fichier montre comment intégrer la génération de factures et d'emails
 * dans votre flux de commande
 */

import {
    OrderData,
    generateInvoiceHTML,
    generateOrderConfirmationEmail,
    generateInvoicePDF,
    sendOrderConfirmationEmail,
    processOrderConfirmation,
} from './invoice-generator';

// ============================================
// EXEMPLE 1: Données de commande typique
// ============================================

const exempleCommande: Partial<OrderData> = {
    // Informations de commande
    orderNumber: 'CMD-20241229-001',
    orderDate: '29/12/2024',
    invoiceDate: '29/12/2024',

    // Informations client
    customerName: 'Jean Dupont',
    customerPhone: '+237 690 123 456',
    customerEmail: 'jean.dupont@example.com',
    customerAddress: 'Carrefour Makepe, Rue 1234',
    customerCity: 'Douala',

    // Produits commandés
    items: [
        {
            productName: 'Huile de Palme Rouge MŪLA',
            productDescription: 'Bouteille 1L - 100% Naturelle',
            unitPrice: 3500,
            quantity: 2,
            lineTotal: 7000,
        },
        {
            productName: 'Huile de Palme Rouge MŪLA',
            productDescription: 'Bidon 5L - 100% Naturelle',
            unitPrice: 15000,
            quantity: 1,
            lineTotal: 15000,
        },
    ],

    // Montants
    subtotal: 22000,
    shippingCost: 1500,
    totalAmount: 23500,

    // Paiement et livraison
    paymentMethod: 'Mobile Money (MTN)',
    paymentStatus: 'PAYÉ',
    deliveryZone: 'Douala - Zone 1',
    estimatedDelivery: '2-3 jours ouvrables',

    // Notes
    orderNotes: 'Livraison entre 9h-17h du lundi au samedi',
    websiteUrl: 'https://mula-palm-oil.com',
};

// ============================================
// EXEMPLE 2: Utilisation simple - Générer HTML
// ============================================

async function exemple_genererHTML() {
    console.log('📄 Génération du HTML de la facture...');

    const invoiceHTML = await generateInvoiceHTML(exempleCommande);
    console.log('✅ HTML de la facture généré!');
    console.log('Taille:', invoiceHTML.length, 'caractères');

    const emailHTML = await generateOrderConfirmationEmail(exempleCommande);
    console.log('✅ HTML de l\'email généré!');
    console.log('Taille:', emailHTML.length, 'caractères');

    return { invoiceHTML, emailHTML };
}

// ============================================
// EXEMPLE 3: Générer un PDF
// ============================================

async function exemple_genererPDF() {
    console.log('🖨️ Génération du PDF...');

    try {
        const pdfBuffer = await generateInvoicePDF(exempleCommande);
        console.log('✅ PDF généré avec succès!');
        console.log('Taille:', (pdfBuffer.length / 1024).toFixed(2), 'KB');

        // Sauvegarder le PDF (optionnel)
        const fs = require('fs').promises;
        const path = require('path');

        const outputPath = path.join(process.cwd(), 'invoices', `${exempleCommande.orderNumber}.pdf`);
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, pdfBuffer);

        console.log('💾 PDF sauvegardé:', outputPath);

        return pdfBuffer;
    } catch (error) {
        console.error('❌ Erreur:', error);
        throw error;
    }
}

// ============================================
// EXEMPLE 4: Envoyer un email de confirmation
// ============================================

async function exemple_envoyerEmail() {
    console.log('📧 Envoi de l\'email de confirmation...');

    try {
        const success = await sendOrderConfirmationEmail(exempleCommande, 'nodemailer');

        if (success) {
            console.log('✅ Email envoyé avec succès à', exempleCommande.customerEmail);
        } else {
            console.log('❌ Échec de l\'envoi de l\'email');
        }

        return success;
    } catch (error) {
        console.error('❌ Erreur:', error);
        throw error;
    }
}

// ============================================
// EXEMPLE 5: Traitement complet d'une commande
// ============================================

async function exemple_traitementComplet() {
    console.log('🚀 Traitement complet de la commande...\n');

    const result = await processOrderConfirmation(exempleCommande);

    if (result.success) {
        console.log('\n✅ Commande traitée avec succès!');
        console.log('📄 Facture:', result.invoicePath);
        console.log('📧 Email envoyé:', result.emailSent ? 'Oui' : 'Non');
    } else {
        console.log('\n❌ Erreur lors du traitement:', result.error);
    }

    return result;
}

// ============================================
// EXEMPLE 6: Intégration dans une API Route
// ============================================

/**
 * Exemple d'intégration dans une route API Next.js
 * Fichier: app/api/orders/[orderId]/confirm/route.ts
 */
export async function POST_confirmerCommande(request: Request) {
    try {
        const body = await request.json();
        const { orderId, orderData } = body;

        // 1. Valider les données
        if (!orderData.customerEmail) {
            return Response.json(
                { error: 'Email client requis' },
                { status: 400 }
            );
        }

        // 2. Générer la facture PDF
        console.log(`📄 Génération de la facture pour ${orderId}...`);
        const invoicePDF = await generateInvoicePDF(orderData);

        // 3. Sauvegarder la facture
        const fs = require('fs').promises;
        const path = require('path');
        const invoicesDir = path.join(process.cwd(), 'public', 'invoices');
        await fs.mkdir(invoicesDir, { recursive: true });
        const invoicePath = path.join(invoicesDir, `${orderData.orderNumber}.pdf`);
        await fs.writeFile(invoicePath, invoicePDF);

        // 4. Envoyer l'email de confirmation
        console.log(`📧 Envoi de l'email à ${orderData.customerEmail}...`);
        const emailSent = await sendOrderConfirmationEmail(orderData);

        // 5. Mettre à jour le statut de la commande dans la DB
        // await updateOrderStatus(orderId, 'confirmed');

        return Response.json({
            success: true,
            message: 'Commande confirmée avec succès',
            invoiceUrl: `/invoices/${orderData.orderNumber}.pdf`,
            emailSent,
        });

    } catch (error) {
        console.error('Erreur lors de la confirmation:', error);
        return Response.json(
            { error: 'Erreur lors de la confirmation de la commande' },
            { status: 500 }
        );
    }
}

// ============================================
// EXEMPLE 7: Webhook après paiement réussi
// ============================================

/**
 * Exemple d'utilisation dans un webhook de paiement
 * Fichier: app/api/webhook/paiement/route.ts
 */
export async function handlePaymentWebhook(paymentData: any) {
    // Supposons que le paiement a été validé
    const isPaid = paymentData.status === 'success';

    if (isPaid) {
        console.log('💰 Paiement validé pour la commande', paymentData.orderId);

        // Récupérer les détails de la commande depuis la DB
        // const order = await getOrderById(paymentData.orderId);

        const orderData: Partial<OrderData> = {
            orderNumber: paymentData.orderId,
            customerName: paymentData.customerName,
            customerEmail: paymentData.customerEmail,
            customerPhone: paymentData.customerPhone,
            customerAddress: paymentData.customerAddress,
            customerCity: paymentData.customerCity,
            // ... autres données
            paymentStatus: 'PAYÉ',
            paymentMethod: paymentData.paymentMethod,
        };

        // Traiter la confirmation de commande
        const result = await processOrderConfirmation(orderData);

        if (result.success) {
            console.log('✅ Facture et email envoyés avec succès');

            // Mettre à jour la base de données
            // await updateOrder(paymentData.orderId, {
            //   status: 'confirmed',
            //   invoicePath: result.invoicePath,
            //   confirmedAt: new Date(),
            // });
        }

        return result;
    }
}

// ============================================
// VARIABLES D'ENVIRONNEMENT REQUISES
// ============================================

/**
 * Ajouter dans votre fichier .env:
 * 
 * # Configuration SMTP pour l'envoi d'emails
 * SMTP_HOST=smtp.gmail.com
 * SMTP_PORT=465
 * SMTP_USER=abdelrazack080@gmail.com
 * SMTP_PASSWORD=votre_mot_de_passe_application
 * 
 * # Alternative: SendGrid
 * SENDGRID_API_KEY=votre_cle_api_sendgrid
 */

// ============================================
// DÉPENDANCES À INSTALLER
// ============================================

/**
 * Installer les dépendances nécessaires:
 * 
 * npm install puppeteer nodemailer
 * npm install -D @types/nodemailer
 * 
 * Pour SendGrid (alternative):
 * npm install @sendgrid/mail
 */

// ============================================
// EXPORTER LES FONCTIONS D'EXEMPLE
// ============================================

export {
    exemple_genererHTML,
    exemple_genererPDF,
    exemple_envoyerEmail,
    exemple_traitementComplet,
    exempleCommande,
};
