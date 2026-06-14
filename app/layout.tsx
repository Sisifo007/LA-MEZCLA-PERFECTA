import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "LUMEN RESTOBAR | Servicio de Coctelería Premium en Lima",
  description:
    "Transforma tu evento en Lima y Callao con nuestro servicio de coctelería profesional. Cócteles con y sin alcohol para bodas, corporativos y fiestas privadas. Cotiza en Soles en minutos.",
  keywords: [
    "servicio de coctelería Lima",
    "servicio de moctelería Lima",
    "bartender para eventos Lima",
    "cócteles para bodas Lima",
    "mocktails para eventos Lima",
    "coctelería para fiestas Perú",
    "cócteles sin alcohol Lima",
    "coctelería y moctelería profesional Perú",
  ],
  openGraph: {
    title: "LUMEN RESTOBAR | Servicio de Coctelería Premium en Lima",
    description:
      "Servicio de coctelería profesional para todo tipo de eventos en Lima y Callao. ¡Cotiza tu evento en minutos!",
    type: "website",
    locale: "es_PE",
    siteName: "LUMEN RESTOBAR",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMEN RESTOBAR | Servicio de Coctelería en Lima",
    description:
      "Servicio de coctelería profesional para eventos en Lima y Callao.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" className={cn("h-full antialiased dark", inter.variable, playfair.variable)}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
