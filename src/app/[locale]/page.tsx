import HeroSection from "../../components/layout/Sections/HeroSection";
import { SanityDocument } from "next-sanity";
import WorkSection from "@/components/layout/Sections/WorkSection";
import StackSection from "@/components/layout/Sections/StackSection";
import AboutSection from "@/components/layout/Sections/AboutSection";

// Agregamos la Promesa de los params para compatibilidad con Next.js 15+
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Awaiteamos los params aunque no usemos directamente "locale" aquí,
  // esto estabiliza la ruta dinámica.
  const { locale } = await params;

  // const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const posts: SanityDocument[] = [];
  console.log("los posts", posts);

  return (
    <main className={`min-h-screen w-full font-base overflow-hidden`}>
      <HeroSection />
      {/* <ProductCatalog posts={posts} /> */}

      {/* <LocationSection /> */}
      <WorkSection />
      <StackSection />
      <AboutSection />
      {/* <CartDrawer /> */}
      {/* <Testimonials /> */}
      {/* <WhatsAppChatInput /> */}
    </main>
  );
}
