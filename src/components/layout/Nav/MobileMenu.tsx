"use client";
import React, { useState, useEffect } from "react";
import { NavSection } from "@/lib/sections";
import Link from "next/link";
import { X, Menu, ShoppingBag, ChevronRight, Store, Clock } from "lucide-react";
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
    lenis?.scrollTo(`#${id}`, { offset: -100, duration: 1.2 });
  };

  return (
    <div className="flex w-full justify-center relative z-[100] max-w-2xl lg:max-w-3xl">
      {/* --- NAVBAR MÓVIL (TOP) --- */}
      <nav className="relative w-full h-20 z-[100] flex items-center px-4 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-3 active:scale-95 transition-transform"
            onClick={() => setOpen(false)}
          >
            <div className="bg-[var(--primary)] p-2.5 rounded-2xl shadow-lg shadow-red-200">
              <ShoppingBag className="text-white size-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none text-[var(--card-foreground)] italic">
                GROMET
                <span className="text-[var(--primary)] block text-[10px] not-italic tracking-[0.2em] mt-1 uppercase">
                  Take Away
                </span>
              </span>
            </div>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="size-12 rounded-2xl bg-white text-[var(--card-foreground)] border border-[var(--border)] shadow-sm active:bg-[var(--background)]"
          >
            <Menu className="size-7" strokeWidth={2.5} />
          </Button>
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
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm min-h-screen"
            />

            {/* SIDE DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-dvh w-[85%] max-w-xs z-[120] bg-[var(--background)] flex flex-col rounded-l-[2.5rem] shadow-2xl border-l border-white/20"
            >
              {/* Header Menú */}
              <div className="flex justify-between items-center px-8 pt-12 pb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.2em] mb-1">
                    Carta Digital
                  </span>
                  <h3 className="text-2xl font-black text-[var(--card-foreground)] tracking-tight">
                    ¿Qué pedimos? 🍔
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="size-11 flex items-center justify-center bg-white text-[var(--muted)] rounded-2xl border border-[var(--border)] shadow-sm active:scale-90 transition-transform"
                >
                  <X className="size-6" strokeWidth={3} />
                </button>
              </div>

              {/* Categorías */}
              <nav className="flex-1 px-4 py-2 overflow-y-auto no-scrollbar">
                <ul className="space-y-2">
                  {sections.map((sec) => {
                    const isActive =
                      activeSection === sec.id && pathname === "/";
                    return (
                      <li key={sec.id}>
                        <button
                          onClick={() => handleAction(sec.id)}
                          className={cn(
                            "w-full flex items-center justify-between p-5 rounded-[var(--radius)] transition-all duration-300",
                            isActive
                              ? "bg-[var(--primary)] text-white shadow-xl shadow-red-100 font-bold translate-x-2"
                              : "text-[var(--card-foreground)] font-bold hover:bg-white active:bg-white/50",
                          )}
                        >
                          <span className="text-lg tracking-tight">
                            {sec.label}
                          </span>
                          {isActive ? (
                            <div className="size-2 bg-white rounded-full animate-pulse" />
                          ) : (
                            <ChevronRight
                              className="size-5 text-[var(--border)]"
                              strokeWidth={3}
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer del Menú: Info de Retiro */}
              <div className="p-8 bg-white border-t border-[var(--border)] rounded-tl-[2.5rem] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-[var(--background)] flex items-center justify-center shrink-0 border border-[var(--border)]">
                    <Clock className="size-6 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--muted)] font-black uppercase tracking-widest leading-none mb-1">
                      Tiempo de espera
                    </p>
                    <p className="text-sm font-black text-[var(--card-foreground)]">
                      15 - 25 min aprox.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                    <Store className="size-6 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--muted)] font-black uppercase tracking-widest leading-none mb-1">
                      Retiro en local
                    </p>
                    <p className="text-sm font-black text-[var(--card-foreground)]">
                      Mitre y San Juan
                    </p>
                  </div>
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
