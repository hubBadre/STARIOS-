import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-heading text-6xl font-bold text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-bold md:text-3xl">{t('title')}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t('body')}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-navy px-6
                   text-sm font-semibold text-white cursor-pointer
                   transition-colors duration-200 hover:bg-navy-600"
      >
        {t('back')}
      </Link>
    </div>
  );
}
