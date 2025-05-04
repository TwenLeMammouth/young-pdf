
import Image from 'next/image';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindTracker - Tests psychologiques",
  description: "Évaluez votre personnalité et votre bien-être avec des tests comme le Big Five ou l’échelle d’auto-compassion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full border-b bg-gradient-to-r from-blue-100 to-blue-50 py-4 mb-6 shadow-sm">
          <div className="flex flex-row gap-4 max-w-4xl mx-auto px-4">
            <Image src="/ColorBrain.png" alt="Brain Logo" width={80} height={80} className='rounded-3xl'/>
            <Image src="/logo.svg" alt="Logo MindTracker" width={280} height={80} />
          </div>
        </header>
        {children}
        <footer className="w-full text-center text-sm text-gray-500 mt-20 pb-10">
          Made with ❤️ using Next.js, React, TypeScript & deployed on <a href="https://vercel.com" className="underline hover:text-black" target="_blank">Vercel</a>.
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
