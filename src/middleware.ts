import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  /**
   * Le middleware ne traite que les routes publiques.
   * /admin est volontairement exclu : il n'est pas traduit et sa protection
   * est faite côté serveur dans src/app/admin/layout.tsx (accès Prisma
   * impossible depuis l'edge runtime du middleware).
   */
  matcher: ['/((?!api|admin|_next|_vercel|images|.*\\..*).*)'],
};
