import { es } from './translations/es';
import { en } from './translations/en';

export type Locale = 'es' | 'en';

export type TranslationKeys = typeof es | typeof en;

export const translations: Record<Locale, TranslationKeys> = {
  es,
  en,
};

export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};
