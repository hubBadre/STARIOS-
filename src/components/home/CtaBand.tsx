import { useTranslations } from 'next-intl';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';

export function CtaBand() {
  const t = useTranslations('home.cta');
  const tc = useTranslations('common');

  return (
    <section className="section-y bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),transparent_30%),#f8fafc]">
      <div className="container">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_30px_70px_rgba(15,23,42,0.12)] md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white ring-1 ring-slate-900">
            Starios
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.06em] text-black md:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-relaxed text-slate-800 md:text-xl">{t('subtitle')}</p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/devis"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-7 text-base font-semibold text-white shadow-[0_12px_36px_rgba(239,68,68,0.35)] transition duration-200 hover:scale-[1.01] hover:shadow-[0_16px_44px_rgba(239,68,68,0.45)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t('button')}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-base font-semibold text-white transition duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="inline-flex items-center gap-2">
                <span>{tc('callUs')}</span>
                <span aria-hidden="true">·</span>
                <span dir="ltr" className="inline-block">{site.phone}</span>
              </span>
            </a>
          </div>

          <p className="mt-5 text-sm text-slate-400">{t('reassurance')}</p>
        </div>
      </div>
    </section>
  );
}
