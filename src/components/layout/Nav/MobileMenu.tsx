"use client";
import React, { useState, useEffect } from "react";
import { NavSection } from "@/lib/sections";
import Link from "next/link";
import { X, Menu, Globe, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  sections: NavSection[];
  activeSection: string | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ sections, activeSection }) => {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  const handleAction = (id: string) => {
    setOpen(false);
    lenis?.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
  };

  return (
    <div className="flex w-full justify-center relative z-[100] lg:hidden">
      {/* --- NAVBAR MÓVIL (TOP) --- */}
      <nav className="relative w-full h-20 z-[100] flex items-center px-6 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="w-full flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-col group active:scale-95 transition-all"
            onClick={() => setOpen(false)}
          >
            <h1 className="text-xl font-black tracking-tighter leading-none uppercase text-[var(--foreground)] italic">
              GONZALO<span className="text-[var(--primary)] not-italic">.</span>
            </h1>
            <span className="text-[8px] font-bold text-[var(--muted)] tracking-[0.3em] uppercase mt-1">
              Web Developer
            </span>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="p-2 -mr-2 text-[var(--foreground)] active:scale-90 transition-transform"
          >
            <Menu className="size-8" />
          </button>
        </div>
      </nav>

      {/* --- MENÚ LATERAL --- */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110] bg-[var(--foreground)]/10 backdrop-blur-sm min-h-screen"
            />

            {/* SIDE DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-dvh w-[85%] max-w-sm z-[120] bg-[var(--background)] flex flex-col shadow-2xl"
            >
              {/* Header Menú */}
              <div className="flex justify-between items-center px-8 pt-10 pb-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em] mb-2">
                    Navegación
                  </span>
                  <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest">
                    Portfolio — 2026
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="size-12 flex items-center justify-center border border-[var(--border)] rounded-full active:bg-[var(--foreground)] active:text-[var(--background)] transition-all"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Categorías (Navegación) */}
              <nav className="flex-1 px-8">
                <ul className="space-y-6">
                  {sections.map((sec) => {
                    const isActive = activeSection === sec.id && pathname === "/";
                    return (
                      <li key={sec.id}>
                        <button
                          onClick={() => handleAction(sec.id)}
                          className={cn(
                            "w-full flex items-end justify-between py-2 border-b transition-all duration-500",
                            isActive
                              ? "border-[var(--primary)] text-[var(--foreground)]"
                              : "border-[var(--border)] text-[var(--muted)]"
                          )}
                        >
                          <span className={cn(
                            "text-3xl font-black uppercase tracking-tighter",
                            isActive ? "italic" : ""
                          )}>
                            {sec.label}
                          </span>
                          <span className="text-[10px] font-black mb-1 opacity-40">
                            {isActive ? "ACTIVE" : "0" + (sections.indexOf(sec) + 1)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer del Menú: Info de Autor */}
              <div className="p-8 space-y-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <Globe className="size-4 text-[var(--primary)]" />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      Entre Ríos, Argentina
                    </span>
                  </div>
                  <div className="h-[1px] w-full bg-[var(--border)]" />
                  <a 
                    href="mailto:tu-email@gmail.com"
                    className="flex items-center justify-between group"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Hablemos</span>
                    <ArrowUpRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;