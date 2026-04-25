import ProductCatalog from "@/components/layout/Sections/ProductCatalog";
import HeroSection from "../components/layout/Sections/HeroSection";

import LocationSection from "@/components/layout/Sections/LocationSection";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { CartDrawer } from "@/components/ui/CartDrawer";
// export const roboto = Roboto({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-roboto",
// });

// export const lora = Lora({
//   subsets: ["latin"],
//   display: "optional",
//   variable: "--font-lora",
// });

// export const montserrat = Montserrat({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-montserrat",
// });

// export const title = lora.className;
// export const titleH2 = montserrat.className;
// export const base = roboto.className;

// const POSTS_QUERY = `*[
//   _type == "product"
//   && defined(slug.current)
// ]|order(publishedAt desc)[0...12]{_id, name, slug, image, category, description, price, publishedAt}`;

// const options = { next: { revalidate: 30 } };
export default async function Home() {
  // const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const posts: SanityDocument[] = [];
  console.log("los posts", posts);
  return (
    <main
      className={`min-h-screen w-full font-base max-w-2xl lg:max-w-3xl shadow-md`}
    >
      <HeroSection />
      <ProductCatalog posts={posts} />

      <LocationSection />

      <CartDrawer />
      {/* <Testimonials /> */}
      {/* <WhatsAppChatInput /> */}
    </main>
  );
}
