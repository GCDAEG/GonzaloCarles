// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es'
});

export const config = {
  // Este matcher es a prueba de balas: Atrapa todo excepto archivos internos e imágenes.
  matcher: ['/', '/(es|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};