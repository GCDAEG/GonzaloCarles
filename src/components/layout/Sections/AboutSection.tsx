"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Section from "../Section";
import { useTranslations } from "next-intl";

const AboutSection = () => {
  const t = useTranslations("About");

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Section
      id="sobre-mi"
      height="content"
      className="bg-[var(--background)] py-[var(--section-padding)]"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="editorial-grid items-start">
          {/* TÍTULO IZQUIERDO */}
          <div className="md:col-span-4 sticky top-32">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)] mb-4">
              {t("badge")}
            </p>
            <h2 className="text-4xl md:text-5xl font-black title-kerning uppercase">
              {t("title_main")} <br />{" "}
              <span className="italic font-light lowercase text-[var(--muted)]">
                {t("title_highlight")}
              </span>
            </h2>
          </div>

          {/* CUERPO DE TEXTO */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="md:col-span-8 flex flex-col gap-12"
          >
            <motion.p
              variants={fadeIn}
              className="text-2xl md:text-4xl font-medium leading-[1.1] tracking-tight text-[var(--foreground)]"
            >
              {t("description")}
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="grid grid-cols-1 gap-10 border-t border-[var(--border)] pt-12"
            >
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                  {t("philosophy_title")}
                </h4>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {t("philosophy_desc")}
                </p>
              </div>
            </motion.div>

            {/* FRASE FINAL / MANIFIESTO */}
            <motion.div
              variants={fadeIn}
              className="bg-[var(--foreground)] text-[var(--background)] p-8 md:p-12 rounded-sm mt-8"
            >
              <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-6 opacity-50">
                {t("principles_label")}
              </p>
              <div className="flex flex-col gap-4 text-xl md:text-2xl font-bold italic tracking-tighter">
                <span className="flex items-center gap-4">
                  <span className="text-[var(--primary)] text-sm not-italic">
                    01
                  </span>{" "}
                  {t("principle_1")}
                </span>
                <span className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <span className="text-[var(--primary)] text-sm not-italic">
                    02
                  </span>{" "}
                  {t("principle_2")}
                </span>
                <span className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <span className="text-[var(--primary)] text-sm not-italic">
                    03
                  </span>{" "}
                  {t("principle_3")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
