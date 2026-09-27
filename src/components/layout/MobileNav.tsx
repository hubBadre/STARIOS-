'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { mainNav } from '@/lib/navigation';
import { site } from '@/lib/site';
import { Logo } from './Logo';
import { LocaleSwitcher } from './LocaleSwitcher';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={t('openMenu')}
        className="inline-flex size-11 items-center justify-center rounded-lg text-navy
                   cursor-pointer transition-colors duration-200 hover:bg-brand-50 lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/40 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-y-0 end-0 z-50 flex w-[86%] max-w-sm flex-col bg-white shadow-card-hover
                     data-[state=open]:animate-in data-[state=open]:slide-in-from-right
                     data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
        >
          <Dialog.Title className="sr-only">{t('openMenu')}</Dialog.Title>

          <div className="flex items-center justify-between border-b border-border p-4">
            <Logo />
            <Dialog.Close
              aria-label={t('closeMenu')}
              className="inline-flex size-11 items-center justify-center rounded-lg text-navy
                         cursor-pointer transition-colors duration-200 hover:bg-brand-50"
            >
              <X className="size-6" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-12 items-center rounded-lg px-4 text-base font-medium',
                        'transition-colors duration-200',
                        active
                          ? 'bg-brand-50 text-brand-800'
                          : 'text-navy hover:bg-brand-50/60',
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-border p-4">
            <Link
              href="/devis"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-cta px-5
                         text-sm font-semibold text-white cursor-pointer
                         transition-colors duration-200 hover:bg-cta-hover"
            >
              {t('quote')}
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-input
                         px-5 text-sm font-semibold text-navy cursor-pointer
                         transition-colors duration-200 hover:bg-brand-50"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="inline-flex items-center gap-2">
                <span>{tc('callUs')}</span>
                <span aria-hidden="true">·</span>
                <span dir="ltr" className="inline-block">{site.phone}</span>
              </span>
            </a>
            <LocaleSwitcher className="w-full justify-center border border-input" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
