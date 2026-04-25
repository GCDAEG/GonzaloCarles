"use client";
import React from "react";
import {
  Instagram,
  Facebook,
  Store,
  MapPin,
  Heart,
  ArrowUpCircle,
  MessageCircle,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { sections } from "@/lib/sections";
import Link from "next/link";

export function FooterSection() {
  const lenis = useLenis();

  // Datos específicos de Gromet Take Away
  const WHATSAPP_NUMBER = "5493454000000";

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 px-6 flex flex-col items-center relative overflow-hidden max-w-2xl lg:max-w-3xl w-full mx-auto">
      {/* LÍNEA DE DISEÑO GROMET */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent" />

      <div className="z-10 flex flex-col items-center max-w-xl w-full">
        {/* BRANDING FINAL */}
        <div className="flex flex-col items-center gap-4 mb-14">
          <div className="size-16 bg-[var(--primary)] rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/40 border border-white/10">
            <Store className="text-white size-8" strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">
              GROMET<span className="text-[var(--primary)] not-italic">.</span>
            </h2>
            <p className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase mt-1">
              Take Away Experience
            </p>
          </div>
        </div>

        {/* CONTACT CARDS (GROMET STYLE) */}
        <div className="grid grid-cols-1 gap-4 w-full mb-14">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-5 bg-white/[0.03] hover:bg-white/[0.07] p-6 rounded-[2rem] border border-white/5 transition-all active:scale-[0.98]"
          >
            <div className="size-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center shrink-0 border border-[#25D366]/20">
              <MessageCircle
                size={24}
                className="text-[#25D366] fill-[#25D366]/10"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-white uppercase italic tracking-tight">
                Pedir al WhatsApp
              </span>
              <span className="text-[12px] text-slate-500 font-bold uppercase tracking-wider">
                Respuesta inmediata
              </span>
            </div>
          </a>

          <div className="flex items-center gap-5 bg-white/[0.03] p-6 rounded-[2rem] border border-white/5">
            <div className="size-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0 border border-[var(--primary)]/20">
              <MapPin size={24} className="text-[var(--primary)]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-white uppercase italic tracking-tight">
                Gromet Concordia
              </span>
              <span className="text-[12px] text-slate-500 font-bold uppercase tracking-wider">
                Mitre & San Juan
              </span>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN RÁPIDA PILLS */}
        <nav className="mb-14 w-full">
          <ul className="flex flex-wrap justify-center gap-3">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() =>
                    lenis?.scrollTo(`#${section.id}`, { offset: -100 })
                  }
                  className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[var(--primary)] transition-all border border-white/5 hover:border-[var(--primary)]/30 rounded-full bg-white/[0.02]"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* REDES SOCIALES */}
        <div className="flex gap-5 mb-20">
          {[
            { icon: Instagram, label: "Instagram" },
            { icon: Facebook, label: "Facebook" },
          ].map((social, i) => (
            <Link
              key={i}
              href="#"
              className="size-14 rounded-2xl bg-white/[0.03] text-slate-500 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all duration-500 border border-white/5 hover:border-transparent group"
            >
              <social.icon className="size-6 group-hover:scale-110 transition-transform" />
            </Link>
          ))}
        </div>
      </div>

      {/* SUB-FOOTER */}
      <div className="w-full max-w-2xl border-t border-white/5 pt-12 flex flex-col items-center gap-8">
        <button
          onClick={() => lenis?.scrollTo(0)}
          className="flex flex-col items-center gap-3 text-slate-700 hover:text-[var(--primary)] transition-all group"
        >
          <ArrowUpCircle
            size={32}
            strokeWidth={1.5}
            className="group-hover:-translate-y-2 transition-transform duration-500"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Subir
          </span>
        </button>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
            Hecho con{" "}
            <Heart
              size={12}
              className="text-[var(--primary)] fill-[var(--primary)] animate-pulse"
            />{" "}
            para
            <span className="text-slate-400">Gromet Take Away</span>
          </p>
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-800 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} CONCORDIA — ENTRE RÍOS
            </p>
            <p className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em] opacity-40">
              Desarrollado por TUWEBHOY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
