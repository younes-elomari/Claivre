import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";
import QueryClientProvider from "./QueryClientProvider";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Claivre",
  description: "Claivre est une solution complète et intuitive pour la gestion comptable. Avec Claivre, gérez facilement la comptabilité de votre entreprise, suivez les crédits de vos clients et surveillez le stock de vos produits. Notre plateforme est gratuite et conviviale, vous offrant des fonctionnalités avancées pour une gestion simplifiée de vos finances. Claivre transforme vos données en visualisations claires et impactantes telles que des graphiques linéaires et des histogrammes, facilitant ainsi l'analyse et la prise de décision. Bénéficiez d'une vue d'ensemble de vos finances avec des outils puissants et accessibles, conçus pour vous aider à prospérer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
      className={inter.className}
      >
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="violet">
              <NavBar />
              <main className="px-3">
                <Container className="mb-4">{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
