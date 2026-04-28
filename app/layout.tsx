import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { weddingConfig } from '@/lib/wedding-config';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const { partner1, partner2 } = weddingConfig.coupleNames;
const weddingDateLabel = new Date(weddingConfig.weddingDate).toLocaleDateString(
  'en-US',
  { month: 'long', day: 'numeric', year: 'numeric' },
);
const siteTitle = `${partner1} & ${partner2} — Wedding`;
const siteDescription = `Join us as we celebrate the wedding of ${partner1} and ${partner2} on ${weddingDateLabel} at ${weddingConfig.venue.name}.`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900">{children}</body>
    </html>
  );
}
