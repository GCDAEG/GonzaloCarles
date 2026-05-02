"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "../Section";
import { useTranslations } from "next-intl";

const WorkSection = () => {
  const t = useTranslations("Work");

  const projects = [
    {
      id: "01",
      title: "TUWEBHOY",
      category: t("projects.tuwebhoy.category"),
      description: t("projects.tuwebhoy.description"),
      stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
      image:
        "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
      link: "#",
    },
  ];

  return (
    <Section
      id="work"
      height="content"
      className="bg-[var(--background)] py-[var(--section-padding)]"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-24">
        {/* TÍTULO DE SECCIÓN */}
        <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)]">
            {t("badge")}
          </p>
          <h2 className="text-5xl md:text-7xl font-black title-kerning uppercase">
            {t("title_main")} <br />{" "}
            <span className="italic font-light lowercase">
              {t("title_highlight")}
            </span>
          </h2>
        </div>

        {/* LISTA DE PROYECTOS */}
        <div className="flex flex-col gap-32">
          {projects.map((project) => (
            <div key={project.id} className="editorial-grid items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-7 group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden bg-[var(--border)] rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl shadow-black/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 text-white font-black text-4xl opacity-20">
                    {project.id}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:col-span-5 flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                    {project.title}
                  </h3>
                </div>

                <p className="text-lg text-[var(--muted)] leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-black uppercase border border-[var(--border)] px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={project.link}
                    className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest border-b-2 border-[var(--foreground)] pb-1 w-fit transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    {t("explore_case")}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WorkSection;
