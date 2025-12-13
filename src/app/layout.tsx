import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

const interBlack = Inter({
  subsets: ['latin'],
  weight: ['900'], // Black (Heavy)
  variable: '--font-mula-display',
});

export const metadata: Metadata = {
  title: 'MŪLA - Huile de Palme Rouge',
  description: 'Site e-commerce pour MŪLA, vente d\'huile de palme rouge 100% naturelle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} ${interBlack.variable} font-sans bg-white text-gray-800`}>
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

