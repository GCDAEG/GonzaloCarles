import type { Metadata } from "next";

import "./globals.css";
import { FooterSection } from "../components/layout/Footer";
import { Navbar } from "@/components/layout/Nav";
import { roboto, lora, inter } from "@/lib/fonts";
import ReactLenis from "lenis/react";
import PageLoader from "./PageLoader";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/CartContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Gonzalo Carles Portfolio",
    template: "%s | Portfolio",
  },

  description: "Gualeguaychú, Entre Rios, Argentina.",

  openGraph: {
    title: "Gonzalo Carles",
    description:
      "Soy un desarrollador web impulsado por la autonomía. Mi camino no empezó en una facultad, sino en la necesidad de entender cómo funcionan las cosas y cómo hacerlas mejores.",
    images: [
      {
        url: "/preview.jpeg",
        width: 1200,
        height: 630,
        alt: "Gonzalo Carles - Portfolio",
      },
    ],
    type: "website",
    locale: "es_AR",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gonzalo Carles",
    images: ["/preview.jpeg"],
  },
};

// app/layout.tsx (versión recomendada)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        roboto.variable,
        lora.variable,
        inter.variable,
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <body
        className="
          min-h-screen antialiased text-foreground bg-fixed
          overflow-x-hidden
          bg-background
         w-full
          flex flex-col items-center
        "
      >
        {/* Opcional: capa extra para overlay si quieres más control */}
        <ReactLenis root>
          <CartProvider>
            <PageLoader />
            <Navbar />
            {children}
            <FooterSection />
          </CartProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
