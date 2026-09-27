import { useTranslations } from 'next-intl';
import { ShieldCheck, BadgeCheck, Clock, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Logo } from '@/components/layout/Logo';
import { HeroBackground } from './HeroBackground';

export function Hero() {
  const t = useTranslations('home.hero');

  const trust = [
    { icon: ShieldCheck, label: t('trustGuarantee') },
    { icon: BadgeCheck, label: t('trustCertified') },
    { icon: Clock, label: t('trustResponse') },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <HeroBackground />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 size-[32rem] rounded-full bg-brand-500/25 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),transparent_30%)]" />
        <svg className="absolute inset-0 size-full opacity-[0.08]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative py-20 md:py-28 lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="mb-6 flex justify-start">
              <Logo size="lg" motion="float" variant="luxury" className="drop-shadow-[0_18px_34px_rgba(14,165,233,0.22)]" />
            </div>

            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-200 shadow-[0_8px_28px_rgba(14,165,233,0.12)] backdrop-blur-sm">
              {t('eyebrow')}
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-white md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{t('subtitle')}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/devis"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-7 text-base font-semibold text-white shadow-[0_16px_36px_rgba(239,68,68,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(239,68,68,0.42)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t('ctaPrimary')}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t('ctaSecondary')}
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 text-sm text-slate-300">
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10">
                    <Icon className="size-4 text-brand-300" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="glass-panel relative w-full max-w-md rounded-[2rem] p-5 shadow-[0_30px_70px_rgba(2,6,23,0.35)]">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Starios</p>
                    <p className="mt-2 text-2xl font-bold">Confort sûr</p>
                  </div>
                  <div className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/25">
                    98% satisf.
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-300">Diagnostic</span>
                    <span className="font-semibold text-white">24h</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-300">Installation</span>
                    <span className="font-semibold text-white">Sous 7 jours</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-300">Garantie</span>
                    <span className="font-semibold text-white">1 an</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-500/15 to-sky-500/10 p-3 ring-1 ring-brand-400/20">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Projet</p>
                    <p className="mt-1 text-sm text-slate-100">Visite gratuite + devis</p>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-200">
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
