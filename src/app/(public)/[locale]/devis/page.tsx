import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { QuoteWizard } from '@/components/quote/QuoteWizard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quote' });
  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    locale,
    path: '/devis',
  });
}

export default async function QuotePage({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'quote' });

  return (
    <div className="section-y bg-background">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-eyebrow mb-4">{t('eyebrow')}</p>
          <h1 className="text-3xl font-bold md:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </div>

        <QuoteWizard />
      </div>
    </div>
  );
}
