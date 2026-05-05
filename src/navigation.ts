import { createNavigation } from 'next-intl/navigation';

// Definí acá los idiomas que soporta tu portfolio
export const locales = ['en', 'es'] as const;
export const localePrefix = 'always'; // O 'as-needed' según tu configuración

export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales, localePrefix });