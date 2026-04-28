import type { Metadata } from 'next';
import { Inter, Playfair_Display, PT_Serif } from 'next/font/google';
import './globals.css';
import { weddingConfig } from '@/lib/wedding-config';

const inter = Inter({
  variable: '--ff-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--ff-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ptSerif = PT_Serif({
  variable: '--ff-pt-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${ptSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=The+Nautigal:wght@400&display=swap"
        />
      </head>
      <body className="min-h-full bg-white text-slate-900">{children}</body>
    </html>
  );
}
