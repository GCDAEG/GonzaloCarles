// /src/lib/sections.ts
export type NavSection = {
  id: string;
  dictKey: string; // <-- Agregamos esta propiedad
  href?: string;
};

export const sections: NavSection[] = [
  { id: "hero", dictKey: "home" },
  { id: "work", dictKey: "work" },
  { id: "stack", dictKey: "stack" },
  { id: "sobre-mi", dictKey: "about" },
  { id: "contacto", dictKey: "contact" },
];
