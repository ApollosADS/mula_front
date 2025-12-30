/**
 * Utilitaires pour générer des factures PDF et emails de confirmation
 * Compatible avec les templates MŪLA
 */

export interface OrderData {
  // Informations de commande
  orderNumber: string;
  orderDate: string;
  invoiceDate: string;

  // Informations client
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  customerCity: string;

  // Produits
  items: OrderItem[];

  // Montants
  subtotal: number;
  shippingCost: number;
  totalAmount: number;

  // Paiement et livraison
  paymentMethod: string;
  paymentStatus: string; // ex: "PAYÉ", "EN ATTENTE"
  deliveryZone: string;
  estimatedDelivery: string;

  // Notes optionnelles
  orderNotes?: string;

  // URL du site (pour l'email)
  websiteUrl?: string;

  // URL du logo (pour l'email)
  logoUrl?: string;
}

export interface OrderItem {
  productName: string;
  productDescription: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

/**
 * Remplace les placeholders Mustache-style {{variable}} par leurs valeurs
 */
function replacePlaceholders(template: string, data: any): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const value = key.split('.').reduce((obj: any, k: string) => obj?.[k], data);
    return value !== undefined ? String(value) : '';
  });
}

/**
 * Traite les blocs conditionnels {{#variable}}...{{/variable}}
 */
function processConditionals(template: string, data: any): string {
  return template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
    const value = data[key];
    if (Array.isArray(value)) {
      // Pour les tableaux, répète le contenu pour chaque élément
      return value.map(item => replacePlaceholders(content, item)).join('');
    } else if (value) {
      // Pour les booléens/objets, affiche le contenu si truthy
      return replacePlaceholders(content, data);
    }
    return '';
  });
}

/**
 * Template engine simple compatible avec Mustache basique
 */
export function renderTemplate(template: string, data: OrderData): string {
  let result = template;

  // Traiter les boucles et conditionnels
  result = processConditionals(result, data);

  // Remplacer les variables simples
  result = replacePlaceholders(result, data);

  return result;
}

/**
 * Formate un montant en FCFA
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Prépare les données de commande pour le template
 */
export function prepareOrderData(orderData: Partial<OrderData>): OrderData {
  const now = new Date();

  return {
    orderNumber: orderData.orderNumber || `CMD-${Date.now()}`,
    orderDate: orderData.orderDate || now.toLocaleDateString('fr-FR'),
    invoiceDate: orderData.invoiceDate || now.toLocaleDateString('fr-FR'),

    customerName: orderData.customerName || '',
    customerPhone: orderData.customerPhone || '',
    customerEmail: orderData.customerEmail,
    customerAddress: orderData.customerAddress || '',
    customerCity: orderData.customerCity || '',

    items: (orderData.items || []).map(item => ({
      ...item,
      unitPrice: formatCurrency(item.unitPrice) as any,
      lineTotal: formatCurrency(item.lineTotal) as any,
    })),

    subtotal: formatCurrency(orderData.subtotal || 0) as any,
    shippingCost: formatCurrency(orderData.shippingCost || 0) as any,
    totalAmount: formatCurrency(orderData.totalAmount || 0) as any,

    paymentMethod: orderData.paymentMethod || 'Non spécifié',
    paymentStatus: orderData.paymentStatus || 'EN ATTENTE',
    deliveryZone: orderData.deliveryZone || '',
    estimatedDelivery: orderData.estimatedDelivery || '2-3 jours ouvrables',

    orderNotes: orderData.orderNotes || 'Merci pour votre confiance !',
    websiteUrl: orderData.websiteUrl || 'https://mula-palm-oil.com',
    logoUrl: orderData.logoUrl || '/images/logo.jpg',
  };
}

/**
 * Génère le HTML de la facture
 */
export async function generateInvoiceHTML(orderData: Partial<OrderData>): Promise<string> {
  const fs = require('fs').promises;
  const path = require('path');

  // Charger le template
  const templatePath = path.join(process.cwd(), 'src/templates/invoice-template.html');
  const template = await fs.readFile(templatePath, 'utf-8');

  // Préparer et formater les données
  const formattedData = prepareOrderData(orderData);

  // Rendre le template
  return renderTemplate(template, formattedData);
}

/**
 * Génère le HTML de l'email de confirmation
 */
export async function generateOrderConfirmationEmail(orderData: Partial<OrderData>): Promise<string> {
  const fs = require('fs').promises;
  const path = require('path');

  // Charger le template
  const templatePath = path.join(process.cwd(), 'src/templates/order-confirmation-email.html');
  const template = await fs.readFile(templatePath, 'utf-8');

  // Préparer et formater les données
  const formattedData = prepareOrderData(orderData);

  // Rendre le template
  return renderTemplate(template, formattedData);
}

/**
 * Génère un PDF à partir du HTML de facture
 * Nécessite puppeteer ou une bibliothèque similaire
 */
export async function generateInvoicePDF(orderData: Partial<OrderData>): Promise<Buffer> {
  // Note: Cette fonction nécessite l'installation de puppeteer
  // npm install puppeteer

  const html = await generateInvoiceHTML(orderData);

  try {
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });

    await browser.close();

    return pdf;
  } catch (error) {
    throw new Error(`Erreur lors de la génération du PDF: ${error}`);
  }
}

/**
 * Envoie un email de confirmation de commande
 * Compatible avec nodemailer, SendGrid, etc.
 */
export async function sendOrderConfirmationEmail(
  orderData: Partial<OrderData>,
  emailService: 'nodemailer' | 'sendgrid' = 'nodemailer'
): Promise<boolean> {
  const htmlContent = await generateOrderConfirmationEmail(orderData);

  if (emailService === 'nodemailer') {
    // Exemple avec Nodemailer
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"MŪLA - Huile de Palme Rouge" <abdelrazack080@gmail.com>',
      to: orderData.customerEmail,
      subject: `✅ Confirmation de votre commande ${orderData.orderNumber} - MŪLA`,
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return false;
    }
  }

  // Ajouter d'autres services email ici (SendGrid, etc.)

  return false;
}

/**
 * Exemple d'utilisation complète
 */
export async function processOrderConfirmation(orderData: Partial<OrderData>) {
  try {
    // 1. Générer la facture PDF
    const invoicePDF = await generateInvoicePDF(orderData);

    // 2. Envoyer l'email de confirmation avec la facture en pièce jointe
    // (Vous pouvez attacher le PDF à l'email)

    // 3. Sauvegarder la facture sur le serveur
    const fs = require('fs').promises;
    const path = require('path');
    const invoicePath = path.join(
      process.cwd(),
      'invoices',
      `${orderData.orderNumber}.pdf`
    );
    await fs.writeFile(invoicePath, invoicePDF);

    console.log(`✅ Facture générée: ${invoicePath}`);

    // 4. Envoyer l'email
    const emailSent = await sendOrderConfirmationEmail(orderData);

    if (emailSent) {
      console.log(`✅ Email de confirmation envoyé à ${orderData.customerEmail}`);
    }

    return {
      success: true,
      invoicePath,
      emailSent
    };
  } catch (error) {
    console.error('Erreur lors du traitement de la commande:', error);
    return {
      success: false,
      error
    };
  }
}
