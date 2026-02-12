'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { translations, DEFAULT_LOCALE, type Locale, type TranslationKeys } from '@/shared/i18n';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const savedLocale = localStorage.getItem('cvapp-locale') as Locale | null;
    if (savedLocale && (savedLocale === 'es' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('cvapp-locale', newLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
};
