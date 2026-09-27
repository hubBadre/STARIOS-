import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { mainNav } from '@/lib/navigation';
import { site } from '@/lib/site';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/85">
      <div className="hidden bg-slate-950 text-white lg:block">
        <div className="container flex h-10 items-center justify-between text-sm">
          <p className="text-slate-200">{site.hours.fr}</p>
          <div className="flex items-center gap-5 text-slate-200">
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-sky-300"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span dir="ltr" className="inline-block">{site.phone}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors duration-200 hover:text-sky-300"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label={site.name} className="cursor-pointer">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            {mainNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:text-sky-700 hover:shadow-sm"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <Link
            href="/devis"
            className="hidden h-11 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(14,165,233,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(14,165,233,0.34)] sm:inline-flex"
          >
            {tc('getQuote')}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
