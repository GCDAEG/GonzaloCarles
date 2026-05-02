"use client";
import React from "react";
import { NavSection } from "@/lib/sections";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const DesktopMenu = ({
  sections,
  activeSection,
}: {
  sections: NavSection[];
  activeSection: string | null;
}) => {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  // Traemos las traducciones de la barra de navegación
  const t = useTranslations("Navigation");

  const handleNavigation = (id: string) => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      lenis?.scrollTo(`#${id}`, {
        offset: -80,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] h-24 hidden lg:flex items-center bg-[var(--background)]/50 backdrop-blur-sm">
      <div className="container mx-auto px-16 flex justify-between items-center h-full">
        {/* NOMBRE PERSONAL - Identidad como Autor */}
        <button
          onClick={() => handleNavigation("hero")}
          className="flex flex-col group text-left"
        >
          <h1 className="text-xl font-black tracking-tighter leading-none uppercase text-[var(--foreground)]">
            GONZALO<span className="text-[var(--primary)]">.</span>
          </h1>
          <span className="text-[8px] font-bold text-[var(--muted)] tracking-[0.5em] uppercase mt-1.5 transition-colors group-hover:text-[var(--foreground)]">
            Web Developer
          </span>
        </button>

        {/* NAVEGACIÓN - Estilo Galería de Arte */}
        <div className="flex items-center gap-16">
          <ul className="flex items-center gap-12">
            {sections.map((s) => {
              const isActive = activeSection === s.id && pathname === "/";
              return (
                <li key={s.id} className="relative">
                  <button
                    onClick={() => handleNavigation(s.id)}
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500",
                      isActive
                        ? "text-[var(--foreground)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] opacity-50 hover:opacity-100",
                    )}
                  >
                    {/* Imprimimos el nombre traducido según el dictKey */}
                    {t(s.dictKey)}
                  </button>
                  {/* Línea de activación minimalista */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[var(--primary)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* DISPONIBILIDAD / CONTACTO RÁPIDO */}
          <div className="flex items-center gap-4 border-l border-[var(--border)] pl-12">
            <div className="size-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <button
              onClick={() => router.push("/contacto")}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {/* Reutilizamos la traducción de contacto */}
              {t("contact")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopMenu;
