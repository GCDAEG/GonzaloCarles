import type { Metadata } from "next";

import "./globals.css";
import { FooterSection } from "../components/layout/Footer";
import ExampleMessage from "@/components/layout/Sections/Example";
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
    default: "TWH Demo",
    template: "%s | Tu Web Hoy",
  },

  description:
    "Creamos páginas web simples y modernas para emprendedores. Ideales para mostrar tu negocio y empezar a vender.",

  openGraph: {
    title: "Tu web lista en días 🚀",
    description:
      "Páginas web modernas, claras y accesibles. Ideal para emprendedores y negocios chicos.",
    images: [
      {
        url: "/preview.jpeg",
        width: 1200,
        height: 630,
        alt: "Tu Web Hoy - Páginas web listas en días",
      },
    ],
    type: "website",
    locale: "es_AR",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tu web lista en días",
    description:
      "Webs modernas y accesibles para emprendedores. Lista para compartir y vender.",
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
