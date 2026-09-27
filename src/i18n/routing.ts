import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['fr', 'en', 'ar'] as const;
export type AppLocale = (typeof locales)[number];

/** L'arabe s'écrit de droite à gauche : le layout lit cette table pour poser dir=. */
export const localeDirection: Record<AppLocale, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  en: 'ltr',
  ar: 'rtl',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'fr',
  // 'fr' reste à la racine (/services), l'anglais et l'arabe sont préfixés selon le besoin
  localePrefix: 'as-needed',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
