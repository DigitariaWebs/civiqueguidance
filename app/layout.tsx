import type { Metadata } from "next";
import "./globals.css";
import SiteBackground from "./components/SiteBackground";
import CookieBanner from "./components/CookieBanner";

export const metadata: Metadata = {
  title: "DémarchesCivique | Accompagnement Administratif d'Excellence",
  description:
    "Expertise juridique et administrative dédiée à la réussite de votre parcours républicain en France.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-screen selection:bg-french-blue selection:text-white">
        <SiteBackground />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
