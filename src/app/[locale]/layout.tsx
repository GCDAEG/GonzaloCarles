import type { Metadata } from "next";
import "../globals.css";
import { FooterSection } from "../../components/layout/Footer";
import { Navbar } from "@/components/layout/Nav";
import { roboto, lora, inter } from "@/lib/fonts";
import ReactLenis from "lenis/react";
import PageLoader from "./PageLoader";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/CartContext";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// 1. params ahora es una Promesa
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // AWAITEAMOS los params antes de usar locale
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    metadataBase: new URL("http://localhost:3000"), // Cambia esto por tu dominio real en producción ej: https://tuwebhoy.com
    title: {
      default: "Gonzalo Carles Portfolio",
      template: "%s | Portfolio",
    },
    description: isEs
      ? "Desarrollador web desde Gualeguaychú, Entre Ríos, Argentina."
      : "Web developer based in Entre Ríos, Argentina.",
    openGraph: {
      title: "Gonzalo Carles",
      description: isEs
        ? "Soy un desarrollador web impulsado por la autonomía. Mi camino no empezó en una facultad, sino en la necesidad de entender cómo funcionan las cosas y cómo hacerlas mejores."
        : "I am an autonomy-driven web developer building clean and functional interfaces.",
      images: [
        {
          url: "/preview.jpeg",
          width: 1200,
          height: 630,
          alt: "Gonzalo Carles - Portfolio",
        },
      ],
      type: "website",
      locale: isEs ? "es_AR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gonzalo Carles",
      images: ["/preview.jpeg"],
    },
  };
}

// 2. params en el Layout también es una Promesa
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // AWAITEAMOS los params aquí también
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html
      lang={locale}
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
        <ReactLenis root>
          <CartProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <PageLoader />
              <Navbar />
              {children}
              <FooterSection />
            </NextIntlClientProvider>
          </CartProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
