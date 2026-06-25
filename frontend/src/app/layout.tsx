import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assigamé",
  description: "Plateforme de marketplace togolaise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * suppressHydrationWarning sur <html> et <body> :
     * Empêche Next.js de signaler des erreurs causées par des extensions
     * de navigateur qui modifient le DOM avant que React ne se charge
     * (ex: extensions de sécurité, anti-tracking, gestionnaires de mots de passe).
     * Cela n'affecte pas le comportement de l'application.
     */
    <html
      lang="fr"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
