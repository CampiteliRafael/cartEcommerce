import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "ShopSmart - Sua loja online",
  description: "E-Commerce com as melhores ofertas e produtos",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${inter.variable}`}>
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <ClientProviders>
          <Header />
          <main className="flex-grow py-6 sm:py-8 px-4 sm:px-6">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}