import type { Metadata } from "next";
import "./globals.css";
import {Anonymous_Pro} from "next/font/google";

const anonymousPro = Anonymous_Pro({
    weight: "400",
    variable: "--font-anonymous-pro",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FisherF - Plateforme d'annonces immobilières pour investisseurs locatifs",
  description: "Découvrez FisherF, la plateforme dédiée aux investisseurs locatifs. Trouvez des biens rentables grâce à des outils innovants : cartes colorimétriques, analyses de rentabilité, simulation de prêt et plus encore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`min-h-screen w-full ${anonymousPro.variable} flex`}
      >
        {children}
      </body>
    </html>
  );
}
