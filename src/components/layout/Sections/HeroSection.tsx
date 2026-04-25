"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  ShoppingBag,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useLenis } from "lenis/react";

const HeroSection = () => {
  const lenis = useLenis();

  return (
    <section id="hero" className="px-4 py-6 md:py-10 bg-[var(--background)]">
      <div className="container mx-auto max-w-2xl lg:max-w-3xl flex flex-col gap-6 justify-center">
        {/* HEADER DE BIENVENIDA CUSTOM GROMET */}
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <p className="text-[12px] text-[var(--muted)] font-bold uppercase tracking-[0.15em]">
              ¡Hola! Estás en
            </p>
            <h1 className="text-3xl font-black text-[var(--card-foreground)] tracking-tighter italic">
              GROMET<span className="text-[var(--primary)] not-italic">.</span>
            </h1>
          </div>
          <div className="bg-[var(--primary)]/10 p-3 rounded-2xl">
            <Zap className="size-6 text-[var(--primary)] fill-[var(--primary)]" />
          </div>
        </div>

        {/* UBICACIÓN REAL (CONCORDIA) */}
        <div className="flex items-center gap-3 bg-white p-4 rounded-[var(--radius)] border border-[var(--border)] shadow-sm cursor-pointer active:scale-[0.98] transition-all">
          <div className="bg-[var(--background)] p-2 rounded-xl">
            <MapPin className="size-5 text-[var(--primary)]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest leading-none">
              Punto de Retiro
            </span>
            <span className="text-[14px] font-bold text-[var(--card-foreground)] mt-1">
              Mitre & San Juan, Concordia
            </span>
          </div>
          <ChevronRight className="size-5 text-[var(--border)] ml-auto" />
        </div>

        {/* CARD DESTACADA (PROMOCIÓN) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[4/5] sm:aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-red-900/10 group"
        >
          <Image
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1500&auto=format&fit=crop"
            alt="Hamburguesa Gromet Especial"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Gromet Style */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-transparent to-transparent flex flex-col justify-end p-8">
            <div className="flex gap-2 mb-3">
              <span className="bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                Lo más pedido 🔥
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                Nuevo
              </span>
            </div>

            <h2 className="text-white text-3xl font-black leading-[0.9] tracking-tighter mb-2 italic uppercase">
              La Gromet <br /> de la Casa
            </h2>
            <p className="text-white/80 text-[14px] font-medium mb-5 max-w-[250px] leading-snug">
              Carne seleccionada, cheddar fundido y nuestro pan artesanal.
            </p>

            <button
              onClick={() => lenis?.scrollTo("#catalog", { offset: -100 })}
              className="btn-primary w-full shadow-red-600/20"
            >
              <ShoppingBag className="size-5" />
              Ver Menú Completo
            </button>
          </div>
        </motion.div>

        {/* STATS COMPACTOS */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          <div className="flex-none flex items-center gap-2 bg-white text-[var(--card-foreground)] px-4 py-2.5 rounded-2xl border border-[var(--border)] shadow-sm">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-[13px] font-black tracking-tight">4.9</span>
            <span className="text-[11px] font-bold text-[var(--muted)] uppercase">
              Reviews
            </span>
          </div>

          <div className="flex-none flex items-center gap-2 bg-white text-[var(--card-foreground)] px-4 py-2.5 rounded-2xl border border-[var(--border)] shadow-sm">
            <Clock className="size-4 text-[var(--primary)]" />
            <span className="text-[13px] font-black tracking-tight">
              15-20 min
            </span>
            <span className="text-[11px] font-bold text-[var(--muted)] uppercase">
              Take Away
            </span>
          </div>

          <div className="flex-none flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2.5 rounded-2xl border border-[var(--accent)]/20 shadow-sm">
            <Zap className="size-4 fill-[var(--accent)]" />
            <span className="text-[11px] font-black uppercase tracking-tight">
              Listo para retirar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
