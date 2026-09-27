'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-2xl font-bold md:text-3xl">{t('title')}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t('body')}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-navy px-6
                   text-sm font-semibold text-white cursor-pointer
                   transition-colors duration-200 hover:bg-navy-600"
      >
        {t('retry')}
      </button>
    </div>
  );
}
