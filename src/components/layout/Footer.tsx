"use client";
import React from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { sections } from "@/lib/sections";
import { BsGithub } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { useTranslations } from "next-intl";

export function FooterSection() {
  const lenis = useLenis();
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation"); // Hook extra para leer el menú

  return (
    <footer
      id="contacto"
      className="bg-[var(--foreground)] text-[var(--background)] pt-32 pb-12 px-6 relative overflow-hidden w-full"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

      <div className="container mx-auto max-w-7xl ">
        <div className="editorial-grid items-start gap-20">
          <div className="md:col-span-7 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)]">
                {t("badge")}
              </p>
              <h2 className="text-[12vw] md:text-[7vw] font-black title-kerning uppercase leading-none">
                {t("title_main")} <br />{" "}
                <span className="italic font-light lowercase text-white/50">
                  {t("title_highlight")}
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <a
                href="mailto:gonzalo.carles@outlook.com"
                className="group flex flex-col gap-2"
              >
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  {t("email_label")}
                </span>
                <span className="text-xl md:text-2xl font-bold border-b border-white/20 pb-2 group-hover:border-[var(--primary)] transition-all">
                  gonzalo.carles@outlook.com
                </span>
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between h-full py-2">
            <nav className="flex flex-col gap-4 mb-20">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">
                {t("nav_label")}
              </p>
              <ul className="flex flex-col gap-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() =>
                        lenis?.scrollTo(`#${section.id}`, { offset: -80 })
                      }
                      className="text-sm font-bold uppercase tracking-widest hover:text-[var(--primary)] transition-colors"
                    >
                      {/* Usamos el dictKey para buscar la traducción dinámica */}
                      {tNav(section.dictKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex gap-8">
              <a
                href="https://github.com/GCDAEG"
                className="opacity-40 hover:opacity-100 transition-opacity"
              >
                <BsGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/gonzalo-carles-461006287/"
                className="opacity-40 hover:opacity-100 transition-opacity"
              >
                <LiaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              {t("role")}
            </p>
            <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest">
              © {new Date().getFullYear()} {t("location_rights")}
            </p>
          </div>

          <button
            onClick={() => lenis?.scrollTo(0)}
            className="group flex flex-col items-center gap-3"
          >
            <div className="size-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--primary)] transition-colors">
              <ArrowUp
                size={18}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100">
              {t("back_to_top")}
            </span>
          </button>

          <div className="text-right hidden md:block">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-20">
              {t("built_with")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
