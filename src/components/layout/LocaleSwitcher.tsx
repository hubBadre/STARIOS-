'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter, type AppLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LANGUAGES: Array<{ value: AppLocale; label: string; code: string }> = [
  { value: 'ar', label: 'العربية', code: 'AR' },
  { value: 'en', label: 'English', code: 'EN' },
  { value: 'fr', label: 'Français', code: 'FR' },
];

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-input bg-white p-1 shadow-sm',
        className,
      )}
      aria-label="Language selector"
    >
      {LANGUAGES.map(({ value, label, code }) => {
        const active = value === locale;

        return (
          <button
            key={value}
            type="button"
            disabled={pending}
            aria-label={label}
            aria-pressed={active}
            onClick={() =>
              startTransition(() => router.replace(pathname, { locale: value }))
            }
            className={cn(
              'flex h-9 w-11 items-center justify-center rounded-md text-xs font-semibold transition-colors',
              'cursor-pointer disabled:cursor-not-allowed disabled:opacity-60',
              active ? 'bg-navy text-white shadow-sm' : 'text-navy hover:bg-brand-50',
            )}
            title={label}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
