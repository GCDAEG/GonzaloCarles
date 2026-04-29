"use client";
import React from "react";
import { motion } from "framer-motion";
import Section from "../Section";

const StackSection = () => {
  const techStack = [
    {
      category: "Frontend Core",
      tools: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)"]
    },
    {
      category: "Styling & Motion",
      tools: ["Tailwind CSS", "Framer Motion", "CSS Modules", "Lenis"]
    },
    {
      category: "Backend & CMS",
      tools: ["Node.js", "Sanity CMS", "Supabase"]
    },
    {
      category: "Tools & Deployment",
      tools: ["Git / GitHub", "Vercel", "Vite"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <Section id="stack" height="content" className="bg-[var(--background)] py-[var(--section-padding)] border-t border-[var(--border)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="editorial-grid">
          
          {/* TÍTULO LATERAL */}
          <div className="md:col-span-4 mb-12 md:mb-0">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)] mb-4">
              02 / Capacidades
            </p>
            <h2 className="text-4xl md:text-5xl font-black title-kerning uppercase">
              Tech <br /> <span className="italic font-light lowercase text-[var(--muted)]">Stack.</span>
            </h2>
            <p className="mt-6 text-sm text-[var(--muted)] max-w-[200px] leading-relaxed">
              Herramientas seleccionadas para construir productos escalables y de alto rendimiento.
            </p>
          </div>

          {/* GRID DE TECNOLOGÍAS */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16"
          >
            {techStack.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col gap-6">
                {/* Categoría con línea decorativa */}
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-[var(--primary)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">
                    {item.category}
                  </span>
                </div>

                {/* Lista de herramientas */}
                <ul className="flex flex-col gap-3">
                  {item.tools.map((tool) => (
                    <li key={tool} className="group flex items-baseline gap-2">
                      <span className="text-2xl md:text-3xl font-bold tracking-tighter transition-all group-hover:text-[var(--primary)] group-hover:pl-2">
                        {tool}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </Section>
  );
};

export default StackSection;