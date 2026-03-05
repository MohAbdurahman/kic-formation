import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  weight: ['600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kic-formations.ch'),
  title: {
    default: "KIC-FORMATIONS Genève | Centre de Formation Continue - La réussite pour tous",
    template: "%s | KIC-FORMATIONS"
  },
  description: "Centre de formation continue à Genève. Cours de français, anglais, informatique et ateliers personnalisés. Inscriptions et paiement en ligne. La réussite pour tous.",
  keywords: [
    "formation genève",
    "cours français genève",
    "cours anglais genève",
    "formation informatique genève",
    "centre formation continue",
    "apprendre français genève",
    "formation professionnelle suisse",
    "KIC-FORMATIONS"
  ],
  authors: [{ name: "KIC-FORMATIONS" }],
  creator: "KIC-FORMATIONS",
  publisher: "KIC-FORMATIONS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://kic-formations.ch',
    siteName: 'KIC-FORMATIONS',
    title: 'KIC-FORMATIONS Genève | Centre de Formation Continue',
    description: 'Centre de formation continue à Genève. Cours de français, anglais, informatique. La réussite pour tous.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KIC-FORMATIONS - Centre de formation à Genève',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KIC-FORMATIONS Genève | Centre de Formation Continue',
    description: 'Centre de formation continue à Genève. Cours de français, anglais, informatique.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
