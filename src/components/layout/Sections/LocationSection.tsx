"use client";
import React from "react";
import Section from "@/components/layout/Section";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Info,
  CheckCircle2,
  Store,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LocationSection() {
  // Datos Reales de Gromet Take Away en Concordia
  const ADDRESS = "Mitre & San Juan";
  const CITY = "Concordia, Entre Ríos";
  const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=Gromet+Take+Away+Concordia";

  return (
    <Section
      id="ubicacion"
      className="bg-[var(--background)] py-12"
      height="content"
    >
      <div className="container mx-auto max-w-2xl lg:max-w-3xl flex flex-col gap-6">
        {/* HEADER DE SECCIÓN GROMET STYLE */}
        <div className="flex items-end justify-between px-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.2em] mb-1">
              ¿Dónde estamos?
            </span>
            <h2 className="text-2xl font-black text-[var(--card-foreground)] tracking-tighter italic uppercase">
              Punto de Retiro
            </h2>
          </div>
          <span className="text-[11px] font-black text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1.5 rounded-lg uppercase tracking-wider border border-[var(--accent)]/20 animate-pulse">
            Abierto ahora
          </span>
        </div>

        {/* MAPA Y DIRECCIÓN CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] border border-[var(--border)] overflow-hidden shadow-2xl shadow-orange-900/5"
        >
          {/* MOCK DE MAPA CON OVERLAY DE MARCA */}
          <div
            onClick={() => window.open(MAPS_URL, "_blank")}
            className="relative aspect-[21/9] bg-slate-200 cursor-pointer group overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop"
              alt="Mapa Concordia"
              fill
              className="object-cover opacity-60 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Pin Flotante Gromet */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-[var(--primary)] p-4 rounded-3xl shadow-[0_15px_30px_rgba(230,57,70,0.4)] text-white"
              >
                <Store className="size-8" strokeWidth={2.5} />
              </motion.div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
          </div>

          {/* DATOS DE LA DIRECCIÓN */}
          <div className="p-8 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--background)] p-3 rounded-2xl border border-[var(--border)]">
                <MapPin className="size-6 text-[var(--primary)]" />
              </div>
              <div className="flex flex-col">
                <p className="text-xl font-black text-[var(--card-foreground)] leading-none tracking-tight italic uppercase">
                  {ADDRESS}
                </p>
                <p className="text-sm font-bold text-[var(--muted)] mt-1">
                  {CITY}
                </p>
              </div>
            </div>

            <button
              onClick={() => window.open(MAPS_URL, "_blank")}
              className="btn-primary w-full shadow-red-600/10"
            >
              Abrir en Google Maps <Navigation className="size-4 fill-white" />
            </button>
          </div>
        </motion.div>

        {/* INFO EXTRA STYLE APP */}
        <div className="grid grid-cols-1 gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-[var(--border)] p-5 flex items-center gap-5 shadow-sm"
          >
            <div className="size-14 bg-[var(--background)] rounded-2xl flex items-center justify-center shrink-0 border border-[var(--border)] text-[var(--primary)]">
              <Clock className="size-7" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest leading-none mb-1">
                Horarios de atención
              </span>
              <span className="text-lg font-black text-[var(--card-foreground)] tracking-tight italic">
                Lun a Dom: 20:00 — 00:30
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-[var(--border)] p-5 flex items-center gap-5 shadow-sm"
          >
            <div className="size-14 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center shrink-0 text-[var(--accent)]">
              <Info className="size-7" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest leading-none mb-1">
                Importante
              </span>
              <span className="text-md font-bold text-[var(--card-foreground)] leading-tight">
                Los pedidos demoran 15-25 min. Pagá al retirar.
              </span>
            </div>
          </motion.div>
        </div>

        {/* FOOTER DE CONFIANZA */}
        <div className="mt-4 py-6 border-t border-[var(--border)] flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <CheckCircle2 className="size-5" />
            <span className="text-sm font-black uppercase italic tracking-tighter">
              Gromet Oficial • Concordia
            </span>
          </div>
          <p className="text-[10px] text-[var(--muted)] font-bold text-center px-8 uppercase tracking-[0.2em] leading-relaxed">
            Diseñado para optimizar tu tiempo y nuestra cocina.
          </p>
        </div>
      </div>
    </Section>
  );
}
