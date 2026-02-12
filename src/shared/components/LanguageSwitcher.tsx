'use client';

import { useLocale } from '@/shared/context/LocaleContext';
import { cn } from '@/shared/utils/cn';

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => setLocale('es')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
          locale === 'es'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        )}
      >
        ES
      </button>
      <button
        onClick={() => setLocale('en')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
          locale === 'en'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        )}
      >
        EN
      </button>
    </div>
  );
};
