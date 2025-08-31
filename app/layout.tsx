import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { MiniKitContextProvider } from "@/providers/MiniKitProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  title: "Koneque - Marketplace Digital",
  description: "Plataforma de comercio digital descentralizada con pagos en criptomonedas",
  openGraph: {
    title: "Koneque - Marketplace Digital",
    description: "Plataforma de comercio digital descentralizada con pagos en criptomonedas",
    url: process.env.NEXT_PUBLIC_URL || 'https://koneque.vercel.app',
    siteName: 'Koneque Marketplace',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Koneque Marketplace'
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Koneque - Marketplace Digital',
    description: 'Plataforma de comercio digital descentralizada',
    images: ['/og.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MiniKitContextProvider>
          <Providers>
            {children}
          </Providers>
        </MiniKitContextProvider>
      </body>
    </html>
  );
}
