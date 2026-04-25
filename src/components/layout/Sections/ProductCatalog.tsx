"use client";

import React from "react";
import Image from "next/image";
import { Plus, ChevronRight, ShoppingCart, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Section from "../Section";
import { SanityDocument } from "next-sanity";
import { MockProduct, mockProducts } from "@/lib/mockData";

interface ProductCatalogProps {
  posts: SanityDocument[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ posts }) => {
  const { addToCart } = useCart();
  const mockData: MockProduct[] = mockProducts;

  const categories = Array.from(
    new Set(mockData.map((p) => p.category).filter(Boolean)),
  );

  const getProductsByCategory = (cat: string) => {
    return mockData.filter((p) => p.category === cat);
  };

  return (
    <Section
      height="content"
      id="catalog"
      className="bg-[var(--background)] pt-8 pb-20"
    >
      <div className="container mx-auto max-w-2xl lg:max-w-3xl px-0">
        {categories.map((category) => (
          <div key={category as string} className="mb-12 last:mb-0">
            {/* TÍTULO DE CATEGORÍA GROMET STYLE */}
            <div className="flex items-end justify-between mb-6 px-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.2em] mb-1">
                  Menú Gromet
                </span>
                <h2 className="text-2xl font-black text-[var(--card-foreground)] leading-none tracking-tighter italic uppercase">
                  {category as string}
                </h2>
              </div>
              <button className="text-[11px] font-black text-[var(--muted)] uppercase tracking-widest flex items-center gap-1 active:text-[var(--primary)] transition-colors">
                Explorar{" "}
                <ChevronRight
                  className="size-3 text-[var(--primary)]"
                  strokeWidth={3}
                />
              </button>
            </div>

            {/* SCROLL HORIZONTAL (Native App Feel) */}
            <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-4">
              {getProductsByCategory(category as string).map((product) => {
                const pId = product.id;
                const pName = product.name;
                const pPrice = product.price;

                return (
                  <motion.div
                    key={pId}
                    whileTap={{ scale: 0.97 }}
                    className="snap-start shrink-0 w-[170px] sm:w-[190px] flex flex-col group"
                  >
                    {/* CARD DE IMAGEN */}
                    <div className="relative aspect-[1/1.1] w-full mb-4">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={pName}
                          fill
                          sizes="200px"
                          className="object-cover rounded-[2rem] shadow-xl shadow-orange-900/5 transition-transform duration-500 group-hover:scale-105 border border-white"
                        />
                      )}

                      {/* BADGE DE PRECIO FLOTANTE */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 shadow-sm">
                        <p className="text-[13px] font-black text-[var(--card-foreground)] tracking-tighter">
                          ${pPrice.toLocaleString("es-AR")}
                        </p>
                      </div>

                      {/* BOTÓN SUMAR ESTILO APP PREMIUM */}
                      <button
                        onClick={() =>
                          addToCart({
                            id: pId,
                            title: pName,
                            price: pPrice.toString(),
                            category: category as string,
                            image: product.image,
                          })
                        }
                        className="absolute -bottom-2 right-2 size-12 bg-[var(--primary)] text-white rounded-2xl shadow-lg shadow-red-200 flex items-center justify-center active:scale-90 transition-all border-4 border-[var(--background)] group-active:bg-[var(--accent)]"
                      >
                        <Plus className="size-6 text-white" strokeWidth={3} />
                      </button>

                      {/* INDICADOR DE POPULARIDAD (Opcional) */}
                      {pPrice > 5000 && (
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md p-2 rounded-xl">
                          <Flame className="size-3 text-[var(--primary)] fill-[var(--primary)]" />
                        </div>
                      )}
                    </div>

                    {/* DETALLES DEL PRODUCTO */}
                    <div className="px-2">
                      <h3 className="text-[15px] font-black text-[var(--card-foreground)] leading-snug line-clamp-2 tracking-tight italic uppercase italic">
                        {pName}
                      </h3>
                      <p className="text-[11px] font-medium text-[var(--muted)] leading-tight mt-1 line-clamp-2">
                        Preparado en el momento. Ideal para compartir.
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CARRITO FLOTANTE INTEGRADO (VISUAL) */}
      {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs px-4 z-[450] pointer-events-none">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="btn-primary pointer-events-auto h-16 w-full rounded-2xl shadow-2xl flex items-center justify-between px-6 border-t-2 border-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="size-6" />
              <span className="absolute -top-2 -right-2 size-5 bg-white text-[var(--primary)] text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[var(--primary)] cart-pulse">
                2
              </span>
            </div>
            <span className="text-[14px] font-black uppercase tracking-tight italic">
              Mi Pedido
            </span>
          </div>
          <span className="text-lg font-black tracking-tighter">$12.500</span>
        </motion.div>
      </div> */}
    </Section>
  );
};

export default ProductCatalog;
