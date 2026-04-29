"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowDownRight, Globe } from "lucide-react";
import Section from "../Section";

const HeroSection = () => {
  const fadin: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Section
      id="hero"
      className="flex items-center min-h-[calc(100vh-96px)] bg-[var(--background)]"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="container mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col gap-12 lg:gap-16"
      >
        {/* HEADER / TOP INFO */}
        <motion.div
          variants={fadin}
          className="flex justify-between items-end border-b border-[var(--border)] pb-4"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Gonzalo — Portfolio 2026
          </span>
          <div className="hidden sm:flex gap-10">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent)]">
              ● Disponible
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
              Entre Ríos, AR
            </span>
          </div>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* TEXT BLOCK */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div variants={fadin} className="flex flex-col">
              <h1 className="text-[15vw] lg:text-[9vw] font-black leading-[0.8] tracking-tighter uppercase">
                WEB <br />
                <span className="text-[var(--primary)] italic font-light lowercase">
                  Developer.
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadin}
              className="max-w-md text-lg md:text-xl font-medium leading-relaxed text-[var(--muted)]"
            >
              Construyendo interfaces donde la precisión técnica y la estética
              minimalista se encuentran.
            </motion.p>
          </div>

          {/* IMAGE BLOCK */}
          <motion.div
            variants={fadin}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group w-full max-w-[300px] aspect-[4/5]">
              <div className="absolute inset-0 bg-[var(--border)] translate-x-3 translate-y-3 -z-10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 duration-500" />
              <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src="https://i.postimg.cc/7LWsXyY7/e3526f82-b939-4b1c-b34c-c144340e9812.png"
                  alt="Gonzalo"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[var(--background)] p-3 border border-[var(--border)] md:block">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] leading-none">
                  Main Stack
                </p>
                <p className="text-[10px] font-bold mt-1">
                  TALWINDCSS / NEXTJS / TYPESCRIPT
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FOOTER ACTIONS */}
        <motion.div
          variants={fadin}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-4"
        >
          <div className="flex gap-10">
            <a
              href="#proyectos"
              className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest"
            >
              Proyectos
              <ArrowDownRight className="size-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#contacto"
              className="text-[11px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-all"
            >
              Hablemos
            </a>
          </div>

          <div className="flex items-center gap-3 opacity-30">
            <Globe className="size-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">
              Resolviendo problemas reales
            </span>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default HeroSection;
