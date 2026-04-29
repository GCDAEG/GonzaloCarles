// /src/lib/sections.ts

export type NavSection = {
  id: string;
  label: string;
  href?: string;
};

export const sections: NavSection[] = [
  {
    id: "hero",
    label: "Inicio",
  },
  {
    id: "work",
    label: "Proyectos", // Tu proyecto TUWEBHOY y otros
  },
  {
    id: "stack",
    label: "Capacidades", // El stack técnico (React, Next, etc)
  },
  {
    id: "sobre-mi",
    label: "Enfoque", // Tu biografía y filosofía como dev
  },
  {
    id: "contacto",
    label: "Contacto",
  },
];