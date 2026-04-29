import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  height?: string;
}

export default function Section({
  children,
  className = "",
  id,
  height,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        /* 1. Altura dinámica: Ocupa el viewport menos el Header (asumiendo h-16 o 64px) */
        min-h-[calc(100vh-80px)]
        
        /* 2. Paddings Horizontales (Consistencia de márgenes laterales) */
        px-4           /* Mobile: 16px */
        sm:px-8        /* Tablet: 32px */
        lg:px-24       /* Desktop: 96px */
        
        /* 3. Paddings Verticales (Ritmo visual y aire entre secciones) */
        py-8           /* Mobile: 32px */
        md:py-12       /* Tablet: 48px */
        lg:py-16       /* Desktop: 64px */
        
        /* 4. Layout Base */
        w-full
        flex
        
        ${height === "content" && "h-fit"}
      
        
        relative
        
        ${className}
      `}
    >
      {/* Contenedor interno opcional para limitar el ancho máximo en pantallas ultra-wide */}

      {children}
    </section>
  );
}
