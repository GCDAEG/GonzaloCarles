"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Section from "../Section";

const AboutSection = () => {
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
              03 / Biografía
            </p>
            <h2 className="text-4xl md:text-5xl font-black title-kerning uppercase">
              El <br />{" "}
              <span className="italic font-light lowercase text-[var(--muted)]">
                Enfoque.
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
              Soy un desarrollador web impulsado por la autonomía. Mi camino no
              empezó en una facultad, sino en la necesidad de entender cómo
              funcionan las cosas y cómo hacerlas mejores.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[var(--border)] pt-12"
            >
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                  Filosofía
                </h4>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  No solo escribo código; diseño sistemas. Mi enfoque está en la
                  resolución directa de problemas, eliminando lo innecesario
                  para que la tecnología sea una herramienta invisible pero
                  potente para el usuario.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                  Trayectoria
                </h4>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  Desde Entre Ríos, he construido soluciones que van desde la
                  automatización de procesos mediante scraping hasta catálogos
                  digitales interactivos. Ser autodidacta me ha dado la
                  capacidad de aprender y adaptarme a cualquier stack en tiempo
                  récord.
                </p>
              </div>
            </motion.div>

            {/* FRASE FINAL / MANIFIESTO */}
            <motion.div
              variants={fadeIn}
              className="bg-[var(--foreground)] text-[var(--background)] p-8 md:p-12 rounded-sm mt-8"
            >
              <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-6 opacity-50">
                Principios
              </p>
              <div className="flex flex-col gap-4 text-xl md:text-2xl font-bold italic tracking-tighter">
                <span className="flex items-center gap-4">
                  <span className="text-[var(--primary)] text-sm not-italic">
                    01
                  </span>{" "}
                  Estética Funcional
                </span>
                <span className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <span className="text-[var(--primary)] text-sm not-italic">
                    02
                  </span>{" "}
                  Código Escalable
                </span>
                <span className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <span className="text-[var(--primary)] text-sm not-italic">
                    03
                  </span>{" "}
                  Resolución Directa
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
