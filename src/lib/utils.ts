import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formate un montant en dirhams, sans décimales (usage courant au Maroc). */
export function formatMAD(value: number | string, locale = 'fr-MA') {
  const amount = typeof value === 'string' ? Number(value) : value;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string, locale = 'fr-MA') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

/** Diacritiques latins : plage U+0300–U+036F, isolée par la normalisation NFD. */
const DIACRITICS = /[̀-ͯ]/g;

export function slugify(input: string) {
  return input
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
