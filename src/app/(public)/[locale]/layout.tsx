import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Lexend, Source_Sans_3, Cairo } from 'next/font/google';

import '@/app/globals.css';
import { routing, localeDirection, type AppLocale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { buildMetadata, localBusinessJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Lexend et Source Sans ne couvrent pas l'arabe : Cairo prend le relais en RTL.
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    ...buildMetadata({
      title: `${site.name} — ${site.tagline[locale]}`,
      description: t('hero.subtitle'),
      locale,
    }),
    title: {
      default: `${site.name} — ${site.tagline[locale]}`,
      template: `%s · ${site.name}`,
    },
  };
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as AppLocale)) notFound();

  // Permet le rendu statique des pages traduites
  setRequestLocale(locale);
  const messages = await getMessages();

  const dir = localeDirection[locale as AppLocale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${lexend.variable} ${sourceSans.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50
                       focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
          >
            {messages.common && typeof messages.common === 'object'
              ? (messages.common as Record<string, string>).skipToContent
              : 'Skip'}
          </a>

          <Header />
          <main id="main" className="page-shell flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </NextIntlClientProvider>

        <script
          type="application/ld+json"
          // Données structurées : nécessaire au référencement local
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd(locale as AppLocale)),
          }}
        />
      </body>
    </html>
  );
}
